// new Compile(el, vm)
//22
//实现一个指令解析器Compile，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数
class Compile {
  constructor(el, vm) {
    this.$vm = vm;
    this.$el = document.querySelector(el);

    if (this.$el) {
      // 提取宿主中模板内容到Fragment标签，dom操作会提高效率
      this.$fragment = this.node2Fragment(this.$el);
      // 编译模板内容，同时进行依赖收集
      this.compile(this.$fragment);
      this.$el.appendChild(this.$fragment);
    }
  }

  node2Fragment(el) {
    const fragment = document.createDocumentFragment();
    let child;
    while ((child = el.firstChild)) {
      fragment.appendChild(child);
    }
    return fragment;
  }
  compile(el) {
    const childNodes = el.childNodes;

    Array.from(childNodes).forEach(node => {
      // 判断节点类型
      if (node.nodeType === 1) {
        // element节点
        // console.log('编译元素节点'+node.nodeName);
        this.compileElement(node);
      } else if (this.isInterpolation(node)) {
        // 插值表达式
        // console.log('编译插值文本'+node.textContent);
        this.compileText(node);
      }

      // 递归子节点
      if (node.childNodes && node.childNodes.length > 0) {
        this.compile(node);
      }
    });
  }

  isInterpolation(node) {
    // 是文本且符合{{}}
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
  }

  compileElement(node) {
    // <div k-model="foo" k-text="test" @click="onClick">
    let nodeAttrs = node.attributes;
    Array.from(nodeAttrs).forEach(attr => {
      const attrName = attr.name;
      const exp = attr.value;
      if (this.isDirective(attrName)) {
        const dir = attrName.substring(2);
        this[dir] && this[dir](node, this.$vm, exp);
      }
      if (this.isEvent(attrName)) {
        const dir = attrName.substring(1);
        this.eventHandler(node, this.$vm, exp, dir);
      }
    });
  }
  isDirective(attr) {
    return attr.indexOf("k-") === 0;
  }

  isEvent(attr) {
    return attr.indexOf("@") === 0;
  }
  compileText(node) {
    console.log(RegExp.$1);

    this.update(node, this.$vm, RegExp.$1, "text");
  }

  update(node, vm, exp, dir) {
    let updatrFn = this[dir + "Updater"];
    //// 第一次初始化视图
    updatrFn && updatrFn(node, vm[exp]);
    // 依赖收集 实例化订阅者，此操作会在对应的属性消息订阅器中添加了该订阅者watcher
    new Watcher(vm, exp, function(value) {
      //一旦属性值有变化，会收到通知执行此更新函数，更新视图
      updatrFn && updatrFn(node, value);
    });
  }
  text(node, vm, exp) {
    this.update(node, vm, exp, "text");
  }
  textUpdater(node, val) {
    node.textContent = val;
  }

  eventHandler(node, vm, exp, dir) {
    const fn = vm.$options.methods && vm.$options.methods[exp];
    if (dir && fn) {
      node.addEventListener(dir, fn.bind(vm));
    }
  }

  html(node, vm, exp) {
    this.update(node, vm, exp, "html");
  }

  model(node, vm, exp) {
    // data -> view
    this.update(node, vm, exp, "model");
    // view -> data
    node.addEventListener("input", e => {
      vm[exp] = e.target.value;
    });
  }

  htmlUpdater(node, value) {
    node.innerHTML = value;
  }

  modelUpdater(node, value) {
    node.value = value;
  }
}
