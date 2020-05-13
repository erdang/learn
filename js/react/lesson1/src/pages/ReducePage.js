import React, { Component } from 'react'

export default class ReducePage extends Component {
    render() {
        const arr = [1,2,3,4,5];
        let an = arr.reduce((prev,now)=>{
            console.log(prev + '|||||'+ now)
            return prev+now;
        })
       // console.log(an);
//
        function fn1(){
            console.log('fn1')
        }
        function fn2(){
            console.log('fn2')
        }
        function fn3(){
            console.log('fn3')
        }
        function com(...fn){
            return fn.reduce((prev,now)=>{
                return (...arg)=>{
                    return now(prev(...arg))
                }
            })
        }
        //fn3(fn2(fn1()));
        com(fn1,fn2,fn3)();
        return (
            <div>
                
            </div>
        )
    }
}
