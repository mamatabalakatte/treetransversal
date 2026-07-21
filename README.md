



Tree Traversal Visualizer
An interactive Tree Traversal Visualizer built using C++, WebAssembly (WASM), JavaScript, HTML, and CSS. The project demonstrates tree traversal algorithms through an interactive web interface while executing the core logic in C++.

Overview
The project visualizes Binary Search Tree (BST) traversal algorithms and helps users understand how recursive tree traversals work. The C++ implementation is compiled to WebAssembly, enabling efficient execution directly in the browser.

Features
Binary Search Tree (BST) visualization

Preorder Traversal

Inorder Traversal

Postorder Traversal

Interactive visualization

C++ algorithms executed using WebAssembly

Responsive web interface

Technologies Used
Technology	Purpose
C++	Core tree algorithms
WebAssembly (WASM)	Executes C++ in the browser
JavaScript	Connects the UI with WebAssembly
HTML	Application structure
CSS	User interface styling


Project Structure
Tree-Traversal-Visualizer/
│
├── index.html
├── style.css
├── js/
│   └── script.js
├── cpp/
│   └── tree.cpp
├── wasm/
│   ├── tree.wasm
│   └── tree.js
├── app.py
├── requirements.txt
└── README.md


Project Workflow
flowchart TD
    A[index.html] --> B[script.js]
    B --> C[tree.wasm]
    C --> D[C++ Tree Algorithms]
    A --> E[style.css]


How It Works
The user opens the application in a web browser.

index.html loads the interface.

script.js loads the WebAssembly module.

The WebAssembly module executes the C++ tree algorithms.

Traversal results are returned to JavaScript.

The visualization updates in real time.

How to Run the Project
Run the Web Application
Open the project folder:

cd Tree-Traversal-Visualizer
Start a local web server:

python3 -m http.server 8000
Open the application in your browser:

http://localhost:8000/
Optional: Run the C++ Version
Compile the C++ source:

g++ main.cpp BST.cpp -o TreeVisualizer
Run the executable:

./TreeVisualizer
Project Outcomes
This project demonstrates the following concepts:

Tree Traversal Logic

Implements Preorder, Inorder, and Postorder traversal algorithms.

Demonstrates the sequence in which tree nodes are visited.

Recursion

Uses recursive functions to traverse binary trees.

Illustrates recursive processing of left and right subtrees.

Hierarchical Data Representation

Represents data using a tree structure with parent-child relationships.

Visualizes the hierarchical organization of nodes.

Algorithm Visualization

Provides an interactive, step-by-step visualization of traversal operations.

WebAssembly Integration

Executes C++ algorithms efficiently in the browser using WebAssembly.


Author
Mamata Balakatte

GitHub: https://github.com/mamatabalakatte


