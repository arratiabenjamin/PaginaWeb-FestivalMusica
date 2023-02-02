//src identifica el archivo, dest lo guarda.
const { src, dest, watch, parallel} = require('gulp'); //Extraer funcionalidades de una dependencia.

//CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

//Imagenes
//Comprimir Imagenes con Formato Comun (JPG, PNG, Etc)
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
//Conversion a Webp y Avif
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css( cb ) {
    src('src/scss/**/*.scss') //Identificar el archivo SASS
        .pipe( plumber() )
        .pipe( sass() ) //Compilarlo
        .pipe( dest("build/css") ) //Guardarlo en el Disco Duro

    cb(); //CallBack
}

//Comprimir y Conversion Imagenes.
function images( cb ){

    const options = {
        optimizationLevel : 3
    };

    src('src/img/**/*.{png,jpg}')
        .pipe( cache( imagemin(options) ) )
        .pipe( dest('build/img') )
     cb();
}
function versionWebp( cb ) {

    const options = {
        quality : 50
    };
    
    src('src/img/**/*.{png,jpg}')
        .pipe( webp(options) )
        .pipe( dest('build/img') )
    
    cb();
}
function versionAvif( cb ) {

    const options = {
        quality : 50
    };
    
    src('src/img/**/*.{png,jpg}')
        .pipe( avif(options) )
        .pipe( dest('build/img') )
    
    cb();
}

function dev( cb ) {
    watch('src/scss/**/*.scss', css);//Convertir todos los Archivos scss a css
    cb();
}

exports.css = css;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.images = parallel(versionWebp, versionAvif, images);
exports.dev = dev;

//exports.dev = parallel(versionWebp, dev); //Esto ejecuta funciones en paralelo.