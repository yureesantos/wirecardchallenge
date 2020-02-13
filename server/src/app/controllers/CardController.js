import { object, string, number } from 'yup';
import Card from '../models/Card';

class CardController {
  async store(req, res) {
    const schema = object().shape({
      card_holder: string().required(),
      card_number: string()
        .required()
        .min(16)
        .max(16),
      card_expiration: string().required(),
      card_cvv: number().required(),
    });

    await schema.validate(req.body).catch(err => {
      return res.status(400).json({ error: err.message });
    });

    const card = await Card.create(req.body);

    return res.json(card);
  }
}

export default new CardController();
