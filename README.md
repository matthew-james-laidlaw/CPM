# cpm
---
- Utilizes [Yeoman](https://yeoman.io/) for creating the scaffolding for a C++ project based on CMake and C++20.
- Utilizes [Commander](https://github.com/tj/commander.js) to wrap Yeoman commands in a friendlier command line interface for initializing, building, and testing C++ projects as well as adding new libraries and applications to a C++ project.

## TODO
---
- Add support for toolchain files for reproducable builds and cross compilation
- Add support for GitHub actions testing on various architectures, operating systems, and compilers
- Add support for formatting, static analysis, and sanitizer builds
- Add support for benchmarking
- Make stdout print in realtime? (if possible)
  - Also, work out when to print stdout, and when to print stderr
- Automate some integration tests that run various cpm commands and test the output
- Package this via npm or osme other distribution method
