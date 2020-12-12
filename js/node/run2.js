 
const repo = 'github:su37josephxia/vue-template'
const desc = '../test';
const clone = async function (repo,desc) {
    const {
        promisify
    } = require('util');
    const download = promisify(require('download-git-repo'));
    const ora = require('ora');
    const process = ora(`下载项⽬目......`);
    process.start();
    try {
        await download(repo,desc);
    } catch (err) {
        process.fail()
    }
    process.succeed();
}
clone(repo,desc)
const path = require('path');
const fs = require('fs');
fs.readFile(path.resolve(__dirname,'run.js'),()=>{
    
})
console.log(path.resolve(__dirname,'run.js'))