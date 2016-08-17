var express = require('express');
var router = express.Router();
/////引入crypto模块
const crypto = require('crypto');
const md5 = crypto.createHash('md5')

var db = require('../db');
var moment = require('moment');

router.post('/reg', (req, res) => {
    req.body.pwd = md5.update(req.body.pwd).digest('hex').toString();
    console.log(req.body.pwd);
    var admin = new db.Admin(req.body);
    admin.save();
    console.log('管理员注册完毕····');
    res.json({ status: 'y' });
    // res.redirect('/login.html');
});

function writeUserNameInCookie(data, res) {
    res.cookie('userName', data.userName);
    res.cookie('avatar', data.avatar);
    res.cookie('nickName', !!!data.nickName ? data.userName : data.nickName);
}

router.post('/login', (req, res) => {
    if (req.body.userName == 'admin') {
        db.Admin.find().exec((err, data) => {
            console.log(data[0].userName);
            if (req.body.pwd == data[0].pwd || req.body.pwd == data[0].chkPwd) {
                writeUserNameInCookie(data[0], res);
                res.json({ status: 'y', msg: '登陆成功' });
                console.log('管理员已登录····');
            }
            else {
                res.json({ status: 'n', msg: '密码错误' });
            }
        })
    }
    else {
        res.json({ status: 'n', msg: '用户名不存在' });
    }
});


/**
 * 设置页面中用于分页的中间页面的内容
 * @param  {[type]} page      [description]
 * @param  {[type]} pageCount [description]
 * @return {[type]}           [description]
 */
function getPages(page, pageCount) {
    var pages = [page]
    // 左边的第1个页码
    var left = page - 1;
    // 右边的第1个页码
    var right = page + 1;

    // 左右两边各加1个页码，直到页码够11个或
    // 左边到1、右边到总页数
    while (pages.length < 11 && (left >= 1 || right <= pageCount)) {
        if (left > 0) {
            pages.unshift(left--)
        }
        if (right <= pageCount) {
            pages.push(right++)
        }
    }

    return pages
}

/* GET home page. */
router.get('/listData/:page', function (req, res, next) {
    res.header('Access-Control-Allow-Origin:*');  
    //////拼接查询条件数据
    var filter = {};
    var name = req.query.name;
    var mobile = req.query.mobile;
    var email = req.query.email;
    var gender = req.query.gender;
    var maxAge = req.query.maxAge;
    var minAge = req.query.minAge;

    if (!!name) {
        filter.name = { '$regex': `.*?${name}.*?` };
    }
    if (!!mobile) {
        filter.mobile = { '$regex': `.*?${mobile}.*?` };
    }
    if (!!email) {
        filter.email = { '$regex': `.*?${email}.*?` };;
    }
    if (!!gender) {
        filter.gender = gender;
    }
    if (!!maxAge && !!minAge) {
        filter.age = { '$lte': maxAge, '$gte': minAge };
    }
    // console.log(filter);

    var page = req.params.page;
    page = page || 1;
    page = parseInt(page);
    var pageSize = 2
    // console.log(page);

    db.Student.find(filter).count((err, total) => {
        if (err) {
            console.log(err);
        }
        var pageCount = Math.ceil(total / pageSize);
        if (page > pageCount) {
            page = pageCount
        }
        if (page < 1) {
            page = 1
        }
        /////query 按条件查询
        // sort排序
        db.Student.find(filter).skip((page - 1) * pageSize)
            .limit(pageSize).sort({ '_id': -1 }).exec((err, data) => {

                var data = data.map(function (item) {
                    //console.log(moment(item.birthday).format('YYYY-MM-DD'));
                    ////新增一个属性 用于村相互需要在页面上展示的日期时间值
                    item = item.toObject();
                    item.id = item._id.toString();
                    delete item._id;

                    item.birthdayForShow = moment(item.birthday).format('YYYY-MM-DD');
                    return item
                })
                res.json({
                    data: data,
                    pages: getPages(page, pageCount),
                    page: page,
                    pageCount: pageCount
                });
            })
    })
});

/**
 * 新增和修改页面放在一起调用
 * @param  {[type]} '/editor/:id' [description]
 * @param  {[type]} function      (req,         res, next [description]
 * @return {[type]}               [description]
 */
router.get('/editor/:id', function (req, res, next) {
    res.header('Access-Control-Allow-Origin:*');  
    /////根据id去查找数据
    var id = req.params.id;
    //////通过id去数据库中查找数据
    db.Student.findById(id, (err, data) => {
        if (data) { /////如果找到了 表示修改
            //console.log('data存在')
            ///格式化出一个日期字符串数据 用于在页面修改的时候显示
            data.birthdayForShow = moment(data.birthday).format('YYYY-MM-DD');
            console.log(data.birthdayForShow);
            console.log('学生信息编辑···');
        }
        else { ////如果没有找到 表示新增
            data = new db.Student();
            console.log('学生信息新增···');
        }
        res.render('admin/adminCenter', { data: data });
    })
})

router.post('/editor/:id', function (req, res, next) {

    var id = req.params.id;
    /////获取从页面中传递过来的数据
    var student = req.body;

    //////通过页面传递过来的出生年月计算年龄
    student.age = ((new Date()).getFullYear()) - (new Date(req.body.birthday)).getFullYear();

    /////此处的参数upsert 当我的记录没有找到的时候就新增 如果找到了那么进行修改操作
    db.Student.findByIdAndUpdate(id, student, { upsert: true }, (err) => {
        if (err) {
            console.log(err);
        }
        res.json({ status: 'y' });
        // res.redirect('/');
    });
})


router.get('/blogEdit/:id', function (req, res, next) {
    var id = req.params.id;
    db.Admin.find().exec((err, data) => {
        var Adata = data[0];
        db.BlogType.find().exec((err, data) => {
            var Cdata = data.map((item) => {
                return {name:item.name,id:item.id};
            })
            // console.log(Cdata)
            db.Blog.findById(id, (err, data) => {
                if (data) {
                    console.log('博客文章编辑···');
                    res.render('admin/blogEdit', { title: '博客文章编辑', data: data, Cdata: Cdata, userName: Adata.userName, avatar: Adata.avatar });
                }
                else {
                    data = new db.Blog();
                    console.log(data);
                    res.render('admin/blogEdit', { title: '博客文章新增', data: data, Cdata: Cdata, userName: Adata.userName, avatar: Adata.avatar });
                    console.log('博客文章新增···');
                }
            })
        })
    })
})

router.post('/blogEdit/:id', function (req, res, next) {
    var id = req.params.id;
    var blog = req.body;
    db.Blog.findByIdAndUpdate(id, blog, { upsert: true }, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin/blogs/1');
        }
    });
})

router.get('/cateEdit/:id', function (req, res, next) {
    var id = req.params.id;
    db.Admin.find().exec((err, data) => {
        var Adata = data[0];
        db.BlogType.findById(id, (err, data) => {
            if (data) {
                console.log('分类编辑···');
                res.render('admin/cateEdit', { title: '分类编辑', data: data, userName: Adata.userName, avatar: Adata.avatar });
            }
            else {
                data = new db.BlogType();
                console.log('分类新增···');
                res.render('admin/cateEdit', { title: '分类新增', data: data, userName: Adata.userName, avatar: Adata.avatar });
            }
        })
    })
})

router.post('/cateEdit/:id', function (req, res, next) {
    var id = req.params.id;
    var blogType = req.body;
    db.BlogType.findByIdAndUpdate(id, blogType, { upsert: true }, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin/cate/1');
        }
    });
})


/**
 * 根据ID删除记录
 */
router.post('/delete', function (req, res) {
    if (req.body.id) {
        db.Student.findByIdAndRemove(req.body.id, (err) => {
            if (err) {
                console.log(err);
                res.json({ status: "n", msg: "参数错误" });
            }
            res.json({ status: "y", msg: "删除成功" });
        })
    }
    else {
        res.json({ status: "n", msg: "参数错误" });
    }
})

router.post('/cate/delete', function (req, res) {
    if (req.body.id) {
        db.BlogType.findByIdAndRemove(req.body.id, (err) => {
            if (err) {
                console.log(err);
                res.json({ status: "n", msg: "参数错误" });
            }
            res.redirect('/admin/cate/1');
        })
    }
    else {
        res.json({ status: "n", msg: "参数错误" });
    }
})

router.post('/blog/delete', function (req, res) {
    if (req.body.id) {
        db.Blog.findByIdAndRemove(req.body.id, (err) => {
            if (err) {
                console.log(err);
                res.json({ status: "n", msg: "参数错误" });
            }
            res.redirect('/admin/blogs/1');
        })
    }
    else {
        res.json({ status: "n", msg: "参数错误" });
    }
})

router.all('/*', (req, res, next) => {
    console.log('---------这是个管理后台的路径----------');
    next();
})

router.get('/', (req, res) => {
    res.redirect('/');
})

router.get('/cate/:page', (req, res) => {
    //////拼接查询条件数据
    var filter = {};
    var name = req.query.name;
    var order_num = req.query.order_num;
    if (!!name) {
        filter.name = { '$regex': `.*?${name}.*?` };
    }
    if (!!order_num) {
        filter.order_num = { '$regex': `.*?${order_num}.*?` };
    }
    var page = req.params.page;
    page = page || 1;
    page = parseInt(page);
    var pageSize = 3
    // console.log(page);
    db.Admin.find().exec((err, data) => {
        var Adata = data[0];
        db.BlogType.find(filter).count((err, total) => {
            if (err) {
                console.log(err);
            }
            var pageCount = Math.ceil(total / pageSize);
            if (page > pageCount) {
                page = pageCount
            }
            if (page < 1) {
                page = 1
            }
            /////query 按条件查询
            // sort排序
            db.BlogType.find(filter).skip((page - 1) * pageSize)
                .limit(pageSize).sort({ '_id': -1 }).exec((err, data) => {
                    var data = data.map(function (item) {
                        item = item.toObject();
                        item.id = item._id.toString();
                        delete item._id;
                        return item
                    })
                    res.render('admin/cate', {
                        data: data,
                        pages: getPages(page, pageCount),
                        page: page,
                        pageCount: pageCount,
                        query: req.query,
                        userName: Adata.userName,
                        avatar: Adata.avatar
                    });
                })
        })
    })
})

router.get('/blogs/:page', (req, res) => {
    //////拼接查询条件数据
    var filter = {};
    var title = req.query.title;
    var type = req.query.type;

    if (!!title) {
        filter.title = { '$regex': `.*?${title}.*?` };
    }
    if (!!type) {
        filter.type = { '$regex': `.*?${type}.*?` };
    }
    var page = req.params.page;
    page = page || 1;
    page = parseInt(page);
    var pageSize = 3
    // console.log(page);
    db.Admin.find().exec((err, data) => {
        var Adata = data[0];
        db.Blog.find(filter).count((err, total) => {
            if (err) {
                console.log(err);
            }
            var pageCount = Math.ceil(total / pageSize);
            if (page > pageCount) {
                page = pageCount
            }
            if (page < 1) {
                page = 1
            }
            /////query 按条件查询
            // sort排序
            db.Blog.find(filter).skip((page - 1) * pageSize)
                .limit(pageSize).sort({ '_id': -1 }).exec((err, data) => {
                    var data = data.map(function (item) {
                        item = item.toObject();
                        item.id = item._id.toString();
                        delete item._id;
                        return item
                    })
                    res.render('admin/blogs', {
                        data: data,
                        pages: getPages(page, pageCount),
                        page: page,
                        pageCount: pageCount,
                        query: req.query,
                        userName: Adata.userName,
                        avatar: Adata.avatar
                    });
                })
        })
    })
})

router.get('/adminCenter', (req, res) => {
    db.Admin.find().exec((err, data) => {
        var Adata = data[0];
        res.render('admin/adminCenter', { userName: Adata.userName, avatar: Adata.avatar, nickName: Adata.nickName });
    })
})

router.post('/updateInfo', (req, res) => {
    var admin = req.body;
    var userName = admin.userName;
    db.Admin.update({ 'userName': userName }, { $set: { 'nickName': admin.nickName, 'avatar': admin.avatar } }).exec((err) => {
        if (err) {
            console.log(err);
        }
        db.Admin.find().exec((err, data) => {
            if (err) {
                console.log(err);
            }
            console.log('-------------updateInfo----------------')
            // console.log(data);
            res.render('admin/adminCenter', { userName: data[0].userName, avatar: data[0].avatar, nickName: data[0].nickName });
        })

    });
})

module.exports = router;
