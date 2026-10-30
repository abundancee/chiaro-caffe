// Downloads the stock photos named in content/photo-sources.json, crops them to 4:5 with one shared
// colour treatment, and writes src/data/image-blur.json (blur placeholders for every image in public/images).
// A source can be a Pexels id or [id, cropPosition]. Delete a .webp to regenerate it. Run with: npm run images:process
import fs from 'node:fs';import path from 'node:path';import sharp from 'sharp';
const sources=JSON.parse(fs.readFileSync('content/photo-sources.json','utf8'));
const menuSrc=fs.readFileSync('src/data/menu.ts','utf8');
const items=[...menuSrc.matchAll(/\{ id: (\d+), slug: "([^"]+)"/g)].map(m=>({id:m[1],slug:m[2]}));
const CACHE='.image-cache';fs.mkdirSync(CACHE,{recursive:true});
const url=id=>`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1400`;
const get=async id=>{const f=`${CACHE}/${id}.jpg`;if(!fs.existsSync(f)){const r=await fetch(url(id));if(!r.ok)throw new Error(`photo ${id}: ${r.status}`);fs.writeFileSync(f,Buffer.from(await r.arrayBuffer()))}return f};
// One grade for all: slightly lower saturation, warmer, soft contrast.
const grade=s=>s.modulate({saturation:0.9,brightness:0.98}).recomb([[1.03,0.0,0.0],[0.0,1.0,0.0],[0.0,0.0,0.94]]).linear(0.96,4);
const missing=items.filter(i=>!sources[i.id]);if(missing.length)console.warn('no source for',missing.map(i=>i.slug));
for(let k=0;k<items.length;k+=10){await Promise.all(items.slice(k,k+10).map(async i=>{
  const out=`public/images/menu/${i.slug}.webp`;if(fs.existsSync(out)||!sources[i.id])return;
  const [id,pos]=[].concat(sources[i.id]);const f=await get(id);
  await grade(sharp(f).rotate().resize(800,1000,{fit:'cover',position:pos??sharp.strategy.attention})).webp({quality:72}).toFile(out);
}))}
const blur={};
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]);
for(const f of walk('public/images').filter(f=>/\.(webp|jpe?g|png)$/.test(f))){
  const b=await sharp(f).resize(10,12,{fit:'cover'}).webp({quality:30}).toBuffer();
  blur['/'+path.relative('public',f).split(path.sep).join('/')]=`data:image/webp;base64,${b.toString('base64')}`;
}
fs.writeFileSync('src/data/image-blur.json',JSON.stringify(blur));
console.log('images',Object.keys(blur).length);
