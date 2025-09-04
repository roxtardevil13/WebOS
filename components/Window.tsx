'use client';
import React, { useRef, useState } from 'react';

type WindowProps = {
  id: string;
  title: string;
  onClose: (id: string) => void;
  onFocus: (id: string) => void;
  z: number;
  initial: { x: number; y: number; w: number; h: number };
  children: React.ReactNode;
};

export default function Window({ id, title, onClose, onFocus, z, initial, children }: WindowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: initial.x, y: initial.y });
  const [size, setSize] = useState({ w: initial.w, h: initial.h });
  const [drag, setDrag] = useState<{dx:number,dy:number}|null>(null);
  const [resize, setResize] = useState<{rx:number,ry:number}|null>(null);

  const onMouseDown = () => { onFocus(id); };
  const startDrag = (e: React.MouseEvent) => {
    e.preventDefault();
    setDrag({ dx: e.clientX - pos.x, dy: e.clientY - pos.y });
    onFocus(id);
  };
  const startResize = (e: React.MouseEvent) => {
    e.preventDefault();
    setResize({ rx: e.clientX - size.w, ry: e.clientY - size.h });
    onFocus(id);
  };
  const onMove = (e: React.MouseEvent) => {
    if (drag) setPos({ x: e.clientX - drag.dx, y: e.clientY - drag.dy });
    if (resize) setSize({ w: Math.max(260, e.clientX - resize.rx), h: Math.max(160, e.clientY - resize.ry) });
  };
  const endDrag = () => { setDrag(null); setResize(null); };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
      onMouseDown={onMouseDown}
      style={{ left: pos.x, top: pos.y, width: size.w, height: size.h, zIndex: 1000 + z }}
      className="fixed bg-card rounded-2xl shadow-soft border border-white/5 overflow-hidden select-none"
    >
      <div className="flex items-center justify-between px-3 py-2 bg-white/5 cursor-move" onMouseDown={startDrag}>
        <div className="font-medium">{title}</div>
        <button onClick={() => onClose(id)} className="w-3 h-3 rounded-full bg-red-500/80" aria-label="close" />
      </div>
      <div className="p-3 h-[calc(100%-2.25rem)] overflow-auto">{children}</div>
      <div
        onMouseDown={startResize}
        className="absolute right-1 bottom-1 w-4 h-4 cursor-se-resize opacity-60"
        title="Resize"
      />
    </div>
  );
}
