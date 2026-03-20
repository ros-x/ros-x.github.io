---
sidebar_position: 2
title: 从 ament_cmake 迁移
---

# 从 `ament_cmake` 迁移到 `ament_xmake`

## package.xml

- 将 `<build_type>ament_cmake</build_type>` 替换为 `<build_type>ament_xmake</build_type>`
- 将 `<buildtool_depend>ament_cmake</buildtool_depend>` 替换为 `<buildtool_depend>ament_xmake</buildtool_depend>`

## 构建脚本

- 将 `CMakeLists.txt` 替换为 `xmake.lua`
- 直接使用规则：

```lua
add_rules("ament_xmake.package")
```

`colcon-xmake` 通过内部包装文件自动注入规则。

## 必需的输出

`ament_xmake` 包必须安装：
- `package.xml` → `share/<pkg>/package.xml`
- ament 索引标记 → `share/ament_index/resource_index/packages/<pkg>`

使用规则时会自动生成这些文件。
