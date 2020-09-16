import { User } from "../types/authTypes";

export interface Profile {
  seasons: Array<string>;
  playoffs: Array<string>;
  championships: Array<string>;
  lastPlaces: Array<string>;
  drafts: Array<{}>;
  teamName: string;
  motto: string;
  user: User;
}

export interface Profiles {
  profiles: Profile[];
}

export interface Draft {
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

export interface Drafts {
  drafts: Draft[];
}

export enum ProfileActionTypes {
  GET_PROFILE = "@@profile/GET_PROFILE",
  GET_PROFILES = "@@profile/GET_PROFILES",
  PROFILE_ERROR = "@@profile/PROFILE_ERROR",
  UPDATE_PROFILE = "@@profile/UPDATE_PROFILE",
  CLEAR_PROFILE = "@@profile/CLEAR_PROFILE",
  ACCOUNT_DELETED = "@@profile/ACCOUNT_DELETED",
}
