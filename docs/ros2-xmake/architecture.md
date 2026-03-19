---
sidebar_position: 5
title: Architecture
---

# ROS Deps Architecture

## Goal

Provide a package-oriented dependency API for xmake users:

```lua
add_ros_deps("rclcpp", "geometry_msgs")
```

without requiring manual `add_includedirs()/add_linkdirs()/add_links()` maintenance.

## Design

Uses an index architecture:

- **Source of truth:** ROS CMake export metadata installed in each package
- **colcon phase:** Generates a workspace-local Lua index file from `AMENT_PREFIX_PATH`
- **xmake phase:** Consumes the generated index in `add_ros_deps(...)`

### Why this approach?

- CMake exports already encode transitive dependencies and include/library hints
- Index is generated at build time from current underlay/overlay
- xmake only needs deterministic include/link/rpath application from normalized metadata

## Components

### 1. User API

`add_ros_deps(...)` available from the `ament_xmake.package` rule.

### 2. Resolver backend

`colcon_xmake/task/xmake/build.py::_generate_ros_index_file(...)`:
- Scans `AMENT_PREFIX_PATH` for package CMake extras
- Outputs Lua table `_AMENT_XMAKE_ROS_INDEX` with include dirs, compile definitions, link flags, rpath dirs, dependencies

### 3. xmake integration

`xmake/rules/ament_xmake/package.lua` -- `add_ros_deps(...)`:
- Normalizes package args
- Recursively resolves dependencies
- Applies include dirs / defines / ldflags / rpath to current target
