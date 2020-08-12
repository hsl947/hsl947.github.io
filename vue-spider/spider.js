/**
 * 爬虫抓取数据网页： http://www.cnblogs.com/opendigg/p/6513510.html
 * 主要抓取内容：Vue开源项目库-标题及链接，并保存为data.json
 * Author：Souleigh
 */
var Crawler = require('crawler');
var url = require('url');
var fs = require('fs'); //fs为文件模块，path为系统路径模块。
var path = require('path');

var c = new Crawler({
    maxConnections: 10,
    callback: function(error, res, $) {
        var data_array = [];
        $('#cnblogs_post_body li').each(function(i, li) {
            // console.log('【' + $(li).find('a').attr('href') + '】' + $(li).text());
            var array_item = {
                title: $(li).text(),
                url: $(li).find('a').attr('href')
            };
            data_array.push(array_item);
            // console.log(JSON.stringify(data_array));
            var file_url = 'data.json';
            fs.writeFile(file_url, JSON.stringify(data_array), function(err) {
                if (err) {
                    console.log('error:' + err);
                } else {
                    // console.log(i + '、数据保存成功~');
                }
            });
        });
        console.log('------------读取完成--------------');

        setTimeout(function() {
            fs.readFile('data.json', 'utf-8', function(err, data) {
                if (err) {
                    console.log("bad~")
                } else {
                    console.log("read ok~");
                    console.log(JSON.parse(data));
                }
            });
        }, 1000);
    }
});
c.queue('http://www.cnblogs.com/opendigg/p/6513510.html');
