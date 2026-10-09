import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export type PremiumImageCardProps = {
  imageUrl: string;
  category: string;
  title: string;
  href: string;
  description?: string;
  ctaLabel?: string;
  imageAlt?: string;
  eager?: boolean;
};

export function PremiumImageCard({ imageUrl, category, title, href, description, ctaLabel = 'Explore More', imageAlt, eager = false }: PremiumImageCardProps) {
  const content = <>
    <img className="premium-image-card__image" src={imageUrl} alt={imageAlt || ''} loading={eager ? 'eager' : 'lazy'} decoding="async"/>
    <span className="premium-image-card__overlay" aria-hidden="true"/>
    <span className="premium-image-card__content">
      <span className="premium-image-card__category">{category}</span>
      <span className="premium-image-card__separator" aria-hidden="true"/>
      <span className="premium-image-card__title">{title}</span>
      {description && <span className="premium-image-card__description">{description}</span>}
      <span className="premium-image-card__cta">{ctaLabel}<ArrowRight aria-hidden="true"/></span>
    </span>
    <ArrowRight className="premium-image-card__arrow" aria-hidden="true"/>
  </>;
  const label = `${title} — ${ctaLabel}`;
  return href.startsWith('/')
    ? <Link className="premium-image-card" to={href} aria-label={label}>{content}</Link>
    : <a className="premium-image-card" href={href} target="_blank" rel="noreferrer" aria-label={label}>{content}</a>;
}
