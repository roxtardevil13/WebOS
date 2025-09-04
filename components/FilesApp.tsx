'use client';
import React, { useState } from 'react';

export default function FilesApp() {
  const [fileHandle, setFileHandle] = useState<FileSystemDirectoryHandle | null>(null);
  const [items, setItems] = useState<string[]>([]);
  const supported = typeof window !== 'undefined' && 'showDirectoryPicker' in window;

  const pickDir = async () => {
    try {
      // @ts-ignore
      const handle = await window.showDirectoryPicker();
      setFileHandle(handle);
      const names: string[] = [];
      for await (const [name,] of handle.entries()) names.push(name);
      setItems(names.sort());
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-3">
      {!supported && <p className="text-sm text-red-300">Your browser does not support File System Access API (try Chrome/Edge).</p>}
      <button onClick={pickDir} className="px-3 py-1 rounded-xl bg-brand/40 hover:bg-brand/60 transition">Open a folder</button>
      {fileHandle && <p className="text-sm text-muted">Opened: <span className="text-white">{(fileHandle as any).name || 'Directory'}</span></p>}
      <ul className="text-sm list-disc pl-5">
        {items.map(i => <li key={i}>{i}</li>)}
      </ul>
    </div>
  );
}
