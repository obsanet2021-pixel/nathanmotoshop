import styles from './Shared.module.css';

/* ── Button ───────────────────────────────────────────────── */
export function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  return (
    <button
      className={[styles.btn, styles[`btn_${variant}`], styles[`btn_${size}`], className].join(' ')}
      {...props}
    >
      {children}
    </button>
  );
}

/* ── Badge ────────────────────────────────────────────────── */
const BADGE_MAP = {
  pending:   'amber',
  confirmed: 'blue',
  ready:     'blue',
  out:       'purple',
  delivered: 'green',
  cancelled: 'red',
};
export function Badge({ status, children }) {
  const color = BADGE_MAP[status] || 'gray';
  return <span className={[styles.badge, styles[`badge_${color}`]].join(' ')}>{children}</span>;
}

/* ── Toast ────────────────────────────────────────────────── */
export function Toast({ msg, type = 'success' }) {
  return (
    <div className={[styles.toast, styles[`toast_${type}`]].join(' ')}>
      <span>{type === 'success' ? '✓' : '!'}</span>
      {msg}
    </div>
  );
}

/* ── Modal ────────────────────────────────────────────────── */
export function Modal({ title, onClose, children, wide }) {
  return (
    <div className={styles.modalBg} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={[styles.modal, wide ? styles.modalWide : ''].join(' ')}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{title}</h2>
          <button className={styles.modalClose} onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
}

/* ── FormGroup ────────────────────────────────────────────── */
export function FormGroup({ label, children }) {
  return (
    <div className={styles.formGroup}>
      <label className={styles.label}>{label}</label>
      {children}
    </div>
  );
}

/* ── Input / Textarea / Select ───────────────────────────── */
export function Input(props) {
  return <input className={styles.input} {...props} />;
}
export function Textarea(props) {
  return <textarea className={styles.textarea} {...props} />;
}
export function Select({ children, ...props }) {
  return <select className={styles.select} {...props}>{children}</select>;
}

/* ── Spinner ──────────────────────────────────────────────── */
export function Spinner() {
  return <div className={styles.spinner} aria-label="Loading" />;
}

/* ── Empty State ──────────────────────────────────────────── */
export function Empty({ icon, title, sub, action }) {
  return (
    <div className={styles.empty}>
      <div className={styles.emptyIcon}>{icon}</div>
      <p className={styles.emptyTitle}>{title}</p>
      {sub && <p className={styles.emptySub}>{sub}</p>}
      {action}
    </div>
  );
}
