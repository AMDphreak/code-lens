var Yu=Object.defineProperty;var ku=u=>{throw TypeError(u)};var Vu=(u,t,n)=>t in u?Yu(u,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):u[t]=n;var Iu=(u,t,n)=>Vu(u,typeof t!="symbol"?t+"":t,n),Eu=(u,t,n)=>t.has(u)||ku("Cannot "+n);var F=(u,t,n)=>(Eu(u,t,"read from private field"),n?n.call(u):t.get(u)),S=(u,t,n)=>t.has(u)?ku("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(u):t.set(u,n),b=(u,t,n,s)=>(Eu(u,t,"write to private field"),s?s.call(u,n):t.set(u,n),n),c=(u,t,n)=>(Eu(u,t,"access private method"),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const D of i)if(D.type==="childList")for(const a of D.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(i){const D={};return i.integrity&&(D.integrity=i.integrity),i.referrerPolicy&&(D.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?D.credentials="include":i.crossOrigin==="anonymous"?D.credentials="omit":D.credentials="same-origin",D}function s(i){if(i.ep)return;i.ep=!0;const D=n(i);fetch(i.href,D)}})();var Ru=/[\u1680\u2000-\u200A\u202F\u205F\u3000]/,zu=/[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/,Tu=/[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/,pu={Space_Separator:Ru,ID_Start:zu,ID_Continue:Tu},w={isSpaceSeparator(u){return typeof u=="string"&&pu.Space_Separator.test(u)},isIdStartChar(u){return typeof u=="string"&&(u>="a"&&u<="z"||u>="A"&&u<="Z"||u==="$"||u==="_"||pu.ID_Start.test(u))},isIdContinueChar(u){return typeof u=="string"&&(u>="a"&&u<="z"||u>="A"&&u<="Z"||u>="0"&&u<="9"||u==="$"||u==="_"||u==="‌"||u==="‍"||pu.ID_Continue.test(u))},isDigit(u){return typeof u=="string"&&/[0-9]/.test(u)},isHexDigit(u){return typeof u=="string"&&/[0-9A-Fa-f]/.test(u)}};let fu,L,Y,du,K,O,v,yu,ru;var Ku=function(t,n){fu=String(t),L="start",Y=[],du=0,K=1,O=0,v=void 0,yu=void 0,ru=void 0;do v=ju(),_u[L]();while(v.type!=="eof");return typeof n=="function"?Bu({"":ru},"",n):ru};function Bu(u,t,n){const s=u[t];if(s!=null&&typeof s=="object")if(Array.isArray(s))for(let i=0;i<s.length;i++){const D=String(i),a=Bu(s,D,n);a===void 0?delete s[D]:Object.defineProperty(s,D,{value:a,writable:!0,enumerable:!0,configurable:!0})}else for(const i in s){const D=Bu(s,i,n);D===void 0?delete s[i]:Object.defineProperty(s,i,{value:D,writable:!0,enumerable:!0,configurable:!0})}return n.call(u,t,s)}let C,d,Du,H,A;function ju(){for(C="default",d="",Du=!1,H=1;;){A=V();const u=Zu[C]();if(u)return u}}function V(){if(fu[du])return String.fromCodePoint(fu.codePointAt(du))}function e(){const u=V();return u===`
`?(K++,O=0):u?O+=u.length:O++,u&&(du+=u.length),u}const Zu={default(){switch(A){case"	":case"\v":case"\f":case" ":case" ":case"\uFEFF":case`
`:case"\r":case"\u2028":case"\u2029":e();return;case"/":e(),C="comment";return;case void 0:return e(),f("eof")}if(w.isSpaceSeparator(A)){e();return}return Zu[L]()},comment(){switch(A){case"*":e(),C="multiLineComment";return;case"/":e(),C="singleLineComment";return}throw B(e())},multiLineComment(){switch(A){case"*":e(),C="multiLineCommentAsterisk";return;case void 0:throw B(e())}e()},multiLineCommentAsterisk(){switch(A){case"*":e();return;case"/":e(),C="default";return;case void 0:throw B(e())}e(),C="multiLineComment"},singleLineComment(){switch(A){case`
`:case"\r":case"\u2028":case"\u2029":e(),C="default";return;case void 0:return e(),f("eof")}e()},value(){switch(A){case"{":case"[":return f("punctuator",e());case"n":return e(),P("ull"),f("null",null);case"t":return e(),P("rue"),f("boolean",!0);case"f":return e(),P("alse"),f("boolean",!1);case"-":case"+":e()==="-"&&(H=-1),C="sign";return;case".":d=e(),C="decimalPointLeading";return;case"0":d=e(),C="zero";return;case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":d=e(),C="decimalInteger";return;case"I":return e(),P("nfinity"),f("numeric",1/0);case"N":return e(),P("aN"),f("numeric",NaN);case'"':case"'":Du=e()==='"',d="",C="string";return}throw B(e())},identifierNameStartEscape(){if(A!=="u")throw B(e());e();const u=hu();switch(u){case"$":case"_":break;default:if(!w.isIdStartChar(u))throw vu();break}d+=u,C="identifierName"},identifierName(){switch(A){case"$":case"_":case"‌":case"‍":d+=e();return;case"\\":e(),C="identifierNameEscape";return}if(w.isIdContinueChar(A)){d+=e();return}return f("identifier",d)},identifierNameEscape(){if(A!=="u")throw B(e());e();const u=hu();switch(u){case"$":case"_":case"‌":case"‍":break;default:if(!w.isIdContinueChar(u))throw vu();break}d+=u,C="identifierName"},sign(){switch(A){case".":d=e(),C="decimalPointLeading";return;case"0":d=e(),C="zero";return;case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":d=e(),C="decimalInteger";return;case"I":return e(),P("nfinity"),f("numeric",H*(1/0));case"N":return e(),P("aN"),f("numeric",NaN)}throw B(e())},zero(){switch(A){case".":d+=e(),C="decimalPoint";return;case"e":case"E":d+=e(),C="decimalExponent";return;case"x":case"X":d+=e(),C="hexadecimal";return}return f("numeric",H*0)},decimalInteger(){switch(A){case".":d+=e(),C="decimalPoint";return;case"e":case"E":d+=e(),C="decimalExponent";return}if(w.isDigit(A)){d+=e();return}return f("numeric",H*Number(d))},decimalPointLeading(){if(w.isDigit(A)){d+=e(),C="decimalFraction";return}throw B(e())},decimalPoint(){switch(A){case"e":case"E":d+=e(),C="decimalExponent";return}if(w.isDigit(A)){d+=e(),C="decimalFraction";return}return f("numeric",H*Number(d))},decimalFraction(){switch(A){case"e":case"E":d+=e(),C="decimalExponent";return}if(w.isDigit(A)){d+=e();return}return f("numeric",H*Number(d))},decimalExponent(){switch(A){case"+":case"-":d+=e(),C="decimalExponentSign";return}if(w.isDigit(A)){d+=e(),C="decimalExponentInteger";return}throw B(e())},decimalExponentSign(){if(w.isDigit(A)){d+=e(),C="decimalExponentInteger";return}throw B(e())},decimalExponentInteger(){if(w.isDigit(A)){d+=e();return}return f("numeric",H*Number(d))},hexadecimal(){if(w.isHexDigit(A)){d+=e(),C="hexadecimalInteger";return}throw B(e())},hexadecimalInteger(){if(w.isHexDigit(A)){d+=e();return}return f("numeric",H*Number(d))},string(){switch(A){case"\\":e(),d+=Pu();return;case'"':if(Du)return e(),f("string",d);d+=e();return;case"'":if(!Du)return e(),f("string",d);d+=e();return;case`
`:case"\r":throw B(e());case"\u2028":case"\u2029":Uu(A);break;case void 0:throw B(e())}d+=e()},start(){switch(A){case"{":case"[":return f("punctuator",e())}C="value"},beforePropertyName(){switch(A){case"$":case"_":d=e(),C="identifierName";return;case"\\":e(),C="identifierNameStartEscape";return;case"}":return f("punctuator",e());case'"':case"'":Du=e()==='"',C="string";return}if(w.isIdStartChar(A)){d+=e(),C="identifierName";return}throw B(e())},afterPropertyName(){if(A===":")return f("punctuator",e());throw B(e())},beforePropertyValue(){C="value"},afterPropertyValue(){switch(A){case",":case"}":return f("punctuator",e())}throw B(e())},beforeArrayValue(){if(A==="]")return f("punctuator",e());C="value"},afterArrayValue(){switch(A){case",":case"]":return f("punctuator",e())}throw B(e())},end(){throw B(e())}};function f(u,t){return{type:u,value:t,line:K,column:O}}function P(u){for(const t of u){if(V()!==t)throw B(e());e()}}function Pu(){switch(V()){case"b":return e(),"\b";case"f":return e(),"\f";case"n":return e(),`
`;case"r":return e(),"\r";case"t":return e(),"	";case"v":return e(),"\v";case"0":if(e(),w.isDigit(V()))throw B(e());return"\0";case"x":return e(),Ju();case"u":return e(),hu();case`
`:case"\u2028":case"\u2029":return e(),"";case"\r":return e(),V()===`
`&&e(),"";case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":throw B(e());case void 0:throw B(e())}return e()}function Ju(){let u="",t=V();if(!w.isHexDigit(t)||(u+=e(),t=V(),!w.isHexDigit(t)))throw B(e());return u+=e(),String.fromCodePoint(parseInt(u,16))}function hu(){let u="",t=4;for(;t-- >0;){const n=V();if(!w.isHexDigit(n))throw B(e());u+=e()}return String.fromCodePoint(parseInt(u,16))}const _u={start(){if(v.type==="eof")throw J();mu()},beforePropertyName(){switch(v.type){case"identifier":case"string":yu=v.value,L="afterPropertyName";return;case"punctuator":cu();return;case"eof":throw J()}},afterPropertyName(){if(v.type==="eof")throw J();L="beforePropertyValue"},beforePropertyValue(){if(v.type==="eof")throw J();mu()},beforeArrayValue(){if(v.type==="eof")throw J();if(v.type==="punctuator"&&v.value==="]"){cu();return}mu()},afterPropertyValue(){if(v.type==="eof")throw J();switch(v.value){case",":L="beforePropertyName";return;case"}":cu()}},afterArrayValue(){if(v.type==="eof")throw J();switch(v.value){case",":L="beforeArrayValue";return;case"]":cu()}},end(){}};function mu(){let u;switch(v.type){case"punctuator":switch(v.value){case"{":u={};break;case"[":u=[];break}break;case"null":case"boolean":case"numeric":case"string":u=v.value;break}if(ru===void 0)ru=u;else{const t=Y[Y.length-1];Array.isArray(t)?t.push(u):Object.defineProperty(t,yu,{value:u,writable:!0,enumerable:!0,configurable:!0})}if(u!==null&&typeof u=="object")Y.push(u),Array.isArray(u)?L="beforeArrayValue":L="beforePropertyName";else{const t=Y[Y.length-1];t==null?L="end":Array.isArray(t)?L="afterArrayValue":L="afterPropertyValue"}}function cu(){Y.pop();const u=Y[Y.length-1];u==null?L="end":Array.isArray(u)?L="afterArrayValue":L="afterPropertyValue"}function B(u){return Cu(u===void 0?`JSON5: invalid end of input at ${K}:${O}`:`JSON5: invalid character '${Lu(u)}' at ${K}:${O}`)}function J(){return Cu(`JSON5: invalid end of input at ${K}:${O}`)}function vu(){return O-=5,Cu(`JSON5: invalid identifier character at ${K}:${O}`)}function Uu(u){console.warn(`JSON5: '${Lu(u)}' in strings is not valid ECMAScript; consider escaping`)}function Lu(u){const t={"'":"\\'",'"':'\\"',"\\":"\\\\","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","	":"\\t","\v":"\\v","\0":"\\0","\u2028":"\\u2028","\u2029":"\\u2029"};if(t[u])return t[u];if(u<" "){const n=u.charCodeAt(0).toString(16);return"\\x"+("00"+n).substring(n.length)}return u}function Cu(u){const t=new SyntaxError(u);return t.lineNumber=K,t.columnNumber=O,t}var Qu=function(t,n,s){const i=[];let D="",a,m,h="",k;if(n!=null&&typeof n=="object"&&!Array.isArray(n)&&(s=n.space,k=n.quote,n=n.replacer),typeof n=="function")m=n;else if(Array.isArray(n)){a=[];for(const l of n){let E;typeof l=="string"?E=l:(typeof l=="number"||l instanceof String||l instanceof Number)&&(E=String(l)),E!==void 0&&a.indexOf(E)<0&&a.push(E)}}return s instanceof Number?s=Number(s):s instanceof String&&(s=String(s)),typeof s=="number"?s>0&&(s=Math.min(10,Math.floor(s)),h="          ".substr(0,s)):typeof s=="string"&&(h=s.substr(0,10)),I("",{"":t});function I(l,E){let o=E[l];switch(o!=null&&(typeof o.toJSON5=="function"?o=o.toJSON5(l):typeof o.toJSON=="function"&&(o=o.toJSON(l))),m&&(o=m.call(E,l,o)),o instanceof Number?o=Number(o):o instanceof String?o=String(o):o instanceof Boolean&&(o=o.valueOf()),o){case null:return"null";case!0:return"true";case!1:return"false"}if(typeof o=="string")return G(o);if(typeof o=="number")return String(o);if(typeof o=="object")return Array.isArray(o)?j(o):W(o)}function G(l){const E={"'":.1,'"':.2},o={"'":"\\'",'"':'\\"',"\\":"\\\\","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","	":"\\t","\v":"\\v","\0":"\\0","\u2028":"\\u2028","\u2029":"\\u2029"};let g="";for(let y=0;y<l.length;y++){const Z=l[y];switch(Z){case"'":case'"':E[Z]++,g+=Z;continue;case"\0":if(w.isDigit(l[y+1])){g+="\\x00";continue}}if(o[Z]){g+=o[Z];continue}if(Z<" "){let uu=Z.charCodeAt(0).toString(16);g+="\\x"+("00"+uu).substring(uu.length);continue}g+=Z}const p=k||Object.keys(E).reduce((y,Z)=>E[y]<E[Z]?y:Z);return g=g.replace(new RegExp(p,"g"),o[p]),p+g+p}function W(l){if(i.indexOf(l)>=0)throw TypeError("Converting circular structure to JSON5");i.push(l);let E=D;D=D+h;let o=a||Object.keys(l),g=[];for(const y of o){const Z=I(y,l);if(Z!==void 0){let uu=R(y)+":";h!==""&&(uu+=" "),uu+=Z,g.push(uu)}}let p;if(g.length===0)p="{}";else{let y;if(h==="")y=g.join(","),p="{"+y+"}";else{let Z=`,
`+D;y=g.join(Z),p=`{
`+D+y+`,
`+E+"}"}}return i.pop(),D=E,p}function R(l){if(l.length===0)return G(l);const E=String.fromCodePoint(l.codePointAt(0));if(!w.isIdStartChar(E))return G(l);for(let o=E.length;o<l.length;o++)if(!w.isIdContinueChar(String.fromCodePoint(l.codePointAt(o))))return G(l);return l}function j(l){if(i.indexOf(l)>=0)throw TypeError("Converting circular structure to JSON5");i.push(l);let E=D;D=D+h;let o=[];for(let p=0;p<l.length;p++){const y=I(String(p),l);o.push(y!==void 0?y:"null")}let g;if(o.length===0)g="[]";else if(h==="")g="["+o.join(",")+"]";else{let p=`,
`+D,y=o.join(p);g=`[
`+D+y+`,
`+E+"]"}return i.pop(),D=E,g}};const $u={parse:Ku,stringify:Qu};var xu=$u;function qu(u){const t=xu.parse(u);return te(t),t}function ue(u){return xu.parse(u)}function ee(u){return xu.parse(u)}function te(u){var n;if(u.version!==1)throw new Error(`Unsupported lens block version: ${u.version}`);if(!((n=u.lenses)!=null&&n.length)||u.lenses.length<2)throw new Error("Lens block requires at least two lenses");const t=u.lenses.map(s=>s.lines.length);if(!t.every(s=>s===t[0]))throw new Error("All lenses must have the same number of lines");for(let s=0;s<u.lenses[0].lines.length;s++){const i=u.lenses.map(D=>D.lines[s].length);if(!i.every(D=>D===i[0]))throw new Error(`Line ${s}: token count mismatch across lenses`)}}function ne(u){const t=new Map;for(const s of u)for(const i of s.lines)for(const D of i){if(!D.slot)continue;const a=t.get(D.slot)??new Set;a.add(D.text),t.set(D.slot,a)}const n=new Set;for(const[s,i]of t)i.size>1&&n.add(s);return n}function ie(u,t){const n=t??u.defaultTheme,s=u.themes[n];if(!s)throw new Error(`Unknown theme: ${n}`);return{id:n,theme:s}}function se(u,t){const n=u.lenses[t];if(!n)throw new Error(`Theme missing lens colors for: ${t}`);return n}function De(u,t,n,s){const{theme:i}=ie(t,n),D=se(i,s);u.style.setProperty("--el-panel-bg",D.panel),u.style.setProperty("--el-diff-bg",D.diff),u.style.setProperty("--el-diff-border",D.diffBorder),u.style.setProperty("--el-glass-tint",D.glass),u.style.setProperty("--el-code-surface",i.chrome.codeSurface),u.style.setProperty("--el-toolbar",i.chrome.toolbar),u.style.setProperty("--el-border",i.chrome.border),u.style.setProperty("--el-text",i.chrome.text);for(const[a,m]of Object.entries(t.syntax))u.style.setProperty(`--el-syntax-${a}`,m)}function re(u){return Object.keys(u.themes)}const gu="lens-code-block";var x,$,N,au,ou,M,nu,Fu,q,T,iu,su,r,X,lu,eu,_,bu,U,Su,z,Nu,Q,Ou;class Gu extends HTMLElement{constructor(){super(...arguments);S(this,r);S(this,x,null);S(this,$,0);S(this,N,null);S(this,au,new Set);S(this,ou,new Map);S(this,M,null);S(this,nu,null);S(this,Fu,null);S(this,q,null);S(this,T,[]);S(this,iu,0);S(this,su,!1)}connectedCallback(){F(this,x)&&c(this,r,bu).call(this)}configure(n){b(this,x,n),b(this,au,ne(n.document.lenses)),b(this,$,0),b(this,N,null),this.isConnected&&c(this,r,bu).call(this)}attributeChangedCallback(n,s,i){n==="theme"&&i&&F(this,x)&&(c(this,r,_).call(this,i,c(this,r,lu).call(this).id),c(this,r,z).call(this))}}x=new WeakMap,$=new WeakMap,N=new WeakMap,au=new WeakMap,ou=new WeakMap,M=new WeakMap,nu=new WeakMap,Fu=new WeakMap,q=new WeakMap,T=new WeakMap,iu=new WeakMap,su=new WeakMap,r=new WeakSet,X=function(){return F(this,N)??F(this,$)},lu=function(){return F(this,x).document.lenses[c(this,r,X).call(this)]},eu=function(){return this.getAttribute("theme")??F(this,x).themeId??F(this,x).themes.defaultTheme},_=function(n,s){De(this,F(this,x).themes,n,s);const i=F(this,x).ui;this.style.setProperty("--el-width-ms",`${i.animation.widthMs}ms`),this.style.setProperty("--el-width-easing",i.animation.widthEasing),this.style.setProperty("--el-fade-ms",`${i.animation.fadeMs}ms`),this.style.setProperty("--el-glass-ms",`${i.animation.glassSlideMs}ms`),this.style.setProperty("--el-code-font",i.layout.codeFontFamily),this.style.setProperty("--el-swipe-opacity",String(F(this,x).ui.interaction.touch.swipeRevealOpacity))},bu=function(){const n=F(this,x),s=c(this,r,lu).call(this);c(this,r,_).call(this,c(this,r,eu).call(this),s.id),this.innerHTML="";const i=document.createElement("div");i.className="el-root";const D=document.createElement("div");D.className="el-toolbar",D.setAttribute("role","tablist"),D.addEventListener("mouseleave",()=>{b(this,N,null),c(this,r,U).call(this),c(this,r,z).call(this),c(this,r,Q).call(this)});const a=document.createElement("div");a.className="el-glass",D.appendChild(a),b(this,M,a);const m=document.createElement("span");m.style.cssText="position:relative;z-index:1;padding:0 8px;font-family:ui-monospace,monospace;font-size:9px;text-transform:uppercase;letter-spacing:0.12em;opacity:0.55",m.textContent="Lens",D.appendChild(m),b(this,T,n.document.lenses.map((o,g)=>{const p=document.createElement("button");return p.type="button",p.className="el-tab",p.setAttribute("role","tab"),p.textContent=o.label,p.addEventListener("mouseenter",()=>{b(this,N,g),c(this,r,_).call(this,c(this,r,eu).call(this),o.id),c(this,r,U).call(this),c(this,r,z).call(this),c(this,r,Q).call(this,p)}),p.addEventListener("focus",()=>{b(this,N,g),c(this,r,_).call(this,c(this,r,eu).call(this),o.id),c(this,r,U).call(this),c(this,r,z).call(this),c(this,r,Q).call(this,p)}),p.addEventListener("click",()=>{b(this,$,g),b(this,N,null),c(this,r,_).call(this,c(this,r,eu).call(this),o.id),c(this,r,U).call(this),c(this,r,z).call(this),c(this,r,Q).call(this,p)}),D.appendChild(p),p}));const h=document.createElement("span");h.style.cssText="margin-left:auto;position:relative;z-index:1;padding:0 8px;font-family:ui-monospace,monospace;font-size:9px;text-transform:uppercase;opacity:0.55",h.textContent=n.document.language,D.appendChild(h),b(this,nu,D),i.appendChild(D);const k=document.createElement("div");k.className="el-body",b(this,Fu,k);const I=document.createElement("p");I.className="el-meta-sub",I.dataset.meta="sub";const G=document.createElement("p");G.className="el-meta-desc",G.dataset.meta="desc";const W=document.createElement("div");W.className="el-code-wrap";const R=document.createElement("p");R.className="el-swipe-hint",R.textContent="Swipe code to preview lenses";const j=document.createElement("div");j.className="el-swipe-ghost";const l=document.createElement("pre");l.className="el-code",l.dataset.code="1",W.appendChild(R),W.appendChild(j),W.appendChild(l),c(this,r,Ou).call(this,W,j),k.appendChild(I),k.appendChild(G),k.appendChild(W);const E=document.createElement("p");E.className="el-foot",E.textContent="Hover tabs to preview (desktop) · swipe code (touch) · click/tap to lock · amber = varying tokens",k.appendChild(E),i.appendChild(k),this.appendChild(i),b(this,q,l),c(this,r,U).call(this),c(this,r,z).call(this),requestAnimationFrame(()=>c(this,r,Q).call(this,F(this,T)[c(this,r,X).call(this)]))},U=function(){const n=c(this,r,lu).call(this),s=this.querySelector('[data-meta="sub"]'),i=this.querySelector('[data-meta="desc"]');s&&(s.textContent=n.subtitle??""),i&&(i.textContent=n.description??""),F(this,T).forEach((D,a)=>{D.setAttribute("aria-selected",String(a===c(this,r,X).call(this)))})},Su=function(n,s){return`${n}:${s}`},z=function(){if(!F(this,q)||!F(this,x))return;const n=F(this,x),s=c(this,r,X).call(this),i=n.document.lenses[0].lines;F(this,q).innerHTML="",i.forEach((D,a)=>{const m=document.createElement("div");m.className="el-line",D.forEach((h,k)=>{const I=n.document.lenses[s].lines[a][k];if(!!I.slot&&F(this,au).has(I.slot))m.appendChild(c(this,r,Nu).call(this,a,k,I));else{const W=document.createElement("span");W.className=`el-token-kind-${I.kind}`,W.textContent=I.text,m.appendChild(W)}}),F(this,q).appendChild(m)})},Nu=function(n,s,i){const D=c(this,r,Su).call(this,n,s);let a=F(this,ou).get(D);a?a.incoming!==i.text&&(a.outgoing=a.incoming,a.incoming=i.text,a.outOpacity=1,a.inOpacity=0):(a={outgoing:null,incoming:i.text,outOpacity:0,inOpacity:1,widthPx:null},F(this,ou).set(D,a));const m=document.createElement("span");m.className="el-diff";const h=document.createElement("span");h.style.cssText="position:absolute;visibility:hidden;white-space:pre;font:inherit;pointer-events:none",h.textContent=i.text,m.appendChild(h);const k=document.createElement("span");k.className="el-diff-inner";const I=document.createElement("span");if(I.className="el-diff-text",a.outgoing!==null){const E=document.createElement("span");E.style.opacity=String(a.outOpacity),E.style.transition="opacity var(--el-fade-ms) ease-out";const o=document.createElement("span");o.className=`el-token-kind-${i.kind}`,o.textContent=a.outgoing,E.appendChild(o),I.appendChild(E)}const G=document.createElement("span");G.style.opacity=String(a.inOpacity),G.style.transition="opacity var(--el-fade-ms) ease-in 60ms";const W=document.createElement("span");W.className=`el-token-kind-${i.kind}`,W.textContent=a.incoming,G.appendChild(W),I.appendChild(G),k.appendChild(I),m.appendChild(k);const R=F(this,x).ui.animation.diffTokenPaddingPx,j=a.widthPx??(m.offsetWidth||h.offsetWidth+R),l=h.offsetWidth+R;return m.style.width=`${j}px`,requestAnimationFrame(()=>{requestAnimationFrame(()=>{m.style.width=`${l}px`,a.outgoing!==null?(a.outOpacity=0,a.inOpacity=1,I.querySelectorAll(":scope > span").forEach((E,o)=>{E.style.opacity=o===0&&a.outgoing?"0":"1"}),setTimeout(()=>{a.outgoing=null,a.widthPx=l},F(this,x).ui.animation.widthMs+F(this,x).ui.animation.fadeMs)):a.widthPx=l})}),m},Q=function(n){if(!F(this,M)||!F(this,nu))return;const s=n??F(this,T)[c(this,r,X).call(this)];if(!s)return;const i=F(this,nu).getBoundingClientRect(),D=s.getBoundingClientRect();F(this,M).style.left=`${D.left-i.left}px`,F(this,M).style.width=`${D.width}px`,F(this,M).style.height=`${D.height}px`,F(this,M).style.opacity="1"},Ou=function(n,s){const i=F(this,x).ui.interaction.touch.swipeThresholdPx,D=F(this,x).document.lenses;n.addEventListener("touchstart",a=>{b(this,iu,a.touches[0].clientX),b(this,su,!0)},{passive:!0}),n.addEventListener("touchmove",a=>{if(!F(this,su))return;const m=a.touches[0].clientX-F(this,iu);Math.abs(m)>12&&s.classList.add("visible");const h=m<-i?Math.min(c(this,r,X).call(this)+1,D.length-1):m>i?Math.max(c(this,r,X).call(this)-1,0):null;if(h!==null&&h!==c(this,r,X).call(this)){b(this,iu,a.touches[0].clientX),b(this,N,h);const k=D[h];c(this,r,_).call(this,c(this,r,eu).call(this),k.id),c(this,r,U).call(this),c(this,r,z).call(this),c(this,r,Q).call(this,F(this,T)[h])}},{passive:!0}),n.addEventListener("touchend",()=>{b(this,su,!1),s.classList.remove("visible"),b(this,$,c(this,r,X).call(this)),b(this,N,null)},{passive:!0})},Iu(Gu,"observedAttributes",["theme"]);function Xu(){customElements.get(gu)||customElements.define(gu,Gu)}function ae(u,t){Xu();const n=document.createElement(gu);return t&&n.setAttribute("theme",t),n.configure(u),n}function oe(u=document){if(u.getElementById("examplens-styles"))return;const t=u.createElement("link");t.id="examplens-styles",t.rel="stylesheet",t.href=new URL("data:text/css;base64,Omhvc3QgewogIGRpc3BsYXk6IGJsb2NrOwogIC0tZWwtd2lkdGgtbXM6IDQyMG1zOwogIC0tZWwtd2lkdGgtZWFzaW5nOiBjdWJpYy1iZXppZXIoMC4xNiwgMSwgMC4zLCAxKTsKICAtLWVsLWZhZGUtbXM6IDIyMG1zOwogIC0tZWwtZ2xhc3MtbXM6IDMyMG1zOwogIGZvbnQtZmFtaWx5OiBzeXN0ZW0tdWksIHNhbnMtc2VyaWY7CiAgY29sb3I6IHZhcigtLWVsLXRleHQsICMyYzI4MjQpOwp9CgouZWwtcm9vdCB7CiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tZWwtYm9yZGVyLCAjZDRkMGM4KTsKICBvdmVyZmxvdzogaGlkZGVuOwogIGJhY2tncm91bmQ6IHZhcigtLWVsLXRvb2xiYXIsICNmMGVmZWMpOwp9CgouZWwtdG9vbGJhciB7CiAgcG9zaXRpb246IHJlbGF0aXZlOwogIGRpc3BsYXk6IGZsZXg7CiAgZmxleC13cmFwOiB3cmFwOwogIGFsaWduLWl0ZW1zOiBjZW50ZXI7CiAgZ2FwOiA0cHg7CiAgcGFkZGluZzogOHB4OwogIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1lbC1ib3JkZXIsICNkNGQwYzgpOwogIGJhY2tncm91bmQ6IHZhcigtLWVsLXRvb2xiYXIsICNmMGVmZWMpOwp9CgouZWwtZ2xhc3MgewogIHBvc2l0aW9uOiBhYnNvbHV0ZTsKICB6LWluZGV4OiAwOwogIGJvcmRlci1yYWRpdXM6IDRweDsKICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMzUpOwogIGJhY2tncm91bmQ6IHZhcigtLWVsLWdsYXNzLXRpbnQsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKSk7CiAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDEycHgpOwogIC13ZWJraXQtYmFja2Ryb3AtZmlsdGVyOiBibHVyKDEycHgpOwogIGJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDAgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjM1KSwgMCAycHggOHB4IHJnYmEoMCwgMCwgMCwgMC4wNik7CiAgcG9pbnRlci1ldmVudHM6IG5vbmU7CiAgb3BhY2l0eTogMDsKICB0cmFuc2l0aW9uOgogICAgbGVmdCB2YXIoLS1lbC1nbGFzcy1tcykgdmFyKC0tZWwtd2lkdGgtZWFzaW5nKSwKICAgIHdpZHRoIHZhcigtLWVsLWdsYXNzLW1zKSB2YXIoLS1lbC13aWR0aC1lYXNpbmcpLAogICAgaGVpZ2h0IDIwMG1zIGVhc2UsCiAgICBvcGFjaXR5IDIwMG1zIGVhc2U7Cn0KCi5lbC10YWIgewogIHBvc2l0aW9uOiByZWxhdGl2ZTsKICB6LWluZGV4OiAxOwogIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50OwogIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50OwogIHBhZGRpbmc6IDRweCAxMHB4OwogIGZvbnQtZmFtaWx5OiB1aS1tb25vc3BhY2UsIG1vbm9zcGFjZTsKICBmb250LXNpemU6IDEwcHg7CiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTsKICBsZXR0ZXItc3BhY2luZzogMC4wOGVtOwogIGN1cnNvcjogcG9pbnRlcjsKICBjb2xvcjogaW5oZXJpdDsKICBib3JkZXItcmFkaXVzOiA0cHg7Cn0KCi5lbC10YWJbYXJpYS1zZWxlY3RlZD0idHJ1ZSJdIHsKICBmb250LXdlaWdodDogNjAwOwp9CgouZWwtYm9keSB7CiAgcGFkZGluZzogMTZweDsKICBiYWNrZ3JvdW5kOiB2YXIoLS1lbC1wYW5lbC1iZywgI2YzZWJlNCk7CiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAyMDBtcyBlYXNlOwp9CgouZWwtbWV0YS1zdWIgewogIGZvbnQtZmFtaWx5OiB1aS1tb25vc3BhY2UsIG1vbm9zcGFjZTsKICBmb250LXNpemU6IDEwcHg7CiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTsKICBsZXR0ZXItc3BhY2luZzogMC4xMmVtOwogIG9wYWNpdHk6IDAuNzsKICBtYXJnaW46IDAgMCA0cHg7Cn0KCi5lbC1tZXRhLWRlc2MgewogIGZvbnQtc2l6ZTogMTRweDsKICBsaW5lLWhlaWdodDogMS41OwogIG1hcmdpbjogMCAwIDEycHg7CiAgb3BhY2l0eTogMC44NTsKfQoKLmVsLWNvZGUtd3JhcCB7CiAgcG9zaXRpb246IHJlbGF0aXZlOwogIHRvdWNoLWFjdGlvbjogcGFuLXk7CiAgdXNlci1zZWxlY3Q6IG5vbmU7Cn0KCi5lbC1zd2lwZS1oaW50IHsKICBkaXNwbGF5OiBub25lOwogIGZvbnQtZmFtaWx5OiB1aS1tb25vc3BhY2UsIG1vbm9zcGFjZTsKICBmb250LXNpemU6IDlweDsKICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlOwogIGxldHRlci1zcGFjaW5nOiAwLjFlbTsKICBvcGFjaXR5OiAwLjU7CiAgbWFyZ2luLWJvdHRvbTogOHB4Owp9CgpAbWVkaWEgKHBvaW50ZXI6IGNvYXJzZSkgewogIC5lbC1zd2lwZS1oaW50IHsKICAgIGRpc3BsYXk6IGJsb2NrOwogIH0KfQoKLmVsLWNvZGUgewogIG92ZXJmbG93LXg6IGF1dG87CiAgbWFyZ2luOiAwOwogIHBhZGRpbmc6IDE2cHg7CiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tZWwtYm9yZGVyLCAjZDRkMGM4KTsKICBiYWNrZ3JvdW5kOiB2YXIoLS1lbC1jb2RlLXN1cmZhY2UsICNmYWZhZjgpOwogIGZvbnQtZmFtaWx5OiB2YXIoLS1lbC1jb2RlLWZvbnQsICJTcGFjZSBNb25vIiwgbW9ub3NwYWNlKTsKICBmb250LXNpemU6IDEzcHg7CiAgbGluZS1oZWlnaHQ6IDEuNjsKfQoKLmVsLWxpbmUgewogIHdoaXRlLXNwYWNlOiBwcmU7Cn0KCi5lbC10b2tlbi1raW5kLWtleXdvcmQgeyBjb2xvcjogdmFyKC0tZWwtc3ludGF4LWtleXdvcmQpOyB9Ci5lbC10b2tlbi1raW5kLXR5cGUgeyBjb2xvcjogdmFyKC0tZWwtc3ludGF4LXR5cGUpOyB9Ci5lbC10b2tlbi1raW5kLWlkZW50aWZpZXIgeyBjb2xvcjogdmFyKC0tZWwtc3ludGF4LWlkZW50aWZpZXIpOyB9Ci5lbC10b2tlbi1raW5kLXN0cmluZyB7IGNvbG9yOiB2YXIoLS1lbC1zeW50YXgtc3RyaW5nKTsgfQouZWwtdG9rZW4ta2luZC1jb21tZW50IHsgY29sb3I6IHZhcigtLWVsLXN5bnRheC1jb21tZW50KTsgZm9udC1zdHlsZTogaXRhbGljOyB9Ci5lbC10b2tlbi1raW5kLXB1bmN0dWF0aW9uIHsgY29sb3I6IHZhcigtLWVsLXN5bnRheC1wdW5jdHVhdGlvbik7IH0KLmVsLXRva2VuLWtpbmQtbnVtYmVyIHsgY29sb3I6IHZhcigtLWVsLXN5bnRheC1udW1iZXIpOyB9Ci5lbC10b2tlbi1raW5kLWJ1aWx0aW4geyBjb2xvcjogdmFyKC0tZWwtc3ludGF4LWJ1aWx0aW4pOyB9Ci5lbC10b2tlbi1raW5kLW1hY3JvIHsgY29sb3I6IHZhcigtLWVsLXN5bnRheC1tYWNybyk7IH0KLmVsLXRva2VuLWtpbmQtb3BlcmF0b3IgeyBjb2xvcjogdmFyKC0tZWwtc3ludGF4LW9wZXJhdG9yKTsgfQoKLmVsLWRpZmYgewogIGRpc3BsYXk6IGlubGluZS1ibG9jazsKICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7CiAgbWF4LXdpZHRoOiAxMDAlOwogIG92ZXJmbG93OiBoaWRkZW47CiAgYm9yZGVyLXJhZGl1czogM3B4OwogIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWVsLWRpZmYtYm9yZGVyKTsKICBiYWNrZ3JvdW5kOiB2YXIoLS1lbC1kaWZmLWJnKTsKICB0cmFuc2l0aW9uOiB3aWR0aCB2YXIoLS1lbC13aWR0aC1tcykgdmFyKC0tZWwtd2lkdGgtZWFzaW5nKTsKfQoKLmVsLWRpZmYtaW5uZXIgewogIGRpc3BsYXk6IGJsb2NrOwogIG92ZXJmbG93OiBoaWRkZW47CiAgcGFkZGluZzogMCAycHg7Cn0KCi5lbC1kaWZmLXRleHQgewogIGRpc3BsYXk6IGdyaWQ7Cn0KCi5lbC1kaWZmLXRleHQgPiBzcGFuIHsKICBncmlkLWFyZWE6IDEgLyAxOwogIG92ZXJmbG93OiBoaWRkZW47CiAgd2hpdGUtc3BhY2U6IG5vd3JhcDsKfQoKLmVsLWZvb3QgewogIG1hcmdpbjogMTJweCAwIDA7CiAgZm9udC1mYW1pbHk6IHVpLW1vbm9zcGFjZSwgbW9ub3NwYWNlOwogIGZvbnQtc2l6ZTogOXB4OwogIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7CiAgbGV0dGVyLXNwYWNpbmc6IDAuMWVtOwogIG9wYWNpdHk6IDAuNTU7Cn0KCi5lbC1zd2lwZS1naG9zdCB7CiAgcG9zaXRpb246IGFic29sdXRlOwogIGluc2V0OiAwOwogIHBvaW50ZXItZXZlbnRzOiBub25lOwogIG9wYWNpdHk6IDA7CiAgYmFja2dyb3VuZDogdmFyKC0tZWwtcGFuZWwtYmcpOwogIHRyYW5zaXRpb246IG9wYWNpdHkgMTIwbXMgZWFzZTsKfQoKLmVsLXN3aXBlLWdob3N0LnZpc2libGUgewogIG9wYWNpdHk6IHZhcigtLWVsLXN3aXBlLW9wYWNpdHksIDAuMzUpOwp9Cg==",import.meta.url).href,u.head.appendChild(t)}const ce=`{
  "$schema": "./lens-block.schema.json5",
  version: 1,
  id: "zig-namespace",
  language: "zig",
  defaultTheme: "earth",
  lenses: [
    {
      id: "didactic",
      label: "Didactic",
      subtitle: "Concept-labeled",
      description: "Names spell out the teaching point. The code narrates itself, but reads unlike production code.",
      lines: [
        [{ text: "const", kind: "keyword" }, { text: " ", kind: "punctuation" }, { text: "Foo", kind: "identifier", slot: "struct_name" }, { text: " = ", kind: "punctuation" }, { text: "struct", kind: "keyword" }, { text: " {", kind: "punctuation" }],
        [{ text: "    ", kind: "punctuation" }, { text: "bad_field", kind: "identifier", slot: "unused_field" }, { text: ": ", kind: "punctuation" }, { text: "@compileError", kind: "builtin" }, { text: "(", kind: "punctuation" }, { text: "\\"i am an evil field, muahaha\\"", kind: "string", slot: "error_msg" }, { text: "),", kind: "punctuation" }],
        [{ text: "    ", kind: "punctuation" }, { text: "const", kind: "keyword" }, { text: " ", kind: "punctuation" }, { text: "something", kind: "identifier", slot: "namespace_member" }, { text: " = ", kind: "punctuation" }, { text: "123", kind: "number" }, { text: ";", kind: "punctuation" }],
        [{ text: "};", kind: "punctuation" }],
        [{ text: "comptime", kind: "keyword" }, { text: " {", kind: "punctuation" }],
        [{ text: "    _ = ", kind: "punctuation" }, { text: "Foo", kind: "identifier", slot: "struct_name" }, { text: ".", kind: "punctuation" }, { text: "something", kind: "identifier", slot: "namespace_member" }, { text: "; ", kind: "punctuation" }, { text: "// \`Foo\` only used as a namespace", kind: "comment", slot: "usage_comment" }],
        [{ text: "}", kind: "punctuation" }],
      ],
    },
    {
      id: "schematic",
      label: "Schematic",
      subtitle: "Abstract placeholders",
      description: "Classic tutorial placeholders. Syntax and structure stay in focus; domain meaning is stripped away.",
      lines: [
        [{ text: "const", kind: "keyword" }, { text: " ", kind: "punctuation" }, { text: "T", kind: "identifier", slot: "struct_name" }, { text: " = ", kind: "punctuation" }, { text: "struct", kind: "keyword" }, { text: " {", kind: "punctuation" }],
        [{ text: "    ", kind: "punctuation" }, { text: "unused", kind: "identifier", slot: "unused_field" }, { text: ": ", kind: "punctuation" }, { text: "@compileError", kind: "builtin" }, { text: "(", kind: "punctuation" }, { text: "\\"never referenced\\"", kind: "string", slot: "error_msg" }, { text: "),", kind: "punctuation" }],
        [{ text: "    ", kind: "punctuation" }, { text: "const", kind: "keyword" }, { text: " ", kind: "punctuation" }, { text: "value", kind: "identifier", slot: "namespace_member" }, { text: " = ", kind: "punctuation" }, { text: "123", kind: "number" }, { text: ";", kind: "punctuation" }],
        [{ text: "};", kind: "punctuation" }],
        [{ text: "comptime", kind: "keyword" }, { text: " {", kind: "punctuation" }],
        [{ text: "    _ = ", kind: "punctuation" }, { text: "T", kind: "identifier", slot: "struct_name" }, { text: ".", kind: "punctuation" }, { text: "value", kind: "identifier", slot: "namespace_member" }, { text: "; ", kind: "punctuation" }, { text: "// type used only as namespace", kind: "comment", slot: "usage_comment" }],
        [{ text: "}", kind: "punctuation" }],
      ],
    },
    {
      id: "contextual",
      label: "Contextual",
      subtitle: "Production-shaped",
      description: "Realistic names from the ecosystem. Transferable to actual codebases; you excavate which tokens carry the lesson.",
      lines: [
        [{ text: "const", kind: "keyword" }, { text: " ", kind: "punctuation" }, { text: "WriterHelpers", kind: "identifier", slot: "struct_name" }, { text: " = ", kind: "punctuation" }, { text: "struct", kind: "keyword" }, { text: " {", kind: "punctuation" }],
        [{ text: "    ", kind: "punctuation" }, { text: "phantom", kind: "identifier", slot: "unused_field" }, { text: ": ", kind: "punctuation" }, { text: "@compileError", kind: "builtin" }, { text: "(", kind: "punctuation" }, { text: "\\"forces analysis if referenced\\"", kind: "string", slot: "error_msg" }, { text: "),", kind: "punctuation" }],
        [{ text: "    ", kind: "punctuation" }, { text: "const", kind: "keyword" }, { text: " ", kind: "punctuation" }, { text: "defaults", kind: "identifier", slot: "namespace_member" }, { text: " = ", kind: "punctuation" }, { text: "123", kind: "number" }, { text: ";", kind: "punctuation" }],
        [{ text: "};", kind: "punctuation" }],
        [{ text: "comptime", kind: "keyword" }, { text: " {", kind: "punctuation" }],
        [{ text: "    _ = ", kind: "punctuation" }, { text: "WriterHelpers", kind: "identifier", slot: "struct_name" }, { text: ".", kind: "punctuation" }, { text: "defaults", kind: "identifier", slot: "namespace_member" }, { text: "; ", kind: "punctuation" }, { text: "// mirrors std.Io.Writer namespace pattern", kind: "comment", slot: "usage_comment" }],
        [{ text: "}", kind: "punctuation" }],
      ],
    },
    {
      id: "role",
      label: "Role-labeled",
      subtitle: "Structural roles",
      description: "Names describe each token's function inside the example — a scaffold between didactic and production code.",
      lines: [
        [{ text: "const", kind: "keyword" }, { text: " ", kind: "punctuation" }, { text: "Container", kind: "identifier", slot: "struct_name" }, { text: " = ", kind: "punctuation" }, { text: "struct", kind: "keyword" }, { text: " {", kind: "punctuation" }],
        [{ text: "    ", kind: "punctuation" }, { text: "unreferenced_field", kind: "identifier", slot: "unused_field" }, { text: ": ", kind: "punctuation" }, { text: "@compileError", kind: "builtin" }, { text: "(", kind: "punctuation" }, { text: "\\"poisons compile if touched\\"", kind: "string", slot: "error_msg" }, { text: "),", kind: "punctuation" }],
        [{ text: "    ", kind: "punctuation" }, { text: "const", kind: "keyword" }, { text: " ", kind: "punctuation" }, { text: "namespace_member", kind: "identifier", slot: "namespace_member" }, { text: " = ", kind: "punctuation" }, { text: "123", kind: "number" }, { text: ";", kind: "punctuation" }],
        [{ text: "};", kind: "punctuation" }],
        [{ text: "comptime", kind: "keyword" }, { text: " {", kind: "punctuation" }],
        [{ text: "    _ = ", kind: "punctuation" }, { text: "Container", kind: "identifier", slot: "struct_name" }, { text: ".", kind: "punctuation" }, { text: "namespace_member", kind: "identifier", slot: "namespace_member" }, { text: "; ", kind: "punctuation" }, { text: "// never instantiated — namespace only", kind: "comment", slot: "usage_comment" }],
        [{ text: "}", kind: "punctuation" }],
      ],
    },
  ],
}
`,le=`// Each theme assigns a distinct panel background per lens type.
// Implementations MUST tint the code panel (or full block body) with lens.panel.
{
  version: 1,
  defaultTheme: "earth",
  themes: {
    tropical: {
      label: "Tropical",
      lenses: {
        didactic: { panel: "#FFF0EB", diff: "#FFD4C4", diffBorder: "#FF9B7A", glass: "rgba(255,155,122,0.18)" },
        schematic: { panel: "#E8FBF8", diff: "#A8EDE4", diffBorder: "#3CB8A8", glass: "rgba(60,184,168,0.18)" },
        contextual: { panel: "#E5F5E0", diff: "#B8E8A8", diffBorder: "#5BA848", glass: "rgba(91,168,72,0.18)" },
        role: { panel: "#FFF8E7", diff: "#FFE4A8", diffBorder: "#E8A830", glass: "rgba(232,168,48,0.18)" },
      },
      chrome: { codeSurface: "#FFFFFF", toolbar: "#F5FAF9", border: "#C8E6E0", text: "#1A2E28" },
    },
    earth: {
      label: "Earth tones",
      lenses: {
        didactic: { panel: "#F3EBE4", diff: "#DCC8B8", diffBorder: "#A67C5B", glass: "rgba(166,124,91,0.15)" },
        schematic: { panel: "#EBF0E8", diff: "#C5D8BC", diffBorder: "#6B8F5E", glass: "rgba(107,143,94,0.15)" },
        contextual: { panel: "#E8EEF0", diff: "#B8CCD8", diffBorder: "#5B7A8F", glass: "rgba(91,122,143,0.15)" },
        role: { panel: "#EDE8E4", diff: "#D4C8BC", diffBorder: "#8F735B", glass: "rgba(143,115,91,0.15)" },
      },
      chrome: { codeSurface: "#FAFAF8", toolbar: "#F0EFEC", border: "#D4D0C8", text: "#2C2824" },
    },
    earthenware: {
      label: "Earthenware",
      lenses: {
        didactic: { panel: "#F5EAE3", diff: "#E0C4B0", diffBorder: "#B8734A", glass: "rgba(184,115,74,0.16)" },
        schematic: { panel: "#EAE8E0", diff: "#CFCAB8", diffBorder: "#8A8470", glass: "rgba(138,132,112,0.16)" },
        contextual: { panel: "#E6EBF0", diff: "#B8C8DC", diffBorder: "#4A6A8F", glass: "rgba(74,106,143,0.16)" },
        role: { panel: "#F0EBE0", diff: "#DCCFB0", diffBorder: "#A89050", glass: "rgba(168,144,80,0.16)" },
      },
      chrome: { codeSurface: "#FDFBF7", toolbar: "#F2EFE8", border: "#D8D0C0", text: "#3A3428" },
    },
    patina: {
      label: "Patina",
      lenses: {
        didactic: { panel: "#E4F0EE", diff: "#A8D8D0", diffBorder: "#3A9088", glass: "rgba(58,144,136,0.18)" },
        schematic: { panel: "#F0EBE4", diff: "#D4C4A8", diffBorder: "#8F7350", glass: "rgba(143,115,80,0.16)" },
        contextual: { panel: "#F0E8E4", diff: "#D8B8A8", diffBorder: "#8F5B4A", glass: "rgba(143,91,74,0.16)" },
        role: { panel: "#E8EDE8", diff: "#B8C8B8", diffBorder: "#5A7058", glass: "rgba(90,112,88,0.16)" },
      },
      chrome: { codeSurface: "#F8FAF9", toolbar: "#EEF2F0", border: "#B8C8C4", text: "#1E2826" },
    },
    fruits: {
      label: "Fruits",
      lenses: {
        didactic: { panel: "#FCE8EE", diff: "#F0A8C0", diffBorder: "#C84878", glass: "rgba(200,72,120,0.16)" },
        schematic: { panel: "#ECE8F5", diff: "#B8A8E0", diffBorder: "#6848A8", glass: "rgba(104,72,168,0.16)" },
        contextual: { panel: "#E8F5E8", diff: "#98D898", diffBorder: "#38A838", glass: "rgba(56,168,56,0.16)" },
        role: { panel: "#F5F3E8", diff: "#E8DC98", diffBorder: "#C8A830", glass: "rgba(200,168,48,0.16)" },
      },
      chrome: { codeSurface: "#FFFFFF", toolbar: "#F8F6FA", border: "#D8D0E0", text: "#28242E" },
    },
    desert: {
      label: "Desert",
      lenses: {
        didactic: { panel: "#F5EDE3", diff: "#E0C8A0", diffBorder: "#B89050", glass: "rgba(184,144,80,0.16)" },
        schematic: { panel: "#E8EDF2", diff: "#A8B8D0", diffBorder: "#5070A0", glass: "rgba(80,112,160,0.16)" },
        contextual: { panel: "#E5F0E5", diff: "#98C898", diffBorder: "#488848", glass: "rgba(72,136,72,0.16)" },
        role: { panel: "#F0E8E0", diff: "#D8C0A0", diffBorder: "#A07848", glass: "rgba(160,120,72,0.16)" },
      },
      chrome: { codeSurface: "#FDFAF5", toolbar: "#F0EBE4", border: "#D0C4B4", text: "#3A3228" },
    },
  },
  syntax: {
    keyword: "#6B4FA0",
    type: "#2878A8",
    identifier: "#2C2824",
    string: "#2A8848",
    comment: "#787068",
    punctuation: "#504C48",
    number: "#A87020",
    builtin: "#B84858",
    macro: "#B84858",
    operator: "#504C48",
  },
}
`,de=`// Transferable UI behavior — load into any implementation.
{
  version: 1,
  interaction: {
    desktop: {
      preview: "hover", // lens tabs: preview on pointer enter
      commit: "click", // click tab to lock selection
      keyboard: true, // arrow keys cycle lenses when toolbar focused
    },
    touch: {
      preview: "swipe", // horizontal drag on code panel (before/after reveal style)
      commit: "tap", // tap tab to lock
      swipeThresholdPx: 48,
      swipeRevealOpacity: 0.35, // ghost of adjacent lens during drag
    },
  },
  animation: {
    widthMs: 420,
    widthEasing: "cubic-bezier(0.16, 1, 0.3, 1)", // log-like ease-out
    fadeMs: 220,
    fadeDelayMs: 60,
    glassSlideMs: 320,
    panelCrossfadeMs: 200,
    diffTokenPaddingPx: 4,
    diffTokenRadiusPx: 3,
  },
  layout: {
    tabMinHeightPx: 28,
    codeFontFamily: '"Space Mono", "SF Mono", "Fira Code", monospace',
    codeFontSizePx: 13,
    glassBlurPx: 12,
  },
}
`,Ce=`# AI / LLM Reproduction Spec — LensCodeBlock

Use this document to implement **LensCodeBlock** in any UI framework or toolkit. Follow normative MUST/SHOULD language.

## Product definition

Build a component that renders **one aligned multi-line code example** in **four pedagogical lenses**:

1. **didactic** — names are the lesson (\`bad_field\`)
2. **schematic** — abstract placeholders (\`T\`, \`value\`)
3. **contextual** — production-shaped names (\`WriterHelpers\`)
4. **role** — structural roles (\`namespace_member\`)

Syntax tokens are identical across lenses. Only slotted tokens (identifiers, strings, comments with a shared \`slot\` key) differ.

## Data loading

Load three JSON5 files from the repository \`spec/\` directory:

- Example document (e.g. \`spec/examples/zig-namespace.json5\`)
- \`spec/themes.json5\`
- \`spec/ui.json5\`

Parse with JSON5. Validate: equal line counts, equal token counts per line, \`version: 1\`.

Compute variable slots: any \`slot\` whose \`text\` differs across lenses.

## Visual structure

\`\`\`
┌─ toolbar ─────────────────────────────────────┐
│ [glass pill]  Lens  [Didactic][Schematic]…  zig │
├─ body (background = theme.lenses[active].panel) ─┤
│ subtitle + description                          │
│ ┌─ code surface (chrome.codeSurface) ─────────┐ │
│ │ syntax-highlighted lines                    │ │
│ │ slotted tokens in rounded diff boxes        │ │
│ └─────────────────────────────────────────────┘ │
│ footnote hint                                   │
└─────────────────────────────────────────────────┘
\`\`\`

## Theme rules

- When lens \`L\` is active, set panel background to \`themes[themeId].lenses[L].panel\`.
- Each of the four lenses MUST use a **different** panel color within a theme.
- Diff boxes use \`diff\` background + \`diffBorder\` border for the active lens.
- Expose six themes: tropical, earth, earthenware, patina, fruits, desert.

## Interaction

### Desktop (pointer fine)

- \`mouseenter\` / \`focus\` on tab → preview lens (update code + panel color + meta).
- \`mouseleave\` toolbar → revert preview to committed lens.
- \`click\` tab → commit lens.
- Animate a **glassmorphism pill** behind tabs: \`backdrop-filter: blur(12px)\`, semi-transparent white/tint, slides with \`cubic-bezier(0.16, 1, 0.3, 1)\` over ~320ms.

### Mobile (pointer coarse)

- Horizontal swipe on code area cycles lenses with before/after reveal feel.
- Show ghost overlay at ~35% opacity during drag.
- On \`touchend\`, commit current preview lens.
- Show hint text: "Swipe code to preview lenses".

## Diff token animation (required)

For each slotted token when text changes:

1. Measure old and new glyph width in monospace at 13px.
2. Outer shell: \`display: inline-block; overflow: hidden; border-radius: 3px; border; background\`.
3. Animate shell **width** from old→new over 420ms with ease-out curve \`cubic-bezier(0.16, 1, 0.3, 1)\`.
4. Inner clip: \`overflow: hidden; padding: 0 2px\`.
5. Cross-fade text: outgoing span opacity 1→0 (220ms), incoming 0→1 (220ms, 60ms delay).
6. Stack outgoing/incoming in CSS grid same cell so width animation doesn't spill glyphs.

Non-slotted tokens: swap text instantly, syntax color by \`kind\`.

## Syntax colors

Map token \`kind\` to theme \`syntax.{kind}\` hex values.

Kinds: keyword, type, identifier, string, comment, punctuation, number, builtin, macro, operator.

## API surface (web reference)

\`\`\`js
// Vanilla
import { createLensCodeBlock, registerLensCodeBlock } from "@examplens/vanilla";
registerLensCodeBlock();
const el = createLensCodeBlock({ document, themes, ui }, "earth");
host.appendChild(el);
el.setAttribute("theme", "tropical"); // runtime theme switch
\`\`\`

Other frameworks: wrap the same state machine — \`committedLensIndex\`, \`previewLensIndex\`, \`themeId\`, morph map keyed by \`line:token\`.

## State machine

\`\`\`
displayIndex = previewIndex ?? committedIndex
onTabHover(i): previewIndex = i
onToolbarLeave(): previewIndex = null
onTabClick(i): committedIndex = i; previewIndex = null
onSwipe(delta): if |delta| > threshold, previewIndex ± 1
onTouchEnd(): committedIndex = displayIndex; previewIndex = null
\`\`\`

## Accessibility

- \`role="tablist"\` / \`role="tab"\` / \`aria-selected\`
- Support keyboard tab focus on lens buttons
- Respect \`prefers-reduced-motion\`: set width transition to 0ms and skip cross-fade

## Reference implementation

- \`@examplens/core\` — parsing and themes
- \`@examplens/vanilla\` — \`<lens-code-block>\` custom element
- Live demo: GitHub Pages site in \`/demo\`

## Acceptance checklist

- [ ] Four lenses switch with aligned tokens
- [ ] Variable slots highlighted
- [ ] Panel background changes per lens
- [ ] Six themes selectable
- [ ] Hover preview + click commit on desktop
- [ ] Swipe on touch
- [ ] Glass pill tracks active/hovered tab
- [ ] Diff tokens animate width + cross-fade with clipping
- [ ] Loads JSON5 spec without hardcoding example text
`;oe();Xu();const tu=ue(le),Fe=ee(de),Ae=qu(ce),Ee=document.getElementById("demo-host"),wu=document.getElementById("theme-select"),Hu=ae({document:Ae,themes:tu,ui:Fe,themeId:tu.defaultTheme},tu.defaultTheme);Ee.appendChild(Hu);for(const u of re(tu)){const t=document.createElement("option");t.value=u,t.textContent=tu.themes[u].label,u===tu.defaultTheme&&(t.selected=!0),wu.appendChild(t)}wu.addEventListener("change",()=>{Hu.setAttribute("theme",wu.value)});const pe=[{platform:"Web",name:"Vanilla JS (web component)",pkg:"@examplens/vanilla",status:"shipped"},{platform:"Web",name:"SolidJS",pkg:"@examplens/solid",status:"wip"},{platform:"Web",name:"React",pkg:"@examplens/react",status:"planned"},{platform:"Web",name:"Vue",pkg:"@examplens/vue",status:"planned"},{platform:"Web",name:"Svelte",pkg:"@examplens/svelte",status:"planned"},{platform:"Web",name:"Angular",pkg:"@examplens/angular",status:"planned"},{platform:"Web",name:"Preact",pkg:"@examplens/preact",status:"planned"},{platform:"Web",name:"Lit",pkg:"@examplens/lit",status:"planned"},{platform:"Desktop",name:"Tauri + webview",pkg:"examples/tauri",status:"planned"},{platform:"Desktop",name:"Electron",pkg:"examples/electron",status:"planned"},{platform:"Desktop",name:"Qt (QML)",pkg:"implementations/qt",status:"planned"},{platform:"Desktop",name:"GTK 4",pkg:"implementations/gtk",status:"planned"},{platform:"Mobile",name:"React Native",pkg:"@examplens/react-native",status:"planned"},{platform:"Mobile",name:"SwiftUI",pkg:"implementations/swiftui",status:"planned"},{platform:"Mobile",name:"Jetpack Compose",pkg:"implementations/compose",status:"planned"},{platform:"Mobile",name:"Flutter",pkg:"@examplens/flutter",status:"planned"}],me=document.getElementById("impl-table"),Au=document.createElement("table");Au.className="impl-table";Au.innerHTML="<thead><tr><th>Platform</th><th>Implementation</th><th>Package</th><th>Status</th></tr></thead>";const Mu=document.createElement("tbody");for(const u of pe){const t=document.createElement("tr");t.innerHTML=`<td>${u.platform}</td><td>${u.name}</td><td><code>${u.pkg}</code></td><td class="status-${u.status}">${u.status}</td>`,Mu.appendChild(t)}Au.appendChild(Mu);me.appendChild(Au);const Wu=document.getElementById("ai-preview");Wu&&(Wu.textContent=Ce.slice(0,1200)+`

…`);
