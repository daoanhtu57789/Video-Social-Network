import * as videoConstants from "../constants/videos";

const initialState = {
  listVideo: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case videoConstants.FETCH_VIDEO: {
      return {
        ...state
      };
    }

    case videoConstants.FETCH_VIDEO_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listVideo: data
      };
    }

    case videoConstants.FETCH_VIDEO_FAILED: {
      return {
        ...state
      };
    }

    default: {
      return {
        ...state
      };
    }
  }
};

export default reducer;
