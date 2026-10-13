import { Children, cloneElement, useEffect, useRef, useState } from 'react';
import { AlertTriangle, ArrowLeft, ArrowRight, BadgeCheck, BookOpen, Brain, Check, ChevronLeft, ChevronRight, Clock3, CreditCard, FileCheck2, FileQuestion, Gift, Layers3, ListChecks, Mail, MonitorSmartphone, SearchCheck, ShieldCheck, Zap, CalendarCheck, Timer, Smartphone, Sprout } from './icons.js';
import { content } from './content.js';
import { comercial } from './comercial.js';

const painIcons = [CalendarCheck, Smartphone, ListChecks, Brain, Clock3, Layers3];
const mechanismIcons = [SearchCheck, Timer, ListChecks, Sprout];

function CTA({ label = 'QUERO O PLANO DE 21 DIAS', href = '#oferta' }) {
  return <a className="btn" href={href}>{label}<span aria-hidden="true">→</span></a>;
}

function SectionTitle({ children, lead }) {
  return <header className="section-title"><h2>{children}</h2>{lead && <p>{lead}</p>}</header>;
}

function ProductComposition({ compact = false }) {
  return <div className={`product-composition${compact ? ' product-composition--compact' : ''}`} aria-label="Ebook Como Vencer a Procrastinação com Deus, páginas reais e o app no celular">
    <img className="product-sheet product-sheet--left" src="/assets/hero-pagina-esq.webp" alt="Página real: as raízes da estagnação" loading={compact ? 'lazy' : undefined} />
    <img className="product-sheet product-sheet--middle" src="/assets/hero-pagina-meio.webp" alt="Página real: o poder dos pequenos começos" loading={compact ? 'lazy' : undefined} />
    <img className="product-sheet product-sheet--right" src="/assets/hero-pagina-dir.webp" alt="Página real: o Plano de 21 Dias" loading={compact ? 'lazy' : undefined} />
    <img className="product-cover" src="/assets/hero-capa.webp" alt="Capa do ebook Como Vencer a Procrastinação com Deus" loading={compact ? 'lazy' : undefined} fetchPriority={compact ? undefined : 'high'} />
    <div className="phone-mockup"><img src="/assets/hero-celular.webp" alt="Momento com Deus exibido no app, no celular" loading={compact ? 'lazy' : undefined} /></div>
    <div className="quantity-seal"><strong>21</strong><span>DIAS COM<br/>DEUS</span></div>
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

function AvatarProof() {
  return <div className="avatar-proof"><div className="avatar-stack">{[1,2,3].map(number => <img key={number} src={`/assets/avatar-${number}.webp`} alt="" />)}</div><p>Ebook, plano e app: <strong>{comercial.price} em pagamento único.</strong></p></div>;
}

export default function App() {
  return <>
    <main>
      <section className="hero"><div className="content content--860 hero-flow">
        <p className="hero-pill"><span aria-hidden="true" />{content.hero.badge}</p>
        <h1>{content.hero.titleBefore}<em>{content.hero.titleEmphasis}</em>{content.hero.titleAfter}</h1>
        <div className="hero-media"><ProductComposition /></div>
        <p className="hero-sub">{content.hero.subtitle.map(([text, emphasis], index) => emphasis ? <strong key={index}>{text}</strong> : <span key={index}>{text}</span>)}</p>
        <ul className="hero-bullets">{content.hero.bullets.map(item => <li key={item}><Check size={20}/><span>{item}</span></li>)}</ul>
        <CTA label="QUERO VER O PLANO DE 21 DIAS" href="#previas" />
        <AvatarProof />
      </div></section>

      <section className="section pain"><div className="content content--880 section-flow">
        <SectionTitle>{content.pain.title}<br/>{content.pain.emphasis}</SectionTitle>
        <div className="ornament" aria-hidden="true"><span /></div>
        <div className="pain-grid">{content.pains.map((item,index)=>{const Icon=painIcons[index];return <div className="pain-chip" key={item}><Icon size={18}/><span>{item}</span></div>})}</div>
        <p className="bridge">{content.pain.bridge.map(([text, emphasis], index) => emphasis ? <strong key={index}>{text}</strong> : <span key={index}>{text}</span>)}</p>
      </div></section>

      <section className="section section--tint gallery" id="previas"><div className="content content--1180 section-flow">
        <SectionTitle>Veja os materiais<br/>que você vai receber</SectionTitle>
        <ScrollRail label="Páginas reais do ebook" className="gallery-rail" auto interval={2400}>{content.gallery.map(([src,title])=><figure className="gallery-card" key={title}><img src={src} alt={`Página real: ${title}`} loading="lazy"/></figure>)}</ScrollRail>
      </div></section>

      <section className="section mechanism"><div className="content content--1120 section-flow">
        <SectionTitle lead={content.mechanismSection.lead}>{content.mechanismSection.title}</SectionTitle>
        <div className="mechanism-grid">{content.mechanism.map(([title,text],index)=>{const Icon=mechanismIcons[index];return <article key={title}><span className="mechanism-icon"><Icon size={25}/></span><h3>{title}</h3><p>{text}</p></article>})}</div>
        <p className="mechanism-close">{content.mechanismClose}</p><CTA/>
      </div></section>

      <section className="usage-carousel" aria-label="O app por dentro">
        <div className="content content--860 usage-heading">
          <p>{content.usage.eyebrow}</p>
          <h2>{content.usage.title}</h2>
          <span>{content.usage.lead}</span>
        </div>
        <ScrollRail label="Telas reais do app" className="usage-rail" auto interval={3000}>{content.usage.scenes.map(([src,alt,caption])=><figure className="usage-photo" key={src}><img src={src} alt={alt} loading="lazy"/><figcaption>{caption}</figcaption></figure>)}</ScrollRail>
      </section>

      <section className="section mid-pitch"><div className="content content--1040 mid-pitch-grid">
        <div className="mid-pitch-media mid-pitch-media--generated"><img src="/assets/mockup-pitch.png" alt="Capas dos três ebooks e o app da Jornada com Deus no celular" loading="lazy" /></div>
        <div className="mid-pitch-copy"><h2>{content.midPitch.title}</h2><p>{content.midPitch.text}</p><CTA /></div>
      </div></section>

      <section className="section audiences"><div className="content content--1040 section-flow">
        <SectionTitle>{content.audienceSection.title}</SectionTitle>
        <div className="audience-grid">{content.audiences.map(([title,text])=><article key={title}><span><Check size={17}/></span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
      </div></section>

      <section className="section section--tint receive"><div className="content content--1000 section-flow">
        <SectionTitle>{content.benefitsSection.title}</SectionTitle>
        <div className="receive-media receive-media--generated"><img src="/assets/mockup-colecao.png" alt="Os três ebooks e as telas do app no celular" loading="lazy" /></div>
        <article className="receive-card"><p className="access-badge">✦ {content.offer.badge}</p><h3>{content.offer.name}</h3><p>{content.benefitsSection.summary}</p><ul>{content.benefits.map(item=><li key={item}><Check size={20}/><span>{item}</span></li>)}</ul></article>
      </div></section>

      <section className="section bonuses"><div className="content content--980 section-flow">
        <header className="bonus-intro"><p>E NÃO PARA POR AÍ...</p><h2>VOCÊ TAMBÉM VAI RECEBER</h2><span><Gift size={17}/>{content.bonuses.length} BÔNUS INCLUÍDOS</span></header>
        <div className="bonus-grid">{content.bonuses.map((bonus)=><article className="bonus-card" key={bonus.title}>
          <div className="bonus-card-top"><p className="bonus-num">{bonus.number}</p><div className="bonus-art"><span className="bonus-art-shadow"/>{bonus.pages?.length ? bonus.pages.map((page,index)=><img className={`bonus-page bonus-page--${index+1}`} src={page} alt="" aria-hidden="true" loading="lazy" key={page}/>) : <><span className="bonus-page bonus-page--1 bonus-page--blank"/><span className="bonus-page bonus-page--2 bonus-page--blank"/></>}<div className="bonus-book"><img src={bonus.image} alt={`Capa de ${bonus.title}`} loading="lazy"/></div></div></div>
          <div className="bonus-card-body"><h3>{bonus.title}</h3><p>{bonus.text}</p><div className="bonus-gain"><Check size={18}/><span>{bonus.gain}</span></div><div className="bonus-price"><strong>INCLUÍDO NO ACESSO</strong></div></div>
        </article>)}</div>
      </div></section>

      <section className="section offer" id="oferta"><div className="content content--720 section-flow">
        <SectionTitle>Tudo o que será liberado para você hoje</SectionTitle>
        <article className="plan-card" id="checkout">
          <p className="plan-badge">{content.offer.badge}</p>
          <p className="plan-kicker">OFERTA COMPLETA</p><h3>{content.offer.name}</h3>
          <div className="plan-mockup"><ProductComposition compact /></div>
          <ul>{content.included.map(item=><li key={item}><Check size={20}/><span>{item}</span></li>)}</ul>
          <div className="price"><small>Pagamento único de</small><strong>{comercial.price}</strong><span>{comercial.priceNote}</span></div>
          <CTA href={comercial.checkoutUrl}/><div className="payment-trust"><span><ShieldCheck size={18}/>Garantia de 7 dias</span><span><Zap size={18}/>Acesso imediato</span><span><CreditCard size={18}/>Pix, cartão ou PicPay</span></div><p className="fee-note">{comercial.fee}</p>
        </article>
        <p className="offer-close">{content.offer.noTrick}</p>
      </div></section>

      <section className="section purchase-safety"><div className="content content--1000 safety-layout">
        <article className="guarantee-card"><ShieldCheck size={54}/><h2>Garantia de 7 dias</h2><p>{comercial.guarantee}</p></article>
        <div className="safety-cards"><article><CreditCard size={30}/><div><h3>Pagamento pela Cakto</h3><p>O pagamento é processado pela plataforma Cakto. Seus dados de pagamento não ficam conosco.</p></div></article><article><BadgeCheck size={30}/><div><h3>Seu progresso fica na sua conta</h3><p>Entre com o e-mail da compra e continue de onde parou, no celular ou no computador.</p></div></article></div>
      </div></section>

      <section className="section section--tint access-steps"><div className="content content--980 section-flow">
        <SectionTitle>Como funciona depois do pagamento</SectionTitle>
        <div className="steps-grid"><article><span>1</span><CreditCard/><h3>Garanta seu acesso</h3><p>Pagamento único, por Pix, cartão ou PicPay.</p></article><article><span>2</span><Mail/><h3>Receba no e-mail</h3><p>{comercial.access}</p></article><article><span>3</span><MonitorSmartphone/><h3>Crie sua senha e comece</h3><p>Use o e-mail da compra, escolha sua senha e abra o dia 1.</p></article></div>
        <CTA />
      </div></section>

      <section className="section faq"><div className="content content--780 section-flow"><SectionTitle>Perguntas Frequentes</SectionTitle><div className="faq-list">{content.faqs.filter(([,answer])=>!answer.startsWith('[') && !answer.includes('[E-MAIL')).map(([question,answer])=><details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div></section>

      <section className="closing"><div className="content content--780 closing-inner"><p>{content.closing.eyebrow}</p><h2>{content.closing.titleBefore}<em>{content.closing.titleEmphasis}</em></h2><CTA/><small>Material digital. Pagamento único de {comercial.price}.</small></div></section>
    </main>
    <footer className="footer"><div className="footer-inner">{!comercial.supportEmail.startsWith('[') && <p>Suporte: {comercial.supportEmail}</p>}<p className="footer-legal">Guia prático e devocional. Não substitui acompanhamento pastoral, médico ou psicológico. Resultados dependem da dedicação de cada pessoa.</p>{!comercial.company.startsWith('[') && <p>{comercial.company}</p>}</div></footer>
  </>;
}
