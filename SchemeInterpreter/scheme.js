//minimal scheme interpreter in Javascript
function ASTnode(value, parent) {
  //console.log('ASTnode:'+value+' <= ('+parent.value+')');
  console.log(value);
  this.value = value;
  this.children = [];
  this.parent = parent;
}

//build the AST tree
function parse(code, pNode){
  console.log(code);
  //pNode -> parent of current node
  code = code.toString().trim();
  var node;
  if(code.indexOf(' ') < 0)
    node = new ASTnode(code, pNode);
  else {
    //get the operahand
    var breaks=[code.indexOf(' '),code.indexOf('('),code.indexOf(')')];
    for(var j=0; j<breaks.length; j++) {
      if(breaks[j]<0) {
        breaks.splice(j,1); j--;
      }
    }
    //console.log(breaks);
    var operandEndIndex = Math.min.apply(null,breaks);
    var operand = code.substring(0, operandEndIndex);
    //current node
    node = new ASTnode(operand, pNode);
    var pStack = [];
    var values = "";
    var valueFlag = false;
    for(var i=operandEndIndex; i<code.length; i++){
      if(code[i]==='(')
        pStack.push(i);
      else if(code[i]===')'){
        if(pStack.length===1) {
          node.children.push( parse(code.substring(pStack.pop()+1, i), node) );
          flag = false;
        }
        pStack.pop();
      }

      //if not in a pair of ( )
      if(pStack.length===0){
        //empty charactor or end of string mark the end of a value
        if(code[i]===' ' || code[i]==='(' || code[i]===')') {
          if(values!==""){
            node.children.push(new ASTnode(values, node) );
            values = ""; //clear values
          }
        }
        else{
          values += code[i];
          if(code.length-1===i){
            node.children.push(new ASTnode(values, node) );
          }
        }
      }
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
  //var input=' (+ 6 10)';
  input = input.trim();

  var root = new ASTnode("root", "NoParent");
  parse(input.substring(1, input.length-1), root);
  console.log(root);
  //console.log(evalue(parse(input)));
}

document.getElementById("compute").addEventListener("click", run);
