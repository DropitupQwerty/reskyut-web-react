import img1 from './img1.png';

const account = [
  {
    id: '1',
    avatarPhoto: img1,
    firstName: 'Jacob Allen',
    middleName: ' Sabado',
    lastName: 'Valderama',
    userName: 'JacobAllen',
    userEmail: 'StrayWorthSaving@gmail.com',
    displayName: 'Stray Worth Saving',
    desc: 'This page is dedicated to rescuing and helping stray dogs and cats especially those in pain We are hoping those who will follow this page can extend prayers and help to these poor abused animals',
  },
  {
    id: '2',
    avatarPhoto: '',
    firstName: 'Jeffrey',
    middleName: ' DKA',
    lastName: 'Sanchez',
    userName: 'privatePej',
    userEmail: 'jeff@yahoo.com',
    displayName: 'Alaga ng kababayan',
    desc: ' This Animal Shelter is the best shelter',
  },
];

export function getAccounts() {
  return account;
}
export function getAccount(id) {
  return account.find((a) => a.id === id);
}

export function deleteAccount(id) {
  let accountDb = account.find((m) => m._id === id);
  account.splice(account.indexOf(accountDb), 1);
  return accountDb;
}
