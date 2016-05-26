import { Template } from 'meteor/templating';

import enums from './enums.js';

Template.registerHelper('gameIsCreated', status => !!status ? status === enums.gameStatus.Created : false);
Template.registerHelper('gameIsStarted', status => !!status ? status === enums.gameStatus.Live : false);
Template.registerHelper('gameIsEnded', status => !!status ? status === enums.gameStatus.Finished : false);
