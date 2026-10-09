import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Image as ImageIcon, Instagram, Pause, Play, Youtube } from 'lucide-react';

export type HomepageMediaItem = {
  _id: string; title: string; caption?: string; type: 'youtube'|'youtube_short'|'instagram_post'|'instagram_reel'|'uploaded_video'|'uploaded_image';
  sourceUrl?: string; thumbnailUrl?: string; platformMediaId?: string;
};

const labels: Record<HomepageMediaItem['type'], string> = { youtube:'YouTube',youtube_short:'YouTube Short',instagram_post:'Instagram Post',instagram_reel:'Instagram Reel',uploaded_video:'Video',uploaded_image:'MACCIA Media' };

function useVisibleCount() {
  const get = () => window.innerWidth < 680 ? 1 : window.innerWidth < 1024 ? 2 : 3;
  const [count,setCount]=useState(get);
  useEffect(()=>{const update=()=>setCount(get());window.addEventListener('resize',update);return()=>window.removeEventListener('resize',update)},[]);
  return count;
}

export function MediaCarousel({items,interval=7000}:{items:HomepageMediaItem[];interval?:number}) {
  const [index,setIndex]=useState(0),[manualPause,setManualPause]=useState(false),[interactionPause,setInteractionPause]=useState(false),[mediaActive,setMediaActive]=useState(false),[activeEmbed,setActiveEmbed]=useState<string>();
  const visibleCount=Math.min(useVisibleCount(),Math.max(1,items.length));
  const reduced=typeof window!=='undefined'&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const visible=useMemo(()=>Array.from({length:visibleCount},(_,offset)=>items[(index+offset)%items.length]).filter(Boolean),[items,index,visibleCount]);
  const paused=manualPause||interactionPause||mediaActive||reduced||items.length<=visibleCount;
  const move=(amount:number)=>setIndex(current=>(current+amount+items.length)%items.length);
  useEffect(()=>{if(paused)return;const timer=window.setInterval(()=>move(1),Math.max(3000,interval));return()=>window.clearInterval(timer)},[paused,interval,items.length]);
  useEffect(()=>{const onVisibility=()=>setInteractionPause(document.hidden);document.addEventListener('visibilitychange',onVisibility);return()=>document.removeEventListener('visibilitychange',onVisibility)},[]);
  if(!items.length)return null;
  return <div className="media-carousel" role="region" aria-roledescription="carousel" aria-label="MACCIA Media Connect" tabIndex={0} onKeyDown={event=>{if(event.key==='ArrowLeft')move(-1);if(event.key==='ArrowRight')move(1)}} onMouseEnter={()=>setInteractionPause(true)} onMouseLeave={()=>setInteractionPause(false)} onFocusCapture={()=>setInteractionPause(true)} onBlurCapture={event=>{if(!event.currentTarget.contains(event.relatedTarget as Node))setInteractionPause(false)}}>
    <div className="media-track" aria-live="polite">{visible.map((item,position)=><article className="media-card" key={`${item._id}-${position}`}>
      <div className="media-stage">
        {(item.type==='youtube'||item.type==='youtube_short')?(activeEmbed===item._id?<iframe src={`https://www.youtube-nocookie.com/embed/${item.platformMediaId}?autoplay=1&rel=0`} title={item.title} allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowFullScreen/>:<button className="media-thumbnail" aria-label={`Play ${item.title}`} onClick={()=>{setActiveEmbed(item._id);setMediaActive(true)}} style={item.thumbnailUrl?{backgroundImage:`url(${item.thumbnailUrl})`}:item.platformMediaId?{backgroundImage:`url(https://i.ytimg.com/vi/${item.platformMediaId}/hqdefault.jpg)`}:undefined}><Youtube/><span>Play video</span></button>):
        (item.type==='instagram_post'||item.type==='instagram_reel')?<a className="instagram-preview" href={item.sourceUrl} target="_blank" rel="noreferrer"><Instagram/><strong>View on Instagram</strong><small>Public post availability is controlled by Instagram.</small></a>:
        item.type==='uploaded_video'?<video controls preload="metadata" poster={item.thumbnailUrl} onPlay={()=>setMediaActive(true)} onPause={()=>setMediaActive(false)} onEnded={()=>setMediaActive(false)}><source src={item.sourceUrl}/><a href={item.sourceUrl}>Open video</a></video>:
        item.sourceUrl?<img src={item.sourceUrl} alt={item.title} loading="lazy"/>:<div className="media-placeholder"><ImageIcon/><span>Media preview unavailable</span></div>}
      </div><div className="media-copy"><span className="tag">{labels[item.type]}</span><h3>{item.title}</h3>{item.caption&&<p>{item.caption}</p>}{item.sourceUrl&&<a href={item.sourceUrl} target="_blank" rel="noreferrer">View original post <ExternalLink/></a>}</div>
    </article>)}</div>
    <div className="carousel-controls"><button aria-label="Previous media" onClick={()=>move(-1)} disabled={items.length<=visibleCount}><ChevronLeft/></button><button aria-label={manualPause?'Resume carousel':'Pause carousel'} aria-pressed={manualPause} onClick={()=>setManualPause(value=>!value)}>{manualPause?<Play/>:<Pause/>}</button><div className="carousel-dots" aria-label="Choose media slide">{items.map((item,dot)=><button key={item._id} className={dot===index?'active':''} aria-label={`Go to media ${dot+1}`} aria-current={dot===index?'true':undefined} onClick={()=>setIndex(dot)}/>)}</div><button aria-label="Next media" onClick={()=>move(1)} disabled={items.length<=visibleCount}><ChevronRight/></button></div>
  </div>;
}
