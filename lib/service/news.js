module.exports = new (function() {
    var self = this;

    this.getList = function(items, page) {
        return {
               "items": 10,
               "page": 0,
               "itemsCount": 4,
               "news": [{
                   "title": "Foobar",
                   "date": "2016-01-01 01:01:01",
                   "author": {"id": 1, "displayName": "byWulf"},
                   "likes": 5,
                   "ownLike": false
               },{
                   "title": "Foobar",
                   "date": "2016-01-01 01:01:01",
                   "author": {"id": 1, "displayName": "byWulf"},
                   "likes": 5,
                   "ownLike": false
               },{
                   "title": "Foobar",
                   "date": "2016-01-01 01:01:01",
                   "author": {"id": 1, "displayName": "byWulf"},
                   "likes": 5,
                   "ownLike": false
               },{
                   "title": "Foobar",
                   "date": "2016-01-01 01:01:01",
                   "author": {"id": 1, "displayName": "byWulf"},
                   "likes": 5,
                   "ownLike": false
               }]
          };
    };

    this.getDetail = function(newsId) {

    };

    this.likeNews = function(newsId, user) {

    };

    this.unlikeNews = function(newsId, user) {

    };

    this.registerEvents = function(eventEmitter) {
        /**
         * Request:
         * {"action": "news.getList", "data": {"items": 10, "page": 0}}
         *
         * Response:
         * {"action": "news.list", "data": {
         *      "items": 10,
         *      "page": 0,
         *      "itemsCount": 123,
         *      "news": [{
         *          "title": "Foobar",
         *          "date": "2016-01-01 01:01:01",
         *          "author": {"id": 1, "displayName": "byWulf"},
         *          "likes": 5,
         *          "ownLike": false
         *      }, ...]
         * }}
         */
        eventEmitter.on('news.getList', function(user, data) {
            user.sendCommand('news.list', self.getList(data.items, data.page));
        });

        /**
         * Request:
         * {"action": "news.getDetail", "data": {"newsId": 12}}
         *
         * Response:
         * {"action": "news.getDetail", "data": {
         *      "news": {
         *          "id": 12,
         *          "title": "Foobar",
         *          "content": "This is the content.",
         *          "date": "2016-01-01 01:01:01",
         *          "author": {"id": 1, "displayName": "byWulf"},
         *          "likes": 5,
         *          "ownLike": false
         *      }
         * }}
         */
        eventEmitter.on('news.getDetail', function(user, data) {
            user.sendCommand('news.detail', self.getDetail(data.newsId));
        });

        /**
         * Request:
         * {"action": "newsLike", "data": {"newsId": 12}}
         *
         * Response:
         * -none-
         */
        eventEmitter.on('news.like', function(user, data) {
            self.likeNews(data.newsId, user);
        });


        /**
         * Request:
         * {"action": "newsUnlike", "data": {"newsId": 12}}
         *
         * Response:
         * -none-
         */
        eventEmitter.on('news.unlike', function(user, data) {
            self.unlikeNews(data.newsId, user);
        });
    }
})();