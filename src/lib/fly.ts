// Sends a copy of a photo flying along a curve into the list button.
export function flyToBag(source: HTMLElement | null) {
  if (!source || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const target = [...document.querySelectorAll<HTMLElement>("[data-bag]")].find((b) => b.offsetParent !== null);
  if (!target) return;
  const from = source.getBoundingClientRect();
  const to = target.getBoundingClientRect();
  const clone = source.cloneNode(true) as HTMLElement;
  Object.assign(clone.style, {
    position: "fixed", left: `${from.left}px`, top: `${from.top}px`, width: `${from.width}px`, height: `${from.height}px`,
    margin: "0", zIndex: "90", borderRadius: "6px", overflow: "hidden", pointerEvents: "none",
  });
  document.body.appendChild(clone);
  const dx = to.left + to.width / 2 - (from.left + from.width / 2);
  const dy = to.top + to.height / 2 - (from.top + from.height / 2);
  clone
    .animate(
      [
        { transform: "translate(0,0) scale(1) rotate(0deg)", opacity: 1 },
        { transform: `translate(${dx * 0.45}px, ${dy * 0.3 - 50}px) scale(.8) rotate(-4deg)`, opacity: 1, offset: 0.5 },
        { transform: `translate(${dx}px, ${dy}px) scale(.14) rotate(4deg)`, opacity: 0.6 },
      ],
      { duration: 700, easing: "cubic-bezier(.45,.05,.3,1)" },
    )
    .finished.finally(() => clone.remove());
}
