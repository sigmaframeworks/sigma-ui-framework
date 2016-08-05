var gulp = require('gulp');

var bump = require('gulp-bump'),
    yargs = require('yargs');

var conventionalChangelog = require('gulp-conventional-changelog');

function getArgs() {
    var argv = yargs.argv,
        validBumpTypes = "major|minor|patch|prerelease".split("|"),
        bump = (argv.bump || 'patch').toLowerCase();

    if (validBumpTypes.indexOf(bump) === -1) {
        throw new Error('Unrecognized bump "' + bump + '".');
    }
    return bump;
}

gulp.task('changelog', function() {
    return gulp.src('./CHANGELOG.md', {
            buffer: false
        }).pipe(conventionalChangelog({
            preset: 'angular'
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('bump-version', function() {
    return gulp.src(['./package.json'])
        .pipe(bump({
            type: getArgs()
        })) //major|minor|patch|prerelease
        .pipe(gulp.dest('./'));
});

gulp.task('release', gulp.series('build-ts', 'bump-version', 'changelog', function(done) {
    done();
}));
