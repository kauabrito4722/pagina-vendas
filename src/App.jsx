import { Children, cloneElement, useEffect, useRef } from 'react';
import { BadgeCheck, BookOpen, Check, ChevronLeft, ChevronRight, Clock3, CreditCard, Footprints, Gift, Heart, Hourglass, KeyRound, Lightbulb, Mail, MonitorSmartphone, RotateCcw, ShieldCheck, Smartphone, Zap, HeartCrack } from 'lucide-react';
import { content } from './content.js';
import { comercial } from './comercial.js';

const painIcons = [BookOpen, Clock3, RotateCcw, HeartCrack, Smartphone, Hourglass];
const mechanismIcons = [BookOpen, Lightbulb, Footprints, Heart];

function CTA({ label = content.cta, href = '#oferta' }) {
  return <a className="btn" href={href}>{label}<span aria-hidden="true">→</span></a>;
}

function SectionTitle({ children, lead }) {
  return <header className="section-title"><h2>{children}</h2>{lead && <p>{lead}</p>}</header>;
}

function Emphasis({ parts }) {
  return parts.map(([text, strong], index) => strong ? <strong key={index}>{text}</strong> : <span key={index}>{text}</span>);
}

function Logo({ size = 34 }) {
  return <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="Jornada com Deus"><rect width="64" height="64" rx="14" fill="#E7BE6E" /><path d="M32 14v36M20 26h24" stroke="#fff" strokeWidth="6" strokeLinecap="round" fill="none" /></svg>;
}

function ProductComposition({ compact = false }) {
  return <div className={`product-composition${compact ? ' product-composition--compact' : ''}`} role="group" aria-label="Capa do ebook e telas reais do app Jornada com Deus">
    <img className="product-sheet product-sheet--left" src="/assets/telas/tela-resumo.webp" alt="Tela real do Resumo Personalizado no app" loading={compact ? 'lazy' : undefined} />
    <img className="product-sheet product-sheet--right" src="/assets/telas/tela-acompanhamento.webp" alt="Tela real da sequência de dias e do calendário no app" loading={compact ? 'lazy' : undefined} />
    <img className="product-cover" src="/assets/telas/capa-ebook.webp" alt="Capa do ebook Como Vencer a Procrastinação com Deus" loading={compact ? 'lazy' : undefined} fetchPriority={compact ? undefined : 'high'} />
    <div className="phone-mockup"><img src="/assets/telas/tela-momento.webp" alt="Tela real do Momento com Deus no celular" loading={compact ? 'lazy' : undefined} /></div>
    <div className="quantity-seal"><strong>19</strong><span>FERRAMENTAS</span></div>
  </div>;
}

function ScrollRail({ children, label, className = '', auto = false, interval = 2800 }) {
  const ref = useRef(null);
  const pausedRef = useRef(false);
  const visibleRef = useRef(false);
  const resumeTimerRef = useRef(null);
  const normalizeTimerRef = useRef(null);
  const items = Children.toArray(children);
  const renderedItems = auto
    ? [...items, ...items.map((child, index) => cloneElement(child, { key: `loop-${index}`, 'aria-hidden': true }))]
    : items;

  const cycleWidth = () => {
    const rail = ref.current;
    if (!rail || rail.children.length <= items.length) return 0;
    return rail.children[items.length].offsetLeft - rail.children[0].offsetLeft;
  };

  const normalize = () => {
    const rail = ref.current;
    const width = cycleWidth();
    if (!rail || !width) return;
    if (rail.scrollLeft >= width) rail.scrollLeft -= width;
  };

  const pauseTemporarily = () => {
    pausedRef.current = true;
    window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => { pausedRef.current = false; }, 4200);
  };

  const scheduleNormalize = () => {
    window.clearTimeout(normalizeTimerRef.current);
    normalizeTimerRef.current = window.setTimeout(normalize, 700);
  };

  const move = direction => {
    const rail = ref.current;
    if (!rail) return;
    pauseTemporarily();
    const width = cycleWidth();
    if (direction < 0 && width && rail.scrollLeft <= 2) rail.scrollLeft = width;
    rail.scrollBy({ left: direction * rail.clientWidth * .82, behavior: 'smooth' });
    scheduleNormalize();
  };

  useEffect(() => {
    if (!auto || !ref.current) return undefined;
    const rail = ref.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const observer = new IntersectionObserver(([entry]) => { visibleRef.current = entry.isIntersecting; }, { threshold: .18 });
    observer.observe(rail);
    const timer = window.setInterval(() => {
      if (reduceMotion.matches || pausedRef.current || !visibleRef.current || document.hidden) return;
      const firstItem = rail.children[0];
      const secondItem = rail.children[1];
      const step = secondItem ? secondItem.offsetLeft - firstItem.offsetLeft : rail.clientWidth * .82;
      rail.scrollBy({ left: step, behavior: 'smooth' });
      scheduleNormalize();
    }, interval);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
      window.clearTimeout(resumeTimerRef.current);
      window.clearTimeout(normalizeTimerRef.current);
    };
  }, [auto, interval, items.length]);

  return <div className={`rail-stage ${className}`}>
    <button type="button" className="rail-arrow rail-arrow--left" onClick={() => move(-1)} aria-label={`Ver anteriores em ${label}`}><ChevronLeft /></button>
    <div
      className={`rail${auto ? ' rail--loop' : ''}`}
      ref={ref}
      tabIndex="0"
      aria-label={label}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
      onFocus={() => { pausedRef.current = true; }}
      onBlur={() => { pausedRef.current = false; }}
      onPointerDown={() => { pausedRef.current = true; }}
      onPointerUp={pauseTemporarily}
      onTouchEnd={pauseTemporarily}
    >{renderedItems}</div>
    <button type="button" className="rail-arrow rail-arrow--right" onClick={() => move(1)} aria-label={`Ver próximos em ${label}`}><ChevronRight /></button>
  </div>;
}

function BonusArt({ bonus }) {
  if (bonus.kind === 'screen') {
    return <div className="bonus-art"><span className="bonus-art-shadow" /><div className="bonus-device"><img src={bonus.image} alt={`Tela real da biblioteca com ${bonus.title.toLowerCase()}`} loading="lazy" /></div></div>;
  }
  return <div className="bonus-art"><span className="bonus-art-shadow" /><div className="bonus-book"><img src={bonus.image} alt={`Capa do ebook ${bonus.title}`} loading="lazy" /></div></div>;
}

export default function App() {
  const hasUsage = content.usage.scenes.length >= 4;
  const hasTestimonials = content.testimonials.length > 0;

  return <>
    <main>
      <section className="hero"><div className="content content--860 hero-flow">
        <p className="hero-pill"><span aria-hidden="true" />{content.hero.badge}</p>
        <h1>{content.hero.titleBefore}<em>{content.hero.titleEmphasis}</em>{content.hero.titleAfter}</h1>
        <div className="hero-media"><ProductComposition /></div>
        <p className="hero-sub"><Emphasis parts={content.hero.subtitle} /></p>
        <ul className="hero-bullets">{content.hero.bullets.map(item => <li key={item}><Check size={20} aria-hidden="true" /><span>{item}</span></li>)}</ul>
        <CTA href="#previas" />
        <p className="amplitude"><MonitorSmartphone size={18} aria-hidden="true" />{content.hero.amplitude}</p>
      </div></section>

      <section className="section pain"><div className="content content--880 section-flow">
        <SectionTitle>{content.pain.title}<br />{content.pain.emphasis}</SectionTitle>
        <div className="ornament" aria-hidden="true"><span /></div>
        <div className="pain-grid">{content.pains.map((item, index) => { const Icon = painIcons[index]; return <div className="pain-chip" key={item}><Icon size={18} aria-hidden="true" /><span>{item}</span></div>; })}</div>
        <p className="bridge"><Emphasis parts={content.pain.bridge} /></p>
      </div></section>

      <section className="section section--tint gallery" id="previas"><div className="content content--1180 section-flow">
        <SectionTitle>{content.gallerySection.title}</SectionTitle>
        <ScrollRail label="Telas reais da área de membros" className="gallery-rail" auto interval={2600}>{content.gallery.map(([src, title]) => <figure className="gallery-card" key={title}><div className="screen-frame"><img src={src} alt={`Tela real: ${title}`} loading="lazy" /></div><figcaption>{title}</figcaption></figure>)}</ScrollRail>
      </div></section>

      <section className="section mechanism"><div className="content content--1120 section-flow">
        <SectionTitle lead={content.mechanismSection.intro}>{content.mechanismSection.title}</SectionTitle>
        <div className="mechanism-visual"><div className="phone-mockup phone-mockup--static"><img src={content.mechanismSection.image} alt={content.mechanismSection.imageAlt} loading="lazy" /></div></div>
        <div className="mechanism-grid">{content.mechanism.map(([title, text], index) => { const Icon = mechanismIcons[index]; return <article key={title}><span className="mechanism-icon"><Icon size={25} aria-hidden="true" /></span><h3>{title}</h3><p>{text}</p></article>; })}</div>
        <p className="mechanism-close">{content.mechanismClose}</p><CTA />
      </div></section>

      {hasUsage && <section className="usage-carousel" aria-label="O app em uso">
        <div className="content content--860 usage-heading">
          <p>{content.usage.eyebrow}</p>
          <h2>{content.usage.title}</h2>
          <span>{content.usage.lead}</span>
        </div>
        <ScrollRail label="Funções do app" className="usage-rail" auto interval={3000}>{content.usage.scenes.map(([src, title]) => <figure className="usage-photo" key={src}><div className="screen-frame screen-frame--dark"><img src={src} alt={`Tela real: ${title}`} loading="lazy" /></div><figcaption>{title}</figcaption></figure>)}</ScrollRail>
      </section>}

      <section className="section mid-pitch"><div className="content content--1040 mid-pitch-grid">
        <div className="mid-pitch-media"><div className="pitch-composition" role="group" aria-label="Capa do ebook ao lado da tela do Momento com Deus">
          <img className="pitch-cover" src="/assets/telas/capa-ebook.webp" alt="Capa do ebook Como Vencer a Procrastinação com Deus" loading="lazy" />
          <div className="phone-mockup pitch-phone"><img src="/assets/telas/tela-capitulo.webp" alt="Tela real de um capítulo do ebook com pergunta" loading="lazy" /></div>
        </div></div>
        <div className="mid-pitch-copy"><h2>{content.midPitch.title}</h2><p>{content.midPitch.text}</p><CTA /></div>
      </div></section>

      <section className="section audiences"><div className="content content--1040 section-flow">
        <SectionTitle lead={content.audienceSection.lead}>{content.audienceSection.title}</SectionTitle>
        <div className="audience-grid">{content.audiences.map(([title, text]) => <article key={title}><span><Check size={17} aria-hidden="true" /></span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
      </div></section>

      <section className="section section--tint receive"><div className="content content--1000 section-flow">
        <SectionTitle>{content.benefitsSection.title}</SectionTitle>
        <div className="receive-media"><div className="collection" role="group" aria-label="Capas dos ebooks da Jornada com Deus">
          <div className="collection-book collection-book--left"><img src="/assets/telas/bonus-liberdade-capa.webp" alt="Capa do bônus Liberdade com Deus" loading="lazy" /></div>
          <div className="collection-book collection-book--right"><img src="/assets/telas/bonus-financas-capa.webp" alt="Capa do bônus Finanças com Deus" loading="lazy" /></div>
          <div className="collection-book collection-book--main"><img src="/assets/telas/capa-ebook.webp" alt="Capa do ebook Como Vencer a Procrastinação com Deus" loading="lazy" /></div>
        </div></div>
        <article className="receive-card"><p className="access-badge">✦ EBOOK + 19 FERRAMENTAS + {content.bonuses.length} BÔNUS</p><h3>{content.benefitsSection.name}</h3><p>{content.benefitsSection.summary}</p><ul>{content.benefits.map(item => <li key={item}><Check size={20} aria-hidden="true" /><span>{item}</span></li>)}</ul></article>
      </div></section>

      <section className="section bonuses"><div className="content content--980 section-flow">
        <header className="bonus-intro"><p>{content.bonusSection.eyebrow}</p><h2>{content.bonusSection.title}</h2><span><Gift size={17} aria-hidden="true" />{content.bonuses.length} BÔNUS INCLUÍDOS</span></header>
        <div className="bonus-grid" style={{ "--bonus-cols": content.bonuses.length }}>{content.bonuses.map(bonus => <article className="bonus-card" key={bonus.title}>
          <div className="bonus-card-top"><p className="bonus-num">{bonus.number}</p><BonusArt bonus={bonus} /></div>
          <div className="bonus-card-body"><h3>{bonus.title}</h3><p>{bonus.text}</p><div className="bonus-gain"><Check size={18} aria-hidden="true" /><span>{bonus.gain}</span></div><div className="bonus-price"><strong>INCLUÍDO</strong></div></div>
        </article>)}</div>
      </div></section>

      <section className="section offer" id="oferta"><div className="content content--720 section-flow">
        <SectionTitle>{content.offer.title}</SectionTitle>
        <div className="value-stack" aria-label="Tudo o que está incluído no acesso">
          <p>{content.offer.stackLabel}</p>
          <ul>{content.stack.map(item => <li key={item}><span>{item}</span><em>INCLUÍDO</em></li>)}</ul>
          <div><strong>{content.offer.stackTotalLabel}</strong><b>{comercial.price}</b></div>
        </div>
        <article className="plan-card" id="checkout">
          <p className="plan-badge">EBOOK + 19 FERRAMENTAS + {content.bonuses.length} BÔNUS + ACESSO VITALÍCIO</p>
          <p className="plan-kicker">{content.offer.kicker}</p><h3>{content.offer.name}</h3>
          <div className="plan-mockup"><ProductComposition compact /></div>
          <ul>{content.included.map(item => <li key={item}><Check size={20} aria-hidden="true" /><span>{item}</span></li>)}</ul>
          <div className="price"><small>Pagamento único</small><strong>{comercial.price}</strong><span>{comercial.priceNote}</span>{comercial.installments && <span>{comercial.installments}</span>}<span className="price-fee">{comercial.feeNote}</span></div>
          <CTA href={comercial.checkoutUrl} />
          <div className="payment-trust"><span><ShieldCheck size={18} aria-hidden="true" />Garantia de {comercial.guaranteeDays} dias</span><span><BadgeCheck size={18} aria-hidden="true" />Acesso vitalício</span><span><Zap size={18} aria-hidden="true" />Acesso imediato</span></div>
        </article>
        <p className="offer-close">{content.offer.noTrick}</p>
      </div></section>

      {hasTestimonials && <section className="section testimonials"><div className="content content--980 section-flow">
        <SectionTitle>Quem já começou a jornada</SectionTitle>
        <div className="testimonial-grid">{content.testimonials.map(({ name, text }) => <figure key={name}><blockquote>{text}</blockquote><figcaption>{name}</figcaption></figure>)}</div>
      </div></section>}

      <section className="section purchase-safety"><div className="content content--1000 safety-layout">
        <article className="guarantee-card"><ShieldCheck size={54} aria-hidden="true" /><h2>{content.guaranteeTitle}</h2><p>{comercial.guarantee}</p></article>
        <div className="safety-cards">{content.safety.map(([title, text], index) => <article key={title}>{index === 0 ? <CreditCard size={30} aria-hidden="true" /> : <KeyRound size={30} aria-hidden="true" />}<div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
      </div></section>

      <section className="section section--tint access-steps"><div className="content content--980 section-flow">
        <SectionTitle>{content.stepsTitle}</SectionTitle>
        <div className="steps-grid">{content.steps.map(([title, text], index) => { const Icon = [CreditCard, Mail, MonitorSmartphone][index]; return <article key={title}><span>{index + 1}</span><Icon aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>; })}</div>
        <CTA />
      </div></section>

      <section className="section faq"><div className="content content--780 section-flow"><SectionTitle>{content.faqTitle}</SectionTitle><div className="faq-list">{content.faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div></section>

      <section className="closing"><div className="content content--780 closing-inner"><p>{content.closing.eyebrow}</p><h2>{content.closing.titleBefore}<em>{content.closing.titleEmphasis}</em>{content.closing.titleAfter}</h2><span className="closing-lead">{content.closing.lead}</span><CTA /><small>{content.closing.micro}</small></div></section>
    </main>
    <footer className="footer"><div className="footer-inner">
      <div className="footer-brand"><Logo /><strong>Jornada com Deus</strong></div>
      <p>Responsável: {comercial.responsible}{comercial.cnpj.startsWith('[') ? '' : ` · CNPJ ${comercial.cnpj}`}</p>
      <p>Suporte: <a href={`mailto:${comercial.supportEmail}`}>{comercial.supportEmail}</a> · WhatsApp <a href={comercial.supportWhatsappLink}>{comercial.supportWhatsapp}</a></p>
      <p className="footer-legal">{content.footerLegal}</p>
      <p className="footer-legal">Compra processada pelo checkout da {comercial.platform}, sob os Termos e Políticas da {comercial.platform}.</p>
      <nav><a href={comercial.termsUrl}>Termos de uso</a><span aria-hidden="true">•</span><a href={comercial.privacyUrl}>Política de privacidade</a></nav>
    </div></footer>
  </>;
}
