import type { ProductCategory } from "@/types/product";

export interface Collection {
  /** Matches Product.subCategory. */
  slug: string;
  category: ProductCategory;
  /** Customer-facing name, used in headings and breadcrumbs. */
  label: string;
  /**
   * Compact label for navigation chips, where the full name is too long to
   * lay out evenly. The full `label` remains the page heading and title.
   */
  shortLabel: string;
  /** Short phrase for meta descriptions — reads naturally after a count. */
  metaNoun: string;
  /** Original editorial copy. Written for this site, not sourced from vendors. */
  intro: string;
  /** Three things a buyer should weigh, shown as a short guide on the page. */
  buyingPoints: string[];
}

/**
 * Editorial definitions for each jewellery sub-category.
 *
 * These landing pages exist to rank for the specific long-tail terms people
 * actually search ("diamond tennis bracelet", "three stone engagement ring"),
 * which the flat /jewelry listing cannot target. All copy below is original.
 */
export const collections: Collection[] = [
  {
    slug: "diamond-engagement-rings",
    category: "rings",
    label: "Diamond Engagement Rings",
    shortLabel: "Engagement Rings",
    metaNoun: "diamond engagement rings",
    intro:
      "An engagement ring is the one piece of jewellery chosen to be worn every day for a lifetime, so it earns a different kind of scrutiny than anything else in a collection. Our engagement rings pair a centre stone you select with settings that range from a single unbroken band to shoulders lined with pavé diamonds. Every ring is made to order, which means the centre stone, the metal and the finish are all decisions you make rather than inherit.",
    buyingPoints: [
      "Cut grade influences sparkle more than carat weight — a well-cut smaller stone will outshine a larger, poorly cut one.",
      "Match the setting to daily life: low-profile bezel and flush settings survive knocks that a high cathedral setting will not.",
      "Choose the metal alongside the stone. Warmer G–J colour grades read as bright white in yellow gold, letting you spend elsewhere.",
    ],
  },
  {
    slug: "diamond-solitaire-engagement-rings",
    category: "rings",
    label: "Diamond Solitaire Engagement Rings",
    shortLabel: "Solitaire",
    metaNoun: "diamond solitaire engagement rings",
    intro:
      "A solitaire puts one diamond on an undecorated band and asks it to carry the whole design. Nothing competes for attention and nothing hides a flaw, which is why the solitaire remains the most demanding and the most enduring of engagement styles. It is also the easiest silhouette to pair with a wedding band later.",
    buyingPoints: [
      "With no side stones to distract the eye, prioritise cut and clarity over sheer carat weight.",
      "Prong count changes the look: four prongs read square and modern, six prongs read classic and hold the stone more securely.",
      "A plain band sits flush against most wedding rings, so consider the pair together before committing.",
    ],
  },
  {
    slug: "three-stone-diamond-engagement-rings",
    category: "rings",
    label: "Three Stone Diamond Engagement Rings",
    shortLabel: "Three Stone",
    metaNoun: "three stone diamond engagement rings",
    intro:
      "Three stones are traditionally read as past, present and future, which has made this arrangement as popular for anniversaries as for proposals. Practically, the flanking stones broaden the ring's presence on the finger and let a modest centre stone look considerably larger. The proportion between centre and sides is the decision that defines the design.",
    buyingPoints: [
      "Keep the side stones close to the centre in colour and clarity — a mismatch is far more visible here than in pavé.",
      "Tapered baguettes give a crisp architectural line; round or pear sides give a softer, fuller look.",
      "Side stones add width, so allow for a wedding band that either contours around them or sits deliberately apart.",
    ],
  },
  {
    slug: "diamond-anniversary-wedding-rings",
    category: "rings",
    label: "Diamond Anniversary & Wedding Rings",
    shortLabel: "Anniversary & Wedding",
    metaNoun: "diamond anniversary and wedding rings",
    intro:
      "Anniversary and wedding rings are built for constant wear, so construction matters as much as appearance. These designs run from a discreet line of channel-set diamonds to a full eternity band set the whole way round. Because they are worn stacked against an engagement ring, profile and metal matching deserve as much thought as the stones.",
    buyingPoints: [
      "Channel and bezel settings protect diamonds from knocks better than shared-prong or micro-pavé.",
      "A full eternity band cannot be resized later — confirm your size before ordering one.",
      "Match the metal to the ring it will sit beside; a harder metal will slowly wear a softer neighbour.",
    ],
  },
  {
    slug: "diamond-bridal-wedding-sets",
    category: "rings",
    label: "Diamond Bridal & Wedding Sets",
    shortLabel: "Bridal Sets",
    metaNoun: "diamond bridal and wedding sets",
    intro:
      "A bridal set solves the fit problem by designing the engagement ring and the wedding band as one object from the start. The band contours to the centre setting instead of leaving a gap, and the metal, finish and diamond quality match by construction rather than by luck. For anyone who dislikes the look of two rings that not quite meet, this is the answer.",
    buyingPoints: [
      "Sets sit flush by design, which removes the gap that catches on fabric and collects grit.",
      "Buying together guarantees the metal colour and finish match exactly — hard to achieve when pieces are bought years apart.",
      "Ask whether the bands can be worn separately; some contoured designs only make sense as a pair.",
    ],
  },
  {
    slug: "stud-diamond-earrings",
    category: "earrings",
    label: "Diamond Stud Earrings",
    shortLabel: "Studs",
    metaNoun: "diamond stud earrings",
    intro:
      "Studs are the most worn diamond jewellery there is, precisely because they suit everything and demand no thought once they are in. That constant wear puts the emphasis squarely on the fitting: a stud that loosens is a stud that gets lost. Beyond the setting, the choice is simply how much presence you want at the earlobe.",
    buyingPoints: [
      "Screw-back fittings are markedly more secure than friction posts for earrings worn overnight or during sport.",
      "Studs are bought in pairs, so the two stones must be matched for colour and cut, not merely graded well individually.",
      "Martini settings sit low and discreet; basket settings lift the stone for more visible sparkle from the side.",
    ],
  },
  {
    slug: "diamond-hoop-earrings",
    category: "earrings",
    label: "Diamond Hoop Earrings",
    shortLabel: "Hoops",
    metaNoun: "diamond hoop earrings",
    intro:
      "A diamond hoop earns its effect from movement — the circle carries light around the ear as the head turns, which a fixed stud cannot do. Inside-out designs set diamonds on both the inner and outer faces so the sparkle survives whichever way the hoop settles. Diameter and weight are the two practical decisions.",
    buyingPoints: [
      "Inside-out settings sparkle from every angle; outer-only settings cost less but go dark when the hoop turns.",
      "Weight matters more than size for comfort — a wide hoop in a heavy metal will drag on the piercing.",
      "Check the closure: a hinged snap-post is far more secure than an open hook for everyday wear.",
    ],
  },
  {
    slug: "diamond-drop-earrings",
    category: "earrings",
    label: "Diamond Drop Earrings",
    shortLabel: "Drops",
    metaNoun: "diamond drop earrings",
    intro:
      "Drop earrings introduce motion and length, which is why they read as occasion jewellery even in restrained designs. The articulation point is what separates a good drop from a stiff one: a well-made joint lets the lower element swing freely and catch light continuously. Length should be chosen against the neckline it will be worn with.",
    buyingPoints: [
      "A freely articulated joint produces far more sparkle than a rigid drop of the same diamond weight.",
      "Longer drops suit an open or strapless neckline; shorter drops sit better against a collar.",
      "Confirm the post and back can carry the weight — a heavy drop on a thin post will tilt forward.",
    ],
  },
  {
    slug: "tennis-bracelets",
    category: "bracelets",
    label: "Diamond Tennis Bracelets",
    shortLabel: "Tennis Bracelets",
    metaNoun: "diamond tennis bracelets",
    intro:
      "A tennis bracelet is an unbroken line of matched diamonds running the full circumference of the wrist, and it is judged almost entirely on consistency. Any variation in colour, size or spacing shows immediately along a continuous line. Because the piece flexes constantly in wear, the quality of the links and the clasp determines whether it lasts.",
    buyingPoints: [
      "Consistency across every stone matters more here than the grade of any single diamond.",
      "Insist on a safety catch in addition to the main clasp — this is the piece most commonly lost.",
      "Have it fitted properly: too loose and it spins to show the clasp, too tight and it will not sit flat.",
    ],
  },
  {
    slug: "diamond-bracelets",
    category: "bracelets",
    label: "Diamond Bracelets",
    shortLabel: "Diamond Bracelets",
    metaNoun: "diamond bracelets",
    intro:
      "Beyond the classic tennis line, diamond bracelets cover link designs, station spacings and mixed-texture pieces that pair polished gold with set stones. These designs generally use diamonds as accent rather than as the entire structure, which makes them more forgiving to wear and easier to combine with a watch. Drape and clasp quality are what separate the good from the merely shiny.",
    buyingPoints: [
      "A bracelet that drapes properly will follow the wrist; a stiff one rides up and sits awkwardly.",
      "Station and link designs hide the occasional knock far better than a continuous pavé surface.",
      "If it will be worn alongside a watch, check the profile — a raised setting will scratch a case.",
    ],
  },
  {
    slug: "bangle-bracelets",
    category: "bracelets",
    label: "Diamond Bangle Bracelets",
    shortLabel: "Bangles",
    metaNoun: "diamond bangle bracelets",
    intro:
      "A bangle holds its shape rather than following the wrist, which gives it a cleaner architectural line than any flexible bracelet. That rigidity makes sizing critical: a bangle is either right or unwearable. Hinged designs open to clear the hand, while solid slip-on bangles must be sized to pass over the knuckles.",
    buyingPoints: [
      "Measure the widest point of your hand, not your wrist, if you are considering a solid slip-on design.",
      "Hinged bangles fit closely without needing to clear the knuckle, but add a joint that can wear over time.",
      "Rigid bangles take knocks on the outer face — recessed or bezel settings protect stones better here.",
    ],
  },
  {
    slug: "red-carpet-bracelets",
    category: "bracelets",
    label: "Red Carpet Diamond Bracelets",
    shortLabel: "Red Carpet",
    metaNoun: "red carpet diamond bracelets",
    intro:
      "These are the deliberately maximal designs — wide, densely set and built to read from across a room rather than up close. Many run to several hundred stones and carat weights well above everyday jewellery, combining princess and round cuts in geometric repeats. They are occasion pieces, and they are sized and constructed accordingly.",
    buyingPoints: [
      "Total carat weight varies substantially between sizes in these designs — confirm the weight for your wrist size.",
      "Wide, heavy bracelets need a robust double-catch clasp; a single tongue clasp is not enough.",
      "Ask for the stone count and average size, not just total weight, to understand how the piece will actually look.",
    ],
  },
  {
    slug: "vintage-diamond-bracelets",
    category: "bracelets",
    label: "Vintage Diamond Bracelets",
    shortLabel: "Vintage",
    metaNoun: "vintage-inspired diamond bracelets",
    intro:
      "Vintage-inspired designs borrow from Art Deco geometry and Edwardian filigree — milgrain edging, openwork galleries and stones set in patterns rather than plain lines. The detail is in the metalwork as much as the diamonds, and that detail is what gives these pieces character a plain line bracelet cannot match. It also means more surfaces to keep clean.",
    buyingPoints: [
      "Milgrain and openwork collect grit — plan on periodic professional cleaning to keep the detail crisp.",
      "Fine filigree galleries are more fragile than solid metal; these suit occasional rather than constant wear.",
      "Look at the reverse of the piece: on well-made vintage-style work the gallery is finished, not left rough.",
    ],
  },
  {
    slug: "birthstone-gemstone-bracelets",
    category: "bracelets",
    label: "Birthstone & Gemstone Bracelets",
    shortLabel: "Birthstone & Gemstone",
    metaNoun: "birthstone and gemstone bracelets",
    intro:
      "Coloured stones set against diamonds give a bracelet a personal dimension that white stones alone cannot, whether the choice follows a birth month or simply a preferred colour. Sapphire, ruby and emerald behave quite differently from diamond in wear, so the setting has to account for the stone. Colour saturation, not size, is what determines how a coloured stone reads.",
    buyingPoints: [
      "Hardness varies widely: sapphire and ruby take daily wear well, emerald and opal need protective settings.",
      "Judge coloured stones on saturation and evenness of colour before carat weight.",
      "Diamond accents beside a coloured stone make it read more intensely — useful with paler material.",
    ],
  },
  {
    slug: "gold-platinum-bracelets",
    category: "bracelets",
    label: "Gold & Platinum Bracelets",
    shortLabel: "Gold & Platinum",
    metaNoun: "gold and platinum bracelets",
    intro:
      "These designs let the metal carry the piece, using diamonds sparingly or not at all. That puts the emphasis on link construction, surface finish and weight — the qualities you notice by handling rather than by looking. A well-made metal bracelet is often the most worn piece in a collection precisely because it needs no care.",
    buyingPoints: [
      "Platinum is denser and holds a finish longer; gold is lighter and easier to repair or resize.",
      "Solid links wear far better than hollow ones, which dent and are difficult to repair invisibly.",
      "A polished finish shows scratches sooner than a brushed or satin one — choose for how you actually wear it.",
    ],
  },
  {
    slug: "mens-bracelets",
    category: "bracelets",
    label: "Men's Diamond Bracelets",
    shortLabel: "Men's Bracelets",
    metaNoun: "men's diamond bracelets",
    intro:
      "Men's designs run heavier in gauge and more restrained in setting, with diamonds recessed into the metal rather than raised above it. The result is a piece that reads as substantial rather than sparkling, and one that survives being worn without thought. Weight and clasp security are the two things worth getting right.",
    buyingPoints: [
      "Flush and channel settings sit below the metal surface and survive knocks that raised prongs will not.",
      "Heavier gauges feel better in wear but need a correspondingly robust clasp — check it takes the weight.",
      "If worn with a watch, decide which wrist first; matching metals across both is worth the effort.",
    ],
  },
  {
    slug: "diamond-pendant",
    category: "pendant",
    label: "Diamond Pendants",
    shortLabel: "Pendants",
    metaNoun: "diamond pendants",
    intro:
      "A pendant sits in the most visible position of any jewellery, directly below the face, and needs very little diamond weight to register. That makes it one of the most efficient pieces to buy well. The two decisions that matter are how the stone is held and how long the chain sits.",
    buyingPoints: [
      "Chain length changes everything: 16in sits at the collarbone, 18in just below, 20in and over on the sternum.",
      "A bail that lets the pendant sit flat will always look better than one that leaves it twisting forward.",
      "Because a pendant is seen close up and face on, clarity is more noticeable here than in a ring.",
    ],
  },
  {
    slug: "diamond-tennis-necklaces",
    category: "pendant",
    label: "Diamond Tennis Necklaces",
    shortLabel: "Tennis Necklaces",
    metaNoun: "diamond tennis necklaces",
    intro:
      "A tennis necklace applies the continuous-line principle of the tennis bracelet to the neckline, and it is the most demanding piece in any collection to make well. Every stone is visible at once, so matching must hold across a hundred or more diamonds. It also has to articulate smoothly enough to follow the curve of the neck rather than standing away from it.",
    buyingPoints: [
      "Articulation is everything — a well-made tennis necklace curves with the neck instead of sitting proud.",
      "Stone matching across the full length is the hardest thing to achieve and the first place to inspect.",
      "A concealed clasp integrated into the line looks considerably better than an obvious lobster catch.",
    ],
  },
  {
    slug: "fashion-diamond-necklaces",
    category: "pendant",
    label: "Fashion Diamond Necklaces",
    shortLabel: "Fashion Necklaces",
    metaNoun: "fashion diamond necklaces",
    intro:
      "These are the designs that treat the whole neckline as the canvas — layered strands, asymmetric drops and station settings that place diamonds at intervals rather than in a continuous line. They are chosen for their silhouette as much as their stones, and they are the pieces that date a look, for better or worse. Consider what they will be worn with.",
    buyingPoints: [
      "Station designs give diamond presence across a long line for a fraction of a continuous setting's weight.",
      "If you layer necklaces, check chain gauges are similar — mismatched weights tangle constantly.",
      "Try the silhouette against the necklines you actually wear before committing to an unusual shape.",
    ],
  },
  {
    slug: "fancy-necklaces",
    category: "pendant",
    label: "Fancy Diamond Necklaces",
    shortLabel: "Statement Necklaces",
    metaNoun: "statement diamond necklaces",
    intro:
      "The most elaborate work in the collection: multi-row designs, graduated settings and pieces built around a single significant centre stone. These are made for events rather than for Tuesdays, and they are constructed to a different standard because the weight involved demands it. Fit is not optional on a piece like this.",
    buyingPoints: [
      "Graduated designs must be fitted to sit correctly — a statement necklace that hangs wrong ruins the effect.",
      "Ask how the weight is distributed; a heavy centre needs a counterweight or a broader back section.",
      "These pieces reward a fitted case and proper storage far more than everyday jewellery does.",
    ],
  },
  {
    slug: "fashion-rings",
    category: "rings",
    label: "Diamond Fashion Rings",
    shortLabel: "Fashion Rings",
    metaNoun: "diamond fashion rings",
    intro:
      "Fashion rings are the pieces bought for no occasion at all — woven bands, eternity designs and stacking rings chosen because they work with what is already in the jewellery box. Without the symbolic weight of an engagement ring, the decisions become purely practical: how it stacks, how it wears, and whether it still looks right in five years. These are the rings that get worn most.",
    buyingPoints: [
      "Stacking rings should share a profile height, or the tallest will lift the others off the finger.",
      "Woven and openwork bands cannot usually be resized — get the size right the first time.",
      "For a ring worn daily on the same finger as others, matching the metal prevents one slowly abrading another.",
    ],
  },
];

/**
 * Normalises a sub-category key for comparison. The catalogue mixes casing
 * styles ("Fashion-Rings" alongside "diamond-engagement-rings"), so both the
 * URL slug and the raw data value are folded before matching.
 */
export function normaliseSubCategory(value: string): string {
  return value.trim().toLowerCase();
}

export function findCollection(slug: string | undefined): Collection | undefined {
  if (!slug) return undefined;
  const key = normaliseSubCategory(slug);
  return collections.find((collection) => normaliseSubCategory(collection.slug) === key);
}

/** True when a product belongs to the given collection. */
export function productInCollection(subCategory: string, collection: Collection): boolean {
  return normaliseSubCategory(subCategory) === normaliseSubCategory(collection.slug);
}

export function collectionsForCategory(category: ProductCategory): Collection[] {
  return collections.filter((collection) => collection.category === category);
}
