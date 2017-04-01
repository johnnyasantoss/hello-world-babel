const express = require("express");

var static = express.static("./dist");

var appExpress = express();

appExpress.use(static);

(function rotasApi(appExpress) {

    appExpress.get('/api/helloworld', function (req, res) {
        var obj = {
            hello: "World"
        };

        setTimeout(function () {
            res
                .status(200)
                .send(obj);
        }, 5000);
    });

})(appExpress)

appExpress.listen(3000);
