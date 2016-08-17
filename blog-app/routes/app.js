var express = require('express');
var router = express.Router();
var db = require('../db');

function getPages(page, pageCount) {
  var pages = [page]
  // 左边的第1个页码
  var left = page - 1;
  // 右边的第1个页码
  var right = page + 1;
  // 左右两边各加1个页码，直到页码够99个或
  // 左边到1、右边到总页数
  while (pages.length < 99 && (left >= 1 || right <= pageCount)) {
    if (left > 0) {
      pages.unshift(left--)
    }
    if (right <= pageCount) {
      pages.push(right++)
    }
  }
  return pages
}

// 获取所有分类信息
router.get('/allTypes', (req, res) => {
  db.BlogType.find().exec((err, data) => {
    if (err) {
      res.json({ status: "n", msg: "获取所有分类失败", data: {} })
    }
    else {
      res.json({ status: "y", msg: "获取所有分类成功", data: data })
    }
  })
})

// 获取分类下的数据
router.get('/typeData/:page/:type?', (req, res) => {
  var page = req.params.page;
  var type = req.params.type;
  page = page || 1;
  page = parseInt(page);
  var pageSize = 1;
  if (type) {
    db.Blog.find({ 'type': type }).count((err, total) => {
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
      db.Blog.find({ 'type': type }).skip((page - 1) * pageSize)
        .limit(pageSize).sort({ 'order_num': 1 }).exec((err, data) => {
          var data = data.map(function (item) {
            item = item.toObject();
            item.id = item._id.toString();
            delete item._id;
            return item
          })
          var type = data.map(function (item) {
            return item.type
          })
          res.json({
            status: "y",
            msg: "获取指定分类数据成功",
            data: data,
            type:type[0],
            pages: getPages(page, pageCount),
            page: page,
            pageCount: pageCount
          })
        })
    })
  }
  else { 
    db.Blog.find().exec((err, data) => {
      if (err) {
        res.json({ status: "n", msg: "获取所有文章失败", data: {} })
      }
      else {
        db.Blog.find().count((err, total) => {
          if (err) {
            console.log(err);
          }
          var pageSize = 999;
          var pageCount = Math.ceil(total / pageSize);
          if (page > pageCount) {
            page = pageCount
          }
          if (page < 1) {
            page = 1
          }
          db.Blog.find().skip((page - 1) * pageSize)
            .limit(pageSize).sort({ 'order_num': 1 }).exec((err, data) => {
              var data = data.map(function (item) {
                item = item.toObject();
                item.id = item._id.toString();
                delete item._id;
                return item
              })
              res.json({
                status: "y",
                msg: "获取所有分类数据成功",
                data: data,
                pages: getPages(page, pageCount),
                page: page,
                pageCount: pageCount
              })
            })
        })
      }
    })
  }
})

// 根据id获取文章详细信息
router.get('/blog/:id', (req, res) => {
  var id = req.params.id;
  db.Blog.findById(id, (err, data) => {
    if (err) { /////如果查询失败 执行
      res.json({ status: "n", msg: "获取文章数据失败", data: {} });
    }
    else {
      /////判断查询返回的数据是否为空
      if (!!data) {
        ////对查询返回的数据做处理
        var temData = data.toObject();
        temData.id = data._id;
        delete temData._id;
        res.json({ status: "y", msg: "获取文章数据成功", data: temData });
      }
      else {
        res.json({ status: "n", msg: "获取文章数据失败", data: {} });
      }
    }
  })
})

module.exports = router;

