import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './home.html';
import './home.scss';
import './login.html';
import './startscreen.html';

Template.startscreen.rendered = () => {
  Accounts._loginButtonsSession.set('dropdownVisible', true);
  $('.login-close-text').hide();      
}

Template.startscreen.events({
  'click #create-game'(event) {
    FlowRouter.go('/creategame');
  },
  'click #join-game'(event) {
    FlowRouter.go('/joingame');
  },
  'click #logout'(event) {
    Meteor.logout();
    FlowRouter.go('/');
  }
});