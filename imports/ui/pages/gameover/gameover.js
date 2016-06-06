import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveDict } from 'meteor/reactive-dict';

import './gameover.html';

import { Players } from '/imports/api/players.js';
import { Games } from '/imports/api/games.js';

Template.gameover.onCreated(function () {
  let self = this;

  Meteor.subscribe('games');
  Meteor.subscribe('players');

  this.gameCode = FlowRouter.getParam('gamecode');
});

Template.gameover.helpers({
  game() {
    return Games.findOne({ gameCode: Template.instance().gameCode });
  },
  players() {
    return Players.find({ gameCode: Template.instance().gameCode }).fetch();
  }
});

Template.gameover.events({
  'click #go-home'() {
    FlowRouter.go('/');
  }
});
