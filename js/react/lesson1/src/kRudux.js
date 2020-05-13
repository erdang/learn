export function createStore(reducer,enhancer){
    //applyMiddleware(thunk, logger)() 返回值
    console.log(enhancer)
    if(enhancer){
        return enhancer(createStore)(reducer)
    }
    let currentState = undefined;
    let currentListeners = [];

    function getState(){
        return currentState;
    }

    function subscribe(listener){
        currentListeners.push(listener);
    }

    function dispatch(action){
        currentState = reducer(currentState,action);
        currentListeners.forEach((v)=>v());
        //logger 要用到action
        return action;
    }
    dispatch({type:'随便'}) //默认执行一下 设置currentState 的默认值
    return {getState,subscribe,dispatch}
}
export function applyMiddleware(...middlewares){
   return createStore=>(...arg)=>{
       let store = createStore(...arg);
       return{
           ...store
       }
   }
}
export function thunk(){

}
export function logger(){

}