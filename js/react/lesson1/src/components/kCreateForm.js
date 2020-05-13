import React, { Component } from "react";

const kCreateForm = (Cmp) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.options = {};
    }
    handleChange = (event) => {
      let { name, value } = event.target;
      if(value == ''){
          console.log(3333)
      }
      this.setState({
        [name]: value,
      });
    };
    getFieldDecorator = (field, option) => {
      this.options[field] = option;
      return (InputCmp) => (
        <div>
          {React.cloneElement(InputCmp, {
            name: field,
            value: this.state[field] || "",
            onChange: this.handleChange,
          })}
        </div>
      );
    };
    getFieldValue = (field) => {
      return this.state[field];
    };
    validateFields = (callback) => {
        //console.log(this.options)
        const res = {...this.state};
        const op = {...this.options};
        const err=[];
        Object.keys(op).map((item)=>{
            if(op[item].required && (res[item] == undefined || res[item] == '')){
                
                err.push({[item]:op[item].message})
            }
        })
        if(err.length>0){
            callback(res,err);
        }else{
            callback(res,undefined);
        }
        
    };
    render() {
      return (
        <div>
          <Cmp
            getFieldDecorator={this.getFieldDecorator}
            getFieldValue={this.getFieldValue}
            validateFields={this.validateFields}
          ></Cmp>
        </div>
      );
    }
  };
};

export default kCreateForm;
