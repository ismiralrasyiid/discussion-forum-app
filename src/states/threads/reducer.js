import { ActionType } from './action';

function threadsReducer(threads = null, action = {}) {
  switch (action.type) {
    case ActionType.SET_THREADS:
      return action.payload.threads;

    case ActionType.ADD_THREAD:
      return [...threads, action.payload.thread];

    case ActionType.UP_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: [...thread.upVotesBy, action.payload.userId],
          };
        }
        return thread;
      });

    case ActionType.NEUTRALIZE_UP_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.filter((userId) => userId !== action.payload.userId),
          };
        }
        return thread;
      });

    case ActionType.DOWN_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            downVotesBy: [...thread.downVotesBy, action.payload.userId],
          };
        }
        return thread;
      });

    case ActionType.NEUTRALIZE_DOWN_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            downVotesBy: thread.downVotesBy.filter((userId) => userId !== action.payload.userId),
          };
        }
        return thread;
      });

    default:
      return threads;
  }
}

export default threadsReducer;
