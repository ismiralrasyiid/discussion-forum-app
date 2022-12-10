import { ActionType } from './action';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
    case ActionType.SET_THREAD_DETAIL:
      return action.payload.threadDetail;

    case ActionType.ADD_COMMENT:
      return {
        ...threadDetail,
        comments: [...threadDetail.comments, action.payload.comment],
      };

    case ActionType.UP_VOTE_THREAD_DETAIL:
      return {
        ...threadDetail,
        upVotesBy: [...threadDetail.upVotesBy, action.payload.userId],
      };

    case ActionType.NEUTRALIZE_UP_VOTE_THREAD_DETAIL:
      return {
        ...threadDetail,
        upVotesBy: threadDetail.upVotesBy.filter((userId) => userId !== action.payload.userId),
      };

    case ActionType.DOWN_VOTE_THREAD_DETAIL:
      return {
        ...threadDetail,
        downVotesBy: [...threadDetail.downVotesBy, action.payload.userId],
      };

    case ActionType.NEUTRALIZE_DOWN_VOTE_THREAD_DETAIL:
      return {
        ...threadDetail,
        downVotesBy: threadDetail.downVotesBy
          .filter((userId) => userId !== action.payload.userId),
      };

    case ActionType.UP_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: [...comment.upVotesBy, action.payload.userId],
            };
          }
          return comment;
        }),
      };

    case ActionType.NEUTRALIZE_UP_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.filter((userId) => userId !== action.payload.userId),
            };
          }
          return comment;
        }),
      };

    case ActionType.DOWN_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              downVotesBy: [...comment.downVotesBy, action.payload.userId],
            };
          }
          return comment;
        }),
      };

    case ActionType.NEUTRALIZE_DOWN_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              downVotesBy: comment.downVotesBy.filter((userId) => userId !== action.payload.userId),
            };
          }
          return comment;
        }),
      };

    default:
      return threadDetail;
  }
}

export default threadDetailReducer;
