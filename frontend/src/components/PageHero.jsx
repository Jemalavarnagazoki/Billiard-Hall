import { Link } from 'react-router-dom';

export default function PageHero({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  children,
  className = '',
  image
}) {
  return (
    <section className={`page-hero${image ? ' page-hero-image' : ' page-hero-plain'}${className ? ` ${className}` : ''}`} style={image ? { '--hero-image': `url(${image})` } : undefined}>
      <div className="container page-hero-grid">
        <div className="page-hero-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="page-hero-text">{description}</p>
          <div className="hero-actions">
            {primaryAction ? (
              <Link className="button button-primary button-large" to={primaryAction.to}>
                {primaryAction.label}
              </Link>
            ) : null}
            {secondaryAction ? (
              <Link className="button button-secondary" to={secondaryAction.to}>
                {secondaryAction.label}
              </Link>
            ) : null}
          </div>
        </div>
        {children ? <div className="page-hero-side">{children}</div> : null}
      </div>
    </section>
  );
}
