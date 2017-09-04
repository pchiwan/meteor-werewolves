# MODEL DEFINITION

## Game
Represents a game of Werewolves of Miller's Hollow.

* **_id**: MongoDB's unique identifier
* **owner** : User ID (from `users` collection)
* **gameCode** : Alphanumeric game identifier
* **specialChars**: Array of special characters taking part of the game
  * _cupid_
  * _fortuneteller_
  * _huntsman_
  * _littlegirl_
  * _witch_
* **wolfCount**: Number of wolves taking part of the game
* **status**: Game status (Created | Live | Finished)
* **creationDate**: Game's creation date
* **modifiedDate**: Game's last modification date
* **dayNightCycles**: Counter of day/night cycles (just informative)
* **currentPhase**: Identifies current game phase (Day | Night) 
* **victory**: True if townsfolk won the game, false otherwise (undefined if game is not Finished)
* **witchUsedRevivePower**: True if witch used her revive power in the game already, false otherwise
* **witchUsedKillPower**: True if witch used her kill power in the game already, false otherwise

Example: 
```
{
    "_id" : "dNN2QTe7vmJaGE7sg",
    "owner" : "Sam4hwhLePcMdLWRY",
    "gameCode" : "IOIVMV",
    "specialChars" : [ 
        "fortuneteller", 
        "witch"
    ],
    "wolfCount" : 2,
    "status" : 2,
    "creationDate" : ISODate("2016-06-01T17:59:00.007Z"),
    "modifiedDate" : ISODate("2016-11-24T23:58:57.439Z"),
    "victory" : false,
    "witchUsedRevivePower" : false,
    "witchUsedKillPower": false
}
```

### _Extension proposal_
Add properties:

* **dayNightCycles**: Counter of day/night cycles (just informative)
* **currentPhase**: Identifies current game phase (Day | Night)


## Player
Represents a player who is taking part of a `Game`.

* **_id**: MongoDB's unique identifier
* **userI**: User ID (from `users` collection)
* **name**: User name
* **gameCode**: Alphanumeric game identifier
* **role**: Character role of the player, (*) indicates that it has special powers
  * _townsfolk_: Townsfolk, lives in fear of wolves and trusts no one
  * _werewolf_: Werewolf, kills by night, deceives by day
  * _fortuneteller_: Fortune teller, reveals a player's true identity (*)
  * _huntsman_: Huntsman, kills a player when killed (*)
  * _littlegirl_: Little girl, can peek during night phase (*)
  * _witch_: Witch, can kill and revive any player once during a game (*)
  * _cupid_: Cupid, makes any two people fall instantly in love 
* **status**: Player status (Alive | Dead)
* **isLover**: True if player was chosen as a lover by Cupid at beginning of game, false otherwise
* **killedBy**: Provides information on who (which role) killed the player (huntsman | townsfolk | werewolf | witch)

Example:
```
{
    "_id" : "abc03",
    "userId" : "zGAQaQzXW5GXAiJjK",
    "name" : "talizorah",
    "gameCode" : "IOIVMV",
    "role" : "townsfolk",
    "status" : 2
}
```

## User
Meteor's default User definition (as per using `accounts-ui` package)

* **_id**: MongoDB's unique identifier
* **createdAt**: Creation date
* **services**: [...]
* **username**: User name (login)
* **profile**: [...]

Example:
```
{
    "_id" : "HepCX3XuDwSbusMMR",
    "createdAt" : ISODate("2016-05-27T21:32:41.688Z"),
    "services" : {
        "password" : {
            "bcrypt" : "$2a$10$E30oKOcbsHWr34oFEWD6cOeVN/xLieoIgx4O1cRpNCdCdPZMk9zSi"
        },
        "resume" : {
            "loginTokens" : []
        }
    },
    "username" : "alenko",
    "profile" : {}
}
```