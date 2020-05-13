import React, { Component } from "react";

export default class TreeNode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }
  handle = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  };
  render() {
    const { title, children } = this.props.treeData;
    const { expanded } = this.state;
    const hasChildren = children && children.length > 0;
    return (
      <div>
        <div className="nodeInner" onClick={this.handle}>
          {hasChildren && (
            <i className={"tri " + (expanded ? "tri-open" : "tri-close")}></i>
          )}
          <span>{title}</span>
        </div>
        {expanded &&
          hasChildren &&
          children.map((item, index) => {
            return <TreeNode treeData={item} key={index}></TreeNode>;
          })}
      </div>
    );
  }
}
