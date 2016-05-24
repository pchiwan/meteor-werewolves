import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './waitboard.html';
import enums from '/imports/ui/helpers/enums.js';

import { Players } from '/imports/api/players.js';
import { Games } from '/imports/api/games.js';

Template.waitboard.onCreated(function () {
  let self = this;
  
  Meteor.subscribe('games');
  Meteor.subscribe('players');

  this.gameCode = FlowRouter.getParam('gamecode');

  this.fetchPlayers = () => {
    return Players.find({ gameCode: self.gameCode }).fetch();
  }

  this.fetchGame = () => {
    return Games.findOne({ gameCode: self.gameCode });
  }  
});

Template.waitboard.helpers({
  game() {
    return Template.instance().fetchGame();
  },
  players() {
    return Template.instance().fetchPlayers();
  },
  awaiting() {
    var players = Template.instance().fetchPlayers();
    // return players.length < enums.minPlayers;
    return false;
  }
});

Template.waitboard.events({
  'click #start-game'(event, instance) {
    // there should at least be 8 players to start the game
    var players = instance.fetchPlayers();

    // if (players.length >= enums.minPlayers) {
    // deal game cards
    Meteor.call('games.dealCards', instance.gameCode, players, enums.roles);

    // update game
    Meteor.call('games.updateStatus', instance.gameCode, enums.gameStatus.Live);

    // and navigate to deathboard
    FlowRouter.go('/dashboard/' + instance.gameCode);
    // }
  }
});

