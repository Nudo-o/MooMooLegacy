/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/encodr/lib/encodr.browser.js":
/*!***************************************************!*\
  !*** ./node_modules/encodr/lib/encodr.browser.js ***!
  \***************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*
**  Encodr -- Encoding/Decoding to/from JSON/CBOR/MsgPack
**  Copyright (c) 2017-2023 Dr. Ralf S. Engelschall <rse@engelschall.com>
**
**  Permission is hereby granted, free of charge, to any person obtaining
**  a copy of this software and associated documentation files (the
**  "Software"), to deal in the Software without restriction, including
**  without limitation the rights to use, copy, modify, merge, publish,
**  distribute, sublicense, and/or sell copies of the Software, and to
**  permit persons to whom the Software is furnished to do so, subject to
**  the following conditions:
**
**  The above copyright notice and this permission notice shall be included
**  in all copies or substantial portions of the Software.
**
**  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
**  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
**  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
**  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
**  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
**  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
**  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

(function(f){if(true){module.exports=f()}else { var g; }})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c=undefined;if(!f&&c)return require(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u=undefined,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
"use strict";exports.byteLength=byteLength,exports.toByteArray=toByteArray,exports.fromByteArray=fromByteArray;for(var lookup=[],revLookup=[],Arr="undefined"!=typeof Uint8Array?Uint8Array:Array,code="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",i=0,len=code.length;i<len;++i)lookup[i]=code[i],revLookup[code.charCodeAt(i)]=i;function getLens(o){var r=o.length;if(r%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var e=o.indexOf("=");return-1===e&&(e=r),[e,e===r?0:4-e%4]}function byteLength(o){var r=getLens(o),e=r[0],t=r[1];return 3*(e+t)/4-t}function _byteLength(o,r,e){return 3*(r+e)/4-e}function toByteArray(o){var r,e,t=getLens(o),n=t[0],u=t[1],p=new Arr(_byteLength(o,n,u)),a=0,h=u>0?n-4:n;for(e=0;e<h;e+=4)r=revLookup[o.charCodeAt(e)]<<18|revLookup[o.charCodeAt(e+1)]<<12|revLookup[o.charCodeAt(e+2)]<<6|revLookup[o.charCodeAt(e+3)],p[a++]=r>>16&255,p[a++]=r>>8&255,p[a++]=255&r;return 2===u&&(r=revLookup[o.charCodeAt(e)]<<2|revLookup[o.charCodeAt(e+1)]>>4,p[a++]=255&r),1===u&&(r=revLookup[o.charCodeAt(e)]<<10|revLookup[o.charCodeAt(e+1)]<<4|revLookup[o.charCodeAt(e+2)]>>2,p[a++]=r>>8&255,p[a++]=255&r),p}function tripletToBase64(o){return lookup[o>>18&63]+lookup[o>>12&63]+lookup[o>>6&63]+lookup[63&o]}function encodeChunk(o,r,e){for(var t,n=[],u=r;u<e;u+=3)t=(o[u]<<16&16711680)+(o[u+1]<<8&65280)+(255&o[u+2]),n.push(tripletToBase64(t));return n.join("")}function fromByteArray(o){for(var r,e=o.length,t=e%3,n=[],u=0,p=e-t;u<p;u+=16383)n.push(encodeChunk(o,u,u+16383>p?p:u+16383));return 1===t?(r=o[e-1],n.push(lookup[r>>2]+lookup[r<<4&63]+"==")):2===t&&(r=(o[e-2]<<8)+o[e-1],n.push(lookup[r>>10]+lookup[r>>4&63]+lookup[r<<2&63]+"=")),n.join("")}revLookup["-".charCodeAt(0)]=62,revLookup["_".charCodeAt(0)]=63;
},{}],2:[function(_dereq_,module,exports){

},{}],3:[function(_dereq_,module,exports){
(function (Buffer){(function (){
"use strict";var base64=_dereq_("base64-js"),ieee754=_dereq_("ieee754");exports.Buffer=Buffer,exports.SlowBuffer=SlowBuffer,exports.INSPECT_MAX_BYTES=50;var K_MAX_LENGTH=2147483647;function typedArraySupport(){try{var e=new Uint8Array(1);return e.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===e.foo()}catch(e){return!1}}function createBuffer(e){if(e>K_MAX_LENGTH)throw new RangeError('The value "'+e+'" is invalid for option "size"');var t=new Uint8Array(e);return t.__proto__=Buffer.prototype,t}function Buffer(e,t,r){if("number"==typeof e){if("string"==typeof t)throw new TypeError('The "string" argument must be of type string. Received type number');return allocUnsafe(e)}return from(e,t,r)}function from(e,t,r){if("string"==typeof e)return fromString(e,t);if(ArrayBuffer.isView(e))return fromArrayLike(e);if(null==e)throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof e);if(isInstance(e,ArrayBuffer)||e&&isInstance(e.buffer,ArrayBuffer))return fromArrayBuffer(e,t,r);if("number"==typeof e)throw new TypeError('The "value" argument must not be of type number. Received type number');var n=e.valueOf&&e.valueOf();if(null!=n&&n!==e)return Buffer.from(n,t,r);var f=fromObject(e);if(f)return f;if("undefined"!=typeof Symbol&&null!=Symbol.toPrimitive&&"function"==typeof e[Symbol.toPrimitive])return Buffer.from(e[Symbol.toPrimitive]("string"),t,r);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof e)}function assertSize(e){if("number"!=typeof e)throw new TypeError('"size" argument must be of type number');if(e<0)throw new RangeError('The value "'+e+'" is invalid for option "size"')}function alloc(e,t,r){return assertSize(e),e<=0?createBuffer(e):void 0!==t?"string"==typeof r?createBuffer(e).fill(t,r):createBuffer(e).fill(t):createBuffer(e)}function allocUnsafe(e){return assertSize(e),createBuffer(e<0?0:0|checked(e))}function fromString(e,t){if("string"==typeof t&&""!==t||(t="utf8"),!Buffer.isEncoding(t))throw new TypeError("Unknown encoding: "+t);var r=0|byteLength(e,t),n=createBuffer(r),f=n.write(e,t);return f!==r&&(n=n.slice(0,f)),n}function fromArrayLike(e){for(var t=e.length<0?0:0|checked(e.length),r=createBuffer(t),n=0;n<t;n+=1)r[n]=255&e[n];return r}function fromArrayBuffer(e,t,r){if(t<0||e.byteLength<t)throw new RangeError('"offset" is outside of buffer bounds');if(e.byteLength<t+(r||0))throw new RangeError('"length" is outside of buffer bounds');var n;return(n=void 0===t&&void 0===r?new Uint8Array(e):void 0===r?new Uint8Array(e,t):new Uint8Array(e,t,r)).__proto__=Buffer.prototype,n}function fromObject(e){if(Buffer.isBuffer(e)){var t=0|checked(e.length),r=createBuffer(t);return 0===r.length?r:(e.copy(r,0,0,t),r)}return void 0!==e.length?"number"!=typeof e.length||numberIsNaN(e.length)?createBuffer(0):fromArrayLike(e):"Buffer"===e.type&&Array.isArray(e.data)?fromArrayLike(e.data):void 0}function checked(e){if(e>=K_MAX_LENGTH)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+K_MAX_LENGTH.toString(16)+" bytes");return 0|e}function SlowBuffer(e){return+e!=e&&(e=0),Buffer.alloc(+e)}function byteLength(e,t){if(Buffer.isBuffer(e))return e.length;if(ArrayBuffer.isView(e)||isInstance(e,ArrayBuffer))return e.byteLength;if("string"!=typeof e)throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof e);var r=e.length,n=arguments.length>2&&!0===arguments[2];if(!n&&0===r)return 0;for(var f=!1;;)switch(t){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":return utf8ToBytes(e).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return base64ToBytes(e).length;default:if(f)return n?-1:utf8ToBytes(e).length;t=(""+t).toLowerCase(),f=!0}}function slowToString(e,t,r){var n=!1;if((void 0===t||t<0)&&(t=0),t>this.length)return"";if((void 0===r||r>this.length)&&(r=this.length),r<=0)return"";if((r>>>=0)<=(t>>>=0))return"";for(e||(e="utf8");;)switch(e){case"hex":return hexSlice(this,t,r);case"utf8":case"utf-8":return utf8Slice(this,t,r);case"ascii":return asciiSlice(this,t,r);case"latin1":case"binary":return latin1Slice(this,t,r);case"base64":return base64Slice(this,t,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return utf16leSlice(this,t,r);default:if(n)throw new TypeError("Unknown encoding: "+e);e=(e+"").toLowerCase(),n=!0}}function swap(e,t,r){var n=e[t];e[t]=e[r],e[r]=n}function bidirectionalIndexOf(e,t,r,n,f){if(0===e.length)return-1;if("string"==typeof r?(n=r,r=0):r>2147483647?r=2147483647:r<-2147483648&&(r=-2147483648),numberIsNaN(r=+r)&&(r=f?0:e.length-1),r<0&&(r=e.length+r),r>=e.length){if(f)return-1;r=e.length-1}else if(r<0){if(!f)return-1;r=0}if("string"==typeof t&&(t=Buffer.from(t,n)),Buffer.isBuffer(t))return 0===t.length?-1:arrayIndexOf(e,t,r,n,f);if("number"==typeof t)return t&=255,"function"==typeof Uint8Array.prototype.indexOf?f?Uint8Array.prototype.indexOf.call(e,t,r):Uint8Array.prototype.lastIndexOf.call(e,t,r):arrayIndexOf(e,[t],r,n,f);throw new TypeError("val must be string, number or Buffer")}function arrayIndexOf(e,t,r,n,f){var i,o=1,u=e.length,s=t.length;if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(e.length<2||t.length<2)return-1;o=2,u/=2,s/=2,r/=2}function a(e,t){return 1===o?e[t]:e.readUInt16BE(t*o)}if(f){var h=-1;for(i=r;i<u;i++)if(a(e,i)===a(t,-1===h?0:i-h)){if(-1===h&&(h=i),i-h+1===s)return h*o}else-1!==h&&(i-=i-h),h=-1}else for(r+s>u&&(r=u-s),i=r;i>=0;i--){for(var c=!0,l=0;l<s;l++)if(a(e,i+l)!==a(t,l)){c=!1;break}if(c)return i}return-1}function hexWrite(e,t,r,n){r=Number(r)||0;var f=e.length-r;n?(n=Number(n))>f&&(n=f):n=f;var i=t.length;n>i/2&&(n=i/2);for(var o=0;o<n;++o){var u=parseInt(t.substr(2*o,2),16);if(numberIsNaN(u))return o;e[r+o]=u}return o}function utf8Write(e,t,r,n){return blitBuffer(utf8ToBytes(t,e.length-r),e,r,n)}function asciiWrite(e,t,r,n){return blitBuffer(asciiToBytes(t),e,r,n)}function latin1Write(e,t,r,n){return asciiWrite(e,t,r,n)}function base64Write(e,t,r,n){return blitBuffer(base64ToBytes(t),e,r,n)}function ucs2Write(e,t,r,n){return blitBuffer(utf16leToBytes(t,e.length-r),e,r,n)}function base64Slice(e,t,r){return 0===t&&r===e.length?base64.fromByteArray(e):base64.fromByteArray(e.slice(t,r))}function utf8Slice(e,t,r){r=Math.min(e.length,r);for(var n=[],f=t;f<r;){var i,o,u,s,a=e[f],h=null,c=a>239?4:a>223?3:a>191?2:1;if(f+c<=r)switch(c){case 1:a<128&&(h=a);break;case 2:128==(192&(i=e[f+1]))&&(s=(31&a)<<6|63&i)>127&&(h=s);break;case 3:i=e[f+1],o=e[f+2],128==(192&i)&&128==(192&o)&&(s=(15&a)<<12|(63&i)<<6|63&o)>2047&&(s<55296||s>57343)&&(h=s);break;case 4:i=e[f+1],o=e[f+2],u=e[f+3],128==(192&i)&&128==(192&o)&&128==(192&u)&&(s=(15&a)<<18|(63&i)<<12|(63&o)<<6|63&u)>65535&&s<1114112&&(h=s)}null===h?(h=65533,c=1):h>65535&&(h-=65536,n.push(h>>>10&1023|55296),h=56320|1023&h),n.push(h),f+=c}return decodeCodePointsArray(n)}exports.kMaxLength=K_MAX_LENGTH,Buffer.TYPED_ARRAY_SUPPORT=typedArraySupport(),Buffer.TYPED_ARRAY_SUPPORT||"undefined"==typeof console||"function"!=typeof console.error||console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),Object.defineProperty(Buffer.prototype,"parent",{enumerable:!0,get:function(){if(Buffer.isBuffer(this))return this.buffer}}),Object.defineProperty(Buffer.prototype,"offset",{enumerable:!0,get:function(){if(Buffer.isBuffer(this))return this.byteOffset}}),"undefined"!=typeof Symbol&&null!=Symbol.species&&Buffer[Symbol.species]===Buffer&&Object.defineProperty(Buffer,Symbol.species,{value:null,configurable:!0,enumerable:!1,writable:!1}),Buffer.poolSize=8192,Buffer.from=function(e,t,r){return from(e,t,r)},Buffer.prototype.__proto__=Uint8Array.prototype,Buffer.__proto__=Uint8Array,Buffer.alloc=function(e,t,r){return alloc(e,t,r)},Buffer.allocUnsafe=function(e){return allocUnsafe(e)},Buffer.allocUnsafeSlow=function(e){return allocUnsafe(e)},Buffer.isBuffer=function(e){return null!=e&&!0===e._isBuffer&&e!==Buffer.prototype},Buffer.compare=function(e,t){if(isInstance(e,Uint8Array)&&(e=Buffer.from(e,e.offset,e.byteLength)),isInstance(t,Uint8Array)&&(t=Buffer.from(t,t.offset,t.byteLength)),!Buffer.isBuffer(e)||!Buffer.isBuffer(t))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(e===t)return 0;for(var r=e.length,n=t.length,f=0,i=Math.min(r,n);f<i;++f)if(e[f]!==t[f]){r=e[f],n=t[f];break}return r<n?-1:n<r?1:0},Buffer.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},Buffer.concat=function(e,t){if(!Array.isArray(e))throw new TypeError('"list" argument must be an Array of Buffers');if(0===e.length)return Buffer.alloc(0);var r;if(void 0===t)for(t=0,r=0;r<e.length;++r)t+=e[r].length;var n=Buffer.allocUnsafe(t),f=0;for(r=0;r<e.length;++r){var i=e[r];if(isInstance(i,Uint8Array)&&(i=Buffer.from(i)),!Buffer.isBuffer(i))throw new TypeError('"list" argument must be an Array of Buffers');i.copy(n,f),f+=i.length}return n},Buffer.byteLength=byteLength,Buffer.prototype._isBuffer=!0,Buffer.prototype.swap16=function(){var e=this.length;if(e%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var t=0;t<e;t+=2)swap(this,t,t+1);return this},Buffer.prototype.swap32=function(){var e=this.length;if(e%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var t=0;t<e;t+=4)swap(this,t,t+3),swap(this,t+1,t+2);return this},Buffer.prototype.swap64=function(){var e=this.length;if(e%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var t=0;t<e;t+=8)swap(this,t,t+7),swap(this,t+1,t+6),swap(this,t+2,t+5),swap(this,t+3,t+4);return this},Buffer.prototype.toString=function(){var e=this.length;return 0===e?"":0===arguments.length?utf8Slice(this,0,e):slowToString.apply(this,arguments)},Buffer.prototype.toLocaleString=Buffer.prototype.toString,Buffer.prototype.equals=function(e){if(!Buffer.isBuffer(e))throw new TypeError("Argument must be a Buffer");return this===e||0===Buffer.compare(this,e)},Buffer.prototype.inspect=function(){var e="",t=exports.INSPECT_MAX_BYTES;return e=this.toString("hex",0,t).replace(/(.{2})/g,"$1 ").trim(),this.length>t&&(e+=" ... "),"<Buffer "+e+">"},Buffer.prototype.compare=function(e,t,r,n,f){if(isInstance(e,Uint8Array)&&(e=Buffer.from(e,e.offset,e.byteLength)),!Buffer.isBuffer(e))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof e);if(void 0===t&&(t=0),void 0===r&&(r=e?e.length:0),void 0===n&&(n=0),void 0===f&&(f=this.length),t<0||r>e.length||n<0||f>this.length)throw new RangeError("out of range index");if(n>=f&&t>=r)return 0;if(n>=f)return-1;if(t>=r)return 1;if(this===e)return 0;for(var i=(f>>>=0)-(n>>>=0),o=(r>>>=0)-(t>>>=0),u=Math.min(i,o),s=this.slice(n,f),a=e.slice(t,r),h=0;h<u;++h)if(s[h]!==a[h]){i=s[h],o=a[h];break}return i<o?-1:o<i?1:0},Buffer.prototype.includes=function(e,t,r){return-1!==this.indexOf(e,t,r)},Buffer.prototype.indexOf=function(e,t,r){return bidirectionalIndexOf(this,e,t,r,!0)},Buffer.prototype.lastIndexOf=function(e,t,r){return bidirectionalIndexOf(this,e,t,r,!1)},Buffer.prototype.write=function(e,t,r,n){if(void 0===t)n="utf8",r=this.length,t=0;else if(void 0===r&&"string"==typeof t)n=t,r=this.length,t=0;else{if(!isFinite(t))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");t>>>=0,isFinite(r)?(r>>>=0,void 0===n&&(n="utf8")):(n=r,r=void 0)}var f=this.length-t;if((void 0===r||r>f)&&(r=f),e.length>0&&(r<0||t<0)||t>this.length)throw new RangeError("Attempt to write outside buffer bounds");n||(n="utf8");for(var i=!1;;)switch(n){case"hex":return hexWrite(this,e,t,r);case"utf8":case"utf-8":return utf8Write(this,e,t,r);case"ascii":return asciiWrite(this,e,t,r);case"latin1":case"binary":return latin1Write(this,e,t,r);case"base64":return base64Write(this,e,t,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return ucs2Write(this,e,t,r);default:if(i)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),i=!0}},Buffer.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var MAX_ARGUMENTS_LENGTH=4096;function decodeCodePointsArray(e){var t=e.length;if(t<=MAX_ARGUMENTS_LENGTH)return String.fromCharCode.apply(String,e);for(var r="",n=0;n<t;)r+=String.fromCharCode.apply(String,e.slice(n,n+=MAX_ARGUMENTS_LENGTH));return r}function asciiSlice(e,t,r){var n="";r=Math.min(e.length,r);for(var f=t;f<r;++f)n+=String.fromCharCode(127&e[f]);return n}function latin1Slice(e,t,r){var n="";r=Math.min(e.length,r);for(var f=t;f<r;++f)n+=String.fromCharCode(e[f]);return n}function hexSlice(e,t,r){var n=e.length;(!t||t<0)&&(t=0),(!r||r<0||r>n)&&(r=n);for(var f="",i=t;i<r;++i)f+=toHex(e[i]);return f}function utf16leSlice(e,t,r){for(var n=e.slice(t,r),f="",i=0;i<n.length;i+=2)f+=String.fromCharCode(n[i]+256*n[i+1]);return f}function checkOffset(e,t,r){if(e%1!=0||e<0)throw new RangeError("offset is not uint");if(e+t>r)throw new RangeError("Trying to access beyond buffer length")}function checkInt(e,t,r,n,f,i){if(!Buffer.isBuffer(e))throw new TypeError('"buffer" argument must be a Buffer instance');if(t>f||t<i)throw new RangeError('"value" argument is out of bounds');if(r+n>e.length)throw new RangeError("Index out of range")}function checkIEEE754(e,t,r,n,f,i){if(r+n>e.length)throw new RangeError("Index out of range");if(r<0)throw new RangeError("Index out of range")}function writeFloat(e,t,r,n,f){return t=+t,r>>>=0,f||checkIEEE754(e,t,r,4,3.4028234663852886e38,-3.4028234663852886e38),ieee754.write(e,t,r,n,23,4),r+4}function writeDouble(e,t,r,n,f){return t=+t,r>>>=0,f||checkIEEE754(e,t,r,8,1.7976931348623157e308,-1.7976931348623157e308),ieee754.write(e,t,r,n,52,8),r+8}Buffer.prototype.slice=function(e,t){var r=this.length;(e=~~e)<0?(e+=r)<0&&(e=0):e>r&&(e=r),(t=void 0===t?r:~~t)<0?(t+=r)<0&&(t=0):t>r&&(t=r),t<e&&(t=e);var n=this.subarray(e,t);return n.__proto__=Buffer.prototype,n},Buffer.prototype.readUIntLE=function(e,t,r){e>>>=0,t>>>=0,r||checkOffset(e,t,this.length);for(var n=this[e],f=1,i=0;++i<t&&(f*=256);)n+=this[e+i]*f;return n},Buffer.prototype.readUIntBE=function(e,t,r){e>>>=0,t>>>=0,r||checkOffset(e,t,this.length);for(var n=this[e+--t],f=1;t>0&&(f*=256);)n+=this[e+--t]*f;return n},Buffer.prototype.readUInt8=function(e,t){return e>>>=0,t||checkOffset(e,1,this.length),this[e]},Buffer.prototype.readUInt16LE=function(e,t){return e>>>=0,t||checkOffset(e,2,this.length),this[e]|this[e+1]<<8},Buffer.prototype.readUInt16BE=function(e,t){return e>>>=0,t||checkOffset(e,2,this.length),this[e]<<8|this[e+1]},Buffer.prototype.readUInt32LE=function(e,t){return e>>>=0,t||checkOffset(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+16777216*this[e+3]},Buffer.prototype.readUInt32BE=function(e,t){return e>>>=0,t||checkOffset(e,4,this.length),16777216*this[e]+(this[e+1]<<16|this[e+2]<<8|this[e+3])},Buffer.prototype.readIntLE=function(e,t,r){e>>>=0,t>>>=0,r||checkOffset(e,t,this.length);for(var n=this[e],f=1,i=0;++i<t&&(f*=256);)n+=this[e+i]*f;return n>=(f*=128)&&(n-=Math.pow(2,8*t)),n},Buffer.prototype.readIntBE=function(e,t,r){e>>>=0,t>>>=0,r||checkOffset(e,t,this.length);for(var n=t,f=1,i=this[e+--n];n>0&&(f*=256);)i+=this[e+--n]*f;return i>=(f*=128)&&(i-=Math.pow(2,8*t)),i},Buffer.prototype.readInt8=function(e,t){return e>>>=0,t||checkOffset(e,1,this.length),128&this[e]?-1*(255-this[e]+1):this[e]},Buffer.prototype.readInt16LE=function(e,t){e>>>=0,t||checkOffset(e,2,this.length);var r=this[e]|this[e+1]<<8;return 32768&r?4294901760|r:r},Buffer.prototype.readInt16BE=function(e,t){e>>>=0,t||checkOffset(e,2,this.length);var r=this[e+1]|this[e]<<8;return 32768&r?4294901760|r:r},Buffer.prototype.readInt32LE=function(e,t){return e>>>=0,t||checkOffset(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},Buffer.prototype.readInt32BE=function(e,t){return e>>>=0,t||checkOffset(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]},Buffer.prototype.readFloatLE=function(e,t){return e>>>=0,t||checkOffset(e,4,this.length),ieee754.read(this,e,!0,23,4)},Buffer.prototype.readFloatBE=function(e,t){return e>>>=0,t||checkOffset(e,4,this.length),ieee754.read(this,e,!1,23,4)},Buffer.prototype.readDoubleLE=function(e,t){return e>>>=0,t||checkOffset(e,8,this.length),ieee754.read(this,e,!0,52,8)},Buffer.prototype.readDoubleBE=function(e,t){return e>>>=0,t||checkOffset(e,8,this.length),ieee754.read(this,e,!1,52,8)},Buffer.prototype.writeUIntLE=function(e,t,r,n){(e=+e,t>>>=0,r>>>=0,n)||checkInt(this,e,t,r,Math.pow(2,8*r)-1,0);var f=1,i=0;for(this[t]=255&e;++i<r&&(f*=256);)this[t+i]=e/f&255;return t+r},Buffer.prototype.writeUIntBE=function(e,t,r,n){(e=+e,t>>>=0,r>>>=0,n)||checkInt(this,e,t,r,Math.pow(2,8*r)-1,0);var f=r-1,i=1;for(this[t+f]=255&e;--f>=0&&(i*=256);)this[t+f]=e/i&255;return t+r},Buffer.prototype.writeUInt8=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,1,255,0),this[t]=255&e,t+1},Buffer.prototype.writeUInt16LE=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,2,65535,0),this[t]=255&e,this[t+1]=e>>>8,t+2},Buffer.prototype.writeUInt16BE=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,2,65535,0),this[t]=e>>>8,this[t+1]=255&e,t+2},Buffer.prototype.writeUInt32LE=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,4,4294967295,0),this[t+3]=e>>>24,this[t+2]=e>>>16,this[t+1]=e>>>8,this[t]=255&e,t+4},Buffer.prototype.writeUInt32BE=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,4,4294967295,0),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e,t+4},Buffer.prototype.writeIntLE=function(e,t,r,n){if(e=+e,t>>>=0,!n){var f=Math.pow(2,8*r-1);checkInt(this,e,t,r,f-1,-f)}var i=0,o=1,u=0;for(this[t]=255&e;++i<r&&(o*=256);)e<0&&0===u&&0!==this[t+i-1]&&(u=1),this[t+i]=(e/o>>0)-u&255;return t+r},Buffer.prototype.writeIntBE=function(e,t,r,n){if(e=+e,t>>>=0,!n){var f=Math.pow(2,8*r-1);checkInt(this,e,t,r,f-1,-f)}var i=r-1,o=1,u=0;for(this[t+i]=255&e;--i>=0&&(o*=256);)e<0&&0===u&&0!==this[t+i+1]&&(u=1),this[t+i]=(e/o>>0)-u&255;return t+r},Buffer.prototype.writeInt8=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,1,127,-128),e<0&&(e=255+e+1),this[t]=255&e,t+1},Buffer.prototype.writeInt16LE=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,2,32767,-32768),this[t]=255&e,this[t+1]=e>>>8,t+2},Buffer.prototype.writeInt16BE=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,2,32767,-32768),this[t]=e>>>8,this[t+1]=255&e,t+2},Buffer.prototype.writeInt32LE=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,4,2147483647,-2147483648),this[t]=255&e,this[t+1]=e>>>8,this[t+2]=e>>>16,this[t+3]=e>>>24,t+4},Buffer.prototype.writeInt32BE=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,4,2147483647,-2147483648),e<0&&(e=4294967295+e+1),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e,t+4},Buffer.prototype.writeFloatLE=function(e,t,r){return writeFloat(this,e,t,!0,r)},Buffer.prototype.writeFloatBE=function(e,t,r){return writeFloat(this,e,t,!1,r)},Buffer.prototype.writeDoubleLE=function(e,t,r){return writeDouble(this,e,t,!0,r)},Buffer.prototype.writeDoubleBE=function(e,t,r){return writeDouble(this,e,t,!1,r)},Buffer.prototype.copy=function(e,t,r,n){if(!Buffer.isBuffer(e))throw new TypeError("argument should be a Buffer");if(r||(r=0),n||0===n||(n=this.length),t>=e.length&&(t=e.length),t||(t=0),n>0&&n<r&&(n=r),n===r)return 0;if(0===e.length||0===this.length)return 0;if(t<0)throw new RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),e.length-t<n-r&&(n=e.length-t+r);var f=n-r;if(this===e&&"function"==typeof Uint8Array.prototype.copyWithin)this.copyWithin(t,r,n);else if(this===e&&r<t&&t<n)for(var i=f-1;i>=0;--i)e[i+t]=this[i+r];else Uint8Array.prototype.set.call(e,this.subarray(r,n),t);return f},Buffer.prototype.fill=function(e,t,r,n){if("string"==typeof e){if("string"==typeof t?(n=t,t=0,r=this.length):"string"==typeof r&&(n=r,r=this.length),void 0!==n&&"string"!=typeof n)throw new TypeError("encoding must be a string");if("string"==typeof n&&!Buffer.isEncoding(n))throw new TypeError("Unknown encoding: "+n);if(1===e.length){var f=e.charCodeAt(0);("utf8"===n&&f<128||"latin1"===n)&&(e=f)}}else"number"==typeof e&&(e&=255);if(t<0||this.length<t||this.length<r)throw new RangeError("Out of range index");if(r<=t)return this;var i;if(t>>>=0,r=void 0===r?this.length:r>>>0,e||(e=0),"number"==typeof e)for(i=t;i<r;++i)this[i]=e;else{var o=Buffer.isBuffer(e)?e:Buffer.from(e,n),u=o.length;if(0===u)throw new TypeError('The value "'+e+'" is invalid for argument "value"');for(i=0;i<r-t;++i)this[i+t]=o[i%u]}return this};var INVALID_BASE64_RE=/[^+/0-9A-Za-z-_]/g;function base64clean(e){if((e=(e=e.split("=")[0]).trim().replace(INVALID_BASE64_RE,"")).length<2)return"";for(;e.length%4!=0;)e+="=";return e}function toHex(e){return e<16?"0"+e.toString(16):e.toString(16)}function utf8ToBytes(e,t){var r;t=t||1/0;for(var n=e.length,f=null,i=[],o=0;o<n;++o){if((r=e.charCodeAt(o))>55295&&r<57344){if(!f){if(r>56319){(t-=3)>-1&&i.push(239,191,189);continue}if(o+1===n){(t-=3)>-1&&i.push(239,191,189);continue}f=r;continue}if(r<56320){(t-=3)>-1&&i.push(239,191,189),f=r;continue}r=65536+(f-55296<<10|r-56320)}else f&&(t-=3)>-1&&i.push(239,191,189);if(f=null,r<128){if((t-=1)<0)break;i.push(r)}else if(r<2048){if((t-=2)<0)break;i.push(r>>6|192,63&r|128)}else if(r<65536){if((t-=3)<0)break;i.push(r>>12|224,r>>6&63|128,63&r|128)}else{if(!(r<1114112))throw new Error("Invalid code point");if((t-=4)<0)break;i.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}}return i}function asciiToBytes(e){for(var t=[],r=0;r<e.length;++r)t.push(255&e.charCodeAt(r));return t}function utf16leToBytes(e,t){for(var r,n,f,i=[],o=0;o<e.length&&!((t-=2)<0);++o)n=(r=e.charCodeAt(o))>>8,f=r%256,i.push(f),i.push(n);return i}function base64ToBytes(e){return base64.toByteArray(base64clean(e))}function blitBuffer(e,t,r,n){for(var f=0;f<n&&!(f+r>=t.length||f>=e.length);++f)t[f+r]=e[f];return f}function isInstance(e,t){return e instanceof t||null!=e&&null!=e.constructor&&null!=e.constructor.name&&e.constructor.name===t.name}function numberIsNaN(e){return e!=e}
}).call(this)}).call(this,_dereq_("buffer").Buffer)
},{"base64-js":1,"buffer":3,"ieee754":19}],4:[function(_dereq_,module,exports){
"use strict";const Commented=_dereq_("./commented"),Diagnose=_dereq_("./diagnose"),Decoder=_dereq_("./decoder"),Encoder=_dereq_("./encoder"),Simple=_dereq_("./simple"),Tagged=_dereq_("./tagged"),Map=_dereq_("./map"),SharedValueEncoder=_dereq_("./sharedValueEncoder");module.exports={Commented:Commented,Diagnose:Diagnose,Decoder:Decoder,Encoder:Encoder,Simple:Simple,Tagged:Tagged,Map:Map,SharedValueEncoder:SharedValueEncoder,comment:Commented.comment,decodeAll:Decoder.decodeAll,decodeFirst:Decoder.decodeFirst,decodeAllSync:Decoder.decodeAllSync,decodeFirstSync:Decoder.decodeFirstSync,diagnose:Diagnose.diagnose,encode:Encoder.encode,encodeCanonical:Encoder.encodeCanonical,encodeOne:Encoder.encodeOne,encodeAsync:Encoder.encodeAsync,decode:Decoder.decodeFirstSync,leveldb:{decode:Decoder.decodeFirstSync,encode:Encoder.encode,buffer:!0,name:"cbor"},reset(){Encoder.reset(),Tagged.reset()}};
},{"./commented":5,"./decoder":7,"./diagnose":8,"./encoder":9,"./map":10,"./sharedValueEncoder":12,"./simple":13,"./tagged":14}],5:[function(_dereq_,module,exports){
"use strict";const stream=_dereq_("stream"),utils=_dereq_("./utils"),Decoder=_dereq_("./decoder"),NoFilter=_dereq_("nofilter"),{MT:MT,NUMBYTES:NUMBYTES,SYMS:SYMS}=_dereq_("./constants"),{Buffer:Buffer}=_dereq_("buffer");function plural(t){return t>1?"s":""}function normalizeOptions(t,e){switch(typeof t){case"function":return{options:{},cb:t};case"string":return{options:{encoding:t},cb:e};case"number":return{options:{max_depth:t},cb:e};case"object":return{options:t||{},cb:e};default:throw new TypeError("Unknown option type")}}class Commented extends stream.Transform{constructor(t={}){const{depth:e=1,max_depth:s=10,no_summary:r=!1,tags:i={},preferWeb:n,encoding:h,...a}=t;super({...a,readableObjectMode:!1,writableObjectMode:!1}),this.depth=e,this.max_depth=s,this.all=new NoFilter,i[24]||(i[24]=this._tag_24.bind(this)),this.parser=new Decoder({tags:i,max_depth:s,preferWeb:n,encoding:h}),this.parser.on("value",this._on_value.bind(this)),this.parser.on("start",this._on_start.bind(this)),this.parser.on("start-string",this._on_start_string.bind(this)),this.parser.on("stop",this._on_stop.bind(this)),this.parser.on("more-bytes",this._on_more.bind(this)),this.parser.on("error",this._on_error.bind(this)),r||this.parser.on("data",this._on_data.bind(this)),this.parser.bs.on("read",this._on_read.bind(this))}_tag_24(t){const e=new Commented({depth:this.depth+1,no_summary:!0});e.on("data",t=>this.push(t)),e.on("error",t=>this.emit("error",t)),e.end(t)}_transform(t,e,s){this.parser.write(t,e,s)}_flush(t){return this.parser._flush(t)}static comment(t,e={},s=null){if(null==t)throw new Error("input required");({options:e,cb:s}=normalizeOptions(e,s));const r=new NoFilter,{encoding:i="hex",...n}=e,h=new Commented(n);let a=null;return"function"==typeof s?(h.on("end",()=>{s(null,r.toString("utf8"))}),h.on("error",s)):a=new Promise((t,e)=>{h.on("end",()=>{t(r.toString("utf8"))}),h.on("error",e)}),h.pipe(r),utils.guessEncoding(t,i).pipe(h),a}_on_error(t){this.push("ERROR: "),this.push(t.toString()),this.push("\n")}_on_read(t){this.all.write(t);const e=t.toString("hex");this.push(new Array(this.depth+1).join("  ")),this.push(e);let s=2*(this.max_depth-this.depth)-e.length;s<1&&(s=1),this.push(new Array(s+1).join(" ")),this.push("-- ")}_on_more(t,e,s,r){let i="";switch(this.depth++,t){case MT.POS_INT:i="Positive number,";break;case MT.NEG_INT:i="Negative number,";break;case MT.ARRAY:i="Array, length";break;case MT.MAP:i="Map, count";break;case MT.BYTE_STRING:i="Bytes, length";break;case MT.UTF8_STRING:i="String, length";break;case MT.SIMPLE_FLOAT:i=1===e?"Simple value,":"Float,"}this.push(`${i} next ${e} byte${plural(e)}\n`)}_on_start_string(t,e,s,r){let i="";switch(this.depth++,t){case MT.BYTE_STRING:i=`Bytes, length: ${e}`;break;case MT.UTF8_STRING:i=`String, length: ${e.toString()}`}this.push(`${i}\n`)}_on_start(t,e,s,r){switch(this.depth++,s){case MT.ARRAY:this.push(`[${r}], `);break;case MT.MAP:r%2?this.push(`{Val:${Math.floor(r/2)}}, `):this.push(`{Key:${Math.floor(r/2)}}, `)}switch(t){case MT.TAG:this.push(`Tag #${e}`),24===e&&this.push(" Encoded CBOR data item");break;case MT.ARRAY:e===SYMS.STREAM?this.push("Array (streaming)"):this.push(`Array, ${e} item${plural(e)}`);break;case MT.MAP:e===SYMS.STREAM?this.push("Map (streaming)"):this.push(`Map, ${e} pair${plural(e)}`);break;case MT.BYTE_STRING:this.push("Bytes (streaming)");break;case MT.UTF8_STRING:this.push("String (streaming)")}this.push("\n")}_on_stop(t){this.depth--}_on_value(t,e,s,r){if(t!==SYMS.BREAK)switch(e){case MT.ARRAY:this.push(`[${s}], `);break;case MT.MAP:s%2?this.push(`{Val:${Math.floor(s/2)}}, `):this.push(`{Key:${Math.floor(s/2)}}, `)}const i=utils.cborValueToString(t,-1/0);switch("string"==typeof t||Buffer.isBuffer(t)?(t.length>0&&(this.push(i),this.push("\n")),this.depth--):(this.push(i),this.push("\n")),r){case NUMBYTES.ONE:case NUMBYTES.TWO:case NUMBYTES.FOUR:case NUMBYTES.EIGHT:this.depth--}}_on_data(){this.push("0x"),this.push(this.all.read().toString("hex")),this.push("\n")}}module.exports=Commented;
},{"./constants":6,"./decoder":7,"./utils":15,"buffer":3,"nofilter":51,"stream":54}],6:[function(_dereq_,module,exports){
"use strict";exports.MT={POS_INT:0,NEG_INT:1,BYTE_STRING:2,UTF8_STRING:3,ARRAY:4,MAP:5,TAG:6,SIMPLE_FLOAT:7},exports.TAG={DATE_STRING:0,DATE_EPOCH:1,POS_BIGINT:2,NEG_BIGINT:3,DECIMAL_FRAC:4,BIGFLOAT:5,BASE64URL_EXPECTED:21,BASE64_EXPECTED:22,BASE16_EXPECTED:23,CBOR:24,URI:32,BASE64URL:33,BASE64:34,REGEXP:35,MIME:36,SET:258},exports.NUMBYTES={ZERO:0,ONE:24,TWO:25,FOUR:26,EIGHT:27,INDEFINITE:31},exports.SIMPLE={FALSE:20,TRUE:21,NULL:22,UNDEFINED:23},exports.SYMS={NULL:Symbol.for("github.com/hildjj/node-cbor/null"),UNDEFINED:Symbol.for("github.com/hildjj/node-cbor/undef"),PARENT:Symbol.for("github.com/hildjj/node-cbor/parent"),BREAK:Symbol.for("github.com/hildjj/node-cbor/break"),STREAM:Symbol.for("github.com/hildjj/node-cbor/stream")},exports.SHIFT32=4294967296,exports.BI={MINUS_ONE:BigInt(-1),NEG_MAX:BigInt(-1)-BigInt(Number.MAX_SAFE_INTEGER),MAXINT32:BigInt("0xffffffff"),MAXINT64:BigInt("0xffffffffffffffff"),SHIFT32:BigInt(exports.SHIFT32)};
},{}],7:[function(_dereq_,module,exports){
"use strict";const BinaryParseStream=_dereq_("../vendor/binary-parse-stream"),Tagged=_dereq_("./tagged"),Simple=_dereq_("./simple"),utils=_dereq_("./utils"),NoFilter=_dereq_("nofilter"),stream=_dereq_("stream"),constants=_dereq_("./constants"),{MT:MT,NUMBYTES:NUMBYTES,SYMS:SYMS,BI:BI}=constants,{Buffer:Buffer}=_dereq_("buffer"),COUNT=Symbol("count"),MAJOR=Symbol("major type"),ERROR=Symbol("error"),NOT_FOUND=Symbol("not found");function parentArray(e,t,r){const n=[];return n[COUNT]=r,n[SYMS.PARENT]=e,n[MAJOR]=t,n}function parentBufferStream(e,t){const r=new NoFilter;return r[COUNT]=-1,r[SYMS.PARENT]=e,r[MAJOR]=t,r}class UnexpectedDataError extends Error{constructor(e,t){super(`Unexpected data: 0x${e.toString(16)}`),this.name="UnexpectedDataError",this.byte=e,this.value=t}}function normalizeOptions(e,t){switch(typeof e){case"function":return{options:{},cb:e};case"string":return{options:{encoding:e},cb:t};case"object":return{options:e||{},cb:t};default:throw new TypeError("Unknown option type")}}class Decoder extends BinaryParseStream{constructor(e={}){const{tags:t={},max_depth:r=-1,preferWeb:n=!1,required:s=!1,encoding:i="hex",extendedResults:o=!1,preventDuplicateKeys:a=!1,...l}=e;super({defaultEncoding:i,...l}),this.running=!0,this.max_depth=r,this.tags=t,this.preferWeb=n,this.extendedResults=o,this.required=s,this.preventDuplicateKeys=a,o&&(this.bs.on("read",this._onRead.bind(this)),this.valueBytes=new NoFilter)}static nullcheck(e){switch(e){case SYMS.NULL:return null;case SYMS.UNDEFINED:return;case NOT_FOUND:throw new Error("Value not found");default:return e}}static decodeFirstSync(e,t={}){if(null==e)throw new TypeError("input required");({options:t}=normalizeOptions(t));const{encoding:r="hex",...n}=t,s=new Decoder(n),i=utils.guessEncoding(e,r),o=s._parse();let a=o.next();for(;!a.done;){const e=i.read(a.value);if(null==e||e.length!==a.value)throw new Error("Insufficient data");s.extendedResults&&s.valueBytes.write(e),a=o.next(e)}let l=null;if(s.extendedResults)(l=a.value).unused=i.read();else if(l=Decoder.nullcheck(a.value),i.length>0){const e=i.read(1);throw i.unshift(e),new UnexpectedDataError(e[0],l)}return l}static decodeAllSync(e,t={}){if(null==e)throw new TypeError("input required");({options:t}=normalizeOptions(t));const{encoding:r="hex",...n}=t,s=new Decoder(n),i=utils.guessEncoding(e,r),o=[];for(;i.length>0;){const e=s._parse();let t=e.next();for(;!t.done;){const r=i.read(t.value);if(null==r||r.length!==t.value)throw new Error("Insufficient data");s.extendedResults&&s.valueBytes.write(r),t=e.next(r)}o.push(Decoder.nullcheck(t.value))}return o}static decodeFirst(e,t={},r=null){if(null==e)throw new TypeError("input required");({options:t,cb:r}=normalizeOptions(t,r));const{encoding:n="hex",required:s=!1,...i}=t,o=new Decoder(i);let a=NOT_FOUND;const l=utils.guessEncoding(e,n),c=new Promise((e,t)=>{o.on("data",e=>{a=Decoder.nullcheck(e),o.close()}),o.once("error",r=>o.extendedResults&&r instanceof UnexpectedDataError?(a.unused=o.bs.slice(),e(a)):(a!==NOT_FOUND&&(r.value=a),a=ERROR,o.close(),t(r))),o.once("end",()=>{switch(a){case NOT_FOUND:return s?t(new Error("No CBOR found")):e(a);case ERROR:return;default:return e(a)}})});return"function"==typeof r&&c.then(e=>r(null,e),r),l.pipe(o),c}static decodeAll(e,t={},r=null){if(null==e)throw new TypeError("input required");({options:t,cb:r}=normalizeOptions(t,r));const{encoding:n="hex",...s}=t,i=new Decoder(s),o=[];i.on("data",e=>o.push(Decoder.nullcheck(e)));const a=new Promise((e,t)=>{i.on("error",t),i.on("end",()=>e(o))});return"function"==typeof r&&a.then(e=>r(void 0,e),e=>r(e,void 0)),utils.guessEncoding(e,n).pipe(i),a}close(){this.running=!1,this.__fresh=!0}_onRead(e){this.valueBytes.write(e)}*_parse(){let e=null,t=0,r=null;for(;;){if(this.max_depth>=0&&t>this.max_depth)throw new Error(`Maximum depth ${this.max_depth} exceeded`);const[n]=yield 1;if(!this.running)throw this.bs.unshift(Buffer.from([n])),new UnexpectedDataError(n);const s=n>>5,i=31&n,o=null==e?void 0:e[MAJOR],a=null==e?void 0:e.length;switch(i){case NUMBYTES.ONE:this.emit("more-bytes",s,1,o,a),[r]=yield 1;break;case NUMBYTES.TWO:case NUMBYTES.FOUR:case NUMBYTES.EIGHT:{const e=1<<i-24;this.emit("more-bytes",s,e,o,a);const t=yield e;r=s===MT.SIMPLE_FLOAT?t:utils.parseCBORint(i,t);break}case 28:case 29:case 30:throw this.running=!1,new Error(`Additional info not implemented: ${i}`);case NUMBYTES.INDEFINITE:switch(s){case MT.POS_INT:case MT.NEG_INT:case MT.TAG:throw new Error(`Invalid indefinite encoding for MT ${s}`)}r=-1;break;default:r=i}switch(s){case MT.POS_INT:break;case MT.NEG_INT:r=r===Number.MAX_SAFE_INTEGER?BI.NEG_MAX:"bigint"==typeof r?BI.MINUS_ONE-r:-1-r;break;case MT.BYTE_STRING:case MT.UTF8_STRING:switch(r){case 0:this.emit("start-string",s,r,o,a),r=s===MT.UTF8_STRING?"":this.preferWeb?new Uint8Array(0):Buffer.allocUnsafe(0);break;case-1:this.emit("start",s,SYMS.STREAM,o,a),e=parentBufferStream(e,s),t++;continue;default:this.emit("start-string",s,r,o,a),r=yield r,s===MT.UTF8_STRING?r=utils.utf8(r):this.preferWeb&&(r=new Uint8Array(r.buffer,r.byteOffset,r.length))}break;case MT.ARRAY:case MT.MAP:switch(r){case 0:r=s===MT.MAP?{}:[];break;case-1:this.emit("start",s,SYMS.STREAM,o,a),e=parentArray(e,s,-1),t++;continue;default:this.emit("start",s,r,o,a),e=parentArray(e,s,r*(s-3)),t++;continue}break;case MT.TAG:this.emit("start",s,r,o,a),(e=parentArray(e,s,1)).push(r),t++;continue;case MT.SIMPLE_FLOAT:if("number"==typeof r){if(i===NUMBYTES.ONE&&r<32)throw new Error(`Invalid two-byte encoding of simple value ${r}`);const t=null!=e;r=Simple.decode(r,t,t&&e[COUNT]<0)}else r=utils.parseCBORfloat(r)}this.emit("value",r,o,a,i);let l=!1;for(;null!=e;){if(r===SYMS.BREAK)e[COUNT]=1;else if(Array.isArray(e))e.push(r);else{const t=e[MAJOR];if(null!=t&&t!==s)throw this.running=!1,new Error("Invalid major type in indefinite encoding");e.write(r)}if(0!=--e[COUNT]){l=!0;break}if(--t,delete e[COUNT],Array.isArray(e))switch(e[MAJOR]){case MT.ARRAY:r=e;break;case MT.MAP:{let t=!0;if(e.length%2!=0)throw new Error(`Invalid map length: ${e.length}`);for(let r=0,n=e.length;r<n;r+=2)if("string"!=typeof e[r]||"__proto__"===e[r]){t=!1;break}if(t){r={};for(let t=0,n=e.length;t<n;t+=2){if(this.preventDuplicateKeys&&Object.prototype.hasOwnProperty.call(r,e[t]))throw new Error("Duplicate keys in a map");r[e[t]]=e[t+1]}}else{r=new Map;for(let t=0,n=e.length;t<n;t+=2){if(this.preventDuplicateKeys&&r.has(e[t]))throw new Error("Duplicate keys in a map");r.set(e[t],e[t+1])}}break}case MT.TAG:r=new Tagged(e[0],e[1]).convert(this.tags);break}else if(e instanceof NoFilter)switch(e[MAJOR]){case MT.BYTE_STRING:r=e.slice(),this.preferWeb&&(r=new Uint8Array(r.buffer,r.byteOffset,r.length));break;case MT.UTF8_STRING:r=e.toString("utf-8")}this.emit("stop",e[MAJOR]);const n=e;e=e[SYMS.PARENT],delete n[SYMS.PARENT],delete n[MAJOR]}if(!l){if(this.extendedResults){const e=this.valueBytes.slice(),t={value:Decoder.nullcheck(r),bytes:e,length:e.length};return this.valueBytes=new NoFilter,t}return r}}}}Decoder.NOT_FOUND=NOT_FOUND,module.exports=Decoder;
},{"../vendor/binary-parse-stream":16,"./constants":6,"./simple":13,"./tagged":14,"./utils":15,"buffer":3,"nofilter":51,"stream":54}],8:[function(_dereq_,module,exports){
"use strict";const stream=_dereq_("stream"),Decoder=_dereq_("./decoder"),utils=_dereq_("./utils"),NoFilter=_dereq_("nofilter"),{MT:MT,SYMS:SYMS}=_dereq_("./constants");function normalizeOptions(s,e){switch(typeof s){case"function":return{options:{},cb:s};case"string":return{options:{encoding:s},cb:e};case"object":return{options:s||{},cb:e};default:throw new TypeError("Unknown option type")}}class Diagnose extends stream.Transform{constructor(s={}){const{separator:e="\n",stream_errors:t=!1,tags:r,max_depth:i,preferWeb:o,encoding:n,...a}=s;super({...a,readableObjectMode:!1,writableObjectMode:!1}),this.float_bytes=-1,this.separator=e,this.stream_errors=t,this.parser=new Decoder({tags:r,max_depth:i,preferWeb:o,encoding:n}),this.parser.on("more-bytes",this._on_more.bind(this)),this.parser.on("value",this._on_value.bind(this)),this.parser.on("start",this._on_start.bind(this)),this.parser.on("stop",this._on_stop.bind(this)),this.parser.on("data",this._on_data.bind(this)),this.parser.on("error",this._on_error.bind(this))}_transform(s,e,t){this.parser.write(s,e,t)}_flush(s){this.parser._flush(e=>this.stream_errors?(e&&this._on_error(e),s()):s(e))}static diagnose(s,e={},t=null){if(null==s)throw new TypeError("input required");({options:e,cb:t}=normalizeOptions(e,t));const{encoding:r="hex",...i}=e,o=new NoFilter,n=new Diagnose(i);let a=null;return"function"==typeof t?(n.on("end",()=>t(null,o.toString("utf8"))),n.on("error",t)):a=new Promise((s,e)=>{n.on("end",()=>s(o.toString("utf8"))),n.on("error",e)}),n.pipe(o),utils.guessEncoding(s,r).pipe(n),a}_on_error(s){this.stream_errors?this.push(s.toString()):this.emit("error",s)}_on_more(s,e,t,r){s===MT.SIMPLE_FLOAT&&(this.float_bytes={2:1,4:2,8:3}[e])}_fore(s,e){switch(s){case MT.BYTE_STRING:case MT.UTF8_STRING:case MT.ARRAY:e>0&&this.push(", ");break;case MT.MAP:e>0&&(e%2?this.push(": "):this.push(", "))}}_on_value(s,e,t){if(s===SYMS.BREAK)return;this._fore(e,t);const r=this.float_bytes;this.float_bytes=-1,this.push(utils.cborValueToString(s,r))}_on_start(s,e,t,r){switch(this._fore(t,r),s){case MT.TAG:this.push(`${e}(`);break;case MT.ARRAY:this.push("[");break;case MT.MAP:this.push("{");break;case MT.BYTE_STRING:case MT.UTF8_STRING:this.push("(")}e===SYMS.STREAM&&this.push("_ ")}_on_stop(s){switch(s){case MT.TAG:this.push(")");break;case MT.ARRAY:this.push("]");break;case MT.MAP:this.push("}");break;case MT.BYTE_STRING:case MT.UTF8_STRING:this.push(")")}}_on_data(){this.push(this.separator)}}module.exports=Diagnose;
},{"./constants":6,"./decoder":7,"./utils":15,"nofilter":51,"stream":54}],9:[function(_dereq_,module,exports){
"use strict";const stream=_dereq_("stream"),NoFilter=_dereq_("nofilter"),utils=_dereq_("./utils"),constants=_dereq_("./constants"),{MT:MT,NUMBYTES:NUMBYTES,SHIFT32:SHIFT32,SIMPLE:SIMPLE,SYMS:SYMS,TAG:TAG,BI:BI}=constants,{Buffer:Buffer}=_dereq_("buffer"),HALF=MT.SIMPLE_FLOAT<<5|NUMBYTES.TWO,FLOAT=MT.SIMPLE_FLOAT<<5|NUMBYTES.FOUR,DOUBLE=MT.SIMPLE_FLOAT<<5|NUMBYTES.EIGHT,TRUE=MT.SIMPLE_FLOAT<<5|SIMPLE.TRUE,FALSE=MT.SIMPLE_FLOAT<<5|SIMPLE.FALSE,UNDEFINED=MT.SIMPLE_FLOAT<<5|SIMPLE.UNDEFINED,NULL=MT.SIMPLE_FLOAT<<5|SIMPLE.NULL,BREAK=Buffer.from([255]),BUF_NAN=Buffer.from("f97e00","hex"),BUF_INF_NEG=Buffer.from("f9fc00","hex"),BUF_INF_POS=Buffer.from("f97c00","hex"),BUF_NEG_ZERO=Buffer.from("f98000","hex"),SEMANTIC_TYPES={};let current_SEMANTIC_TYPES={};function parseDateType(e){if(!e)return"number";switch(e.toLowerCase()){case"number":return"number";case"float":return"float";case"int":case"integer":return"int";case"string":return"string"}throw new TypeError(`dateType invalid, got "${e}"`)}class Encoder extends stream.Transform{constructor(e={}){const{canonical:t=!1,encodeUndefined:n,disallowUndefinedKeys:r=!1,dateType:s="number",collapseBigIntegers:i=!1,detectLoops:u=!1,omitUndefinedProperties:o=!1,genTypes:h=[],...p}=e;if(super({...p,readableObjectMode:!1,writableObjectMode:!0}),this.canonical=t,this.encodeUndefined=n,this.disallowUndefinedKeys=r,this.dateType=parseDateType(s),this.collapseBigIntegers=!!this.canonical||i,this.detectLoops=void 0,"boolean"==typeof u)u&&(this.detectLoops=new WeakSet);else{if(!(u instanceof WeakSet))throw new TypeError("detectLoops must be boolean or WeakSet");this.detectLoops=u}if(this.omitUndefinedProperties=o,this.semanticTypes={...Encoder.SEMANTIC_TYPES},Array.isArray(h))for(let e=0,t=h.length;e<t;e+=2)this.addSemanticType(h[e],h[e+1]);else for(const[e,t]of Object.entries(h))this.addSemanticType(e,t)}_transform(e,t,n){n(!1===this.pushAny(e)?new Error("Push Error"):void 0)}_flush(e){e()}_pushUInt8(e){const t=Buffer.allocUnsafe(1);return t.writeUInt8(e,0),this.push(t)}_pushUInt16BE(e){const t=Buffer.allocUnsafe(2);return t.writeUInt16BE(e,0),this.push(t)}_pushUInt32BE(e){const t=Buffer.allocUnsafe(4);return t.writeUInt32BE(e,0),this.push(t)}_pushFloatBE(e){const t=Buffer.allocUnsafe(4);return t.writeFloatBE(e,0),this.push(t)}_pushDoubleBE(e){const t=Buffer.allocUnsafe(8);return t.writeDoubleBE(e,0),this.push(t)}_pushNaN(){return this.push(BUF_NAN)}_pushInfinity(e){const t=e<0?BUF_INF_NEG:BUF_INF_POS;return this.push(t)}_pushFloat(e){if(this.canonical){const t=Buffer.allocUnsafe(2);if(utils.writeHalf(t,e))return this._pushUInt8(HALF)&&this.push(t)}return Math.fround(e)===e?this._pushUInt8(FLOAT)&&this._pushFloatBE(e):this._pushUInt8(DOUBLE)&&this._pushDoubleBE(e)}_pushInt(e,t,n){const r=t<<5;if(e<24)return this._pushUInt8(r|e);if(e<=255)return this._pushUInt8(r|NUMBYTES.ONE)&&this._pushUInt8(e);if(e<=65535)return this._pushUInt8(r|NUMBYTES.TWO)&&this._pushUInt16BE(e);if(e<=4294967295)return this._pushUInt8(r|NUMBYTES.FOUR)&&this._pushUInt32BE(e);let s=Number.MAX_SAFE_INTEGER;return t===MT.NEG_INT&&s--,e<=s?this._pushUInt8(r|NUMBYTES.EIGHT)&&this._pushUInt32BE(Math.floor(e/SHIFT32))&&this._pushUInt32BE(e%SHIFT32):t===MT.NEG_INT?this._pushFloat(n):this._pushFloat(e)}_pushIntNum(e){return Object.is(e,-0)?this.push(BUF_NEG_ZERO):e<0?this._pushInt(-e-1,MT.NEG_INT,e):this._pushInt(e,MT.POS_INT)}_pushNumber(e){return isNaN(e)?this._pushNaN():isFinite(e)?Math.round(e)===e?this._pushIntNum(e):this._pushFloat(e):this._pushInfinity(e)}_pushString(e){const t=Buffer.byteLength(e,"utf8");return this._pushInt(t,MT.UTF8_STRING)&&this.push(e,"utf8")}_pushBoolean(e){return this._pushUInt8(e?TRUE:FALSE)}_pushUndefined(e){switch(typeof this.encodeUndefined){case"undefined":return this._pushUInt8(UNDEFINED);case"function":return this.pushAny(this.encodeUndefined(e));case"object":{const e=utils.bufferishToBuffer(this.encodeUndefined);if(e)return this.push(e)}}return this.pushAny(this.encodeUndefined)}_pushNull(e){return this._pushUInt8(NULL)}_pushTag(e){return this._pushInt(e,MT.TAG)}_pushJSBigint(e){let t=MT.POS_INT,n=TAG.POS_BIGINT;if(e<0&&(e=-e+BI.MINUS_ONE,t=MT.NEG_INT,n=TAG.NEG_BIGINT),this.collapseBigIntegers&&e<=BI.MAXINT64)return e<=4294967295?this._pushInt(Number(e),t):this._pushUInt8(t<<5|NUMBYTES.EIGHT)&&this._pushUInt32BE(Number(e/BI.SHIFT32))&&this._pushUInt32BE(Number(e%BI.SHIFT32));let r=e.toString(16);r.length%2&&(r=`0${r}`);const s=Buffer.from(r,"hex");return this._pushTag(n)&&Encoder._pushBuffer(this,s)}_pushObject(e,t){if(!e)return this._pushNull(e);if(!(t={indefinite:!1,skipTypes:!1,...t}).indefinite&&this.detectLoops){if(this.detectLoops.has(e))throw new Error("Loop detected while CBOR encoding.\nCall removeLoopDetectors before resuming.");this.detectLoops.add(e)}if(!t.skipTypes){const t=e.encodeCBOR;if("function"==typeof t)return t.call(e,this);const n=this.semanticTypes[e.constructor.name];if(n)return n.call(e,this,e)}const n=Object.keys(e).filter(t=>{const n=typeof e[t];return"function"!==n&&(!this.omitUndefinedProperties||"undefined"!==n)}),r={};if(this.canonical&&n.sort((e,t)=>{const n=r[e]||(r[e]=Encoder.encode(e)),s=r[t]||(r[t]=Encoder.encode(t));return n.compare(s)}),t.indefinite){if(!this._pushUInt8(MT.MAP<<5|NUMBYTES.INDEFINITE))return!1}else if(!this._pushInt(n.length,MT.MAP))return!1;let s=null;for(let t=0,i=n.length;t<i;t++){const i=n[t];if(this.canonical&&(s=r[i])){if(!this.push(s))return!1}else if(!this._pushString(i))return!1;if(!this.pushAny(e[i]))return!1}if(t.indefinite){if(!this.push(BREAK))return!1}else this.detectLoops&&this.detectLoops.delete(e);return!0}_encodeAll(e){const t=new NoFilter({highWaterMark:this.readableHighWaterMark});this.pipe(t);for(const t of e)this.pushAny(t);return this.end(),t.read()}addSemanticType(e,t){const n="string"==typeof e?e:e.name,r=this.semanticTypes[n];if(t){if("function"!=typeof t)throw new TypeError("fun must be of type function");this.semanticTypes[n]=t}else r&&delete this.semanticTypes[n];return r}pushAny(e){switch(typeof e){case"number":return this._pushNumber(e);case"bigint":return this._pushJSBigint(e);case"string":return this._pushString(e);case"boolean":return this._pushBoolean(e);case"undefined":return this._pushUndefined(e);case"object":return this._pushObject(e);case"symbol":switch(e){case SYMS.NULL:return this._pushNull(null);case SYMS.UNDEFINED:return this._pushUndefined(void 0);default:throw new TypeError(`Unknown symbol: ${e.toString()}`)}default:throw new TypeError(`Unknown type: ${typeof e}, ${"function"==typeof e.toString?e.toString():""}`)}}static pushArray(e,t,n){n={indefinite:!1,...n};const r=t.length;if(n.indefinite){if(!e._pushUInt8(MT.ARRAY<<5|NUMBYTES.INDEFINITE))return!1}else if(!e._pushInt(r,MT.ARRAY))return!1;for(let n=0;n<r;n++)if(!e.pushAny(t[n]))return!1;return!(n.indefinite&&!e.push(BREAK))}removeLoopDetectors(){return!!this.detectLoops&&(this.detectLoops=new WeakSet,!0)}static _pushDate(e,t){switch(e.dateType){case"string":return e._pushTag(TAG.DATE_STRING)&&e._pushString(t.toISOString());case"int":return e._pushTag(TAG.DATE_EPOCH)&&e._pushIntNum(Math.round(t.getTime()/1e3));case"float":return e._pushTag(TAG.DATE_EPOCH)&&e._pushFloat(t.getTime()/1e3);case"number":default:return e._pushTag(TAG.DATE_EPOCH)&&e.pushAny(t.getTime()/1e3)}}static _pushBuffer(e,t){return e._pushInt(t.length,MT.BYTE_STRING)&&e.push(t)}static _pushNoFilter(e,t){return Encoder._pushBuffer(e,t.slice())}static _pushRegexp(e,t){return e._pushTag(TAG.REGEXP)&&e.pushAny(t.source)}static _pushSet(e,t){if(!e._pushTag(TAG.SET))return!1;if(!e._pushInt(t.size,MT.ARRAY))return!1;for(const n of t)if(!e.pushAny(n))return!1;return!0}static _pushURL(e,t){return e._pushTag(TAG.URI)&&e.pushAny(t.toString())}static _pushBoxed(e,t){return e.pushAny(t.valueOf())}static _pushMap(e,t,n){n={indefinite:!1,...n};let r=[...t.entries()];if(e.omitUndefinedProperties&&(r=r.filter(([e,t])=>void 0!==t)),n.indefinite){if(!e._pushUInt8(MT.MAP<<5|NUMBYTES.INDEFINITE))return!1}else if(!e._pushInt(r.length,MT.MAP))return!1;if(e.canonical){const t=new Encoder({genTypes:e.semanticTypes,canonical:e.canonical,detectLoops:Boolean(e.detectLoops),dateType:e.dateType,disallowUndefinedKeys:e.disallowUndefinedKeys,collapseBigIntegers:e.collapseBigIntegers}),n=new NoFilter({highWaterMark:e.readableHighWaterMark});t.pipe(n),r.sort(([e],[r])=>{t.pushAny(e);const s=n.read();t.pushAny(r);const i=n.read();return s.compare(i)});for(const[t,n]of r){if(e.disallowUndefinedKeys&&void 0===t)throw new Error("Invalid Map key: undefined");if(!e.pushAny(t)||!e.pushAny(n))return!1}}else for(const[t,n]of r){if(e.disallowUndefinedKeys&&void 0===t)throw new Error("Invalid Map key: undefined");if(!e.pushAny(t)||!e.pushAny(n))return!1}return!(n.indefinite&&!e.push(BREAK))}static _pushTypedArray(e,t){let n=64,r=t.BYTES_PER_ELEMENT;const{name:s}=t.constructor;return s.startsWith("Float")?(n|=16,r/=2):s.includes("U")||(n|=8),(s.includes("Clamped")||1!==r&&!utils.isBigEndian())&&(n|=4),n|={1:0,2:1,4:2,8:3}[r],!!e._pushTag(n)&&Encoder._pushBuffer(e,Buffer.from(t.buffer,t.byteOffset,t.byteLength))}static _pushArrayBuffer(e,t){return Encoder._pushBuffer(e,Buffer.from(t))}static encodeIndefinite(e,t,n={}){if(null==t){if(null==this)throw new Error("No object to encode");t=this}const{chunkSize:r=4096}=n;let s=!0;const i=typeof t;let u=null;if("string"===i){s=s&&e._pushUInt8(MT.UTF8_STRING<<5|NUMBYTES.INDEFINITE);let n=0;for(;n<t.length;){const i=n+r;s=s&&e._pushString(t.slice(n,i)),n=i}s=s&&e.push(BREAK)}else if(u=utils.bufferishToBuffer(t)){s=s&&e._pushUInt8(MT.BYTE_STRING<<5|NUMBYTES.INDEFINITE);let t=0;for(;t<u.length;){const n=t+r;s=s&&Encoder._pushBuffer(e,u.slice(t,n)),t=n}s=s&&e.push(BREAK)}else if(Array.isArray(t))s=s&&Encoder.pushArray(e,t,{indefinite:!0});else if(t instanceof Map)s=s&&Encoder._pushMap(e,t,{indefinite:!0});else{if("object"!==i)throw new Error("Invalid indefinite encoding");s=s&&e._pushObject(t,{indefinite:!0,skipTypes:!0})}return s}static encode(...e){return(new Encoder)._encodeAll(e)}static encodeCanonical(...e){return new Encoder({canonical:!0})._encodeAll(e)}static encodeOne(e,t){return new Encoder(t)._encodeAll([e])}static encodeAsync(e,t){return new Promise((n,r)=>{const s=[],i=new Encoder(t);i.on("data",e=>s.push(e)),i.on("error",r),i.on("finish",()=>n(Buffer.concat(s))),i.pushAny(e),i.end()})}static get SEMANTIC_TYPES(){return current_SEMANTIC_TYPES}static set SEMANTIC_TYPES(e){current_SEMANTIC_TYPES=e}static reset(){Encoder.SEMANTIC_TYPES={...SEMANTIC_TYPES}}}Object.assign(SEMANTIC_TYPES,{Array:Encoder.pushArray,Date:Encoder._pushDate,Buffer:Encoder._pushBuffer,[Buffer.name]:Encoder._pushBuffer,Map:Encoder._pushMap,NoFilter:Encoder._pushNoFilter,[NoFilter.name]:Encoder._pushNoFilter,RegExp:Encoder._pushRegexp,Set:Encoder._pushSet,ArrayBuffer:Encoder._pushArrayBuffer,Uint8ClampedArray:Encoder._pushTypedArray,Uint8Array:Encoder._pushTypedArray,Uint16Array:Encoder._pushTypedArray,Uint32Array:Encoder._pushTypedArray,Int8Array:Encoder._pushTypedArray,Int16Array:Encoder._pushTypedArray,Int32Array:Encoder._pushTypedArray,Float32Array:Encoder._pushTypedArray,Float64Array:Encoder._pushTypedArray,URL:Encoder._pushURL,Boolean:Encoder._pushBoxed,Number:Encoder._pushBoxed,String:Encoder._pushBoxed}),"undefined"!=typeof BigUint64Array&&(SEMANTIC_TYPES[BigUint64Array.name]=Encoder._pushTypedArray),"undefined"!=typeof BigInt64Array&&(SEMANTIC_TYPES[BigInt64Array.name]=Encoder._pushTypedArray),Encoder.reset(),module.exports=Encoder;
},{"./constants":6,"./utils":15,"buffer":3,"nofilter":51,"stream":54}],10:[function(_dereq_,module,exports){
"use strict";const{Buffer:Buffer}=_dereq_("buffer"),encoder=_dereq_("./encoder"),decoder=_dereq_("./decoder"),{MT:MT}=_dereq_("./constants");class CborMap extends Map{constructor(e){super(e)}static _encode(e){return encoder.encodeCanonical(e).toString("base64")}static _decode(e){return decoder.decodeFirstSync(e,"base64")}get(e){return super.get(CborMap._encode(e))}set(e,r){return super.set(CborMap._encode(e),r)}delete(e){return super.delete(CborMap._encode(e))}has(e){return super.has(CborMap._encode(e))}*keys(){for(const e of super.keys())yield CborMap._decode(e)}*entries(){for(const e of super.entries())yield[CborMap._decode(e[0]),e[1]]}[Symbol.iterator](){return this.entries()}forEach(e,r){if("function"!=typeof e)throw new TypeError("Must be function");for(const r of super.entries())e.call(this,r[1],CborMap._decode(r[0]),this)}encodeCBOR(e){if(!e._pushInt(this.size,MT.MAP))return!1;if(e.canonical){const r=Array.from(super.entries()).map(e=>[Buffer.from(e[0],"base64"),e[1]]);r.sort((e,r)=>e[0].compare(r[0]));for(const o of r)if(!e.push(o[0])||!e.pushAny(o[1]))return!1}else for(const r of super.entries())if(!e.push(Buffer.from(r[0],"base64"))||!e.pushAny(r[1]))return!1;return!0}}module.exports=CborMap;
},{"./constants":6,"./decoder":7,"./encoder":9,"buffer":3}],11:[function(_dereq_,module,exports){
"use strict";class ObjectRecorder{constructor(){this.clear()}clear(){this.map=new WeakMap,this.count=0,this.recording=!0}stop(){this.recording=!1}check(e){const r=this.map.get(e);if(r)return r.length>1?r[0]||this.recording?r[1]:(r[0]=!0,ObjectRecorder.FIRST):this.recording?(r.push(this.count++),r[1]):ObjectRecorder.NEVER;if(!this.recording)throw new Error("New object detected when not recording");return this.map.set(e,[!1]),ObjectRecorder.NEVER}}ObjectRecorder.NEVER=-1,ObjectRecorder.FIRST=-2,module.exports=ObjectRecorder;
},{}],12:[function(_dereq_,module,exports){
"use strict";const Encoder=_dereq_("./encoder"),ObjectRecorder=_dereq_("./objectRecorder"),{Buffer:Buffer}=_dereq_("buffer");class SharedValueEncoder extends Encoder{constructor(e){super(e),this.valueSharing=new ObjectRecorder}_pushObject(e,r){if(null!==e){const r=this.valueSharing.check(e);switch(r){case ObjectRecorder.FIRST:this._pushTag(28);break;case ObjectRecorder.NEVER:break;default:return this._pushTag(29)&&this._pushIntNum(r)}}return super._pushObject(e,r)}stopRecording(){this.valueSharing.stop()}clearRecording(){this.valueSharing.clear()}static encode(...e){const r=new SharedValueEncoder;r.on("data",()=>{});for(const n of e)r.pushAny(n);return r.stopRecording(),r.removeAllListeners("data"),r._encodeAll(e)}static encodeCanonical(...e){throw new Error("Cannot encode canonically in a SharedValueEncoder, which serializes objects multiple times.")}static encodeOne(e,r){const n=new SharedValueEncoder(r);return n.on("data",()=>{}),n.pushAny(e),n.stopRecording(),n.removeAllListeners("data"),n._encodeAll([e])}static encodeAsync(e,r){return new Promise((n,t)=>{const c=[],o=new SharedValueEncoder(r);o.on("data",()=>{}),o.on("error",t),o.on("finish",()=>n(Buffer.concat(c))),o.pushAny(e),o.stopRecording(),o.removeAllListeners("data"),o.on("data",e=>c.push(e)),o.pushAny(e),o.end()})}}module.exports=SharedValueEncoder;
},{"./encoder":9,"./objectRecorder":11,"buffer":3}],13:[function(_dereq_,module,exports){
"use strict";const{MT:MT,SIMPLE:SIMPLE,SYMS:SYMS}=_dereq_("./constants");class Simple{constructor(e){if("number"!=typeof e)throw new Error(`Invalid Simple type: ${typeof e}`);if(e<0||e>255||(0|e)!==e)throw new Error(`value must be a small positive integer: ${e}`);this.value=e}toString(){return`simple(${this.value})`}[Symbol.for("nodejs.util.inspect.custom")](e,t){return`simple(${this.value})`}encodeCBOR(e){return e._pushInt(this.value,MT.SIMPLE_FLOAT)}static isSimple(e){return e instanceof Simple}static decode(e,t=!0,r=!1){switch(e){case SIMPLE.FALSE:return!1;case SIMPLE.TRUE:return!0;case SIMPLE.NULL:return t?null:SYMS.NULL;case SIMPLE.UNDEFINED:if(t)return;return SYMS.UNDEFINED;case-1:if(!t||!r)throw new Error("Invalid BREAK");return SYMS.BREAK;default:return new Simple(e)}}}module.exports=Simple;
},{"./constants":6}],14:[function(_dereq_,module,exports){
"use strict";const constants=_dereq_("./constants"),utils=_dereq_("./utils"),INTERNAL_JSON=Symbol("INTERNAL_JSON");function setBuffersToJSON(t,r){if(utils.isBufferish(t))t.toJSON=r;else if(Array.isArray(t))for(const e of t)setBuffersToJSON(e,r);else if(t&&"object"==typeof t&&(!(t instanceof Tagged)||t.tag<21||t.tag>23))for(const e of Object.values(t))setBuffersToJSON(e,r)}function b64this(){return utils.base64(this)}function b64urlThis(){return utils.base64url(this)}function hexThis(){return this.toString("hex")}function swapEndian(t,r,e,i){const n=new DataView(t),[s,a]={2:[n.getUint16,n.setUint16],4:[n.getUint32,n.setUint32],8:[n.getBigUint64,n.setBigUint64]}[r],o=e+i;for(let t=e;t<o;t+=r)a.call(n,t,s.call(n,t,!0))}const TAGS={0:t=>new Date(t),1:t=>new Date(1e3*t),2:t=>utils.bufferToBigInt(t),3:t=>constants.BI.MINUS_ONE-utils.bufferToBigInt(t),21:(t,r)=>(utils.isBufferish(t)?r[INTERNAL_JSON]=b64urlThis:setBuffersToJSON(t,b64urlThis),r),22:(t,r)=>(utils.isBufferish(t)?r[INTERNAL_JSON]=b64this:setBuffersToJSON(t,b64this),r),23:(t,r)=>(utils.isBufferish(t)?r[INTERNAL_JSON]=hexThis:setBuffersToJSON(t,hexThis),r),32:t=>new URL(t),33:(t,r)=>{if(!t.match(/^[a-zA-Z0-9_-]+$/))throw new Error("Invalid base64url characters");const e=t.length%4;if(1===e)throw new Error("Invalid base64url length");if(2===e){if(-1==="AQgw".indexOf(t[t.length-1]))throw new Error("Invalid base64 padding")}else if(3===e&&-1==="AEIMQUYcgkosw048".indexOf(t[t.length-1]))throw new Error("Invalid base64 padding");return r},34:(t,r)=>{const e=t.match(/^[a-zA-Z0-9+/]+(?<padding>={0,2})$/);if(!e)throw new Error("Invalid base64 characters");if(t.length%4!=0)throw new Error("Invalid base64 length");if("="===e.groups.padding){if(-1==="AQgw".indexOf(t[t.length-2]))throw new Error("Invalid base64 padding")}else if("=="===e.groups.padding&&-1==="AEIMQUYcgkosw048".indexOf(t[t.length-3]))throw new Error("Invalid base64 padding");return r},35:t=>new RegExp(t),258:t=>new Set(t)},TYPED_ARRAY_TAGS={64:Uint8Array,65:Uint16Array,66:Uint32Array,68:Uint8ClampedArray,69:Uint16Array,70:Uint32Array,72:Int8Array,73:Int16Array,74:Int32Array,77:Int16Array,78:Int32Array,81:Float32Array,82:Float64Array,85:Float32Array,86:Float64Array};function _toTypedArray(t,r){if(!utils.isBufferish(t))throw new TypeError("val not a buffer");const{tag:e}=r,i=TYPED_ARRAY_TAGS[e];if(!i)throw new Error(`Invalid typed array tag: ${e}`);const n=2**(((16&e)>>4)+(3&e));return!(4&e)!==utils.isBigEndian()&&n>1&&swapEndian(t.buffer,n,t.byteOffset,t.byteLength),new i(t.buffer.slice(t.byteOffset,t.byteOffset+t.byteLength))}"undefined"!=typeof BigUint64Array&&(TYPED_ARRAY_TAGS[67]=BigUint64Array,TYPED_ARRAY_TAGS[71]=BigUint64Array),"undefined"!=typeof BigInt64Array&&(TYPED_ARRAY_TAGS[75]=BigInt64Array,TYPED_ARRAY_TAGS[79]=BigInt64Array);for(const t of Object.keys(TYPED_ARRAY_TAGS))TAGS[t]=_toTypedArray;let current_TAGS={};class Tagged{constructor(t,r,e){if(this.tag=t,this.value=r,this.err=e,"number"!=typeof this.tag)throw new Error(`Invalid tag type (${typeof this.tag})`);if(this.tag<0||(0|this.tag)!==this.tag)throw new Error(`Tag must be a positive integer: ${this.tag}`)}toJSON(){if(this[INTERNAL_JSON])return this[INTERNAL_JSON].call(this.value);const t={tag:this.tag,value:this.value};return this.err&&(t.err=this.err),t}toString(){return`${this.tag}(${JSON.stringify(this.value)})`}encodeCBOR(t){return t._pushTag(this.tag),t.pushAny(this.value)}convert(t){let r=null==t?void 0:t[this.tag];if("function"!=typeof r&&"function"!=typeof(r=Tagged.TAGS[this.tag]))return this;try{return r.call(this,this.value,this)}catch(t){return t&&t.message&&t.message.length>0?this.err=t.message:this.err=t,this}}static get TAGS(){return current_TAGS}static set TAGS(t){current_TAGS=t}static reset(){Tagged.TAGS={...TAGS}}}Tagged.INTERNAL_JSON=INTERNAL_JSON,Tagged.reset(),module.exports=Tagged;
},{"./constants":6,"./utils":15}],15:[function(_dereq_,module,exports){
"use strict";const{Buffer:Buffer}=_dereq_("buffer"),NoFilter=_dereq_("nofilter"),stream=_dereq_("stream"),constants=_dereq_("./constants"),{NUMBYTES:NUMBYTES,SHIFT32:SHIFT32,BI:BI,SYMS:SYMS}=constants,MAX_SAFE_HIGH=2097151,td=new TextDecoder("utf8",{fatal:!0,ignoreBOM:!0});function isReadable(e){return e instanceof stream.Readable||["read","on","pipe"].every(r=>"function"==typeof e[r])}exports.utf8=(e=>td.decode(e)),exports.utf8.checksUTF8=!0,exports.isBufferish=function(e){return e&&"object"==typeof e&&(Buffer.isBuffer(e)||e instanceof Uint8Array||e instanceof Uint8ClampedArray||e instanceof ArrayBuffer||e instanceof DataView)},exports.bufferishToBuffer=function(e){return Buffer.isBuffer(e)?e:ArrayBuffer.isView(e)?Buffer.from(e.buffer,e.byteOffset,e.byteLength):e instanceof ArrayBuffer?Buffer.from(e):null},exports.parseCBORint=function(e,r){switch(e){case NUMBYTES.ONE:return r.readUInt8(0);case NUMBYTES.TWO:return r.readUInt16BE(0);case NUMBYTES.FOUR:return r.readUInt32BE(0);case NUMBYTES.EIGHT:{const e=r.readUInt32BE(0),t=r.readUInt32BE(4);return e>2097151?BigInt(e)*BI.SHIFT32+BigInt(t):e*SHIFT32+t}default:throw new Error(`Invalid additional info for int: ${e}`)}},exports.writeHalf=function(e,r){const t=Buffer.allocUnsafe(4);t.writeFloatBE(r,0);const n=t.readUInt32BE(0);if(0!=(8191&n))return!1;let o=n>>16&32768;const f=n>>23&255,s=8388607&n;if(f>=113&&f<=142)o+=(f-112<<10)+(s>>13);else{if(!(f>=103&&f<113))return!1;if(s&(1<<126-f)-1)return!1;o+=s+8388608>>126-f}return e.writeUInt16BE(o),!0},exports.parseHalf=function(e){const r=128&e[0]?-1:1,t=(124&e[0])>>2,n=(3&e[0])<<8|e[1];return t?31===t?r*(n?NaN:1/0):r*2**(t-25)*(1024+n):5.960464477539063e-8*r*n},exports.parseCBORfloat=function(e){switch(e.length){case 2:return exports.parseHalf(e);case 4:return e.readFloatBE(0);case 8:return e.readDoubleBE(0);default:throw new Error(`Invalid float size: ${e.length}`)}},exports.hex=function(e){return Buffer.from(e.replace(/^0x/,""),"hex")},exports.bin=function(e){let r=0,t=(e=e.replace(/\s/g,"")).length%8||8;const n=[];for(;t<=e.length;)n.push(parseInt(e.slice(r,t),2)),r=t,t+=8;return Buffer.from(n)},exports.arrayEqual=function(e,r){return null==e&&null==r||null!=e&&null!=r&&(e.length===r.length&&e.every((e,t)=>e===r[t]))},exports.bufferToBigInt=function(e){return BigInt(`0x${e.toString("hex")}`)},exports.cborValueToString=function(e,r=-1){switch(typeof e){case"symbol":{switch(e){case SYMS.NULL:return"null";case SYMS.UNDEFINED:return"undefined";case SYMS.BREAK:return"BREAK"}if(e.description)return e.description;const r=e.toString().match(/^Symbol\((?<name>.*)\)/);return r&&r.groups.name?r.groups.name:"Symbol"}case"string":return JSON.stringify(e);case"bigint":return e.toString();case"number":{const t=Object.is(e,-0)?"-0":String(e);return r>0?`${t}_${r}`:t}case"object":{const t=exports.bufferishToBuffer(e);if(t){const e=t.toString("hex");return r===-1/0?e:`h'${e}'`}return"function"==typeof e[Symbol.for("nodejs.util.inspect.custom")]?e[Symbol.for("nodejs.util.inspect.custom")]():Array.isArray(e)?"[]":"{}"}}return String(e)},exports.guessEncoding=function(e,r){if("string"==typeof e)return new NoFilter(e,null==r?"hex":r);const t=exports.bufferishToBuffer(e);if(t)return new NoFilter(t);if(isReadable(e))return e;throw new Error("Unknown input type")};const B64URL_SWAPS={"=":"","+":"-","/":"_"};exports.base64url=function(e){return exports.bufferishToBuffer(e).toString("base64").replace(/[=+/]/g,e=>B64URL_SWAPS[e])},exports.base64=function(e){return exports.bufferishToBuffer(e).toString("base64")},exports.isBigEndian=function(){const e=new Uint8Array(4);return!((new Uint32Array(e.buffer)[0]=1)&e[0])};
},{"./constants":6,"buffer":3,"nofilter":51,"stream":54}],16:[function(_dereq_,module,exports){
"use strict";const stream=_dereq_("stream"),NoFilter=_dereq_("nofilter");class BinaryParseStream extends stream.Transform{constructor(e){super(e),this._writableState.objectMode=!1,this._readableState.objectMode=!0,this.bs=new NoFilter,this.__restart()}_transform(e,t,s){for(this.bs.write(e);this.bs.length>=this.__needed;){let e=null;const t=null===this.__needed?void 0:this.bs.read(this.__needed);try{e=this.__parser.next(t)}catch(e){return s(e)}this.__needed&&(this.__fresh=!1),e.done?(this.push(e.value),this.__restart()):this.__needed=e.value||1/0}return s()}*_parse(){throw new Error("Must be implemented in subclass")}__restart(){this.__needed=null,this.__parser=this._parse(),this.__fresh=!0}_flush(e){e(this.__fresh?null:new Error("unexpected end of input"))}}module.exports=BinaryParseStream;
},{"nofilter":51,"stream":54}],17:[function(_dereq_,module,exports){
function EventLite(){if(!(this instanceof EventLite))return new EventLite}!function(t){"undefined"!=typeof module&&(module.exports=t);var e="listeners",n={on:function(t,e){return f(this,t).push(e),this},once:function(t,e){var n=this;return i.originalListener=e,f(n,t).push(i),n;function i(){r.call(n,t,i),e.apply(this,arguments)}},off:r,emit:function(t,e){var n=this,i=f(n,t,!0);if(!i)return!1;var r=arguments.length;if(1===r)i.forEach(function(t){t.call(n)});else if(2===r)i.forEach(function(t){t.call(n,e)});else{var l=Array.prototype.slice.call(arguments,1);i.forEach(function(t){t.apply(n,l)})}return!!i.length}};function i(t){for(var e in n)t[e]=n[e];return t}function r(t,n){var i;if(arguments.length){if(n){if(i=f(this,t,!0)){if(!(i=i.filter(function(t){return t!==n&&t.originalListener!==n})).length)return r.call(this,t);this[e][t]=i}}else if((i=this[e])&&(delete i[t],!Object.keys(i).length))return r.call(this)}else delete this[e];return this}function f(t,n,i){if(!i||t[e]){var r=t[e]||(t[e]={});return r[n]||(r[n]=[])}}i(t.prototype),t.mixin=i}(EventLite);
},{}],18:[function(_dereq_,module,exports){
"use strict";var ReflectOwnKeys,R="object"==typeof Reflect?Reflect:null,ReflectApply=R&&"function"==typeof R.apply?R.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};function ProcessEmitWarning(e){console&&console.warn&&console.warn(e)}ReflectOwnKeys=R&&"function"==typeof R.ownKeys?R.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var NumberIsNaN=Number.isNaN||function(e){return e!=e};function EventEmitter(){EventEmitter.init.call(this)}module.exports=EventEmitter,module.exports.once=once,EventEmitter.EventEmitter=EventEmitter,EventEmitter.prototype._events=void 0,EventEmitter.prototype._eventsCount=0,EventEmitter.prototype._maxListeners=void 0;var defaultMaxListeners=10;function checkListener(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function _getMaxListeners(e){return void 0===e._maxListeners?EventEmitter.defaultMaxListeners:e._maxListeners}function _addListener(e,t,n,r){var i,o,s;if(checkListener(n),void 0===(o=e._events)?(o=e._events=Object.create(null),e._eventsCount=0):(void 0!==o.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),o=e._events),s=o[t]),void 0===s)s=o[t]=n,++e._eventsCount;else if("function"==typeof s?s=o[t]=r?[n,s]:[s,n]:r?s.unshift(n):s.push(n),(i=_getMaxListeners(e))>0&&s.length>i&&!s.warned){s.warned=!0;var u=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");u.name="MaxListenersExceededWarning",u.emitter=e,u.type=t,u.count=s.length,ProcessEmitWarning(u)}return e}function onceWrapper(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function _onceWrap(e,t,n){var r={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},i=onceWrapper.bind(r);return i.listener=n,r.wrapFn=i,i}function _listeners(e,t,n){var r=e._events;if(void 0===r)return[];var i=r[t];return void 0===i?[]:"function"==typeof i?n?[i.listener||i]:[i]:n?unwrapListeners(i):arrayClone(i,i.length)}function listenerCount(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function arrayClone(e,t){for(var n=new Array(t),r=0;r<t;++r)n[r]=e[r];return n}function spliceOne(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}function unwrapListeners(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}function once(e,t){return new Promise(function(n,r){function i(n){e.removeListener(t,o),r(n)}function o(){"function"==typeof e.removeListener&&e.removeListener("error",i),n([].slice.call(arguments))}eventTargetAgnosticAddListener(e,t,o,{once:!0}),"error"!==t&&addErrorHandlerIfEventEmitter(e,i,{once:!0})})}function addErrorHandlerIfEventEmitter(e,t,n){"function"==typeof e.on&&eventTargetAgnosticAddListener(e,"error",t,n)}function eventTargetAgnosticAddListener(e,t,n,r){if("function"==typeof e.on)r.once?e.once(t,n):e.on(t,n);else{if("function"!=typeof e.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof e);e.addEventListener(t,function i(o){r.once&&e.removeEventListener(t,i),n(o)})}}Object.defineProperty(EventEmitter,"defaultMaxListeners",{enumerable:!0,get:function(){return defaultMaxListeners},set:function(e){if("number"!=typeof e||e<0||NumberIsNaN(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");defaultMaxListeners=e}}),EventEmitter.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},EventEmitter.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||NumberIsNaN(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},EventEmitter.prototype.getMaxListeners=function(){return _getMaxListeners(this)},EventEmitter.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var r="error"===e,i=this._events;if(void 0!==i)r=r&&void 0===i.error;else if(!r)return!1;if(r){var o;if(t.length>0&&(o=t[0]),o instanceof Error)throw o;var s=new Error("Unhandled error."+(o?" ("+o.message+")":""));throw s.context=o,s}var u=i[e];if(void 0===u)return!1;if("function"==typeof u)ReflectApply(u,this,t);else{var f=u.length,v=arrayClone(u,f);for(n=0;n<f;++n)ReflectApply(v[n],this,t)}return!0},EventEmitter.prototype.addListener=function(e,t){return _addListener(this,e,t,!1)},EventEmitter.prototype.on=EventEmitter.prototype.addListener,EventEmitter.prototype.prependListener=function(e,t){return _addListener(this,e,t,!0)},EventEmitter.prototype.once=function(e,t){return checkListener(t),this.on(e,_onceWrap(this,e,t)),this},EventEmitter.prototype.prependOnceListener=function(e,t){return checkListener(t),this.prependListener(e,_onceWrap(this,e,t)),this},EventEmitter.prototype.removeListener=function(e,t){var n,r,i,o,s;if(checkListener(t),void 0===(r=this._events))return this;if(void 0===(n=r[e]))return this;if(n===t||n.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete r[e],r.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(i=-1,o=n.length-1;o>=0;o--)if(n[o]===t||n[o].listener===t){s=n[o].listener,i=o;break}if(i<0)return this;0===i?n.shift():spliceOne(n,i),1===n.length&&(r[e]=n[0]),void 0!==r.removeListener&&this.emit("removeListener",e,s||t)}return this},EventEmitter.prototype.off=EventEmitter.prototype.removeListener,EventEmitter.prototype.removeAllListeners=function(e){var t,n,r;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var i,o=Object.keys(n);for(r=0;r<o.length;++r)"removeListener"!==(i=o[r])&&this.removeAllListeners(i);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(r=t.length-1;r>=0;r--)this.removeListener(e,t[r]);return this},EventEmitter.prototype.listeners=function(e){return _listeners(this,e,!0)},EventEmitter.prototype.rawListeners=function(e){return _listeners(this,e,!1)},EventEmitter.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):listenerCount.call(e,t)},EventEmitter.prototype.listenerCount=listenerCount,EventEmitter.prototype.eventNames=function(){return this._eventsCount>0?ReflectOwnKeys(this._events):[]};
},{}],19:[function(_dereq_,module,exports){
exports.read=function(a,o,t,r,h){var M,p,w=8*h-r-1,f=(1<<w)-1,e=f>>1,i=-7,N=t?h-1:0,n=t?-1:1,s=a[o+N];for(N+=n,M=s&(1<<-i)-1,s>>=-i,i+=w;i>0;M=256*M+a[o+N],N+=n,i-=8);for(p=M&(1<<-i)-1,M>>=-i,i+=r;i>0;p=256*p+a[o+N],N+=n,i-=8);if(0===M)M=1-e;else{if(M===f)return p?NaN:1/0*(s?-1:1);p+=Math.pow(2,r),M-=e}return(s?-1:1)*p*Math.pow(2,M-r)},exports.write=function(a,o,t,r,h,M){var p,w,f,e=8*M-h-1,i=(1<<e)-1,N=i>>1,n=23===h?Math.pow(2,-24)-Math.pow(2,-77):0,s=r?0:M-1,u=r?1:-1,l=o<0||0===o&&1/o<0?1:0;for(o=Math.abs(o),isNaN(o)||o===1/0?(w=isNaN(o)?1:0,p=i):(p=Math.floor(Math.log(o)/Math.LN2),o*(f=Math.pow(2,-p))<1&&(p--,f*=2),(o+=p+N>=1?n/f:n*Math.pow(2,1-N))*f>=2&&(p++,f/=2),p+N>=i?(w=0,p=i):p+N>=1?(w=(o*f-1)*Math.pow(2,h),p+=N):(w=o*Math.pow(2,N-1)*Math.pow(2,h),p=0));h>=8;a[t+s]=255&w,s+=u,w/=256,h-=8);for(p=p<<h|w,e+=h;e>0;a[t+s]=255&p,s+=u,p/=256,e-=8);a[t+s-u]|=128*l};
},{}],20:[function(_dereq_,module,exports){
"function"==typeof Object.create?module.exports=function(t,e){e&&(t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}))}:module.exports=function(t,e){if(e){t.super_=e;var o=function(){};o.prototype=e.prototype,t.prototype=new o,t.prototype.constructor=t}};
},{}],21:[function(_dereq_,module,exports){
(function (Buffer){(function (){
var Uint64BE,Int64BE,Uint64LE,Int64LE;!function(r){var t,n="undefined",f=n!==typeof Buffer&&Buffer,e=n!==typeof Uint8Array&&Uint8Array,o=n!==typeof ArrayBuffer&&ArrayBuffer,i=[0,0,0,0,0,0,0,0],u=Array.isArray||function(r){return!!r&&"[object Array]"==Object.prototype.toString.call(r)},a=4294967296,s=16777216;function c(u,c,U){var I=c?0:4,L=c?4:0,w=c?0:3,d=c?1:2,S=c?2:1,j=c?3:0,m=c?B:g,x=c?E:A,M=O.prototype,N="is"+u,k="_"+N;return M.buffer=void 0,M.offset=0,M[k]=!0,M.toNumber=J,M.toString=function(r){var t=this.buffer,n=this.offset,f=q(t,n+I),e=q(t,n+L),o="",i=!U&&2147483648&f;i&&(f=~f,e=a-e);r=r||10;for(;;){var u=f%r*a+e;if(f=Math.floor(f/r),e=Math.floor(u/r),o=(u%r).toString(r)+o,!f&&!e)break}i&&(o="-"+o);return o},M.toJSON=J,M.toArray=y,f&&(M.toBuffer=v),e&&(M.toArrayBuffer=h),O[N]=function(r){return!(!r||!r[k])},r[u]=O,O;function O(r,f,u,s){return this instanceof O?function(r,f,u,s,c){e&&o&&(f instanceof o&&(f=new e(f)),s instanceof o&&(s=new e(s)));if(!(f||u||s||t))return void(r.buffer=l(i,0));if(!p(f,u)){var y=t||Array;c=u,s=f,u=0,f=new y(8)}if(r.buffer=f,r.offset=u|=0,n===typeof s)return;"string"==typeof s?function(r,t,n,f){var e=0,o=n.length,i=0,u=0;"-"===n[0]&&e++;var s=e;for(;e<o;){var c=parseInt(n[e++],f);if(!(c>=0))break;u=u*f+c,i=i*f+Math.floor(u/a),u%=a}s&&(i=~i,u?u=a-u:i++);_(r,t+I,i),_(r,t+L,u)}(f,u,s,c||10):p(s,c)?b(f,u,s,c):"number"==typeof c?(_(f,u+I,s),_(f,u+L,c)):s>0?m(f,u,s):s<0?x(f,u,s):b(f,u,i,0)}(this,r,f,u,s):new O(r,f,u,s)}function J(){var r=this.buffer,t=this.offset,n=q(r,t+I),f=q(r,t+L);return U||(n|=0),n?n*a+f:f}function _(r,t,n){r[t+j]=255&n,n>>=8,r[t+S]=255&n,n>>=8,r[t+d]=255&n,n>>=8,r[t+w]=255&n}function q(r,t){return r[t+w]*s+(r[t+d]<<16)+(r[t+S]<<8)+r[t+j]}}function y(r){var n=this.buffer,f=this.offset;return t=null,!1!==r&&0===f&&8===n.length&&u(n)?n:l(n,f)}function v(r){var n=this.buffer,e=this.offset;if(t=f,!1!==r&&0===e&&8===n.length&&Buffer.isBuffer(n))return n;var o=new f(8);return b(o,0,n,e),o}function h(r){var n=this.buffer,f=this.offset,i=n.buffer;if(t=e,!1!==r&&0===f&&i instanceof o&&8===i.byteLength)return i;var u=new e(8);return b(u,0,n,f),u.buffer}function p(r,t){var n=r&&r.length;return t|=0,n&&t+8<=n&&"string"!=typeof r[t]}function b(r,t,n,f){t|=0,f|=0;for(var e=0;e<8;e++)r[t++]=255&n[f++]}function l(r,t){return Array.prototype.slice.call(r,t,t+8)}function B(r,t,n){for(var f=t+8;f>t;)r[--f]=255&n,n/=256}function E(r,t,n){var f=t+8;for(n++;f>t;)r[--f]=255&-n^255,n/=256}function g(r,t,n){for(var f=t+8;t<f;)r[t++]=255&n,n/=256}function A(r,t,n){var f=t+8;for(n++;t<f;)r[t++]=255&-n^255,n/=256}Uint64BE=c("Uint64BE",!0,!0),Int64BE=c("Int64BE",!0,!1),Uint64LE=c("Uint64LE",!1,!0),Int64LE=c("Int64LE",!1,!1)}("object"==typeof exports&&"string"!=typeof exports.nodeName?exports:this||{});
}).call(this)}).call(this,_dereq_("buffer").Buffer)
},{"buffer":3}],22:[function(_dereq_,module,exports){
var toString={}.toString;module.exports=Array.isArray||function(r){return"[object Array]"==toString.call(r)};
},{}],23:[function(_dereq_,module,exports){
exports.encode=_dereq_("./encode").encode,exports.decode=_dereq_("./decode").decode,exports.Encoder=_dereq_("./encoder").Encoder,exports.Decoder=_dereq_("./decoder").Decoder,exports.createCodec=_dereq_("./ext").createCodec,exports.codec=_dereq_("./codec").codec;
},{"./codec":32,"./decode":34,"./decoder":35,"./encode":37,"./encoder":38,"./ext":42}],24:[function(_dereq_,module,exports){
(function (Buffer){(function (){
function c(f){return f&&f.isBuffer&&f}module.exports=c("undefined"!=typeof Buffer&&Buffer)||c(this.Buffer)||c("undefined"!=typeof window&&window.Buffer)||this.Buffer;
}).call(this)}).call(this,_dereq_("buffer").Buffer)
},{"buffer":3}],25:[function(_dereq_,module,exports){
var MAXBUFLEN=8192;function write(t,r){for(var i=r||(r|=0),h=t.length,s=0,o=0;o<h;)(s=t.charCodeAt(o++))<128?this[i++]=s:s<2048?(this[i++]=192|s>>>6,this[i++]=128|63&s):s<55296||s>57343?(this[i++]=224|s>>>12,this[i++]=128|s>>>6&63,this[i++]=128|63&s):(s=65536+(s-55296<<10|t.charCodeAt(o++)-56320),this[i++]=240|s>>>18,this[i++]=128|s>>>12&63,this[i++]=128|s>>>6&63,this[i++]=128|63&s);return i-r}function toString(t,r,i){var h=0|r;i||(i=this.length);for(var s="",o=0;h<i;)(o=this[h++])<128?s+=String.fromCharCode(o):(192==(224&o)?o=(31&o)<<6|63&this[h++]:224==(240&o)?o=(15&o)<<12|(63&this[h++])<<6|63&this[h++]:240==(248&o)&&(o=(7&o)<<18|(63&this[h++])<<12|(63&this[h++])<<6|63&this[h++]),o>=65536?(o-=65536,s+=String.fromCharCode(55296+(o>>>10),56320+(1023&o))):s+=String.fromCharCode(o));return s}function copy(t,r,i,h){var s;i||(i=0),h||0===h||(h=this.length),r||(r=0);var o=h-i;if(t===this&&i<r&&r<h)for(s=o-1;s>=0;s--)t[s+r]=this[s+i];else for(s=0;s<o;s++)t[s+r]=this[s+i];return o}exports.copy=copy,exports.toString=toString,exports.write=write;
},{}],26:[function(_dereq_,module,exports){
var Bufferish=_dereq_("./bufferish"),exports=module.exports=alloc(0);function alloc(r){return new Array(r)}function from(r){if(!Bufferish.isBuffer(r)&&Bufferish.isView(r))r=Bufferish.Uint8Array.from(r);else if(Bufferish.isArrayBuffer(r))r=new Uint8Array(r);else{if("string"==typeof r)return Bufferish.from.call(exports,r);if("number"==typeof r)throw new TypeError('"value" argument must not be a number')}return Array.prototype.slice.call(r)}exports.alloc=alloc,exports.concat=Bufferish.concat,exports.from=from;
},{"./bufferish":30}],27:[function(_dereq_,module,exports){
var Bufferish=_dereq_("./bufferish"),Buffer=Bufferish.global,exports=module.exports=Bufferish.hasBuffer?alloc(0):[];function alloc(f){return new Buffer(f)}function from(f){if(!Bufferish.isBuffer(f)&&Bufferish.isView(f))f=Bufferish.Uint8Array.from(f);else if(Bufferish.isArrayBuffer(f))f=new Uint8Array(f);else{if("string"==typeof f)return Bufferish.from.call(exports,f);if("number"==typeof f)throw new TypeError('"value" argument must not be a number')}return Buffer.from&&1!==Buffer.from.length?Buffer.from(f):new Buffer(f)}exports.alloc=Bufferish.hasBuffer&&Buffer.alloc||alloc,exports.concat=Bufferish.concat,exports.from=from;
},{"./bufferish":30}],28:[function(_dereq_,module,exports){
var BufferLite=_dereq_("./buffer-lite");exports.copy=copy,exports.slice=slice,exports.toString=toString,exports.write=gen("write");var Bufferish=_dereq_("./bufferish"),Buffer=Bufferish.global,isBufferShim=Bufferish.hasBuffer&&"TYPED_ARRAY_SUPPORT"in Buffer,brokenTypedArray=isBufferShim&&!Buffer.TYPED_ARRAY_SUPPORT;function copy(r,i,e,f){var t=Bufferish.isBuffer(this),s=Bufferish.isBuffer(r);if(t&&s)return this.copy(r,i,e,f);if(brokenTypedArray||t||s||!Bufferish.isView(this)||!Bufferish.isView(r))return BufferLite.copy.call(this,r,i,e,f);var u=e||null!=f?slice.call(this,e,f):this;return r.set(u,i),u.length}function slice(r,i){var e=this.slice||!brokenTypedArray&&this.subarray;if(e)return e.call(this,r,i);var f=Bufferish.alloc.call(this,i-r);return copy.call(this,f,0,r,i),f}function toString(r,i,e){return(!isBufferShim&&Bufferish.isBuffer(this)?this.toString:BufferLite.toString).apply(this,arguments)}function gen(r){return function(){return(this[r]||BufferLite[r]).apply(this,arguments)}}
},{"./buffer-lite":25,"./bufferish":30}],29:[function(_dereq_,module,exports){
var Bufferish=_dereq_("./bufferish"),exports=module.exports=Bufferish.hasArrayBuffer?alloc(0):[];function alloc(e){return new Uint8Array(e)}function from(e){if(Bufferish.isView(e)){var r=e.byteOffset,t=e.byteLength;(e=e.buffer).byteLength!==t&&(e.slice?e=e.slice(r,r+t):(e=new Uint8Array(e)).byteLength!==t&&(e=Array.prototype.slice.call(e,r,r+t)))}else{if("string"==typeof e)return Bufferish.from.call(exports,e);if("number"==typeof e)throw new TypeError('"value" argument must not be a number')}return new Uint8Array(e)}exports.alloc=alloc,exports.concat=Bufferish.concat,exports.from=from;
},{"./bufferish":30}],30:[function(_dereq_,module,exports){
var Buffer=exports.global=_dereq_("./buffer-global"),hasBuffer=exports.hasBuffer=Buffer&&!!Buffer.isBuffer,hasArrayBuffer=exports.hasArrayBuffer="undefined"!=typeof ArrayBuffer,isArray=exports.isArray=_dereq_("isarray");exports.isArrayBuffer=hasArrayBuffer?isArrayBuffer:_false;var isBuffer=exports.isBuffer=hasBuffer?Buffer.isBuffer:_false,isView=exports.isView=hasArrayBuffer?ArrayBuffer.isView||_is("ArrayBuffer","buffer"):_false;exports.alloc=alloc,exports.concat=concat,exports.from=from;var BufferArray=exports.Array=_dereq_("./bufferish-array"),BufferBuffer=exports.Buffer=_dereq_("./bufferish-buffer"),BufferUint8Array=exports.Uint8Array=_dereq_("./bufferish-uint8array"),BufferProto=exports.prototype=_dereq_("./bufferish-proto");function from(r){return"string"==typeof r?fromString.call(this,r):auto(this).from(r)}function alloc(r){return auto(this).alloc(r)}function concat(r,f){f||(f=0,Array.prototype.forEach.call(r,function(r){f+=r.length}));var e=this!==exports&&this||r[0],u=alloc.call(e,f),a=0;return Array.prototype.forEach.call(r,function(r){a+=BufferProto.copy.call(r,u,a)}),u}var _isArrayBuffer=_is("ArrayBuffer");function isArrayBuffer(r){return r instanceof ArrayBuffer||_isArrayBuffer(r)}function fromString(r){var f=3*r.length,e=alloc.call(this,f),u=BufferProto.write.call(e,r);return f!==u&&(e=BufferProto.slice.call(e,0,u)),e}function auto(r){return isBuffer(r)?BufferBuffer:isView(r)?BufferUint8Array:isArray(r)?BufferArray:hasBuffer?BufferBuffer:hasArrayBuffer?BufferUint8Array:BufferArray}function _false(){return!1}function _is(r,f){return r="[object "+r+"]",function(e){return null!=e&&{}.toString.call(f?e[f]:e)===r}}
},{"./buffer-global":24,"./bufferish-array":26,"./bufferish-buffer":27,"./bufferish-proto":28,"./bufferish-uint8array":29,"isarray":22}],31:[function(_dereq_,module,exports){
var IS_ARRAY=_dereq_("isarray");exports.createCodec=createCodec,exports.install=install,exports.filter=filter;var Bufferish=_dereq_("./bufferish");function Codec(e){if(!(this instanceof Codec))return new Codec(e);this.options=e,this.init()}function install(e){for(var t in e)Codec.prototype[t]=add(Codec.prototype[t],e[t])}function add(e,t){return e&&t?function(){return e.apply(this,arguments),t.apply(this,arguments)}:e||t}function join(e){return e=e.slice(),function(r){return e.reduce(t,r)};function t(e,t){return t(e)}}function filter(e){return IS_ARRAY(e)?join(e):e}function createCodec(e){return new Codec(e)}Codec.prototype.init=function(){var e=this.options;return e&&e.uint8array&&(this.bufferish=Bufferish.Uint8Array),this},exports.preset=createCodec({preset:!0});
},{"./bufferish":30,"isarray":22}],32:[function(_dereq_,module,exports){
_dereq_("./read-core"),_dereq_("./write-core"),exports.codec={preset:_dereq_("./codec-base").preset};
},{"./codec-base":31,"./read-core":44,"./write-core":47}],33:[function(_dereq_,module,exports){
exports.DecodeBuffer=DecodeBuffer;var preset=_dereq_("./read-core").preset,FlexDecoder=_dereq_("./flex-buffer").FlexDecoder;function DecodeBuffer(e){if(!(this instanceof DecodeBuffer))return new DecodeBuffer(e);if(e&&(this.options=e,e.codec)){var r=this.codec=e.codec;r.bufferish&&(this.bufferish=r.bufferish)}}FlexDecoder.mixin(DecodeBuffer.prototype),DecodeBuffer.prototype.codec=preset,DecodeBuffer.prototype.fetch=function(){return this.codec.decode(this)};
},{"./flex-buffer":43,"./read-core":44}],34:[function(_dereq_,module,exports){
exports.decode=decode;var DecodeBuffer=_dereq_("./decode-buffer").DecodeBuffer;function decode(e,r){var d=new DecodeBuffer(r);return d.write(e),d.read()}
},{"./decode-buffer":33}],35:[function(_dereq_,module,exports){
exports.Decoder=Decoder;var EventLite=_dereq_("event-lite"),DecodeBuffer=_dereq_("./decode-buffer").DecodeBuffer;function Decoder(e){if(!(this instanceof Decoder))return new Decoder(e);DecodeBuffer.call(this,e)}Decoder.prototype=new DecodeBuffer,EventLite.mixin(Decoder.prototype),Decoder.prototype.decode=function(e){arguments.length&&this.write(e),this.flush()},Decoder.prototype.push=function(e){this.emit("data",e)},Decoder.prototype.end=function(e){this.decode(e),this.emit("end")};
},{"./decode-buffer":33,"event-lite":17}],36:[function(_dereq_,module,exports){
exports.EncodeBuffer=EncodeBuffer;var preset=_dereq_("./write-core").preset,FlexEncoder=_dereq_("./flex-buffer").FlexEncoder;function EncodeBuffer(e){if(!(this instanceof EncodeBuffer))return new EncodeBuffer(e);if(e&&(this.options=e,e.codec)){var r=this.codec=e.codec;r.bufferish&&(this.bufferish=r.bufferish)}}FlexEncoder.mixin(EncodeBuffer.prototype),EncodeBuffer.prototype.codec=preset,EncodeBuffer.prototype.write=function(e){this.codec.encode(this,e)};
},{"./flex-buffer":43,"./write-core":47}],37:[function(_dereq_,module,exports){
exports.encode=encode;var EncodeBuffer=_dereq_("./encode-buffer").EncodeBuffer;function encode(e,r){var n=new EncodeBuffer(r);return n.write(e),n.read()}
},{"./encode-buffer":36}],38:[function(_dereq_,module,exports){
exports.Encoder=Encoder;var EventLite=_dereq_("event-lite"),EncodeBuffer=_dereq_("./encode-buffer").EncodeBuffer;function Encoder(e){if(!(this instanceof Encoder))return new Encoder(e);EncodeBuffer.call(this,e)}Encoder.prototype=new EncodeBuffer,EventLite.mixin(Encoder.prototype),Encoder.prototype.encode=function(e){this.write(e),this.emit("data",this.read())},Encoder.prototype.end=function(e){arguments.length&&this.encode(e),this.flush(),this.emit("end")};
},{"./encode-buffer":36,"event-lite":17}],39:[function(_dereq_,module,exports){
exports.ExtBuffer=ExtBuffer;var Bufferish=_dereq_("./bufferish");function ExtBuffer(f,e){if(!(this instanceof ExtBuffer))return new ExtBuffer(f,e);this.buffer=Bufferish.from(f),this.type=e}
},{"./bufferish":30}],40:[function(_dereq_,module,exports){
exports.setExtPackers=setExtPackers;var _encode,Bufferish=_dereq_("./bufferish"),Buffer=Bufferish.global,packTypedArray=Bufferish.Uint8Array.from,ERROR_COLUMNS={name:1,message:1,stack:1,columnNumber:1,fileName:1,lineNumber:1};function setExtPackers(r){r.addExtPacker(14,Error,[packError,encode]),r.addExtPacker(1,EvalError,[packError,encode]),r.addExtPacker(2,RangeError,[packError,encode]),r.addExtPacker(3,ReferenceError,[packError,encode]),r.addExtPacker(4,SyntaxError,[packError,encode]),r.addExtPacker(5,TypeError,[packError,encode]),r.addExtPacker(6,URIError,[packError,encode]),r.addExtPacker(10,RegExp,[packRegExp,encode]),r.addExtPacker(11,Boolean,[packValueOf,encode]),r.addExtPacker(12,String,[packValueOf,encode]),r.addExtPacker(13,Date,[Number,encode]),r.addExtPacker(15,Number,[packValueOf,encode]),"undefined"!=typeof Uint8Array&&(r.addExtPacker(17,Int8Array,packTypedArray),r.addExtPacker(18,Uint8Array,packTypedArray),r.addExtPacker(19,Int16Array,packTypedArray),r.addExtPacker(20,Uint16Array,packTypedArray),r.addExtPacker(21,Int32Array,packTypedArray),r.addExtPacker(22,Uint32Array,packTypedArray),r.addExtPacker(23,Float32Array,packTypedArray),"undefined"!=typeof Float64Array&&r.addExtPacker(24,Float64Array,packTypedArray),"undefined"!=typeof Uint8ClampedArray&&r.addExtPacker(25,Uint8ClampedArray,packTypedArray),r.addExtPacker(26,ArrayBuffer,packTypedArray),r.addExtPacker(29,DataView,packTypedArray)),Bufferish.hasBuffer&&r.addExtPacker(27,Buffer,Bufferish.from)}function encode(r){return _encode||(_encode=_dereq_("./encode").encode),_encode(r)}function packValueOf(r){return r.valueOf()}function packRegExp(r){(r=RegExp.prototype.toString.call(r).split("/")).shift();var e=[r.pop()];return e.unshift(r.join("/")),e}function packError(r){var e={};for(var a in ERROR_COLUMNS)e[a]=r[a];return e}
},{"./bufferish":30,"./encode":37}],41:[function(_dereq_,module,exports){
exports.setExtUnpackers=setExtUnpackers;var _decode,Bufferish=_dereq_("./bufferish"),Buffer=Bufferish.global,ERROR_COLUMNS={name:1,message:1,stack:1,columnNumber:1,fileName:1,lineNumber:1};function setExtUnpackers(r){r.addExtUnpacker(14,[decode,unpackError(Error)]),r.addExtUnpacker(1,[decode,unpackError(EvalError)]),r.addExtUnpacker(2,[decode,unpackError(RangeError)]),r.addExtUnpacker(3,[decode,unpackError(ReferenceError)]),r.addExtUnpacker(4,[decode,unpackError(SyntaxError)]),r.addExtUnpacker(5,[decode,unpackError(TypeError)]),r.addExtUnpacker(6,[decode,unpackError(URIError)]),r.addExtUnpacker(10,[decode,unpackRegExp]),r.addExtUnpacker(11,[decode,unpackClass(Boolean)]),r.addExtUnpacker(12,[decode,unpackClass(String)]),r.addExtUnpacker(13,[decode,unpackClass(Date)]),r.addExtUnpacker(15,[decode,unpackClass(Number)]),"undefined"!=typeof Uint8Array&&(r.addExtUnpacker(17,unpackClass(Int8Array)),r.addExtUnpacker(18,unpackClass(Uint8Array)),r.addExtUnpacker(19,[unpackArrayBuffer,unpackClass(Int16Array)]),r.addExtUnpacker(20,[unpackArrayBuffer,unpackClass(Uint16Array)]),r.addExtUnpacker(21,[unpackArrayBuffer,unpackClass(Int32Array)]),r.addExtUnpacker(22,[unpackArrayBuffer,unpackClass(Uint32Array)]),r.addExtUnpacker(23,[unpackArrayBuffer,unpackClass(Float32Array)]),"undefined"!=typeof Float64Array&&r.addExtUnpacker(24,[unpackArrayBuffer,unpackClass(Float64Array)]),"undefined"!=typeof Uint8ClampedArray&&r.addExtUnpacker(25,unpackClass(Uint8ClampedArray)),r.addExtUnpacker(26,unpackArrayBuffer),r.addExtUnpacker(29,[unpackArrayBuffer,unpackClass(DataView)])),Bufferish.hasBuffer&&r.addExtUnpacker(27,unpackClass(Buffer))}function decode(r){return _decode||(_decode=_dereq_("./decode").decode),_decode(r)}function unpackRegExp(r){return RegExp.apply(null,r)}function unpackError(r){return function(a){var e=new r;for(var n in ERROR_COLUMNS)e[n]=a[n];return e}}function unpackClass(r){return function(a){return new r(a)}}function unpackArrayBuffer(r){return new Uint8Array(r).buffer}
},{"./bufferish":30,"./decode":34}],42:[function(_dereq_,module,exports){
_dereq_("./read-core"),_dereq_("./write-core"),exports.createCodec=_dereq_("./codec-base").createCodec;
},{"./codec-base":31,"./read-core":44,"./write-core":47}],43:[function(_dereq_,module,exports){
exports.FlexDecoder=FlexDecoder,exports.FlexEncoder=FlexEncoder;var Bufferish=_dereq_("./bufferish"),MIN_BUFFER_SIZE=2048,MAX_BUFFER_SIZE=65536,BUFFER_SHORTAGE="BUFFER_SHORTAGE";function FlexDecoder(){if(!(this instanceof FlexDecoder))return new FlexDecoder}function FlexEncoder(){if(!(this instanceof FlexEncoder))return new FlexEncoder}function getDecoderMethods(){return{bufferish:Bufferish,write:function(e){var t=this.offset?Bufferish.prototype.slice.call(this.buffer,this.offset):this.buffer;this.buffer=t?e?this.bufferish.concat([t,e]):t:e,this.offset=0},fetch:fetch,flush:function(){for(;this.offset<this.buffer.length;){var e,t=this.offset;try{e=this.fetch()}catch(e){if(e&&e.message!=BUFFER_SHORTAGE)throw e;this.offset=t;break}this.push(e)}},push:push,pull:pull,read:read,reserve:function(e){var t=this.offset,f=t+e;if(f>this.buffer.length)throw new Error(BUFFER_SHORTAGE);return this.offset=f,t},offset:0}}function getEncoderMethods(){return{bufferish:Bufferish,write:write,fetch:function(){var e=this.start;if(e<this.offset){var t=this.start=this.offset;return Bufferish.prototype.slice.call(this.buffer,e,t)}},flush:function(){for(;this.start<this.offset;){var e=this.fetch();e&&this.push(e)}},push:push,pull:function(){var e=this.buffers||(this.buffers=[]),t=e.length>1?this.bufferish.concat(e):e[0];return e.length=0,t},read:read,reserve:function(e){var t=0|e;if(this.buffer){var f=this.buffer.length,r=0|this.offset,i=r+t;if(i<f)return this.offset=i,r;this.flush(),e=Math.max(e,Math.min(2*f,this.maxBufferSize))}return e=Math.max(e,this.minBufferSize),this.buffer=this.bufferish.alloc(e),this.start=0,this.offset=t,0},send:function(e){var t=e.length;if(t>this.minBufferSize)this.flush(),this.push(e);else{var f=this.reserve(t);Bufferish.prototype.copy.call(e,this.buffer,f)}},maxBufferSize:MAX_BUFFER_SIZE,minBufferSize:MIN_BUFFER_SIZE,offset:0,start:0}}function write(){throw new Error("method not implemented: write()")}function fetch(){throw new Error("method not implemented: fetch()")}function read(){return this.buffers&&this.buffers.length?(this.flush(),this.pull()):this.fetch()}function push(e){(this.buffers||(this.buffers=[])).push(e)}function pull(){return(this.buffers||(this.buffers=[])).shift()}function mixinFactory(e){return function(t){for(var f in e)t[f]=e[f];return t}}FlexDecoder.mixin=mixinFactory(getDecoderMethods()),FlexDecoder.mixin(FlexDecoder.prototype),FlexEncoder.mixin=mixinFactory(getEncoderMethods()),FlexEncoder.mixin(FlexEncoder.prototype);
},{"./bufferish":30}],44:[function(_dereq_,module,exports){
var ExtBuffer=_dereq_("./ext-buffer").ExtBuffer,ExtUnpacker=_dereq_("./ext-unpacker"),readUint8=_dereq_("./read-format").readUint8,ReadToken=_dereq_("./read-token"),CodecBase=_dereq_("./codec-base");function getDecoder(e){var t=ReadToken.getReadToken(e);return function(e){var r=readUint8(e),n=t[r];if(!n)throw new Error("Invalid type: "+(r?"0x"+r.toString(16):r));return n(e)}}function init(){var e=this.options;return this.decode=getDecoder(e),e&&e.preset&&ExtUnpacker.setExtUnpackers(this),this}function addExtUnpacker(e,t){(this.extUnpackers||(this.extUnpackers=[]))[e]=CodecBase.filter(t)}function getExtUnpacker(e){return(this.extUnpackers||(this.extUnpackers=[]))[e]||function(t){return new ExtBuffer(t,e)}}CodecBase.install({addExtUnpacker:addExtUnpacker,getExtUnpacker:getExtUnpacker,init:init}),exports.preset=init.call(CodecBase.preset);
},{"./codec-base":31,"./ext-buffer":39,"./ext-unpacker":41,"./read-format":45,"./read-token":46}],45:[function(_dereq_,module,exports){
var ieee754=_dereq_("ieee754"),Int64Buffer=_dereq_("int64-buffer"),Uint64BE=Int64Buffer.Uint64BE,Int64BE=Int64Buffer.Int64BE;exports.getReadFormat=getReadFormat,exports.readUint8=uint8;var Bufferish=_dereq_("./bufferish"),BufferProto=_dereq_("./bufferish-proto"),HAS_MAP="undefined"!=typeof Map,NO_ASSERT=!0;function getReadFormat(r){var e=Bufferish.hasArrayBuffer&&r&&r.binarraybuffer,t=r&&r.int64;return{map:HAS_MAP&&r&&r.usemap?map_to_map:map_to_obj,array:array,str:str,bin:e?bin_arraybuffer:bin_buffer,ext:ext,uint8:uint8,uint16:uint16,uint32:uint32,uint64:read(8,t?readUInt64BE_int64:readUInt64BE),int8:int8,int16:int16,int32:int32,int64:read(8,t?readInt64BE_int64:readInt64BE),float32:read(4,readFloatBE),float64:read(8,readDoubleBE)}}function map_to_obj(r,e){var t,n={},f=new Array(e),u=new Array(e),i=r.codec.decode;for(t=0;t<e;t++)f[t]=i(r),u[t]=i(r);for(t=0;t<e;t++)n[f[t]]=u[t];return n}function map_to_map(r,e){var t,n=new Map,f=new Array(e),u=new Array(e),i=r.codec.decode;for(t=0;t<e;t++)f[t]=i(r),u[t]=i(r);for(t=0;t<e;t++)n.set(f[t],u[t]);return n}function array(r,e){for(var t=new Array(e),n=r.codec.decode,f=0;f<e;f++)t[f]=n(r);return t}function str(r,e){var t=r.reserve(e),n=t+e;return BufferProto.toString.call(r.buffer,"utf-8",t,n)}function bin_buffer(r,e){var t=r.reserve(e),n=t+e,f=BufferProto.slice.call(r.buffer,t,n);return Bufferish.from(f)}function bin_arraybuffer(r,e){var t=r.reserve(e),n=t+e,f=BufferProto.slice.call(r.buffer,t,n);return Bufferish.Uint8Array.from(f).buffer}function ext(r,e){var t=r.reserve(e+1),n=r.buffer[t++],f=t+e,u=r.codec.getExtUnpacker(n);if(!u)throw new Error("Invalid ext type: "+(n?"0x"+n.toString(16):n));return u(BufferProto.slice.call(r.buffer,t,f))}function uint8(r){var e=r.reserve(1);return r.buffer[e]}function int8(r){var e=r.reserve(1),t=r.buffer[e];return 128&t?t-256:t}function uint16(r){var e=r.reserve(2),t=r.buffer;return t[e++]<<8|t[e]}function int16(r){var e=r.reserve(2),t=r.buffer,n=t[e++]<<8|t[e];return 32768&n?n-65536:n}function uint32(r){var e=r.reserve(4),t=r.buffer;return 16777216*t[e++]+(t[e++]<<16)+(t[e++]<<8)+t[e]}function int32(r){var e=r.reserve(4),t=r.buffer;return t[e++]<<24|t[e++]<<16|t[e++]<<8|t[e]}function read(r,e){return function(t){var n=t.reserve(r);return e.call(t.buffer,n,NO_ASSERT)}}function readUInt64BE(r){return new Uint64BE(this,r).toNumber()}function readInt64BE(r){return new Int64BE(this,r).toNumber()}function readUInt64BE_int64(r){return new Uint64BE(this,r)}function readInt64BE_int64(r){return new Int64BE(this,r)}function readFloatBE(r){return ieee754.read(this,r,!1,23,4)}function readDoubleBE(r){return ieee754.read(this,r,!1,52,8)}
},{"./bufferish":30,"./bufferish-proto":28,"ieee754":19,"int64-buffer":21}],46:[function(_dereq_,module,exports){
var ReadFormat=_dereq_("./read-format");function getReadToken(t){var n=ReadFormat.getReadFormat(t);return t&&t.useraw?init_useraw(n):init_token(n)}function init_token(t){var n,e=new Array(256);for(n=0;n<=127;n++)e[n]=constant(n);for(n=128;n<=143;n++)e[n]=fix(n-128,t.map);for(n=144;n<=159;n++)e[n]=fix(n-144,t.array);for(n=160;n<=191;n++)e[n]=fix(n-160,t.str);for(e[192]=constant(null),e[193]=null,e[194]=constant(!1),e[195]=constant(!0),e[196]=flex(t.uint8,t.bin),e[197]=flex(t.uint16,t.bin),e[198]=flex(t.uint32,t.bin),e[199]=flex(t.uint8,t.ext),e[200]=flex(t.uint16,t.ext),e[201]=flex(t.uint32,t.ext),e[202]=t.float32,e[203]=t.float64,e[204]=t.uint8,e[205]=t.uint16,e[206]=t.uint32,e[207]=t.uint64,e[208]=t.int8,e[209]=t.int16,e[210]=t.int32,e[211]=t.int64,e[212]=fix(1,t.ext),e[213]=fix(2,t.ext),e[214]=fix(4,t.ext),e[215]=fix(8,t.ext),e[216]=fix(16,t.ext),e[217]=flex(t.uint8,t.str),e[218]=flex(t.uint16,t.str),e[219]=flex(t.uint32,t.str),e[220]=flex(t.uint16,t.array),e[221]=flex(t.uint32,t.array),e[222]=flex(t.uint16,t.map),e[223]=flex(t.uint32,t.map),n=224;n<=255;n++)e[n]=constant(n-256);return e}function init_useraw(t){var n,e=init_token(t).slice();for(e[217]=e[196],e[218]=e[197],e[219]=e[198],n=160;n<=191;n++)e[n]=fix(n-160,t.bin);return e}function constant(t){return function(){return t}}function flex(t,n){return function(e){var i=t(e);return n(e,i)}}function fix(t,n){return function(e){return n(e,t)}}exports.getReadToken=getReadToken;
},{"./read-format":45}],47:[function(_dereq_,module,exports){
var ExtBuffer=_dereq_("./ext-buffer").ExtBuffer,ExtPacker=_dereq_("./ext-packer"),WriteType=_dereq_("./write-type"),CodecBase=_dereq_("./codec-base");function getEncoder(e){var t=WriteType.getWriteType(e);return function(e,r){var i=t[typeof r];if(!i)throw new Error('Unsupported type "'+typeof r+'": '+r);i(e,r)}}function init(){var e=this.options;return this.encode=getEncoder(e),e&&e.preset&&ExtPacker.setExtPackers(this),this}function addExtPacker(e,t,r){r=CodecBase.filter(r);var i=t.name;i&&"Object"!==i?(this.extPackers||(this.extPackers={}))[i]=n:(this.extEncoderList||(this.extEncoderList=[])).unshift([t,n]);function n(t){return r&&(t=r(t)),new ExtBuffer(t,e)}}function getExtPacker(e){var t=this.extPackers||(this.extPackers={}),r=e.constructor,i=r&&r.name&&t[r.name];if(i)return i;for(var n=this.extEncoderList||(this.extEncoderList=[]),c=n.length,s=0;s<c;s++){var a=n[s];if(r===a[0])return a[1]}}CodecBase.install({addExtPacker:addExtPacker,getExtPacker:getExtPacker,init:init}),exports.preset=init.call(CodecBase.preset);
},{"./codec-base":31,"./ext-buffer":39,"./ext-packer":40,"./write-type":49}],48:[function(_dereq_,module,exports){
var ieee754=_dereq_("ieee754"),Int64Buffer=_dereq_("int64-buffer"),Uint64BE=Int64Buffer.Uint64BE,Int64BE=Int64Buffer.Int64BE,uint8=_dereq_("./write-uint8").uint8,Bufferish=_dereq_("./bufferish"),Buffer=Bufferish.global,IS_BUFFER_SHIM=Bufferish.hasBuffer&&"TYPED_ARRAY_SUPPORT"in Buffer,NO_TYPED_ARRAY=IS_BUFFER_SHIM&&!Buffer.TYPED_ARRAY_SUPPORT,Buffer_prototype=Bufferish.hasBuffer&&Buffer.prototype||{};function getWriteToken(t){return t&&t.uint8array?init_uint8array():NO_TYPED_ARRAY||Bufferish.hasBuffer&&t&&t.safe?init_safe():init_token()}function init_uint8array(){var t=init_token();return t[202]=writeN(202,4,writeFloatBE),t[203]=writeN(203,8,writeDoubleBE),t}function init_token(){var t=uint8.slice();return t[196]=write1(196),t[197]=write2(197),t[198]=write4(198),t[199]=write1(199),t[200]=write2(200),t[201]=write4(201),t[202]=writeN(202,4,Buffer_prototype.writeFloatBE||writeFloatBE,!0),t[203]=writeN(203,8,Buffer_prototype.writeDoubleBE||writeDoubleBE,!0),t[204]=write1(204),t[205]=write2(205),t[206]=write4(206),t[207]=writeN(207,8,writeUInt64BE),t[208]=write1(208),t[209]=write2(209),t[210]=write4(210),t[211]=writeN(211,8,writeInt64BE),t[217]=write1(217),t[218]=write2(218),t[219]=write4(219),t[220]=write2(220),t[221]=write4(221),t[222]=write2(222),t[223]=write4(223),t}function init_safe(){var t=uint8.slice();return t[196]=writeN(196,1,Buffer.prototype.writeUInt8),t[197]=writeN(197,2,Buffer.prototype.writeUInt16BE),t[198]=writeN(198,4,Buffer.prototype.writeUInt32BE),t[199]=writeN(199,1,Buffer.prototype.writeUInt8),t[200]=writeN(200,2,Buffer.prototype.writeUInt16BE),t[201]=writeN(201,4,Buffer.prototype.writeUInt32BE),t[202]=writeN(202,4,Buffer.prototype.writeFloatBE),t[203]=writeN(203,8,Buffer.prototype.writeDoubleBE),t[204]=writeN(204,1,Buffer.prototype.writeUInt8),t[205]=writeN(205,2,Buffer.prototype.writeUInt16BE),t[206]=writeN(206,4,Buffer.prototype.writeUInt32BE),t[207]=writeN(207,8,writeUInt64BE),t[208]=writeN(208,1,Buffer.prototype.writeInt8),t[209]=writeN(209,2,Buffer.prototype.writeInt16BE),t[210]=writeN(210,4,Buffer.prototype.writeInt32BE),t[211]=writeN(211,8,writeInt64BE),t[217]=writeN(217,1,Buffer.prototype.writeUInt8),t[218]=writeN(218,2,Buffer.prototype.writeUInt16BE),t[219]=writeN(219,4,Buffer.prototype.writeUInt32BE),t[220]=writeN(220,2,Buffer.prototype.writeUInt16BE),t[221]=writeN(221,4,Buffer.prototype.writeUInt32BE),t[222]=writeN(222,2,Buffer.prototype.writeUInt16BE),t[223]=writeN(223,4,Buffer.prototype.writeUInt32BE),t}function write1(t){return function(e,r){var i=e.reserve(2),f=e.buffer;f[i++]=t,f[i]=r}}function write2(t){return function(e,r){var i=e.reserve(3),f=e.buffer;f[i++]=t,f[i++]=r>>>8,f[i]=r}}function write4(t){return function(e,r){var i=e.reserve(5),f=e.buffer;f[i++]=t,f[i++]=r>>>24,f[i++]=r>>>16,f[i++]=r>>>8,f[i]=r}}function writeN(t,e,r,i){return function(f,n){var w=f.reserve(e+1);f.buffer[w++]=t,r.call(f.buffer,n,w,i)}}function writeUInt64BE(t,e){new Uint64BE(this,e,t)}function writeInt64BE(t,e){new Int64BE(this,e,t)}function writeFloatBE(t,e){ieee754.write(this,t,e,!1,23,4)}function writeDoubleBE(t,e){ieee754.write(this,t,e,!1,52,8)}exports.getWriteToken=getWriteToken;
},{"./bufferish":30,"./write-uint8":50,"ieee754":19,"int64-buffer":21}],49:[function(_dereq_,module,exports){
var IS_ARRAY=_dereq_("isarray"),Int64Buffer=_dereq_("int64-buffer"),Uint64BE=Int64Buffer.Uint64BE,Int64BE=Int64Buffer.Int64BE,Bufferish=_dereq_("./bufferish"),BufferProto=_dereq_("./bufferish-proto"),WriteToken=_dereq_("./write-token"),uint8=_dereq_("./write-uint8").uint8,ExtBuffer=_dereq_("./ext-buffer").ExtBuffer,HAS_UINT8ARRAY="undefined"!=typeof Uint8Array,HAS_MAP="undefined"!=typeof Map,extmap=[];function getWriteType(e){var r=WriteToken.getWriteToken(e),n=e&&e.useraw,t=HAS_UINT8ARRAY&&e&&e.binarraybuffer,f=t?Bufferish.isArrayBuffer:Bufferish.isBuffer,i=t?function(e,r){c(e,new Uint8Array(r))}:c,u=HAS_MAP&&e&&e.usemap?function(e,n){if(!(n instanceof Map))return s(e,n);var t=n.size;r[t<16?128+t:t<=65535?222:223](e,t);var f=e.codec.encode;n.forEach(function(r,n,t){f(e,n),f(e,r)})}:s;return{boolean:function(e,n){r[n?195:194](e,n)},function:a,number:function(e,n){var t,f=0|n;if(n!==f)return void r[t=203](e,n);t=-32<=f&&f<=127?255&f:0<=f?f<=255?204:f<=65535?205:206:-128<=f?208:-32768<=f?209:210;r[t](e,f)},object:n?function(e,n){if(f(n))return function(e,n){var t=n.length;r[t<32?160+t:t<=65535?218:219](e,t),e.send(n)}(e,n);o(e,n)}:o,string:function(e){return function(n,t){var f=t.length,i=5+3*f;n.offset=n.reserve(i);var u=n.buffer,o=e(f),a=n.offset+o;f=BufferProto.write.call(u,t,a);var c=e(f);if(o!==c){var s=a+c-o,B=a+f;BufferProto.copy.call(u,u,s,a,B)}r[1===c?160+f:c<=3?215+c:219](n,f),n.offset+=f}}(n?function(e){return e<32?1:e<=65535?3:5}:function(e){return e<32?1:e<=255?2:e<=65535?3:5}),symbol:a,undefined:a};function o(e,n){if(null===n)return a(e,n);if(f(n))return i(e,n);if(IS_ARRAY(n))return function(e,n){var t=n.length;r[t<16?144+t:t<=65535?220:221](e,t);for(var f=e.codec.encode,i=0;i<t;i++)f(e,n[i])}(e,n);if(Uint64BE.isUint64BE(n))return function(e,n){r[207](e,n.toArray())}(e,n);if(Int64BE.isInt64BE(n))return function(e,n){r[211](e,n.toArray())}(e,n);var t=e.codec.getExtPacker(n);if(t&&(n=t(n)),n instanceof ExtBuffer)return function(e,n){var t=n.buffer,f=t.length,i=extmap[f]||(f<255?199:f<=65535?200:201);r[i](e,f),uint8[n.type](e),e.send(t)}(e,n);u(e,n)}function a(e,n){r[192](e,n)}function c(e,n){var t=n.length;r[t<255?196:t<=65535?197:198](e,t),e.send(n)}function s(e,n){var t=Object.keys(n),f=t.length;r[f<16?128+f:f<=65535?222:223](e,f);var i=e.codec.encode;t.forEach(function(r){i(e,r),i(e,n[r])})}}extmap[1]=212,extmap[2]=213,extmap[4]=214,extmap[8]=215,extmap[16]=216,exports.getWriteType=getWriteType;
},{"./bufferish":30,"./bufferish-proto":28,"./ext-buffer":39,"./write-token":48,"./write-uint8":50,"int64-buffer":21,"isarray":22}],50:[function(_dereq_,module,exports){
for(var constant=exports.uint8=new Array(256),i=0;i<=255;i++)constant[i]=write0(i);function write0(r){return function(n){var t=n.reserve(1);n.buffer[t]=r}}
},{}],51:[function(_dereq_,module,exports){
"use strict";const stream=_dereq_("stream"),{Buffer:Buffer}=_dereq_("buffer"),td=new TextDecoder("utf8",{fatal:!0,ignoreBOM:!0});class NoFilter extends stream.Transform{constructor(e,r,t={}){let n=null,i=null;switch(typeof e){case"object":Buffer.isBuffer(e)?n=e:e&&(t=e);break;case"string":n=e;break;case"undefined":break;default:throw new TypeError("Invalid input")}switch(typeof r){case"object":r&&(t=r);break;case"string":i=r;break;case"undefined":break;default:throw new TypeError("Invalid inputEncoding")}if(!t||"object"!=typeof t)throw new TypeError("Invalid options");null==n&&(n=t.input),null==i&&(i=t.inputEncoding),delete t.input,delete t.inputEncoding;const s=null==t.watchPipe||t.watchPipe;delete t.watchPipe;const u=Boolean(t.readError);delete t.readError,super(t),this.readError=u,s&&this.on("pipe",e=>{const r=e._readableState.objectMode;if(this.length>0&&r!==this._readableState.objectMode)throw new Error("Do not switch objectMode in the middle of the stream");this._readableState.objectMode=r,this._writableState.objectMode=r}),null!=n&&this.end(n,i)}static isNoFilter(e){return e instanceof this}static compare(e,r){if(!(e instanceof this))throw new TypeError("Arguments must be NoFilters");return e===r?0:e.compare(r)}static concat(e,r){if(!Array.isArray(e))throw new TypeError("list argument must be an Array of NoFilters");if(0===e.length||0===r)return Buffer.alloc(0);null==r&&(r=e.reduce((e,r)=>{if(!(r instanceof NoFilter))throw new TypeError("list argument must be an Array of NoFilters");return e+r.length},0));let t=!0,n=!0;const i=e.map(e=>{if(!(e instanceof NoFilter))throw new TypeError("list argument must be an Array of NoFilters");const r=e.slice();return Buffer.isBuffer(r)?n=!1:t=!1,r});if(t)return Buffer.concat(i,r);if(n)return[].concat(...i).slice(0,r);throw new Error("Concatenating mixed object and byte streams not supported")}_transform(e,r,t){this._readableState.objectMode||Buffer.isBuffer(e)||(e=Buffer.from(e,r)),this.push(e),t()}_bufArray(){let e=this._readableState.buffer;if(!Array.isArray(e)){let r=e.head;for(e=[];null!=r;)e.push(r.data),r=r.next}return e}read(e){const r=super.read(e);if(null!=r){if(this.emit("read",r),this.readError&&r.length<e)throw new Error(`Read ${r.length}, wanted ${e}`)}else if(this.readError)throw new Error(`No data available, wanted ${e}`);return r}readFull(e){let r=null,t=null,n=null;return new Promise((i,s)=>{this.length>=e?i(this.read(e)):this.writableFinished?s(new Error(`Stream finished before ${e} bytes were available`)):(r=(r=>{this.length>=e&&i(this.read(e))}),t=(()=>{s(new Error(`Stream finished before ${e} bytes were available`))}),n=s,this.on("readable",r),this.on("error",n),this.on("finish",t))}).finally(()=>{r&&(this.removeListener("readable",r),this.removeListener("error",n),this.removeListener("finish",t))})}promise(e){let r=!1;return new Promise((t,n)=>{this.on("finish",()=>{const n=this.read();null==e||r||(r=!0,e(null,n)),t(n)}),this.on("error",t=>{null==e||r||(r=!0,e(t)),n(t)})})}compare(e){if(!(e instanceof NoFilter))throw new TypeError("Arguments must be NoFilters");if(this===e)return 0;const r=this.slice(),t=e.slice();if(Buffer.isBuffer(r)&&Buffer.isBuffer(t))return r.compare(t);throw new Error("Cannot compare streams in object mode")}equals(e){return 0===this.compare(e)}slice(e,r){if(this._readableState.objectMode)return this._bufArray().slice(e,r);const t=this._bufArray();switch(t.length){case 0:return Buffer.alloc(0);case 1:return t[0].slice(e,r);default:return Buffer.concat(t).slice(e,r)}}get(e){return this.slice()[e]}toJSON(){const e=this.slice();return Buffer.isBuffer(e)?e.toJSON():e}toString(e,r,t){const n=this.slice(r,t);return Buffer.isBuffer(n)?e&&"utf8"!==e?n.toString(e):td.decode(n):JSON.stringify(n)}[Symbol.for("nodejs.util.inspect.custom")](e,r){const t=this._bufArray().map(e=>Buffer.isBuffer(e)?r.stylize(e.toString("hex"),"string"):JSON.stringify(e)).join(", ");return`${this.constructor.name} [${t}]`}get length(){return this._readableState.length}writeBigInt(e){let r=e.toString(16);if(e<0){const t=BigInt(Math.floor(r.length/2));r=(e=(BigInt(1)<<t*BigInt(8))+e).toString(16)}return r.length%2&&(r=`0${r}`),this.push(Buffer.from(r,"hex"))}readUBigInt(e){const r=this.read(e);return Buffer.isBuffer(r)?BigInt(`0x${r.toString("hex")}`):null}readBigInt(e){const r=this.read(e);if(!Buffer.isBuffer(r))return null;let t=BigInt(`0x${r.toString("hex")}`);if(128&r[0]){t-=BigInt(1)<<BigInt(r.length)*BigInt(8)}return t}writeUInt8(e){const r=Buffer.from([e]);return this.push(r)}writeUInt16LE(e){const r=Buffer.alloc(2);return r.writeUInt16LE(e),this.push(r)}writeUInt16BE(e){const r=Buffer.alloc(2);return r.writeUInt16BE(e),this.push(r)}writeUInt32LE(e){const r=Buffer.alloc(4);return r.writeUInt32LE(e),this.push(r)}writeUInt32BE(e){const r=Buffer.alloc(4);return r.writeUInt32BE(e),this.push(r)}writeInt8(e){const r=Buffer.from([e]);return this.push(r)}writeInt16LE(e){const r=Buffer.alloc(2);return r.writeUInt16LE(e),this.push(r)}writeInt16BE(e){const r=Buffer.alloc(2);return r.writeUInt16BE(e),this.push(r)}writeInt32LE(e){const r=Buffer.alloc(4);return r.writeUInt32LE(e),this.push(r)}writeInt32BE(e){const r=Buffer.alloc(4);return r.writeUInt32BE(e),this.push(r)}writeFloatLE(e){const r=Buffer.alloc(4);return r.writeFloatLE(e),this.push(r)}writeFloatBE(e){const r=Buffer.alloc(4);return r.writeFloatBE(e),this.push(r)}writeDoubleLE(e){const r=Buffer.alloc(8);return r.writeDoubleLE(e),this.push(r)}writeDoubleBE(e){const r=Buffer.alloc(8);return r.writeDoubleBE(e),this.push(r)}writeBigInt64LE(e){const r=Buffer.alloc(8);return r.writeBigInt64LE(e),this.push(r)}writeBigInt64BE(e){const r=Buffer.alloc(8);return r.writeBigInt64BE(e),this.push(r)}writeBigUInt64LE(e){const r=Buffer.alloc(8);return r.writeBigUInt64LE(e),this.push(r)}writeBigUInt64BE(e){const r=Buffer.alloc(8);return r.writeBigUInt64BE(e),this.push(r)}readUInt8(){const e=this.read(1);return Buffer.isBuffer(e)?e.readUInt8():null}readUInt16LE(){const e=this.read(2);return Buffer.isBuffer(e)?e.readUInt16LE():null}readUInt16BE(){const e=this.read(2);return Buffer.isBuffer(e)?e.readUInt16BE():null}readUInt32LE(){const e=this.read(4);return Buffer.isBuffer(e)?e.readUInt32LE():null}readUInt32BE(){const e=this.read(4);return Buffer.isBuffer(e)?e.readUInt32BE():null}readInt8(){const e=this.read(1);return Buffer.isBuffer(e)?e.readInt8():null}readInt16LE(){const e=this.read(2);return Buffer.isBuffer(e)?e.readInt16LE():null}readInt16BE(){const e=this.read(2);return Buffer.isBuffer(e)?e.readInt16BE():null}readInt32LE(){const e=this.read(4);return Buffer.isBuffer(e)?e.readInt32LE():null}readInt32BE(){const e=this.read(4);return Buffer.isBuffer(e)?e.readInt32BE():null}readFloatLE(){const e=this.read(4);return Buffer.isBuffer(e)?e.readFloatLE():null}readFloatBE(){const e=this.read(4);return Buffer.isBuffer(e)?e.readFloatBE():null}readDoubleLE(){const e=this.read(8);return Buffer.isBuffer(e)?e.readDoubleLE():null}readDoubleBE(){const e=this.read(8);return Buffer.isBuffer(e)?e.readDoubleBE():null}readBigInt64LE(){const e=this.read(8);return Buffer.isBuffer(e)?e.readBigInt64LE():null}readBigInt64BE(){const e=this.read(8);return Buffer.isBuffer(e)?e.readBigInt64BE():null}readBigUInt64LE(){const e=this.read(8);return Buffer.isBuffer(e)?e.readBigUInt64LE():null}readBigUInt64BE(){const e=this.read(8);return Buffer.isBuffer(e)?e.readBigUInt64BE():null}}module.exports=NoFilter;
},{"buffer":3,"stream":54}],52:[function(_dereq_,module,exports){
var cachedSetTimeout,cachedClearTimeout,process=module.exports={};function defaultSetTimout(){throw new Error("setTimeout has not been defined")}function defaultClearTimeout(){throw new Error("clearTimeout has not been defined")}function runTimeout(e){if(cachedSetTimeout===setTimeout)return setTimeout(e,0);if((cachedSetTimeout===defaultSetTimout||!cachedSetTimeout)&&setTimeout)return cachedSetTimeout=setTimeout,setTimeout(e,0);try{return cachedSetTimeout(e,0)}catch(t){try{return cachedSetTimeout.call(null,e,0)}catch(t){return cachedSetTimeout.call(this,e,0)}}}function runClearTimeout(e){if(cachedClearTimeout===clearTimeout)return clearTimeout(e);if((cachedClearTimeout===defaultClearTimeout||!cachedClearTimeout)&&clearTimeout)return cachedClearTimeout=clearTimeout,clearTimeout(e);try{return cachedClearTimeout(e)}catch(t){try{return cachedClearTimeout.call(null,e)}catch(t){return cachedClearTimeout.call(this,e)}}}!function(){try{cachedSetTimeout="function"==typeof setTimeout?setTimeout:defaultSetTimout}catch(e){cachedSetTimeout=defaultSetTimout}try{cachedClearTimeout="function"==typeof clearTimeout?clearTimeout:defaultClearTimeout}catch(e){cachedClearTimeout=defaultClearTimeout}}();var currentQueue,queue=[],draining=!1,queueIndex=-1;function cleanUpNextTick(){draining&&currentQueue&&(draining=!1,currentQueue.length?queue=currentQueue.concat(queue):queueIndex=-1,queue.length&&drainQueue())}function drainQueue(){if(!draining){var e=runTimeout(cleanUpNextTick);draining=!0;for(var t=queue.length;t;){for(currentQueue=queue,queue=[];++queueIndex<t;)currentQueue&&currentQueue[queueIndex].run();queueIndex=-1,t=queue.length}currentQueue=null,draining=!1,runClearTimeout(e)}}function Item(e,t){this.fun=e,this.array=t}function noop(){}process.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];queue.push(new Item(e,t)),1!==queue.length||draining||runTimeout(drainQueue)},Item.prototype.run=function(){this.fun.apply(null,this.array)},process.title="browser",process.browser=!0,process.env={},process.argv=[],process.version="",process.versions={},process.on=noop,process.addListener=noop,process.once=noop,process.off=noop,process.removeListener=noop,process.removeAllListeners=noop,process.emit=noop,process.prependListener=noop,process.prependOnceListener=noop,process.listeners=function(e){return[]},process.binding=function(e){throw new Error("process.binding is not supported")},process.cwd=function(){return"/"},process.chdir=function(e){throw new Error("process.chdir is not supported")},process.umask=function(){return 0};
},{}],53:[function(_dereq_,module,exports){
var buffer=_dereq_("buffer"),Buffer=buffer.Buffer;function copyProps(f,e){for(var r in f)e[r]=f[r]}function SafeBuffer(f,e,r){return Buffer(f,e,r)}Buffer.from&&Buffer.alloc&&Buffer.allocUnsafe&&Buffer.allocUnsafeSlow?module.exports=buffer:(copyProps(buffer,exports),exports.Buffer=SafeBuffer),SafeBuffer.prototype=Object.create(Buffer.prototype),copyProps(Buffer,SafeBuffer),SafeBuffer.from=function(f,e,r){if("number"==typeof f)throw new TypeError("Argument must not be a number");return Buffer(f,e,r)},SafeBuffer.alloc=function(f,e,r){if("number"!=typeof f)throw new TypeError("Argument must be a number");var u=Buffer(f);return void 0!==e?"string"==typeof r?u.fill(e,r):u.fill(e):u.fill(0),u},SafeBuffer.allocUnsafe=function(f){if("number"!=typeof f)throw new TypeError("Argument must be a number");return Buffer(f)},SafeBuffer.allocUnsafeSlow=function(f){if("number"!=typeof f)throw new TypeError("Argument must be a number");return buffer.SlowBuffer(f)};
},{"buffer":3}],54:[function(_dereq_,module,exports){
module.exports=Stream;var EE=_dereq_("events").EventEmitter,inherits=_dereq_("inherits");function Stream(){EE.call(this)}inherits(Stream,EE),Stream.Readable=_dereq_("readable-stream/lib/_stream_readable.js"),Stream.Writable=_dereq_("readable-stream/lib/_stream_writable.js"),Stream.Duplex=_dereq_("readable-stream/lib/_stream_duplex.js"),Stream.Transform=_dereq_("readable-stream/lib/_stream_transform.js"),Stream.PassThrough=_dereq_("readable-stream/lib/_stream_passthrough.js"),Stream.finished=_dereq_("readable-stream/lib/internal/streams/end-of-stream.js"),Stream.pipeline=_dereq_("readable-stream/lib/internal/streams/pipeline.js"),Stream.Stream=Stream,Stream.prototype.pipe=function(e,r){var t=this;function a(r){e.writable&&!1===e.write(r)&&t.pause&&t.pause()}function i(){t.readable&&t.resume&&t.resume()}t.on("data",a),e.on("drain",i),e._isStdio||r&&!1===r.end||(t.on("end",s),t.on("close",o));var n=!1;function s(){n||(n=!0,e.end())}function o(){n||(n=!0,"function"==typeof e.destroy&&e.destroy())}function m(e){if(l(),0===EE.listenerCount(this,"error"))throw e}function l(){t.removeListener("data",a),e.removeListener("drain",i),t.removeListener("end",s),t.removeListener("close",o),t.removeListener("error",m),e.removeListener("error",m),t.removeListener("end",l),t.removeListener("close",l),e.removeListener("close",l)}return t.on("error",m),e.on("error",m),t.on("end",l),t.on("close",l),e.on("close",l),e.emit("pipe",t),e};
},{"events":18,"inherits":20,"readable-stream/lib/_stream_duplex.js":56,"readable-stream/lib/_stream_passthrough.js":57,"readable-stream/lib/_stream_readable.js":58,"readable-stream/lib/_stream_transform.js":59,"readable-stream/lib/_stream_writable.js":60,"readable-stream/lib/internal/streams/end-of-stream.js":64,"readable-stream/lib/internal/streams/pipeline.js":66}],55:[function(_dereq_,module,exports){
"use strict";function _inheritsLoose(e,r){e.prototype=Object.create(r.prototype),e.prototype.constructor=e,e.__proto__=r}var codes={};function createErrorType(e,r,t){t||(t=Error);var n=function(e){function t(t,n,o){return e.call(this,function(e,t,n){return"string"==typeof r?r:r(e,t,n)}(t,n,o))||this}return _inheritsLoose(t,e),t}(t);n.prototype.name=t.name,n.prototype.code=e,codes[e]=n}function oneOf(e,r){if(Array.isArray(e)){var t=e.length;return e=e.map(function(e){return String(e)}),t>2?"one of ".concat(r," ").concat(e.slice(0,t-1).join(", "),", or ")+e[t-1]:2===t?"one of ".concat(r," ").concat(e[0]," or ").concat(e[1]):"of ".concat(r," ").concat(e[0])}return"of ".concat(r," ").concat(String(e))}function startsWith(e,r,t){return e.substr(!t||t<0?0:+t,r.length)===r}function endsWith(e,r,t){return(void 0===t||t>e.length)&&(t=e.length),e.substring(t-r.length,t)===r}function includes(e,r,t){return"number"!=typeof t&&(t=0),!(t+r.length>e.length)&&-1!==e.indexOf(r,t)}createErrorType("ERR_INVALID_OPT_VALUE",function(e,r){return'The value "'+r+'" is invalid for option "'+e+'"'},TypeError),createErrorType("ERR_INVALID_ARG_TYPE",function(e,r,t){var n,o;if("string"==typeof r&&startsWith(r,"not ")?(n="must not be",r=r.replace(/^not /,"")):n="must be",endsWith(e," argument"))o="The ".concat(e," ").concat(n," ").concat(oneOf(r,"type"));else{var c=includes(e,".")?"property":"argument";o='The "'.concat(e,'" ').concat(c," ").concat(n," ").concat(oneOf(r,"type"))}return o+=". Received type ".concat(typeof t)},TypeError),createErrorType("ERR_STREAM_PUSH_AFTER_EOF","stream.push() after EOF"),createErrorType("ERR_METHOD_NOT_IMPLEMENTED",function(e){return"The "+e+" method is not implemented"}),createErrorType("ERR_STREAM_PREMATURE_CLOSE","Premature close"),createErrorType("ERR_STREAM_DESTROYED",function(e){return"Cannot call "+e+" after a stream was destroyed"}),createErrorType("ERR_MULTIPLE_CALLBACK","Callback called multiple times"),createErrorType("ERR_STREAM_CANNOT_PIPE","Cannot pipe, not readable"),createErrorType("ERR_STREAM_WRITE_AFTER_END","write after end"),createErrorType("ERR_STREAM_NULL_VALUES","May not write null values to stream",TypeError),createErrorType("ERR_UNKNOWN_ENCODING",function(e){return"Unknown encoding: "+e},TypeError),createErrorType("ERR_STREAM_UNSHIFT_AFTER_END_EVENT","stream.unshift() after end event"),module.exports.codes=codes;
},{}],56:[function(_dereq_,module,exports){
(function (process){(function (){
"use strict";var objectKeys=Object.keys||function(e){var t=[];for(var r in e)t.push(r);return t};module.exports=Duplex;var Readable=_dereq_("./_stream_readable"),Writable=_dereq_("./_stream_writable");_dereq_("inherits")(Duplex,Readable);for(var keys=objectKeys(Writable.prototype),v=0;v<keys.length;v++){var method=keys[v];Duplex.prototype[method]||(Duplex.prototype[method]=Writable.prototype[method])}function Duplex(e){if(!(this instanceof Duplex))return new Duplex(e);Readable.call(this,e),Writable.call(this,e),this.allowHalfOpen=!0,e&&(!1===e.readable&&(this.readable=!1),!1===e.writable&&(this.writable=!1),!1===e.allowHalfOpen&&(this.allowHalfOpen=!1,this.once("end",onend)))}function onend(){this._writableState.ended||process.nextTick(onEndNT,this)}function onEndNT(e){e.end()}Object.defineProperty(Duplex.prototype,"writableHighWaterMark",{enumerable:!1,get:function(){return this._writableState.highWaterMark}}),Object.defineProperty(Duplex.prototype,"writableBuffer",{enumerable:!1,get:function(){return this._writableState&&this._writableState.getBuffer()}}),Object.defineProperty(Duplex.prototype,"writableLength",{enumerable:!1,get:function(){return this._writableState.length}}),Object.defineProperty(Duplex.prototype,"destroyed",{enumerable:!1,get:function(){return void 0!==this._readableState&&void 0!==this._writableState&&(this._readableState.destroyed&&this._writableState.destroyed)},set:function(e){void 0!==this._readableState&&void 0!==this._writableState&&(this._readableState.destroyed=e,this._writableState.destroyed=e)}});
}).call(this)}).call(this,_dereq_('_process'))
},{"./_stream_readable":58,"./_stream_writable":60,"_process":52,"inherits":20}],57:[function(_dereq_,module,exports){
"use strict";module.exports=PassThrough;var Transform=_dereq_("./_stream_transform");function PassThrough(r){if(!(this instanceof PassThrough))return new PassThrough(r);Transform.call(this,r)}_dereq_("inherits")(PassThrough,Transform),PassThrough.prototype._transform=function(r,s,o){o(null,r)};
},{"./_stream_transform":59,"inherits":20}],58:[function(_dereq_,module,exports){
(function (process,global){(function (){
"use strict";var Duplex;module.exports=Readable,Readable.ReadableState=ReadableState;var EE=_dereq_("events").EventEmitter,EElistenerCount=function(e,t){return e.listeners(t).length},Stream=_dereq_("./internal/streams/stream"),Buffer=_dereq_("buffer").Buffer,OurUint8Array=global.Uint8Array||function(){};function _uint8ArrayToBuffer(e){return Buffer.from(e)}function _isUint8Array(e){return Buffer.isBuffer(e)||e instanceof OurUint8Array}var debug,debugUtil=_dereq_("util");debug=debugUtil&&debugUtil.debuglog?debugUtil.debuglog("stream"):function(){};var StringDecoder,createReadableStreamAsyncIterator,from,BufferList=_dereq_("./internal/streams/buffer_list"),destroyImpl=_dereq_("./internal/streams/destroy"),_require=_dereq_("./internal/streams/state"),getHighWaterMark=_require.getHighWaterMark,_require$codes=_dereq_("../errors").codes,ERR_INVALID_ARG_TYPE=_require$codes.ERR_INVALID_ARG_TYPE,ERR_STREAM_PUSH_AFTER_EOF=_require$codes.ERR_STREAM_PUSH_AFTER_EOF,ERR_METHOD_NOT_IMPLEMENTED=_require$codes.ERR_METHOD_NOT_IMPLEMENTED,ERR_STREAM_UNSHIFT_AFTER_END_EVENT=_require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;_dereq_("inherits")(Readable,Stream);var errorOrDestroy=destroyImpl.errorOrDestroy,kProxyEvents=["error","close","destroy","pause","resume"];function prependListener(e,t,r){if("function"==typeof e.prependListener)return e.prependListener(t,r);e._events&&e._events[t]?Array.isArray(e._events[t])?e._events[t].unshift(r):e._events[t]=[r,e._events[t]]:e.on(t,r)}function ReadableState(e,t,r){Duplex=Duplex||_dereq_("./_stream_duplex"),e=e||{},"boolean"!=typeof r&&(r=t instanceof Duplex),this.objectMode=!!e.objectMode,r&&(this.objectMode=this.objectMode||!!e.readableObjectMode),this.highWaterMark=getHighWaterMark(this,e,"readableHighWaterMark",r),this.buffer=new BufferList,this.length=0,this.pipes=null,this.pipesCount=0,this.flowing=null,this.ended=!1,this.endEmitted=!1,this.reading=!1,this.sync=!0,this.needReadable=!1,this.emittedReadable=!1,this.readableListening=!1,this.resumeScheduled=!1,this.paused=!0,this.emitClose=!1!==e.emitClose,this.autoDestroy=!!e.autoDestroy,this.destroyed=!1,this.defaultEncoding=e.defaultEncoding||"utf8",this.awaitDrain=0,this.readingMore=!1,this.decoder=null,this.encoding=null,e.encoding&&(StringDecoder||(StringDecoder=_dereq_("string_decoder/").StringDecoder),this.decoder=new StringDecoder(e.encoding),this.encoding=e.encoding)}function Readable(e){if(Duplex=Duplex||_dereq_("./_stream_duplex"),!(this instanceof Readable))return new Readable(e);var t=this instanceof Duplex;this._readableState=new ReadableState(e,this,t),this.readable=!0,e&&("function"==typeof e.read&&(this._read=e.read),"function"==typeof e.destroy&&(this._destroy=e.destroy)),Stream.call(this)}function readableAddChunk(e,t,r,a,n){debug("readableAddChunk",t);var i,d=e._readableState;if(null===t)d.reading=!1,onEofChunk(e,d);else if(n||(i=chunkInvalid(d,t)),i)errorOrDestroy(e,i);else if(d.objectMode||t&&t.length>0)if("string"==typeof t||d.objectMode||Object.getPrototypeOf(t)===Buffer.prototype||(t=_uint8ArrayToBuffer(t)),a)d.endEmitted?errorOrDestroy(e,new ERR_STREAM_UNSHIFT_AFTER_END_EVENT):addChunk(e,d,t,!0);else if(d.ended)errorOrDestroy(e,new ERR_STREAM_PUSH_AFTER_EOF);else{if(d.destroyed)return!1;d.reading=!1,d.decoder&&!r?(t=d.decoder.write(t),d.objectMode||0!==t.length?addChunk(e,d,t,!1):maybeReadMore(e,d)):addChunk(e,d,t,!1)}else a||(d.reading=!1,maybeReadMore(e,d));return!d.ended&&(d.length<d.highWaterMark||0===d.length)}function addChunk(e,t,r,a){t.flowing&&0===t.length&&!t.sync?(t.awaitDrain=0,e.emit("data",r)):(t.length+=t.objectMode?1:r.length,a?t.buffer.unshift(r):t.buffer.push(r),t.needReadable&&emitReadable(e)),maybeReadMore(e,t)}function chunkInvalid(e,t){var r;return _isUint8Array(t)||"string"==typeof t||void 0===t||e.objectMode||(r=new ERR_INVALID_ARG_TYPE("chunk",["string","Buffer","Uint8Array"],t)),r}Object.defineProperty(Readable.prototype,"destroyed",{enumerable:!1,get:function(){return void 0!==this._readableState&&this._readableState.destroyed},set:function(e){this._readableState&&(this._readableState.destroyed=e)}}),Readable.prototype.destroy=destroyImpl.destroy,Readable.prototype._undestroy=destroyImpl.undestroy,Readable.prototype._destroy=function(e,t){t(e)},Readable.prototype.push=function(e,t){var r,a=this._readableState;return a.objectMode?r=!0:"string"==typeof e&&((t=t||a.defaultEncoding)!==a.encoding&&(e=Buffer.from(e,t),t=""),r=!0),readableAddChunk(this,e,t,!1,r)},Readable.prototype.unshift=function(e){return readableAddChunk(this,e,null,!0,!1)},Readable.prototype.isPaused=function(){return!1===this._readableState.flowing},Readable.prototype.setEncoding=function(e){StringDecoder||(StringDecoder=_dereq_("string_decoder/").StringDecoder);var t=new StringDecoder(e);this._readableState.decoder=t,this._readableState.encoding=this._readableState.decoder.encoding;for(var r=this._readableState.buffer.head,a="";null!==r;)a+=t.write(r.data),r=r.next;return this._readableState.buffer.clear(),""!==a&&this._readableState.buffer.push(a),this._readableState.length=a.length,this};var MAX_HWM=1073741824;function computeNewHighWaterMark(e){return e>=MAX_HWM?e=MAX_HWM:(e--,e|=e>>>1,e|=e>>>2,e|=e>>>4,e|=e>>>8,e|=e>>>16,e++),e}function howMuchToRead(e,t){return e<=0||0===t.length&&t.ended?0:t.objectMode?1:e!=e?t.flowing&&t.length?t.buffer.head.data.length:t.length:(e>t.highWaterMark&&(t.highWaterMark=computeNewHighWaterMark(e)),e<=t.length?e:t.ended?t.length:(t.needReadable=!0,0))}function onEofChunk(e,t){if(debug("onEofChunk"),!t.ended){if(t.decoder){var r=t.decoder.end();r&&r.length&&(t.buffer.push(r),t.length+=t.objectMode?1:r.length)}t.ended=!0,t.sync?emitReadable(e):(t.needReadable=!1,t.emittedReadable||(t.emittedReadable=!0,emitReadable_(e)))}}function emitReadable(e){var t=e._readableState;debug("emitReadable",t.needReadable,t.emittedReadable),t.needReadable=!1,t.emittedReadable||(debug("emitReadable",t.flowing),t.emittedReadable=!0,process.nextTick(emitReadable_,e))}function emitReadable_(e){var t=e._readableState;debug("emitReadable_",t.destroyed,t.length,t.ended),t.destroyed||!t.length&&!t.ended||(e.emit("readable"),t.emittedReadable=!1),t.needReadable=!t.flowing&&!t.ended&&t.length<=t.highWaterMark,flow(e)}function maybeReadMore(e,t){t.readingMore||(t.readingMore=!0,process.nextTick(maybeReadMore_,e,t))}function maybeReadMore_(e,t){for(;!t.reading&&!t.ended&&(t.length<t.highWaterMark||t.flowing&&0===t.length);){var r=t.length;if(debug("maybeReadMore read 0"),e.read(0),r===t.length)break}t.readingMore=!1}function pipeOnDrain(e){return function(){var t=e._readableState;debug("pipeOnDrain",t.awaitDrain),t.awaitDrain&&t.awaitDrain--,0===t.awaitDrain&&EElistenerCount(e,"data")&&(t.flowing=!0,flow(e))}}function updateReadableListening(e){var t=e._readableState;t.readableListening=e.listenerCount("readable")>0,t.resumeScheduled&&!t.paused?t.flowing=!0:e.listenerCount("data")>0&&e.resume()}function nReadingNextTick(e){debug("readable nexttick read 0"),e.read(0)}function resume(e,t){t.resumeScheduled||(t.resumeScheduled=!0,process.nextTick(resume_,e,t))}function resume_(e,t){debug("resume",t.reading),t.reading||e.read(0),t.resumeScheduled=!1,e.emit("resume"),flow(e),t.flowing&&!t.reading&&e.read(0)}function flow(e){var t=e._readableState;for(debug("flow",t.flowing);t.flowing&&null!==e.read(););}function fromList(e,t){return 0===t.length?null:(t.objectMode?r=t.buffer.shift():!e||e>=t.length?(r=t.decoder?t.buffer.join(""):1===t.buffer.length?t.buffer.first():t.buffer.concat(t.length),t.buffer.clear()):r=t.buffer.consume(e,t.decoder),r);var r}function endReadable(e){var t=e._readableState;debug("endReadable",t.endEmitted),t.endEmitted||(t.ended=!0,process.nextTick(endReadableNT,t,e))}function endReadableNT(e,t){if(debug("endReadableNT",e.endEmitted,e.length),!e.endEmitted&&0===e.length&&(e.endEmitted=!0,t.readable=!1,t.emit("end"),e.autoDestroy)){var r=t._writableState;(!r||r.autoDestroy&&r.finished)&&t.destroy()}}function indexOf(e,t){for(var r=0,a=e.length;r<a;r++)if(e[r]===t)return r;return-1}Readable.prototype.read=function(e){debug("read",e),e=parseInt(e,10);var t=this._readableState,r=e;if(0!==e&&(t.emittedReadable=!1),0===e&&t.needReadable&&((0!==t.highWaterMark?t.length>=t.highWaterMark:t.length>0)||t.ended))return debug("read: emitReadable",t.length,t.ended),0===t.length&&t.ended?endReadable(this):emitReadable(this),null;if(0===(e=howMuchToRead(e,t))&&t.ended)return 0===t.length&&endReadable(this),null;var a,n=t.needReadable;return debug("need readable",n),(0===t.length||t.length-e<t.highWaterMark)&&debug("length less than watermark",n=!0),t.ended||t.reading?debug("reading or ended",n=!1):n&&(debug("do read"),t.reading=!0,t.sync=!0,0===t.length&&(t.needReadable=!0),this._read(t.highWaterMark),t.sync=!1,t.reading||(e=howMuchToRead(r,t))),null===(a=e>0?fromList(e,t):null)?(t.needReadable=t.length<=t.highWaterMark,e=0):(t.length-=e,t.awaitDrain=0),0===t.length&&(t.ended||(t.needReadable=!0),r!==e&&t.ended&&endReadable(this)),null!==a&&this.emit("data",a),a},Readable.prototype._read=function(e){errorOrDestroy(this,new ERR_METHOD_NOT_IMPLEMENTED("_read()"))},Readable.prototype.pipe=function(e,t){var r=this,a=this._readableState;switch(a.pipesCount){case 0:a.pipes=e;break;case 1:a.pipes=[a.pipes,e];break;default:a.pipes.push(e)}a.pipesCount+=1,debug("pipe count=%d opts=%j",a.pipesCount,t);var n=(!t||!1!==t.end)&&e!==process.stdout&&e!==process.stderr?d:f;function i(t,n){debug("onunpipe"),t===r&&n&&!1===n.hasUnpiped&&(n.hasUnpiped=!0,debug("cleanup"),e.removeListener("close",b),e.removeListener("finish",p),e.removeListener("drain",o),e.removeListener("error",u),e.removeListener("unpipe",i),r.removeListener("end",d),r.removeListener("end",f),r.removeListener("data",l),s=!0,!a.awaitDrain||e._writableState&&!e._writableState.needDrain||o())}function d(){debug("onend"),e.end()}a.endEmitted?process.nextTick(n):r.once("end",n),e.on("unpipe",i);var o=pipeOnDrain(r);e.on("drain",o);var s=!1;function l(t){debug("ondata");var n=e.write(t);debug("dest.write",n),!1===n&&((1===a.pipesCount&&a.pipes===e||a.pipesCount>1&&-1!==indexOf(a.pipes,e))&&!s&&(debug("false write response, pause",a.awaitDrain),a.awaitDrain++),r.pause())}function u(t){debug("onerror",t),f(),e.removeListener("error",u),0===EElistenerCount(e,"error")&&errorOrDestroy(e,t)}function b(){e.removeListener("finish",p),f()}function p(){debug("onfinish"),e.removeListener("close",b),f()}function f(){debug("unpipe"),r.unpipe(e)}return r.on("data",l),prependListener(e,"error",u),e.once("close",b),e.once("finish",p),e.emit("pipe",r),a.flowing||(debug("pipe resume"),r.resume()),e},Readable.prototype.unpipe=function(e){var t=this._readableState,r={hasUnpiped:!1};if(0===t.pipesCount)return this;if(1===t.pipesCount)return e&&e!==t.pipes?this:(e||(e=t.pipes),t.pipes=null,t.pipesCount=0,t.flowing=!1,e&&e.emit("unpipe",this,r),this);if(!e){var a=t.pipes,n=t.pipesCount;t.pipes=null,t.pipesCount=0,t.flowing=!1;for(var i=0;i<n;i++)a[i].emit("unpipe",this,{hasUnpiped:!1});return this}var d=indexOf(t.pipes,e);return-1===d?this:(t.pipes.splice(d,1),t.pipesCount-=1,1===t.pipesCount&&(t.pipes=t.pipes[0]),e.emit("unpipe",this,r),this)},Readable.prototype.on=function(e,t){var r=Stream.prototype.on.call(this,e,t),a=this._readableState;return"data"===e?(a.readableListening=this.listenerCount("readable")>0,!1!==a.flowing&&this.resume()):"readable"===e&&(a.endEmitted||a.readableListening||(a.readableListening=a.needReadable=!0,a.flowing=!1,a.emittedReadable=!1,debug("on readable",a.length,a.reading),a.length?emitReadable(this):a.reading||process.nextTick(nReadingNextTick,this))),r},Readable.prototype.addListener=Readable.prototype.on,Readable.prototype.removeListener=function(e,t){var r=Stream.prototype.removeListener.call(this,e,t);return"readable"===e&&process.nextTick(updateReadableListening,this),r},Readable.prototype.removeAllListeners=function(e){var t=Stream.prototype.removeAllListeners.apply(this,arguments);return"readable"!==e&&void 0!==e||process.nextTick(updateReadableListening,this),t},Readable.prototype.resume=function(){var e=this._readableState;return e.flowing||(debug("resume"),e.flowing=!e.readableListening,resume(this,e)),e.paused=!1,this},Readable.prototype.pause=function(){return debug("call pause flowing=%j",this._readableState.flowing),!1!==this._readableState.flowing&&(debug("pause"),this._readableState.flowing=!1,this.emit("pause")),this._readableState.paused=!0,this},Readable.prototype.wrap=function(e){var t=this,r=this._readableState,a=!1;for(var n in e.on("end",function(){if(debug("wrapped end"),r.decoder&&!r.ended){var e=r.decoder.end();e&&e.length&&t.push(e)}t.push(null)}),e.on("data",function(n){(debug("wrapped data"),r.decoder&&(n=r.decoder.write(n)),r.objectMode&&null==n)||(r.objectMode||n&&n.length)&&(t.push(n)||(a=!0,e.pause()))}),e)void 0===this[n]&&"function"==typeof e[n]&&(this[n]=function(t){return function(){return e[t].apply(e,arguments)}}(n));for(var i=0;i<kProxyEvents.length;i++)e.on(kProxyEvents[i],this.emit.bind(this,kProxyEvents[i]));return this._read=function(t){debug("wrapped _read",t),a&&(a=!1,e.resume())},this},"function"==typeof Symbol&&(Readable.prototype[Symbol.asyncIterator]=function(){return void 0===createReadableStreamAsyncIterator&&(createReadableStreamAsyncIterator=_dereq_("./internal/streams/async_iterator")),createReadableStreamAsyncIterator(this)}),Object.defineProperty(Readable.prototype,"readableHighWaterMark",{enumerable:!1,get:function(){return this._readableState.highWaterMark}}),Object.defineProperty(Readable.prototype,"readableBuffer",{enumerable:!1,get:function(){return this._readableState&&this._readableState.buffer}}),Object.defineProperty(Readable.prototype,"readableFlowing",{enumerable:!1,get:function(){return this._readableState.flowing},set:function(e){this._readableState&&(this._readableState.flowing=e)}}),Readable._fromList=fromList,Object.defineProperty(Readable.prototype,"readableLength",{enumerable:!1,get:function(){return this._readableState.length}}),"function"==typeof Symbol&&(Readable.from=function(e,t){return void 0===from&&(from=_dereq_("./internal/streams/from")),from(Readable,e,t)});
}).call(this)}).call(this,_dereq_('_process'),typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../errors":55,"./_stream_duplex":56,"./internal/streams/async_iterator":61,"./internal/streams/buffer_list":62,"./internal/streams/destroy":63,"./internal/streams/from":65,"./internal/streams/state":67,"./internal/streams/stream":68,"_process":52,"buffer":3,"events":18,"inherits":20,"string_decoder/":69,"util":2}],59:[function(_dereq_,module,exports){
"use strict";module.exports=Transform;var _require$codes=_dereq_("../errors").codes,ERR_METHOD_NOT_IMPLEMENTED=_require$codes.ERR_METHOD_NOT_IMPLEMENTED,ERR_MULTIPLE_CALLBACK=_require$codes.ERR_MULTIPLE_CALLBACK,ERR_TRANSFORM_ALREADY_TRANSFORMING=_require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING,ERR_TRANSFORM_WITH_LENGTH_0=_require$codes.ERR_TRANSFORM_WITH_LENGTH_0,Duplex=_dereq_("./_stream_duplex");function afterTransform(r,e){var t=this._transformState;t.transforming=!1;var n=t.writecb;if(null===n)return this.emit("error",new ERR_MULTIPLE_CALLBACK);t.writechunk=null,t.writecb=null,null!=e&&this.push(e),n(r);var i=this._readableState;i.reading=!1,(i.needReadable||i.length<i.highWaterMark)&&this._read(i.highWaterMark)}function Transform(r){if(!(this instanceof Transform))return new Transform(r);Duplex.call(this,r),this._transformState={afterTransform:afterTransform.bind(this),needTransform:!1,transforming:!1,writecb:null,writechunk:null,writeencoding:null},this._readableState.needReadable=!0,this._readableState.sync=!1,r&&("function"==typeof r.transform&&(this._transform=r.transform),"function"==typeof r.flush&&(this._flush=r.flush)),this.on("prefinish",prefinish)}function prefinish(){var r=this;"function"!=typeof this._flush||this._readableState.destroyed?done(this,null,null):this._flush(function(e,t){done(r,e,t)})}function done(r,e,t){if(e)return r.emit("error",e);if(null!=t&&r.push(t),r._writableState.length)throw new ERR_TRANSFORM_WITH_LENGTH_0;if(r._transformState.transforming)throw new ERR_TRANSFORM_ALREADY_TRANSFORMING;return r.push(null)}_dereq_("inherits")(Transform,Duplex),Transform.prototype.push=function(r,e){return this._transformState.needTransform=!1,Duplex.prototype.push.call(this,r,e)},Transform.prototype._transform=function(r,e,t){t(new ERR_METHOD_NOT_IMPLEMENTED("_transform()"))},Transform.prototype._write=function(r,e,t){var n=this._transformState;if(n.writecb=t,n.writechunk=r,n.writeencoding=e,!n.transforming){var i=this._readableState;(n.needTransform||i.needReadable||i.length<i.highWaterMark)&&this._read(i.highWaterMark)}},Transform.prototype._read=function(r){var e=this._transformState;null===e.writechunk||e.transforming?e.needTransform=!0:(e.transforming=!0,this._transform(e.writechunk,e.writeencoding,e.afterTransform))},Transform.prototype._destroy=function(r,e){Duplex.prototype._destroy.call(this,r,function(r){e(r)})};
},{"../errors":55,"./_stream_duplex":56,"inherits":20}],60:[function(_dereq_,module,exports){
(function (process,global){(function (){
"use strict";function WriteReq(e,t,r){this.chunk=e,this.encoding=t,this.callback=r,this.next=null}function CorkedRequest(e){var t=this;this.next=null,this.entry=null,this.finish=function(){onCorkedFinish(t,e)}}var Duplex;module.exports=Writable,Writable.WritableState=WritableState;var internalUtil={deprecate:_dereq_("util-deprecate")},Stream=_dereq_("./internal/streams/stream"),Buffer=_dereq_("buffer").Buffer,OurUint8Array=global.Uint8Array||function(){};function _uint8ArrayToBuffer(e){return Buffer.from(e)}function _isUint8Array(e){return Buffer.isBuffer(e)||e instanceof OurUint8Array}var realHasInstance,destroyImpl=_dereq_("./internal/streams/destroy"),_require=_dereq_("./internal/streams/state"),getHighWaterMark=_require.getHighWaterMark,_require$codes=_dereq_("../errors").codes,ERR_INVALID_ARG_TYPE=_require$codes.ERR_INVALID_ARG_TYPE,ERR_METHOD_NOT_IMPLEMENTED=_require$codes.ERR_METHOD_NOT_IMPLEMENTED,ERR_MULTIPLE_CALLBACK=_require$codes.ERR_MULTIPLE_CALLBACK,ERR_STREAM_CANNOT_PIPE=_require$codes.ERR_STREAM_CANNOT_PIPE,ERR_STREAM_DESTROYED=_require$codes.ERR_STREAM_DESTROYED,ERR_STREAM_NULL_VALUES=_require$codes.ERR_STREAM_NULL_VALUES,ERR_STREAM_WRITE_AFTER_END=_require$codes.ERR_STREAM_WRITE_AFTER_END,ERR_UNKNOWN_ENCODING=_require$codes.ERR_UNKNOWN_ENCODING,errorOrDestroy=destroyImpl.errorOrDestroy;function nop(){}function WritableState(e,t,r){Duplex=Duplex||_dereq_("./_stream_duplex"),e=e||{},"boolean"!=typeof r&&(r=t instanceof Duplex),this.objectMode=!!e.objectMode,r&&(this.objectMode=this.objectMode||!!e.writableObjectMode),this.highWaterMark=getHighWaterMark(this,e,"writableHighWaterMark",r),this.finalCalled=!1,this.needDrain=!1,this.ending=!1,this.ended=!1,this.finished=!1,this.destroyed=!1;var i=!1===e.decodeStrings;this.decodeStrings=!i,this.defaultEncoding=e.defaultEncoding||"utf8",this.length=0,this.writing=!1,this.corked=0,this.sync=!0,this.bufferProcessing=!1,this.onwrite=function(e){onwrite(t,e)},this.writecb=null,this.writelen=0,this.bufferedRequest=null,this.lastBufferedRequest=null,this.pendingcb=0,this.prefinished=!1,this.errorEmitted=!1,this.emitClose=!1!==e.emitClose,this.autoDestroy=!!e.autoDestroy,this.bufferedRequestCount=0,this.corkedRequestsFree=new CorkedRequest(this)}function Writable(e){var t=this instanceof(Duplex=Duplex||_dereq_("./_stream_duplex"));if(!t&&!realHasInstance.call(Writable,this))return new Writable(e);this._writableState=new WritableState(e,this,t),this.writable=!0,e&&("function"==typeof e.write&&(this._write=e.write),"function"==typeof e.writev&&(this._writev=e.writev),"function"==typeof e.destroy&&(this._destroy=e.destroy),"function"==typeof e.final&&(this._final=e.final)),Stream.call(this)}function writeAfterEnd(e,t){var r=new ERR_STREAM_WRITE_AFTER_END;errorOrDestroy(e,r),process.nextTick(t,r)}function validChunk(e,t,r,i){var n;return null===r?n=new ERR_STREAM_NULL_VALUES:"string"==typeof r||t.objectMode||(n=new ERR_INVALID_ARG_TYPE("chunk",["string","Buffer"],r)),!n||(errorOrDestroy(e,n),process.nextTick(i,n),!1)}function decodeChunk(e,t,r){return e.objectMode||!1===e.decodeStrings||"string"!=typeof t||(t=Buffer.from(t,r)),t}function writeOrBuffer(e,t,r,i,n,o){if(!r){var s=decodeChunk(t,i,n);i!==s&&(r=!0,n="buffer",i=s)}var a=t.objectMode?1:i.length;t.length+=a;var u=t.length<t.highWaterMark;if(u||(t.needDrain=!0),t.writing||t.corked){var f=t.lastBufferedRequest;t.lastBufferedRequest={chunk:i,encoding:n,isBuf:r,callback:o,next:null},f?f.next=t.lastBufferedRequest:t.bufferedRequest=t.lastBufferedRequest,t.bufferedRequestCount+=1}else doWrite(e,t,!1,a,i,n,o);return u}function doWrite(e,t,r,i,n,o,s){t.writelen=i,t.writecb=s,t.writing=!0,t.sync=!0,t.destroyed?t.onwrite(new ERR_STREAM_DESTROYED("write")):r?e._writev(n,t.onwrite):e._write(n,o,t.onwrite),t.sync=!1}function onwriteError(e,t,r,i,n){--t.pendingcb,r?(process.nextTick(n,i),process.nextTick(finishMaybe,e,t),e._writableState.errorEmitted=!0,errorOrDestroy(e,i)):(n(i),e._writableState.errorEmitted=!0,errorOrDestroy(e,i),finishMaybe(e,t))}function onwriteStateUpdate(e){e.writing=!1,e.writecb=null,e.length-=e.writelen,e.writelen=0}function onwrite(e,t){var r=e._writableState,i=r.sync,n=r.writecb;if("function"!=typeof n)throw new ERR_MULTIPLE_CALLBACK;if(onwriteStateUpdate(r),t)onwriteError(e,r,i,t,n);else{var o=needFinish(r)||e.destroyed;o||r.corked||r.bufferProcessing||!r.bufferedRequest||clearBuffer(e,r),i?process.nextTick(afterWrite,e,r,o,n):afterWrite(e,r,o,n)}}function afterWrite(e,t,r,i){r||onwriteDrain(e,t),t.pendingcb--,i(),finishMaybe(e,t)}function onwriteDrain(e,t){0===t.length&&t.needDrain&&(t.needDrain=!1,e.emit("drain"))}function clearBuffer(e,t){t.bufferProcessing=!0;var r=t.bufferedRequest;if(e._writev&&r&&r.next){var i=t.bufferedRequestCount,n=new Array(i),o=t.corkedRequestsFree;o.entry=r;for(var s=0,a=!0;r;)n[s]=r,r.isBuf||(a=!1),r=r.next,s+=1;n.allBuffers=a,doWrite(e,t,!0,t.length,n,"",o.finish),t.pendingcb++,t.lastBufferedRequest=null,o.next?(t.corkedRequestsFree=o.next,o.next=null):t.corkedRequestsFree=new CorkedRequest(t),t.bufferedRequestCount=0}else{for(;r;){var u=r.chunk,f=r.encoding,l=r.callback;if(doWrite(e,t,!1,t.objectMode?1:u.length,u,f,l),r=r.next,t.bufferedRequestCount--,t.writing)break}null===r&&(t.lastBufferedRequest=null)}t.bufferedRequest=r,t.bufferProcessing=!1}function needFinish(e){return e.ending&&0===e.length&&null===e.bufferedRequest&&!e.finished&&!e.writing}function callFinal(e,t){e._final(function(r){t.pendingcb--,r&&errorOrDestroy(e,r),t.prefinished=!0,e.emit("prefinish"),finishMaybe(e,t)})}function prefinish(e,t){t.prefinished||t.finalCalled||("function"!=typeof e._final||t.destroyed?(t.prefinished=!0,e.emit("prefinish")):(t.pendingcb++,t.finalCalled=!0,process.nextTick(callFinal,e,t)))}function finishMaybe(e,t){var r=needFinish(t);if(r&&(prefinish(e,t),0===t.pendingcb&&(t.finished=!0,e.emit("finish"),t.autoDestroy))){var i=e._readableState;(!i||i.autoDestroy&&i.endEmitted)&&e.destroy()}return r}function endWritable(e,t,r){t.ending=!0,finishMaybe(e,t),r&&(t.finished?process.nextTick(r):e.once("finish",r)),t.ended=!0,e.writable=!1}function onCorkedFinish(e,t,r){var i=e.entry;for(e.entry=null;i;){var n=i.callback;t.pendingcb--,n(r),i=i.next}t.corkedRequestsFree.next=e}_dereq_("inherits")(Writable,Stream),WritableState.prototype.getBuffer=function(){for(var e=this.bufferedRequest,t=[];e;)t.push(e),e=e.next;return t},function(){try{Object.defineProperty(WritableState.prototype,"buffer",{get:internalUtil.deprecate(function(){return this.getBuffer()},"_writableState.buffer is deprecated. Use _writableState.getBuffer instead.","DEP0003")})}catch(e){}}(),"function"==typeof Symbol&&Symbol.hasInstance&&"function"==typeof Function.prototype[Symbol.hasInstance]?(realHasInstance=Function.prototype[Symbol.hasInstance],Object.defineProperty(Writable,Symbol.hasInstance,{value:function(e){return!!realHasInstance.call(this,e)||this===Writable&&(e&&e._writableState instanceof WritableState)}})):realHasInstance=function(e){return e instanceof this},Writable.prototype.pipe=function(){errorOrDestroy(this,new ERR_STREAM_CANNOT_PIPE)},Writable.prototype.write=function(e,t,r){var i=this._writableState,n=!1,o=!i.objectMode&&_isUint8Array(e);return o&&!Buffer.isBuffer(e)&&(e=_uint8ArrayToBuffer(e)),"function"==typeof t&&(r=t,t=null),o?t="buffer":t||(t=i.defaultEncoding),"function"!=typeof r&&(r=nop),i.ending?writeAfterEnd(this,r):(o||validChunk(this,i,e,r))&&(i.pendingcb++,n=writeOrBuffer(this,i,o,e,t,r)),n},Writable.prototype.cork=function(){this._writableState.corked++},Writable.prototype.uncork=function(){var e=this._writableState;e.corked&&(e.corked--,e.writing||e.corked||e.bufferProcessing||!e.bufferedRequest||clearBuffer(this,e))},Writable.prototype.setDefaultEncoding=function(e){if("string"==typeof e&&(e=e.toLowerCase()),!(["hex","utf8","utf-8","ascii","binary","base64","ucs2","ucs-2","utf16le","utf-16le","raw"].indexOf((e+"").toLowerCase())>-1))throw new ERR_UNKNOWN_ENCODING(e);return this._writableState.defaultEncoding=e,this},Object.defineProperty(Writable.prototype,"writableBuffer",{enumerable:!1,get:function(){return this._writableState&&this._writableState.getBuffer()}}),Object.defineProperty(Writable.prototype,"writableHighWaterMark",{enumerable:!1,get:function(){return this._writableState.highWaterMark}}),Writable.prototype._write=function(e,t,r){r(new ERR_METHOD_NOT_IMPLEMENTED("_write()"))},Writable.prototype._writev=null,Writable.prototype.end=function(e,t,r){var i=this._writableState;return"function"==typeof e?(r=e,e=null,t=null):"function"==typeof t&&(r=t,t=null),null!=e&&this.write(e,t),i.corked&&(i.corked=1,this.uncork()),i.ending||endWritable(this,i,r),this},Object.defineProperty(Writable.prototype,"writableLength",{enumerable:!1,get:function(){return this._writableState.length}}),Object.defineProperty(Writable.prototype,"destroyed",{enumerable:!1,get:function(){return void 0!==this._writableState&&this._writableState.destroyed},set:function(e){this._writableState&&(this._writableState.destroyed=e)}}),Writable.prototype.destroy=destroyImpl.destroy,Writable.prototype._undestroy=destroyImpl.undestroy,Writable.prototype._destroy=function(e,t){t(e)};
}).call(this)}).call(this,_dereq_('_process'),typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../errors":55,"./_stream_duplex":56,"./internal/streams/destroy":63,"./internal/streams/state":67,"./internal/streams/stream":68,"_process":52,"buffer":3,"inherits":20,"util-deprecate":70}],61:[function(_dereq_,module,exports){
(function (process){(function (){
"use strict";var _Object$setPrototypeO;function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var finished=_dereq_("./end-of-stream"),kLastResolve=Symbol("lastResolve"),kLastReject=Symbol("lastReject"),kError=Symbol("error"),kEnded=Symbol("ended"),kLastPromise=Symbol("lastPromise"),kHandlePromise=Symbol("handlePromise"),kStream=Symbol("stream");function createIterResult(e,t){return{value:e,done:t}}function readAndResolve(e){var t=e[kLastResolve];if(null!==t){var r=e[kStream].read();null!==r&&(e[kLastPromise]=null,e[kLastResolve]=null,e[kLastReject]=null,t(createIterResult(r,!1)))}}function onReadable(e){process.nextTick(readAndResolve,e)}function wrapForNext(e,t){return function(r,o){e.then(function(){t[kEnded]?r(createIterResult(void 0,!0)):t[kHandlePromise](r,o)},o)}}var AsyncIteratorPrototype=Object.getPrototypeOf(function(){}),ReadableStreamAsyncIteratorPrototype=Object.setPrototypeOf((_defineProperty(_Object$setPrototypeO={get stream(){return this[kStream]},next:function(){var e=this,t=this[kError];if(null!==t)return Promise.reject(t);if(this[kEnded])return Promise.resolve(createIterResult(void 0,!0));if(this[kStream].destroyed)return new Promise(function(t,r){process.nextTick(function(){e[kError]?r(e[kError]):t(createIterResult(void 0,!0))})});var r,o=this[kLastPromise];if(o)r=new Promise(wrapForNext(o,this));else{var n=this[kStream].read();if(null!==n)return Promise.resolve(createIterResult(n,!1));r=new Promise(this[kHandlePromise])}return this[kLastPromise]=r,r}},Symbol.asyncIterator,function(){return this}),_defineProperty(_Object$setPrototypeO,"return",function(){var e=this;return new Promise(function(t,r){e[kStream].destroy(null,function(e){e?r(e):t(createIterResult(void 0,!0))})})}),_Object$setPrototypeO),AsyncIteratorPrototype),createReadableStreamAsyncIterator=function(e){var t,r=Object.create(ReadableStreamAsyncIteratorPrototype,(_defineProperty(t={},kStream,{value:e,writable:!0}),_defineProperty(t,kLastResolve,{value:null,writable:!0}),_defineProperty(t,kLastReject,{value:null,writable:!0}),_defineProperty(t,kError,{value:null,writable:!0}),_defineProperty(t,kEnded,{value:e._readableState.endEmitted,writable:!0}),_defineProperty(t,kHandlePromise,{value:function(e,t){var o=r[kStream].read();o?(r[kLastPromise]=null,r[kLastResolve]=null,r[kLastReject]=null,e(createIterResult(o,!1))):(r[kLastResolve]=e,r[kLastReject]=t)},writable:!0}),t));return r[kLastPromise]=null,finished(e,function(e){if(e&&"ERR_STREAM_PREMATURE_CLOSE"!==e.code){var t=r[kLastReject];return null!==t&&(r[kLastPromise]=null,r[kLastResolve]=null,r[kLastReject]=null,t(e)),void(r[kError]=e)}var o=r[kLastResolve];null!==o&&(r[kLastPromise]=null,r[kLastResolve]=null,r[kLastReject]=null,o(createIterResult(void 0,!0))),r[kEnded]=!0}),e.on("readable",onReadable.bind(null,r)),r};module.exports=createReadableStreamAsyncIterator;
}).call(this)}).call(this,_dereq_('_process'))
},{"./end-of-stream":64,"_process":52}],62:[function(_dereq_,module,exports){
"use strict";function ownKeys(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(n),!0).forEach(function(t){_defineProperty(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ownKeys(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}var _require=_dereq_("buffer"),Buffer=_require.Buffer,_require2=_dereq_("util"),inspect=_require2.inspect,custom=inspect&&inspect.custom||"inspect";function copyBuffer(e,t,n){Buffer.prototype.copy.call(e,t,n)}module.exports=function(){function e(){_classCallCheck(this,e),this.head=null,this.tail=null,this.length=0}return _createClass(e,[{key:"push",value:function(e){var t={data:e,next:null};this.length>0?this.tail.next=t:this.head=t,this.tail=t,++this.length}},{key:"unshift",value:function(e){var t={data:e,next:this.head};0===this.length&&(this.tail=t),this.head=t,++this.length}},{key:"shift",value:function(){if(0!==this.length){var e=this.head.data;return 1===this.length?this.head=this.tail=null:this.head=this.head.next,--this.length,e}}},{key:"clear",value:function(){this.head=this.tail=null,this.length=0}},{key:"join",value:function(e){if(0===this.length)return"";for(var t=this.head,n=""+t.data;t=t.next;)n+=e+t.data;return n}},{key:"concat",value:function(e){if(0===this.length)return Buffer.alloc(0);for(var t=Buffer.allocUnsafe(e>>>0),n=this.head,r=0;n;)copyBuffer(n.data,t,r),r+=n.data.length,n=n.next;return t}},{key:"consume",value:function(e,t){var n;return e<this.head.data.length?(n=this.head.data.slice(0,e),this.head.data=this.head.data.slice(e)):n=e===this.head.data.length?this.shift():t?this._getString(e):this._getBuffer(e),n}},{key:"first",value:function(){return this.head.data}},{key:"_getString",value:function(e){var t=this.head,n=1,r=t.data;for(e-=r.length;t=t.next;){var a=t.data,i=e>a.length?a.length:e;if(i===a.length?r+=a:r+=a.slice(0,e),0===(e-=i)){i===a.length?(++n,t.next?this.head=t.next:this.head=this.tail=null):(this.head=t,t.data=a.slice(i));break}++n}return this.length-=n,r}},{key:"_getBuffer",value:function(e){var t=Buffer.allocUnsafe(e),n=this.head,r=1;for(n.data.copy(t),e-=n.data.length;n=n.next;){var a=n.data,i=e>a.length?a.length:e;if(a.copy(t,t.length-e,0,i),0===(e-=i)){i===a.length?(++r,n.next?this.head=n.next:this.head=this.tail=null):(this.head=n,n.data=a.slice(i));break}++r}return this.length-=r,t}},{key:custom,value:function(e,t){return inspect(this,_objectSpread({},t,{depth:0,customInspect:!1}))}}]),e}();
},{"buffer":3,"util":2}],63:[function(_dereq_,module,exports){
(function (process){(function (){
"use strict";function destroy(t,e){var r=this,i=this._readableState&&this._readableState.destroyed,a=this._writableState&&this._writableState.destroyed;return i||a?(e?e(t):t&&(this._writableState?this._writableState.errorEmitted||(this._writableState.errorEmitted=!0,process.nextTick(emitErrorNT,this,t)):process.nextTick(emitErrorNT,this,t)),this):(this._readableState&&(this._readableState.destroyed=!0),this._writableState&&(this._writableState.destroyed=!0),this._destroy(t||null,function(t){!e&&t?r._writableState?r._writableState.errorEmitted?process.nextTick(emitCloseNT,r):(r._writableState.errorEmitted=!0,process.nextTick(emitErrorAndCloseNT,r,t)):process.nextTick(emitErrorAndCloseNT,r,t):e?(process.nextTick(emitCloseNT,r),e(t)):process.nextTick(emitCloseNT,r)}),this)}function emitErrorAndCloseNT(t,e){emitErrorNT(t,e),emitCloseNT(t)}function emitCloseNT(t){t._writableState&&!t._writableState.emitClose||t._readableState&&!t._readableState.emitClose||t.emit("close")}function undestroy(){this._readableState&&(this._readableState.destroyed=!1,this._readableState.reading=!1,this._readableState.ended=!1,this._readableState.endEmitted=!1),this._writableState&&(this._writableState.destroyed=!1,this._writableState.ended=!1,this._writableState.ending=!1,this._writableState.finalCalled=!1,this._writableState.prefinished=!1,this._writableState.finished=!1,this._writableState.errorEmitted=!1)}function emitErrorNT(t,e){t.emit("error",e)}function errorOrDestroy(t,e){var r=t._readableState,i=t._writableState;r&&r.autoDestroy||i&&i.autoDestroy?t.destroy(e):t.emit("error",e)}module.exports={destroy:destroy,undestroy:undestroy,errorOrDestroy:errorOrDestroy};
}).call(this)}).call(this,_dereq_('_process'))
},{"_process":52}],64:[function(_dereq_,module,exports){
"use strict";var ERR_STREAM_PREMATURE_CLOSE=_dereq_("../../../errors").codes.ERR_STREAM_PREMATURE_CLOSE;function once(e){var r=!1;return function(){if(!r){r=!0;for(var t=arguments.length,n=new Array(t),o=0;o<t;o++)n[o]=arguments[o];e.apply(this,n)}}}function noop(){}function isRequest(e){return e.setHeader&&"function"==typeof e.abort}function eos(e,r,t){if("function"==typeof r)return eos(e,null,r);r||(r={}),t=once(t||noop);var n=r.readable||!1!==r.readable&&e.readable,o=r.writable||!1!==r.writable&&e.writable,i=function(){e.writable||l()},a=e._writableState&&e._writableState.finished,l=function(){o=!1,a=!0,n||t.call(e)},s=e._readableState&&e._readableState.endEmitted,c=function(){n=!1,s=!0,o||t.call(e)},u=function(r){t.call(e,r)},f=function(){var r;return n&&!s?(e._readableState&&e._readableState.ended||(r=new ERR_STREAM_PREMATURE_CLOSE),t.call(e,r)):o&&!a?(e._writableState&&e._writableState.ended||(r=new ERR_STREAM_PREMATURE_CLOSE),t.call(e,r)):void 0},d=function(){e.req.on("finish",l)};return isRequest(e)?(e.on("complete",l),e.on("abort",f),e.req?d():e.on("request",d)):o&&!e._writableState&&(e.on("end",i),e.on("close",i)),e.on("end",c),e.on("finish",l),!1!==r.error&&e.on("error",u),e.on("close",f),function(){e.removeListener("complete",l),e.removeListener("abort",f),e.removeListener("request",d),e.req&&e.req.removeListener("finish",l),e.removeListener("end",i),e.removeListener("close",i),e.removeListener("finish",l),e.removeListener("end",c),e.removeListener("error",u),e.removeListener("close",f)}}module.exports=eos;
},{"../../../errors":55}],65:[function(_dereq_,module,exports){
module.exports=function(){throw new Error("Readable.from is not available in the browser")};
},{}],66:[function(_dereq_,module,exports){
"use strict";var eos;function once(e){var r=!1;return function(){r||(r=!0,e.apply(void 0,arguments))}}var _require$codes=_dereq_("../../../errors").codes,ERR_MISSING_ARGS=_require$codes.ERR_MISSING_ARGS,ERR_STREAM_DESTROYED=_require$codes.ERR_STREAM_DESTROYED;function noop(e){if(e)throw e}function isRequest(e){return e.setHeader&&"function"==typeof e.abort}function destroyer(e,r,n,o){o=once(o);var t=!1;e.on("close",function(){t=!0}),void 0===eos&&(eos=_dereq_("./end-of-stream")),eos(e,{readable:r,writable:n},function(e){if(e)return o(e);t=!0,o()});var i=!1;return function(r){if(!t&&!i)return i=!0,isRequest(e)?e.abort():"function"==typeof e.destroy?e.destroy():void o(r||new ERR_STREAM_DESTROYED("pipe"))}}function call(e){e()}function pipe(e,r){return e.pipe(r)}function popCallback(e){return e.length?"function"!=typeof e[e.length-1]?noop:e.pop():noop}function pipeline(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];var o,t=popCallback(r);if(Array.isArray(r[0])&&(r=r[0]),r.length<2)throw new ERR_MISSING_ARGS("streams");var i=r.map(function(e,n){var u=n<r.length-1;return destroyer(e,u,n>0,function(e){o||(o=e),e&&i.forEach(call),u||(i.forEach(call),t(o))})});return r.reduce(pipe)}module.exports=pipeline;
},{"../../../errors":55,"./end-of-stream":64}],67:[function(_dereq_,module,exports){
"use strict";var ERR_INVALID_OPT_VALUE=_dereq_("../../../errors").codes.ERR_INVALID_OPT_VALUE;function highWaterMarkFrom(r,e,t){return null!=r.highWaterMark?r.highWaterMark:e?r[t]:null}function getHighWaterMark(r,e,t,a){var i=highWaterMarkFrom(e,a,t);if(null!=i){if(!isFinite(i)||Math.floor(i)!==i||i<0)throw new ERR_INVALID_OPT_VALUE(a?t:"highWaterMark",i);return Math.floor(i)}return r.objectMode?16:16384}module.exports={getHighWaterMark:getHighWaterMark};
},{"../../../errors":55}],68:[function(_dereq_,module,exports){
module.exports=_dereq_("events").EventEmitter;
},{"events":18}],69:[function(_dereq_,module,exports){
"use strict";var Buffer=_dereq_("safe-buffer").Buffer,isEncoding=Buffer.isEncoding||function(t){switch((t=""+t)&&t.toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":case"raw":return!0;default:return!1}};function _normalizeEncoding(t){if(!t)return"utf8";for(var e;;)switch(t){case"utf8":case"utf-8":return"utf8";case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return"utf16le";case"latin1":case"binary":return"latin1";case"base64":case"ascii":case"hex":return t;default:if(e)return;t=(""+t).toLowerCase(),e=!0}}function normalizeEncoding(t){var e=_normalizeEncoding(t);if("string"!=typeof e&&(Buffer.isEncoding===isEncoding||!isEncoding(t)))throw new Error("Unknown encoding: "+t);return e||t}function StringDecoder(t){var e;switch(this.encoding=normalizeEncoding(t),this.encoding){case"utf16le":this.text=utf16Text,this.end=utf16End,e=4;break;case"utf8":this.fillLast=utf8FillLast,e=4;break;case"base64":this.text=base64Text,this.end=base64End,e=3;break;default:return this.write=simpleWrite,void(this.end=simpleEnd)}this.lastNeed=0,this.lastTotal=0,this.lastChar=Buffer.allocUnsafe(e)}function utf8CheckByte(t){return t<=127?0:t>>5==6?2:t>>4==14?3:t>>3==30?4:t>>6==2?-1:-2}function utf8CheckIncomplete(t,e,s){var i=e.length-1;if(i<s)return 0;var n=utf8CheckByte(e[i]);return n>=0?(n>0&&(t.lastNeed=n-1),n):--i<s||-2===n?0:(n=utf8CheckByte(e[i]))>=0?(n>0&&(t.lastNeed=n-2),n):--i<s||-2===n?0:(n=utf8CheckByte(e[i]))>=0?(n>0&&(2===n?n=0:t.lastNeed=n-3),n):0}function utf8CheckExtraBytes(t,e,s){if(128!=(192&e[0]))return t.lastNeed=0,"�";if(t.lastNeed>1&&e.length>1){if(128!=(192&e[1]))return t.lastNeed=1,"�";if(t.lastNeed>2&&e.length>2&&128!=(192&e[2]))return t.lastNeed=2,"�"}}function utf8FillLast(t){var e=this.lastTotal-this.lastNeed,s=utf8CheckExtraBytes(this,t,e);return void 0!==s?s:this.lastNeed<=t.length?(t.copy(this.lastChar,e,0,this.lastNeed),this.lastChar.toString(this.encoding,0,this.lastTotal)):(t.copy(this.lastChar,e,0,t.length),void(this.lastNeed-=t.length))}function utf8Text(t,e){var s=utf8CheckIncomplete(this,t,e);if(!this.lastNeed)return t.toString("utf8",e);this.lastTotal=s;var i=t.length-(s-this.lastNeed);return t.copy(this.lastChar,0,i),t.toString("utf8",e,i)}function utf8End(t){var e=t&&t.length?this.write(t):"";return this.lastNeed?e+"�":e}function utf16Text(t,e){if((t.length-e)%2==0){var s=t.toString("utf16le",e);if(s){var i=s.charCodeAt(s.length-1);if(i>=55296&&i<=56319)return this.lastNeed=2,this.lastTotal=4,this.lastChar[0]=t[t.length-2],this.lastChar[1]=t[t.length-1],s.slice(0,-1)}return s}return this.lastNeed=1,this.lastTotal=2,this.lastChar[0]=t[t.length-1],t.toString("utf16le",e,t.length-1)}function utf16End(t){var e=t&&t.length?this.write(t):"";if(this.lastNeed){var s=this.lastTotal-this.lastNeed;return e+this.lastChar.toString("utf16le",0,s)}return e}function base64Text(t,e){var s=(t.length-e)%3;return 0===s?t.toString("base64",e):(this.lastNeed=3-s,this.lastTotal=3,1===s?this.lastChar[0]=t[t.length-1]:(this.lastChar[0]=t[t.length-2],this.lastChar[1]=t[t.length-1]),t.toString("base64",e,t.length-s))}function base64End(t){var e=t&&t.length?this.write(t):"";return this.lastNeed?e+this.lastChar.toString("base64",0,3-this.lastNeed):e}function simpleWrite(t){return t.toString(this.encoding)}function simpleEnd(t){return t&&t.length?this.write(t):""}exports.StringDecoder=StringDecoder,StringDecoder.prototype.write=function(t){if(0===t.length)return"";var e,s;if(this.lastNeed){if(void 0===(e=this.fillLast(t)))return"";s=this.lastNeed,this.lastNeed=0}else s=0;return s<t.length?e?e+this.text(t,s):this.text(t,s):e||""},StringDecoder.prototype.end=utf8End,StringDecoder.prototype.text=utf8Text,StringDecoder.prototype.fillLast=function(t){if(this.lastNeed<=t.length)return t.copy(this.lastChar,this.lastTotal-this.lastNeed,0,this.lastNeed),this.lastChar.toString(this.encoding,0,this.lastTotal);t.copy(this.lastChar,this.lastTotal-this.lastNeed,0,t.length),this.lastNeed-=t.length};
},{"safe-buffer":53}],70:[function(_dereq_,module,exports){
(function (global){(function (){
function deprecate(r,e){if(config("noDeprecation"))return r;var o=!1;return function(){if(!o){if(config("throwDeprecation"))throw new Error(e);config("traceDeprecation")?console.trace(e):console.warn(e),o=!0}return r.apply(this,arguments)}}function config(r){try{if(!global.localStorage)return!1}catch(r){return!1}var e=global.localStorage[r];return null!=e&&"true"===String(e).toLowerCase()}module.exports=deprecate;
}).call(this)}).call(this,typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],71:[function(_dereq_,module,exports){
(function (process){(function (){
"use strict";var _cbor=_interopRequireDefault(_dereq_("cbor")),_msgpackLite=_interopRequireDefault(_dereq_("msgpack-lite"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _classCallCheck(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,r){for(var t=0;t<r.length;t++){var o=r[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,_toPropertyKey(o.key),o)}}function _createClass(e,r,t){return r&&_defineProperties(e.prototype,r),t&&_defineProperties(e,t),Object.defineProperty(e,"prototype",{writable:!1}),e}function _toPropertyKey(e){var r=_toPrimitive(e,"string");return"symbol"===_typeof(r)?r:String(r)}function _toPrimitive(e,r){if("object"!==_typeof(e)||null===e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var o=t.call(e,r||"default");if("object"!==_typeof(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(e)}var codec={cbor:{encode:function(e){try{e=_cbor.default.encode(e)}catch(e){throw new Error("failed to encode CBOR format")}return!ArrayBuffer.isView(e)&&process.browser&&(e=new Uint8Array(e)),e},decode:function(e){ArrayBuffer.isView(e)&&process.browser&&(e=e.buffer);try{e=_cbor.default.decode(e)}catch(e){throw new Error("failed to decode CBOR format")}return e}},msgpack:{encode:function(e){try{e=_msgpackLite.default.encode(e)}catch(e){throw new Error("failed to encode MsgPack format")}return e},decode:function(e){try{e=_msgpackLite.default.decode(e)}catch(e){throw new Error("failed to decode MsgPack format")}return e}},json:{encode:function(e){try{e=JSON.stringify(e)}catch(e){throw new Error("failed to encode JSON format")}return e},decode:function(e){try{e=JSON.parse(e)}catch(e){throw new Error("failed to decode JSON format")}return e}}},Encodr=function(){function e(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"cbor";if(_classCallCheck(this,e),void 0===codec[r])throw new Error("invalid coded");this.type=r}return _createClass(e,[{key:"encode",value:function(e){return codec[this.type].encode(e)}},{key:"decode",value:function(e){return codec[this.type].decode(e)}}]),e}();module.exports=Encodr;
}).call(this)}).call(this,_dereq_('_process'))
},{"_process":52,"cbor":4,"msgpack-lite":23}]},{},[71])(71)
});


/***/ }),

/***/ "./public/frontend/const.js":
/*!**********************************!*\
  !*** ./public/frontend/const.js ***!
  \**********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   animals: function() { return /* binding */ animals; },
/* harmony export */   background: function() { return /* binding */ background; },
/* harmony export */   boundigs: function() { return /* binding */ boundigs; },
/* harmony export */   bridge: function() { return /* binding */ bridge; },
/* harmony export */   camera: function() { return /* binding */ camera; },
/* harmony export */   clickWarp: function() { return /* binding */ clickWarp; },
/* harmony export */   deathText: function() { return /* binding */ deathText; },
/* harmony export */   fadeTexts: function() { return /* binding */ fadeTexts; },
/* harmony export */   gameCanvas: function() { return /* binding */ gameCanvas; },
/* harmony export */   gameContext: function() { return /* binding */ gameContext; },
/* harmony export */   gameObjects: function() { return /* binding */ gameObjects; },
/* harmony export */   grid: function() { return /* binding */ grid; },
/* harmony export */   im: function() { return /* binding */ im; },
/* harmony export */   images: function() { return /* binding */ images; },
/* harmony export */   keys: function() { return /* binding */ keys; },
/* harmony export */   minimap: function() { return /* binding */ minimap; },
/* harmony export */   mouse: function() { return /* binding */ mouse; },
/* harmony export */   network: function() { return /* binding */ network; },
/* harmony export */   players: function() { return /* binding */ players; },
/* harmony export */   renderer: function() { return /* binding */ renderer; },
/* harmony export */   sprites: function() { return /* binding */ sprites; },
/* harmony export */   ui: function() { return /* binding */ ui; }
/* harmony export */ });
/* harmony import */ var _scene_Canvas_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scene/Canvas.js */ "./public/frontend/scene/Canvas.js");
/* harmony import */ var _scene_Context_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scene/Context.js */ "./public/frontend/scene/Context.js");
/* harmony import */ var _network_Network_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./network/Network.js */ "./public/frontend/network/Network.js");
/* harmony import */ var _uicontrol_UIControl_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./uicontrol/UIControl.js */ "./public/frontend/uicontrol/UIControl.js");
/* harmony import */ var _renders_Renderer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./renders/Renderer.js */ "./public/frontend/renders/Renderer.js");
/* harmony import */ var _renders_Camera_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./renders/Camera.js */ "./public/frontend/renders/Camera.js");
/* harmony import */ var _renders_components_Boundings_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./renders/components/Boundings.js */ "./public/frontend/renders/components/Boundings.js");
/* harmony import */ var _managers_Players_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./managers/Players.js */ "./public/frontend/managers/Players.js");
/* harmony import */ var _textures_Images_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./textures/Images.js */ "./public/frontend/textures/Images.js");
/* harmony import */ var _renders_components_Grid_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./renders/components/Grid.js */ "./public/frontend/renders/components/Grid.js");
/* harmony import */ var _renders_components_DeathText_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./renders/components/DeathText.js */ "./public/frontend/renders/components/DeathText.js");
/* harmony import */ var _managers_GameObjects_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./managers/GameObjects.js */ "./public/frontend/managers/GameObjects.js");
/* harmony import */ var _textures_Sprites_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./textures/Sprites.js */ "./public/frontend/textures/Sprites.js");
/* harmony import */ var _renders_components_Minimap_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./renders/components/Minimap.js */ "./public/frontend/renders/components/Minimap.js");
/* harmony import */ var _managers_FadeTexts_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./managers/FadeTexts.js */ "./public/frontend/managers/FadeTexts.js");
/* harmony import */ var _renders_components_Background_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./renders/components/Background.js */ "./public/frontend/renders/components/Background.js");
/* harmony import */ var _renders_components_Bridge_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./renders/components/Bridge.js */ "./public/frontend/renders/components/Bridge.js");
/* harmony import */ var _managers_Animals_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./managers/Animals.js */ "./public/frontend/managers/Animals.js");



















const mouse = {
    x: 0,
    y: 0
}
const clickWarp = {
    active: false,
    renderRotation: 0,
    get x() {
        return (mouse.x / gameCanvas.scale) + (camera.x - gameCanvas.scaledWidth / 2)
    },
    get y() {
        return (mouse.y / gameCanvas.scale) + (camera.y - gameCanvas.scaledHeight / 2)
    }
}
const keys = new Map()

const images = new _textures_Images_js__WEBPACK_IMPORTED_MODULE_8__["default"]()
const sprites = new _textures_Sprites_js__WEBPACK_IMPORTED_MODULE_12__["default"]()
const ui = new _uicontrol_UIControl_js__WEBPACK_IMPORTED_MODULE_3__["default"]()
const network = new _network_Network_js__WEBPACK_IMPORTED_MODULE_2__["default"]()
const gameCanvas = new _scene_Canvas_js__WEBPACK_IMPORTED_MODULE_0__["default"]()
const gameContext = new _scene_Context_js__WEBPACK_IMPORTED_MODULE_1__["default"](gameCanvas.context)
const renderer = new _renders_Renderer_js__WEBPACK_IMPORTED_MODULE_4__["default"]()
const camera = new _renders_Camera_js__WEBPACK_IMPORTED_MODULE_5__["default"]()
const background = new _renders_components_Background_js__WEBPACK_IMPORTED_MODULE_15__["default"]()
const boundigs = new _renders_components_Boundings_js__WEBPACK_IMPORTED_MODULE_6__["default"]()
const grid = new _renders_components_Grid_js__WEBPACK_IMPORTED_MODULE_9__["default"]()
const bridge = new _renders_components_Bridge_js__WEBPACK_IMPORTED_MODULE_16__["default"]()
const deathText = new _renders_components_DeathText_js__WEBPACK_IMPORTED_MODULE_10__["default"]()
const minimap = new _renders_components_Minimap_js__WEBPACK_IMPORTED_MODULE_13__["default"]()
const players = new _managers_Players_js__WEBPACK_IMPORTED_MODULE_7__["default"]()
const gameObjects = new _managers_GameObjects_js__WEBPACK_IMPORTED_MODULE_11__["default"]()
const animals = new _managers_Animals_js__WEBPACK_IMPORTED_MODULE_17__["default"]()
const fadeTexts = new _managers_FadeTexts_js__WEBPACK_IMPORTED_MODULE_14__["default"]()
const im = players.add(null, null, -999999, -999999, 0)

/***/ }),

/***/ "./public/frontend/effects/Blink.js":
/*!******************************************!*\
  !*** ./public/frontend/effects/Blink.js ***!
  \******************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../const.js */ "./public/frontend/const.js");


class Blink {
    constructor(object, color, alpha, scale, isMoreEffects) {
        this.object = object
        this.color = color
        this.alpha = alpha || 1
        this.size = this._size = scale
        this.isMoreEffects = isMoreEffects

        this.lineWidth = 1
        this.depth = 4
        this.rotation = 0
        this.lineOffset = 0
        this.lineOffsetReturn = false
        this.sizeReturn = false
    }

    render() {
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.save()
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.strokeStyle = this.color
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.lineWidth = this.lineWidth
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.lineJoin = "round"
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.globalAlpha = this.alpha

        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.translate(this.object.render.x, this.object.render.y)
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.rotate(this.rotation)
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.strokeRect(-this.size, -this.size, this.size * 2, this.size * 2)
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.strokeRect(-this.size + this.depth, -this.size + this.depth, this.size * 2 - this.depth * 2, this.size * 2 - this.depth * 2)
        
        if (this.isMoreEffects) {
            const size = this.size + 10

            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.rotate(-this.rotation * 2)
            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.strokeRect(-size, -size, size * 2, size * 2)
            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.strokeRect(-size + this.depth, -size + this.depth, size * 2 - this.depth * 2, size * 2 - this.depth * 2)
            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.rotate(this.rotation * 2)
        }

        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.beginPath()
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.moveTo(-this.size + this.depth, -this.size + this.lineOffset + this.depth)
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.lineTo(this.size - this.depth, -this.size + this.lineOffset + this.depth)
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.stroke()
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.closePath()
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.beginPath()
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.moveTo(-this.size + this.depth, -this.size + this.lineOffset + this.depth * 2)
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.lineTo(this.size - this.depth, -this.size + this.lineOffset + this.depth * 2)
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.stroke()
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.closePath()

        if (this.isMoreEffects) {
            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.beginPath()
            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.arc(-this.size + this.depth / 2, -this.size + this.lineOffset + this.depth * 1.5, this.depth * 1.25, 0, Math.PI * 2)
            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.stroke()
            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.closePath()
            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.beginPath()
            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.arc(-this.size + this.depth / 2, -this.size + this.lineOffset + this.depth * 1.5, this.depth * 2, 0, Math.PI * 2)
            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.stroke()
            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.closePath()

            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.beginPath()
            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.arc(this.size - this.depth / 2, -this.size + this.lineOffset + this.depth * 1.5, this.depth * 1.25, 0, Math.PI * 2)
            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.stroke()
            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.closePath()
            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.beginPath()
            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.arc(this.size - this.depth / 2, -this.size + this.lineOffset + this.depth * 1.5, this.depth * 2, 0, Math.PI * 2)
            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.stroke()
            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.closePath()
        }

        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.beginPath()
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.moveTo(-this.size + this.lineOffset + this.depth, -this.size + this.depth)
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.lineTo(-this.size + this.lineOffset + this.depth, this.size - this.depth)
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.stroke()
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.closePath()
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.beginPath()
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.moveTo(-this.size + this.lineOffset + this.depth * 2, -this.size + this.depth)
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.lineTo(-this.size + this.lineOffset + this.depth * 2, this.size - this.depth)
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.stroke()
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.closePath()

        if (this.isMoreEffects) {
            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.beginPath()
            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.arc(-this.size + this.lineOffset + this.depth * 1.5, -this.size + this.depth / 2, this.depth * 1.25, 0, Math.PI * 2)
            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.stroke()
            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.closePath()
            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.beginPath()
            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.arc(-this.size + this.lineOffset + this.depth * 1.5, -this.size + this.depth / 2, this.depth * 2, 0, Math.PI * 2)
            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.stroke()
            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.closePath()

            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.beginPath()
            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.arc(-this.size + this.lineOffset + this.depth * 1.5, this.size - this.depth / 2, this.depth * 1.25, 0, Math.PI * 2)
            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.stroke()
            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.closePath()
            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.beginPath()
            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.arc(-this.size + this.lineOffset + this.depth * 1.5, this.size - this.depth / 2, this.depth * 2, 0, Math.PI * 2)
            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.stroke()
            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.closePath()
        }

        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.restore()

        this.rotation += 0.0004 * _const_js__WEBPACK_IMPORTED_MODULE_0__.renderer.delta

        if (this.lineOffsetReturn) {
            this.lineOffset -= 0.045 * _const_js__WEBPACK_IMPORTED_MODULE_0__.renderer.delta

            if (this.lineOffset <= 0) {
                this.lineOffset = 0

                this.lineOffsetReturn = false
            }
        } else {
            this.lineOffset += 0.045 * _const_js__WEBPACK_IMPORTED_MODULE_0__.renderer.delta

            if (this.lineOffset >= (this.size * 2 - this.depth * 3)) {
                this.lineOffset = this.size * 2 - this.depth * 3

                this.lineOffsetReturn = true
            }
        }
        
        if (!this.isMoreEffects) return

        if (this.sizeReturn) {
            this.size -= 0.008 * _const_js__WEBPACK_IMPORTED_MODULE_0__.renderer.delta

            if (this.size <= this._size) {
                this.size = this._size

                this.sizeReturn = false
            }
        } else {
            this.size += 0.008 * _const_js__WEBPACK_IMPORTED_MODULE_0__.renderer.delta

            if (this.size >= (this._size * 1.5)) {
                this.size = this._size * 1.5

                this.sizeReturn = true
            }
        }
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Blink);

/***/ }),

/***/ "./public/frontend/effects/FadeText.js":
/*!*********************************************!*\
  !*** ./public/frontend/effects/FadeText.js ***!
  \*********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../const.js */ "./public/frontend/const.js");


class FadeText {
    constructor(id, text, x, y, size, speed, lifeTime, color) {
        this.id = id
        this.text = text
        this.x = x
        this.y = y
        this.size = this._size = size
        this.maxSize = this.size * 1.5
        this.speed = speed
        this.lifeTime = lifeTime
        this.color = color

        this.sizeSpeed = 0.7
    }

    render() {
        if (this.lifeTime <= 0) return _const_js__WEBPACK_IMPORTED_MODULE_0__.fadeTexts.removeFadeText(this.id)

        this.lifeTime -= _const_js__WEBPACK_IMPORTED_MODULE_0__.renderer.delta
        this.y -= this.speed * _const_js__WEBPACK_IMPORTED_MODULE_0__.renderer.delta
        this.size += this.sizeSpeed * _const_js__WEBPACK_IMPORTED_MODULE_0__.renderer.delta

        if (this.size >= this.maxSize) {
            this.size = this.maxSize
            this.sizeSpeed *= -1
        } else if (this.size <= this._size) {
            this.size = this._size
            this.sizeSpeed = 0
        }

        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.save()
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.fillStyle = this.color
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.font = `${this.size}px Hammersmith One`
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.textAlign = "center"
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.textBaseline = "middle"

        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.translate(this.x - _const_js__WEBPACK_IMPORTED_MODULE_0__.camera.xOffset, this.y - _const_js__WEBPACK_IMPORTED_MODULE_0__.camera.yOffset)
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.fillText(this.text, 0, 0)
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.restore()
    }
}

/* harmony default export */ __webpack_exports__["default"] = (FadeText);

/***/ }),

/***/ "./public/frontend/entities/Animal.js":
/*!********************************************!*\
  !*** ./public/frontend/entities/Animal.js ***!
  \********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../const.js */ "./public/frontend/const.js");
/* harmony import */ var _Entity_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Entity.js */ "./public/frontend/entities/Entity.js");
/* harmony import */ var _EntityESP_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EntityESP.js */ "./public/frontend/entities/EntityESP.js");




class Animal extends _Entity_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor(eid, x, y, dir, health, animalData) {
        super(eid, x, y, dir, animalData.scale, health, animalData.maxHealth)

        this.animalId = animalData.id
        this.animalData = animalData

        this.isAnimal = true

        this.sprite = _const_js__WEBPACK_IMPORTED_MODULE_0__.images.get(this.animalData.src)
        
        this.esp = new _EntityESP_js__WEBPACK_IMPORTED_MODULE_2__["default"](this, this.animalData.healthbarWidthDiv)
    }

    update() {
        if (!this.sprite.isLoaded) return

        const renderSize = this.scale * 1.2 * (this.animalData.spriteSizeMult || 1)

        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.save()
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.translate(this.render.x, this.render.y)
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.rotate(this.dir - Math.PI / 2)
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.drawImage(this.sprite, -renderSize, -renderSize, renderSize * 2, renderSize * 2)
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.restore()
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Animal);

/***/ }),

/***/ "./public/frontend/entities/Entity.js":
/*!********************************************!*\
  !*** ./public/frontend/entities/Entity.js ***!
  \********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_2d_Vector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/2d/Vector.js */ "./utils/2d/Vector.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/index.js */ "./utils/index.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../const.js */ "./public/frontend/const.js");
/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../config.json */ "./config.json");





class Entity extends _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].Point {
    constructor(eid, x, y, dir, scale, health, maxHealth) {
        super(x, y, 0, 0)

        this.eid = eid
        this.dir = dir
        this.additionalDir = 0
        this.scale = scale
        this._scale = this.scale
        this.health = health
        this.maxHealth = maxHealth

        this.renderLayer = 0

        this.updateRate = 0
        this.updateTime = null
        this.oldUpdateTime = null

        this.tickDir = this.dir
        this.oldTickDir = this.dir

        this.tickPosition = new _utils_2d_Vector_js__WEBPACK_IMPORTED_MODULE_0__["default"](this.x, this.y)
        this.oldTickPosition = new _utils_2d_Vector_js__WEBPACK_IMPORTED_MODULE_0__["default"](this.x, this.y)
    }

    get render() {
        return {
            x: this.x - _const_js__WEBPACK_IMPORTED_MODULE_2__.camera.xOffset,
            y: this.y - _const_js__WEBPACK_IMPORTED_MODULE_2__.camera.yOffset
        }
    }

    get biome() {
        const bridgeHeight = _config_json__WEBPACK_IMPORTED_MODULE_3__.biomes.river.height + _config_json__WEBPACK_IMPORTED_MODULE_3__.biomes.river.padding + _config_json__WEBPACK_IMPORTED_MODULE_3__.bridge.paddingY
        const bridgeStartX = _config_json__WEBPACK_IMPORTED_MODULE_3__.map.width / 2 - _config_json__WEBPACK_IMPORTED_MODULE_3__.bridge.width / 2
        const bridgeStartY = _config_json__WEBPACK_IMPORTED_MODULE_3__.map.height / 2 - bridgeHeight / 2
        const bridgeEndX = _config_json__WEBPACK_IMPORTED_MODULE_3__.map.width / 2 + _config_json__WEBPACK_IMPORTED_MODULE_3__.bridge.width / 2
        const bridgeEndY = _config_json__WEBPACK_IMPORTED_MODULE_3__.map.height / 2 + bridgeHeight / 2

        if (this.x >= bridgeStartX && this.x <= bridgeEndX) {
            if (this.y >= bridgeStartY && this.y <= bridgeEndY) {
                return "bridge"
            }
        }

        if (this.y >= _config_json__WEBPACK_IMPORTED_MODULE_3__.map.height / 2 - _config_json__WEBPACK_IMPORTED_MODULE_3__.biomes.river.height / 2) {
            if (this.y <= _config_json__WEBPACK_IMPORTED_MODULE_3__.map.height / 2 + _config_json__WEBPACK_IMPORTED_MODULE_3__.biomes.river.height / 2) {
                return "river"
            }
        }

        return "grass"
    }

    setScale(_scale) {
        if (typeof _scale !== 'number') return

        this.scale = _scale
    }

    setPosition(x, y) {
        this.setTo(x, y)
        this.tickPosition = new _utils_2d_Vector_js__WEBPACK_IMPORTED_MODULE_0__["default"](this.x, this.y)
        this.oldTickPosition = new _utils_2d_Vector_js__WEBPACK_IMPORTED_MODULE_0__["default"](this.x, this.y)
    }

    setEid(_eid) {
        if (typeof _eid !== 'number') return

        this.eid = _eid

        _const_js__WEBPACK_IMPORTED_MODULE_2__.players.delete(null)
        _const_js__WEBPACK_IMPORTED_MODULE_2__.players.set(this.eid, this)
    }

    setHealth(_health) {
        this.health = _health
    }

    isCanSee(other) {
        if (!other) return false

        const dx = Math.abs(other.x - this.x) - other.scale
        const dy = Math.abs(other.y - this.y) - other.scale

        return dx <= (_config_json__WEBPACK_IMPORTED_MODULE_3__.viewport.width / 2) * 1.3 && dy <= (_config_json__WEBPACK_IMPORTED_MODULE_3__.viewport.height / 2) * 1.3
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Entity);

/***/ }),

/***/ "./public/frontend/entities/EntityESP.js":
/*!***********************************************!*\
  !*** ./public/frontend/entities/EntityESP.js ***!
  \***********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../config.json */ "./config.json");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/index.js */ "./utils/index.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../const.js */ "./public/frontend/const.js");




class EntityESP {
    constructor(_entity, healthBarWidthDiv) {
        this._entity = _entity
        this.healthBarWidthDiv = healthBarWidthDiv

        this.nameModel = _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.createText(Object.assign({
            textBaseline: "middle",
            textAlign: "center",
            lineJoin: "round",
            stroke: _config_json__WEBPACK_IMPORTED_MODULE_0__.darkGeneralStroke
        }, _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].removeProto(_config_json__WEBPACK_IMPORTED_MODULE_0__.nameESP)))
        this.healthBarModel = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].removeProto(_config_json__WEBPACK_IMPORTED_MODULE_0__.healthBarESP)
    }

    drawName() {
        const nickname = this._entity.isPlayer ? this._entity.nickname : this._entity.isAnimal ? this._entity.animalData.name : this._entity.name
        const offsetY = -this._entity._scale * 2
        const metrics = this.nameModel.to(this._entity, offsetY).setText(nickname).draw()
        const textHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent
        
        if (this._entity.isPlayer && this._entity.isAFK) {
            this.nameModel.to(this._entity, offsetY - textHeight).setText("[AFK]").draw()
        }
    }

    drawEid() {
        const textModel = _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.createText({
            "font": "18px Hammersmith One",
            fill: "#ffffff",
            alpha: 1,
            stroke: _config_json__WEBPACK_IMPORTED_MODULE_0__.darkGeneralStroke,
            strokeWidth: 4,
            textBaseline: "middle",
            textAlign: "center",
            lineJoin: "round"
        })

        textModel.to(this._entity).setText(this._entity.eid).draw()
    }

    drawHealthBar() {
        this.healthBarModel = _utils_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].removeProto(_config_json__WEBPACK_IMPORTED_MODULE_0__.healthBarESP)

        if (this.healthBarWidthDiv) {
            this.healthBarModel.width /= this.healthBarWidthDiv
        }

        const offsetY = this._entity._scale * 2

        _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.save()
        _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.fillStyle = _config_json__WEBPACK_IMPORTED_MODULE_0__.darkGeneralStroke

        _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.translate(this._entity.render.x, this._entity.render.y)
        _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.beginPath()
        _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.roundRect(
            -this.healthBarModel.width - this.healthBarModel.padding, 
            offsetY, 
            this.healthBarModel.width * 2 + this.healthBarModel.padding * 2,
            this.healthBarModel.height, this.healthBarModel.radius
        )
        _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.fill()
        _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.restore()

        _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.save()
        _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.fillStyle = this.healthBarModel.fills[!this._entity.isPlayer ? 1 : this._entity.isGodmode ? 2 : this._entity.isAlly ? 0 : 1]

        _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.translate(this._entity.render.x, this._entity.render.y)
        _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.beginPath()
        _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.roundRect(
            -this.healthBarModel.width, 
            offsetY + this.healthBarModel.padding, 
            this.healthBarModel.width * 2 * (this._entity.health / this._entity.maxHealth),
            this.healthBarModel.height - this.healthBarModel.padding * 2, this.healthBarModel.radius - 1
        )
        _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.fill()
        _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.restore()
    }

    drawChatMessage() {
        if (!this._entity.chatMessage) return

        const hasRussiaLetters = /[\u0400-\u04FF]/.test(this._entity.chatMessage)
        const fontFamily = hasRussiaLetters ? "Ubuntu" : "Hammersmith One"

        _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.save()
        _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.font = `${hasRussiaLetters ? "30px" : "32px"} ${fontFamily}`
        _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.textBaseline = "middle"
        _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.textAlign = "center"

        const textSize = _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.measureText(this._entity.chatMessage)
        const textWidth = textSize.width + 17
        const textHeight = 47

        _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.fillStyle = "rgba(0, 0, 0, 0.2)"

        _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.translate(this._entity.render.x, this._entity.render.y - this._entity.scale - 90)
        _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.beginPath()
        _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.roundRect(-textWidth / 2, -textHeight / 2, textWidth, textHeight, 6)
        _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.fill()
        _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.closePath()

        _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.fillStyle = "#ffffff"

        _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.fillText(this._entity.chatMessage, 0, 0)
        _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.restore()
    }

    renderPlayerESP() {
        if (this._entity.isIm && !this._entity.isPlaying) return

        this.drawName()
        this.drawHealthBar()

        if (_const_js__WEBPACK_IMPORTED_MODULE_2__.im.isAdmin) {
            this.drawEid()
        }
    }

    renderGameObjectESP() {
        if (_const_js__WEBPACK_IMPORTED_MODULE_2__.im.isAdmin) {
            this.drawEid()
        }
    }

    renderAnimalESP() {
        this.drawName()
        this.drawHealthBar()

        if (_const_js__WEBPACK_IMPORTED_MODULE_2__.im.isAdmin) {
            this.drawEid()
        }
    }
}

/* harmony default export */ __webpack_exports__["default"] = (EntityESP);

/***/ }),

/***/ "./public/frontend/entities/GameObject.js":
/*!************************************************!*\
  !*** ./public/frontend/entities/GameObject.js ***!
  \************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../const.js */ "./public/frontend/const.js");
/* harmony import */ var _Entity_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Entity.js */ "./public/frontend/entities/Entity.js");
/* harmony import */ var _EntityESP_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EntityESP.js */ "./public/frontend/entities/EntityESP.js");
/* harmony import */ var _items_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../items.json */ "./items.json");
/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../config.json */ "./config.json");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../utils/index.js */ "./utils/index.js");







class GameObject extends _Entity_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor(eid, x, y, dir, scale, itemData, resourceType) {
        super(eid, x, y, dir, scale)

        this.itemData = itemData
        this.resourceType = resourceType

        this.isItem = typeof this.itemData !== 'undefined'

        this.xWiggle = this.yWiggle = 0

        this.sprite = this.isItem ? _const_js__WEBPACK_IMPORTED_MODULE_0__.sprites.getItemSprite(this) : _const_js__WEBPACK_IMPORTED_MODULE_0__.sprites.getResourceSprite(this)

        this.renderLayer = this.itemData?.lowLayer ? 0 : 1

        this.esp = new _EntityESP_js__WEBPACK_IMPORTED_MODULE_2__["default"](this)
    }
    
    doWiggle(power, angle) {
        this.xWiggle = power * Math.cos(angle)
        this.yWiggle = power * Math.sin(angle)
    }

    update() {
        this.xWiggle && (this.xWiggle *= Math.pow(0.99, _const_js__WEBPACK_IMPORTED_MODULE_0__.renderer.delta))
        this.yWiggle && (this.yWiggle *= Math.pow(0.99, _const_js__WEBPACK_IMPORTED_MODULE_0__.renderer.delta))

        if (this.itemData?.turnSpeed) {
            this.dir += this.itemData.turnSpeed * _const_js__WEBPACK_IMPORTED_MODULE_0__.renderer.delta
        } 
        
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.save()
        if (this.isItem) {
            if (_items_json__WEBPACK_IMPORTED_MODULE_3__.groups[this.itemData.groupId].name === "traps") {
                _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.globalAlpha = 0.6
            }
        }

        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.translate(this.render.x + this.xWiggle, this.render.y + this.yWiggle)
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.rotate(this.dir || 0)
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.drawImage(this.sprite, -this.sprite.width / 2, -this.sprite.height / 2)
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.restore()

        this.updatePhysics()
    }
}

/* harmony default export */ __webpack_exports__["default"] = (GameObject);

/***/ }),

/***/ "./public/frontend/entities/Player.js":
/*!********************************************!*\
  !*** ./public/frontend/entities/Player.js ***!
  \********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Entity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Entity.js */ "./public/frontend/entities/Entity.js");
/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../config.json */ "./config.json");
/* harmony import */ var _items_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../items.json */ "./items.json");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../const.js */ "./public/frontend/const.js");
/* harmony import */ var _EntityESP_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./EntityESP.js */ "./public/frontend/entities/EntityESP.js");
/* harmony import */ var _effects_Blink_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../effects/Blink.js */ "./public/frontend/effects/Blink.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../utils/index.js */ "./utils/index.js");








const { player } = _config_json__WEBPACK_IMPORTED_MODULE_1__
const defaultStyleSheet = {
    stroke: _config_json__WEBPACK_IMPORTED_MODULE_1__.generalStroke,
    strokeWidth: _config_json__WEBPACK_IMPORTED_MODULE_1__.generalStrokeWidth
}

class Player extends _Entity_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(eid, nickname, x, y, dir, scale, skinIndex, isAdmin, health, maxHealth, isGodmode, isDeveloper) {
        super(eid, x, y, dir, scale || player.scale, health, maxHealth)

        this.nickname = nickname
        this.skinIndex = skinIndex
        this.isAdmin = isAdmin
        this.isGodmode = isGodmode
        this.isDeveloper = isDeveloper

        const styleSheet = Object.assign(_utils_index_js__WEBPACK_IMPORTED_MODULE_6__["default"].removeProto(defaultStyleSheet), { 
            fill: player.fills[this.skinIndex]
        })
        
        this.bodyModel = _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.createCircle(styleSheet)
        this.bodyDamageModel = _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.createCircle(_utils_index_js__WEBPACK_IMPORTED_MODULE_6__["default"].removeProto(defaultStyleSheet))
        this.leftHandModel = _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.createCircle(styleSheet)
        this.leftHandDamageModel = _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.createCircle(_utils_index_js__WEBPACK_IMPORTED_MODULE_6__["default"].removeProto(defaultStyleSheet))
        this.rightHandModel = _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.createCircle(styleSheet)
        this.rightHandDamageModel = _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.createCircle(_utils_index_js__WEBPACK_IMPORTED_MODULE_6__["default"].removeProto(defaultStyleSheet))

        this.inventory = _config_json__WEBPACK_IMPORTED_MODULE_1__.startInventory
        this.weaponIndex = this.inventory.weapons[0]
        this.itemIndex = -1
        this.itemsCount = {}
        this.hatIndex = -1
        this.hats = {}
        this.resources = {}

        for (const hat of _items_json__WEBPACK_IMPORTED_MODULE_2__.hats) {
            if (hat.cost !== 0) continue

            this.hats[hat.id] = true
        }

        this.age = 1
        this.xp = 0
        this.maxXp = 300

        this.chatMessage = ""
        this.chatMessageTimer = 0

        this.isAttackAnimation = false
        this.attackAnimationTimer = 0
        this.attackAnimationRatio = 0
        this.attackAnimationIndex = 0
        this.attackAnimationTargetAngle = 0

        this.lastDamage = null

        this.isLockWatchDir = false
        this.isPlaying = false
        this.isKilled = false
        this.isPlayer = true
        this.isAFK = false

        this.esp = new _EntityESP_js__WEBPACK_IMPORTED_MODULE_4__["default"](this)
    }

    get isIm() {
        return this.eid === _const_js__WEBPACK_IMPORTED_MODULE_3__.im.eid
    }

    get weapon() {
        return _items_json__WEBPACK_IMPORTED_MODULE_2__.weapons[this.weaponIndex]
    }

    get item() {
        return _items_json__WEBPACK_IMPORTED_MODULE_2__.items[this.itemIndex]
    }

    get hat() {
        return _items_json__WEBPACK_IMPORTED_MODULE_2__.hats[this.hatIndex]
    }

    get isAlly() {
        return this.isIm
    }

    get renderDir() {
        return (this.isIm ? this.mouseAngle : this.dir) + this.additionalDir
    }

    setResource(type, value) {
        this.resources[type] = value
    }

    recreateModels() {
        const styleSheet = Object.assign(_utils_index_js__WEBPACK_IMPORTED_MODULE_6__["default"].removeProto(defaultStyleSheet), { 
            fill: player.fills[this.skinIndex]
        })
        
        this.bodyModel = _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.createCircle(styleSheet)
        this.bodyDamageModel = _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.createCircle(_utils_index_js__WEBPACK_IMPORTED_MODULE_6__["default"].removeProto(defaultStyleSheet))
        this.leftHandModel = _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.createCircle(styleSheet)
        this.leftHandDamageModel = _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.createCircle(_utils_index_js__WEBPACK_IMPORTED_MODULE_6__["default"].removeProto(defaultStyleSheet))
        this.rightHandModel = _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.createCircle(styleSheet)
        this.rightHandDamageModel = _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.createCircle(_utils_index_js__WEBPACK_IMPORTED_MODULE_6__["default"].removeProto(defaultStyleSheet))
    }

    renderHand(side, model, size) {
        const offsetX = this.scale * Math.cos((Math.PI / 4) * (side === "left" ? 1 : -1))
        const offsetY = this.scale * Math.sin((Math.PI / 4) * (side === "left" ? 1 : -1))

        model.to(this, [ offsetX, offsetY ]).setRotate(this.renderDir).setRadius(size).draw()

        if (this.lastDamage !== null) {
            const alpha = Math.min(1, Math.max(this.lastDamage / player.damageTime, 0))

            model = this[side === "left" ? "leftHandDamageModel" : "rightHandDamageModel"]

            model.to(this, [ offsetX, offsetY ]).setStyle("fill", player.damageFill).setStyle("alpha", alpha || 0).setRotate(this.renderDir).setRadius(size).draw()
        }
    }

    renderHands() {
        const leftHandScale = this.scale === player.scale ? player.leftHandScale : this.scale / 3
        const rightHandScale = this.scale === player.scale ? player.leftHandScale : this.scale / 3

        this.renderHand("left", this.leftHandModel, leftHandScale)
        this.renderHand("right", this.rightHandModel, rightHandScale)
    }

    renderWeapon() {
        const weaponSprite = _const_js__WEBPACK_IMPORTED_MODULE_3__.sprites.getWeaponSprite(this.weaponIndex, this.scale === player.scale ? player.scale : this.scale, 0)

        _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.ctx.save()
        _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.ctx.translate(this.render.x, this.render.y)
        _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.ctx.rotate(this.renderDir)
        _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.ctx.drawImage(weaponSprite, -weaponSprite.width / 2, -weaponSprite.height / 2)
        _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.ctx.restore()
    }

    renderItem() {
        const itemSprite = _const_js__WEBPACK_IMPORTED_MODULE_3__.sprites.getItemSprite(this.item)

        _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.ctx.save()
        _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.ctx.translate(this.render.x, this.render.y)
        _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.ctx.rotate(this.renderDir)
        _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.ctx.drawImage(itemSprite, this.scale - this.item.holdOffset, -itemSprite.width / 2)
        _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.ctx.restore()
    }

    renderHat() {
        if (!this.hat) return

        const hatImage = _const_js__WEBPACK_IMPORTED_MODULE_3__.images.get(this.hat.src)

        if (!hatImage.isLoaded) return

        _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.ctx.save()
        _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.ctx.translate(this.render.x, this.render.y)
        _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.ctx.rotate(this.renderDir)
        _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.ctx.rotate(Math.PI / 2)
        _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.ctx.drawImage(hatImage, -this.hat.scale / 2, -this.hat.scale / 2, this.hat.scale, this.hat.scale)
        _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.ctx.restore()
    }

    renderBody() {
        this.bodyModel.to(this).setRadius(this.scale).draw()

        if (this.lastDamage) {
            const alpha = Math.min(1, Math.max(this.lastDamage / player.damageTime, 0))

            this.bodyDamageModel.to(this).setStyle("fill", player.damageFill).setStyle("alpha", alpha).setRadius(this.scale).draw()
        }
    }

    startAttackAnimation(isDidHit) {
        this.isAttackAnimation = true
        this.attackAnimationTimer = this.weapon.speed
        this.attackAnimationRatio = this.attackAnimationIndex = 0
        this.attackAnimationTargetAngle = -(isDidHit ? _config_json__WEBPACK_IMPORTED_MODULE_1__.hitAngle : Math.PI)
    }

    updateAttackAnimation() {
        if (this.attackAnimationTimer <= 0) return (this.isAttackAnimation = false)

        this.attackAnimationTimer -= _const_js__WEBPACK_IMPORTED_MODULE_3__.renderer.delta

        if (this.attackAnimationIndex === 0) {
            this.attackAnimationRatio += _const_js__WEBPACK_IMPORTED_MODULE_3__.renderer.delta / (this.weapon.speed * _config_json__WEBPACK_IMPORTED_MODULE_1__.hitReturnRatio)
            this.additionalDir = _utils_index_js__WEBPACK_IMPORTED_MODULE_6__["default"].lerp(0, this.attackAnimationTargetAngle, Math.min(1, this.attackAnimationRatio))

            if (this.attackAnimationRatio >= 1) {
                this.attackAnimationRatio = this.attackAnimationIndex = 1
            }

            return
        }

        this.attackAnimationRatio -= _const_js__WEBPACK_IMPORTED_MODULE_3__.renderer.delta / (this.weapon.speed * (1 - _config_json__WEBPACK_IMPORTED_MODULE_1__.hitReturnRatio))
        this.additionalDir = _utils_index_js__WEBPACK_IMPORTED_MODULE_6__["default"].lerp(0, this.attackAnimationTargetAngle, Math.max(0, this.attackAnimationRatio))
    }

    update() {
        if (this.isIm && !this.isPlaying) return

        if (this.chatMessageTimer > 0) {
            this.chatMessageTimer -= _const_js__WEBPACK_IMPORTED_MODULE_3__.renderer.delta
        } else {
            this.chatMessage = ""
            this.chatMessageTimer = 0
        }

        if (this.adminBlink && this.isDeveloper) {
            if (!this.adminBlink.isMoreEffects) {
                delete this.adminBlink
            }
        }

        if (this.isAdmin && !this.adminBlink) {
            this.adminBlink = new _effects_Blink_js__WEBPACK_IMPORTED_MODULE_5__["default"](this, this.isDeveloper ? "#0b066f" : "#6f0606", 1, this.scale * 1.5, this.isDeveloper)
        } else if (!this.isAdmin && this.adminBlink) {
            delete this.adminBlink
        }

        this.adminBlink && this.adminBlink.render()

        if (this.isAttackAnimation) {
            this.updateAttackAnimation()
        }

        if (this.lastDamage > 0) {
            this.lastDamage -= _const_js__WEBPACK_IMPORTED_MODULE_3__.renderer.delta
            this.lastDamage = Math.min(Math.max(this.lastDamage, 0), player.damageTime)
        } else {
            this.lastDamage = null
        }
        
        this.itemIndex === -1 && this.renderWeapon()
        this.renderHands()
        this.itemIndex !== -1 && this.renderItem()
        this.renderBody()
        this.renderHat()
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Player);

/***/ }),

/***/ "./public/frontend/managers/Animals.js":
/*!*********************************************!*\
  !*** ./public/frontend/managers/Animals.js ***!
  \*********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _renders_layers_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../renders/layers.json */ "./public/frontend/renders/layers.json");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../const.js */ "./public/frontend/const.js");
/* harmony import */ var _items_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../items.json */ "./items.json");
/* harmony import */ var _entities_Animal_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../entities/Animal.js */ "./public/frontend/entities/Animal.js");
/* harmony import */ var _Entities_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Entities.js */ "./public/frontend/managers/Entities.js");






class Animals extends _Entities_js__WEBPACK_IMPORTED_MODULE_4__["default"] {
    constructor() {
        super()

        _const_js__WEBPACK_IMPORTED_MODULE_1__.renderer.add(_renders_layers_json__WEBPACK_IMPORTED_MODULE_0__.animalsESPLow.layer, {
            id: _renders_layers_json__WEBPACK_IMPORTED_MODULE_0__.animalsESPLow.id,
            _function: this.renderAnimalsESP.bind(this, 0)
        })

        _const_js__WEBPACK_IMPORTED_MODULE_1__.renderer.add(_renders_layers_json__WEBPACK_IMPORTED_MODULE_0__.animalsESPHigh.layer, {
            id: _renders_layers_json__WEBPACK_IMPORTED_MODULE_0__.animalsESPHigh.id,
            _function: this.renderAnimalsESP.bind(this, 1)
        })

        _const_js__WEBPACK_IMPORTED_MODULE_1__.renderer.add(_renders_layers_json__WEBPACK_IMPORTED_MODULE_0__.animalsLow.layer, {
            id: _renders_layers_json__WEBPACK_IMPORTED_MODULE_0__.animalsLow.id,
            _function: this.update.bind(this, 0)
        })

        _const_js__WEBPACK_IMPORTED_MODULE_1__.renderer.add(_renders_layers_json__WEBPACK_IMPORTED_MODULE_0__.animalsHigh.layer, {
            id: _renders_layers_json__WEBPACK_IMPORTED_MODULE_0__.animalsHigh.id,
            _function: this.update.bind(this, 1)
        })
    }

    addAnimal(eid, animalId, x, y, dir, health) {
        const animalData = _items_json__WEBPACK_IMPORTED_MODULE_2__.animals[animalId]

        this.set(eid, new _entities_Animal_js__WEBPACK_IMPORTED_MODULE_3__["default"](eid, x, y, dir, health, animalData))
    }

    renderAnimalsESP(renderLayer) {
        this.each((_animal) => {
            if (!_animal.esp) return
            if (renderLayer !== ([ 0, 2 ].includes(_animal.renderLayer) ? 1 : 0)) return

            _animal.esp.renderAnimalESP()
        })
    }

    update(renderLayer) {
        this.interpolateEntities((_animal) => ([ 0, 2 ].includes(_animal.renderLayer) ? 1 : 0) === renderLayer, (_animal) => _animal.update())
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Animals);

/***/ }),

/***/ "./public/frontend/managers/Entities.js":
/*!**********************************************!*\
  !*** ./public/frontend/managers/Entities.js ***!
  \**********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/index.js */ "./utils/index.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../const.js */ "./public/frontend/const.js");
/* harmony import */ var _Manager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Manager.js */ "./public/frontend/managers/Manager.js");
/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../config.json */ "./config.json");





class Entities extends _Manager_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
    constructor() {
        super()
    }

    interpolateEntities(filter, afterInterpolate) {
        const lastTime = _const_js__WEBPACK_IMPORTED_MODULE_1__.renderer.nowUpdate - (1000 / _config_json__WEBPACK_IMPORTED_MODULE_3__.tickRateDiv)

        this.forEach((player) => {
            if (!filter(player)) return

            player.updateRate += _const_js__WEBPACK_IMPORTED_MODULE_1__.renderer.delta

            const total = player.updateTime - player.oldUpdateTime
            const fraction = lastTime - player.oldUpdateTime
            const ratio = fraction / total
            const rate = 170
            const tmpRate = Math.min(1.7, player.updateRate / rate)
            const different = player.tickPosition.different(player.oldTickPosition)

            player.setTo(
                player.oldTickPosition.x + (different.x * tmpRate), 
                player.oldTickPosition.y + (different.y * tmpRate)
            )

            player.dir = _utils_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].lerpAngle(player.tickDir, player.oldTickDir, Math.min(1.2, ratio))

            typeof afterInterpolate === 'function' && afterInterpolate(player)
        })
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Entities);

/***/ }),

/***/ "./public/frontend/managers/FadeTexts.js":
/*!***********************************************!*\
  !*** ./public/frontend/managers/FadeTexts.js ***!
  \***********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/index.js */ "./utils/index.js");
/* harmony import */ var _Manager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Manager.js */ "./public/frontend/managers/Manager.js");
/* harmony import */ var _renders_layers_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../renders/layers.json */ "./public/frontend/renders/layers.json");
/* harmony import */ var _effects_FadeText_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../effects/FadeText.js */ "./public/frontend/effects/FadeText.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../const.js */ "./public/frontend/const.js");






class FadeTexts extends _Manager_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor() {
        super()

        this.id = _renders_layers_json__WEBPACK_IMPORTED_MODULE_2__.fadeTexts.id
        this.layer = _renders_layers_json__WEBPACK_IMPORTED_MODULE_2__.fadeTexts.layer

        _const_js__WEBPACK_IMPORTED_MODULE_4__.renderer.add(this.layer, {
            id: this.id,
            _function: this.update.bind(this)
        })
    }

    generateId() {
        const eid = _utils_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].randInt(0, 999)

        if (this.has(eid)) return this.generateId()

        return eid
    }

    addFadeText(text, x, y, size, speed, lifeTime, color) {
        const id = this.generateId()

        this.set(id, new _effects_FadeText_js__WEBPACK_IMPORTED_MODULE_3__["default"](id, text, x, y, size, speed, lifeTime, color))
    }

    removeFadeText(id) {
        if (!this.has(id)) return

        this.delete(id)
    }

    update() {
        this.forEach((fadeText) => fadeText.render())
    }
}

/* harmony default export */ __webpack_exports__["default"] = (FadeTexts);

/***/ }),

/***/ "./public/frontend/managers/GameObjects.js":
/*!*************************************************!*\
  !*** ./public/frontend/managers/GameObjects.js ***!
  \*************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Manager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Manager.js */ "./public/frontend/managers/Manager.js");
/* harmony import */ var _renders_layers_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../renders/layers.json */ "./public/frontend/renders/layers.json");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../const.js */ "./public/frontend/const.js");
/* harmony import */ var _entities_GameObject_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../entities/GameObject.js */ "./public/frontend/entities/GameObject.js");
/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../config.json */ "./config.json");
/* harmony import */ var _items_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../items.json */ "./items.json");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../utils/index.js */ "./utils/index.js");








class GameObjects extends _Manager_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super()

        _const_js__WEBPACK_IMPORTED_MODULE_2__.renderer.add(_renders_layers_json__WEBPACK_IMPORTED_MODULE_1__.gameObjetsLow.layer, {
            id: _renders_layers_json__WEBPACK_IMPORTED_MODULE_1__.gameObjetsLow.id,
            _function: this.update.bind(this, 0)
        })

        _const_js__WEBPACK_IMPORTED_MODULE_2__.renderer.add(_renders_layers_json__WEBPACK_IMPORTED_MODULE_1__.gameObjetsHigh.layer, {
            id: _renders_layers_json__WEBPACK_IMPORTED_MODULE_1__.gameObjetsHigh.id,
            _function: this.update.bind(this, 1)
        })

        _const_js__WEBPACK_IMPORTED_MODULE_2__.renderer.add(_renders_layers_json__WEBPACK_IMPORTED_MODULE_1__.golds.layer, {
            id: _renders_layers_json__WEBPACK_IMPORTED_MODULE_1__.golds.id,
            _function: this.updateResource.bind(this, 3)
        })

        _const_js__WEBPACK_IMPORTED_MODULE_2__.renderer.add(_renders_layers_json__WEBPACK_IMPORTED_MODULE_1__.stones.layer, {
            id: _renders_layers_json__WEBPACK_IMPORTED_MODULE_1__.stones.id,
            _function: this.updateResource.bind(this, 2)
        })

        _const_js__WEBPACK_IMPORTED_MODULE_2__.renderer.add(_renders_layers_json__WEBPACK_IMPORTED_MODULE_1__.foods.layer, {
            id: _renders_layers_json__WEBPACK_IMPORTED_MODULE_1__.foods.id,
            _function: this.updateResource.bind(this, 1)
        })

        _const_js__WEBPACK_IMPORTED_MODULE_2__.renderer.add(_renders_layers_json__WEBPACK_IMPORTED_MODULE_1__.trees.layer, {
            id: _renders_layers_json__WEBPACK_IMPORTED_MODULE_1__.trees.id,
            _function: this.updateResource.bind(this, 0)
        })

        _const_js__WEBPACK_IMPORTED_MODULE_2__.renderer.add(_renders_layers_json__WEBPACK_IMPORTED_MODULE_1__.gameObjectsESP.layer, {
            id: _renders_layers_json__WEBPACK_IMPORTED_MODULE_1__.gameObjectsESP.id,
            _function: this.renderGameObjectsESP.bind(this)
        })

        this.createBackgroundGameObjects()
    }

    createBackgroundGameObjects() {
        const middleX = _config_json__WEBPACK_IMPORTED_MODULE_4__.map.width / 2
        const middleY = _config_json__WEBPACK_IMPORTED_MODULE_4__.map.height / 2

        this.addResourceObject(0, 0, middleX, middleY + 200, _config_json__WEBPACK_IMPORTED_MODULE_4__.resourcesScales.tree[3])
        this.addResourceObject(1, 0, middleX, middleY - 480, _config_json__WEBPACK_IMPORTED_MODULE_4__.resourcesScales.tree[3])
        this.addResourceObject(2, 0, middleX + 300, middleY + 450, _config_json__WEBPACK_IMPORTED_MODULE_4__.resourcesScales.tree[3])
        this.addResourceObject(3, 0, middleX - 950, middleY - 130, _config_json__WEBPACK_IMPORTED_MODULE_4__.resourcesScales.tree[2])
        this.addResourceObject(4, 0, middleX - 750, middleY - 400, _config_json__WEBPACK_IMPORTED_MODULE_4__.resourcesScales.tree[3])
        this.addResourceObject(5, 0, middleX - 700, middleY + 400, _config_json__WEBPACK_IMPORTED_MODULE_4__.resourcesScales.tree[2])
        this.addResourceObject(6, 0, middleX + 800, middleY - 200, _config_json__WEBPACK_IMPORTED_MODULE_4__.resourcesScales.tree[3])
        this.addResourceObject(7, 1, middleX - 260, middleY + 340, _config_json__WEBPACK_IMPORTED_MODULE_4__.resourcesScales.bush[3])
        this.addResourceObject(8, 1, middleX + 760, middleY + 310, _config_json__WEBPACK_IMPORTED_MODULE_4__.resourcesScales.bush[3])
        this.addResourceObject(9, 1, middleX - 800, middleY + 100, _config_json__WEBPACK_IMPORTED_MODULE_4__.resourcesScales.bush[3])
        this.addItemObject(10, 6, middleX - 800, middleX + 300, _utils_index_js__WEBPACK_IMPORTED_MODULE_6__["default"].randAngle())
        this.addItemObject(11, 6, middleX + 650, middleX - 390, _utils_index_js__WEBPACK_IMPORTED_MODULE_6__["default"].randAngle())
        this.addResourceObject(12, 2, middleX - 400, middleY - 450, _config_json__WEBPACK_IMPORTED_MODULE_4__.resourcesScales.rock[2])
    }

    addResourceObject(eid, resourceType, x, y, scale) {
        this.set(eid, new _entities_GameObject_js__WEBPACK_IMPORTED_MODULE_3__["default"](eid, x, y, void 0, scale, void 0, resourceType))
    }

    addItemObject(eid, itemId, x, y, dir) {
        const itemData = _items_json__WEBPACK_IMPORTED_MODULE_5__.items[itemId]

        this.set(eid, new _entities_GameObject_js__WEBPACK_IMPORTED_MODULE_3__["default"](eid, x, y, dir, itemData.scale, itemData, void 0))
    }

    updateResource(resourceType) {
        this.forEach((gameObject) => {
            if (gameObject.isItem || gameObject.resourceType !== resourceType) return

            gameObject.update()
        })
    }

    renderGameObjectsESP() {
        this.each((gameObject) => {
            if (!gameObject.esp) return

            gameObject.esp.renderGameObjectESP()
        })
    }

    update(renderLayer) {
        this.forEach((gameObject) => {
            if (!gameObject.isItem || gameObject.renderLayer !== renderLayer) return

            gameObject.update()
        })
    }
}

/* harmony default export */ __webpack_exports__["default"] = (GameObjects);

/***/ }),

/***/ "./public/frontend/managers/Manager.js":
/*!*********************************************!*\
  !*** ./public/frontend/managers/Manager.js ***!
  \*********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Manager extends Map {
    constructor() {
        super()
    }

    get list() {
        return [ ...this.values() ]
    }
    
    filter(predicate, index) {
        if (!(predicate instanceof Function)) return false

        const result = this.list.filter(predicate)

        return typeof index !== 'undefined' ? result[index] : result
    }

    sort(compare, index) {
        if (!(compare instanceof Function)) return false

        const result = this.list.sort(compare)

        return typeof index !== 'undefined' ? result[index] : result
    }

    each(callback) {
        if (!(callback instanceof Function)) return false

        this.forEach(callback)
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Manager);

/***/ }),

/***/ "./public/frontend/managers/Players.js":
/*!*********************************************!*\
  !*** ./public/frontend/managers/Players.js ***!
  \*********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../const.js */ "./public/frontend/const.js");
/* harmony import */ var _Entities_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Entities.js */ "./public/frontend/managers/Entities.js");
/* harmony import */ var _renders_layers_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../renders/layers.json */ "./public/frontend/renders/layers.json");
/* harmony import */ var _entities_Player_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../entities/Player.js */ "./public/frontend/entities/Player.js");





class Players extends _Entities_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor() {
        super()

        this.chatMessagesId = _renders_layers_json__WEBPACK_IMPORTED_MODULE_2__.chatMessages.id
        this.chatMessagesLayer = _renders_layers_json__WEBPACK_IMPORTED_MODULE_2__.chatMessages.layer

        _const_js__WEBPACK_IMPORTED_MODULE_0__.renderer.add(this.chatMessagesLayer, {
            id: this.chatMessagesId,
            _function: this.renderChatMessages.bind(this)
        })

        _const_js__WEBPACK_IMPORTED_MODULE_0__.renderer.add(_renders_layers_json__WEBPACK_IMPORTED_MODULE_2__.playersESPLow.layer, {
            id: _renders_layers_json__WEBPACK_IMPORTED_MODULE_2__.playersESPLow.id,
            _function: this.renderPlayersESP.bind(this, 0)
        })

        _const_js__WEBPACK_IMPORTED_MODULE_0__.renderer.add(_renders_layers_json__WEBPACK_IMPORTED_MODULE_2__.playersESPHigh.layer, {
            id: _renders_layers_json__WEBPACK_IMPORTED_MODULE_2__.playersESPHigh.id,
            _function: this.renderPlayersESP.bind(this, 1)
        })

        _const_js__WEBPACK_IMPORTED_MODULE_0__.renderer.add(_renders_layers_json__WEBPACK_IMPORTED_MODULE_2__.playersLow.layer, {
            id: _renders_layers_json__WEBPACK_IMPORTED_MODULE_2__.playersLow.id,
            _function: this.update.bind(this, 0)
        })

        _const_js__WEBPACK_IMPORTED_MODULE_0__.renderer.add(_renders_layers_json__WEBPACK_IMPORTED_MODULE_2__.playersHigh.layer, {
            id: _renders_layers_json__WEBPACK_IMPORTED_MODULE_2__.playersHigh.id,
            _function: this.update.bind(this, 1)
        })
    }

    add(...data) {
        const player = new _entities_Player_js__WEBPACK_IMPORTED_MODULE_3__["default"](...data)

        this.set(data[0], player)

        return player
    }

    remove(eid) {
        if (!this.has(eid)) return

        this.delete(eid)
    }

    renderPlayersESP(renderLayer) {
        this.each((_player) => {
            if (!_player.esp) return
            if (renderLayer !== ([ 0, 2 ].includes(_player.renderLayer) ? 1 : 0)) return

            _player.esp.renderPlayerESP()
        })
    }

    renderChatMessages() {
        this.each((_player) => {
            if (!_player.esp) return

            _player.esp.drawChatMessage()
        })
    }

    update(renderLayer) {
        this.interpolateEntities((_player) => ([ 0, 2 ].includes(_player.renderLayer) ? 1 : 0) === renderLayer, (_player) => _player.update())
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Players);

/***/ }),

/***/ "./public/frontend/network/Network.js":
/*!********************************************!*\
  !*** ./public/frontend/network/Network.js ***!
  \********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _socket_Socket_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./socket/Socket.js */ "./public/frontend/network/socket/Socket.js");


class Network {
    constructor() {
        this.socket = new _socket_Socket_js__WEBPACK_IMPORTED_MODULE_0__["default"](this)

        this.ping = 0
        this.lastPingSent = null
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Network);

/***/ }),

/***/ "./public/frontend/network/socket/Socket.js":
/*!**************************************************!*\
  !*** ./public/frontend/network/socket/Socket.js ***!
  \**************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../const.js */ "./public/frontend/const.js");
/* harmony import */ var _SocketAdapter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SocketAdapter.js */ "./public/frontend/network/socket/SocketAdapter.js");
/* harmony import */ var encodr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! encodr */ "./node_modules/encodr/lib/encodr.browser.js");




const WS_PROTOCOL = `ws${location.protocol.slice(4).split(":")[0]}`
const WS_URL = `${WS_PROTOCOL}://${location.host}/socket`
const CBOR = new encodr__WEBPACK_IMPORTED_MODULE_2__("cbor")
const closeReasons = {
    "ip_limit": "You have reached the connection limit",
    "unknown_origin": "Using a third-party Origin"
}

window.WebSocket = class extends WebSocket {
    constructor(...args) {
        if (WebSocket.instance) return false

        super(...args)

        WebSocket.instance = this
    }
}

class Socket extends _SocketAdapter_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor() {
        if (Socket.instance) return Socket.instance

        super()

        this.webSocket = null
        this.socketId = null
        this.lastSentWatchAngle = null
        
        this.on("connection", () => {
            this.webSocket.addEventListener("message", (event) => {
                const decoded = CBOR.decode(event.data)
                const [ packet, data ] = decoded

                this.emit("message", packet, data)
            })

            this.webSocket.addEventListener("close", (event) => {
                this.emit("disconnect", event)
            })
        })
        this.on("message", this.onMessage.bind(this))
        this.on("disconnect", this.onClose.bind(this))
        this.setSocket(this)

        Socket.instance = this
    }

    get isReady() {
        return this.webSocket?.readyState === 1
    }

    setSocketId(_socketId) {
        this.socketId = _socketId

        _const_js__WEBPACK_IMPORTED_MODULE_0__.im.setEid(this.socketId)
    }

    send(packet, ...data) {
        if (!this.isReady) return

        const binary = CBOR.encode([ packet, data ])

        this.webSocket.send(binary)
    }

    onMessage(packet, data) {
        this._callPacketListeners(packet, data)
    }

    onClose(event) {
        const reason = closeReasons[event.reason] || event.reason || "Disconnected"

        _const_js__WEBPACK_IMPORTED_MODULE_0__.ui.emit("show-disconnect", reason)
    }

    connect() {
        if (this.isReady) return

        return new Promise((resolve) => {
            this.webSocket = new WebSocket(WS_URL)
            this.webSocket.binaryType = "arraybuffer"

            this.webSocket.onopen = () => {
                resolve()

                this.emit("connection")
            }
        })
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Socket);

/***/ }),

/***/ "./public/frontend/network/socket/SocketAdapter.js":
/*!*********************************************************!*\
  !*** ./public/frontend/network/socket/SocketAdapter.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../utils/index.js */ "./utils/index.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../const.js */ "./public/frontend/const.js");
/* harmony import */ var _listeners_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./listeners/index.js */ "./public/frontend/network/socket/listeners/index.js");
/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../config.json */ "./config.json");
/* harmony import */ var _items_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../items.json */ "./items.json");






const { packets } = _config_json__WEBPACK_IMPORTED_MODULE_3__

class SocketAdapter extends _utils_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].Emitter {
    constructor() {
        super()

        this._socket = null

        this.packetListeners = new Map()

        this.#initMessageListeners()
    }

    setSocket(_socket) {
        this._socket = _socket
    }

    sendEnterGame() {
        const nickname = _utils_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].formatString(_const_js__WEBPACK_IMPORTED_MODULE_1__.ui.gameNicknameInput.value, _config_json__WEBPACK_IMPORTED_MODULE_3__.maxNicknameLength)
        const skinIndex = 0

        this._socket.send(packets.ENTER_GAME, nickname, skinIndex)
    }

    sendWatchAngle(_angle) {
        if (!_const_js__WEBPACK_IMPORTED_MODULE_1__.im.isPlaying) return

        this._socket.send(packets.WATCH_ANGLE, _angle)
    }

    sendMoveAngle(_angle) {
        if (!_const_js__WEBPACK_IMPORTED_MODULE_1__.im.isPlaying) return

        this._socket.send(packets.MOVE_ANGLE, _angle)
    }

    sendAttackState(_state) {
        if (!_const_js__WEBPACK_IMPORTED_MODULE_1__.im.isPlaying) return
        if (typeof _state !== 'boolean') return

        this._socket.send(packets.ATTACK_STATE, _state)
    }

    sendChatMessage(message) {
        if (!_const_js__WEBPACK_IMPORTED_MODULE_1__.im.isPlaying) return
        if (typeof message !== 'string') return

        if (!_const_js__WEBPACK_IMPORTED_MODULE_1__.im.isAdmin) {
            message = _utils_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].formatString(message, _config_json__WEBPACK_IMPORTED_MODULE_3__.maxChatMessageLength, "", false)
        } else {
            if (message === "/toggle_agrid") {
                if (typeof _const_js__WEBPACK_IMPORTED_MODULE_1__.im.adminGridState === 'undefined') {
                    _const_js__WEBPACK_IMPORTED_MODULE_1__.im.adminGridState = false
                }

                return (_const_js__WEBPACK_IMPORTED_MODULE_1__.im.adminGridState = !_const_js__WEBPACK_IMPORTED_MODULE_1__.im.adminGridState)
            }
        }

        if (!message.length || message == " ") return

        this._socket.send(packets.CHAT_MESSAGE, message)
    }

    sendSelectItem(isWeapon, itemId) {
        if (!_const_js__WEBPACK_IMPORTED_MODULE_1__.im.isPlaying) return
        if (typeof isWeapon !== 'boolean') return
        if (typeof itemId !== 'number') return
        if (!_const_js__WEBPACK_IMPORTED_MODULE_1__.im.inventory[isWeapon ? "weapons" : "items"].includes(itemId) && itemId !== -1) return
        
        this._socket.send(packets.SELECT_ITEM, isWeapon, itemId)
    }

    sendUseItem() {
        if (!_const_js__WEBPACK_IMPORTED_MODULE_1__.im.isPlaying) return

        this._socket.send(packets.USE_ITEM, _const_js__WEBPACK_IMPORTED_MODULE_1__.im.renderDir)
    }

    sendAutoAttack() {
        if (!_const_js__WEBPACK_IMPORTED_MODULE_1__.im.isPlaying) return

        this._socket.send(packets.AUTO_ATTACK)
    }

    sendSelectUpgrade(isWeapon, itemId) {
        if (!_const_js__WEBPACK_IMPORTED_MODULE_1__.im.isPlaying) return
        if (typeof isWeapon !== 'boolean') return
        if (typeof itemId !== 'number') return

        this._socket.send(packets.SELECT_UPGRADE, isWeapon, itemId)        
    }

    sendSelectEquipment(hatId) {
        if (typeof hatId !== 'number') return
        if (!_items_json__WEBPACK_IMPORTED_MODULE_4__.hats[hatId]) return

        const hat = _items_json__WEBPACK_IMPORTED_MODULE_4__.hats[hatId]

        if (hat.cost && !_const_js__WEBPACK_IMPORTED_MODULE_1__.im.hats[hat.id]) {
            if (_const_js__WEBPACK_IMPORTED_MODULE_1__.im.resources.gold < hat.cost) return
        }

        this._socket.send(packets.SELECT_EQUIPMENT, hatId)

        _const_js__WEBPACK_IMPORTED_MODULE_1__.im.hats[hat.id] = true
    }

    sendPing() {
        this._socket.send(packets.PING)

        _const_js__WEBPACK_IMPORTED_MODULE_1__.network.lastPingSent = Date.now()
    }

    sendAFKState(_isAFK) {
        if (!_const_js__WEBPACK_IMPORTED_MODULE_1__.im.isPlaying) return
        if (typeof _isAFK !== 'boolean') return

        this._socket.send(packets.AFK_STATE, _isAFK)
    }

    onPacket(packetId, listener) {
        if (!this.packetListeners.has(packetId)) {
            this.packetListeners.set(packetId, new Map())
        }

        const events = this.packetListeners.get(packetId)
        const id = listener.toString()

        events.set(id, listener)

        return {
            id, listener,
            delete() {
                return events.delete(id)
            }
        }
    }

    _callPacketListeners(packetId, content) {
        const events = this.packetListeners.get(packetId)

        if (!events?.size) return

        events.forEach((listener) => {
            listener(...content)
        })
    }

    #initMessageListeners() {
        for (const packetName in _listeners_index_js__WEBPACK_IMPORTED_MODULE_2__["default"]) {
            this.onPacket(packetName, _listeners_index_js__WEBPACK_IMPORTED_MODULE_2__["default"][packetName])
        }
    }
}

/* harmony default export */ __webpack_exports__["default"] = (SocketAdapter);

/***/ }),

/***/ "./public/frontend/network/socket/listeners/animals/onAddAnimal.js":
/*!*************************************************************************!*\
  !*** ./public/frontend/network/socket/listeners/animals/onAddAnimal.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../const.js */ "./public/frontend/const.js");


function onAddAnimal(data) {
    _const_js__WEBPACK_IMPORTED_MODULE_0__.animals.addAnimal(...data)
}

/* harmony default export */ __webpack_exports__["default"] = (onAddAnimal);

/***/ }),

/***/ "./public/frontend/network/socket/listeners/animals/onRemoveAnimal.js":
/*!****************************************************************************!*\
  !*** ./public/frontend/network/socket/listeners/animals/onRemoveAnimal.js ***!
  \****************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../const.js */ "./public/frontend/const.js");


function onRemoveAnimal(eid) {
    _const_js__WEBPACK_IMPORTED_MODULE_0__.animals.delete(eid)
}

/* harmony default export */ __webpack_exports__["default"] = (onRemoveAnimal);

/***/ }),

/***/ "./public/frontend/network/socket/listeners/animals/onUpdateAnimals.js":
/*!*****************************************************************************!*\
  !*** ./public/frontend/network/socket/listeners/animals/onUpdateAnimals.js ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../const.js */ "./public/frontend/const.js");


function onUpdateAnimals(data) {
    const offset = data[0]
    const currentTime = Date.now()

    data = data.slice(1, data.length)

    for (let i = 0; i < data.length; i += offset) {
        const chunk = data.slice(i, i + offset)
        const [ eid, x, y, dir, renderLayer ] = chunk
        const animal = _const_js__WEBPACK_IMPORTED_MODULE_0__.animals.get(eid)

        if (!animal) continue

        // UPDATE TIME:
        animal.updateRate = 0
        animal.oldUpdateTime = (animal.updateTime === null) ? currentTime : animal.updateTime
        animal.updateTime = currentTime

        // POSITION:
        animal.oldTickPosition.set(animal.x, animal.y)
        animal.tickPosition.set(x, y)

        // DIR:
        animal.oldTickDir = animal.tickDir
        animal.tickDir = dir

        // LAYER:
        animal.renderLayer = renderLayer
    }
}

/* harmony default export */ __webpack_exports__["default"] = (onUpdateAnimals);

/***/ }),

/***/ "./public/frontend/network/socket/listeners/game_objects/onAddGameObject.js":
/*!**********************************************************************************!*\
  !*** ./public/frontend/network/socket/listeners/game_objects/onAddGameObject.js ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../const.js */ "./public/frontend/const.js");


function onAddGameObject(data) {
    if (data[0]) return _const_js__WEBPACK_IMPORTED_MODULE_0__.gameObjects.addItemObject(...data.slice(1))

    _const_js__WEBPACK_IMPORTED_MODULE_0__.gameObjects.addResourceObject(...data.slice(1))
}

/* harmony default export */ __webpack_exports__["default"] = (onAddGameObject);

/***/ }),

/***/ "./public/frontend/network/socket/listeners/game_objects/onGameObjectWiggle.js":
/*!*************************************************************************************!*\
  !*** ./public/frontend/network/socket/listeners/game_objects/onGameObjectWiggle.js ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../const.js */ "./public/frontend/const.js");


function onGameObjectWiggle(eid, angle) {
    _const_js__WEBPACK_IMPORTED_MODULE_0__.gameObjects.get(eid).doWiggle(10, angle)
}

/* harmony default export */ __webpack_exports__["default"] = (onGameObjectWiggle);

/***/ }),

/***/ "./public/frontend/network/socket/listeners/game_objects/onRemoveGameObject.js":
/*!*************************************************************************************!*\
  !*** ./public/frontend/network/socket/listeners/game_objects/onRemoveGameObject.js ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../const.js */ "./public/frontend/const.js");


function onRemoveGameObject(eid) {
    _const_js__WEBPACK_IMPORTED_MODULE_0__.gameObjects.delete(eid)
}

/* harmony default export */ __webpack_exports__["default"] = (onRemoveGameObject);

/***/ }),

/***/ "./public/frontend/network/socket/listeners/hud/onChangeResource.js":
/*!**************************************************************************!*\
  !*** ./public/frontend/network/socket/listeners/hud/onChangeResource.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../const.js */ "./public/frontend/const.js");


function onChangeResource(type, value) {
    _const_js__WEBPACK_IMPORTED_MODULE_0__.im.setResource(type, value)
    _const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui[`${type}Text`].setHtml(value)
}

/* harmony default export */ __webpack_exports__["default"] = (onChangeResource);

/***/ }),

/***/ "./public/frontend/network/socket/listeners/hud/onChangeXp.js":
/*!********************************************************************!*\
  !*** ./public/frontend/network/socket/listeners/hud/onChangeXp.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../const.js */ "./public/frontend/const.js");


function onChangeXp(xp, maxXp, age) {
    if (typeof maxXp !== 'undefined' && typeof age !== 'undefined') {
        _const_js__WEBPACK_IMPORTED_MODULE_0__.im.maxXp = maxXp
        _const_js__WEBPACK_IMPORTED_MODULE_0__.im.age = age
        _const_js__WEBPACK_IMPORTED_MODULE_0__.im.xp = 0

        return _const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.updateAgeBar(0, _const_js__WEBPACK_IMPORTED_MODULE_0__.im.age)
    }

    _const_js__WEBPACK_IMPORTED_MODULE_0__.im.xp = xp

    _const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.updateAgeBar((_const_js__WEBPACK_IMPORTED_MODULE_0__.im.xp / _const_js__WEBPACK_IMPORTED_MODULE_0__.im.maxXp) * 100, _const_js__WEBPACK_IMPORTED_MODULE_0__.im.age)
}

/* harmony default export */ __webpack_exports__["default"] = (onChangeXp);

/***/ }),

/***/ "./public/frontend/network/socket/listeners/hud/onUpdateInventory.js":
/*!***************************************************************************!*\
  !*** ./public/frontend/network/socket/listeners/hud/onUpdateInventory.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../const.js */ "./public/frontend/const.js");


function onUpdateInventory(inventory) {
    _const_js__WEBPACK_IMPORTED_MODULE_0__.im.inventory = inventory

    _const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.updateInventoryBar(_const_js__WEBPACK_IMPORTED_MODULE_0__.im.inventory)
}

/* harmony default export */ __webpack_exports__["default"] = (onUpdateInventory);

/***/ }),

/***/ "./public/frontend/network/socket/listeners/hud/onUpdateLeaderboard.js":
/*!*****************************************************************************!*\
  !*** ./public/frontend/network/socket/listeners/hud/onUpdateLeaderboard.js ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../const.js */ "./public/frontend/const.js");


function getLeaderboardItemHtml(index, nickname, gold, isIm) {
    return `
    <box class="leaderboard-item">
        <span class="${isIm ? "default" : "gray"}-text">${index}. ${nickname}</span>
        <span class="default-text">${gold}</span>
    </box>
    `
}

function onUpdateLeaderboard(data) {
    _const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.leaderboardContainer.clearHtml()

    for (let i = 0, index = 1; i < data.length; i += 3) {
        const chunk = data.slice(i, i + 3)
        const [ eid, nickname, gold ] = chunk
        const leaderboardItemHtml = getLeaderboardItemHtml(index, `${_const_js__WEBPACK_IMPORTED_MODULE_0__.im.isAdmin ? `[${eid}]` : ""}${nickname}`, gold, eid === _const_js__WEBPACK_IMPORTED_MODULE_0__.im.eid)

        _const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.leaderboardContainer.addHtml(leaderboardItemHtml)

        index += 1
    }
}

/* harmony default export */ __webpack_exports__["default"] = (onUpdateLeaderboard);

/***/ }),

/***/ "./public/frontend/network/socket/listeners/hud/onUpdateUpgrades.js":
/*!**************************************************************************!*\
  !*** ./public/frontend/network/socket/listeners/hud/onUpdateUpgrades.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../const.js */ "./public/frontend/const.js");


function onUpdateUpgrades(upgrades, upgradesCount) {
    _const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.updateUpgradesBar(upgrades, upgradesCount)
}

/* harmony default export */ __webpack_exports__["default"] = (onUpdateUpgrades);

/***/ }),

/***/ "./public/frontend/network/socket/listeners/index.js":
/*!***********************************************************!*\
  !*** ./public/frontend/network/socket/listeners/index.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../config.json */ "./config.json");
/* harmony import */ var _animals_onAddAnimal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./animals/onAddAnimal.js */ "./public/frontend/network/socket/listeners/animals/onAddAnimal.js");
/* harmony import */ var _animals_onRemoveAnimal_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./animals/onRemoveAnimal.js */ "./public/frontend/network/socket/listeners/animals/onRemoveAnimal.js");
/* harmony import */ var _animals_onUpdateAnimals_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./animals/onUpdateAnimals.js */ "./public/frontend/network/socket/listeners/animals/onUpdateAnimals.js");
/* harmony import */ var _game_objects_onAddGameObject_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./game_objects/onAddGameObject.js */ "./public/frontend/network/socket/listeners/game_objects/onAddGameObject.js");
/* harmony import */ var _game_objects_onGameObjectWiggle_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./game_objects/onGameObjectWiggle.js */ "./public/frontend/network/socket/listeners/game_objects/onGameObjectWiggle.js");
/* harmony import */ var _game_objects_onRemoveGameObject_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./game_objects/onRemoveGameObject.js */ "./public/frontend/network/socket/listeners/game_objects/onRemoveGameObject.js");
/* harmony import */ var _hud_onChangeResource_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./hud/onChangeResource.js */ "./public/frontend/network/socket/listeners/hud/onChangeResource.js");
/* harmony import */ var _hud_onChangeXp_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./hud/onChangeXp.js */ "./public/frontend/network/socket/listeners/hud/onChangeXp.js");
/* harmony import */ var _hud_onUpdateInventory_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./hud/onUpdateInventory.js */ "./public/frontend/network/socket/listeners/hud/onUpdateInventory.js");
/* harmony import */ var _hud_onUpdateLeaderboard_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./hud/onUpdateLeaderboard.js */ "./public/frontend/network/socket/listeners/hud/onUpdateLeaderboard.js");
/* harmony import */ var _hud_onUpdateUpgrades_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./hud/onUpdateUpgrades.js */ "./public/frontend/network/socket/listeners/hud/onUpdateUpgrades.js");
/* harmony import */ var _players_onAFKState_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./players/onAFKState.js */ "./public/frontend/network/socket/listeners/players/onAFKState.js");
/* harmony import */ var _players_onAddPlayer_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./players/onAddPlayer.js */ "./public/frontend/network/socket/listeners/players/onAddPlayer.js");
/* harmony import */ var _players_onAttackAnimation_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./players/onAttackAnimation.js */ "./public/frontend/network/socket/listeners/players/onAttackAnimation.js");
/* harmony import */ var _players_onChangeHealth_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./players/onChangeHealth.js */ "./public/frontend/network/socket/listeners/players/onChangeHealth.js");
/* harmony import */ var _players_onKillPlayer_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./players/onKillPlayer.js */ "./public/frontend/network/socket/listeners/players/onKillPlayer.js");
/* harmony import */ var _players_onReceiveChatMessage_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./players/onReceiveChatMessage.js */ "./public/frontend/network/socket/listeners/players/onReceiveChatMessage.js");
/* harmony import */ var _players_onRemovePlayer_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./players/onRemovePlayer.js */ "./public/frontend/network/socket/listeners/players/onRemovePlayer.js");
/* harmony import */ var _players_onUpdateItemsCount_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./players/onUpdateItemsCount.js */ "./public/frontend/network/socket/listeners/players/onUpdateItemsCount.js");
/* harmony import */ var _players_onUpdatePlayers_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./players/onUpdatePlayers.js */ "./public/frontend/network/socket/listeners/players/onUpdatePlayers.js");
/* harmony import */ var _setup_onPingResponse_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./setup/onPingResponse.js */ "./public/frontend/network/socket/listeners/setup/onPingResponse.js");
/* harmony import */ var _setup_onSetup_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./setup/onSetup.js */ "./public/frontend/network/socket/listeners/setup/onSetup.js");
























const { packets } = _config_json__WEBPACK_IMPORTED_MODULE_0__
const messageListeners = {}

// SETUP:
messageListeners[packets.SETUP] = _setup_onSetup_js__WEBPACK_IMPORTED_MODULE_22__["default"]
messageListeners[packets.PING_RESPONSE] = _setup_onPingResponse_js__WEBPACK_IMPORTED_MODULE_21__["default"]

// PLAYERS:
messageListeners[packets.ADD_PLAYER] = _players_onAddPlayer_js__WEBPACK_IMPORTED_MODULE_13__["default"]
messageListeners[packets.REMOVE_PLAYER] = _players_onRemovePlayer_js__WEBPACK_IMPORTED_MODULE_18__["default"]
messageListeners[packets.UPDATE_PLAYERS] = _players_onUpdatePlayers_js__WEBPACK_IMPORTED_MODULE_20__["default"]
messageListeners[packets.ATTACK_ANIMATION] = _players_onAttackAnimation_js__WEBPACK_IMPORTED_MODULE_14__["default"]
messageListeners[packets.CHANGE_HEALTH] = _players_onChangeHealth_js__WEBPACK_IMPORTED_MODULE_15__["default"]
messageListeners[packets.KILL_PLAYER] = _players_onKillPlayer_js__WEBPACK_IMPORTED_MODULE_16__["default"]
messageListeners[packets.RECEIVE_CHAT_MESSAGE] = _players_onReceiveChatMessage_js__WEBPACK_IMPORTED_MODULE_17__["default"]
messageListeners[packets.UPDATE_ITEMS_COUNT] = _players_onUpdateItemsCount_js__WEBPACK_IMPORTED_MODULE_19__["default"]
messageListeners[packets.AFK_STATE] = _players_onAFKState_js__WEBPACK_IMPORTED_MODULE_12__["default"]

// HUD:
messageListeners[packets.UPDATE_LEADERBOARD] = _hud_onUpdateLeaderboard_js__WEBPACK_IMPORTED_MODULE_10__["default"]
messageListeners[packets.CHANGE_RESOURCE] = _hud_onChangeResource_js__WEBPACK_IMPORTED_MODULE_7__["default"]
messageListeners[packets.CHANGE_XP] = _hud_onChangeXp_js__WEBPACK_IMPORTED_MODULE_8__["default"]
messageListeners[packets.UPDATE_INVENTORY] = _hud_onUpdateInventory_js__WEBPACK_IMPORTED_MODULE_9__["default"]
messageListeners[packets.UPDATE_UPGRADES] = _hud_onUpdateUpgrades_js__WEBPACK_IMPORTED_MODULE_11__["default"]

// GAME OBJECTS:
messageListeners[packets.ADD_GAMEOBJECT] = _game_objects_onAddGameObject_js__WEBPACK_IMPORTED_MODULE_4__["default"]
messageListeners[packets.REMOVE_GAMEOBJECT] = _game_objects_onRemoveGameObject_js__WEBPACK_IMPORTED_MODULE_6__["default"]
messageListeners[packets.GAMEOBJECT_WIGGLE] = _game_objects_onGameObjectWiggle_js__WEBPACK_IMPORTED_MODULE_5__["default"]

// ANIMALS:
messageListeners[packets.ADD_ANIMAL] = _animals_onAddAnimal_js__WEBPACK_IMPORTED_MODULE_1__["default"]
messageListeners[packets.REMOVE_ANIMAL] = _animals_onRemoveAnimal_js__WEBPACK_IMPORTED_MODULE_2__["default"]
messageListeners[packets.UPDATE_ANIMALS] = _animals_onUpdateAnimals_js__WEBPACK_IMPORTED_MODULE_3__["default"]


/* harmony default export */ __webpack_exports__["default"] = (messageListeners);

/***/ }),

/***/ "./public/frontend/network/socket/listeners/players/onAFKState.js":
/*!************************************************************************!*\
  !*** ./public/frontend/network/socket/listeners/players/onAFKState.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../const.js */ "./public/frontend/const.js");


function onAFKState(eid, _isAFK) {
    const player = _const_js__WEBPACK_IMPORTED_MODULE_0__.players.get(eid)

    if (!player) return

    player.isAFK = _isAFK
}

/* harmony default export */ __webpack_exports__["default"] = (onAFKState);

/***/ }),

/***/ "./public/frontend/network/socket/listeners/players/onAddPlayer.js":
/*!*************************************************************************!*\
  !*** ./public/frontend/network/socket/listeners/players/onAddPlayer.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../const.js */ "./public/frontend/const.js");
/* harmony import */ var _hud_onChangeResource_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../hud/onChangeResource.js */ "./public/frontend/network/socket/listeners/hud/onChangeResource.js");
/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../config.json */ "./config.json");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../utils/index.js */ "./utils/index.js");





function onAddPlayer(data, isIm, isRecreate) {
    const [ 
        eid, nickname, x, y,
        dir, scale, skinIndex, isAdmin, 
        health, maxHealth, isGodmode, isDeveloper
    ] = data
    
    if (isIm) {
        _const_js__WEBPACK_IMPORTED_MODULE_0__.im.nickname = nickname
        _const_js__WEBPACK_IMPORTED_MODULE_0__.im.dir = dir
        _const_js__WEBPACK_IMPORTED_MODULE_0__.im.scale = scale
        _const_js__WEBPACK_IMPORTED_MODULE_0__.im.skinIndex = skinIndex
        _const_js__WEBPACK_IMPORTED_MODULE_0__.im.health = health
        _const_js__WEBPACK_IMPORTED_MODULE_0__.im.maxHealth = maxHealth
        _const_js__WEBPACK_IMPORTED_MODULE_0__.im.isDeveloper = isDeveloper
        _const_js__WEBPACK_IMPORTED_MODULE_0__.im.isAdmin = isAdmin
        _const_js__WEBPACK_IMPORTED_MODULE_0__.im.isGodmode = isGodmode

        if (isRecreate) return

        _const_js__WEBPACK_IMPORTED_MODULE_0__.im.setPosition(x, y)

        _const_js__WEBPACK_IMPORTED_MODULE_0__.im.resources = _utils_index_js__WEBPACK_IMPORTED_MODULE_3__["default"].removeProto(_config_json__WEBPACK_IMPORTED_MODULE_2__.startResources)
        _const_js__WEBPACK_IMPORTED_MODULE_0__.im.inventory = _utils_index_js__WEBPACK_IMPORTED_MODULE_3__["default"].removeProto(_config_json__WEBPACK_IMPORTED_MODULE_2__.startInventory)
        _const_js__WEBPACK_IMPORTED_MODULE_0__.im.age = 1
        _const_js__WEBPACK_IMPORTED_MODULE_0__.im.xp = 0
        _const_js__WEBPACK_IMPORTED_MODULE_0__.im.maxXp = 300
        _const_js__WEBPACK_IMPORTED_MODULE_0__.im.isPlaying = true
        _const_js__WEBPACK_IMPORTED_MODULE_0__.im.isKilled = false
        _const_js__WEBPACK_IMPORTED_MODULE_0__.im.isCreated = true
        _const_js__WEBPACK_IMPORTED_MODULE_0__.im.isAttackAnimation = false
        _const_js__WEBPACK_IMPORTED_MODULE_0__.im.attackAnimationTimer = 0
        _const_js__WEBPACK_IMPORTED_MODULE_0__.im.attackAnimationRatio = 0
        _const_js__WEBPACK_IMPORTED_MODULE_0__.im.attackAnimationIndex = 0
        _const_js__WEBPACK_IMPORTED_MODULE_0__.im.attackAnimationTargetAngle = 0
        _const_js__WEBPACK_IMPORTED_MODULE_0__.clickWarp.active = false

        _const_js__WEBPACK_IMPORTED_MODULE_0__.im.recreateModels()
        _const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.updateAgeBar(0, _const_js__WEBPACK_IMPORTED_MODULE_0__.im.age)
        _const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.updateInventoryBar(_const_js__WEBPACK_IMPORTED_MODULE_0__.im.inventory)
        _const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.upgradesBarWeapons.setHtml("")
        _const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.upgradesBarItems.setHtml("")
        for (const type of [ "food", "wood", "stone", "gold" ]) (0,_hud_onChangeResource_js__WEBPACK_IMPORTED_MODULE_1__["default"])(type, 100)
    } else {
        _const_js__WEBPACK_IMPORTED_MODULE_0__.players.add(...data)
    }
}

/* harmony default export */ __webpack_exports__["default"] = (onAddPlayer);

/***/ }),

/***/ "./public/frontend/network/socket/listeners/players/onAttackAnimation.js":
/*!*******************************************************************************!*\
  !*** ./public/frontend/network/socket/listeners/players/onAttackAnimation.js ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../const.js */ "./public/frontend/const.js");


function onAttackAnimation(eid, isDidHit) {
    const player = _const_js__WEBPACK_IMPORTED_MODULE_0__.players.get(eid)

    if (!player) return

    player.startAttackAnimation(isDidHit)
}

/* harmony default export */ __webpack_exports__["default"] = (onAttackAnimation);

/***/ }),

/***/ "./public/frontend/network/socket/listeners/players/onChangeHealth.js":
/*!****************************************************************************!*\
  !*** ./public/frontend/network/socket/listeners/players/onChangeHealth.js ***!
  \****************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../const.js */ "./public/frontend/const.js");
/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../config.json */ "./config.json");



function onChangeHealth(eid, _health, isShowFadeText, isAnimal) {
    if (isAnimal) {
        const animal = _const_js__WEBPACK_IMPORTED_MODULE_0__.animals.get(eid)

        if (!animal) return
    
        const oldHealth = animal.health
    
        animal.setHealth(_health)
    
        const amount = animal.health - oldHealth
    
        return isShowFadeText && _const_js__WEBPACK_IMPORTED_MODULE_0__.fadeTexts.addFadeText(Math.abs(amount), animal.x, animal.y, 50, 0.18, 500, amount < 0 ? "#ffffff" : "#8ecc51")
    }
    
    const player = _const_js__WEBPACK_IMPORTED_MODULE_0__.players.get(eid)

    if (!player) return

    const oldHealth = player.health

    player.setHealth(_health)

    const amount = player.health - oldHealth

    if (amount < 0) {
        player.lastDamage = _config_json__WEBPACK_IMPORTED_MODULE_1__.player.damageTime
    }

    isShowFadeText && _const_js__WEBPACK_IMPORTED_MODULE_0__.fadeTexts.addFadeText(Math.abs(amount), player.x, player.y, 50, 0.18, 500, amount < 0 ? "#ffffff" : "#8ecc51")
}

/* harmony default export */ __webpack_exports__["default"] = (onChangeHealth);

/***/ }),

/***/ "./public/frontend/network/socket/listeners/players/onKillPlayer.js":
/*!**************************************************************************!*\
  !*** ./public/frontend/network/socket/listeners/players/onKillPlayer.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../const.js */ "./public/frontend/const.js");


function onKillPlayer() {    
    _const_js__WEBPACK_IMPORTED_MODULE_0__.im.weapons = [ 0 ]
    _const_js__WEBPACK_IMPORTED_MODULE_0__.im.weaponIndex = 0
    _const_js__WEBPACK_IMPORTED_MODULE_0__.im.attackAnimationTimer = _const_js__WEBPACK_IMPORTED_MODULE_0__.im.attackAnimationRatio = _const_js__WEBPACK_IMPORTED_MODULE_0__.im.attackAnimationIndex = _const_js__WEBPACK_IMPORTED_MODULE_0__.im.attackAnimationTargetAngle = 0
    _const_js__WEBPACK_IMPORTED_MODULE_0__.im.isAttackAnimation = false
    _const_js__WEBPACK_IMPORTED_MODULE_0__.im.isPlaying = false
    _const_js__WEBPACK_IMPORTED_MODULE_0__.im.isKilled = true

    _const_js__WEBPACK_IMPORTED_MODULE_0__.keys.clear()
    _const_js__WEBPACK_IMPORTED_MODULE_0__.deathText.setScale(0)
    _const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.emit("show-kill-elements")
}

/* harmony default export */ __webpack_exports__["default"] = (onKillPlayer);

/***/ }),

/***/ "./public/frontend/network/socket/listeners/players/onReceiveChatMessage.js":
/*!**********************************************************************************!*\
  !*** ./public/frontend/network/socket/listeners/players/onReceiveChatMessage.js ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../const.js */ "./public/frontend/const.js");
/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../config.json */ "./config.json");



function onReceiveChatMessage(eid, message) {
    const player = _const_js__WEBPACK_IMPORTED_MODULE_0__.players.get(eid)

    if (!player) return

    player.chatMessage = message
    player.chatMessageTimer = _config_json__WEBPACK_IMPORTED_MODULE_1__.chatMessageTimer
}

/* harmony default export */ __webpack_exports__["default"] = (onReceiveChatMessage);

/***/ }),

/***/ "./public/frontend/network/socket/listeners/players/onRemovePlayer.js":
/*!****************************************************************************!*\
  !*** ./public/frontend/network/socket/listeners/players/onRemovePlayer.js ***!
  \****************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../const.js */ "./public/frontend/const.js");


function onRemovePlayer(eid) {
    _const_js__WEBPACK_IMPORTED_MODULE_0__.players.remove(eid)
}

/* harmony default export */ __webpack_exports__["default"] = (onRemovePlayer);

/***/ }),

/***/ "./public/frontend/network/socket/listeners/players/onUpdateItemsCount.js":
/*!********************************************************************************!*\
  !*** ./public/frontend/network/socket/listeners/players/onUpdateItemsCount.js ***!
  \********************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../const.js */ "./public/frontend/const.js");


function onUpdateItemsCount(_itemsCount) {
    _const_js__WEBPACK_IMPORTED_MODULE_0__.im.itemsCount = _itemsCount
}

/* harmony default export */ __webpack_exports__["default"] = (onUpdateItemsCount);

/***/ }),

/***/ "./public/frontend/network/socket/listeners/players/onUpdatePlayers.js":
/*!*****************************************************************************!*\
  !*** ./public/frontend/network/socket/listeners/players/onUpdatePlayers.js ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../const.js */ "./public/frontend/const.js");


function onUpdatePlayers(data) {
    const offset = data[0]
    const currentTime = Date.now()

    data = data.slice(1, data.length)

    for (let i = 0; i < data.length; i += offset) {
        const chunk = data.slice(i, i + offset)
        const [ eid, x, y, dir, weaponIndex, itemIndex, hatIndex, renderLayer ] = chunk
        const player = _const_js__WEBPACK_IMPORTED_MODULE_0__.players.get(eid)

        if (!player) continue

        // UPDATE TIME:
        player.updateRate = 0
        player.oldUpdateTime = (player.updateTime === null) ? currentTime : player.updateTime
        player.updateTime = currentTime

        // POSITION:
        player.oldTickPosition.set(player.x, player.y)
        player.tickPosition.set(x, y)

        // DIR:
        player.oldTickDir = player.tickDir
        player.tickDir = dir

        // INDEXES:
        player.weaponIndex = weaponIndex
        player.itemIndex = itemIndex
        player.hatIndex = hatIndex

        // LAYERS:
        player.renderLayer = renderLayer
    }
}

/* harmony default export */ __webpack_exports__["default"] = (onUpdatePlayers);

/***/ }),

/***/ "./public/frontend/network/socket/listeners/setup/onPingResponse.js":
/*!**************************************************************************!*\
  !*** ./public/frontend/network/socket/listeners/setup/onPingResponse.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../const.js */ "./public/frontend/const.js");


function onPingResponse() {
    _const_js__WEBPACK_IMPORTED_MODULE_0__.network.ping = Date.now() - _const_js__WEBPACK_IMPORTED_MODULE_0__.network.lastPingSent
}

/* harmony default export */ __webpack_exports__["default"] = (onPingResponse);

/***/ }),

/***/ "./public/frontend/network/socket/listeners/setup/onSetup.js":
/*!*******************************************************************!*\
  !*** ./public/frontend/network/socket/listeners/setup/onSetup.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../const.js */ "./public/frontend/const.js");
/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../config.json */ "./config.json");
/* harmony import */ var _utils_2d_Vector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../utils/2d/Vector.js */ "./utils/2d/Vector.js");
/* harmony import */ var _renders_layers_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../renders/layers.json */ "./public/frontend/renders/layers.json");





let lastSystemInfoUpdate = null

function onSetup(socketId) {
    _const_js__WEBPACK_IMPORTED_MODULE_0__.network.socket.setSocketId(socketId)

    _const_js__WEBPACK_IMPORTED_MODULE_0__.renderer.add(1, {
        id: [ ...Object.values(_renders_layers_json__WEBPACK_IMPORTED_MODULE_3__) ].filter((layer) => layer.layer === 1).length + 1,
        _function: () => {
            if (!_const_js__WEBPACK_IMPORTED_MODULE_0__.im.isPlaying) return

            if (!lastSystemInfoUpdate || (Date.now() - lastSystemInfoUpdate) >= _config_json__WEBPACK_IMPORTED_MODULE_1__.updateSystemInfoTime) {
                _const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.pingText.setHtml(Math.round(_const_js__WEBPACK_IMPORTED_MODULE_0__.network.ping))
                _const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.fpsText.setHtml(Math.round(_const_js__WEBPACK_IMPORTED_MODULE_0__.renderer.fps))
                _const_js__WEBPACK_IMPORTED_MODULE_0__.network.socket.sendPing()

                lastSystemInfoUpdate = Date.now()
            }

            if (_const_js__WEBPACK_IMPORTED_MODULE_0__.im.isAdmin) {
                if (_const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.chatInput.getAttribute("maxlength") === "30") {
                    _const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.chatInput.setAttribute("maxlength", "9999")
                }
            } else {
                if (_const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.chatInput.getAttribute("maxlength") !== "30") {
                    _const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.chatInput.setAttribute("maxlength", "30")
                }
            }

            if (!_const_js__WEBPACK_IMPORTED_MODULE_0__.im.isLockWatchDir) {
                const mouseX = _const_js__WEBPACK_IMPORTED_MODULE_0__.mouse.x / _const_js__WEBPACK_IMPORTED_MODULE_0__.gameCanvas.scale
                const mouseY = _const_js__WEBPACK_IMPORTED_MODULE_0__.mouse.y / _const_js__WEBPACK_IMPORTED_MODULE_0__.gameCanvas.scale
                const playerPosition = new _utils_2d_Vector_js__WEBPACK_IMPORTED_MODULE_2__["default"](_const_js__WEBPACK_IMPORTED_MODULE_0__.im.render.x, _const_js__WEBPACK_IMPORTED_MODULE_0__.im.render.y)
                const mouseDir = parseFloat(playerPosition.angleTo(mouseX, mouseY))

                if (!_const_js__WEBPACK_IMPORTED_MODULE_0__.network.socket.lastSentWatchAngle || _const_js__WEBPACK_IMPORTED_MODULE_0__.renderer.nowUpdate - _const_js__WEBPACK_IMPORTED_MODULE_0__.network.socket.lastSentWatchAngle >= (1000 / _config_json__WEBPACK_IMPORTED_MODULE_1__.tickRateDiv - 1)) {                
                    if (_const_js__WEBPACK_IMPORTED_MODULE_0__.im.oldTickDir !== mouseDir) {
                        _const_js__WEBPACK_IMPORTED_MODULE_0__.network.socket.sendWatchAngle(mouseDir)
            
                        _const_js__WEBPACK_IMPORTED_MODULE_0__.network.socket.lastSentWatchAngle = _const_js__WEBPACK_IMPORTED_MODULE_0__.renderer.nowUpdate
                    }
                }

                _const_js__WEBPACK_IMPORTED_MODULE_0__.im.mouseAngle = mouseDir
            }

            if (_const_js__WEBPACK_IMPORTED_MODULE_0__.ui.isInputFocused()) return

            const clone = _const_js__WEBPACK_IMPORTED_MODULE_0__.im.clone
            const left = _const_js__WEBPACK_IMPORTED_MODULE_0__.keys.get(_config_json__WEBPACK_IMPORTED_MODULE_1__.keys.left)
            const right = _const_js__WEBPACK_IMPORTED_MODULE_0__.keys.get(_config_json__WEBPACK_IMPORTED_MODULE_1__.keys.right)
            const up = _const_js__WEBPACK_IMPORTED_MODULE_0__.keys.get(_config_json__WEBPACK_IMPORTED_MODULE_1__.keys.up)
            const down = _const_js__WEBPACK_IMPORTED_MODULE_0__.keys.get(_config_json__WEBPACK_IMPORTED_MODULE_1__.keys.down)
            const xDir = left && !right ? -1 : !left && right ? 1 : 0
            const yDir = up && !down ? -1 : !up && down ? 1 : 0

            if (xDir !== 0 || yDir !== 0) {
                clone.position.add(xDir, yDir)
                clone.updatePhysics()
    
                const moveAngle = _const_js__WEBPACK_IMPORTED_MODULE_0__.im.angleTo(clone)

                if (moveAngle != _const_js__WEBPACK_IMPORTED_MODULE_0__.im.moveAngle) {
                    _const_js__WEBPACK_IMPORTED_MODULE_0__.network.socket.sendMoveAngle(moveAngle)
                }

                _const_js__WEBPACK_IMPORTED_MODULE_0__.im.moveAngle = moveAngle
            } else if (_const_js__WEBPACK_IMPORTED_MODULE_0__.im.moveAngle !== null) {
                _const_js__WEBPACK_IMPORTED_MODULE_0__.network.socket.sendMoveAngle(null)

                _const_js__WEBPACK_IMPORTED_MODULE_0__.im.moveAngle = null
            }
        }
    })
    
    _const_js__WEBPACK_IMPORTED_MODULE_0__.renderer.add(3, {
        id: [ ...Object.values(_renders_layers_json__WEBPACK_IMPORTED_MODULE_3__) ].filter((layer) => layer.layer === 3).length + 1,
        _function: () => {
            if (_const_js__WEBPACK_IMPORTED_MODULE_0__.im.isAdmin && _const_js__WEBPACK_IMPORTED_MODULE_0__.clickWarp.active) {
                const scale = 40

                _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.save()
                _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.strokeStyle = _config_json__WEBPACK_IMPORTED_MODULE_1__.darkGeneralStroke
                _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.lineWidth = _config_json__WEBPACK_IMPORTED_MODULE_1__.generalStrokeWidth
                _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.fillStyle = "#ffffff"
                _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.globalAlpha = .5

                _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.translate(_const_js__WEBPACK_IMPORTED_MODULE_0__.clickWarp.x - _const_js__WEBPACK_IMPORTED_MODULE_0__.camera.xOffset, _const_js__WEBPACK_IMPORTED_MODULE_0__.clickWarp.y - _const_js__WEBPACK_IMPORTED_MODULE_0__.camera.yOffset)
                _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.rotate(_const_js__WEBPACK_IMPORTED_MODULE_0__.clickWarp.renderRotation)
                _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.drawBlob(_const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx, 6, scale, .7 * scale, false)
                _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.fill()
                _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.stroke()

                _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.fillStyle = _config_json__WEBPACK_IMPORTED_MODULE_1__.darkGeneralStroke

                _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.drawBlob(_const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx, 6, scale / 4, .7 * scale / 4, false)
                _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.fill()
                _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.restore()

                _const_js__WEBPACK_IMPORTED_MODULE_0__.clickWarp.renderRotation += .0005 * _const_js__WEBPACK_IMPORTED_MODULE_0__.renderer.delta
            }
        }
    })
}

/* harmony default export */ __webpack_exports__["default"] = (onSetup);

/***/ }),

/***/ "./public/frontend/renders/Camera.js":
/*!*******************************************!*\
  !*** ./public/frontend/renders/Camera.js ***!
  \*******************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/index.js */ "./utils/index.js");
/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../config.json */ "./config.json");
/* harmony import */ var _layers_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layers.json */ "./public/frontend/renders/layers.json");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../const.js */ "./public/frontend/const.js");





class Camera extends _utils_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].Point {
    constructor() {
        super(0, 0, 0, 0)

        this.id = _layers_json__WEBPACK_IMPORTED_MODULE_2__.camera.id
        this.layer = _layers_json__WEBPACK_IMPORTED_MODULE_2__.camera.layer

        this.distance = 0
        this.angle = 0
        this.speed = 0

        this.xOffset = 0
        this.yOffset = 0

        _const_js__WEBPACK_IMPORTED_MODULE_3__.renderer.add(this.layer, {
            id: this.id,
            _function: this.update.bind(this)
        })

    }

    follow(target) {
        this.distance = this.distanceTo(target)
        this.angle = this.angleTo(target)
        this.speed = Math.min(this.distance * .01 * _const_js__WEBPACK_IMPORTED_MODULE_3__.renderer.delta, this.distance)

        if (this.distance > .05) {
            this.x += this.speed * Math.cos(this.angle)
            this.y += this.speed * Math.sin(this.angle)

            return
        }

        this.setTo(target.x, target.y)
    }

    update() {
        const mapMiddleX = _config_json__WEBPACK_IMPORTED_MODULE_1__.map.width / 2
        const mapMiddleY = _config_json__WEBPACK_IMPORTED_MODULE_1__.map.height / 2

        if (_const_js__WEBPACK_IMPORTED_MODULE_3__.im.isPlaying || _const_js__WEBPACK_IMPORTED_MODULE_3__.im.isKilled) {
            this.follow(_const_js__WEBPACK_IMPORTED_MODULE_3__.im)
        } else {
            this.setTo(
                mapMiddleX,
                mapMiddleY
            )
        }

        this.xOffset = this.x - _const_js__WEBPACK_IMPORTED_MODULE_3__.gameCanvas.scaledWidth / 2
        this.yOffset = this.y - _const_js__WEBPACK_IMPORTED_MODULE_3__.gameCanvas.scaledHeight / 2
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Camera);

/***/ }),

/***/ "./public/frontend/renders/Renderer.js":
/*!*********************************************!*\
  !*** ./public/frontend/renders/Renderer.js ***!
  \*********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../const.js */ "./public/frontend/const.js");


class Renderer {
    constructor() {
        this.fps = 0
        this.delta = 0

        this.layers = new Map([
            [ 1, new Map() ], // Systems, backgrounds, grids...
            [ 2, new Map() ], // Entities
            [ 3, new Map() ]  // ESP and others...
        ])

        this.nowUpdate = 0
        this.lastUpdate = Date.now()

        this.update()
    }

    add(layer, { id, _function }) {
        return this.layers.get(layer).set(id, {
            layer: layer,
            id: id,
            _function: _function,
        })
    }

    remove(layer, id) {
        this.layers.get(layer).delete(id)
    }

    update() {
        this.nowUpdate = Date.now()
        this.fps += (1000 / Math.max(Date.now() - this.lastUpdate, 1) - this.fps) / 10
        this.delta = this.nowUpdate - this.lastUpdate
        this.lastUpdate = this.nowUpdate

        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.clearRect(0, 0, _const_js__WEBPACK_IMPORTED_MODULE_0__.gameCanvas.scaledWidth, _const_js__WEBPACK_IMPORTED_MODULE_0__.gameCanvas.scaledHeight)

        this.layers.forEach((layer) => {
            const layerArray = [ ...layer.values() ]

            for (let i = 0; i < layerArray.length; i++) {
                layer.get(i + 1)._function(this.delta)
            }
        })

        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.save()
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.fillStyle = "rgba(0, 0, 70, 0.35)"

        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.fillRect(0, 0, _const_js__WEBPACK_IMPORTED_MODULE_0__.gameCanvas.scaledWidth, _const_js__WEBPACK_IMPORTED_MODULE_0__.gameCanvas.scaledHeight)
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.restore()

        requestAnimationFrame(this.update.bind(this))
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Renderer);

/***/ }),

/***/ "./public/frontend/renders/components/Background.js":
/*!**********************************************************!*\
  !*** ./public/frontend/renders/components/Background.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../const.js */ "./public/frontend/const.js");
/* harmony import */ var _layers_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../layers.json */ "./public/frontend/renders/layers.json");
/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../config.json */ "./config.json");




const { biomes } = _config_json__WEBPACK_IMPORTED_MODULE_2__

class Background {
    constructor() {
        this.id = _layers_json__WEBPACK_IMPORTED_MODULE_1__.background.id
        this.layer = _layers_json__WEBPACK_IMPORTED_MODULE_1__.background.layer

        this.riverWaterMult = 1
        this.riverWaterSide = 0

        _const_js__WEBPACK_IMPORTED_MODULE_0__.renderer.add(this.layer, {
            id: this.id,
            _function: this.render.bind(this)
        })
    }

    get width() {
        return _const_js__WEBPACK_IMPORTED_MODULE_0__.gameCanvas.scaledWidth
    }

    get height() {
        return _const_js__WEBPACK_IMPORTED_MODULE_0__.gameCanvas.scaledHeight
    }

    drawGrass(callback) {
        const { grass } = biomes

        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.save()
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.fillStyle = grass.fill

        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.fillRect(0, 0, this.width, this.height)
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.restore()

        callback instanceof Function && callback()
    }

    drawCoast(callback) {
        const { river } = biomes
        const riverHeight = river.height + river.padding
        const y = (_config_json__WEBPACK_IMPORTED_MODULE_2__.map.height / 2) - _const_js__WEBPACK_IMPORTED_MODULE_0__.camera.yOffset - (riverHeight / 2)

        if (y < this.height && y + riverHeight > 0) {
            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.save()
            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.fillStyle = river.fills[0]

            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.fillRect(0, y, this.width, riverHeight)
            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.restore()

            callback instanceof Function && callback()
        }
    }

    drawRiver(callback) {
        const { river } = biomes

        this.riverWaterMult += this.riverWaterSide * river.waveSpeed * _const_js__WEBPACK_IMPORTED_MODULE_0__.renderer.delta

        if (this.riverWaterMult >= river.waveMax) {
            this.riverWaterMult = river.waveMax
            this.riverWaterSide = -1
        } else if (this.riverWaterMult <= 1) {
            this.riverWaterMult = this.riverWaterSide = 1
        }

        const riverHeight = river.height + (this.riverWaterMult - 1) * 250
        const y = (_config_json__WEBPACK_IMPORTED_MODULE_2__.map.height / 2) - _const_js__WEBPACK_IMPORTED_MODULE_0__.camera.yOffset - (riverHeight / 2)

        if (y < this.height && y + riverHeight > 0) {
            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.save()
            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.fillStyle = river.fills[1]

            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.fillRect(0, y, this.width, riverHeight)
            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.restore()

            callback instanceof Function && callback()
        }
    }

    render() {
        this.drawGrass()
        
        if (_const_js__WEBPACK_IMPORTED_MODULE_0__.im.isPlaying || _const_js__WEBPACK_IMPORTED_MODULE_0__.im.isKilled) {
            this.drawCoast(this.drawRiver.bind(this))
        }
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Background);

/***/ }),

/***/ "./public/frontend/renders/components/Boundings.js":
/*!*********************************************************!*\
  !*** ./public/frontend/renders/components/Boundings.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../const.js */ "./public/frontend/const.js");
/* harmony import */ var _layers_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../layers.json */ "./public/frontend/renders/layers.json");
/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../config.json */ "./config.json");




class Boundings {
    constructor() {
        this.id = _layers_json__WEBPACK_IMPORTED_MODULE_1__.boundings.id
        this.layer = _layers_json__WEBPACK_IMPORTED_MODULE_1__.boundings.layer

        _const_js__WEBPACK_IMPORTED_MODULE_0__.renderer.add(this.layer, {
            id: this.id,
            _function: this.render.bind(this)
        })
    }

    render() {
        const width = _const_js__WEBPACK_IMPORTED_MODULE_0__.gameCanvas.scaledWidth
        const height = _const_js__WEBPACK_IMPORTED_MODULE_0__.gameCanvas.scaledHeight

        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.save()
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.fillStyle = _config_json__WEBPACK_IMPORTED_MODULE_2__.boundings.fill
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.globalAlpha = _config_json__WEBPACK_IMPORTED_MODULE_2__.boundings.alpha

        if (_const_js__WEBPACK_IMPORTED_MODULE_0__.camera.xOffset <= 0) {
            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.fillRect(0, 0, -_const_js__WEBPACK_IMPORTED_MODULE_0__.camera.xOffset, height)
        }

        if (_config_json__WEBPACK_IMPORTED_MODULE_2__.map.width - _const_js__WEBPACK_IMPORTED_MODULE_0__.camera.xOffset <= width) {
            const tmpY = Math.max(0, -_const_js__WEBPACK_IMPORTED_MODULE_0__.camera.yOffset)
    
            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.fillRect(_config_json__WEBPACK_IMPORTED_MODULE_2__.map.width - _const_js__WEBPACK_IMPORTED_MODULE_0__.camera.xOffset, tmpY, width - (_config_json__WEBPACK_IMPORTED_MODULE_2__.map.width - _const_js__WEBPACK_IMPORTED_MODULE_0__.camera.xOffset), height - tmpY)
        }

        if (_const_js__WEBPACK_IMPORTED_MODULE_0__.camera.yOffset <= 0) {
            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.fillRect(-_const_js__WEBPACK_IMPORTED_MODULE_0__.camera.xOffset, 0, width + _const_js__WEBPACK_IMPORTED_MODULE_0__.camera.xOffset, -_const_js__WEBPACK_IMPORTED_MODULE_0__.camera.yOffset)
        }

        if (_config_json__WEBPACK_IMPORTED_MODULE_2__.map.height - _const_js__WEBPACK_IMPORTED_MODULE_0__.camera.yOffset <= height) {
            const tmpX = Math.max(0, -_const_js__WEBPACK_IMPORTED_MODULE_0__.camera.xOffset)
    
            let tmpMin = 0
    
            if (_config_json__WEBPACK_IMPORTED_MODULE_2__.map.width - _const_js__WEBPACK_IMPORTED_MODULE_0__.camera.xOffset <= width) {
                tmpMin = width - (_config_json__WEBPACK_IMPORTED_MODULE_2__.map.width - _const_js__WEBPACK_IMPORTED_MODULE_0__.camera.xOffset)
            }
    
            _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.fillRect(
                tmpX, _config_json__WEBPACK_IMPORTED_MODULE_2__.map.height - _const_js__WEBPACK_IMPORTED_MODULE_0__.camera.yOffset,
                (width - tmpX) - tmpMin,
                height - (_config_json__WEBPACK_IMPORTED_MODULE_2__.map.height - _const_js__WEBPACK_IMPORTED_MODULE_0__.camera.yOffset)
            )
        }

        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.restore()
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Boundings);

/***/ }),

/***/ "./public/frontend/renders/components/Bridge.js":
/*!******************************************************!*\
  !*** ./public/frontend/renders/components/Bridge.js ***!
  \******************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../const.js */ "./public/frontend/const.js");
/* harmony import */ var _layers_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../layers.json */ "./public/frontend/renders/layers.json");
/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../config.json */ "./config.json");




class Bridge {
    constructor() {
        this.id = _layers_json__WEBPACK_IMPORTED_MODULE_1__.bridge.id
        this.layer = _layers_json__WEBPACK_IMPORTED_MODULE_1__.bridge.layer

        this.boardHeight = 25

        _const_js__WEBPACK_IMPORTED_MODULE_0__.renderer.add(this.layer, {
            id: this.id,
            _function: this.render.bind(this)
        })
    }

    get x() {
        return _config_json__WEBPACK_IMPORTED_MODULE_2__.map.width / 2
    }

    get y() {
        return _config_json__WEBPACK_IMPORTED_MODULE_2__.map.height / 2
    }

    get startX() {
        return this.x - this.width / 2
    }

    get startY() {
        return this.y - this.height / 2
    }

    get endX() {
        return this.x + this.width / 2
    }

    get endY() {
        return this.y + this.height / 2
    }

    get width() {
        return _config_json__WEBPACK_IMPORTED_MODULE_2__.bridge.width
    }

    get height() {
        return _config_json__WEBPACK_IMPORTED_MODULE_2__.biomes.river.height + _config_json__WEBPACK_IMPORTED_MODULE_2__.biomes.river.padding + _config_json__WEBPACK_IMPORTED_MODULE_2__.bridge.paddingY
    }

    drawHandrail(side) {
        const width = this.width / _config_json__WEBPACK_IMPORTED_MODULE_2__.bridge.handrailSizeDiv
        const x = side === "left" ? this.startX : this.endX - width

        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.save()
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.fillStyle = _config_json__WEBPACK_IMPORTED_MODULE_2__.bridge.fills[0]
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.strokeStyle = _config_json__WEBPACK_IMPORTED_MODULE_2__.generalStroke
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.lineWidth = _config_json__WEBPACK_IMPORTED_MODULE_2__.generalStrokeWidth

        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.translate(x - _const_js__WEBPACK_IMPORTED_MODULE_0__.camera.xOffset, this.startY - _const_js__WEBPACK_IMPORTED_MODULE_0__.camera.yOffset)
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.beginPath()
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.roundRect(0, 0, width, this.height, 8)
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.fill()
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.stroke()

        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.fillStyle = _config_json__WEBPACK_IMPORTED_MODULE_2__.bridge.fills[1]

        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.beginPath()
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.roundRect(_config_json__WEBPACK_IMPORTED_MODULE_2__.bridge.handrailPadding, _config_json__WEBPACK_IMPORTED_MODULE_2__.bridge.handrailPadding, width - _config_json__WEBPACK_IMPORTED_MODULE_2__.bridge.handrailPadding * 2, this.height - _config_json__WEBPACK_IMPORTED_MODULE_2__.bridge.handrailPadding * 2, 7)
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.fill()
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.restore()
    }

    drawFastener(sideX, sideY) {
        const handrailWidth = this.width / _config_json__WEBPACK_IMPORTED_MODULE_2__.bridge.handrailSizeDiv
        const radius = this.width / (_config_json__WEBPACK_IMPORTED_MODULE_2__.bridge.handrailSizeDiv + 3)
        const x = sideX === "left" ? this.startX + handrailWidth / 2 : this.endX - handrailWidth / 2
        const y = sideY === "up" ? this.startY : this.endY

        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.save()
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.fillStyle = _config_json__WEBPACK_IMPORTED_MODULE_2__.bridge.fills[0]
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.strokeStyle = _config_json__WEBPACK_IMPORTED_MODULE_2__.generalStroke
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.lineWidth = _config_json__WEBPACK_IMPORTED_MODULE_2__.generalStrokeWidth

        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.translate(x - _const_js__WEBPACK_IMPORTED_MODULE_0__.camera.xOffset, y - _const_js__WEBPACK_IMPORTED_MODULE_0__.camera.yOffset)
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.beginPath()
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.arc(0, 0, radius, 0, Math.PI * 2)
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.fill()
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.stroke()

        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.fillStyle = _config_json__WEBPACK_IMPORTED_MODULE_2__.bridge.fills[1]

        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.beginPath()
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.arc(0, 0, radius / 2.25, 0, Math.PI * 2)
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.fill()
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.restore()
    }
    
    drawHandrails() {
        this.drawHandrail("left")
        this.drawHandrail("right")
        this.drawFastener("left", "up")
        this.drawFastener("left", "down")
        this.drawFastener("right", "up")
        this.drawFastener("right", "down")
    }

    drawBoard(offsetY) {
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.save()
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.fillStyle = _config_json__WEBPACK_IMPORTED_MODULE_2__.bridge.fills[0]
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.strokeStyle = _config_json__WEBPACK_IMPORTED_MODULE_2__.generalStroke
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.lineWidth = _config_json__WEBPACK_IMPORTED_MODULE_2__.generalStrokeWidth / 1.25

        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.translate(this.startX - _const_js__WEBPACK_IMPORTED_MODULE_0__.camera.xOffset, this.startY - _const_js__WEBPACK_IMPORTED_MODULE_0__.camera.yOffset)
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.beginPath()
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.roundRect(0, offsetY, this.width, this.boardHeight - _config_json__WEBPACK_IMPORTED_MODULE_2__.bridge.boardsGap, 6)
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.fill()
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.stroke()
        _const_js__WEBPACK_IMPORTED_MODULE_0__.gameContext.ctx.restore()
    }

    drawBoards() {
        for (let offsetY = this.boardHeight; offsetY < this.height - this.boardHeight; offsetY += this.boardHeight) {
            this.drawBoard(offsetY - _config_json__WEBPACK_IMPORTED_MODULE_2__.bridge.boardsGap / 2.5)
        }
    }

    render() {
        if (!_const_js__WEBPACK_IMPORTED_MODULE_0__.im.isPlaying && !_const_js__WEBPACK_IMPORTED_MODULE_0__.im.isKilled) return

        this.drawBoards()
        this.drawHandrails()
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Bridge);

/***/ }),

/***/ "./public/frontend/renders/components/DeathText.js":
/*!*********************************************************!*\
  !*** ./public/frontend/renders/components/DeathText.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _layers_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../layers.json */ "./public/frontend/renders/layers.json");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../const.js */ "./public/frontend/const.js");



class DeathText {
    constructor() {
        this.id = _layers_json__WEBPACK_IMPORTED_MODULE_0__.deathText.id
        this.layer = _layers_json__WEBPACK_IMPORTED_MODULE_0__.deathText.layer

        this.scale = this.maxScale = 120

        _const_js__WEBPACK_IMPORTED_MODULE_1__.renderer.add(this.layer, {
            id: this.id,
            _function: this.update.bind(this)
        })
    }

    get speed() {
        return 0.1 * _const_js__WEBPACK_IMPORTED_MODULE_1__.renderer.delta
    }

    get fontSize() {
        return Math.min(Math.round(this.scale), this.maxScale)
    }

    setScale(_scale) {
        this.scale = _scale
    }

    update() {
        if (this.scale >= this.maxScale) return (this.scale = this.maxScale)

        this.scale += this.speed

        _const_js__WEBPACK_IMPORTED_MODULE_1__.ui.gui.deathText.setFontSize(`${this.fontSize}px`)
    }
}

/* harmony default export */ __webpack_exports__["default"] = (DeathText);

/***/ }),

/***/ "./public/frontend/renders/components/Grid.js":
/*!****************************************************!*\
  !*** ./public/frontend/renders/components/Grid.js ***!
  \****************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../config.json */ "./config.json");
/* harmony import */ var _layers_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../layers.json */ "./public/frontend/renders/layers.json");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../const.js */ "./public/frontend/const.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../utils/index.js */ "./utils/index.js");





const { grid } = _config_json__WEBPACK_IMPORTED_MODULE_0__

class Grid {
    constructor() {
        this.id = _layers_json__WEBPACK_IMPORTED_MODULE_1__.grid.id
        this.layer = _layers_json__WEBPACK_IMPORTED_MODULE_1__.grid.layer

        _const_js__WEBPACK_IMPORTED_MODULE_2__.renderer.add(this.layer, {
            id: this.id,
            _function: this.render.bind(this)
        })
    }

    get width() {
        return _const_js__WEBPACK_IMPORTED_MODULE_2__.gameCanvas.scaledWidth
    }

    get height() {
        return _const_js__WEBPACK_IMPORTED_MODULE_2__.gameCanvas.scaledHeight
    }

    render() {
        if (_const_js__WEBPACK_IMPORTED_MODULE_2__.im.isAdmin && _const_js__WEBPACK_IMPORTED_MODULE_2__.im.adminGridState) {
            const cellSize = 200
            const gridSizeX = _config_json__WEBPACK_IMPORTED_MODULE_0__.map.width / cellSize
            const gridSizeY = _config_json__WEBPACK_IMPORTED_MODULE_0__.map.height / cellSize
    
            for (let x = 0; x < gridSizeX; x += 1) {
                for (let y = 0; y < gridSizeY; y += 1) {
                    const middleX = (cellSize * x) + cellSize / 2
                    const middleY = (cellSize * y) + cellSize / 2

                    if (!_const_js__WEBPACK_IMPORTED_MODULE_2__.im.isCanSee({ x: middleX, y: middleY, scale: 1 })) continue

                    _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.save()
                    _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.strokeStyle = "#6b54a0"
                    _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.globalAlpha = .4
    
                    _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.translate((cellSize * x) - _const_js__WEBPACK_IMPORTED_MODULE_2__.camera.xOffset, (cellSize * y) - _const_js__WEBPACK_IMPORTED_MODULE_2__.camera.yOffset)
                    _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.strokeRect(0, 0, cellSize, cellSize)
                    _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.restore()

                    const textModel = _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.createText({
                        "font": "18px Hammersmith One",
                        fill: "#ffffff",
                        alpha: .6,
                        stroke: _config_json__WEBPACK_IMPORTED_MODULE_0__.darkGeneralStroke,
                        strokeWidth: 4,
                        textBaseline: "middle",
                        textAlign: "center",
                        lineJoin: "round"
                    })

                    textModel.to(middleX - _const_js__WEBPACK_IMPORTED_MODULE_2__.camera.xOffset, middleY - _const_js__WEBPACK_IMPORTED_MODULE_2__.camera.yOffset).setText(`${x}_${y}`).draw()
                }
            }
        }

        _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.save()
        _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.globalAlpha = grid.alpha
        _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.strokeStyle = grid.stroke
        _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.lineWidth = grid.strokeWidth

        _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.beginPath()

        for (let x = -_const_js__WEBPACK_IMPORTED_MODULE_2__.camera.x; x < this.width; x += this.height / grid.divX) {
            if (x > 0) {
                _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.moveTo(x, 0)
                _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.lineTo(x, this.height)
            }
        }

        for (let y = -_const_js__WEBPACK_IMPORTED_MODULE_2__.camera.y; y < this.height; y += this.height / grid.divY) {
            if (y > 0) {
                _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.moveTo(0, y)
                _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.lineTo(this.width, y)
            }
        }

        _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.stroke()
        _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.ctx.restore()
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Grid);

/***/ }),

/***/ "./public/frontend/renders/components/Minimap.js":
/*!*******************************************************!*\
  !*** ./public/frontend/renders/components/Minimap.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../config.json */ "./config.json");
/* harmony import */ var _layers_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../layers.json */ "./public/frontend/renders/layers.json");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../const.js */ "./public/frontend/const.js");




class Minimap {
    constructor() {
        this.id = _layers_json__WEBPACK_IMPORTED_MODULE_1__.minimap.id
        this.layer = _layers_json__WEBPACK_IMPORTED_MODULE_1__.minimap.layer

        this.canvas = document.getElementById("minimap_canvas")
        this.context = this.canvas.getContext("2d")

        _const_js__WEBPACK_IMPORTED_MODULE_2__.renderer.add(this.layer, {
            id: this.id,
            _function: this.render.bind(this)
        })
    }

    get width() {
        return this.canvas.width
    }

    get height() {
        return this.canvas.height
    }

    render() {
        if (!_const_js__WEBPACK_IMPORTED_MODULE_2__.im.isPlaying) return

        this.context.clearRect(0, 0, this.width, this.height)

        this.context.save()
        this.context.fillStyle = "#ffffff"

        _const_js__WEBPACK_IMPORTED_MODULE_2__.gameContext.drawCircle(
            this.context,
            (_const_js__WEBPACK_IMPORTED_MODULE_2__.im.x / _config_json__WEBPACK_IMPORTED_MODULE_0__.map.width) * this.width, 
            (_const_js__WEBPACK_IMPORTED_MODULE_2__.im.y / _config_json__WEBPACK_IMPORTED_MODULE_0__.map.height) * this.height, 
            7, true
        )
        this.context.restore()
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Minimap);

/***/ }),

/***/ "./public/frontend/scene/Canvas.js":
/*!*****************************************!*\
  !*** ./public/frontend/scene/Canvas.js ***!
  \*****************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../const.js */ "./public/frontend/const.js");
/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../config.json */ "./config.json");



class Canvas {
    constructor() {
        this.view = _const_js__WEBPACK_IMPORTED_MODULE_0__.ui.get$("#game_canvas")
        this.context = this.view.getContext("2d")

        this.scale = 1

        this.resize()

        window.addEventListener("resize", this.resize.bind(this))
    }

    get scaledWidth() {
        return this.view.width / this.scale
    }

    get scaledHeight() {
        return this.view.height / this.scale
    }

    resize() {
        const { innerWidth, innerHeight } = window
        const { viewport } = _config_json__WEBPACK_IMPORTED_MODULE_1__
        const scale = Math.max(innerWidth / viewport.width, innerHeight / viewport.height)

        this.scale = scale
        this.view.width = innerWidth
        this.view.height = innerHeight
        this.view.style.width = `${innerWidth}px`
        this.view.style.height = `${innerHeight}px`

        this.context.scale(this.scale, this.scale)
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Canvas);

/***/ }),

/***/ "./public/frontend/scene/Context.js":
/*!******************************************!*\
  !*** ./public/frontend/scene/Context.js ***!
  \******************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/index.js */ "./utils/index.js");
/* harmony import */ var _models_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./models/index.js */ "./public/frontend/scene/models/index.js");



class Context {
    constructor(context) {
        this.ctx = context
    }

    create(Model, style) {
        return new Model(this.ctx, style)
    }

    createLine(style) {
        return this.create(_models_index_js__WEBPACK_IMPORTED_MODULE_1__.Line, style)
    }

    createText(style) {
        return this.create(_models_index_js__WEBPACK_IMPORTED_MODULE_1__.Text, style)
    }

    createRect(style) {
        return this.create(_models_index_js__WEBPACK_IMPORTED_MODULE_1__.Rect, style)
    }

    createCircle(style) {
        return this.create(_models_index_js__WEBPACK_IMPORTED_MODULE_1__.Circle, style)
    }
    
    createImage(style) {
        return this.create(_models_index_js__WEBPACK_IMPORTED_MODULE_1__._Image, style)
    }

    drawRect(context, x, y, width, height, stroke) {
        context.fillRect(x - (width / 2), y - (height / 2), width, height)
        !stroke && context.strokeRect(x - (width / 2), y - (height / 2), width, height)
    }

    drawCircle(context, x, y, scale, dontStroke, dontFill) {
        context.beginPath()
        context.arc(x, y, scale, 0, 2 * Math.PI)

        !dontFill && context.fill()
        !dontStroke && context.stroke()
    }

    drawStar(context, spikes, outer, inner) {
        const step = Math.PI / spikes

        let angle = Math.PI / 2 * 3
        let x = 0
        let y = 0
        
        context.beginPath()
        context.moveTo(0, -outer)

        for (let i = 0; i < spikes; i++) {
            x = Math.cos(angle) * outer
            y = Math.sin(angle) * outer

            context.lineTo(x, y)

            angle += step

            x = Math.cos(angle) * inner
            y = Math.sin(angle) * inner

            context.lineTo(x, y)
            
            angle += step
        }

        context.lineTo(0, -outer)
        context.closePath()
    }

    drawBlob(context, spikes, outer, inner, randomOuter = true) {
        const step = Math.PI / spikes

        let angle = Math.PI / 2 * 3
        let x = 0
        let y = 0
        let tmpOuter = 0

        context.beginPath()
        context.moveTo(0, -inner)

        for (let i = 0; i < spikes; i++) {
            tmpOuter = randomOuter ? _utils_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].randInt(outer + 0.9, outer * 1.2) : (outer + 0.9 + outer * 1.2) / 2

            context.quadraticCurveTo(
                Math.cos(angle + step) * tmpOuter, 
                Math.sin(angle + step) * tmpOuter,
                Math.cos(angle + (step * 2)) * inner, 
                Math.sin(angle + (step * 2)) * inner
            )

            angle += step * 2
        }

        context.lineTo(0, -inner)
        context.closePath()
    }

    drawLeaf(context, x, y, length, radius) {
        const endX = x + (length * Math.cos(radius))
        const endY = y + (length * Math.sin(radius))
        const width = length * 0.4

        context.moveTo(x, y)
        context.beginPath()
        context.quadraticCurveTo(
            ((x + endX) / 2) + (width * Math.cos(radius + Math.PI / 2)),
            ((y + endY) / 2) + (width * Math.sin(radius + Math.PI / 2)), 
            endX, endY
        )
        context.quadraticCurveTo(
            ((x + endX) / 2) - (width * Math.cos(radius + Math.PI / 2)),
            ((y + endY) / 2) - (width * Math.sin(radius + Math.PI / 2)),
            x, y
        )
        context.closePath()
        context.fill()
        context.stroke()
    }

    drawRectCircle(context, x, y, s, sw, seg, stroke) {
        context.save();
        context.translate(x, y)

        seg = Math.ceil(seg / 2)

        for (var i = 0; i < seg; i++) {
            this.drawRect(context, 0, 0, s * 2, sw, stroke)
            context.rotate(Math.PI / seg)
        }

        context.restore()
    }

    drawTriangle(context, scale) {
        const height = scale * (Math.sqrt(3) / 2)

        context.beginPath()
        context.moveTo(0, -height / 2)
        context.lineTo(-scale / 2, height / 2)
        context.lineTo(scale / 2, height / 2)
        context.lineTo(0, -height / 2)
        context.fill()
        context.closePath()
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Context);

/***/ }),

/***/ "./public/frontend/scene/models/Circle.js":
/*!************************************************!*\
  !*** ./public/frontend/scene/models/Circle.js ***!
  \************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _getStyleSheet_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getStyleSheet.js */ "./public/frontend/scene/models/getStyleSheet.js");


class Circle  {
    constructor(context, style) {
        this.context = context
        this.style = style

        this.position = []
        this.offset = [ 0, 0 ]
        this.radius = 0
        this.rotate = 0
    }

    setStyle(key, value) {
        this.style[key] = value

        return this
    }

    to(x, y) {
        const render = typeof x === 'object' ? { 
            x: x.render.x,
            y: x.render.y
        } : { x, y }

        this.position = [ render.x, render.y ]

        if (typeof x === 'object' && Array.isArray(y)) {
            this.offset = y
        }

        return this
    }

    setRadius(_radius) {
        this.radius = Math.max(0, _radius)

        return this
    }

    setRotate(_rotate) {
        this.rotate = _rotate

        return this
    }

    draw() {
        const styleSheet = (0,_getStyleSheet_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this.style)
        const get = (key) => styleSheet[key] || undefined

        this.context.save()
        for (const key in styleSheet) {
            this.context[key] = key === "globalAlpha" ? typeof get(key) === 'undefined' ? 0 : get(key) : get(key)
        }

        if (this.rotate) {
            this.context.translate(...this.position)
            this.context.rotate(this.rotate)
            this.context.beginPath()
            this.context.arc(this.offset[0], this.offset[1], this.radius, 0, Math.PI * 2)
        } else {
            this.context.beginPath()
            this.context.arc(this.position[0] + this.offset[0], this.position[1] + this.offset[1], this.radius, 0, Math.PI * 2)
        }

        this.context.closePath()
        this.context.fillStyle && this.context.fill()
        this.context.strokeStyle && this.context.stroke()
        this.context.restore()
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Circle);

/***/ }),

/***/ "./public/frontend/scene/models/Line.js":
/*!**********************************************!*\
  !*** ./public/frontend/scene/models/Line.js ***!
  \**********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _getStyleSheet_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getStyleSheet.js */ "./public/frontend/scene/models/getStyleSheet.js");


class Line {
    constructor(context, style) {
        this.context = context
        this.style = style

        this.moveTo = []
        this.lineTo = []
    }

    setStyle(key, value) {
        this.style[key] = value

        return this
    }

    from(x, y) {
        const render = typeof x === 'object' ? { 
            x: x.render.x,
            y: x.render.y
        } : { x, y }

        this.moveTo = [ render.x, render.y ]

        return this
    }

    to(x, y) {
        const render = typeof x === 'object' ? { 
            x: x.render.x,
            y: x.render.y
        } : { x, y }

        this.lineTo = [ render.x, render.y ]

        return this
    }

    draw() {
        const styleSheet = (0,_getStyleSheet_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this.style)
        const get = (key) => styleSheet[key] || undefined

        this.context.save()
        for (const key in styleSheet) {
            if (!get(key)) continue

            this.context[key] = get(key)
        }

        this.context.beginPath()
        this.context.moveTo(...this.moveTo)
        this.context.lineTo(...this.lineTo)
        this.context.closePath()
        this.context.fillStyle && this.context.fill()
        this.context.strokeStyle && this.context.stroke()
        this.context.restore()
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Line);

/***/ }),

/***/ "./public/frontend/scene/models/Rect.js":
/*!**********************************************!*\
  !*** ./public/frontend/scene/models/Rect.js ***!
  \**********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _getStyleSheet_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getStyleSheet.js */ "./public/frontend/scene/models/getStyleSheet.js");


class Rect {
    constructor(context, style) {
        this.context = context
        this.style = style

        this.position = []
        this.size = []
    }

    setStyle(key, value) {
        this.style[key] = value

        return this
    }

    to(x, y) {
        const render = typeof x === 'object' ? { 
            x: x.render.x,
            y: x.render.y
        } : { x, y }

        this.position = [ render.x, render.y ]

        return this
    }

    setSize(width, height) {
        this.size = [ width, height ]

        return this
    }

    draw() {
        const styleSheet = (0,_getStyleSheet_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this.style)
        const get = (key) => styleSheet[key] || undefined

        this.context.save()
        for (const key in styleSheet) {
            if (!get(key)) continue

            this.context[key] = get(key)
        }

        this.context.rect(this.position[0], this.position[1], this.size[0], this.size[1])
        this.context.fillStyle && this.context.fill()
        this.context.strokeStyle && this.context.stroke()
        this.context.restore()
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Rect);

/***/ }),

/***/ "./public/frontend/scene/models/Text.js":
/*!**********************************************!*\
  !*** ./public/frontend/scene/models/Text.js ***!
  \**********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _getStyleSheet_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getStyleSheet.js */ "./public/frontend/scene/models/getStyleSheet.js");


class Text {
    constructor(context, style) {
        this.context = context
        this.style = style

        this.text = ""
        this.position = []
    }

    setStyle(key, value) {
        this.style[key] = value

        return this
    }

    setText(_text) {
        this.text = String(_text).toString()

        return this
    }

    to(x, y) {
        const render = typeof x === 'object' ? { 
            x: x.render.x,
            y: x.render.y + (y ? y : 0)
        } : { x, y }

        this.position = [ render.x, render.y ]

        return this
    }

    draw() {
        const styleSheet = (0,_getStyleSheet_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this.style)
        const get = (key) => styleSheet[key] || undefined

        let metrics = null

        this.context.save()
        for (const key in styleSheet) {
            if (!get(key)) continue

            this.context[key] = get(key)
        }

        if (!this.style.strokeAfter && this.context.strokeStyle) {
            this.context.strokeText(this.text, ...this.position)
        }

        metrics = this.context.measureText(this.text)

        this.context.fillStyle && this.context.fillText(this.text, ...this.position)

        if (this.style.strokeAfter && this.context.strokeStyle) {
            this.context.strokeText(this.text, ...this.position)
        }
        this.context.restore()

        return metrics
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Text);

/***/ }),

/***/ "./public/frontend/scene/models/_Image.js":
/*!************************************************!*\
  !*** ./public/frontend/scene/models/_Image.js ***!
  \************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _getStyleSheet_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getStyleSheet.js */ "./public/frontend/scene/models/getStyleSheet.js");


class _Image {
    constructor(context, style) {
        this.context = context
        this.style = style

        this.image = null
        this.position = []
        this.size = []
        this.offset = [ 0, 0 ]
        this.rotate = null
    }

    setStyle(key, value) {
        this.style[key] = value

        return this
    }

    to(x, y) {
        const render = typeof x === 'object' ? { 
            x: x.render.x,
            y: x.render.y
        } : { x, y }

        this.position = [ render.x, render.y ]

        if (typeof x === 'object' && Array.isArray(y)) {
            this.offset = y
        }

        return this
    }

    setSize(width, height) {
        this.size = [ width, (typeof height === 'undefined' ? width : height) ]

        return this
    }

    setImage(_image) {
        this.image = _image

        return this
    }

    setRotate(_rotate) {
        this.rotate = _rotate

        return this
    }

    draw() {
        const styleSheet = (0,_getStyleSheet_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this.style)
        const get = (key) => styleSheet[key] || undefined

        this.context.save()
        for (const key in styleSheet) {
            if (!get(key)) continue

            this.context[key] = get(key)
        }

        if (typeof this.rotate === 'undefined') {
            return this.context.drawImage(this.image, this.position[0] + this.offset[0], this.position[1] + this.offset[1], this.size[0], this.size[1])
        }
        
        this.context.translate(this.position[0], this.position[1])
        this.context.rotate(this.rotate)
        this.context.drawImage(this.image, this.offset[0], this.offset[1], this.size[0], this.size[1])
        this.context.restore()
    }
}

/* harmony default export */ __webpack_exports__["default"] = (_Image);

/***/ }),

/***/ "./public/frontend/scene/models/getStyleSheet.js":
/*!*******************************************************!*\
  !*** ./public/frontend/scene/models/getStyleSheet.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function getStyleSheet(style) {
    const styleSheet = {}
    const set = (key, value) => (styleSheet[key] = value)

    for (const key in style) {
        switch (key) {
            case "fill":
            case "fillStyle":
                set("fillStyle", style[key])
            break

            case "stroke":
            case "strokeStyle":
                set("strokeStyle", style[key])
            break

            case "strokeWidth":
            case "lineWidth":
                set("lineWidth", parseFloat(style[key]))
            break

            case "alpha":
            case "opacity":
            case "globalAlpha":
                set("globalAlpha", parseFloat(style[key]))
            break

            default:
                set(key, style[key])
        }
    }

    return styleSheet
}

/* harmony default export */ __webpack_exports__["default"] = (getStyleSheet);

/***/ }),

/***/ "./public/frontend/scene/models/index.js":
/*!***********************************************!*\
  !*** ./public/frontend/scene/models/index.js ***!
  \***********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Circle: function() { return /* reexport safe */ _Circle_js__WEBPACK_IMPORTED_MODULE_3__["default"]; },
/* harmony export */   Line: function() { return /* reexport safe */ _Line_js__WEBPACK_IMPORTED_MODULE_2__["default"]; },
/* harmony export */   Rect: function() { return /* reexport safe */ _Rect_js__WEBPACK_IMPORTED_MODULE_0__["default"]; },
/* harmony export */   Text: function() { return /* reexport safe */ _Text_js__WEBPACK_IMPORTED_MODULE_1__["default"]; },
/* harmony export */   _Image: function() { return /* reexport safe */ _Image_js__WEBPACK_IMPORTED_MODULE_4__["default"]; }
/* harmony export */ });
/* harmony import */ var _Rect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Rect.js */ "./public/frontend/scene/models/Rect.js");
/* harmony import */ var _Text_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Text.js */ "./public/frontend/scene/models/Text.js");
/* harmony import */ var _Line_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Line.js */ "./public/frontend/scene/models/Line.js");
/* harmony import */ var _Circle_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Circle.js */ "./public/frontend/scene/models/Circle.js");
/* harmony import */ var _Image_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_Image.js */ "./public/frontend/scene/models/_Image.js");








/***/ }),

/***/ "./public/frontend/textures/Images.js":
/*!********************************************!*\
  !*** ./public/frontend/textures/Images.js ***!
  \********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _images_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./images.json */ "./public/frontend/textures/images.json");


class Images extends Map {
    constructor() {
        super()
    }

    loadImage(key, path) {
        return new Promise((resolve) => {
            const fullPath = `./assets/${path}.png`
            const image = new Image()

            image.addEventListener("load", () => {
                image.isLoaded = true

                this.set(key, image)

                resolve()
            })

            image.src = fullPath
        })
    }

    loadAllImages() {
        return new Promise(async (resolve) => {
            const imagesEntries = Object.entries(_images_json__WEBPACK_IMPORTED_MODULE_0__)

            for (let i = 0; i < imagesEntries.length; i++) {
                const image = imagesEntries[i]

                await this.loadImage(image[0], image[1])

                console.log("Image \"" + image[0] + "\" was loaded.")
            }

            resolve()
        })
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Images);

/***/ }),

/***/ "./public/frontend/textures/Sprites.js":
/*!*********************************************!*\
  !*** ./public/frontend/textures/Sprites.js ***!
  \*********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../config.json */ "./config.json");
/* harmony import */ var _items_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../items.json */ "./items.json");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/index.js */ "./utils/index.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../const.js */ "./public/frontend/const.js");





class Sprites {
    constructor() {
        this.items = new Map()
        this.resources = new Map()
        this.weapons = new Map()
    }

    getWeaponSprite(weaponIndex, offsetX, offsetY, isIcon) {
        const id = `${weaponIndex}${isIcon ? "_icon" : ""}`
        const sprite = this.weapons.get(id)

        if (sprite) return sprite

        const canvas = document.createElement("canvas")
        const context = canvas.getContext("2d")
        const compression = isIcon ? 0.35 : 1
        const drawStick = (offsetX, offsetY, width, height, radius = 5) => {
            context.fillStyle = "#9e7543"

            context.beginPath()
            context.roundRect(offsetX, offsetY, width, height, radius * compression)
            context.fill()
            context.stroke()
        }

        canvas.width = canvas.height = isIcon ? 66 : 2.1 * 150 + _config_json__WEBPACK_IMPORTED_MODULE_0__.generalStrokeWidth + (_items_json__WEBPACK_IMPORTED_MODULE_1__.weapons[weaponIndex].spritePadding || 0)

        context.strokeStyle = _config_json__WEBPACK_IMPORTED_MODULE_0__.generalStroke
        context.lineWidth = isIcon ? 2 : _config_json__WEBPACK_IMPORTED_MODULE_0__.generalStrokeWidth

        context.translate(canvas.width / 2 - (isIcon ? 10 : 0), canvas.height / 2 + (isIcon ? 5 : 0))
        isIcon && context.rotate(1.3 * Math.PI)
        isIcon && context.scale(1.1, 1.1)

        switch (weaponIndex) {
            case 0:
                drawStick(offsetX - 18 * compression, offsetY - 44 * compression, 16 * compression, 125 * compression)

                context.fillStyle = "#939393"

                context.beginPath()
                context.roundRect(offsetX - 25 * compression, offsetY + 49 * compression, 45 * compression, 25 * compression, 5 * compression)
                context.fill()
                context.stroke()
            break

            case 1:
                drawStick(offsetX - 18 * compression, offsetY - 44 * compression, 16 * compression, 135 * compression)

                context.fillStyle = "#939393"

                context.beginPath()
                context.roundRect(offsetX - 25 * compression, offsetY + 49 * compression, 60 * compression, 34 * compression, 5 * compression)
                context.fill()
                context.stroke()
            break

            case 2:
                drawStick(offsetX - 18 * compression, offsetY - 44 * compression, 16 * compression, 125 * compression)

                context.fillStyle = "#939393"

                context.beginPath()
                context.roundRect(offsetX - 22 * compression, offsetY + 40 * compression, 25 * compression, 70 * compression, 4 * compression)
                context.fill()
                context.stroke()
            break

            case 3:
                drawStick(offsetX - 22 * compression, offsetY - 75 * compression, 20 * compression, 200 * compression)

                context.save()
                context.translate(offsetX - 13 * compression, offsetY + 120 * compression)
                context.rotate(_utils_index_js__WEBPACK_IMPORTED_MODULE_2__["default"].randAngle())
                context.fillStyle = "#939393"

                _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.drawStar(context, 6, 50, 0.6 * 50)
                context.fill()
                context.stroke()
                context.restore()

                context.fillStyle = "#937c4b"

                context.beginPath()
                context.arc(offsetX - 13 * compression, offsetY + 120 * compression, 35 * compression, 0, Math.PI * 2)
                context.fill()
                context.stroke()

                context.fillStyle = "#9e7543"

                context.beginPath()
                context.arc(offsetX - 13 * compression, offsetY + 120 * compression, 22 * compression, 0, Math.PI * 2)
                context.fill()
            break
        }

        this.weapons.set(id, canvas)
        
        return this.weapons.get(id)
    }

    getItemSprite(item, isIcon) {
        const itemData = item.isItem ? item.itemData : item
        const id = `${itemData.id}${isIcon ? "_icon" : ""}`

        let sprite = this.items.get(id)

        if (sprite) return sprite

        const canvas = document.createElement("canvas")
        const context = canvas.getContext("2d")

        canvas.width = canvas.height = 2.5 * itemData.scale + _config_json__WEBPACK_IMPORTED_MODULE_0__.generalStrokeWidth + (itemData.spritePadding || 0)

        context.strokeStyle = _config_json__WEBPACK_IMPORTED_MODULE_0__.generalStroke
        context.lineWidth = _config_json__WEBPACK_IMPORTED_MODULE_0__.generalStrokeWidth * (isIcon ? canvas.width / 78 : 1)

        if (isIcon) {
            context.imageSmoothingEnabled = context.webkitImageSmoothingEnabled = context.mozImageSmoothingEnabled = true
        }

        context.translate(canvas.width / 2, canvas.height / 2)
        context.rotate(isIcon ? 0 : itemData.noSpriteRotate ? 0 : Math.PI / 2)
        isIcon && context.scale(0.75, 0.75)

        switch (itemData.id) {
            case 0: {
                const angle = -(Math.PI / 2)

                context.fillStyle = "#c15555"

                _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.drawCircle(context, 0, 0, itemData.scale)

                context.fillStyle = "#89a54c"

                _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.drawLeaf(context, itemData.scale * Math.cos(angle), itemData.scale * Math.sin(angle), 25, angle + Math.PI / 2)
            } break

            case 1: {
                const angle = (Math.PI * 2) / 4

                context.fillStyle = "#cca861"

                _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.drawCircle(context, 0, 0, itemData.scale)

                context.fillStyle = "#937c4b"

                for (let i = 0; i < 4; ++i) {
                    const scale = _utils_index_js__WEBPACK_IMPORTED_MODULE_2__["default"].randInt(itemData.scale / 2.5, itemData.scale / 1.7)

                    _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.drawCircle(context, scale * Math.cos(angle * i), scale * Math.sin(angle * i), _utils_index_js__WEBPACK_IMPORTED_MODULE_2__["default"].randInt(4, 5), true)
                }
            } break

            case 2:
            case 3:
                context.fillStyle = itemData.id === 2 ? "#a5974c" : "#939393"

                _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.drawStar(context, 3, 1.1 * itemData.scale, 1.1 * itemData.scale)
                context.fill()
                context.stroke()

                context.fillStyle = itemData.id === 2 ? "#c9b758" : "#bcbcbc"

                _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.drawStar(context, 3, 0.65 * itemData.scale, 0.65 * itemData.scale)
                context.fill()
            break

            case 4:
            case 5: {
                const radius = 0.6 * itemData.scale

                context.fillStyle = "#939393"

                _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.drawStar(context, itemData.id === 4 ? 5 : 6, itemData.scale, radius)
                context.fill()
                context.stroke()

                context.fillStyle = "#a5974c"

                _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.drawCircle(context, 0, 0, radius)

                context.fillStyle = "#c9b758"

                _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.drawCircle(context, 0, 0, radius / 2, true)
            } break

            case 6:
            case 7:
                context.fillStyle = "#a5974c"

                _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.drawCircle(context, 0, 0, itemData.scale)

                context.fillStyle = "#c9b758"

                _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.drawRectCircle(context, 0, 0, 1.5 * itemData.scale, 29, 4)

                context.fillStyle = "#a5974c"

                _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.drawCircle(context, 0, 0, 0.5 * itemData.scale)
            break

            case 8:
                context.fillStyle = "#a5974c"

                _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.drawStar(context, 3, itemData.scale * 1.1, itemData.scale * 1.1)
                context.fill()
                context.stroke()

                context.fillStyle = _config_json__WEBPACK_IMPORTED_MODULE_0__.generalStroke
                
                _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.drawStar(context, 3, itemData.scale * 0.65, itemData.scale * 0.65)
                context.fill()
            break

            case 9:
                context.fillStyle = "#7e7f82"

                _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.drawRect(context, 0, 0, itemData.scale * 2, itemData.scale * 2)
                context.fill()
                context.stroke()

                context.fillStyle = "#dbd97d"

                _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.drawTriangle(context, itemData.scale * 1)
            break

            case 10:
                context.fillStyle = "#939393"

                _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.drawStar(context, 3, itemData.scale, itemData.scale)
                context.fill()
                context.stroke()

                context.fillStyle = "#bcbcbc"

                _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.drawStar(context, 3, 0.55 * itemData.scale, 0.65 * itemData.scale)
                context.fill()
            break

            case 11: {
                context.fillStyle = "#8c5c40"
                
                _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.drawStar(context, 4, itemData.scale, itemData.scale)
                context.fill()
                context.stroke()

                context.fillStyle = "#b27957"

                _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.drawStar(context, 4, itemData.scale * 0.8, itemData.scale * 0.8)
                context.fill()

                const coinScale = itemData.scale / 4
                const drawCoin = (offsetX, offsetY) => {
                    context.save()
                    context.translate(offsetX, offsetY)

                    context.fillStyle = "#e0c655"
                    context.lineWidth = parseFloat(context.lineWidth) / 2

                    _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.drawStar(context, 4, coinScale, coinScale)
                    context.fill()
                    context.stroke() 

                    context.fillStyle = "#ebdca3"
                
                    _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.drawStar(context, 4, coinScale * 0.65, coinScale * 0.65)
                    context.fill()
                    context.restore()
                }

                for (let layer = (itemData.scale / coinScale) / 2; layer > 0; layer -= 1) {
                    const div = 1.75

                    drawCoin((coinScale / div) * layer, (coinScale / div) * layer)
                    drawCoin(-(coinScale / div) * layer, -(coinScale / div) * layer)
                    drawCoin((coinScale / div) * layer, -(coinScale / div) * layer)
                    drawCoin(-(coinScale / div) * layer, (coinScale / div) * layer)

                    drawCoin(coinScale * layer, 0)
                    drawCoin(-coinScale * layer, 0)
                    drawCoin(0, coinScale * layer)
                    drawCoin(0, -coinScale * layer)
                }

                drawCoin(0, 0)
            } break
        }

        this.items.set(id, canvas)

        return this.items.get(id)
    }

    getResourceSprite(resource) {
        const id = resource.resourceType + "_" + resource.scale

        let sprite = this.resources.get(id)

        if (sprite) return sprite

        const canvas = document.createElement("canvas")
        const context = canvas.getContext("2d")

        canvas.width = canvas.height = 2.1 * resource.scale + _config_json__WEBPACK_IMPORTED_MODULE_0__.generalStrokeWidth

        context.strokeStyle = _config_json__WEBPACK_IMPORTED_MODULE_0__.generalStroke
        context.lineWidth = _config_json__WEBPACK_IMPORTED_MODULE_0__.generalStrokeWidth

        context.translate(canvas.width / 2, canvas.height / 2)
        context.rotate(_utils_index_js__WEBPACK_IMPORTED_MODULE_2__["default"].randFloat(0, Math.PI))

        switch (resource.resourceType) {
            case 0:
                for (let i = 0; i < 2; ++i) {
                    const scale = resource.scale * (i ? 0.45 : 1)

                    _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.drawStar(context, 7, scale, 0.7 * scale)
                    context.fillStyle = i ? "#b4db62" : "#9ebf57"
                    context.fill()
                    i || context.stroke()
                }
            break

            case 1:
                _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.drawBlob(context, 6, resource.scale, 0.7 * resource.scale)

                context.fillStyle = "#89a54c"

                context.fill()
                context.stroke()

                context.fillStyle = "#c15555"

                const angle = (Math.PI * 2) / 4

                for (let i = 0; i < 4; ++i) {
                    const scale = _utils_index_js__WEBPACK_IMPORTED_MODULE_2__["default"].randInt(resource.scale / 3.5, resource.scale / 2.3)

                    _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.drawCircle(context, scale * Math.cos(angle * i), scale * Math.sin(angle * i), _utils_index_js__WEBPACK_IMPORTED_MODULE_2__["default"].randInt(10, 12))
                }
            break

            case 2:
            case 3:
                const isStone = resource.resourceType === 2
                const isGold = resource.resourceType === 3

                context.fillStyle = isStone ? "#939393" : "#e0c655"

                _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.drawStar(context, 3, resource.scale, resource.scale)
                context.fill()
                context.stroke()

                context.fillStyle = isStone ? "#bcbcbc" : "#ebdca3"

                _const_js__WEBPACK_IMPORTED_MODULE_3__.gameContext.drawStar(context, 3, 0.55 * resource.scale, 0.65 * resource.scale)
                context.fill()
            break
        }

        this.resources.set(id, canvas)

        return this.resources.get(id)
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Sprites);

/***/ }),

/***/ "./public/frontend/uicontrol/GUIControl.js":
/*!*************************************************!*\
  !*** ./public/frontend/uicontrol/GUIControl.js ***!
  \*************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../config.json */ "./config.json");
/* harmony import */ var _items_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../items.json */ "./items.json");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../const.js */ "./public/frontend/const.js");
/* harmony import */ var _UIAdapter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./UIAdapter.js */ "./public/frontend/uicontrol/UIAdapter.js");





class GUIControl extends _UIAdapter_js__WEBPACK_IMPORTED_MODULE_3__["default"] {
    constructor() {
        super()

        this.gameUI = this.get$("#gameui")
        this.deathText = this.get$("#death_text")
        this.leaderboardHolder = this.get$("#leaderboard_holder")
        this.leaderboardContainer = this.get$("#leaderboard_container")
        this.itemsBarHolder = this.get$("#items_bar_holder")
        this.ageText = this.get$("#age_text")
        this.ageBar = this.get$("#age_bar")
        this.resourcesHolder = this.get$("#resources_holder")
        this.goldText = this.get$("#gold_text")
        this.foodText = this.get$("#food_text")
        this.woodText = this.get$("#wood_text")
        this.stoneText = this.get$("#stone_text")
        this.chatHolder = this.get$("#chat_holder")
        this.chatInput = this.get$("#chat_input")
        this.inventoryBarWeapons = this.get$("#inventory_bar_weapons")
        this.inventoryBarItems = this.get$("#inventory_bar_items")
        this.upgradesBarWeapons = this.get$("#upgrades_bar_weapons")
        this.upgradesBarItems = this.get$("#upgrades_bar_items")
        this.upgradesBarCount = this.get$("#upgrades_bar_count")
        this.itemInfoWrapper = this.get$("#item_info_wrapper")
        this.toggleShopBtn = this.get$("#toggle_shop_btn")
        this.shopHolder = this.get$("#shop_holder")
        this.shopHatsContainer = this.get$("#shop_hats_container")
        this.pingText = this.get$("#ping_text")
        this.fpsText = this.get$("#fps_text")

        this.chatHistory = []
        this.chatHistoryIndex = -1

        this.on("show-kill-elements", () => {
            this.showDeathText()

            setTimeout(_const_js__WEBPACK_IMPORTED_MODULE_2__.ui.showHomepage.bind(_const_js__WEBPACK_IMPORTED_MODULE_2__.ui), _config_json__WEBPACK_IMPORTED_MODULE_0__.deathFadeout)
        })
    }

    showGui() {
        this.gameUI.show()
        this.itemsBarHolder.show()
        this.leaderboardHolder.show()
        this.resourcesHolder.show()
        this.itemsBarHolder.show()
        this.chatHolder.hide()
        this.itemInfoWrapper.hide()
        this.shopHolder.hide()
        this.deathText.hide()
    }

    showDeathText() {
        this.itemsBarHolder.hide()
        this.leaderboardHolder.hide()
        this.chatHolder.hide()
        this.itemInfoWrapper.hide()
        this.resourcesHolder.hide()
        this.itemsBarHolder.hide()
        this.shopHolder.hide()
        this.deathText.show()
    }

    showItemInfoPanel(isWeapon, itemId, isHat) {
        const item = isWeapon ? _items_json__WEBPACK_IMPORTED_MODULE_1__.weapons[itemId] : isHat ? _items_json__WEBPACK_IMPORTED_MODULE_1__.hats[itemId] : _items_json__WEBPACK_IMPORTED_MODULE_1__.items[itemId]
        const itemInfoName = this.get$("#item_info_name", this.itemInfoWrapper)
        const itemInfoDesc = this.get$("#item_info_desc", this.itemInfoWrapper)
        const itemInfoWeapon = this.get$("#item_info_weapon", this.itemInfoWrapper)
        const itemInfoRequiredList = this.get$("#item_info_required_list", this.itemInfoWrapper)
        const itemInfoCount = this.get$("#item_info_count", this.itemInfoWrapper)

        if (isWeapon) {
            itemInfoWeapon.setHtml("primary")
            itemInfoWeapon.show()
        } else if (!isHat) {
            if (item.requiredResources?.length) {
                for (const requiredResource of item.requiredResources) {
                    const itemInfoRequired = this.get$(`#item_info_required_${requiredResource[0]}`, this.itemInfoWrapper)
                
                    itemInfoRequired.setHtml(`${requiredResource[0]} <span class="item-info-prop gray-text">x${requiredResource[1]}</span>`)
                    itemInfoRequired.show()
                }
    
                itemInfoRequiredList.show()
            }

            const itemGroupData = _items_json__WEBPACK_IMPORTED_MODULE_1__.groups[item.groupId]

            if (itemGroupData.place) {
                itemInfoCount.setHtml(`${_const_js__WEBPACK_IMPORTED_MODULE_2__.im.itemsCount[item.groupId] || 0}/${itemGroupData.limit}`)
                itemInfoCount.show()
            }
        }

        itemInfoName.setHtml(item.name)
        itemInfoDesc.setHtml(item.desc)
        this.itemInfoWrapper.show()
    }

    hideTempWindows() {
        this.chatHolder.hide()
        this.shopHolder.hide()
    }

    hideItemInfoPanel() {
        const itemInfoName = this.get$("#item_info_name", this.itemInfoWrapper)
        const itemInfoDesc = this.get$("#item_info_desc", this.itemInfoWrapper)
        const itemInfoWeapon = this.get$("#item_info_weapon", this.itemInfoWrapper)
        const itemInfoRequiredList = this.get$("#item_info_required_list", this.itemInfoWrapper)
        const itemInfoCount = this.get$("#item_info_count", this.itemInfoWrapper)

        this.itemInfoWrapper.hide()
        itemInfoName.setHtml("")
        itemInfoDesc.setHtml("")
        itemInfoCount.setHtml("")
        itemInfoWeapon.hide()
        itemInfoRequiredList.hide()
        itemInfoCount.hide()

        for (const resourceName of [ "gold", "food", "wood", "stone" ]) {
            const itemInfoRequired = this.get$(`#item_info_required_${resourceName}`, this.itemInfoWrapper)

            itemInfoRequired.setHtml("")
            itemInfoRequired.hide()
        }
    }

    toggleChat() {
        this.shopHolder.hide()
        this.chatHolder.toggle()

        if (!this.chatHolder.hasClass("hidden")) {
            this.chatInput.doFocus()
        }
    }

    toggleShop() {
        this.chatHolder.hide()
        this.shopHolder.toggle()

        if (!this.shopHolder.hasClass("hidden")) {
            this.updateShopHatsList()
        }
    }

    updateAgeBar(ageBarWidthPercentage, ageText) {
        this.ageBar.setWidth(`${ageBarWidthPercentage}%`)
        this.ageText.setHtml(ageText)
    }

    updateInventoryBar(inventory) {
        this.inventoryBarWeapons.setHtml("")
        this.inventoryBarItems.setHtml("")

        const onClick = (isWeapon, itemId) => {
            _const_js__WEBPACK_IMPORTED_MODULE_2__.network.socket.sendSelectItem(isWeapon, itemId)
        }

        for (const weaponIndex of inventory.weapons) {
            const weaponSprite = _const_js__WEBPACK_IMPORTED_MODULE_2__.sprites.getWeaponSprite(weaponIndex, 0, 0, true)
            const id = `inventory_item_${weaponIndex}`

            this.inventoryBarWeapons.insertAdjacentHTML("beforeend", `
            <div class="inventory-bar-item prevent-click" id="${id}" style="background-image: url(${weaponSprite.toDataURL()})"></div>
            `)

            const inventoryItem = this.get$(`#${id}`)

            inventoryItem.on("click", onClick.bind(null, true, weaponIndex))
            inventoryItem.on("mouseover", this.showItemInfoPanel.bind(this, true, weaponIndex, false))
            inventoryItem.on("mouseout", this.hideItemInfoPanel.bind(this))
        }

        for (const itemIndex of inventory.items) {
            const itemSprite = _const_js__WEBPACK_IMPORTED_MODULE_2__.sprites.getItemSprite(_items_json__WEBPACK_IMPORTED_MODULE_1__.items[itemIndex], true)
            const id = `inventory_item_${itemIndex + _items_json__WEBPACK_IMPORTED_MODULE_1__.items.length}`

            this.inventoryBarItems.insertAdjacentHTML("beforeend", `
            <div class="inventory-bar-item prevent-click" id="${id}" style="background-image: url(${itemSprite.toDataURL()})"></div>
            `)

            const inventoryItem = this.get$(`#${id}`)

            inventoryItem.on("click", onClick.bind(null, false, itemIndex))
            inventoryItem.on("mouseover", this.showItemInfoPanel.bind(this, false, itemIndex, false))
            inventoryItem.on("mouseout", this.hideItemInfoPanel.bind(this))
        }
    }

    updateUpgradesBar(upgrades, upgradesCount) {
        this.upgradesBarWeapons.setHtml("")
        this.upgradesBarItems.setHtml("")
        this.upgradesBarCount.setHtml(`SELECT ITEMS (${upgradesCount})`)
        this.upgradesBarCount.show()

        const onClick = (isWeapon, itemId) => {
            this.upgradesBarWeapons.setHtml("")
            this.upgradesBarItems.setHtml("")
            this.upgradesBarCount.setHtml(`SELECT ITEMS (0)`)
            this.upgradesBarCount.hide()
            _const_js__WEBPACK_IMPORTED_MODULE_2__.network.socket.sendSelectUpgrade(isWeapon, itemId)
            this.hideItemInfoPanel()
        }

        if (Array.isArray(upgrades.weapons)) {
            for (const weaponIndex of upgrades.weapons) {
                const weaponSprite = _const_js__WEBPACK_IMPORTED_MODULE_2__.sprites.getWeaponSprite(weaponIndex, 0, 0, true)
                const id = `upgrade_item_${weaponIndex}`
    
                this.upgradesBarWeapons.insertAdjacentHTML("beforeend", `
                <div class="upgrades-bar-item prevent-click" id="${id}" style="background-image: url(${weaponSprite.toDataURL()})"></div>
                `)
    
                const upgradeItem = this.get$(`#${id}`)
    
                upgradeItem.on("click", onClick.bind(null, true, weaponIndex))
                upgradeItem.on("mouseover", this.showItemInfoPanel.bind(this, true, weaponIndex, false))
                upgradeItem.on("mouseout", this.hideItemInfoPanel.bind(this))
            }
        }

        if (!Array.isArray(upgrades.items)) return

        for (const itemIndex of upgrades.items) {
            const itemSprite = _const_js__WEBPACK_IMPORTED_MODULE_2__.sprites.getItemSprite(_items_json__WEBPACK_IMPORTED_MODULE_1__.items[itemIndex], true)
            const id = `upgrade_item_${itemIndex + _items_json__WEBPACK_IMPORTED_MODULE_1__.items.length}`

            this.upgradesBarItems.insertAdjacentHTML("beforeend", `
            <div class="upgrades-bar-item prevent-click" id="${id}" style="background-image: url(${itemSprite.toDataURL()})"></div>
            `)

            const upgradeItem = this.get$(`#${id}`)

            upgradeItem.on("click", onClick.bind(null, false, itemIndex))
            upgradeItem.on("mouseover", this.showItemInfoPanel.bind(this, false, itemIndex, false))
            upgradeItem.on("mouseout", this.hideItemInfoPanel.bind(this))
        }
    }

    updateShopHatsList(lastHatId, actionState) {
        this.shopHatsContainer.setHtml("")

        const onClick = (hatId, hatAction) => {
            _const_js__WEBPACK_IMPORTED_MODULE_2__.network.socket.sendSelectEquipment(hatId)

            const hatActionText = hatAction.textContent

            this.updateShopHatsList(hatId, !_const_js__WEBPACK_IMPORTED_MODULE_2__.im.hats[hatId] ? _items_json__WEBPACK_IMPORTED_MODULE_1__.hats[hatId].cost : /\d/.test(hatActionText) ? "Equip" : /Equip/.test(hatActionText) ? "Unequip" : "Equip")
        }

        for (const hat of _items_json__WEBPACK_IMPORTED_MODULE_1__.hats) {
            if (hat.noSell) continue

            this.shopHatsContainer.insertAdjacentHTML("beforeend", `
            <box class="shop-product-box prevent-click" id="shop_product_${hat.id}">
              <header class="shop-product-header prevent-click">
                <img class="shop-product-preview prevent-click" src="../assets/hats/${hat.src}.png">
                <span class="default-text prevent-click"">${hat.name}</span>
              </header>

              <div class="shop-product-actions prevent-click">
                <div class="shop-product-action prevent-click" id="shop_hat_action_${hat.id}">
                  <span class="prevent-click">
                  ${lastHatId === hat.id ? actionState : 
                    _const_js__WEBPACK_IMPORTED_MODULE_2__.im.hatIndex === hat.id && actionState !== "Unequip" ? "Unequip" : 
                    _const_js__WEBPACK_IMPORTED_MODULE_2__.im.hats[hat.id] ? "Equip" : hat.cost}
                  </span>
                </div>
              </div>
            </box>
            `)

            const hatBox = this.get$(`#shop_product_${hat.id}`, this.shopHatsContainer)
            const hatAction = this.get$(`#shop_hat_action_${hat.id}`, this.shopHatsContainer)

            hatAction.on("click", onClick.bind(null, hat.id, hatAction))
            hatBox.on("mouseover", this.showItemInfoPanel.bind(this, false, hat.id, true))
            hatBox.on("mouseout", this.hideItemInfoPanel.bind(this))
        }
    }
}

/* harmony default export */ __webpack_exports__["default"] = (GUIControl);

/***/ }),

/***/ "./public/frontend/uicontrol/UIAdapter.js":
/*!************************************************!*\
  !*** ./public/frontend/uicontrol/UIAdapter.js ***!
  \************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/index.js */ "./utils/index.js");


class UIAdapter extends _utils_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].Emitter {
    constructor() {
        super()
    }

    create$(node) {
        return Object.assign(node, {
            show() {
                this.classList.remove("hidden")
            },
            hide() {
                this.classList.add("hidden")
            },
            toggle() {
                this.classList.toggle("hidden")
            },
            hasClass(className) {
                return this.classList.contains("hidden")
            },
            select() {
                this.classList.add("selected")
            },
            unselect() {
                this.classList.remove("selected")
            },
            denied() {
                this.classList.add("denied")
            },
            undenied() {
                this.classList.remove("denied")
            },
            on(eventName, listener) {
                this.addEventListener(eventName, listener)
            },
            setFontSize(_fontSize) {
                this.style.fontSize = _fontSize
            },
            clearHtml() {
                this.innerHTML = ""
            },
            setHtml(_html) {
                this.innerHTML = _html
            },
            addHtml(_html) {
                this.innerHTML += _html
            },
            setWidth(_width) {
                this.style.width = _width
            },
            setHeight(_height) {
                this.style.height = _height
            },
            setValue(_value) {
                this.value = _value
            },
            getValue() {
                return this.value
            },
            doFocus() {
                this.focus()
            }
        })
    }

    get$(selector, from) {
        if (typeof from === 'undefined') {
            from = document
        }

        const node = from.querySelector(selector)

        if (!node) return null

        return this.create$(node)
    }

    getAll$(selector, from) {
        if (typeof from === 'undefined') {
            from = document
        }

        if (!from) return null

        const nodes = [ ...from.querySelectorAll(selector) ]

        if (!nodes.length) return []

        return [ ...nodes.map((node) => this.create$(node)) ]
    }
}

/* harmony default export */ __webpack_exports__["default"] = (UIAdapter);

/***/ }),

/***/ "./public/frontend/uicontrol/UIControl.js":
/*!************************************************!*\
  !*** ./public/frontend/uicontrol/UIControl.js ***!
  \************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/index.js */ "./utils/index.js");
/* harmony import */ var _GUIControl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GUIControl.js */ "./public/frontend/uicontrol/GUIControl.js");
/* harmony import */ var _UIAdapter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UIAdapter.js */ "./public/frontend/uicontrol/UIAdapter.js");
/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../config.json */ "./config.json");





class UIControl extends _UIAdapter_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
    constructor() {
        super()

        this.homepage = this.get$("#homepage")
        this.homepageContainer = this.get$("#homepage_container")
        this.homepageHeader = this.get$("#homepage_header")
        this.gameName = this.get$("#game_name")
        this.gameLoading = this.get$("#game_loading")
        this.gameDisconnect = this.get$("#game_disconnect")
        this.gameNicknameInput = this.get$("#game_nickname_input")
        this.enterGame = this.get$("#enter_game")

        this.gui = new _GUIControl_js__WEBPACK_IMPORTED_MODULE_1__["default"]()

        this.on("show-homepage", this.showHomepage.bind(this))
        this.on("show-disconnect", this.showDisconnect.bind(this))
        this.on("show-gameui", this.showGameui.bind(this))
    }

    isInputFocused() {
        return document.activeElement.tagName === "INPUT"
    }

    showHomepage() {
        this.homepage.show()
        this.homepageContainer.show()
        this.gui.gameUI.hide()
        this.gameLoading.hide()
        this.homepageHeader.classList.remove("is-loading")
    }

    showDisconnect(reason) {
        reason && this.get$("span", this.gameDisconnect).setHtml(reason)
        this.showHomepage()
        this.homepageContainer.hide()
        this.gameDisconnect.show()
    }

    showGameui() {
        this.homepage.hide()
        this.gui.showGui()
    }
}

/* harmony default export */ __webpack_exports__["default"] = (UIControl);

/***/ }),

/***/ "./utils/2d/Line.js":
/*!**************************!*\
  !*** ./utils/2d/Line.js ***!
  \**************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Vector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector.js */ "./utils/2d/Vector.js");


class Line {
    constructor({ x, y, dx, dy }) {
        this.origin = new _Vector_js__WEBPACK_IMPORTED_MODULE_0__["default"](x, y)
        this.direction = new _Vector_js__WEBPACK_IMPORTED_MODULE_0__["default"](dx, dy)
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Line);

/***/ }),

/***/ "./utils/2d/Physics.js":
/*!*****************************!*\
  !*** ./utils/2d/Physics.js ***!
  \*****************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Vector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector.js */ "./utils/2d/Vector.js");


class Physics {
    constructor(x, y, mass = 5, time = 0.9) {
        this.mass = mass
        this.time = time

        this.position = new _Vector_js__WEBPACK_IMPORTED_MODULE_0__["default"](x, y)
        this.velocity = new _Vector_js__WEBPACK_IMPORTED_MODULE_0__["default"]()
        this.acceleration = new _Vector_js__WEBPACK_IMPORTED_MODULE_0__["default"]()
        this.force = new _Vector_js__WEBPACK_IMPORTED_MODULE_0__["default"]()

        this.position.lastX = this.position.x
        this.position.lastY = this.position.y

        this.velocity.lastX = this.velocity.x
        this.velocity.lastY = this.velocity.y
    }

    updatePhysics() {
        this.position.lastX = this.position.x
        this.position.lastY = this.position.y

        this.velocity.lastX = this.velocity.x
        this.velocity.lastY = this.velocity.y

        this.force.div(this.mass)

        this.acceleration.add(this.force.x, this.force.y)
        this.acceleration.mult(this.time)

        this.velocity.add(this.acceleration.x, this.acceleration.y)
        this.velocity.mult(this.time)

        this.position.add(this.velocity.x, this.velocity.y)
    }

    resetPhysics() {
        this.force.reset()
        this.acceleration.reset()
        this.velocity.reset()
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Physics);

/***/ }),

/***/ "./utils/2d/Point.js":
/*!***************************!*\
  !*** ./utils/2d/Point.js ***!
  \***************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Vector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector.js */ "./utils/2d/Vector.js");
/* harmony import */ var _Physics_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Physics.js */ "./utils/2d/Physics.js");
/* harmony import */ var _toVector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./toVector.js */ "./utils/2d/toVector.js");




class Point extends _Physics_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor(x, y, width, height) {
        height = height || width

        super(x, y)

        this.width = width || 0
        this.height = height || 0
    }

    get x() {
        return this.position.x - this.width / 2
    }

    get y() {
        return this.position.y - this.height / 2
    }

    get lastX() {
        return this.position.lastX - this.width / 2
    }

    get lastY() {
        return this.position.lastY - this.height / 2
    }

    set x(number) {
        this.position.set(number + this.width / 2, this.position.y)
    }

    set y(number) {
        this.position.set(this.position.x, number + this.height / 2)
    }

    get clone() {
        return new Point(this.position.x, this.position.y, this.width, this.height)
    }

    setTo(x, y) {
        const vector = (0,_toVector_js__WEBPACK_IMPORTED_MODULE_2__["default"])(x, y)
        
        this.position.set(vector)
    }

    copyFrom(point) {
        this.setTo(point.position.x, point.position.y)
    }

    copyTo(point) {
        point.setTo(point.position.x, point.position.y)
    }

    distanceTo(x, y) {
        if (x instanceof Point) {
            x = new _Vector_js__WEBPACK_IMPORTED_MODULE_0__["default"](x.x, x.y)
        }

        const myPoistion = (0,_toVector_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this.x, this.y)
        const otherPosition = (0,_toVector_js__WEBPACK_IMPORTED_MODULE_2__["default"])(x, y)

        return myPoistion.distanceTo(otherPosition)
    }

    angleTo(x, y) {
        if (x instanceof Point) {
            x = new _Vector_js__WEBPACK_IMPORTED_MODULE_0__["default"](x.x, x.y)
        }

        const myPoistion = (0,_toVector_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this.x, this.y)
        const otherPosition = (0,_toVector_js__WEBPACK_IMPORTED_MODULE_2__["default"])(x, y)

        return myPoistion.angleTo(otherPosition)
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Point);

/***/ }),

/***/ "./utils/2d/Rect.js":
/*!**************************!*\
  !*** ./utils/2d/Rect.js ***!
  \**************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Line_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Line.js */ "./utils/2d/Line.js");
/* harmony import */ var _Vector_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Vector.js */ "./utils/2d/Vector.js");



class Rect {
    constructor({ x, y, width, height, angle }) {
        this.center = new _Vector_js__WEBPACK_IMPORTED_MODULE_1__["default"](x, y)
        this.size = new _Vector_js__WEBPACK_IMPORTED_MODULE_1__["default"](width, height)
        this.angle = angle
    }

    getAxis() {
        const originX = new _Vector_js__WEBPACK_IMPORTED_MODULE_1__["default"](1, 0)
        const originY = new _Vector_js__WEBPACK_IMPORTED_MODULE_1__["default"](0, 1)
        const rotatedX = originX.getRotate(this.angle)
        const rotatedY = originY.getRotate(this.angle)

        return [
            new _Line_js__WEBPACK_IMPORTED_MODULE_0__["default"]({ x: this.center.x, y: this.center.y, dx: rotatedX.x, dy: rotatedX.y }),
            new _Line_js__WEBPACK_IMPORTED_MODULE_0__["default"]({ x: this.center.x, y: this.center.y, dx: rotatedY.x, dy: rotatedY.y })
        ]
    }

    getCorners() {
        const axis = this.getAxis()
        const rotatedX = axis[0].direction.getMult(this.size.x / 2)
        const rotatedY = axis[1].direction.getMult(this.size.y / 2)

        return [
            this.center.getAdd(rotatedX).getAdd(rotatedY),
            this.center.getAdd(rotatedX).getAdd(rotatedY.getMult(-1)),
            this.center.getAdd(rotatedX.getMult(-1)).getAdd(rotatedY.getMult(-1)),
            this.center.getAdd(rotatedX.getMult(-1)).getAdd(rotatedY)
        ]
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Rect);

/***/ }),

/***/ "./utils/2d/Vector.js":
/*!****************************!*\
  !*** ./utils/2d/Vector.js ***!
  \****************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _toVector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toVector.js */ "./utils/2d/toVector.js");


class Vector {
    constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
    }

    static random2D(angle, length = 1) {
        return new Vector(length * Math.cos(angle), length * Math.sin(angle))
    }

    get magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2)
    }

    get copy() {
        return new Vector(this.x, this.y)
    }

    getRotate(angle) {
        return new Vector(this.x * Math.cos(angle) - this.y * Math.sin(angle), this.x * Math.sin(angle) + this.y * Math.cos(angle))
    }

    getProject(line) {
        const dot = line.direction.x * (this.x - line.origin.x) + line.direction.y * (this.y - line.origin.y)

        return new Vector(line.origin.x + line.direction.x * dot, line.origin.y + line.direction.y * dot)
    }

    getAdd(x, y) {
        const vector = (0,_toVector_js__WEBPACK_IMPORTED_MODULE_0__["default"])(x, y)
        
        return new Vector(this.x + vector.x, this.y + vector.y)
    }

    getMinus(x, y) {
        const vector = (0,_toVector_js__WEBPACK_IMPORTED_MODULE_0__["default"])(x, y)

        return new Vector(this.x - vector.x, this.y - vector.y)
    }

    getMult(x, y) {
        const vector = (0,_toVector_js__WEBPACK_IMPORTED_MODULE_0__["default"])(x, y)

        return new Vector(this.x * vector.x, this.y * vector.y)
    }

    setMag(length) {
        return this.normalize().mult(length)
    }

    different(x, y) {
        const vector = (0,_toVector_js__WEBPACK_IMPORTED_MODULE_0__["default"])(x, y)

        return new Vector(this.x - vector.x, this.y - vector.y)
    }

    set(x, y) {
        const vector = (0,_toVector_js__WEBPACK_IMPORTED_MODULE_0__["default"])(x, y)

        this.x = vector.x
        this.y = vector.y

        return this
    }

    add(x, y) {
        const vector = (0,_toVector_js__WEBPACK_IMPORTED_MODULE_0__["default"])(x, y)

        this.x += vector.x
        this.y += vector.y

        return this
    }

    sub(x, y) {
        const vector = (0,_toVector_js__WEBPACK_IMPORTED_MODULE_0__["default"])(x, y)

        this.x -= vector.x
        this.y -= vector.y

        return this
    }

    mult(x, y) {
        const vector = (0,_toVector_js__WEBPACK_IMPORTED_MODULE_0__["default"])(x, y)

        this.x *= vector.x
        this.y *= vector.y

        return this
    }

    div(x, y) {
        const vector = (0,_toVector_js__WEBPACK_IMPORTED_MODULE_0__["default"])(x, y)

        this.x /= vector.x
        this.y /= vector.y

        return this
    }

    mulScalar(scalar) {
        const vector = (0,_toVector_js__WEBPACK_IMPORTED_MODULE_0__["default"])(scalar)

        this.x *= vector.x
        this.y *= vector.y

        return this
    }

    normalize() {
        const magnitude = this.magnitude

        if (magnitude <= 0) return this

        return new Vector(this.x, this.y).div(magnitude || 1)
    }

    projection(vector) {
        const normalized = vector.normalize()
        const scalar = this.mulScalar(vector)

        normalized.mult(scalar)

        return normalized
    }

    clamp(min, max) {
		this.x = Math.max(min.x, Math.min(max.x, this.x))
		this.y = Math.max(min.y, Math.min(max.y, this.y))

		return this
	}

    floor() {
		this.x = Math.floor(this.x)
		this.y = Math.floor(this.y)

		return this
	}

    dot(vector) {
		return this.x * vector.x + this.y * vector.y
	}

	cross(vector) {
		return this.x * vector.y - this.y * vector.x
	}

	lengthSq() {
		return this.x * this.x + this.y * this.y
	}

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    lerp(vector, alpha) {
		this.x += (vector.x - this.x) * -alpha
		this.y += (vector.y - this.y) * -alpha

		return this
	}

    lerpVectors(vector1, vector2, alpha) {
		this.x = vector1.x + (vector2.x - vector1.x) * alpha
		this.y = vector1.y + (vector2.y - vector1.y) * alpha

		return this
	}

    distanceTo(x, y) {
        const vector = (0,_toVector_js__WEBPACK_IMPORTED_MODULE_0__["default"])(x, y)

        return this.copy.sub(vector).length()
    }

    angleTo(x, y) {
        const vector = (0,_toVector_js__WEBPACK_IMPORTED_MODULE_0__["default"])(x, y)
        const copy = vector.copy.sub(this)

        return Math.atan2(copy.y, copy.x)
    }

    random() {
		this.x = Math.random()
		this.y = Math.random()

		return this
	}

    reset() {
        this.x = 0
        this.y = 0

        return this
    }

    log() {
        console.log(this.x, this.y)
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Vector);

/***/ }),

/***/ "./utils/2d/getSignedDistance.js":
/*!***************************************!*\
  !*** ./utils/2d/getSignedDistance.js ***!
  \***************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Vector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector.js */ "./utils/2d/Vector.js");


function getSignedDistance(rect, line, corner) {
    const projected = corner.getProject(line)
    const center = projected.getMinus(rect.center)
    const sign = (center.x * line.direction.x) + (center.y * line.direction.y) > 0
    const signedDistance = center.magnitude * (sign ? 1 : -1)

    return signedDistance
}

/* harmony default export */ __webpack_exports__["default"] = (getSignedDistance);

/***/ }),

/***/ "./utils/2d/index.js":
/*!***************************!*\
  !*** ./utils/2d/index.js ***!
  \***************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Line: function() { return /* reexport safe */ _Line_js__WEBPACK_IMPORTED_MODULE_0__["default"]; },
/* harmony export */   Physics: function() { return /* reexport safe */ _Physics_js__WEBPACK_IMPORTED_MODULE_1__["default"]; },
/* harmony export */   Point: function() { return /* reexport safe */ _Point_js__WEBPACK_IMPORTED_MODULE_2__["default"]; },
/* harmony export */   Rect: function() { return /* reexport safe */ _Rect_js__WEBPACK_IMPORTED_MODULE_3__["default"]; },
/* harmony export */   Vector: function() { return /* reexport safe */ _Vector_js__WEBPACK_IMPORTED_MODULE_4__["default"]; },
/* harmony export */   getSignedDistance: function() { return /* reexport safe */ _getSignedDistance_js__WEBPACK_IMPORTED_MODULE_5__["default"]; },
/* harmony export */   toVector: function() { return /* reexport safe */ _toVector_js__WEBPACK_IMPORTED_MODULE_6__["default"]; }
/* harmony export */ });
/* harmony import */ var _Line_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Line.js */ "./utils/2d/Line.js");
/* harmony import */ var _Physics_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Physics.js */ "./utils/2d/Physics.js");
/* harmony import */ var _Point_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Point.js */ "./utils/2d/Point.js");
/* harmony import */ var _Rect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Rect.js */ "./utils/2d/Rect.js");
/* harmony import */ var _Vector_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Vector.js */ "./utils/2d/Vector.js");
/* harmony import */ var _getSignedDistance_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getSignedDistance.js */ "./utils/2d/getSignedDistance.js");
/* harmony import */ var _toVector_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./toVector.js */ "./utils/2d/toVector.js");










/***/ }),

/***/ "./utils/2d/toVector.js":
/*!******************************!*\
  !*** ./utils/2d/toVector.js ***!
  \******************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Vector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector.js */ "./utils/2d/Vector.js");


function toVector(x, y) {
    let vector = null

    if (arguments[0] instanceof _Vector_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
        vector = new _Vector_js__WEBPACK_IMPORTED_MODULE_0__["default"](arguments[0].x, arguments[0].y)
    } else if (typeof arguments[0] === 'number' && typeof arguments[1] === 'undefined') {
        vector = new _Vector_js__WEBPACK_IMPORTED_MODULE_0__["default"](arguments[0], arguments[0])
    } else if (typeof arguments[0] === 'number' && typeof arguments[1] === 'number') {
        vector = new _Vector_js__WEBPACK_IMPORTED_MODULE_0__["default"](x, y)
    } else {
        vector = new _Vector_js__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0)
    }

    return vector
}

/* harmony default export */ __webpack_exports__["default"] = (toVector);

/***/ }),

/***/ "./utils/Emitter.js":
/*!**************************!*\
  !*** ./utils/Emitter.js ***!
  \**************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Emitter {
    constructor() {
        this._events = new Map()
    }

    has(eventName) {
        return this._events.has(eventName)
    }

    on(eventName, listener) {
        const listeners = this._events.get(eventName)

        if (!listeners) {
            this._events.set(eventName, [ listener ])

            return
        }

        listeners.push(listener)
    }

    emit(eventName, ...args) {
        if (!this._events.has(eventName)) return

        this._events.get(eventName).forEach((listener) => {
            listener(...args)
        })
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Emitter);

/***/ }),

/***/ "./utils/array/getRandArrayItem.js":
/*!*****************************************!*\
  !*** ./utils/array/getRandArrayItem.js ***!
  \*****************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _math_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/index.js */ "./utils/math/index.js");


function getRandArrayItem(array) {
    if (!(array instanceof Array)) return array

    return array[(0,_math_index_js__WEBPACK_IMPORTED_MODULE_0__.randInt)(array.length - 1)]
}

/* harmony default export */ __webpack_exports__["default"] = (getRandArrayItem);

/***/ }),

/***/ "./utils/array/index.js":
/*!******************************!*\
  !*** ./utils/array/index.js ***!
  \******************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getRandArrayItem: function() { return /* reexport safe */ _getRandArrayItem_js__WEBPACK_IMPORTED_MODULE_0__["default"]; },
/* harmony export */   isArray: function() { return /* reexport safe */ _isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"]; },
/* harmony export */   toChunks: function() { return /* reexport safe */ _toChunks_js__WEBPACK_IMPORTED_MODULE_2__["default"]; }
/* harmony export */ });
/* harmony import */ var _getRandArrayItem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getRandArrayItem.js */ "./utils/array/getRandArrayItem.js");
/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isArray.js */ "./utils/array/isArray.js");
/* harmony import */ var _toChunks_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./toChunks.js */ "./utils/array/toChunks.js");






/***/ }),

/***/ "./utils/array/isArray.js":
/*!********************************!*\
  !*** ./utils/array/isArray.js ***!
  \********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function isArray(value) {
    return Array.isArray(value)
}

/* harmony default export */ __webpack_exports__["default"] = (isArray);

/***/ }),

/***/ "./utils/array/toChunks.js":
/*!*********************************!*\
  !*** ./utils/array/toChunks.js ***!
  \*********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function toChunks(array, size = 1) {
    size = Math.max(size, 0)

    const length = array == null ? 0 : array.length

    if (!length || size < 1) return []

    let index = 0
    let resIndex = 0

    const result = new Array(Math.ceil(length / size))

    while (index < length) {
        result[resIndex++] = array.slice(index, (index += size))
    }

    return result
}

/* harmony default export */ __webpack_exports__["default"] = (toChunks);

/***/ }),

/***/ "./utils/index.js":
/*!************************!*\
  !*** ./utils/index.js ***!
  \************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _math_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math/index.js */ "./utils/math/index.js");
/* harmony import */ var _object_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./object/index.js */ "./utils/object/index.js");
/* harmony import */ var _array_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./array/index.js */ "./utils/array/index.js");
/* harmony import */ var _string_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./string/index.js */ "./utils/string/index.js");
/* harmony import */ var _2d_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./2d/index.js */ "./utils/2d/index.js");
/* harmony import */ var _Emitter_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Emitter.js */ "./utils/Emitter.js");







const utils = Object.assign({
    Emitter: _Emitter_js__WEBPACK_IMPORTED_MODULE_5__["default"],
    wait(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }
}, 
    _math_index_js__WEBPACK_IMPORTED_MODULE_0__, _object_index_js__WEBPACK_IMPORTED_MODULE_1__,
    _array_index_js__WEBPACK_IMPORTED_MODULE_2__, _string_index_js__WEBPACK_IMPORTED_MODULE_3__,
    _2d_index_js__WEBPACK_IMPORTED_MODULE_4__
)

/* harmony default export */ __webpack_exports__["default"] = (utils);

/***/ }),

/***/ "./utils/math/decel.js":
/*!*****************************!*\
  !*** ./utils/math/decel.js ***!
  \*****************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function decel(value, cel) {
    if (value > 0) {
        value = Math.max(0, value - cel)
    } else if (value < 0) {
        value = Math.min(0, value + cel)
    }

    return value
}

/* harmony default export */ __webpack_exports__["default"] = (decel);

/***/ }),

/***/ "./utils/math/getAngleDistance.js":
/*!****************************************!*\
  !*** ./utils/math/getAngleDistance.js ***!
  \****************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function getAngleDistance(angleBetween, targetLookDir) {
    const difference = Math.abs(targetLookDir - angleBetween) % (Math.PI * 2)

    return (difference > Math.PI ? (Math.PI * 2) - difference : difference)
}

/* harmony default export */ __webpack_exports__["default"] = (getAngleDistance);

/***/ }),

/***/ "./utils/math/getDirection.js":
/*!************************************!*\
  !*** ./utils/math/getDirection.js ***!
  \************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function getDirection(x1, y1, x2, y2) {
    if (x1 instanceof Object && y1 instanceof Object) {
        return Math.atan2(x1.y - y1.y, x1.x - y1.x)
    }

    return Math.atan2(y1 - y2, x1 - x2)
}

/* harmony default export */ __webpack_exports__["default"] = (getDirection);

/***/ }),

/***/ "./utils/math/getDistance.js":
/*!***********************************!*\
  !*** ./utils/math/getDistance.js ***!
  \***********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function getDistance(x1, y1, x2, y2) {
    if (x1 instanceof Object && y1 instanceof Object) {
        return Math.hypot(x1.y - y1.y, x1.x - y1.x)
    }

    return Math.hypot(y1 - y2, x1 - x2)
}

/* harmony default export */ __webpack_exports__["default"] = (getDistance);

/***/ }),

/***/ "./utils/math/index.js":
/*!*****************************!*\
  !*** ./utils/math/index.js ***!
  \*****************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decel: function() { return /* reexport safe */ _decel_js__WEBPACK_IMPORTED_MODULE_0__["default"]; },
/* harmony export */   getAngleDistance: function() { return /* reexport safe */ _getAngleDistance_js__WEBPACK_IMPORTED_MODULE_1__["default"]; },
/* harmony export */   getDirection: function() { return /* reexport safe */ _getDirection_js__WEBPACK_IMPORTED_MODULE_2__["default"]; },
/* harmony export */   getDistance: function() { return /* reexport safe */ _getDistance_js__WEBPACK_IMPORTED_MODULE_3__["default"]; },
/* harmony export */   isNumber: function() { return /* reexport safe */ _isNumber_js__WEBPACK_IMPORTED_MODULE_4__["default"]; },
/* harmony export */   lerp: function() { return /* reexport safe */ _lerp_js__WEBPACK_IMPORTED_MODULE_5__["default"]; },
/* harmony export */   lerpAngle: function() { return /* reexport safe */ _lerpAngle_js__WEBPACK_IMPORTED_MODULE_6__["default"]; },
/* harmony export */   randAngle: function() { return /* reexport safe */ _randAngle_js__WEBPACK_IMPORTED_MODULE_7__["default"]; },
/* harmony export */   randFloat: function() { return /* reexport safe */ _randFloat_js__WEBPACK_IMPORTED_MODULE_8__["default"]; },
/* harmony export */   randInt: function() { return /* reexport safe */ _randInt_js__WEBPACK_IMPORTED_MODULE_9__["default"]; },
/* harmony export */   toDegrees: function() { return /* reexport safe */ _toDegrees_js__WEBPACK_IMPORTED_MODULE_10__["default"]; },
/* harmony export */   toRadians: function() { return /* reexport safe */ _toRadians_js__WEBPACK_IMPORTED_MODULE_11__["default"]; }
/* harmony export */ });
/* harmony import */ var _decel_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./decel.js */ "./utils/math/decel.js");
/* harmony import */ var _getAngleDistance_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getAngleDistance.js */ "./utils/math/getAngleDistance.js");
/* harmony import */ var _getDirection_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getDirection.js */ "./utils/math/getDirection.js");
/* harmony import */ var _getDistance_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getDistance.js */ "./utils/math/getDistance.js");
/* harmony import */ var _isNumber_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./isNumber.js */ "./utils/math/isNumber.js");
/* harmony import */ var _lerp_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lerp.js */ "./utils/math/lerp.js");
/* harmony import */ var _lerpAngle_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lerpAngle.js */ "./utils/math/lerpAngle.js");
/* harmony import */ var _randAngle_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./randAngle.js */ "./utils/math/randAngle.js");
/* harmony import */ var _randFloat_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./randFloat.js */ "./utils/math/randFloat.js");
/* harmony import */ var _randInt_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./randInt.js */ "./utils/math/randInt.js");
/* harmony import */ var _toDegrees_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./toDegrees.js */ "./utils/math/toDegrees.js");
/* harmony import */ var _toRadians_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./toRadians.js */ "./utils/math/toRadians.js");
















/***/ }),

/***/ "./utils/math/isNumber.js":
/*!********************************!*\
  !*** ./utils/math/isNumber.js ***!
  \********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function isNumber(value) {
    return typeof value == "number" && !isNaN(value) && isFinite(value)
}

/* harmony default export */ __webpack_exports__["default"] = (isNumber);

/***/ }),

/***/ "./utils/math/lerp.js":
/*!****************************!*\
  !*** ./utils/math/lerp.js ***!
  \****************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function lerp(value1, value2, amount) {
    return value1 + (value2 - value1) * amount
}

/* harmony default export */ __webpack_exports__["default"] = (lerp);

/***/ }),

/***/ "./utils/math/lerpAngle.js":
/*!*********************************!*\
  !*** ./utils/math/lerpAngle.js ***!
  \*********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function lerpAngle(value1, value2, amount) {
    const difference = Math.abs(value2 - value1)
    
    if (difference > Math.PI) {
        if (value1 > value2) {
            value2 += Math.PI * 2
        } else {
            value1 += Math.PI * 2
        }
    }

    const value = value2 + ((value1 - value2) * amount)

    if (value >= 0 && value <= (Math.PI * 2)) return value
    
    return (value % (Math.PI * 2))
}

/* harmony default export */ __webpack_exports__["default"] = (lerpAngle);

/***/ }),

/***/ "./utils/math/randAngle.js":
/*!*********************************!*\
  !*** ./utils/math/randAngle.js ***!
  \*********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _randFloat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./randFloat.js */ "./utils/math/randFloat.js");


function randAngle() {
    return (0,_randFloat_js__WEBPACK_IMPORTED_MODULE_0__["default"])(-Math.PI, Math.PI)
}

/* harmony default export */ __webpack_exports__["default"] = (randAngle);

/***/ }),

/***/ "./utils/math/randFloat.js":
/*!*********************************!*\
  !*** ./utils/math/randFloat.js ***!
  \*********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function randFloat(min, max) {
    if (typeof max === 'undefined') {
        max = min
        min = 0
    }

    return (Math.random() * (max - min + 1)) + min
}

/* harmony default export */ __webpack_exports__["default"] = (randFloat);

/***/ }),

/***/ "./utils/math/randInt.js":
/*!*******************************!*\
  !*** ./utils/math/randInt.js ***!
  \*******************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function randInt(min, max) {
    if (typeof max === 'undefined') {
        max = min
        min = 0
    }

    return Math.floor(Math.random() * (max - min + 1)) + min
}

/* harmony default export */ __webpack_exports__["default"] = (randInt);

/***/ }),

/***/ "./utils/math/toDegrees.js":
/*!*********************************!*\
  !*** ./utils/math/toDegrees.js ***!
  \*********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function toDegrees(radians) {
    return radians * 180 / Math.PI
}

/* harmony default export */ __webpack_exports__["default"] = (toDegrees);

/***/ }),

/***/ "./utils/math/toRadians.js":
/*!*********************************!*\
  !*** ./utils/math/toRadians.js ***!
  \*********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function toRadians(degrees) {
    return degrees * Math.PI / 180
}

/* harmony default export */ __webpack_exports__["default"] = (toRadians);

/***/ }),

/***/ "./utils/object/createHook.js":
/*!************************************!*\
  !*** ./utils/object/createHook.js ***!
  \************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function createHook({ property, proto = Object.prototype, setter, getter }) {
    const symbol = Symbol(property)

    Object.defineProperty(proto, property, {
        get() {
            typeof getter === 'function' && getter(this, this[symbol])

            return this[symbol]
        },
        set(value) {
            typeof setter === 'function' && setter(this, value)

            this[symbol] = value
        }
    })

    return symbol
}

/* harmony default export */ __webpack_exports__["default"] = (createHook);

/***/ }),

/***/ "./utils/object/getObjectClone.js":
/*!****************************************!*\
  !*** ./utils/object/getObjectClone.js ***!
  \****************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function getObjectClone(object) {
    if (!(object instanceof Object)) return object

    const clone = {}

    for (const key in object) {
        if (Array.isArray(object[key])) {
            clone[key] = object[key].slice(0)

            continue
        }

        clone[key] = object[key]
    }

    return clone
}

/* harmony default export */ __webpack_exports__["default"] = (getObjectClone);

/***/ }),

/***/ "./utils/object/index.js":
/*!*******************************!*\
  !*** ./utils/object/index.js ***!
  \*******************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createHook: function() { return /* reexport safe */ _createHook_js__WEBPACK_IMPORTED_MODULE_0__["default"]; },
/* harmony export */   getObjectClone: function() { return /* reexport safe */ _getObjectClone_js__WEBPACK_IMPORTED_MODULE_1__["default"]; },
/* harmony export */   isObject: function() { return /* reexport safe */ _isObject_js__WEBPACK_IMPORTED_MODULE_4__["default"]; },
/* harmony export */   objectToArray: function() { return /* reexport safe */ _objectToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"]; },
/* harmony export */   removeProto: function() { return /* reexport safe */ _removeProto_js__WEBPACK_IMPORTED_MODULE_3__["default"]; }
/* harmony export */ });
/* harmony import */ var _createHook_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createHook.js */ "./utils/object/createHook.js");
/* harmony import */ var _getObjectClone_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getObjectClone.js */ "./utils/object/getObjectClone.js");
/* harmony import */ var _objectToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./objectToArray.js */ "./utils/object/objectToArray.js");
/* harmony import */ var _removeProto_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./removeProto.js */ "./utils/object/removeProto.js");
/* harmony import */ var _isObject_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./isObject.js */ "./utils/object/isObject.js");








/***/ }),

/***/ "./utils/object/isObject.js":
/*!**********************************!*\
  !*** ./utils/object/isObject.js ***!
  \**********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function isObject(value) {
    return value instanceof Object
}

/* harmony default export */ __webpack_exports__["default"] = (isObject);

/***/ }),

/***/ "./utils/object/objectToArray.js":
/*!***************************************!*\
  !*** ./utils/object/objectToArray.js ***!
  \***************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function objectToArray(object) {
    if (object instanceof Map) return [ ...object.values() ]
    if (object instanceof Object) return [ ...Object.values(object) ]

    return object
}

/* harmony default export */ __webpack_exports__["default"] = (objectToArray);

/***/ }),

/***/ "./utils/object/removeProto.js":
/*!*************************************!*\
  !*** ./utils/object/removeProto.js ***!
  \*************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function removeProto(object) {
    if (!(object instanceof Object)) return object

    return JSON.parse(JSON.stringify(object))
}

/* harmony default export */ __webpack_exports__["default"] = (removeProto);

/***/ }),

/***/ "./utils/string/capitalizeFirst.js":
/*!*****************************************!*\
  !*** ./utils/string/capitalizeFirst.js ***!
  \*****************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

/* harmony default export */ __webpack_exports__["default"] = (capitalizeFirst);

/***/ }),

/***/ "./utils/string/formatString.js":
/*!**************************************!*\
  !*** ./utils/string/formatString.js ***!
  \**************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function formatString(value, maxLength, noValueText, checkLanguage = true) {
    const regex = checkLanguage ? /^[A-Za-z0-9.!@?#"$%&:;() *\+,\/;\-=[\\\]\^_{|}<>]$/ : /^[A-Za-z\u0400-\u04FF0-9.!@?#"$%&:;() *\+,\/;\-=[\\\]\^_{|}<>]$/
    if (![...Array(value).join("")].every((symbol) => regex.test(symbol))) return ""

    if (!value) return noValueText || ""
    
    maxLength && (value = value.slice(0, maxLength))
    value = value.trim()
    value = value.replace(/\s{2,}/g, " ")

    return value
}

/* harmony default export */ __webpack_exports__["default"] = (formatString);

/***/ }),

/***/ "./utils/string/index.js":
/*!*******************************!*\
  !*** ./utils/string/index.js ***!
  \*******************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   capitalizeFirst: function() { return /* reexport safe */ _capitalizeFirst_js__WEBPACK_IMPORTED_MODULE_0__["default"]; },
/* harmony export */   formatString: function() { return /* reexport safe */ _formatString_js__WEBPACK_IMPORTED_MODULE_1__["default"]; },
/* harmony export */   isMail: function() { return /* reexport safe */ _isMail_js__WEBPACK_IMPORTED_MODULE_2__["default"]; },
/* harmony export */   isString: function() { return /* reexport safe */ _isString_js__WEBPACK_IMPORTED_MODULE_3__["default"]; },
/* harmony export */   randString: function() { return /* reexport safe */ _randString_js__WEBPACK_IMPORTED_MODULE_4__["default"]; },
/* harmony export */   toKFormat: function() { return /* reexport safe */ _toKFormat_js__WEBPACK_IMPORTED_MODULE_5__["default"]; }
/* harmony export */ });
/* harmony import */ var _capitalizeFirst_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./capitalizeFirst.js */ "./utils/string/capitalizeFirst.js");
/* harmony import */ var _formatString_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./formatString.js */ "./utils/string/formatString.js");
/* harmony import */ var _isMail_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isMail.js */ "./utils/string/isMail.js");
/* harmony import */ var _isString_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./isString.js */ "./utils/string/isString.js");
/* harmony import */ var _randString_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./randString.js */ "./utils/string/randString.js");
/* harmony import */ var _toKFormat_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./toKFormat.js */ "./utils/string/toKFormat.js");









/***/ }),

/***/ "./utils/string/isMail.js":
/*!********************************!*\
  !*** ./utils/string/isMail.js ***!
  \********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function isMail(string) {
    const mailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return mailRegex.test(string)
}

/* harmony default export */ __webpack_exports__["default"] = (isMail);

/***/ }),

/***/ "./utils/string/isString.js":
/*!**********************************!*\
  !*** ./utils/string/isString.js ***!
  \**********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function isString(value) {
    return value && typeof value == "string"
}

/* harmony default export */ __webpack_exports__["default"] = (isString);

/***/ }),

/***/ "./utils/string/randString.js":
/*!************************************!*\
  !*** ./utils/string/randString.js ***!
  \************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function randString(length) {
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    let text = ""

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return text
}

/* harmony default export */ __webpack_exports__["default"] = (randString);

/***/ }),

/***/ "./utils/string/toKFormat.js":
/*!***********************************!*\
  !*** ./utils/string/toKFormat.js ***!
  \***********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function toKFormat(value) {
    value = parseFloat(value)

    return value > 999 ? `${(value / 1000).toFixed(1)}k` : value
}

/* harmony default export */ __webpack_exports__["default"] = (toKFormat);

/***/ }),

/***/ "./config.json":
/*!*********************!*\
  !*** ./config.json ***!
  \*********************/
/***/ (function(module) {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"gameVersion":"1.0.3b","maxServerSlots":125,"ipLimit":4,"maxNicknameLength":16,"maxChatMessageLength":30,"tickRateDiv":9,"hitReturnRatio":0.25,"hitAngle":1.5707963267948966,"gatherAngle":1.208304866765305,"generalStrokeWidth":5.5,"generalStroke":"#525252","darkGeneralStroke":"#3d3f42","deathFadeout":3000,"updateLeaderboardTime":2000,"updateSystemInfoTime":2000,"chatMessageTimer":3000,"chatHistorySize":15,"startResources":{"gold":9999999,"food":9999999,"wood":9999999,"stone":9999999},"startInventory":{"weapons":[0],"items":[0,2,4,6,10]},"resourcesScales":{"tree":[110,115,120,125],"bush":[75,80,85,89],"rock":[65,75,90],"gold":[80,85,90]},"upgradesList":{"2":[[],[1,3]],"3":[[1,2],[]],"4":[[],[8,9]],"5":[[],[5,7]]},"viewport":{"width":1920,"height":1080},"map":{"width":6400,"height":6400},"biomes":{"grass":{"fill":"#b6db66"},"river":{"fills":["#dbc666","#91b2db"],"height":780,"padding":114,"waterCurrent":0.0011,"waveSpeed":0.0001,"waveMax":1.3}},"bridge":{"fills":["#cca861","#937c4b"],"width":250,"paddingX":30,"paddingY":20,"handrailSizeDiv":8,"handrailPadding":10,"boardsGap":8,"gridCells":["15_13","15_14","15_15","15_16","15_17","15_18","16_13","16_14","16_15","16_16","16_17","16_18"]},"grid":{"stroke":"#000000","strokeWidth":4,"alpha":0.06,"divX":18,"divY":18},"boundings":{"fill":"#000000","alpha":0.09},"player":{"fills":["#bf8f54","#480505"],"damageFill":"rgba(148, 5, 5, 0.5)","damageTime":300,"leftHandScale":14,"rightHandScale":14,"scale":35,"moveSpeed":0.0016,"moveDecel":0.993,"maxHealth":100},"animals":{"moveDecel":0.993},"healthBarESP":{"fills":["#8ecc51","#cc5151","#e9c835"],"width":50,"height":17,"radius":8,"padding":4.5},"nameESP":{"fill":"#ffffff","strokeWidth":8,"font":"30px Hammersmith One"},"packets":{"SETUP":"10","ENTER_GAME":"20","ADD_PLAYER":"30","REMOVE_PLAYER":"40","UPDATE_PLAYERS":"50","WATCH_ANGLE":"60","MOVE_ANGLE":"70","ATTACK_STATE":"80","ATTACK_ANIMATION":"90","CHANGE_HEALTH":"100","KILL_PLAYER":"110","UPDATE_LEADERBOARD":"120","CHANGE_RESOURCE":"130","ADD_GAMEOBJECT":"140","REMOVE_GAMEOBJECT":"150","GAMEOBJECT_WIGGLE":"160","CHANGE_XP":"170","CHAT_MESSAGE":"180","RECEIVE_CHAT_MESSAGE":"190","UPDATE_INVENTORY":"200","SELECT_ITEM":"210","USE_ITEM":"220","AUTO_ATTACK":"230","UPDATE_ITEMS_COUNT":"240","UPDATE_UPGRADES":"250","SELECT_UPGRADE":"260","SELECT_EQUIPMENT":"270","PING":"280","PING_RESPONSE":"290","AFK_STATE":"300","ADD_ANIMAL":"310","REMOVE_ANIMAL":"320","UPDATE_ANIMALS":"330"},"keys":{"up":"KeyW","left":"KeyA","down":"KeyS","right":"KeyD","chat":"Enter","autoAttack":"KeyE","lockWatchDir":"KeyX","selectFood":"KeyQ","hideWindows":"Escape","chatValueBack":"ArrowDown","chatValueForward":"ArrowUp","useItemOnKey":"Space"}}');

/***/ }),

/***/ "./items.json":
/*!********************!*\
  !*** ./items.json ***!
  \********************/
/***/ (function(module) {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"weapons":[{"id":0,"ageAccess":1,"name":"Basic axe","desc":"Tool for gathering resources","weaponPosition":0,"damage":25,"range":65,"gatherValue":1,"speed":300},{"id":1,"ageAccess":3,"name":"Great axe","desc":"Gathers resources at a higher rate but decreases overall speed","weaponPosition":0,"damage":30,"range":70,"gatherValue":2,"speedAffect":0.8,"speed":500},{"id":2,"ageAccess":3,"name":"Short sword","desc":"Increased attack power but slower gathering speed","weaponPosition":0,"damage":35,"range":95,"gatherValue":1,"speedAffect":0.9,"speed":300},{"id":3,"name":"Wood mace","weaponPosition":0,"damage":50,"range":135,"speedAffect":0.3,"speed":2000,"spritePadding":30}],"groups":[{"id":0,"name":"foods"},{"id":1,"name":"walls","place":true,"limit":50},{"id":2,"name":"spikes","place":true,"limit":50},{"id":3,"name":"windmills","place":true,"limit":300},{"id":4,"name":"traps","place":true,"limit":50},{"id":5,"name":"boosters","place":true,"limit":50},{"id":6,"name":"mines","place":true,"limit":1},{"id":7,"name":"system_items","place":true,"limit":1000}],"items":[{"id":0,"groupId":0,"name":"Apple","desc":"Restores 20 health when consumed","requiredResources":[["food",5]],"healValue":20,"scale":22,"holdOffset":15},{"id":1,"groupId":0,"name":"Cookie","desc":"Restores 40 health when consumed","requiredResources":[["food",10]],"healValue":40,"scale":27,"holdOffset":15},{"id":2,"groupId":1,"name":"Wood wall","desc":"Provides protection for your farm","requiredResources":[["wood",10]],"maxHealth":350,"scale":47,"holdOffset":20,"placeOffset":-5},{"id":3,"groupId":1,"name":"Stone wall","desc":"Provides improved protection for your farm","requiredResources":[["stone",15]],"maxHealth":700,"scale":47,"holdOffset":20,"placeOffset":-5},{"id":4,"groupId":2,"name":"Spikes","desc":"Damages enemies when they touch them","requiredResources":[["wood",10],["stone",5]],"maxHealth":400,"damage":20,"scale":49,"spritePadding":-23,"holdOffset":8,"placeOffset":-5},{"id":5,"groupId":2,"name":"Greater spikes","desc":"Damages enemies when they touch them","requiredResources":[["wood",15],["stone",10]],"maxHealth":500,"damage":40,"scale":52,"spritePadding":-23,"holdOffset":8,"placeOffset":-5},{"id":6,"groupId":3,"name":"Windmill","desc":"Generates points over time","requiredResources":[["wood",30],["stone",5]],"maxHealth":400,"goldPerSecond":2,"turnSpeed":0.0016,"spritePadding":25,"iconLineMult":12,"scale":45,"holdOffset":20,"placeOffset":5},{"id":7,"groupId":3,"name":"Faster windmill","desc":"Generates more points over time","requiredResources":[["wood",40],["stone",10]],"maxHealth":500,"goldPerSecond":4,"turnSpeed":0.0025,"spritePadding":25,"iconLineMult":12,"scale":45,"holdOffset":20,"placeOffset":5},{"id":8,"groupId":4,"name":"Pit trap","desc":"Pit that traps enemies if they walk over it","requiredResources":[["wood",10],["stone",10]],"maxHealth":500,"ignoreCollisions":true,"collisionDiv":0.3,"stopMovevement":true,"scale":50,"holdOffset":20,"placeOffset":-5,"lowLayer":true},{"id":9,"groupId":5,"name":"Boost pad","desc":"provides boost when stepped on","requiredResources":[["wood",5],["stone",10]],"maxHealth":150,"speedAffect":1.5,"ignoreCollisions":true,"collisionDiv":0.7,"scale":45,"holdOffset":20,"placeOffset":-5,"lowLayer":true},{"id":10,"groupId":6,"name":"Mine","desc":"allows you to mine stone","requiredResources":[["stone",100]],"maxHealth":"infinity","gather":{"type":"stone","amount":1},"iconLineMult":12,"scale":65,"holdOffset":20,"placeOffset":0},{"id":11,"groupId":7,"name":"Chest","requiredResources":[["gold",10000]],"maxHealth":1000,"scale":65,"spritePadding":30}],"hats":[{"id":0,"src":"bummel_hat","name":"Bummel Hat","desc":"It doesn\'t make sense, but it\'s a really good hat","cost":100,"scale":120},{"id":1,"src":"booster_hat","name":"Booster Hat","desc":"Increases your movement speed","cost":1500,"speedAffect":1.16,"scale":120},{"id":2,"src":"bull_helmet","name":"Bull Helmet","desc":"Increases damage done but drains health","cost":2500,"healthRegen":-5,"damageAffect":1.5,"speedAffect":0.96,"scale":120},{"id":3,"src":"bushido_armor","name":"Bushido Armor","desc":"Heals you when you damage others","cost":3000,"healAfterHit":0.4,"scale":120},{"id":4,"src":"spike_gear","name":"Spike Gear","desc":"deal damage to players that damage you","cost":3250,"damageAfterHitMe":0.45,"scale":120}],"animals":[{"id":0,"src":"fish","name":"Fish","isPassive":true,"scale":35,"maxHealth":75,"weightMult":0.5,"moveSpeed":0.0009,"turnSpeed":0.0025,"ignoreWaterCurrent":true,"onlyRiverWalk":true,"cantBoosting":true,"xpForKill":50,"requiredResources":[["food",40],["gold",100]],"maxEntities":35,"spawnBiome":"river","healthbarWidthDiv":2,"spriteSizeMult":2.25}]}');

/***/ }),

/***/ "./public/frontend/renders/layers.json":
/*!*********************************************!*\
  !*** ./public/frontend/renders/layers.json ***!
  \*********************************************/
/***/ (function(module) {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"camera":{"id":1,"layer":1},"background":{"id":2,"layer":1},"boundings":{"id":3,"layer":1},"grid":{"id":4,"layer":1},"gameObjetsLow":{"id":1,"layer":2},"playersLow":{"id":2,"layer":2},"animalsLow":{"id":3,"layer":2},"animalsESPLow":{"id":4,"layer":2},"playersESPLow":{"id":5,"layer":2},"bridge":{"id":6,"layer":2},"playersHigh":{"id":7,"layer":2},"animalsHigh":{"id":8,"layer":2},"gameObjetsHigh":{"id":9,"layer":2},"stones":{"id":10,"layer":2},"golds":{"id":11,"layer":2},"foods":{"id":12,"layer":2},"trees":{"id":13,"layer":2},"gameObjectsESP":{"id":1,"layer":3},"animalsESPHigh":{"id":2,"layer":3},"playersESPHigh":{"id":3,"layer":3},"chatMessages":{"id":4,"layer":3},"deathText":{"id":5,"layer":3},"minimap":{"id":6,"layer":3},"fadeTexts":{"id":7,"layer":3}}');

/***/ }),

/***/ "./public/frontend/textures/images.json":
/*!**********************************************!*\
  !*** ./public/frontend/textures/images.json ***!
  \**********************************************/
/***/ (function(module) {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"barbarian":"/hats/barbarian","mega_barbarian":"/hats/mega_barbarian","booster_hat":"/hats/booster_hat","bull_helmet":"/hats/bull_helmet","bummel_hat":"/hats/bummel_hat","bushido_armor":"/hats/bushido_armor","spike_gear":"/hats/spike_gear","fish":"/animals/fish"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!**********************************!*\
  !*** ./public/frontend/index.js ***!
  \**********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./const.js */ "./public/frontend/const.js");
/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../config.json */ "./config.json");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/index.js */ "./utils/index.js");





window._ = _const_js__WEBPACK_IMPORTED_MODULE_0__

_const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gameNicknameInput.setValue(localStorage.getItem("moo_legacy_nickname" || 0))

_const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gameNicknameInput.on("blur", () => {
    _const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gameNicknameInput.value = _utils_index_js__WEBPACK_IMPORTED_MODULE_2__["default"].formatString(_const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gameNicknameInput.value, _config_json__WEBPACK_IMPORTED_MODULE_1__.maxNicknameLength)
})

_const_js__WEBPACK_IMPORTED_MODULE_0__.ui.enterGame.addEventListener("click", () => {
    if (!event.isTrusted) return
    if (!_const_js__WEBPACK_IMPORTED_MODULE_0__.network.socket.isReady) return

    _const_js__WEBPACK_IMPORTED_MODULE_0__.ui.emit("show-gameui")
    _const_js__WEBPACK_IMPORTED_MODULE_0__.network.socket.sendEnterGame()
    _const_js__WEBPACK_IMPORTED_MODULE_0__.gameObjects.clear()
    localStorage.setItem("moo_legacy_nickname", _const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gameNicknameInput.getValue())
})

_const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.toggleShopBtn.addEventListener("click", _const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.toggleShop.bind(_const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui))

_const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.gameUI.on("mousedown", (event) => {
    event.preventDefault()
    event.stopPropagation()

    if (!event.isTrusted) return

    if (!_const_js__WEBPACK_IMPORTED_MODULE_0__.im.isPlaying) return
    if (_const_js__WEBPACK_IMPORTED_MODULE_0__.ui.isInputFocused() || event.target.classList.contains("prevent-click")) return

    if (_const_js__WEBPACK_IMPORTED_MODULE_0__.im.isAdmin) {
        if (event.button === 1) {
            _const_js__WEBPACK_IMPORTED_MODULE_0__.clickWarp.active = !_const_js__WEBPACK_IMPORTED_MODULE_0__.clickWarp.active

            return
        }
    
        if (_const_js__WEBPACK_IMPORTED_MODULE_0__.clickWarp.active && event.button === 0) {
            _const_js__WEBPACK_IMPORTED_MODULE_0__.clickWarp.active = false

            return _const_js__WEBPACK_IMPORTED_MODULE_0__.network.socket.send("998", _const_js__WEBPACK_IMPORTED_MODULE_0__.clickWarp.x, _const_js__WEBPACK_IMPORTED_MODULE_0__.clickWarp.y)
        }
    }
        
    if (event.button !== 0) {
        return _const_js__WEBPACK_IMPORTED_MODULE_0__.network.socket.sendSelectItem(false, -1)
    }

    _const_js__WEBPACK_IMPORTED_MODULE_0__.network.socket.sendAttackState(true)
    _const_js__WEBPACK_IMPORTED_MODULE_0__.network.socket.sendUseItem()
})

_const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.gameUI.on("mouseup", () => {
    if (!event.isTrusted) return

    _const_js__WEBPACK_IMPORTED_MODULE_0__.network.socket.sendAttackState(false)
})

_const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.gameUI.addEventListener("mousemove", (event) => {
    event.preventDefault()
    event.stopPropagation()

    if (!event.isTrusted) return
    if (event.target.classList.contains("prevent-click")) return

    _const_js__WEBPACK_IMPORTED_MODULE_0__.mouse.x = event.clientX
    _const_js__WEBPACK_IMPORTED_MODULE_0__.mouse.y = event.clientY
})

window.addEventListener("keydown", (event) => {
    if (!event.isTrusted) return

    const keyCode = event.code

    if (!_const_js__WEBPACK_IMPORTED_MODULE_0__.im.isPlaying) return
    if (_const_js__WEBPACK_IMPORTED_MODULE_0__.keys.get(event.code)) return

    if (keyCode === _config_json__WEBPACK_IMPORTED_MODULE_1__.keys.hideWindows) _const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.hideTempWindows()

    if (_const_js__WEBPACK_IMPORTED_MODULE_0__.ui.isInputFocused()) return

    _const_js__WEBPACK_IMPORTED_MODULE_0__.keys.set(event.code, true)

    if (keyCode === _config_json__WEBPACK_IMPORTED_MODULE_1__.keys.autoAttack) _const_js__WEBPACK_IMPORTED_MODULE_0__.network.socket.sendAutoAttack()
    if (keyCode === _config_json__WEBPACK_IMPORTED_MODULE_1__.keys.lockWatchDir) _const_js__WEBPACK_IMPORTED_MODULE_0__.im.isLockWatchDir = !_const_js__WEBPACK_IMPORTED_MODULE_0__.im.isLockWatchDir
    if (keyCode === _config_json__WEBPACK_IMPORTED_MODULE_1__.keys.selectFood) _const_js__WEBPACK_IMPORTED_MODULE_0__.network.socket.sendSelectItem(false, _const_js__WEBPACK_IMPORTED_MODULE_0__.im.inventory.items[0])

    if (keyCode === _config_json__WEBPACK_IMPORTED_MODULE_1__.keys.useItemOnKey) {
        _const_js__WEBPACK_IMPORTED_MODULE_0__.network.socket.sendUseItem()
    }
    
    const keyId = event.which || event.keyCode

    if (typeof _const_js__WEBPACK_IMPORTED_MODULE_0__.im.inventory.weapons[keyId - 49] !== 'undefined') {
        return _const_js__WEBPACK_IMPORTED_MODULE_0__.network.socket.sendSelectItem(true, _const_js__WEBPACK_IMPORTED_MODULE_0__.im.inventory.weapons[keyId - 49])
    }

    if (typeof _const_js__WEBPACK_IMPORTED_MODULE_0__.im.inventory.items[keyId - 49 - _const_js__WEBPACK_IMPORTED_MODULE_0__.im.inventory.weapons.length] !== 'undefined') {
        return _const_js__WEBPACK_IMPORTED_MODULE_0__.network.socket.sendSelectItem(false, _const_js__WEBPACK_IMPORTED_MODULE_0__.im.inventory.items[keyId - 49 - _const_js__WEBPACK_IMPORTED_MODULE_0__.im.inventory.weapons.length])
    }
})

window.addEventListener("keyup", (event) => {
    if (!event.isTrusted) return

    const keyCode = event.code

    _const_js__WEBPACK_IMPORTED_MODULE_0__.keys.set(keyCode, false)

    if (!_const_js__WEBPACK_IMPORTED_MODULE_0__.im.isPlaying) return 

    if ([ _config_json__WEBPACK_IMPORTED_MODULE_1__.keys.chatValueBack, _config_json__WEBPACK_IMPORTED_MODULE_1__.keys.chatValueForward ].includes(keyCode) && !_const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.chatHolder.hasClass("hidden")) {
        _const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.chatHistoryIndex += keyCode === _config_json__WEBPACK_IMPORTED_MODULE_1__.keys.chatValueBack ? -1 : keyCode === _config_json__WEBPACK_IMPORTED_MODULE_1__.keys.chatValueForward ? 1 : 0
        _const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.chatHistoryIndex = Math.max(0, Math.min(_const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.chatHistoryIndex, _const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.chatHistory.length - 1))

        if (_const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.chatHistory[_const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.chatHistoryIndex]) {
            _const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.chatInput.setValue(_const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.chatHistory[_const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.chatHistoryIndex])
        }
    }

    if (keyCode === _config_json__WEBPACK_IMPORTED_MODULE_1__.keys.chat) {
        _const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.toggleChat()

        if (_const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.chatHolder.hasClass("hidden")) {
            const chatMessage = _const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.chatInput.getValue()

            if (chatMessage) {
                _const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.chatHistory.push(chatMessage)
                _const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.chatHistory = _const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.chatHistory.reverse()
            }

            if (_const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.chatHistory.length > _config_json__WEBPACK_IMPORTED_MODULE_1__.chatHistorySize) {
                _const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.chatHistory.shift()
            }

            _const_js__WEBPACK_IMPORTED_MODULE_0__.network.socket.sendChatMessage(chatMessage)
            _const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.chatInput.setValue("")

            _const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.chatHistoryIndex = -1
        } else {
            _const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.chatHistoryIndex !== -1 && _const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.chatInput.setValue(_const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.chatHistory[_const_js__WEBPACK_IMPORTED_MODULE_0__.ui.gui.chatHistoryIndex])
        }
    }
})

window.addEventListener("blur", () => _const_js__WEBPACK_IMPORTED_MODULE_0__.network.socket.sendAFKState(true))
window.addEventListener("focus", () => _const_js__WEBPACK_IMPORTED_MODULE_0__.network.socket.sendAFKState(false))

_const_js__WEBPACK_IMPORTED_MODULE_0__.images.loadAllImages().then(() => {
    _const_js__WEBPACK_IMPORTED_MODULE_0__.network.socket.connect().then(() => {
        _const_js__WEBPACK_IMPORTED_MODULE_0__.ui.emit("show-homepage")
    })
})
}();
/******/ })()
;
//# sourceMappingURL=moomoo_io_legacy.js.map