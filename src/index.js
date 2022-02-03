const express = require('express');
require('express-async-errors');

const cors = require('./app/middlewares/cors');
const errorHandler = require('./app/middlewares/errorHandler');
const routes = require('./routes');

const app = express();

// Middlewares
// O Express interpreta nossas todas tbm como se fossem middlewares,
// por isso defino um da mesma forma que defino uma rota
// Os Middlewares são executados na ordem que são declarados
/* app.use((request, response) => {
  request.appId = 'My Contacts';
  // Para travar a requisição em um middleware basta enviar um response.send
  response.send('Interceptado pelo Middleware');
}); */
// Middleware para fazer o parse do body
app.use(express.json());
app.use(cors);
app.use(routes);
app.use(errorHandler);

app.listen(3001, () => console.log('🔥 Server started at http://localhost:3001'));
