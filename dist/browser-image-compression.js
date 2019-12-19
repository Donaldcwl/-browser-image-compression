/**
 * Browser Image Compression
 * v1.0.6
 * by Donald <donaldcwl@gmail.com>
 * https://github.com/Donaldcwl/browser-image-compression
 */

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).imageCompression=t()}(this,function(){"use strict";function _slicedToArray(e,t){return function _arrayWithHoles(e){if(Array.isArray(e))return e}(e)||function _iterableToArrayLimit(e,t){var n=[],r=!0,a=!1,i=void 0;try{for(var o,c=e[Symbol.iterator]();!(r=(o=c.next()).done)&&(n.push(o.value),!t||n.length!==t);r=!0);}catch(e){a=!0,i=e}finally{try{r||null==c.return||c.return()}finally{if(a)throw i}}return n}(e,t)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var e="undefined"!=typeof window&&window.cordova&&window.cordova.require("cordova/modulemapper"),CustomFile=e&&e.getOriginalSymbol(window,"File")||File,CustomFileReader=e&&e.getOriginalSymbol(window,"FileReader")||FileReader;function getDataUrlFromFile(e){return new Promise(function(t,n){var r=new CustomFileReader;r.onload=function(){return t(r.result)},r.onerror=function(e){return n(e)},r.readAsDataURL(e)})}function getFilefromDataUrl(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Date.now();return new Promise(function(r){for(var a=e.split(","),i=a[0].match(/:(.*?);/)[1],o=atob(a[1]),c=o.length,s=new Uint8Array(c);c--;)s[c]=o.charCodeAt(c);var u=new Blob([s],{type:i});u.name=t,u.lastModified=n,r(u)})}function loadImage(e){return new Promise(function(t,n){var r=new Image;r.onload=function(){return t(r)},r.onerror=function(e){return n(e)},r.src=e})}function drawImageInCanvas(e){var t=_slicedToArray(getNewCanvasAndCtx(e.width,e.height),2),n=t[0];return t[1].drawImage(e,0,0,n.width,n.height),n}function drawFileInCanvas(e){return new Promise(function(t,n){var r,a,i=function $Try_1_Post(){try{return a=drawImageInCanvas(r),t([r,a])}catch(e){return n(e)}},o=function $Try_1_Catch(t){try{return getDataUrlFromFile(e).then(function(e){try{return loadImage(e).then(function(e){try{return r=e,i()}catch(e){return n(e)}},n)}catch(e){return n(e)}},n)}catch(e){return n(e)}};try{return createImageBitmap(e).then(function(e){try{return r=e,i()}catch(e){return o()}},o)}catch(e){o()}})}function canvasToFile(e,t,n,r){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1;return new Promise(function(i,o){var c;return"function"==typeof OffscreenCanvas&&e instanceof OffscreenCanvas?e.convertToBlob({type:t,quality:a}).then(function(e){try{return(c=e).name=n,c.lastModified=r,$If_4.call(this)}catch(e){return o(e)}}.bind(this),o):getFilefromDataUrl(e.toDataURL(t,a),n,r).then(function(e){try{return c=e,$If_4.call(this)}catch(e){return o(e)}}.bind(this),o);function $If_4(){return i(c)}})}function getExifOrientation(e){return new Promise(function(t,n){var r=new CustomFileReader;r.onload=function(e){var n=new DataView(e.target.result);if(65496!=n.getUint16(0,!1))return t(-2);for(var r=n.byteLength,a=2;a<r;){if(n.getUint16(a+2,!1)<=8)return t(-1);var i=n.getUint16(a,!1);if(a+=2,65505==i){if(1165519206!=n.getUint32(a+=2,!1))return t(-1);var o=18761==n.getUint16(a+=6,!1);a+=n.getUint32(a+4,o);var c=n.getUint16(a,o);a+=2;for(var s=0;s<c;s++)if(274==n.getUint16(a+12*s,o))return t(n.getUint16(a+12*s+8,o))}else{if(65280!=(65280&i))break;a+=n.getUint16(a,!1)}}return t(-1)},r.onerror=function(e){return n(e)},r.readAsArrayBuffer(e)})}function handleMaxWidthOrHeight(e,t){var n,r=e.width,a=e.height,i=t.maxWidthOrHeight,o=e;if(Number.isInteger(i)&&(r>i||a>i)){var c=_slicedToArray(getNewCanvasAndCtx(r,a),2);o=c[0],n=c[1],r>a?(o.width=i,o.height=a/r*i):(o.width=r/a*i,o.height=i),n.drawImage(e,0,0,o.width,o.height)}return o}function followExifOrientation(e,t){var n=e.width,r=e.height,a=_slicedToArray(getNewCanvasAndCtx(n,r),2),i=a[0],o=a[1];switch(4<t&&t<9?(i.width=r,i.height=n):(i.width=n,i.height=r),t){case 2:o.transform(-1,0,0,1,n,0);break;case 3:o.transform(-1,0,0,-1,n,r);break;case 4:o.transform(1,0,0,-1,0,r);break;case 5:o.transform(0,1,1,0,0,0);break;case 6:o.transform(0,1,-1,0,r,0);break;case 7:o.transform(0,-1,-1,0,r,n);break;case 8:o.transform(0,-1,1,0,0,n)}return o.drawImage(e,0,0,n,r),i}function getNewCanvasAndCtx(e,t){var n,r;try{r=(n=new OffscreenCanvas(e,t)).getContext("2d")}catch(e){r=(n=document.createElement("canvas")).getContext("2d")}return n.width=e,n.height=t,[n,r]}function compress(e,t){return new Promise(function(n,r){var a,i,o,c,s,u;return t.maxSizeMB=t.maxSizeMB||Number.POSITIVE_INFINITY,e instanceof Blob||e instanceof CustomFile?/^image/.test(e.type)?(a=t.maxIteration||10,i=1024*t.maxSizeMB*1024,drawFileInCanvas(e).then(function(f){try{var l=_slicedToArray(f,2);return l[0],o=handleMaxWidthOrHeight(o=l[1],t),new Promise(function(n,r){var a;if(!(a=t.exifOrientation))return getExifOrientation(e).then(function(e){try{return a=e,$If_3.call(this)}catch(e){return r(e)}}.bind(this),r);function $If_3(){return n(a)}return $If_3.call(this)}).then(function(f){try{return t.exifOrientation=f,o=followExifOrientation(o,t.exifOrientation),c=1,canvasToFile(o,e.type,e.name,e.lastModified,c).then(function(t){try{var f,l=function $Loop_4(){if(a--&&u.size>i){var t,n,s,f=_slicedToArray(getNewCanvasAndCtx(t=.9*o.width,n=.9*o.height),2);return s=f[0],f[1].drawImage(o,0,0,t,n),"image/jpeg"===e.type&&(c*=.9),canvasToFile(s,e.type,e.name,e.lastModified,c).then(function(e){try{return u=e,o=s,$Loop_4}catch(e){return r(e)}},r)}return[1]},d=function $Loop_4_exit(){try{u.name=e.name,u.lastModified=e.lastModified}catch(e){}return n(u)};return(s=t).size<=i?n(s):(u=s,(f=function(e){for(;e;){if(e.then)return void e.then(f,r);try{if(e.pop){if(e.length)return e.pop()?d.call(this):e;e=l}else e=e.call(this)}catch(e){return r(e)}}}.bind(this))(l))}catch(e){return r(e)}}.bind(this),r)}catch(e){return r(e)}}.bind(this),r)}catch(e){return r(e)}}.bind(this),r)):r(new Error("The file given is not an image")):r(new Error("The file given is not an instance of Blob or File"))})}var t,n=0;var r=function createWorker(e){return new Worker(URL.createObjectURL(new Blob(["(".concat(e,")()")])))}(function(){var e=!1;self.addEventListener("message",function(t){return new Promise(function(n,r){var a,i,o,c,s=t.data;a=s.file,i=s.id,o=s.imageCompressionLibUrl,c=s.options;var u=function $Try_1_Post(){try{return n()}catch(e){return r(e)}},f=function $Try_1_Catch(e){try{return self.postMessage({error:e.message+"\n"+e.stack,id:i}),u()}catch(e){return r(e)}};try{var l;return e||(importScripts(o),e=!0),compress(a,c).then(function(e){try{return l=e,self.postMessage({file:l,id:i}),u()}catch(e){return f(e)}},f)}catch(e){f(e)}})})});function compressOnWebWorker(e,a){return new Promise(function(i,o){return new Promise(function(c,s){t||(t=function createSourceObject(e){return URL.createObjectURL(new Blob([e],{type:"application/javascript"}))}("\n    canvasToFile = ".concat(canvasToFile,"\n    drawFileInCanvas = ").concat(drawFileInCanvas,"\n    drawImageInCanvas = ").concat(drawImageInCanvas,"\n    followExifOrientation = ").concat(followExifOrientation,"\n    getDataUrlFromFile = ").concat(getDataUrlFromFile,"\n    getExifOrientation = ").concat(getExifOrientation,"\n    getFilefromDataUrl = ").concat(getFilefromDataUrl,"\n    getNewCanvasAndCtx = ").concat(getNewCanvasAndCtx,"\n    handleMaxWidthOrHeight = ").concat(handleMaxWidthOrHeight,"\n    loadImage = ").concat(loadImage,"\n\n    CustomFileReader = FileReader\n\n    CustomFile = File\n\n    function _slicedToArray(arr, n) { return arr }\n\n    function compress (){return (").concat(compress,").apply(null, arguments)}\n    ")));var u=n++;return r.addEventListener("message",function handler(e){e.data.id===u&&(r.removeEventListener("message",handler),e.data.error&&o(new Error(e.data.error)),i(e.data.file))}),r.postMessage({file:e,id:u,imageCompressionLibUrl:t,options:a}),c()})})}function imageCompression(e,t){return new Promise(function(n,r){if(t.useWebWorker="boolean"!=typeof t.useWebWorker||t.useWebWorker,t.useWebWorker&&"function"==typeof Worker){(function(){try{return $If_2.call(this)}catch(e){return r(e)}}).bind(this);var a=function $Try_1_Catch(a){try{return console.warn("Run compression in web worker failed:",a,", fall back to main thread"),n(compress(e,t))}catch(e){return r(e)}};try{return compressOnWebWorker(e,t).then(function(e){try{return n(e)}catch(e){return a(e)}},a)}catch(e){a(e)}}function $If_2(){return n(compress(e,t))}return $If_2.call(this)})}return imageCompression.getDataUrlFromFile=getDataUrlFromFile,imageCompression.getFilefromDataUrl=getFilefromDataUrl,imageCompression.loadImage=loadImage,imageCompression.drawImageInCanvas=drawImageInCanvas,imageCompression.drawFileInCanvas=drawFileInCanvas,imageCompression.canvasToFile=canvasToFile,imageCompression.getExifOrientation=getExifOrientation,imageCompression.handleMaxWidthOrHeight=handleMaxWidthOrHeight,imageCompression.followExifOrientation=followExifOrientation,imageCompression});
//# sourceMappingURL=browser-image-compression.js.map
