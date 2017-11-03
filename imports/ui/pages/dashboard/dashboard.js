import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveVar } from 'meteor/reactive-var';
import { dashboard_games, dashboard_players, players } from '/imports/api/views';
import { fetch, findOne } from '/imports/api/finder';
import { subscribe } from '/imports/api/subscriber';
import { gameStatus, playerStatus } from '/imports/helpers/enums.js';
import './dashboard.html';
import './killmodal.js';
import './revivemodal.js';

const gameVar = new ReactiveVar(null);
const playersVar = new ReactiveVar([]);

Template.dashboard.onCreated(function () {
  const self = this;
  const instance = Template.instance();

  this.gameCode = FlowRouter.getParam('gamecode');

  const gamesFilter = { find: {
    owner: Meteor.userId(),
    gameCode: this.gameCode
  }};
  const gamesHandle = subscribe(dashboard_games, gamesFilter, instance);

  const playersFilter = { find: {
    gameCode: this.gameCode
  }};
  const playersHandle = subscribe(dashboard_players, playersFilter, instance);

  // subscribe(players, playersFilter, instance);

  instance.autorun(() => {
    if (gamesHandle.ready()) {
      gameVar.set(findOne(dashboard_games, gamesFilter));
    }
    if (playersHandle.ready()) {
      playersVar.set(fetch(dashboard_players, playersFilter));
    }
  });
});

Template.dashboard.helpers({
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

Template.dashboard.events({
  'click .player-name'(event, instance) {
    const id = $(event.target).attr('id');
    const player = findOne(players, { find: { _id: id } });

    const game = gameVar.get();
    if (player.status !== playerStatus.Dead) {
      Modal.show('killmodal', { game, player }, { keyboard: false });
    } else {
      if (!game.witchUsedRevivePower) {
        Modal.show('revivemodal', player, { keyboard: false });
      }
    }
  },
  'click #end-game'(event, instance) {
    Meteor.call('games.updateStatus', instance.gameCode, gameStatus.Finished);
  },
  'click #game-over'(event, instance) {
    FlowRouter.go(`/gameover/${instance.gameCode}`);
  },
  'click #go-home'() {
    FlowRouter.go('/');
  }
});