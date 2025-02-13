const CardsModel = require('../models/cards.model');

class CardsController {
  constructor() {}

  async addCard(req, res) {
    try {
      const result = await CardsModel.findOne({
        id_card: req.body.id_card
      }).exec();
      console.log(result);
      if (!result) {
        const card = new CardsModel(req.body);
        await card.save();
        res.send({
          message: "Tarjeta registrada con éxito"
        });
      } else {
        res.send({
          message: `La tarjeta ya se encuentra registrada en el sistema`
        });
      }

    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error al registrar la tarjeta"
      });
    }
  }

  async getCard(req, res) {
    try {
      const result = await CardsModel.find();
      res.send(result);
      if (result.length === 0) {
        console.log("No hay tarjetas registradas");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error al hacer la consulta"
      });
    }
  }

  async getCardById(req, res) {
    try {
      const result = await CardsModel.findById(req.params.id);
      if (result) {
        res.send(result);
      } else {
        res.status(404).send({
          message: "No se encontraron coincidencias"
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error al hacer la consulta"
      });
      console.log(error);
    }
  }

  async updateCard(req, res) {
    try {
      const result = await CardsModel.findById(req.params.id);
      if (result) {
        let cardData = req.body;
        delete cardData['id_card'];
        await CardsModel.findByIdAndUpdate({
          _id: req.params.id
        }, cardData, {
          new: true
        });
        res.send({
          message: "Actualización exitosa"
        });
      } else {
        res.status(404).send({
          message: "No hay coincidencias para actualizar"
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error al hacer la actualización"
      });
    }
  }

  async deleteCard(req, res) {
    try {
      const result = await CardsModel.findById(req.params.id);
      if (result) {
        await CardsModel.findByIdAndRemove(req.params.id);
        res.send({
          message: "Tarjeta eliminada correctamente"
        });
      } else {
        res.status(404).send({
          message: "No hay coincidencias para eliminar"
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error al hacer la eliminación"
      });
    }
  }

}

module.exports = CardsController;
