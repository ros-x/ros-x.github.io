---
sidebar_position: 1
title: colcon-fish
---

# colcon-fish

[Fish shell](https://fishshell.com) support for [colcon](https://colcon.readthedocs.io/). This plugin generates native fish setup scripts so you can source ROS 2 workspaces directly in fish without POSIX compatibility hacks.

## Prerequisites

- Python 3.6+
- [colcon-core](https://github.com/colcon/colcon-core) (installed with ROS 2)
- [fish shell](https://fishshell.com) 3.0+

## Installation

### From PyPI

```bash
pip install colcon-fish
```

### From source

```bash
git clone https://github.com/ros-x/colcon-fish.git
cd colcon-fish
pip install -e .
```

On Ubuntu with system Python, add `--break-system-packages`:

```bash
pip install -e . --break-system-packages
```

### Verify installation

```fish
python3 -c "from colcon_fish.shell.fish import FishShell; print('OK')"
```

## Basic Workflow

```fish
# 1. Source the ROS 2 base environment
source /opt/ros/jazzy/setup.fish

# 2. Build your workspace
cd ~/ros2_ws
colcon build

# 3. Source the workspace
source install/setup.fish

# 4. Run nodes
ros2 run my_package my_node
```

## Generated Files

After `colcon build`, the following fish files appear in the install directory:

```
install/
├── setup.fish                    # Entry point — sources chained prefixes + local_setup.fish
├── local_setup.fish              # Sources all packages in this prefix
├── _local_setup_util_fish.py     # Python utility that reads .dsv files and outputs fish commands
└── <pkg_name>/
    └── share/<pkg_name>/
        ├── package.fish          # Per-package script — sources all hooks
        └── hook/
            ├── cmake_prefix_path.fish
            ├── ros_package_path.fish
            └── pkg_config_path.fish
```

### Sourcing order

`setup.fish` does the following in order:

1. Sources chained prefix paths (e.g., `/opt/ros/jazzy/local_setup.fish`)
2. Sources `local_setup.fish` for the current workspace

`local_setup.fish` then:

1. Prepends the workspace to `COLCON_PREFIX_PATH`
2. Runs `_local_setup_util_fish.py` which reads each package's `.dsv` file
3. Evaluates the output — setting environment variables and sourcing hook scripts

## Environment Variables

| Variable | Description |
|----------|-------------|
| `COLCON_PREFIX_PATH` | List of sourced workspace prefixes |
| `AMENT_PREFIX_PATH` | Package discovery for `ros2 run` / `ros2 pkg list` |
| `CMAKE_PREFIX_PATH` | CMake `find_package()` search paths |
| `PATH` | Executable search path |
| `PYTHONPATH` | Python module search path |
| `LD_LIBRARY_PATH` | Shared library search path |
| `PKG_CONFIG_PATH` | pkg-config search path |
| `ROS_PACKAGE_PATH` | ROS package search path |

The exact set depends on what each package's `ament_package()` registers.

## Fish Config Auto-Source

To auto-source ROS 2 on every fish session, add to `~/.config/fish/config.fish`:

```fish
# ROS 2 base
if test -f /opt/ros/jazzy/setup.fish
    source /opt/ros/jazzy/setup.fish
end

# Your workspace (optional)
if test -f ~/ros2_ws/install/setup.fish
    source ~/ros2_ws/install/setup.fish
end
```

## Debugging

Enable trace output to see every command the setup scripts execute:

```fish
set -gx COLCON_TRACE 1
source install/setup.fish
```

Sourcing `setup.fish` multiple times is safe — environment variables are deduplicated.

## Design

Fish is not POSIX-compatible, so it cannot source `.sh` scripts. colcon-fish registers as a primary shell extension (priority 200) that generates native `.fish` scripts independently of the `sh` extension.

The plugin handles fish's native list variables (`PATH`, `MANPATH`, `CDPATH`) with proper fish list syntax, while using colon-separated strings for other variables like `CMAKE_PREFIX_PATH` — matching the behavior of [ament_package](https://github.com/ament/ament_package).

For build-time environments (`generate_command_environment`), the plugin falls back to the `sh` extension since the build itself doesn't require fish-specific features.
