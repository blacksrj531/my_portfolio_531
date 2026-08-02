/**
 * ═══════════════════════════════════════════════
 * SCRIPT.JS
 * Soumya Ranjan Jena - Portfolio Website
 * Interactive particle animation + mobile menu
 * ═══════════════════════════════════════════════
 */

(function () {
  'use strict';

  var canvas = document.getElementById('particleCanvas');
  var heroSection = document.getElementById('heroParticleSection');
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
    document.addEventListener('click', function (e) {
      if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        var icon = mobileMenuToggle.querySelector('i');
        if (icon) { icon.className = 'fas fa-bars'; }
      }
    });
  }

  if (!canvas || !heroSection) return;
  var ctx = canvas.getContext('2d');
  var CONFIG = { PARTICLE_COUNT: 110, ATTRACT_RADIUS: 150, CONNECTION_DISTANCE: 75, BASE_PARTICLE_RADIUS_MIN: 1.6, BASE_PARTICLE_RADIUS_MAX: 3.8, BASE_OPACITY_MIN: 0.35, BASE_OPACITY_MAX: 0.9, ATTRACTION_FORCE_MULTIPLIER: 3.2, DRIFT_SPEED: 0.35, VELOCITY_CHANGE: 0.05, VELOCITY_DAMPING: 0.99, RETURN_FORCE_IDLE: 0.025, RETURN_FORCE_ACTIVE: 0.018, CONNECTION_OPACITY_MAX: 0.16 };
  var particles = [], mouseX = null, mouseY = null, mouseInside = false, animationFrameId = null;

  function resizeCanvas() { var r = heroSection.getBoundingClientRect(); canvas.width = r.width; canvas.height = r.height; }
  var resizeTimeout;
  window.addEventListener('resize', function () { clearTimeout(resizeTimeout); resizeTimeout = setTimeout(function () { resizeCanvas(); initParticles(); }, 150); });
  resizeCanvas();

  var Particle = function () { this.x = 0; this.y = 0; this.baseX = 0; this.baseY = 0; this.vx = 0; this.vy = 0; this.radius = 1; this.opacity = 0.5; this.attracted = 0; this.reset(); };
  Particle.prototype.reset = function () { this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height; this.baseX = this.x; this.baseY = this.y; this.vx = (Math.random() - 0.5) * 0.9; this.vy = (Math.random() - 0.5) * 0.9; this.radius = CONFIG.BASE_PARTICLE_RADIUS_MIN + Math.random() * (CONFIG.BASE_PARTICLE_RADIUS_MAX - CONFIG.BASE_PARTICLE_RADIUS_MIN); this.opacity = CONFIG.BASE_OPACITY_MIN + Math.random() * (CONFIG.BASE_OPACITY_MAX - CONFIG.BASE_OPACITY_MIN); this.attracted = 0; };
  Particle.prototype.update = function (mx, my, active) { this.x += this.vx; this.y += this.vy; if (this.x < -10) this.x = canvas.width + 10; if (this.x > canvas.width + 10) this.x = -10; if (this.y < -10) this.y = canvas.height + 10; if (this.y > canvas.height + 10) this.y = -10; this.baseX += (Math.random() - 0.5) * CONFIG.DRIFT_SPEED; this.baseY += (Math.random() - 0.5) * CONFIG.DRIFT_SPEED; this.baseX = Math.max(0, Math.min(canvas.width, this.baseX)); this.baseY = Math.max(0, Math.min(canvas.height, this.baseY)); if (active && mx !== null && my !== null) { var dx = mx - this.x, dy = my - this.y, dist = Math.sqrt(dx * dx + dy * dy); if (dist < CONFIG.ATTRACT_RADIUS) { var force = (CONFIG.ATTRACT_RADIUS - dist) / CONFIG.ATTRACT_RADIUS, angle = Math.atan2(dy, dx), move = force * force * CONFIG.ATTRACTION_FORCE_MULTIPLIER; this.x += Math.cos(angle) * move; this.y += Math.sin(angle) * move; this.attracted = force; } else { this.attracted = 0; this.x += (this.baseX - this.x) * CONFIG.RETURN_FORCE_ACTIVE; this.y += (this.baseY - this.y) * CONFIG.RETURN_FORCE_ACTIVE; } } else { this.attracted = 0; this.x += (this.baseX - this.x) * CONFIG.RETURN_FORCE_IDLE; this.y += (this.baseY - this.y) * CONFIG.RETURN_FORCE_IDLE; } this.vx += (Math.random() - 0.5) * CONFIG.VELOCITY_CHANGE; this.vy += (Math.random() - 0.5) * CONFIG.VELOCITY_CHANGE; this.vx *= CONFIG.VELOCITY_DAMPING; this.vy *= CONFIG.VELOCITY_DAMPING; };
  Particle.prototype.draw = function (ctx) { ctx.beginPath(); var alpha = Math.min(1, this.opacity + (this.attracted || 0) * 0.45); var color = this.attracted && this.attracted > 0.18 ? 'rgba(255, 255, 255, ' + (alpha + 0.25) + ')' : 'rgba(255, 255, 255, ' + alpha + ')'; ctx.fillStyle = color; ctx.shadowColor = this.attracted > 0.35 ? 'rgba(255, 255, 255, 0.9)' : 'transparent'; ctx.shadowBlur = this.attracted > 0.35 ? 12 : 0; ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0; };
  function initParticles() { particles = []; for (var i = 0; i < CONFIG.PARTICLE_COUNT; i++) particles.push(new Particle()); }
  initParticles();
  heroSection.addEventListener('mousemove', function (e) { var r = heroSection.getBoundingClientRect(); mouseX = e.clientX - r.left; mouseY = e.clientY - r.top; mouseInside = true; });
  heroSection.addEventListener('mouseleave', function () { mouseInside = false; mouseX = null; mouseY = null; });
  heroSection.addEventListener('mouseenter', function (e) { mouseInside = true; var r = heroSection.getBoundingClientRect(); mouseX = e.clientX - r.left; mouseY = e.clientY - r.top; });
  heroSection.addEventListener('touchmove', function (e) { e.preventDefault(); var r = heroSection.getBoundingClientRect(), t = e.touches[0]; mouseX = t.clientX - r.left; mouseY = t.clientY - r.top; mouseInside = true; }, { passive: false });
  heroSection.addEventListener('touchend', function () { mouseInside = false; mouseX = null; mouseY = null; });
  heroSection.addEventListener('touchstart', function (e) { var r = heroSection.getBoundingClientRect(), t = e.touches[0]; mouseX = t.clientX - r.left; mouseY = t.clientY - r.top; mouseInside = true; });
  function animate() { ctx.clearRect(0, 0, canvas.width, canvas.height); for (var i = 0; i < particles.length; i++) { particles[i].update(mouseX, mouseY, mouseInside); particles[i].draw(ctx); } for (var i = 0; i < particles.length; i++) { for (var j = i + 1; j < particles.length; j++) { var dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y, dist = Math.sqrt(dx * dx + dy * dy); if (dist < CONFIG.CONNECTION_DISTANCE) { var alpha = (1 - dist / CONFIG.CONNECTION_DISTANCE) * CONFIG.CONNECTION_OPACITY_MAX; ctx.beginPath(); ctx.strokeStyle = 'rgba(255, 255, 255, ' + alpha + ')'; ctx.lineWidth = 0.5; ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke(); } } } animationFrameId = requestAnimationFrame(animate); }
  animate();
})();
