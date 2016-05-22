import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveDict } from 'meteor/reactive-dict';

import './dashboard.html';

import { Players } from '../../api/players.js';
import { Games } from '../../api/games.js';

Template.dashboard.onCreated(function () {
  Meteor.subscribe('games');
  Meteor.subscribe('players');
});

Template.dashboard.helpers({  
  game() {
    return Games.findOne({
      gameCode: FlowRouter.getParam('gamecode') 
    });
  },
  players() {
    return Players.find({
      gameCode: FlowRouter.getParam('gamecode') 
    });    
  }
});

Template.dashboard.events({

});