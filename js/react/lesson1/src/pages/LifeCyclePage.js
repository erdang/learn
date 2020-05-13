import React, { Component } from "react";

export default class LifeCyclePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
    console.log("constructor");
  }
  // componentWillMount() {
  //   console.log("componentWillMount");
  // }

  componentDidMount() {
    console.log("componentDidMount");
  }
  shouldComponentUpdate() {
    console.log("shouldComponentUpdate");
    return true;
  }
  // componentWillUpdate() {
  //   console.log("componentWillUpdate");
  // }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate", snapshot);
  }
  setCounter = () => {
    this.setState({
      counter: this.state.counter + 1,
    });
    this.setState({
      counter: this.state.counter + 2,
    });
    // setTimeout(() => {
    //   this.setState({
    //     counter: this.state.counter + 1,
    //   });
    //   console.log(this.state.counter);
    // }, 0);
    this.setState((nextState, props) => {
        console.log(nextState);
        return {
          counter: nextState.counter + 1,
        }
    },()=>{
      console.log(this.state.counter);
    })
    console.log(this.state.counter);
  };
  static getDerivedStateFromProps(props, state) {
    console.log("getDerivedStateFromProps", state);
    return { counter: state.counter };
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("getSnapshotBeforeUpdate", prevState);
    return { ...prevState, omg: "omg" };
  }
  render() {
    console.log("render", this.state);
    const { counter } = this.state;

    return (
      <div>
        <h3>LifeCyclePage</h3>
        <button onClick={this.setCounter}>{counter}</button>
        {<Foo counter={counter} />}
        <div>{this.props.user.name}</div>
      </div>
    );
  }
}

class Foo extends Component {
  // componentWillReceiveProps() {
  //   console.log("Foo componentWillReceiveProps", this.props);
  // }
  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  render() {
    const { counter } = this.props;
    //console.log("render", this.state);
    return (
      <div>
        <p>{counter}</p>
      </div>
    );
  }
}
