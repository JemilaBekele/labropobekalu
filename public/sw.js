if(!self.define){let e,t={};const s=(s,a)=>(s=new URL(s+".js",a).href,t[s]||new Promise((t=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=t,document.head.appendChild(e)}else e=s,importScripts(s),t()})).then((()=>{let e=t[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(a,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(t[n])return;let c={};const r=e=>s(e,n),f={module:{uri:n},exports:c,require:r};t[n]=Promise.all(a.map((e=>f[e]||r(e)))).then((e=>(i(...e),c)))}}define(["./workbox-cb477421"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"ebbbcce3c8136bd4416ddf22945bc2d4"},{url:"/_next/static/chunks/124.d511dd03d73f9634.js",revision:"d511dd03d73f9634"},{url:"/_next/static/chunks/164f4fb6-70b260a1e046393d.js",revision:"utlvZFvFy1SVA7Snnodit"},{url:"/_next/static/chunks/23-87380418e22e90f4.js",revision:"utlvZFvFy1SVA7Snnodit"},{url:"/_next/static/chunks/231-b3e51780bf905b9d.js",revision:"utlvZFvFy1SVA7Snnodit"},{url:"/_next/static/chunks/232-58cbcb0fcb5a2d28.js",revision:"utlvZFvFy1SVA7Snnodit"},{url:"/_next/static/chunks/303-f9576036d5114c24.js",revision:"utlvZFvFy1SVA7Snnodit"},{url:"/_next/static/chunks/661-00805ad10eb7926e.js",revision:"utlvZFvFy1SVA7Snnodit"},{url:"/_next/static/chunks/838.b7d541ef963c9782.js",revision:"b7d541ef963c9782"},{url:"/_next/static/chunks/ad2866b8.989f74a0aef466bf.js",revision:"989f74a0aef466bf"},{url:"/_next/static/chunks/app/_not-found/page-c3d7bfc1806ec87c.js",revision:"utlvZFvFy1SVA7Snnodit"},{url:"/_next/static/chunks/app/chemistry/page-98250646ff9122cd.js",revision:"utlvZFvFy1SVA7Snnodit"},{url:"/_next/static/chunks/app/electrolyte/page-990a49e93f8ffd87.js",revision:"utlvZFvFy1SVA7Snnodit"},{url:"/_next/static/chunks/app/hematology/page-2d777046d109edec.js",revision:"utlvZFvFy1SVA7Snnodit"},{url:"/_next/static/chunks/app/hormon/page-2cca56c74d585d1b.js",revision:"utlvZFvFy1SVA7Snnodit"},{url:"/_next/static/chunks/app/layout-e4be36510600ad7a.js",revision:"utlvZFvFy1SVA7Snnodit"},{url:"/_next/static/chunks/app/microbiology/page-1b3e0c959819845a.js",revision:"utlvZFvFy1SVA7Snnodit"},{url:"/_next/static/chunks/app/page-a3b6f8a3f52ce0df.js",revision:"utlvZFvFy1SVA7Snnodit"},{url:"/_next/static/chunks/app/rarasitology/page-b9a8323cdf41a4d1.js",revision:"utlvZFvFy1SVA7Snnodit"},{url:"/_next/static/chunks/app/report-builder/page-cf01fcb2fc830e7a.js",revision:"utlvZFvFy1SVA7Snnodit"},{url:"/_next/static/chunks/app/resume-import/page-6fef47b0e57b442d.js",revision:"utlvZFvFy1SVA7Snnodit"},{url:"/_next/static/chunks/app/resume-parser/page-ac0aaf2257f321c2.js",revision:"utlvZFvFy1SVA7Snnodit"},{url:"/_next/static/chunks/app/serology/page-9af0576356d394ee.js",revision:"utlvZFvFy1SVA7Snnodit"},{url:"/_next/static/chunks/app/urinalysis/page-91fc942cb0610c05.js",revision:"utlvZFvFy1SVA7Snnodit"},{url:"/_next/static/chunks/bc98253f.49ed0d91d36d04ec.js",revision:"49ed0d91d36d04ec"},{url:"/_next/static/chunks/fd9d1056-2737f78bfff3f6bf.js",revision:"utlvZFvFy1SVA7Snnodit"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"utlvZFvFy1SVA7Snnodit"},{url:"/_next/static/chunks/main-84696524c1c5ab66.js",revision:"utlvZFvFy1SVA7Snnodit"},{url:"/_next/static/chunks/main-app-c7f30dfc5a28126a.js",revision:"utlvZFvFy1SVA7Snnodit"},{url:"/_next/static/chunks/pages/_app-6a626577ffa902a4.js",revision:"utlvZFvFy1SVA7Snnodit"},{url:"/_next/static/chunks/pages/_error-1be831200e60c5c0.js",revision:"utlvZFvFy1SVA7Snnodit"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-7cd8c88f319bc094.js",revision:"utlvZFvFy1SVA7Snnodit"},{url:"/_next/static/css/7faabed3e6198104.css",revision:"7faabed3e6198104"},{url:"/_next/static/media/26a46d62cd723877-s.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/6d93bde91c0c2823-s.woff2",revision:"621a07228c8ccbfd647918f1021b4868"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/a34f9d1faa5f3315-s.p.woff2",revision:"d4fe31e6a2aebc06b8d6e558c9141119"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"},{url:"/_next/static/utlvZFvFy1SVA7Snnodit/_buildManifest.js",revision:"2ec694eb52ae4f523f265a46bae4d768"},{url:"/_next/static/utlvZFvFy1SVA7Snnodit/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/assets/add-pdf.svg",revision:"0384a17f2c748af1667ec55688f6934c"},{url:"/assets/dots.svg",revision:"71e62f5a042ff606e2d2e4474efe4a6a"},{url:"/assets/heart.svg",revision:"cc918e92fe9e3a3d7b774fee9850534b"},{url:"/browserconfig.xml",revision:"e11d3f414dc1f0a0e0e030926908c4eb"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/fonts/Caladea-Bold.ttf",revision:"dfc3ef1ea7afc8347530f6f293a3315d"},{url:"/fonts/Caladea-Regular.ttf",revision:"d449e93a49aca2817a4edd95e18c5196"},{url:"/fonts/Lato-Bold.ttf",revision:"95e5716b2fd3d1127f35c1da3ccaf516"},{url:"/fonts/Lato-Regular.ttf",revision:"ece9b3d15f1aacc1a86faa9fff760fb6"},{url:"/fonts/Lora-Bold.ttf",revision:"0e64e58f5e28e9ee0a07202ae1dc993c"},{url:"/fonts/Lora-Regular.ttf",revision:"f3bd62dac4257fe0902d70bd1055a034"},{url:"/fonts/Merriweather-Bold.ttf",revision:"10194ef0350face28171a01aa9811025"},{url:"/fonts/Merriweather-Regular.ttf",revision:"4f1dfc44d3307d64f235587f3aa79393"},{url:"/fonts/Montserrat-Bold.ttf",revision:"4985f5e95abeb91c5ea069bc9a93ff8b"},{url:"/fonts/Montserrat-Regular.ttf",revision:"b1bc66d0070926a9870423be286272e8"},{url:"/fonts/OFL.txt",revision:"9f09607ddb92dbfca760ed1c6208183a"},{url:"/fonts/OpenSans-Bold.ttf",revision:"565d38328430a73cf90bd2bbf3fc46cf"},{url:"/fonts/OpenSans-Regular.ttf",revision:"a2253cfe244d0430ded59053c9d61dd0"},{url:"/fonts/PlayfairDisplay-Bold.ttf",revision:"5f5b0cf801b682d5679405819c7afd4a"},{url:"/fonts/PlayfairDisplay-Regular.ttf",revision:"e58aabcd4481263116dd3a63951bd1ba"},{url:"/fonts/Raleway-Bold.ttf",revision:"087bd37144b74a72cff442765204b6d5"},{url:"/fonts/Raleway-Regular.ttf",revision:"a9dc71a0e41e736a7b8dccf183b1762d"},{url:"/fonts/Roboto-Bold.ttf",revision:"2be020c582f3a688d625c3381eb6ef58"},{url:"/fonts/Roboto-Regular.ttf",revision:"60d21c444274c9bd79cbeba61af5d200"},{url:"/fonts/RobotoSlab-Bold.ttf",revision:"369a081dae12ef764625d95c9ae07d13"},{url:"/fonts/RobotoSlab-Regular.ttf",revision:"25fc0259cd22bcb0fa426fc0cba129b3"},{url:"/fonts/fonts.css",revision:"1c89c41e4dccd88f5b25c36885956275"},{url:"/image/logo.png",revision:"6a791129b10cfb3606304967c19a28bc"},{url:"/image/video6.mp4",revision:"d2c2e9e1b0beff16f6083e1060a54058"},{url:"/logo.png",revision:"6a791129b10cfb3606304967c19a28bc"},{url:"/manifest.json",revision:"f73e2ad99218fbe0cdac8239ee36db71"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/service-worker.js",revision:"4aafc2a700bd3cf946e99cf84359d528"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:t,event:s,state:a})=>t&&"opaqueredirect"===t.type?new Response(t.body,{status:200,statusText:"OK",headers:t.headers}):t}]}),"GET"),e.registerRoute(/^https?.*/,new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:100,maxAgeSeconds:2592e3})]}),"GET")}));
