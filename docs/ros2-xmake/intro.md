---
sidebar_position: 1
title: Quick Start
---

# Quick Start

## Prerequisites

- Ubuntu with ROS 2 Jazzy installed at `/opt/ros/jazzy`
- [xmake](https://xmake.io) available in `PATH`
- Python 3.10+

### Install xmake via xlings

[xlings](https://github.com/d2learn/xlings) is a cross-platform package manager that can set up xmake (and other tools like Node.js) with one command:

```bash
# Install xlings
curl -fsSL https://raw.githubusercontent.com/d2learn/xlings/refs/heads/main/tools/other/quick_install.sh | bash

# Install xmake
xlings install xmake
```

On Windows (PowerShell):
```powershell
irm https://raw.githubusercontent.com/d2learn/xlings/refs/heads/main/tools/other/quick_install.ps1 | iex
xlings install xmake
```

## Setup

Install the colcon-xmake plugin:

```bash
pip install colcon-xmake
```

Set up a workspace with examples:

```bash
mkdir -p ~/ros2_xmake_ws/src && cd ~/ros2_xmake_ws/src
git clone https://github.com/ros-x/ros2_xmake_examples.git .
vcs import < ros2_xmake.repos
```

## Build and test

```bash
cd ~/ros2_xmake_ws
source /opt/ros/jazzy/setup.bash
colcon build --event-handlers console_direct+
colcon test --packages-select demo_xmake_cpp downstream_cmake_consumer
colcon test-result --verbose
```

## Related Projects

- [colcon-xmake](https://github.com/ros-x/colcon-xmake) - colcon plugin for xmake
- [ament_xmake](https://github.com/ros-x/ament_xmake) - ROS 2 build rules for xmake
- [ros2_xmake_examples](https://github.com/ros-x/ros2_xmake_examples) - Example packages and E2E tests
