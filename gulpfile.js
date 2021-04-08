// imports
const { src, dest, series, watch } = require("gulp");
const gulp = require("gulp");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
// const cleanCSS = require("gulp-clean-css");
const purge = require("gulp-css-purge");
const babel = require("gulp-babel");
// const rename = require("gulp-rename");
const del = require("del");
const sync = require("browser-sync").create();
// const htmlmin = require("gulp-htmlmin");
const csso = require("gulp-csso");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
// const babelify = require("babelify");
// const browserify = require("browserify");
// const source = require("vinyl-source-stream");

// tasks
function html() {
  return src("src/**").pipe(dest("dist"));
}

function styles() {
  return (
    src("src/sass/style.scss")
      .pipe(sass())
      .pipe(concat("index.css"))
      .pipe(csso())
      .pipe(purge())
      // .pipe(rename("index.css"))
      .pipe(dest("dist/css"))
  );
}

// function fonts() {
//   return src("src/fonts/**").pipe(dest("dist/fonts"));
// }

function scripts() {
  return src("src/**/*.js")
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify())
    .pipe(dest("dist/js"));
}

function images() {
  return src("src/img/**").pipe(imagemin()).pipe(dest("dist/img"));
}

function serve() {
  sync.init({
    server: {
      baseDir: "./dist",
      index: "./index.html",
    },
  });

  watch("src/**/*.html", series(html)).on("change", sync.reload);
  watch("src/**/*.js", series(scripts)).on("change", sync.reload);
  watch("src/**/*.scss", series(styles)).on("change", sync.reload);
  watch("src/img/**", series(images)).on("change", sync.reload);
//   watch("src/fonts/**", series(fonts)).on("change", sync.reload);
}

function clear() {
  return del("dist");
}

// commands
exports.serve = gulp.series(clear, styles, html, scripts, images, serve);
exports.build = gulp.series(clear, styles, html, scripts, images);
exports.clear = clear;
exports.html = html;
exports.scripts = scripts;
exports.images = images;
// exports.fonts = fonts;
