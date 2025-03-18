# add additional source files here
set(<%= libName %>_SOURCES
    <%= libName %>.ixx
)

# add additional link targets here
set(<%= libName %>_LIBRARIES

)

cpm_create_lib(<%= libName %> <%= libName %>_SOURCES <%= libName %>_LIBRARIES)
