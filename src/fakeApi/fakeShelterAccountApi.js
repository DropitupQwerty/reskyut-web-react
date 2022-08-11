import img1 from './img1.png';

const account = [
  {
    id: '1',
    avatarPhoto: img1,
    firstName: 'Jacob Allen',
    middleName: ' Sabado',
    lastName: 'Valderama',
    userName: 'JacobAllen',
    userEmail: 'vjacoballen@yahoo.com',
    displayName: 'Stray Worth Saving',
    desc: ' This Animal Shelter is the best shelter',
  },
  {
    id: '2',
    avatarPhoto: img1,
    firstName: 'Jeffrey',
    middleName: ' DKA',
    lastName: 'Sanchez',
    userName: 'privatePej',
    userEmail: 'jeff@yahoo.com',
    displayName: 'Alaga ng kababayan',
    desc: ' This Animal Shelter is the best shelter',
  },
];

export function getAccount() {
  return account;
}

export function deleteAccount(id) {
  let accountDb = account.find((m) => m._id === id);
  account.splice(account.indexOf(accountDb), 1);
  return accountDb;
}
