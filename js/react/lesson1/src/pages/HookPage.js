import React from 'react';
import { useState, useEffect,useReducer } from 'react';

const HookPage = () => {
  var [counter, setCounter] = useState(0);
  var [value, setValue] = useState('');
  var [friuts, setFriuts] = useState([]);
  const clickFn=()=>{
    setCounter(counter+1)
  }
  const addFiuts=()=>{
    setFriuts([...friuts,value])
  }
  const delFriuts=(index)=>{
    const tem = [...friuts];
    tem.splice(index,1);
    setFriuts(tem);
  }
  useEffect(()=>{
    setTimeout(()=>{
      setCounter(2);
    },1000)
  },[])
  return (
    <div>
      <div>{counter}</div>
      <button onClick={clickFn}>+++</button>
      <input type="text" value={value} onChange={(e)=>{setValue(e.target.value)}}/>
      {
        friuts.map((item,index)=>{
          return(
            <div key={index} onClick={()=>{delFriuts(index)}}>
              {item}
            </div>
          )
        })
      }
      <button onClick={addFiuts}>添加</button>
    </div>
  );
}

export default HookPage;
