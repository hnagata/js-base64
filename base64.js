/*
* js-base64
* https://github.com/hnagata/js-base64
* Copyright (c) 2014 H. Nagata
* Licensed under the MIT license.
* 
* This program is based on base64-arraybuffer. 
* https://github.com/niklasvh/base64-arraybuffer	
* Copyright (c) 2012 Niklas von Hertzen
* Licensed under the MIT license.
*/

var base64 = base64 || (function() {
	var chars = 
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

	function encode(bytes) {
		var i, len = bytes.byteLength, base64 = "", b1, b2, b3;
		for (i = 0; i < len; i += 3) {
			b1 = bytes[i];
			b2 = bytes[i + 1];
			b3 = bytes[i + 2];
			base64 += chars[b1 >> 2];
			base64 += chars[(b1 & 0x03) << 4 | b2 >> 4];
			base64 += chars[(b2 & 0x0F) << 2 | b3 >> 6];
			base64 += chars[b3 & 0x3F];
		}
		if (len % 3 == 2) {
			base64 = base64.substring(0, base64.length - 1) + "=";
		} else if (len % 3 == 1) {
			base64 = base64.substring(0, base64.length - 2) + "==";
		}
		return base64;
	}

	function decode(base64) {
		var byteLength = base64.length * 0.75,
		len = base64.length, i, p = 0, c1, c2, c3, c4;
		if (base64[base64.length - 1] === "=") {
			--byteLength;
			if (base64[base64.length - 2] === "=") {
				--byteLength;
			}
		}
		var bytes = new Uint8Array(byteLength);
		for (i = 0; i < len; i += 4) {
			c1 = chars.indexOf(base64[i]);
			c2 = chars.indexOf(base64[i + 1]);
			c3 = chars.indexOf(base64[i + 2]);
			c4 = chars.indexOf(base64[i + 3]);
			if (c1 >= 0xC0 || c2 >= 0xC0 || c3 >= 0xC0 || c4 >= 0xC0) {
				throw "Illegal base64 character";
			}
			bytes[p++] = (c1 << 2) | (c2 >> 4);
			bytes[p++] = ((c2 & 0x0F) << 4) | (c3 >> 2);
			bytes[p++] = ((c3 & 0x03) << 6) | (c4 & 0x3F);
		}
		return bytes;
	}

	return {
		encode: encode,
		decode: decode
	};
})();

