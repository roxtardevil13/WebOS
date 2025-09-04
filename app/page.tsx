'use client';
import { useEffect } from 'react';
import Desktop from '../components/Desktop';

export default function Home() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(console.error);
    }
  }, []);
  return <Desktop />;
}
