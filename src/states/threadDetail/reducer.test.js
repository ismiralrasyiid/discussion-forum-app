import threadDetailReducer from './reducer';

/*
  threadDetailReducer function
  - should return the initial state when given by unknown action
  - should return thread detail when given by SET_THREAD_DETAIL action
  - should return thread detail with new comment when given by ADD_COMMENT action
  - should return thread detail which contains userId in upVotesBy property
    when given by UP_VOTE_THREAD_DETAIL action
*/

const ActionType = {
  UNKNOWN: 'UNKNOWN',
  SET_THREAD_DETAIL: 'SET_THREAD_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
  UP_VOTE_THREAD_DETAIL: 'UP_VOTE_THREAD_DETAIL',
  NEUTRALIZE_UP_VOTE_THREAD_DETAIL: 'NEUTRALIZE_UP_VOTE_THREAD_DETAIL',
  DOWN_VOTE_THREAD_DETAIL: 'DOWN_VOTE_THREAD_DETAIL',
  NEUTRALIZE_DOWN_VOTE_THREAD_DETAIL: 'NEUTRALIZE_DOWN_VOTE_THREAD_DETAIL',
  UP_VOTE_COMMENT: 'UP_VOTE_COMMENT',
  NEUTRALIZE_UP_VOTE_COMMENT: 'NEUTRALIZE_UP_VOTE_COMMENT',
  DOWN_VOTE_COMMENT: 'DOWN_VOTE_COMMENT',
  NEUTRALIZE_DOWN_VOTE_COMMENT: 'NEUTRALIZE_DOWN_VOTE_COMMENT',
};
const threadDetail = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  owner: {
    id: 'tester101',
    name: 'Tester101',
    avatar: 'https://generated-image-url.jpg',
  },
  upVotesBy: [],
  downVotesBy: [],
  comments: [
    {
      id: 'comment-1',
      content: 'Ini adalah komentar pertama',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'tester101',
        name: 'Tester101',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
    },
  ],
};
const comment = {
  id: 'comment-2',
  content: 'Ini adalah komentar kedua',
  createdAt: '2021-06-21T07:00:00.000Z',
  upVotesBy: [],
  downVotesBy: [],
  owner: {
    id: 'tester101',
    name: 'Tester101',
    email: 'tester101@gmail.com',
  },
};

describe('threadDetailReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = null;
    const action = {
      type: ActionType.UNKNOWN,
    };

    const actualState = threadDetailReducer(initialState, action);

    expect(actualState).toEqual(initialState);
  });

  it('should return thread detail when given by SET_THREAD_DETAIL action', () => {
    const initialState = null;
    const action = {
      type: ActionType.SET_THREAD_DETAIL,
      payload: {
        threadDetail,
      },
    };

    const actualState = threadDetailReducer(initialState, action);

    expect(actualState).toEqual(action.payload.threadDetail);
  });

  it('should return thread detail with new comment when given by ADD_COMMENT action', () => {
    const initialState = threadDetail;
    const action = {
      type: ActionType.ADD_COMMENT,
      payload: {
        comment,
      },
    };

    const actualState = threadDetailReducer(initialState, action);

    expect(actualState).toEqual({
      ...initialState,
      comments: [...initialState.comments, action.payload.comment],
    });
  });

  it('should return thread detail which contains userId in upVotesBy property when given by UP_VOTE_THREAD_DETAIL action', () => {
    const initialState = threadDetail;
    const action = {
      type: ActionType.UP_VOTE_THREAD_DETAIL,
      payload: {
        userId: 'tester101',
      },
    };

    const actualState = threadDetailReducer(initialState, action);

    expect(actualState).toEqual({
      ...initialState,
      upVotesBy: [...initialState.upVotesBy, action.payload.userId],
    });
  });
});
