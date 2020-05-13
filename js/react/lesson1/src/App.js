import React from "react";
import logo from "./logo.svg";
import "./App.css";
import LifeCyclePage from './pages/LifeCyclePage';
import HocPage from './pages/HocPage';
import HomePage from './pages/HomePage';
import HookPage from './pages/HookPage';
import MyFormPage from './pages/MyFormPage';
import { UseReducerPage } from "./pages/UseReducerPage";
import Dialog from './components/Dialog';
import TreeNode from "./components/TreeNode";
import ReducePage from './pages/ReducePage';
import ReduxPage from './pages/ReduxPage';
import ReactReduxPage from './pages/ReactReduxPage';
import MyKreduxPage from './pages/MyKreduxPage';
const Context = React.createContext();
const Provider = Context.Provider;
const Consumer = Context.Consumer;

const state ={
  user:{
    name:'jerry'
  }
}
const treeData = {
  key: 0, //标识唯一性
  title: "全国", //节点名称显示
  children: [
    //子节点数组
    {
      key: 6,
      title: "北方区域",
      children: [
        {
          key: 1,
          title: "黑龙江省",
          children: [
            {
              key: 6,
              title: "哈尔滨",
            },
          ],
        },
        {
          key: 2,
          title: "北京",
        },
      ],
    },
    {
      key: 3,
      title: "南方区域",
      children: [
        {
          key: 4,
          title: "上海",
        },
        {
          key: 5,
          title: "深圳",
        },
      ],
    },
  ],
};
function App() {
  return (
    <div className="App">
      {/* <Provider value={state}>
        <Consumer>
          {(ctx) => {
            return <LifeCyclePage {...ctx} />;
          }}
        </Consumer>
      </Provider> */}
      <HocPage/>
      <HomePage/>
      <HookPage/>
      <UseReducerPage/>
      {/* <MyFormPage/> */}
     {/* <Dialog> 
       <header>dasda</header>
     </Dialog>
     <TreeNode treeData={treeData}></TreeNode> */}
     {/* <ReducePage/> */}
     {/* <ReduxPage></ReduxPage> */}
     {/* <ReactReduxPage></ReactReduxPage> */}
     <MyKreduxPage></MyKreduxPage>
    </div>
  );
}

export default App;
