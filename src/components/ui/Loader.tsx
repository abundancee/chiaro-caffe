// CSS-only so it plays before any JavaScript runs. The inline script skips it after the first visit.
export const loaderScript = `try{if(sessionStorage.getItem('chiaro-seen')||matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('no-loader')}else{sessionStorage.setItem('chiaro-seen','1')}}catch(e){}`;

export function Loader() {
  return (
    <div className="loader" aria-hidden>
      <div className="loader-shutter" />
      <div className="loader-shutter" />
      <div className="loader-shutter" />
      <div className="loader-shutter" />
      <div className="loader-shutter" />
      <div className="loader-stage">
        <svg viewBox="0 0 120 124" className="w-32 text-cream" fill="none">
          <defs>
            <clipPath id="cup-clip">
              <path d="M25 39h68v47a23 23 0 0 1-23 23H48a23 23 0 0 1-23-23V39Z" />
            </clipPath>
          </defs>
          <g stroke="currentColor" strokeWidth="5" strokeLinecap="round">
            <path className="steam" d="M40 28c-6-6 6-10 0-18" />
            <path className="steam steam-2" d="M58 28c-6-6 6-10 0-18" />
            <path className="steam steam-3" d="M76 28c-6-6 6-10 0-18" />
          </g>
          <g clipPath="url(#cup-clip)">
            <g className="loader-fill">
              <path
                className="loader-wave"
                d="M0 46q15-8 30 0t30 0 30 0 30 0 30 0 30 0v80H0Z"
                fill="#f2622e"
              />
            </g>
          </g>
          <path d="M92 52h6a15 15 0 0 1 0 30h-8" stroke="currentColor" strokeWidth="6" />
          <path d="M22 36h74v50a26 26 0 0 1-26 26H48a26 26 0 0 1-26-26V36Z" stroke="currentColor" strokeWidth="6" />
        </svg>
        <p className="display mt-5 text-[2.5rem] tracking-wide">Chiaro</p>
        <p className="loader-pct mt-1 font-serif text-xl italic text-cream/80" />
      </div>
    </div>
  );
}
