// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MediaCarousel, HomepageMediaItem } from './MediaCarousel';

const items: HomepageMediaItem[] = [
  {_id:'1',title:'First briefing',type:'youtube',sourceUrl:'https://youtu.be/dQw4w9WgXcQ',platformMediaId:'dQw4w9WgXcQ'},
  {_id:'2',title:'Second briefing',type:'uploaded_image',sourceUrl:'https://example.com/two.webp'},
  {_id:'3',title:'Third briefing',type:'instagram_post',sourceUrl:'https://instagram.com/p/ABC123/'},
  {_id:'4',title:'Fourth briefing',type:'uploaded_image',sourceUrl:'https://example.com/four.webp'},
];

beforeEach(()=>{
  vi.useFakeTimers();
  Object.defineProperty(window,'matchMedia',{writable:true,value:vi.fn().mockImplementation(()=>({matches:false,addEventListener:vi.fn(),removeEventListener:vi.fn()}))});
  Object.defineProperty(window,'innerWidth',{writable:true,configurable:true,value:1200});
});
afterEach(()=>{cleanup();vi.useRealTimers()});

describe('MediaCarousel',()=>{
  it('automatically rotates after the configured interval',()=>{
    render(<MediaCarousel items={items} interval={7000}/>);
    expect(screen.getByLabelText('Go to media 1').getAttribute('aria-current')).toBe('true');
    act(()=>vi.advanceTimersByTime(7000));
    expect(screen.getByLabelText('Go to media 2').getAttribute('aria-current')).toBe('true');
  });
  it('pauses rotation while a YouTube player is active',()=>{
    render(<MediaCarousel items={items} interval={7000}/>);
    fireEvent.click(screen.getByLabelText('Play First briefing'));
    act(()=>vi.advanceTimersByTime(14000));
    expect(screen.getByLabelText('Go to media 1').getAttribute('aria-current')).toBe('true');
  });
  it('shows one card in a mobile viewport and retains keyboard controls',()=>{
    Object.defineProperty(window,'innerWidth',{writable:true,configurable:true,value:390});
    const {container}=render(<MediaCarousel items={items} interval={7000}/>);
    fireEvent(window,new Event('resize'));
    expect(container.querySelectorAll('.media-card')).toHaveLength(1);
    fireEvent.keyDown(screen.getByRole('region',{name:'MACCIA Media Connect'}),{key:'ArrowRight'});
    expect(screen.getByLabelText('Go to media 2').getAttribute('aria-current')).toBe('true');
  });
});
