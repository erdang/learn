// 二叉树的遍历指的是按照某种顺序，依次访问二叉树的每个节点，有且访问一次。

// 二叉树的遍历有以下三种

// （1）前序遍历，从根节点，到左子树，再到右子树，简称根左右。

// （2）中序遍历，从左节点，到根节点，再到右子树，简称左根右。

// （3）后序遍历，从左子树，到右子树，再到根节点，简称左右根。//三种遍历方法仅仅是交换了代码的运行顺序而已
// var tree = {
//   value: 1,
//   left: {
//    value: 2,
//    left: {
//     value: 4
//    }
//   },
//   right: {
//    value: 3,
//    left: {
//     value: 5,
//     left: {
//      value: 7
//     },
//     right: {
//      value: 8
//     }
//    },
//    right: {
//     value: 6
//    }
//   }
//  }
function Node(data,left,right){
  this.data=data;
  this.left=left;
  this.right=right;
}

function Tree(){
  this.root=null;
}

Tree.prototype={

  //创建二叉树
  create: function(){
      var b=new Node(2,new Node(4),new Node(5));
      var c=new Node(3,new Node(6),new Node(7));
      this.root=new Node(1,b,c);
  },

  //前序遍历
  preTravel: function(root){
      if(root==null){
          return;
      }

      console.log(root.data);
      this.preTravel(root.left);
      this.preTravel(root.right);
  },

  //中序遍历
  middleTravel: function(root){
      if(root==null){
          return;
      }

      this.middleTravel(root.left);
      console.log(root.data);
      this.middleTravel(root.right);
  },

  //后序遍历
  postTravel: function(root){
      if(root==null){
          return;
      }

      this.middleTravel(root.left);
      this.middleTravel(root.right);
      console.log(root.data);
  }    
}

var tree=new Tree();
tree.create();
tree.preTravel(tree.root);
tree.middleTravel(tree.root);
tree.postTravel(tree.root);