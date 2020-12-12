const {
    clone
} = require('./download');
const symbols = require('log-symbols');
const chalk = require('chalk');
const handlebars = require('handlebars');
const fs = require('fs')

module.exports.init = async function (name) {
    await clone('github:su37josephxia/vue-template', name);
}

module.exports.refresh = async function (name) {

    const list =
        fs.readdirSync('./src/views')
        .filter(v => v !== 'Home.vue')
        .map(v => ({
            name: v.replace('.vue', '').toLowerCase(),
            file: v
        }))
    compile({
        list
    }, './src/router.js', './template/router.js.hbs')
    compile({
        list
    }, './src/App.vue', './template/App.vue.hbs')

    function compile(meta, filePath, templatePath) {
        if (fs.existsSync(templatePath)) {
            const content = fs.readFileSync(templatePath).toString();
            const result = handlebars.compile(content)(meta);
            fs.writeFileSync(filePath, result);
        }
        console.log(symbols.success, chalk.green(` ${filePath} 创建成功`))
    }
}