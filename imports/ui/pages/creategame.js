import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveDict } from 'meteor/reactive-dict';

import enums from '../helpers/enums.js';
import './creategame.html';

import { Games } from '../../api/games.js';

Template.creategame.onCreated(function () {
  Meteor.subscribe('games');
    
  this.state = new ReactiveDict();
  this.state.set('specialChars', enums.roles.filter(x => x.hasSpecialPowers));
  this.state.set('wolfCount', 1); 
  
  this.gameCreated = (err, result) => {
    var newgame = Games.findOne({ _id: result });
    
    // navigate to waitboard            
    FlowRouter.go('/waitboard/' + newgame.gameCode);
  }
});

Template.creategame.helpers({
  specialChars() {
    const instance = Template.instance();
    return instance.state.get('specialChars');
  }
});

Template.creategame.events({
  'click .special-char'(event, instance) {
    var specialChars = instance.state.get('specialChars');
    var index = specialChars.findIndex((x) => {
      return x.name === this.name; 
    });
    specialChars[index].selected = !specialChars[index].selected;
    instance.state.set('specialChars', specialChars);
  },
  'click [name="wolves"]'(event, instance) {
    instance.state.set('wolfCount', event.target.value)
  },
  'click button#create-game'(event, instance) {
    if (instance.state.get('wolfCount') === 0) {
      return; // can't play without wolves!
    }
     
    var selectedSpecialChars = instance.state.get('specialChars')
      .filter(x => x.selected)
      .map(x => x.name); 
          
    // create game in database
    Meteor.call('games.create', 
      selectedSpecialChars,
      instance.state.get('wolfCount'),
      enums.gameStatus.Created,
      instance.gameCreated);                 
  }
});
