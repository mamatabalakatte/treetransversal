#include "tree.h"
#include <queue>
#include <unordered_map>
#include <climits>

Node::Node(int value) {
    data = value;
    left = nullptr;
    right = nullptr;
}

BST::BST() {
    root = nullptr;
}

// ---------- INSERT ----------

Node* BST::insert(Node* node, int value) {
    if (node == nullptr)
        return new Node(value);

    if (value < node->data)
        node->left = insert(node->left, value);
    else if (value > node->data)
        node->right = insert(node->right, value);

    return node;
}

void BST::insert(int value) {
    root = insert(root, value);
}

// ---------- SEARCH ----------

bool BST::search(Node* node, int value) {
    if (node == nullptr)
        return false;

    if (node->data == value)
        return true;

    if (value < node->data)
        return search(node->left, value);

    return search(node->right, value);
}

bool BST::search(int value) {
    return search(root, value);
}

// ---------- FIND MIN ----------

Node* BST::findMin(Node* node) {
    while (node && node->left != nullptr)
        node = node->left;

    return node;
}

// ---------- DELETE ----------

Node* BST::remove(Node* node, int value) {

    if (node == nullptr)
        return nullptr;

    if (value < node->data) {
        node->left = remove(node->left, value);
    }
    else if (value > node->data) {
        node->right = remove(node->right, value);
    }
    else {

        if (node->left == nullptr) {
            Node* temp = node->right;
            delete node;
            return temp;
        }

        if (node->right == nullptr) {
            Node* temp = node->left;
            delete node;
            return temp;
        }

        Node* temp = findMin(node->right);
        node->data = temp->data;
        node->right = remove(node->right, temp->data);
    }

    return node;
}

void BST::remove(int value) {
    root = remove(root, value);
}

// ---------- PREORDER ----------

void BST::preorder(Node* node, std::vector<int>& result) {

    if (node == nullptr)
        return;

    result.push_back(node->data);

    preorder(node->left, result);
    preorder(node->right, result);
}

std::vector<int> BST::preorder() {

    std::vector<int> result;
    preorder(root, result);

    return result;
}

// ---------- INORDER ----------

void BST::inorder(Node* node, std::vector<int>& result) {

    if (node == nullptr)
        return;

    inorder(node->left, result);

    result.push_back(node->data);

    inorder(node->right, result);
}

std::vector<int> BST::inorder() {

    std::vector<int> result;
    inorder(root, result);

    return result;
}

// ---------- POSTORDER ----------

void BST::postorder(Node* node, std::vector<int>& result) {

    if (node == nullptr)
        return;

    postorder(node->left, result);
    postorder(node->right, result);

    result.push_back(node->data);
}

std::vector<int> BST::postorder() {

    std::vector<int> result;
    postorder(root, result);

    return result;
}

// ---------- HEIGHT ----------

int BST::height(Node* node) {

    if (node == nullptr)
        return 0;

    int leftHeight = height(node->left);
    int rightHeight = height(node->right);

    return 1 + (leftHeight > rightHeight ? leftHeight : rightHeight);
}

int BST::height() {
    return height(root);
}

// ---------- COUNT NODES ----------

int BST::countNodes(Node* node) {

    if (node == nullptr)
        return 0;

    return 1 + countNodes(node->left) + countNodes(node->right);
}

int BST::countNodes() {
    return countNodes(root);
}

// ---------- COUNT LEAVES ----------

int BST::countLeaves(Node* node) {

    if (node == nullptr)
        return 0;

    if (node->left == nullptr && node->right == nullptr)
        return 1;

    return countLeaves(node->left) + countLeaves(node->right);
}

int BST::countLeaves() {
    return countLeaves(root);
}

// ---------- ROOT ----------

Node* BST::getRoot() {
    return root;
}

// Serialize tree into array using heap-like indices. Empty slots are INT_MIN.
std::vector<int> BST::toArray() {
    std::vector<int> result;

    if (!root) return result;

    std::unordered_map<int,int> map;
    std::queue<std::pair<Node*, int>> q;
    q.push({root, 0});
    int maxIndex = 0;

    while (!q.empty()) {
        auto p = q.front(); q.pop();
        Node* n = p.first;
        int idx = p.second;
        map[idx] = n->data;
        if (n->left) q.push({n->left, idx*2 + 1});
        if (n->right) q.push({n->right, idx*2 + 2});
        if (idx > maxIndex) maxIndex = idx;
    }

    result.resize(maxIndex + 1, INT_MIN);
    for (int i = 0; i <= maxIndex; ++i) {
        if (map.find(i) != map.end()) result[i] = map[i];
    }

    return result;
}