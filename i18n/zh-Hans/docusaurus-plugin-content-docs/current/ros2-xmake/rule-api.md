---
sidebar_position: 8
title: ament_xmake 规则 API
---

# ament_xmake 规则 API

`ament_xmake.package` 规则是 xmake 与 ROS 2 ament 构建系统之间的核心集成。它处理包元数据安装、依赖解析、CMake Config 生成和插件注册。

## 规则用法

在 `xmake.lua` 顶部添加规则：

```lua
add_rules("ament_xmake.package")
```

支持全局模式（文件作用域）和目标模式（在 target 块内）。推荐使用全局模式 — 它应用于所有目标并避免重复安装。

## add_ros_deps(...)

解析 ROS 包依赖，为当前目标配置 include 目录、编译定义、链接标志和 rpath 目录。

```lua
target("my_node")
    set_kind("binary")
    add_files("src/main.cpp")
    add_ros_deps("rclcpp", "geometry_msgs")
```

**行为：**
1. 从 `_AMENT_XMAKE_ROS_INDEX` 读取包元数据（由 colcon-xmake 在配置时生成）
2. 递归解析索引中声明的传递依赖
3. 扫描 `AMENT_PREFIX_PATH` 查找 include 目录和库
4. 将解析的 includes、defines、link flags 和 rpath 应用到当前目标

**可见性选项：**

默认情况下，解析的依赖对目标是私有的。要导出给下游目标：

```lua
add_ros_deps("rclcpp", {visibility = "public"})
```

**多个依赖：**

```lua
add_ros_deps("rclcpp", "std_msgs", "geometry_msgs", "sensor_msgs")
```

## install_ros_data(subdir, ...)

注册额外的数据文件，安装到 `share/<pkg>/<subdir>/`。

```lua
install_ros_data("launch", "launch/*.py")
install_ros_data("config", "config/*.yaml")
```

**参数：**
- `subdir` — `share/<pkg>/` 下的子目录
- `...` — 一个或多个匹配文件的 glob 模式

**自动检测：** 即使没有显式 `install_ros_data()` 调用，规则也会自动安装源代码树中存在的常规 ROS 目录：

| 目录 | 描述 |
|-----------|-------------|
| `launch/` | Launch 文件 |
| `config/` | 配置文件 |
| `urdf/` | URDF 机器人描述 |
| `meshes/` | 3D 网格文件 |
| `maps/` | 地图文件 |
| `worlds/` | 仿真世界 |
| `rviz/` | RViz 配置 |
| `params/` | 参数文件 |

## install_ros_plugin(plugin_xml, base_class_pkg)

注册 pluginlib 插件描述 XML 文件，用于安装和 ament 索引注册。

```lua
install_ros_plugin("plugin_description.xml", "rclcpp_components")
```

**参数：**
- `plugin_xml` — 插件描述 XML 文件的路径（相对于源目录）
- `base_class_pkg` — 拥有基类的包（如 `rclcpp_components`）

**功能：**
1. 将 XML 文件安装到 `share/<pkg>/`
2. 在 `<base_class_pkg>__pluginlib__plugin/<pkg>` 下创建指向已安装 XML 的 ament 索引条目

规则还会自动检测匹配 `*plugin*.xml` 且包含 `<library>` 标签的 XML 文件并自动安装。

## 安装规则行为

当带有 `ament_xmake.package` 的目标被安装时，规则执行以下操作：

### 包元数据（每包一次）
1. 将 `package.xml` 安装到 `share/<pkg>/package.xml`
2. 在 `share/ament_index/resource_index/packages/<pkg>` 创建 ament 索引标记
3. 将 `include/` 中的头文件复制到安装前缀
4. 安装已注册的数据文件和插件
5. 自动安装常规 ROS 数据目录

### 每目标操作
- **二进制目标：** 安装到 `lib/<pkg>/<binary_name>`
- **库目标：** 安装到 `lib/<library_file>` 并生成 CMake Config

### CMake Config 生成

对于每个库目标，规则生成：

1. **每目标片段** (`<target>-target.cmake`)：定义 IMPORTED 目标 `<pkg>::<target>`
2. **顶层 Config** (`<pkg>Config.cmake`)：包含所有片段并提供遗留变量

```cmake
# 生成的 <pkg>Config.cmake 提供：
set(<pkg>_FOUND TRUE)
set(<pkg>_INCLUDE_DIRS "...")
set(<pkg>_LIBRARIES "")
set(<pkg>_LIBRARY_DIRS "...")

# IMPORTED 目标：
<pkg>::<target_name>   # 每目标（精确目标名）
<pkg>::<pkg>           # 默认别名（优先共享库，回退到静态库）
```

下游 CMake 包可以消费这些导出：

```cmake
find_package(demo_xmake_cpp REQUIRED)
target_link_libraries(my_node demo_xmake_cpp::demo_xmake_cpp)
```

## 符号链接安装

设置环境变量 `AMENT_XMAKE_SYMLINK_INSTALL=1` 可在安装时使用符号链接代替文件复制。这能加速 Linux 上的迭代开发。

## 规则发现

规则通过两种机制发现：

1. **首选（自动）：** colcon-xmake 生成包含规则的内部入口文件，在加载你的 `xmake.lua` 之前
2. **回退：** 扫描 `AMENT_PREFIX_PATH` 查找 `share/ament_xmake/xmake/rules/ament_xmake/package.lua`

两种情况下，你的 `xmake.lua` 只需调用 `add_rules("ament_xmake.package")`。

## 确定性导出

只有与包名完全相同的目标才会在 CMake Config 中发出默认的 `<pkg>::<pkg>` 别名。其他目标以自身名称导出为 `<pkg>::<target_name>`。
