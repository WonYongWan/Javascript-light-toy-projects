const $startScreen = document.querySelector('#start-screen');
const $screen = document.querySelector('#screen');
const $heroName = document.querySelector('#hero-name');
const $heroLevel = document.querySelector('#hero-level');
const $heroHp = document.querySelector('#hero-hp');
const $heroXp = document.querySelector('#hero-xp');
const $heroAtt = document.querySelector('#hero-att');
const $gameMenu = document.querySelector('#game-menu');
const $gameMenuAdventure = document.querySelector('#menu-1');
const $gameMenuRest = document.querySelector('#menu-2');
const $gameMenuEnd = document.querySelector('#menu-3');
const $battleMenu = document.querySelector('#battle-menu');
const $monsterStat = document.querySelector('#monster-stat');
const $monsterName = document.querySelector('#monster-name');
const $monsterHp = document.querySelector('#monster-hp');
const $monsterAtt = document.querySelector('#monster-att');
const $message = document.querySelector('#message');
const $battleMenuAttack = document.querySelector('#battle-1');

const hero = {
  name: '',
  level: 1,
  maxHp: 100,
  hp: 100,
  xp: 0,
  att: 10
}
let monster = null;
const monsterList = [
  { name: '슬라임', hp: 25, att: 10, xp: 10 },
  { name: '스켈레톤', hp: 50, att: 15, xp: 20 },
  { name: '마왕', hp: 150, att: 35, xp: 50 }
]

$startScreen.addEventListener('submit', (event) => {
  event.preventDefault();
  // form에서는 안에 들어 있는 요소의 id를 ['id']형식으로 가져 올 수 있다.
  let heroName = event.target['name-input'].value;
  let heroFilterName = heroName.replace(/ /g, '');
  if(heroFilterName) {
    hero.name = heroFilterName;
    $heroName.textContent = heroFilterName;
    $heroLevel.textContent = `LV.${hero.level}`;
    $heroHp.textContent = `HP: ${hero.hp}`;
    $heroXp.textContent = `XP: ${hero.xp}`;
    $heroAtt.textContent = `ATT: ${hero.att}`;
    $startScreen.style.display = 'none';
    $screen.style.display = 'block';
  }
});
// 모험 클릭시
$gameMenuAdventure.addEventListener('click', () => {
  $gameMenu.style.display = 'none';
  $battleMenu.style.display = 'block';
  $monsterStat.style.display = 'block';
  monster = JSON.parse(
    JSON.stringify(monsterList[Math.floor(Math.random() * monsterList.length)])
  );
  $monsterName.textContent = monster.name;
  $monsterHp.textContent = `HP: ${monster.hp}`;
  $monsterAtt.textContent = `ATT: ${monster.att}`;
  $message.innerHTML += `<p>${monster.name}이 나타났다! 당신의 선택은?</p>`;
});
// 배틀모드 공격 클릭시
$battleMenuAttack.addEventListener('click', () => {
  while(monster.hp >= 0 || hero.hp >= 0) {
    monster.hp -= hero.att;
    hero.hp -= monster.att;
    $message.innerHTML += `<p>${monster.name}에게 ${hero.att}만큼의 데미지를 주었습니다! (${monster.name}의 현재 HP: ${monster.hp})</p>`;
    $message.innerHTML += `<p>${monster.name}에게 ${monster.att}만큼의 데미지를 받았습니다! (${hero.name}의 현재 HP: ${hero.hp})</p>`;
    if(hero.hp <= 0) break;
    if(monster.hp <= 0) break;
  }
  if(hero.hp <= 0) {
    hero.hp = 0;
  } 
  if(monster.hp <= 0) {
    monster.hp = 0;
  }
  $heroHp.textContent = `HP: ${hero.hp}`;
  $monsterHp.textContent = `HP: ${monster.hp}`;
});