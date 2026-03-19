---
sidebar_position: 5
title: ROS 依赖架构
---

# ROS 依赖架构

## 目标

为 xmake 用户提供面向包的依赖 API：

```lua
add_ros_deps("rclcpp", "geometry_msgs")
```

无需手动维护 `add_includedirs()/add_linkdirs()/add_links()`。

## 设计

使用索引架构：

- **数据源：** 每个包安装的 ROS CMake 导出元数据
- **colcon 阶段：** 从 `AMENT_PREFIX_PATH` 生成工作空间本地的 Lua 索引文件
- **xmake 阶段：** 在 `add_ros_deps(...)` 中消费生成的索引

### 为什么采用这种方式？

- CMake 导出已经编码了传递依赖和 include/library 提示
- 索引在构建时从当前 underlay/overlay 生成
- xmake 只需从标准化元数据中确定性地应用 include/link/rpath

## 组件

### 1. 用户 API

`add_ros_deps(...)` 由 `ament_xmake.package` 规则提供。

### 2. 解析器后端

`colcon_xmake/task/xmake/build.py::_generate_ros_index_file(...)`：
- 扫描 `AMENT_PREFIX_PATH` 中的包 CMake extras
- 输出 Lua 表 `_AMENT_XMAKE_ROS_INDEX`，包含 include 目录、编译定义、链接标志、rpath 目录和依赖关系

### 3. xmake 集成

`xmake/rules/ament_xmake/package.lua` — `add_ros_deps(...)`：
- 标准化包参数
- 递归解析依赖
- 将 include 目录 / 定义 / ldflags / rpath 应用到当前目标
