// Plays the hero test run once on load: each check spins, then passes.
(function () {
  var tests = Array.prototype.slice.call(document.querySelectorAll('.tests li'));
  var counter = document.querySelector('[data-passing]');
  var summary = document.querySelector('[data-summary]');
  var total = document.querySelector('[data-total]');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var totalMs = 0;

  function pass(li, i) {
    var ms = parseInt(li.getAttribute('data-ms'), 10) || 200;
    totalMs += ms;
    li.classList.remove('is-pending', 'is-running');
    li.classList.add('is-passed');
    var t = document.createElement('span');
    t.className = 'ms';
    t.textContent = '(' + ms + 'ms)';
    li.appendChild(t);
    counter.textContent = i + 1;
  }

  function finish() {
    total.textContent = '(' + (totalMs / 1000).toFixed(1) + 's)';
    summary.classList.add('is-shown');
  }

  if (reduce) {
    tests.forEach(pass);
    finish();
  } else {
    tests.forEach(function (li) { li.classList.add('is-pending'); });
    var i = 0;
    (function next() {
      if (i >= tests.length) { finish(); return; }
      var li = tests[i];
      li.classList.remove('is-pending');
      // the spinner shows for a fraction of the "real" duration
      var ms = parseInt(li.getAttribute('data-ms'), 10) || 200;
      setTimeout(function () { pass(li, i); i++; next(); }, 180 + ms * 0.6);
    })();
  }

  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
