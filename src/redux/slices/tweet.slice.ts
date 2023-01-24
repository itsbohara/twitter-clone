import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "@/client/axios";
//
import { objFromArray } from "@/utils/object";
import { omit, pull } from "lodash";
import { setNotice } from "./notice";

// ---------------------------------------------------------------------
type IDSeparatedData = {
  byId: { [key: string]: any };
  allIds: string[];
};

export type TweetState = {
  isLoading: boolean;
  tweets: IDSeparatedData;
  activeTweet?: string | any;
  // tweetReplies?: IDSeparatedData;
  error: string | null;
  saved: boolean;
  writeMode: boolean;
};

const initialState: TweetState = {
  isLoading: true,
  error: null,
  tweets: { byId: {}, allIds: [] },
  saved: true,
  writeMode: true,
};

const slice = createSlice({
  name: "tweets",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // START LOADING
    stopLoading(state) {
      state.isLoading = false;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET TWEETS
    getTweetsSuccess(state, action) {
      const tweets = action.payload;

      state.tweets.byId = objFromArray(tweets);
      state.tweets.allIds = Object.keys(state.tweets.byId);
    },

    // GET TWEET
    getTweetSuccess(state, action) {
      const tweet = action.payload;
      state.activeTweet = tweet;
    },

    // ON NEW TWEET
    onNewTweet(state, action) {
      const newTweet = action.payload;
      state.tweets.byId[newTweet.id] = newTweet;
      state.tweets.allIds.push(newTweet.id);
    },

    onDeleteTweet(state, action) {
      const tweetID = action.payload;
      state.tweets.byId = omit(state.tweets.byId, [tweetID]);
      state.tweets.allIds = pull(state.tweets.allIds, tweetID);
    },

    onClearTrash(state) {
      state.tweets.byId = {};
      state.tweets.allIds = [];
    },

    onUpdateTweet(state, action) {
      const tweet = action.payload;
      state.tweets.byId[tweet.id] = tweet;
    },

    // on tweet changed and not
    onTweetSaveHandle(state, action) {
      state.saved = action.payload;
    },

    onWritingMode(state, action) {
      state.writeMode = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  onTweetSaveHandle,
  getTweetsSuccess,
  getTweetSuccess,
  onNewTweet,
  onDeleteTweet,
  onUpdateTweet,
  onWritingMode,
} = slice.actions;

// ----------------------------------------------------------------------

interface tweetProps {
  trash?: boolean;
  favorite?: boolean;
}
export function getTweets(props?: tweetProps) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.startLoading());
    try {
      let params = "";
      if (props?.favorite) params = "?favorites=true";
      else if (props?.trash) params = "?trash=true";
      const response = await axios.get(`/tweets${params}`);
      dispatch(slice.actions.getTweetsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
    dispatch(slice.actions.stopLoading());
  };
}

// ----------------------------------------------------------------------

// export function getTweet(tweetID) {
//   return async (dispatch, getState) => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.get(`/directory/${tweetID}`);
//       dispatch(slice.actions.getTweetSuccess(response.data));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

export function newTweet(data) {
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(`/tweet/new`, data);
      dispatch(slice.actions.onNewTweet(response.data));
      dispatch(slice.actions.getTweetSuccess(response.data));
      return response.data["id"];
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
// ----------------------------------------------------------------------

export function updateTweet(id, data) {
  return async (dispatch) => {
    try {
      const response = await axios.patch(`/tweet/${id}`, data);
      dispatch(slice.actions.onUpdateTweet(response.data));
      dispatch(setNotice({ message: "Tweet updated." }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      dispatch(setNotice({ message: error, variant: "error" }));
    }
  };
}

// ----------------------------------------------------------------------

export function trashTweet(tweetID) {
  return async (dispatch) => {
    try {
      await axios.delete(`/tweet/${tweetID}/trash`);
      dispatch(slice.actions.onDeleteTweet(tweetID));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      dispatch(setNotice({ message: error, variant: "error" }));
    }
  };
}

export function restoreTrashTweet(tweetID) {
  return async (dispatch) => {
    try {
      await axios.patch(`/tweet/${tweetID}`, { trash: false });
      dispatch(slice.actions.onDeleteTweet(tweetID));
      dispatch(setNotice({ message: "Tweet restored!" }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      dispatch(setNotice({ message: error, variant: "error" }));
    }
  };
}

export function deleteTweet(tweetID) {
  return async (dispatch) => {
    try {
      await axios.delete(`/tweet/${tweetID}`);
      dispatch(slice.actions.onDeleteTweet(tweetID));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      dispatch(setNotice({ message: error, variant: "error" }));
    }
  };
}

export function clearTrash() {
  return async (dispatch) => {
    try {
      await axios.delete("/trash");
      dispatch(slice.actions.onClearTrash());
      dispatch(setNotice({ message: "Trash cleared!" }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      dispatch(setNotice({ message: error, variant: "error" }));
    }
  };
}

// ----------------------------------------------------------------------
