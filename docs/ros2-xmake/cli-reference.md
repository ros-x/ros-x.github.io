---
sidebar_position: 7
title: CLI Reference
---

# CLI Reference

colcon-xmake adds CLI arguments to `colcon build` and `colcon test` for controlling xmake behavior.

## Build Types

There are two build types that activate xmake integration:

| Build Type | When Used | Description |
|------------|-----------|-------------|
| `xmake` | Generic xmake packages | Direct xmake build without ROS ament integration |
| `ament_xmake` | ROS 2 packages | Full ROS integration: ament index, CMake Config export, rosidl pipeline |

Set the build type in your `package.xml`:

```xml
<export>
  <build_type>ament_xmake</build_type>
</export>
```

## colcon build Arguments

### --xmake-config-args

Pass arguments to the xmake configure step (`xmake f`).

```bash
colcon build --xmake-config-args -m=debug --toolchain=gcc
```

### --xmake-build-args

Pass arguments to the xmake build step (`xmake build`).

```bash
colcon build --xmake-build-args -j8 -v
```

### --xmake-install-args

Pass arguments to the xmake install step (`xmake install`).

```bash
colcon build --xmake-install-args -v
```

### --xmake-timeout

Timeout in seconds for each xmake command. Accepts an integer value.

```bash
colcon build --xmake-timeout 300
```

### --xmake-skip-install

Skip the xmake install step entirely. Useful during iterative development when you only want to compile.

```bash
colcon build --xmake-skip-install
```

### --ament-xmake-args

Pass extra arguments specifically to packages with `build_type=ament_xmake`. These are forwarded to the xmake configure step.

```bash
colcon build --ament-xmake-args --policies=build.warning:n
```

## colcon test Arguments

### --xmake-test-args

Pass arguments to the xmake test step (`xmake test`).

```bash
colcon test --xmake-test-args -v --group=unit
```

### --xmake-timeout

Timeout in seconds for test execution (same flag as build).

```bash
colcon test --xmake-timeout 120
```

## Managed Parameters

The following parameters are managed by the colcon-xmake plugin and **should not be set manually**:

| Parameter | Reason |
|-----------|--------|
| `--builddir` / `-o` | Set by colcon to the package build directory |
| `--installdir` | Set by colcon to the workspace install directory |

These are configured automatically based on your colcon workspace layout.

## Examples

Build all packages in debug mode:
```bash
colcon build --xmake-config-args -m=debug --event-handlers console_direct+
```

Build with verbose output and 4 parallel jobs:
```bash
colcon build --xmake-build-args -j4 -v
```

Run tests with increased timeout:
```bash
colcon test --xmake-timeout 300 --event-handlers console_direct+
colcon test-result --verbose
```

Build only ament_xmake packages with custom args:
```bash
colcon build --ament-xmake-args --policies=build.warning:n
```
