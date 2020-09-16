import { Schema, Document, Model, model } from "mongoose";

interface User extends Document {
  name: string;
  email: string;
  password: string;
  date: Date;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const User: Model<User> = model<User>("user", UserSchema);
