---
sidebar_position: 1
title: Quick Start
---

# Quick Start

## Prerequisites

- Ubuntu with ROS 2 Jazzy installed at `/opt/ros/jazzy`
- [xmake](https://xmake.io) available in `PATH`
- Python 3.10+

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
