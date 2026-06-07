import React from 'react';
import { useApp } from '../../context/AppContext';
import styles from './Footer.module.css';
function Footer() {
  const { t, language } = useApp();
  const currentYear = new Date().getFullYear();
  const getFooterText = () => {
    switch(language) {
      case 'am':
        return '© ናትሃን ሞቶ ሱቅ ሁሉም መብቶች የተጠበቁ ናቸው';
      case 'or':
        return '© Naatan Mooto Suuqii Mirgi Hunda Kan Eegame';
      default:
        return '© Nathan Moto Shop All Rights Reserved' Developed by <a href="https://obsan2021.github.io/clover-digital/" target="_blank" rel="noopener noreferrer">Clover Digital</a>;
    }
  };
  const socialLinks = [
    { name: 'Facebook', icon: '📘', url: 'https://facebook.com' },
    { name: 'Twitter', icon: '🐦', url: 'https://twitter.com' },
    { name: 'Instagram', icon: '📷', url: 'https://instagram.com' },
    { name: 'WhatsApp', icon: '💬', url: 'https://whatsapp.com' }
  ];
  const quickLinks = [
    { key: 'nav.home', path: '/' },
    { key: 'nav.shop', path: '/shop' },
    { key: 'nav.cart', path: '/cart' },
    { key: 'nav.orders', path: '/orders' }
  ];
  const contactInfo = {
    en: {
      address: 'Adama, Ethiopia',
      phone: '+251 905 864 633',
      email: 'info@nathanmotoshop.com'
    },
    am: {
      address: 'አዳማ፣ ኢትዮጵያ',
      phone: '+251 905 864 633',
      email: 'info@nathanmotoshop.com'
    },
    or: {
      address: 'Adama, Itoophiyaa',
      phone: '+251 905 864 633',
      email: 'info@nathanmotoshop.com'
    }
  };
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          {/* About Section */}
          <div className={styles.footerSection}>
            <h3 className={styles.sectionTitle}>🏍️ Nathan Moto Shop</h3>
            <p className={styles.sectionText}>
              {language === 'am' && 'ከፍተኛ ጥራት ያላቸው የሞተርሳይክል መሳሪያዎች እና መለዋወጫዎች'}
              {language === 'or' && 'Meeshaalee fi wantoota mootaayikilii qulqulluu'}
              {language === 'en' && 'Premium motorcycle gear and accessories'}
            </p>
            <div className={styles.socialLinks}>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={social.name}
                >
                  <span className={styles.socialIcon}>{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
          {/* Quick Links */}
          <div className={styles.footerSection}>
            <h3 className={styles.sectionTitle}>
              {language === 'am' ? 'ፈጣን አገናኞች' : language === 'or' ? 'Liinkii Dafaa' : 'Quick Links'}
            </h3>
            <ul className={styles.linkList}>
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.path} className={styles.link}>
                    {t(link.key)}
                  </a>
                </li>
              ))}
              <li>
                <a href="/admin" className={styles.link}>
                  {language === 'am' ? 'አስተዳዳሪ' : language === 'or' ? 'Abboommii' : 'Admin'}
                </a>
              </li>
            </ul>
          </div>
          {/* Contact Info */}
          <div className={styles.footerSection}>
            <h3 className={styles.sectionTitle}>
              {language === 'am' ? 'አግኙን' : language === 'or' ? 'Nu Qunnamaa' : 'Contact Us'}
            </h3>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <span className={styles.contactIcon}>📍</span>
                <span>{contactInfo[language].address}</span>
              </li>
              <li className={styles.contactItem}>
                <span className={styles.contactIcon}>📞</span>
                <a href={`tel:${contactInfo[language].phone}`} className={styles.contactLink}>
                  {contactInfo[language].phone}
                </a>
              </li>
              <li className={styles.contactItem}>
                <span className={styles.contactIcon}>✉️</span>
                <a href={`mailto:${contactInfo[language].email}`} className={styles.contactLink}>
                  {contactInfo[language].email}
                </a>
              </li>
            </ul>
          </div>
          {/* Business Hours */}
          <div className={styles.footerSection}>
            <h3 className={styles.sectionTitle}>
              {language === 'am' ? 'የስራ ሰዓት' : language === 'or' ? 'Sa\'aatii Hojii' : 'Business Hours'}
            </h3>
            <ul className={styles.hoursList}>
              <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
              <li>Saturday: 10:00 AM - 4:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>
        {/* Newsletter Section */}
        <div className={styles.newsletter}>
          <h3 className={styles.newsletterTitle}>
            {language === 'am' ? 'ለዜና ይመዝገቡ' : language === 'or' ? 'Oduufiif Galmaa\'aa' : 'Subscribe to Newsletter'}
          </h3>
          <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder={language === 'am' ? 'ኢሜል ያስገቡ' : language === 'or' ? 'Imeelii Galchi' : 'Enter your email'}
              className={styles.newsletterInput}
            />
            <button type="submit" className={styles.newsletterButton}>
              {language === 'am' ? 'ይመዝገቡ' : language === 'or' ? 'Galmaa\'i' : 'Subscribe'}
            </button>
          </form>
        </div>
        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.copyright}>
            {getFooterText()} {currentYear}
          </div>
          <div className={styles.paymentMethods}>
            <span>💳 Visa</span>
            <span>💳 Mastercard</span>
            <span>📱 Telebirr</span>
            <span>📱 M-Pesa</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
