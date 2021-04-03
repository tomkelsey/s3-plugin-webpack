!function(i,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("progress"),require("cdnizer"),require("lodash"),require("aws-sdk"),require("recursive-readdir")):"function"==typeof define&&define.amd?define(["progress","cdnizer","lodash","aws-sdk","recursive-readdir"],t):"object"==typeof exports?exports["webpack-s3-plugin"]=t(require("progress"),require("cdnizer"),require("lodash"),require("aws-sdk"),require("recursive-readdir")):i["webpack-s3-plugin"]=t(i.progress,i.cdnizer,i.lodash,i["aws-sdk"],i["recursive-readdir"])}(global,(function(i,t,e,a,s){return(()=>{var o={297:(i,t,e)=>{"use strict";e.r(t),e.d(t,{default:()=>S});const a=require("http");var s=e.n(a);const o=require("https");var p=e.n(o);const n=require("fs");var l=e.n(n);const r=require("path");var c=e.n(r),m=e(7),d=e.n(m),x=e(750),u=e.n(x),h=e(804),g=e.n(h),f=e(109),v=e.n(f),b=e(480);const j=JSON.parse('{"u2":"webpack-s3-plugin"}');var y=e(632),w=e.n(y);const k=[".DS_Store"],P={ACL:"public-read"},z=["Bucket"],q=c().sep,O=i=>Promise.resolve(i),F=i=>i?i.replace(/\/?(\?|#|$)/,"/$1"):i,I=(i,t)=>{if(g().isRegExp(i))return i.test(t);if(g().isFunction(i))return!!i(t);if(g().isArray(i))return g().every(i,(i=>I(i,t)));if(g().isString(i))return new RegExp(i).test(t);throw new Error("Invalid include / exclude rule")};s().globalAgent.maxSockets=p().globalAgent.maxSockets=50;const C=(i,t)=>{i.errors.push(new Error(t))};class S{constructor(i={}){var{include:t,exclude:e,progress:a,basePath:s,directory:o,htmlFiles:p,basePathTransform:n=O,transformFileName:l=(i=>i),s3Options:r={},cdnizerOptions:c={},s3UploadOptions:m={},cloudfrontInvalidateOptions:d={},priority:x}=i;this.uploadOptions=m,this.cloudfrontInvalidateOptions=d,this.isConnected=!1,this.cdnizerOptions=c,this.urlMappings=[],this.uploadTotal=0,this.uploadProgress=0,this.basePathTransform=n,this.transformFileName=l,s=s?F(s):"",this.options={directory:o,include:t,exclude:e,basePath:s,priority:x,htmlFiles:"string"==typeof p?[p]:p,progress:!g().isBoolean(a)||a},this.clientConfig={s3Options:r,maxAsyncS3:50},this.noCdnizer=!Object.keys(this.cdnizerOptions).length,this.noCdnizer||this.cdnizerOptions.files||(this.cdnizerOptions.files=[])}apply(i){this.connect();const t=!!this.options.directory,e=g().every(z,(i=>this.uploadOptions[i]));this.options.directory=this.options.directory||i.options.output.path||i.options.output.context||".",i.hooks.done.tapPromise(j.u2,(async({compilation:i})=>{let a;if(e||(a="S3Plugin-RequiredS3UploadOpts: "+z.join(", ")),a)return C(i,a);if(t){const t=(s=this.options.directory)?g().endsWith(s,q)?s:s+q:s;return this.getAllFilesRecursive(t).then((i=>this.handleFiles(i))).catch((t=>this.handleErrors(t,i)))}return this.getAssetFiles(i).then((i=>this.handleFiles(i))).catch((t=>this.handleErrors(t,i)));var s}))}handleFiles(i){return this.changeUrls(i).then((i=>this.filterAllowedFiles(i))).then((i=>this.uploadFiles(i))).then((()=>this.invalidateCloudfront()))}async handleErrors(i,t){throw C(t,"S3Plugin: "+i),i}getAllFilesRecursive(i){return((i,t=[])=>{return new Promise(((e,a)=>{w()(i,t,((i,t)=>i?a(i):e(t)))})).then((e=i,i=>g().map(i,(i=>({path:i,name:i.replace(e,"").split(q).join("/")})))));var e})(i)}addPathToFiles(i,t){return i.map((i=>({name:i,path:c().resolve(t,i)})))}getFileName(i=""){return g().includes(i,q)?i.substring(g().lastIndexOf(i,q)+1):i}getAssetFiles({assets:i,outputOptions:t}){const e=g().map(i,((i,e)=>({name:e,path:`${t.path}/${e}`})));return Promise.resolve(e)}cdnizeHtml(i){return new Promise(((t,e)=>{l().readFile(i.path,((a,s)=>{if(a)return e(a);l().writeFile(i.path,this.cdnizer(s.toString()),(a=>{if(a)return e(a);t(i)}))}))}))}changeUrls(i=[]){if(this.noCdnizer)return Promise.resolve(i);var t;const{directory:e,htmlFiles:a=[]}=this.options;t=a.length?this.addPathToFiles(a,e).concat(i):i,this.cdnizerOptions.files=t.map((({name:i})=>`{/,}*${i}*`)),this.cdnizer=u()(this.cdnizerOptions);const[s,o]=g()(t).uniq("name").partition((i=>/\.(html|css)/.test(i.name))).value();return Promise.all(s.map((i=>this.cdnizeHtml(i))).concat(o))}filterAllowedFiles(i){return i.reduce(((i,t)=>(this.isIncludeAndNotExclude(t.name)&&!this.isIgnoredFile(t.name)&&i.push(t),i)),[])}isIgnoredFile(i){return g().some(k,(t=>new RegExp(t).test(i)))}isIncludeAndNotExclude(i){var t,e,{include:a,exclude:s}=this.options;return e=!a||I(a,i),t=!!s&&I(s,i),e&&!t}connect(){this.isConnected||(this.client=new b.S3(this.clientConfig.s3Options),this.isConnected=!0)}transformBasePath(){return Promise.resolve(this.basePathTransform(this.options.basePath)).then(F).then((i=>this.options.basePath=i))}setupProgressBar(i){const t=i.reduce(((i,{upload:t})=>t.totalBytes+i),0),e=new(d())("Uploading [:bar] :percent :etas",{complete:">",incomplete:"∆",total:t});var a=0;i.forEach((({upload:i})=>{i.on("httpUploadProgress",(({loaded:i})=>{a+=i,e.update(a)}))}))}prioritizeFiles(i){const t=[...i],e=this.options.priority.map((i=>g().remove(t,(t=>i.test(t.name)))));return[t,...e]}uploadPriorityChunk(i){const t=i.map((i=>this.uploadFile(i.name,i.path)));return Promise.all(t.map((({promise:i})=>i)))}uploadInPriorityOrder(i){return this.prioritizeFiles(i).map((i=>()=>this.uploadPriorityChunk(i))).reduce(((i,t)=>i.then(t)),Promise.resolve())}uploadFiles(i=[]){return this.transformBasePath().then((()=>{if(this.options.priority)return this.uploadInPriorityOrder(i);{const t=i.map((i=>this.uploadFile(i.name,i.path)));return this.options.progress&&this.setupProgressBar(t),Promise.all(t.map((({promise:i})=>i)))}}))}uploadFile(i,t){let e=this.options.basePath+this.transformFileName(i);const a=g().mapValues(this.uploadOptions,(e=>g().isFunction(e)?e(i,t):e));"/"===e[0]&&(e=e.substr(1)),void 0===a.ContentType&&(a.ContentType=v().getType(i));const s=l().createReadStream(t),o=this.client.upload(g().merge({Key:e,Body:s},P,a));return this.noCdnizer||this.cdnizerOptions.files.push(`*${i}*`),{upload:o,promise:o.promise()}}invalidateCloudfront(){const{clientConfig:i,cloudfrontInvalidateOptions:t}=this;if(t.DistributionId){const{accessKeyId:e,secretAccessKey:a,sessionToken:s}=i.s3Options,o=new b.CloudFront({accessKeyId:e,secretAccessKey:a,sessionToken:s});g().isArray(t.DistributionId)||(t.DistributionId=[t.DistributionId]);const p=t.DistributionId.map((i=>new Promise(((e,a)=>{o.createInvalidation({DistributionId:i,InvalidationBatch:{CallerReference:Date.now().toString(),Paths:{Quantity:t.Items.length,Items:t.Items}}},((i,t)=>{i?a(i):e(t.Id)}))}))));return Promise.all(p)}return Promise.resolve(null)}}},146:i=>{"use strict";function t(){this._types=Object.create(null),this._extensions=Object.create(null);for(var i=0;i<arguments.length;i++)this.define(arguments[i]);this.define=this.define.bind(this),this.getType=this.getType.bind(this),this.getExtension=this.getExtension.bind(this)}t.prototype.define=function(i,t){for(var e in i){var a=i[e].map((function(i){return i.toLowerCase()}));e=e.toLowerCase();for(var s=0;s<a.length;s++)if("*"!=(o=a[s])[0]){if(!t&&o in this._types)throw new Error('Attempt to change mapping for "'+o+'" extension from "'+this._types[o]+'" to "'+e+'". Pass `force=true` to allow this, otherwise remove "'+o+'" from the list of extensions for "'+e+'".');this._types[o]=e}if(t||!this._extensions[e]){var o=a[0];this._extensions[e]="*"!=o[0]?o:o.substr(1)}}},t.prototype.getType=function(i){var t=(i=String(i)).replace(/^.*[/\\]/,"").toLowerCase(),e=t.replace(/^.*\./,"").toLowerCase(),a=t.length<i.length;return(e.length<t.length-1||!a)&&this._types[e]||null},t.prototype.getExtension=function(i){return(i=/^\s*([^;\s]*)/.test(i)&&RegExp.$1)&&this._extensions[i.toLowerCase()]||null},i.exports=t},109:(i,t,e)=>{"use strict";var a=e(146);i.exports=new a(e(415))},415:i=>{i.exports={"application/andrew-inset":["ez"],"application/applixware":["aw"],"application/atom+xml":["atom"],"application/atomcat+xml":["atomcat"],"application/atomdeleted+xml":["atomdeleted"],"application/atomsvc+xml":["atomsvc"],"application/atsc-dwd+xml":["dwd"],"application/atsc-held+xml":["held"],"application/atsc-rsat+xml":["rsat"],"application/bdoc":["bdoc"],"application/calendar+xml":["xcs"],"application/ccxml+xml":["ccxml"],"application/cdfx+xml":["cdfx"],"application/cdmi-capability":["cdmia"],"application/cdmi-container":["cdmic"],"application/cdmi-domain":["cdmid"],"application/cdmi-object":["cdmio"],"application/cdmi-queue":["cdmiq"],"application/cu-seeme":["cu"],"application/dash+xml":["mpd"],"application/davmount+xml":["davmount"],"application/docbook+xml":["dbk"],"application/dssc+der":["dssc"],"application/dssc+xml":["xdssc"],"application/ecmascript":["ecma","es"],"application/emma+xml":["emma"],"application/emotionml+xml":["emotionml"],"application/epub+zip":["epub"],"application/exi":["exi"],"application/fdt+xml":["fdt"],"application/font-tdpfr":["pfr"],"application/geo+json":["geojson"],"application/gml+xml":["gml"],"application/gpx+xml":["gpx"],"application/gxf":["gxf"],"application/gzip":["gz"],"application/hjson":["hjson"],"application/hyperstudio":["stk"],"application/inkml+xml":["ink","inkml"],"application/ipfix":["ipfix"],"application/its+xml":["its"],"application/java-archive":["jar","war","ear"],"application/java-serialized-object":["ser"],"application/java-vm":["class"],"application/javascript":["js","mjs"],"application/json":["json","map"],"application/json5":["json5"],"application/jsonml+json":["jsonml"],"application/ld+json":["jsonld"],"application/lgr+xml":["lgr"],"application/lost+xml":["lostxml"],"application/mac-binhex40":["hqx"],"application/mac-compactpro":["cpt"],"application/mads+xml":["mads"],"application/manifest+json":["webmanifest"],"application/marc":["mrc"],"application/marcxml+xml":["mrcx"],"application/mathematica":["ma","nb","mb"],"application/mathml+xml":["mathml"],"application/mbox":["mbox"],"application/mediaservercontrol+xml":["mscml"],"application/metalink+xml":["metalink"],"application/metalink4+xml":["meta4"],"application/mets+xml":["mets"],"application/mmt-aei+xml":["maei"],"application/mmt-usd+xml":["musd"],"application/mods+xml":["mods"],"application/mp21":["m21","mp21"],"application/mp4":["mp4s","m4p"],"application/mrb-consumer+xml":["*xdf"],"application/mrb-publish+xml":["*xdf"],"application/msword":["doc","dot"],"application/mxf":["mxf"],"application/n-quads":["nq"],"application/n-triples":["nt"],"application/node":["cjs"],"application/octet-stream":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"],"application/oda":["oda"],"application/oebps-package+xml":["opf"],"application/ogg":["ogx"],"application/omdoc+xml":["omdoc"],"application/onenote":["onetoc","onetoc2","onetmp","onepkg"],"application/oxps":["oxps"],"application/p2p-overlay+xml":["relo"],"application/patch-ops-error+xml":["*xer"],"application/pdf":["pdf"],"application/pgp-encrypted":["pgp"],"application/pgp-signature":["asc","sig"],"application/pics-rules":["prf"],"application/pkcs10":["p10"],"application/pkcs7-mime":["p7m","p7c"],"application/pkcs7-signature":["p7s"],"application/pkcs8":["p8"],"application/pkix-attr-cert":["ac"],"application/pkix-cert":["cer"],"application/pkix-crl":["crl"],"application/pkix-pkipath":["pkipath"],"application/pkixcmp":["pki"],"application/pls+xml":["pls"],"application/postscript":["ai","eps","ps"],"application/provenance+xml":["provx"],"application/pskc+xml":["pskcxml"],"application/raml+yaml":["raml"],"application/rdf+xml":["rdf","owl"],"application/reginfo+xml":["rif"],"application/relax-ng-compact-syntax":["rnc"],"application/resource-lists+xml":["rl"],"application/resource-lists-diff+xml":["rld"],"application/rls-services+xml":["rs"],"application/route-apd+xml":["rapd"],"application/route-s-tsid+xml":["sls"],"application/route-usd+xml":["rusd"],"application/rpki-ghostbusters":["gbr"],"application/rpki-manifest":["mft"],"application/rpki-roa":["roa"],"application/rsd+xml":["rsd"],"application/rss+xml":["rss"],"application/rtf":["rtf"],"application/sbml+xml":["sbml"],"application/scvp-cv-request":["scq"],"application/scvp-cv-response":["scs"],"application/scvp-vp-request":["spq"],"application/scvp-vp-response":["spp"],"application/sdp":["sdp"],"application/senml+xml":["senmlx"],"application/sensml+xml":["sensmlx"],"application/set-payment-initiation":["setpay"],"application/set-registration-initiation":["setreg"],"application/shf+xml":["shf"],"application/sieve":["siv","sieve"],"application/smil+xml":["smi","smil"],"application/sparql-query":["rq"],"application/sparql-results+xml":["srx"],"application/srgs":["gram"],"application/srgs+xml":["grxml"],"application/sru+xml":["sru"],"application/ssdl+xml":["ssdl"],"application/ssml+xml":["ssml"],"application/swid+xml":["swidtag"],"application/tei+xml":["tei","teicorpus"],"application/thraud+xml":["tfi"],"application/timestamped-data":["tsd"],"application/toml":["toml"],"application/ttml+xml":["ttml"],"application/urc-ressheet+xml":["rsheet"],"application/voicexml+xml":["vxml"],"application/wasm":["wasm"],"application/widget":["wgt"],"application/winhlp":["hlp"],"application/wsdl+xml":["wsdl"],"application/wspolicy+xml":["wspolicy"],"application/xaml+xml":["xaml"],"application/xcap-att+xml":["xav"],"application/xcap-caps+xml":["xca"],"application/xcap-diff+xml":["xdf"],"application/xcap-el+xml":["xel"],"application/xcap-error+xml":["xer"],"application/xcap-ns+xml":["xns"],"application/xenc+xml":["xenc"],"application/xhtml+xml":["xhtml","xht"],"application/xliff+xml":["xlf"],"application/xml":["xml","xsl","xsd","rng"],"application/xml-dtd":["dtd"],"application/xop+xml":["xop"],"application/xproc+xml":["xpl"],"application/xslt+xml":["xslt"],"application/xspf+xml":["xspf"],"application/xv+xml":["mxml","xhvml","xvml","xvm"],"application/yang":["yang"],"application/yin+xml":["yin"],"application/zip":["zip"],"audio/3gpp":["*3gpp"],"audio/adpcm":["adp"],"audio/basic":["au","snd"],"audio/midi":["mid","midi","kar","rmi"],"audio/mobile-xmf":["mxmf"],"audio/mp3":["*mp3"],"audio/mp4":["m4a","mp4a"],"audio/mpeg":["mpga","mp2","mp2a","mp3","m2a","m3a"],"audio/ogg":["oga","ogg","spx"],"audio/s3m":["s3m"],"audio/silk":["sil"],"audio/wav":["wav"],"audio/wave":["*wav"],"audio/webm":["weba"],"audio/xm":["xm"],"font/collection":["ttc"],"font/otf":["otf"],"font/ttf":["ttf"],"font/woff":["woff"],"font/woff2":["woff2"],"image/aces":["exr"],"image/apng":["apng"],"image/bmp":["bmp"],"image/cgm":["cgm"],"image/dicom-rle":["drle"],"image/emf":["emf"],"image/fits":["fits"],"image/g3fax":["g3"],"image/gif":["gif"],"image/heic":["heic"],"image/heic-sequence":["heics"],"image/heif":["heif"],"image/heif-sequence":["heifs"],"image/hej2k":["hej2"],"image/hsj2":["hsj2"],"image/ief":["ief"],"image/jls":["jls"],"image/jp2":["jp2","jpg2"],"image/jpeg":["jpeg","jpg","jpe"],"image/jph":["jph"],"image/jphc":["jhc"],"image/jpm":["jpm"],"image/jpx":["jpx","jpf"],"image/jxr":["jxr"],"image/jxra":["jxra"],"image/jxrs":["jxrs"],"image/jxs":["jxs"],"image/jxsc":["jxsc"],"image/jxsi":["jxsi"],"image/jxss":["jxss"],"image/ktx":["ktx"],"image/png":["png"],"image/sgi":["sgi"],"image/svg+xml":["svg","svgz"],"image/t38":["t38"],"image/tiff":["tif","tiff"],"image/tiff-fx":["tfx"],"image/webp":["webp"],"image/wmf":["wmf"],"message/disposition-notification":["disposition-notification"],"message/global":["u8msg"],"message/global-delivery-status":["u8dsn"],"message/global-disposition-notification":["u8mdn"],"message/global-headers":["u8hdr"],"message/rfc822":["eml","mime"],"model/3mf":["3mf"],"model/gltf+json":["gltf"],"model/gltf-binary":["glb"],"model/iges":["igs","iges"],"model/mesh":["msh","mesh","silo"],"model/mtl":["mtl"],"model/obj":["obj"],"model/stl":["stl"],"model/vrml":["wrl","vrml"],"model/x3d+binary":["*x3db","x3dbz"],"model/x3d+fastinfoset":["x3db"],"model/x3d+vrml":["*x3dv","x3dvz"],"model/x3d+xml":["x3d","x3dz"],"model/x3d-vrml":["x3dv"],"text/cache-manifest":["appcache","manifest"],"text/calendar":["ics","ifb"],"text/coffeescript":["coffee","litcoffee"],"text/css":["css"],"text/csv":["csv"],"text/html":["html","htm","shtml"],"text/jade":["jade"],"text/jsx":["jsx"],"text/less":["less"],"text/markdown":["markdown","md"],"text/mathml":["mml"],"text/mdx":["mdx"],"text/n3":["n3"],"text/plain":["txt","text","conf","def","list","log","in","ini"],"text/richtext":["rtx"],"text/rtf":["*rtf"],"text/sgml":["sgml","sgm"],"text/shex":["shex"],"text/slim":["slim","slm"],"text/stylus":["stylus","styl"],"text/tab-separated-values":["tsv"],"text/troff":["t","tr","roff","man","me","ms"],"text/turtle":["ttl"],"text/uri-list":["uri","uris","urls"],"text/vcard":["vcard"],"text/vtt":["vtt"],"text/xml":["*xml"],"text/yaml":["yaml","yml"],"video/3gpp":["3gp","3gpp"],"video/3gpp2":["3g2"],"video/h261":["h261"],"video/h263":["h263"],"video/h264":["h264"],"video/jpeg":["jpgv"],"video/jpm":["*jpm","jpgm"],"video/mj2":["mj2","mjp2"],"video/mp2t":["ts"],"video/mp4":["mp4","mp4v","mpg4"],"video/mpeg":["mpeg","mpg","mpe","m1v","m2v"],"video/ogg":["ogv"],"video/quicktime":["qt","mov"],"video/webm":["webm"]}},480:i=>{"use strict";i.exports=a},750:i=>{"use strict";i.exports=t},804:i=>{"use strict";i.exports=e},7:t=>{"use strict";t.exports=i},632:i=>{"use strict";i.exports=s}},p={};function n(i){if(p[i])return p[i].exports;var t=p[i]={exports:{}};return o[i](t,t.exports,n),t.exports}return n.n=i=>{var t=i&&i.__esModule?()=>i.default:()=>i;return n.d(t,{a:t}),t},n.d=(i,t)=>{for(var e in t)n.o(t,e)&&!n.o(i,e)&&Object.defineProperty(i,e,{enumerable:!0,get:t[e]})},n.o=(i,t)=>Object.prototype.hasOwnProperty.call(i,t),n.r=i=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(i,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(i,"__esModule",{value:!0})},n(297)})()}));