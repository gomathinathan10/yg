globalThis.__nitro_main__ = import.meta.url;
import { i as serve, r as NodeResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
import { i as toEventHandler, n as defineHandler, o as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { i as withoutTrailingSlash, n as joinURL, r as withLeadingSlash, t as decodePath } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.png": {
		"type": "image/png",
		"etag": "\"61bb-YRgf3sjok5YXHMpUlQEAIyY8Ep0\"",
		"mtime": "2026-09-09T05:25:30.832Z",
		"size": 25019,
		"path": "../public/favicon.png"
	},
	"/heritage-mindmap.jpg": {
		"type": "image/jpeg",
		"etag": "\"47ec9-3IuRFfG8XiA9zFHxUpNKjw3L9ps\"",
		"mtime": "2026-09-13T10:22:51.549Z",
		"size": 294601,
		"path": "../public/heritage-mindmap.jpg"
	},
	"/logo-original.png": {
		"type": "image/png",
		"etag": "\"61bb-YRgf3sjok5YXHMpUlQEAIyY8Ep0\"",
		"mtime": "2026-09-09T05:25:31.025Z",
		"size": 25019,
		"path": "../public/logo-original.png"
	},
	"/logo-square-prominent.png": {
		"type": "image/png",
		"etag": "\"18a10-fMHGh2fJZtKcpY9w+G6E42eLong\"",
		"mtime": "2026-09-11T07:13:15.128Z",
		"size": 100880,
		"path": "../public/logo-square-prominent.png"
	},
	"/logo-tight.png": {
		"type": "image/png",
		"etag": "\"956d-4h6xV/hvgJu/bZlpXjVsUDhvR9A\"",
		"mtime": "2026-09-11T07:12:30.735Z",
		"size": 38253,
		"path": "../public/logo-tight.png"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"70-O+XYCW1bRlmrWRUd9wLauNYfOcE\"",
		"mtime": "2026-09-09T05:25:31.551Z",
		"size": 112,
		"path": "../public/robots.txt"
	},
	"/assets/accordion-Cz2ML51M.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c1e-ssEKbO7reyVGl8H24YeaXQQI1jc\"",
		"mtime": "2026-09-13T10:28:06.436Z",
		"size": 7198,
		"path": "../public/assets/accordion-Cz2ML51M.js"
	},
	"/assets/account-Bq3emgUJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2271-NXc3UUuO0K8XDCn6cJUVdSP4J5c\"",
		"mtime": "2026-09-13T10:28:06.436Z",
		"size": 8817,
		"path": "../public/assets/account-Bq3emgUJ.js"
	},
	"/sitemap.xml": {
		"type": "application/xml",
		"etag": "\"1243-q0VD+oLW2IpXRQL8qDpWvx2i6e4\"",
		"mtime": "2026-09-09T05:25:31.552Z",
		"size": 4675,
		"path": "../public/sitemap.xml"
	},
	"/logo.png": {
		"type": "image/png",
		"etag": "\"18a10-fMHGh2fJZtKcpY9w+G6E42eLong\"",
		"mtime": "2026-09-11T07:13:15.128Z",
		"size": 100880,
		"path": "../public/logo.png"
	},
	"/assets/BackInStockDialog-Dr1Y_SFS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"81f-IVWkFvqha88qDFG50QEKwQDIKqM\"",
		"mtime": "2026-09-13T10:28:06.433Z",
		"size": 2079,
		"path": "../public/assets/BackInStockDialog-Dr1Y_SFS.js"
	},
	"/assets/admin-BrhQiPvO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"162bc-3oHiyu46xoBCKHgpmjdLW3aBBgk\"",
		"mtime": "2026-09-13T10:28:06.437Z",
		"size": 90812,
		"path": "../public/assets/admin-BrhQiPvO.js"
	},
	"/assets/bell-ring-CpQQzp4X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18d-cve5RCjGpAa14xuTr7/wUQtUGu4\"",
		"mtime": "2026-09-13T10:28:06.437Z",
		"size": 397,
		"path": "../public/assets/bell-ring-CpQQzp4X.js"
	},
	"/assets/button-ChtrbW4o.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1299-vy0brG29mvzt4bAsEpYPvOXzK2A\"",
		"mtime": "2026-09-13T10:28:06.437Z",
		"size": 4761,
		"path": "../public/assets/button-ChtrbW4o.js"
	},
	"/assets/checkout-DtJchX72.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8458-UR0lrG3uukVgm/gOVqVbo7sRABk\"",
		"mtime": "2026-09-13T10:28:06.438Z",
		"size": 33880,
		"path": "../public/assets/checkout-DtJchX72.js"
	},
	"/assets/chevron-left-clrR8Ap6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"82-wc0ZwnyihXSD5uB7oS3Vv3mRjN4\"",
		"mtime": "2026-09-13T10:28:06.438Z",
		"size": 130,
		"path": "../public/assets/chevron-left-clrR8Ap6.js"
	},
	"/hero-video-purity.mp4": {
		"type": "video/mp4",
		"etag": "\"1c3471-FuLHWR5BOq32W6V5ogC3R7C2wb0\"",
		"mtime": "2026-09-09T05:25:30.964Z",
		"size": 1848433,
		"path": "../public/hero-video-purity.mp4"
	},
	"/hero-video-craft.mp4": {
		"type": "video/mp4",
		"etag": "\"1dd8d8-36G6bJART3pcf11CPoBusVCJDYw\"",
		"mtime": "2026-09-09T05:25:30.846Z",
		"size": 1956056,
		"path": "../public/hero-video-craft.mp4"
	},
	"/hero-video-tradition.mp4": {
		"type": "video/mp4",
		"etag": "\"1f7684-YnffQQi8aGrZPF6kbxWIcCLtRzo\"",
		"mtime": "2026-09-09T05:25:31.003Z",
		"size": 2061956,
		"path": "../public/hero-video-tradition.mp4"
	},
	"/assets/chevron-right-Bj_KW_iD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"82-16xHjx7RMEM17WVhsBa/0pfi17k\"",
		"mtime": "2026-09-13T10:28:06.438Z",
		"size": 130,
		"path": "../public/assets/chevron-right-Bj_KW_iD.js"
	},
	"/assets/circle-check-CRQN4vvI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b2-wLjMGqav0OPYKaA4TxBuBdBcegA\"",
		"mtime": "2026-09-13T10:28:06.438Z",
		"size": 178,
		"path": "../public/assets/circle-check-CRQN4vvI.js"
	},
	"/assets/clock-Dc7__00M.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a9-qGbxakhfUrwKZhMyJifLzRtwJDc\"",
		"mtime": "2026-09-13T10:28:06.438Z",
		"size": 169,
		"path": "../public/assets/clock-Dc7__00M.js"
	},
	"/assets/contact-CyjjDTQZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2cfe-J3ra176X6k7qq3o3z40KZnJOyV0\"",
		"mtime": "2026-09-13T10:28:06.440Z",
		"size": 11518,
		"path": "../public/assets/contact-CyjjDTQZ.js"
	},
	"/assets/copy-s9AtWOvF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec-ch56xwB9JmXD9k4GpNR5qpunw40\"",
		"mtime": "2026-09-13T10:28:06.440Z",
		"size": 236,
		"path": "../public/assets/copy-s9AtWOvF.js"
	},
	"/assets/createLucideIcon-Qk0VrUvi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"32f1-YcgSnbeHPGUm7KIGejOIRD4fj3Y\"",
		"mtime": "2026-09-13T10:28:06.441Z",
		"size": 13041,
		"path": "../public/assets/createLucideIcon-Qk0VrUvi.js"
	},
	"/assets/custom-branding-CHtIGPkn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5cc7-Si8bxYaoVqLX1E5JQePUIR2pnPI\"",
		"mtime": "2026-09-13T10:28:06.441Z",
		"size": 23751,
		"path": "../public/assets/custom-branding-CHtIGPkn.js"
	},
	"/assets/dist-8CuG8i6c.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c9f-5PpzAxQaWRkIFE59zVO233fvtMg\"",
		"mtime": "2026-09-13T10:28:06.441Z",
		"size": 7327,
		"path": "../public/assets/dist-8CuG8i6c.js"
	},
	"/assets/dist-Bt_04ytV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a0-c5rGCHQx+3m87sVZKcdoM6iWsMg\"",
		"mtime": "2026-09-13T10:28:06.442Z",
		"size": 672,
		"path": "../public/assets/dist-Bt_04ytV.js"
	},
	"/assets/dist-CcMZzHWY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"284-hmwICHsLOsv3I2by6K6ovyB4rfc\"",
		"mtime": "2026-09-13T10:28:06.443Z",
		"size": 644,
		"path": "../public/assets/dist-CcMZzHWY.js"
	},
	"/assets/dist-CLHxQBGt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1377-gWdhS3W1UYnoZL8WdrkuVe9H6kU\"",
		"mtime": "2026-09-13T10:28:06.442Z",
		"size": 4983,
		"path": "../public/assets/dist-CLHxQBGt.js"
	},
	"/assets/dist-CSg9brrI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c28-CSVudwfMkgAvMxDDGINmA/47fG8\"",
		"mtime": "2026-09-13T10:28:06.443Z",
		"size": 7208,
		"path": "../public/assets/dist-CSg9brrI.js"
	},
	"/assets/dist-SosQ1KXr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"129-tyHeHPAdBrIb8iZJ2c3GBFvglCo\"",
		"mtime": "2026-09-13T10:28:06.443Z",
		"size": 297,
		"path": "../public/assets/dist-SosQ1KXr.js"
	},
	"/assets/eye-01WrV4Li.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"100-Y0rFUqLq4m5/yUBJ1Iv9T7UtgqY\"",
		"mtime": "2026-09-13T10:28:06.444Z",
		"size": 256,
		"path": "../public/assets/eye-01WrV4Li.js"
	},
	"/assets/faq-B8i4Zk2a.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d65-OOGbW9CMHB8FeA8JBdtP6xvV7ns\"",
		"mtime": "2026-09-13T10:28:06.444Z",
		"size": 7525,
		"path": "../public/assets/faq-B8i4Zk2a.js"
	},
	"/assets/FaqBot-2ziUjBif.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"156a-THBEohmX0wfdr3EeRx/H0OuiXfM\"",
		"mtime": "2026-09-13T10:28:06.433Z",
		"size": 5482,
		"path": "../public/assets/FaqBot-2ziUjBif.js"
	},
	"/hero-video-gold.mp4": {
		"type": "video/mp4",
		"etag": "\"2843e1-WIUn1+uNEqHYfFi2NoXuyoFG9AI\"",
		"mtime": "2026-09-09T05:25:30.880Z",
		"size": 2638817,
		"path": "../public/hero-video-gold.mp4"
	},
	"/hero-video-master.mp4": {
		"type": "video/mp4",
		"etag": "\"2db110-nmXMhfO749DxxSrLZBp28FxPO4E\"",
		"mtime": "2026-09-09T05:25:30.961Z",
		"size": 2994448,
		"path": "../public/hero-video-master.mp4"
	},
	"/hero-video-slide2.mp4": {
		"type": "video/mp4",
		"etag": "\"2e5c3f-hA63w8pz3VDSRfOniLKuQodoApo\"",
		"mtime": "2026-09-09T05:25:30.980Z",
		"size": 3038271,
		"path": "../public/hero-video-slide2.mp4"
	},
	"/hero-video.mp4": {
		"type": "video/mp4",
		"etag": "\"2db110-nmXMhfO749DxxSrLZBp28FxPO4E\"",
		"mtime": "2026-09-09T05:25:31.010Z",
		"size": 2994448,
		"path": "../public/hero-video.mp4"
	},
	"/assets/gift-DNq5BBQe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15d-nBLgaLkJbwvpiuFfZwT6a/yHHEw\"",
		"mtime": "2026-09-13T10:28:06.446Z",
		"size": 349,
		"path": "../public/assets/gift-DNq5BBQe.js"
	},
	"/assets/HeritageMindmapJourney-Di9KlPsr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"54c7-2ouK3qnDvrwt1pYg9FM/qCkZAOc\"",
		"mtime": "2026-09-13T10:28:06.433Z",
		"size": 21703,
		"path": "../public/assets/HeritageMindmapJourney-Di9KlPsr.js"
	},
	"/hero-video-factory.mp4": {
		"type": "video/mp4",
		"etag": "\"3c2ef6-d8vkzUvVmULDyga5uRpZUr5arUk\"",
		"mtime": "2026-09-09T05:25:30.862Z",
		"size": 3944182,
		"path": "../public/hero-video-factory.mp4"
	},
	"/assets/index-ecrwZhAY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"78248-resBhYft1sxSMETiygKrz9CFNpM\"",
		"mtime": "2026-09-13T10:28:06.433Z",
		"size": 492104,
		"path": "../public/assets/index-ecrwZhAY.js"
	},
	"/assets/input-CbxaCcVO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b3-S+uqUgUCOCCen9SDe9iVAzaYXrc\"",
		"mtime": "2026-09-13T10:28:06.446Z",
		"size": 691,
		"path": "../public/assets/input-CbxaCcVO.js"
	},
	"/assets/label-B7xKWlt6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2d4-zQzI995U0IW3cKtrACPlKPTcO40\"",
		"mtime": "2026-09-13T10:28:06.446Z",
		"size": 724,
		"path": "../public/assets/label-B7xKWlt6.js"
	},
	"/assets/link-CWAOiTup.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b24-3CifcNZX1Lbi72M/YRMUftfhVJc\"",
		"mtime": "2026-09-13T10:28:06.447Z",
		"size": 23332,
		"path": "../public/assets/link-CWAOiTup.js"
	},
	"/assets/loader-circle-BAhHYJnl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"90-xGUV0vXI0NHTPsHCQo2BE2ZBzXQ\"",
		"mtime": "2026-09-13T10:28:06.447Z",
		"size": 144,
		"path": "../public/assets/loader-circle-BAhHYJnl.js"
	},
	"/assets/lock-BVsDF5gZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ce-dosszMG7CQWdHor0vzL62vwaXrE\"",
		"mtime": "2026-09-13T10:28:06.447Z",
		"size": 206,
		"path": "../public/assets/lock-BVsDF5gZ.js"
	},
	"/assets/maximize-2-BuuW56lE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ee-L8C3tu/dCgwJ3VZPAxmGyN19XaY\"",
		"mtime": "2026-09-13T10:28:06.448Z",
		"size": 238,
		"path": "../public/assets/maximize-2-BuuW56lE.js"
	},
	"/assets/message-square-l2Tyzf61.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e9-3LjcSy2fVAKdzX4XKRQECDM2s3k\"",
		"mtime": "2026-09-13T10:28:06.448Z",
		"size": 233,
		"path": "../public/assets/message-square-l2Tyzf61.js"
	},
	"/assets/not-found-i5RsCZif.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76-Trmr7GZIBZuvfg4uM18tBiRtOXg\"",
		"mtime": "2026-09-13T10:28:06.449Z",
		"size": 118,
		"path": "../public/assets/not-found-i5RsCZif.js"
	},
	"/assets/order-confirmed-DUp3qHTV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2110-tZ81fjltYb86M24s//65K3hIh7o\"",
		"mtime": "2026-09-13T10:28:06.450Z",
		"size": 8464,
		"path": "../public/assets/order-confirmed-DUp3qHTV.js"
	},
	"/assets/order._id-CGRIFLGM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2344-2NYYt7VDyiJ81vz6hJDZVVHkcQo\"",
		"mtime": "2026-09-13T10:28:06.451Z",
		"size": 9028,
		"path": "../public/assets/order._id-CGRIFLGM.js"
	},
	"/assets/OrderResolutionDialog-CFl7xcfN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"271b-pYV52+RU+qwFk/iU7ZY/7cgCfRw\"",
		"mtime": "2026-09-13T10:28:06.434Z",
		"size": 10011,
		"path": "../public/assets/OrderResolutionDialog-CFl7xcfN.js"
	},
	"/assets/pencil-fHcRKW2b.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"114-CI2NZA4qQfIx+30MtOe3TjIydlg\"",
		"mtime": "2026-09-13T10:28:06.451Z",
		"size": 276,
		"path": "../public/assets/pencil-fHcRKW2b.js"
	},
	"/assets/pincode.functions-CCm_cg8Y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c9-nUGWmC9jnEp2z0xYB7w52yBDBfo\"",
		"mtime": "2026-09-13T10:28:06.461Z",
		"size": 713,
		"path": "../public/assets/pincode.functions-CCm_cg8Y.js"
	},
	"/assets/policies._slug-gCQhQHMA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a23-zywQkdBM2C9TM1X697pv3DUjQxk\"",
		"mtime": "2026-09-13T10:28:06.462Z",
		"size": 2595,
		"path": "../public/assets/policies._slug-gCQhQHMA.js"
	},
	"/assets/product-cake-400-IyNQ7Qca.webp": {
		"type": "image/webp",
		"etag": "\"231a-XZXTs8DL9WIV0wM06ILR+TyXGyw\"",
		"mtime": "2026-09-13T10:28:06.482Z",
		"size": 8986,
		"path": "../public/assets/product-cake-400-IyNQ7Qca.webp"
	},
	"/assets/product-glutenfree-400-dtzpdwMq.webp": {
		"type": "image/webp",
		"etag": "\"191c-0160DxdXvd1Ez2qyK+5Edn8kPHk\"",
		"mtime": "2026-09-13T10:28:06.484Z",
		"size": 6428,
		"path": "../public/assets/product-glutenfree-400-dtzpdwMq.webp"
	},
	"/assets/product-cake-800-D7p8IG0h.webp": {
		"type": "image/webp",
		"etag": "\"8a9c-FUEv5wy89JF3N/Xi4FPDGq0Oa6A\"",
		"mtime": "2026-09-13T10:28:06.482Z",
		"size": 35484,
		"path": "../public/assets/product-cake-800-D7p8IG0h.webp"
	},
	"/assets/product-glutenfree-800-BRbglSHw.webp": {
		"type": "image/webp",
		"etag": "\"4be2-4ZuVdoh9vc8SIcRNeniPXSXBpG4\"",
		"mtime": "2026-09-13T10:28:06.485Z",
		"size": 19426,
		"path": "../public/assets/product-glutenfree-800-BRbglSHw.webp"
	},
	"/assets/product-granules-400-D98wWv4R.webp": {
		"type": "image/webp",
		"etag": "\"1986-pW4Tw+bAfTFuVQjtOVNXaLBbG3M\"",
		"mtime": "2026-09-13T10:28:06.486Z",
		"size": 6534,
		"path": "../public/assets/product-granules-400-D98wWv4R.webp"
	},
	"/assets/product-granules-800-WWT9xaKD.webp": {
		"type": "image/webp",
		"etag": "\"4c94-ndAVPibr7RpoSMK3WBGSbMGTCM0\"",
		"mtime": "2026-09-13T10:28:06.486Z",
		"size": 19604,
		"path": "../public/assets/product-granules-800-WWT9xaKD.webp"
	},
	"/assets/product-powder-800-DcdU81cH.webp": {
		"type": "image/webp",
		"etag": "\"3770-kg0m3WIrBgEFb276hCgR5PeaH1w\"",
		"mtime": "2026-09-13T10:28:06.487Z",
		"size": 14192,
		"path": "../public/assets/product-powder-800-DcdU81cH.webp"
	},
	"/assets/product-powder-400-BzZ6QhiJ.webp": {
		"type": "image/webp",
		"etag": "\"1484-G3RIQC0/RrkZqXpVf02Q9xEmMns\"",
		"mtime": "2026-09-13T10:28:06.487Z",
		"size": 5252,
		"path": "../public/assets/product-powder-400-BzZ6QhiJ.webp"
	},
	"/assets/product._slug-C9sdHIvY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"71f1-diwDHT7ro8J961Q3IdKLoKZVvd4\"",
		"mtime": "2026-09-13T10:28:06.465Z",
		"size": 29169,
		"path": "../public/assets/product._slug-C9sdHIvY.js"
	},
	"/assets/ProductCard-KTXMXSp-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1901-cwctSuEiaxsjskfHlZvWnhld5aw\"",
		"mtime": "2026-09-13T10:28:06.434Z",
		"size": 6401,
		"path": "../public/assets/ProductCard-KTXMXSp-.js"
	},
	"/assets/ProductQuestions-D3AFRUhD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"160b-TPBDvbhMqnzik64jc2W1UtYVKAs\"",
		"mtime": "2026-09-13T10:28:06.434Z",
		"size": 5643,
		"path": "../public/assets/ProductQuestions-D3AFRUhD.js"
	},
	"/assets/ProductReviews-NdB3hO3P.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"35cc-JzYo2SmUCHVPxO218TXsvNiU/Kg\"",
		"mtime": "2026-09-13T10:28:06.434Z",
		"size": 13772,
		"path": "../public/assets/ProductReviews-NdB3hO3P.js"
	},
	"/assets/QuickViewDialog-ypJoZsxO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ea5-G+UT5LwZrag6xf2wbxMig342j+g\"",
		"mtime": "2026-09-13T10:28:06.435Z",
		"size": 3749,
		"path": "../public/assets/QuickViewDialog-ypJoZsxO.js"
	},
	"/assets/radio-group-CLr_kP0U.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1872-sjyiOZ/WktkwojQjq756/Dweid4\"",
		"mtime": "2026-09-13T10:28:06.465Z",
		"size": 6258,
		"path": "../public/assets/radio-group-CLr_kP0U.js"
	},
	"/assets/recently-viewed-Cu-tp-I5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21d-VIDU8nTr1UQ2SbyNjG5Gp04HRv4\"",
		"mtime": "2026-09-13T10:28:06.467Z",
		"size": 541,
		"path": "../public/assets/recently-viewed-Cu-tp-I5.js"
	},
	"/assets/RecentlyViewed-DGpzxa3t.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"655-lIqUl1e3g4wVjwvYxZ94y0Wnau4\"",
		"mtime": "2026-09-13T10:28:06.435Z",
		"size": 1621,
		"path": "../public/assets/RecentlyViewed-DGpzxa3t.js"
	},
	"/assets/rotate-ccw-D_TOQcIJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c8-tAwsEz/QTQBMGPoh8jMzU1gr5iI\"",
		"mtime": "2026-09-13T10:28:06.468Z",
		"size": 200,
		"path": "../public/assets/rotate-ccw-D_TOQcIJ.js"
	},
	"/assets/routes-ByaUou9P.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b0b-RlcAtx5o8c+qaJ4C0t7TDf0izSo\"",
		"mtime": "2026-09-13T10:28:06.468Z",
		"size": 23307,
		"path": "../public/assets/routes-ByaUou9P.js"
	},
	"/assets/select-CNxoz0sd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bad0-xXAZ4TavxauUpj4flCqKuMQyqlw\"",
		"mtime": "2026-09-13T10:28:06.473Z",
		"size": 47824,
		"path": "../public/assets/select-CNxoz0sd.js"
	},
	"/assets/shop-BNTVrfhn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30c2-bgnX9aSDzaoVZGpTFrg2LiLJK2E\"",
		"mtime": "2026-09-13T10:28:06.474Z",
		"size": 12482,
		"path": "../public/assets/shop-BNTVrfhn.js"
	},
	"/assets/sparkles-YJipJYOr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee-zyZ1oSDWz3P+iC/JPdiWM51tjCo\"",
		"mtime": "2026-09-13T10:28:06.475Z",
		"size": 494,
		"path": "../public/assets/sparkles-YJipJYOr.js"
	},
	"/assets/star-JBFCAXDA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d8-qFVa6u4fOBXOrz1NGlxhCo8hxeM\"",
		"mtime": "2026-09-13T10:28:06.475Z",
		"size": 472,
		"path": "../public/assets/star-JBFCAXDA.js"
	},
	"/assets/story-1-shop-1200-KH6P15Oz.webp": {
		"type": "image/webp",
		"etag": "\"2d50c-+x+NV7ahJwD6K2FAnVqBqXzkqnk\"",
		"mtime": "2026-09-13T10:28:06.489Z",
		"size": 185612,
		"path": "../public/assets/story-1-shop-1200-KH6P15Oz.webp"
	},
	"/assets/story-1-shop-560-C9AOS04y.webp": {
		"type": "image/webp",
		"etag": "\"d3c2-Mg5/P4UXbq5SBypO4cN/MbDdotw\"",
		"mtime": "2026-09-13T10:28:06.489Z",
		"size": 54210,
		"path": "../public/assets/story-1-shop-560-C9AOS04y.webp"
	},
	"/assets/story-1-shop-900-C1hKWfWP.webp": {
		"type": "image/webp",
		"etag": "\"1c524-wJ5rCMaRqEWBHHJPFRlStv2Bbz4\"",
		"mtime": "2026-09-13T10:28:06.490Z",
		"size": 116004,
		"path": "../public/assets/story-1-shop-900-C1hKWfWP.webp"
	},
	"/assets/story-2-kitchen-1200-B0XrR51h.webp": {
		"type": "image/webp",
		"etag": "\"3a14e-w3i/7SDu4WeVbSIwWEuZaPVpkt8\"",
		"mtime": "2026-09-13T10:28:06.496Z",
		"size": 237902,
		"path": "../public/assets/story-2-kitchen-1200-B0XrR51h.webp"
	},
	"/assets/story-3-today-1200-COgTFLEH.webp": {
		"type": "image/webp",
		"etag": "\"3b3e0-IgpgxUNMre1gLuXTJ/BXAXKOeR8\"",
		"mtime": "2026-09-13T10:28:06.498Z",
		"size": 242656,
		"path": "../public/assets/story-3-today-1200-COgTFLEH.webp"
	},
	"/assets/story-2-kitchen-900-D9xPH5h3.webp": {
		"type": "image/webp",
		"etag": "\"24d44-pFv3Ceyn3Qyk+v4gcbBCsMhbClU\"",
		"mtime": "2026-09-13T10:28:06.497Z",
		"size": 150852,
		"path": "../public/assets/story-2-kitchen-900-D9xPH5h3.webp"
	},
	"/assets/story-2-kitchen-560-BwiFpku4.webp": {
		"type": "image/webp",
		"etag": "\"f778-fzVX+5ecgwmKIWcIN6n2HJ4ElJU\"",
		"mtime": "2026-09-13T10:28:06.496Z",
		"size": 63352,
		"path": "../public/assets/story-2-kitchen-560-BwiFpku4.webp"
	},
	"/assets/story-3-today-560-BqodebNV.webp": {
		"type": "image/webp",
		"etag": "\"100b2-SEV1Se0DY2Exhgul/oj4yrRrjow\"",
		"mtime": "2026-09-13T10:28:06.498Z",
		"size": 65714,
		"path": "../public/assets/story-3-today-560-BqodebNV.webp"
	},
	"/assets/story-BRVgY-gm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3222-YlFo/W7oMs9p+cQtuFkddF8++ws\"",
		"mtime": "2026-09-13T10:28:06.476Z",
		"size": 12834,
		"path": "../public/assets/story-BRVgY-gm.js"
	},
	"/assets/styles-woayJsjR.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"260d2-f7Hy7xMaodrn9+tLwhsYcZyzi6I\"",
		"mtime": "2026-09-13T10:28:06.500Z",
		"size": 155858,
		"path": "../public/assets/styles-woayJsjR.css"
	},
	"/assets/support-BkG1fI9X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6d6-RnXBLwhihFMBLhZ1kQGVXvBKUh0\"",
		"mtime": "2026-09-13T10:28:06.477Z",
		"size": 1750,
		"path": "../public/assets/support-BkG1fI9X.js"
	},
	"/assets/textarea-D528IDrg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24d-i23xoQbXfKPHVEU3HMLcwYY+C+8\"",
		"mtime": "2026-09-13T10:28:06.477Z",
		"size": 589,
		"path": "../public/assets/textarea-D528IDrg.js"
	},
	"/assets/track-DpU2YeH0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1268-FY11Vxgzhu45AEewmcG5+hcTqaE\"",
		"mtime": "2026-09-13T10:28:06.479Z",
		"size": 4712,
		"path": "../public/assets/track-DpU2YeH0.js"
	},
	"/assets/triangle-alert-CTQiK_Cu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"251-s7a6SLXh33q2F5cfy6Zk8nN9LpM\"",
		"mtime": "2026-09-13T10:28:06.479Z",
		"size": 593,
		"path": "../public/assets/triangle-alert-CTQiK_Cu.js"
	},
	"/assets/utils-B6KiDbIe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6a7d-iNkBSvaSyIjvZOzWoTvEa49qwcI\"",
		"mtime": "2026-09-13T10:28:06.480Z",
		"size": 27261,
		"path": "../public/assets/utils-B6KiDbIe.js"
	},
	"/assets/story-3-today-900-CoQyFYq-.webp": {
		"type": "image/webp",
		"etag": "\"2642e-PrnboRpJqv4QYtJLSs+oAYMBQx8\"",
		"mtime": "2026-09-13T10:28:06.499Z",
		"size": 156718,
		"path": "../public/assets/story-3-today-900-CoQyFYq-.webp"
	},
	"/assets/wishlist-C1PyrT9k.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12a4-iCIpMY3hG99dv8hH9w1XjWGUkvU\"",
		"mtime": "2026-09-13T10:28:06.480Z",
		"size": 4772,
		"path": "../public/assets/wishlist-C1PyrT9k.js"
	},
	"/assets/WishlistButton-cxnvupmQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"568-5qkjkraMGXZO9JwzBVKv8+UJbxs\"",
		"mtime": "2026-09-13T10:28:06.436Z",
		"size": 1384,
		"path": "../public/assets/WishlistButton-cxnvupmQ.js"
	},
	"/assets/zap-CgVvUjOc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"106-bN6PPB19aLaa2UnzMP4fLFNIWK8\"",
		"mtime": "2026-09-13T10:28:06.480Z",
		"size": 262,
		"path": "../public/assets/zap-CgVvUjOc.js"
	},
	"/mindmap/footer.jpg": {
		"type": "image/jpeg",
		"etag": "\"f25-B97kHzjNjNvwCvWKN+C3FJyHJDw\"",
		"mtime": "2026-09-13T10:25:03.171Z",
		"size": 3877,
		"path": "../public/mindmap/footer.jpg"
	},
	"/mindmap/center-badge.jpg": {
		"type": "image/jpeg",
		"etag": "\"3ded-yV9arpRZEB7Y6Be5HyeU8yt1BDk\"",
		"mtime": "2026-09-13T10:25:03.138Z",
		"size": 15853,
		"path": "../public/mindmap/center-badge.jpg"
	},
	"/mindmap/header.jpg": {
		"type": "image/jpeg",
		"etag": "\"26bf-Smj59pgfsIkYJrsDvJBkCLlGkFQ\"",
		"mtime": "2026-09-13T10:25:03.113Z",
		"size": 9919,
		"path": "../public/mindmap/header.jpg"
	},
	"/mindmap/stage-1-cultivation.jpg": {
		"type": "image/jpeg",
		"etag": "\"6e30-VtGIH0McI3K6VMze6l65992jENY\"",
		"mtime": "2026-09-13T10:25:03.113Z",
		"size": 28208,
		"path": "../public/mindmap/stage-1-cultivation.jpg"
	},
	"/mindmap/stage-3-manufacturing.jpg": {
		"type": "image/jpeg",
		"etag": "\"61e4-5nMfO8b1psZPHH5sazj8gK7q1ro\"",
		"mtime": "2026-09-13T10:25:03.117Z",
		"size": 25060,
		"path": "../public/mindmap/stage-3-manufacturing.jpg"
	},
	"/mindmap/stage-2-harvesting.jpg": {
		"type": "image/jpeg",
		"etag": "\"6d93-Xg29cXWvFPHoAmGfS332ENbbEIc\"",
		"mtime": "2026-09-13T10:25:03.113Z",
		"size": 28051,
		"path": "../public/mindmap/stage-2-harvesting.jpg"
	},
	"/mindmap/stage-4-quality.jpg": {
		"type": "image/jpeg",
		"etag": "\"74aa-1OJZ+GsJYymDjr2T/bukFLE4cAE\"",
		"mtime": "2026-09-13T10:25:03.149Z",
		"size": 29866,
		"path": "../public/mindmap/stage-4-quality.jpg"
	},
	"/mindmap/stage-5-packaging.jpg": {
		"type": "image/jpeg",
		"etag": "\"79a0-xk8tkTJYYFPLoCAOARMNLuJldFY\"",
		"mtime": "2026-09-13T10:25:03.145Z",
		"size": 31136,
		"path": "../public/mindmap/stage-5-packaging.jpg"
	},
	"/products/100g-asafoetida-gold-cake/img-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"33a58-FL05lX5Aa2lM4G6I9UJ7se8W7CQ\"",
		"mtime": "2026-09-09T05:25:31.032Z",
		"size": 211544,
		"path": "../public/products/100g-asafoetida-gold-cake/img-2.jpg"
	},
	"/products/100g-asafoetida-gold-cake/img-3.jpg": {
		"type": "image/jpeg",
		"etag": "\"5f2a7-gk96D4Hg/vtk1/GpWtVbfr8k4K8\"",
		"mtime": "2026-09-09T05:25:31.033Z",
		"size": 389799,
		"path": "../public/products/100g-asafoetida-gold-cake/img-3.jpg"
	},
	"/mindmap/stage-6-sales.jpg": {
		"type": "image/jpeg",
		"etag": "\"7cdd-qmauSOxhYmzlfcaipMWzzmvUXgY\"",
		"mtime": "2026-09-13T10:25:03.173Z",
		"size": 31965,
		"path": "../public/mindmap/stage-6-sales.jpg"
	},
	"/products/100g-asafoetida-gold-cake/img-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"4318d-old8EuOfSB683qAlqNNCwTUqVIo\"",
		"mtime": "2026-09-09T05:25:31.029Z",
		"size": 274829,
		"path": "../public/products/100g-asafoetida-gold-cake/img-1.jpg"
	},
	"/products/100g-asafoetida-gold-cake/img-4.jpg": {
		"type": "image/jpeg",
		"etag": "\"61f28-8Ft0dQ2msQmT24QiT/pBzi5L/yY\"",
		"mtime": "2026-09-09T05:25:31.037Z",
		"size": 401192,
		"path": "../public/products/100g-asafoetida-gold-cake/img-4.jpg"
	},
	"/products/100g-asafoetida-gold-cake/img-6.jpg": {
		"type": "image/jpeg",
		"etag": "\"4ba83-1vNQPCdts4FVFBqvzOlpr+CQaPo\"",
		"mtime": "2026-09-09T05:25:31.047Z",
		"size": 309891,
		"path": "../public/products/100g-asafoetida-gold-cake/img-6.jpg"
	},
	"/products/100g-asafoetida-gold-cake/img-5.jpg": {
		"type": "image/jpeg",
		"etag": "\"4c425-sNjBxXkHgfHnx0GXBhm/KLwh5vA\"",
		"mtime": "2026-09-09T05:25:31.043Z",
		"size": 312357,
		"path": "../public/products/100g-asafoetida-gold-cake/img-5.jpg"
	},
	"/products/100g-asafoetida-gold-cake/img-7.jpg": {
		"type": "image/jpeg",
		"etag": "\"59a8b-zoFT3mmxeDKt5P1FYK/o0cNC+wY\"",
		"mtime": "2026-09-09T05:25:31.053Z",
		"size": 367243,
		"path": "../public/products/100g-asafoetida-gold-cake/img-7.jpg"
	},
	"/products/100g-asafoetida-gold-cake/img-8.jpg": {
		"type": "image/jpeg",
		"etag": "\"57508-5g22zO3ClQ8BtCq46AigyZuf/4M\"",
		"mtime": "2026-09-09T05:25:31.055Z",
		"size": 357640,
		"path": "../public/products/100g-asafoetida-gold-cake/img-8.jpg"
	},
	"/products/100g-gold-asafoetida-powder/img-3.jpg": {
		"type": "image/jpeg",
		"etag": "\"3feb1-7HdVYa61Y3tq003MU75/f5BAYrA\"",
		"mtime": "2026-09-09T05:25:31.068Z",
		"size": 261809,
		"path": "../public/products/100g-gold-asafoetida-powder/img-3.jpg"
	},
	"/products/100g-gold-asafoetida-powder/img-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"40b6f-DqcC3CwSYJHqHWw3gFDvXdJ5YWA\"",
		"mtime": "2026-09-09T05:25:31.061Z",
		"size": 265071,
		"path": "../public/products/100g-gold-asafoetida-powder/img-1.jpg"
	},
	"/products/100g-gold-asafoetida-powder/img-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"398f6-vJEFP1F2ACp8MujUyOSn48yRkyA\"",
		"mtime": "2026-09-09T05:25:31.063Z",
		"size": 235766,
		"path": "../public/products/100g-gold-asafoetida-powder/img-2.jpg"
	},
	"/products/100g-gold-asafoetida-powder/img-4.jpg": {
		"type": "image/jpeg",
		"etag": "\"3c185-xBiFCRltQUwymA1I9ba76TYKHXc\"",
		"mtime": "2026-09-09T05:25:31.073Z",
		"size": 246149,
		"path": "../public/products/100g-gold-asafoetida-powder/img-4.jpg"
	},
	"/products/100g-premium-asafoetida-powder/img-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"49698-W78bt1jokoffR3KKRYOiyL+XnqQ\"",
		"mtime": "2026-09-09T05:25:31.076Z",
		"size": 300696,
		"path": "../public/products/100g-premium-asafoetida-powder/img-1.jpg"
	},
	"/products/100g-premium-asafoetida-powder/img-11.png": {
		"type": "image/png",
		"etag": "\"7d86a-gcRKQXaCja34gfM+Dy3AMo+ksPw\"",
		"mtime": "2026-09-09T05:25:31.087Z",
		"size": 514154,
		"path": "../public/products/100g-premium-asafoetida-powder/img-11.png"
	},
	"/products/100g-premium-asafoetida-powder/img-10.png": {
		"type": "image/png",
		"etag": "\"d26c0-+mgknT+sAVtvGbUFt9DufcXxzUI\"",
		"mtime": "2026-09-09T05:25:31.077Z",
		"size": 861888,
		"path": "../public/products/100g-premium-asafoetida-powder/img-10.png"
	},
	"/products/100g-premium-asafoetida-powder/img-13.png": {
		"type": "image/png",
		"etag": "\"d933b-ZXeFmXu/5O4OV1W2e6B5+B+L2pM\"",
		"mtime": "2026-09-09T05:25:31.095Z",
		"size": 889659,
		"path": "../public/products/100g-premium-asafoetida-powder/img-13.png"
	},
	"/products/100g-premium-asafoetida-powder/img-12.png": {
		"type": "image/png",
		"etag": "\"de1f7-mZSHOfwgbEOdxGECoR19wvRc+iQ\"",
		"mtime": "2026-09-09T05:25:31.091Z",
		"size": 909815,
		"path": "../public/products/100g-premium-asafoetida-powder/img-12.png"
	},
	"/products/100g-premium-asafoetida-powder/img-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"4cd08-pWGkaWR2/BwaWjEh1IgfM2vcifY\"",
		"mtime": "2026-09-09T05:25:31.136Z",
		"size": 314632,
		"path": "../public/products/100g-premium-asafoetida-powder/img-2.jpg"
	},
	"/products/100g-premium-asafoetida-powder/img-14.png": {
		"type": "image/png",
		"etag": "\"e7501-CdACz/xhh+Vn2BtpKKPX74w6MqM\"",
		"mtime": "2026-09-09T05:25:31.103Z",
		"size": 947457,
		"path": "../public/products/100g-premium-asafoetida-powder/img-14.png"
	},
	"/products/100g-premium-asafoetida-powder/img-17.png": {
		"type": "image/png",
		"etag": "\"dcfa9-mR3MqcClKp49cymitQ08jKAMggg\"",
		"mtime": "2026-09-09T05:25:31.120Z",
		"size": 905129,
		"path": "../public/products/100g-premium-asafoetida-powder/img-17.png"
	},
	"/products/100g-premium-asafoetida-powder/img-15.png": {
		"type": "image/png",
		"etag": "\"113c05-4EW0zWIGkq2/X92/X280Z3sRH5s\"",
		"mtime": "2026-09-09T05:25:31.110Z",
		"size": 1129477,
		"path": "../public/products/100g-premium-asafoetida-powder/img-15.png"
	},
	"/products/100g-premium-asafoetida-powder/img-18.png": {
		"type": "image/png",
		"etag": "\"df8db-7PG7ls7lK+vm5vV4fkN2NmfqOX0\"",
		"mtime": "2026-09-09T05:25:31.128Z",
		"size": 915675,
		"path": "../public/products/100g-premium-asafoetida-powder/img-18.png"
	},
	"/products/100g-premium-asafoetida-powder/img-20.png": {
		"type": "image/png",
		"etag": "\"8cff5-ctN+nam5UFz3O609nKt+yPrxqq8\"",
		"mtime": "2026-09-09T05:25:31.140Z",
		"size": 577525,
		"path": "../public/products/100g-premium-asafoetida-powder/img-20.png"
	},
	"/products/100g-premium-asafoetida-powder/img-19.png": {
		"type": "image/png",
		"etag": "\"8ff7c-KQpsRpFsRDr/oF76w/iZAIaahv8\"",
		"mtime": "2026-09-09T05:25:31.132Z",
		"size": 589692,
		"path": "../public/products/100g-premium-asafoetida-powder/img-19.png"
	},
	"/products/100g-premium-asafoetida-powder/img-16.png": {
		"type": "image/png",
		"etag": "\"12420d-JZnCGh7ypZdOubO8+TokJW2kQJw\"",
		"mtime": "2026-09-09T05:25:31.114Z",
		"size": 1196557,
		"path": "../public/products/100g-premium-asafoetida-powder/img-16.png"
	},
	"/products/100g-premium-asafoetida-powder/img-21.png": {
		"type": "image/png",
		"etag": "\"baf6f-aQrGBI2JtEM0l2N6pnfcs9dNcOw\"",
		"mtime": "2026-09-09T05:25:31.144Z",
		"size": 765807,
		"path": "../public/products/100g-premium-asafoetida-powder/img-21.png"
	},
	"/products/100g-premium-asafoetida-powder/img-22.png": {
		"type": "image/png",
		"etag": "\"ac405-8hQqi7n+A0bW31uuccCsy/C3s3M\"",
		"mtime": "2026-09-09T05:25:31.149Z",
		"size": 705541,
		"path": "../public/products/100g-premium-asafoetida-powder/img-22.png"
	},
	"/products/100g-premium-asafoetida-powder/img-3.jpg": {
		"type": "image/jpeg",
		"etag": "\"4c2a9-mE1yZMiu8c7ZsAK/n0u8nTuqZvo\"",
		"mtime": "2026-09-09T05:25:31.189Z",
		"size": 311977,
		"path": "../public/products/100g-premium-asafoetida-powder/img-3.jpg"
	},
	"/products/100g-premium-asafoetida-powder/img-23.png": {
		"type": "image/png",
		"etag": "\"c7a34-6+BpaIko5lQ0wYkUk1ZFI0kZil4\"",
		"mtime": "2026-09-09T05:25:31.151Z",
		"size": 817716,
		"path": "../public/products/100g-premium-asafoetida-powder/img-23.png"
	},
	"/products/100g-premium-asafoetida-powder/img-25.png": {
		"type": "image/png",
		"etag": "\"9a1b8-+K2NoSySeScO5H7makOODgyBKUE\"",
		"mtime": "2026-09-09T05:25:31.162Z",
		"size": 631224,
		"path": "../public/products/100g-premium-asafoetida-powder/img-25.png"
	},
	"/hero-video-heritage.mp4": {
		"type": "video/mp4",
		"etag": "\"c0b62f-Y1T5g0OvJQtGlFS0HNivTGDaKAw\"",
		"mtime": "2026-09-09T05:25:30.944Z",
		"size": 12629551,
		"path": "../public/hero-video-heritage.mp4"
	},
	"/products/100g-premium-asafoetida-powder/img-26.png": {
		"type": "image/png",
		"etag": "\"a21fd-A8NWdRXjk1mjQq5V01IVxMkh2cc\"",
		"mtime": "2026-09-09T05:25:31.167Z",
		"size": 664061,
		"path": "../public/products/100g-premium-asafoetida-powder/img-26.png"
	},
	"/products/100g-premium-asafoetida-powder/img-24.png": {
		"type": "image/png",
		"etag": "\"bbbe2-o0QHLiCzSsV1ewizB49Err/Iiag\"",
		"mtime": "2026-09-09T05:25:31.155Z",
		"size": 768994,
		"path": "../public/products/100g-premium-asafoetida-powder/img-24.png"
	},
	"/products/100g-premium-asafoetida-powder/img-29.png": {
		"type": "image/png",
		"etag": "\"c3043-Wykm8dX9PEgFox9Mk0XOoD9A2p0\"",
		"mtime": "2026-09-09T05:25:31.183Z",
		"size": 798787,
		"path": "../public/products/100g-premium-asafoetida-powder/img-29.png"
	},
	"/products/100g-premium-asafoetida-powder/img-30.png": {
		"type": "image/png",
		"etag": "\"d0b04-EmFUGAoGBLwmKh2GHXBGwlhZxz4\"",
		"mtime": "2026-09-09T05:25:31.196Z",
		"size": 854788,
		"path": "../public/products/100g-premium-asafoetida-powder/img-30.png"
	},
	"/products/100g-premium-asafoetida-powder/img-28.png": {
		"type": "image/png",
		"etag": "\"110db6-YqtsdWIErigcNHeeFXQmLUdXFMI\"",
		"mtime": "2026-09-09T05:25:31.181Z",
		"size": 1117622,
		"path": "../public/products/100g-premium-asafoetida-powder/img-28.png"
	},
	"/products/100g-premium-asafoetida-powder/img-4.jpg": {
		"type": "image/jpeg",
		"etag": "\"479ed-nwq4tZ4Ndb5bMObF+/2+3sWJQM8\"",
		"mtime": "2026-09-09T05:25:31.244Z",
		"size": 293357,
		"path": "../public/products/100g-premium-asafoetida-powder/img-4.jpg"
	},
	"/products/100g-premium-asafoetida-powder/img-32.png": {
		"type": "image/png",
		"etag": "\"de78e-qmvwMsjEwD0t/MmcFkoItVJPyY0\"",
		"mtime": "2026-09-09T05:25:31.207Z",
		"size": 911246,
		"path": "../public/products/100g-premium-asafoetida-powder/img-32.png"
	},
	"/products/100g-premium-asafoetida-powder/img-27.png": {
		"type": "image/png",
		"etag": "\"107842-y9OrWkTBzyhCQJfq4oTuTB5omKw\"",
		"mtime": "2026-09-09T05:25:31.175Z",
		"size": 1079362,
		"path": "../public/products/100g-premium-asafoetida-powder/img-27.png"
	},
	"/products/100g-premium-asafoetida-powder/img-31.png": {
		"type": "image/png",
		"etag": "\"e9324-UpzjEBlak7732l8q2zE6X3yr2+M\"",
		"mtime": "2026-09-09T05:25:31.202Z",
		"size": 955172,
		"path": "../public/products/100g-premium-asafoetida-powder/img-31.png"
	},
	"/products/500g-gold-asafoetida-powder/img-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"3e58f-CnY1+4BAsSUAmJXl0Ko2ZuPdhYE\"",
		"mtime": "2026-09-09T05:25:31.283Z",
		"size": 255375,
		"path": "../public/products/500g-gold-asafoetida-powder/img-1.jpg"
	},
	"/products/100g-premium-asafoetida-powder/img-37.png": {
		"type": "image/png",
		"etag": "\"fc902-0/cG+wdtERX/X7RRQvb3K7+YCfk\"",
		"mtime": "2026-09-09T05:25:31.241Z",
		"size": 1034498,
		"path": "../public/products/100g-premium-asafoetida-powder/img-37.png"
	},
	"/products/500g-gold-asafoetida-powder/img-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"395ed-oS2PKHuKNR8opSaONdw57Y9cPQM\"",
		"mtime": "2026-09-09T05:25:31.286Z",
		"size": 234989,
		"path": "../public/products/500g-gold-asafoetida-powder/img-2.jpg"
	},
	"/products/100g-premium-asafoetida-powder/img-34.png": {
		"type": "image/png",
		"etag": "\"13907d-ycwwzfj90tSNJP7BtXBy7Wi/FyI\"",
		"mtime": "2026-09-09T05:25:31.218Z",
		"size": 1282173,
		"path": "../public/products/100g-premium-asafoetida-powder/img-34.png"
	},
	"/products/100g-premium-asafoetida-powder/img-35.png": {
		"type": "image/png",
		"etag": "\"c7031-q4pnFSFBpRsGin9xjHE0BGxytp8\"",
		"mtime": "2026-09-09T05:25:31.224Z",
		"size": 815153,
		"path": "../public/products/100g-premium-asafoetida-powder/img-35.png"
	},
	"/products/50g-asafoetida-gold-cake/img-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"3a0ca-aVPDF9cdGvAVy4P07Ngsn6kZb5c\"",
		"mtime": "2026-09-09T05:25:31.291Z",
		"size": 237770,
		"path": "../public/products/50g-asafoetida-gold-cake/img-1.jpg"
	},
	"/products/500g-gold-asafoetida-powder/img-3.jpg": {
		"type": "image/jpeg",
		"etag": "\"387bd-tZq98i7O9hTwxx11l3HAcsOIdfc\"",
		"mtime": "2026-09-09T05:25:31.288Z",
		"size": 231357,
		"path": "../public/products/500g-gold-asafoetida-powder/img-3.jpg"
	},
	"/products/50g-asafoetida-gold-cake/img-4.jpg": {
		"type": "image/jpeg",
		"etag": "\"64086-cHiED41lc9fe37TCFcwvn5+xoFo\"",
		"mtime": "2026-09-09T05:25:31.307Z",
		"size": 409734,
		"path": "../public/products/50g-asafoetida-gold-cake/img-4.jpg"
	},
	"/products/100g-premium-asafoetida-powder/img-8.png": {
		"type": "image/png",
		"etag": "\"eb9c9-QrLZzbXkJ2o21tFraWAisWZzlSc\"",
		"mtime": "2026-09-09T05:25:31.269Z",
		"size": 965065,
		"path": "../public/products/100g-premium-asafoetida-powder/img-8.png"
	},
	"/products/50g-asafoetida-gold-cake/img-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"2eebe-Z9vZzzHV7LvVtb6C7bzlP3333/c\"",
		"mtime": "2026-09-09T05:25:31.295Z",
		"size": 192190,
		"path": "../public/products/50g-asafoetida-gold-cake/img-2.jpg"
	},
	"/products/50g-asafoetida-gold-cake/img-5.jpg": {
		"type": "image/jpeg",
		"etag": "\"4d505-93QN1RxVFJ5tf6EanCdqhsidb8Q\"",
		"mtime": "2026-09-09T05:25:31.312Z",
		"size": 316677,
		"path": "../public/products/50g-asafoetida-gold-cake/img-5.jpg"
	},
	"/products/100g-premium-asafoetida-powder/img-36.png": {
		"type": "image/png",
		"etag": "\"1054f2-eyg4iT+GkP/pux2N+zA0Kb8BZlc\"",
		"mtime": "2026-09-09T05:25:31.234Z",
		"size": 1070322,
		"path": "../public/products/100g-premium-asafoetida-powder/img-36.png"
	},
	"/products/100g-premium-asafoetida-powder/img-7.png": {
		"type": "image/png",
		"etag": "\"e40b6-VnM8aP3B1NVKMduETkYI5oz2AUE\"",
		"mtime": "2026-09-09T05:25:31.263Z",
		"size": 934070,
		"path": "../public/products/100g-premium-asafoetida-powder/img-7.png"
	},
	"/products/100g-premium-asafoetida-powder/img-33.png": {
		"type": "image/png",
		"etag": "\"139fc4-U4B3Je2w4/W1lSeX1p1w7GgUD48\"",
		"mtime": "2026-09-09T05:25:31.214Z",
		"size": 1286084,
		"path": "../public/products/100g-premium-asafoetida-powder/img-33.png"
	},
	"/products/50g-asafoetida-gold-cake/img-3.jpg": {
		"type": "image/jpeg",
		"etag": "\"66350-TJmrTfY3WFBwHVxKzO+2RmPpZCk\"",
		"mtime": "2026-09-09T05:25:31.301Z",
		"size": 418640,
		"path": "../public/products/50g-asafoetida-gold-cake/img-3.jpg"
	},
	"/products/100g-premium-asafoetida-powder/img-9.png": {
		"type": "image/png",
		"etag": "\"ec65c-My/01AWsJ+75Nc+4bjQL5of3tdc\"",
		"mtime": "2026-09-09T05:25:31.277Z",
		"size": 968284,
		"path": "../public/products/100g-premium-asafoetida-powder/img-9.png"
	},
	"/products/50g-asafoetida-gold-cake/img-6.jpg": {
		"type": "image/jpeg",
		"etag": "\"5600d-gr6Bf0tg/eOLxZWoIc6+cYJsV00\"",
		"mtime": "2026-09-09T05:25:31.315Z",
		"size": 352269,
		"path": "../public/products/50g-asafoetida-gold-cake/img-6.jpg"
	},
	"/products/50g-asafoetida-gold-cake/img-7.jpg": {
		"type": "image/jpeg",
		"etag": "\"5d4d6-V3Wy4GEy1JeM/CJ6dLIc3CSzaI8\"",
		"mtime": "2026-09-09T05:25:31.323Z",
		"size": 382166,
		"path": "../public/products/50g-asafoetida-gold-cake/img-7.jpg"
	},
	"/products/100g-premium-asafoetida-powder/img-6.png": {
		"type": "image/png",
		"etag": "\"152f2c-34umO1l41NDFJlAcWop/nV5VJ7M\"",
		"mtime": "2026-09-09T05:25:31.261Z",
		"size": 1388332,
		"path": "../public/products/100g-premium-asafoetida-powder/img-6.png"
	},
	"/products/50g-asafoetida-gold-cake/img-9.jpg": {
		"type": "image/jpeg",
		"etag": "\"ed83-ICUZkG5k+Wz1HgHuSVPCcqs+90U\"",
		"mtime": "2026-09-09T05:25:31.329Z",
		"size": 60803,
		"path": "../public/products/50g-asafoetida-gold-cake/img-9.jpg"
	},
	"/products/100g-premium-asafoetida-powder/img-5.png": {
		"type": "image/png",
		"etag": "\"14d0fd-6aPT46ZCjYT6U0DvupQwlgrrqY0\"",
		"mtime": "2026-09-09T05:25:31.246Z",
		"size": 1364221,
		"path": "../public/products/100g-premium-asafoetida-powder/img-5.png"
	},
	"/products/50g-asafoetida-gold-cake/img-8.jpg": {
		"type": "image/jpeg",
		"etag": "\"58b7b-xgDMPtQS/PU25EWRxroL67ald2Y\"",
		"mtime": "2026-09-09T05:25:31.327Z",
		"size": 363387,
		"path": "../public/products/50g-asafoetida-gold-cake/img-8.jpg"
	},
	"/products/50g-gluten-free-asafoetida-powder/img-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"3b19e-jaBTWcmYgaWnSY6n21vJ1u+4hsI\"",
		"mtime": "2026-09-09T05:25:31.332Z",
		"size": 242078,
		"path": "../public/products/50g-gluten-free-asafoetida-powder/img-1.jpg"
	},
	"/products/50g-gluten-free-asafoetida-powder/img-3.jpg": {
		"type": "image/jpeg",
		"etag": "\"3c9b1-Y0JAWxVMMxM3/nMWAqxWdj41zc0\"",
		"mtime": "2026-09-09T05:25:31.338Z",
		"size": 248241,
		"path": "../public/products/50g-gluten-free-asafoetida-powder/img-3.jpg"
	},
	"/products/50g-gold-asafoetida-powder/img-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"3ff2c-NhXfSURTxWAPaE/vB1IY/2pWTY0\"",
		"mtime": "2026-09-09T05:25:31.351Z",
		"size": 261932,
		"path": "../public/products/50g-gold-asafoetida-powder/img-2.jpg"
	},
	"/products/50g-gluten-free-asafoetida-powder/img-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"39186-7aKllXwWl3d9G9R6Ci5pQzipWig\"",
		"mtime": "2026-09-09T05:25:31.335Z",
		"size": 233862,
		"path": "../public/products/50g-gluten-free-asafoetida-powder/img-2.jpg"
	},
	"/products/50g-gold-asafoetida-powder/img-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"40ee8-5JzmYEQFAsrwBrG6y/5n4c5Hf6E\"",
		"mtime": "2026-09-09T05:25:31.348Z",
		"size": 265960,
		"path": "../public/products/50g-gold-asafoetida-powder/img-1.jpg"
	},
	"/products/50g-gold-asafoetida-powder/img-3.jpg": {
		"type": "image/jpeg",
		"etag": "\"42840-YVBlv14H1Ippcp5I9LttI+gP0t4\"",
		"mtime": "2026-09-09T05:25:31.355Z",
		"size": 272448,
		"path": "../public/products/50g-gold-asafoetida-powder/img-3.jpg"
	},
	"/products/50g-gold-asafoetida-powder/img-4.jpg": {
		"type": "image/jpeg",
		"etag": "\"3c341-ZEQbR4YseO/f53czZ2kjDJrHxww\"",
		"mtime": "2026-09-09T05:25:31.358Z",
		"size": 246593,
		"path": "../public/products/50g-gold-asafoetida-powder/img-4.jpg"
	},
	"/products/50g-premium-asafoetida-powder/img-3.jpg": {
		"type": "image/jpeg",
		"etag": "\"46a79-VhsDLUxq/xpl4hGhDKcIeQXHjJA\"",
		"mtime": "2026-09-09T05:25:31.370Z",
		"size": 289401,
		"path": "../public/products/50g-premium-asafoetida-powder/img-3.jpg"
	},
	"/products/all-product/img-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"40df4-ydaHxyRtlr1bqKIElCYpKjdh9AU\"",
		"mtime": "2026-09-09T05:25:31.384Z",
		"size": 265716,
		"path": "../public/products/all-product/img-2.jpg"
	},
	"/products/50g-gluten-free-asafoetida-powder/img-4.jpg": {
		"type": "image/jpeg",
		"etag": "\"3c875-fJ1l84P1DT2lKx2277Ro31TwySI\"",
		"mtime": "2026-09-09T05:25:31.344Z",
		"size": 247925,
		"path": "../public/products/50g-gluten-free-asafoetida-powder/img-4.jpg"
	},
	"/products/50g-premium-asafoetida-powder/img-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"48174-bFQ/JNkYMwdmGzmgOrNV4aL/fXE\"",
		"mtime": "2026-09-09T05:25:31.362Z",
		"size": 295284,
		"path": "../public/products/50g-premium-asafoetida-powder/img-1.jpg"
	},
	"/products/all-product/img-3.jpg": {
		"type": "image/jpeg",
		"etag": "\"45f60-u/6NSGRpzP/LYWriVX+3nmEqAvU\"",
		"mtime": "2026-09-09T05:25:31.387Z",
		"size": 286560,
		"path": "../public/products/all-product/img-3.jpg"
	},
	"/products/50g-premium-asafoetida-powder/img-4.jpg": {
		"type": "image/jpeg",
		"etag": "\"461de-oIQFwonG/rOA0WYiRAnVFv/d8ZY\"",
		"mtime": "2026-09-09T05:25:31.376Z",
		"size": 287198,
		"path": "../public/products/50g-premium-asafoetida-powder/img-4.jpg"
	},
	"/products/50g-premium-asafoetida-powder/img-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"468f0-fyK6MhSCmjYO27ssA5hPXdyGH2g\"",
		"mtime": "2026-09-09T05:25:31.365Z",
		"size": 289008,
		"path": "../public/products/50g-premium-asafoetida-powder/img-2.jpg"
	},
	"/products/all-product/img-5.jpg": {
		"type": "image/jpeg",
		"etag": "\"4e418-Myg9ltCscn/3hL2AuRCudtuTZIQ\"",
		"mtime": "2026-09-09T05:25:31.394Z",
		"size": 320536,
		"path": "../public/products/all-product/img-5.jpg"
	},
	"/products/all-product/img-4.jpg": {
		"type": "image/jpeg",
		"etag": "\"51b45-aSmJ6mod5f9ubYGyVxg9vO41IsY\"",
		"mtime": "2026-09-09T05:25:31.391Z",
		"size": 334661,
		"path": "../public/products/all-product/img-4.jpg"
	},
	"/products/all-product/img-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"4832f-qGxJ0DZlcK3Ojb6XTl+ZipnBQ1s\"",
		"mtime": "2026-09-09T05:25:31.381Z",
		"size": 295727,
		"path": "../public/products/all-product/img-1.jpg"
	},
	"/products/all-product/img-8.jpg": {
		"type": "image/jpeg",
		"etag": "\"670fe-ohMpyhnYx0iLjsSAIdHhgkUD0Qk\"",
		"mtime": "2026-09-09T05:25:31.406Z",
		"size": 422142,
		"path": "../public/products/all-product/img-8.jpg"
	},
	"/products/all-product/img-9.jpg": {
		"type": "image/jpeg",
		"etag": "\"44296-qDFmf5VtsAqjAkdGYCsc7h6QWBM\"",
		"mtime": "2026-09-09T05:25:31.410Z",
		"size": 279190,
		"path": "../public/products/all-product/img-9.jpg"
	},
	"/products/all-product/img-6.jpg": {
		"type": "image/jpeg",
		"etag": "\"70fba-qU6YUikaOYk91SXfrPjalcpgJ3U\"",
		"mtime": "2026-09-09T05:25:31.398Z",
		"size": 462778,
		"path": "../public/products/all-product/img-6.jpg"
	},
	"/products/all-product/img-7.jpg": {
		"type": "image/jpeg",
		"etag": "\"5d2d8-GOkbvqHLdDhqFgBfQgMAXhHrnbw\"",
		"mtime": "2026-09-09T05:25:31.403Z",
		"size": 381656,
		"path": "../public/products/all-product/img-7.jpg"
	},
	"/products/black-sesame-seeds/img-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"506ac-dTVSnqWb/uJ2SLYKYkbu3UD7IP4\"",
		"mtime": "2026-09-09T05:25:31.417Z",
		"size": 329388,
		"path": "../public/products/black-sesame-seeds/img-2.jpg"
	},
	"/products/black-sesame-seeds/img-3.jpg": {
		"type": "image/jpeg",
		"etag": "\"5e071-EgJnT5N6N20dujLCzTtqGzUy2ME\"",
		"mtime": "2026-09-09T05:25:31.421Z",
		"size": 385137,
		"path": "../public/products/black-sesame-seeds/img-3.jpg"
	},
	"/products/black-sesame-seeds/img-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"581c5-CxoSsCsJw/3aN1cREACWPpxeXOY\"",
		"mtime": "2026-09-09T05:25:31.413Z",
		"size": 360901,
		"path": "../public/products/black-sesame-seeds/img-1.jpg"
	},
	"/products/bottle-jar/img-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"5c525-tkorcAlQlF8YmeO8eJONqJou06A\"",
		"mtime": "2026-09-09T05:25:31.431Z",
		"size": 378149,
		"path": "../public/products/bottle-jar/img-1.jpg"
	},
	"/products/black-sesame-seeds/img-4.jpg": {
		"type": "image/jpeg",
		"etag": "\"4fd86-WaBr2aEgLFBsltt6I6afldaggOg\"",
		"mtime": "2026-09-09T05:25:31.424Z",
		"size": 327046,
		"path": "../public/products/black-sesame-seeds/img-4.jpg"
	},
	"/products/bottle-jar/img-3.jpg": {
		"type": "image/jpeg",
		"etag": "\"5ac48-6c+jFf8UxUBmV3O/D+FTvgtavAY\"",
		"mtime": "2026-09-09T05:25:31.437Z",
		"size": 371784,
		"path": "../public/products/bottle-jar/img-3.jpg"
	},
	"/products/bottle-jar/img-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"4bea6-ctZ0vyNvqx27yfRUinlwkPBkdoA\"",
		"mtime": "2026-09-09T05:25:31.433Z",
		"size": 310950,
		"path": "../public/products/bottle-jar/img-2.jpg"
	},
	"/products/bottle-jar/img-5.jpg": {
		"type": "image/jpeg",
		"etag": "\"5ea2a-vh5l2UWhj3eQzYlDpW6ckEVMLmE\"",
		"mtime": "2026-09-09T05:25:31.445Z",
		"size": 387626,
		"path": "../public/products/bottle-jar/img-5.jpg"
	},
	"/products/bottle-jar/img-4.jpg": {
		"type": "image/jpeg",
		"etag": "\"46d12-wWfe80keBJSdIr1zj6ivkufLWcM\"",
		"mtime": "2026-09-09T05:25:31.441Z",
		"size": 290066,
		"path": "../public/products/bottle-jar/img-4.jpg"
	},
	"/products/hing/img-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"397de-j5g4DjcC5JX4l2BJYNAS1EtgP7I\"",
		"mtime": "2026-09-09T05:25:31.477Z",
		"size": 235486,
		"path": "../public/products/hing/img-2.jpg"
	},
	"/products/hing/img-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"38333-IfPxyPzpLZbk0gYZCZDnxQ/XvrU\"",
		"mtime": "2026-09-09T05:25:31.475Z",
		"size": 230195,
		"path": "../public/products/hing/img-1.jpg"
	},
	"/products/hing/img-3.jpg": {
		"type": "image/jpeg",
		"etag": "\"3c032-wZ3OU9J/pzKmaIMghWXlbnOAIGo\"",
		"mtime": "2026-09-09T05:25:31.480Z",
		"size": 245810,
		"path": "../public/products/hing/img-3.jpg"
	},
	"/products/hing/img-4.jpg": {
		"type": "image/jpeg",
		"etag": "\"3a709-fqld1y/MNoufGqX803BSo9VMu1M\"",
		"mtime": "2026-09-09T05:25:31.484Z",
		"size": 239369,
		"path": "../public/products/hing/img-4.jpg"
	},
	"/products/hing/img-5.jpg": {
		"type": "image/jpeg",
		"etag": "\"41f59-diElF2bGkacRPtS0X+A4sByKfKE\"",
		"mtime": "2026-09-09T05:25:31.488Z",
		"size": 270169,
		"path": "../public/products/hing/img-5.jpg"
	},
	"/products/hing/img-6.jpg": {
		"type": "image/jpeg",
		"etag": "\"2b9af-HACLKv2qOr7M42o7NtgZJhvHi0U\"",
		"mtime": "2026-09-09T05:25:31.490Z",
		"size": 178607,
		"path": "../public/products/hing/img-6.jpg"
	},
	"/products/hing-chips/img-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"485e2-PEH1AMfKA1aSOOqWm5zVAmZm1tE\"",
		"mtime": "2026-09-09T05:25:31.451Z",
		"size": 296418,
		"path": "../public/products/hing-chips/img-1.jpg"
	},
	"/products/hing-chips/img-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"41572-EY08dvdnMcMdAw2qO4ob5yWKRpY\"",
		"mtime": "2026-09-09T05:25:31.454Z",
		"size": 267634,
		"path": "../public/products/hing-chips/img-2.jpg"
	},
	"/products/hing-pellets/img-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"6c226-Qs0lN2z5VR/CKixzdzrxMHB6HEw\"",
		"mtime": "2026-09-09T05:25:31.459Z",
		"size": 442918,
		"path": "../public/products/hing-pellets/img-1.jpg"
	},
	"/products/hing-pellets/img-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"6f30e-mAClqfvgDFREpPvO2kDUbnWuSl8\"",
		"mtime": "2026-09-09T05:25:31.465Z",
		"size": 455438,
		"path": "../public/products/hing-pellets/img-2.jpg"
	},
	"/products/hing-pellets/img-3.jpg": {
		"type": "image/jpeg",
		"etag": "\"38013-8j5b5l2+OI9oRvipmkSVEhiUYtQ\"",
		"mtime": "2026-09-09T05:25:31.467Z",
		"size": 229395,
		"path": "../public/products/hing-pellets/img-3.jpg"
	},
	"/products/hing-pellets/img-5.jpg": {
		"type": "image/jpeg",
		"etag": "\"20099-4CyNeARHukNXb+Mc7ZA72VhZno4\"",
		"mtime": "2026-09-09T05:25:31.471Z",
		"size": 131225,
		"path": "../public/products/hing-pellets/img-5.jpg"
	},
	"/products/hing-pellets/img-4.jpg": {
		"type": "image/jpeg",
		"etag": "\"28c2d-xPJq2krVT8PO+bPfCDdzfViZclk\"",
		"mtime": "2026-09-09T05:25:31.469Z",
		"size": 166957,
		"path": "../public/products/hing-pellets/img-4.jpg"
	},
	"/products/millet-pongal-mix/img-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"352a3-DiPUm8KNPOPu9NBxkkoJqLPzZsA\"",
		"mtime": "2026-09-09T05:25:31.492Z",
		"size": 217763,
		"path": "../public/products/millet-pongal-mix/img-1.jpg"
	},
	"/products/millet-pongal-mix/img-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"3d61e-dyHLNzZkB5hAB+at+wwDtx1nljQ\"",
		"mtime": "2026-09-09T05:25:31.495Z",
		"size": 251422,
		"path": "../public/products/millet-pongal-mix/img-2.jpg"
	},
	"/products/millet-sambar-mix/img-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"407b2-DGpgPAUY8G1tZQkTAForAwbJwtg\"",
		"mtime": "2026-09-09T05:25:31.500Z",
		"size": 264114,
		"path": "../public/products/millet-sambar-mix/img-2.jpg"
	},
	"/products/millet-sambar-mix/img-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"37cfd-6Tk+cPsVsIb5w/J6g8Z0flkVAwA\"",
		"mtime": "2026-09-09T05:25:31.498Z",
		"size": 228605,
		"path": "../public/products/millet-sambar-mix/img-1.jpg"
	},
	"/products/pure-benzoin-sambrani/img-1.png": {
		"type": "image/png",
		"etag": "\"37ec0-iFgu0AnFiHawbyrq6G7XaJVGpec\"",
		"mtime": "2026-09-09T05:25:31.504Z",
		"size": 229056,
		"path": "../public/products/pure-benzoin-sambrani/img-1.png"
	},
	"/products/pure-benzoin-sambrani/img-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"243aa-E8YGWbp1G9V9rTc9T4jZZ3jdvXI\"",
		"mtime": "2026-09-09T05:25:31.507Z",
		"size": 148394,
		"path": "../public/products/pure-benzoin-sambrani/img-2.jpg"
	},
	"/products/pure-benzoin-sambrani/img-3.jpg": {
		"type": "image/jpeg",
		"etag": "\"27c45-tezhUyCwL5u4q2rzsDEay6z6GXo\"",
		"mtime": "2026-09-09T05:25:31.510Z",
		"size": 162885,
		"path": "../public/products/pure-benzoin-sambrani/img-3.jpg"
	},
	"/products/pure-benzoin-sambrani/img-4.jpg": {
		"type": "image/jpeg",
		"etag": "\"32be7-rSv7UhSxWsHuZ5p5vCKR2xIY1k4\"",
		"mtime": "2026-09-09T05:25:31.512Z",
		"size": 207847,
		"path": "../public/products/pure-benzoin-sambrani/img-4.jpg"
	},
	"/products/traditional-health-mix/img-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"5b333-pd3VeW6KQ5N9oNoWVAKSYljoFJI\"",
		"mtime": "2026-09-09T05:25:31.520Z",
		"size": 373555,
		"path": "../public/products/traditional-health-mix/img-2.jpg"
	},
	"/products/traditional-health-mix/img-3.jpg": {
		"type": "image/jpeg",
		"etag": "\"5b333-pd3VeW6KQ5N9oNoWVAKSYljoFJI\"",
		"mtime": "2026-09-09T05:25:31.524Z",
		"size": 373555,
		"path": "../public/products/traditional-health-mix/img-3.jpg"
	},
	"/products/traditional-health-mix/img-4.jpg": {
		"type": "image/jpeg",
		"etag": "\"19871-xuA0fjYaDmD39I0adPnhpDDb07Q\"",
		"mtime": "2026-09-09T05:25:31.526Z",
		"size": 104561,
		"path": "../public/products/traditional-health-mix/img-4.jpg"
	},
	"/products/traditional-health-mix/img-5.jpg": {
		"type": "image/jpeg",
		"etag": "\"19279-b7QjF59AM7o1lv/etXiKKB9uOzE\"",
		"mtime": "2026-09-09T05:25:31.529Z",
		"size": 103033,
		"path": "../public/products/traditional-health-mix/img-5.jpg"
	},
	"/products/traditional-health-mix/img-6.jpg": {
		"type": "image/jpeg",
		"etag": "\"32253-Ol+HKfmJg6SukBOgJESUc1F4td4\"",
		"mtime": "2026-09-09T05:25:31.532Z",
		"size": 205395,
		"path": "../public/products/traditional-health-mix/img-6.jpg"
	},
	"/products/traditional-health-mix/img-7.jpg": {
		"type": "image/jpeg",
		"etag": "\"36bbc-BJ4zLr4B9q2bM0vBlDusoLPFcKI\"",
		"mtime": "2026-09-09T05:25:31.536Z",
		"size": 224188,
		"path": "../public/products/traditional-health-mix/img-7.jpg"
	},
	"/products/traditional-idli-podi/img-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"49741-oaKJsfbhCqNH8DO2qWNntrxhTEc\"",
		"mtime": "2026-09-09T05:25:31.539Z",
		"size": 300865,
		"path": "../public/products/traditional-idli-podi/img-2.jpg"
	},
	"/products/traditional-idli-podi/img-3.jpg": {
		"type": "image/jpeg",
		"etag": "\"52891-By6rnjeYaDHTAYbVKwEwYeYA9S0\"",
		"mtime": "2026-09-09T05:25:31.549Z",
		"size": 338065,
		"path": "../public/products/traditional-idli-podi/img-3.jpg"
	},
	"/products/traditional-idli-podi/img-4.jpg": {
		"type": "image/jpeg",
		"etag": "\"473d9-kAjjbhP1xV9jJmFdiPTSuLPzdAU\"",
		"mtime": "2026-09-09T05:25:31.551Z",
		"size": 291801,
		"path": "../public/products/traditional-idli-podi/img-4.jpg"
	},
	"/products/traditional-health-mix/img-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"5071b-Q+uvJfbA+kO7qmVf9mFJFoSmQ1g\"",
		"mtime": "2026-09-09T05:25:31.516Z",
		"size": 329499,
		"path": "../public/products/traditional-health-mix/img-1.jpg"
	},
	"/products/traditional-idli-podi/img-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"549d4-nyhYmG7N+Vv0z6IqCkLUElcJMmo\"",
		"mtime": "2026-09-09T05:25:31.539Z",
		"size": 346580,
		"path": "../public/products/traditional-idli-podi/img-1.jpg"
	}
};
//#endregion
//#region #nitro/virtual/public-assets-node
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path));
}
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/static.mjs
var METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
var EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
	for (const encoding of encodings) for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) {
			event.res.headers.delete("Cache-Control");
			throw new HTTPError({ status: 404 });
		}
		return;
	}
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	if (event.req.headers.get("if-none-match") === asset.etag) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	const ifModifiedSinceH = event.req.headers.get("if-modified-since");
	const mtimeDate = new Date(asset.mtime);
	if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	return readAsset(id);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_Sy5Iu1 = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_Sy5Iu1
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
var globalMiddleware = [toEventHandler(static_default)].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~middleware"].push(...globalMiddleware);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		middleware.push(...h3App["~middleware"]);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/hooks.mjs
function _captureError(error, type) {
	console.error(`[${type}]`, error);
	useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
	process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
	process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
//#endregion
//#region #nitro/virtual/tracing
var tracingSrvxPlugins = [];
//#endregion
//#region node_modules/nitro/dist/presets/node/runtime/node-server.mjs
var _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
var port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
var host = process.env.NITRO_HOST || process.env.HOST;
var cert = process.env.NITRO_SSL_CERT;
var key = process.env.NITRO_SSL_KEY;
var nitroApp = useNitroApp();
serve({
	port,
	hostname: host,
	tls: cert && key ? {
		cert,
		key
	} : void 0,
	fetch: nitroApp.fetch,
	plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
var node_server_default = {};
//#endregion
export { node_server_default as default };
