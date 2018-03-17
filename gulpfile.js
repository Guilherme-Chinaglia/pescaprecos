var gulp = require("gulp");
var sass = require("gulp-sass");
var htmlmin = require("gulp-htmlmin");
var notify = require("gulp-notify");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var browserSync = require("browser-sync").create();
var del = require("del");
var jshint = require("gulp-jshint");
var cssmin = require("gulp-cssmin");
var runSequence = require("run-sequence");
var imagemin = require("gulp-imagemin");

/* TASKS CACHED
* Realizar a limpeza nas pastas, para o recebimento das novas atualizações
*/

gulp.task("cache:css", function () {
  del("./dist/css/style.css")
});

gulp.task("cache:js", function () {
  del("./dist/js/app.js")
});

gulp.task("cache:html", function () {
  del("./dist/*.html")
});

gulp.task("cache:img", function () {
  del("./dist/img/*")
});
/* FIM TASKS CACHED */

/*Task minify PNG, JPEG, GIF and SVG images*/
gulp.task("imagemin", ['cache:img'], function () {
  return gulp.src("src/img/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/img"));
});


/* TASK PARA COMPILAR O scss para css */
gulp.task("sass", ['cache:css'], function () {
  return gulp.src("./src/scss/style.scss")
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream());
});


/* TASK PARA MINIFICAR O HTML */
gulp.task("html", ['cache:html'], function () {
  return gulp.src("./src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("./dist"))
    .pipe(browserSync.stream());
});


/*TASK SINALIZADORA DE POSSÍVEIS ERROS NO JAVASCRIPT*/
gulp.task("jshint", function () {
  return gulp.src("./src/js/app.js")
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

/* TASK PARA MINIFICAR O JAVASCRIPT */
gulp.task("js", ['cache:js'], function () {
  return gulp.src("./src/js/app.js")
    .pipe(uglify())
    .pipe(gulp.dest("./dist/js"))
    .pipe(browserSync.stream());
});

/* TASK PARA JUNTAR TODOS OS ARQUIVOS BÁSICOS DO JS EM UM SÓ */
gulp.task("concat-js", function () {
  return gulp.src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/popper.js/dist/umd/popper.js',
    'node_modules/bootstrap/dist/js/bootstrap.js'
  ])
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest("./dist/js"))
});


/* TASK PARA MOVER A PASTA FONTS PARA A DIST */
gulp.task("move-fonts", function () {
  return gulp.src('node_modules/@fortawesome/fontawesome-free-webfonts/webfonts/**')
    .pipe(gulp.dest("./dist/webfonts"))
});


/* TASK PARA RODAR O SERVIDOR LOCAL */
gulp.task("server", function () {
  browserSync.init({
		server: {
			baseDir: "./dist/index.html"
		}
		
  });

  /* Watch */
  gulp.watch("./src/scss/**/*.scss", ['sass']);
  gulp.watch("node_modules/bootstrap/scss/**/*.scss", ['sass']);
  gulp.watch("./src/js/**/*.js", ['js']);
  gulp.watch("./src/*.php", ['html']);
});

gulp.task("default", function (cb) {
  return runSequence(['imagemin', 'sass', 'includes', 'html', 'jshint', 'js', 'concat-js', 'move-fonts', 'server'], cb)
});
