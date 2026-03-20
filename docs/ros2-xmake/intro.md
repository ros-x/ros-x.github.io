---
sidebar_position: 1
title: 快速开始
---

# 快速开始

## 前置条件

- 安装了 ROS 2 Jazzy 的 Ubuntu 系统（位于 `/opt/ros/jazzy`）
- [xmake](https://xmake.io) 已添加到 `PATH`
- Python 3.10+

### 通过 xlings 安装 xmake

[xlings](https://github.com/d2learn/xlings) 是一个跨平台包管理器，可以一键安装 xmake（以及 Node.js 等其他工具）：

```bash
# 安装 xlings
curl -fsSL https://raw.githubusercontent.com/d2learn/xlings/refs/heads/main/tools/other/quick_install.sh | bash

# 安装 xmake
xlings install xmake
```

Windows (PowerShell)：
```powershell
irm https://raw.githubusercontent.com/d2learn/xlings/refs/heads/main/tools/other/quick_install.ps1 | iex
xlings install xmake
```

## 配置

安装 colcon-xmake 插件：

```bash
pip install colcon-xmake
```

使用示例创建工作空间：

```bash
mkdir -p ~/ros2_xmake_ws/src && cd ~/ros2_xmake_ws/src
git clone https://github.com/ros-x/ros2_xmake_examples.git .
vcs import < ros2_xmake.repos
```

## 构建和测试

```bash
cd ~/ros2_xmake_ws
source /opt/ros/jazzy/setup.bash
colcon build --event-handlers console_direct+
colcon test --packages-select demo_xmake_cpp downstream_cmake_consumer
colcon test-result --verbose
```

## 相关项目

- [colcon-xmake](https://github.com/ros-x/colcon-xmake) - xmake 的 colcon 插件
- [ament_xmake](https://github.com/ros-x/ament_xmake) - xmake 的 ROS 2 构建规则
- [ros2_xmake_examples](https://github.com/ros-x/ros2_xmake_examples) - 示例包和端到端测试
