// const getData = require('../routes/getData.js');
const KoaRouter = require('koa-router');

const Home = require('../routes/home.js')(KoaRouter),
    Imgup = require('../routes/Imgup.js')(KoaRouter),
    GetData = require('../routes/Getdata.js')(KoaRouter),
    Error = require('../routes/error.js')(KoaRouter);

module.exports = (app) => {

    let router = new KoaRouter();
    router.use('/home', Home.routes(), Home.allowedMethods());
    router.use('/upload', Imgup.routes(), Imgup.allowedMethods());
    router.use('/GetData', GetData.routes(), GetData.allowedMethods());
    router.use('/error', Error.routes(), Error.allowedMethods());
    /**
     * 跳转到其他地方～～
     */
    router.redirect('/', '/home/index');

    app.use(router.routes());
    app.use(router.allowedMethods());

};
