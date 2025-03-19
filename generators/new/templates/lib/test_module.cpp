import <%= libName %>;

#include <gtest/gtest.h>

using namespace <%= libName %>;

TEST(<%= libName %>_tests, addition)
{
    EXPECT_EQ(add(1, 2), 3);
}

TEST(<%= libName %>_tests, subtraction)
{
    EXPECT_EQ(sub(3, 2), 1);
}

TEST(<%= libName %>_tests, multiplication)
{
    EXPECT_EQ(mul(2, 3), 6);
}

TEST(<%= libName %>_tests, division)
{
    EXPECT_EQ(div(6, 3), 2);
}
