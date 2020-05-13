import React, { Component } from 'react';

class Layout extends Component {
  render() {
    console.log(this.props.children)
    return (
      <div>
        {this.props.showTable && <div>tab</div> }
        {/* {this.props.children} */}
        {this.props.children.btn}
      </div>
    );
  }
}

export default Layout;
