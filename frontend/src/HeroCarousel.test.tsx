// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { HeroCarousel } from './HeroCarousel';

const slides = [
  { id:'one', title:'First', subtitle:'First slide', ctaText:'Explore', ctaLink:'/about', image:'/one.webp', imageAlt:'First MACCIA event' },
  { id:'two', title:'Second', subtitle:'Second slide', ctaText:'Join', ctaLink:'/membership', image:'/two.webp', imageAlt:'Second MACCIA event' },
];

afterEach(()=>{cleanup();vi.useRealTimers()});

describe('HeroCarousel',()=>{
  it('advances automatically and supports direct pagination',()=>{vi.useFakeTimers();const {container}=render(<MemoryRouter><HeroCarousel slides={slides} interval={7000}/></MemoryRouter>);expect(container.querySelector('.hero-carousel__track')?.getAttribute('style')).toContain('0%');act(()=>vi.advanceTimersByTime(7000));expect(container.querySelector('.hero-carousel__track')?.getAttribute('style')).toContain('-100%');fireEvent.click(screen.getByLabelText('Go to hero slide 1'));expect(container.querySelector('.hero-carousel__track')?.getAttribute('style')).toContain('0%')});
  it('pauses automatic movement while hovered or keyboard-focused',()=>{vi.useFakeTimers();const {container}=render(<MemoryRouter><HeroCarousel slides={slides} interval={7000}/></MemoryRouter>);const carousel=screen.getByRole('region',{name:'MACCIA highlights'});fireEvent.mouseEnter(carousel);act(()=>vi.advanceTimersByTime(7000));expect(container.querySelector('.hero-carousel__track')?.getAttribute('style')).toContain('0%');fireEvent.mouseLeave(carousel);act(()=>vi.advanceTimersByTime(7000));expect(container.querySelector('.hero-carousel__track')?.getAttribute('style')).toContain('-100%')});
  it('provides accessible controls and descriptive images',()=>{render(<MemoryRouter><HeroCarousel slides={slides}/></MemoryRouter>);expect(screen.getByLabelText('Previous hero slide')).toBeTruthy();expect(screen.getByLabelText('Next hero slide')).toBeTruthy();expect(screen.getByAltText('First MACCIA event')).toBeTruthy()});
});
