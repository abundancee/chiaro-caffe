// CSS-only so it plays before any JavaScript runs. The inline script skips it after the first visit.
export const loaderScript = `try{if(sessionStorage.getItem('chiaro-seen')||matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('no-loader')}else{sessionStorage.setItem('chiaro-seen','1')}}catch(e){}`;

export function Loader() {
  return (
    <div className="loader" aria-hidden>
      <div className="loader-curtain" />
      <div className="loader-curtain">
        <div className="loader-stage">
          <div className="loader-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/site/logo-full-oat.png" alt="" width={783} height={909} className="loader-logo-dim" />
            <div className="loader-logo-lit">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/site/logo-full-oat.png" alt="" width={783} height={909} />
            </div>
          </div>
          <div className="loader-line" />
          <p className="loader-pct mt-3 font-serif text-lg italic text-cream/80" />
        </div>
      </div>
    </div>
  );
}
