export default {  
  roles: [
    { id: 1, name: 'fortuneteller', hasSpecialPowers: true,  title: 'Fortune teller' },
    { id: 2, name: 'huntsman',      hasSpecialPowers: true,  title: 'Huntsman' },
    { id: 3, name: 'littlegirl',    hasSpecialPowers: true,  title: 'Little girl' },
    { id: 4, name: 'witch',         hasSpecialPowers: true,  title: 'Witch' },
    { id: 5, name: 'werewolf',      hasSpecialPowers: false, title: 'Werewolf' },
    { id: 6, name: 'villager',      hasSpecialPowers: false, title: 'Villager' }
  ],
  roleNames: {
    fortuneteller: 'fortuneteller',
    huntsman: 'huntsman',     
    littlegirl: 'littlegirl',   
    witch: 'witch',        
    werewolf: 'werewolf',     
    villager: 'villager'     
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