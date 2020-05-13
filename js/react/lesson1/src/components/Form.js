import React, { Component } from "react";

export class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "2",
      },
    };
  }
  getb = () => {
    console.log(1222);
  };
  render() {
    return (
      <div>
        {/* <Provider value={this.state}>
            {
               <Consumer>
                 {ctx=>React.cloneElement(this.props.children,{...ctx})}
               </Consumer>
              
            }
           
          </Provider> */}

        {React.Children.map(this.props.children, (item, index) => {
          return React.cloneElement(item, {
            state: this.state,
            getb: this.getb,
            key: index,
          });
        })}
      </div>
    );
  }
}
export class FormItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="abc">
        {this.props.children}
        <div className="error"></div>
      </div>
    );
  }
}

export class Input extends Component {
  render() {
    const { type, name, value, onChange, onClick } = this.props;
    return (
      <div>
        {type == "button" ? (
          <button onClick={onClick}>{value}</button>
        ) : (
          <input
            type={type}
            name={name}
            id=""
            value={value}
            onChange={onChange}
          />
        )}
      </div>
    );
  }
}
