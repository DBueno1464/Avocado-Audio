'use strict';

// -------------------------------------------------------------
// VARIABLES BUTTONS
// -------------------------------------------------------------

var btnPlay = document.querySelectorAll('.btnPlay');
var btnPause = document.querySelectorAll('.btnPause');
var btnStop = document.querySelectorAll('.btnStop');
var btnMute = document.querySelectorAll('.btnMute');
var btnUnMute = document.querySelectorAll('.btnUnMute');
var btnShuffle = document.querySelectorAll('.btnShuffle');
var barVolume = document.querySelectorAll('.barVolume');
var barProgress = document.querySelectorAll('.barProgress');
var currentTime = document.querySelectorAll('.current-time');
var durationTime = document.querySelectorAll('.duration');

var speedLabel = document.querySelectorAll('label input');
var speed_1 = document.querySelectorAll('.speed-1');
var speed_2 = document.querySelectorAll('.speed-2');
var speed_3 = document.querySelectorAll('.speed-3');
var speed_4 = document.querySelectorAll('.speed-4');

// Local Storage Random Playlist
var localVideos = JSON.parse(localStorage.getItem('videoid'));

// -------------------------------------------------------------
// LANDING PAGE EVENT LISTENER
// -------------------------------------------------------------

var btnLanding = document.querySelector('.btnLanding');
var mixerLanding = document.querySelector('.mixer-landing');
var mixerHeader = document.querySelector('.mixer-header');
var mixerControls = document.querySelector('.mixer-controls');

btnLanding.addEventListener('click', function () {
  mixerLanding.classList.add('hidden');
  mixerHeader.classList.remove('hidden');
  mixerControls.classList.remove('hidden');
});

// -------------------------------------------------------------
// YOUTUBE API PLAYER
// -------------------------------------------------------------

var player1,
  player2,
  player3,
  player4 = 0;

function onYouTubeIframeAPIReady() {
  player1 = new YT.Player('player-1', {
    height: '390',
    width: '640',
    videoId: localVideos[0],
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
  player2 = new YT.Player('player-2', {
    height: '390',
    width: '640',
    videoId: localVideos[1],
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
  player3 = new YT.Player('player-3', {
    height: '390',
    width: '640',
    videoId: localVideos[2],
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
  player4 = new YT.Player('player-4', {
    height: '390',
    width: '640',
    videoId: localVideos[3],
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

function onPlayerReady() {
  // Set radio buttons checked = 1
  speed_1[3].checked = true;
  speed_2[3].checked = true;
  speed_3[3].checked = true;
  speed_4[3].checked = true;

  btnUnMute[0].classList.add('is-focused');
  btnUnMute[1].classList.add('is-focused');
  btnUnMute[2].classList.add('is-focused');
  btnUnMute[3].classList.add('is-focused');

  // Set intervals
  setIntervals();
}

function onPlayerStateChange(event) {
  // Get current state
  // Video has ended
  switch (event.data) {
    case YT.PlayerState.CUED:
      clearIntervals(); // clear all intervals
      break;
    default:
      clearIntervals(); // clear all intervals
      break;
  }
}

function update(node) {
  switch (node) {
    // Update player reported changes
    case 'currentTime':
      currentTime[0].innerHTML = formatTime(player1.getCurrentTime());
      currentTime[1].innerHTML = formatTime(player2.getCurrentTime());
      currentTime[2].innerHTML = formatTime(player3.getCurrentTime());
      currentTime[3].innerHTML = formatTime(player4.getCurrentTime());
      break;
    case 'durationTime':
      durationTime[0].innerHTML = formatTime(player1.getDuration());
      durationTime[1].innerHTML = formatTime(player2.getDuration());
      durationTime[2].innerHTML = formatTime(player3.getDuration());
      durationTime[3].innerHTML = formatTime(player4.getDuration());
      break;
    case 'percentLoaded':
      barProgress[0].value = player1.getVideoLoadedFraction() * 100;
      barProgress[1].value = player2.getVideoLoadedFraction() * 100;
      barProgress[2].value = player3.getVideoLoadedFraction() * 100;
      barProgress[3].value = player4.getVideoLoadedFraction() * 100;
      break;
    case 'volume':
      barVolume[0].value = player1.getVolume();
      barVolume[1].value = player2.getVolume();
      barVolume[2].value = player3.getVolume();
      barVolume[3].value = player4.getVolume();
      break;
  }
}

// -------------------------------------------------------------
// PLAY BUTTONS
// -------------------------------------------------------------

for (let i = 0; i < btnPlay.length; i++) {
  btnPlay[i].addEventListener('click', () => {
    var playerCat = String(`player${i + 1}`);
    var fnPlayer = window[playerCat];

    if (fnPlayer.getPlayerState() === 2) {
      fnPlayer.seekTo(fnPlayer.getCurrentTime(), true);
    } else if (fnPlayer.getPlayerState() === -1) {
      fnPlayer.seekTo(0, true);
    } else if (fnPlayer.getPlayerState() === 5) {
      fnPlayer.seekTo(0, true);
    }
    fnPlayer.playVideo();
  });
}

// -------------------------------------------------------------
// PAUSE BUTTONS
// -------------------------------------------------------------

for (let i = 0; i < btnPause.length; i++) {
  btnPause[i].addEventListener('click', () => {
    var playerCat = String(`player${i + 1}`);
    var fnPlayer = window[playerCat];

    fnPlayer.pauseVideo();
  });
}

// -------------------------------------------------------------
// STOP BUTTONS
// -------------------------------------------------------------

for (let i = 0; i < btnStop.length; i++) {
  btnStop[i].addEventListener('click', () => {
    var playerCat = String(`player${i + 1}`);
    var fnPlayer = window[playerCat];

    fnPlayer.stopVideo();
  });
}

// -------------------------------------------------------------
// MUTE BUTTONS
// -------------------------------------------------------------

for (let i = 0; i < btnMute.length; i++) {
  btnMute[i].addEventListener('click', () => {
    var playerCat = String(`player${i + 1}`);
    var fnPlayer = window[playerCat];

    btnMute[i].classList.toggle('is-focused');
    btnUnMute[i].classList.toggle('is-focused');
    fnPlayer.mute();
  });
}

// -------------------------------------------------------------
// UNMUTE BUTTONS
// -------------------------------------------------------------

for (let i = 0; i < btnUnMute.length; i++) {
  btnUnMute[i].addEventListener('click', () => {
    var playerCat = String(`player${i + 1}`);
    var fnPlayer = window[playerCat];

    btnMute[i].classList.toggle('is-focused');
    btnUnMute[i].classList.toggle('is-focused');
    fnPlayer.unMute();
  });
}

// -------------------------------------------------------------
// SPEED CONTROL
// -------------------------------------------------------------

for (let i = 0; i < speedLabel.length; i++) {
  speedLabel[i].addEventListener('click', () => {
    // gets the number value from the class
    // ex = speed-2 = 2
    var j = speedLabel[i].classList.value.substr(-1);
    // gets the value for the input box
    var rate = Number(speedLabel[i].value);

    var playerCat = String(`player${j}`);
    var fnPlayer = window[playerCat];

    fnPlayer.setPlaybackRate(rate);
  });
}

// -------------------------------------------------------------
// VOLUME BAR
// -------------------------------------------------------------

for (let i = 0; i < barVolume.length; i++) {
  barVolume[i].addEventListener('click', () => {
    var newVolume = barVolume[i].value;

    var playerCat = String(`player${i + 1}`);
    var fnPlayer = window[playerCat];

    fnPlayer.setVolume(newVolume);
  });
}

// -------------------------------------------------------------
// PROGRESS BAR
// -------------------------------------------------------------

for (let i = 0; i < barProgress.length; i++) {
  barProgress[i].addEventListener('click', () => {
    var playerCat = String(`player${i + 1}`);
    var fnPlayer = window[playerCat];

    var newTime = fnPlayer.getDuration() * (barProgress[i].value / 100);

    fnPlayer.seekTo(newTime);
  });
}

// -------------------------------------------------------------
// SETINTERVALS
// -------------------------------------------------------------

// Controls interval handlers to update page contens
// Array to track intervals
var activeIntervals = [];
function setIntervals() {
  // Sets invertval funtions to actively update page content
  activeIntervals[0] = setInterval(function () {
    update('currentTime');
  }, 500);
  activeIntervals[1] = setInterval(function () {
    update('durationTime');
  }, 500);
  activeIntervals[2] = setInterval(function () {
    update('percentLoaded');
  }, 1000);
  activeIntervals[3] = setInterval(function () {
    update('volume');
  }, 1000);
}

// -------------------------------------------------------------
// CLEARINTERVALS
// -------------------------------------------------------------

function clearIntervals() {
  // Clears existing intervals to actively update page content
  for (var interval in activeIntervals) {
    clearInterval(interval);
  }
}

// -------------------------------------------------------------
// FORMAT TIMER
// -------------------------------------------------------------

function formatTime(time) {
  time = Math.round(time);

  var minutes = Math.floor(time / 60),
    seconds = time - minutes * 60;

  seconds = seconds < 10 ? '0' + seconds : seconds;

  return minutes + ':' + seconds;
}
