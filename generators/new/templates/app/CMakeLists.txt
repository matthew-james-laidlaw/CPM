# add additional source files here
set(<%= appName %>_SOURCES
    main.cpp
)

# add additional link targets here
set(<%= appName %>_LIBRARIES

)

cpm_create_app(<%= appName %> <%= appName %>_SOURCES <%= appName %>_LIBRARIES)
