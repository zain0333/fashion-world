import React, { useState, useRef } from 'react';
import {
  FaFeatherAlt,
  FaWind,
  FaSearchPlus,
  FaCheckCircle,
  FaTshirt,
  FaInfoCircle
} from 'react-icons/fa';
import type { Product, FabricDetails } from '../data/products';

interface FabricInspectorProps {
  product: Product;
  className?: string;
}

export const FabricInspector: React.FC<FabricInspectorProps> = ({
  product,
  className = '',
}) => {
  const [isFlowAnimating, setIsFlowAnimating] = useState(true);
  const [zoomPos, setZoomPos] = useState<{ x: number; y: number; show: boolean }>({
    x: 50,
    y: 50,
    show: false,
  });

  const fabricContainerRef = useRef<HTMLDivElement>(null);

  // Fallback fabric details if not specifically defined
  const fabric: FabricDetails = product.fabricDetails || {
    composition: '100% Premium Eco-Certified Fabric Blend',
    weight: '280 GSM Balanced Weight',
    weave: 'Precision Interlock Knit',
    breathability: 'High 360° Permeability',
    stretch: 'Natural Dimensional Recovery',
    texturePattern: 'cotton',
    textureDescription: 'Artisan spun fabric engineered for superior softness, longevity, and elegant natural drape.',
    care: ['Machine wash cold gentle cycle', 'Do not bleach', 'Warm iron if needed'],
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!fabricContainerRef.current) return;
    const rect = fabricContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y, show: true });
  };

  const handleMouseLeave = () => {
    setZoomPos((prev) => ({ ...prev, show: false }));
  };

  // Determine drape ripple pattern style
  const patternType = fabric.texturePattern || 'cotton';

  return (
    <div className={`fabric-inspector-card p-3 p-md-4 rounded-4 ${className}`}>
      {/* Header with Title and Drape Physics Toggle */}
      <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
        <div>
          <div className="d-flex align-items-center gap-2">
            <span className="badge bg-warning bg-opacity-15 text-warning border border-warning border-opacity-25 small fw-bold px-2 py-1">
              <FaTshirt className="me-1" />
              Fabric & Texture Lab
            </span>
            <span className="text-muted small">Micro-Weave & Drape Physics</span>
          </div>
          <h4 className="fw-bold mb-0 mt-1" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem' }}>
            {fabric.composition}
          </h4>
        </div>

        <button
          type="button"
          className={`btn btn-sm ${isFlowAnimating ? 'btn-fashion-primary' : 'btn-outline-secondary'}`}
          onClick={() => setIsFlowAnimating(!isFlowAnimating)}
          title="Toggle Drape Wave Physics Animation"
          style={{ fontSize: '0.78rem' }}
        >
          <FaWind className="me-1" />
          <span>{isFlowAnimating ? 'Drape Wave Active' : 'Pause Flow'}</span>
        </button>
      </div>

      {/* Interactive Fabric Display & Micro-Zoom Showcase */}
      <div className="row g-4 align-items-center mb-4">
        {/* Fabric Swatch Stage with Wave Drape Physics Simulation */}
        <div className="col-lg-6">
          <div
            ref={fabricContainerRef}
            className={`fabric-swatch-stage rounded-4 overflow-hidden position-relative shadow-sm ${
              isFlowAnimating ? `flow-active flow-${patternType}` : ''
            }`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ height: '300px', cursor: 'crosshair' }}
          >
            {/* Background High-Res Texture Layer */}
            <img
              src={product.image}
              alt={`${product.name} Fabric Micro Texture`}
              className="w-100 h-100 object-fit-cover fabric-base-image"
            />

            {/* SVG Animated Cloth Drape Mesh Overlay */}
            <div className={`fabric-wave-overlay ${isFlowAnimating ? 'animating' : ''}`} />

            {/* Weave Micro-Grid Texture Overlay (Silk sheen, Twill rib, or Knit loops) */}
            <div className={`fabric-weave-grid weave-${patternType}`} />

            {/* Lens Magnifier on Hover */}
            {zoomPos.show && (
              <div
                className="fabric-magnifier-lens"
                style={{
                  left: `${zoomPos.x}%`,
                  top: `${zoomPos.y}%`,
                  backgroundImage: `url(${product.image})`,
                  backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                  backgroundSize: '400%',
                }}
              >
                <div className="magnifier-crosshair" />
              </div>
            )}

            {/* Floating Magnifier Guide Pill */}
            <div className="position-absolute bottom-0 start-0 m-3 px-2 py-1 rounded-pill bg-dark bg-opacity-75 text-white small d-inline-flex align-items-center gap-1">
              <FaSearchPlus size={11} />
              <span style={{ fontSize: '0.72rem' }}>Hover to magnify 400% micro-threads</span>
            </div>
          </div>
        </div>

        {/* Fabric Performance & Tactile Metrics */}
        <div className="col-lg-6">
          <div className="p-3 bg-light rounded-3 border">
            <h6 className="fw-bold mb-3 d-flex align-items-center gap-2">
              <FaFeatherAlt className="text-warning" />
              <span>Tactile Feel & Weave Properties</span>
            </h6>

            {/* Weight Bar */}
            <div className="mb-3">
              <div className="d-flex justify-content-between small mb-1">
                <span className="text-muted">Fabric Weight & Density:</span>
                <span className="fw-semibold text-dark">{fabric.weight}</span>
              </div>
              <div className="progress" style={{ height: '6px' }}>
                <div className="progress-bar bg-dark" style={{ width: '78%' }} />
              </div>
            </div>

            {/* Weave Structure */}
            <div className="mb-3">
              <div className="d-flex justify-content-between small mb-1">
                <span className="text-muted">Weave Architecture:</span>
                <span className="fw-semibold text-dark">{fabric.weave}</span>
              </div>
              <div className="progress" style={{ height: '6px' }}>
                <div className="progress-bar bg-warning" style={{ width: '88%' }} />
              </div>
            </div>

            {/* Breathability & Airflow */}
            <div className="mb-3">
              <div className="d-flex justify-content-between small mb-1">
                <span className="text-muted">Breathability & Air Circulation:</span>
                <span className="fw-semibold text-dark">{fabric.breathability}</span>
              </div>
              <div className="progress" style={{ height: '6px' }}>
                <div className="progress-bar bg-success" style={{ width: '92%' }} />
              </div>
            </div>

            {/* Stretch & Recovery */}
            <div className="mb-2">
              <div className="d-flex justify-content-between small mb-1">
                <span className="text-muted">Stretch & Crease Recovery:</span>
                <span className="fw-semibold text-dark">{fabric.stretch}</span>
              </div>
              <div className="progress" style={{ height: '6px' }}>
                <div className="progress-bar bg-info" style={{ width: '82%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Care Recommendations */}
      <div className="p-3 bg-light rounded-3 border">
        <p className="text-muted small mb-3">
          <FaInfoCircle className="text-warning me-1" />
          {fabric.textureDescription}
        </p>

        <div className="d-flex flex-wrap gap-2 align-items-center pt-2 border-top">
          <span className="text-muted small fw-semibold me-2">Garment Care:</span>
          {fabric.care.map((item, idx) => (
            <span key={idx} className="badge bg-white text-dark border small fw-normal py-1 px-2">
              <FaCheckCircle className="text-success me-1" size={10} />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FabricInspector;
