js-base64
=========

Converts ArrayBuffer into base64 string and vice versa.

Note
----

This library does not provide direct string-to-base64 convertion methods, since JavaScript string includes 2 byte characters. It causes some problems such that we cannot determine base64 string represents single byte array (binary) or 2 byte array (character). Alternatively I recommend to convert raw string into ArrayBuffer encoding by UTF-8. [js-utf8](https://github.com/hnagata/js-utf8) library is available for this purpose.

Usage
-----

```js
/* Encoding */

base64.encode(new Uint8Array([0x68, 0x6F, 0x67, 0x65]));
// Returns "aG9nZQ=="

base64.encode(utf8.encode("hoge"));
// string to base64, returns the same as above

/* Decoding */

base64.decode("aG9nZQ==")
// Returns ArrayBuffer

utf8.decode(base64.decode("aG9nZQ=="))
// Returns "hoge"
```

License
-------
Copyright (c) 2014 H. Nagata Licensed under the MIT license.

This program is based on base64-arraybuffer. 
https://github.com/niklasvh/base64-arraybuffer  
Copyright (c) 2012 Niklas von Hertzen Licensed under the MIT license.
