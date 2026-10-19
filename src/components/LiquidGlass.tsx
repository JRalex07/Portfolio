import React from 'react';

export type SkeuoLevel = 'subtle' | 'interactive' | 'featured';
export type LiquidGlassLevel = SkeuoLevel;

export interface SkeuomorphicSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  level?: SkeuoLevel;
  inset?: boolean;
  pill?: boolean;
  elevation?: 'flat' | 'elevated' | 'floating';
  radius?: number | string;
  children?: React.ReactNode;
  optics?: any; // Kept for backwards-compatibility with previous call sites
}

export type LiquidGlassContainerProps = SkeuomorphicSurfaceProps;

/**
 * Skeuomorphic presets providing physical depth, tactile materials,
 * directional lighting highlights, and debossed/embossed contours.
 */
export const SKEUO_PRESETS = {
  subtle: {
    background: 'var(--skeuo-inset-bg)',
    border: 'var(--skeuo-inset-border)',
    boxShadow: 'var(--skeuo-inset-shadow)',
  },
  interactive: {
    background: 'var(--skeuo-plate-bg)',
    border: 'var(--skeuo-plate-border)',
    boxShadow: 'var(--skeuo-plate-shadow)',
  },
  featured: {
    background: 'var(--skeuo-chassis-bg)',
    border: 'var(--skeuo-chassis-border)',
    boxShadow: 'var(--skeuo-chassis-shadow)',
  },
};

export const GLASS_PRESETS = SKEUO_PRESETS;

/**
 * SkeuomorphicSurface component
 * Replaces glassmorphism with tactile, physical skeuomorphism:
 * solid opaque materials, directional specular highlights, chiseled bevels,
 * and tangible drop shadows. No blurry transparent membranes.
 */
export const SkeuomorphicSurface: React.FC<SkeuomorphicSurfaceProps> = ({
  level = 'interactive',
  inset = false,
  pill = false,
  elevation = 'elevated',
  className = '',
  style = {},
  radius,
  children,
  optics, // unused in skeuomorphism
  ...restProps
}) => {
  const preset = inset ? SKEUO_PRESETS.subtle : SKEUO_PRESETS[level];

  const computedRadius =
    radius !== undefined
      ? radius
      : pill
        ? 9999
        : level === 'featured'
          ? 44
          : 36;

  const elevationClass =
    elevation === 'floating'
      ? 'skeuo-elevated-floating'
      : elevation === 'flat'
        ? 'skeuo-elevated-flat'
        : 'skeuo-elevated-standard';

  return (
    <div
      className={`skeuo-surface skeuo-tier-${level} ${elevationClass} ${inset ? 'skeuo-inset-well' : 'skeuo-raised-plate'} ${pill ? 'pill-shape' : ''} ${className}`}
      style={{
        background: preset.background,
        border: preset.border,
        boxShadow: preset.boxShadow,
        borderRadius:
          typeof computedRadius === 'number'
            ? `${computedRadius}px`
            : computedRadius,
        position: 'relative',
        transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
        ...style,
      }}
      {...restProps}
    >
      {/* Top Specular Ridge Bevel */}
      {!inset && (
        <div
          className="skeuo-specular-ridge"
          style={{
            position: 'absolute',
            top: 0,
            left: '20px',
            right: '20px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.28), rgba(56, 189, 248, 0.45), rgba(255, 255, 255, 0.28), transparent)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />
      )}
      {children}
    </div>
  );
};

// Aliases for seamless drop-in backwards compatibility
export const LiquidGlass = SkeuomorphicSurface;
export default SkeuomorphicSurface;
