const multer = require('koa-multer');//加载koa-multer模块

var storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, 'static/img/')
    },
    //修改文件名称
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});
//加载配置
var upload = multer({ storage: storage });
module.exports = (KoaRouter) => {
    let Imgup = new KoaRouter();
    return Imgup.post('/imgup', upload.single('file'), async (ctx, next) => {
        ctx.body = ctx.req.file;
        next();
    });
}
