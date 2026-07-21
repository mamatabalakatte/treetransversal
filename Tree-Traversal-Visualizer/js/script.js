import createModule from "../wasm/tree.js";

const Module = await createModule();
const tree = new Module.BST();

const input = document.getElementById("valueInput");
const output = document.getElementById("output");
const svg = document.getElementById("treeCanvas");

// JS-side BST for visualization (keeps layout independent of WASM)
class JSNode {
    constructor(value){ this.value = value; this.left = null; this.right = null; }
}

class JSTree {
    constructor(){ this.root = null; }
    insert(value){ this.root = this._insert(this.root, value); }
    _insert(node, value){
        if (!node) return new JSNode(value);
        if (value < node.value) node.left = this._insert(node.left, value);
        else if (value > node.value) node.right = this._insert(node.right, value);
        return node;
    }
    search(value){ return this._search(this.root, value); }
    _search(node, value){ if (!node) return false; if (node.value===value) return true; return value<node.value?this._search(node.left,value):this._search(node.right,value); }
    remove(value){ this.root = this._remove(this.root, value); }
    _remove(node, value){
        if (!node) return null;
        if (value < node.value) node.left = this._remove(node.left, value);
        else if (value > node.value) node.right = this._remove(node.right, value);
        else {
            if (!node.left) return node.right;
            if (!node.right) return node.left;
            // find min in right
            let min = node.right;
            while(min.left) min = min.left;
            node.value = min.value;
            node.right = this._remove(node.right, min.value);
        }
        return node;
    }
    // return heap-like array with nulls for missing slots
    toArray(){
        if (!this.root) return [];
        const map = new Map();
        const q = [{node:this.root, idx:0}];
        let maxIdx = 0;
        while(q.length){
            const {node, idx} = q.shift();
            map.set(idx, node.value);
            if (node.left) q.push({node:node.left, idx: idx*2+1});
            if (node.right) q.push({node:node.right, idx: idx*2+2});
            if (idx > maxIdx) maxIdx = idx;
        }
        const arr = new Array(maxIdx+1).fill(null);
        for(let i=0;i<=maxIdx;i++) if (map.has(i)) arr[i]=map.get(i);
        return arr;
    }
}

const jsTree = new JSTree();

function getValue() {
    return parseInt(input.value);
}

document.getElementById("insertBtn").onclick = () => {
    const value = getValue();

    if (isNaN(value)) return;

    tree.insert(value);
    jsTree.insert(value);
    renderTree();

    output.innerHTML = `Inserted: ${value}`;

    input.value = "";
};

document.getElementById("deleteBtn").onclick = () => {
    const value = getValue();

    if (isNaN(value)) return;

    tree.remove(value);
    jsTree.remove(value);
    renderTree();

    output.innerHTML = `Deleted: ${value}`;

    input.value = "";
};

document.getElementById("searchBtn").onclick = () => {
    const value = getValue();

    if (isNaN(value)) return;

    const found = tree.search(value);

    output.innerHTML = found
        ? `${value} found`
        : `${value} not found`;
};

function vectorToArray(vec) {
    const arr = [];

    for (let i = 0; i < vec.size(); i++) {
        arr.push(vec.get(i));
    }

    return arr;
}

document.getElementById("preorderBtn").onclick = () => {

    const result = vectorToArray(tree.preorder());

    output.innerHTML =
        "Preorder: " + result.join(" → ");
};

document.getElementById("inorderBtn").onclick = () => {

    const result = vectorToArray(tree.inorder());

    output.innerHTML =
        "Inorder: " + result.join(" → ");
};

document.getElementById("postorderBtn").onclick = () => {

    const result = vectorToArray(tree.postorder());

    output.innerHTML =
        "Postorder: " + result.join(" → ");
};

function clearSVG(){
    while(svg.firstChild) svg.removeChild(svg.firstChild);
}

function renderTree(){
    clearSVG();
    const arr = jsTree.toArray();
    if (!arr.length) return;
    const width = svg.clientWidth || 900;
    const levelCount = Math.floor(Math.log2(arr.length))+1;
    const nodeRadius = 20;

    for(let i=0;i<arr.length;i++){
        const val = arr[i];
        if (val === null) continue;
        const level = Math.floor(Math.log2(i+1));
        const indexInLevel = i - (2**level - 1);
        const nodesInLevel = 2**level;
        const x = Math.round((indexInLevel + 0.5) * (width / nodesInLevel));
        const y = 60 + level * 90;

        // draw line to parent
        if (i>0){
            const parent = Math.floor((i-1)/2);
            if (arr[parent] !== null){
                const pLevel = Math.floor(Math.log2(parent+1));
                const pIndexInLevel = parent - (2**pLevel - 1);
                const pNodesInLevel = 2**pLevel;
                const px = Math.round((pIndexInLevel + 0.5) * (width / pNodesInLevel));
                const py = 60 + pLevel * 90;
                const line = document.createElementNS('http://www.w3.org/2000/svg','line');
                line.setAttribute('x1', px);
                line.setAttribute('y1', py + nodeRadius);
                line.setAttribute('x2', x);
                line.setAttribute('y2', y - nodeRadius);
                line.setAttribute('stroke', '#333');
                line.setAttribute('stroke-width', '2');
                svg.appendChild(line);
            }
        }

        const circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', nodeRadius);
        circle.setAttribute('fill', '#1976d2');
        circle.setAttribute('stroke', '#0d47a1');
        svg.appendChild(circle);

        const text = document.createElementNS('http://www.w3.org/2000/svg','text');
        text.setAttribute('x', x);
        text.setAttribute('y', y+6);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', 'white');
        text.setAttribute('font-size', '14');
        text.textContent = val;
        svg.appendChild(text);
    }
}
