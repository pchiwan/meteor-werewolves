import { Template } from 'meteor/templating';

import './home.html';
import './login.html';
import './startscreen.html';

Template.startscreen.rendered = () => {
    Accounts._loginButtonsSession.set('dropdownVisible', true);
    $('.login-close-text').hide();      
}

Template.startscreen.events({
    'click #create-game'(event) {
        Router.go('/creategame');
    },
    'click #join-game'(event) {
        Router.go('/joingame');
    }
});