import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveDict } from 'meteor/reactive-dict';

import './playerboard.html';
import enums from '../helpers/enums.js';

import { Games } from '../../api/games.js';
import { Players } from  '../../api/players.js';

Template.playerboard.onCreated(function () {
  Meteor.subscribe('games');
  Meteor.subscribe('players');
  
  this.state = new ReactiveDict();
  this.state.set('cardFlipped', false);  
});

Template.playerboard.helpers({
  cardFlipped() {
    const instance = Template.instance();
    return instance.state.get('cardFlipped');
  },
  player() {
    return Players.findOne({
      userId: Meteor.userId(),
      gameCode: FlowRouter.getParam('gamecode')
    });
  },
  game() {
    return Games.findOne({
      gameCode: FlowRouter.getParam('gamecode') 
    });
  }  
});

Template.playerboard.events({
  'click .card'(event, instance) {
    // flip card
    instance.state.set('cardFlipped', !instance.state.get('cardFlipped'));
  }
});