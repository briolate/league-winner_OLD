import { Action } from "redux";
import {
  Profile,
  Profiles,
  Drafts,
  ProfileActionTypes,
} from "../types/profileTypes";
const {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
} = ProfileActionTypes;

interface ProfileAction extends Action {
  type: string;
  payload?: any;
}

interface ProfileState {
  profile?: Profile | null;
  profiles?: Profiles[] | null;
  drafts?: Drafts[];
  loading: boolean;
  error: {};
}

const initialState: ProfileState = {
  profile: null,
  profiles: [],
  drafts: [],
  loading: true,
  error: {},
};

export default function(
  state = initialState,
  action: ProfileAction
): ProfileState {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload as Profile,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload as Profiles[],
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        drafts: [],
        loading: false,
      };
    default:
      return state;
  }
}
