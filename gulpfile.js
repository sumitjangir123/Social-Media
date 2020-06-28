// const gulp= require('gulp');

// //for converting the sass files to the css files
// const sass= require('gulp-sass');
// //for minifying css files
// const cssnano= require('gulp-cssnano');
// //for renaming the files every time to prevent our website from browser caching  
// const rev= require('gulp-rev');
// //for minifying javascript
// const uglify= require('gulp-uglify-es').default;
// //for minifying images
// const imagemin= require('gulp-imagemin');
// //for deleting the directory
// const del= require('del');


// //for css
// gulp.task('css',function(done){
//     console.log('minifying css...');
//     gulp.src('./assets/sass/**/*.scss')
//     .pipe(sass())
//     .pipe(cssnano())
//     .pipe(gulp.dest('./assets.css'));

//     gulp.src('./assets/**/*.css')
//     .pipe(rev())
//     .pipe(gulp.dest('./public/assets'))
//     .pipe(rev.manifest({
//         cwd: 'public',
//         merge: true
//     }))
//     .pipe(gulp.dest('./public/assets'));
//     done();
// });


// //for js
// gulp.task('js', function(done){
//     console.log('minifying js...');
//      gulp.src('./assets/**/*.js')
//     .pipe(uglify())
//     .pipe(rev())
//     .pipe(gulp.dest('./public/assets'))
//     .pipe(rev.manifest({
//         cwd: 'public',
//         merge: true
//     }))
//     .pipe(gulp.dest('./publicz'));
//     done();
// });


// //for images
// gulp.task('images', function(done){
//     console.log('compressing images...');
//     gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
//     .pipe(imagemin())
//     .pipe(rev())
//     .pipe(gulp.dest('./public/assets'))
//     .pipe(rev.manifest({
//         cwd: 'public',
//         merge: true
//     }))
//     .pipe(gulp.dest('./public/assets'));
//     done();
// });


// // empty the public/assets directory every time first when building the new assets
// gulp.task('clean:assets', function(done){
//     del.sync('./public/assets');
//     done();
// });

// //calling all the gulp mids
// gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images'), function(done){
//     console.log('Building assets');
//     done();
// });





















const gulp = require('gulp');

const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const del = require('del');



gulp.task('css', function(done){
    console.log('minifying css...');
    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'));

     gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});


gulp.task('js', function(done){
    console.log('minifying js...');
     gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done()
});


gulp.task('images', function(done){
    console.log('compressing images...');
    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});


// empty the public/assets directory
gulp.task('clean:assets', function(done){
    del.sync('./public/assets');
    done();
});

gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images'), function(done){
    console.log('Building assets');
    done();
});