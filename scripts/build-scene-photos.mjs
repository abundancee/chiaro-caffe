// One-off: builds the large low-key photos used by the home page scenes. Then run `npm run images:process`.
import fs from 'node:fs';import sharp from 'sharp';
const scenes={hero:[6166818,2400,1600,'center',true],'about-first':[38507728,1000,1250,'center'],'about-last':[29319320,1000,1250,'center'],'number-all':[16818588,1000,1250,'center'],'number-start':[3850305,1000,1250,'south'],'number-tea':[1493080,1000,1250,'center'],'number-coffee':[27469108,1000,1250,'center']};
const cache='.image-cache/scenes';fs.mkdirSync(cache,{recursive:true});
for(const [name,[id,w,h,pos,flop]] of Object.entries(scenes)){
  const f=`${cache}/${id}.jpg`;
  if(!fs.existsSync(f)){const r=await fetch(`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=2400`);if(!r.ok)throw new Error(name);fs.writeFileSync(f,Buffer.from(await r.arrayBuffer()))}
  let s=sharp(f).rotate().resize(w,h,{fit:'cover',position:pos});if(flop)s=s.flop();
  await s.webp({quality:name==='hero'?80:76}).toFile(`public/images/site/${name}.webp`);
}
// Phones get their own portrait crop of the hero, centred on the glass.
await sharp('.image-cache/scenes/6166818.jpg').flop().extract({left:412,top:0,width:1000,height:1600}).webp({quality:74}).toFile('public/images/site/hero-mobile.webp');
