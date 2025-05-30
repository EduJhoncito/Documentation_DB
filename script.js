document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const menuToggle = document.getElementById('menu-toggle');
  const links = sidebar.getElementsByTagName('a');
  const sections = Array.from(links).map(link => 
    document.querySelector(link.getAttribute('href'))
  );

  // Mobile menu toggle
  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', 
      sidebar.classList.contains('active').toString()
    );
  });

  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 &&
        !sidebar.contains(e.target) &&
        !menuToggle.contains(e.target) &&
        sidebar.classList.contains('active')) {
      sidebar.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Smooth scroll with keyboard navigation support
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      targetSection.focus();
      window.scrollTo({
        top: targetSection.offsetTop - 100,
        behavior: 'smooth'
      });

      // Close mobile menu after navigation
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Enhanced scroll spy with IntersectionObserver
  const observerOptions = {
    rootMargin: '-20% 0px -60% 0px'
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Update sidebar links
        const targetId = entry.target.id;
        Array.from(links).forEach(link => {
          const isCurrentSection = link.getAttribute('href') === `#${targetId}`;
          link.setAttribute('aria-current', isCurrentSection.toString());
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
      sidebar.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
});