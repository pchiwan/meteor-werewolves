import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveDict } from 'meteor/reactive-dict';
import { ReactiveVar } from 'meteor/reactive-var';
import { playerboard_games, players } from '/imports/api/views'; 
import { findOne } from '/imports/api/finder';
import { subscribe } from '/imports/api/subscriber';
import { roles } from '/imports/helpers/enums.js';
import './playerboard.html';

const state = new ReactiveDict();
const gameVar = new ReactiveVar(null);
const playerVar = new ReactiveVar([]);
const roleTitles = {}

const getCardFlipped = () => {
  return state.get('cardFlipped');
}

Template.playerboard.onCreated(function () {
  const instance = Template.instance();
  this.gameCode = FlowRouter.getParam('gamecode');

  state.set('cardFlipped', false);

  roles.forEach(r => roleTitles[r.name] = r.title);

  const gamesFilter = { find: { 
    gameCode: this.gameCode 
  }}; 
  const gamesHandle = subscribe(playerboard_games, gamesFilter, instance);

  const playersFilter = { find: { 
    userId: Meteor.userId(),
    gameCode: this.gameCode 
  }};
  const playersHandle = subscribe(players, playersFilter, instance);

  instance.autorun(() => {
    if (gamesHandle.ready()) {
      gameVar.set(findOne(playerboard_games, gamesFilter));
    }
    if (playersHandle.ready()) {
      playerVar.set(findOne(players, playersFilter));
    }
  })
});

Template.playerboard.helpers({
  cardFlipped() {
    return getCardFlipped();
  },  
  game() {
    return gameVar.get();
  }, 
  player() {
    return playerVar.get();
  },
  roleTitle() {
    return roleTitles[playerVar.get().role];
  },
  ready() {
    return Template.instance().subscriptionsReady();
  }
});

Template.playerboard.events({
  'click .card'(event, instance) {
    // flip card
    state.set('cardFlipped', !getCardFlipped());
  },
  'click #game-over'(event, instance) {
    FlowRouter.go(`/gameover/${instance.gameCode}`);
  }
});