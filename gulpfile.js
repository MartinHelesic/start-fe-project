const gulp = require('gulp');
const {series} =require('gulp');

//CSS
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

//JS
const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');

//IMGs
const imagemin = require('gulp-imagemin');

const STYLE_PATH = './assets/scss/**/*.scss';
const IMAGES_PATH = './assets/images/*';



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



//Scripts serves rollup https://rollupjs.org
function jscripts() {
    return rollup.rollup({
        input: './assets/scripts/main.js',
        output: {
            file: 'bundle.js',
            format: 'esm'
        },
        plugins: [
            resolve(),
            babel({
                exclude: 'node_modules/**' // only transpile our source code
            })
        ]
    }).then(bundle => {
        return bundle.write({
            file: './www/js/main.js',
            format: 'esm',
            name: 'library',
            sourcemap: true
        });
    });
}

function images() {
    return gulp.src(IMAGES_PATH)
        .pipe(imagemin())
        .pipe(gulp.dest('./www/img'))
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './www/'
        }
    });
    gulp.watch(STYLE_PATH).on('change', series(style, browserSync.reload));
    gulp.watch(IMAGES_PATH, images(), browserSync.reload);
    gulp.watch('./**/*.html').on('change', browserSync.reload);
    gulp.watch('./assets/scripts/**/*.js').on('change', series(jscripts, browserSync.reload));
}



// exports.style = style;
// exports.images = images;
// exports.jscripts = jscripts;
// exports.watch = watch;

exports.default = watch;