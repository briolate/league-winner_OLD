import { Schema, Document, Model, model } from "mongoose";

export interface IDraft extends Document {
  year: number;
  qb: number;
  rb1: number;
  rb2: number;
  rb3?: number;
  wr1: number;
  wr2: number;
  wr3?: number;
  te: number;
}

const DraftSchema: Schema = new Schema({
  year: {
    type: Number,
    required: true,
  },
  qb: {
    type: Number,
    required: true,
  },
  rb1: {
    type: Number,
    required: true,
  },
  rb2: {
    type: Number,
    required: true,
  },
  rb3: {
    type: Number,
  },
  wr1: {
    type: Number,
    required: true,
  },
  wr2: {
    type: Number,
    required: true,
  },
  wr3: {
    type: Number,
  },
  te: {
    type: Number,
    required: true,
  },
});

export const Draft: Model<IDraft> = model<IDraft>("draft", DraftSchema);
