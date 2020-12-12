import React, { Component } from "react";
import store from '../store/MyKreduxStore';


class ReduxPage extends Component {
    
    componentDidMount(){
        store.subscribe(()=>{
            this.forceUpdate();
        })
    }
    add=()=>{
        store.dispatch({
            type:'add'
        })
    }
    minus=()=>{
        store.dispatch({
            type:'minus'
        })
    }
    render() {
       // console.log(store)
    return (
      <div>
        <h1>ReduxPage</h1>
        <p>{store.getState()}</p>
        <button onClick={this.add}>add</button>
        <button onClick={this.minus}>minus</button>

      </div>
    );
  }
}


export default ReduxPage