import { Template } from 'meteor/templating';

import './home.html';
import './login.html';
import './startScreen.html';

Template.startscreen.rendered = () => {
    Accounts._loginButtonsSession.set('dropdownVisible', true);
    $('.login-close-text').hide();      
}

Template.startscreen.events({
    'click #create-game'(event) {
        Router.go('/newgame');
    },
    'click #join-game'(event) {
        console.log('join game');
    }
});