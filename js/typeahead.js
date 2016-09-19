/*! LZString Compressor */
/*DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE 
Version 2, December 2004 
Copyright (C) 2004 Sam Hocevar <sam@hocevar.net> 
Everyone is permitted to copy and distribute verbatim or modified 
copies of this license document, and changing it is allowed as long 
as the name is changed. 
DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE 
TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION 
0. You just DO WHAT THE FUCK YOU WANT TO.
*/
var LZString={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",_f:String.fromCharCode,compressToBase64:function(e){if(e==null)return"";var t="";var n,r,i,s,o,u,a;var f=0;e=LZString.compress(e);while(f<e.length*2){if(f%2==0){n=e.charCodeAt(f/2)>>8;r=e.charCodeAt(f/2)&255;if(f/2+1<e.length)i=e.charCodeAt(f/2+1)>>8;else i=NaN}else{n=e.charCodeAt((f-1)/2)&255;if((f+1)/2<e.length){r=e.charCodeAt((f+1)/2)>>8;i=e.charCodeAt((f+1)/2)&255}else r=i=NaN}f+=3;s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+LZString._keyStr.charAt(s)+LZString._keyStr.charAt(o)+LZString._keyStr.charAt(u)+LZString._keyStr.charAt(a)}return t},decompressFromBase64:function(e){if(e==null)return"";var t="",n=0,r,i,s,o,u,a,f,l,c=0,h=LZString._f;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(c<e.length){u=LZString._keyStr.indexOf(e.charAt(c++));a=LZString._keyStr.indexOf(e.charAt(c++));f=LZString._keyStr.indexOf(e.charAt(c++));l=LZString._keyStr.indexOf(e.charAt(c++));i=u<<2|a>>4;s=(a&15)<<4|f>>2;o=(f&3)<<6|l;if(n%2==0){r=i<<8;if(f!=64){t+=h(r|s)}if(l!=64){r=o<<8}}else{t=t+h(r|i);if(f!=64){r=s<<8}if(l!=64){t+=h(r|o)}}n+=3}return LZString.decompress(t)},compressToUTF16:function(e){if(e==null)return"";var t="",n,r,i,s=0,o=LZString._f;e=LZString.compress(e);for(n=0;n<e.length;n++){r=e.charCodeAt(n);switch(s++){case 0:t+=o((r>>1)+32);i=(r&1)<<14;break;case 1:t+=o(i+(r>>2)+32);i=(r&3)<<13;break;case 2:t+=o(i+(r>>3)+32);i=(r&7)<<12;break;case 3:t+=o(i+(r>>4)+32);i=(r&15)<<11;break;case 4:t+=o(i+(r>>5)+32);i=(r&31)<<10;break;case 5:t+=o(i+(r>>6)+32);i=(r&63)<<9;break;case 6:t+=o(i+(r>>7)+32);i=(r&127)<<8;break;case 7:t+=o(i+(r>>8)+32);i=(r&255)<<7;break;case 8:t+=o(i+(r>>9)+32);i=(r&511)<<6;break;case 9:t+=o(i+(r>>10)+32);i=(r&1023)<<5;break;case 10:t+=o(i+(r>>11)+32);i=(r&2047)<<4;break;case 11:t+=o(i+(r>>12)+32);i=(r&4095)<<3;break;case 12:t+=o(i+(r>>13)+32);i=(r&8191)<<2;break;case 13:t+=o(i+(r>>14)+32);i=(r&16383)<<1;break;case 14:t+=o(i+(r>>15)+32,(r&32767)+32);s=0;break}}return t+o(i+32)},decompressFromUTF16:function(e){if(e==null)return"";var t="",n,r,i=0,s=0,o=LZString._f;while(s<e.length){r=e.charCodeAt(s)-32;switch(i++){case 0:n=r<<1;break;case 1:t+=o(n|r>>14);n=(r&16383)<<2;break;case 2:t+=o(n|r>>13);n=(r&8191)<<3;break;case 3:t+=o(n|r>>12);n=(r&4095)<<4;break;case 4:t+=o(n|r>>11);n=(r&2047)<<5;break;case 5:t+=o(n|r>>10);n=(r&1023)<<6;break;case 6:t+=o(n|r>>9);n=(r&511)<<7;break;case 7:t+=o(n|r>>8);n=(r&255)<<8;break;case 8:t+=o(n|r>>7);n=(r&127)<<9;break;case 9:t+=o(n|r>>6);n=(r&63)<<10;break;case 10:t+=o(n|r>>5);n=(r&31)<<11;break;case 11:t+=o(n|r>>4);n=(r&15)<<12;break;case 12:t+=o(n|r>>3);n=(r&7)<<13;break;case 13:t+=o(n|r>>2);n=(r&3)<<14;break;case 14:t+=o(n|r>>1);n=(r&1)<<15;break;case 15:t+=o(n|r);i=0;break}s++}return LZString.decompress(t)},compress:function(e){if(e==null)return"";var t,n,r={},i={},s="",o="",u="",a=2,f=3,l=2,c="",h=0,p=0,d,v=LZString._f;for(d=0;d<e.length;d+=1){s=e.charAt(d);if(!Object.prototype.hasOwnProperty.call(r,s)){r[s]=f++;i[s]=true}o=u+s;if(Object.prototype.hasOwnProperty.call(r,o)){u=o}else{if(Object.prototype.hasOwnProperty.call(i,u)){if(u.charCodeAt(0)<256){for(t=0;t<l;t++){h=h<<1;if(p==15){p=0;c+=v(h);h=0}else{p++}}n=u.charCodeAt(0);for(t=0;t<8;t++){h=h<<1|n&1;if(p==15){p=0;c+=v(h);h=0}else{p++}n=n>>1}}else{n=1;for(t=0;t<l;t++){h=h<<1|n;if(p==15){p=0;c+=v(h);h=0}else{p++}n=0}n=u.charCodeAt(0);for(t=0;t<16;t++){h=h<<1|n&1;if(p==15){p=0;c+=v(h);h=0}else{p++}n=n>>1}}a--;if(a==0){a=Math.pow(2,l);l++}delete i[u]}else{n=r[u];for(t=0;t<l;t++){h=h<<1|n&1;if(p==15){p=0;c+=v(h);h=0}else{p++}n=n>>1}}a--;if(a==0){a=Math.pow(2,l);l++}r[o]=f++;u=String(s)}}if(u!==""){if(Object.prototype.hasOwnProperty.call(i,u)){if(u.charCodeAt(0)<256){for(t=0;t<l;t++){h=h<<1;if(p==15){p=0;c+=v(h);h=0}else{p++}}n=u.charCodeAt(0);for(t=0;t<8;t++){h=h<<1|n&1;if(p==15){p=0;c+=v(h);h=0}else{p++}n=n>>1}}else{n=1;for(t=0;t<l;t++){h=h<<1|n;if(p==15){p=0;c+=v(h);h=0}else{p++}n=0}n=u.charCodeAt(0);for(t=0;t<16;t++){h=h<<1|n&1;if(p==15){p=0;c+=v(h);h=0}else{p++}n=n>>1}}a--;if(a==0){a=Math.pow(2,l);l++}delete i[u]}else{n=r[u];for(t=0;t<l;t++){h=h<<1|n&1;if(p==15){p=0;c+=v(h);h=0}else{p++}n=n>>1}}a--;if(a==0){a=Math.pow(2,l);l++}}n=2;for(t=0;t<l;t++){h=h<<1|n&1;if(p==15){p=0;c+=v(h);h=0}else{p++}n=n>>1}while(true){h=h<<1;if(p==15){c+=v(h);break}else p++}return c},decompress:function(e){if(e==null)return"";if(e=="")return null;var t=[],n,r=4,i=4,s=3,o="",u="",a,f,l,c,h,p,d,v=LZString._f,m={string:e,val:e.charCodeAt(0),position:32768,index:1};for(a=0;a<3;a+=1){t[a]=a}l=0;h=Math.pow(2,2);p=1;while(p!=h){c=m.val&m.position;m.position>>=1;if(m.position==0){m.position=32768;m.val=m.string.charCodeAt(m.index++)}l|=(c>0?1:0)*p;p<<=1}switch(n=l){case 0:l=0;h=Math.pow(2,8);p=1;while(p!=h){c=m.val&m.position;m.position>>=1;if(m.position==0){m.position=32768;m.val=m.string.charCodeAt(m.index++)}l|=(c>0?1:0)*p;p<<=1}d=v(l);break;case 1:l=0;h=Math.pow(2,16);p=1;while(p!=h){c=m.val&m.position;m.position>>=1;if(m.position==0){m.position=32768;m.val=m.string.charCodeAt(m.index++)}l|=(c>0?1:0)*p;p<<=1}d=v(l);break;case 2:return""}t[3]=d;f=u=d;while(true){if(m.index>m.string.length){return""}l=0;h=Math.pow(2,s);p=1;while(p!=h){c=m.val&m.position;m.position>>=1;if(m.position==0){m.position=32768;m.val=m.string.charCodeAt(m.index++)}l|=(c>0?1:0)*p;p<<=1}switch(d=l){case 0:l=0;h=Math.pow(2,8);p=1;while(p!=h){c=m.val&m.position;m.position>>=1;if(m.position==0){m.position=32768;m.val=m.string.charCodeAt(m.index++)}l|=(c>0?1:0)*p;p<<=1}t[i++]=v(l);d=i-1;r--;break;case 1:l=0;h=Math.pow(2,16);p=1;while(p!=h){c=m.val&m.position;m.position>>=1;if(m.position==0){m.position=32768;m.val=m.string.charCodeAt(m.index++)}l|=(c>0?1:0)*p;p<<=1}t[i++]=v(l);d=i-1;r--;break;case 2:return u}if(r==0){r=Math.pow(2,s);s++}if(t[d]){o=t[d]}else{if(d===i){o=f+f.charAt(0)}else{return null}}u+=o;t[i++]=f+o.charAt(0);r--;f=o;if(r==0){r=Math.pow(2,s);s++}}}};if(typeof module!=="undefined"&&module!=null){module.exports=LZString}
/*! JSXCompressor*/
/*Copyright 2008-2013
Matthias Ehmann,
Michael Gerhaeuser,
Carsten Miller,
Bianca Valentin,
Alfred Wassermann,
Peter Wilfahrt
Dual licensed under the Apache License Version 2.0, or LGPL Version 3 licenses.
You should have received a copy of the GNU Lesser General Public License
along with JSXCompressor.  If not, see <http://www.gnu.org/licenses/>.
You should have received a copy of the Apache License along with JSXCompressor.
If not, see <http://www.apache.org/licenses/>.
*/
(function(){var e,r,n;(function(t){function o(e,r){return C.call(e,r)}function i(e,r){var n,t,o,i,a,u,c,f,s,l,p=r&&r.split("/"),h=k.map,d=h&&h["*"]||{};if(e&&"."===e.charAt(0))if(r){for(p=p.slice(0,p.length-1),e=p.concat(e.split("/")),f=0;e.length>f;f+=1)if(l=e[f],"."===l)e.splice(f,1),f-=1;else if(".."===l){if(1===f&&(".."===e[2]||".."===e[0]))break;f>0&&(e.splice(f-1,2),f-=2)}e=e.join("/")}else 0===e.indexOf("./")&&(e=e.substring(2));if((p||d)&&h){for(n=e.split("/"),f=n.length;f>0;f-=1){if(t=n.slice(0,f).join("/"),p)for(s=p.length;s>0;s-=1)if(o=h[p.slice(0,s).join("/")],o&&(o=o[t])){i=o,a=f;break}if(i)break;!u&&d&&d[t]&&(u=d[t],c=f)}!i&&u&&(i=u,a=c),i&&(n.splice(0,a,i),e=n.join("/"))}return e}function a(e,r){return function(){return h.apply(t,v.call(arguments,0).concat([e,r]))}}function u(e){return function(r){return i(r,e)}}function c(e){return function(r){b[e]=r}}function f(e){if(o(m,e)){var r=m[e];delete m[e],y[e]=!0,p.apply(t,r)}if(!o(b,e)&&!o(y,e))throw Error("No "+e);return b[e]}function s(e){var r,n=e?e.indexOf("!"):-1;return n>-1&&(r=e.substring(0,n),e=e.substring(n+1,e.length)),[r,e]}function l(e){return function(){return k&&k.config&&k.config[e]||{}}}var p,h,d,g,b={},m={},k={},y={},C=Object.prototype.hasOwnProperty,v=[].slice;d=function(e,r){var n,t=s(e),o=t[0];return e=t[1],o&&(o=i(o,r),n=f(o)),o?e=n&&n.normalize?n.normalize(e,u(r)):i(e,r):(e=i(e,r),t=s(e),o=t[0],e=t[1],o&&(n=f(o))),{f:o?o+"!"+e:e,n:e,pr:o,p:n}},g={require:function(e){return a(e)},exports:function(e){var r=b[e];return r!==void 0?r:b[e]={}},module:function(e){return{id:e,uri:"",exports:b[e],config:l(e)}}},p=function(e,r,n,i){var u,s,l,p,h,k,C=[];if(i=i||e,"function"==typeof n){for(r=!r.length&&n.length?["require","exports","module"]:r,h=0;r.length>h;h+=1)if(p=d(r[h],i),s=p.f,"require"===s)C[h]=g.require(e);else if("exports"===s)C[h]=g.exports(e),k=!0;else if("module"===s)u=C[h]=g.module(e);else if(o(b,s)||o(m,s)||o(y,s))C[h]=f(s);else{if(!p.p)throw Error(e+" missing "+s);p.p.load(p.n,a(i,!0),c(s),{}),C[h]=b[s]}l=n.apply(b[e],C),e&&(u&&u.exports!==t&&u.exports!==b[e]?b[e]=u.exports:l===t&&k||(b[e]=l))}else e&&(b[e]=n)},e=r=h=function(e,r,n,o,i){return"string"==typeof e?g[e]?g[e](r):f(d(e,r).f):(e.splice||(k=e,r.splice?(e=r,r=n,n=null):e=t),r=r||function(){},"function"==typeof n&&(n=o,o=i),o?p(t,e,r,n):setTimeout(function(){p(t,e,r,n)},4),h)},h.config=function(e){return k=e,k.deps&&h(k.deps,k.callback),h},n=function(e,r,n){r.splice||(n=r,r=[]),o(b,e)||o(m,e)||(m[e]=[e,r,n])},n.amd={jQuery:!0}})(),n("../node_modules/almond/almond",function(){}),n("jxg",[],function(){var e={};return"object"!=typeof JXG||JXG.extend||(e=JXG),e.extend=function(e,r,n,t){var o,i;n=n||!1,t=t||!1;for(o in r)(!n||n&&r.hasOwnProperty(o))&&(i=t?o.toLowerCase():o,e[i]=r[o])},e.extend(e,{boards:{},readers:{},elements:{},registerElement:function(e,r){e=e.toLowerCase(),this.elements[e]=r},registerReader:function(e,r){var n,t;for(n=0;r.length>n;n++)t=r[n].toLowerCase(),"function"!=typeof this.readers[t]&&(this.readers[t]=e)},shortcut:function(e,r){return function(){return e[r].apply(this,arguments)}},getRef:function(e,r){return e.select(r)},getReference:function(e,r){return e.select(r)},debugInt:function(){var e,r;for(e=0;arguments.length>e;e++)r=arguments[e],"object"==typeof window&&window.console&&console.log?console.log(r):"object"==typeof document&&document.getElementById("debug")&&(document.getElementById("debug").innerHTML+=r+"<br/>")},debugWST:function(){var r=Error();e.debugInt.apply(this,arguments),r&&r.stack&&(e.debugInt("stacktrace"),e.debugInt(r.stack.split("\n").slice(1).join("\n")))},debugLine:function(){var r=Error();e.debugInt.apply(this,arguments),r&&r.stack&&e.debugInt("Called from",r.stack.split("\n").slice(2,3).join("\n"))},debug:function(){e.debugInt.apply(this,arguments)}}),e}),n("utils/zip",["jxg"],function(e){var r=[0,128,64,192,32,160,96,224,16,144,80,208,48,176,112,240,8,136,72,200,40,168,104,232,24,152,88,216,56,184,120,248,4,132,68,196,36,164,100,228,20,148,84,212,52,180,116,244,12,140,76,204,44,172,108,236,28,156,92,220,60,188,124,252,2,130,66,194,34,162,98,226,18,146,82,210,50,178,114,242,10,138,74,202,42,170,106,234,26,154,90,218,58,186,122,250,6,134,70,198,38,166,102,230,22,150,86,214,54,182,118,246,14,142,78,206,46,174,110,238,30,158,94,222,62,190,126,254,1,129,65,193,33,161,97,225,17,145,81,209,49,177,113,241,9,137,73,201,41,169,105,233,25,153,89,217,57,185,121,249,5,133,69,197,37,165,101,229,21,149,85,213,53,181,117,245,13,141,77,205,45,173,109,237,29,157,93,221,61,189,125,253,3,131,67,195,35,163,99,227,19,147,83,211,51,179,115,243,11,139,75,203,43,171,107,235,27,155,91,219,59,187,123,251,7,135,71,199,39,167,103,231,23,151,87,215,55,183,119,247,15,143,79,207,47,175,111,239,31,159,95,223,63,191,127,255],n=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],t=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,99,99],o=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],i=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],a=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],u=256;return e.Util=e.Util||{},e.Util.Unzip=function(c){function f(){return R+=8,O>X?c[X++]:-1}function s(){B=1}function l(){var e;try{return R++,e=1&B,B>>=1,0===B&&(B=f(),e=1&B,B=128|B>>1),e}catch(r){throw r}}function p(e){var n=0,t=e;try{for(;t--;)n=n<<1|l();e&&(n=r[n]>>8-e)}catch(o){throw o}return n}function h(){J=0}function d(e){j++,G[J++]=e,z.push(String.fromCharCode(e)),32768===J&&(J=0)}function g(){this.b0=0,this.b1=0,this.jump=null,this.jumppos=-1}function b(){for(;;){if(M[H]>=x)return-1;if(U[M[H]]===H)return M[H]++;M[H]++}}function m(){var e,r=P[F];if(17===H)return-1;if(F++,H++,e=b(),e>=0)r.b0=e;else if(r.b0=32768,m())return-1;if(e=b(),e>=0)r.b1=e,r.jump=null;else if(r.b1=32768,r.jump=P[F],r.jumppos=F,m())return-1;return H--,0}function k(e,r,n){var t;for(P=e,F=0,U=n,x=r,t=0;17>t;t++)M[t]=0;return H=0,m()?-1:0}function y(e){for(var r,n,t,o=0,i=e[o];;)if(t=l()){if(!(32768&i.b1))return i.b1;for(i=i.jump,r=e.length,n=0;r>n;n++)if(e[n]===i){o=n;break}}else{if(!(32768&i.b0))return i.b0;o++,i=e[o]}}function C(){var u,c,b,m,C,v,A,j,w,U,x,S,z,I,E,L,O;do if(u=l(),b=p(2),0===b)for(s(),U=f(),U|=f()<<8,S=f(),S|=f()<<8,65535&(U^~S)&&e.debug("BlockLen checksum mismatch\n");U--;)c=f(),d(c);else if(1===b)for(;;)if(C=r[p(7)]>>1,C>23?(C=C<<1|l(),C>199?(C-=128,C=C<<1|l()):(C-=48,C>143&&(C+=136))):C+=256,256>C)d(C);else{if(256===C)break;for(C-=257,w=p(t[C])+n[C],C=r[p(5)]>>3,i[C]>8?(x=p(8),x|=p(i[C]-8)<<8):x=p(i[C]),x+=o[C],C=0;w>C;C++)c=G[32767&J-x],d(c)}else if(2===b){for(A=Array(320),I=257+p(5),E=1+p(5),L=4+p(4),C=0;19>C;C++)A[C]=0;for(C=0;L>C;C++)A[a[C]]=p(3);for(w=q.length,m=0;w>m;m++)q[m]=new g;if(k(q,19,A,0))return h(),1;for(z=I+E,m=0,O=-1;z>m;)if(O++,C=y(q),16>C)A[m++]=C;else if(16===C){if(C=3+p(2),m+C>z)return h(),1;for(v=m?A[m-1]:0;C--;)A[m++]=v}else{if(C=17===C?3+p(3):11+p(7),m+C>z)return h(),1;for(;C--;)A[m++]=0}for(w=T.length,m=0;w>m;m++)T[m]=new g;if(k(T,I,A,0))return h(),1;for(w=T.length,m=0;w>m;m++)q[m]=new g;for(j=[],m=I;A.length>m;m++)j[m-I]=A[m];if(k(q,E,j,0))return h(),1;for(;;)if(C=y(T),C>=256){if(C-=256,0===C)break;for(C-=1,w=p(t[C])+n[C],C=y(q),i[C]>8?(x=p(8),x|=p(i[C]-8)<<8):x=p(i[C]),x+=o[C];w--;)c=G[32767&J-x],d(c)}else d(C)}while(!u);return h(),s(),0}function v(){var e,r,n,t,o,i,a,c,s=[];try{if(z=[],L=!1,s[0]=f(),s[1]=f(),120===s[0]&&218===s[1]&&(C(),E[I]=[z.join(""),"geonext.gxt"],I++),31===s[0]&&139===s[1]&&(S(),E[I]=[z.join(""),"file"],I++),80===s[0]&&75===s[1]&&(L=!0,s[2]=f(),s[3]=f(),3===s[2]&&4===s[3])){for(s[0]=f(),s[1]=f(),A=f(),A|=f()<<8,c=f(),c|=f()<<8,f(),f(),f(),f(),a=f(),a|=f()<<8,a|=f()<<16,a|=f()<<24,i=f(),i|=f()<<8,i|=f()<<16,i|=f()<<24,o=f(),o|=f()<<8,o|=f()<<16,o|=f()<<24,t=f(),t|=f()<<8,n=f(),n|=f()<<8,e=0,N=[];t--;)r=f(),"/"===r|":"===r?e=0:u-1>e&&(N[e++]=String.fromCharCode(r));for(w||(w=N),e=0;n>e;)r=f(),e++;j=0,8===c&&(C(),E[I]=Array(2),E[I][0]=z.join(""),E[I][1]=N.join(""),I++),S()}}catch(l){throw l}}var A,j,w,U,x,S,z=[],I=0,E=[],G=Array(32768),J=0,L=!1,O=c.length,X=0,B=1,R=0,T=Array(288),q=Array(32),F=0,P=null,H=(Array(64),Array(64),0),M=Array(17),N=[];M[0]=0,S=function(){var e,r,n,t,o,i,a=[];if(8&A&&(a[0]=f(),a[1]=f(),a[2]=f(),a[3]=f(),80===a[0]&&75===a[1]&&7===a[2]&&8===a[3]?(e=f(),e|=f()<<8,e|=f()<<16,e|=f()<<24):e=a[0]|a[1]<<8|a[2]<<16|a[3]<<24,r=f(),r|=f()<<8,r|=f()<<16,r|=f()<<24,n=f(),n|=f()<<8,n|=f()<<16,n|=f()<<24),L&&v(),a[0]=f(),8===a[0]){if(A=f(),f(),f(),f(),f(),f(),t=f(),4&A)for(a[0]=f(),a[2]=f(),H=a[0]+256*a[1],o=0;H>o;o++)f();if(8&A)for(o=0,N=[],i=f();i;)("7"===i||":"===i)&&(o=0),u-1>o&&(N[o++]=i),i=f();if(16&A)for(i=f();i;)i=f();2&A&&(f(),f()),C(),e=f(),e|=f()<<8,e|=f()<<16,e|=f()<<24,n=f(),n|=f()<<8,n|=f()<<16,n|=f()<<24,L&&v()}},e.Util.Unzip.prototype.unzipFile=function(e){var r;for(this.unzip(),r=0;E.length>r;r++)if(E[r][1]===e)return E[r][0];return""},e.Util.Unzip.prototype.unzip=function(){return v(),E}},e.Util}),n("utils/encoding",["jxg"],function(e){var r=0,n=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,8,8,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,10,3,3,3,3,3,3,3,3,3,3,3,3,4,3,3,11,6,6,6,5,8,8,8,8,8,8,8,8,8,8,8,0,12,24,36,60,96,84,12,12,12,48,72,12,12,12,12,12,12,12,12,12,12,12,12,12,0,12,12,12,12,12,0,12,0,12,12,12,24,12,12,12,12,12,24,12,24,12,12,12,12,12,12,12,12,12,24,12,12,12,12,12,24,12,12,12,12,12,12,12,24,12,12,12,12,12,12,12,12,12,36,12,36,12,12,12,36,12,12,12,12,12,36,12,36,12,12,12,36,12,12,12,12,12,12,12,12,12,12];return e.Util=e.Util||{},e.Util.UTF8={encode:function(e){var r,n,t="",o=e.length;if(e=e.replace(/\r\n/g,"\n"),"function"==typeof unescape&&"function"==typeof encodeURIComponent)return unescape(encodeURIComponent(e));for(r=0;o>r;r++)n=e.charCodeAt(r),128>n?t+=String.fromCharCode(n):n>127&&2048>n?(t+=String.fromCharCode(192|n>>6),t+=String.fromCharCode(128|63&n)):(t+=String.fromCharCode(224|n>>12),t+=String.fromCharCode(128|63&n>>6),t+=String.fromCharCode(128|63&n));return t},decode:function(e){var t,o,i,a=0,u=0,c=r,f=[],s=e.length,l=[];for(t=0;s>t;t++)o=e.charCodeAt(t),i=n[o],u=c!==r?63&o|u<<6:255>>i&o,c=n[256+c+i],c===r&&(u>65535?f.push(55232+(u>>10),56320+(1023&u)):f.push(u),a++,0===a%1e4&&(l.push(String.fromCharCode.apply(null,f)),f=[]));return l.push(String.fromCharCode.apply(null,f)),l.join("")},asciiCharCodeAt:function(e,r){var n=e.charCodeAt(r);if(n>255)switch(n){case 8364:n=128;break;case 8218:n=130;break;case 402:n=131;break;case 8222:n=132;break;case 8230:n=133;break;case 8224:n=134;break;case 8225:n=135;break;case 710:n=136;break;case 8240:n=137;break;case 352:n=138;break;case 8249:n=139;break;case 338:n=140;break;case 381:n=142;break;case 8216:n=145;break;case 8217:n=146;break;case 8220:n=147;break;case 8221:n=148;break;case 8226:n=149;break;case 8211:n=150;break;case 8212:n=151;break;case 732:n=152;break;case 8482:n=153;break;case 353:n=154;break;case 8250:n=155;break;case 339:n=156;break;case 382:n=158;break;case 376:n=159;break;default:}return n}},e.Util.UTF8}),n("utils/base64",["jxg","utils/encoding"],function(e,r){function n(e,r){return 255&e.charCodeAt(r)}function t(e,r){var n=o.indexOf(e.charAt(r));if(-1===n)throw Error("JSXGraph/utils/base64: Can't decode string (invalid character).");return n}var o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",i="=";return e.Util=e.Util||{},e.Util.Base64={encode:function(e){var t,a,u,c,f,s=[];for(f=r.encode(e),u=f.length,c=u%3,t=0;u-c>t;t+=3)a=n(f,t)<<16|n(f,t+1)<<8|n(f,t+2),s.push(o.charAt(a>>18),o.charAt(63&a>>12),o.charAt(63&a>>6),o.charAt(63&a));switch(c){case 1:a=n(f,u-1),s.push(o.charAt(a>>2),o.charAt(63&a<<4),i,i);break;case 2:a=n(f,u-2)<<8|n(f,u-1),s.push(o.charAt(a>>10),o.charAt(63&a>>4),o.charAt(63&a<<2),i)}return s.join("")},decode:function(e,n){var o,a,u,c,f,s,l=[],p=[];if(o=e.replace(/[^A-Za-z0-9\+\/=]/g,""),u=o.length,0!==u%4)throw Error("JSXGraph/utils/base64: Can't decode string (invalid input length).");for(o.charAt(u-1)===i&&(c=1,o.charAt(u-2)===i&&(c=2),u-=4),a=0;u>a;a+=4)f=t(o,a)<<18|t(o,a+1)<<12|t(o,a+2)<<6|t(o,a+3),p.push(f>>16,255&f>>8,255&f),0===a%1e4&&(l.push(String.fromCharCode.apply(null,p)),p=[]);switch(c){case 1:f=t(o,u)<<12|t(o,u+1)<<6|t(o,u+2),p.push(f>>10,255&f>>2);break;case 2:f=t(o,a)<<6|t(o,a+1),p.push(f>>4)}return l.push(String.fromCharCode.apply(null,p)),s=l.join(""),n&&(s=r.decode(s)),s},decodeAsArray:function(e){var r,n=this.decode(e),t=[],o=n.length;for(r=0;o>r;r++)t[r]=n.charCodeAt(r);return t}},e.Util.Base64}),n("../build/compressor.deps.js",["jxg","utils/zip","utils/base64"],function(e,r,n){return e.decompress=function(e){return unescape(new r.Unzip(n.decodeAsArray(e)).unzip()[0][0])},e}),window.JXG=r("../build/compressor.deps.js")})();
/*! jQuery Watch Plugin */
/*
* @author Darcy Clarke
*
* Copyright (c) 2013 Darcy Clarke
* Dual licensed under the MIT and GPL licenses.
*
* Usage:
* $('div').watch('width height', function(){
*   console.log(this.style.width, this.style.height);
* });
*/
(function(e){e.fn.watch=function(t,n,r){var i=document.createElement("div");var s=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver;var o=window.CustomEvent||function(){return arguments||{}};var u=function(e,t){e="on"+e;var n=e in t;if(!n){t.setAttribute(e,"return;");n=typeof t[e]=="function"}return n};if(typeof n=="function"){r=n;n={}}if(typeof r!="function")r=function(){};n=e.extend({},{throttle:10},n);var a=function(t){var n=this;e.each(this.watching,function(){var e=this;var r=false;var i;for(var s=0;s<e.props.length;s++){i=t[0].attributes[e.props[s]]||t.css(e.props[s]);if(e.vals[s]!=i){e.vals[s]=i;r=true;break}}if(r&&e.callback)e.callback.call(n,new o("AttrChange"))})};return this.each(function(){var o=this;var f=e(this);var l={props:t.split(" "),vals:[],changed:[],callback:r};e.each(l.props,function(e){l.vals[e]=f[0].attributes[l.props[e]]||f.css(l.props[e]);l.changed[e]=false});if(!this.watching)this.watching=[];this.watching.push(l);if(s){var c=new s(function(e){e.forEach(function(e){r.call(o,e)})});c.observe(this,{subtree:false,attributes:true})}else if(u("DOMAttrModified",i)){f.on("DOMAttrModified",r)}else if(u("propertychange",i)){f.on("propertychange",r)}else{setInterval(function(){a.call(o,f)},n.throttle)}})}})(jQuery);
/*! Hogan */
/*  Copyright 2011 Twitter, Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
var Hogan={};(function(j,h){j.Template=function(o,p,n,m){this.r=o||this.r;this.c=n;this.options=m;this.text=p||"";this.buf=(h)?[]:""};j.Template.prototype={r:function(o,n,m){return""},v:c,t:e,render:function b(o,n,m){return this.ri([o],n||{},m)},ri:function(o,n,m){return this.r(o,n,m)},rp:function(o,q,p,m){var n=p[o];if(!n){return""}if(this.c&&typeof n=="string"){n=this.c.compile(n,this.options)}return n.ri(q,p,m)},rs:function(p,o,q){var m=p[p.length-1];if(!g(m)){q(p,o,this);return}for(var n=0;n<m.length;n++){p.push(m[n]);q(p,o,this);p.pop()}},s:function(s,n,q,o,t,m,p){var r;if(g(s)&&s.length===0){return false}if(typeof s=="function"){s=this.ls(s,n,q,o,t,m,p)}r=(s==="")||!!s;if(!o&&r&&n){n.push((typeof s=="object")?s:n[n.length-1])}return r},d:function(q,n,p,r){var s=q.split("."),t=this.f(s[0],n,p,r),m=null;if(q==="."&&g(n[n.length-2])){return n[n.length-1]}for(var o=1;o<s.length;o++){if(t&&typeof t=="object"&&s[o] in t){m=t;t=t[s[o]]}else{t=""}}if(r&&!t){return false}if(!r&&typeof t=="function"){n.push(m);t=this.lv(t,n,p);n.pop()}return t},f:function(q,m,p,r){var t=false,n=null,s=false;for(var o=m.length-1;o>=0;o--){n=m[o];if(n&&typeof n=="object"&&q in n){t=n[q];s=true;break}}if(!s){return(r)?false:""}if(!r&&typeof t=="function"){t=this.lv(t,m,p)}return t},ho:function(s,m,p,r,o){var q=this.c;var n=this.options;n.delimiters=o;var r=s.call(m,r);r=(r==null)?String(r):r.toString();this.b(q.compile(r,n).render(m,p));return false},b:(h)?function(m){this.buf.push(m)}:function(m){this.buf+=m},fl:(h)?function(){var m=this.buf.join("");this.buf=[];return m}:function(){var m=this.buf;this.buf="";return m},ls:function(n,u,r,o,m,p,v){var q=u[u.length-1],s=null;if(!o&&this.c&&n.length>0){return this.ho(n,q,r,this.text.substring(m,p),v)}s=n.call(q);if(typeof s=="function"){if(o){return true}else{if(this.c){return this.ho(s,q,r,this.text.substring(m,p),v)}}}return s},lv:function(q,o,p){var n=o[o.length-1];var m=q.call(n);if(typeof m=="function"){m=e(m.call(n));if(this.c&&~m.indexOf("{\u007B")){return this.c.compile(m,this.options).render(n,p)}}return e(m)}};var i=/&/g,d=/</g,a=/>/g,l=/\'/g,k=/\"/g,f=/[&<>\"\']/;function e(m){return String((m===null||m===undefined)?"":m)}function c(m){m=e(m);return f.test(m)?m.replace(i,"&amp;").replace(d,"&lt;").replace(a,"&gt;").replace(l,"&#39;").replace(k,"&quot;"):m}var g=Array.isArray||function(m){return Object.prototype.toString.call(m)==="[object Array]"}})(typeof exports!=="undefined"?exports:Hogan);(function(n){var f=/\S/,j=/\"/g,o=/\n/g,k=/\r/g,u=/\\/g,a={"#":1,"^":2,"/":3,"!":4,">":5,"<":6,"=":7,_v:8,"{":9,"&":10};n.scan=function m(G,B){var O=G.length,y=0,D=1,x=2,z=y,C=null,Q=null,P="",J=[],F=false,N=0,K=0,H="{{",M="}}";function L(){if(P.length>0){J.push(String(P));P=""}}function A(){var S=true;for(var R=K;R<J.length;R++){S=(J[R].tag&&a[J[R].tag]<a._v)||(!J[R].tag&&J[R].match(f)===null);if(!S){return false}}return S}function I(U,R){L();if(U&&A()){for(var S=K,T;S<J.length;S++){if(!J[S].tag){if((T=J[S+1])&&T.tag==">"){T.indent=J[S].toString()}J.splice(S,1)}}}else{if(!R){J.push({tag:"\n"})}}F=false;K=J.length}function E(V,S){var U="="+M,R=V.indexOf(U,S),T=q(V.substring(V.indexOf("=",S)+1,R)).split(" ");H=T[0];M=T[1];return R+U.length-1}if(B){B=B.split(" ");H=B[0];M=B[1]}for(N=0;N<O;N++){if(z==y){if(w(H,G,N)){--N;L();z=D}else{if(G.charAt(N)=="\n"){I(F)}else{P+=G.charAt(N)}}}else{if(z==D){N+=H.length-1;Q=a[G.charAt(N+1)];C=Q?G.charAt(N+1):"_v";if(C=="="){N=E(G,N);z=y}else{if(Q){N++}z=x}F=N}else{if(w(M,G,N)){J.push({tag:C,n:q(P),otag:H,ctag:M,i:(C=="/")?F-M.length:N+H.length});P="";N+=M.length-1;z=y;if(C=="{"){if(M=="}}"){N++}else{r(J[J.length-1])}}}else{P+=G.charAt(N)}}}}I(F,true);return J};function r(x){if(x.n.substr(x.n.length-1)==="}"){x.n=x.n.substring(0,x.n.length-1)}}function q(x){if(x.trim){return x.trim()}return x.replace(/^\s*|\s*$/g,"")}function w(x,B,z){if(B.charAt(z)!=x.charAt(0)){return false}for(var A=1,y=x.length;A<y;A++){if(B.charAt(z+A)!=x.charAt(A)){return false}}return true}function b(D,A,y,C){var x=[],B=null,z=null;while(D.length>0){z=D.shift();if(z.tag=="#"||z.tag=="^"||e(z,C)){y.push(z);z.nodes=b(D,z.tag,y,C);x.push(z)}else{if(z.tag=="/"){if(y.length===0){throw new Error("Closing tag without opener: /"+z.n)}B=y.pop();if(z.n!=B.n&&!g(z.n,B.n,C)){throw new Error("Nesting error: "+B.n+" vs. "+z.n)}B.end=z.i;return x}else{x.push(z)}}}if(y.length>0){throw new Error("missing closing tag: "+y.pop().n)}return x}function e(A,y){for(var z=0,x=y.length;z<x;z++){if(y[z].o==A.n){A.tag="#";return true}}}function g(B,z,y){for(var A=0,x=y.length;A<x;A++){if(y[A].c==B&&y[A].o==z){return true}}}n.generate=function(x,A,y){var z='var _=this;_.b(i=i||"");'+t(x)+"return _.fl();";if(y.asString){return"function(c,p,i){"+z+";}"}return new n.Template(new Function("c","p","i",z),A,n,y)};function v(x){return x.replace(u,"\\\\").replace(j,'\\"').replace(o,"\\n").replace(k,"\\r")}function i(x){return(~x.indexOf("."))?"d":"f"}function t(y){var B="";for(var A=0,z=y.length;A<z;A++){var x=y[A].tag;if(x=="#"){B+=h(y[A].nodes,y[A].n,i(y[A].n),y[A].i,y[A].end,y[A].otag+" "+y[A].ctag)}else{if(x=="^"){B+=s(y[A].nodes,y[A].n,i(y[A].n))}else{if(x=="<"||x==">"){B+=d(y[A])}else{if(x=="{"||x=="&"){B+=c(y[A].n,i(y[A].n))}else{if(x=="\n"){B+=l('"\\n"'+(y.length-1==A?"":" + i"))}else{if(x=="_v"){B+=p(y[A].n,i(y[A].n))}else{if(x===undefined){B+=l('"'+v(y[A])+'"')}}}}}}}}return B}function h(y,C,B,A,x,z){return"if(_.s(_."+B+'("'+v(C)+'",c,p,1),c,p,0,'+A+","+x+',"'+z+'")){_.rs(c,p,function(c,p,_){'+t(y)+"});c.pop();}"}function s(x,z,y){return"if(!_.s(_."+y+'("'+v(z)+'",c,p,1),c,p,1,0,0,"")){'+t(x)+"};"}function d(x){return'_.b(_.rp("'+v(x.n)+'",c,p,"'+(x.indent||"")+'"));'}function c(y,x){return"_.b(_.t(_."+x+'("'+v(y)+'",c,p,0)));'}function p(y,x){return"_.b(_.v(_."+x+'("'+v(y)+'",c,p,0)));'}function l(x){return"_.b("+x+");"}n.parse=function(y,z,x){x=x||{};return b(y,"",[],x.sectionTags||[])},n.cache={};n.compile=function(A,x){x=x||{};var z=A+"||"+!!x.asString;var y=this.cache[z];if(y){return y}y=this.generate(this.parse(this.scan(A,x.delimiters),A,x),A,x);return this.cache[z]=y}})(typeof exports!=="undefined"?exports:Hogan);
/*! typeahead.js 999 (0.9.3) // this script is heavily modified for our use. do not update.*/
/* https://github.com/twitter/typeahead
 * Copyright 2013 Twitter, Inc. and other contributors; Licensed MIT
 */
(function($) {
    var VERSION = "0.9.3";
    var utils = {
        isMsie: function() {
            var match = /(msie) ([\w.]+)/i.exec(navigator.userAgent);
            return match ? parseInt(match[2], 10) : false;
        },
        isBlankString: function(str) {
            return !str || /^\s*$/.test(str);
        },
        escapeRegExChars: function(str) {
            return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        },
        isString: function(obj) {
            return typeof obj === "string";
        },
        isNumber: function(obj) {
            return typeof obj === "number";
        },
        isArray: $.isArray,
        isFunction: $.isFunction,
        isObject: $.isPlainObject,
        isUndefined: function(obj) {
            return typeof obj === "undefined";
        },
        bind: $.proxy,
        bindAll: function(obj) {
            var val;
            for (var key in obj) {
                $.isFunction(val = obj[key]) && (obj[key] = $.proxy(val, obj));
            }
        },
        indexOf: function(haystack, needle) {
            for (var i = 0; i < haystack.length; i++) {
                if (haystack[i] === needle) {
                    return i;
                }
            }
            return -1;
        },
        each: $.each,
        map: $.map,
        filter: $.grep,
        every: function(obj, test) {
            var result = true;
            if (!obj) {
                return result;
            }
            $.each(obj, function(key, val) {
                if (!(result = test.call(null, val, key, obj))) {
                    return false;
                }
            });
            return !!result;
        },
        some: function(obj, test) {
            var result = false;
            if (!obj) {
                return result;
            }
            $.each(obj, function(key, val) {
                if (result = test.call(null, val, key, obj)) {
                    return false;
                }
            });
            return !!result;
        },
        mixin: $.extend,
        getUniqueId: function() {
            var counter = 0;
            return function() {
                return counter++;
            };
        }(),
        defer: function(fn) {
            setTimeout(fn, 0);
        },
        debounce: function(func, wait, immediate) {
            var timeout, result;
            return function() {
                var context = this, args = arguments, later, callNow;
                later = function() {
                    timeout = null;
                    if (!immediate) {
                        result = func.apply(context, args);
                    }
                };
                callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) {
                    result = func.apply(context, args);
                }
                return result;
            };
        },
        throttle: function(func, wait) {
            var context, args, timeout, result, previous, later;
            previous = 0;
            later = function() {
                previous = new Date();
                timeout = null;
                result = func.apply(context, args);
            };
            return function() {
                var now = new Date(), remaining = wait - (now - previous);
                context = this;
                args = arguments;
                if (remaining <= 0) {
                    clearTimeout(timeout);
                    timeout = null;
                    previous = now;
                    result = func.apply(context, args);
                } else if (!timeout) {
                    timeout = setTimeout(later, remaining);
                }
                return result;
            };
        },
        tokenizeQuery: function(str) {
            return $.trim(str).toLowerCase().split(/[\s]+/);
        },
        tokenizeText: function(str) {
            return $.trim(str).toLowerCase().split(/[\s\-_]+/);
        },
        normalizeChars: function(str, charMap) {
            $.each(charMap, function(pattern, replace) {
                pattern = new RegExp("[" + utils.escapeRegExChars(pattern) + "]", "gi");
                str = str.replace(pattern, replace);
            });
            return str;
        },
        getProtocol: function() {
            return location.protocol;
        },
        noop: function() {}
    };
    var EventTarget = function() {
        var eventSplitter = /\s+/;
        return {
            on: function(events, callback) {
                var event;
                if (!callback) {
                    return this;
                }
                this._callbacks = this._callbacks || {};
                events = events.split(eventSplitter);
                while (event = events.shift()) {
                    this._callbacks[event] = this._callbacks[event] || [];
                    this._callbacks[event].push(callback);
                }
                return this;
            },
            trigger: function(events, data) {
                var event, callbacks;
                if (!this._callbacks) {
                    return this;
                }
                events = events.split(eventSplitter);
                while (event = events.shift()) {
                    if (callbacks = this._callbacks[event]) {
                        for (var i = 0; i < callbacks.length; i += 1) {
                            callbacks[i].call(this, {
                                type: event,
                                data: data
                            });
                        }
                    }
                }
                return this;
            }
        };
    }();
    var EventBus = function() {
        var namespace = "typeahead:";
        function EventBus(o) {
            if (!o || !o.el) {
                $.error("EventBus initialized without el");
            }
            this.$el = $(o.el);
        }
        utils.mixin(EventBus.prototype, {
            trigger: function(type) {
                var args = [].slice.call(arguments, 1);
                this.$el.trigger(namespace + type, args);
            }
        });
        return EventBus;
    }();
    var PersistentStorage = function() {
        var ls, methods;
        try {
            ls = window.localStorage;
            ls.setItem("~~~", "!");
            ls.removeItem("~~~");
        } catch (err) {
            ls = null;
        }
        function PersistentStorage(namespace) {
            this.prefix = [ "__", namespace, "__" ].join("");
            this.ttlKey = "__ttl__";
            this.keyMatcher = new RegExp("^" + this.prefix);
        }
        if (ls && window.JSON) {
            methods = {
                _prefix: function(key) {
                    return this.prefix + key;
                },
                _ttlKey: function(key) {
                    return this._prefix(key) + this.ttlKey;
                },
                get: function(key) {
                    if (this.isExpired(key)) {
                        this.remove(key);
                    }
                    return decode(ls.getItem(this._prefix(key)));
                },
                set: function(key, val, ttl) {
                    if (utils.isNumber(ttl)) {
                        ls.setItem(this._ttlKey(key), encode(now() + ttl));
                    } else {
                        ls.removeItem(this._ttlKey(key));
                    }
                    return ls.setItem(this._prefix(key), encode(val));
                },
                remove: function(key) {
                    ls.removeItem(this._ttlKey(key));
                    ls.removeItem(this._prefix(key));
                    return this;
                },
                clear: function() {
                    var i, key, keys = [], len = ls.length;
                    for (i = 0; i < len; i++) {
                        if ((key = ls.key(i)).match(this.keyMatcher)) {
                            keys.push(key.replace(this.keyMatcher, ""));
                        }
                    }
                    for (i = keys.length; i--; ) {
                        this.remove(keys[i]);
                    }
                    return this;
                },
                isExpired: function(key) {
                    var ttl = decode(ls.getItem(this._ttlKey(key)));
                    return utils.isNumber(ttl) && now() > ttl ? true : false;
                }
            };
        } else {
            methods = {
                get: utils.noop,
                set: utils.noop,
                remove: utils.noop,
                clear: utils.noop,
                isExpired: utils.noop
            };
        }
        utils.mixin(PersistentStorage.prototype, methods);
        return PersistentStorage;
        function now() {
            return new Date().getTime();
        }
        function encode(val) {
            //return JSON.stringify(utils.isUndefined(val) ? null : val);
            return LZString.compressToUTF16(JSON.stringify(utils.isUndefined(val) ? null : val));
        }
        function decode(val) {
            //return JSON.parse(utils.isBlankString(val) ? null : val);
            return JSON.parse(utils.isBlankString(val) ? null : LZString.decompressFromUTF16(val));
        }
    }();
    var RequestCache = function() {
        function RequestCache(o) {
            utils.bindAll(this);
            o = o || {};
            this.sizeLimit = o.sizeLimit || 10;
            this.cache = {};
            this.cachedKeysByAge = [];
        }
        utils.mixin(RequestCache.prototype, {
            get: function(url) {
                return this.cache[url];
            },
            set: function(url, resp) {
                var requestToEvict;
                if (this.cachedKeysByAge.length === this.sizeLimit) {
                    requestToEvict = this.cachedKeysByAge.shift();
                    delete this.cache[requestToEvict];
                }
                this.cache[url] = resp;
                this.cachedKeysByAge.push(url);
            }
        });
        return RequestCache;
    }();
    var Transport = function() {
        var pendingRequestsCount = 0, pendingRequests = {}, maxPendingRequests, requestCache;
        function Transport(o) {
            utils.bindAll(this);
            o = utils.isString(o) ? {
                url: o
            } : o;
            requestCache = requestCache || new RequestCache();
            maxPendingRequests = utils.isNumber(o.maxParallelRequests) ? o.maxParallelRequests : maxPendingRequests || 6;
            this.url = o.url;
            this.wildcard = o.wildcard || "%QUERY";
            this.filter = o.filter;
            this.replace = o.replace;
            this.ajaxSettings = {
                type: "post",
                cache: o.cache,
                timeout: o.timeout,
                dataType: o.dataType || "json",
                beforeSend: o.beforeSend
            };
            this._get = (/^throttle$/i.test(o.rateLimitFn) ? utils.throttle : utils.debounce)(this._get, o.rateLimitWait || 300);
        }
        utils.mixin(Transport.prototype, {
            _get: function(url, cb) {
                var that = this;
                if (belowPendingRequestsThreshold()) {
                    this._sendRequest(url).done(done);
                } else {
                    this.onDeckRequestArgs = [].slice.call(arguments, 0);
                }
                function done(resp) {
                    var data = that.filter ? that.filter(resp) : resp;
                    cb && cb(data);
                    requestCache.set(url, resp);
                }
            },
            _sendRequest: function(url) {
                var that = this, jqXhr = pendingRequests[url];
                if (!jqXhr) {
                    incrementPendingRequests();
                    jqXhr = pendingRequests[url] = $.ajax(url, this.ajaxSettings).always(always);
                }
                return jqXhr;
                function always() {
                    decrementPendingRequests();
                    pendingRequests[url] = null;
                    if (that.onDeckRequestArgs) {
                        that._get.apply(that, that.onDeckRequestArgs);
                        that.onDeckRequestArgs = null;
                    }
                }
            },
            get: function(query, cb) {
                var that = this, encodedQuery = encodeURIComponent(query || ""), url, resp;
                cb = cb || utils.noop;
                url = this.replace ? this.replace(this.url, encodedQuery) : this.url.replace(this.wildcard, encodedQuery);
                if (resp = requestCache.get(url)) {
                    utils.defer(function() {
                        cb(that.filter ? that.filter(resp) : resp);
                    });
                } else {
                    this._get(url, cb);
                }
                return !!resp;
            }
        });
        return Transport;
        function incrementPendingRequests() {
            pendingRequestsCount++;
        }
        function decrementPendingRequests() {
            pendingRequestsCount--;
        }
        function belowPendingRequestsThreshold() {
            return pendingRequestsCount < maxPendingRequests;
        }
    }();
    var Dataset = function() {
        var keys = {
            thumbprint: "thumbprint",
            protocol: "protocol",
            itemHash: "itemHash",
            adjacencyList: "adjacencyList"
        };
        function Dataset(o) {
            utils.bindAll(this);
            if (utils.isString(o.template) && !o.engine) {
                $.error("no template engine specified");
            }
            if (!o.local && !o.prefetch && !o.remote) {
                $.error("one of local, prefetch, or remote is required");
            }
            this.name = o.name || utils.getUniqueId();
            this.limit = o.limit || 5;
            this.minLength = o.minLength || 1;
            this.header = o.header;
            this.footer = o.footer;
            this.valueKey = o.valueKey || "value";
            this.tokensKey = o.tokensKey || "tokens";
            this.urlKey = o.urlKey || "url";
            this.urlHelper = o.urlHelper;
            this.charMap = o.charMap;
            this.template = compileTemplate(o.template, o.engine, this.valueKey);
            this.local = o.local;
            this.prefetch = o.prefetch;
            this.remote = o.remote;
            this.itemHash = {};
            this.adjacencyList = {};
            this.storage = o.name ? new PersistentStorage(o.name) : null;
        }
        utils.mixin(Dataset.prototype, {
            _processLocalData: function(data) {
                this._mergeProcessedData(this._processData(data));
            },
            _loadPrefetchData: function(o) {
                var that = this, thumbprint = VERSION + (o.thumbprint || ""), storedThumbprint, storedProtocol, storedItemHash, storedAdjacencyList, isExpired, deferred;
                if (this.storage) {
                    storedThumbprint = this.storage.get(keys.thumbprint);
                    storedProtocol = this.storage.get(keys.protocol);
                    storedItemHash = this.storage.get(keys.itemHash);
                    storedAdjacencyList = this.storage.get(keys.adjacencyList);
                }
                isExpired = storedThumbprint !== thumbprint || storedProtocol !== utils.getProtocol();
                o = utils.isString(o) ? {
                    url: o
                } : o;
                o.ttl = utils.isNumber(o.ttl) ? o.ttl : 24 * 60 * 60 * 1e3;
                if (storedItemHash && storedAdjacencyList && !isExpired) {
                    this._mergeProcessedData({
                        itemHash: storedItemHash,
                        adjacencyList: storedAdjacencyList
                    });
                    deferred = $.Deferred().resolve();
                } else {
                    //deferred = $.getJSON(o.url).done(processPrefetchData);
                    deferred = $.ajax({url: o.url, dataType: 'text'}).done(processPrefetchData);
                }
                return deferred;
                function processPrefetchData(data) {
                    data = $.parseJSON(JXG.decompress(data));
                    var filteredData = o.filter ? o.filter(data) : data, processedData = that._processData(filteredData), itemHash = processedData.itemHash, adjacencyList = processedData.adjacencyList;
                    if (that.storage) {
                        that.storage.set(keys.itemHash, itemHash, o.ttl);
                        that.storage.set(keys.adjacencyList, adjacencyList, o.ttl);
                        that.storage.set(keys.thumbprint, thumbprint, o.ttl);
                        that.storage.set(keys.protocol, utils.getProtocol(), o.ttl);
                    }
                    that._mergeProcessedData(processedData);
                }
            },
            _transformDatum: function(datum) {
                var value = utils.isString(datum) ? datum : datum[this.valueKey], tokens = datum[this.tokensKey] || utils.tokenizeText(value), item = {
                    value: value,
                    tokens: tokens
                }, charMap = this.charMap;
                if (utils.isString(datum)) {
                    item.datum = {};
                    item.datum[this.valueKey] = datum;
                } else {
                    item.datum = datum;
                }
                item.tokens = utils.filter(item.tokens, function(token) {
                    return !utils.isBlankString(token);
                });
                item.tokens = utils.map(item.tokens, function(token) {
                    token = token.toLowerCase();
                    return charMap ? utils.normalizeChars(token, charMap) : token;
                });
                return item;
            },
            _processData: function(data) {
                var that = this, itemHash = {}, adjacencyList = {};
                utils.each(data, function(i, datum) {
                    var item = that._transformDatum(datum), id = utils.getUniqueId(item.value);
                    itemHash[id] = item;
                    utils.each(item.tokens, function(i, token) {
                        var character = token.charAt(0), adjacency = adjacencyList[character] || (adjacencyList[character] = [ id ]);
                        !~utils.indexOf(adjacency, id) && adjacency.push(id);
                    });
                });
                return {
                    itemHash: itemHash,
                    adjacencyList: adjacencyList
                };
            },
            _mergeProcessedData: function(processedData) {
                var that = this;
                utils.mixin(this.itemHash, processedData.itemHash);
                utils.each(processedData.adjacencyList, function(character, adjacency) {
                    var masterAdjacency = that.adjacencyList[character];
                    that.adjacencyList[character] = masterAdjacency ? masterAdjacency.concat(adjacency) : adjacency;
                });
            },
            _getLocalSuggestions: function(terms) {
                var that = this, firstChars = [], lists = [], shortestList, suggestions = [];
                utils.each(terms, function(i, term) {
                    var firstChar = term.charAt(0);
                    !~utils.indexOf(firstChars, firstChar) && firstChars.push(firstChar);
                });
                utils.each(firstChars, function(i, firstChar) {
                    var list = that.adjacencyList[firstChar];
                    if (!list) {
                        return false;
                    }
                    lists.push(list);
                    if (!shortestList || list.length < shortestList.length) {
                        shortestList = list;
                    }
                });
                if (lists.length < firstChars.length) {
                    return [];
                }
                utils.each(shortestList, function(i, id) {
                    var item = that.itemHash[id], isCandidate, isMatch;
                    isCandidate = utils.every(lists, function(list) {
                        return ~utils.indexOf(list, id);
                    });
                    isMatch = isCandidate && utils.every(terms, function(term) {
                        return utils.some(item.tokens, function(token) {
                            return token.indexOf(term) === 0;
                        });
                    });
                    isMatch && suggestions.push(item);
                });
                return suggestions;
            },
            initialize: function() {
                var deferred;
                this.local && this._processLocalData(this.local);
                this.transport = this.remote ? new Transport(this.remote) : null;
                deferred = this.prefetch ? this._loadPrefetchData(this.prefetch) : $.Deferred().resolve();
                this.local = this.prefetch = this.remote = null;
                this.initialize = function() {
                    return deferred;
                };
                return deferred;
            },
            getSuggestions: function(query, cb) {
                var that = this, terms, suggestions, cacheHit = false;
                if (query.length < this.minLength) {
                    return;
                }
                terms = utils.tokenizeQuery(query);
                if (this.charMap) {
                    terms = utils.map(terms, function(term) {
                        return utils.normalizeChars(term, that.charMap);
                    });
                }
                suggestions = this._getLocalSuggestions(terms).slice(0, this.limit);
                if (suggestions.length < this.limit && this.transport) {
                    cacheHit = this.transport.get(query, processRemoteData);
                }
                !cacheHit && cb && cb(suggestions);
                function processRemoteData(data) {
                    suggestions = suggestions.slice(0);
                    utils.each(data, function(i, datum) {
                        var item = that._transformDatum(datum), isDuplicate;
                        isDuplicate = utils.some(suggestions, function(suggestion) {
                            return item.value === suggestion.value;
                        });
                        !isDuplicate && suggestions.push(item);
                        return suggestions.length < that.limit;
                    });
                    cb && cb(suggestions);
                }
            }
        });
        return Dataset;
        function compileTemplate(template, engine, valueKey) {
            var renderFn, compiledTemplate;
            if (utils.isFunction(template)) {
                renderFn = template;
            } else if (utils.isString(template)) {
                compiledTemplate = engine.compile(template);
                renderFn = utils.bind(compiledTemplate.render, compiledTemplate);
            } else {
                renderFn = function(context) {
                    return "<p>" + context[valueKey] + "</p>";
                };
            }
            return renderFn;
        }
    }();
    var InputView = function() {
        function InputView(o) {
            var that = this;
            utils.bindAll(this);
            this.specialKeyCodeMap = {
                9: "tab",
                27: "esc",
                37: "left",
                39: "right",
                13: "enter",
                38: "up",
                40: "down"
            };
            this.$hint = $(o.hint);
            this.$input = $(o.input).on("blur.tt", this._handleBlur).on("focus.tt", this._handleFocus).on("keydown.tt", this._handleSpecialKeyEvent);
            if (!utils.isMsie()) {
                this.$input.on("input.tt", this._compareQueryToInputValue);
            } else {
                this.$input.on("keydown.tt keypress.tt cut.tt paste.tt", function($e) {
                    if (that.specialKeyCodeMap[$e.which || $e.keyCode]) {
                        return;
                    }
                    utils.defer(that._compareQueryToInputValue);
                });
            }
            this.query = this.$input.val();
            this.$overflowHelper = buildOverflowHelper(this.$input);
        }
        utils.mixin(InputView.prototype, EventTarget, {
            _handleFocus: function() {
                this.trigger("focused");
            },
            _handleBlur: function() {
                this.trigger("blured");
            },
            _handleSpecialKeyEvent: function($e) {
                var keyName = this.specialKeyCodeMap[$e.which || $e.keyCode];
                keyName && this.trigger(keyName + "Keyed", $e);
            },
            _compareQueryToInputValue: function() {
                var inputValue = this.getInputValue(), isSameQuery = compareQueries(this.query, inputValue), isSameQueryExceptWhitespace = isSameQuery ? this.query.length !== inputValue.length : false;
                if (isSameQueryExceptWhitespace) {
                    this.trigger("whitespaceChanged", {
                        value: this.query
                    });
                } else if (!isSameQuery) {
                    this.trigger("queryChanged", {
                        value: this.query = inputValue
                    });
                }
            },
            destroy: function() {
                this.$hint.off(".tt");
                this.$input.off(".tt");
                this.$hint = this.$input = this.$overflowHelper = null;
            },
            focus: function() {
                this.$input.focus();
            },
            blur: function() {
                this.$input.blur();
            },
            getQuery: function() {
                return this.query;
            },
            setQuery: function(query) {
                this.query = query;
            },
            getInputValue: function() {
                return this.$input.val();
            },
            setInputValue: function(value, silent) {
                this.$input.val(value);
                !silent && this._compareQueryToInputValue();
            },
            getHintValue: function() {
                return this.$hint.val();
            },
            setHintValue: function(value) {
                this.$hint.val(value);
            },
            getLanguageDirection: function() {
                return (this.$input.css("direction") || "ltr").toLowerCase();
            },
            isOverflow: function() {
                this.$overflowHelper.text(this.getInputValue());
                return this.$overflowHelper.width() > this.$input.width();
            },
            isCursorAtEnd: function() {
                var valueLength = this.$input.val().length, selectionStart = this.$input[0].selectionStart, range;
                if (utils.isNumber(selectionStart)) {
                    return selectionStart === valueLength;
                } else if (document.selection) {
                    range = document.selection.createRange();
                    range.moveStart("character", -valueLength);
                    return valueLength === range.text.length;
                }
                return true;
            }
        });
        return InputView;
        function buildOverflowHelper($input) {
            return $("<span></span>").css({
                position: "absolute",
                left: "-9999px",
                visibility: "hidden",
                whiteSpace: "nowrap",
                fontFamily: $input.css("font-family"),
                fontSize: $input.css("font-size"),
                fontStyle: $input.css("font-style"),
                fontVariant: $input.css("font-variant"),
                fontWeight: $input.css("font-weight"),
                wordSpacing: $input.css("word-spacing"),
                letterSpacing: $input.css("letter-spacing"),
                textIndent: $input.css("text-indent"),
                textRendering: $input.css("text-rendering"),
                textTransform: $input.css("text-transform")
            }).insertAfter($input);
        }
        function compareQueries(a, b) {
            a = (a || "").replace(/^\s*/g, "").replace(/\s{2,}/g, " ");
            b = (b || "").replace(/^\s*/g, "").replace(/\s{2,}/g, " ");
            return a === b;
        }
    }();
    var DropdownView = function() {
        var html = {
            suggestionsList: '<span class="tt-suggestions"></span>'
        }, css = {
            suggestionsList: {
                display: "block"
            },
            suggestion: {
                whiteSpace: "nowrap",
                cursor: "pointer"
            },
            suggestionChild: {
                whiteSpace: "normal"
            }
        };
        function DropdownView(o) {
            utils.bindAll(this);
            this.isOpen = false;
            this.isEmpty = true;
            this.isMouseOverDropdown = false;
            this.$menu = $(o.menu).on("mouseenter.tt", this._handleMouseenter).on("mouseleave.tt", this._handleMouseleave).on("click.tt", ".tt-suggestion", this._handleSelection).on("mouseover.tt", ".tt-suggestion", this._handleMouseover);
        }
        utils.mixin(DropdownView.prototype, EventTarget, {
            _handleMouseenter: function() {
                this.isMouseOverDropdown = true;
            },
            _handleMouseleave: function() {
                this.isMouseOverDropdown = false;
            },
            _handleMouseover: function($e) {
                var $suggestion = $($e.currentTarget);
                this._getSuggestions().removeClass("tt-is-under-cursor");
                $suggestion.addClass("tt-is-under-cursor");
            },
            _handleSelection: function($e) {
                var $suggestion = $($e.currentTarget);
                this.trigger("suggestionSelected", extractSuggestion($suggestion));
            },
            _show: function() {
                this.$menu.css("display", "block");
            },
            _hide: function() {
                this.$menu.hide();
            },
            _moveCursor: function(increment) {
                var $suggestions, $cur, nextIndex, $underCursor;
                if (!this.isVisible()) {
                    return;
                }
                $suggestions = this._getSuggestions();
                $cur = $suggestions.filter(".tt-is-under-cursor");
                $cur.removeClass("tt-is-under-cursor");
                nextIndex = $suggestions.index($cur) + increment;
                nextIndex = (nextIndex + 1) % ($suggestions.length + 1) - 1;
                if (nextIndex === -1) {
                    this.trigger("cursorRemoved");
                    return;
                } else if (nextIndex < -1) {
                    nextIndex = $suggestions.length - 1;
                }
                $underCursor = $suggestions.eq(nextIndex).addClass("tt-is-under-cursor");
                this._ensureVisibility($underCursor);
                this.trigger("cursorMoved", extractSuggestion($underCursor));
            },
            _getSuggestions: function() {
                return this.$menu.find(".tt-suggestions > .tt-suggestion");
            },
            _ensureVisibility: function($el) {
                var menuHeight = this.$menu.height() + parseInt(this.$menu.css("paddingTop"), 10) + parseInt(this.$menu.css("paddingBottom"), 10), menuScrollTop = this.$menu.scrollTop(), elTop = $el.position().top, elBottom = elTop + $el.outerHeight(true);
                if (elTop < 0) {
                    this.$menu.scrollTop(menuScrollTop + elTop);
                } else if (menuHeight < elBottom) {
                    this.$menu.scrollTop(menuScrollTop + (elBottom - menuHeight));
                }
            },
            destroy: function() {
                this.$menu.off(".tt");
                this.$menu = null;
            },
            isVisible: function() {
                return this.isOpen && !this.isEmpty;
            },
            closeUnlessMouseIsOverDropdown: function() {
                if (!this.isMouseOverDropdown) {
                    this.close();
                }
            },
            close: function() {
                if (this.isOpen) {
                    this.isOpen = false;
                    this.isMouseOverDropdown = false;
                    this._hide();
                    this.$menu.find(".tt-suggestions > .tt-suggestion").removeClass("tt-is-under-cursor");
                    this.trigger("closed");
                }
            },
            open: function() {
                if (!this.isOpen) {
                    this.isOpen = true;
                    !this.isEmpty && this._show();
                    this.trigger("opened");
                }
            },
            setLanguageDirection: function(dir) {
                var ltrCss = {
                    left: "0",
                    right: "auto"
                }, rtlCss = {
                    left: "auto",
                    right: " 0"
                };
                dir === "ltr" ? this.$menu.css(ltrCss) : this.$menu.css(rtlCss);
            },
            moveCursorUp: function() {
                this._moveCursor(-1);
            },
            moveCursorDown: function() {
                this._moveCursor(+1);
            },
            getSuggestionUnderCursor: function() {
                var $suggestion = this._getSuggestions().filter(".tt-is-under-cursor").first();
                return $suggestion.length > 0 ? extractSuggestion($suggestion) : null;
            },
            getFirstSuggestion: function() {
                var $suggestion = this._getSuggestions().first();
                return $suggestion.length > 0 ? extractSuggestion($suggestion) : null;
            },
            renderSuggestions: function(dataset, suggestions) {
                var datasetClassName = "tt-dataset-" + dataset.name, wrapper = '<div class="tt-suggestion">%body</div>', compiledHtml, $suggestionsList, $dataset = this.$menu.find("." + datasetClassName), elBuilder, fragment, $el;
                if ($dataset.length === 0) {
                    $suggestionsList = $(html.suggestionsList).css(css.suggestionsList);
                    $dataset = $("<div></div>").addClass(datasetClassName).append(dataset.header).append($suggestionsList).append(dataset.footer).appendTo(this.$menu);
                }
                if (suggestions.length > 0) {
                    this.isEmpty = false;
                    this.isOpen && this._show();
                    elBuilder = document.createElement("div");
                    fragment = document.createDocumentFragment();
                    utils.each(suggestions, function(i, suggestion) {
                        suggestion.dataset = dataset.name;
                        compiledHtml = dataset.template(suggestion.datum);
                        elBuilder.innerHTML = wrapper.replace("%body", compiledHtml);
                        $el = $(elBuilder.firstChild).css(css.suggestion).data("suggestion", suggestion);
                        $el.children().each(function() {
                            $(this).css(css.suggestionChild);
                        });
                        fragment.appendChild($el[0]);
                    });
                    $dataset.show().find(".tt-suggestions").html(fragment);
                } else {
                    this.clearSuggestions(dataset.name);
                }
                this.trigger("suggestionsRendered");
            },
            clearSuggestions: function(datasetName) {
                var $datasets = datasetName ? this.$menu.find(".tt-dataset-" + datasetName) : this.$menu.find('[class^="tt-dataset-"]'), $suggestions = $datasets.find(".tt-suggestions");
                $datasets.hide();
                $suggestions.empty();
                if (this._getSuggestions().length === 0) {
                    this.isEmpty = true;
                    this._hide();
                }
            }
        });
        return DropdownView;
        function extractSuggestion($el) {
            return $el.data("suggestion");
        }
    }();
    var TypeaheadView = function() {
        var html = {
            wrapper: '<span class="twitter-typeahead"></span>',
            hint: '<input class="tt-hint" type="text" autocomplete="off" spellcheck="off" disabled>',
            dropdown: '<span class="tt-dropdown-menu"></span>'
        }, css = {
            wrapper: {
                position: "relative",
                display: "inline-block"
            },
            hint: {
                position: "absolute",
                top: "0",
                left: "0",
                borderColor: "transparent",
                boxShadow: "none"
            },
            query: {
                position: "relative",
                verticalAlign: "top",
                backgroundColor: "transparent"
            },
            dropdown: {
                position: "absolute",
                top: "100%",
                left: "0",
                zIndex: "2000",
                display: "none"
            }
        };
        if (utils.isMsie()) {
            utils.mixin(css.query, {
                backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"
            });
        }
        if (utils.isMsie() && utils.isMsie() <= 7) {
            utils.mixin(css.wrapper, {
                display: "inline",
                zoom: "1"
            });
            utils.mixin(css.query, {
                marginTop: "-1px"
            });
        }
        function TypeaheadView(o) {
            var $menu, $input, $hint;
            utils.bindAll(this);
            this.$node = buildDomStructure(o.input);
            this.datasets = o.datasets;
            this.dir = null;
            this.eventBus = o.eventBus;
            $menu = this.$node.find(".tt-dropdown-menu");
            $input = this.$node.find(".tt-query");
            $hint = this.$node.find(".tt-hint");
            this.dropdownView = new DropdownView({
                menu: $menu
            }).on("suggestionSelected", this._handleSelection).on("cursorMoved", this._clearHint).on("cursorMoved", this._setInputValueToSuggestionUnderCursor).on("cursorRemoved", this._setInputValueToQuery).on("cursorRemoved", this._updateHint).on("suggestionsRendered", this._updateHint).on("opened", this._updateHint).on("closed", this._clearHint).on("opened closed", this._propagateEvent);
            this.inputView = new InputView({
                input: $input,
                hint: $hint
            }).on("focused", this._openDropdown).on("blured", this._closeDropdown).on("blured", this._setInputValueToQuery).on("enterKeyed tabKeyed", this._handleSelection).on("queryChanged", this._clearHint).on("queryChanged", this._clearSuggestions).on("queryChanged", this._getSuggestions).on("whitespaceChanged", this._updateHint).on("queryChanged whitespaceChanged", this._openDropdown).on("queryChanged whitespaceChanged", this._setLanguageDirection).on("escKeyed", this._closeDropdown).on("escKeyed", this._setInputValueToQuery).on("tabKeyed upKeyed downKeyed", this._managePreventDefault).on("upKeyed downKeyed", this._moveDropdownCursor).on("upKeyed downKeyed", this._openDropdown).on("tabKeyed leftKeyed rightKeyed", this._autocomplete);
        }
        utils.mixin(TypeaheadView.prototype, EventTarget, {
            _managePreventDefault: function(e) {
                var $e = e.data, hint, inputValue, preventDefault = false;
                switch (e.type) {
                  case "tabKeyed":
                    hint = this.inputView.getHintValue();
                    inputValue = this.inputView.getInputValue();
                    preventDefault = hint && hint !== inputValue;
                    break;

                  case "upKeyed":
                  case "downKeyed":
                    preventDefault = !$e.shiftKey && !$e.ctrlKey && !$e.metaKey;
                    break;
                }
                preventDefault && $e.preventDefault();
            },
            _setLanguageDirection: function() {
                var dir = this.inputView.getLanguageDirection();
                if (dir !== this.dir) {
                    this.dir = dir;
                    this.$node.css("direction", dir);
                    this.dropdownView.setLanguageDirection(dir);
                }
            },
            _updateHint: function() {
                var suggestion = this.dropdownView.getFirstSuggestion(), hint = suggestion ? suggestion.value : null, dropdownIsVisible = this.dropdownView.isVisible(), inputHasOverflow = this.inputView.isOverflow(), inputValue, query, escapedQuery, beginsWithQuery, match;
                if (hint && dropdownIsVisible && !inputHasOverflow) {
                    inputValue = this.inputView.getInputValue();
                    query = inputValue.replace(/\s{2,}/g, " ").replace(/^\s+/g, "");
                    escapedQuery = utils.escapeRegExChars(query);
                    beginsWithQuery = new RegExp("^(?:" + escapedQuery + ")(.*$)", "i");
                    match = beginsWithQuery.exec(hint);
                    this.inputView.setHintValue(inputValue + (match ? match[1] : ""));
                }
            },
            _clearHint: function() {
                this.inputView.setHintValue("");
            },
            _clearSuggestions: function() {
                this.dropdownView.clearSuggestions();
            },
            _setInputValueToQuery: function() {
                this.inputView.setInputValue(this.inputView.getQuery());
            },
            _setInputValueToSuggestionUnderCursor: function(e) {
                var suggestion = e.data;
                this.inputView.setInputValue(suggestion.value, true);
            },
            _openDropdown: function() {
                this.dropdownView.open();
            },
            _closeDropdown: function(e) {
                this.dropdownView[e.type === "blured" ? "closeUnlessMouseIsOverDropdown" : "close"]();
            },
            _moveDropdownCursor: function(e) {
                var $e = e.data;
                if (!$e.shiftKey && !$e.ctrlKey && !$e.metaKey) {
                    this.dropdownView[e.type === "upKeyed" ? "moveCursorUp" : "moveCursorDown"]();
                }
            },
            _handleSelection: function(e) {
                var byClick = e.type === "suggestionSelected";
                var suggestion = byClick ? e.data : this.dropdownView.getSuggestionUnderCursor();
                if (suggestion) {
                    var url;
                    // for each dataset
                    for(i = 0; i < this.datasets.length; i++){
                        // if the dataset matches the current dataset
                        if(this.datasets[i].name === suggestion.dataset){
                            // get the url of the suggestion based on the urlKey
                            url = suggestion.datum[this.datasets[i].urlKey];
                            // use url helper to prefix the url (for LDAP search)
                            if(!utils.isUndefined(this.datasets[i].urlHelper)){
                               url = this.datasets[i].urlHelper +  url;
                            }
                            break;
                        }
                    }
                    $('form').submit(function(e){e.preventDefault()});
                    window.location.href = url.replace(/\s/g, "+");
                }else if(e.type === 'enterKeyed'){
                    var inputVal = $(this.$node).find('.wms-navbox-input').val();
                    window.location.href = $(this.$node).parent().attr('action') + "?q=" + inputVal;
                }
            },
            _getSuggestions: function() {
                var that = this, query = this.inputView.getQuery();
                if (utils.isBlankString(query)) {
                    return;
                }
                utils.each(this.datasets, function(i, dataset) {
                    dataset.getSuggestions(query, function(suggestions) {
                        if (query === that.inputView.getQuery()) {
                            that.dropdownView.renderSuggestions(dataset, suggestions);
                        }
                    });
                });
            },
            _autocomplete: function(e) {
                var isCursorAtEnd, ignoreEvent, query, hint, suggestion;
                if (e.type === "rightKeyed" || e.type === "leftKeyed") {
                    isCursorAtEnd = this.inputView.isCursorAtEnd();
                    ignoreEvent = this.inputView.getLanguageDirection() === "ltr" ? e.type === "leftKeyed" : e.type === "rightKeyed";
                    if (!isCursorAtEnd || ignoreEvent) {
                        return;
                    }
                }
                query = this.inputView.getQuery();
                hint = this.inputView.getHintValue();
                if (hint !== "" && query !== hint) {
                    suggestion = this.dropdownView.getFirstSuggestion();
                    this.inputView.setInputValue(suggestion.value);
                    this.eventBus.trigger("autocompleted", suggestion.datum, suggestion.dataset);
                }
            },
            _propagateEvent: function(e) {
                this.eventBus.trigger(e.type);
            },
            destroy: function() {
                this.inputView.destroy();
                this.dropdownView.destroy();
                destroyDomStructure(this.$node);
                this.$node = null;
            },
            setQuery: function(query) {
                this.inputView.setQuery(query);
                this.inputView.setInputValue(query);
                this._clearHint();
                this._clearSuggestions();
                this._getSuggestions();
            }
        });
        return TypeaheadView;
        function buildDomStructure(input) {
            var $wrapper = $(html.wrapper), $dropdown = $(html.dropdown), $input = $(input), $hint = $(html.hint);
            $wrapper = $wrapper.css(css.wrapper);
            $dropdown = $dropdown.css(css.dropdown);
            $hint.css(css.hint).css({
                backgroundAttachment: $input.css("background-attachment"),
                backgroundClip: $input.css("background-clip"),
                backgroundColor: $input.css("background-color"),
                backgroundImage: $input.css("background-image"),
                backgroundOrigin: $input.css("background-origin"),
                backgroundPosition: $input.css("background-position"),
                backgroundRepeat: $input.css("background-repeat"),
                backgroundSize: $input.css("background-size")
            });
            $input.data("ttAttrs", {
                dir: $input.attr("dir"),
                autocomplete: $input.attr("autocomplete"),
                spellcheck: $input.attr("spellcheck"),
                style: $input.attr("style")
            });
            $input.addClass("tt-query").attr({
                autocomplete: "off",
                spellcheck: false
            }).css(css.query);
            try {
                !$input.attr("dir") && $input.attr("dir", "auto");
            } catch (e) {}
            return $input.wrap($wrapper).parent().prepend($hint).append($dropdown);
        }
        function destroyDomStructure($node) {
            var $input = $node.find(".tt-query");
            utils.each($input.data("ttAttrs"), function(key, val) {
                utils.isUndefined(val) ? $input.removeAttr(key) : $input.attr(key, val);
            });
            $input.detach().removeData("ttAttrs").removeClass("tt-query").insertAfter($node);
            $node.remove();
        }
    }();
    (function() {
        var cache = {}, viewKey = "ttView", methods;
        methods = {
            initialize: function(datasetDefs) {
                var datasets;
                datasetDefs = utils.isArray(datasetDefs) ? datasetDefs : [ datasetDefs ];
                if (datasetDefs.length === 0) {
                    $.error("no datasets provided");
                }
                datasets = utils.map(datasetDefs, function(o) {
                    var dataset = cache[o.name] ? cache[o.name] : new Dataset(o);
                    if (o.name) {
                        cache[o.name] = dataset;
                    }
                    return dataset;
                });
                return this.each(initialize);
                function initialize() {
                    var $input = $(this), deferreds, eventBus = new EventBus({
                        el: $input
                    });
                    deferreds = utils.map(datasets, function(dataset) {
                        return dataset.initialize();
                    });
                    $input.data(viewKey, new TypeaheadView({
                        input: $input,
                        eventBus: eventBus = new EventBus({
                            el: $input
                        }),
                        datasets: datasets
                    }));
                    $.when.apply($, deferreds).always(function() {
                        utils.defer(function() {
                            eventBus.trigger("initialized");
                        });
                    });
                }
            },
            destroy: function() {
                return this.each(destroy);
                function destroy() {
                    var $this = $(this), view = $this.data(viewKey);
                    if (view) {
                        view.destroy();
                        $this.removeData(viewKey);
                    }
                }
            },
            setQuery: function(query) {
                return this.each(setQuery);
                function setQuery() {
                    var view = $(this).data(viewKey);
                    view && view.setQuery(query);
                }
            }
        };
        jQuery.fn.wms_typeahead = function(method) {
            if (methods[method]) {
                return methods[method].apply(this, [].slice.call(arguments, 1));
            } else {
                return methods.initialize.apply(this, arguments);
            }
        };
    })();
})(window.jQuery);
