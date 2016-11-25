export default {  
  roles: [
    { id: 1, name: 'villager',      hasSpecialPowers: false, title: 'Villager' },
    { id: 2, name: 'werewolf',      hasSpecialPowers: false, title: 'Werewolf' },
    { id: 3, name: 'fortuneteller', hasSpecialPowers: true,  title: 'Fortune teller' },
    { id: 4, name: 'huntsman',      hasSpecialPowers: true,  title: 'Huntsman' },
    { id: 5, name: 'littlegirl',    hasSpecialPowers: true,  title: 'Little girl' },
    { id: 6, name: 'witch',         hasSpecialPowers: true,  title: 'Witch' },
    { id: 7, name: 'cupid',         hasSpecialPowers: true,  title: 'Cupid' }
  ],
  roleNames: {
    villager: 'villager',
    werewolf: 'werewolf',     
    fortuneteller: 'fortuneteller',
    huntsman: 'huntsman',     
    littlegirl: 'littlegirl',   
    witch: 'witch',
    cupid: 'cupid'
  },
  gamePhases: {
    Day: 1,
    Night: 2
  },
  gameStatus: {
    Created: 1,
    Live: 2,
    Finished: 3
  },
  playerStatus: {
    Alive: 1,
    Dead: 2
  },
  minPlayers: 8,
  maxPlayers: 18
};