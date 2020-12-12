
// const add = (x,y)=> x+y;
// const square = z=> z*z;
// const compose = (...[first,...others])=>{
//     return (...args)=>{
//         let ret = first(...args);
//         others.forEach((fn)=>{
//             ret = fn(ret)
//         })
//         return ret 
//     }
// }

// const compase = (...fns)=>{
//     return fns.reduce((prev,next)=>{
//         return (...args)=>{
//             return next(prev(...args))
//         }
//     })
// }
// let fn = compose(add,square,square);
// let fnv = compase(add,square,square);
// console.log(fnv(2,2))

function compose(middlewares){
    return function(){
        return dispatch(0)
        function dispatch(i){
            let fn = middlewares[i]
            if(!fn){
                return Promise.resolve()
            }
            return Promise.resolve(
                fn(function next(){
                    return dispatch(i + 1)
                })
            )
        }
    }
}


async function fn1(next){
    console.log('fn1')
    await next()
    console.log('end fn1')
}

async function fn2(next){
    console.log('fn2')
    await delay()
    await next()
    console.log('end fn2')
}
 
function fn3(next){
    console.log('fn3')
}

function delay(){
    return Promise.resolve(res => {
        setTimeout(() => reslove(),2000)
    })
}

const middlewares = [fn1,fn2,fn3]
const finalFn = compose(middlewares)
finalFn()