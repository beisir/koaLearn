const Koa = require('koa');
const KoaStatic = require('koa-static');
const bodyParser = require('koa-bodyParser');
const KoaViews = require('koa-views');
const Os = require('os');
const path = require('path');
let app = new Koa();

/**
 * bodyParser
 * 挂仔中间件 主要使用获取pos参数
 */
app.use(bodyParser());

/**
 * KoaStatic(path.join(__dirname, './static')
 * 挂载中间件的静态资源管理器
 */
app.use(KoaStatic(path.join(__dirname, './static'), {
    maxage: 2000, // 浏览器缓存max-age（以毫秒为单位）。默认为0
    hidden: true, // 允许传输隐藏文件。默认为false
    index: 'home.html',  // 默认文件名，默认为'index.html'
    defer: false,  // 如果为true，则使用后return next()，允许任何下游中间件首先响应。
    gzip: false,  // 当客户端支持gzip时，如果存在扩展名为.gz的请求文件，请尝试自动提供文件的gzip压缩版本。默认为true。
    br: false, // 当客户端支持brotli时，如果存在扩展名为.br的请求文件，请尝试自动提供文件的brotli版本（注意，brotli仅通过https接受）。默认为true。
    setHeaders: '' , // 用于在响应时设置自定义标头的功能。
    extensions: true // 尝试匹配传递数组中的扩展名以在URL中没有扩展名时搜索文件。首先发现是服务。（默认为false）

}));

// app.use(views('views',{extension:'ejs'}));
/**
 * 配置模版引擎中间件
 * 如果这样配置不修改html后缀g改成ejs
 */
app.use(KoaViews(path.join(__dirname, './views'), {
    extension: 'ejs',
    // 如果这样配置不修改html后缀
    // map: {
    //     html: 'ejs'
    // }
}));


/**
 * 挂载路由管理器
 */
require('./config/index.js')(app);

// 在端口3000监听:
app.listen(80, function () {
    let IPadress = getIPAdress(Os.networkInterfaces());
    // app started at port ${IPadress} ...
    console.log(`app started at port \u001b[31m${IPadress}\u001b[39m\u001b[22m`);
});


function getIPAdress(interfaces) {
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
};
