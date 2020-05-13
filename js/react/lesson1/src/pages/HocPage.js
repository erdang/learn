import React, { Component } from 'react';

const Foo = (Cmp)=>(props)=>{
  return(
    <div style={{color:'red'}}>
      <Cmp {...props}/>
    </div>
  )
}
const foo = Cmp => props => {
  // console.log("foo", Cmp);
  return (
    <div className="border">
      <Cmp {...props} />
    </div>
  );
};



class Child extends Component {
  render() {
    return <div>Child-{this.props.name}</div>;
  }
}



@Foo
class HocPage extends Component {
  render() {
    return (
      <div>
        <Child/>
      </div>
    );
  }
}

export default HocPage;
