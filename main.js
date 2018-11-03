let newGame = document.querySelector('#newGame');
newGame.hidden = true; // hidding button

let check = document.getElementById('check');
check.hidden = true; // hidding button

const form = document.querySelector('#form');
form.hidden = true; // hidding button

const clearBtn = document.getElementById('cleanResults');

clearBtn.addEventListener('click', function(){
  if(confirm("Are you sure?")){
    localStorage.clear();
    document.querySelector('tbody').innerHTML = "";
  };
});

// pseudo-voiting
function getRandom() {
  return Math.floor(Math.random() * 6);
}

newGame.addEventListener('click', reloadGame);

//reload the game
function reloadGame() {
  window.location.reload();
}

let arr = new Array('red', 'yellow', 'blue', 'green', 'purple', 'orange');

//config basic varibles
const A = arr[getRandom()];
const B = arr[getRandom()];
const C = arr[getRandom()];
const D = arr[getRandom()];
let amountOfAttempts = 5;
let score = 100;
let userInfo = {};
let d = new Date();
document.getElementById('footer').innerHTML =
  d.getFullYear() + '&copy Denys Matsuiev';
let t0 = performance.now();

let i = 0;
let first = document.getElementById('first');
let second = document.getElementById('second');
let third = document.getElementById('third');
let forth = document.getElementById('forth');



// changing colors one of the circle by clicking
var buttons = document.querySelectorAll('i');
for (var k = 0; k < buttons.length; k++) {
  buttons[k].onclick = function(e) {
    e.target.className = 'fas fa-circle';
    e.target.style.color = arr[i];
    if (i < arr.length - 1)
      // -1 because we have more than 6 color( +basic 'question circle');
      i++;
    else i = 0;

    check.hidden = false;
  };
}

//match search
//display user's answer
check.addEventListener('click', function() {
  let a = first.style.color;
  let b = second.style.color;
  let c = third.style.color;
  let d = forth.style.color;

  let arr1 = [A, B, C, D];
  let arr2 = [a, b, c, d];
  let arr3 = [
    '<i class="fas fa-frown"></i>',
    '<i class="fas fa-meh"></i>',
    '<i class="fas fa-smile"></i>'
  ];
  let arr4 = [];

  console.log('arr1:' + arr1);
  console.log('arr2:' + arr2);

  checkMatches();

  var spanEls = document.querySelectorAll('span');
  var div = document.createElement('div');
  attempts.insertBefore(div, attempts.firstChild);
  for (let i = 0; i < 4; i++) {
    var span = document.createElement('span');
    span.className = 'userAttempts';
    div.appendChild(span);
    span.style.color = arr2[i];
    usersAttempt();
    span.innerHTML = arr4[i];
  }

  //controlling number of users attempt, display right answer with smile color face
  //and if the attempts > 5  to finish the game
  function checkNumberOfAttempt() {
    if (amountOfAttempts === 1) {
      document.getElementById('task').innerHTML = '';
      btns.innerHTML =
        '<h2>It\'s pity, but you lost <i class="fas fa-frown"></i></h2>';
      var div = document.createElement('div');
      results.appendChild(div);
      var rightAnswer = document.createElement('h3');
      rightAnswer.textContent = 'The right answer';
      div.appendChild(rightAnswer);
      for (let i = 0; i < 4; i++) {
        var span = document.createElement('span');
        span.className = 'userAttempts';
        div.appendChild(span);
        span.style.color = arr1[i];
        span.innerHTML = '<i class="fas fa-smile"></i>';
      }
      newGame.hidden = false;
      check.hidden = true;
    } else amountOfAttempts--;
  }

  //checking right guessed with first attempt
  function checkMatches() {
    if (A == a && B ==b && C == c && D == d) {
      let t1 = performance.now();
      score = parseInt(((t1 - t0) / (amountOfAttempts * 1000))+1);
      document.getElementById('task').innerHTML = '';
      btns.innerHTML = '<h2> You won! Your score is ' + score + '</h2>';
      form.hidden = false;
      attempts.innerHTML ='';
      check.hidden = true;
    } else {
      checkNumberOfAttempt();
    }
  }

  //Match every circle color with each given color
  //and return hints by display smile faces icons
  function usersAttempt() {
    for (let k = 0; k < 4; k++) {
      flag = '';
      for (let m = 0; m < 4; m++) {
        if (arr2[k] == arr1[m]) {
          if (arr2[k] == arr1[k]) flag = 2;
          else flag = 1;
        } else {
          if (flag > 0) continue;
          else flag = 0;
        }
      }
      switch (flag) {
        case 2:
          arr4[k] = arr3[2];
          break;

        case 1:
          arr4[k] = arr3[1];
          break;

        default:
          arr4[k] = arr3[0];
      }
    }
  }

});



  //Saving result in the LocalStorage
  form.addEventListener('submit', function() {
    const userName = document.getElementById('inlineFormInputGroupUsername')
      .value;
    //console.log('ok');
    let lists;
    if (localStorage.getItem('lists') === null) {
      lists = [];
    } else {
      lists = JSON.parse(localStorage.getItem('lists'));
    }

    if (userName === '') {
      userInfo.userName = 'Anonymous';
    } else {
      userInfo.userName = userName;
    }

    userInfo.score = score;

    lists.push(userInfo);
    
    let count = 1;
    lists
      .sort(function(a, b) {
        return a.score - b.score;
      })
      .forEach(userInfo => {
        userInfo.id = count;
        count++;
      });
      
      localStorage.setItem('lists', JSON.stringify(lists));
     // window.location.reload();
  });

//Get the best five results of game from LS
//
//Show only the first five results in the Gamer's Ranking
//
window.addEventListener('load', getGamersResult);

function getGamersResult() {
  const sortedArr = JSON.parse(localStorage.getItem('lists'));
  if(sortedArr){
    sortedArr.forEach(item => {
    if (item.id <= 5) {
      console.log(item);
      //Create new table elements
      const tbody = document.querySelector('tbody');
      const tr = document.createElement('tr');
      let th = document.createElement('th');
      let tdUsername = document.createElement('td');
      let tdResult = document.createElement('td');

      th.setAttribute('scope', 'row');

      th.textContent = item.id;
      tdUsername.textContent = item.userName;
      tdResult.textContent = item.score;

      tr.appendChild(th);
      tr.appendChild(tdUsername);
      tr.appendChild(tdResult);

      tbody.appendChild(tr);
    }
  });
  }
};




