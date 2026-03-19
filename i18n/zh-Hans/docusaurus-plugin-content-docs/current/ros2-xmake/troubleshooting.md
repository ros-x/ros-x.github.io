---
sidebar_position: 3
title: 故障排查
---

# 故障排查

## 找不到 `xmake`

**症状：** 构建失败，提示 `Could not find 'xmake' executable in PATH`

**解决方法：** 确保 `xmake` 已安装并在 `PATH` 中。可以通过 [xlings](https://github.com/d2learn/xlings) 快速安装：

```bash
curl -fsSL https://raw.githubusercontent.com/d2learn/xlings/refs/heads/main/tools/other/quick_install.sh | bash
xlings install xmake
```

使用 `which xmake` 验证。

## 工具链 shim 拦截 `gcc` / `g++` / `ar`

**症状：** 构建失败，出现类似 `no version set for 'g++'` 的 shim 管理器错误。

**解决方法：** 强制使用系统工具链：

```bash
export PATH=/usr/bin:/bin:/usr/local/bin:$PATH
export CC=/usr/bin/gcc CXX=/usr/bin/g++
export AR=/usr/bin/ar RANLIB=/usr/bin/ranlib
```

## `unknown rule(ament_xmake.package)`

**症状：** xmake 找不到自定义规则。

**解决方法：**
- 确保 `ament_xmake` 包已在工作空间中先行构建
- 确保 `AMENT_PREFIX_PATH` 包含工作空间的安装路径

## PEP 668 pip 安装错误

**症状：** `externally-managed-environment`

**解决方法：** 使用 `pip install --break-system-packages colcon-xmake` 或使用虚拟环境。

## 下游链接目标缺失

**症状：** 找不到 `demo_xmake_cpp::demo_xmake_cpp`

**解决方法：** 重新构建 `demo_xmake_cpp`，检查 `install/demo_xmake_cpp/share/demo_xmake_cpp/cmake/demo_xmake_cppConfig.cmake` 是否存在。
