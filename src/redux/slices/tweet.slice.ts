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
};

const initialState: TweetState = {
  isLoading: true,
  error: null,
  tweets: { byId: {}, allIds: [] },
};

const slice = createSlice({
  name: "tweet",
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

    // ON NEW TWEET
    onNewTweet(state, action) {
      const newTweet = action.payload;
      state.tweets.byId[newTweet.id] = newTweet;
      state.tweets.allIds.unshift(newTweet.id);
    },

    onDeleteTweet(state, action) {
      const tweetID = action.payload;
      state.tweets.byId = omit(state.tweets.byId, [tweetID]);
      state.tweets.allIds = pull(state.tweets.allIds, tweetID);
    },

    onUpdateTweet(state, action) {
      const tweet = action.payload;
      state.tweets.byId[tweet.id] = tweet;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { getTweetsSuccess, onNewTweet, onDeleteTweet, onUpdateTweet } =
  slice.actions;

// ----------------------------------------------------------------------

export function getTweets() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.startLoading());
    try {
      // const response = await axios.get(`/tweets`);
      const response = await axios.get(`/tweets`);
      dispatch(slice.actions.getTweetsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
    dispatch(slice.actions.stopLoading());
  };
}

// ----------------------------------------------------------------------

export function newTweet(data) {
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(`/tweet/new`, data);
      dispatch(slice.actions.onNewTweet(response.data));
      return response.data["id"];
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
// ----------------------------------------------------------------------

interface UpdateProps {
  silent?: boolean;
}

export function updateTweet(id, data, props?: UpdateProps) {
  return async (dispatch) => {
    try {
      const response = await axios.patch(`/tweet/${id}`, data);
      dispatch(slice.actions.onUpdateTweet(response.data));
      if (!props?.silent) dispatch(setNotice({ message: "Tweet updated." }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      dispatch(setNotice({ message: error, variant: "error" }));
    }
  };
}

// ----------------------------------------------------------------------

export function toggleTweetLike(id) {
  return async (dispatch) => {
    try {
      const response = await axios.patch(`/tweet/${id}/like`);
      dispatch(slice.actions.onUpdateTweet(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      dispatch(setNotice({ message: error, variant: "error" }));
    }
  };
}
// ----------------------------------------------------------------------

export function deleteTweet(tweetID) {
  return async (dispatch) => {
    try {
      await axios.delete(`/tweet/${tweetID}`);
      dispatch(slice.actions.onDeleteTweet(tweetID));
      dispatch(setNotice({ message: "Tweet deleted!", variant: "error" }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      dispatch(setNotice({ message: error, variant: "error" }));
    }
  };
}
