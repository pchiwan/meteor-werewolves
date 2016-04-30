import { Template } from 'meteor/templating';

import './joingame.html';

Template.joingame.events({
    'click button#join-game'(event, template) {
        var gameCode = template.find('#game-code').value;
        if (gameCode) {
            // check code in database and join game if it exists
            Router.go('/playerboard');
        }
    } 
});