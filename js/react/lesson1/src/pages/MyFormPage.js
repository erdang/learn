import React, { Component } from "react";
import { Form, FormItem, Input } from "../components/Form";
import kCreateForm from "../components/kCreateForm";
const Context = React.createContext();
const Provider = Context.Provider;
const Consumer = Context.Consumer;

@kCreateForm
class MyFormPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameRules: {
        required: true,
        message: "请输入名字",
      },
      passwordRules: {
        required: true,
        message: "请输入密码",
      },
    };
  }
  apply=()=>{
    const { validateFields } = this.props;
    validateFields((res,err)=>{
      //console.log(res,err)
      if(err){
        console.log(err)
      }else{
        console.log(res)
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props;
   
    return (
      <div>
        <Form>
          <FormItem>
            {getFieldDecorator(
              "name",
              this.state.nameRules
            )(<Input type="text" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator(
              "password",
              this.state.passwordRules
            )(<Input type="password" />)}
          </FormItem>
          <FormItem>
            <Input type="button" value="提交" onClick={this.apply}/>
          </FormItem>
        </Form>
      </div>
    );
  }
}
export default MyFormPage;
