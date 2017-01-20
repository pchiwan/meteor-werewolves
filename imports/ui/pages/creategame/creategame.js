import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveDict } from 'meteor/reactive-dict';
import { dashboard_games } from '/imports/api/views';
import { findOne } from '/imports/api/finder';
import { subscribe } from '/imports/api/subscriber';
import enums from '/imports/helpers/enums.js';
import './creategame.html';

const state = new ReactiveDict();

const gameCreated = (err, result) => {
  var newgame = findOne(dashboard_games, { find: { _id: result } });
  
  // navigate to waitboard            
  FlowRouter.go(`/waitboard/${newgame.gameCode}`);
}

Template.creategame.onCreated(function () {
  const instance = Template.instance();

  state.set('specialChars', enums.roles.filter(x => x.hasSpecialPowers));
  state.set('wolfCount', 1); 
  
  subscribe(dashboard_games, null, instance);
});

Template.creategame.helpers({
  ready() {
    return Template.instance().subscriptionsReady();
  },
  specialChars() {
    return state.get('specialChars');
  }
});

Template.creategame.events({
  'click .special-char'(event, instance) {
    var specialChars = state.get('specialChars');
    var index = specialChars.findIndex((x) => {
      return x.name === this.name; 
    });
    specialChars[index].selected = !specialChars[index].selected;
    state.set('specialChars', specialChars);
  },
  'click [name="wolves"]'(event, instance) {
    state.set('wolfCount', event.target.value)
  },
  'click button#create-game'(event, instance) {
    if (state.get('wolfCount') === 0) {
      return; // can't play without wolves!
    }
     
    var selectedSpecialChars = state.get('specialChars')
      .filter(x => x.selected)
      .map(x => x.name); 
          
    // create game in database
    Meteor.call('games.create', 
      selectedSpecialChars,
      state.get('wolfCount'),
      gameCreated);                 
  }
});
