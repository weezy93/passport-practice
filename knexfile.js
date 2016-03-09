module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost:5432/passport'
  },

  deployment: {
    client: 'pg',
    connection: 'postgres://'
  }
};
