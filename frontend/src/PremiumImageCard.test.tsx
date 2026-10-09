// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { PremiumImageCard } from './PremiumImageCard';

afterEach(cleanup);

describe('PremiumImageCard', () => {
  it('makes the whole card an accessible internal link', () => {
    render(<MemoryRouter><PremiumImageCard imageUrl="/card.webp" category="Event" title="Export workshop" href="/events/export-workshop" ctaLabel="Event Details"/></MemoryRouter>);
    const link = screen.getByRole('link', { name: 'Export workshop — Event Details' });
    expect(link.getAttribute('href')).toBe('/events/export-workshop');
    expect(link.className).toContain('premium-image-card');
  });

  it('lazy-loads a descriptive card image and keeps the touch CTA in the DOM', () => {
    render(<MemoryRouter><PremiumImageCard imageUrl="/member.webp" imageAlt="Member factory" category="Member" title="Example Industries" description="Precision manufacturing" href="/members/example"/></MemoryRouter>);
    expect(screen.getByAltText('Member factory').getAttribute('loading')).toBe('lazy');
    expect(screen.getByText('Explore More')).toBeTruthy();
  });

  it('opens a verified external destination safely', () => {
    render(<MemoryRouter><PremiumImageCard imageUrl="/briefing.webp" category="News" title="Industry briefing" href="https://example.org/briefing"/></MemoryRouter>);
    const link = screen.getByRole('link', { name: 'Industry briefing — Explore More' });
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toContain('noreferrer');
  });
});
