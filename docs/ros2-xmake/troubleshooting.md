---
sidebar_position: 3
title: Troubleshooting
---

# Troubleshooting

## `xmake` not found

**Symptom:** Build fails with `Could not find 'xmake' executable in PATH`

**Fix:** Ensure `xmake` is installed and in `PATH`. Verify with `which xmake`.

## Toolchain shim intercepts `gcc` / `g++` / `ar`

**Symptom:** Build fails with errors like `no version set for 'g++'` from a shim manager.

**Fix:** Force system toolchain:

```bash
export PATH=/usr/bin:/bin:/usr/local/bin:$PATH
export CC=/usr/bin/gcc CXX=/usr/bin/g++
export AR=/usr/bin/ar RANLIB=/usr/bin/ranlib
```

## `unknown rule(ament_xmake.package)`

**Symptom:** xmake cannot find the custom rule.

**Fix:**
- Ensure `ament_xmake` package is built first in the workspace
- Ensure `AMENT_PREFIX_PATH` includes the workspace install prefix

## PEP 668 install error for pip

**Symptom:** `externally-managed-environment`

**Fix:** Use `pip install --break-system-packages colcon-xmake` or use a virtual environment.

## Downstream link target missing

**Symptom:** `demo_xmake_cpp::demo_xmake_cpp` not found

**Fix:** Rebuild `demo_xmake_cpp` and check that `install/demo_xmake_cpp/share/demo_xmake_cpp/cmake/demo_xmake_cppConfig.cmake` exists.
