export const roles = [
  { id: 1, name: 'townsfolk',     hasSpecialPowers: false, title: 'Townsfolk' },
  { id: 2, name: 'werewolf',      hasSpecialPowers: false, title: 'Werewolf' },
  { id: 3, name: 'fortuneteller', hasSpecialPowers: true,  title: 'Fortune teller' },
  { id: 4, name: 'huntsman',      hasSpecialPowers: true,  title: 'Huntsman' },
  { id: 5, name: 'littlegirl',    hasSpecialPowers: true,  title: 'Little girl' },
  { id: 6, name: 'witch',         hasSpecialPowers: true,  title: 'Witch' },
  { id: 7, name: 'cupid',         hasSpecialPowers: true,  title: 'Cupid' }
];

export const roleNames = {
  townsfolk: 'townsfolk',
  werewolf: 'werewolf',     
  fortuneteller: 'fortuneteller',
  huntsman: 'huntsman',     
  littlegirl: 'littlegirl',   
  witch: 'witch',
  cupid: 'cupid'
};

export const gamePhases = {
  Day: 1,
  Night: 2
};

export const gameStatus = {
  Created: 1,
  Live: 2,
  Finished: 3
};

export const playerStatus = {
  Alive: 1,
  Dead: 2
};

export const minPlayers = 7;
export const maxPlayers = 18;
