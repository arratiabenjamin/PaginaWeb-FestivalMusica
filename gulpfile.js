//src identifica el archivo, dest lo guarda.
const { src, dest, watch } = require('gulp'); //Extraer funcionalidades de una dependencia.
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

function css( cb ) {
    src('src/scss/**/*.scss') //Identificar el archivo SASS
        .pipe( plumber() )
        .pipe( sass() ) //Compilarlo
        .pipe( dest("build/css") ) //Guardarlo en el Disco Duro

    cb(); //CallBack
}

function dev( cb ) {
    watch('src/scss/**/*.scss', css);
    cb();
}

exports.css = css;
exports.dev = dev;