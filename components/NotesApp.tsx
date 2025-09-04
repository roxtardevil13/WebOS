'use client';
import React, { useEffect, useState } from 'react';

export default function NotesApp() {
  const [text, setText] = useState('');
  useEffect(() => {
    const saved = localStorage.getItem('webdesk.notes') || '';
    setText(saved);
  }, []);
  useEffect(() => {
    const t = setTimeout(() => localStorage.setItem('webdesk.notes', text), 300);
    return () => clearTimeout(t);
  }, [text]);

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted">Notes are saved locally in your browser.</p>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        className="w-full h-64 bg-black/20 rounded-xl p-3 outline-none"
        placeholder="Type your thoughts..."
      />
    </div>
  );
}
