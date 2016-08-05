var gulp = require('gulp');
var compileToModules = ['es2015', 'commonjs', 'amd', 'system'];
var tsconfig = require('../tsconfig.json');
var ts = require('gulp-typescript');
var assign = Object.assign || require('object.assign');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var dts = require('dts-bundle')

var appRoot = 'src/';
var paths = {
    root: appRoot,
    source: appRoot + '**/*.ts',
    html: appRoot + '**/*.html',
    scripts: appRoot + 'scripts/**/*',
    typings: appRoot + 'typings/**/*',
    sass: 'sass/**/*',
    css: 'css/**/*',
    output: 'dist/'
};

gulp.task('clean', function() {
    return gulp.src([paths.output])
        .pipe(vinylPaths(del));
});

function compilerTsOptions(override) {
    return assign(tsconfig.compilerOptions, {
        "target": override && override.target || "es5",
        "typescript": require('typescript')
    }, override || {});
}

compileToModules.forEach(function(moduleType) {
    gulp.task('build-ts-' + moduleType, function() {
        var tsProject = ts.createProject(
            compilerTsOptions({
                module: moduleType,
                target: moduleType == 'es2015' ? 'es2015' : 'es5'
            }), ts.reporter.defaultReporter());
        var tsResult = gulp.src([paths.source], {
            base: appRoot
        }).pipe(ts(tsProject));
        return tsResult.js
            .pipe(gulp.dest(paths.output));
    });
});
gulp.task('build-dts', function() {
    var tsProject = ts.createProject(
        compilerTsOptions({
            removeComments: false,
            target: "es2015",
            module: "es2015"
        }), ts.reporter.defaultReporter());
    var tsResult = gulp.src([paths.source], {
        base: appRoot
    }).pipe(ts(tsProject));
    return tsResult.dts.pipe(gulp.dest(paths.output + '/typings'));
});
gulp.task('bundle-dts', gulp.series('build-dts', function(done) {
    // dts.bundle({
    //     name: 'sigma-ui-framework',
    //     main: paths.output + '/typings/sigma-ui-framework.d.ts'
    // });
    done();
}));

gulp.task('copy-extras', function() {
    return gulp.src([paths.typings, paths.scripts, paths.html], {
        base: appRoot
    }).pipe(gulp.dest(paths.output));

    // return gulp.src([paths.sass, paths.css], {
    //     base: '.'
    // }).pipe(gulp.dest(paths.output));
});

gulp.task('build-ts', gulp.series('clean', 'build-ts-amd', 'bundle-dts', 'copy-extras',
    function(done) {
        done();
    }));
