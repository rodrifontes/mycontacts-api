const ContactRepository = require('../repositories/ContactRepository');
const isValidUUID = require('../utils/isValidUUID');

class ContactController {
  // Listar todos os registros
  async index(request, response) {
    const { orderBy } = request.query;
    const contacts = await ContactRepository.findAll(orderBy);

    // Wildcard -> Curinga para quando minha API for publica:
    // response.setHeader('Access-Control-Allow-Origin', '*');
    // response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    response.json(contacts);
  }

  // Obter um registro
  async show(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid contact id' });
    }

    const contact = await ContactRepository.findById(id);
    if (!contact) {
      // 404: Not Found
      return response.status(404).json({ error: 'Contact not found' });
    }
    response.json(contact);
  }

  // Criar novo registro
  async store(request, response) {
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name) return response.status(400).json({ error: 'Name is required' });

    if (category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: 'Invalid category' });
    }

    if (email) {
      const contactExists = await ContactRepository.findByEmail(email);
      if (contactExists) {
        return response.status(400).json({ error: 'This e-mail is already in use' });
      }
    }

    const contact = await ContactRepository.create({
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });

    response.status(201).json(contact);
  }

  // Editar um registro
  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid contact id' });
    }

    if (category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: 'Invalid category' });
    }

    if (!name) return response.status(400).json({ error: 'Name is required' });

    const contactExists = await ContactRepository.findById(id);
    if (!contactExists) return response.status(404).json({ error: 'Contact not found' });

    if (email) {
      const contactByEmail = await ContactRepository.findByEmail(email);
      if (contactByEmail && contactByEmail.id !== id) {
        return response.status(400).json({ error: 'This e-mail is already in use' });
      }
    }

    const contact = await ContactRepository.update(id, {
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });

    response.json(contact);
  }

  // Deletar um registro
  async delete(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid contact id' });
    }

    /*
    const contact = await ContactRepository.findById(id);
    if (!contact) {
      // 404: Not Found
      return response.status(404).json({ error: 'User not found' });
    } */
    await ContactRepository.delete(id);
    // Manda o Status Code sem nenhuma msg no corpo
    // 204: Not Content - Equivale ao 200, só que mandamos o 204
    // quando deu tudo certo, mas a resposta n tem nenhum corpo
    response.sendStatus(204);
  }
}

// Singleton
// Padrão de projeto em que mantemos apenas 1 instância dos objetos dentro
// da aplicação
module.exports = new ContactController();
