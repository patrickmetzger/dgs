var home_hero     = document.querySelector('.home_hero_content');
var logoSVG    = document.querySelector('.logo svg');
var viewbox =  logoSVG.getBBox();
var logoWidth  = Math.floor(viewbox.width * 1000) / 1000;
var logoHeight = Math.floor(viewbox.height * 1000) / 1000;

// setMode for demo purposes, use media queries in production
var setMode = function(mode) {
  home_hero.setAttribute('mode', mode);
};

// update logo size when crossing breakpoints
enquire
  .register("screen and (max-width: 499px)", function() {
    setMode('small');
  })
  .register("screen and (min-width: 500px)", function() {
    setMode('medium');
  })
  .register("screen and (min-width: 700px)", function() {
    setMode('large');
  });

// ==============================
// boilerplate demo code...
// ==============================
document.addEventListener('click', function(e) {
  if (e.target.type !== 'button') return;

  var mode = e.target.getAttribute('data-mode');
  setMode(mode);
});