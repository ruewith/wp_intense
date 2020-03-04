const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const concatCss = require("gulp-concat-css");
const pug = require("gulp-pug");
const sass = require("gulp-sass");

gulp.task("default", gulp.parallel(pugCom, sassCom, server));

// Статический сервер с наблюдением за файлами sass, pug, html
function server() {
    browserSync.init({
        server: "public/"
    });
    gulp.watch("src/**/*.pug", gulp.series(pugCom));
    gulp.watch("src/sass/*.sass", gulp.series(sassCom));
    gulp.watch("public/js/*.js").on("change", browserSync.reload);
    gulp.watch("public/*.html").on("change", browserSync.reload);
}

// Конкатинация и компиляция CSS из Sass с расставлением автопрефиксов
function sassCom() {
    return gulp
        .src("src/sass/*.sass")
        .pipe(sass())
        .pipe(concatCss("style.css"))
        .pipe(gulp.dest("public/css"))
        .pipe(browserSync.stream());
}

// Компиляция html из pug
function pugCom() {
    return gulp
        .src(["src/pug/*.pug", "!src/pug/_*.pug"])
        .pipe(
            pug({
                pretty: true
            })
        )
        .pipe(gulp.dest("public/"));
}
