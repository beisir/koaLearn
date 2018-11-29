let sql = require('../config/sqlconfig.js');

module.exports = (KoaRouter) => {
    let router = new KoaRouter();


    return router.get('/getjson/:id', async (ctx, next) => {
        console.log(ctx.params);
        try {
            let list = await sql.query(`SELECT * FROM imgsql WHERE id=${ctx.params.id}`);
            ctx.body = {
                errno: 0,
                dataList: list
            };
        } catch (err) {
            ctx.body = {
                errno: 1,
                msg: '数据有问题',
                err: err
            };
        };
        next();
    });


}
