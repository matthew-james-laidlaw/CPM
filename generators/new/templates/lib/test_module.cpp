#include <gtest/gtest.h>

TEST(<%= libName %>_tests, GOOD)
{
    EXPECT_TRUE(true);
}

TEST(<%= libName %>_tests, BAD)
{
    EXPECT_TRUE(false);    
}
