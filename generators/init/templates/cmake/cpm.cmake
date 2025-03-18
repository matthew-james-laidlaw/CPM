function(cpm_install_targets)
    foreach (target ${ARGN})
        set_target_properties(${target} PROPERTIES
            ARCHIVE_OUTPUT_DIRECTORY "${PROJECT_BINARY_DIR}/bin/$<LOWER_CASE:$<CONFIG>>"
            LIBRARY_OUTPUT_DIRECTORY "${PROJECT_BINARY_DIR}/bin/$<LOWER_CASE:$<CONFIG>>"
            RUNTIME_OUTPUT_DIRECTORY "${PROJECT_BINARY_DIR}/bin/$<LOWER_CASE:$<CONFIG>>"
        )
    endforeach()
endfunction()

function(cpm_initialize_unit_tests)
    set(UNIT_TESTS_MAIN ${CMAKE_BINARY_DIR}/unit_tests_main.cpp)
    file(WRITE ${UNIT_TESTS_MAIN} "// auto generated source file for unit_tests target")
    add_executable(unit_tests ${UNIT_TESTS_MAIN})
    target_link_libraries(unit_tests gtest_main)
endfunction()

function(cpm_create_app target_name sources libraries)
    add_executable(${target_name} ${${sources}})
    target_link_libraries(${target_name} ${${libraries}})
    cpm_install_targets(${target_name})
endfunction()

function(cpm_create_lib target_name sources libraries)
    add_library(${target_name})

    target_sources(${target_name}
        PUBLIC
            FILE_SET cxx_modules
            TYPE CXX_MODULES
            FILES ${${sources}}
    )

    add_library(test_${target_name})
    target_sources(test_${target_name} PUBLIC test_${target_name}.cpp)

    target_link_libraries(test_${target_name} ${target_name} gtest)
    target_link_libraries(unit_tests test_${target_name})

    cpm_install_targets(${target_name})
endfunction()
