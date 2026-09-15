import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/order-confirmed-CuI1f3XW.js
var $$splitComponentImporter = () => import("./order-confirmed-CTlsf8tZ.mjs");
var Route = createFileRoute("/order-confirmed")({
	validateSearch: (search) => ({
		order: typeof search["order"] === "string" ? search["order"] : void 0,
		total: typeof search["total"] === "number" ? search["total"] : void 0
	}),
	head: () => ({ meta: [
		{ title: "Order Confirmed — Y.G Asafoetida" },
		{
			name: "description",
			content: "Thank you for your Y.G Asafoetida order."
		},
		{
			property: "og:title",
			content: "Order Confirmed — Y.G Asafoetida"
		},
		{
			property: "og:description",
			content: "Your hing is on its way from Tirunelveli."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
