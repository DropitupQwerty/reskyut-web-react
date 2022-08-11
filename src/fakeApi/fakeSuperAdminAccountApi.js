import img1 from './img1.png';

const adminAccount = [
  {
    avatarPhoto: img1,
    firstName: 'Jacob Allen',
    middleName: ' Sabado',
    lastName: 'Valderama',
    userName: 'JacobAllen',
    email: 'vjacoballen@yahoo.com',
    displayName: 'Stray Worth Saving',
    desc: ' This Animal Shelter is the best shelter',
    password: '12345',
  },
];

export function getAccount() {
  return adminAccount;
}
