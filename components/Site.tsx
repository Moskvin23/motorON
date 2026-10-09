'use client';
import { useEffect, useState } from 'react';
import Icon, { Logo } from './Icon';
import { usePrefs } from './Prefs';
import ContactButton from './ContactButton';
import Tacho from './Tacho';
import Gallery from './Gallery';
import { GEO, GOOGLE_REVIEWS, INSTAGRAM, MAPS, PHONE_HUMAN, RATING, REVIEW_COUNT, reviewsLabel } from '@/lib/i18n';

function Header() {
  const { t, lang, setLang, theme, setTheme } = usePrefs();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 10);
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  const links: [string, string][] = [['#services', t.nav.services], ['#cases', t.nav.cases], ['#gallery', t.nav.gallery], ['#process', t.nav.process], ['#reviews', t.nav.reviews], ['#contacts', t.nav.contacts]];
  return (
    <header className={`hdr${scrolled ? ' scrolled' : ''}`}>
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
          {links.map(([h, l]) => <a key={h} href={h} onClick={() => setOpen(false)}>{l}</a>)}
          <a className="btn" href="#book" onClick={() => setOpen(false)}>{t.nav.book}</a>
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
          {t.reviews.items.map((r) => (
            <figure key={r.n} className="card review">
              <span className="stars">★★★★★</span>
              <blockquote>“{r.t}”</blockquote>
              <figcaption><i>{r.n[0]}</i>{r.n} · Google</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Booking() {
  const { t } = usePrefs();
  const b = t.book;
  const [f, setF] = useState({ car: '', year: '', service: '', problem: '', date: '', name: '', phone: '' });
  const [err, setErr] = useState<Record<string, string>>({});
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle');
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!f.car.trim()) er.car = b.errCar;
    if (f.name.trim().length < 2) er.name = b.errName;
    if (f.phone.replace(/\D/g, '').length < 10) er.phone = b.errPhone;
    setErr(er);
    if (Object.keys(er).length) return;
    setState('sending');
    // Production: POST to a serverless function that forwards the request to the mechanics' Telegram chat.
    setTimeout(() => setState('done'), 900);
  };
  const today = new Date().toISOString().slice(0, 10);

  return (
    <section className="sec book-sec" id="book">
      <div className="wrap book-in">
        <div className="book-copy">
          <h2>{b.title}</h2>
          <p>{b.lead}</p>
          <span className="big-phone-wrap"><span className="or">{b.or}</span><ContactButton className="big-phone"><Icon name="phone" size={22} /> {PHONE_HUMAN}</ContactButton></span>
          <p className="demo-note">{b.demo}</p>
        </div>
        <div className="card form-card">
          {state === 'done' ? (
            <div className="ok">
              <span className="ok-ico"><Icon name="check" size={30} /></span>
              <h3>{b.okTitle}</h3>
              <p>{b.okText}</p>
              <button className="btn ghost" onClick={() => { setF({ car: '', year: '', service: '', problem: '', date: '', name: '', phone: '' }); setState('idle'); }}>{b.again}</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="row2 car">
                <label className="fld"><span>{b.car} *</span><input value={f.car} onChange={set('car')} placeholder={b.carPh} aria-invalid={!!err.car} />{err.car && <small>{err.car}</small>}</label>
                <label className="fld"><span>{b.year}</span><input value={f.year} onChange={set('year')} inputMode="numeric" maxLength={4} placeholder="2019" /></label>
              </div>
              <label className="fld"><span>{b.service}</span>
                <select value={f.service} onChange={set('service')}>
                  <option value="">{b.choose}</option>
                  {t.services.items.map((s) => <option key={s.t}>{s.t}</option>)}
                  <option>{b.other}</option>
                </select>
              </label>
              <label className="fld"><span>{b.problem}</span><textarea rows={3} value={f.problem} onChange={set('problem')} placeholder={b.problemPh} /></label>
              <div className="row2">
                <label className="fld"><span>{b.name} *</span><input value={f.name} onChange={set('name')} autoComplete="name" aria-invalid={!!err.name} />{err.name && <small>{err.name}</small>}</label>
                <label className="fld"><span>{b.phone} *</span><input value={f.phone} onChange={set('phone')} type="tel" autoComplete="tel" placeholder={b.phonePh} aria-invalid={!!err.phone} />{err.phone && <small>{err.phone}</small>}</label>
              </div>
              <label className="fld"><span>{b.date}</span><input type="date" min={today} value={f.date} onChange={set('date')} /></label>
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
  const { t } = usePrefs();
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
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${GEO.lng - 0.012},${GEO.lat - 0.006},${GEO.lng + 0.012},${GEO.lat + 0.006}&layer=mapnik&marker=${GEO.lat},${GEO.lng}`} />
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
        <Hero /><Services /><Cases /><Gallery /><Process /><Reviews /><Booking /><Faq /><Contacts />
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
