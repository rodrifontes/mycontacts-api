const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'mycontacts',
});

client.connect();

exports.query = async (query, values) => {
  // A função query retorna uma promisse
  const { rows } = await client.query(query, values);
  return rows;
};

// Query('SELECT * FROM contacts').then(console.log);

// Como só estamos pegando o valor e executando a função em seguida
// a uma versão simplificada
// client.query('SELECT * FROM contacts').then((result) => console.log(result));
// client.query('SELECT * FROM contacts').then(console.log);
