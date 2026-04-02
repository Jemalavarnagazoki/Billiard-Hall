import { Link } from 'react-router-dom';
import { siteContent } from '../data/siteContent';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="eyebrow">Billiard Hall</p>
          <strong className="footer-title">{siteContent.address}</strong>
          <p className="footer-copy">სამუშაო საათები: {siteContent.hours}</p>
        </div>

        <div>
          <p className="eyebrow">სწრაფი ბმულები</p>
          <div className="footer-links">
            <Link to="/reserve">ჯავშანი</Link>
            <Link to="/prices">მენიუ</Link>
            <Link to="/contact">კონტაქტი</Link>
            <Link to="/signup">რეგისტრაცია</Link>
          </div>
        </div>

        <div>
          <p className="eyebrow">ტელეფონი</p>
          <div className="footer-links">
            {siteContent.phones.map((phone) => (
              <a href={`tel:${phone}`} key={phone}>
                {phone}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
