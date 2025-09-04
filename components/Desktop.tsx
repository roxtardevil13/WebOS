'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Window from './Window';
import Taskbar from './Taskbar';
import NotesApp from './NotesApp';
import FilesApp from './FilesApp';

type AppId = 'notes' | 'files' | 'about';
const APP_META: Record<AppId, {title: string}> = {
  notes: { title: 'Notes' }, files: { title: 'Files' }, about: { title: 'About' },
};
type Win = { id: string; app: AppId; x: number; y: number; w: number; h: number; z: number; hidden?: boolean };

export default function Desktop() {
  const [wins, setWins] = useState<Win[]>([]);
  const topZ = useMemo(() => (wins.length ? Math.max(...wins.map(w => w.z)) : 1), [wins]);

  useEffect(() => {
    if (wins.length === 0) {
      const id = `notes-${Date.now()}`;
      setWins([{ id, app: 'notes', x: 80, y: 80, w: 460, h: 320, z: 2 }]);
    }
  }, []); 

  const appButtons = (['notes','files','about'] as AppId[]).map(id => ({
    id, title: APP_META[id].title, running: wins.some(w => w.app === id && !w.hidden)
  }));

  const launch = (app: AppId) => {
    const id = `${app}-${Date.now()}`;
    setWins(ws => [...ws, { id, app, x: 80 + ws.length*30, y: 80 + ws.length*24, w: 460, h: 320, z: topZ + 1 }]);
  };

  const close = (id: string) => setWins(ws => ws.filter(w => w.id !== id));
  const focus = (id: string) => setWins(ws => ws.map(w => w.id === id ? { ...w, z: topZ + 1 } : w));
  const toggle = (appId: string) => setWins(ws => ws.map(w => w.app === appId ? { ...w, hidden: !w.hidden } : w));

  const renderApp = (app: AppId) => {
    if (app === 'notes') return <NotesApp/>;
    if (app === 'files') return <FilesApp/>;
    return (
      <div className="space-y-3 text-sm">
        <p><b>WebDesk</b> — a minimal web desktop PWA.</p>
        <ul className="list-disc pl-5"><li>Installable</li><li>Offline</li><li>Draggable windows</li></ul>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,rgba(255,209,102,0.15),transparent_40%),radial-gradient(ellipse_at_bottom_right,rgba(17,138,178,0.18),transparent_40%)]">
      <div className="p-6">
        <h1 className="text-2xl font-semibold drop-shadow">WebDesk</h1>
        <p className="text-sm text-muted">Right now: use the taskbar to launch apps.</p>
      </div>

      {wins.map(w => !w.hidden && (
        <Window key={w.id} id={w.id} title={APP_META[w.app].title}
          onClose={close} onFocus={focus} z={w.z}
          initial={{x:w.x,y:w.y,w:w.w,h:w.h}}>
          {renderApp(w.app)}
        </Window>
      ))}

      <Taskbar apps={appButtons} onToggle={toggle} onLaunch={(id)=>launch(id as AppId)} />

      <div className="fixed top-3 right-3 text-xs bg-black/40 px-2 py-1 rounded">
        wins: {wins.length}
      </div>
    </div>
  );
}
