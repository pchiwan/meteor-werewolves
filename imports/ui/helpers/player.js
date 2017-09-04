import { Template } from 'meteor/templating';
import { playerStatus } from '/imports/helpers/enums.js';

Template.registerHelper('playerIsAlive', status => !!status ? status === playerStatus.Alive : false);
Template.registerHelper('playerIsDead', status => !!status ? status === playerStatus.Dead : false);