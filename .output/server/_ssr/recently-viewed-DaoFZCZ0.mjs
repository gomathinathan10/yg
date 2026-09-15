import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/recently-viewed-DaoFZCZ0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var KEY = "yg-recently-viewed-v1";
var MAX = 6;
function read() {
	try {
		const raw = window.localStorage.getItem(KEY);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}
/**
* Tracks the last few product slugs the visitor opened, so we can show a
* "Recently viewed" strip. Runs entirely after hydration to avoid SSR mismatch.
*/
function useRecentlyViewed(currentSlug) {
	const [slugs, setSlugs] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		const stored = read();
		setSlugs(stored);
		if (!currentSlug) return;
		const next = [currentSlug, ...stored.filter((s) => s !== currentSlug)].slice(0, MAX);
		try {
			window.localStorage.setItem(KEY, JSON.stringify(next));
		} catch {}
	}, [currentSlug]);
	const clear = (0, import_react.useCallback)(() => {
		try {
			window.localStorage.removeItem(KEY);
		} catch {}
		setSlugs([]);
	}, []);
	return {
		slugs: slugs.filter((s) => s !== currentSlug),
		clear
	};
}
//#endregion
export { useRecentlyViewed as t };
