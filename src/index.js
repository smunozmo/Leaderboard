/* eslint-disable no-unused-vars */

import _ from 'lodash';
import './style.css';

const refreshBtn = document.getElementById('refresh');
const submitBtn = document.getElementById('add');
const leaderboard = document.getElementById('leaderboard');
const nameInput = document.getElementById('name');
const scoreInput = document.getElementById('score');

function addScore() {
  fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/mchCFxyMLOw3tEZP2NKf/scores/', {
    method: 'POST',
    body: JSON.stringify({
      user: nameInput.value,
      score: scoreInput.value,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}

function createBoard(obj) {
  leaderboard.innerHTML = '';
  obj.result.forEach((e, index) => {
    leaderboard.innerHTML += `<li class="list-group-item">${obj.result[index].user} ${obj.result[index].score}</li>`;
  });
  nameInput.value = '';
  scoreInput.value = '';
}

async function getScores() {
  const getData = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/mchCFxyMLOw3tEZP2NKf/scores/');
  const usersAndScores = await getData.json();
  createBoard(usersAndScores);
  return usersAndScores;
}

getScores();

refreshBtn.addEventListener('click', getScores);
submitBtn.addEventListener('click', addScore);
