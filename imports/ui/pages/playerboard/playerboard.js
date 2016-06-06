import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveDict } from 'meteor/reactive-dict';

import './playerboard.html';
import enums from '/imports/helpers/enums.js';

import { Games } from '/imports/api/games.js';
import { Players } from  '/imports/api/players.js';

Template.playerboard.onCreated(function () {
  Meteor.subscribe('games');
  Meteor.subscribe('players');
  
  this.state = new ReactiveDict();
  this.state.set('cardFlipped', false);  
  
  this.gameCode = FlowRouter.getParam('gamecode');
});

Template.playerboard.helpers({
  cardFlipped() {
    const instance = Template.instance();
    return instance.state.get('cardFlipped');
  },  
  player() {
    return Players.findOne({
      userId: Meteor.userId(),
      gameCode: Template.instance().gameCode
    });
  },
  game() {
    return Games.findOne({ gameCode: Template.instance().gameCode });
  }  
});

Template.playerboard.events({
  'click .card'(event, instance) {
    // flip card
    instance.state.set('cardFlipped', !instance.state.get('cardFlipped'));
  },
  'click #game-over'(event, instance) {
    FlowRouter.go('/gameover/' + instance.gameCode);
  }
});