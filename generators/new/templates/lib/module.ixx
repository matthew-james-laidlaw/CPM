module;

#include <string>

export module <%= libName %>;

export namespace <%= libName %>
{

    auto version() -> std::string
    {
        return "0.1.0";
    }

}
