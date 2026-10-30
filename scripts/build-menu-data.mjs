// One-off: turns content/menu.extracted.json into src/data/menu.ts. Edit menu.ts by hand after this.
import fs from 'node:fs';
const d=JSON.parse(fs.readFileSync('content/menu.extracted.json','utf8'));
const slug=s=>s.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/&/g,'and').replace(/[’']/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const order={Food:['Breakfast','Vibrant Salads','Signature Sandwiches','Gourmet Pizza','Pizza','Main Dish','Bites','Desert','Take Out'],Beverages:['Espresso','Warm Up Your Heart','Tea Garden','Cool Me Down','Smooth Out Your Day','Shakelicious','On The Rocks','Italian Soda','Cool Classics','Sparkling Sensations','Wine','Cocktails','Beer'],Tobacco:['shisha']};
const hot=new Set(['Espresso','Warm Up Your Heart','Tea Garden']);
const cold=new Set(['Cool Me Down','Smooth Out Your Day','Shakelicious','On The Rocks','Italian Soda','Cool Classics','Sparkling Sensations']);
const flavours={label:'Add Flavor (Optional)',required:false,choices:['Vanilla','Hazelnut','Caramel','Irish Cream','Cinnamon','Chocolate']};
const bread={label:'Choice of bread',required:true,choices:['Baguette','Sourdough']};
const opts={7:flavours,52:flavours,80:bread,81:bread};
const q=v=>JSON.stringify(v);
let out=`// Chiaro caffe menu. Edit names, descriptions and prices here.
// Prices are in NGN. To replace a photo, put your file in public/images/menu/ and change \`image\`.
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
`;
const seen=new Set();let n=0;
for(const c of d.categories){
  out+=`  {\n    id: ${q(slug(c.name))},\n    name: ${q(c.name)},\n    sections: [\n`;
  const groups=c.menus.flatMap(m=>m.groups);
  for(const name of order[c.name]){
    const g=groups.find(x=>x.name===name); if(!g) throw new Error('missing '+name);
    out+=`      {\n        id: ${q(slug(name))},\n        name: ${q(name)},\n        items: [\n`;
    for(const i of g.items){
      let s=slug(i.name); if(seen.has(s)) s=s+'-'+i.id; seen.add(s); n++;
      const t=hot.has(name)&&i.id!==123?'hot':cold.has(name)?'cold':null;
      out+=`          { id: ${i.id}, slug: ${q(s)}, name: ${q(i.name)}, description: ${q(i.description)}, price: ${i.priceNGN}, image: ${q(`/images/menu/${s}.webp`)}${i.popular?', popular: true':''}${t?`, temperature: ${q(t)}`:''}${opts[i.id]?`, options: [${q(opts[i.id])}]`:''} },\n`;
    }
    out+=`        ],\n      },\n`;
  }
  out+=`    ],\n  },\n`;
}
out+=`];\n
export const allItems: MenuItem[] = menu.flatMap((c) => c.sections.flatMap((s) => s.items));
export const itemBySlug = (slug: string) => allItems.find((i) => i.slug === slug);

// Hand-picked for the home page. Change the slugs to feature other items.
export const signatureSlugs = ["nutella-strawberry-croissant", "pistachio-dream-latte", "mediterranean-bliss-salad", "the-chiaro-platter", "margherita-perfection", "strawberry-margarita"];

export const formatPrice = (n: number) => \`\${n.toLocaleString("en-US")} NGN\`;
`;
fs.writeFileSync('src/data/menu.ts',out);console.log('items',n);
