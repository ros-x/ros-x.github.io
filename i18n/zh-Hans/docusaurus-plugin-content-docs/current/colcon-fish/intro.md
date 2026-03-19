---
sidebar_position: 1
title: colcon-fish
---

# colcon-fish

[Fish shell](https://fishshell.com) 对 [colcon](https://colcon.readthedocs.io/) 的支持。此插件生成原生 fish 配置脚本，让你可以在 fish 中直接 source ROS 2 工作空间，无需 POSIX 兼容性 hack。

## 前置条件

- Python 3.6+
- [colcon-core](https://github.com/colcon/colcon-core)（随 ROS 2 安装）
- [fish shell](https://fishshell.com) 3.0+

## 安装

### 从 PyPI

```bash
pip install colcon-fish
```

### 从源码

```bash
git clone https://github.com/ros-x/colcon-fish.git
cd colcon-fish
pip install -e .
```

在使用系统 Python 的 Ubuntu 上，添加 `--break-system-packages`：

```bash
pip install -e . --break-system-packages
```

### 验证安装

```fish
python3 -c "from colcon_fish.shell.fish import FishShell; print('OK')"
```

## 基本工作流

```fish
# 1. Source ROS 2 基础环境
source /opt/ros/jazzy/setup.fish

# 2. 构建工作空间
cd ~/ros2_ws
colcon build

# 3. Source 工作空间
source install/setup.fish

# 4. 运行节点
ros2 run my_package my_node
```

## 生成的文件

`colcon build` 之后，以下 fish 文件出现在安装目录中：

```
install/
├── setup.fish                    # 入口 — source 链式前缀 + local_setup.fish
├── local_setup.fish              # source 此前缀中的所有包
├── _local_setup_util_fish.py     # 读取 .dsv 文件并输出 fish 命令的 Python 工具
└── <pkg_name>/
    └── share/<pkg_name>/
        ├── package.fish          # 每包脚本 — source 所有 hooks
        └── hook/
            ├── cmake_prefix_path.fish
            ├── ros_package_path.fish
            └── pkg_config_path.fish
```

### Source 顺序

`setup.fish` 按以下顺序执行：

1. Source 链式前缀路径（如 `/opt/ros/jazzy/local_setup.fish`）
2. Source 当前工作空间的 `local_setup.fish`

`local_setup.fish` 然后：

1. 将工作空间添加到 `COLCON_PREFIX_PATH`
2. 运行 `_local_setup_util_fish.py` 读取每个包的 `.dsv` 文件
3. 执行输出 — 设置环境变量和 source hook 脚本

## 环境变量

| 变量 | 描述 |
|----------|-------------|
| `COLCON_PREFIX_PATH` | 已 source 的工作空间前缀列表 |
| `AMENT_PREFIX_PATH` | `ros2 run` / `ros2 pkg list` 的包发现 |
| `CMAKE_PREFIX_PATH` | CMake `find_package()` 搜索路径 |
| `PATH` | 可执行文件搜索路径 |
| `PYTHONPATH` | Python 模块搜索路径 |
| `LD_LIBRARY_PATH` | 共享库搜索路径 |
| `PKG_CONFIG_PATH` | pkg-config 搜索路径 |
| `ROS_PACKAGE_PATH` | ROS 包搜索路径 |

具体设置取决于每个包的 `ament_package()` 注册内容。

## Fish Config 自动 Source

要在每个 fish 会话中自动 source ROS 2，添加到 `~/.config/fish/config.fish`：

```fish
# ROS 2 基础环境
if test -f /opt/ros/jazzy/setup.fish
    source /opt/ros/jazzy/setup.fish
end

# 你的工作空间（可选）
if test -f ~/ros2_ws/install/setup.fish
    source ~/ros2_ws/install/setup.fish
end
```

## 调试

启用跟踪输出以查看配置脚本执行的每个命令：

```fish
set -gx COLCON_TRACE 1
source install/setup.fish
```

多次 source `setup.fish` 是安全的 — 环境变量会去重。

## 设计

Fish 不兼容 POSIX，因此无法 source `.sh` 脚本。colcon-fish 注册为主 shell 扩展（优先级 200），独立于 `sh` 扩展生成原生 `.fish` 脚本。

插件使用正确的 fish 列表语法处理 fish 的原生列表变量（`PATH`、`MANPATH`、`CDPATH`），同时对其他变量如 `CMAKE_PREFIX_PATH` 使用冒号分隔的字符串 — 与 [ament_package](https://github.com/ament/ament_package) 的行为一致。

对于构建时环境（`generate_command_environment`），插件回退到 `sh` 扩展，因为构建本身不需要 fish 特有的功能。
