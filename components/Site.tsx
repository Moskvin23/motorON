'use client';
import { useEffect, useRef, useState } from 'react';
import Icon, { Logo } from './Icon';
import { usePrefs } from './Prefs';
import ContactButton from './ContactButton';
import Tacho from './Tacho';
import Gallery from './Gallery';
import DayPicker from './DayPicker';
import { DICT, GEO, SHEET_URL, GOOGLE_REVIEWS, INSTAGRAM, MAPS, IG_POSTS, MIN_REVIEW_STARS, PHONE, PHONE_HUMAN, RATING, REVIEW_COUNT, reviewsLabel } from '@/lib/i18n';

function Header() {
  const { t, lang, setLang, theme, setTheme } = usePrefs();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const hdr = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    const onDown = (e: PointerEvent) => { if (!hdr.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onDown); };
  }, [open]);
  // Close the menu first, then scroll — otherwise the taller open header shifts the target.
  const go = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const id = e.currentTarget.getAttribute('href');
    if (!id?.startsWith('#')) return;
    e.preventDefault();
    setOpen(false);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
      history.replaceState(null, '', id);
    }));
  };
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 10);
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  const links: [string, string][] = [['#services', t.nav.services], ['#cases', t.nav.cases], ['#gallery', t.nav.gallery], ['#process', t.nav.process], ['#reviews', t.nav.reviews], ['#contacts', t.nav.contacts]];
  return (
    <header ref={hdr} className={`hdr${scrolled ? ' scrolled' : ''}`}>
      <div className="wrap hdr-in">
        <a href="#top" aria-label="MotorON"><Logo /></a>
        <nav className="nav">{links.map(([h, l]) => <a key={h} href={h}>{l}</a>)}</nav>
        <div className="hdr-tools">
          <div className="lang" role="group" aria-label="Language">
            <button className={lang === 'uk' ? 'on' : ''} onClick={() => setLang('uk')} aria-pressed={lang === 'uk'}>UA</button>
            <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')} aria-pressed={lang === 'en'}>EN</button>
          </div>
          <button className="icon-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={theme === 'dark' ? t.theme.light : t.theme.dark} title={theme === 'dark' ? t.theme.light : t.theme.dark}>
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={19} />
          </button>
          <a className="btn sm hide-sm" href="#book">{t.nav.book}</a>
          <button className="icon-btn burger" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}><Icon name={open ? 'close' : 'menu'} size={20} /></button>
        </div>
      </div>
      {open && (
        <div className="mnav">
          {links.map(([h, l]) => <a key={h} href={h} onClick={go}>{l}</a>)}
          <a className="btn" href="#book" onClick={go}>{t.nav.book}</a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const { t, lang } = usePrefs();
  return (
    <section className="hero" id="top">
      <div className="wrap hero-in">
        <div className="hero-copy">
          <span className="badge"><i />{t.hero.badge}</span>
          <h1>{t.hero.title1}<br /><em>{t.hero.title2}</em></h1>
          <p className="lead">{t.hero.lead}</p>
          <div className="cta">
            <a className="btn lg" href="#book">{t.hero.book} <Icon name="arrow" size={18} /></a>
            <ContactButton className="btn lg ghost" />
          </div>
          <ul className="stats">{t.hero.stats.map((s) => <li key={s.v}><b>{s.v}</b>{s.l === 'GOOGLE_COUNT' ? <a href={GOOGLE_REVIEWS} target="_blank" rel="noopener" className="stat-link">{reviewsLabel(REVIEW_COUNT, lang)} {t.reviews.onGoogle}</a> : <span>{s.l}</span>}</li>)}</ul>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="gauge"><Tacho /></div>
          <div className="chip c1"><Icon name="engine" size={18} /> {t.services.items[0].t}</div>
          <div className="chip c2"><Icon name="shock" size={18} /> {t.services.items[2].t}</div>
          <div className="chip c3"><Icon name="bolt" size={18} /> {t.services.items[4].t}</div>
          <div className="chip c4"><Icon name="star" size={16} fill /> {RATING.toFixed(1)} · {reviewsLabel(REVIEW_COUNT, lang)}</div>
        </div>
      </div>
    </section>
  );
}

function Promo() {
  const { t } = usePrefs();
  const p = t.promo;
  return (
    <section className="sec promo-sec" id="promo">
      <div className="wrap">
        <div className="promo">
          <div className="promo-copy">
            <span className="badge"><i />{p.tag}</span>
            <h2>{p.title}</h2>
            <p>{p.lead}</p>
            <ul>{p.items.map((it) => <li key={it}>{it}</li>)}</ul>
          </div>
          <div className="promo-price">
            <b>{p.price}</b><span>{p.time}</span>
            <a className="btn lg" href="#book">{p.book} <Icon name="arrow" size={18} /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Insta() {
  const { t } = usePrefs();
  return (
    <section className="sec" id="insta">
      <div className="wrap">
        <div className="sec-head row">
          <div><h2>{t.insta.title}</h2><p>{t.insta.lead}</p></div>
          <a className="btn ghost" href={INSTAGRAM} target="_blank" rel="noopener">{t.insta.more} →</a>
        </div>
        <div className="ig-grid">
          {IG_POSTS.map((id) => (
            <div key={id} className="ig-cell">
              <iframe title={`Instagram ${id}`} loading="lazy" scrolling="no" allowTransparency
                src={`https://www.instagram.com/p/${id}/embed/?hl=uk`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const { t } = usePrefs();
  return (
    <section className="sec" id="services">
      <div className="wrap">
        <div className="sec-head"><h2>{t.services.title}</h2><p>{t.services.lead}</p></div>
        <div className="grid3">
          {t.services.items.map((s) => (
            <article key={s.t} className="card svc">
              <span className="svc-ico"><Icon name={s.icon} size={24} /></span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </article>
          ))}
        </div>
        <p className="note">{t.services.note}</p>
      </div>
    </section>
  );
}

function Cases() {
  const { t } = usePrefs();
  return (
    <section className="sec alt" id="cases">
      <div className="wrap">
        <div className="sec-head"><h2>{t.cases.title}</h2><p>{t.cases.lead}</p></div>
        <div className="grid3">
          {t.cases.items.map((c) => (
            <article key={c.t} className="card case">
              <span className="tag">{c.tag}</span>
              <h3>{c.t}</h3>
              <p>{c.p}</p>
              <p className="result"><Icon name="check" size={18} /> {c.r}</p>
            </article>
          ))}
        </div>
        <a className="more" href={INSTAGRAM} target="_blank" rel="noopener">@motoron_sto — Instagram <Icon name="arrow" size={16} /></a>
      </div>
    </section>
  );
}

function Process() {
  const { t } = usePrefs();
  return (
    <section className="sec" id="process">
      <div className="wrap">
        <div className="sec-head"><h2>{t.process.title}</h2></div>
        <ol className="steps">
          {t.process.steps.map((s, i) => (
            <li key={s.t}><span className="num">{String(i + 1).padStart(2, '0')}</span><h3>{s.t}</h3><p>{s.d}</p></li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Reviews() {
  const { t, lang } = usePrefs();
  return (
    <section className="sec alt" id="reviews">
      <div className="wrap">
        <div className="sec-head row">
          <div><h2>{t.reviews.title}</h2><p>{t.reviews.lead}</p></div>
          <div className="rating">
            <b>{RATING.toFixed(1)}</b>
            <span className="rating-meta"><span className="stars">★★★★★</span><span>{reviewsLabel(REVIEW_COUNT, lang)} {t.reviews.onGoogle}</span></span>
            <a href={GOOGLE_REVIEWS} target="_blank" rel="noopener">{t.reviews.all} →</a>
          </div>
        </div>
        <div className="grid4">
          {t.reviews.items.filter((r) => r.s >= MIN_REVIEW_STARS).map((r) => (
            <figure key={r.n} className="card review">
              <span className="stars">{'★'.repeat(r.s)}</span>
              <blockquote>“{r.t}”</blockquote>
              {r.photos?.length ? <div className="r-photos">{r.photos.map((src) => <a key={src} href={src} target="_blank" rel="noopener"><img src={src} alt="" loading="lazy" /></a>)}</div> : null}
              <figcaption><i>{r.n[0]}</i>{r.n} · Google</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Booking() {
  const { t, lang } = usePrefs();
  const [hp, setHp] = useState('');
  const b = t.book;
  const [f, setF] = useState({ car: '', year: '', service: '', problem: '', date: '', part: '', name: '', phone: '' });
  const [err, setErr] = useState<Record<string, string>>({});
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle');
  // Year accepts digits only; phone keeps digits and + ( ) - spaces.
  const clean: Partial<Record<keyof typeof f, (v: string) => string>> = { year: (v) => v.replace(/\D/g, ''), phone: (v) => v.replace(/[^\d+()\- ]/g, '') };
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setF({ ...f, [k]: clean[k] ? clean[k]!(e.target.value) : e.target.value });
    if (err[k]) setErr({ ...err, [k]: '' });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!f.car.trim()) er.car = 'errCar';
    if (f.name.trim().length < 2) er.name = 'errName';
    const digits = f.phone.replace(/\D/g, '').length;
    if (digits < 10 || digits > 12) er.phone = 'errPhone';
    setErr(er);
    if (Object.keys(er).length) { document.querySelector<HTMLElement>(`[name="${Object.keys(er)[0]}"]`)?.focus(); return; }
    setState('sending');
    if (!SHEET_URL) { setTimeout(() => setState('done'), 900); return; } // demo mode: nothing is sent
    // Labels are sent in Ukrainian so the sheet reads the same whatever language the visitor used.
    const uk = DICT.uk.book, svc = DICT.uk.services.items;
    const payload = { ...f, service: f.service === 'other' ? uk.other : f.service ? svc[+f.service].t : '', part: f.part ? uk.parts[+f.part] : '', lang, website: hp };
    // text/plain avoids a CORS preflight that Apps Script cannot answer; no-cors gives an opaque reply, so a network error is the only failure we can see.
    fetch(SHEET_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload) })
      .then(() => setState('done'))
      .catch(() => { setState('idle'); setErr({ send: 'errSend' }); });
  };

  return (
    <section className="sec book-sec" id="book">
      <div className="wrap book-in">
        <div className="book-copy">
          <h2>{b.title}</h2>
          <p>{b.lead}</p>
          <span className="big-phone-wrap"><span className="or">{b.or}</span><ContactButton className="big-phone"><Icon name="phone" size={22} /> {PHONE_HUMAN}</ContactButton></span>
          {!SHEET_URL && <p className="demo-note">{b.demo}</p>}
        </div>
        <div className="card form-card">
          {state === 'done' ? (
            <div className="ok">
              <span className="ok-ico"><Icon name="check" size={30} /></span>
              <h3>{b.okTitle}</h3>
              <p>{b.okText}</p>
              <button className="btn ghost" onClick={() => { setF({ car: '', year: '', service: '', problem: '', date: '', part: '', name: '', phone: '' }); setErr({}); setState('idle'); }}>{b.again}</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="row2 car">
                <label className="fld"><span>{b.car} *</span><input name="car" value={f.car} onChange={set('car')} placeholder={b.carPh} aria-invalid={!!err.car} />{err.car && <small>{b[err.car as 'errCar']}</small>}</label>
                <label className="fld"><span>{b.year}</span><input value={f.year} onChange={set('year')} inputMode="numeric" maxLength={4} placeholder="2019" /></label>
              </div>
              <label className="fld"><span>{b.service}</span>
                <select value={f.service} onChange={set('service')}>
                  <option value="">{b.choose}</option>
                  {t.services.items.map((s, i) => <option key={i} value={String(i)}>{s.t}</option>)}
                  <option value="other">{b.other}</option>
                </select>
              </label>
              <label className="fld"><span>{b.problem}</span><textarea rows={3} value={f.problem} onChange={set('problem')} placeholder={b.problemPh} /></label>
              <div className="row2">
                <label className="fld"><span>{b.name} *</span><input name="name" value={f.name} onChange={set('name')} autoComplete="name" aria-invalid={!!err.name} />{err.name && <small>{b[err.name as 'errCar']}</small>}</label>
                <label className="fld"><span>{b.phone} *</span><input name="phone" value={f.phone} onChange={set('phone')} type="tel" autoComplete="tel" placeholder={b.phonePh} aria-invalid={!!err.phone} />{err.phone && <small>{b[err.phone as 'errCar']}</small>}</label>
              </div>
              <div className="fld"><span>{b.date}</span><DayPicker day={f.date} part={f.part} onDay={(v) => setF({ ...f, date: v })} onPart={(v) => setF({ ...f, part: v })} /></div>
              <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" name="website" value={hp} onChange={(e) => setHp(e.target.value)} />
              {err.send && <p className="send-err" role="alert">{b.errSend} <a href={`tel:${PHONE}`}>{PHONE_HUMAN}</a></p>}
              <button className="btn lg full" disabled={state === 'sending'}>{state === 'sending' ? b.sending : b.submit}</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const { t } = usePrefs();
  return (
    <section className="sec" id="faq">
      <div className="wrap narrow">
        <div className="sec-head"><h2>{t.faq.title}</h2></div>
        {t.faq.items.map((q, i) => (
          <details key={q.q} className="faq" open={i === 0}><summary>{q.q}</summary><p>{q.a}</p></details>
        ))}
      </div>
    </section>
  );
}

function Contacts() {
  const { t, lang } = usePrefs();
  return (
    <section className="sec alt" id="contacts">
      <div className="wrap contacts">
        <div className="c-info">
          <h2>{t.contacts.title}</h2>
          <ContactButton className="c-row as-btn"><Icon name="phone" /> <b>{PHONE_HUMAN}</b></ContactButton>
          <p className="c-row"><Icon name="pin" /> {t.contacts.address}</p>
          <p className="c-row"><Icon name="clock" /> {t.contacts.hours}</p>
          <a href={INSTAGRAM} target="_blank" rel="noopener" className="c-row"><Icon name="insta" /> @motoron_sto</a>
          <a className="btn" href={MAPS} target="_blank" rel="noopener">{t.contacts.route} <Icon name="arrow" size={18} /></a>
        </div>
        <div className="map">
          <iframe title="MotorON — map" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            src={`https://maps.google.com/maps?q=${GEO.lat},${GEO.lng}&z=16&hl=${lang === 'en' ? 'en' : 'uk'}&output=embed`} />
        </div>
      </div>
    </section>
  );
}

export default function Site() {
  const { t } = usePrefs();
  return (
    <>
      <Header />
      <main>
        <Hero /><Promo /><Services /><Cases /><Gallery /><Insta /><Process /><Reviews /><Booking /><Faq /><Contacts />
      </main>
      <footer className="ftr">
        <div className="wrap ftr-in"><Logo /><span>© 2026 {t.footer.rights}</span><span className="muted">{t.footer.demo}</span></div>
      </footer>
      <div className="mbar">
        <ContactButton className="btn ghost"><Icon name="phone" size={18} /> {t.hero.call}</ContactButton>
        <a href="#book" className="btn">{t.nav.book}</a>
      </div>
    </>
  );
}
