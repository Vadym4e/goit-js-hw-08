import Player from '@vimeo/player';
import { throttle } from 'lodash';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on(
  'timeupdate',
  throttle(evt => {
    localStorage.setItem('lastWatchedTime', evt.seconds);
  }, 1000)
);
player.setCurrentTime(localStorage.getItem('lastWatchedTime') || 0);
