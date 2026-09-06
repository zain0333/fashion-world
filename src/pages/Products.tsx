import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaFilter, FaSearch, FaPlay, FaSyncAlt } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, CATEGORIES } from '../data/products';

export const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'All';
  const searchTerm = searchParams.get('search') || '';
  const filterMedia = searchParams.get('media') || 'all'; // 'all' | 'video' | '360'

  const [sortBy, setSortBy] = useState<string>('featured');

  // Handle category tab change
  const handleCategoryChange = (cat: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (cat === 'All') {
      newParams.delete('category');
    } else {
      newParams.set('category', cat);
    }
    setSearchParams(newParams);
  };

  // Handle media filter change
  const handleMediaFilterChange = (mediaType: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (mediaType === 'all') {
      newParams.delete('media');
    } else {
      newParams.set('media', mediaType);
    }
    setSearchParams(newParams);
  };

  // Handle local search input change
  const handleSearchChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value.trim() === '') {
      newParams.delete('search');
    } else {
      newParams.set('search', value);
    }
    setSearchParams(newParams);
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchCategory =
        selectedCategory === 'All' || product.category.toLowerCase() === selectedCategory.toLowerCase();
      
      const matchSearch =
        searchTerm.trim() === '' ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchMedia =
        filterMedia === 'all' ||
        (filterMedia === 'video' && Boolean(product.videoUrl)) ||
        (filterMedia === '360' && Boolean(product.multiAngleImages && product.multiAngleImages.length > 1));

      return matchCategory && matchSearch && matchMedia;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [selectedCategory, searchTerm, filterMedia, sortBy]);

  const clearFilters = () => {
    setSortBy('featured');
    setSearchParams({});
  };

  return (
    <div className="products-page py-4">
      <div className="container">
        {/* Page Header */}
        <div className="bg-light p-4 p-md-5 rounded-4 mb-4 border">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <span className="section-subtitle text-start d-block">Curated Wardrobe</span>
              <h1 className="section-title text-start mb-2">Our Full Collection</h1>
              <p className="text-muted mb-0">
                Discover statement pieces, tailored suits, elegant dresses, and premium everyday essentials with interactive 3D rotation, fabric weave dynamics, and live runway videos.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
              <span className="badge bg-dark px-3 py-2 fs-6">
                Showing {filteredProducts.length} of {PRODUCTS.length} Styles
              </span>
            </div>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="row g-3 align-items-center justify-content-between mb-4 pb-2 border-bottom">
          {/* Category Badges & Animation Filter Pills */}
          <div className="col-12 col-lg-7">
            <div className="d-flex flex-wrap gap-2 align-items-center">
              <button
                type="button"
                className={`btn btn-sm ${
                  selectedCategory === 'All' ? 'btn-fashion-primary' : 'btn-outline-secondary'
                }`}
                onClick={() => handleCategoryChange('All')}
              >
                All Departments
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`btn btn-sm ${
                    selectedCategory.toLowerCase() === cat.name.toLowerCase()
                      ? 'btn-fashion-primary'
                      : 'btn-outline-secondary'
                  }`}
                  onClick={() => handleCategoryChange(cat.name)}
                >
                  {cat.name}
                </button>
              ))}

              {/* Special Animation & Video Filter Pills */}
              <div className="vr d-none d-md-block mx-1" style={{ height: '24px' }} />

              <button
                type="button"
                className={`btn btn-sm d-inline-flex align-items-center gap-1 ${
                  filterMedia === 'video' ? 'btn-danger text-white fw-semibold' : 'btn-outline-danger'
                }`}
                onClick={() => handleMediaFilterChange(filterMedia === 'video' ? 'all' : 'video')}
                title="Show Only Products with Runway Motion Video Previews"
              >
                <FaPlay size={10} />
                <span>Runway Video</span>
              </button>

              <button
                type="button"
                className={`btn btn-sm d-inline-flex align-items-center gap-1 ${
                  filterMedia === '360' ? 'btn-warning text-dark fw-semibold' : 'btn-outline-warning'
                }`}
                onClick={() => handleMediaFilterChange(filterMedia === '360' ? 'all' : '360')}
                title="Show Only Products with 360° Multi-Angle Spin"
              >
                <FaSyncAlt size={10} />
                <span>360° Spin</span>
              </button>
            </div>
          </div>

          {/* Search & Sort Dropdown */}
          <div className="col-12 col-lg-5">
            <div className="d-flex flex-sm-row flex-column gap-2 justify-content-lg-end">
              {/* Search Input */}
              <div className="input-group input-group-sm" style={{ maxWidth: '240px' }}>
                <span className="input-group-text bg-white">
                  <FaSearch size={12} className="text-muted" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Filter styles..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
              </div>

              {/* Sort selector */}
              <div className="d-flex align-items-center gap-2">
                <FaFilter className="text-muted d-none d-sm-inline" size={13} />
                <select
                  className="form-select form-select-sm"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{ width: 'auto', minWidth: '150px' }}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid or Empty State */}
        {filteredProducts.length > 0 ? (
          <div className="row g-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5 my-5 bg-light rounded-4 border">
            <h4 className="fw-bold mb-2">No items found matching your criteria</h4>
            <p className="text-muted mb-4">
              Try adjusting your search terms or department filters to see more results.
            </p>
            <button type="button" className="btn btn-fashion-primary" onClick={clearFilters}>
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Products;
