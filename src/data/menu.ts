// Chiaro caffe menu. Edit names, descriptions and prices here.
// Prices are in NGN. To replace a photo, put your file in public/images/menu/ and change `image`.
export type Temperature = "hot" | "cold";
export interface MenuOption { label: string; required: boolean; choices: string[] }
export interface MenuItem {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  price: number;
  image: string;
  popular?: boolean;
  temperature?: Temperature;
  options?: MenuOption[];
}
export interface MenuSection { id: string; name: string; items: MenuItem[] }
export interface MenuCategory { id: string; name: string; sections: MenuSection[] }

export const menu: MenuCategory[] = [
  {
    id: "food",
    name: "Food",
    sections: [
      {
        id: "breakfast",
        name: "Breakfast",
        items: [
          { id: 91, slug: "croissant-plain", name: "Croissant Plain", description: null, price: 5000, image: "/images/menu/croissant-plain.webp" },
          { id: 92, slug: "croissant-pain-au-chocolate", name: "Croissant Pain au Chocolate", description: null, price: 6500, image: "/images/menu/croissant-pain-au-chocolate.webp" },
          { id: 93, slug: "croissant-zaatar-thyme", name: "Croissant Zaatar (Thyme)", description: null, price: 6000, image: "/images/menu/croissant-zaatar-thyme.webp" },
          { id: 95, slug: "savory-stuffed-croissant", name: "Savory Stuffed Croissant", description: "Turkey, cheese, lettuce, tomato, croissant", price: 12000, image: "/images/menu/savory-stuffed-croissant.webp" },
          { id: 96, slug: "mediterranean-stuffed-croissant", name: "Mediterranean Stuffed Croissant", description: "Feta cheese, olives, mint leaves, croissant", price: 15000, image: "/images/menu/mediterranean-stuffed-croissant.webp" },
          { id: 111, slug: "bread-replacement-2pcs", name: "Bread Replacement (2pcs)", description: null, price: 3500, image: "/images/menu/bread-replacement-2pcs.webp" },
          { id: 113, slug: "croissant-cheese", name: "Croissant Cheese", description: null, price: 9000, image: "/images/menu/croissant-cheese.webp" },
          { id: 115, slug: "croissant-almond", name: "Croissant Almond", description: null, price: 6500, image: "/images/menu/croissant-almond.webp" },
          { id: 125, slug: "english-breakfast", name: "English Breakfast", description: "Served with Beans,Sausages,bacon, mushroom, sliced bread and sunny side eggs", price: 22000, image: "/images/menu/english-breakfast.webp" },
          { id: 127, slug: "garden-fresh-omelette", name: "Garden Fresh Omelette", description: "Served with slice bread,cucumber and tomato", price: 9000, image: "/images/menu/garden-fresh-omelette.webp" },
          { id: 128, slug: "pancake-cloud", name: "Pancake Cloud", description: null, price: 13500, image: "/images/menu/pancake-cloud.webp" },
          { id: 158, slug: "zaatar-manakish", name: "Zaatar Manakish", description: null, price: 6000, image: "/images/menu/zaatar-manakish.webp" },
          { id: 159, slug: "lahm-bi-ajin", name: "Lahm Bi Ajin", description: null, price: 12000, image: "/images/menu/lahm-bi-ajin.webp" },
          { id: 160, slug: "cheese-manakish", name: "Cheese Manakish", description: null, price: 12000, image: "/images/menu/cheese-manakish.webp" },
          { id: 161, slug: "chiaro-manakish", name: "Chiaro Manakish", description: null, price: 9500, image: "/images/menu/chiaro-manakish.webp" },
          { id: 208, slug: "cheeselynn", name: "Cheeselynn", description: "Lebanese bread with cheese & parsley", price: 3900, image: "/images/menu/cheeselynn.webp" },
          { id: 216, slug: "chiaro-toshka", name: "Chiaro Toshka", description: null, price: 19500, image: "/images/menu/chiaro-toshka.webp" },
          { id: 234, slug: "cheese-and-zaatar-manakish", name: "Cheese & Zaatar Manakish", description: null, price: 10500, image: "/images/menu/cheese-and-zaatar-manakish.webp" },
          { id: 235, slug: "japanese-fries", name: "Japanese Fries", description: null, price: 8500, image: "/images/menu/japanese-fries.webp" },
          { id: 236, slug: "singaporean-chili-chicken", name: "Singaporean Chili Chicken", description: null, price: 19500, image: "/images/menu/singaporean-chili-chicken.webp" },
        ],
      },
      {
        id: "vibrant-salads",
        name: "Vibrant Salads",
        items: [
          { id: 77, slug: "mediterranean-bliss-salad", name: "Mediterranean Bliss Salad", description: "Lettuce, cucumbers, olives, red & yellow peppers, feta cheese, vinaigrette dressing", price: 24000, image: "/images/menu/mediterranean-bliss-salad.webp" },
          { id: 78, slug: "caesars-elegance-chicken", name: "Caesar’s Elegance Chicken", description: "Lettuce, croutons, parmesan cheese, grilled chicken, Caesar dressing", price: 19000, image: "/images/menu/caesars-elegance-chicken.webp" },
          { id: 79, slug: "asian-fusion-crunch", name: "Asian Fusion Crunch", description: "Vegetable mix, peppers, glass noodles, chicken, Asian Sauce", price: 20000, image: "/images/menu/asian-fusion-crunch.webp" },
          { id: 241, slug: "oriental-salad", name: "Oriental Salad", description: null, price: 20000, image: "/images/menu/oriental-salad.webp" },
        ],
      },
      {
        id: "signature-sandwiches",
        name: "Signature Sandwiches",
        items: [
          { id: 80, slug: "the-classic-turkey-and-cheese", name: "The Classic Turkey & Cheese", description: "Turkey Slices, mozzarella, lettuce, tomatoes, cucumber, Cocktail Sauce (Choice of baguette or sourdough)", price: 22000, image: "/images/menu/the-classic-turkey-and-cheese.webp", options: [{"label":"Choice of bread","required":true,"choices":["Baguette","Sourdough"]}] },
          { id: 81, slug: "smoky-ham-and-cheese-delight", name: "Smoky Ham and Cheese Delight", description: "Lettuce, smoked ham, mozzarella slices, Cocktail Sauce (Choice of baguette or sourdough)", price: 23000, image: "/images/menu/smoky-ham-and-cheese-delight.webp", options: [{"label":"Choice of bread","required":true,"choices":["Baguette","Sourdough"]}] },
          { id: 117, slug: "takeout-chicken-pesto-sandwich", name: "Takeout Chicken Pesto Sandwich", description: null, price: 8500, image: "/images/menu/takeout-chicken-pesto-sandwich.webp" },
          { id: 82, slug: "crab-and-avocado-supreme", name: "Crab and Avocado Supreme", description: "Cucumber, carrot, mayonnaise, avocado, crab (Served in baguette)", price: 13000, image: "/images/menu/crab-and-avocado-supreme.webp" },
          { id: 119, slug: "takeout-turkey-and-cheese-sandwich", name: "Takeout Turkey & Cheese Sandwich", description: null, price: 9000, image: "/images/menu/takeout-turkey-and-cheese-sandwich.webp" },
          { id: 120, slug: "meatpie", name: "MeatPie", description: null, price: 7000, image: "/images/menu/meatpie.webp" },
          { id: 239, slug: "philly-cheese-steak", name: "Philly Cheese Steak", description: null, price: 21000, image: "/images/menu/philly-cheese-steak.webp" },
        ],
      },
      {
        id: "gourmet-pizza",
        name: "Gourmet Pizza",
        items: [
          { id: 83, slug: "four-cheese-fantasy", name: "Four Cheese Fantasy", description: "Tomato Sauce, mozzarella, fresh cheese, cheddar & Parmesan cheese", price: 15000, image: "/images/menu/four-cheese-fantasy.webp" },
          { id: 84, slug: "spicy-suya-chicken-fire", name: "Spicy Suya Chicken Fire", description: null, price: 12500, image: "/images/menu/spicy-suya-chicken-fire.webp" },
          { id: 85, slug: "pepperoni-passion", name: "Pepperoni Passion", description: "Tomato Sauce, mozzarella, beef pepperoni", price: 11000, image: "/images/menu/pepperoni-passion.webp" },
          { id: 86, slug: "the-four-corners-feast", name: "The Four Corners Feast", description: "Tomato Sauce, mozzarella, ham, bell peppers, onions", price: 10000, image: "/images/menu/the-four-corners-feast.webp" },
          { id: 87, slug: "tropical-hawaiian-paradise", name: "Tropical Hawaiian Paradise", description: "Tomato Sauce, mozzarella, ham, pineapple", price: 10000, image: "/images/menu/tropical-hawaiian-paradise.webp" },
          { id: 88, slug: "rocket-and-feta-delight", name: "Rocket and Feta Delight", description: "Tomato Sauce, mozzarella, feta cheese, cherry tomatoes, rocket leaves", price: 15000, image: "/images/menu/rocket-and-feta-delight.webp" },
          { id: 89, slug: "shrimp-sensation", name: "Shrimp Sensation", description: "Tomato Sauce, mozzarella, shrimp, pickles, Chiaro Spices", price: 11000, image: "/images/menu/shrimp-sensation.webp" },
          { id: 90, slug: "margherita-perfection", name: "Margherita Perfection", description: "Tomato Sauce, mozzarella, basil", price: 13000, image: "/images/menu/margherita-perfection.webp" },
          { id: 106, slug: "golden-frites", name: "Golden Frites", description: "Classic french fries", price: 5000, image: "/images/menu/golden-frites.webp" },
          { id: 110, slug: "chiaros-frites", name: "Chiaro's Frites", description: "French fries with red cheddar", price: 7000, image: "/images/menu/chiaros-frites.webp" },
          { id: 130, slug: "shawarma-royale", name: "Shawarma Royale", description: null, price: 11500, image: "/images/menu/shawarma-royale.webp" },
          { id: 131, slug: "spicy-suya-beef-fire", name: "Spicy Suya Beef Fire", description: null, price: 13500, image: "/images/menu/spicy-suya-beef-fire.webp" },
        ],
      },
      {
        id: "pizza",
        name: "Pizza",
        items: [
          { id: 179, slug: "margherita-pizza", name: "Margherita Pizza", description: null, price: 13000, image: "/images/menu/margherita-pizza.webp" },
          { id: 180, slug: "pepperoni-pizza", name: "Pepperoni Pizza", description: null, price: 16000, image: "/images/menu/pepperoni-pizza.webp" },
          { id: 181, slug: "vegetarian-pizza", name: "Vegetarian Pizza", description: null, price: 15500, image: "/images/menu/vegetarian-pizza.webp" },
          { id: 182, slug: "four-cheese-pizza", name: "Four Cheese Pizza", description: null, price: 19500, image: "/images/menu/four-cheese-pizza.webp" },
          { id: 183, slug: "chicken-bbq-pizza", name: "Chicken BBQ Pizza", description: null, price: 17000, image: "/images/menu/chicken-bbq-pizza.webp" },
          { id: 184, slug: "four-point-pizza", name: "Four Point Pizza", description: null, price: 22000, image: "/images/menu/four-point-pizza.webp" },
          { id: 185, slug: "salmon-pizza", name: "Salmon Pizza", description: null, price: 25000, image: "/images/menu/salmon-pizza.webp" },
          { id: 186, slug: "capricciosa-pizza", name: "Capricciosa Pizza", description: null, price: 18000, image: "/images/menu/capricciosa-pizza.webp" },
        ],
      },
      {
        id: "main-dish",
        name: "Main Dish",
        items: [
          { id: 174, slug: "pepper-steak", name: "Pepper Steak", description: null, price: 24000, image: "/images/menu/pepper-steak.webp" },
          { id: 175, slug: "chicken-stit-fry", name: "Chicken Stit Fry", description: null, price: 25000, image: "/images/menu/chicken-stit-fry.webp" },
          { id: 187, slug: "the-chiaro-platter", name: "The Chiaro Platter", description: null, price: 28000, image: "/images/menu/the-chiaro-platter.webp" },
          { id: 202, slug: "seafood-pasta", name: "Seafood pasta", description: null, price: 35000, image: "/images/menu/seafood-pasta.webp" },
          { id: 203, slug: "spaghetti-bolognaise", name: "Spaghetti bolognaise", description: null, price: 16500, image: "/images/menu/spaghetti-bolognaise.webp" },
          { id: 204, slug: "alfredo-penne-patsta-chicken", name: "Alfredo Penne Patsta (Chicken)", description: null, price: 19000, image: "/images/menu/alfredo-penne-patsta-chicken.webp" },
          { id: 205, slug: "pesto-pasta", name: "Pesto pasta", description: null, price: 19500, image: "/images/menu/pesto-pasta.webp" },
          { id: 237, slug: "sauteed-prawns", name: "Sautéed Prawns", description: null, price: 25000, image: "/images/menu/sauteed-prawns.webp" },
        ],
      },
      {
        id: "bites",
        name: "Bites",
        items: [
          { id: 138, slug: "hotdog", name: "Hotdog", description: null, price: 5000, image: "/images/menu/hotdog.webp" },
          { id: 139, slug: "chicken-strips-5pcs", name: "Chicken Strips (5pcs)", description: null, price: 12500, image: "/images/menu/chicken-strips-5pcs.webp" },
          { id: 140, slug: "chicken-wings", name: "Chicken Wings", description: null, price: 15000, image: "/images/menu/chicken-wings.webp" },
          { id: 171, slug: "spring-rolls-3-pieces", name: "Spring Rolls (3 Pieces)", description: null, price: 9000, image: "/images/menu/spring-rolls-3-pieces.webp" },
          { id: 172, slug: "dynamite-shrimps", name: "Dynamite Shrimps", description: null, price: 16000, image: "/images/menu/dynamite-shrimps.webp" },
          { id: 173, slug: "butterfly-prawns", name: "Butterfly Prawns", description: null, price: 18000, image: "/images/menu/butterfly-prawns.webp" },
          { id: 206, slug: "chiaro-corndog", name: "Chiaro corndog", description: null, price: 4900, image: "/images/menu/chiaro-corndog.webp" },
        ],
      },
      {
        id: "desert",
        name: "Desert",
        items: [
          { id: 94, slug: "waffle-delight", name: "Waffle Delight", description: null, price: 16000, image: "/images/menu/waffle-delight.webp" },
          { id: 107, slug: "brownie", name: "Brownie", description: null, price: 7500, image: "/images/menu/brownie.webp" },
          { id: 108, slug: "cake-slice-vanilla", name: "Cake Slice (Vanilla)", description: null, price: 4500, image: "/images/menu/cake-slice-vanilla.webp" },
          { id: 109, slug: "cake-slice-chocolate", name: "Cake Slice (Chocolate)", description: null, price: 5000, image: "/images/menu/cake-slice-chocolate.webp" },
          { id: 105, slug: "muffin", name: "Muffin", description: null, price: 4000, image: "/images/menu/muffin.webp" },
          { id: 112, slug: "cheesecake", name: "CheeseCake", description: null, price: 7000, image: "/images/menu/cheesecake.webp" },
          { id: 114, slug: "chocolate-chip-cookies", name: "Chocolate Chip Cookies", description: null, price: 5000, image: "/images/menu/chocolate-chip-cookies.webp" },
          { id: 133, slug: "nutella-strawberry-croissant", name: "Nutella Strawberry Croissant", description: "Plain croissant stuffed with Nutella and strawberry, topped with Nutella and icing sugar", price: 12000, image: "/images/menu/nutella-strawberry-croissant.webp", popular: true },
        ],
      },
      {
        id: "take-out",
        name: "Take Out",
        items: [
          { id: 124, slug: "packaging", name: "Packaging", description: null, price: 1000, image: "/images/menu/packaging.webp" },
        ],
      },
    ],
  },
  {
    id: "beverages",
    name: "Beverages",
    sections: [
      {
        id: "espresso",
        name: "Espresso",
        items: [
          { id: 1, slug: "espresso", name: "Espresso", description: null, price: 4000, image: "/images/menu/espresso.webp", temperature: "hot" },
          { id: 2, slug: "double-espresso", name: "Double Espresso", description: null, price: 5500, image: "/images/menu/double-espresso.webp", temperature: "hot" },
          { id: 3, slug: "espresso-con-panna", name: "Espresso Con Panna", description: null, price: 5000, image: "/images/menu/espresso-con-panna.webp", temperature: "hot" },
          { id: 4, slug: "americano", name: "Americano", description: null, price: 6000, image: "/images/menu/americano.webp", temperature: "hot" },
          { id: 5, slug: "cappuccino", name: "Cappuccino", description: null, price: 6000, image: "/images/menu/cappuccino.webp", temperature: "hot" },
          { id: 6, slug: "cafe-mocha", name: "Cafe Mocha", description: null, price: 8000, image: "/images/menu/cafe-mocha.webp", temperature: "hot" },
          { id: 7, slug: "cafe-latte", name: "Cafe Latte", description: "Add Flavor (Optional): Vanilla, Hazelnut, Caramel, Irish Cream, Cinnamon, Chocolate", price: 7000, image: "/images/menu/cafe-latte.webp", temperature: "hot", options: [{"label":"Add Flavor (Optional)","required":false,"choices":["Vanilla","Hazelnut","Caramel","Irish Cream","Cinnamon","Chocolate"]}] },
          { id: 8, slug: "dirty-chai-latte", name: "Dirty Chai Latte", description: null, price: 8000, image: "/images/menu/dirty-chai-latte.webp", temperature: "hot" },
          { id: 123, slug: "lactose-milk", name: "Lactose Milk", description: null, price: 7000, image: "/images/menu/lactose-milk.webp" },
        ],
      },
      {
        id: "warm-up-your-heart",
        name: "Warm Up Your Heart",
        items: [
          { id: 9, slug: "matcha-green-tea-latte", name: "Matcha Green Tea Latte", description: null, price: 8000, image: "/images/menu/matcha-green-tea-latte.webp", temperature: "hot" },
          { id: 10, slug: "salted-caramel-latte", name: "Salted Caramel Latte", description: null, price: 8000, image: "/images/menu/salted-caramel-latte.webp", temperature: "hot" },
          { id: 11, slug: "red-velvet-latte", name: "Red Velvet Latte", description: null, price: 8000, image: "/images/menu/red-velvet-latte.webp", temperature: "hot" },
          { id: 12, slug: "toffee-coffee-latte", name: "Toffee Coffee Latte", description: null, price: 8000, image: "/images/menu/toffee-coffee-latte.webp", temperature: "hot" },
          { id: 13, slug: "cinnamon-roll-latte", name: "Cinnamon Roll Latte", description: null, price: 10000, image: "/images/menu/cinnamon-roll-latte.webp", temperature: "hot" },
          { id: 14, slug: "pistachio-dream-latte", name: "Pistachio Dream Latte", description: null, price: 12000, image: "/images/menu/pistachio-dream-latte.webp", temperature: "hot" },
          { id: 15, slug: "hot-chocolate-a-litalien", name: "Hot Chocolate a L’Italien", description: null, price: 8000, image: "/images/menu/hot-chocolate-a-litalien.webp", temperature: "hot" },
          { id: 16, slug: "marshmallow-hot-chocolate", name: "Marshmallow Hot Chocolate", description: null, price: 10000, image: "/images/menu/marshmallow-hot-chocolate.webp", temperature: "hot" },
          { id: 122, slug: "chai-latte", name: "Chai Latte", description: null, price: 6000, image: "/images/menu/chai-latte.webp", temperature: "hot" },
        ],
      },
      {
        id: "tea-garden",
        name: "Tea Garden",
        items: [
          { id: 17, slug: "china-green-jewel", name: "China Green Jewel", description: "Organic high grown yunnan green tea", price: 5500, image: "/images/menu/china-green-jewel.webp", temperature: "hot" },
          { id: 18, slug: "apple-moringa-affair", name: "Apple Moringa Affair", description: "Organic fruit infusion moringa apple quince", price: 5500, image: "/images/menu/apple-moringa-affair.webp", temperature: "hot" },
          { id: 19, slug: "nordic-blueberry", name: "Nordic Blueberry", description: "Organic fruit infusion forest berries", price: 5500, image: "/images/menu/nordic-blueberry.webp", temperature: "hot" },
          { id: 20, slug: "unforgettable-moroccan-mint", name: "Unforgettable Moroccan Mint", description: "Organic herbal infusion mint", price: 5500, image: "/images/menu/unforgettable-moroccan-mint.webp", temperature: "hot" },
          { id: 21, slug: "fruit-wave", name: "Fruit Wave", description: "Organic high grown green tea passion fruit papaya", price: 5500, image: "/images/menu/fruit-wave.webp", temperature: "hot" },
          { id: 22, slug: "blue-sky-chamomile", name: "Blue Sky Chamomile", description: "Organic herbal infusion chamomile verbena", price: 5500, image: "/images/menu/blue-sky-chamomile.webp", temperature: "hot" },
          { id: 23, slug: "tumeric-ginger", name: "Tumeric Ginger", description: "Organic spice infusion turmeric ginger", price: 5500, image: "/images/menu/tumeric-ginger.webp", temperature: "hot" },
          { id: 24, slug: "captain-early-grey", name: "Captain Early Grey", description: "Organic high grown black tea bergamot", price: 5500, image: "/images/menu/captain-early-grey.webp", temperature: "hot" },
          { id: 25, slug: "darling-peach", name: "Darling Peach", description: "Organic high grown white tea apricot peach", price: 5500, image: "/images/menu/darling-peach.webp", temperature: "hot" },
          { id: 26, slug: "ceylon-secret-garden", name: "Ceylon Secret Garden", description: "Organic high grown uva black tea", price: 5500, image: "/images/menu/ceylon-secret-garden.webp", temperature: "hot" },
        ],
      },
      {
        id: "cool-me-down",
        name: "Cool Me Down",
        items: [
          { id: 27, slug: "matcha-green-tea-frappe", name: "Matcha Green Tea Frappe", description: null, price: 10000, image: "/images/menu/matcha-green-tea-frappe.webp", temperature: "cold" },
          { id: 28, slug: "coffee-frappe", name: "Coffee Frappe", description: null, price: 10000, image: "/images/menu/coffee-frappe.webp", temperature: "cold" },
          { id: 29, slug: "salted-caramel-frappe", name: "Salted Caramel Frappe", description: null, price: 10000, image: "/images/menu/salted-caramel-frappe.webp", temperature: "cold" },
          { id: 30, slug: "mocha-frappe", name: "Mocha Frappe", description: null, price: 10000, image: "/images/menu/mocha-frappe.webp", temperature: "cold" },
          { id: 31, slug: "toffee-coffee-frappe", name: "Toffee Coffee Frappe", description: null, price: 10000, image: "/images/menu/toffee-coffee-frappe.webp", temperature: "cold" },
          { id: 32, slug: "cookies-and-cream-oreo-frappe", name: "Cookies and Cream Oreo Frappe", description: null, price: 10000, image: "/images/menu/cookies-and-cream-oreo-frappe.webp", temperature: "cold" },
          { id: 33, slug: "chocolate-frappe", name: "Chocolate Frappe", description: null, price: 11500, image: "/images/menu/chocolate-frappe.webp", temperature: "cold" },
          { id: 34, slug: "red-velvet-frappe", name: "Red Velvet Frappe", description: null, price: 10000, image: "/images/menu/red-velvet-frappe.webp", temperature: "cold" },
        ],
      },
      {
        id: "smooth-out-your-day",
        name: "Smooth Out Your Day",
        items: [
          { id: 35, slug: "mango-smoothie", name: "Mango Smoothie", description: null, price: 12000, image: "/images/menu/mango-smoothie.webp", temperature: "cold" },
          { id: 36, slug: "peach-smoothie", name: "Peach Smoothie", description: null, price: 12000, image: "/images/menu/peach-smoothie.webp", temperature: "cold" },
          { id: 37, slug: "strawberry-smoothie", name: "Strawberry Smoothie", description: null, price: 12000, image: "/images/menu/strawberry-smoothie.webp", temperature: "cold" },
          { id: 38, slug: "watermelon-strawberry-smoothie", name: "Watermelon Strawberry Smoothie", description: null, price: 12000, image: "/images/menu/watermelon-strawberry-smoothie.webp", temperature: "cold" },
          { id: 39, slug: "green-melon-passion-smoothie", name: "Green Melon Passion Smoothie", description: null, price: 12000, image: "/images/menu/green-melon-passion-smoothie.webp", temperature: "cold" },
          { id: 40, slug: "bubbly-smoothie", name: "Bubbly Smoothie", description: null, price: 11000, image: "/images/menu/bubbly-smoothie.webp", temperature: "cold" },
        ],
      },
      {
        id: "shakelicious",
        name: "Shakelicious",
        items: [
          { id: 41, slug: "chocolate-milkshake", name: "Chocolate Milkshake", description: null, price: 10000, image: "/images/menu/chocolate-milkshake.webp", temperature: "cold" },
          { id: 42, slug: "strawberry-milkshake", name: "Strawberry Milkshake", description: null, price: 10500, image: "/images/menu/strawberry-milkshake.webp", temperature: "cold" },
          { id: 43, slug: "caramel-milkshake", name: "Caramel Milkshake", description: null, price: 10000, image: "/images/menu/caramel-milkshake.webp", temperature: "cold" },
          { id: 44, slug: "pistachio-milkshake", name: "Pistachio Milkshake", description: null, price: 12000, image: "/images/menu/pistachio-milkshake.webp", temperature: "cold" },
          { id: 45, slug: "oreo-milkshake", name: "Oreo Milkshake", description: null, price: 11500, image: "/images/menu/oreo-milkshake.webp", temperature: "cold" },
          { id: 135, slug: "vanilla-milkshakeke", name: "Vanilla Milkshakeke", description: null, price: 10500, image: "/images/menu/vanilla-milkshakeke.webp", temperature: "cold" },
        ],
      },
      {
        id: "on-the-rocks",
        name: "On The Rocks",
        items: [
          { id: 46, slug: "iced-peach-tea", name: "Iced Peach Tea", description: null, price: 9500, image: "/images/menu/iced-peach-tea.webp", temperature: "cold" },
          { id: 47, slug: "iced-green-tea", name: "Iced Green Tea", description: null, price: 9500, image: "/images/menu/iced-green-tea.webp", temperature: "cold" },
          { id: 48, slug: "iced-black-lemon-tea", name: "Iced Black Lemon Tea", description: null, price: 8000, image: "/images/menu/iced-black-lemon-tea.webp", temperature: "cold" },
          { id: 49, slug: "iced-caramelloccino", name: "Iced Caramelloccino", description: null, price: 8500, image: "/images/menu/iced-caramelloccino.webp", temperature: "cold" },
          { id: 50, slug: "iced-dark-mocha", name: "Iced Dark Mocha", description: null, price: 9000, image: "/images/menu/iced-dark-mocha.webp", temperature: "cold" },
          { id: 51, slug: "iced-white-mocha", name: "Iced White Mocha", description: null, price: 8000, image: "/images/menu/iced-white-mocha.webp", temperature: "cold" },
          { id: 52, slug: "iced-latte", name: "Iced Latte", description: "Add Flavor (Optional): Vanilla, Hazelnut, Caramel, Irish Cream, Cinnamon, Chocolate", price: 8000, image: "/images/menu/iced-latte.webp", temperature: "cold", options: [{"label":"Add Flavor (Optional)","required":false,"choices":["Vanilla","Hazelnut","Caramel","Irish Cream","Cinnamon","Chocolate"]}] },
          { id: 134, slug: "iced-matcha", name: "Iced Matcha", description: null, price: 8000, image: "/images/menu/iced-matcha.webp", temperature: "cold" },
          { id: 147, slug: "orange-juice", name: "Orange Juice", description: null, price: 5000, image: "/images/menu/orange-juice.webp", temperature: "cold" },
          { id: 164, slug: "strawberry-matcha", name: "Strawberry Matcha", description: null, price: 9500, image: "/images/menu/strawberry-matcha.webp", temperature: "cold" },
          { id: 165, slug: "mango-matcha", name: "Mango Matcha", description: null, price: 9500, image: "/images/menu/mango-matcha.webp", temperature: "cold" },
          { id: 166, slug: "forest-fruit-matcha", name: "Forest Fruit Matcha", description: null, price: 9500, image: "/images/menu/forest-fruit-matcha.webp", temperature: "cold" },
          { id: 212, slug: "fresh-orange-juice", name: "Fresh Orange Juice", description: null, price: 10000, image: "/images/menu/fresh-orange-juice.webp", temperature: "cold" },
          { id: 213, slug: "fresh-pineapple-juice", name: "Fresh Pineapple Juice", description: null, price: 10000, image: "/images/menu/fresh-pineapple-juice.webp", temperature: "cold" },
        ],
      },
      {
        id: "italian-soda",
        name: "Italian Soda",
        items: [
          { id: 53, slug: "blue-coco-soda", name: "Blue Coco Soda", description: null, price: 8000, image: "/images/menu/blue-coco-soda.webp", temperature: "cold" },
          { id: 54, slug: "strawbomb-soda", name: "Strawbomb Soda", description: null, price: 8000, image: "/images/menu/strawbomb-soda.webp", temperature: "cold" },
          { id: 55, slug: "kiwi-lime-soda", name: "Kiwi Lime Soda", description: null, price: 8000, image: "/images/menu/kiwi-lime-soda.webp", temperature: "cold" },
          { id: 56, slug: "lychee-peachy-soda", name: "Lychee Peachy Soda", description: null, price: 8500, image: "/images/menu/lychee-peachy-soda.webp", temperature: "cold" },
          { id: 57, slug: "watermelon-mango-soda", name: "Watermelon Mango Soda", description: null, price: 9000, image: "/images/menu/watermelon-mango-soda.webp", temperature: "cold" },
          { id: 58, slug: "pineapple-lemonade", name: "Pineapple Lemonade", description: null, price: 8500, image: "/images/menu/pineapple-lemonade.webp", temperature: "cold" },
          { id: 59, slug: "fizzy-lemonade", name: "Fizzy Lemonade", description: null, price: 7500, image: "/images/menu/fizzy-lemonade.webp", temperature: "cold" },
          { id: 169, slug: "independence-pitcher", name: "Independence Pitcher", description: null, price: 0, image: "/images/menu/independence-pitcher.webp", temperature: "cold" },
        ],
      },
      {
        id: "cool-classics",
        name: "Cool Classics",
        items: [
          { id: 60, slug: "water-big", name: "Water Big", description: null, price: 2000, image: "/images/menu/water-big.webp", temperature: "cold" },
          { id: 61, slug: "water-small", name: "Water Small", description: null, price: 1500, image: "/images/menu/water-small.webp", temperature: "cold" },
          { id: 62, slug: "coca-cola", name: "Coca Cola", description: null, price: 1600, image: "/images/menu/coca-cola.webp", temperature: "cold" },
          { id: 63, slug: "coca-cola-zero", name: "Coca Cola Zero", description: null, price: 1600, image: "/images/menu/coca-cola-zero.webp", temperature: "cold" },
          { id: 64, slug: "fanta", name: "Fanta", description: null, price: 1600, image: "/images/menu/fanta.webp", temperature: "cold" },
          { id: 65, slug: "sprite", name: "Sprite", description: null, price: 1600, image: "/images/menu/sprite.webp", temperature: "cold" },
          { id: 66, slug: "schweppes-virgin-mojito", name: "Schweppes Virgin Mojito", description: null, price: 1600, image: "/images/menu/schweppes-virgin-mojito.webp", temperature: "cold" },
          { id: 67, slug: "schweppes-soda-water", name: "Schweppes Soda Water", description: null, price: 1600, image: "/images/menu/schweppes-soda-water.webp", temperature: "cold" },
          { id: 68, slug: "schweppes-chapman", name: "Schweppes Chapman", description: null, price: 1600, image: "/images/menu/schweppes-chapman.webp", temperature: "cold" },
          { id: 69, slug: "schweppes-bitter-lemon", name: "Schweppes Bitter Lemon", description: null, price: 1600, image: "/images/menu/schweppes-bitter-lemon.webp", temperature: "cold" },
          { id: 71, slug: "redbull", name: "Redbull", description: null, price: 4500, image: "/images/menu/redbull.webp", temperature: "cold" },
          { id: 72, slug: "powerhorse", name: "Powerhorse", description: null, price: 4500, image: "/images/menu/powerhorse.webp", temperature: "cold" },
          { id: 170, slug: "schweppes-pineapple", name: "Schweppes Pineapple", description: null, price: 1600, image: "/images/menu/schweppes-pineapple.webp", temperature: "cold" },
          { id: 188, slug: "bonjus", name: "Bonjus", description: null, price: 1600, image: "/images/menu/bonjus.webp", temperature: "cold" },
        ],
      },
      {
        id: "sparkling-sensations",
        name: "Sparkling Sensations",
        items: [
          { id: 73, slug: "perrier-sparkling-water", name: "Perrier Sparkling Water", description: null, price: 5000, image: "/images/menu/perrier-sparkling-water.webp", temperature: "cold" },
          { id: 74, slug: "maison-perrier-forever-lemon", name: "Maison Perrier Forever Lemon", description: null, price: 4500, image: "/images/menu/maison-perrier-forever-lemon.webp", temperature: "cold" },
          { id: 75, slug: "maison-perrier-forever-lime", name: "Maison Perrier Forever Lime", description: null, price: 4500, image: "/images/menu/maison-perrier-forever-lime.webp", temperature: "cold" },
          { id: 76, slug: "maison-perrier-forever-grapefruit", name: "Maison Perrier Forever Grapefruit", description: null, price: 4500, image: "/images/menu/maison-perrier-forever-grapefruit.webp", temperature: "cold" },
        ],
      },
      {
        id: "wine",
        name: "Wine",
        items: [
          { id: 148, slug: "tokara-wine-shiraz", name: "Tokara Wine Shiraz", description: null, price: 55000, image: "/images/menu/tokara-wine-shiraz.webp" },
          { id: 149, slug: "tokara-wine-cabernet-sauvignon", name: "Tokara Wine Cabernet Sauvignon", description: null, price: 55000, image: "/images/menu/tokara-wine-cabernet-sauvignon.webp" },
          { id: 150, slug: "eternal-8-wine", name: "Eternal 8 Wine", description: null, price: 55000, image: "/images/menu/eternal-8-wine.webp" },
          { id: 151, slug: "eternal-8-wine-glass", name: "Eternal 8 Wine Glass", description: null, price: 15000, image: "/images/menu/eternal-8-wine-glass.webp" },
          { id: 152, slug: "bruce-jack-shiraz-wine", name: "Bruce Jack Shiraz Wine", description: null, price: 15000, image: "/images/menu/bruce-jack-shiraz-wine.webp" },
          { id: 153, slug: "bruce-jack-shiraz-wine-glass", name: "Bruce Jack Shiraz Wine Glass", description: null, price: 15000, image: "/images/menu/bruce-jack-shiraz-wine-glass.webp" },
          { id: 154, slug: "bruce-jack-cabernet-sauvignon-wine", name: "Bruce Jack Cabernet Sauvignon Wine", description: null, price: 55000, image: "/images/menu/bruce-jack-cabernet-sauvignon-wine.webp" },
          { id: 155, slug: "bruce-jack-cabernet-sauvignon-wine-glass", name: "Bruce Jack Cabernet Sauvignon Wine Glass", description: null, price: 15000, image: "/images/menu/bruce-jack-cabernet-sauvignon-wine-glass.webp" },
          { id: 156, slug: "bruce-jack-sauvignon-blanc-wine", name: "Bruce Jack Sauvignon Blanc Wine", description: null, price: 55000, image: "/images/menu/bruce-jack-sauvignon-blanc-wine.webp" },
          { id: 157, slug: "bruce-jack-sauvignon-blanc-wine-glass", name: "Bruce Jack Sauvignon Blanc Wine Glass", description: null, price: 15000, image: "/images/menu/bruce-jack-sauvignon-blanc-wine-glass.webp" },
          { id: 162, slug: "bruce-jack-daily-brew-wine-glass", name: "Bruce Jack Daily Brew Wine Glass", description: null, price: 15000, image: "/images/menu/bruce-jack-daily-brew-wine-glass.webp" },
          { id: 163, slug: "bruce-jack-daily-brew", name: "Bruce Jack Daily Brew", description: null, price: 55000, image: "/images/menu/bruce-jack-daily-brew.webp" },
        ],
      },
      {
        id: "cocktails",
        name: "Cocktails",
        items: [
          { id: 189, slug: "long-island", name: "Long Island", description: null, price: 15000, image: "/images/menu/long-island.webp" },
          { id: 190, slug: "sex-on-the-beach", name: "Sex On The Beach", description: null, price: 14000, image: "/images/menu/sex-on-the-beach.webp" },
          { id: 191, slug: "strawberry-margarita", name: "Strawberry Margarita", description: null, price: 14000, image: "/images/menu/strawberry-margarita.webp" },
          { id: 192, slug: "kiwi-rum", name: "Kiwi Rum", description: null, price: 12000, image: "/images/menu/kiwi-rum.webp" },
          { id: 193, slug: "chiaro-martini", name: "Chiaro Martini", description: null, price: 14000, image: "/images/menu/chiaro-martini.webp" },
          { id: 194, slug: "cosmopolitan", name: "Cosmopolitan", description: null, price: 17000, image: "/images/menu/cosmopolitan.webp" },
          { id: 199, slug: "tequilla-shot", name: "Tequilla Shot", description: null, price: 3500, image: "/images/menu/tequilla-shot.webp" },
          { id: 200, slug: "classic-mojito", name: "Classic Mojito", description: null, price: 12000, image: "/images/menu/classic-mojito.webp" },
          { id: 207, slug: "screaming-orgasm", name: "Screaming orgasm", description: null, price: 12000, image: "/images/menu/screaming-orgasm.webp" },
          { id: 214, slug: "jack-daniels-single-shot", name: "Jack Daniels Single Shot", description: null, price: 8000, image: "/images/menu/jack-daniels-single-shot.webp" },
          { id: 215, slug: "jack-daniels-double-shot", name: "Jack Daniels Double Shot", description: null, price: 16000, image: "/images/menu/jack-daniels-double-shot.webp" },
        ],
      },
      {
        id: "beer",
        name: "Beer",
        items: [
          { id: 195, slug: "guinness-extra", name: "Guinness Extra", description: null, price: 5000, image: "/images/menu/guinness-extra.webp" },
          { id: 196, slug: "trophy-beer", name: "Trophy Beer", description: null, price: 5000, image: "/images/menu/trophy-beer.webp" },
          { id: 197, slug: "budweiser", name: "Budweiser", description: null, price: 5000, image: "/images/menu/budweiser.webp" },
          { id: 198, slug: "heineken", name: "Heineken", description: null, price: 5000, image: "/images/menu/heineken.webp" },
          { id: 201, slug: "star-beer", name: "Star beer", description: null, price: 6000, image: "/images/menu/star-beer.webp" },
          { id: 209, slug: "goldberg", name: "Goldberg", description: null, price: 5000, image: "/images/menu/goldberg.webp" },
          { id: 210, slug: "draft-beer-35cl", name: "Draft Beer 35cl", description: null, price: 5000, image: "/images/menu/draft-beer-35cl.webp" },
          { id: 211, slug: "draft-beer-50cl", name: "Draft Beer 50cl", description: null, price: 6000, image: "/images/menu/draft-beer-50cl.webp" },
        ],
      },
    ],
  },
  {
    id: "tobacco",
    name: "Tobacco",
    sections: [
      {
        id: "shisha",
        name: "shisha",
        items: [
          { id: 99, slug: "mint-and-lemon-shisha", name: "Mint And Lemon Shisha", description: null, price: 15000, image: "/images/menu/mint-and-lemon-shisha.webp" },
          { id: 100, slug: "mint", name: "Mint", description: null, price: 15000, image: "/images/menu/mint.webp" },
          { id: 101, slug: "double-apple", name: "Double Apple", description: null, price: 15000, image: "/images/menu/double-apple.webp" },
          { id: 102, slug: "strawberry", name: "Strawberry", description: null, price: 15000, image: "/images/menu/strawberry.webp" },
          { id: 103, slug: "melon", name: "Melon", description: null, price: 15000, image: "/images/menu/melon.webp" },
          { id: 137, slug: "birthday-candle", name: "Birthday Candle", description: null, price: 3000, image: "/images/menu/birthday-candle.webp" },
        ],
      },
    ],
  },
];

export const allItems: MenuItem[] = menu.flatMap((c) => c.sections.flatMap((s) => s.items));
export const itemBySlug = (slug: string) => allItems.find((i) => i.slug === slug);

// Hand-picked for the home page. Change the slugs to feature other items.
export const signatureSlugs = ["nutella-strawberry-croissant", "pistachio-dream-latte", "mediterranean-bliss-salad", "the-chiaro-platter", "margherita-perfection", "strawberry-margarita"];

export const formatPrice = (n: number) => `${n.toLocaleString("en-US")} NGN`;
