const CategoryRepository = require('../repositories/CategoryRepository');

class CategoryController {
  async index(request, response) {
    // Problema do try catch
    // só cai no tratamento de erro se o erro tiver acontecendo em algum bloco de código
    // q esta dentro do try
    // tratamento 1x1, gerando muita repetição de código
    /*
    try {
      const categories = await CategoryRepository.findAll();
      response.json(categories);
    } catch (error) {
      console.log(error);
      response.sendStatus(500);
    }
    */
    const categories = await CategoryRepository.findAll();
    response.json(categories);
  }

  // Error Handler (Middleware Express) -> Manipulador de Erros
  // Proprio Express disponibiliza um Middle que faz isso

  async store(request, response) {
    const { name } = request.body;

    if (!name) return response.status(400).json({ error: 'Name is required' });

    const category = await CategoryRepository.create({ name });

    response.json(category);
  }
}

module.exports = new CategoryController();
