import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import type { Category } from '../data/products';

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link to={`/products?category=${category.name}`} className="category-card text-decoration-none">
      <img src={category.image} alt={category.name} className="category-card-img" loading="lazy" />
      <div className="category-overlay">
        <span className="small text-warning text-uppercase fw-bold" style={{ letterSpacing: '1.5px', fontSize: '0.75rem' }}>
          {category.itemCount} Items
        </span>
        <h4 className="fw-bold mb-1 text-white">{category.name}</h4>
        <div className="d-flex align-items-center gap-1 small text-white-50 mt-1">
          <span>Explore Collection</span>
          <FaArrowRight size={11} />
        </div>
      </div>
    </Link>
  );
};
export default CategoryCard;
