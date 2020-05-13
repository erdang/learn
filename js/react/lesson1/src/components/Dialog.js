import React, { Component } from "react";
import { createPortal } from "react-dom";

export default class Dialog extends Component {
  constructor(props) {
    super(props);
    const doc = window.document;
    this.node = document.createElement("div");
    this.node.id = "abcc";
    doc.body.appendChild(this.node);
  }
  componentWillUnmount() {
    window.document.body.removeChild(this.node);
  }
  close=()=>{
      if(this.node){
        window.document.body.removeChild(this.node);
      }
  }
  render() {
    return createPortal(
        <div>
            {this.props.children}
            <div onClick={this.close}>关闭</div>
        </div>,
        this.node
    );
  }
}
