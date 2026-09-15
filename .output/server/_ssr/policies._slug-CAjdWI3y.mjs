import { M as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/policies._slug-CAjdWI3y.js
var policies = [
	{
		slug: "shipping",
		title: "Shipping & delivery",
		summary: "Dispatched from our Tirunelveli works within 24 working hours. Free across India above ₹499.",
		updated: "August 2026",
		sections: [
			{
				heading: "Dispatch times",
				body: ["Orders placed before 2 PM IST on a working day are packed and handed to the courier the same evening. Orders after that, or on Sundays and festival holidays, move to the next working day."]
			},
			{
				heading: "Delivery estimates",
				body: ["Once dispatched, typical transit times are:"],
				bullets: [
					"Tamil Nadu, Kerala, Karnataka, Andhra Pradesh, Telangana — 2 to 3 days",
					"Rest of India — 4 to 6 days",
					"North-east, Jammu & Kashmir, island territories — 6 to 9 days"
				]
			},
			{
				heading: "Shipping charges",
				body: ["Standard shipping is ₹49 and is free on every order above ₹499. Express dispatch, where available, is ₹99 and moves your parcel to the front of the day's queue."]
			},
			{
				heading: "Packaging",
				body: ["Hing travels badly in humidity, so every jar is sealed, shrink-wrapped and boxed with kraft cushioning. If a parcel reaches you damaged or open, photograph it before opening and contact us within 48 hours."]
			}
		]
	},
	{
		slug: "returns",
		title: "Returns, cancellation & refunds",
		summary: "Cancel free until dispatch. Report a damaged or wrong item within 7 days of delivery for a full refund.",
		updated: "August 2026",
		sections: [
			{
				heading: "Cancellation",
				body: ["You can cancel an order yourself from the order tracking page at any time before it is marked as shipped. Nothing is charged and no reason is required.", "Once a parcel is with the courier it can no longer be cancelled — refuse the delivery or raise a refund request instead."]
			},
			{
				heading: "Refund eligibility",
				body: ["Because hing is a sealed food product, we accept refund requests when:"],
				bullets: [
					"The seal or jar arrived damaged or leaking",
					"You received a different product or pack size than ordered",
					"The batch is past, or very close to, its best-before date",
					"The parcel never arrived and the courier has confirmed loss"
				]
			},
			{
				heading: "What we cannot take back",
				body: ["Opened jars where the seal has been broken, and orders reported more than 7 days after delivery, cannot be refunded — food safety rules do not allow us to restock them. If the aroma is not what you expected, write to us anyway; we usually find a way to help."]
			},
			{
				heading: "Refund timelines",
				body: ["Approved refunds are raised within 2 working days. Card and UPI refunds reach you in 5 to 7 working days; cash-on-delivery refunds are sent by bank transfer once you share your account details."]
			}
		]
	},
	{
		slug: "privacy",
		title: "Privacy policy",
		summary: "We collect only what is needed to pack and deliver your order, and we never sell your details.",
		updated: "August 2026",
		sections: [
			{
				heading: "What we collect",
				body: ["Your name, delivery address, phone number and email, so a parcel can reach you and we can tell you where it is. If you write a review or raise a support ticket, we keep the message and any contact detail you attach to it."]
			},
			{
				heading: "How it is used",
				body: ["Your details are used to:"],
				bullets: [
					"Pack, ship and track your order",
					"Answer support tickets and reply to reviews you asked us to respond to",
					"Send order updates — marketing mail only if you opted in"
				]
			},
			{
				heading: "Who else sees it",
				body: ["Only our courier partner, who receives the name, address and phone number needed for delivery, and our payment provider, who handles the transaction. We do not sell or rent customer data to anyone."]
			},
			{
				heading: "Your choices",
				body: ["Write to hello@ygasafoetida.com to see, correct or delete the details we hold about you. Preferences saved in your browser can be cleared any time from your browser settings."]
			}
		]
	},
	{
		slug: "terms",
		title: "Terms of use",
		summary: "The basic rules for buying from Y.G Asafoetida, in plain language.",
		updated: "August 2026",
		sections: [
			{
				heading: "Orders and pricing",
				body: ["All prices are in Indian rupees and include GST. We may correct an obviously wrong price before dispatch; if that happens we will contact you and cancel the order at no cost if you prefer."]
			},
			{
				heading: "Product information",
				body: ["Asafoetida is an agricultural product. Colour, aroma strength and granule size vary a little between batches — this is normal and not a defect. Ingredient lists and allergen information on each product page are kept current with the batch being packed."]
			},
			{
				heading: "Food safety",
				body: ["Our compounded hing contains wheat starch unless you buy the gluten-free line, which is made on a rice-starch base. Anyone with a severe allergy should read the ingredients on the pack before use."]
			},
			{
				heading: "Contact and jurisdiction",
				body: ["Y.G Asafoetida / Mayil Agro Foods, Tirunelveli, Tamil Nadu. Any dispute is subject to the jurisdiction of the courts of Tirunelveli."]
			}
		]
	}
];
var $$splitComponentImporter = () => import("./policies._slug-2imnZqB4.mjs");
var Route = createFileRoute("/policies/$slug")({
	loader: ({ params }) => {
		const policy = policies.find((p) => p.slug === params.slug);
		if (!policy) throw notFound();
		return policy;
	},
	head: ({ loaderData }) => ({
		meta: loaderData ? [
			{ title: `${loaderData.title} — Y.G Asafoetida Store Policies` },
			{
				name: "description",
				content: `${loaderData.summary.slice(0, 150)}... Read our official store policies.`
			},
			{
				property: "og:title",
				content: `${loaderData.title} — Y.G Asafoetida`
			},
			{
				property: "og:description",
				content: loaderData.summary.slice(0, 155)
			},
			{
				property: "og:type",
				content: "article"
			},
			{
				property: "og:url",
				content: `https://ygasafoetida.in/policies/${loaderData.slug}`
			},
			{
				property: "og:image",
				content: "https://ygasafoetida.in/logo.png"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		] : [],
		links: loaderData ? [{
			rel: "canonical",
			href: `https://ygasafoetida.in/policies/${loaderData.slug}`
		}] : []
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { policies as n, Route as t };
