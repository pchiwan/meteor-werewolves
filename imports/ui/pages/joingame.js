import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './joingame.html';
import enums from '../helpers/enums.js';

import { Games } from '../../api/games.js';
import { Players } from '../../api/players.js';

Template.joingame.onCreated(function () {
  Meteor.subscribe('games');
  Meteor.subscribe('players');
});

Template.joingame.events({
  'click button#join-game'(event, template) {
    var gameCode = template.find('#game-code').value;
    if (gameCode) {
      // check code in database
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
