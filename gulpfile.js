const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

const STYLE_PATH = './assets/scss/**/*.scss';


// compile scss into css
function style(){
    // 1. where is my scss file
    return gulp.src(STYLE_PATH)
    .pipe(sourcemaps.init())    
    // 2. pass that file through sass compiler
        .pipe(sass().on('error', sass.logError))
    // postcss
        .pipe(postcss(
            [ autoprefixer() ]
            ))
        // By default, gulp-sourcemaps writes the source maps inline in the compiled CSS files.
        .pipe(sourcemaps.write())
    // 3. where do I save compiled CSS
        .pipe(gulp.dest('./www/css'))
    // 4. stream changes to all browsers
        .pipe(browserSync.stream());
}

function watch(){
    browserSync.init({
        server:{
            baseDir: './www/'
        }
    });
    gulp.watch(STYLE_PATH, style);
    gulp.watch('./**/*.html').on('change', browserSync.reload);
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

// exports.style = style;
// exports.watch = watch;

exports.default = watch;