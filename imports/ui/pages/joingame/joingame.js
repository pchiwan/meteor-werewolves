import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveDict } from 'meteor/reactive-dict';

import './joingame.html';
import './joingame.scss';
import enums from '/imports/ui/helpers/enums.js';

import { Games } from '/imports/api/games.js';
import { Players } from '/imports/api/players.js';

Template.joingame.onCreated(function () {
  Meteor.subscribe('games');
  Meteor.subscribe('players');
});

Template.joingame.helpers({
  playerAlreadyLogged() {
    return Template.instance().state.get('playerAlreadyLogged');
  },
  playerName() {
    return Meteor.user().username;
  }
});

Template.joingame.events({
  'click button#join-game'(event, instance) {
    var gameCode = instance.find('#game-code').value;
    if (gameCode) {      
      // check whether game code exists in the database
      var game = Games.findOne({ gameCode: gameCode });
      
      if (game) {
        // check if player is already logged in to game
        var player = Players.findOne({
          userId: Meteor.userId(),
          gameCode: Template.instance().gameCode
        });
        
        if (player) {
          // if player is already logged in, send him to the playerboard
          FlowRouter.go('/playerboard/' + game.gameCode);
          return false;  
        }
        
        // register player to join game
        Meteor.call('players.create', 
          game.gameCode, 
          enums.playerStatus.Alive);
        
        // and navigate to player's dashboard
        FlowRouter.go('/playerboard/' + game.gameCode);               
      }      
    }
  } 
});
