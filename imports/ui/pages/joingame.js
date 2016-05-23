import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveDict } from 'meteor/reactive-dict';

import './joingame.html';
import enums from '../helpers/enums.js';

import { Games } from '../../api/games.js';
import { Players } from '../../api/players.js';

Template.joingame.onCreated(function () {
  Meteor.subscribe('games');
  Meteor.subscribe('players');
  
  this.state = new ReactiveDict();
  this.state.set('playerAlreadyLogged', false);
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
    var gameCode = template.find('#game-code').value;
    if (gameCode) {      
            
      // check if player already exists in the database
      var player = Players.findOne({
        userId: Meteor.userId(),
        gameCode: Template.instance().gameCode
      });
      
      if (player) {
        // do not allow players to log more than once into game
        instance().state.set('playerAlreadyLogged', true);
        return false;  
      }
      
      // check if game code exists in the database
      var game = Games.findOne({
        gameCode: gameCode,
        status: enums.gameStatus.Created
      });
      
      // if game with given code exists... 
      if (game) {
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
