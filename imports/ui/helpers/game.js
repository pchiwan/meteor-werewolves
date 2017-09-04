import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { gameStatus } from '/imports/helpers/enums.js';

Template.registerHelper('gameIsCreated', status => !!status ? status === gameStatus.Created : false);
Template.registerHelper('gameIsStarted', status => !!status ? status === gameStatus.Live : false);
Template.registerHelper('gameIsFinished', status => !!status ? status === gameStatus.Finished : false);
Template.registerHelper('userOwnsGame', game => !!game ? game.owner === Meteor.userId() : false);
Template.registerHelper('townsfolkWon', game => !!game ? !!game.victory : false);
Template.registerHelper('gameStatus', status => {
  switch (status) {
    case gameStatus.Created:
    return 'created';
    case gameStatus.Live:
    return 'live';
    case gameStatus.Finished:
    return 'finished';
  }
  return '';
})
