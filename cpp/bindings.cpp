#include <emscripten/bind.h>
#include "tree.h"

using namespace emscripten;

EMSCRIPTEN_BINDINGS(tree_module) {

    register_vector<int>("VectorInt");

    class_<BST>("BST")
        .constructor<>()
        .function("insert",
            static_cast<void (BST::*)(int)>(&BST::insert))
        .function("remove",
            static_cast<void (BST::*)(int)>(&BST::remove))
        .function("search",
            static_cast<bool (BST::*)(int)>(&BST::search))
        .function("preorder",
            static_cast<std::vector<int> (BST::*)()>(&BST::preorder))
        .function("inorder",
            static_cast<std::vector<int> (BST::*)()>(&BST::inorder))
        .function("postorder",
            static_cast<std::vector<int> (BST::*)()>(&BST::postorder))
        .function("toArray",
            static_cast<std::vector<int> (BST::*)()>(&BST::toArray))
        .function("height",
            static_cast<int (BST::*)()>(&BST::height))
        .function("countNodes",
            static_cast<int (BST::*)()>(&BST::countNodes))
        .function("countLeaves",
            static_cast<int (BST::*)()>(&BST::countLeaves));
}