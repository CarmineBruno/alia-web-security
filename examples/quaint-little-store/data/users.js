/**
 * @typedef {Object} User
 * @property {string} name
 * @property {string} email
 * @property {string} password
 * @property {boolean} admin
 * @property {string} creditCard
 * @property {string} cvv
 * @property {string} expirationDate
 */

/**
 * A list of users to insert into the database.
 * @type {User[]}
 */
const users = [
  {
    name: 'Obi-Wan Kenobi',
    email: 'obiwan@force.com',
    password: 'password123',
    admin: false,
    creditCard: '3615-500732-9915',
    cvv: '994',
    expirationDate: '05/2025',
  },
  {
    name: 'Darth Vader',
    email: 'admin@example.com',
    password: 'password564',
    admin: true,
    creditCard: '3748-933522-84323',
    cvv: '564',
    expirationDate: '12/2024',
  },
  {
    name: 'Frodo',
    email: 'frodo@contea.it',
    password: 'password326',
    admin: false,
    creditCard: '3663-292494-4638',
    cvv: '326',
    expirationDate: '02/2025',
  },
  {
    name: 'therealneo',
    email: 'matrixescape@redpill.com',
    password: 'password469',
    admin: false,
    creditCard: '5038932374579266484',
    cvv: '469',
    expirationDate: '09/2024',
  },
  {
    name: 'Gandalf The Wizard',
    email: 'wizardproblems@middleearth.com',
    password: 'password388',
    admin: false,
    creditCard: '5553-5227-9814-4179',
    cvv: '388',
    expirationDate: '04/2025',
  },
];

export default users;
