import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { LANGUAGES } from '../../context/translations';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { t, lang, setLang, cartCount } = useApp();
  const { pathname } = useLocation();

  const links = [
    { to: '/',       label: t('nav_shop') },
    { to: '/orders', label: t('nav_orders') },
  ];

  return (
    <header className={styles.header}>
      <nav className={styles.nav + ' container'}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <span className={styles.logoMoto}>MOTO</span>
          <span className={styles.logoShop}>SHOP</span>
          <span className={styles.logoDot} />
        </Link>

        {/* Links */}
        <div className={styles.links}>
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={[styles.link, pathname === l.to ? styles.linkActive : ''].join(' ')}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className={styles.right}>
          {/* Language switcher */}
          <div className={styles.langGroup}>
            {Object.entries(LANGUAGES).map(([code, { label }]) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                className={[styles.langBtn, lang === code ? styles.langActive : ''].join(' ')}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Cart */}
          <Link to="/cart" className={styles.cartBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
          </Link>
        </div>
      </nav>
    </header>
  );
}
