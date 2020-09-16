import { Schema, Document, Model, model } from "mongoose";
import { Draft, IDraft } from "../models/Draft";

export interface IMember extends Document {
  user: string;
  memberTeamName: string;
  memberSeasons?: string[];
  memberPlayoffs?: string[];
  memberChampionships?: string[];
  memberLastPlaces?: string[];
  memberDrafts?: IDraft;
}

const MemberSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  memberTeamName: {
    type: String,
    required: true,
    max: 40,
  },
  memberSeasons: {
    type: [Number],
  },
  memberPlayoffs: {
    type: [Number],
  },
  memberChampionships: {
    type: [Number],
  },
  memberLastPlaces: {
    type: [Number],
  },
  memberDrafts: {
    type: { Draft },
  },
});

export const Member: Model<IMember> = model<IMember>("member", MemberSchema);
