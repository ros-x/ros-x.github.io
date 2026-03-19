---
sidebar_position: 6
title: 示例教程
---

# 示例教程

[ros2_xmake_examples](https://github.com/ros-x/ros2_xmake_examples) 仓库包含完整的、可构建的示例包，展示了各种 xmake + ROS 2 模式。本指南将逐一讲解每个包。

## 配置

```bash
mkdir -p ~/ros2_xmake_ws/src && cd ~/ros2_xmake_ws/src
git clone https://github.com/ros-x/ros2_xmake_examples.git .
vcs import < ros2_xmake.repos

cd ~/ros2_xmake_ws
source /opt/ros/jazzy/setup.bash
colcon build --event-handlers console_direct+
source install/setup.bash
```

## demo_xmake_cpp — 多目标包

核心示例，展示单个 `xmake.lua` 如何定义多个目标（静态库、共享库和可执行文件），并使用 ROS 依赖解析。

```lua
set_project("demo_xmake_cpp")
set_version("0.1.0")
set_languages("cxx17")

add_rules("mode.debug", "mode.release")
add_rules("ament_xmake.package")

target("demo_xmake_cpp")
    set_kind("static")
    add_files("src/demo_lib.cpp")
    add_includedirs("include", {public = true})
    add_headerfiles("include/(demo_xmake_cpp/*.hpp)")

target("demo_xmake_cpp_shared")
    set_kind("shared")
    add_files("src/demo_lib.cpp")
    add_includedirs("include", {public = true})
    add_headerfiles("include/(demo_xmake_cpp/*.hpp)")
    add_defines("DEMO_XMAKE_CPP_BUILDING_DLL", {public = false})
    set_basename("demo_xmake_cpp")

target("demo_xmake_cpp_node")
    set_kind("binary")
    set_installdir("lib/demo_xmake_cpp")
    add_files("src/main.cpp", "src/demo_lib.cpp")
    add_includedirs("include")

target("turtle_circle_node")
    set_kind("binary")
    set_installdir("lib/demo_xmake_cpp")
    add_files("src/turtle_circle_node.cpp")
    add_ros_deps("rclcpp", "geometry_msgs")
    add_includedirs("include")
```

**关键模式：**
- `add_rules("ament_xmake.package")` 启用 ROS 集成规则
- `add_ros_deps("rclcpp", "geometry_msgs")` 解析 ROS 包的 include 和链接标志
- `set_installdir("lib/demo_xmake_cpp")` 将二进制文件放置在标准 ROS 可执行文件位置
- 静态库和共享库通过 CMake Config 导出供下游消费

**运行 turtlesim 示例：**
```bash
# 终端 1
ros2 run turtlesim turtlesim_node
# 终端 2
ros2 run demo_xmake_cpp turtle_circle_node
```

## demo_xmake_interfaces — rosidl 接口包

定义自定义 `.msg` 和 `.srv` 文件。rosidl 流水线（由 colcon-xmake 处理）自动生成 C/C++ 代码 — 无需显式目标定义。

```lua
set_project("demo_xmake_interfaces")
set_version("0.1.0")
set_languages("cxx17")

add_rules("mode.debug", "mode.release")
add_rules("ament_xmake.package")

-- rosidl 目标由 colcon-xmake rosidl 流水线自动生成，
-- 并在加载此 xmake.lua 之前通过入口文件注入。
-- 纯接口包无需显式目标定义。

-- 用于触发安装规则的虚拟目标
target("demo_xmake_interfaces_marker")
    set_kind("phony")
```

**目录结构：**
```
demo_xmake_interfaces/
├── msg/
│   └── CustomMessage.msg
├── srv/
│   └── CustomService.srv
├── package.xml
└── xmake.lua
```

`package.xml` 必须声明 `<build_type>ament_xmake</build_type>` 并包含 rosidl 构建依赖。详见 [rosidl 文档](./rosidl.md)。

## demo_xmake_component — pluginlib 组合节点

构建一个共享库，通过 `pluginlib` 注册为组合节点。

```lua
set_project("demo_xmake_component")
set_version("0.1.0")
set_languages("cxx17")

add_rules("mode.debug", "mode.release")
add_rules("ament_xmake.package")

-- 注册插件描述以供 pluginlib 发现
install_ros_plugin("plugin_description.xml", "rclcpp_components")

target("demo_xmake_component")
    set_kind("shared")
    add_files("src/talker_component.cpp")
    add_ros_deps("rclcpp", "rclcpp_components", "std_msgs")
```

**关键模式：**
- `install_ros_plugin("plugin_description.xml", "rclcpp_components")` 注册插件 XML 并创建 `rclcpp_components__pluginlib__plugin` 的 ament 索引条目
- 共享库自动安装到 `lib/` 并通过 CMake Config 导出

## demo_xmake_mixed — C++/Python 混合包

包含 C++ 节点和 Python 模块的包。

```lua
set_project("demo_xmake_mixed")
set_version("0.1.0")
set_languages("cxx17")

add_rules("mode.debug", "mode.release")
add_rules("ament_xmake.package")

target("cpp_publisher")
    set_kind("binary")
    set_installdir("lib/demo_xmake_mixed")
    add_files("src/cpp_node.cpp")
    add_ros_deps("rclcpp", "std_msgs")
```

Python 模块通过标准 `setup.cfg` / `setup.py` 机制安装，与 xmake 构建的 C++ 目标一同安装。

## demo_xmake_launch — 数据安装

纯数据包，展示 launch 文件和配置文件的安装。

```lua
set_project("demo_xmake_launch")
set_version("0.1.0")
set_languages("cxx17")

add_rules("mode.debug", "mode.release")
add_rules("ament_xmake.package")

-- 将 launch 和配置文件安装到标准 ROS 位置
install_ros_data("launch", "launch/*.py")
install_ros_data("config", "config/*.yaml")

-- 虚拟目标，让 xmake 有处理对象
target("demo_xmake_launch_marker")
    set_kind("phony")
```

**关键模式：**
- `install_ros_data("launch", "launch/*.py")` 将匹配文件安装到 `share/<pkg>/launch/`
- 常规目录（`launch`、`config`、`urdf`、`meshes` 等）即使没有显式 `install_ros_data()` 调用也会被自动检测并安装
- 需要一个虚拟目标才能触发安装规则

## demo_xmake_custom_msg_node — 跨包消息消费

发布 `demo_xmake_interfaces` 中定义的自定义消息的节点，展示跨包接口消费。

```lua
set_project("demo_xmake_custom_msg_node")
set_version("0.1.0")
set_languages("cxx17")

add_rules("mode.debug", "mode.release")
add_rules("ament_xmake.package")

target("custom_msg_publisher")
    set_kind("binary")
    set_installdir("lib/demo_xmake_custom_msg_node")
    add_files("src/publisher_node.cpp")
    add_ros_deps("rclcpp", "demo_xmake_interfaces")
```

只需将接口包添加到 `add_ros_deps()` — 生成的头文件和 typesupport 库会自动解析。

## downstream_cmake_consumer — CMake 互操作

标准 `ament_cmake` 包，消费 `demo_xmake_cpp` 导出的库，证明 xmake 构建的包能生成有效的 CMake Config 文件。

```cmake
find_package(demo_xmake_cpp REQUIRED)
target_link_libraries(my_node demo_xmake_cpp::demo_xmake_cpp)
```

这得益于 `ament_xmake.package` 在安装时生成带有 IMPORTED 目标的 `<pkg>Config.cmake`。

## 构建顺序

colcon 自动解析依赖图：

```
ament_xmake（构建工具）
  └─ demo_xmake_cpp
  │    └─ downstream_cmake_consumer
  └─ demo_xmake_interfaces
  │    └─ demo_xmake_custom_msg_node
  └─ demo_xmake_component
  └─ demo_xmake_mixed
  └─ demo_xmake_launch
```

构建所有包：
```bash
colcon build --event-handlers console_direct+
```

构建特定包：
```bash
colcon build --packages-select demo_xmake_cpp --event-handlers console_direct+
```

运行测试：
```bash
colcon test --packages-select demo_xmake_cpp downstream_cmake_consumer
colcon test-result --verbose
```
