const myName = "Jeff Powell";
const h1 = document.querySelector(".heading-primary");
console.log(h1);

///////////////////////////////////////////////////////////
// Set current year
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

///////////////////////////////////////////////////////////
// Make mobile navigation work

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

///////////////////////////////////////////////////////////
const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    const href = link.getAttribute("href");

    // Check if it's an external link
    if (!href.startsWith("#")) {
      return; // Allow default behavior for external links
    }

    e.preventDefault();

    // Scroll back to top
    if (href === "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    // Scroll to other sections
    else {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // Close mobile navigation
    if (link.classList.contains("main-nav-link")) {
      headerEl.classList.toggle("nav-open");
    }
  });
});

///////////////////////////////////////////////////////////
// Sticky navigation

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// Set the fixed starting time in UTC
var startTime = new Date(Date.UTC(2024, 2, 3, 20, 0, 0)).getTime();
var duration = 2 * 24 * 60 * 60 * 1000 + 23 * 60 * 60 * 1000 + 59 * 60 * 1000;
var countDownDate = startTime + duration;

// Countdown timer
var x = setInterval(function () {
  var now = new Date().getTime();
  var utcNow = now + new Date().getTimezoneOffset() * 60000; // Convert current time to UTC
  var distance = countDownDate - utcNow;

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

  document.getElementById("countdown").innerHTML =
    days + " days, " + hours + " hours, " + minutes + " minutes";

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "EXPIRED";
  }
}, 1000);

(function () {
  "use strict";
  window.addEventListener("load", function () {
    var canvas = document.getElementById("hero-canvas");

    if (!canvas || !canvas.getContext) {
      return false;
    }

    /********************
      Random Number
    ********************/

    function rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /********************
      Var
    ********************/

    var ctx = canvas.getContext("2d");
    var X = (canvas.width = window.innerWidth);
    var Y = (canvas.height = window.innerHeight);
    var shapeNum = 100; // Adjust shapeNum for density
    var shapes = [];

    /********************
      Animation
    ********************/

    window.requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (cb) {
        setTimeout(cb, 17);
      };

    /********************
      Shape
    ********************/

    function Shape(ctx, x, y) {
      this.ctx = ctx;
      this.init(x, y);
    }

    Shape.prototype.init = function (x, y) {
      this.x = x;
      this.y = y;
      this.ga = Math.random() * Math.random() * Math.random() * Math.random();
      this.v = {
        x: Math.random(),
        y: -1,
      };
      this.l = rand(0, 20);
      this.sl = this.l;
      this.angle = rand(0, 360); // Added angle property for crystal shape
    };

    Shape.prototype.updateParams = function () {
      var ratio = this.l / this.sl;
      this.l -= 1;
      if (this.l < 0) {
        this.init((X * (Math.random() + Math.random())) / 2, rand(0, Y));
      }
    };

    Shape.prototype.updatePosition = function () {
      this.x += Math.cos((this.angle * Math.PI) / 180); // Update x position based on angle
      this.y += Math.sin((this.angle * Math.PI) / 180); // Update y position based on angle
    };

    Shape.prototype.draw = function () {
      var ctx = this.ctx;
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = this.ga;
      ctx.fillStyle = "#FCD0D0";
      ctx.translate(this.x, this.y); // Translate to shape position
      ctx.rotate(Math.PI / 3); // Rotate by 45 degrees clockwise
      ctx.beginPath();
      ctx.moveTo(0, -30);
      ctx.lineTo(15, 0);
      ctx.lineTo(0, 30);
      ctx.lineTo(-15, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    Shape.prototype.render = function (i) {
      this.updatePosition();
      this.updateParams();
      this.draw();
    };

    for (var i = 0; i < shapeNum; i++) {
      var s = new Shape(
        ctx,
        (X * (Math.random() + Math.random())) / 2,
        rand(0, Y)
      );
      shapes.push(s);
    }

    /********************
      Render
    ********************/

    function render() {
      ctx.clearRect(0, 0, X, Y);
      for (var i = 0; i < shapes.length; i++) {
        shapes[i].render(i);
      }
      requestAnimationFrame(render);
    }

    render();

    /********************
      Event
    ********************/

    function onResize() {
      X = canvas.width = window.innerWidth;
      Y = canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", function () {
      onResize();
    });

    // window.addEventListener(
    //   "mousemove",
    //   function (e) {
    //     mouseX = e.clientX;
    //     mouseY = e.clientY;
    //   },
    //   false
    // );
  });
})();

//diamonds animation
const colors = ["#C00000", "#333333", "#FCD0D0", "#0B1013"];
const SVG_NS = "http://www.w3.org/2000/svg";
const SVG_XLINK = "http://www.w3.org/1999/xlink";

let diamondsRy = [];

function useTheDiamond(n) {
  let use = document.createElementNS(SVG_NS, "use");
  use.n = n;
  use.setAttributeNS(SVG_XLINK, "xlink:href", "#diamond");
  use.setAttributeNS(null, "transform", `scale(${use.n})`);
  use.setAttributeNS(null, "fill", colors[n % colors.length]);
  use.setAttributeNS(null, "x", -60);
  use.setAttributeNS(null, "y", -60);
  use.setAttributeNS(null, "width", 120);
  use.setAttributeNS(null, "height", 120);

  diamondsRy.push(use);
  diamonds.appendChild(use);
}

for (let n = 18; n >= 0; n--) {
  useTheDiamond(n);
}

function Frame() {
  window.requestAnimationFrame(Frame);
  for (let i = 0; i < diamondsRy.length; i++) {
    if (diamondsRy[i].n < 18) {
      diamondsRy[i].n += 0.01;
    } else {
      diamondsRy[i].n = 0;
      diamonds.appendChild(diamondsRy[i]);
    }
    diamondsRy[i].setAttributeNS(
      null,
      "transform",
      `scale(${diamondsRy[i].n})`
    );
  }
}

Frame();

// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the page loads, display the modal and blur background
window.onload = function () {
  modal.style.display = "block"; // Display the modal
  applyBlur(); // Add blur effect to background elements
};

// When the user clicks on <span> (x) or outside of the modal, close the modal
span.onclick = function () {
  closeModal();
  removeBlur(); // Remove blur effect from background elements
};

window.onclick = function (event) {
  if (event.target == modal) {
    closeModal();
    removeBlur(); // Remove blur effect from background elements
  }
};

function closeModal() {
  modal.style.display = "none";
  removeBlur(); // Remove blur effect from background elements
}

// Function to apply blur effect to background elements
function applyBlur() {
  document
    .querySelectorAll("body > *:not(#myModal)")
    .forEach(function (element) {
      element.style.filter = "blur(9px)"; // Apply blur effect
      // element.style.pointerEvents = "none"; // Disable pointer events
    });
}

// Function to remove blur effect from background elements
function removeBlur() {
  document
    .querySelectorAll("body > *:not(#myModal)")
    .forEach(function (element) {
      element.style.filter = ""; // Remove blur effect
      // element.style.pointerEvents = ""; // Restore pointer events
    });
}
