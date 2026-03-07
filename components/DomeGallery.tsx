"use client";
import { useEffect, useMemo, useRef, useCallback, useState } from 'react';
import { useGesture } from '@use-gesture/react';

type ImageItem = string | { image: string; alt?: string };

type DomeGalleryProps = {
  images?: ImageItem[];
  fit?: number;
  minRadius?: number;
  maxRadius?: number;
  maxVerticalRotationDeg?: number;
  dragSensitivity?: number;
  segments?: number;
  dragDampening?: number;
  imageBorderRadius?: string;
  grayscale?: boolean;
  autoRotationSpeed?: number;
  onImageClick?: (src: string) => void;
};

type ItemDef = {
  src: string;
  alt: string;
  x: number;
  y: number;
  sizeX: number;
  sizeY: number;
};

const DEFAULT_IMAGES: ImageItem[] = [
  { image: '/img/asii.bullet.jpeg', alt: 'Bullet Project' },
  { image: '/img/asii.button.jpeg', alt: 'Button Project' },
  { image: '/img/asii.glass.jpeg', alt: 'Glass Project' },
  { image: '/img/asii.hook.jpeg', alt: 'Hook Project' },
  { image: '/img/asii.hous.jpeg', alt: 'House Project' },
  { image: '/img/asii.news.jpeg', alt: 'News Project' },
  { image: '/img/asii.weding.jpeg', alt: 'Wedding Project' }
];

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
const wrapAngleSigned = (deg: number) => {
  const a = (((deg + 180) % 360) + 360) % 360;
  return a - 180;
};

// --- HELPER: BUILD ITEMS ---
function buildItems(pool: ImageItem[], seg: number): ItemDef[] {
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);
  const evenYs = [-4, -2, 0, 2, 4];
  const oddYs = [-3, -1, 1, 3, 5];
  
  const coords = xCols.flatMap((x, c) => {
    const ys = c % 2 === 0 ? evenYs : oddYs;
    return ys.map(y => ({ x, y, sizeX: 2.2, sizeY: 2.2 })); // Slightly larger tiles
  });

  const normalizedImages = pool.length > 0 
    ? pool.map(item => typeof item === 'string' ? { src: item, alt: '' } : { src: item.image, alt: item.alt || '' })
    : [{ src: 'https://via.placeholder.com/400', alt: 'Placeholder' }];

  return coords.map((c, i) => ({
    ...c,
    src: normalizedImages[i % normalizedImages.length].src,
    alt: normalizedImages[i % normalizedImages.length].alt
  }));
}

export default function DomeGallery({
  images = DEFAULT_IMAGES,
  fit = 0.9,
  minRadius = 1100,
  maxRadius = 2000,
  maxVerticalRotationDeg = 15,
  dragSensitivity = 30,
  segments = 40,
  dragDampening = 2,
  imageBorderRadius = '24px',
  grayscale = true,
  autoRotationSpeed = 0.08,
  onImageClick
}: DomeGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  
  const rotationRef = useRef({ x: 0, y: 0 });
  const startRotRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const inertiaRAF = useRef<number | null>(null);
  const autoRotateRAF = useRef<number | null>(null);
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const items = useMemo(() => buildItems(images, segments), [images, segments]);

  const applyTransform = useCallback((xDeg: number, yDeg: number) => {
    if (sphereRef.current) {
      sphereRef.current.style.transform = `translateZ(calc(var(--radius) * -1.25)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
    }
  }, []);

  // Infinite Auto Rotation
  useEffect(() => {
    if (!mounted) return;
    const rotate = () => {
      if (!draggingRef.current) {
        rotationRef.current.y = wrapAngleSigned(rotationRef.current.y + autoRotationSpeed);
        applyTransform(rotationRef.current.x, rotationRef.current.y);
      }
      autoRotateRAF.current = requestAnimationFrame(rotate);
    };
    autoRotateRAF.current = requestAnimationFrame(rotate);
    return () => { if (autoRotateRAF.current) cancelAnimationFrame(autoRotateRAF.current); };
  }, [mounted, autoRotationSpeed, applyTransform]);

  // Handle Resize and Radius
  useEffect(() => {
    if (!mounted || !rootRef.current) return;
    const root = rootRef.current;
    const ro = new ResizeObserver(entries => {
      const cr = entries[0].contentRect;
      const basis = Math.max(cr.width, cr.height);
      let radius = clamp(basis * fit, minRadius, maxRadius);
      root.style.setProperty('--radius', `${Math.round(radius)}px`);
      applyTransform(rotationRef.current.x, rotationRef.current.y);
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [mounted, fit, minRadius, maxRadius, applyTransform]);

  const stopInertia = useCallback(() => { 
    if (inertiaRAF.current) cancelAnimationFrame(inertiaRAF.current); 
    inertiaRAF.current = null; 
  }, []);

  const startInertia = useCallback((vx: number, vy: number) => {
    let vX = clamp(vx, -1.5, 1.5) * 80, vY = clamp(vy, -1.5, 1.5) * 80;
    const friction = 0.95;
    const step = () => {
      vX *= friction; vY *= friction;
      if (Math.abs(vX) < 0.05 && Math.abs(vY) < 0.05) return;
      rotationRef.current.x = clamp(rotationRef.current.x - vY / 180, -maxVerticalRotationDeg, maxVerticalRotationDeg);
      rotationRef.current.y = wrapAngleSigned(rotationRef.current.y + vX / 180);
      applyTransform(rotationRef.current.x, rotationRef.current.y);
      inertiaRAF.current = requestAnimationFrame(step);
    };
    stopInertia();
    inertiaRAF.current = requestAnimationFrame(step);
  }, [maxVerticalRotationDeg, stopInertia, applyTransform]);

  useGesture({
    onDragStart: ({ event }) => {
      stopInertia();
      const evt = event as PointerEvent;
      draggingRef.current = true;
      movedRef.current = false;
      startRotRef.current = { ...rotationRef.current };
      startPosRef.current = { x: evt.clientX, y: evt.clientY };
    },
    onDrag: ({ event, last, velocity: [vx, vy], direction: [dx, dy] }) => {
      if (!draggingRef.current || !startPosRef.current) return;
      const evt = event as PointerEvent;
      const dX = evt.clientX - startPosRef.current.x, dY = evt.clientY - startPosRef.current.y;
      
      // If moved more than 5 pixels, consider it a drag, not a click
      if (!movedRef.current && (Math.abs(dX) > 5 || Math.abs(dY) > 5)) movedRef.current = true;
      
      rotationRef.current.x = clamp(startRotRef.current.x - dY / dragSensitivity, -maxVerticalRotationDeg, maxVerticalRotationDeg);
      rotationRef.current.y = startRotRef.current.y + dX / dragSensitivity;
      applyTransform(rotationRef.current.x, rotationRef.current.y);
      
      if (last) {
        draggingRef.current = false;
        if (!movedRef.current) {
          // Click Logic
          const target = (evt.target as Element).closest('.sphere-item') as HTMLElement;
          const src = target?.getAttribute('data-src');
          if (src && onImageClick) onImageClick(src);
        } else {
          startInertia(vx * dx, vy * dy);
        }
      }
    }
  }, { target: mainRef, eventOptions: { passive: false } });

  if (!mounted) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .sphere-root { 
          --radius: 1100px; 
          --circ: calc(var(--radius) * 3.14159); 
          --item-width: calc(var(--circ) / var(--segments-x)); 
          --item-height: calc(var(--circ) / var(--segments-y)); 
        }
        .stage { 
          width: 100%; height: 100%; display: grid; place-items: center; position: absolute; inset: 0; perspective: 2000px; 
        }
        .sphere { 
          transform-style: preserve-3d; position: absolute; will-change: transform; transition: transform 0.1s ease-out;
        }
        .sphere-item { 
          position: absolute; 
          width: calc(var(--item-width) * var(--item-size-x)); 
          height: calc(var(--item-height) * var(--item-size-y)); 
          transform-style: preserve-3d; 
          transform: rotateY(calc((360deg / var(--segments-x) / 2) * var(--offset-x))) rotateX(calc((360deg / var(--segments-y) / 2) * var(--offset-y))) translateZ(var(--radius)); 
        }
        .item__image { 
          position: absolute; inset: 8px; border-radius: var(--tile-radius); overflow: hidden; cursor: pointer; background: #0a0a0a; 
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1); border: 1px solid rgba(255,255,255,0.03);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        .item__image:hover { 
          transform: scale(1.18) translateZ(60px); 
          border-color: rgba(0, 255, 65, 0.4); 
          box-shadow: 0 0 40px rgba(0, 255, 65, 0.2); 
          filter: grayscale(0) brightness(1.2) !important;
          z-index: 100;
        }
        .item__image img {
          width: 100%; height: 100%; object-cover: cover; pointer-events: none; will-change: filter;
        }
      ` }} />
      <div ref={rootRef} className="sphere-root relative w-full h-screen bg-transparent overflow-hidden" style={{ '--segments-x': segments, '--segments-y': segments, '--tile-radius': imageBorderRadius } as any}>
        <main ref={mainRef} className="absolute inset-0 select-none touch-none">
          <div className="stage">
            <div ref={sphereRef} className="sphere">
              {items.map((it, i) => (
                <div key={i} className="sphere-item" data-src={it.src} style={{ '--offset-x': it.x, '--offset-y': it.y, '--item-size-x': it.sizeX, '--item-size-y': it.sizeY } as any}>
                  <div className="item__image" style={{ filter: grayscale ? 'grayscale(1)' : 'none' }}>
                    <img src={it.src} alt={it.alt} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}