const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-toggle-icon');
const themeText = document.querySelector('.theme-toggle-text');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');
const header = document.querySelector('.site-header');
const headerContent = document.querySelector('.header-content');
const binaryTrail = document.querySelector('.binary-page');

const setTheme = (theme) => {
  if (theme === 'light') {
    body.classList.add('theme-light');
    themeIcon.textContent = '☀️';
    themeText.textContent = 'Dark mode';
  } else {
    body.classList.remove('theme-light');
    themeIcon.textContent = '🌙';
    themeText.textContent = 'Light mode';
  }
  localStorage.setItem('site-theme', theme);
};

const initTheme = () => {
  const savedTheme = localStorage.getItem('site-theme');
  if (savedTheme === 'light') {
    setTheme('light');
  } else {
    setTheme('dark');
  }
};

themeToggle.addEventListener('click', () => {
  const nextTheme = body.classList.contains('theme-light') ? 'dark' : 'light';
  setTheme(nextTheme);
});

const createBinaryTrail = () => {
  if (!binaryTrail) return;
  const count = 28;
  const colors = [
    'rgba(124, 156, 255, 0.48)',
    'rgba(255, 255, 255, 0.38)',
    'rgba(124, 156, 255, 0.28)'
  ];
  for (let i = 0; i < count; i += 1) {
    const span = document.createElement('span');
    span.textContent = Math.random() > 0.5 ? '1' : '0';
    const left = Math.random() * 100;
    const duration = Math.random() * 10 + 8;
    const delay = -Math.random() * 12;
    const size = Math.random() * 0.9 + 0.8;
    const color = colors[Math.floor(Math.random() * colors.length)];

    span.style.left = `${left}%`;
    span.style.fontSize = `${size}rem`;
    span.style.animationDuration = `${duration}s`;
    span.style.animationDelay = `${delay}s`;
    span.style.opacity = `${Math.random() * 0.5 + 0.25}`;
    span.style.color = color;
    binaryTrail.appendChild(span);
  }
};

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    headerContent.classList.add('collapsed');
    header.classList.add('collapsed');
  });
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    headerContent.classList.add('collapsed');
    header.classList.add('collapsed');
  } else {
    headerContent.classList.remove('collapsed');
    header.classList.remove('collapsed');
  }

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

createBinaryTrail();
initTheme();
