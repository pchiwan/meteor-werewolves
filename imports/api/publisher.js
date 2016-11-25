import { Meteor } from 'meteor/meteor'
import views from './views';

if (Meteor.isServer) {
  for (const key in views) {
    const view = views[key];
    const collection = view.collection();
    Meteor.publish(view.name, () => {
      return collection.find(view.find, view.options);
    });
  }
}
