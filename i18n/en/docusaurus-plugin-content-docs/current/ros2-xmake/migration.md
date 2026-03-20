---
sidebar_position: 2
title: Migration from ament_cmake
---

# Migration from `ament_cmake` to `ament_xmake`

## package.xml

- Replace `<build_type>ament_cmake</build_type>` with `<build_type>ament_xmake</build_type>`
- Replace `<buildtool_depend>ament_cmake</buildtool_depend>` with `<buildtool_depend>ament_xmake</buildtool_depend>`

## Build script

- Replace `CMakeLists.txt` with `xmake.lua`
- Use the rule directly:

```lua
add_rules("ament_xmake.package")
```

`colcon-xmake` auto-injects the rule include via an internal wrapper file.

## Required outputs

`ament_xmake` packages must install:
- `package.xml` → `share/<pkg>/package.xml`
- ament index marker → `share/ament_index/resource_index/packages/<pkg>`

The rule generates these automatically when used on targets.
