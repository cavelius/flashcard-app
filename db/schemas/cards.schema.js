import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const cardsSchema = new Schema({
  name: { type: String, required: true },
  comment: { type: String, required: true },
});

const Cards = models.cards || model("cards", cardsSchema);

export default Cards;
