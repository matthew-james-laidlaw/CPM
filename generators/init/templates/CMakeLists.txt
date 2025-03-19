cmake_minimum_required(VERSION 3.29.3)

project(<%= projectName %> LANGUAGES CXX)

include(GoogleTest)
enable_testing()

include(cmake/cpm.cmake)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_subdirectory(extern)

cpm_initialize_unit_tests()

add_subdirectory(libs)
add_subdirectory(apps)

cpm_install_targets(unit_tests)
gtest_discover_tests(unit_tests)
