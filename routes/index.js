var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

router.get('/', function (req, res, next) {

    var options = {
        url: 'http://www.themovieblog.com/category/features/reviews/',
        method: 'GET'
    };

    request(options, function (err, response, body) {
        if(err || response.statusCode != 200)
        {
            return;
        }

        var $ = cheerio.load(body);

        var arr = [];

        var postItem = $(".genaral-post-item");

        $(postItem).each(function (key, el) {

            var item = el;

            var headerTitle = $(item).find('.genpost-entry-header > .genpost-entry-title > a');

            var content = $(item).find('.genpost-entry-content > p');

            var moreTag = $(content).find('a');

            return arr.push({
                header: $(headerTitle).text(),
                content: {
                    text: $(content).text(),
                    more: $(moreTag).attr('href')
                }
            });
        });

        res.status(200).json(arr);

    })
});



module.exports = router;



/*
router.get('/', function (req, res, next) {

    var $ = cheerio.load('<h1 class="title">Welcome to Express</h1>');

       $('.title').css('color', 'blue');

       $('.title').addClass('welcome');

       $('.welcome').css('font-size', '4em');

       $('<h2 class="school">School of net</h2>').prependTo('.title');

       res.send($.html());
   });

    GET home page. */
/*router.get('/', function (req, res, next) {

    var options = {

        url: 'https://br.search.yahoo.com/search;_ylt=AwrJ7F4npchbJf8AwQHy6Qt.;_ylc=X1MDMjExNDcxMDAwMgRfcgMyBGZyAwRncHJpZANtNmQudWQzTVRWeTNzRl9jWXo0SDJBBG5fcnNsdAMwBG5fc3VnZwMxBG9yaWdpbgNici5zZWFyY2gueWFob28uY29tBHBvcwMwBHBxc3RyAwRwcXN0cmwDBHFzdHJsAzE3BHF1ZXJ5A3NjaG9vbCUyMG9mJTIwbmV0BHRfc3RtcAMxNTM5ODc2MTQ4?fr2=sb-top-br.search&p=school+of+net&fr=sfp&iscqry=',
        form: {

        },
        headers: {

        }
    };

    request(options, function (error, response, body) {

        if(error || response.statusCode != 200)
        {
            return;
        }


        res.render('index', {
            title: 'Express',
            body: body
        });
    });

});*/


