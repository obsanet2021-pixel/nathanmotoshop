import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Button, Input, Modal, Spinner } from '../components/shared/Shared';
import styles from './AdminPage.module.css';
function AdminPage() {
  const { products, dispatch, t } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [formData, setFormData] = useState({
    name: '',
    name_am: '',
    name_or: '',
    price: '',
    category: '',
    stock: '',
    description: '',
    description_am: '',
    description_or: ''
  });
  const categories = ['All', 'Helmets', 'Gloves', 'Jackets', 'Footwear', 'Pants', 'Accessories'];
  // Load products from localStorage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      dispatch({ type: 'SET_PRODUCTS', payload: JSON.parse(savedProducts) });
    }
  }, []);
  // Save products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    try {
      if (editingProduct) {
        // Update existing product
        const updatedProducts = products.map(p =>
          p.id === editingProduct.id 
            ? { 
                ...p, 
                ...formData, 
                price: Number(formData.price), 
                stock: Number(formData.stock),
                updatedAt: new Date().toISOString()
              } 
            : p
        );
        dispatch({ type: 'SET_PRODUCTS', payload: updatedProducts });
        alert('✅ Product updated successfully!');
      } else {
        // Add new product
        const newProduct = {
          id: Date.now(),
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock),
          rating: 0,
          reviews: 0,
          image: '/images/placeholder.jpg',
          createdAt: new Date().toISOString()
        };
        dispatch({ type: 'SET_PRODUCTS', payload: [...products, newProduct] });
        alert('✅ Product added successfully!');
      }
      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      alert('❌ Error saving product. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const resetForm = () => {
    setFormData({
      name: '',
      name_am: '',
      name_or: '',
      price: '',
      category: '',
      stock: '',
      description: '',
      description_am: '',
      description_or: ''
    });
    setEditingProduct(null);
  };
  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      name_am: product.name_am || '',
      name_or: product.name_or || '',
      price: product.price,
      category: product.category,
      stock: product.stock,
      description: product.description || '',
      description_am: product.description_am || '',
      description_or: product.description_or || ''
    });
    setIsModalOpen(true);
  };
  const handleDelete = (id) => {
    if (window.confirm('⚠️ Are you sure you want to delete this product? This action cannot be undone.')) {
      const updatedProducts = products.filter(p => p.id !== id);
      dispatch({ type: 'SET_PRODUCTS', payload: updatedProducts });
      alert('🗑️ Product deleted successfully!');
    }
  };
  const handleBulkDelete = () => {
    if (window.confirm('⚠️ Are you sure you want to delete ALL products? This action cannot be undone.')) {
      dispatch({ type: 'SET_PRODUCTS', payload: [] });
      alert('🗑️ All products deleted successfully!');
    }
  };
  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.name_am && product.name_am.includes(searchTerm)) ||
      (product.name_or && product.name_or.includes(searchTerm)) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  // Calculate statistics
  const stats = {
    totalProducts: products.length,
    totalStock: products.reduce((sum, p) => sum + p.stock, 0),
    totalValue: products.reduce((sum, p) => sum + (p.price * p.stock), 0),
    lowStock: products.filter(p => p.stock < 10).length,
    outOfStock: products.filter(p => p.stock === 0).length,
    categories: new Set(products.map(p => p.category)).size
  };
  return (
    <div className={styles.adminPage}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h1>🛠️ Admin Dashboard</h1>
            <p className={styles.subtitle}>Manage your motorcycle shop inventory</p>
          </div>
          <div className={styles.headerActions}>
            <Button onClick={() => setIsModalOpen(true)} variant="primary">
              + Add New Product
            </Button>
            {products.length > 0 && (
              <Button onClick={handleBulkDelete} variant="danger">
                🗑️ Delete All
              </Button>
            )}
          </div>
        </div>
        {/* Statistics Cards */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📦</div>
            <div className={styles.statInfo}>
              <h3>{stats.totalProducts}</h3>
              <p>Total Products</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📊</div>
            <div className={styles.statInfo}>
              <h3>{stats.totalStock}</h3>
              <p>Total Stock</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>💰</div>
            <div className={styles.statInfo}>
              <h3>ETB {stats.totalValue.toLocaleString()}</h3>
              <p>Inventory Value</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>⚠️</div>
            <div className={styles.statInfo}>
              <h3>{stats.lowStock}</h3>
              <p>Low Stock (&lt;10)</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>❌</div>
            <div className={styles.statInfo}>
              <h3>{stats.outOfStock}</h3>
              <p>Out of Stock</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>🏷️</div>
            <div className={styles.statInfo}>
              <h3>{stats.categories}</h3>
              <p>Categories</p>
            </div>
          </div>
        </div>
        {/* Filters */}
        <div className={styles.filtersBar}>
          <div className={styles.searchBar}>
            <Input
              type="text"
              placeholder="🔍 Search products by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <div className={styles.categoryFilter}>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={styles.select}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
        {/* Products Table */}
        <div className={styles.productsTable}>
          {filteredProducts.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📭</div>
              <h3>No Products Found</h3>
              <p>{searchTerm ? 'Try a different search term' : 'Click "Add New Product" to get started'}</p>
              {searchTerm && (
                <Button onClick={() => setSearchTerm('')} variant="secondary">
                  Clear Search
                </Button>
              )}
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Name (EN)</th>
                  <th>Name (AM)</th>
                  <th>Name (OR)</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className={styles.productImage}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/50x50?text=🏍️';
                        }}
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.name_am || '-'}</td>
                    <td>{product.name_or || '-'}</td>
                    <td>ETB {product.price.toLocaleString()}</td>
                    <td>
                      <span className={styles.categoryBadge}>{product.category}</span>
                    </td>
                    <td>
                      <span className={`${styles.stockBadge} ${product.stock === 0 ? styles.outOfStock : product.stock < 10 ? styles.lowStock : ''}`}>
                        {product.stock === 0 ? 'OUT' : product.stock}
                      </span>
                    </td>
                    <td>
                      <button 
                        onClick={() => handleEdit(product)} 
                        className={styles.editBtn}
                        title="Edit Product"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)} 
                        className={styles.deleteBtn}
                        title="Delete Product"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {/* Add/Edit Product Modal */}
        <Modal isOpen={isModalOpen} onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}>
          <div className={styles.modalContent}>
            <h2>{editingProduct ? '✏️ Edit Product' : '➕ Add New Product'}</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formSection}>
                <h3>Basic Information</h3>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Name (English) *</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Premium Motorcycle Helmet"
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Name (Amharic)</label>
                    <Input
                      name="name_am"
                      value={formData.name_am}
                      onChange={handleInputChange}
                      placeholder="በአማርኛ ስም"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Name (Oromo)</label>
                    <Input
                      name="name_or"
                      value={formData.name_or}
                      onChange={handleInputChange}
                      placeholder="Maqaa Oromoo"
                    />
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Price (ETB) *</label>
                    <Input
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="e.g., 3499"
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className={styles.select}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.filter(c => c !== 'All').map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Stock Quantity *</label>
                    <Input
                      name="stock"
                      type="number"
                      value={formData.stock}
                      onChange={handleInputChange}
                      placeholder="e.g., 15"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className={styles.formSection}>
                <h3>Descriptions</h3>
                <div className={styles.formGroup}>
                  <label>Description (English)</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className={styles.textarea}
                    rows="3"
                    placeholder="Describe the product in English..."
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Description (Amharic)</label>
                  <textarea
                    name="description_am"
                    value={formData.description_am}
                    onChange={handleInputChange}
                    className={styles.textarea}
                    rows="3"
                    placeholder="በአማርኛ ይግለጹ..."
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Description (Oromo)</label>
                  <textarea
                    name="description_or"
                    value={formData.description_or}
                    onChange={handleInputChange}
                    className={styles.textarea}
                    rows="3"
                    placeholder="Ibsa Oromoo..."
                  />
                </div>
              </div>
              <div className={styles.formActions}>
                <Button type="button" variant="secondary" onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" disabled={loading}>
                  {loading ? <Spinner /> : (editingProduct ? 'Update Product' : 'Add Product')}
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
}
export default AdminPage;
