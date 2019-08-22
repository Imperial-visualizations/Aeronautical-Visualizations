/*
 * Crypto-JS v2.4.0
 * http://code.google.com/p/crypto-js/
 * Copyright (c) 2011, Jeff Mott. All rights reserved.
 * http://code.google.com/p/crypto-js/wiki/License
 */
if(typeof Crypto=="undefined"||!Crypto.util)(function(){var g=window.Crypto={},m=g.util={rotl:function(a,c){return a<<c|a>>>32-c},rotr:function(a,c){return a<<32-c|a>>>c},endian:function(a){if(a.constructor==Number)return m.rotl(a,8)&16711935|m.rotl(a,24)&4278255360;for(var c=0;c<a.length;c++)a[c]=m.endian(a[c]);return a},randomBytes:function(a){for(var c=[];a>0;a--)c.push(Math.floor(Math.random()*256));return c},bytesToWords:function(a){for(var c=[],b=0,d=0;b<a.length;b++,d+=8)c[d>>>5]|=a[b]<<24-
d%32;return c},wordsToBytes:function(a){for(var c=[],b=0;b<a.length*32;b+=8)c.push(a[b>>>5]>>>24-b%32&255);return c},bytesToHex:function(a){for(var c=[],b=0;b<a.length;b++){c.push((a[b]>>>4).toString(16));c.push((a[b]&15).toString(16))}return c.join("")},hexToBytes:function(a){for(var c=[],b=0;b<a.length;b+=2)c.push(parseInt(a.substr(b,2),16));return c},bytesToBase64:function(a){if(typeof btoa=="function")return btoa(k.bytesToString(a));for(var c=[],b=0;b<a.length;b+=3)for(var d=a[b]<<16|a[b+1]<<
8|a[b+2],e=0;e<4;e++)b*8+e*6<=a.length*8?c.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(d>>>6*(3-e)&63)):c.push("=");return c.join("")},base64ToBytes:function(a){if(typeof atob=="function")return k.stringToBytes(atob(a));a=a.replace(/[^A-Z0-9+\/]/ig,"");for(var c=[],b=0,d=0;b<a.length;d=++b%4)d!=0&&c.push(("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(a.charAt(b-1))&Math.pow(2,-2*d+8)-1)<<d*2|"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(a.charAt(b))>>>
6-d*2);return c}};g=g.charenc={};g.UTF8={stringToBytes:function(a){return k.stringToBytes(unescape(encodeURIComponent(a)))},bytesToString:function(a){return decodeURIComponent(escape(k.bytesToString(a)))}};var k=g.Binary={stringToBytes:function(a){for(var c=[],b=0;b<a.length;b++)c.push(a.charCodeAt(b)&255);return c},bytesToString:function(a){for(var c=[],b=0;b<a.length;b++)c.push(String.fromCharCode(a[b]));return c.join("")}}})();
(function(){var g=Crypto,m=g.util,k=g.charenc,a=k.UTF8,c=k.Binary,b=g.SHA1=function(d,e){var f=m.wordsToBytes(b._sha1(d));return e&&e.asBytes?f:e&&e.asString?c.bytesToString(f):m.bytesToHex(f)};b._sha1=function(d){if(d.constructor==String)d=a.stringToBytes(d);var e=m.bytesToWords(d),f=d.length*8;d=[];var l=1732584193,h=-271733879,n=-1732584194,i=271733878,o=-1009589776;e[f>>5]|=128<<24-f%32;e[(f+64>>>9<<4)+15]=f;for(f=0;f<e.length;f+=16){for(var p=l,r=h,s=n,q=i,u=o,j=0;j<80;j++){if(j<16)d[j]=e[f+
j];else{var t=d[j-3]^d[j-8]^d[j-14]^d[j-16];d[j]=t<<1|t>>>31}t=(l<<5|l>>>27)+o+(d[j]>>>0)+(j<20?(h&n|~h&i)+1518500249:j<40?(h^n^i)+1859775393:j<60?(h&n|h&i|n&i)-1894007588:(h^n^i)-899497514);o=i;i=n;n=h<<30|h>>>2;h=l;l=t}l+=p;h+=r;n+=s;i+=q;o+=u}return[l,h,n,i,o]};b._blocksize=16;b._digestsize=20})();
(function(){var g=Crypto,m=g.util,k=g.charenc,a=k.UTF8,c=k.Binary;g.HMAC=function(b,d,e,f){if(d.constructor==String)d=a.stringToBytes(d);if(e.constructor==String)e=a.stringToBytes(e);if(e.length>b._blocksize*4)e=b(e,{asBytes:true});var l=e.slice(0);e=e.slice(0);for(var h=0;h<b._blocksize*4;h++){l[h]^=92;e[h]^=54}b=b(l.concat(b(e.concat(d),{asBytes:true})),{asBytes:true});return f&&f.asBytes?b:f&&f.asString?c.bytesToString(b):m.bytesToHex(b)}})();
(function(){var g=Crypto,m=g.util,k=g.charenc,a=k.UTF8,c=k.Binary;g.PBKDF2=function(b,d,e,f){function l(u,j){return g.HMAC(h,j,u,{asBytes:true})}if(b.constructor==String)b=a.stringToBytes(b);if(d.constructor==String)d=a.stringToBytes(d);for(var h=f&&f.hasher||g.SHA1,n=f&&f.iterations||1,i=[],o=1;i.length<e;){for(var p=l(b,d.concat(m.wordsToBytes([o]))),r=p,s=1;s<n;s++){r=l(b,r);for(var q=0;q<p.length;q++)p[q]^=r[q]}i=i.concat(p);o++}i.length=e;return f&&f.asBytes?i:f&&f.asString?c.bytesToString(i):
m.bytesToHex(i)}})();
