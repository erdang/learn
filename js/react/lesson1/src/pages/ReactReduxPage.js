import React, { Component } from "react";
import { connect } from "react-redux";

class ReactReduxPage extends Component {
  componentDidMount() {}

  render() {
    console.log(this.props);
    const { num, add, minus, asyAdd } = this.props;
    return (
      <div>
        <h1>ReduxPage</h1>
        <p>{num}</p>
        <button onClick={add}>add</button>
        <button onClick={minus}>minus</button>
        <button onClick={asyAdd}>asyAdd</button>
      </div>
    );
  }
}
export default connect(
  (state) => {
    return {
      num: state.counter,
    };
  },
  {
    add: () => {
      return { type: "add" };
    },
    minus: () => {
      return { type: "minus" };
    },
    asyAdd: () => dispatch=>{
        setTimeout(()=>{
            dispatch({
                type:'add'
            })
        },1000)
    }
  }
)(ReactReduxPage);
