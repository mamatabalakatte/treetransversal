#ifndef TREE_H
#define TREE_H

#include <vector>

struct Node {
    int data;
    Node* left;
    Node* right;

    Node(int value);
};

class BST {
private:
    Node* root;

    Node* insert(Node* node, int value);
    Node* remove(Node* node, int value);
    Node* findMin(Node* node);
    bool search(Node* node, int value);

    void preorder(Node* node, std::vector<int>& result);
    void inorder(Node* node, std::vector<int>& result);
    void postorder(Node* node, std::vector<int>& result);

    int height(Node* node);
    int countNodes(Node* node);
    int countLeaves(Node* node);

public:
    BST();

    void insert(int value);
    void remove(int value);
    bool search(int value);

    std::vector<int> preorder();
    std::vector<int> inorder();
    std::vector<int> postorder();

    int height();
    int countNodes();
    int countLeaves();

    Node* getRoot();
    std::vector<int> toArray();
};

#endif