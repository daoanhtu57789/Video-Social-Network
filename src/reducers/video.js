import * as videoConstants from "../constants/videos";

const initialState = {
  listVideo: [],
  videoEditing : null,
  listLike:[],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //get data

    case videoConstants.FETCH_VIDEO_SUCCESS: {
      const { data } = action.payload;
      //Thay đổi thứ tự đển video nào mới đăng sẽ được đưa lên đầu
      data.sort().reverse();
      return {
        ...state,
        listVideo: data,
        videoEditing : null
      };
    }

    case videoConstants.FETCH_VIDEO_FAILED: {
      return {
        ...state
      };
    }

    //khi post data lên và nhận đc data trả về
  
    case videoConstants.ADD_VIDEO_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listVideo: [data].concat(state.listVideo),
        videoEditing : null
      };
    }

    case videoConstants.ADD_VIDEO_FAILED: {
      return {
        ...state
      };
    }

    
    //khi post data lên và nhận đc data trả về
   
    case videoConstants.DELETE_VIDEO_SUCCESS: {
      const { videoId} = action.payload;
      return {
        ...state,
        listVideo: state.listVideo.filter(video => video.videoId !== videoId),
        videoEditing : null
      };
    }

    case videoConstants.DELETE_VIDEO_FAILED: {
      return {
        ...state
      };
    }

    //khi put data lên và nhận đc data trả về
    case videoConstants.UPDATE_VIDEO_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listVideo: [data].concat(state.listVideo.filter(video => video.videoId !== data.videoId)),
        videoEditing : null
      };
    }

    case videoConstants.UPDATE_VIDEO_FAILED: {
      return {
        ...state,
        videoEditing : null
      };
    }

    //đặt videoEditing
    case videoConstants.SET_VIDEO_EDITING: {
      const {data} = action.payload
      return {
        ...state,
        videoEditing : data
      };
    }

    //get likelist
    
    case videoConstants.FETCH_LIKE_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listLike: data
      };
    }

    case videoConstants.FETCH_LIKE_FAILED: {
      return {
        ...state
      };
    }

    //like video
    case videoConstants.LIKE: {
      const {data} = action.payload
      console.log(data);
      return {
        ...state
      };
    }

    case videoConstants.UN_LIKE: {
      const {data} = action.payload
      console.log(data);
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
