import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/products';
import { Button, Badge } from '../shared/Shared';
import styles from './ProductCard.module.css';

const CAT_ICONS = Object.fromEntries(CATEGORIES.map(c => [c.id, c.icon]));
const PLACEHOLDER_COLORS = ['#1a1a20','#18181e','#16161c','#141418'];

export default function ProductCard({ product, index }) {
  const { t, addToCart } = useApp();
  const [adding, setAdding] = useState(false);

  const stockStatus = product.stock === 0
    ? 'out' : product.stock <= 3 ? 'low' : 'in';

  const handleAdd = () => {
    if (product.stock === 0) return;
    setAdding(true);
    addToCart(product);
    setTimeout(() => setAdding(false), 900);
  };

  return (
    <article
      className={styles.card}
      style={{ animationDelay: `${Math.min(index * 0.04, 0.4)}s` }}
    >
      {/* Image */}
      <div className={styles.imgWrap} style={{ background: PLACEHOLDER_COLORS[index % 4] }}>
        {product.image
          ? <img src={product.image} alt={product.name} className={styles.img} />
          : <span className={styles.imgIcon}>{CAT_ICONS[product.category] || '🔧'}</span>
        }
        {product.stock <= 3 && product.stock > 0 && (
          <span className={styles.lowTag}>
            {t('low_stock', { n: product.stock })}
          </span>
        )}
        {product.stock === 0 && (
          <div className={styles.outOverlay}>{t('out_of_stock')}</div>
        )}
      </div>

      {/* Body */}
      <div className={styles.body}>
        <div className={styles.catRow}>
          <span className={styles.catLabel}>{CAT_ICONS[product.category]} {product.category}</span>
          {product.sku && <span className={styles.sku}>{product.sku}</span>}
        </div>
        <h2 className={styles.name}>{product.name}</h2>
        {product.compatible && (
          <p className={styles.compat}>{product.compatible}</p>
        )}
        <div className={styles.footer}>
          <span className={styles.price}>{product.price.toLocaleString()} ETB</span>
          <Button
            variant={adding ? 'ghost' : 'primary'}
            size="sm"
            onClick={handleAdd}
            disabled={product.stock === 0}
          >
            {adding ? '✓ ' + t('added') : '+ ' + t('add_cart')}
          </Button>
        </div>
      </div>
    </article>
  );
}
