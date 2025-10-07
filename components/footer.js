import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt, faShieldHalved,faHandshake, faHeadset,
faStar

 } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
    return (
         <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="logo">
              <Image src="/logo.png" alt="Logo" width={150} height={150} />
            </div>
            <p>Votre partenaire de confiance pour trouver la propriété de vos rêves.</p>
            <div className="social-links">
              <a href="#"><FontAwesomeIcon icon={faEnvelope} /></a>
              <a href="#"><FontAwesomeIcon icon={faPhone} /></a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Nos Services</h4>
            <ul>
              <li><a href="#">Achat</a></li>
              <li><a href="#">Location</a></li>
              <li><a href="#">Séjours</a></li>
            </ul>
          </div>

          <div className="footer-section" id='contact'>
            <h4>Contact</h4>
            <p><FontAwesomeIcon icon={faMapMarkerAlt} /> 123 Rue de l'Immobilier, Paris</p>
            <p><FontAwesomeIcon icon={faPhone} /> +33 1 23 45 67 89</p>
            <p><FontAwesomeIcon icon={faEnvelope} /> contact@immobilier.fr</p>
          </div>

          <div className="footer-section">
            <h4>Pourquoi Nous Choisir</h4>
            <ul>
              <li><FontAwesomeIcon icon={faShieldHalved} /> Sécurité garantie</li>
              <li><FontAwesomeIcon icon={faHandshake} /> Confiance et transparence</li>
              <li><FontAwesomeIcon icon={faHeadset} /> Support 24/7</li>
              <li><FontAwesomeIcon icon={faStar} /> Satisfaction client</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Immobilier Premium. Tous droits réservés.</p>
        </div>
        <style jsx>{`

        /* Footer */
        .footer {
          background: #1a1d38;
          color: white;
          margin-top: 80px;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 20px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 40px;
        }

        .footer-section h4 {
          color: #b05429;
          margin-bottom: 20px;
          font-size: 1.2em;
        }

        .footer-section ul {
          list-style: none;
          padding: 0;
        }

        .footer-section ul li {
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .footer-section a {
          color: #ccc;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-section a:hover {
          color: #b05429;
        }

        .social-links {
          display: flex;
          gap: 15px;
          margin-top: 20px;
        }

        .social-links a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: #26294a;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .social-links a:hover {
          background: #b05429;
          transform: translateY(-2px);
        }

        .footer-bottom {
          border-top: 1px solid #26294a;
          padding: 20px;
          text-align: center;
          color: #ccc;
        }        
      `}</style>
      </footer>
    );
}