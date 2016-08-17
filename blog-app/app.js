var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var fs = require('fs');


var app = express();
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
////引入arttemplate模板
var template = require('art-template');
template.config('base', '');
template.config('extname', '.html');
app.engine('.html', template.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * 初始化项目的一些基础目录结构
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function initApp(req, res, next) {
    /////判断目录是否存在
    fs.exists('./public/uploads', function (d) {
        if (d) {
            console.log('上传目录已存在');
            next();
        }
        else {
            /////创建一个在项目根目录中创建一个notes目录
            fs.mkdirSync('./public/uploads');
            console.log('初始化上传目录完成');
            next();
        }
    })
}

//////kindeditor测试部分内容
app.use('/', require('./routes/common/kindeditor/demo'));
/////kindeditor文件上传部分代码
app.use('/common/kindeditor', require('./routes/common/kindeditor/index'));

app.use('/common', require('./routes/common/common'));
app.use('/admin', require('./routes/blog'));
app.use('/', require('./routes/app'));

// app.get('/', initApp, (req, res) => {
//     // res.send('app启动');
//     res.redirect('/admin/blogs/1');
// })

app.get('/home/login', (req, res) => {
    console.log('这是个登陆界面');
    res.redirect('/login.html');
})

app.get('/home/reg', (req, res) => {
    console.log('这是个注册界面');
    res.redirect('/reg.html');
})

app.listen(3000, (req, res) => {
    console.log('服务器运行于端口3000····')
})
