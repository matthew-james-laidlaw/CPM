# add additional source files here
set(<%= appName %>_SOURCES
    main.cpp
)

# add additional link targets here
set($<%= appName %>_LIBRARIES

)

yo_create_application(<%= appName %> <%= appName %>_SOURCES <%= appName %>_LIBRARIES)
