# CPM
CPM is an opinionated C++ project manager that manages the file system and build tooling for a cmake-based build system allowing you to focus on development. It defines a folder structure convention and provides commands for adding new libraries and command line tools. This focuses direct cmake management down to a few key locations. This project utilizes [Yeoman](https://yeoman.io/) for defining the file structure and [Commander](https://github.com/tj/commander.js) for wrapping Yeoman commands in a friendlier command line interface.

## Requirements
(These are just the tested requirements, feel free to test lower versions).
- CMake (>= 3.29.3)
- Node (>= 22.4.1)
- npm (>= 10.8.2)

## Installation
This project is currently only set up for a local install, as of yet there is no packaging of any kind other than source.
```
git clone https://github.com/matthew-james-laidlaw/cpm.git
cd cpm
npm install -g yo
npm install
npm link
```

## Usage
```
# create, and jump into, your desired project directory
mkdir myapp
cd myapp

# initialize a C++ project called `myapp` in this directory
npm init

# add a command line application and a library to the project called `myapp_cli` and `myapp_lib`
npm new --app myapp_cli
npm new --lib myapp_lib

# build and test the sample code with release flags
npm build --release
npm test --release
```

## Project Structure

A CPM project follows a specific folder structure to organize the code and build files. Below is an overview of the folder structure:

```
<project-name>/
├── apps/
│   ├── CMakeLists.txt
│   └── <app_name>/
│       ├── CMakeLists.txt
│       └── ... sources ...
├── cmake/
├── extern/
├── libs/
│   ├── CMakeLists.txt
│   └── <lib-name>/
│       ├── CMakeLists.txt
│       ├── ... sources ...
│       └── test_<lib-name>.cpp
├── .gitignore
├── CMakeLists.txt
└── CMakePresets.json
```

### Key Files and Directories

- **apps/**: Contains subdirectories for each application. Each application has its own `CMakeLists.txt` and source files.
- **cmake/**: Contains custom CMake modules, such as `cpm.cmake`, which defines functions for creating and managing targets.
- **extern/**: Contains external dependencies, such as GoogleTest.
- **libs/**: Contains subdirectories for each library. Each library has its own `CMakeLists.txt`, module interface file (`.ixx`), and test files.
- **CMakeLists.txt**: The main CMake file that includes subdirectories and sets up the project.
- **CMakePresets.json**: Defines CMake presets for different build configurations.

### Making CMake Changes

Users will need to make changes in the following places:

- **<app-name>/CMakeLists.txt**: Define source files and link libraries for each application.
- **<lib-name>/CMakeLists.txt**: Define source files and link libraries for each library.

By following this structure and making changes in these specific files, users can easily manage their C++ projects with CPM.

## Todo
- Support GitHub Actions
- Support formatting, static analysis, and sanitizer builds
- Support Benchmarking via Google Benchmark
- Integration test the `cpm` command line tool
- Create formal npm distribution
- Support conan and/or vcpkg package managers
- Support IDE's like VSCode or Fleet
