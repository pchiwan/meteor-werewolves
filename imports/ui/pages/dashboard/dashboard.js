import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveDict } from 'meteor/reactive-dict';

import './dashboard.html';
import enums from '/imports/ui/helpers/enums.js';

import { Players } from '/imports/api/players.js';
import { Games } from '/imports/api/games.js';

Template.dashboard.onCreated(function () {
  let self = this;
  
  Meteor.subscribe('games');
  Meteor.subscribe('players');
  
  this.gameCode = FlowRouter.getParam('gamecode');
  
  this.fetchGame = () => {
    return Games.findOne({ gameCode: self.gameCode });
  }
});

Template.dashboard.helpers({  
  game() {
    return Template.instance().fetchGame();
  },
  players() {
    return Players.find({ gameCode: Template.instance().gameCode });    
  }
});

Template.dashboard.events({
  'click #end-game'(event, instance) {
    Meteor.call('games.updateStatus', instance.gameCode, enums.gameStatus.Finished);
  }
});