const express = require('express');
require('express-async-errors');

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
app.use(routes);
app.use((error, request, response, next) => {
  console.log('##### Error Handler #####');
  console.log(error);
  response.sendStatus(500);
});

app.listen(3000, () => console.log('🔥 Server started at http://localhost:3000'));
