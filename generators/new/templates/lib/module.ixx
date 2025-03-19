module;

#include <string>

export module <%= libName %>;

export namespace <%= libName %>
{

template <typename >T
auto add(T a, T b) -> int
{
    return a + b;
}

template <typename >T
auto sub(T a, T b) -> int
{
    return a - b;
}

template <typename >T
auto mul(T a, T b) -> int
{
    return a * b;
}

template <typename >T
auto div(T a, T b) -> int
{
    return a / b;
}

}
