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
var speedLabel = document.querySelectorAll('label input');
var barVolume = document.querySelectorAll('.barVolume');
var barProgress = document.querySelectorAll('.barProgress');
var currentTime = document.querySelectorAll('.current-time');
var durationTime = document.querySelectorAll('.duration');

// RANDOM PLAYLIST
var randomVideo_1 = playlist_1[Math.floor(Math.random() * playlist_1.length)];
var randomVideo_2 = playlist_2[Math.floor(Math.random() * playlist_2.length)];
var randomVideo_3 = playlist_3[Math.floor(Math.random() * playlist_3.length)];
var randomVideo_4 = playlist_4[Math.floor(Math.random() * playlist_4.length)];

// -------------------------------------------------------------
// YOUTUBE API PLAYER
// -------------------------------------------------------------

var player1,
  player2,
  player3,
  player4,
  time_update_interval = 0;

function onYouTubeIframeAPIReady() {
  player1 = new YT.Player('player-1', {
    height: '390',
    width: '640',
    videoId: randomVideo_1,
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
  player2 = new YT.Player('player-2', {
    height: '390',
    width: '640',
    videoId: randomVideo_2,
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
  player3 = new YT.Player('player-3', {
    height: '390',
    width: '640',
    videoId: randomVideo_3,
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
  player4 = new YT.Player('player-4', {
    height: '390',
    width: '640',
    videoId: randomVideo_4,
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

function onPlayerReady() {
  // Update page after player is ready
  setIntervals();
}

function onPlayerStateChange(event) {
  // Get current state
  // Video has ended
  switch (event.data) {
    // case YT.PlayerState.ENDED:
    //   updateAll() // set status for state, ...
    //   clearIntervals() // clear all intervals
    //   break;
    // case YT.PlayerState.PLAYING:
    //   updateAll() // set status for state, ...
    //   setIntervals() // set intervals for ...
    //   break;
    // case YT.PlayerState.PAUSED:
    //   updateAll() // set status for state, ...
    //   clearIntervals() // clear all intervals
    //   break;
    // case YT.PlayerState.BUFFERING:
    //   updateAll() // set status for state, ...
    //   clearIntervals() // clear all intervals
    //   break;
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

    fnPlayer.unMute();
  });
}
// -------------------------------------------------------------
// SHUFFLE BAR
// -------------------------------------------------------------

for (let i = 0; i < btnShuffle.length; i++) {
  btnShuffle[i].addEventListener('click', () => {
    var shuffleCat = String(`playlist_${i + 1}`);
    var fnList = window[shuffleCat];
    var shuffleVideo = fnList[Math.floor(Math.random() * fnList.length)];

    var playerCat = String(`player${i + 1}`);
    var fnPlayer = window[playerCat];

    fnPlayer.loadVideoById({
      videoId: shuffleVideo,
    });
    fnPlayer.seekTo(0, true);
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
// PROGRESS BAR
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
  }, 500);
}

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
