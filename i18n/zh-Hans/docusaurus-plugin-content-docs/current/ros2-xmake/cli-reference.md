---
sidebar_position: 7
title: CLI 参考
---

# CLI 参考

colcon-xmake 为 `colcon build` 和 `colcon test` 添加了控制 xmake 行为的 CLI 参数。

## 构建类型

有两种构建类型可以激活 xmake 集成：

| 构建类型 | 使用场景 | 描述 |
|------------|-----------|-------------|
| `xmake` | 通用 xmake 包 | 不带 ROS ament 集成的直接 xmake 构建 |
| `ament_xmake` | ROS 2 包 | 完整 ROS 集成：ament 索引、CMake Config 导出、rosidl 流水线 |

在 `package.xml` 中设置构建类型：

```xml
<export>
  <build_type>ament_xmake</build_type>
</export>
```

## colcon build 参数

### --xmake-config-args

向 xmake 配置步骤（`xmake f`）传递参数。

```bash
colcon build --xmake-config-args -m=debug --toolchain=gcc
```

### --xmake-build-args

向 xmake 构建步骤（`xmake build`）传递参数。

```bash
colcon build --xmake-build-args -j8 -v
```

### --xmake-install-args

向 xmake 安装步骤（`xmake install`）传递参数。

```bash
colcon build --xmake-install-args -v
```

### --xmake-timeout

每个 xmake 命令的超时时间（秒）。接受整数值。

```bash
colcon build --xmake-timeout 300
```

### --xmake-skip-install

完全跳过 xmake 安装步骤。在迭代开发中只需编译时很有用。

```bash
colcon build --xmake-skip-install
```

### --ament-xmake-args

专门向 `build_type=ament_xmake` 的包传递额外参数。这些参数会转发到 xmake 配置步骤。

```bash
colcon build --ament-xmake-args --policies=build.warning:n
```

## colcon test 参数

### --xmake-test-args

向 xmake 测试步骤（`xmake test`）传递参数。

```bash
colcon test --xmake-test-args -v --group=unit
```

### --xmake-timeout

测试执行的超时时间（秒），与构建使用相同的参数。

```bash
colcon test --xmake-timeout 120
```

## 受管参数

以下参数由 colcon-xmake 插件管理，**不应手动设置**：

| 参数 | 原因 |
|-----------|--------|
| `--builddir` / `-o` | 由 colcon 设置为包的构建目录 |
| `--installdir` | 由 colcon 设置为工作空间安装目录 |

这些参数会根据 colcon 工作空间布局自动配置。

## 示例

以调试模式构建所有包：
```bash
colcon build --xmake-config-args -m=debug --event-handlers console_direct+
```

使用详细输出和 4 个并行任务构建：
```bash
colcon build --xmake-build-args -j4 -v
```

使用增加的超时时间运行测试：
```bash
colcon test --xmake-timeout 300 --event-handlers console_direct+
colcon test-result --verbose
```

仅为 ament_xmake 包传递自定义参数：
```bash
colcon build --ament-xmake-args --policies=build.warning:n
```
