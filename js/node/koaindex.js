const Koa = require('koa');
const app = new Koa();


app.use(async(ctx,next)=>{

    let start = new Date().getTime();
    console.log('start')
    await next();
    let end =  new Date().getTime();
    console.log('end'+ (end-start))
})
app.use((ctx,next)=>{
    console.log('=========');
    ctx.body = {
        'user':'jay'
    }
    //next();
})
app.listen(8000);