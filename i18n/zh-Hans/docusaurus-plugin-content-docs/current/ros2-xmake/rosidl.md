---
sidebar_position: 9
title: rosidl 接口生成
---

# rosidl 接口生成

colcon-xmake 包含完整的 rosidl 代码生成流水线，可将 `.msg`、`.srv` 和 `.action` 接口定义转换为 C/C++ 代码和 typesupport 库 — 无需任何 CMake 配置。

## 工作原理

当 colcon-xmake 检测到包中的接口文件时，流水线自动运行：

```
.msg/.srv/.action 文件
  │
  ▼
rosidl_adapter          → 转换为 .idl 格式
  │
  ▼
rosidl 生成器           → 生成 C/C++ 源代码
  │  ├─ rosidl_generator_c
  │  ├─ rosidl_generator_cpp
  │  └─ rosidl_generator_type_description
  │
  ▼
typesupport 后端        → 生成序列化代码
  │  ├─ rosidl_typesupport_fastrtps_c/cpp
  │  ├─ rosidl_typesupport_introspection_c/cpp
  │  └─ rosidl_typesupport_c/cpp
  │
  ▼
可见性头文件            → 生成 DLL 导出宏
  │
  ▼
xmake_rosidl_targets.lua → 自动生成的构建目标
  │
  ▼
安装产物                → 头文件、IDL 文件、ament 索引、CMake 导出
```

## 接口包结构

```
my_interfaces/
├── msg/
│   ├── MyMessage.msg
│   └── AnotherMessage.msg
├── srv/
│   └── MyService.srv
├── action/
│   └── MyAction.action
├── package.xml
└── xmake.lua
```

### package.xml

必须声明 `ament_xmake` 构建类型和 rosidl 依赖：

```xml
<?xml version="1.0"?>
<package format="3">
  <name>my_interfaces</name>
  <version>0.1.0</version>
  <description>My custom interfaces</description>
  <license>Apache-2.0</license>

  <buildtool_depend>ament_xmake</buildtool_depend>

  <build_depend>rosidl_default_generators</build_depend>
  <exec_depend>rosidl_default_runtime</exec_depend>

  <member_of_group>rosidl_interface_packages</member_of_group>

  <export>
    <build_type>ament_xmake</build_type>
  </export>
</package>
```

### xmake.lua

纯接口包只需最小配置：

```lua
set_project("my_interfaces")
set_version("0.1.0")
set_languages("cxx17")

add_rules("mode.debug", "mode.release")
add_rules("ament_xmake.package")

-- rosidl 目标自动生成并在此文件加载前注入。
-- 需要一个虚拟目标以触发安装规则。
target("my_interfaces_marker")
    set_kind("phony")
```

## 生成的产物

构建后，以下内容被安装：

| 位置 | 内容 |
|----------|---------|
| `include/<pkg>/<pkg>/msg/*.hpp` | C++ 消息头文件 |
| `include/<pkg>/<pkg>/msg/*.h` | C 消息头文件 |
| `include/<pkg>/<pkg>/srv/*.hpp` | C++ 服务头文件 |
| `lib/lib<pkg>__rosidl_generator_c.so` | C 类型定义库 |
| `lib/lib<pkg>__rosidl_typesupport_*.so` | Typesupport 库 |
| `share/<pkg>/msg/*.msg` | 原始消息定义 |
| `share/<pkg>/msg/*.idl` | 生成的 IDL 文件 |
| `share/ament_index/resource_index/rosidl_interfaces/<pkg>` | 接口索引 |
| `share/<pkg>/cmake/*` | CMake 导出文件 |

## 消费接口

### 从 xmake 包

将接口包添加到 `add_ros_deps()`：

```lua
target("my_node")
    set_kind("binary")
    add_files("src/node.cpp")
    add_ros_deps("rclcpp", "my_interfaces")
```

在 C++ 代码中包含头文件：

```cpp
#include "my_interfaces/msg/my_message.hpp"
#include "my_interfaces/srv/my_service.hpp"
```

### 从 CMake 包

```cmake
find_package(my_interfaces REQUIRED)
ament_target_dependencies(my_node my_interfaces)
```

## 依赖解析

流水线通过扫描 `rosidl_interfaces` ament 索引来解析已安装包的接口依赖。常见的传递依赖（`builtin_interfaces`、`service_msgs`、`action_msgs`、`unique_identifier_msgs`）会自动包含。

## 流水线详情

### 步骤 1：适配器

`rosidl_adapter` 将 `.msg`/`.srv`/`.action` 文件转换为 `.idl`（接口定义语言）格式，这是所有后续生成器使用的标准化表示。

### 步骤 2：生成器

每个生成器为特定语言或用途生成源文件：

- **rosidl_generator_c** — C 结构体定义和函数
- **rosidl_generator_cpp** — C++ 类定义（纯头文件）
- **rosidl_generator_type_description** — 类型描述元数据（JSON + C 源码）

### 步骤 3：Typesupport

Typesupport 后端生成序列化/反序列化代码：

- **FastRTPS** (`rosidl_typesupport_fastrtps_c/cpp`) — 用于 DDS 的 CDR 序列化
- **Introspection** (`rosidl_typesupport_introspection_c/cpp`) — 运行时类型反射
- **Dispatchers** (`rosidl_typesupport_c/cpp`) — 运行时选择合适的后端

### 步骤 4：可见性头文件

可见性控制头文件（如 `rosidl_generator_c__visibility_control.h`）从模板生成，用于处理不同平台上的共享库符号导出。

### 步骤 5：构建目标

流水线生成 `xmake_rosidl_targets.lua`，定义编译生成代码的共享库目标。此文件在加载你的 `xmake.lua` 之前自动包含。

### 步骤 6：安装

生成的头文件、IDL 文件和库被安装到标准 ROS 位置，并生成 CMake 导出文件供下游发现。
