const gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    pump = require("pump"),
    del = require("del"),
    nodemon = require("gulp-nodemon"),
    sourcemap = require("gulp-sourcemaps"),
    babel = require("gulp-babel"),
    concat = require("gulp-concat"),
    browserify = require('gulp-browserify'),
    htmlmin = require('gulp-htmlmin');

gulp.task("minify-js", function (cb) {
    pump([
        gulp.src('./src/app/js/*.js')
        , sourcemap.init()
        , babel()
        , browserify({
            insertGlobals: true,
            debug: !process.env.production
        })
        , uglify()
        , concat("main.min.js")
        , sourcemap.write('.')
        , gulp.dest('./dist/js')
    ], cb);
});

gulp.task("copy-html", function (cb) {
    pump([
        gulp.src("./src/app/*.html")
        , htmlmin({
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            decodeEntities: true,
            removeComments: true
        })
        , gulp.dest("./dist")
    ], cb);
});

gulp.task("clean", function () {
    return del("dist");
});

gulp.task("build",
    gulp.series([
        "clean"
        , "minify-js"
        , "copy-html"
    ])
);

gulp.task('start',
    gulp.series([
        "build",
        startServer
    ])
);

function startServer() {
    var server = nodemon({
        script: 'index.js'
        , tasks: ["build"]
        , watch: ["./src/app"]
        , ext: 'js html'
        , env: { 'NODE_ENV': 'Development' }
    });

    server
        .on('restart', function () {
            console.log('Reiniciou!')
        })
        .on("crash", function () {
            console.error("Deu ruim!");
            server.emit("restart", 3);
        });
}
