// ═══════════════════════════════════════════════════════════════════════════
// SCRIPT.JS — GOD-TIER CHROMATIC QUANTUM LIQUID & HYPER-PHYSICS ENGINE
// - Multi-Octave FBM Domain-Warped GLSL Fluid Shader (Pure White & Blue)
// - Floating Kinetic 3D Quantum Diamond Torus-Knot Sculpture
// - Generative Ambient Soundscape via Web Audio API (Pentatonic Glass Chimes)
// - 3D Interactive Gyroscopic Tilt Physics on Bento Cards
// - Interactive Cursor Velocity Physics & Quantum Ripple Shockwave
// - Lenis Smooth Kinetic Inertia Tethered to GSAP Master RAF Loop
// - Zero-Telemetry Regional Climate Detection with 15-Minute Local Caching
// ═══════════════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  const isMobile = window.innerWidth <= 768;
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ─────────────────────────────────────────────────────────────────────────
  // 01. LENIS SMOOTH MOMENTUM SCROLL ENGINE
  // ─────────────────────────────────────────────────────────────────────────
  let lenis = null;
  if (typeof Lenis !== 'undefined' && !prefersReducedMotion) {
    lenis = new Lenis({
      duration: isMobile ? 1.0 : 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 1.8
    });

    lenis.on('scroll', ScrollTrigger.update);

    // Tether to GSAP Master Ticker — Zero duplicate frame cycles
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  // Handle smooth anchored jumping
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          if (lenis) {
            lenis.scrollTo(targetElement, { offset: -60, duration: 1.2 });
          } else {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    });
  });

  // Track global scroll velocity for shader reactivity
  let scrollProgress = 0;
  let scrollVelocity = 0;
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress = maxScroll > 0 ? currentY / maxScroll : 0;
    scrollVelocity = (currentY - lastScrollY) * 0.05;
    lastScrollY = currentY;
  }, { passive: true });

  // ─────────────────────────────────────────────────────────────────────────
  // 02. GENERATIVE WEBAUDIO AMBIENT HARMONIZER (GOD-TIER SOUND TOUCH)
  // ─────────────────────────────────────────────────────────────────────────
  let audioCtx = null;
  let isSoundActive = false;
  let masterGain = null;
  const pentatonicScale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25]; // C D E G A in Hz

  function initAudioEngine() {
    if (audioCtx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    audioCtx = new AudioContext();

    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    masterGain.connect(audioCtx.destination);
  }

  function playGlassChime(pitchMultiplier = 1.0) {
    if (!isSoundActive || !audioCtx) return;
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const panner = audioCtx.createStereoPanner ? audioCtx.createStereoPanner() : null;

      const baseFreq = pentatonicScale[Math.floor(Math.random() * pentatonicScale.length)];
      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq * pitchMultiplier, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);

      if (panner) {
        panner.pan.setValueAtTime((Math.random() * 2) - 1, audioCtx.currentTime);
        osc.connect(gain);
        gain.connect(panner);
        panner.connect(masterGain);
      } else {
        osc.connect(gain);
        gain.connect(masterGain);
      }

      osc.start();
      osc.stop(audioCtx.currentTime + 1.25);
    } catch (e) {}
  }

  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');

  function updateSoundUI() {
    if (soundIcon) {
      soundIcon.className = isSoundActive ? 'fas fa-volume-high' : 'fas fa-volume-xmark';
    }
    if (soundToggleBtn) {
      if (isSoundActive) {
        soundToggleBtn.classList.add('is-active');
        soundToggleBtn.setAttribute('aria-pressed', 'true');
        soundToggleBtn.setAttribute('title', 'Synthesizer Audio: ON (Click to Mute)');
      } else {
        soundToggleBtn.classList.remove('is-active');
        soundToggleBtn.setAttribute('aria-pressed', 'false');
        soundToggleBtn.setAttribute('title', 'Synthesizer Audio: OFF (Click to Enable)');
      }
    }
  }

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      initAudioEngine();
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      isSoundActive = !isSoundActive;
      updateSoundUI();
      if (isSoundActive) {
        playGlassChime(1.5);
      }
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 03. ADVANCED MULTI-OCTAVE FBM GLSL FLUID SHADER
  // ─────────────────────────────────────────────────────────────────────────
  const webglContainer = document.getElementById('webgl-container');
  let scene, camera, renderer;
  let fluidMesh, fluidMaterial;
    let mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5, velX: 0, velY: 0, lastX: 0.5, lastY: 0.5 };
  let isSceneVisible = true;
  let rippleBurst = 0.0;

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    uniform float uTime;
    uniform float uScroll;
    uniform vec2 uMouse;
    uniform float uRipple;
    uniform float uRainActive;

    void main() {
      vUv = uv;
      vec3 pos = position;

      // Multidirectional Harmonic Surface Waves
      float w1 = sin(pos.x * 2.2 + uTime * 0.8) * cos(pos.y * 1.8 + uTime * 0.7) * 0.35;
      float w2 = sin(pos.x * 4.5 - uTime * 1.1 + uScroll * 4.0) * sin(pos.y * 3.8 + uTime * 0.9) * 0.18;
      
      // Interactive Cursor Kinetic Swell
      float distToMouse = distance(uv, uMouse);
      float mouseSwell = smoothstep(0.45, 0.0, distToMouse) * (0.38 + uRipple * 0.7);

      pos.z += w1 + w2 + mouseSwell;
      vPosition = pos;
      vNormal = normal;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  // Fractal Brownian Motion (FBM) with Domain Warping & Electric Blue Iridescence
  const fragmentShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform vec3 uColorC;
    uniform vec3 uColorD;
    uniform float uExposure;
    uniform float uRipple;
    uniform float uRainActive;

    // Fast GLSL Simplex Noise
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    // Domain Warped Fractal Brownian Motion
    float fbm(vec2 p) {
      float f = 0.0;
      mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
      f += 0.5500 * snoise(p); p = m * p;
      f += 0.2800 * snoise(p); p = m * p;
      f += 0.1700 * snoise(p);
      return f;
    }

    void main() {
      vec2 st = vUv * 2.8;
      
      // Domain warping vectors
      vec2 q = vec2(
        fbm(st + vec2(0.0, 0.0) + uTime * 0.15),
        fbm(st + vec2(5.2, 1.3) + uTime * 0.12)
      );

      vec2 r = vec2(
        fbm(st + 4.0 * q + vec2(1.7, 9.2) + uTime * 0.22),
        fbm(st + 4.0 * q + vec2(8.3, 2.8) + uTime * 0.18)
      );

      float f = fbm(st + 4.0 * r);

      // Four-point chromatic color blending
      vec3 col1 = mix(uColorA, uColorB, clamp((f*f)*4.0, 0.0, 1.0));
      vec3 col2 = mix(uColorC, uColorD, clamp(length(q), 0.0, 1.0));
      vec3 finalCol = mix(col1, col2, clamp(length(r.x), 0.0, 1.0));

      // Specular electric cyan wave crest highlights
      float fresnel = pow(1.0 - abs(vPosition.z * 1.3), 3.0);
      finalCol += vec3(0.02, 0.22, 0.45) * fresnel * 0.65;

      // Interactive Cursor & Shockwave shimmer
      float rippleDist = distance(vUv, uMouse);
      float shock = sin(rippleDist * 32.0 - uTime * 8.0) * uRipple * 0.18;
      finalCol += vec3(0.1, 0.3, 0.6) * clamp(shock, 0.0, 1.0);

      // Raindrop Micro-Eddy physics (activated when raining)
      float drop1 = sin(vUv.x * 24.0 + uTime * 4.2) * cos(vUv.y * 24.0 + uTime * 3.8);
      float drop2 = sin((vUv.x - vUv.y) * 36.0 - uTime * 5.0);
      finalCol += vec3(0.04, 0.08, 0.14) * clamp(drop1 * drop2 * uRainActive, 0.0, 1.0);

      gl_FragColor = vec4(finalCol * uExposure, 1.0);
    }
  `;

  // ─────────────────────────────────────────────────────────────────────────
  // 04. PURE WHITE & BLUE ATMOSPHERIC PALETTES
  // ─────────────────────────────────────────────────────────────────────────
    // ═════════════════════════════════════════════════════════════════════════
  // 04. COMPREHENSIVE LIVING AMBIENT CHRONOBIOLOGICAL PALETTES
  // ═════════════════════════════════════════════════════════════════════════
  const IRIDESCENT_PALETTES = {
    dawn: {
      key: 'dawn',
      title: 'DAWN (MIST)',
      icon: '<i class="fas fa-smog" style="color:#0284c7;"></i>',
      bodyClass: 'theme-dawn',
      colorA: new THREE.Color('#ffffff'), // Luminous White Mist
      colorB: new THREE.Color('#dbeafe'), // Soft Periwinkle Fog
      colorC: new THREE.Color('#38bdf8'), // Morning Azure
      colorD: new THREE.Color('#f0f9ff'), // Cool Morning Ice
      crystalColor: 0x38bdf8,
      exposure: 1.04,
      rainActive: 0.0
    },
    morning: {
      key: 'morning',
      title: 'MORNING (CRISP)',
      icon: '<i class="fas fa-cloud-sun" style="color:#f59e0b;"></i>',
      bodyClass: 'theme-morning',
      colorA: new THREE.Color('#ffffff'), // Studio Pure White
      colorB: new THREE.Color('#dbeafe'), // Soft Glacier Blue
      colorC: new THREE.Color('#38bdf8'), // Vibrant Sky Blue
      colorD: new THREE.Color('#eff6ff'), // Luminous Ice Mist
      crystalColor: 0x0284c7,
      exposure: 1.05,
      rainActive: 0.0
    },
    noon: {
      key: 'noon',
      title: 'NOON (SUN YELLOW)',
      icon: '<i class="fas fa-sun" style="color:#f59e0b;"></i>',
      bodyClass: 'theme-noon',
      colorA: new THREE.Color('#fefce8'), // Sunlit Radiant White
      colorB: new THREE.Color('#fde047'), // Bright Solar Lemon Yellow
      colorC: new THREE.Color('#fbbf24'), // Warm Liquid Amber
      colorD: new THREE.Color('#f59e0b'), // Radiant Honey Gold
      crystalColor: 0xfbbf24,
      exposure: 1.08,
      rainActive: 0.0
    },
    sunset: {
      key: 'sunset',
      title: 'SUNSET (DUSK)',
      icon: '<i class="fas fa-cloud-sun" style="color:#f43f5e;"></i>',
      bodyClass: 'theme-sunset',
      colorA: new THREE.Color('#fff1f2'), // Radiant Pearl White
      colorB: new THREE.Color('#fed7aa'), // Apricot Twilight Gold
      colorC: new THREE.Color('#f43f5e'), // Radiant Twilight Crimson
      colorD: new THREE.Color('#e11d48'), // Ruby Sunset Sheen
      crystalColor: 0xf43f5e,
      exposure: 1.05,
      rainActive: 0.0
    },
    night: {
      key: 'night',
      title: 'COSMIC SPACE',
      icon: '<i class="fas fa-moon" style="color:#6366f1;"></i>',
      bodyClass: 'theme-night',
      colorA: new THREE.Color('#020617'), // Deepest Cosmic Abyss
      colorB: new THREE.Color('#0f172a'), // Midnight Slate
      colorC: new THREE.Color('#1e1b4b'), // Starlit Violet Nebula
      colorD: new THREE.Color('#0284c7'), // Luminescent Electric Cyan
      crystalColor: 0x38bdf8,
      exposure: 1.22,
      rainActive: 0.0
    },
    rain: {
      key: 'rain',
      title: 'PRECIPITATION',
      icon: '<i class="fas fa-cloud-showers-heavy" style="color:#0284c7;"></i>',
      bodyClass: 'theme-rain',
      colorA: new THREE.Color('#f8fafc'), // Cloud Vapor White
      colorB: new THREE.Color('#bae6fd'), // Raindrop Azure
      colorC: new THREE.Color('#38bdf8'), // Crisp Electric Cyan
      colorD: new THREE.Color('#64748b'), // Storm Slate
      crystalColor: 0x0284c7,
      exposure: 1.03,
      rainActive: 1.0
    },
    snow: {
      key: 'snow',
      title: 'WINTER FROST',
      icon: '<i class="fas fa-snowflake" style="color:#38bdf8;"></i>',
      bodyClass: 'theme-snow',
      colorA: new THREE.Color('#ffffff'), // Diamond Frost White
      colorB: new THREE.Color('#dbeafe'), // Arctic Blue
      colorC: new THREE.Color('#93c5fd'), // Ice Crystal
      colorD: new THREE.Color('#f0f9ff'), // Glacial Silver
      crystalColor: 0x38bdf8,
      exposure: 1.08,
      rainActive: 0.0
    },
    spring: {
      key: 'spring',
      title: 'SPRING BLOSSOM',
      icon: '<i class="fas fa-seedling" style="color:#10b981;"></i>',
      bodyClass: 'theme-spring',
      colorA: new THREE.Color('#fff1f2'), // Sakura Blossom Pearl
      colorB: new THREE.Color('#ccfbf1'), // Meadow Aqua
      colorC: new THREE.Color('#fbcfe8'), // Powder Petal Pink
      colorD: new THREE.Color('#e0f2fe'), // Vernal Breeze
      crystalColor: 0x2dd4bf,
      exposure: 1.06,
      rainActive: 0.0
    }
  };

  let activePalette = IRIDESCENT_PALETTES.morning;
  let manualPreviewIndex = -1;
  const PREVIEW_CYCLES = ['dawn', 'morning', 'noon', 'sunset', 'night', 'rain', 'snow', 'spring'];

  // Astronomical Seasonal Intelligence (Northern / Southern Hemisphere aware)
  function getAstronomicalSeason(monthIndex, isSouthernHemisphere = false) {
    // monthIndex: 0 = Jan, 11 = Dec
    let season = 'spring';
    if (monthIndex === 11 || monthIndex === 0 || monthIndex === 1) season = 'winter';
    else if (monthIndex >= 2 && monthIndex <= 4) season = 'spring';
    else if (monthIndex >= 5 && monthIndex <= 7) season = 'summer';
    else season = 'autumn';

    if (isSouthernHemisphere) {
      const invert = { winter: 'summer', summer: 'winter', spring: 'autumn', autumn: 'spring' };
      season = invert[season] || season;
    }
    return season;
  }

  // Chronobiological Time-of-Day phase
  function getLocalTimePhase(hour) {
    if (hour >= 4 && hour < 7) return 'dawn';
    if (hour >= 7 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 16.5) return 'noon';
    if (hour >= 16.5 && hour < 19.5) return 'sunset';
    return 'night';
  }

  function applyAtmosphere(paletteKey) {
    activePalette = IRIDESCENT_PALETTES[paletteKey] || IRIDESCENT_PALETTES.morning;

    document.body.classList.remove(
      'theme-dawn', 'theme-morning', 'theme-day', 'theme-noon', 
      'theme-sunset', 'theme-night', 'theme-rain', 'theme-snow', 'theme-spring'
    );
    document.body.classList.add(activePalette.bodyClass);

    if (fluidMaterial) {
      fluidMaterial.uniforms.uColorA.value.copy(activePalette.colorA);
      fluidMaterial.uniforms.uColorB.value.copy(activePalette.colorB);
      fluidMaterial.uniforms.uColorC.value.copy(activePalette.colorC);
      fluidMaterial.uniforms.uColorD.value.copy(activePalette.colorD);
      fluidMaterial.uniforms.uExposure.value = activePalette.exposure;
      if (fluidMaterial.uniforms.uRainActive) {
        fluidMaterial.uniforms.uRainActive.value = activePalette.rainActive || 0.0;
      }
    }


  }

  // ─────────────────────────────────────────────────────────────────────────
    // ─────────────────────────────────────────────────────────────────────────
  // 05. REGIONAL TELEMETRY WITH CACHING, SEASONAL MATH & INSTANT PREVIEW
  // ─────────────────────────────────────────────────────────────────────────
  const weatherCapsule = document.getElementById('weatherCapsule');
  const weatherIcon = document.getElementById('weatherIcon');
  const weatherLoc = document.getElementById('weatherLoc');
  const weatherDetail = document.getElementById('weatherDetail');

  let currentTelemetryState = {
    stateStr: 'ODISHA',
    countryStr: 'INDIA',
    tempStr: '--°C',
    conditionDesc: 'SYNCING',
    activeKey: 'morning',
    season: 'autumn',
    isNight: false
  };

  async function fetchWithTimeout(url, timeoutMs = 3500) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(id);
      return response;
    } catch (e) {
      clearTimeout(id);
      throw e;
    }
  }

  // Resolves the exact palette key based on time, weather condition, temperature and season
  function resolveTargetPaletteKey(timePhase, weatherCondition, tempC, season) {
    // 1. Extreme weather override
    if (weatherCondition === 'rain') return 'rain';
    if (weatherCondition === 'snow' || (tempC !== null && tempC <= 3)) return 'snow';
    if (weatherCondition === 'fog' || timePhase === 'dawn') return 'dawn';

    // 2. Cosmic Space Night override
    if (timePhase === 'night') return 'night';

    // 3. Sunset / Twilight Reddish Amber
    if (timePhase === 'sunset') return 'sunset';

    // 4. Noon / Bright Sun Yellow Flare
    if (timePhase === 'noon') return 'noon';

    // 5. Morning / Spring / Winter daytime nuances
    if (season === 'spring') return 'spring';
    if (season === 'winter') return 'snow';

    // Standard crisp morning
    return 'morning';
  }

  async function syncRegionalEnvironment() {
    const now = new Date();
    const localHour = now.getHours() + (now.getMinutes() / 60);
    const currentMonth = now.getMonth();
    let timePhase = getLocalTimePhase(localHour);
    let weatherCondition = 'clear';
    let tempC = 26;
    let tempStr = '26°C';
    let stateStr = 'ODISHA';
    let countryStr = 'INDIA';
    let conditionDesc = 'CLEAR';
    let season = getAstronomicalSeason(currentMonth, false);

    const normalizeStateName = (s) => (!s ? '' : (s.trim().toLowerCase() === 'orissa' ? 'Odisha' : s.trim()));

    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      if (tz.includes('/')) countryStr = tz.split('/')[0].replace(/_/g, ' ');
    } catch (e) {}

    const CACHE_KEY = 'srj_jb_climate_cache';
    try {
      const stored = sessionStorage.getItem(CACHE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Date.now() - parsed.timestamp < 15 * 60 * 1000) {
          stateStr = parsed.stateStr || stateStr;
          countryStr = parsed.countryStr || countryStr;
          tempStr = parsed.tempStr || tempStr;
          conditionDesc = parsed.conditionDesc || conditionDesc;
          weatherCondition = parsed.weatherCondition || weatherCondition;
          timePhase = parsed.isNight ? 'night' : timePhase;
          season = parsed.season || season;
          tempC = parsed.tempC !== undefined ? parsed.tempC : tempC;

          const key = resolveTargetPaletteKey(timePhase, weatherCondition, tempC, season);
          currentTelemetryState = { stateStr, countryStr, tempStr, conditionDesc, activeKey: key, season, isNight: timePhase === 'night' };
          applyAtmosphere(key);
          renderHUD(stateStr, countryStr, tempStr, conditionDesc, key);
          return;
        }
      }
    } catch (e) {}

    let initialKey = resolveTargetPaletteKey(timePhase, weatherCondition, tempC, season);
    applyAtmosphere(initialKey);
    renderHUD(stateStr, countryStr, tempStr, conditionDesc, initialKey);

    let fetchedSuccess = false;

    try {
      const ipRes = await fetchWithTimeout('https://ipapi.co/json/', 3200);
      if (ipRes.ok) {
        const ipData = await ipRes.json();
        const detected = normalizeStateName(ipData.region || ipData.region_code || '');
        if (detected) stateStr = detected;
        countryStr = ipData.country_name || countryStr;

        const isSouthern = (ipData.latitude && ipData.latitude < 0);
        season = getAstronomicalSeason(currentMonth, isSouthern);

        if (ipData.latitude && ipData.longitude) {
          const omUrl = `https://api.open-meteo.com/v1/forecast?latitude=${ipData.latitude}&longitude=${ipData.longitude}&current=temperature_2m,weather_code,is_day&timezone=auto`;
          const omRes = await fetchWithTimeout(omUrl, 3200);
          if (omRes.ok) {
            const omData = await omRes.json();
            if (omData.current) {
              tempC = Math.round(omData.current.temperature_2m);
              tempStr = `${tempC}°C`;
              const code = omData.current.weather_code;
              timePhase = omData.current.is_day === 0 ? 'night' : getLocalTimePhase(localHour);

              if ([51,53,55,61,63,65,80,81,82,95,96].includes(code)) {
                weatherCondition = 'rain';
                conditionDesc = 'Rain';
              } else if ([71,73,75,77,85,86].includes(code)) {
                weatherCondition = 'snow';
                conditionDesc = 'Snow';
              } else if ([45,48].includes(code)) {
                weatherCondition = 'fog';
                conditionDesc = 'Mist / Fog';
              } else {
                weatherCondition = 'clear';
                conditionDesc = omData.current.is_day === 1 ? 'Sunny' : 'Clear Night';
              }
              fetchedSuccess = true;
            }
          }
        }
      }
    } catch (e) {}

    if (!fetchedSuccess) {
      try {
        const res = await fetchWithTimeout('https://wttr.in/?format=j1', 3200);
        if (res.ok) {
          const data = await res.json();
          const area = data.nearest_area?.[0];
          const curr = data.current_condition?.[0];
          if (area) {
            const detected = normalizeStateName(area.region?.[0]?.value || '');
            if (detected) stateStr = detected;
            countryStr = area.country?.[0]?.value || countryStr;
          }
          if (curr) {
            tempC = parseInt(curr.temp_C, 10);
            tempStr = `${curr.temp_C}°C`;
            conditionDesc = curr.weatherDesc?.[0]?.value || 'Clear';
            const desc = conditionDesc.toLowerCase();
            weatherCondition = desc.includes('rain') ? 'rain' : (desc.includes('snow') ? 'snow' : (desc.includes('fog') ? 'fog' : 'clear'));
            fetchedSuccess = true;
          }
        }
      } catch (e) {}
    }

    const finalKey = resolveTargetPaletteKey(timePhase, weatherCondition, tempC, season);
    currentTelemetryState = { stateStr, countryStr, tempStr, conditionDesc, activeKey: finalKey, season, isNight: timePhase === 'night' };

    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({
        timestamp: Date.now(),
        stateStr,
        countryStr,
        tempStr,
        tempC,
        conditionDesc,
        weatherCondition,
        season,
        isNight: timePhase === 'night'
      }));
    } catch (e) {}

    applyAtmosphere(finalKey);
    renderHUD(stateStr, countryStr, tempStr, conditionDesc, finalKey);
  }

  function renderHUD(state, country, temp, desc, paletteKey) {
    if (!weatherCapsule) return;
    const pal = IRIDESCENT_PALETTES[paletteKey] || IRIDESCENT_PALETTES.morning;
    if (weatherIcon) weatherIcon.innerHTML = pal.icon;
    if (weatherLoc) weatherLoc.textContent = country ? `${state.toUpperCase()}, ${country.toUpperCase()}` : state.toUpperCase();
    if (weatherDetail) weatherDetail.textContent = `${temp} • ${pal.title}`;
  }

  // Interactive Celestial & Weather Capsule Switcher inside Unified Action Dock
  if (weatherCapsule) {
    weatherCapsule.style.cursor = 'pointer';
    weatherCapsule.addEventListener('click', () => {
      manualPreviewIndex = (manualPreviewIndex + 1) % PREVIEW_CYCLES.length;
      const previewKey = PREVIEW_CYCLES[manualPreviewIndex];
      applyAtmosphere(previewKey);
      renderHUD(
        currentTelemetryState.stateStr, 
        currentTelemetryState.countryStr, 
        currentTelemetryState.tempStr, 
        'PREVIEW', 
        previewKey
      );
      playGlassChime(1.4);

      // Micro-tactile spring bounce on the weather capsule
      gsap.fromTo(weatherCapsule, 
        { scale: 0.94 }, 
        { scale: 1.0, duration: 0.4, ease: 'back.out(2)' }
      );
    });
  }

  // 06. THREE.JS INITIALIZATION (HYBRID SHADER + QUANTUM TORUS KNOT)
  // ─────────────────────────────────────────────────────────────────────────
  if (typeof THREE !== 'undefined' && webglContainer) {
    const initEnvironment = () => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
      camera.position.z = 2.8;

      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        powerPreference: 'default',
        precision: isMobile ? 'mediump' : 'highp'
      });
      renderer.setSize(window.innerWidth, window.innerHeight);

      const baseDPR = Math.min(window.devicePixelRatio || 1, isMobile ? 1.0 : 1.25);
      renderer.setPixelRatio(baseDPR);
      webglContainer.appendChild(renderer.domElement);

      renderer.domElement.addEventListener('webglcontextlost', (e) => {
        e.preventDefault();
        isSceneVisible = false;
      }, false);

      renderer.domElement.addEventListener('webglcontextrestored', () => {
        initEnvironment();
        isSceneVisible = true;
      }, false);

      // 1. Screen-Space Domain-Warped Fluid Canvas (Oversized to eliminate empty side cutoffs)
      const planeSegments = isMobile ? 24 : 48;
      const dist = camera.position.z - (-1.0);
      const vFovRad = (camera.fov * Math.PI) / 180;
      const visibleHeight = 2.0 * Math.tan(vFovRad / 2.0) * dist;
      const visibleWidth = visibleHeight * (window.innerWidth / window.innerHeight);
      // Multiply by 1.6 to ensure deep wave undulations never expose boundaries
      const planeGeo = new THREE.PlaneGeometry(Math.max(visibleWidth * 1.6, 12.0), Math.max(visibleHeight * 1.6, 8.0), planeSegments, planeSegments);
      fluidMaterial = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uScroll: { value: 0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uRipple: { value: 0 },
          uRainActive: { value: 0.0 },
          uColorA: { value: activePalette.colorA },
          uColorB: { value: activePalette.colorB },
          uColorC: { value: activePalette.colorC },
          uColorD: { value: activePalette.colorD },
          uExposure: { value: activePalette.exposure }
        },
        depthWrite: false,
        depthTest: false
      });

      fluidMesh = new THREE.Mesh(planeGeo, fluidMaterial);
      fluidMesh.position.z = -1.0;
      scene.add(fluidMesh);



      window.addEventListener('resize', onWindowResize, { passive: true });
      if (!isTouchDevice) {
        window.addEventListener('mousemove', onMouseMove, { passive: true });
      }

      syncRegionalEnvironment();
      startMasterTicker();
    };

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);

      if (fluidMesh) {
        const dist = camera.position.z - (-1.0);
        const vFovRad = (camera.fov * Math.PI) / 180;
        const visibleHeight = 2.0 * Math.tan(vFovRad / 2.0) * dist;
        const visibleWidth = visibleHeight * camera.aspect;
        const targetWidth = Math.max(visibleWidth * 1.6, 12.0);
        const targetHeight = Math.max(visibleHeight * 1.6, 8.0);
        fluidMesh.scale.set(targetWidth / 12.0, targetHeight / 8.0, 1.0);
      }
    };

    const onMouseMove = (e) => {
      mouse.targetX = e.clientX / window.innerWidth;
      mouse.targetY = 1.0 - (e.clientY / window.innerHeight);

      // Mouse velocity
      mouse.velX = mouse.targetX - mouse.lastX;
      mouse.velY = mouse.targetY - mouse.lastY;
      mouse.lastX = mouse.targetX;
      mouse.lastY = mouse.targetY;
    };

    // ─────────────────────────────────────────────────────────────────────────
    // MASTER UNIFIED TICKER (GSAP-TETHERED 120 FPS RAF)
    // ─────────────────────────────────────────────────────────────────────────
    let lastFrameTime = 0;
    const targetInterval = isMobile ? 1000 / 30 : 1000 / 60; // 30 FPS on mobile, 60 FPS on desktop

    const renderSceneFrame = (timeMs) => {
      if (!isSceneVisible) return;
      if (prefersReducedMotion) return;

      const now = timeMs || performance.now();
      if (now - lastFrameTime < targetInterval) return;
      lastFrameTime = now;

      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      if (rippleBurst > 0.001) {
        rippleBurst *= 0.94;
      } else {
        rippleBurst = 0.0;
      }


      const timeSec = (timeMs || performance.now()) * 0.001;

      if (fluidMaterial) {
        fluidMaterial.uniforms.uTime.value = timeSec;
        fluidMaterial.uniforms.uScroll.value = scrollProgress;
        fluidMaterial.uniforms.uMouse.value.set(mouse.x, mouse.y);
        fluidMaterial.uniforms.uRipple.value = rippleBurst;
      }



      renderer.render(scene, camera);
    };

    const startMasterTicker = () => {
      gsap.ticker.add((time, deltaTime, frame) => {
        renderSceneFrame(time * 1000);
      });
    };

    initEnvironment();

    document.addEventListener('visibilitychange', () => {
      isSceneVisible = !document.hidden;
      if (!document.hidden) {
        // Instant chronobiological re-check when user re-focuses or wakes device
        syncRegionalEnvironment();
      }
    });

    // Enterprise Chronobiological Daemon: check every 60 seconds
    setInterval(() => {
      syncRegionalEnvironment();
    }, 60000);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 08. 3D GYROSCOPIC TILT PHYSICS ON BENTO CARDS (GOD-TIER TACTILE)
  // ─────────────────────────────────────────────────────────────────────────
  if (!isTouchDevice && !prefersReducedMotion) {
    const tiltCards = document.querySelectorAll('.statement-large, .aside-box, .domain-card, .athletics-box, .work-item');
    
    tiltCards.forEach((card) => {
      let rect = null;

      card.addEventListener('mouseenter', () => {
        rect = card.getBoundingClientRect();
      });

      card.addEventListener('mousemove', (e) => {
        if (!rect) rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6.5; // Max 6.5deg
        const rotateY = ((x - centerX) / centerX) * 6.5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        
        // Dynamic specular glare shine
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        card.style.setProperty('--glare-x', `${glareX}%`);
        card.style.setProperty('--glare-y', `${glareY}%`);
      });

      card.addEventListener('mouseleave', () => {
        rect = null;
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 09. CURSOR PREVIEW MODAL & GSAP INTERACTIVE REVEALS
  // ─────────────────────────────────────────────────────────────────────────
  const cursorPreviewModal = document.getElementById('cursorPreviewModal');
  const cursorPreviewImg = document.getElementById('cursorPreviewImg');
  const cursorPreviewBadge = document.getElementById('cursorPreviewBadge');

  if (cursorPreviewModal && cursorPreviewImg && !isTouchDevice) {
    let previewPos = { x: -300, y: -300 };
    let targetPos = { x: -300, y: -300 };

    window.addEventListener('mousemove', (e) => {
      targetPos.x = e.clientX + 35;
      targetPos.y = e.clientY + 20;
    });

    const updatePreviewModal = () => {
      previewPos.x += (targetPos.x - previewPos.x) * 0.15;
      previewPos.y += (targetPos.y - previewPos.y) * 0.15;
      cursorPreviewModal.style.left = `${previewPos.x}px`;
      cursorPreviewModal.style.top = `${previewPos.y}px`;
      requestAnimationFrame(updatePreviewModal);
    };
    requestAnimationFrame(updatePreviewModal);

    const projectNodes = document.querySelectorAll('.work-item');
    projectNodes.forEach((item) => {
      item.addEventListener('mouseenter', () => {
        const previewUrl = item.getAttribute('data-preview-img');
        const previewType = item.getAttribute('data-preview-badge') || 'LIVE SYSTEM';
        if (previewUrl) {
          cursorPreviewImg.src = previewUrl;
          if (cursorPreviewBadge) cursorPreviewBadge.textContent = previewType;
          cursorPreviewModal.classList.add('active');
          document.body.classList.add('cursor-view-mode');
        }
      });

      item.addEventListener('mouseleave', () => {
        cursorPreviewModal.classList.remove('active');
        document.body.classList.remove('cursor-view-mode');
      });
    });
  }

  // GSAP Typography Split-Text Animations
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && !prefersReducedMotion) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to('.reveal-text', {
      y: '0%',
      duration: 1.1,
      stagger: 0.12,
      ease: 'power4.out',
      delay: 0.15
    });

    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach((item) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 92%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 25,
        duration: 0.75,
        ease: 'power3.out'
      });
    });
  } else {
    document.querySelectorAll('.reveal-text').forEach(el => el.style.transform = 'none');
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 10. TACTILE LIQUID GLASS CURSOR & MAGNETIC BUTTON PULL
  // ─────────────────────────────────────────────────────────────────────────
  if (!isTouchDevice && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !prefersReducedMotion) {
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    const cursorLabel = document.getElementById('cursorLabel');

    if (cursorDot && cursorRing) {
      let ringPos = { x: -100, y: -100 };
      let currentMouse = { x: -100, y: -100 };

      window.addEventListener('mousemove', (e) => {
        currentMouse.x = e.clientX;
        currentMouse.y = e.clientY;
        cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
        if (cursorLabel) {
          cursorLabel.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
        }
      });

      const updateRing = () => {
        ringPos.x += (currentMouse.x - ringPos.x) * 0.18;
        ringPos.y += (currentMouse.y - ringPos.y) * 0.18;
        cursorRing.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%)`;
        requestAnimationFrame(updateRing);
      };
      requestAnimationFrame(updateRing);

      const interactiveElements = document.querySelectorAll('a, button, .magnetic-btn, .domain-card, .dock-btn');
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          document.body.classList.add('cursor-hover');
          if (el.classList.contains('social-icon-link') || el.closest('.header-social-nav') || el.classList.contains('dock-btn')) {
            document.body.classList.add('cursor-hover-icon');
          }
          playGlassChime(1.1);
        });
        el.addEventListener('mouseleave', () => {
          document.body.classList.remove('cursor-hover');
          document.body.classList.remove('cursor-hover-icon');
        });
      });
    }

    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach((btn) => {
      let cachedRect = null;
      btn.addEventListener('mouseenter', () => {
        cachedRect = btn.getBoundingClientRect();
      });
      btn.addEventListener('mousemove', (e) => {
        if (!cachedRect) cachedRect = btn.getBoundingClientRect();
        const x = e.clientX - cachedRect.left - cachedRect.width / 2;
        const y = e.clientY - cachedRect.top - cachedRect.height / 2;
        btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        cachedRect = null;
        btn.style.transform = 'translate(0px, 0px)';
      });
    });
  }

  // Dynamic WhatsApp dynamic dispatch
  const whatsappBtn = document.getElementById('whatsappBtn');
  if (whatsappBtn) {
    const rawNumber = '7789056552';
    const msg = encodeURIComponent("Hello Soumya, I'm reaching out after exploring your cognitive architecture portfolio!");
    whatsappBtn.href = `https://wa.me/91${rawNumber}?text=${msg}`;
    whatsappBtn.setAttribute('target', '_blank');
    whatsappBtn.setAttribute('rel', 'noopener noreferrer');
  }

  


  console.log('⚡ God-Tier Quantum Liquid Canvas & Spatial Soundscape Engine Online.');

  
  // ─────────────────────────────────────────────────────────────────────────
  // SYNTHESIZER SOUND ON EVERY SCROLL (HARMONIC GLASS PENTATONIC FEEDBACK)
  // ─────────────────────────────────────────────────────────────────────────
  let lastScrollSoundY = window.scrollY;
  let scrollSoundThrottle = 0;

  function triggerScrollChime() {
    if (!isSoundActive || !audioCtx) return;
    const now = performance.now();
    if (now - scrollSoundThrottle < 120) return; // Prevent audio overload (plays every ~120ms of continuous scrolling)

    const deltaY = Math.abs(window.scrollY - lastScrollSoundY);
    if (deltaY > 18) {
      scrollSoundThrottle = now;
      lastScrollSoundY = window.scrollY;

      // Map scroll direction and velocity to pentatonic pitch register
      const velocityPitch = Math.min(2.2, 0.8 + (deltaY / 150));
      playGlassChime(velocityPitch);
    }
  }

  window.addEventListener('scroll', triggerScrollChime, { passive: true });
  if (typeof lenis !== 'undefined' && lenis) {
    lenis.on('scroll', triggerScrollChime);
  }


  // ─────────────────────────────────────────────────────────────────────────
  // MOBILE NORTH-WEST QUADRANT ROTARY DIAL (ROCK-SOLID ORBIT ENGINE)
  // ─────────────────────────────────────────────────────────────────────────
  const mobileDockTrigger = document.getElementById('mobileDockTrigger');
  const unifiedActionDock = document.getElementById('unifiedActionDock');
  const dockItemsWrapper = document.getElementById('dockItemsWrapper');
  const mobileDockBackdrop = document.getElementById('mobileDockBackdrop');

  if (mobileDockTrigger && unifiedActionDock && dockItemsWrapper) {
    const orbitItems = Array.from(dockItemsWrapper.children);
    const totalItems = orbitItems.length; // Dynamically measured dock items
    const ORBIT_RADIUS = 135; // Comfortable reach from corner (135px radius)

    // Current scroll offset of the rotary dial (index offset)
    let dialOffset = 0;
    let isDragging = false;
    let startY = 0;
    let startOffset = 0;

    /**
     * Positions all items along the North-West quadrant arc (from 180° = Left to 270° = Top)
     * When rotated, items glide along the thumb arc smoothly.
     */
    function updateRotaryDial(offset) {
      // Visible span covers North-West arc: from 185deg (left) up to 265deg (top)
      const arcStart = 185; 
      const arcEnd = 265;
      const angleSpan = arcEnd - arcStart; // 80 degrees
      const visibleCount = 4; // 4 clearly spaced items in the visible primary thumb arc
      const step = angleSpan / (visibleCount - 1); // ~26.6 degrees per slot

      orbitItems.forEach((item, idx) => {
        // Compute virtual slot index relative to current dial offset
        const slot = idx - offset;
        const angleDeg = arcStart + (slot * step);
        const angleRad = (angleDeg * Math.PI) / 180;

        // Coordinates relative to bottom: 29px, right: 29px (center of trigger)
        const x = Math.round(Math.cos(angleRad) * ORBIT_RADIUS);
        const y = Math.round(Math.sin(angleRad) * ORBIT_RADIUS);

        item.style.setProperty('--orbit-x', `${x}px`);
        item.style.setProperty('--orbit-y', `${y}px`);

        // Visibility & scale decay for items rolling out of the quadrant
        if (slot >= -0.5 && slot <= visibleCount - 0.5) {
          item.style.setProperty('--badge-opacity', '1');
          item.style.setProperty('--badge-scale', '1');
          item.style.pointerEvents = 'auto';
        } else if (slot > visibleCount - 0.5 && slot <= visibleCount + 0.5) {
          item.style.setProperty('--badge-opacity', '0.35');
          item.style.setProperty('--badge-scale', '0.75');
          item.style.pointerEvents = 'none';
        } else if (slot >= -1.5 && slot < -0.5) {
          item.style.setProperty('--badge-opacity', '0.35');
          item.style.setProperty('--badge-scale', '0.75');
          item.style.pointerEvents = 'none';
        } else {
          item.style.setProperty('--badge-opacity', '0');
          item.style.setProperty('--badge-scale', '0.2');
          item.style.pointerEvents = 'none';
        }
      });
    }

    // Toggle Open / Close
    function toggleDock(openState) {
      const willOpen = typeof openState === 'boolean' ? openState : !unifiedActionDock.classList.contains('is-open');
      if (willOpen) {
        unifiedActionDock.classList.add('is-open');
        if (mobileDockBackdrop) mobileDockBackdrop.classList.add('is-active');
        playGlassChime(1.4);
        updateRotaryDial(dialOffset);
      } else {
        unifiedActionDock.classList.remove('is-open');
        if (mobileDockBackdrop) mobileDockBackdrop.classList.remove('is-active');
        playGlassChime(0.9);
      }
    }

    mobileDockTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDock();
    });

    if (mobileDockBackdrop) {
      mobileDockBackdrop.addEventListener('click', () => toggleDock(false));
    }

    // Touch & Mouse Rotary Scroll Gesture along the arc
    const onStart = (e) => {
      isDragging = true;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      startY = clientY;
      startOffset = dialOffset;
    };

    const onMove = (e) => {
      if (!isDragging) return;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const deltaY = clientY - startY;
      // 45px drag equals 1 slot shift
      const shift = deltaY / 45;
      const newOffset = Math.max(0, Math.min(totalItems - 4, startOffset + shift));
      
      if (Math.round(newOffset) !== Math.round(dialOffset)) {
        playGlassChime(1.1 + (newOffset * 0.08));
      }

      dialOffset = newOffset;
      updateRotaryDial(dialOffset);
    };

    const onEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      // Snap to nearest integer slot smoothly
      dialOffset = Math.round(dialOffset);
      updateRotaryDial(dialOffset);
    };

    dockItemsWrapper.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onEnd);

    // Desktop testing drag
    dockItemsWrapper.addEventListener('mousedown', onStart);
    window.addEventListener('mousemove', (e) => { if (isDragging) onMove(e); });
    window.addEventListener('mouseup', onEnd);

    // Wheel event for precision desktop testing
    dockItemsWrapper.addEventListener('wheel', (e) => {
      e.preventDefault();
      dialOffset = Math.max(0, Math.min(totalItems - 4, dialOffset + (e.deltaY > 0 ? 1 : -1)));
      playGlassChime(1.2);
      updateRotaryDial(dialOffset);
    }, { passive: false });

    // Initial positioning
    updateRotaryDial(0);
  }

})();
