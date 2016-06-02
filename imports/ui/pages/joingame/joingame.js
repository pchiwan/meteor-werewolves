import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveDict } from 'meteor/reactive-dict';

import './joingame.html';
import './joingame.scss';
import enums from '/imports/helpers/enums.js';

import { Games } from '/imports/api/games.js';
import { Players } from '/imports/api/players.js';

Template.joingame.onCreated(function () {
  Meteor.subscribe('games');
  Meteor.subscribe('players');
  
  this.state = new ReactiveDict();
  this.state.set('hasErrors', false);
  this.state.set('errorMessage', '');
});

Template.joingame.helpers({
  playerName() {
    return Meteor.user().username;
  },
  hasErrors() {
    return Template.instance().state.get('hasErrors');
  },
  errorMessage() {
    return Template.instance().state.get('errorMessage');
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
        
        // if player is already logged in, send him to the playerboard
        if (player) {          
          FlowRouter.go('/playerboard/' + game.gameCode);
          return false;  
        }
                
        var total = Players.find({ gameCode: Template.instance().gameCode }).count();
        
        // player is not logged in and
        // + the game is already full (current number of players = max),
        // + or the game is live
        // then kick player out
        if (game.status === enums.gameStatus.Live || total === enums.maxPlayers) {
          instance.state.set('hasErrors', true);
          instance.state.set('errorMessage', 'You can not join this game. Please use a different code.');
          return false;
        }
        
        // finally, if all is good register player to join game
        Meteor.call('players.create', game.gameCode);
        
        // and navigate to player's dashboard
        FlowRouter.go('/playerboard/' + game.gameCode);               
      } else {
        instance.state.set('hasErrors', true);
        instance.state.set('errorMessage', 'This game does not exist. Please use a different code.');
      }     
    }
  } 
});
