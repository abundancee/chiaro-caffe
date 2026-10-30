// One-off: cuts the logo out of the café's JPEG and builds site photos, icons and the link-preview image.
import fs from 'node:fs';import sharp from 'sharp';
const SRC='content/brand-source/whatsapp-image-2024-12-23-at-81435-pm_2.jpeg';
const TAUPE=[158,131,110],ESPRESSO=[28,23,20],OAT=[246,242,234];
const {data,info}=await sharp(SRC).removeAlpha().raw().toBuffer({resolution:'raw',resolveWithObject:true}).catch(async()=>{const r=await sharp(SRC).removeAlpha().raw().toBuffer({resolveWithObject:true});return r});
const {width:w,height:h}=info;const alpha=Buffer.alloc(w*h);
for(let i=0;i<w*h;i++){const l=data[i*3]*.3+data[i*3+1]*.59+data[i*3+2]*.11;const v=(l-136)/(232-136);alpha[i]=Math.max(0,Math.min(255,Math.round(v*255)));}
const tinted=async(rgb,box)=>{const n=w*h;const b=Buffer.alloc(n*4);for(let i=0;i<n;i++){b[i*4]=rgb[0];b[i*4+1]=rgb[1];b[i*4+2]=rgb[2];b[i*4+3]=alpha[i];}
  let s=sharp(b,{raw:{width:w,height:h,channels:4}});if(box)s=s.extract(box);return sharp(await s.png().toBuffer()).trim({threshold:4});};
const FULL={left:150,top:80,width:870,height:940},ARCH={left:270,top:80,width:630,height:610},WORD={left:170,top:710,width:830,height:210};
fs.mkdirSync('public/images/site',{recursive:true});
await (await tinted(OAT,FULL)).png().toFile('public/images/site/logo-full-oat.png');
await (await tinted(ESPRESSO,FULL)).png().toFile('public/images/site/logo-full-espresso.png');
await (await tinted(OAT,WORD)).resize({height:120}).png().toFile('public/images/site/wordmark-oat.png');
await (await tinted(ESPRESSO,WORD)).resize({height:120}).png().toFile('public/images/site/wordmark-espresso.png');
const arch=await (await tinted(OAT,ARCH)).resize({height:640}).png().toBuffer();
const iconOn=async(size,pad,out)=>{const a=await sharp(arch).resize({height:Math.round(size*(1-pad*2))}).png().toBuffer();await sharp({create:{width:size,height:size,channels:4,background:{r:TAUPE[0],g:TAUPE[1],b:TAUPE[2],alpha:1}}}).composite([{input:a,gravity:'center'}]).png().toFile(out)};
await iconOn(512,.14,'src/app/icon.png');await iconOn(180,.14,'src/app/apple-icon.png');await iconOn(512,.24,'public/icon-maskable.png');
const full=await (await tinted(OAT,FULL)).resize({height:420}).png().toBuffer();
await sharp({create:{width:1200,height:630,channels:4,background:{r:TAUPE[0],g:TAUPE[1],b:TAUPE[2],alpha:1}}}).composite([{input:full,gravity:'center'}]).png().toFile('src/app/opengraph-image.png');
const site={hero:[1235706,2000,2500,'center'],story:[302899,1200,1500,'center'],'gallery-pour':[18728540,1200,1500,'center'],'gallery-hookah':[7518749,1600,1200,'center'],'gallery-mojito':[7259040,1200,1500,'east'],'gallery-cup':[13240964,1600,1200,'center'],'gallery-pizza':[5640020,1200,1500,'center'],'gallery-prawns':[8697543,1200,1500,'center']};
for(const [name,[id,W,H,pos]] of Object.entries(site)){const u=`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=2400`;const r=await fetch(u);if(!r.ok)throw new Error(name);const b=Buffer.from(await r.arrayBuffer());const m=await sharp(b).metadata();console.log(name,m.width,m.height);
  await sharp(b).rotate().resize(W,H,{fit:'cover',position:pos}).modulate({saturation:.9,brightness:.98}).recomb([[1.03,0,0],[0,1,0],[0,0,.94]]).webp({quality:76}).toFile(`public/images/site/${name}.webp`);}
