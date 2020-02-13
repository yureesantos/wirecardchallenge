import { object, string } from 'yup';
import Buyer from '../models/Buyer';

class BuyerController {
  async store(req, res) {
    const schema = object().shape({
      name: string().required(),
      email: string()
        .email()
        .required(),
      cpf: string()
        .required()
        .min(11)
        .max(11),
    });

    await schema.validate(req.body).catch(err => {
      return res.status(400).json({ error: err.message });
    });

    const { email, cpf } = req.body;
    const userExists = await Buyer.findOne({ where: { email, cpf } });

    if (userExists) {
      return res.status(400).json({ error: 'Email or CPF already registered' });
    }

    const buyer = await Buyer.create(req.body);
    return res.json(buyer);
  }
}

export default new BuyerController();
