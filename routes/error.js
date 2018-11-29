const Os = require('os');

module.exports = (KoaRouter) => {
    let error = new KoaRouter();

    error.get('/', async (ctx, next) => {
        // ctx.body = Os.networkInterfaces();

        await ctx.render('error', {
            errData: Os.networkInterfaces()
        })
        next();
    });
    return error;
}
