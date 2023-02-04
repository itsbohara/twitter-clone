import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "@/client/axios";
//
import { objFromArray } from "@util/object";
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
  error: string | null;
  //active tweet
  activeTweet?: any;
  tweetReplies: IDSeparatedData;
};

const initialState: TweetState = {
  isLoading: true,
  error: null,
  tweets: { byId: {}, allIds: [] },
  tweetReplies: { byId: {}, allIds: [] },
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

    /// tweet replies

    // GET TWEET REPLIES
    getTweetRepliesSuccess(state, action) {
      const replies = action.payload;

      state.tweetReplies.byId = objFromArray(replies);
      state.tweetReplies.allIds = Object.keys(state.tweetReplies.byId);
    },

    // ON NEW TWEET REPLY
    onNewTweetReply(state, action) {
      const newTweetReply = action.payload;

      state.tweetReplies.byId[newTweetReply.id] = newTweetReply;
      state.tweetReplies.allIds.unshift(newTweetReply.id);
    },

    onDeleteTweetReply(state, action) {
      const tweetID = action.payload;
      state.tweetReplies.byId = omit(state.tweetReplies.byId, [tweetID]);
      state.tweetReplies.allIds = pull(state.tweetReplies.allIds, tweetID);
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

interface DeleteProps {
  reply: boolean;
}

export function deleteTweet(tweetID, props?: DeleteProps) {
  return async (dispatch) => {
    try {
      await axios.delete(`/tweet/${tweetID}`);
      if (props?.reply) {
        dispatch(slice.actions.onDeleteTweetReply(tweetID));
        dispatch(
          setNotice({ message: "Tweet reply deleted!", variant: "error" })
        );
      } else {
        dispatch(slice.actions.onDeleteTweet(tweetID));
        dispatch(setNotice({ message: "Tweet deleted!", variant: "error" }));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      dispatch(setNotice({ message: error, variant: "error" }));
    }
  };
}

// =================================
// ========= TWEET REPLY ===========
// =================================

export function getTweetReplies(tweetID) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/tweet/${tweetID}/replies`);
      dispatch(slice.actions.getTweetRepliesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
    dispatch(slice.actions.stopLoading());
  };
}

// ----------------------------------------------------------------------

export function newTweetReply(tweetID, data) {
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(`/tweet/${tweetID}/reply`, data);
      dispatch(slice.actions.onNewTweetReply(response.data));
      return response.data["id"];
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
