import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { TemporaryHeroSlide } from './temporaryContent';

type Props = { slides: TemporaryHeroSlide[]; interval?: number };

export function HeroCarousel({ slides, interval = 7000 }: Props) {
  const [active, setActive] = useState(0);
  const paused = useRef(false);
  const count = slides.length;
  const move = (direction: number) => setActive(current => (current + direction + count) % count);

  useEffect(() => {
    if (count < 2) return;
    const timer = window.setInterval(() => { if (!paused.current) move(1); }, interval);
    return () => window.clearInterval(timer);
  }, [count, interval]);

  if (!count) return null;
  return <section className="hero-carousel" aria-roledescription="carousel" aria-label="MACCIA highlights" onMouseEnter={()=>{paused.current=true}} onMouseLeave={()=>{paused.current=false}} onFocusCapture={()=>{paused.current=true}} onBlurCapture={event=>{if(!event.currentTarget.contains(event.relatedTarget))paused.current=false}}>
    <div className="hero-carousel__track" style={{transform:`translateX(-${active*100}%)`}}>
      {slides.map((slide,index)=><article className="hero-slide" key={slide.id} aria-hidden={index!==active}>
        <img src={slide.image} alt={slide.imageAlt} loading={index===0?'eager':'lazy'} style={{objectPosition:slide.objectPosition}}/>
        <span className="hero-slide__overlay" aria-hidden="true"/>
        <div className="container hero-slide__content"><span className="kicker">Maharashtra’s apex chamber</span><h1>{slide.title}</h1><p>{slide.subtitle}</p><div className="hero-actions"><Link className="button button-gold" to={slide.ctaLink}>{slide.ctaText}</Link><Link className="button button-light" to="/services/certificate-of-origin">Explore Services</Link></div></div>
      </article>)}
    </div>
    {count>1&&<><button className="hero-carousel__arrow previous" onClick={()=>move(-1)} aria-label="Previous hero slide"><ChevronLeft/></button><button className="hero-carousel__arrow next" onClick={()=>move(1)} aria-label="Next hero slide"><ChevronRight/></button><div className="hero-carousel__dots">{slides.map((slide,index)=><button key={slide.id} onClick={()=>setActive(index)} aria-label={`Go to hero slide ${index+1}`} aria-current={index===active?'true':undefined}/>)}</div></>}
  </section>;
}
