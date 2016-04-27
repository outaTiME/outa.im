// generated on 2016-04-25 using generator-webapp 2.0.0
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import {stream as wiredep} from 'wiredep';
import pkg from './package.json';

const $ = gulpLoadPlugins({
  rename: {
    'gulp-replace-task': 'replace',
    'gulp-rev-replace': 'revReplace',
    'gulp-gh-pages': 'ghPages'
  }
});
const reload = browserSync.reload;

gulp.task('styles', () => {
  return gulp.src('app/styles/*.css')
    .pipe($.sourcemaps.init())
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({stream: true}));
});

gulp.task('scripts', () => {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe(reload({stream: true}));
});

const author = pkg.author.name;
const version = pkg.version;
const year = new Date().getFullYear();
const copyrightNotice = `Copyright © ${year} ${author}. All rights reserved.`;

const replaceOptions = {
  patterns: [
    {
      match: 'author',
      replacement: author
    },
    {
      match: 'version',
      replacement: version
    },
    {
      match: 'copyrightNotice',
      replacement: copyrightNotice
    },
    {
      match: 'timestamp',
      replacement: require('dateformat')()
    }
  ]
};

gulp.task('replace', () => {
  return gulp.src([
      'app/*.html',
      'app/humans.txt'
    ])
    .pipe($.replace(replaceOptions))
    .pipe(gulp.dest('.tmp'))
    .pipe(reload({stream: true}));
});

function lint(files, options) {
  return () => {
    return gulp.src(files)
      .pipe(reload({stream: true, once: true}))
      .pipe($.eslint(options))
      .pipe($.eslint.format())
      .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
  };
}

const testLintOptions = {
  env: {
    mocha: true
  }
};

gulp.task('lint', lint('app/scripts/**/*.js'));
gulp.task('lint:test', lint('test/spec/**/*.js', testLintOptions));

const banner = [
  '/*!',
  ' *              __     _',
  ' *   _    _/__  /./|,//_`',
  ' *  /_//_// /_|///  //_, v.<%= version %>',
  ' *',
  ' * <%= copyrightNotice %>',
  ' */',
  ''
].join('\n');

const headerOptions = {
  version: version,
  copyrightNotice: copyrightNotice
};

const cssnanoOptions = {
  discardComments: {
    removeAll: true
  }
};

const htmlminOptions = {
  collapseWhitespace: true,
  // custom
  removeComments: true,
  minifyJS: true
};

gulp.task('html', ['styles', 'scripts'], () => {
  const jsFilter = $.filter('**/*.js', { restore: true, dot: true });
  const cssFilter = $.filter('**/*.css', { restore: true, dot: true });
  const htmlFilter = $.filter('**/*.html', { restore: true, dot: true });
  return gulp.src('app/*.html')
    .pipe($.useref({searchPath: ['.tmp', 'app', '.']}))
    .pipe(jsFilter)
    .pipe($.uglify())
    .pipe($.header(banner, headerOptions))
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe($.cssnano(cssnanoOptions))
    .pipe($.header(banner, headerOptions))
    .pipe(cssFilter.restore)
    .pipe(htmlFilter)
    .pipe($.htmlmin(htmlminOptions))
    .pipe(htmlFilter.restore)
    .pipe(gulp.dest('dist'));
});

gulp.task('html_v2', ['styles', 'scripts'], () => {
  const jsFilter = $.filter('**/*.js', { restore: true, dot: true });
  const cssFilter = $.filter('**/*.css', { restore: true, dot: true });
  const htmlFilter = $.filter('**/*.html', { restore: true, dot: true });
  const indexHtmlFilter = $.filter(['**/*', '!**/index.html'], { restore: true, dot: true });
  return gulp.src('app/*.html')
    .pipe($.useref({searchPath: ['.tmp', 'app', '.']}))
    .pipe(jsFilter)
    .pipe($.uglify())
    .pipe($.header(banner, headerOptions))
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe($.cssnano(cssnanoOptions))
    .pipe($.header(banner, headerOptions))
    .pipe(cssFilter.restore)
    .pipe(htmlFilter)
    .pipe($.htmlmin(htmlminOptions))
    .pipe(htmlFilter.restore)
    .pipe(indexHtmlFilter)
    .pipe($.rev())
    .pipe(indexHtmlFilter.restore)
    .pipe($.revReplace())
    .pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) {})
    .concat('app/fonts/**/*'))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', () => {
  return gulp.src([
    'app/*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['styles', 'scripts', 'replace', 'fonts'], () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch([
    // '.app/*.html',
    '.tmp/*.html',
    'app/images/**/*',
    '.tmp/fonts/**/*'
  ]).on('change', reload);

  gulp.watch('app/*.html', ['replace']);
  gulp.watch('app/styles/**/*.css', ['styles']);
  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch('app/fonts/**/*', ['fonts']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);
});

gulp.task('serve:dist', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('serve:test', ['scripts'], () => {
  browserSync({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/scripts': '.tmp/scripts',
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch('test/spec/**/*.js').on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components
gulp.task('wiredep', () => {
  gulp.src('app/*.html')
    .pipe(wiredep({
      exclude: ['bootstrap.js'],
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('build', ['lint', 'html', 'images', 'fonts', 'extras'], () => {
  const replaceFilter = $.filter(['index.html', 'humans.txt'], { restore: true, matchBase: true });
  const revFilter = $.filter(['/images/*.png'], { restore: true, matchBase: true, debug: true});
  return gulp.src('dist/**/*')
    // replace
    .pipe(replaceFilter)
    .pipe($.replace(replaceOptions))
    .pipe(replaceFilter.restore)
    // rev
    .pipe(revFilter)
    .pipe($.rev())
    .pipe(revFilter.restore)
    // renames
    .pipe($.revReplace())
    .pipe(gulp.dest('dist'))
    .pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});

gulp.task('deploy', ['build'], () => {
  return gulp.src('dist/**/*')
    .pipe($.ghPages());
});
