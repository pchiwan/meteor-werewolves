import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import enums from '/imports/helpers/enums.js';

Template.registerHelper('gameIsCreated', status => !!status ? status === enums.gameStatus.Created : false);
Template.registerHelper('gameIsStarted', status => !!status ? status === enums.gameStatus.Live : false);
Template.registerHelper('gameIsFinished', status => !!status ? status === enums.gameStatus.Finished : false);
Template.registerHelper('userOwnsGame', game => !!game ? game.owner === Meteor.userId() : false);
Template.registerHelper('villagersWon', game => !!game ? !!game.victory : false);