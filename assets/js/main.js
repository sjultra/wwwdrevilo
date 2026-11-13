// Drevilo.net &mdash; minimal JS: mobile nav toggle + contact form status message.
// No frameworks, no analytics, no external requests.
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function () {
      var status = document.getElementById('form-status');
      if (status) {
        status.textContent = 'Sending your message\u2026';
      }
    });
  }
})();
