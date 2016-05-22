import { Template } from 'meteor/templating';

import enums from './enums.js';

Template.registerHelper('gameCreated', game => !!game ? game.status === enums.gameStatus.Created : false);
Template.registerHelper('gameStarted', game => !!game ? game.status === enums.gameStatus.Live : false);
Template.registerHelper('gameEnded', game => !!game ? game.status === enums.gameStatus.Finished : false);
