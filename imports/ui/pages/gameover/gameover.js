import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveVar } from 'meteor/reactive-var';
import { playerboard_games, playerboard_players } from '/imports/api/views';
import { fetch, findOne } from '/imports/api/finder';
import { subscribe } from '/imports/api/subscriber';
import './gameover.html';

const gameVar = new ReactiveVar(null);
const playersVar = new ReactiveVar([]);

Template.gameover.onCreated(function () {
  const self = this;
  const instance = Template.instance();

  this.gameCode = FlowRouter.getParam('gamecode');

  const filter = { find: {
    gameCode: this.gameCode
  }};
  const gamesHandle = subscribe(playerboard_games, filter, instance);
  const playersHandle = subscribe(playerboard_players, filter, instance);

  instance.autorun(() => {
    if (gamesHandle.ready()) {
      gameVar.set(findOne(playerboard_games, filter));
    }
    if (playersHandle.ready()) {
      playersVar.set(fetch(playerboard_players, filter));
    }
  });

});

Template.gameover.helpers({
  game() {
    return gameVar.get();
  },
  players() {
    return playersVar.get();
  },
  ready() {
    return Template.instance().subscriptionsReady();
  }
});

Template.gameover.events({
  'click #go-home'() {
    FlowRouter.go('/');
  }
});
