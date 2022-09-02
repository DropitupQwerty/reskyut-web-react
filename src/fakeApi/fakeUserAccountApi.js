import { getAnimal } from './fakeAnimalAccount';

const petChoice = getAnimal(getUserAccount.petAdopt);
console.log(petChoice);

const userAccount = [
  {
    id: 1,
    firstName: 'Jacob Allen',
    middleName: 'Sabado',
    lastName: 'Valderama',
    fbLink: 'https://www.facebook.com/vjacoballen/',
    petAdopt: 1,
  },
  {
    id: 2,
    firstName: 'Jeffrey',
    middleName: 'Sanchez',
    lastName: 'Tabao',
    fbLink: 'https://www.facebook.com/SaintJep',
    petAdopt: 2,
  },
  {
    id: 3,
    firstName: 'Erickson',
    middleName: 'DKA',
    lastName: 'liwanag',
    fbLink: 'https://www.facebook.com/null/',
    petAdopt: 3,
  },
  {
    id: 4,
    firstName: 'Lester',
    middleName: 'DKA',
    lastName: 'De leon',
    fbLink: 'https://www.facebook.com/null/',
    petAdopt: 4,
  },
  {
    id: 5,
    firstName: 'Lester',
    middleName: 'DKA',
    lastName: 'De leon',
    fbLink: 'https://www.facebook.com/null/',
    petAdopt: 5,
  },
];
export function getUserAccounts() {
  return userAccount;
}

export function getUserAccount(id) {
  return userAccount.find((u) => u.id === id);
}
