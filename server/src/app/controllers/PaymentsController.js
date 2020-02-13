import { object, string } from 'yup';
import Payment from '../models/Payment';

class PaymentController {
  async store(req, res) {
    const { type } = req.body;
    let payment = await Payment.create(req.body);
    if (type === 2) {
      payment = await Payment.create(req.body);
      return res.json({
        payment,
        boleto: '23790.50400 42000.212151 56008.109201 2 81660000019900',
      });
    }
    return res.json(payment);
  }

  async update(req, res) {
    const schema = object().shape({
      status: string().required(),
    });

    await schema.validate(req.body).catch(err => {
      return res.status(400).json({ error: err.message });
    });

    const payment = await Payment.findByPk(req.params.id);

    const { status } = await payment.update(req.body);

    return res.json({ status });
  }

  async index(req, res) {
    const { id } = req.params;

    const { status } = await Payment.findOne({
      where: { id },
    });

    return res.json({
      status,
    });
  }
}

export default new PaymentController();
