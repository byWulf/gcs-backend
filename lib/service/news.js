module.exports = new (function() {
    var self = this;

    this.getList = function(items, page) {

    };

    this.getDetail = function(newsId) {

    };

    this.likeNews = function(newsId) {

    };

    this.unlikeNews = function(newsId) {

    };

    this.registerEvents = function(eventEmitter) {
        /**
         * Request:
         * {"action": "newsGetList", "data": {"items": 10, "page": 0}}
         *
         * Response:
         * {"action": "newsList", "data": {
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
        eventEmitter.on('newsGetList', function(socket, data) {
            self.getList(data.items, data.page);
        });

        /**
         * Request:
         * {"action": "newsGetDetail", "data": {"newsId": 12}}
         *
         * Response:
         * {"action": "newsList", "data": {
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
        eventEmitter.on('newsGetDetail', function(newsId) {
            self.getDetail(newsId);
        });

        /**
         * Request:
         * {"action": "newsLike", "data": {"newsId": 12}}
         *
         * Response:
         * -none-
         */
        eventEmitter.on('newsLike', function(newsId) {
            self.likeNews(newsId);
        });


        /**
         * Request:
         * {"action": "newsUnlike", "data": {"newsId": 12}}
         *
         * Response:
         * -none-
         */
        eventEmitter.on('newsUnlike', function(newsId) {
            self.unlikeNews(newsId);
        });
    }
})();