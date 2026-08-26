/**
 * Slug -> Microsoft Fluent Emoji asset name.
 *
 * The slug is what the UI imports (`<Art3D name="rocket" />`); the value is the
 * folder name inside microsoft/fluentui-emoji. Keep slugs semantic — they name a
 * role in the product, not the emoji — so swapping in a bought 3D pack later is a
 * one-line change per entry rather than a hunt through JSX.
 */
export const MANIFEST = {
  // -- Brand & journey -------------------------------------------------------
  rocket: "Rocket",
  "graduation-cap": "Graduation cap",
  books: "Books",
  "world-map": "World map",
  "glowing-star": "Glowing star",
  compass: "Compass",

  // -- Admissions funnel -----------------------------------------------------
  memo: "Memo",
  clipboard: "Clipboard",
  guardian: "House with garden",
  "id-card": "Identification card",
  shield: "Shield",
  "credit-card": "Credit card",
  check: "Check mark button",
  hourglass: "Hourglass not done",
  locked: "Locked",
  unlocked: "Unlocked",
  key: "Key",

  // -- Gamification ----------------------------------------------------------
  trophy: "Trophy",
  fire: "Fire",
  star: "Star",
  gem: "Gem stone",
  crown: "Crown",
  party: "Party popper",
  gift: "Wrapped gift",
  target: "Bullseye",
  "chart-up": "Chart increasing",
  "bar-chart": "Bar chart",
  bolt: "High voltage",
  medal: "1st place medal",

  // -- 7 pillars of career readiness ----------------------------------------
  brain: "Brain",
  "money-bag": "Money bag",
  telescope: "Telescope",
  handshake: "Handshake",
  tools: "Hammer and wrench",
  energy: "Battery",
  seedling: "Seedling",

  // -- 14 Nigerian sectors ---------------------------------------------------
  laptop: "Laptop",
  bank: "Bank",
  stethoscope: "Stethoscope",
  sheaf: "Sheaf of rice",
  clapper: "Clapper board",
  scales: "Balance scale",
  construction: "Building construction",
  truck: "Delivery truck",
  "fork-knife": "Fork and knife",
  dress: "Dress",
  soccer: "Soccer ball",
  satellite: "Satellite antenna",

  // -- Community & learning --------------------------------------------------
  people: "Busts in silhouette",
  speech: "Speech balloon",
  "video-camera": "Video camera",
  bulb: "Light bulb",
  magnifier: "Magnifying glass tilted left",
  package: "Package",
  briefcase: "Briefcase",
  office: "Office building",
  bell: "Bell",
  gear: "Gear",
  calendar: "Spiral calendar",
  pushpin: "Round pushpin",
};
