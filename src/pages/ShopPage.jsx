import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/products';
import ProductCard from '../shop/ProductCard';
import { Button, Empty } from '../shared/Shared';
import styles from './ShopPage.module.css';

export default function ShopPage() {
  const { t, products } = useApp();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('relevance');

  const filtered = useMemo(() => {
    let list = products;
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.sku?.toLowerCase().includes(q) ||
        p.compatible?.toLowerCase().includes(q)
      );
    }
    if (category) list = list.filter(p => p.category === category);
    switch (sort) {
      case 'price_asc':  list = [...list].sort((a,b) => a.price - b.price); break;
      case 'price_desc': list = [...list].sort((a,b) => b.price - a.price); break;
      case 'name':       list = [...list].sort((a,b) => a.name.localeCompare(b.name)); break;
    }
    return list;
  }, [products, query, category, sort]);

  return (
    <div>
      {/* ── Hero ────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={'container ' + styles.heroInner}>
          <div className={styles.heroTag}>
            <span className={styles.heroDot} />
            {t('hero_tag')}
          </div>
          <h1 className={styles.heroTitle}>{t('hero_title')}</h1>
          <p className={styles.heroSub}>{t('hero_sub')}</p>
          <div className={styles.heroActions}>
            <Button size="xl" onClick={() => document.getElementById('shop-grid')?.scrollIntoView({ behavior: 'smooth' })}>
              {t('hero_cta')} →
            </Button>
          </div>
          {/* Decorative grid */}
          <div className={styles.heroGrid} aria-hidden="true">
            {Array.from({length:12}).map((_,i)=>(
              <div key={i} className={styles.heroGridCell} style={{animationDelay:`${i*0.06}s`}} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature Cards ───────────────────────── */}
      <section className={styles.features}>
        <div className={'container ' + styles.featuresInner}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🚚</div>
            <h3 className={styles.featureTitle}>Fast Delivery</h3>
            <p className={styles.featureDesc}>Same-day delivery in Addis Ababa</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>✅</div>
            <h3 className={styles.featureTitle}>Quality Parts</h3>
            <p className={styles.featureDesc}>Genuine OEM & aftermarket parts</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔧</div>
            <h3 className={styles.featureTitle}>Expert Support</h3>
            <p className={styles.featureDesc}>Technical help for installation</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>💰</div>
            <h3 className={styles.featureTitle}>Best Prices</h3>
            <p className={styles.featureDesc}>Competitive rates on all parts</p>
          </div>
        </div>
      </section>

      {/* ── Filter bar ──────────────────────────── */}
      <div className={'container ' + styles.filterBar} id="shop-grid">
        <div className={styles.searchWrap}>
          <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input
            className={styles.search}
            placeholder={t('search_ph')}
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <select
          className={styles.catSelect}
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="">{t('all_cats')}</option>
          {CATEGORIES.map(c => (
            <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
          ))}
        </select>
        <select
          className={styles.catSelect}
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          <option value="relevance">{t('sort_relevance')}</option>
          <option value="price_asc">{t('sort_price_asc')}</option>
          <option value="price_desc">{t('sort_price_desc')}</option>
          <option value="name">{t('sort_name')}</option>
        </select>
        <span className={styles.resultCount}>{filtered.length} parts</span>
      </div>

      {/* ── Category pills ─────────────────────── */}
      <div className={'container ' + styles.catPills}>
        <button
          className={[styles.pill, !category ? styles.pillActive : ''].join(' ')}
          onClick={() => setCategory('')}
        >
          All
        </button>
        {CATEGORIES.map(c => (
          <button
            key={c.id}
            className={[styles.pill, category === c.id ? styles.pillActive : ''].join(' ')}
            onClick={() => setCategory(category === c.id ? '' : c.id)}
          >
            {c.icon} {c.label}
          </button>
        ))}
      </div>

      {/* ── Category Showcase ───────────────────── */}
      <section className={styles.categoryShowcase}>
        <div className={'container ' + styles.categoryShowcaseInner}>
          <h2 className={styles.categoryTitle}>Browse by Category</h2>
          <div className={styles.categoryGrid}>
            {CATEGORIES.map(c => (
              <div
                key={c.id}
                className={[styles.categoryCard, category === c.id ? styles.categoryCardActive : ''].join(' ')}
                onClick={() => setCategory(category === c.id ? '' : c.id)}
              >
                <div className={styles.categoryIcon}>{c.icon}</div>
                <h3 className={styles.categoryName}>{c.label}</h3>
                <p className={styles.categoryCount}>{products.filter(p => p.category === c.id).length} parts</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product grid ───────────────────────── */}
      <div className={'container ' + styles.grid}>
        {filtered.length === 0
          ? <Empty icon="🔍" title={t('no_products')} />
          : filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))
        }
      </div>
    </div>
  );
}
