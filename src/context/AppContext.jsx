import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { T } from '../data/translations';
import { INITIAL_PRODUCTS } from '../data/products';

const AppContext = createContext(null);

const LS = {
  get: (k, fallback) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; } catch { return fallback; } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

export function AppProvider({ children }) {
  const [lang, setLangState] = useState(() => LS.get('ms_lang', 'en'));
  const [products, setProducts] = useState(() => LS.get('ms_products', INITIAL_PRODUCTS));
  const [cart, setCart] = useState(() => LS.get('ms_cart', []));
  const [orders, setOrders] = useState(() => LS.get('ms_orders', []));
  const [adminAuth, setAdminAuth] = useState(false);
  const [toast, setToast] = useState(null);

  // persist
  useEffect(() => { LS.set('ms_lang', lang); }, [lang]);
  useEffect(() => { LS.set('ms_products', products); }, [products]);
  useEffect(() => { LS.set('ms_cart', cart); }, [cart]);
  useEffect(() => { LS.set('ms_orders', orders); }, [orders]);

  const t = useCallback((key, vars = {}) => {
    let str = T[lang]?.[key] || T['en']?.[key] || key;
    Object.entries(vars).forEach(([k, v]) => { str = str.replace(`{${k}}`, v); });
    return str;
  }, [lang]);

  const setLang = (l) => setLangState(l);

  // ── Cart ──────────────────────────────────────────────────
  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { ...product, qty }];
    });
    showToast(t('added'));
  };

  const updateCartQty = (id, qty) => {
    if (qty <= 0) return removeFromCart(id);
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const clearCart = () => setCart([]);
  const cartCount = cart.reduce((a, b) => a + b.qty, 0);
  const cartTotal = cart.reduce((a, b) => a + b.price * b.qty, 0);

  // ── Orders ────────────────────────────────────────────────
  const placeOrder = (orderData) => {
    const id = `ORD-${Date.now().toString(36).toUpperCase()}`;
    const order = {
      id, ...orderData,
      items: [...cart],
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setOrders(prev => [order, ...prev]);
    clearCart();
    return order;
  };

  const updateOrderStatus = (id, status) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  // ── Products ──────────────────────────────────────────────
  const addProduct = (data) => {
    const id = `p${Date.now()}`;
    setProducts(prev => [{ id, ...data }, ...prev]);
    showToast('Product added!');
  };

  const updateProduct = (id, data) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
    showToast('Product updated!');
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product deleted.');
  };

  const adjustStock = (id, delta) => {
    setProducts(prev => prev.map(p =>
      p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p
    ));
  };

  // ── Admin Auth ────────────────────────────────────────────
  // In production: replace with a real API / Cloudflare Workers auth
  const adminLogin = (username, password) => {
    if (username === 'admin' && password === 'moto2024') {
      setAdminAuth(true);
      return true;
    }
    return false;
  };
  const adminLogout = () => setAdminAuth(false);

  // ── Toast ─────────────────────────────────────────────────
  const showToast = (msg, type = 'success') => {
    const id = Date.now();
    setToast({ id, msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  // ── WhatsApp ──────────────────────────────────────────────
  // Change this to the shop owner's WhatsApp number (include country code, no +)
  const WHATSAPP_NUMBER = '251900000000';

  const sendWhatsApp = (order) => {
    const itemLines = order.items.map(i => `  • ${i.name} × ${i.qty} = ${i.price * i.qty} ETB`).join('\n');
    const addrLine = order.delivery === 'home' ? `Address: ${order.address}` : '';
    const msg = t('wa_order_msg', {
      id: order.id,
      name: order.name,
      phone: order.phone,
      delivery: order.delivery === 'home' ? 'Home Delivery' : 'In-Store Pickup',
      address: addrLine,
      items: itemLines,
      total: order.total,
    });
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <AppContext.Provider value={{
      lang, setLang, t,
      products, addProduct, updateProduct, deleteProduct, adjustStock,
      cart, addToCart, updateCartQty, removeFromCart, clearCart, cartCount, cartTotal,
      orders, placeOrder, updateOrderStatus,
      adminAuth, adminLogin, adminLogout,
      toast, showToast,
      sendWhatsApp,
      WHATSAPP_NUMBER,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
