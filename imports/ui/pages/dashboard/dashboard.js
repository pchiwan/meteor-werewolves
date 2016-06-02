import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveDict } from 'meteor/reactive-dict';

import './dashboard.html';
import './killmodal.js';
import enums from '/imports/helpers/enums.js';

import { Players } from '/imports/api/players.js';
import { Games } from '/imports/api/games.js';

Template.dashboard.onCreated(function () {
  let self = this;

  Meteor.subscribe('games');
  Meteor.subscribe('players');

  this.gameCode = FlowRouter.getParam('gamecode');

  this.selectedPlayer = null;

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
  },
  selectedPlayer() {
    return Template.instance().selectedPlayer;
  }
});

Template.dashboard.events({
  'click .player-name'(event, instance) {
    var id = $(event.target).attr('id'),
      player = Players.findOne({ _id: id });

    if (player.status !== enums.playerStatus.Dead) {
      Modal.show('killmodal', player, { keyboard: false });
    } else {
      var game = Template.instance().fetchGame();
      if (!game.witchUsedRevivePower) {
        Modal.show('revivemodal', player, { keyboard: false });
      }  
    }
  },
  'click #end-game'(event, instance) {
    Meteor.call('games.updateStatus', instance.gameCode, enums.gameStatus.Finished);
  },
  'click #go-home'() {
    FlowRouter.go('/');
  }
});