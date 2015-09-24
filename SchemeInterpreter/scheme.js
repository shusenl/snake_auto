//minimal scheme interpreter in Javascript
function ASTnode(value, parent) {
  console.log('ASTnode:'+value+' <= ('+parent.value+')');
  //console.log(value);
  this.value = value;
  this.children = [];
  this.parent = parent;
}

//build the AST tree, pNode -> parent of current node
function parseList(inputList, pNode){
  console.log(inputList);
  var node;
  if(inputList.length===1)//if is leaf
    node = new ASTnode(inputList, pNode);
  else {
    //current node
    node = new ASTnode(inputList[0], pNode);
    var pStack = [];
    for(var i=1; i<inputList.length; i++){
      if(inputList[i]==='(')
        pStack.push(i);
      else if(inputList[i]===')'){
        if(pStack.length===1)
          node.children.push( parseList(inputList.slice(pStack.pop()+1, i), node) );
        pStack.pop();
      }
      //if not in a pair of ( )
      else if(pStack.length===0)// && inputList[i]!=='(' && inputList[i]!==')')
        node.children.push(new ASTnode(inputList[i], node) );
    }
  }  
  pNode.children.push(node);
  return node;
}

function evalue(AST){
  var result;
  return result;
}

//run test
function run(){
  console.log('------------Test:-------------');
  var input=' (+ 6(* 7 14) ( -(/ 12 2) 3))  ';
  inputList=input.replace(/\(/g, ' ( ').replace(/\)/g, " ) ").trim().split(/\s+/);

  var root = new ASTnode("root", "NoParent");
  parseList(inputList.slice(1, inputList.length-1), root);
  console.log(root);
  //console.log(evalue(parse(input)));
}

document.getElementById("compute").addEventListener("click", run);