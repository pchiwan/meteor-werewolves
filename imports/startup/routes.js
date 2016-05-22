import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.route('/', {
  action: () => {
    BlazeLayout.render('layout', { main: 'home' });
  }
});

FlowRouter.route('/creategame', {
  action: () => {
    BlazeLayout.render('layout', { main: 'creategame' });
  }
});

FlowRouter.route('/waitboard/:gamecode', {
  action: () => {
    BlazeLayout.render('layout', { main: 'waitboard' });
  }
});

FlowRouter.route('/dashboard/:gamecode', {
  action: () => {
    BlazeLayout.render('layout', { main: 'dashboard' });
  }
});

FlowRouter.route('/joingame', {
  action: () => {
    BlazeLayout.render('layout', { main: 'joingame' });
  }
});

FlowRouter.route('/playerboard/:gamecode', {
  action: () => {
    BlazeLayout.render('layout', { main: 'playerboard' });
  }
});

FlowRouter.notFound = {    
  action: function() {
    BlazeLayout.render('layout', { main: '404' });
  }
};
