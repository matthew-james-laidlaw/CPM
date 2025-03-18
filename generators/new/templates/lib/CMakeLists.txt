# add additional source files here
set(<%= libName %>_SOURCES
    module.ixx
)

# add additional link targets here
set($<%= libName %>_LIBRARIES

)

yo_create_library(<%= libName %> <%= libName %>_SOURCES <%= libName %>_LIBRARIES)
