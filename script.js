/**
 * ═══════════════════════════════════════════════
 * SCRIPT.JS
 * Soumya Ranjan Jena - Portfolio Website
 * High-performance particle canvas with spatial culling & viewport-pause
 * ═══════════════════════════════════════════════
 */

(function () {
  'use strict';

  // ───── DYNAMIC WHATSAPP LINK ─────
  var whatsappBtn = document.getElementById('whatsappBtn');
  if (whatsappBtn) {
    var phone = '917789056552';
    var message = encodeURIComponent("Hi Soumya, I reviewed your engineering portfolio and would like to discuss a project / role with you.");
    whatsappBtn.href = 'https://wa.me/' + phone + '?text=' + message;
  }

  // ───── MOBILE MENU TOGGLE ─────
  var mobileMenuToggle = document.getElementById('mobileMenuToggle');
  var navLinks = document.getElementById('navLinks');
  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', function () {
      var isExpanded = navLinks.classList.toggle('active');
      this.setAttribute('aria-expanded', isExpanded);
      var icon = this.querySelector('i');
      if (icon) { icon.className = isExpanded ? 'fas fa-times' : 'fas fa-bars'; }
    });
    
    var navLinkElements = navLinks.querySelectorAll('.nav-link');
    for (var i = 0; i < navLinkElements.length; i++) {
      navLinkElements[i].addEventListener('click', function () {
        navLinks.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        var icon = mobileMenuToggle.querySelector('i');
        if (icon) { icon.className = 'fas fa-bars'; }
      });
    }
  }

  // ───── OPTIMIZED CANVAS PARTICLE ANIMATION ─────
  var canvas = document.getElementById('particleCanvas');
  var heroSection = document.getElementById('heroParticleSection');
  if (!canvas || !heroSection) return;

  var ctx = canvas.getContext('2d');
  var CONFIG = { 
    PARTICLE_COUNT: 85, 
    ATTRACT_RADIUS: 140, 
    CONNECTION_DISTANCE: 70, 
    BASE_PARTICLE_RADIUS_MIN: 1.4, 
    BASE_PARTICLE_RADIUS_MAX: 3.2, 
    BASE_OPACITY_MIN: 0.35, 
    BASE_OPACITY_MAX: 0.85, 
    ATTRACTION_FORCE_MULTIPLIER: 2.8, 
    DRIFT_SPEED: 0.3, 
    VELOCITY_CHANGE: 0.04, 
    VELOCITY_DAMPING: 0.99, 
    RETURN_FORCE_IDLE: 0.02, 
    RETURN_FORCE_ACTIVE: 0.015, 
    CONNECTION_OPACITY_MAX: 0.15 
  };
  
  var particles = [], mouseX = null, mouseY = null, mouseInside = false;
  var animationFrameId = null;
  var isHeroVisible = true;

  function resizeCanvas() { 
    var r = heroSection.getBoundingClientRect(); 
    canvas.width = r.width; 
    canvas.height = r.height; 
  }
  
  var resizeTimeout;
  window.addEventListener('resize', function () { 
    clearTimeout(resizeTimeout); 
    resizeTimeout = setTimeout(function () { 
      resizeCanvas(); 
      initParticles(); 
    }, 150); 
  });
  resizeCanvas();

  var Particle = function () { 
    this.x = 0; 
    this.y = 0; 
    this.baseX = 0; 
    this.baseY = 0; 
    this.vx = 0; 
    this.vy = 0; 
    this.radius = 1; 
    this.opacity = 0.5; 
    this.attracted = 0; 
    this.reset(); 
  };
  
  Particle.prototype.reset = function () { 
    this.x = Math.random() * canvas.width; 
    this.y = Math.random() * canvas.height; 
    this.baseX = this.x; 
    this.baseY = this.y; 
    this.vx = (Math.random() - 0.5) * 0.8; 
    this.vy = (Math.random() - 0.5) * 0.8; 
    this.radius = CONFIG.BASE_PARTICLE_RADIUS_MIN + Math.random() * (CONFIG.BASE_PARTICLE_RADIUS_MAX - CONFIG.BASE_PARTICLE_RADIUS_MIN); 
    this.opacity = CONFIG.BASE_OPACITY_MIN + Math.random() * (CONFIG.BASE_OPACITY_MAX - CONFIG.BASE_OPACITY_MIN); 
    this.attracted = 0; 
  };
  
  Particle.prototype.update = function (mx, my, active) { 
    this.x += this.vx; 
    this.y += this.vy; 
    if (this.x < -10) this.x = canvas.width + 10; 
    if (this.x > canvas.width + 10) this.x = -10; 
    if (this.y < -10) this.y = canvas.height + 10; 
    if (this.y > canvas.height + 10) this.y = -10; 
    this.baseX += (Math.random() - 0.5) * CONFIG.DRIFT_SPEED; 
    this.baseY += (Math.random() - 0.5) * CONFIG.DRIFT_SPEED; 
    this.baseX = Math.max(0, Math.min(canvas.width, this.baseX)); 
    this.baseY = Math.max(0, Math.min(canvas.height, this.baseY)); 
    
    if (active && mx !== null && my !== null) { 
      var dx = mx - this.x, dy = my - this.y; 
      var distSq = dx * dx + dy * dy;
      var attractRadiusSq = CONFIG.ATTRACT_RADIUS * CONFIG.ATTRACT_RADIUS;
      if (distSq < attractRadiusSq) { 
        var dist = Math.sqrt(distSq);
        var force = (CONFIG.ATTRACT_RADIUS - dist) / CONFIG.ATTRACT_RADIUS;
        var angle = Math.atan2(dy, dx);
        var move = force * force * CONFIG.ATTRACTION_FORCE_MULTIPLIER; 
        this.x += Math.cos(angle) * move; 
        this.y += Math.sin(angle) * move; 
        this.attracted = force; 
      } else { 
        this.attracted = 0; 
        this.x += (this.baseX - this.x) * CONFIG.RETURN_FORCE_ACTIVE; 
        this.y += (this.baseY - this.y) * CONFIG.RETURN_FORCE_ACTIVE; 
      } 
    } else { 
      this.attracted = 0; 
      this.x += (this.baseX - this.x) * CONFIG.RETURN_FORCE_IDLE; 
      this.y += (this.baseY - this.y) * CONFIG.RETURN_FORCE_IDLE; 
    } 
    this.vx += (Math.random() - 0.5) * CONFIG.VELOCITY_CHANGE; 
    this.vy += (Math.random() - 0.5) * CONFIG.VELOCITY_CHANGE; 
    this.vx *= CONFIG.VELOCITY_DAMPING; 
    this.vy *= CONFIG.VELOCITY_DAMPING; 
  };
  
  Particle.prototype.draw = function (ctx) { 
    ctx.beginPath(); 
    var alpha = Math.min(1, this.opacity + (this.attracted || 0) * 0.45); 
    ctx.fillStyle = this.attracted && this.attracted > 0.2 ? 'rgba(255, 255, 255, ' + (alpha + 0.2) + ')' : 'rgba(255, 255, 255, ' + alpha + ')'; 
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); 
    ctx.fill(); 
  };

  function initParticles() { 
    particles = []; 
    for (var i = 0; i < CONFIG.PARTICLE_COUNT; i++) particles.push(new Particle()); 
  }
  
  initParticles();
  
  heroSection.addEventListener('mousemove', function (e) { 
    var r = heroSection.getBoundingClientRect(); 
    mouseX = e.clientX - r.left; 
    mouseY = e.clientY - r.top; 
    mouseInside = true; 
  }, { passive: true });
  
  heroSection.addEventListener('mouseleave', function () { 
    mouseInside = false; 
    mouseX = null; 
    mouseY = null; 
  });
  
  heroSection.addEventListener('mouseenter', function (e) { 
    mouseInside = true; 
    var r = heroSection.getBoundingClientRect(); 
    mouseX = e.clientX - r.left; 
    mouseY = e.clientY - r.top; 
  }, { passive: true });
  
  // High-performance passive touch listeners (non-blocking scroll)
  heroSection.addEventListener('touchmove', function (e) { 
    if (!e.touches || !e.touches[0]) return;
    var r = heroSection.getBoundingClientRect(); 
    var t = e.touches[0]; 
    mouseX = t.clientX - r.left; 
    mouseY = t.clientY - r.top; 
    mouseInside = true; 
  }, { passive: true });
  
  heroSection.addEventListener('touchend', function () { 
    mouseInside = false; 
    mouseX = null; 
    mouseY = null; 
  }, { passive: true });
  
  heroSection.addEventListener('touchstart', function (e) { 
    if (!e.touches || !e.touches[0]) return;
    var r = heroSection.getBoundingClientRect(); 
    var t = e.touches[0]; 
    mouseX = t.clientX - r.left; 
    mouseY = t.clientY - r.top; 
    mouseInside = true; 
  }, { passive: true });

  var connDistSq = CONFIG.CONNECTION_DISTANCE * CONFIG.CONNECTION_DISTANCE;

  function animate() { 
    if (!isHeroVisible) {
      animationFrameId = null;
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    for (var i = 0; i < particles.length; i++) { 
      particles[i].update(mouseX, mouseY, mouseInside); 
      particles[i].draw(ctx); 
    } 
    
    // Spatial connection rendering
    for (var i = 0; i < particles.length; i++) { 
      var p1 = particles[i];
      for (var j = i + 1; j < particles.length; j++) { 
        var p2 = particles[j];
        var dx = p1.x - p2.x;
        var dy = p1.y - p2.y; 
        var distSq = dx * dx + dy * dy;
        if (distSq < connDistSq) { 
          var dist = Math.sqrt(distSq);
          var alpha = (1 - dist / CONFIG.CONNECTION_DISTANCE) * CONFIG.CONNECTION_OPACITY_MAX; 
          ctx.beginPath(); 
          ctx.strokeStyle = 'rgba(255, 255, 255, ' + alpha + ')'; 
          ctx.lineWidth = 0.5; 
          ctx.moveTo(p1.x, p1.y); 
          ctx.lineTo(p2.x, p2.y); 
          ctx.stroke(); 
        } 
      } 
    } 
    animationFrameId = requestAnimationFrame(animate); 
  }

  // ───── VIEWPORT INTERSECTION OBSERVER (Zero CPU/GPU drain off-screen) ─────
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          isHeroVisible = true;
          if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(animate);
          }
        } else {
          isHeroVisible = false;
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
          }
        }
      });
    }, { threshold: 0.05 });
    observer.observe(heroSection);
  } else {
    animate();
  }
})();
