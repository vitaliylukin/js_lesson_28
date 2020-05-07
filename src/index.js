'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
import portfolioChangePhotos from './modules/portfolioChangePhotos';

//Timer Block
countTimer('30 June 2020'); //передаем дату
//Toggle Menu
toggleMenu();
//Popup Block
togglePopUp();
//Tabs Block
tabs();
//Slider
slider();
//Calculator
calc(100);
//send-ajax=form
sendForm();
//Portfolio change photos
portfolioChangePhotos();