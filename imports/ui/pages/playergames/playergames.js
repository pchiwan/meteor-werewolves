import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveVar } from 'meteor/reactive-var';
import { players, games } from '/imports/api/views';
import { fetch } from '/imports/api/finder';
import { subscribe } from '/imports/api/subscriber';
import './playergames.html';
import './playergames.scss';

const gamesVar = new ReactiveVar([]);

Template.playergames.onCreated(function () {
  const self = this;
  
  Meteor.call('getPlayerGames', Meteor.userId(), (err, data) => {
    gamesVar.set(data);
  });
});

Template.playergames.helpers({
  games() {
    return gamesVar.get();
  },
  ready() {
    return Template.instance().subscriptionsReady();
  }
});

Template.playergames.events({
  'click .game'(event, instance) {
    const gameCode = $(event.target).attr('id');

    FlowRouter.go(`/playerboard/${gameCode}`);
  }
});