const sql = require('../config/sqlconfig.js');
module.exports = (KoaRouter) => {
    let home = new KoaRouter();
    home.post('/post', async (ctx, next) => {
        let {username} = ctx.request.body;
            ctx.body = ctx.request.body;
        await next();
    });

    home.get('/index', async (ctx, next) => {
        let dataList = await sql.query(`SELECT * FROM imgsql`);
        await ctx.render('index', {
            title: 'hello',
            list: dataList
        });
        next();
    });

    return home.get('/hello', async (ctx, next) => {
        ctx.body = 'hello word';
        await next();
    });
};
