# Meteor Werewolves
A Werewolves game web app developed with Meteor

## About
The main objective behind this project was to learn Meteor by developing something more elaborate and fun than the typical Todo app. Therefore I decided to implement a game web app that could be played through a smartphone (and any other web-enabled device, obviously), and would mainly take advantage of Meteor's amazing real-time data synchronization feature. So I chose my favorite party game for the experiment: [The Werewolves of Miller's Hollow](https://boardgamegeek.com/boardgame/25821/werewolves-millers-hollow).
    
The _Meteor Werewolves_ web app only eliminates the necessity of having the game cards physically; the flow of the game is exactly the same and the Moderator is still necessary. These are the keys to the web app:
* First and foremost, all players need to login in order to provide a username and unique identifier          
* The person creating the game will be the Moderator
* Players can join already created games by just providing an existing game code
* Once all players have joined the game, the roles are randomly and automatically assigned by the app
* Players may place their smartphone in front of them during the game
* The Moderator will have a special dashboard with which she will update the status of the game
* Player deaths will be notified through their smartphones, next revealing their identities

## Play the game
You can play the game with your friends at: [meteorwerewolv.es](https://meteorwerewolv.es). It's totally free!

## Play with the code
Once you've cloned or downloaded the repository you'll need to install Meteor on your machine, so head [here](https://www.meteor.com/install) for instructions and do so!

All the necessary Meteor packages are included in the repository under the folder `.meteor`, so you already have them in your machine. The only thing left is to install some Node.js packages by doing:

```
npm install
```

You're ready to go, so let's start the engines and lift off:
```
meteor
```

## Future improvements

* Add ambient sounds to the game (wolf howl, creepy night sound, rooster’s crowing, etc.)
* Add more special characters to the game (Cupid, Sheriff, Thief, etc.)
* Add more features to the Moderator’s dashboard
* Add feature to allow players to vote for the next player to be killed off during the day phase through their dashboard
* Add score boards & statistics
* Create smartphone application
