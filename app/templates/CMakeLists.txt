cmake_minimum_required(VERSION 3.29.3)

project(TEMPLATE LANGUAGES CXX)

include(GoogleTest)
enable_testing()

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

function(add_targets_to_bin)
    foreach (target ${ARGN})
        set_target_properties(${target} PROPERTIES
            ARCHIVE_OUTPUT_DIRECTORY "${PROJECT_BINARY_DIR}/bin/$<LOWER_CASE:$<CONFIG>>"
            LIBRARY_OUTPUT_DIRECTORY "${PROJECT_BINARY_DIR}/bin/$<LOWER_CASE:$<CONFIG>>"
            RUNTIME_OUTPUT_DIRECTORY "${PROJECT_BINARY_DIR}/bin/$<LOWER_CASE:$<CONFIG>>"
        )
    endforeach()
endfunction()

function(initialize_unit_tests)
    set(UNIT_TESTS_MAIN ${CMAKE_BINARY_DIR}/unit_tests_main.cpp)
    file(WRITE ${UNIT_TESTS_MAIN} "// auto generated source file for unit_tests target")
    add_executable(unit_tests ${UNIT_TESTS_MAIN})
    target_link_libraries(unit_tests gtest_main)
endfunction()

function(yo_create_application target_name sources libraries)
    add_executable(${target_name} ${${sources}})
    target_link_libraries(${target_name} ${${libraries}})
    add_targets_to_bin(${target_name})
endfunction()

# function(yo_create_library target_name sources libraries

# )

add_subdirectory(extern)

initialize_unit_tests()

add_subdirectory(libs)
add_subdirectory(apps)

add_targets_to_bin(unit_tests)
gtest_discover_tests(unit_tests)
