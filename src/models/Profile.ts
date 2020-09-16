import { Schema, Document, Model, model } from "mongoose";
import { Draft, IDraft } from "../models/Draft";

export interface IProfile extends Document {
  user: string;
  teamName: string;
  motto?: string;
  seasons?: number[];
  playoffs?: number[];
  championships?: number[];
  lastPlaces?: number[];
  drafts?: IDraft;
}

const ProfileSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  teamName: {
    type: String,
    required: true,
    max: 40,
  },
  motto: {
    type: String,
    max: 40,
  },
  seasons: {
    type: [Number],
  },
  playoffs: {
    type: [Number],
  },
  championships: {
    type: [Number],
  },
  lastPlaces: {
    type: [Number],
  },
  drafts: {
    type: { Draft },
  },
});

export const Profile: Model<IProfile> = model<IProfile>(
  "profile",
  ProfileSchema
);
