const gulp = require('gulp')
const dartSass = require('gulp-dart-sass')
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')

// Clean CSS output using dynamic import
async function cleanCssOutput() {
  const { deleteAsync } = await import('del')
  await deleteAsync(['overrides/app/static/css/**/*'])
}

// Compile SCSS → CSS
function compileScss() {
  return gulp
    .src('overrides/app/theme/client/default/scss/main.scss')
    .pipe(dartSass({ outputStyle: 'expanded' }).on('error', dartSass.logError))
    .pipe(gulp.dest('overrides/app/static/css'))
}

// Minify CSS
function minifyCss() {
  return gulp
    .src(['overrides/app/static/css/*.css', '!overrides/app/static/css/*.min.css'])
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('overrides/app/static/css'))
}

// Watch for changes
function watchScss() {
  gulp.watch(
    'overrides/app/theme/client/default/scss/**/*.scss',
    gulp.series(compileScss, minifyCss)
  )
}

// Register tasks
gulp.task('clean-css-output', cleanCssOutput)
gulp.task('compile-scss', gulp.series(cleanCssOutput, compileScss, minifyCss))
gulp.task('watch-scss', watchScss)
gulp.task('default', gulp.series('compile-scss', 'watch-scss'))
