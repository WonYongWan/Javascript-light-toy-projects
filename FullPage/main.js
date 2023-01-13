document.body.style.overflow = "hidden";
const $fullPageWrap = document.querySelector('#fullPage_wrap');
$fullPageWrap.style.overflow = "hidden";
$fullPageWrap.style.transform = "translate3d(0, 0px, 0)";
$fullPageWrap.style.transition = "all .7s ease";

const $conts = document.querySelectorAll('.fullPage_item');
$conts[0].classList.add('active', 'fix');
const contsHeightArray = [];
let contsArrayPos = 0;
let contsHeightTotal = 0;

$conts.forEach(elm => contsHeightArray.push(elm.clientHeight));

function fullPageEvent(e) {
  if($conts[contsArrayPos].classList.contains('fix') === false) return;

  if(e.wheelDeltaY < 0) {
    if(contsArrayPos >= contsHeightArray.length - 1) return;
    contsArrayPos += 1;
    contsHeightTotal -= contsHeightArray[contsArrayPos];

    $fullPageWrap.style.transform = `translate3d(0, ${contsHeightTotal}px, 0)`;

    $conts.forEach(elm => elm.classList.remove('active'));
    $conts[contsArrayPos].classList.add('active');
    
    setTimeout(() => {
      $conts.forEach(elm => elm.classList.remove('fix'));
      $conts[contsArrayPos].classList.add('fix');
    }, 700);

  } else if(e.wheelDeltaY > 0) {
    if(contsArrayPos <= 0) return;
    contsArrayPos -= 1;
    contsHeightTotal += contsHeightArray[contsArrayPos];
    
    $fullPageWrap.style.transform = `translate3d(0, ${contsHeightTotal}px, 0)`;

    $conts.forEach(elm => elm.classList.remove('active'));
    $conts[contsArrayPos].classList.add('active');
    
    setTimeout(() => {
      $conts.forEach(elm => elm.classList.remove('fix'));
      $conts[contsArrayPos].classList.add('fix');
    }, 700);
  }
}

window.addEventListener("wheel", fullPageEvent);