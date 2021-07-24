'use strict';

// Variables
var inputSearch = document.querySelector('input');
var btnSearch = document.getElementById('btnSearch');
var videoList = document.getElementById('videoList');

// API KEY
var youtubeAPIKey = 'AIzaSyBLaQhMDZXssb5fQR-cznQZE6XMHkcABI8';
var wordsAPIKey = '47de2ec1bfmsh3e9119d6a18e315p16d88ejsn8fb3d33e52c8';

// Derick API = AIzaSyA14QQoyxcmvgK74DMYoKuTnPnDCFYxbU4
// Allie API = AIzaSyAOhTN-z_jfKMROH447wGEiZF-l62N78mQ

var wordArray = [];
var videoArray = [];

// RANDOM WORD  --------------------------------------------------

// BUG NEED TO FIGURE OUT HOW TO GET THE LOOP TO RUN
btnSearch.addEventListener('click', function () {
  for (let i = 0; i <= 3; i++) {
    getRandomWord();
  }
});

function getRandomWord() {
  fetch('https://wordsapiv1.p.rapidapi.com/words/?random=true', {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '47de2ec1bfmsh3e9119d6a18e315p16d88ejsn8fb3d33e52c8',
      'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
    },
  })
    .then((response) => {
      return response.json();
      // console.log(response.json());
    })
    .then(function (data) {
      wordArray.push(data.word);
      storeWords();
      getVideoID(data.word);
    });
}

// YOUTUBE SEARCH ------------------------------------------------

function getVideoID(word) {
  // e.preventDefault();

  var request = gapi.client.youtube.search.list({
    part: 'snippet',
    type: 'video',
    q: encodeURIComponent(word).replace(/%20/g, '+'),
    maxResults: 1,
    order: 'viewCount',
    publishedAfter: randomDate(),
  });

  request.execute(function (response) {
    var results = response.result;
    results.items.forEach(function (index, item, array) {
      videoArray.push(index.id.videoId);
      storeVideoID();
    });
  });
}

function init() {
  gapi.client.setApiKey(youtubeAPIKey);
  gapi.client.load('youtube', 'v3', function () {});
}

// ----------------------------------------------------------------------------------
// // STORE YOUTUBE ID'S
// ----------------------------------------------------------------------------------

function storeWords() {
  localStorage.setItem('words', JSON.stringify(wordArray));
}

function storeVideoID() {
  localStorage.setItem('videoid', JSON.stringify(videoArray));
}

// ----------------------------------------------------------------------------------

// RANDOM DATE GENERATOR
function randomDate() {
  return new Date(new Date('2010-02-12T00:00:00Z').getTime() + Math.random() * (new Date('2021-06-12T00:00:00Z').getTime() - new Date('2010-02-12T00:00:00Z').getTime())).toISOString();
}
