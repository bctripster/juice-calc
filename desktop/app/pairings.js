// Built-in flavour profiles and pairing guide. Pure data + functions, no DOM.
// Percentages are starting points for a 2-4 flavour mix; concentrate strength varies by brand.

const PROFILES = [
  // fruit
  { id: "strawberry", label: "Strawberry", family: "fruit", pct: 4, kw: ["strawberr", "fraise"] },
  { id: "raspberry", label: "Raspberry", family: "fruit", pct: 3, kw: ["raspberr"] },
  { id: "blueberry", label: "Blueberry", family: "fruit", pct: 4, kw: ["blueberr", "bilberr"] },
  { id: "blackberry", label: "Blackberry", family: "fruit", pct: 3, kw: ["blackberr", "bramble"] },
  { id: "boysenberry", label: "Boysenberry", family: "fruit", pct: 3, kw: ["boysenberr"] },
  { id: "cranberry", label: "Cranberry", family: "fruit", pct: 3, kw: ["cranberr"] },
  { id: "elderberry", label: "Elderberry", family: "fruit", pct: 2, kw: ["elderberr", "elderflower"] },
  { id: "gooseberry", label: "Gooseberry", family: "fruit", pct: 3, kw: ["gooseberr"] },
  { id: "plum", label: "Plum", family: "fruit", pct: 3, kw: ["plum", "prune"] },
  { id: "papaya", label: "Papaya", family: "fruit", pct: 3, kw: ["papaya"] },
  { id: "blackcurrant", label: "Blackcurrant", family: "fruit", pct: 3, kw: ["blackcurrant", "black currant", "cassis"] },
  { id: "cherry", label: "Cherry", family: "fruit", pct: 3, kw: ["cherr"] },
  { id: "apple", label: "Apple", family: "fruit", pct: 4, kw: ["apple"] },
  { id: "pear", label: "Pear", family: "fruit", pct: 3, kw: ["pear"] },
  { id: "peach", label: "Peach", family: "fruit", pct: 4, kw: ["peach", "nectarine"] },
  { id: "apricot", label: "Apricot", family: "fruit", pct: 3, kw: ["apricot"] },
  { id: "mango", label: "Mango", family: "fruit", pct: 4, kw: ["mango"] },
  { id: "pineapple", label: "Pineapple", family: "fruit", pct: 3, kw: ["pineapple"] },
  { id: "banana", label: "Banana", family: "fruit", pct: 3, kw: ["banana"] },
  { id: "watermelon", label: "Watermelon", family: "fruit", pct: 4, kw: ["watermelon"] },
  { id: "melon", label: "Melon", family: "fruit", pct: 4, kw: ["honeydew", "cantaloupe", "melon"] },
  { id: "lemon", label: "Lemon", family: "fruit", pct: 3, kw: ["lemon"] },
  { id: "lime", label: "Lime", family: "fruit", pct: 2, kw: ["lime"] },
  { id: "orange", label: "Orange", family: "fruit", pct: 4, kw: ["orange", "mandarin", "tangerine", "clementine"] },
  { id: "grapefruit", label: "Grapefruit", family: "fruit", pct: 3, kw: ["grapefruit"] },
  { id: "grape", label: "Grape", family: "fruit", pct: 4, kw: ["grape"] },
  { id: "kiwi", label: "Kiwi", family: "fruit", pct: 3, kw: ["kiwi"] },
  { id: "passionfruit", label: "Passion fruit", family: "fruit", pct: 2, kw: ["passion"] },
  { id: "guava", label: "Guava", family: "fruit", pct: 3, kw: ["guava"] },
  { id: "lychee", label: "Lychee", family: "fruit", pct: 3, kw: ["lychee", "litchi"] },
  { id: "dragonfruit", label: "Dragon fruit", family: "fruit", pct: 3, kw: ["dragon", "pitaya"] },
  { id: "pomegranate", label: "Pomegranate", family: "fruit", pct: 3, kw: ["pomegranate"] },
  { id: "coconut", label: "Coconut", family: "fruit", pct: 2, kw: ["coconut"] },
  // dessert and bakery
  { id: "custard", label: "Custard", family: "dessert", pct: 4, kw: ["custard", "creme brulee", "flan"] },
  { id: "vanilla", label: "Vanilla", family: "dessert", pct: 2, kw: ["vanilla", "vanillin"] },
  { id: "cream", label: "Cream", family: "dessert", pct: 3, kw: ["cream", "bavarian", "whipped", "creamy"] },
  { id: "cheesecake", label: "Cheesecake", family: "dessert", pct: 3, kw: ["cheesecake"] },
  { id: "yogurt", label: "Yogurt", family: "dessert", pct: 3, kw: ["yogurt", "yoghurt"] },
  { id: "milk", label: "Milk", family: "dessert", pct: 2, kw: ["milk"] },
  { id: "icecream", label: "Ice cream", family: "dessert", pct: 3, kw: ["ice cream", "gelato"] },
  { id: "graham", label: "Graham cracker", family: "bakery", pct: 2, kw: ["graham", "digestive"] },
  { id: "cookie", label: "Cookie / biscuit", family: "bakery", pct: 3, kw: ["cookie", "biscuit", "shortbread", "sugar cookie"] },
  { id: "piecrust", label: "Pie crust", family: "bakery", pct: 2, kw: ["pie crust", "crust", "pastry", "tart"] },
  { id: "cake", label: "Cake", family: "bakery", pct: 3, kw: ["cake", "muffin", "sponge", "bread"] },
  { id: "donut", label: "Donut", family: "bakery", pct: 3, kw: ["donut", "doughnut"] },
  { id: "waffle", label: "Waffle / pancake", family: "bakery", pct: 2, kw: ["waffle", "pancake"] },
  { id: "cereal", label: "Cereal", family: "bakery", pct: 3, kw: ["cereal", "crunch", "loops", "flakes"] },
  { id: "meringue", label: "Meringue", family: "dessert", pct: 1.5, kw: ["meringue"] },
  { id: "marshmallow", label: "Marshmallow", family: "dessert", pct: 2, kw: ["marshmallow"] },
  { id: "caramel", label: "Caramel", family: "dessert", pct: 2, kw: ["caramel", "dulce"] },
  { id: "butterscotch", label: "Butterscotch / toffee", family: "dessert", pct: 2, kw: ["butterscotch", "toffee"] },
  { id: "chocolate", label: "Chocolate", family: "dessert", pct: 2, kw: ["chocolate", "cocoa", "cacao"] },
  { id: "hazelnut", label: "Hazelnut", family: "nut", pct: 2, kw: ["hazelnut"] },
  { id: "peanut", label: "Peanut", family: "nut", pct: 2, kw: ["peanut"] },
  { id: "almond", label: "Almond", family: "nut", pct: 1.5, kw: ["almond", "amaretto"] },
  { id: "walnut", label: "Walnut / pecan", family: "nut", pct: 1.5, kw: ["walnut", "pecan"] },
  { id: "cinnamon", label: "Cinnamon", family: "spice", pct: 0.75, kw: ["cinnamon"] },
  { id: "maple", label: "Maple", family: "dessert", pct: 1.5, kw: ["maple"] },
  { id: "honey", label: "Honey", family: "dessert", pct: 1.5, kw: ["honey"] },
  { id: "cottoncandy", label: "Cotton candy", family: "candy", pct: 3, kw: ["cotton candy", "candy floss", "fairy floss"] },
  { id: "bubblegum", label: "Bubblegum", family: "candy", pct: 3, kw: ["bubblegum", "bubble gum"] },
  // drinks
  { id: "coffee", label: "Coffee", family: "drink", pct: 3, kw: ["coffee", "espresso", "mocha", "latte"] },
  { id: "tea", label: "Tea", family: "drink", pct: 3, kw: ["tea"] },
  { id: "cola", label: "Cola", family: "drink", pct: 3, kw: ["cola"] },
  { id: "lemonade", label: "Lemonade", family: "drink", pct: 3, kw: ["lemonade"] },
  { id: "rootbeer", label: "Root beer", family: "drink", pct: 3, kw: ["root beer", "rootbeer", "sarsaparilla"] },
  { id: "creamsoda", label: "Cream soda", family: "drink", pct: 3, kw: ["cream soda"] },
  { id: "ginger", label: "Ginger / ginger ale", family: "drink", pct: 1.5, kw: ["ginger"] },
  { id: "energy", label: "Energy drink", family: "drink", pct: 3, kw: ["energy drink", "energy", "red bull"] },
  { id: "fizz", label: "Fizz / soda", family: "enhancer", pct: 0.75, kw: ["fizz", "soda", "carbonat", "sparkling", "sparkle"] },
  // tobacco, mint and cooling
  { id: "tobacco", label: "Tobacco", family: "tobacco", pct: 3, kw: ["tobacco", "virginia", "burley", "cavendish", "latakia", "perique", "ry4", "cigar"] },
  { id: "menthol", label: "Menthol", family: "cool", pct: 1, kw: ["menthol"] },
  { id: "mint", label: "Mint", family: "cool", pct: 1.5, kw: ["mint", "peppermint", "spearmint", "wintergreen"] },
  { id: "cooling", label: "Cooling agent", family: "cool", pct: 0.5, kw: ["koolada", "cooling", "ws-23", "ws23", "ice"] },
  { id: "anise", label: "Anise", family: "spice", pct: 0.5, kw: ["anise", "aniseed", "liquorice", "licorice"] },
  { id: "rose", label: "Rose", family: "floral", pct: 0.5, kw: ["rose"] },
  { id: "sweetener", label: "Sweetener", family: "enhancer", pct: 0.5, kw: ["sweetener", "sucralose", "super sweet"] },
  { id: "maltol", label: "Ethyl maltol", family: "enhancer", pct: 0.5, kw: ["ethyl maltol", "maltol"] },
];
const PROFILE_BY_ID = Object.fromEntries(PROFILES.map((p) => [p.id, p]));

// Keywords match at the start of a word ("pear" doesn't match "spearmint"),
// and the longest keyword wins ("grapefruit" beats "grape").
function detectProfile(name) {
  const n = " " + String(name || "").toLowerCase().replace(/[^a-z0-9\- ]+/g, " ") + " ";
  let best = null, bestLen = 0;
  for (const p of PROFILES) for (const k of p.kw) {
    if (k.length > bestLen && n.includes(" " + k)) { best = p.id; bestLen = k.length; }
  }
  return best;
}

// Each part lists profiles that can fill it ("any"), a starting %, and whether it's optional.
const COMBOS = [
  { name: "Strawberry custard", parts: [{ any: ["strawberry"], pct: 4 }, { any: ["custard"], pct: 4 }, { any: ["vanilla", "cream"], pct: 1.5, opt: true }] },
  { name: "Strawberries and cream", parts: [{ any: ["strawberry"], pct: 5 }, { any: ["cream"], pct: 3 }, { any: ["sweetener", "maltol"], pct: 0.5, opt: true }] },
  { name: "Strawberry cheesecake", parts: [{ any: ["strawberry"], pct: 4 }, { any: ["cheesecake"], pct: 3 }, { any: ["graham"], pct: 2, opt: true }] },
  { name: "Strawberry kiwi", parts: [{ any: ["strawberry"], pct: 4 }, { any: ["kiwi"], pct: 3 }, { any: ["cooling"], pct: 0.5, opt: true }] },
  { name: "Strawberry watermelon", parts: [{ any: ["strawberry"], pct: 3 }, { any: ["watermelon"], pct: 4 }, { any: ["cooling", "menthol"], pct: 0.5, opt: true }] },
  { name: "Strawberry banana smoothie", parts: [{ any: ["strawberry"], pct: 4 }, { any: ["banana"], pct: 2.5 }, { any: ["yogurt", "cream", "milk"], pct: 2, opt: true }] },
  { name: "Strawberry milk", parts: [{ any: ["strawberry"], pct: 4 }, { any: ["milk", "cream"], pct: 3 }, { any: ["vanilla"], pct: 1, opt: true }] },
  { name: "Pink lemonade", parts: [{ any: ["raspberry", "strawberry"], pct: 3 }, { any: ["lemonade", "lemon"], pct: 3 }, { any: ["sweetener"], pct: 0.5, opt: true }, { any: ["fizz"], pct: 0.75, opt: true }] },
  { name: "Mixed berries", parts: [{ any: ["strawberry"], pct: 3 }, { any: ["raspberry"], pct: 2 }, { any: ["blueberry", "blackberry", "boysenberry"], pct: 3 }] },
  { name: "Blueberry muffin", parts: [{ any: ["blueberry"], pct: 4 }, { any: ["cake"], pct: 3 }, { any: ["cream", "vanilla"], pct: 1.5, opt: true }] },
  { name: "Blueberry cheesecake", parts: [{ any: ["blueberry"], pct: 4 }, { any: ["cheesecake"], pct: 3 }, { any: ["graham"], pct: 2, opt: true }] },
  { name: "Blueberry pancakes", parts: [{ any: ["blueberry"], pct: 3 }, { any: ["waffle"], pct: 2.5 }, { any: ["maple"], pct: 1.5, opt: true }] },
  { name: "Blackberry lemonade", parts: [{ any: ["blackberry"], pct: 3 }, { any: ["lemonade", "lemon"], pct: 3 }, { any: ["cooling"], pct: 0.5, opt: true }] },
  { name: "Blackcurrant chill", parts: [{ any: ["blackcurrant"], pct: 4 }, { any: ["menthol", "cooling"], pct: 0.75 }, { any: ["anise"], pct: 0.25, opt: true }] },
  { name: "Cherry cola", parts: [{ any: ["cherry"], pct: 3 }, { any: ["cola"], pct: 3 }, { any: ["vanilla"], pct: 1, opt: true }, { any: ["fizz"], pct: 0.75, opt: true }] },
  { name: "Cherry almond", parts: [{ any: ["cherry"], pct: 3 }, { any: ["almond"], pct: 1 }, { any: ["cream", "vanilla"], pct: 1.5, opt: true }] },
  { name: "Cherry vanilla tobacco", parts: [{ any: ["tobacco"], pct: 3 }, { any: ["cherry"], pct: 1.5 }, { any: ["vanilla"], pct: 1.5 }] },
  { name: "Apple pie", parts: [{ any: ["apple"], pct: 4 }, { any: ["piecrust", "cake"], pct: 2 }, { any: ["cinnamon"], pct: 0.5 }] },
  { name: "Apple pear", parts: [{ any: ["apple"], pct: 3 }, { any: ["pear"], pct: 3 }, { any: ["cooling"], pct: 0.5, opt: true }] },
  { name: "Caramel apple", parts: [{ any: ["apple"], pct: 4 }, { any: ["caramel", "butterscotch"], pct: 2 }] },
  { name: "Peaches and cream", parts: [{ any: ["peach", "apricot"], pct: 4 }, { any: ["cream"], pct: 3 }, { any: ["vanilla"], pct: 1, opt: true }] },
  { name: "Peach mango", parts: [{ any: ["peach"], pct: 3 }, { any: ["mango"], pct: 3 }, { any: ["cooling"], pct: 0.5, opt: true }] },
  { name: "Peach iced tea", parts: [{ any: ["peach"], pct: 3 }, { any: ["tea"], pct: 3 }, { any: ["lemon"], pct: 0.75, opt: true }] },
  { name: "Tropical punch", parts: [{ any: ["mango"], pct: 3 }, { any: ["pineapple"], pct: 2 }, { any: ["passionfruit", "guava", "coconut"], pct: 1.5, opt: true }] },
  { name: "Piña colada", parts: [{ any: ["pineapple"], pct: 3 }, { any: ["coconut"], pct: 2 }, { any: ["cream"], pct: 2, opt: true }] },
  { name: "Kiwi passion guava", parts: [{ any: ["kiwi"], pct: 3 }, { any: ["passionfruit"], pct: 1.5 }, { any: ["guava"], pct: 2 }] },
  { name: "Mango passion fruit", parts: [{ any: ["mango"], pct: 4 }, { any: ["passionfruit"], pct: 1.5 }, { any: ["cooling"], pct: 0.5, opt: true }] },
  { name: "Lychee rose", parts: [{ any: ["lychee"], pct: 4 }, { any: ["rose"], pct: 0.5 }, { any: ["cooling"], pct: 0.5, opt: true }] },
  { name: "Watermelon ice", parts: [{ any: ["watermelon"], pct: 5 }, { any: ["menthol", "cooling"], pct: 0.75 }, { any: ["sweetener"], pct: 0.5, opt: true }] },
  { name: "Melon medley", parts: [{ any: ["melon"], pct: 3 }, { any: ["watermelon"], pct: 3 }, { any: ["cooling"], pct: 0.5, opt: true }] },
  { name: "Melon cream", parts: [{ any: ["melon"], pct: 4 }, { any: ["cream"], pct: 2.5 }] },
  { name: "Lemon meringue pie", parts: [{ any: ["lemon"], pct: 3 }, { any: ["meringue", "cream"], pct: 1.5 }, { any: ["piecrust", "graham"], pct: 2 }] },
  { name: "Lemon cheesecake", parts: [{ any: ["lemon"], pct: 2.5 }, { any: ["cheesecake"], pct: 3 }, { any: ["graham"], pct: 1.5, opt: true }] },
  { name: "Orange creamsicle", parts: [{ any: ["orange"], pct: 4 }, { any: ["cream", "icecream"], pct: 3 }, { any: ["vanilla"], pct: 1.5, opt: true }] },
  { name: "Citrus burst", parts: [{ any: ["orange", "grapefruit"], pct: 3 }, { any: ["lemon", "lime"], pct: 2 }, { any: ["cooling"], pct: 0.5, opt: true }] },
  { name: "Banana cream pie", parts: [{ any: ["banana"], pct: 3 }, { any: ["cream", "custard"], pct: 3 }, { any: ["piecrust", "graham"], pct: 2, opt: true }] },
  { name: "Banana nut bread", parts: [{ any: ["banana"], pct: 3 }, { any: ["cake"], pct: 3 }, { any: ["walnut", "hazelnut"], pct: 1 }] },
  { name: "Coconut cream", parts: [{ any: ["coconut"], pct: 2 }, { any: ["cream"], pct: 3 }, { any: ["vanilla"], pct: 1.5, opt: true }] },
  { name: "Vanilla custard", parts: [{ any: ["custard"], pct: 5 }, { any: ["vanilla"], pct: 2 }, { any: ["maltol", "sweetener"], pct: 0.5, opt: true }] },
  { name: "Caramel custard", parts: [{ any: ["custard"], pct: 4 }, { any: ["caramel", "butterscotch"], pct: 2 }, { any: ["vanilla"], pct: 1, opt: true }] },
  { name: "Cinnamon roll", parts: [{ any: ["cake", "donut", "piecrust"], pct: 3 }, { any: ["cinnamon"], pct: 0.75 }, { any: ["cream", "vanilla"], pct: 2 }] },
  { name: "Glazed donut", parts: [{ any: ["donut"], pct: 4 }, { any: ["cream", "vanilla"], pct: 2 }, { any: ["maltol", "sweetener"], pct: 0.5, opt: true }] },
  { name: "Cookies and cream", parts: [{ any: ["cookie"], pct: 3 }, { any: ["cream", "icecream"], pct: 3 }, { any: ["chocolate"], pct: 1, opt: true }] },
  { name: "S'mores", parts: [{ any: ["chocolate"], pct: 2 }, { any: ["marshmallow"], pct: 2 }, { any: ["graham"], pct: 2 }] },
  { name: "Chocolate hazelnut", parts: [{ any: ["chocolate"], pct: 2 }, { any: ["hazelnut"], pct: 2 }, { any: ["cream", "milk"], pct: 2, opt: true }] },
  { name: "PB and jelly", parts: [{ any: ["peanut"], pct: 2 }, { any: ["strawberry", "grape", "raspberry"], pct: 3 }, { any: ["cake"], pct: 2, opt: true }] },
  { name: "Mint chocolate", parts: [{ any: ["mint"], pct: 1.5 }, { any: ["chocolate"], pct: 2 }, { any: ["cream", "icecream"], pct: 2, opt: true }] },
  { name: "Mocha", parts: [{ any: ["coffee"], pct: 3 }, { any: ["chocolate"], pct: 1.5 }, { any: ["cream", "milk"], pct: 2, opt: true }] },
  { name: "Caramel latte", parts: [{ any: ["coffee"], pct: 3 }, { any: ["caramel", "butterscotch"], pct: 1.5 }, { any: ["milk", "cream"], pct: 2 }] },
  { name: "Cereal milk", parts: [{ any: ["cereal"], pct: 3 }, { any: ["milk", "cream"], pct: 3 }, { any: ["strawberry", "banana"], pct: 2, opt: true }] },
  { name: "Cotton candy berry", parts: [{ any: ["cottoncandy"], pct: 2.5 }, { any: ["strawberry", "raspberry", "blueberry"], pct: 3 }] },
  { name: "Boysenberry cream", parts: [{ any: ["boysenberry"], pct: 4 }, { any: ["cream"], pct: 2.5 }, { any: ["vanilla"], pct: 1, opt: true }] },
  { name: "Boysenberry lemonade", parts: [{ any: ["boysenberry"], pct: 3 }, { any: ["lemonade", "lemon"], pct: 3 }, { any: ["fizz"], pct: 0.75, opt: true }] },
  { name: "Boysenberry cheesecake", parts: [{ any: ["boysenberry"], pct: 3 }, { any: ["cheesecake"], pct: 3 }, { any: ["graham"], pct: 1.5, opt: true }] },
  { name: "Cran-apple", parts: [{ any: ["cranberry"], pct: 3 }, { any: ["apple"], pct: 3 }, { any: ["cooling"], pct: 0.5, opt: true }] },
  { name: "Cranberry orange", parts: [{ any: ["cranberry"], pct: 3 }, { any: ["orange"], pct: 3 }, { any: ["cake"], pct: 2, opt: true }] },
  { name: "Cran-raspberry", parts: [{ any: ["cranberry"], pct: 3 }, { any: ["raspberry"], pct: 2.5 }, { any: ["sweetener"], pct: 0.5, opt: true }] },
  { name: "Cranberry lime spritzer", parts: [{ any: ["cranberry"], pct: 3 }, { any: ["lime", "lemon"], pct: 1.5 }, { any: ["fizz"], pct: 0.75 }] },
  { name: "Root beer float", parts: [{ any: ["rootbeer"], pct: 3 }, { any: ["icecream", "vanilla", "cream"], pct: 2.5 }, { any: ["fizz"], pct: 0.75, opt: true }] },
  { name: "Fizzy root beer", parts: [{ any: ["rootbeer"], pct: 3.5 }, { any: ["fizz"], pct: 0.75 }, { any: ["sweetener"], pct: 0.5, opt: true }] },
  { name: "Cream soda", parts: [{ any: ["creamsoda", "vanilla"], pct: 3 }, { any: ["fizz"], pct: 0.75 }, { any: ["cream"], pct: 1.5, opt: true }] },
  { name: "Fizzy lemonade", parts: [{ any: ["lemonade", "lemon"], pct: 3.5 }, { any: ["fizz"], pct: 0.75 }, { any: ["sweetener"], pct: 0.5, opt: true }] },
  { name: "Fruit soda", parts: [{ any: ["grape", "orange", "strawberry", "cherry", "watermelon"], pct: 4 }, { any: ["fizz"], pct: 0.75 }, { any: ["sweetener"], pct: 0.5, opt: true }] },
  { name: "Ginger ale", parts: [{ any: ["ginger"], pct: 1.5 }, { any: ["fizz"], pct: 0.75 }, { any: ["lemon", "lime"], pct: 1, opt: true }] },
  { name: "Plum and vanilla", parts: [{ any: ["plum"], pct: 3 }, { any: ["vanilla", "cream"], pct: 1.5 }] },
  { name: "Elderflower gooseberry", parts: [{ any: ["gooseberry"], pct: 3 }, { any: ["elderberry"], pct: 1.5 }, { any: ["cooling"], pct: 0.5, opt: true }] },
  { name: "Papaya mango", parts: [{ any: ["papaya"], pct: 3 }, { any: ["mango"], pct: 3 }, { any: ["lime"], pct: 0.75, opt: true }] },
  { name: "Energy drink chill", parts: [{ any: ["energy"], pct: 4 }, { any: ["cooling", "menthol"], pct: 0.5 }, { any: ["fizz"], pct: 0.75, opt: true }] },
  { name: "RY4-style tobacco", parts: [{ any: ["tobacco"], pct: 3 }, { any: ["caramel", "butterscotch"], pct: 1.5 }, { any: ["vanilla"], pct: 1 }] },
  { name: "Honey tobacco", parts: [{ any: ["tobacco"], pct: 3 }, { any: ["honey"], pct: 1 }, { any: ["vanilla"], pct: 0.75, opt: true }] },
  { name: "Nutty tobacco", parts: [{ any: ["tobacco"], pct: 3 }, { any: ["hazelnut", "almond", "walnut"], pct: 1 }, { any: ["caramel"], pct: 0.75, opt: true }] },
  { name: "Cool mint", parts: [{ any: ["mint"], pct: 2 }, { any: ["cooling", "menthol"], pct: 0.5 }, { any: ["sweetener"], pct: 0.5, opt: true }] },
];

/**
 * items: stash items [{id, name, brand, profile, remainingMl}]. Only items with stock count.
 * Returns { ready: [...], almost: [...] } where each suggestion lists the stash items to use.
 */
function suggest(items) {
  const byProfile = {};
  for (const it of items) {
    if (!(it.remainingMl > 0)) continue;
    const p = it.profile || detectProfile(it.name);
    if (!p) continue;
    (byProfile[p] = byProfile[p] || []).push(it);
  }
  for (const k in byProfile) byProfile[k].sort((a, b) => b.remainingMl - a.remainingMl);

  const ready = [], almost = [];
  for (const c of COMBOS) {
    const used = new Set(), picks = [], missing = [];
    for (const part of c.parts) {
      let pick = null;
      for (const p of part.any) {
        const it = (byProfile[p] || []).find((x) => !used.has(x.id));
        if (it) { pick = { item: it, profile: p }; break; }
      }
      if (pick) { used.add(pick.item.id); picks.push({ ...pick, pct: part.pct, opt: !!part.opt }); }
      else if (!part.opt) missing.push(part.any.map((p) => PROFILE_BY_ID[p].label).join(" or "));
    }
    if (!missing.length) ready.push({ name: c.name, picks });
    else if (missing.length === 1 && picks.some((x) => !x.opt)) almost.push({ name: c.name, picks, missing: missing[0] });
  }
  return { ready, almost };
}

/** Profiles that appear in a combo together with `profileId`. */
function partnersOf(profileId) {
  const out = new Set();
  for (const c of COMBOS) {
    const has = c.parts.some((p) => p.any.includes(profileId));
    if (!has) continue;
    for (const p of c.parts) for (const id of p.any) if (id !== profileId) out.add(id);
  }
  return [...out];
}

// Typical steep ranges in days. Common DIY rules of thumb, not lab results: fruit and drinks are close to
// shake-and-vape, creams and bakery need one to two weeks, custards and tobacco longer.
const STEEP_BY_FAMILY = { fruit: [1, 3], candy: [1, 3], drink: [1, 3], cool: [0, 1], dessert: [7, 14], bakery: [7, 14], nut: [7, 14], tobacco: [14, 28] };
const STEEP_BY_PROFILE = { custard: [10, 21], cheesecake: [10, 14], cereal: [5, 10], coffee: [7, 14], tea: [3, 7], chocolate: [7, 14], creamsoda: [3, 7], rootbeer: [3, 7] };

/**
 * flavours: [{ profile, pct }]. The slowest flavour that makes up a real part of the mix sets the range;
 * enhancers, cooling and spices at small amounts don't. Returns { min, max, drivers: [labels] } or null.
 */
function steepFor(flavours, vgPct) {
  let best = null;
  for (const f of flavours) {
    if (!f.profile || !(f.pct > 0)) continue;
    const p = PROFILE_BY_ID[f.profile];
    if (!p) continue;
    const range = STEEP_BY_PROFILE[p.id] || STEEP_BY_FAMILY[p.family];
    if (!range) continue;
    if (f.pct < 0.75 && p.family !== "tobacco") continue;
    if (!best || range[1] > best.max || (range[1] === best.max && range[0] > best.min)) best = { min: range[0], max: range[1], drivers: [p.label] };
    else if (range[0] === best.min && range[1] === best.max && !best.drivers.includes(p.label)) best.drivers.push(p.label);
  }
  if (best && vgPct >= 70 && best.max >= 7) { best.max += 3; best.highVg = true; }
  return best;
}

if (typeof module !== "undefined") module.exports = { PROFILES, PROFILE_BY_ID, COMBOS, detectProfile, suggest, partnersOf, steepFor };
