/**
 * Recipe hub content. Each recipe links to the hing products it uses, so a
 * reader can add the right jar to the basket without hunting through the shop.
 */
export type Recipe = {
  slug: string;
  title: string;
  blurb: string;
  region: string;
  minutes: number;
  serves: number;
  difficulty: "Easy" | "Medium";
  heroSlug: string;
  /** Product slugs used in the dish — powers "add hing to basket". */
  uses: string[];
  ingredients: string[];
  steps: string[];
  tip: string;
};

export const recipes: Recipe[] = [
  {
    slug: "tirunelveli-rasam",
    title: "Tirunelveli pepper rasam",
    blurb:
      "The clear, peppery rasam our family drinks at the end of every meal. The hing goes in at the tempering, never earlier.",
    region: "Tirunelveli",
    minutes: 25,
    serves: 4,
    difficulty: "Easy",
    heroSlug: "gold-asafoetida-powder",
    uses: ["gold-asafoetida-powder"],
    ingredients: [
      "1 lime-sized ball of tamarind, soaked in 2 cups warm water",
      "2 tomatoes, crushed by hand",
      "1 tsp black pepper + 1 tsp cumin, coarsely pounded",
      "1/4 tsp Y.G Gold Asafoetida Powder",
      "2 tsp ghee, 1 tsp mustard seeds, 2 dried red chillies, curry leaves",
      "Turmeric, salt, coriander leaves",
    ],
    steps: [
      "Strain the tamarind water into a pot, add tomatoes, turmeric and salt, and simmer for 8 minutes until the raw smell goes.",
      "Add the pounded pepper-cumin and 1 more cup of water. Heat until it froths at the edges — do not let it boil hard.",
      "Heat ghee in a small pan, crackle the mustard, add chillies and curry leaves, then switch off and stir in the hing.",
      "Pour the tempering over the rasam, cover for 2 minutes, and finish with coriander leaves.",
    ],
    tip: "Adding hing to ghee off the flame keeps the aroma; burnt hing turns bitter.",
  },
  {
    slug: "curd-rice-with-granules",
    title: "Temple-style curd rice",
    blurb:
      "Soft rice, cold curd, and crushed hing granules that bloom slowly as it rests. The reason granules exist.",
    region: "Madurai",
    minutes: 20,
    serves: 3,
    difficulty: "Easy",
    heroSlug: "hing-pellets",
    uses: ["hing-pellets"],
    ingredients: [
      "1 cup rice, cooked soft and mashed while warm",
      "1.5 cups thick curd + 1/4 cup milk",
      "4–5 Y.G Hing Pellets, crushed between the fingers",
      "1 tsp ghee, mustard seeds, urad dal, green chilli, ginger, curry leaves",
      "Salt, grated carrot, pomegranate to finish",
    ],
    steps: [
      "Mash the warm rice with milk so it stays creamy even after chilling.",
      "Cool fully, then fold in curd and salt. Never add curd to hot rice.",
      "Temper mustard, urad dal, chilli, ginger and curry leaves; crush the hing granules into the hot ghee for 3 seconds.",
      "Stir the tempering through and rest for 15 minutes before serving.",
    ],
    tip: "Granules keep releasing aroma as the curd rice sits — pack it for a journey and it only gets better.",
  },
  {
    slug: "vathal-kuzhambu",
    title: "Vathal kuzhambu",
    blurb:
      "A dark, tangy gravy built on traditional tempering and hing. This is where the gold cake earns its keep.",
    region: "Kongunadu",
    minutes: 35,
    serves: 4,
    difficulty: "Medium",
    heroSlug: "asafoetida-gold-cake",
    uses: ["asafoetida-gold-cake", "gold-asafoetida-powder"],
    ingredients: [
      "3 tbsp ghee (or traditional tempering base)",
      "A pea-sized piece scraped from a YG Gold Asafoetida Cake",
      "1 tbsp sambar powder, 1 tsp rice flour",
      "Manathakkali or sundakkai vathal, a handful",
      "Thick tamarind extract from a lemon-sized ball, jaggery, salt",
    ],
    steps: [
      "Warm the ghee, crackle mustard and fenugreek, then fry the vathal until it darkens.",
      "Scrape in the hing cake and let it dissolve for 10 seconds.",
      "Add tamarind extract, sambar powder, salt and a small piece of jaggery. Simmer 20 minutes until aromatic ghee floats on top.",
      "Slurry the rice flour in water, stir in, and cook 2 more minutes to thicken.",
    ],
    tip: "This gravy keeps for four days and deepens each day — make it on Sunday for the week.",
  },
  {
    slug: "gluten-free-sambar",
    title: "Everyday gluten-free sambar",
    blurb:
      "The same weekday sambar, made with our rice-starch hing so a gluten-free kitchen loses nothing.",
    region: "Tamil Nadu",
    minutes: 40,
    serves: 5,
    difficulty: "Easy",
    heroSlug: "gluten-free-hing-powder",
    uses: ["gluten-free-hing-powder"],
    ingredients: [
      "3/4 cup toor dal, pressure-cooked soft",
      "Drumstick, brinjal, shallots — 2 cups mixed",
      "2 tbsp sambar powder, tamarind extract, turmeric, salt",
      "1/4 tsp YG Gluten-Free Hing Powder",
      "Ghee, mustard, curry leaves, coriander",
    ],
    steps: [
      "Boil the vegetables in tamarind water with turmeric, salt and sambar powder until just tender.",
      "Whisk in the cooked dal and simmer 10 minutes so the flavours settle.",
      "Temper mustard and curry leaves in ghee, stir in the gluten-free hing off the flame, and pour over.",
      "Rest for 10 minutes before serving with rice and a spoon of ghee.",
    ],
    tip: "Rice-starch hing dissolves faster than wheat-based hing — a quarter teaspoon is plenty.",
  },
];

export function getRecipe(slug: string) {
  return recipes.find((r) => r.slug === slug);
}
