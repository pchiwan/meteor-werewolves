import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './creategame.html';

Template.creategame.onCreated(function () {
    this.state = new ReactiveDict();
    this.state.set('specialChars', [
        { name: 'fortuneteller', title: 'Fortune teller' },
        { name: 'huntsman', title: 'Huntsman' },
        { name: 'littlegirl', title: 'Little girl' },
        { name: 'witch', title: 'Witch' }
    ]);
    this.state.set('wolfCount', 1); 
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
        
        // create game in database and navigate to dashboard
        Router.go('/dashboard');
    }
})