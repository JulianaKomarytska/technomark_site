var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglifyjs'),
	cssnano = require('gulp-cssnano'),
	rename = require('gulp-rename'),
	del = require('del'),
	imagemin = require('gulp-imagemin'),
	cache = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer');


gulp.task('sass', done => {
	return gulp.src('app/sass/**/*.scss')
	.pipe(sass())
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}));
    done();
});

gulp.task ('scripts', done=> {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js'])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
	done();
});

gulp.task ('css-libs', gulp.series('sass', done => {
	return gulp.src('app/css/libs.css')
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css'));
    done();
}));

gulp.task ('browser-sync', done =>{
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
	done();
});

gulp.task ('clean', done => {
	 del.sync('dist');
	 done();
});

gulp.task ('clear', done => {
	return cache.clearAll();
	done();
});



gulp.task('img', done=> {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		})))
	.pipe(gulp.dest('dist/img'));
	done()
});

gulp.task ('watch', gulp.series('browser-sync', 'css-libs', 'scripts', done => {
	gulp.watch('app/sass/**/*.scss', gulp.series('sass'));
	gulp.watch('app/**/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
	done()
}));


gulp.task('build', gulp.series('clean', 'sass', 'scripts', 'img', done => {
	var buildCss = gulp.src([
		'app/css/main.css',
		'app/css/libs.min.css'
	])
	.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src([
		'app/fonts/**/*'
		])
	.pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src(['app/js/**/*'])
	.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));

	done()
}));
