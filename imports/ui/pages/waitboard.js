import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './waitboard.html';
import enums from '../helpers/enums.js';

import { Players } from '../../api/players.js';
import { Games } from '../../api/games.js';

Template.waitboard.onCreated(function () {
  Meteor.subscribe('games');
  Meteor.subscribe('players');   
});

Template.waitboard.helpers({  
  game() {
    return fetchGame();
  },
  players() {
    return fetchPlayers();
  },
  awaiting() {
    var players = fetchPlayers(); 
    // return players.length < enums.minPlayers;
    return false;
  }
});

Template.waitboard.events({
  'click #start-game'(event, instance) {
    // there should at least be 8 players to start the game
    var players = fetchPlayers();
    
    // if (players.length >= enums.minPlayers) {
      // deal game cards
      Meteor.call('games.dealCards', FlowRouter.getParam('gamecode'), players, enums.roles);
      
      // update game
      Meteor.call('games.updateStatus', FlowRouter.getParam('gamecode'), enums.gameStatus.Live);
      
      // and navigate to deathboard
      FlowRouter.go('/dashboard/' + FlowRouter.getParam('gamecode'));
    // }
  }
});

function fetchPlayers() {
  return Players.find({
    gameCode: FlowRouter.getParam('gamecode') 
  }).fetch();
}

function fetchGame() {
  return Games.findOne({
    gameCode: FlowRouter.getParam('gamecode') 
  });
}
