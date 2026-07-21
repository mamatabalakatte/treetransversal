import createModule from './wasm/tree.js';

function vectorToArray(vec) {
  const arr = [];
  for (let i = 0; i < vec.size(); i++) arr.push(vec.get(i));
  return arr;
}

(async () => {
  const Module = await createModule();
  const tree = new Module.BST();

  tree.insert(50);
  tree.insert(30);
  tree.insert(70);

  console.log('Inorder:', vectorToArray(tree.inorder()).join(' -> '));
  console.log('Preorder:', vectorToArray(tree.preorder()).join(' -> '));
  console.log('Postorder:', vectorToArray(tree.postorder()).join(' -> '));

  console.log('Search 30:', tree.search(30));
  tree.remove(30);
  console.log('Search 30 after delete:', tree.search(30));
  console.log('Inorder after delete:', vectorToArray(tree.inorder()).join(' -> '));
})();
