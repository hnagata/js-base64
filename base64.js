/*
* net.hnagata.base64
* https://github.com/hnagata/js-base64
* H. Nagata, 2014/03/06
*
* This program is based on base64-arraybuffer.
* https://github.com/niklasvh/base64-arraybuffer
* Copyright (c) 2012 Niklas von Hertzen
*/

base64 = base64 || {};

(function(lib) {
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\
";

  function str2buffer(str) {
    var n = str.length,
    idx = -1,
    byteLength = n,
    bytes = new Uint8Array(byteLength),
    i, c, _bytes;

    for(i = 0; i < n; ++i){
      c = str.charCodeAt(i);
      if(c <= 0x7F){
        bytes[++idx] = c;
      } else if(c <= 0x7FF){
        bytes[++idx] = 0xC0 | (c >>> 6);
        bytes[++idx] = 0x80 | (c & 0x3F);
      } else if(c <= 0xFFFF){
        bytes[++idx] = 0xE0 | (c >>> 12);
        bytes[++idx] = 0x80 | ((c >>> 6) & 0x3F);
        bytes[++idx] = 0x80 | (c & 0x3F);
      } else {
        bytes[++idx] = 0xF0 | (c >>> 18);
        bytes[++idx] = 0x80 | ((c >>> 12) & 0x3F);
        bytes[++idx] = 0x80 | ((c >>> 6) & 0x3F);
        bytes[++idx] = 0x80 | (c & 0x3F);
      }
      if(byteLength - idx <= 4){
        _bytes = bytes;
        byteLength *= 2;
        bytes = new Uint8Array(byteLength);
        bytes.set(_bytes);
      }
    }
    return bytes.subarray(0, ++idx);
  }

  lib.encode = function(arraybuffer) {
    if (typeof arraybuffer == "string") {
      arraybuffer = str2buffer(arraybuffer);
    }

    var bytes = new Uint8Array(arraybuffer),
    i, len = bytes.byteLength, base64 = "";

    for (i = 0; i < len; i+=3) {
      base64 += chars[bytes[i] >> 2];
      base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
      base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
      base64 += chars[bytes[i + 2] & 63];
    }

    if ((len % 3) === 2) {
      base64 = base64.substring(0, base64.length - 1) + "=";
    } else if (len % 3 === 1) {
      base64 = base64.substring(0, base64.length - 2) + "==";
    }

    return base64;
  };

  lib.decode = function(base64) {
    var bufferLength = base64.length * 0.75,
    len = base64.length, i, p = 0,
    encoded1, encoded2, encoded3, encoded4;

    if (base64[base64.length - 1] === "=") {
      bufferLength--;
      if (base64[base64.length - 2] === "=") {
        bufferLength--;
      }
    }

    var arraybuffer = new ArrayBuffer(bufferLength),
    bytes = new Uint8Array(arraybuffer);

    for (i = 0; i < len; i+=4) {
      encoded1 = chars.indexOf(base64[i]);
      encoded2 = chars.indexOf(base64[i+1]);
      encoded3 = chars.indexOf(base64[i+2]);
      encoded4 = chars.indexOf(base64[i+3]);

      bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
      bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
      bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }

    return arraybuffer;
  };
})(base64);

