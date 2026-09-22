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
		"mtime": "2026-09-21T06:47:52.130Z",
		"size": 25019,
		"path": "../public/favicon.png"
	},
	"/logo-original.png": {
		"type": "image/png",
		"etag": "\"61bb-YRgf3sjok5YXHMpUlQEAIyY8Ep0\"",
		"mtime": "2026-09-21T06:47:52.465Z",
		"size": 25019,
		"path": "../public/logo-original.png"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"70-O+XYCW1bRlmrWRUd9wLauNYfOcE\"",
		"mtime": "2026-09-21T06:47:53.072Z",
		"size": 112,
		"path": "../public/robots.txt"
	},
	"/logo-tight.png": {
		"type": "image/png",
		"etag": "\"956d-4h6xV/hvgJu/bZlpXjVsUDhvR9A\"",
		"mtime": "2026-09-21T06:47:52.465Z",
		"size": 38253,
		"path": "../public/logo-tight.png"
	},
	"/logo.png": {
		"type": "image/png",
		"etag": "\"956d-4h6xV/hvgJu/bZlpXjVsUDhvR9A\"",
		"mtime": "2026-09-21T06:47:52.465Z",
		"size": 38253,
		"path": "../public/logo.png"
	},
	"/logo-square-prominent.png": {
		"type": "image/png",
		"etag": "\"18a10-fMHGh2fJZtKcpY9w+G6E42eLong\"",
		"mtime": "2026-09-21T06:47:52.465Z",
		"size": 100880,
		"path": "../public/logo-square-prominent.png"
	},
	"/sitemap.xml": {
		"type": "application/xml",
		"etag": "\"1243-q0VD+oLW2IpXRQL8qDpWvx2i6e4\"",
		"mtime": "2026-09-21T06:47:53.072Z",
		"size": 4675,
		"path": "../public/sitemap.xml"
	},
	"/images/heritage-compounding-1931.jpg": {
		"type": "image/jpeg",
		"etag": "\"f4ca6-i8DhO69y97ReqSW5LwL0TrWNPZg\"",
		"mtime": "2026-09-21T06:47:52.331Z",
		"size": 1002662,
		"path": "../public/images/heritage-compounding-1931.jpg"
	},
	"/images/story-1-shop-1932.jpg": {
		"type": "image/jpeg",
		"etag": "\"ea009-vbS35YmqOWJAL0pLKwPInIEicYk\"",
		"mtime": "2026-09-21T06:47:52.397Z",
		"size": 958473,
		"path": "../public/images/story-1-shop-1932.jpg"
	},
	"/images/story-2-kitchen-colorful.jpg": {
		"type": "image/jpeg",
		"etag": "\"de330-JVrWpNCoD36pAsK6ukfQ5oalR1A\"",
		"mtime": "2026-09-21T06:47:52.411Z",
		"size": 910128,
		"path": "../public/images/story-2-kitchen-colorful.jpg"
	},
	"/images/story-chapter-3-sachet.jpg": {
		"type": "image/jpeg",
		"etag": "\"e535b-QfWvBAJX68gHuKaIF3Ri40veNUc\"",
		"mtime": "2026-09-21T06:47:52.411Z",
		"size": 938843,
		"path": "../public/images/story-chapter-3-sachet.jpg"
	},
	"/images/story-3-modern-colorful.jpg": {
		"type": "image/jpeg",
		"etag": "\"d60f2-Dc3feQZKwj+ayEfpDSG9HefrBYU\"",
		"mtime": "2026-09-21T06:47:52.411Z",
		"size": 876786,
		"path": "../public/images/story-3-modern-colorful.jpg"
	},
	"/images/story-chapter-5-health-mix.jpg": {
		"type": "image/jpeg",
		"etag": "\"dc83e-xZXBaZdJnQzSUYnlu6o8T0ZK20U\"",
		"mtime": "2026-09-21T06:47:52.428Z",
		"size": 903230,
		"path": "../public/images/story-chapter-5-health-mix.jpg"
	},
	"/images/story-chapter-7-ready-to-cook.jpg": {
		"type": "image/jpeg",
		"etag": "\"cf704-TfJDd8Ja5XJMmKLPRFIB9D4bT2A\"",
		"mtime": "2026-09-21T06:47:52.438Z",
		"size": 849668,
		"path": "../public/images/story-chapter-7-ready-to-cook.jpg"
	},
	"/images/story-1-shop-colorful.jpg": {
		"type": "image/jpeg",
		"etag": "\"ded08-ytv/R0gB+6lyl8DuMsHHlhsyeko\"",
		"mtime": "2026-09-21T06:47:52.397Z",
		"size": 912648,
		"path": "../public/images/story-1-shop-colorful.jpg"
	},
	"/images/story-chapter-6-vismaya-podis.jpg": {
		"type": "image/jpeg",
		"etag": "\"e7109-UWbbosL02gYGKI3iUuVIEBLjfzI\"",
		"mtime": "2026-09-21T06:47:52.432Z",
		"size": 946441,
		"path": "../public/images/story-chapter-6-vismaya-podis.jpg"
	},
	"/hero-video-craft.mp4": {
		"type": "video/mp4",
		"etag": "\"1dd8d8-36G6bJART3pcf11CPoBusVCJDYw\"",
		"mtime": "2026-09-21T06:47:52.143Z",
		"size": 1956056,
		"path": "../public/hero-video-craft.mp4"
	},
	"/hero-video-tradition.mp4": {
		"type": "video/mp4",
		"etag": "\"1f7684-YnffQQi8aGrZPF6kbxWIcCLtRzo\"",
		"mtime": "2026-09-21T06:47:52.272Z",
		"size": 2061956,
		"path": "../public/hero-video-tradition.mp4"
	},
	"/hero-video-purity.mp4": {
		"type": "video/mp4",
		"etag": "\"1c3471-FuLHWR5BOq32W6V5ogC3R7C2wb0\"",
		"mtime": "2026-09-21T06:47:52.244Z",
		"size": 1848433,
		"path": "../public/hero-video-purity.mp4"
	},
	"/assets/accordion-BGDr77v6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c19-3V9VIIbcuJCCpA/LKw4Pro4U0ao\"",
		"mtime": "2026-09-21T07:16:44.222Z",
		"size": 7193,
		"path": "../public/assets/accordion-BGDr77v6.js"
	},
	"/assets/account-CwSNSWlC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2508-xUXAbxyKDyRs3aVrK4jbjQTebhk\"",
		"mtime": "2026-09-21T07:16:44.222Z",
		"size": 9480,
		"path": "../public/assets/account-CwSNSWlC.js"
	},
	"/assets/admin-CZzsLPdB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"722-XLzPAPoOWVpQKg3Sz7JUujqJqPI\"",
		"mtime": "2026-09-21T07:16:44.222Z",
		"size": 1826,
		"path": "../public/assets/admin-CZzsLPdB.js"
	},
	"/assets/admin-DbQJv4OH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1fa27-ccuOkE7n46IVTyHdqynQ7FYSu7A\"",
		"mtime": "2026-09-21T07:16:44.222Z",
		"size": 129575,
		"path": "../public/assets/admin-DbQJv4OH.js"
	},
	"/assets/BackInStockDialog-7GZ0EYWT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"81a-+uY8oO1YHEwNcxHPhan9DK2FLEY\"",
		"mtime": "2026-09-21T07:16:44.220Z",
		"size": 2074,
		"path": "../public/assets/BackInStockDialog-7GZ0EYWT.js"
	},
	"/assets/bell-ring-Bs7HZ_LF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18d-PtIVJIffFX02g0JlAMS3/HSSK/w\"",
		"mtime": "2026-09-21T07:16:44.222Z",
		"size": 397,
		"path": "../public/assets/bell-ring-Bs7HZ_LF.js"
	},
	"/assets/BackToTop-BnkkCiZ4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"392-b9WVd0tZisH2dx/J7PwHMQ9FfFQ\"",
		"mtime": "2026-09-21T07:16:44.220Z",
		"size": 914,
		"path": "../public/assets/BackToTop-BnkkCiZ4.js"
	},
	"/assets/building-2-DW8rJ0te.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17f-l6GieKsUJtfNXG3ws13zq38N+3s\"",
		"mtime": "2026-09-21T07:16:44.222Z",
		"size": 383,
		"path": "../public/assets/building-2-DW8rJ0te.js"
	},
	"/hero-video-slide2.mp4": {
		"type": "video/mp4",
		"etag": "\"2e5c3f-hA63w8pz3VDSRfOniLKuQodoApo\"",
		"mtime": "2026-09-21T06:47:52.251Z",
		"size": 3038271,
		"path": "../public/hero-video-slide2.mp4"
	},
	"/assets/button-CO14z1Xx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1294-CnKoGjwYGIu4aIqM2F+TJqz0W9I\"",
		"mtime": "2026-09-21T07:16:44.222Z",
		"size": 4756,
		"path": "../public/assets/button-CO14z1Xx.js"
	},
	"/assets/chevron-left-DRqxBXhO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"82-EtqFzVb0Sr/lXz/iUYRU2gxNFfI\"",
		"mtime": "2026-09-21T07:16:44.226Z",
		"size": 130,
		"path": "../public/assets/chevron-left-DRqxBXhO.js"
	},
	"/hero-video-gold.mp4": {
		"type": "video/mp4",
		"etag": "\"2843e1-WIUn1+uNEqHYfFi2NoXuyoFG9AI\"",
		"mtime": "2026-09-21T06:47:52.171Z",
		"size": 2638817,
		"path": "../public/hero-video-gold.mp4"
	},
	"/assets/clock-CBB2sXtE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a9-AmXsTjNDAW0JFq9iXFcHcyRrTi0\"",
		"mtime": "2026-09-21T07:16:44.227Z",
		"size": 169,
		"path": "../public/assets/clock-CBB2sXtE.js"
	},
	"/assets/checkout-BcyZCUxP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"84cb-RJmidprrHZAdLZgquRGf+tkmAKo\"",
		"mtime": "2026-09-21T07:16:44.226Z",
		"size": 33995,
		"path": "../public/assets/checkout-BcyZCUxP.js"
	},
	"/hero-video-master.mp4": {
		"type": "video/mp4",
		"etag": "\"2db110-nmXMhfO749DxxSrLZBp28FxPO4E\"",
		"mtime": "2026-09-21T06:47:52.241Z",
		"size": 2994448,
		"path": "../public/hero-video-master.mp4"
	},
	"/hero-video.mp4": {
		"type": "video/mp4",
		"etag": "\"2db110-nmXMhfO749DxxSrLZBp28FxPO4E\"",
		"mtime": "2026-09-21T06:47:52.281Z",
		"size": 2994448,
		"path": "../public/hero-video.mp4"
	},
	"/images/story-hero-harvest.jpg": {
		"type": "image/jpeg",
		"etag": "\"10a19b-5gSEFDqX1XsufvrSLsZGbnz7O5I\"",
		"mtime": "2026-09-21T06:47:52.444Z",
		"size": 1089947,
		"path": "../public/images/story-hero-harvest.jpg"
	},
	"/assets/circle-check-CS3zbjBG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b2-EvtD/PgN6E7zkQag1kpGyYvkUKk\"",
		"mtime": "2026-09-21T07:16:44.227Z",
		"size": 178,
		"path": "../public/assets/circle-check-CS3zbjBG.js"
	},
	"/images/story-temple-skyline.jpg": {
		"type": "image/jpeg",
		"etag": "\"1223cf-l1Pt+/UG0/2pGCRqHlTezz35Hn4\"",
		"mtime": "2026-09-21T06:47:52.465Z",
		"size": 1188815,
		"path": "../public/images/story-temple-skyline.jpg"
	},
	"/assets/copy-SuZAp0Hk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec-MJNbUGSKBw6ZN3W8TTr0QStuHIo\"",
		"mtime": "2026-09-21T07:16:44.228Z",
		"size": 236,
		"path": "../public/assets/copy-SuZAp0Hk.js"
	},
	"/images/story-chapter4-global.jpg": {
		"type": "image/jpeg",
		"etag": "\"102a9d-Det+/6r6KpGA0OdJ9VC6V2uMiNM\"",
		"mtime": "2026-09-21T06:47:52.444Z",
		"size": 1059485,
		"path": "../public/images/story-chapter4-global.jpg"
	},
	"/assets/createLucideIcon-CEGepnBf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ab-9w7034WUPiHI10TPGK6P975saJ0\"",
		"mtime": "2026-09-21T07:16:44.229Z",
		"size": 1195,
		"path": "../public/assets/createLucideIcon-CEGepnBf.js"
	},
	"/assets/contact-4GWvL7vq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"365e-3pmHTosjj4dehdhSz053r3S+mhk\"",
		"mtime": "2026-09-21T07:16:44.227Z",
		"size": 13918,
		"path": "../public/assets/contact-4GWvL7vq.js"
	},
	"/assets/custom-branding-DuIWAvXY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6025-mRbsqVeRxfpjelq1iDeWir9FUgI\"",
		"mtime": "2026-09-21T07:16:44.229Z",
		"size": 24613,
		"path": "../public/assets/custom-branding-DuIWAvXY.js"
	},
	"/assets/dist-B5Jdlbee.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c9a-Rz5kkVj4ZOdYOl60QeZgVIU8/gs\"",
		"mtime": "2026-09-21T07:16:44.229Z",
		"size": 7322,
		"path": "../public/assets/dist-B5Jdlbee.js"
	},
	"/hero-video-factory.mp4": {
		"type": "video/mp4",
		"etag": "\"3c2ef6-d8vkzUvVmULDyga5uRpZUr5arUk\"",
		"mtime": "2026-09-21T06:47:52.162Z",
		"size": 3944182,
		"path": "../public/hero-video-factory.mp4"
	},
	"/assets/dist-BMcmO1Xs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27f-V691lD0d6WEDoPQNZVEoBHsGtRY\"",
		"mtime": "2026-09-21T07:16:44.229Z",
		"size": 639,
		"path": "../public/assets/dist-BMcmO1Xs.js"
	},
	"/assets/dist-B8VRfzhC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"124-+V4gD09ei5wvSgFUFcR7lYKrTMQ\"",
		"mtime": "2026-09-21T07:16:44.229Z",
		"size": 292,
		"path": "../public/assets/dist-B8VRfzhC.js"
	},
	"/assets/dist-C2ukIMyp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1372-IAj3SGHgd5QOr3G8TizJzvYM6A0\"",
		"mtime": "2026-09-21T07:16:44.229Z",
		"size": 4978,
		"path": "../public/assets/dist-C2ukIMyp.js"
	},
	"/assets/dist-Dp-9mSMf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c5-xQKAYlOi184bZ9IQNbSBgi3LgL0\"",
		"mtime": "2026-09-21T07:16:44.235Z",
		"size": 709,
		"path": "../public/assets/dist-Dp-9mSMf.js"
	},
	"/assets/dist-Dh7fpN1L.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c23-YdebqANFwmEpjMRHCDqaH+G1YAo\"",
		"mtime": "2026-09-21T07:16:44.229Z",
		"size": 7203,
		"path": "../public/assets/dist-Dh7fpN1L.js"
	},
	"/assets/earth-DcV1T3GX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"189-Oize2vLMpr7PD/VagoDr8caTmzs\"",
		"mtime": "2026-09-21T07:16:44.260Z",
		"size": 393,
		"path": "../public/assets/earth-DcV1T3GX.js"
	},
	"/assets/eye-CVjNKSD9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"100-Y15rbr1yf39dFSuFKA9LMlDamew\"",
		"mtime": "2026-09-21T07:16:44.260Z",
		"size": 256,
		"path": "../public/assets/eye-CVjNKSD9.js"
	},
	"/assets/exports-H5r9lvNB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"85f9-4OfA+lNtCVMQoabUt6RkWt31cL8\"",
		"mtime": "2026-09-21T07:16:44.260Z",
		"size": 34297,
		"path": "../public/assets/exports-H5r9lvNB.js"
	},
	"/assets/factory-CLvrXlOG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"197-uDsF23RZaOg8+/dQrknz5n2X5Gk\"",
		"mtime": "2026-09-21T07:16:44.260Z",
		"size": 407,
		"path": "../public/assets/factory-CLvrXlOG.js"
	},
	"/assets/gift-DXbsztMH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15d-MgOnAeWRBiDhgLhXZvWumhbjfUk\"",
		"mtime": "2026-09-21T07:16:44.260Z",
		"size": 349,
		"path": "../public/assets/gift-DXbsztMH.js"
	},
	"/assets/faq-BwktGla7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1eef-6TQfMKm29TMvXFUBj/bhIELLAd8\"",
		"mtime": "2026-09-21T07:16:44.260Z",
		"size": 7919,
		"path": "../public/assets/faq-BwktGla7.js"
	},
	"/assets/FaqBot-BeNOcrNP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1659-zPvrnutRJRDBunEbqP+B+beRudY\"",
		"mtime": "2026-09-21T07:16:44.221Z",
		"size": 5721,
		"path": "../public/assets/FaqBot-BeNOcrNP.js"
	},
	"/assets/input-CZ0LoQ2z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ae-fxJAq5m4z/+vQP+gYPeCw8vLgDI\"",
		"mtime": "2026-09-21T07:16:44.260Z",
		"size": 686,
		"path": "../public/assets/input-CZ0LoQ2z.js"
	},
	"/assets/index-VSbXtr7p.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7fcc1-4BnurDoq8iKpxusgeTKv9vHsII8\"",
		"mtime": "2026-09-21T07:16:44.220Z",
		"size": 523457,
		"path": "../public/assets/index-VSbXtr7p.js"
	},
	"/assets/label-Df8lcjLx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2cf-56ygiIRkZ0xINhXI8eoFgLa5pfE\"",
		"mtime": "2026-09-21T07:16:44.260Z",
		"size": 719,
		"path": "../public/assets/label-Df8lcjLx.js"
	},
	"/assets/jsx-runtime-Cltr0gcK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20ee-ObwGPj96dlkL76iVLbX2wLAXzuw\"",
		"mtime": "2026-09-21T07:16:44.260Z",
		"size": 8430,
		"path": "../public/assets/jsx-runtime-Cltr0gcK.js"
	},
	"/assets/loader-circle-LmZjNfAe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"90-sJcskFe9MqqdeLTvIyYy3gYFP80\"",
		"mtime": "2026-09-21T07:16:44.268Z",
		"size": 144,
		"path": "../public/assets/loader-circle-LmZjNfAe.js"
	},
	"/assets/message-square-BObk0GEm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e9-lrcQf1ueT8UPwwhX+NqfZmuCr+w\"",
		"mtime": "2026-09-21T07:16:44.268Z",
		"size": 233,
		"path": "../public/assets/message-square-BObk0GEm.js"
	},
	"/assets/not-found-i5RsCZif.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76-Trmr7GZIBZuvfg4uM18tBiRtOXg\"",
		"mtime": "2026-09-21T07:16:44.268Z",
		"size": 118,
		"path": "../public/assets/not-found-i5RsCZif.js"
	},
	"/assets/link-Cma-646Q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b49-Do0EBq6zeqsfR6yuZjqQZdWs/I4\"",
		"mtime": "2026-09-21T07:16:44.260Z",
		"size": 23369,
		"path": "../public/assets/link-Cma-646Q.js"
	},
	"/assets/order-confirmed-CAwLEU1t.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20e7-GVlW+gvCJig7hQ5+CFZa+smLEwo\"",
		"mtime": "2026-09-21T07:16:44.268Z",
		"size": 8423,
		"path": "../public/assets/order-confirmed-CAwLEU1t.js"
	},
	"/assets/pencil-IGC2IzqV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"114-fBEllGDW7g+tE5/qVevVBW1zY90\"",
		"mtime": "2026-09-21T07:16:44.357Z",
		"size": 276,
		"path": "../public/assets/pencil-IGC2IzqV.js"
	},
	"/assets/order._id-B5XTP1dJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"233f-rfAEZUpaF5zojjJCFbuX7bbog8Q\"",
		"mtime": "2026-09-21T07:16:44.268Z",
		"size": 9023,
		"path": "../public/assets/order._id-B5XTP1dJ.js"
	},
	"/assets/OrderResolutionDialog-DOzwqSOW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27d2-H0/QsEld5qh3qOWTkb111wCZoxU\"",
		"mtime": "2026-09-21T07:16:44.221Z",
		"size": 10194,
		"path": "../public/assets/OrderResolutionDialog-DOzwqSOW.js"
	},
	"/assets/policies._slug-lY_ZQqF_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a16-H2Cc8WeIp2Py9j/USs0WKD9BZmg\"",
		"mtime": "2026-09-21T07:16:44.365Z",
		"size": 2582,
		"path": "../public/assets/policies._slug-lY_ZQqF_.js"
	},
	"/assets/pincode.functions-CCm_cg8Y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c9-nUGWmC9jnEp2z0xYB7w52yBDBfo\"",
		"mtime": "2026-09-21T07:16:44.365Z",
		"size": 713,
		"path": "../public/assets/pincode.functions-CCm_cg8Y.js"
	},
	"/assets/product-cake-400-IyNQ7Qca.webp": {
		"type": "image/webp",
		"etag": "\"231a-XZXTs8DL9WIV0wM06ILR+TyXGyw\"",
		"mtime": "2026-09-21T07:16:44.384Z",
		"size": 8986,
		"path": "../public/assets/product-cake-400-IyNQ7Qca.webp"
	},
	"/assets/product-glutenfree-400-dtzpdwMq.webp": {
		"type": "image/webp",
		"etag": "\"191c-0160DxdXvd1Ez2qyK+5Edn8kPHk\"",
		"mtime": "2026-09-21T07:16:44.384Z",
		"size": 6428,
		"path": "../public/assets/product-glutenfree-400-dtzpdwMq.webp"
	},
	"/assets/product-cake-800-D7p8IG0h.webp": {
		"type": "image/webp",
		"etag": "\"8a9c-FUEv5wy89JF3N/Xi4FPDGq0Oa6A\"",
		"mtime": "2026-09-21T07:16:44.384Z",
		"size": 35484,
		"path": "../public/assets/product-cake-800-D7p8IG0h.webp"
	},
	"/assets/product-glutenfree-800-BRbglSHw.webp": {
		"type": "image/webp",
		"etag": "\"4be2-4ZuVdoh9vc8SIcRNeniPXSXBpG4\"",
		"mtime": "2026-09-21T07:16:44.384Z",
		"size": 19426,
		"path": "../public/assets/product-glutenfree-800-BRbglSHw.webp"
	},
	"/assets/product-granules-800-WWT9xaKD.webp": {
		"type": "image/webp",
		"etag": "\"4c94-ndAVPibr7RpoSMK3WBGSbMGTCM0\"",
		"mtime": "2026-09-21T07:16:44.385Z",
		"size": 19604,
		"path": "../public/assets/product-granules-800-WWT9xaKD.webp"
	},
	"/assets/product-powder-400-BzZ6QhiJ.webp": {
		"type": "image/webp",
		"etag": "\"1484-G3RIQC0/RrkZqXpVf02Q9xEmMns\"",
		"mtime": "2026-09-21T07:16:44.385Z",
		"size": 5252,
		"path": "../public/assets/product-powder-400-BzZ6QhiJ.webp"
	},
	"/assets/ProductQuestions-Dfs8kNsx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1841-n+fwyvYxLHnAukVSwdv6tS2zzaw\"",
		"mtime": "2026-09-21T07:16:44.221Z",
		"size": 6209,
		"path": "../public/assets/ProductQuestions-Dfs8kNsx.js"
	},
	"/assets/ProductCard-ChNC_bXk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1bc9-f7U6y3/h3BZ1Xcz51p/xkiNOpFE\"",
		"mtime": "2026-09-21T07:16:44.221Z",
		"size": 7113,
		"path": "../public/assets/ProductCard-ChNC_bXk.js"
	},
	"/assets/product-powder-800-DcdU81cH.webp": {
		"type": "image/webp",
		"etag": "\"3770-kg0m3WIrBgEFb276hCgR5PeaH1w\"",
		"mtime": "2026-09-21T07:16:44.388Z",
		"size": 14192,
		"path": "../public/assets/product-powder-800-DcdU81cH.webp"
	},
	"/assets/product._slug-CU1_j0Ll.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9117-Pl/F84o9r5N2KW0itChkAItH5lo\"",
		"mtime": "2026-09-21T07:16:44.365Z",
		"size": 37143,
		"path": "../public/assets/product._slug-CU1_j0Ll.js"
	},
	"/assets/QuickViewDialog-BzgQ4hCQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ea9-7Ba9/53QkhwSGyuQOa2Y68nzoH8\"",
		"mtime": "2026-09-21T07:16:44.222Z",
		"size": 3753,
		"path": "../public/assets/QuickViewDialog-BzgQ4hCQ.js"
	},
	"/assets/ProductReviews-DzW3OhAv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37d9-6+ROi4kQG0Ho8lgtioezNdqo4As\"",
		"mtime": "2026-09-21T07:16:44.222Z",
		"size": 14297,
		"path": "../public/assets/ProductReviews-DzW3OhAv.js"
	},
	"/assets/radio-group-CllwGLXR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1899-n9HcKHhHkBeFHZJtMEtxZQJ9o8Q\"",
		"mtime": "2026-09-21T07:16:44.373Z",
		"size": 6297,
		"path": "../public/assets/radio-group-CllwGLXR.js"
	},
	"/assets/product-granules-400-D98wWv4R.webp": {
		"type": "image/webp",
		"etag": "\"1986-pW4Tw+bAfTFuVQjtOVNXaLBbG3M\"",
		"mtime": "2026-09-21T07:16:44.385Z",
		"size": 6534,
		"path": "../public/assets/product-granules-400-D98wWv4R.webp"
	},
	"/assets/react-dom-B-pPXn5B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dda-JJCAW1qCTm6YAIvIVKIVaZC3lTg\"",
		"mtime": "2026-09-21T07:16:44.373Z",
		"size": 3546,
		"path": "../public/assets/react-dom-B-pPXn5B.js"
	},
	"/assets/recently-viewed-XSkcnpQO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"218-WrGU1dgPJ4SPez2M7fIuS3UEq3g\"",
		"mtime": "2026-09-21T07:16:44.373Z",
		"size": 536,
		"path": "../public/assets/recently-viewed-XSkcnpQO.js"
	},
	"/assets/RecentlyViewed-YmTZUoLP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"650-7v484vb5+Q0SsicBzwxSkKUSrGE\"",
		"mtime": "2026-09-21T07:16:44.222Z",
		"size": 1616,
		"path": "../public/assets/RecentlyViewed-YmTZUoLP.js"
	},
	"/assets/routes-LjXWh6fI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5c14-dAnEhcoRNd/IXBq2XueGqx9B/s0\"",
		"mtime": "2026-09-21T07:16:44.373Z",
		"size": 23572,
		"path": "../public/assets/routes-LjXWh6fI.js"
	},
	"/assets/select-C0W0zma1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"baf5-Bze0YnivnoWxqrpU1xha3sqoQ8U\"",
		"mtime": "2026-09-21T07:16:44.373Z",
		"size": 47861,
		"path": "../public/assets/select-C0W0zma1.js"
	},
	"/assets/star-D9BTFXz4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d8-yJsUogwCyH4U2JkxziMpP59lS34\"",
		"mtime": "2026-09-21T07:16:44.373Z",
		"size": 472,
		"path": "../public/assets/star-D9BTFXz4.js"
	},
	"/assets/shop-pz-FFdBU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4521-dSLRd/K2f4pQmNw9ETVL2jVETSI\"",
		"mtime": "2026-09-21T07:16:44.373Z",
		"size": 17697,
		"path": "../public/assets/shop-pz-FFdBU.js"
	},
	"/assets/story-1-shop-1200-KH6P15Oz.webp": {
		"type": "image/webp",
		"etag": "\"2d50c-+x+NV7ahJwD6K2FAnVqBqXzkqnk\"",
		"mtime": "2026-09-21T07:16:44.389Z",
		"size": 185612,
		"path": "../public/assets/story-1-shop-1200-KH6P15Oz.webp"
	},
	"/assets/story-1-shop-900-C1hKWfWP.webp": {
		"type": "image/webp",
		"etag": "\"1c524-wJ5rCMaRqEWBHHJPFRlStv2Bbz4\"",
		"mtime": "2026-09-21T07:16:44.389Z",
		"size": 116004,
		"path": "../public/assets/story-1-shop-900-C1hKWfWP.webp"
	},
	"/assets/story-1-shop-560-C9AOS04y.webp": {
		"type": "image/webp",
		"etag": "\"d3c2-Mg5/P4UXbq5SBypO4cN/MbDdotw\"",
		"mtime": "2026-09-21T07:16:44.389Z",
		"size": 54210,
		"path": "../public/assets/story-1-shop-560-C9AOS04y.webp"
	},
	"/assets/story-2-kitchen-1200-B0XrR51h.webp": {
		"type": "image/webp",
		"etag": "\"3a14e-w3i/7SDu4WeVbSIwWEuZaPVpkt8\"",
		"mtime": "2026-09-21T07:16:44.389Z",
		"size": 237902,
		"path": "../public/assets/story-2-kitchen-1200-B0XrR51h.webp"
	},
	"/assets/story-2-kitchen-560-BwiFpku4.webp": {
		"type": "image/webp",
		"etag": "\"f778-fzVX+5ecgwmKIWcIN6n2HJ4ElJU\"",
		"mtime": "2026-09-21T07:16:44.389Z",
		"size": 63352,
		"path": "../public/assets/story-2-kitchen-560-BwiFpku4.webp"
	},
	"/assets/story-2-kitchen-900-D9xPH5h3.webp": {
		"type": "image/webp",
		"etag": "\"24d44-pFv3Ceyn3Qyk+v4gcbBCsMhbClU\"",
		"mtime": "2026-09-21T07:16:44.389Z",
		"size": 150852,
		"path": "../public/assets/story-2-kitchen-900-D9xPH5h3.webp"
	},
	"/assets/story-3-today-1200-COgTFLEH.webp": {
		"type": "image/webp",
		"etag": "\"3b3e0-IgpgxUNMre1gLuXTJ/BXAXKOeR8\"",
		"mtime": "2026-09-21T07:16:44.389Z",
		"size": 242656,
		"path": "../public/assets/story-3-today-1200-COgTFLEH.webp"
	},
	"/assets/story-3-today-560-BqodebNV.webp": {
		"type": "image/webp",
		"etag": "\"100b2-SEV1Se0DY2Exhgul/oj4yrRrjow\"",
		"mtime": "2026-09-21T07:16:44.389Z",
		"size": 65714,
		"path": "../public/assets/story-3-today-560-BqodebNV.webp"
	},
	"/assets/story-C3AHh_iP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7cc3-sueHqjqtNJdK5gOw2Gxw9ef2AVM\"",
		"mtime": "2026-09-21T07:16:44.373Z",
		"size": 31939,
		"path": "../public/assets/story-C3AHh_iP.js"
	},
	"/assets/triangle-alert-BBfXJTeE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"251-FKaw1SMIXBk5m1hNIn66+sjE1r4\"",
		"mtime": "2026-09-21T07:16:44.375Z",
		"size": 593,
		"path": "../public/assets/triangle-alert-BBfXJTeE.js"
	},
	"/assets/styles-Xl0LsBeC.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"2c619-tHfhYLqd/1Obqg6qZ07b6ehFUsU\"",
		"mtime": "2026-09-21T07:16:44.395Z",
		"size": 181785,
		"path": "../public/assets/styles-Xl0LsBeC.css"
	},
	"/assets/support-VCy59sGk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"827-6O/jZ1Pz+Fep8GIQ/B98KEOjFu0\"",
		"mtime": "2026-09-21T07:16:44.373Z",
		"size": 2087,
		"path": "../public/assets/support-VCy59sGk.js"
	},
	"/assets/track-Ca3CkX32.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12aa-7kNO73I3jm0kTieB1oVBm7OemTM\"",
		"mtime": "2026-09-21T07:16:44.375Z",
		"size": 4778,
		"path": "../public/assets/track-Ca3CkX32.js"
	},
	"/assets/textarea-lqJPEfdu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"248-yLyq1ZOCZUlcChcQ4hPwnYZXJyg\"",
		"mtime": "2026-09-21T07:16:44.373Z",
		"size": 584,
		"path": "../public/assets/textarea-lqJPEfdu.js"
	},
	"/assets/wishlist-0eCAx52Q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12c9-tko+yMJwfhaSUiHenRIOj4LPVuU\"",
		"mtime": "2026-09-21T07:16:44.383Z",
		"size": 4809,
		"path": "../public/assets/wishlist-0eCAx52Q.js"
	},
	"/assets/utils-B6KiDbIe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6a7d-iNkBSvaSyIjvZOzWoTvEa49qwcI\"",
		"mtime": "2026-09-21T07:16:44.383Z",
		"size": 27261,
		"path": "../public/assets/utils-B6KiDbIe.js"
	},
	"/assets/zap-ByOysdJb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"106-3WBy3rd51WWjytsG+SV/q6UpLVc\"",
		"mtime": "2026-09-21T07:16:44.383Z",
		"size": 262,
		"path": "../public/assets/zap-ByOysdJb.js"
	},
	"/images/certificates/fda.svg": {
		"type": "image/svg+xml",
		"etag": "\"360-AYde7l2qS7unnSEH+Ex4Dai0pQA\"",
		"mtime": "2026-09-21T06:47:52.281Z",
		"size": 864,
		"path": "../public/images/certificates/fda.svg"
	},
	"/images/certificates/fssai.svg": {
		"type": "image/svg+xml",
		"etag": "\"380-IaT4uEdTMJuoWITIuCFx/DO1UfA\"",
		"mtime": "2026-09-21T06:47:52.281Z",
		"size": 896,
		"path": "../public/images/certificates/fssai.svg"
	},
	"/images/certificates/iec.svg": {
		"type": "image/svg+xml",
		"etag": "\"66e-eCp66vBJNldAr2pSlr2zqDPZoPI\"",
		"mtime": "2026-09-21T06:47:52.281Z",
		"size": 1646,
		"path": "../public/images/certificates/iec.svg"
	},
	"/images/certificates/msme.svg": {
		"type": "image/svg+xml",
		"etag": "\"778-Ro2uOHboQN/5WEUn/BROTzuxpEM\"",
		"mtime": "2026-09-21T06:47:52.281Z",
		"size": 1912,
		"path": "../public/images/certificates/msme.svg"
	},
	"/images/certificates/nsic.svg": {
		"type": "image/svg+xml",
		"etag": "\"386-X5Xz8lVHlu6zP1oqSjLrOwl8YOY\"",
		"mtime": "2026-09-21T06:47:52.281Z",
		"size": 902,
		"path": "../public/images/certificates/nsic.svg"
	},
	"/images/certificates/zed.svg": {
		"type": "image/svg+xml",
		"etag": "\"657-hxvDLSe4SY82tsnLxVFRVk7N0oM\"",
		"mtime": "2026-09-21T06:47:52.281Z",
		"size": 1623,
		"path": "../public/images/certificates/zed.svg"
	},
	"/assets/WishlistButton-B0XvOd0k.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"563-ayGCENsKlAEn05kJtlbyU8wWXiM\"",
		"mtime": "2026-09-21T07:16:44.222Z",
		"size": 1379,
		"path": "../public/assets/WishlistButton-B0XvOd0k.js"
	},
	"/assets/story-3-today-900-CoQyFYq-.webp": {
		"type": "image/webp",
		"etag": "\"2642e-PrnboRpJqv4QYtJLSs+oAYMBQx8\"",
		"mtime": "2026-09-21T07:16:44.389Z",
		"size": 156718,
		"path": "../public/assets/story-3-today-900-CoQyFYq-.webp"
	},
	"/images/exports/canada.jpg": {
		"type": "image/jpeg",
		"etag": "\"e711f-Y5KYgMMqRK0GViGtMgD8YEgixOQ\"",
		"mtime": "2026-09-21T06:47:52.281Z",
		"size": 946463,
		"path": "../public/images/exports/canada.jpg"
	},
	"/images/exports/singapore.jpg": {
		"type": "image/jpeg",
		"etag": "\"d4894-Fk733zEHMedL25FScf73ZICQvDE\"",
		"mtime": "2026-09-21T06:47:52.316Z",
		"size": 870548,
		"path": "../public/images/exports/singapore.jpg"
	},
	"/images/exports/usa.jpg": {
		"type": "image/jpeg",
		"etag": "\"e0153-uLCmU4IzPeQIbA2afvd0Tja0rsE\"",
		"mtime": "2026-09-21T06:47:52.331Z",
		"size": 917843,
		"path": "../public/images/exports/usa.jpg"
	},
	"/products/100g-asafoetida-gold-cake/img-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"33a58-FL05lX5Aa2lM4G6I9UJ7se8W7CQ\"",
		"mtime": "2026-09-21T06:47:52.465Z",
		"size": 211544,
		"path": "../public/products/100g-asafoetida-gold-cake/img-2.jpg"
	},
	"/products/100g-asafoetida-gold-cake/img-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"4318d-old8EuOfSB683qAlqNNCwTUqVIo\"",
		"mtime": "2026-09-21T06:47:52.465Z",
		"size": 274829,
		"path": "../public/products/100g-asafoetida-gold-cake/img-1.jpg"
	},
	"/products/100g-asafoetida-gold-cake/img-3.jpg": {
		"type": "image/jpeg",
		"etag": "\"5f2a7-gk96D4Hg/vtk1/GpWtVbfr8k4K8\"",
		"mtime": "2026-09-21T06:47:52.479Z",
		"size": 389799,
		"path": "../public/products/100g-asafoetida-gold-cake/img-3.jpg"
	},
	"/images/mindmap/3-manufacturing.jpg": {
		"type": "image/jpeg",
		"etag": "\"c9d6b-lDmZh+IkKQTCQLNO+rQrHEquvxk\"",
		"mtime": "2026-09-21T06:47:52.361Z",
		"size": 826731,
		"path": "../public/images/mindmap/3-manufacturing.jpg"
	},
	"/products/100g-asafoetida-gold-cake/img-4.jpg": {
		"type": "image/jpeg",
		"etag": "\"61f28-8Ft0dQ2msQmT24QiT/pBzi5L/yY\"",
		"mtime": "2026-09-21T06:47:52.479Z",
		"size": 401192,
		"path": "../public/products/100g-asafoetida-gold-cake/img-4.jpg"
	},
	"/images/mindmap/4-quality.jpg": {
		"type": "image/jpeg",
		"etag": "\"de4ee-K8pbmpYLDTlh5g9UufPwVd4nF8Y\"",
		"mtime": "2026-09-21T06:47:52.375Z",
		"size": 910574,
		"path": "../public/images/mindmap/4-quality.jpg"
	},
	"/products/100g-asafoetida-gold-cake/img-6.jpg": {
		"type": "image/jpeg",
		"etag": "\"4ba83-1vNQPCdts4FVFBqvzOlpr+CQaPo\"",
		"mtime": "2026-09-21T06:47:52.479Z",
		"size": 309891,
		"path": "../public/products/100g-asafoetida-gold-cake/img-6.jpg"
	},
	"/images/mindmap/6-distribution.jpg": {
		"type": "image/jpeg",
		"etag": "\"d28a3-sPnAc05a0rOooVXjgcYRvCODCnE\"",
		"mtime": "2026-09-21T06:47:52.386Z",
		"size": 862371,
		"path": "../public/images/mindmap/6-distribution.jpg"
	},
	"/images/mindmap/5-packaging.jpg": {
		"type": "image/jpeg",
		"etag": "\"c1d02-lrfw0S0EtXL4jVVRxsnyEgU8mzA\"",
		"mtime": "2026-09-21T06:47:52.382Z",
		"size": 793858,
		"path": "../public/images/mindmap/5-packaging.jpg"
	},
	"/images/mindmap/1-sourcing.jpg": {
		"type": "image/jpeg",
		"etag": "\"10ce99-ZShtG10oAXwviVpq0aRPw4XsSlg\"",
		"mtime": "2026-09-21T06:47:52.344Z",
		"size": 1101465,
		"path": "../public/images/mindmap/1-sourcing.jpg"
	},
	"/images/mindmap/2-harvesting.jpg": {
		"type": "image/jpeg",
		"etag": "\"114458-+6704MO20hyHnr5llZIE4CHDc3o\"",
		"mtime": "2026-09-21T06:47:52.344Z",
		"size": 1131608,
		"path": "../public/images/mindmap/2-harvesting.jpg"
	},
	"/images/exports/malaysia.jpg": {
		"type": "image/jpeg",
		"etag": "\"133467-/ytnFa4I8dIAYP/suY7gCUnCqmY\"",
		"mtime": "2026-09-21T06:47:52.305Z",
		"size": 1258599,
		"path": "../public/images/exports/malaysia.jpg"
	},
	"/images/exports/srilanka.jpg": {
		"type": "image/jpeg",
		"etag": "\"120304-jkITvJv5KGUnd2EolHn6ZVETdOU\"",
		"mtime": "2026-09-21T06:47:52.316Z",
		"size": 1180420,
		"path": "../public/images/exports/srilanka.jpg"
	},
	"/products/100g-asafoetida-gold-cake/img-5.jpg": {
		"type": "image/jpeg",
		"etag": "\"4c425-sNjBxXkHgfHnx0GXBhm/KLwh5vA\"",
		"mtime": "2026-09-21T06:47:52.479Z",
		"size": 312357,
		"path": "../public/products/100g-asafoetida-gold-cake/img-5.jpg"
	},
	"/images/mindmap/center-seal.jpg": {
		"type": "image/jpeg",
		"etag": "\"11e2b3-RYGcXs7OHvdyVt1fMpfocIAjp/g\"",
		"mtime": "2026-09-21T06:47:52.396Z",
		"size": 1172147,
		"path": "../public/images/mindmap/center-seal.jpg"
	},
	"/products/100g-asafoetida-gold-cake/img-7.jpg": {
		"type": "image/jpeg",
		"etag": "\"59a8b-zoFT3mmxeDKt5P1FYK/o0cNC+wY\"",
		"mtime": "2026-09-21T06:47:52.479Z",
		"size": 367243,
		"path": "../public/products/100g-asafoetida-gold-cake/img-7.jpg"
	},
	"/images/mindmap/4-nature-heritage-panorama.jpg": {
		"type": "image/jpeg",
		"etag": "\"103619-2FkkYDrlpk1Rbj3+LYDtMuR8QtE\"",
		"mtime": "2026-09-21T06:47:52.369Z",
		"size": 1062425,
		"path": "../public/images/mindmap/4-nature-heritage-panorama.jpg"
	},
	"/products/100g-gold-asafoetida-powder/img-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"40b6f-DqcC3CwSYJHqHWw3gFDvXdJ5YWA\"",
		"mtime": "2026-09-21T06:47:52.494Z",
		"size": 265071,
		"path": "../public/products/100g-gold-asafoetida-powder/img-1.jpg"
	},
	"/products/100g-asafoetida-gold-cake/img-8.jpg": {
		"type": "image/jpeg",
		"etag": "\"57508-5g22zO3ClQ8BtCq46AigyZuf/4M\"",
		"mtime": "2026-09-21T06:47:52.494Z",
		"size": 357640,
		"path": "../public/products/100g-asafoetida-gold-cake/img-8.jpg"
	},
	"/hero-video-heritage.mp4": {
		"type": "video/mp4",
		"etag": "\"c0b62f-Y1T5g0OvJQtGlFS0HNivTGDaKAw\"",
		"mtime": "2026-09-21T06:47:52.227Z",
		"size": 12629551,
		"path": "../public/hero-video-heritage.mp4"
	},
	"/products/100g-gold-asafoetida-powder/img-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"398f6-vJEFP1F2ACp8MujUyOSn48yRkyA\"",
		"mtime": "2026-09-21T06:47:52.494Z",
		"size": 235766,
		"path": "../public/products/100g-gold-asafoetida-powder/img-2.jpg"
	},
	"/products/100g-gold-asafoetida-powder/img-3.jpg": {
		"type": "image/jpeg",
		"etag": "\"3feb1-7HdVYa61Y3tq003MU75/f5BAYrA\"",
		"mtime": "2026-09-21T06:47:52.494Z",
		"size": 261809,
		"path": "../public/products/100g-gold-asafoetida-powder/img-3.jpg"
	},
	"/products/100g-premium-asafoetida-powder/img-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"49698-W78bt1jokoffR3KKRYOiyL+XnqQ\"",
		"mtime": "2026-09-21T06:47:52.494Z",
		"size": 300696,
		"path": "../public/products/100g-premium-asafoetida-powder/img-1.jpg"
	},
	"/products/100g-gold-asafoetida-powder/img-4.jpg": {
		"type": "image/jpeg",
		"etag": "\"3c185-xBiFCRltQUwymA1I9ba76TYKHXc\"",
		"mtime": "2026-09-21T06:47:52.494Z",
		"size": 246149,
		"path": "../public/products/100g-gold-asafoetida-powder/img-4.jpg"
	},
	"/products/100g-premium-asafoetida-powder/img-11.png": {
		"type": "image/png",
		"etag": "\"7d86a-gcRKQXaCja34gfM+Dy3AMo+ksPw\"",
		"mtime": "2026-09-21T06:47:52.518Z",
		"size": 514154,
		"path": "../public/products/100g-premium-asafoetida-powder/img-11.png"
	},
	"/products/100g-premium-asafoetida-powder/img-10.png": {
		"type": "image/png",
		"etag": "\"d26c0-+mgknT+sAVtvGbUFt9DufcXxzUI\"",
		"mtime": "2026-09-21T06:47:52.512Z",
		"size": 861888,
		"path": "../public/products/100g-premium-asafoetida-powder/img-10.png"
	},
	"/products/100g-premium-asafoetida-powder/img-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"4cd08-pWGkaWR2/BwaWjEh1IgfM2vcifY\"",
		"mtime": "2026-09-21T06:47:52.561Z",
		"size": 314632,
		"path": "../public/products/100g-premium-asafoetida-powder/img-2.jpg"
	},
	"/products/100g-premium-asafoetida-powder/img-12.png": {
		"type": "image/png",
		"etag": "\"de1f7-mZSHOfwgbEOdxGECoR19wvRc+iQ\"",
		"mtime": "2026-09-21T06:47:52.518Z",
		"size": 909815,
		"path": "../public/products/100g-premium-asafoetida-powder/img-12.png"
	},
	"/products/100g-premium-asafoetida-powder/img-13.png": {
		"type": "image/png",
		"etag": "\"d933b-ZXeFmXu/5O4OV1W2e6B5+B+L2pM\"",
		"mtime": "2026-09-21T06:47:52.531Z",
		"size": 889659,
		"path": "../public/products/100g-premium-asafoetida-powder/img-13.png"
	},
	"/products/100g-premium-asafoetida-powder/img-14.png": {
		"type": "image/png",
		"etag": "\"e7501-CdACz/xhh+Vn2BtpKKPX74w6MqM\"",
		"mtime": "2026-09-21T06:47:52.533Z",
		"size": 947457,
		"path": "../public/products/100g-premium-asafoetida-powder/img-14.png"
	},
	"/products/100g-premium-asafoetida-powder/img-17.png": {
		"type": "image/png",
		"etag": "\"dcfa9-mR3MqcClKp49cymitQ08jKAMggg\"",
		"mtime": "2026-09-21T06:47:52.545Z",
		"size": 905129,
		"path": "../public/products/100g-premium-asafoetida-powder/img-17.png"
	},
	"/products/100g-premium-asafoetida-powder/img-18.png": {
		"type": "image/png",
		"etag": "\"df8db-7PG7ls7lK+vm5vV4fkN2NmfqOX0\"",
		"mtime": "2026-09-21T06:47:52.545Z",
		"size": 915675,
		"path": "../public/products/100g-premium-asafoetida-powder/img-18.png"
	},
	"/products/100g-premium-asafoetida-powder/img-19.png": {
		"type": "image/png",
		"etag": "\"8ff7c-KQpsRpFsRDr/oF76w/iZAIaahv8\"",
		"mtime": "2026-09-21T06:47:52.545Z",
		"size": 589692,
		"path": "../public/products/100g-premium-asafoetida-powder/img-19.png"
	},
	"/products/100g-premium-asafoetida-powder/img-20.png": {
		"type": "image/png",
		"etag": "\"8cff5-ctN+nam5UFz3O609nKt+yPrxqq8\"",
		"mtime": "2026-09-21T06:47:52.561Z",
		"size": 577525,
		"path": "../public/products/100g-premium-asafoetida-powder/img-20.png"
	},
	"/products/100g-premium-asafoetida-powder/img-22.png": {
		"type": "image/png",
		"etag": "\"ac405-8hQqi7n+A0bW31uuccCsy/C3s3M\"",
		"mtime": "2026-09-21T06:47:52.572Z",
		"size": 705541,
		"path": "../public/products/100g-premium-asafoetida-powder/img-22.png"
	},
	"/products/100g-premium-asafoetida-powder/img-21.png": {
		"type": "image/png",
		"etag": "\"baf6f-aQrGBI2JtEM0l2N6pnfcs9dNcOw\"",
		"mtime": "2026-09-21T06:47:52.561Z",
		"size": 765807,
		"path": "../public/products/100g-premium-asafoetida-powder/img-21.png"
	},
	"/products/100g-premium-asafoetida-powder/img-15.png": {
		"type": "image/png",
		"etag": "\"113c05-4EW0zWIGkq2/X92/X280Z3sRH5s\"",
		"mtime": "2026-09-21T06:47:52.533Z",
		"size": 1129477,
		"path": "../public/products/100g-premium-asafoetida-powder/img-15.png"
	},
	"/products/100g-premium-asafoetida-powder/img-23.png": {
		"type": "image/png",
		"etag": "\"c7a34-6+BpaIko5lQ0wYkUk1ZFI0kZil4\"",
		"mtime": "2026-09-21T06:47:52.576Z",
		"size": 817716,
		"path": "../public/products/100g-premium-asafoetida-powder/img-23.png"
	},
	"/products/100g-premium-asafoetida-powder/img-16.png": {
		"type": "image/png",
		"etag": "\"12420d-JZnCGh7ypZdOubO8+TokJW2kQJw\"",
		"mtime": "2026-09-21T06:47:52.545Z",
		"size": 1196557,
		"path": "../public/products/100g-premium-asafoetida-powder/img-16.png"
	},
	"/products/100g-premium-asafoetida-powder/img-25.png": {
		"type": "image/png",
		"etag": "\"9a1b8-+K2NoSySeScO5H7makOODgyBKUE\"",
		"mtime": "2026-09-21T06:47:52.586Z",
		"size": 631224,
		"path": "../public/products/100g-premium-asafoetida-powder/img-25.png"
	},
	"/products/100g-premium-asafoetida-powder/img-24.png": {
		"type": "image/png",
		"etag": "\"bbbe2-o0QHLiCzSsV1ewizB49Err/Iiag\"",
		"mtime": "2026-09-21T06:47:52.582Z",
		"size": 768994,
		"path": "../public/products/100g-premium-asafoetida-powder/img-24.png"
	},
	"/products/100g-premium-asafoetida-powder/img-26.png": {
		"type": "image/png",
		"etag": "\"a21fd-A8NWdRXjk1mjQq5V01IVxMkh2cc\"",
		"mtime": "2026-09-21T06:47:52.590Z",
		"size": 664061,
		"path": "../public/products/100g-premium-asafoetida-powder/img-26.png"
	},
	"/products/100g-premium-asafoetida-powder/img-3.jpg": {
		"type": "image/jpeg",
		"etag": "\"4c2a9-mE1yZMiu8c7ZsAK/n0u8nTuqZvo\"",
		"mtime": "2026-09-21T06:47:52.610Z",
		"size": 311977,
		"path": "../public/products/100g-premium-asafoetida-powder/img-3.jpg"
	},
	"/products/100g-premium-asafoetida-powder/img-29.png": {
		"type": "image/png",
		"etag": "\"c3043-Wykm8dX9PEgFox9Mk0XOoD9A2p0\"",
		"mtime": "2026-09-21T06:47:52.607Z",
		"size": 798787,
		"path": "../public/products/100g-premium-asafoetida-powder/img-29.png"
	},
	"/products/100g-premium-asafoetida-powder/img-27.png": {
		"type": "image/png",
		"etag": "\"107842-y9OrWkTBzyhCQJfq4oTuTB5omKw\"",
		"mtime": "2026-09-21T06:47:52.599Z",
		"size": 1079362,
		"path": "../public/products/100g-premium-asafoetida-powder/img-27.png"
	},
	"/products/100g-premium-asafoetida-powder/img-30.png": {
		"type": "image/png",
		"etag": "\"d0b04-EmFUGAoGBLwmKh2GHXBGwlhZxz4\"",
		"mtime": "2026-09-21T06:47:52.614Z",
		"size": 854788,
		"path": "../public/products/100g-premium-asafoetida-powder/img-30.png"
	},
	"/products/100g-premium-asafoetida-powder/img-28.png": {
		"type": "image/png",
		"etag": "\"110db6-YqtsdWIErigcNHeeFXQmLUdXFMI\"",
		"mtime": "2026-09-21T06:47:52.603Z",
		"size": 1117622,
		"path": "../public/products/100g-premium-asafoetida-powder/img-28.png"
	},
	"/products/100g-premium-asafoetida-powder/img-31.png": {
		"type": "image/png",
		"etag": "\"e9324-UpzjEBlak7732l8q2zE6X3yr2+M\"",
		"mtime": "2026-09-21T06:47:52.614Z",
		"size": 955172,
		"path": "../public/products/100g-premium-asafoetida-powder/img-31.png"
	},
	"/products/100g-premium-asafoetida-powder/img-32.png": {
		"type": "image/png",
		"etag": "\"de78e-qmvwMsjEwD0t/MmcFkoItVJPyY0\"",
		"mtime": "2026-09-21T06:47:52.614Z",
		"size": 911246,
		"path": "../public/products/100g-premium-asafoetida-powder/img-32.png"
	},
	"/products/100g-premium-asafoetida-powder/img-4.jpg": {
		"type": "image/jpeg",
		"etag": "\"479ed-nwq4tZ4Ndb5bMObF+/2+3sWJQM8\"",
		"mtime": "2026-09-21T06:47:52.652Z",
		"size": 293357,
		"path": "../public/products/100g-premium-asafoetida-powder/img-4.jpg"
	},
	"/products/100g-premium-asafoetida-powder/img-35.png": {
		"type": "image/png",
		"etag": "\"c7031-q4pnFSFBpRsGin9xjHE0BGxytp8\"",
		"mtime": "2026-09-21T06:47:52.628Z",
		"size": 815153,
		"path": "../public/products/100g-premium-asafoetida-powder/img-35.png"
	},
	"/products/100g-premium-asafoetida-powder/img-37.png": {
		"type": "image/png",
		"etag": "\"fc902-0/cG+wdtERX/X7RRQvb3K7+YCfk\"",
		"mtime": "2026-09-21T06:47:52.652Z",
		"size": 1034498,
		"path": "../public/products/100g-premium-asafoetida-powder/img-37.png"
	},
	"/products/500g-gold-asafoetida-powder/img-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"395ed-oS2PKHuKNR8opSaONdw57Y9cPQM\"",
		"mtime": "2026-09-21T06:47:52.681Z",
		"size": 234989,
		"path": "../public/products/500g-gold-asafoetida-powder/img-2.jpg"
	},
	"/products/500g-gold-asafoetida-powder/img-3.jpg": {
		"type": "image/jpeg",
		"etag": "\"387bd-tZq98i7O9hTwxx11l3HAcsOIdfc\"",
		"mtime": "2026-09-21T06:47:52.681Z",
		"size": 231357,
		"path": "../public/products/500g-gold-asafoetida-powder/img-3.jpg"
	},
	"/products/500g-gold-asafoetida-powder/img-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"3e58f-CnY1+4BAsSUAmJXl0Ko2ZuPdhYE\"",
		"mtime": "2026-09-21T06:47:52.681Z",
		"size": 255375,
		"path": "../public/products/500g-gold-asafoetida-powder/img-1.jpg"
	},
	"/products/100g-premium-asafoetida-powder/img-33.png": {
		"type": "image/png",
		"etag": "\"139fc4-U4B3Je2w4/W1lSeX1p1w7GgUD48\"",
		"mtime": "2026-09-21T06:47:52.628Z",
		"size": 1286084,
		"path": "../public/products/100g-premium-asafoetida-powder/img-33.png"
	},
	"/products/50g-asafoetida-gold-cake/img-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"3a0ca-aVPDF9cdGvAVy4P07Ngsn6kZb5c\"",
		"mtime": "2026-09-21T06:47:52.681Z",
		"size": 237770,
		"path": "../public/products/50g-asafoetida-gold-cake/img-1.jpg"
	},
	"/products/50g-asafoetida-gold-cake/img-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"2eebe-Z9vZzzHV7LvVtb6C7bzlP3333/c\"",
		"mtime": "2026-09-21T06:47:52.695Z",
		"size": 192190,
		"path": "../public/products/50g-asafoetida-gold-cake/img-2.jpg"
	},
	"/products/100g-premium-asafoetida-powder/img-34.png": {
		"type": "image/png",
		"etag": "\"13907d-ycwwzfj90tSNJP7BtXBy7Wi/FyI\"",
		"mtime": "2026-09-21T06:47:52.628Z",
		"size": 1282173,
		"path": "../public/products/100g-premium-asafoetida-powder/img-34.png"
	},
	"/products/50g-asafoetida-gold-cake/img-3.jpg": {
		"type": "image/jpeg",
		"etag": "\"66350-TJmrTfY3WFBwHVxKzO+2RmPpZCk\"",
		"mtime": "2026-09-21T06:47:52.695Z",
		"size": 418640,
		"path": "../public/products/50g-asafoetida-gold-cake/img-3.jpg"
	},
	"/products/100g-premium-asafoetida-powder/img-7.png": {
		"type": "image/png",
		"etag": "\"e40b6-VnM8aP3B1NVKMduETkYI5oz2AUE\"",
		"mtime": "2026-09-21T06:47:52.661Z",
		"size": 934070,
		"path": "../public/products/100g-premium-asafoetida-powder/img-7.png"
	},
	"/products/100g-premium-asafoetida-powder/img-36.png": {
		"type": "image/png",
		"etag": "\"1054f2-eyg4iT+GkP/pux2N+zA0Kb8BZlc\"",
		"mtime": "2026-09-21T06:47:52.646Z",
		"size": 1070322,
		"path": "../public/products/100g-premium-asafoetida-powder/img-36.png"
	},
	"/products/100g-premium-asafoetida-powder/img-8.png": {
		"type": "image/png",
		"etag": "\"eb9c9-QrLZzbXkJ2o21tFraWAisWZzlSc\"",
		"mtime": "2026-09-21T06:47:52.678Z",
		"size": 965065,
		"path": "../public/products/100g-premium-asafoetida-powder/img-8.png"
	},
	"/products/100g-premium-asafoetida-powder/img-9.png": {
		"type": "image/png",
		"etag": "\"ec65c-My/01AWsJ+75Nc+4bjQL5of3tdc\"",
		"mtime": "2026-09-21T06:47:52.681Z",
		"size": 968284,
		"path": "../public/products/100g-premium-asafoetida-powder/img-9.png"
	},
	"/products/100g-premium-asafoetida-powder/img-5.png": {
		"type": "image/png",
		"etag": "\"14d0fd-6aPT46ZCjYT6U0DvupQwlgrrqY0\"",
		"mtime": "2026-09-21T06:47:52.661Z",
		"size": 1364221,
		"path": "../public/products/100g-premium-asafoetida-powder/img-5.png"
	},
	"/products/100g-premium-asafoetida-powder/img-6.png": {
		"type": "image/png",
		"etag": "\"152f2c-34umO1l41NDFJlAcWop/nV5VJ7M\"",
		"mtime": "2026-09-21T06:47:52.661Z",
		"size": 1388332,
		"path": "../public/products/100g-premium-asafoetida-powder/img-6.png"
	},
	"/products/50g-asafoetida-gold-cake/img-6.jpg": {
		"type": "image/jpeg",
		"etag": "\"5600d-gr6Bf0tg/eOLxZWoIc6+cYJsV00\"",
		"mtime": "2026-09-21T06:47:52.707Z",
		"size": 352269,
		"path": "../public/products/50g-asafoetida-gold-cake/img-6.jpg"
	},
	"/products/50g-asafoetida-gold-cake/img-7.jpg": {
		"type": "image/jpeg",
		"etag": "\"5d4d6-V3Wy4GEy1JeM/CJ6dLIc3CSzaI8\"",
		"mtime": "2026-09-21T06:47:52.711Z",
		"size": 382166,
		"path": "../public/products/50g-asafoetida-gold-cake/img-7.jpg"
	},
	"/products/50g-asafoetida-gold-cake/img-8.jpg": {
		"type": "image/jpeg",
		"etag": "\"58b7b-xgDMPtQS/PU25EWRxroL67ald2Y\"",
		"mtime": "2026-09-21T06:47:52.714Z",
		"size": 363387,
		"path": "../public/products/50g-asafoetida-gold-cake/img-8.jpg"
	},
	"/products/50g-asafoetida-gold-cake/img-9.jpg": {
		"type": "image/jpeg",
		"etag": "\"ed83-ICUZkG5k+Wz1HgHuSVPCcqs+90U\"",
		"mtime": "2026-09-21T06:47:52.714Z",
		"size": 60803,
		"path": "../public/products/50g-asafoetida-gold-cake/img-9.jpg"
	},
	"/products/50g-gluten-free-asafoetida-powder/img-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"3b19e-jaBTWcmYgaWnSY6n21vJ1u+4hsI\"",
		"mtime": "2026-09-21T06:47:52.714Z",
		"size": 242078,
		"path": "../public/products/50g-gluten-free-asafoetida-powder/img-1.jpg"
	},
	"/products/50g-gluten-free-asafoetida-powder/img-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"39186-7aKllXwWl3d9G9R6Ci5pQzipWig\"",
		"mtime": "2026-09-21T06:47:52.714Z",
		"size": 233862,
		"path": "../public/products/50g-gluten-free-asafoetida-powder/img-2.jpg"
	},
	"/products/50g-gluten-free-asafoetida-powder/img-3.jpg": {
		"type": "image/jpeg",
		"etag": "\"3c9b1-Y0JAWxVMMxM3/nMWAqxWdj41zc0\"",
		"mtime": "2026-09-21T06:47:52.714Z",
		"size": 248241,
		"path": "../public/products/50g-gluten-free-asafoetida-powder/img-3.jpg"
	},
	"/products/50g-gluten-free-asafoetida-powder/img-4.jpg": {
		"type": "image/jpeg",
		"etag": "\"3c875-fJ1l84P1DT2lKx2277Ro31TwySI\"",
		"mtime": "2026-09-21T06:47:52.714Z",
		"size": 247925,
		"path": "../public/products/50g-gluten-free-asafoetida-powder/img-4.jpg"
	},
	"/products/50g-gold-asafoetida-powder/img-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"40ee8-5JzmYEQFAsrwBrG6y/5n4c5Hf6E\"",
		"mtime": "2026-09-21T06:47:52.727Z",
		"size": 265960,
		"path": "../public/products/50g-gold-asafoetida-powder/img-1.jpg"
	},
	"/products/50g-gold-asafoetida-powder/img-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"3ff2c-NhXfSURTxWAPaE/vB1IY/2pWTY0\"",
		"mtime": "2026-09-21T06:47:52.734Z",
		"size": 261932,
		"path": "../public/products/50g-gold-asafoetida-powder/img-2.jpg"
	},
	"/products/50g-gold-asafoetida-powder/img-3.jpg": {
		"type": "image/jpeg",
		"etag": "\"42840-YVBlv14H1Ippcp5I9LttI+gP0t4\"",
		"mtime": "2026-09-21T06:47:52.734Z",
		"size": 272448,
		"path": "../public/products/50g-gold-asafoetida-powder/img-3.jpg"
	},
	"/products/50g-gold-asafoetida-powder/img-4.jpg": {
		"type": "image/jpeg",
		"etag": "\"3c341-ZEQbR4YseO/f53czZ2kjDJrHxww\"",
		"mtime": "2026-09-21T06:47:52.747Z",
		"size": 246593,
		"path": "../public/products/50g-gold-asafoetida-powder/img-4.jpg"
	},
	"/products/50g-premium-asafoetida-powder/img-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"468f0-fyK6MhSCmjYO27ssA5hPXdyGH2g\"",
		"mtime": "2026-09-21T06:47:52.762Z",
		"size": 289008,
		"path": "../public/products/50g-premium-asafoetida-powder/img-2.jpg"
	},
	"/products/50g-premium-asafoetida-powder/img-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"48174-bFQ/JNkYMwdmGzmgOrNV4aL/fXE\"",
		"mtime": "2026-09-21T06:47:52.752Z",
		"size": 295284,
		"path": "../public/products/50g-premium-asafoetida-powder/img-1.jpg"
	},
	"/products/50g-premium-asafoetida-powder/img-3.jpg": {
		"type": "image/jpeg",
		"etag": "\"46a79-VhsDLUxq/xpl4hGhDKcIeQXHjJA\"",
		"mtime": "2026-09-21T06:47:52.766Z",
		"size": 289401,
		"path": "../public/products/50g-premium-asafoetida-powder/img-3.jpg"
	},
	"/products/50g-premium-asafoetida-powder/img-4.jpg": {
		"type": "image/jpeg",
		"etag": "\"461de-oIQFwonG/rOA0WYiRAnVFv/d8ZY\"",
		"mtime": "2026-09-21T06:47:52.777Z",
		"size": 287198,
		"path": "../public/products/50g-premium-asafoetida-powder/img-4.jpg"
	},
	"/products/all-product/img-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"4832f-qGxJ0DZlcK3Ojb6XTl+ZipnBQ1s\"",
		"mtime": "2026-09-21T06:47:52.787Z",
		"size": 295727,
		"path": "../public/products/all-product/img-1.jpg"
	},
	"/products/all-product/img-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"40df4-ydaHxyRtlr1bqKIElCYpKjdh9AU\"",
		"mtime": "2026-09-21T06:47:52.794Z",
		"size": 265716,
		"path": "../public/products/all-product/img-2.jpg"
	},
	"/products/all-product/img-3.jpg": {
		"type": "image/jpeg",
		"etag": "\"45f60-u/6NSGRpzP/LYWriVX+3nmEqAvU\"",
		"mtime": "2026-09-21T06:47:52.801Z",
		"size": 286560,
		"path": "../public/products/all-product/img-3.jpg"
	},
	"/products/all-product/img-4.jpg": {
		"type": "image/jpeg",
		"etag": "\"51b45-aSmJ6mod5f9ubYGyVxg9vO41IsY\"",
		"mtime": "2026-09-21T06:47:52.809Z",
		"size": 334661,
		"path": "../public/products/all-product/img-4.jpg"
	},
	"/products/all-product/img-5.jpg": {
		"type": "image/jpeg",
		"etag": "\"4e418-Myg9ltCscn/3hL2AuRCudtuTZIQ\"",
		"mtime": "2026-09-21T06:47:52.816Z",
		"size": 320536,
		"path": "../public/products/all-product/img-5.jpg"
	},
	"/products/all-product/img-6.jpg": {
		"type": "image/jpeg",
		"etag": "\"70fba-qU6YUikaOYk91SXfrPjalcpgJ3U\"",
		"mtime": "2026-09-21T06:47:52.828Z",
		"size": 462778,
		"path": "../public/products/all-product/img-6.jpg"
	},
	"/products/all-product/img-7.jpg": {
		"type": "image/jpeg",
		"etag": "\"5d2d8-GOkbvqHLdDhqFgBfQgMAXhHrnbw\"",
		"mtime": "2026-09-21T06:47:52.828Z",
		"size": 381656,
		"path": "../public/products/all-product/img-7.jpg"
	},
	"/products/all-product/img-9.jpg": {
		"type": "image/jpeg",
		"etag": "\"44296-qDFmf5VtsAqjAkdGYCsc7h6QWBM\"",
		"mtime": "2026-09-21T06:47:52.850Z",
		"size": 279190,
		"path": "../public/products/all-product/img-9.jpg"
	},
	"/products/50g-asafoetida-gold-cake/img-5.jpg": {
		"type": "image/jpeg",
		"etag": "\"4d505-93QN1RxVFJ5tf6EanCdqhsidb8Q\"",
		"mtime": "2026-09-21T06:47:52.695Z",
		"size": 316677,
		"path": "../public/products/50g-asafoetida-gold-cake/img-5.jpg"
	},
	"/products/all-product/img-8.jpg": {
		"type": "image/jpeg",
		"etag": "\"670fe-ohMpyhnYx0iLjsSAIdHhgkUD0Qk\"",
		"mtime": "2026-09-21T06:47:52.845Z",
		"size": 422142,
		"path": "../public/products/all-product/img-8.jpg"
	},
	"/products/black-sesame-seeds/img-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"506ac-dTVSnqWb/uJ2SLYKYkbu3UD7IP4\"",
		"mtime": "2026-09-21T06:47:52.866Z",
		"size": 329388,
		"path": "../public/products/black-sesame-seeds/img-2.jpg"
	},
	"/products/black-sesame-seeds/img-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"581c5-CxoSsCsJw/3aN1cREACWPpxeXOY\"",
		"mtime": "2026-09-21T06:47:52.852Z",
		"size": 360901,
		"path": "../public/products/black-sesame-seeds/img-1.jpg"
	},
	"/products/black-sesame-seeds/img-3.jpg": {
		"type": "image/jpeg",
		"etag": "\"5e071-EgJnT5N6N20dujLCzTtqGzUy2ME\"",
		"mtime": "2026-09-21T06:47:52.867Z",
		"size": 385137,
		"path": "../public/products/black-sesame-seeds/img-3.jpg"
	},
	"/products/black-sesame-seeds/img-4.jpg": {
		"type": "image/jpeg",
		"etag": "\"4fd86-WaBr2aEgLFBsltt6I6afldaggOg\"",
		"mtime": "2026-09-21T06:47:52.879Z",
		"size": 327046,
		"path": "../public/products/black-sesame-seeds/img-4.jpg"
	},
	"/products/50g-asafoetida-gold-cake/img-4.jpg": {
		"type": "image/jpeg",
		"etag": "\"64086-cHiED41lc9fe37TCFcwvn5+xoFo\"",
		"mtime": "2026-09-21T06:47:52.695Z",
		"size": 409734,
		"path": "../public/products/50g-asafoetida-gold-cake/img-4.jpg"
	},
	"/products/bottle-jar/img-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"4bea6-ctZ0vyNvqx27yfRUinlwkPBkdoA\"",
		"mtime": "2026-09-21T06:47:52.886Z",
		"size": 310950,
		"path": "../public/products/bottle-jar/img-2.jpg"
	},
	"/products/bottle-jar/img-4.jpg": {
		"type": "image/jpeg",
		"etag": "\"46d12-wWfe80keBJSdIr1zj6ivkufLWcM\"",
		"mtime": "2026-09-21T06:47:52.894Z",
		"size": 290066,
		"path": "../public/products/bottle-jar/img-4.jpg"
	},
	"/products/bottle-jar/img-5.jpg": {
		"type": "image/jpeg",
		"etag": "\"5ea2a-vh5l2UWhj3eQzYlDpW6ckEVMLmE\"",
		"mtime": "2026-09-21T06:47:52.894Z",
		"size": 387626,
		"path": "../public/products/bottle-jar/img-5.jpg"
	},
	"/products/bottle-jar/img-3.jpg": {
		"type": "image/jpeg",
		"etag": "\"5ac48-6c+jFf8UxUBmV3O/D+FTvgtavAY\"",
		"mtime": "2026-09-21T06:47:52.894Z",
		"size": 371784,
		"path": "../public/products/bottle-jar/img-3.jpg"
	},
	"/products/hing/img-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"397de-j5g4DjcC5JX4l2BJYNAS1EtgP7I\"",
		"mtime": "2026-09-21T06:47:52.946Z",
		"size": 235486,
		"path": "../public/products/hing/img-2.jpg"
	},
	"/products/hing/img-3.jpg": {
		"type": "image/jpeg",
		"etag": "\"3c032-wZ3OU9J/pzKmaIMghWXlbnOAIGo\"",
		"mtime": "2026-09-21T06:47:52.949Z",
		"size": 245810,
		"path": "../public/products/hing/img-3.jpg"
	},
	"/products/hing/img-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"38333-IfPxyPzpLZbk0gYZCZDnxQ/XvrU\"",
		"mtime": "2026-09-21T06:47:52.942Z",
		"size": 230195,
		"path": "../public/products/hing/img-1.jpg"
	},
	"/products/hing/img-6.jpg": {
		"type": "image/jpeg",
		"etag": "\"2b9af-HACLKv2qOr7M42o7NtgZJhvHi0U\"",
		"mtime": "2026-09-21T06:47:52.955Z",
		"size": 178607,
		"path": "../public/products/hing/img-6.jpg"
	},
	"/products/hing-chips/img-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"485e2-PEH1AMfKA1aSOOqWm5zVAmZm1tE\"",
		"mtime": "2026-09-21T06:47:52.921Z",
		"size": 296418,
		"path": "../public/products/hing-chips/img-1.jpg"
	},
	"/products/hing/img-4.jpg": {
		"type": "image/jpeg",
		"etag": "\"3a709-fqld1y/MNoufGqX803BSo9VMu1M\"",
		"mtime": "2026-09-21T06:47:52.951Z",
		"size": 239369,
		"path": "../public/products/hing/img-4.jpg"
	},
	"/products/crispy-appalam/img-3.jpg": {
		"type": "image/jpeg",
		"etag": "\"9744b-szXHjY3HHCk5YQozsJQmzwHKlJw\"",
		"mtime": "2026-09-21T06:47:52.917Z",
		"size": 619595,
		"path": "../public/products/crispy-appalam/img-3.jpg"
	},
	"/products/hing/img-5.jpg": {
		"type": "image/jpeg",
		"etag": "\"41f59-diElF2bGkacRPtS0X+A4sByKfKE\"",
		"mtime": "2026-09-21T06:47:52.953Z",
		"size": 270169,
		"path": "../public/products/hing/img-5.jpg"
	},
	"/products/hing-chips/img-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"41572-EY08dvdnMcMdAw2qO4ob5yWKRpY\"",
		"mtime": "2026-09-21T06:47:52.924Z",
		"size": 267634,
		"path": "../public/products/hing-chips/img-2.jpg"
	},
	"/products/bottle-jar/img-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"5c525-tkorcAlQlF8YmeO8eJONqJou06A\"",
		"mtime": "2026-09-21T06:47:52.886Z",
		"size": 378149,
		"path": "../public/products/bottle-jar/img-1.jpg"
	},
	"/products/crispy-appalam/img-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"b5754-J7aNLL/dfDEimaIuFMQz18Od6KE\"",
		"mtime": "2026-09-21T06:47:52.894Z",
		"size": 743252,
		"path": "../public/products/crispy-appalam/img-1.jpg"
	},
	"/products/hing-pellets/img-3.jpg": {
		"type": "image/jpeg",
		"etag": "\"38013-8j5b5l2+OI9oRvipmkSVEhiUYtQ\"",
		"mtime": "2026-09-21T06:47:52.931Z",
		"size": 229395,
		"path": "../public/products/hing-pellets/img-3.jpg"
	},
	"/products/hing-pellets/img-4.jpg": {
		"type": "image/jpeg",
		"etag": "\"28c2d-xPJq2krVT8PO+bPfCDdzfViZclk\"",
		"mtime": "2026-09-21T06:47:52.931Z",
		"size": 166957,
		"path": "../public/products/hing-pellets/img-4.jpg"
	},
	"/products/hing-pellets/img-5.jpg": {
		"type": "image/jpeg",
		"etag": "\"20099-4CyNeARHukNXb+Mc7ZA72VhZno4\"",
		"mtime": "2026-09-21T06:47:52.931Z",
		"size": 131225,
		"path": "../public/products/hing-pellets/img-5.jpg"
	},
	"/products/hing-pellets/img-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"6f30e-mAClqfvgDFREpPvO2kDUbnWuSl8\"",
		"mtime": "2026-09-21T06:47:52.931Z",
		"size": 455438,
		"path": "../public/products/hing-pellets/img-2.jpg"
	},
	"/products/millet-pongal-mix/img-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"3d61e-dyHLNzZkB5hAB+at+wwDtx1nljQ\"",
		"mtime": "2026-09-21T06:47:52.959Z",
		"size": 251422,
		"path": "../public/products/millet-pongal-mix/img-2.jpg"
	},
	"/products/crispy-appalam/img-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"8c3dd-Vu5t+HHBc6oWKFb2yxK2fA9OAFE\"",
		"mtime": "2026-09-21T06:47:52.912Z",
		"size": 574429,
		"path": "../public/products/crispy-appalam/img-2.jpg"
	},
	"/products/hing-pellets/img-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"6c226-Qs0lN2z5VR/CKixzdzrxMHB6HEw\"",
		"mtime": "2026-09-21T06:47:52.928Z",
		"size": 442918,
		"path": "../public/products/hing-pellets/img-1.jpg"
	},
	"/products/millet-sambar-mix/img-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"407b2-DGpgPAUY8G1tZQkTAForAwbJwtg\"",
		"mtime": "2026-09-21T06:47:52.967Z",
		"size": 264114,
		"path": "../public/products/millet-sambar-mix/img-2.jpg"
	},
	"/products/millet-pongal-mix/img-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"352a3-DiPUm8KNPOPu9NBxkkoJqLPzZsA\"",
		"mtime": "2026-09-21T06:47:52.957Z",
		"size": 217763,
		"path": "../public/products/millet-pongal-mix/img-1.jpg"
	},
	"/products/pure-benzoin-sambrani/img-1.png": {
		"type": "image/png",
		"etag": "\"37ec0-iFgu0AnFiHawbyrq6G7XaJVGpec\"",
		"mtime": "2026-09-21T06:47:52.969Z",
		"size": 229056,
		"path": "../public/products/pure-benzoin-sambrani/img-1.png"
	},
	"/products/pure-benzoin-sambrani/img-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"243aa-E8YGWbp1G9V9rTc9T4jZZ3jdvXI\"",
		"mtime": "2026-09-21T06:47:52.971Z",
		"size": 148394,
		"path": "../public/products/pure-benzoin-sambrani/img-2.jpg"
	},
	"/products/pure-benzoin-sambrani/img-3.jpg": {
		"type": "image/jpeg",
		"etag": "\"27c45-tezhUyCwL5u4q2rzsDEay6z6GXo\"",
		"mtime": "2026-09-21T06:47:52.973Z",
		"size": 162885,
		"path": "../public/products/pure-benzoin-sambrani/img-3.jpg"
	},
	"/products/millet-sambar-mix/img-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"37cfd-6Tk+cPsVsIb5w/J6g8Z0flkVAwA\"",
		"mtime": "2026-09-21T06:47:52.964Z",
		"size": 228605,
		"path": "../public/products/millet-sambar-mix/img-1.jpg"
	},
	"/products/pure-benzoin-sambrani/img-4.jpg": {
		"type": "image/jpeg",
		"etag": "\"32be7-rSv7UhSxWsHuZ5p5vCKR2xIY1k4\"",
		"mtime": "2026-09-21T06:47:52.975Z",
		"size": 207847,
		"path": "../public/products/pure-benzoin-sambrani/img-4.jpg"
	},
	"/products/traditional-health-mix/img-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"5071b-Q+uvJfbA+kO7qmVf9mFJFoSmQ1g\"",
		"mtime": "2026-09-21T06:47:52.980Z",
		"size": 329499,
		"path": "../public/products/traditional-health-mix/img-1.jpg"
	},
	"/products/traditional-health-mix/img-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"5b333-pd3VeW6KQ5N9oNoWVAKSYljoFJI\"",
		"mtime": "2026-09-21T06:47:52.981Z",
		"size": 373555,
		"path": "../public/products/traditional-health-mix/img-2.jpg"
	},
	"/products/traditional-health-mix/img-5.jpg": {
		"type": "image/jpeg",
		"etag": "\"19279-b7QjF59AM7o1lv/etXiKKB9uOzE\"",
		"mtime": "2026-09-21T06:47:52.991Z",
		"size": 103033,
		"path": "../public/products/traditional-health-mix/img-5.jpg"
	},
	"/products/traditional-health-mix/img-4.jpg": {
		"type": "image/jpeg",
		"etag": "\"19871-xuA0fjYaDmD39I0adPnhpDDb07Q\"",
		"mtime": "2026-09-21T06:47:52.989Z",
		"size": 104561,
		"path": "../public/products/traditional-health-mix/img-4.jpg"
	},
	"/products/traditional-health-mix/img-7.jpg": {
		"type": "image/jpeg",
		"etag": "\"36bbc-BJ4zLr4B9q2bM0vBlDusoLPFcKI\"",
		"mtime": "2026-09-21T06:47:52.996Z",
		"size": 224188,
		"path": "../public/products/traditional-health-mix/img-7.jpg"
	},
	"/products/traditional-health-mix/img-6.jpg": {
		"type": "image/jpeg",
		"etag": "\"32253-Ol+HKfmJg6SukBOgJESUc1F4td4\"",
		"mtime": "2026-09-21T06:47:52.994Z",
		"size": 205395,
		"path": "../public/products/traditional-health-mix/img-6.jpg"
	},
	"/products/traditional-idli-podi/img-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"49741-oaKJsfbhCqNH8DO2qWNntrxhTEc\"",
		"mtime": "2026-09-21T06:47:53.001Z",
		"size": 300865,
		"path": "../public/products/traditional-idli-podi/img-2.jpg"
	},
	"/products/traditional-idli-podi/img-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"549d4-nyhYmG7N+Vv0z6IqCkLUElcJMmo\"",
		"mtime": "2026-09-21T06:47:53.001Z",
		"size": 346580,
		"path": "../public/products/traditional-idli-podi/img-1.jpg"
	},
	"/products/traditional-idli-podi/img-4.jpg": {
		"type": "image/jpeg",
		"etag": "\"473d9-kAjjbhP1xV9jJmFdiPTSuLPzdAU\"",
		"mtime": "2026-09-21T06:47:53.001Z",
		"size": 291801,
		"path": "../public/products/traditional-idli-podi/img-4.jpg"
	},
	"/products/traditional-idli-podi/img-3.jpg": {
		"type": "image/jpeg",
		"etag": "\"52891-By6rnjeYaDHTAYbVKwEwYeYA9S0\"",
		"mtime": "2026-09-21T06:47:53.001Z",
		"size": 338065,
		"path": "../public/products/traditional-idli-podi/img-3.jpg"
	},
	"/products/traditional-health-mix/img-3.jpg": {
		"type": "image/jpeg",
		"etag": "\"5b333-pd3VeW6KQ5N9oNoWVAKSYljoFJI\"",
		"mtime": "2026-09-21T06:47:52.988Z",
		"size": 373555,
		"path": "../public/products/traditional-health-mix/img-3.jpg"
	},
	"/products/vismaya-multi-millet-adai-dosa-mix/500g-vismaya-multigrain-adai-dosa-mix-back.jpg": {
		"type": "image/jpeg",
		"etag": "\"28ade-mWMDX6bnjz54x/f3i/Y7lFoDx48\"",
		"mtime": "2026-09-21T06:47:53.037Z",
		"size": 166622,
		"path": "../public/products/vismaya-multi-millet-adai-dosa-mix/500g-vismaya-multigrain-adai-dosa-mix-back.jpg"
	},
	"/products/vismaya-multi-millet-adai-dosa-mix/500g-vismaya-multigrain-adai-dosa-mix-front.jpg": {
		"type": "image/jpeg",
		"etag": "\"27888-NSOsdelgDveNZjsNduPYES+zTjA\"",
		"mtime": "2026-09-21T06:47:53.042Z",
		"size": 161928,
		"path": "../public/products/vismaya-multi-millet-adai-dosa-mix/500g-vismaya-multigrain-adai-dosa-mix-front.jpg"
	},
	"/products/vismaya-multi-millet-adai-dosa-mix/img-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"28ade-mWMDX6bnjz54x/f3i/Y7lFoDx48\"",
		"mtime": "2026-09-21T06:47:53.044Z",
		"size": 166622,
		"path": "../public/products/vismaya-multi-millet-adai-dosa-mix/img-2.jpg"
	},
	"/products/vismaya-multigrain-adai-dosa-mix/500g-vismaya-multigrain-adai-dosa-mix-back.jpg": {
		"type": "image/jpeg",
		"etag": "\"28ade-mWMDX6bnjz54x/f3i/Y7lFoDx48\"",
		"mtime": "2026-09-21T06:47:53.044Z",
		"size": 166622,
		"path": "../public/products/vismaya-multigrain-adai-dosa-mix/500g-vismaya-multigrain-adai-dosa-mix-back.jpg"
	},
	"/products/vismaya-multigrain-adai-dosa-mix/500g-vismaya-multigrain-adai-dosa-mix-front.jpg": {
		"type": "image/jpeg",
		"etag": "\"27888-NSOsdelgDveNZjsNduPYES+zTjA\"",
		"mtime": "2026-09-21T06:47:53.044Z",
		"size": 161928,
		"path": "../public/products/vismaya-multigrain-adai-dosa-mix/500g-vismaya-multigrain-adai-dosa-mix-front.jpg"
	},
	"/products/vismaya-multi-millet-adai-dosa-mix/img-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"27888-NSOsdelgDveNZjsNduPYES+zTjA\"",
		"mtime": "2026-09-21T06:47:53.044Z",
		"size": 161928,
		"path": "../public/products/vismaya-multi-millet-adai-dosa-mix/img-1.jpg"
	},
	"/products/vismaya-multigrain-adai-dosa-mix/img-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"27888-NSOsdelgDveNZjsNduPYES+zTjA\"",
		"mtime": "2026-09-21T06:47:53.057Z",
		"size": 161928,
		"path": "../public/products/vismaya-multigrain-adai-dosa-mix/img-1.jpg"
	},
	"/products/vismaya-multigrain-adai-dosa-mix/img-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"28ade-mWMDX6bnjz54x/f3i/Y7lFoDx48\"",
		"mtime": "2026-09-21T06:47:53.059Z",
		"size": 166622,
		"path": "../public/products/vismaya-multigrain-adai-dosa-mix/img-2.jpg"
	},
	"/products/vismaya-curry-leaves-paruppu-podi/img-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"92048-J2rsq7Wra6zHm4E/6xQ7C3GebMg\"",
		"mtime": "2026-09-21T06:47:53.028Z",
		"size": 598088,
		"path": "../public/products/vismaya-curry-leaves-paruppu-podi/img-1.jpg"
	},
	"/products/vismaya-andhra-spl-paruppu-podi/img-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"9df05-tcoaHd8gPxh8P7Ob6xC9YDSUPos\"",
		"mtime": "2026-09-21T06:47:53.016Z",
		"size": 646917,
		"path": "../public/products/vismaya-andhra-spl-paruppu-podi/img-1.jpg"
	},
	"/products/vismaya-pirandai-paruppu-podi/img-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"8ea06-wuiR71XcSuLYHZI8rVz9OpeCocE\"",
		"mtime": "2026-09-21T06:47:53.061Z",
		"size": 584198,
		"path": "../public/products/vismaya-pirandai-paruppu-podi/img-1.jpg"
	},
	"/products/vismaya-moringa-paruppu-podi/img-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"993de-VcQ5RajE89dmO7NctFg0hVxTY8k\"",
		"mtime": "2026-09-21T06:47:53.037Z",
		"size": 627678,
		"path": "../public/products/vismaya-moringa-paruppu-podi/img-1.jpg"
	},
	"/products/vismaya-tirunelveli-spl-paruppu-podi/img-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"93d10-FyKW+QGJWCipOczn62+wec4nRno\"",
		"mtime": "2026-09-21T06:47:53.072Z",
		"size": 605456,
		"path": "../public/products/vismaya-tirunelveli-spl-paruppu-podi/img-1.jpg"
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
