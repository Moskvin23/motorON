'use client';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Icon, { BrandIcon } from './Icon';
import { usePrefs } from './Prefs';
import { PHONE, PHONE_HUMAN } from '@/lib/i18n';

const LINKS = {
  call: `tel:${PHONE}`,
  viber: `viber://chat?number=${encodeURIComponent(PHONE)}`,
  telegram: `https://t.me/${PHONE}`,
  whatsapp: `https://wa.me/${PHONE.replace('+', '')}`,
};

/** Phone button that lets the visitor choose: call, Viber, Telegram or WhatsApp.
 *  Desktop: dropdown under the button. Phone: bottom sheet rendered into <body>. */
export default function ContactButton({ className = 'btn ghost', children }: { className?: string; children?: React.ReactNode }) {
  const { t } = usePrefs();
  const [open, setOpen] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [copied, setCopied] = useState(false);
  const box = useRef<HTMLSpanElement>(null);
  const menu = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const m = window.matchMedia('(max-width: 640px)');
    const on = () => setSheet(m.matches);
    on();
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const n = e.target as Node;
      if (!box.current?.contains(n) && !menu.current?.contains(n)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  }, [open]);

  const close = () => { setOpen(false); setCopied(false); };

  // Clipboard API needs permission/HTTPS; fall back to a hidden textarea + execCommand.
  const copy = async () => {
    let ok = false;
    try { await navigator.clipboard.writeText(PHONE_HUMAN); ok = true; } catch {
      try {
        const ta = document.createElement('textarea');
        ta.value = PHONE_HUMAN; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select(); ok = document.execCommand('copy'); ta.remove();
      } catch { ok = false; }
    }
    setCopied(ok);
    if (ok) setTimeout(close, 1100);
  };
  const content = (
    <>
      <span className="cmenu-scrim" onClick={close} />
      <span className="cmenu" role="menu" ref={menu}>
        <span className="cmenu-head">{t.contact.title}<b>{PHONE_HUMAN}</b></span>
        <a role="menuitem" href={LINKS.call} onClick={close}><i className="ci call"><Icon name="phone" size={18} /></i>{t.contact.call}</a>
        <a role="menuitem" href={LINKS.viber} onClick={close}><i className="ci viber"><BrandIcon name="viber" size={20} /></i>Viber</a>
        <a role="menuitem" href={LINKS.telegram} target="_blank" rel="noopener" onClick={close}><i className="ci tg"><BrandIcon name="telegram" size={22} /></i>Telegram</a>
        <a role="menuitem" href={LINKS.whatsapp} target="_blank" rel="noopener" onClick={close}><i className="ci wa"><BrandIcon name="whatsapp" size={20} /></i>WhatsApp</a>
        <button type="button" className={`cmenu-copy${copied ? ' done' : ''}`} onClick={copy}>{copied ? `✓ ${t.contact.copied}` : t.contact.copy}</button>
      </span>
    </>
  );

  return (
    <span className="cbtn" ref={box}>
      <button type="button" className={className} aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen(!open)}>
        {children ?? <><Icon name="phone" size={18} /> {PHONE_HUMAN}</>}
      </button>
      {open && (sheet ? createPortal(content, document.body) : content)}
    </span>
  );
}
