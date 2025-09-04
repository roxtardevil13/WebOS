'use client';
import React from 'react';

type TaskbarProps = {
  apps: { id: string; title: string; running: boolean; }[];
  onToggle: (id: string) => void;
  onLaunch: (id: string) => void;
};

export default function Taskbar({ apps, onToggle, onLaunch }: TaskbarProps) {
  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur rounded-2xl shadow-soft px-3 py-2 flex gap-2">
      {apps.map(a => (
        <button
          key={a.id}
          onClick={() => (a.running ? onToggle(a.id) : onLaunch(a.id))}
          className={`px-3 py-1 rounded-xl text-sm ${a.running ? 'bg-brand/30' : 'bg-black/20'} hover:bg-white/20 transition`}
          title={a.title}
        >
          {a.title}
        </button>
      ))}
    </div>
  );
}
