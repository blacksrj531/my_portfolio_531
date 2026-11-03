# Soumya Ranjan Jena — Creative Technologist & Full Stack Software Engineer

> High-performance WebGL/Three.js interactive experience featuring client-side compute, generative shaders, and living ambient chronobiological themes.

![Preview](https://raw.githubusercontent.com/blacksrj531/my_portfolio_531/main/preview.png) *(Optional preview screenshot)*

## ✨ Key Architectural Highlights

- **Dynamic Chronobiological Atmosphere**: Multi-octave FBM fluid shaders bound strictly to an astronomical 5-phase schedule (Dawn, Morning, High-Noon, Sunset, and Cosmic Night).
- **Physical Atmospheric Optics Layer**: Dynamic, realistic glass water droplets with condensation trickle trails, volumetric solar god-ray shimmers, and ground-level horizon mist overlays decoupled from the base fluid shader.
- **Micro-Haptic Synthesizer Sound Engine**: Pentatonic glass harmonic synthesizer powered by the Web Audio API with velocity-mapped scroll harmonics.
- **Tactile 3D Bento Grid & Physics**: Interactive 3D gyroscopic tilt and mouse velocity inertia.
- **Mobile Orbital Rotary Dial**: Adaptive North-West thumb arc radial speed dial for mobile ergonomics.
- **Zero-Dependency Core**: Pure Vanilla JavaScript (ES2022+), CSS3 with hardware-accelerated transforms, and Three.js / GSAP.

## 🔬 Mobile WebGL & GPU Engineering (Precision Shading Fixes)

A hallmark of high-caliber graphics engineering is ensuring complex shaders render with identical fidelity across both discrete desktop GPUs and heterogeneous mobile chipsets (Qualcomm Adreno, ARM Mali, Apple Silicon):

| Engineering Challenge | Root Cause Identified | Production Solution Implemented |
| :--- | :--- | :--- |
| **Mobile Noise Pixelation & Banding** | Mobile WebGL standard fallback defaults to 16-bit float (`precision mediump float;`), truncating the mantissa during multi-octave Simplex Noise / domain-warped FBM matrix transforms, resulting in visible blocky noise artifacts. | Enforced 32-bit float (`precision highp float;`) across GLSL vertex and fragment pipelines with `#ifdef GL_FRAGMENT_PRECISION_HIGH` fallbacks, calculating smooth micro-gradients with zero stair-stepping. |
| **Low-DPI Canvas Blur on Mobile** | Hardcoded `1.0` DPR downsampling on mobile viewports stretched low-res raster buffers across ultra-high-density mobile screens (2.5x–3.5x physical pixel ratio). | Upgraded mobile device pixel ratio dynamically to `Math.min(window.devicePixelRatio, 1.75)` — delivering crisp, retina-grade organic liquid surfaces while preserving thermal and battery budgets. |
| **Vertical Aspect Ratio Distortion** | Standard $(0 \to 1)$ UV coordinates mapped onto tall, narrow mobile viewports ($9:20$ / $9:21$ aspect ratio) squished and vertically stretched noise waves. | Injected viewport resolution uniform (`uResolution`) into fragment pipeline, applying aspect-ratio coordinate normalization (`vec2 st = vec2((vUv.x - 0.5) * max(aspect, 0.65) + 0.5, vUv.y) * 2.8;`) for organic fluid curves on portrait screens. |
| **Weather vs. Chronobiology Decoupling** | Meteorological telemetry overrides inadvertently hijacked time-of-day fluid colors with daytime tones during evening windows. | Decoupled the shader architecture: locked base fluid river strictly to user's 5-phase chronobiological schedule table, while overlaying weather conditions (raindrops, god-rays, dawn mist) as non-intrusive optical particle layers on top. |

## 📁 Repository Structure

```
my_portfolio_531/
├── index.html        # Semantic HTML5 structure with Open Graph & schema metadata
├── styles.css        # Responsive styling, CSS custom properties, and GPU keyframes
├── script.js         # WebGL shader logic, Web Audio synthesizer, and telemetry
├── vercel.json       # Strict security headers and edge cache configuration
├── .gitignore        # Clean VCS tracking rules
└── README.md         # Documentation
```

## 🛡️ Security & Performance Standards

- **Zero Insecure External Protocol Calls**: 100% HTTPS encrypted CDNs and endpoints.
- **Reverse Tabnabbing Mitigation**: Strict `rel="noopener noreferrer"` across all outbound anchor elements.
- **HTTP Security Headers**: Enforced `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and `Referrer-Policy: strict-origin-when-cross-origin`.
- **Power & Thermal Optimization**: Automatically freezes animation frame renderers upon tab unfocus via `document.visibilitychange`.

## 🚀 Deployment

This project is fully static and zero-build. It deploys out-of-the-box to:
- [Vercel](https://vercel.com) (configured via `vercel.json`)
- [GitHub Pages](https://pages.github.com)
- [Netlify](https://netlify.com)

---
© 2026 Soumya Ranjan Jena. All rights reserved.
