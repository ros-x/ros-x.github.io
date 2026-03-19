---
sidebar_position: 9
title: rosidl Interface Generation
---

# rosidl Interface Generation

colcon-xmake includes a full rosidl code generation pipeline that converts `.msg`, `.srv`, and `.action` interface definitions into C/C++ code and typesupport libraries — with zero CMake configuration.

## How It Works

The pipeline runs automatically when colcon-xmake detects interface files in your package:

```
.msg/.srv/.action files
  │
  ▼
rosidl_adapter          → Convert to .idl format
  │
  ▼
rosidl generators       → Generate C/C++ source code
  │  ├─ rosidl_generator_c
  │  ├─ rosidl_generator_cpp
  │  └─ rosidl_generator_type_description
  │
  ▼
typesupport backends    → Generate serialization code
  │  ├─ rosidl_typesupport_fastrtps_c/cpp
  │  ├─ rosidl_typesupport_introspection_c/cpp
  │  └─ rosidl_typesupport_c/cpp
  │
  ▼
visibility headers      → Generate DLL export macros
  │
  ▼
xmake_rosidl_targets.lua → Auto-generated build targets
  │
  ▼
Install artifacts       → Headers, IDL files, ament index, CMake exports
```

## Interface Package Structure

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

Must declare `ament_xmake` build type and rosidl dependencies:

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

Interface-only packages need minimal configuration:

```lua
set_project("my_interfaces")
set_version("0.1.0")
set_languages("cxx17")

add_rules("mode.debug", "mode.release")
add_rules("ament_xmake.package")

-- rosidl targets are auto-generated and injected before this file loads.
-- A phony target is needed so the install rule fires.
target("my_interfaces_marker")
    set_kind("phony")
```

## Generated Artifacts

After building, the following are installed:

| Location | Content |
|----------|---------|
| `include/<pkg>/<pkg>/msg/*.hpp` | C++ message headers |
| `include/<pkg>/<pkg>/msg/*.h` | C message headers |
| `include/<pkg>/<pkg>/srv/*.hpp` | C++ service headers |
| `lib/lib<pkg>__rosidl_generator_c.so` | C type definitions library |
| `lib/lib<pkg>__rosidl_typesupport_*.so` | Typesupport libraries |
| `share/<pkg>/msg/*.msg` | Original message definitions |
| `share/<pkg>/msg/*.idl` | Generated IDL files |
| `share/ament_index/resource_index/rosidl_interfaces/<pkg>` | Interface index |
| `share/<pkg>/cmake/*` | CMake export files |

## Consuming Interfaces

### From an xmake package

Add the interface package to `add_ros_deps()`:

```lua
target("my_node")
    set_kind("binary")
    add_files("src/node.cpp")
    add_ros_deps("rclcpp", "my_interfaces")
```

Include headers in your C++ code:

```cpp
#include "my_interfaces/msg/my_message.hpp"
#include "my_interfaces/srv/my_service.hpp"
```

### From a CMake package

```cmake
find_package(my_interfaces REQUIRED)
ament_target_dependencies(my_node my_interfaces)
```

## Dependency Resolution

The pipeline resolves interface dependencies from installed packages by scanning the `rosidl_interfaces` ament index. Common transitive dependencies (`builtin_interfaces`, `service_msgs`, `action_msgs`, `unique_identifier_msgs`) are automatically included.

## Pipeline Details

### Step 1: Adapter

The `rosidl_adapter` converts `.msg`/`.srv`/`.action` files to `.idl` (Interface Definition Language) format, which is the standardized representation used by all subsequent generators.

### Step 2: Generators

Each generator produces source files for a specific language or purpose:

- **rosidl_generator_c** — C struct definitions and functions
- **rosidl_generator_cpp** — C++ class definitions (header-only)
- **rosidl_generator_type_description** — Type description metadata (JSON + C source)

### Step 3: Typesupport

Typesupport backends generate serialization/deserialization code:

- **FastRTPS** (`rosidl_typesupport_fastrtps_c/cpp`) — CDR serialization for DDS
- **Introspection** (`rosidl_typesupport_introspection_c/cpp`) — Runtime type reflection
- **Dispatchers** (`rosidl_typesupport_c/cpp`) — Select the appropriate backend at runtime

### Step 4: Visibility Headers

Visibility control headers (e.g., `rosidl_generator_c__visibility_control.h`) are generated from templates to handle shared library symbol export on different platforms.

### Step 5: Build Targets

The pipeline generates `xmake_rosidl_targets.lua` which defines shared library targets for the generated code. This file is automatically included before your `xmake.lua` loads.

### Step 6: Install

Generated headers, IDL files, and libraries are installed to standard ROS locations, and CMake export files are generated for downstream discovery.
