//
//
// Hi There, Have a good day

console.log("Available Height: " + window.screen.availHeight);
console.log("Available Width: " + window.screen.availWidth);

const body = document.body;
const main = document.getElementById("main_scroll");
const background = document.querySelector(".background");

var sx = 0, // For scroll positions
  sy = 0;
var dx = sx, // For container positions And Force (Percentage 70% Recommended)
  dy = sy,
  Force = 70;

const wheelValidate = (e) => {
  var isTouchPad = e.wheelDeltaY
    ? e.wheelDeltaY === -3 * e.deltaY
    : e.deltaMode === 0;

  Force = isTouchPad ? 700 : 70;
};

const touch = () => {
  Force = 700;
};
//

window.addEventListener("wheel", wheelValidate);
window.addEventListener("touchstart", touch);

// Onpage Load And Refresh Events

body.style.height = main.clientHeight + "px";

ResetPage();

window.addEventListener("beforeunload", (e) => {
  ResetPage();
});

function ResetPage() {
  window.scrollTo(0, 0);

  body.scrollTo(0, 0);
  main.style = ``;
}
function Resizer() {
  body.style.height = main.clientHeight + 200 + "px";

  console.log("trigeer");
  var resizetime = setTimeout(() => {
    body.style.height = main.clientHeight + 200 + "px";

    easeScroll();

    clearTimeout(resizetime);
  }, 900);
}

window.addEventListener("resize", Resizer);

//
// Momentum Scrolling

// Scroll Functions
window.addEventListener("scroll", (e) => {
  easeScroll();
});

function easeScroll() {
  sy = window.pageYOffset;
}

window.requestAnimationFrame(render);

function render() {
  //We calculate our container position by linear interpolation method
  dy = li(dy, sy, Force / 1000);

  dy = Math.floor(dy * 100) / 100;

  if (window.innerWidth > 1081) {
    background.style.transform = `translateY(-${dy / 6}px)`;

    main.style.transform = `translateY(-${dy}px)`;
  } else if (window.innerWidth < 1081) {
    //
    background.style.transform = ``;

    main.style = ``;
  }

  window.requestAnimationFrame(render);
}

function li(a, b, n) {
  return (1 - n) * a + n * b;
}

//
//

const Hoverer = document.querySelectorAll(".Hover");
const Form = document.querySelectorAll(".Form");

for (let index = 0; index < Hoverer.length; index++) {
  Hoverer[index].addEventListener("click", () => {
    Form[index].classList.add("FormActive");

    Resizer();
  });
}
