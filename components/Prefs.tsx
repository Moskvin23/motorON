'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { DICT, type Lang } from '@/lib/i18n';

type Theme = 'light' | 'dark';
type Ctx = { lang: Lang; setLang: (l: Lang) => void; theme: Theme; setTheme: (t: Theme) => void; t: (typeof DICT)['uk'] };

const PrefsCtx = createContext<Ctx | null>(null);
export const usePrefs = () => useContext(PrefsCtx)!;

const read = (k: string) => { try { return localStorage.getItem(k); } catch { return null; } };
const write = (k: string, v: string) => { try { localStorage.setItem(k, v); } catch { /* private mode */ } };

export function PrefsProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('uk');
  const [theme, setThemeState] = useState<Theme>('dark');

  useEffect(() => {
    const l = read('motoron.lang');
    if (l === 'uk' || l === 'en') setLangState(l);
    else if (!navigator.language.toLowerCase().startsWith('uk') && !navigator.language.toLowerCase().startsWith('ru')) setLangState('en');
    setThemeState(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
  }, []);

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  const setLang = (l: Lang) => { setLangState(l); write('motoron.lang', l); };
  const setTheme = (t: Theme) => { setThemeState(t); document.documentElement.dataset.theme = t; write('motoron.theme', t); };

  return <PrefsCtx.Provider value={{ lang, setLang, theme, setTheme, t: DICT[lang] }}>{children}</PrefsCtx.Provider>;
}

// Runs before paint so the saved / system theme is applied without a flash.
export const themeScript = `(function(){try{var t=localStorage.getItem('motoron.theme');if(!t){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}})()`;
