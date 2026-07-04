// ===== Mobile nav toggle =====
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav__links');

if (burger && navLinks) {
  burger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}

// ===== Terminal typing effect in hero =====

const typeTarget = document.getElementById('typeTarget');

const codeLines = [
  "const dev = {",
  "  name: 'Vaishnavi Dwivedi',",
  "  stack: ['MongoDB', 'Express', 'React', 'Node'],",
  "  role: 'Full Stack Developer',",
  "  learning: ['DSA', 'Advanced React', 'REST APIs']",
  "};",
  "",
  "export default dev;"
];

function typeWriter(el, lines, speed = 26, lineDelay = 180) {
  let lineIndex = 0;
  let charIndex = 0;
  el.textContent = '';

  function typeChar() {
    if (lineIndex >= lines.length) {
      const caret = document.createElement('span');
      caret.className = 'caret';
      el.appendChild(caret);
      return;
    }
    const currentLine = lines[lineIndex];
    if (charIndex < currentLine.length) {
      el.textContent += currentLine.charAt(charIndex);
      charIndex++;
      setTimeout(typeChar, speed);
    } else {
      el.textContent += '\n';
      lineIndex++;
      charIndex = 0;
      setTimeout(typeChar, lineDelay);
    }
  }
  typeChar();
}

if (typeTarget) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    typeTarget.textContent = codeLines.join('\n');
  } else {
    typeWriter(typeTarget, codeLines);
  }
}

// ===== Scroll reveal =====
const revealTargets = document.querySelectorAll(
  '.section__head, .about__body, .skills-grid, .work-grid, .content-grid, .timeline, .extras-grid, .contact__grid'
);

revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => observer.observe(el));

// ===== Placeholder link notice for LinkedIn/GitHub =====
['linkedinLink', 'githubLink'].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('click', (e) => {
      if (el.getAttribute('href') === '#') {
        e.preventDefault();
        alert('Add your real LinkedIn/GitHub URL in index.html to activate this link.');
      }
    });
  }
});
