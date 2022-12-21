import threadsReducer from './reducer';

/**
 * threadsReducer function
 * - should return the initial state when given by unknown action
 * - should return threads when given by SET_THREADS action
 * - should return threads with new thread when given by ADD_THREAD action
 * - should return threads which contains userId in exact thread's upVotesBy property
 *   when given by UP_VOTE_THREAD action
 * - should return threads with removed userId in exact thread's upVotesBy property
 *   when given by NEUTRALIZE_UP_VOTE_THREAD action
 * - should return threads which contains userId in exact thread's downVotesBy property
 *   when given by DOWN_VOTE_THREAD action
 * - should return threads with removed userId in exact thread's downVotesBy property
 *   when given by NEUTRALIZE_DOWN_VOTE_THREAD action
 */

const ActionType = {
  UNKNOWN: 'UNKNOWN',
  SET_THREADS: 'SET_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  UP_VOTE_THREAD: 'UP_VOTE_THREAD',
  NEUTRALIZE_UP_VOTE_THREAD: 'NEUTRALIZE_UP_VOTE_THREAD',
  DOWN_VOTE_THREAD: 'DOWN_VOTE_THREAD',
  NEUTRALIZE_DOWN_VOTE_THREAD: 'NEUTRALIZE_DOWN_VOTE_THREAD',
};
const threads = [
  {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'tester101',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
  {
    id: 'thread-2',
    title: 'Thread Kedua',
    body: 'Ini adalah thread kedua',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'tester102',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];
const newThread = {
  id: 'thread-3',
  title: 'Thread Ketiga',
  body: 'Ini adalah thread ketiga',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  ownerId: 'tester102',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
};
const threadId = 'thread-2';
const userId = 'tester101';

describe('threadsReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = null;
    const action = {
      type: ActionType.UNKNOWN,
    };

    const actualState = threadsReducer(initialState, action);

    expect(actualState).toEqual(initialState);
  });

  it('should return threads when given by SET_THREADS action', () => {
    const initialState = null;
    const action = {
      type: ActionType.SET_THREADS,
      payload: {
        threads,
      },
    };

    const actualState = threadsReducer(initialState, action);

    expect(actualState).toEqual(threads);
  });

  it('should return threads with new thread when given by ADD_THREAD action', () => {
    const initialState = threads;
    const action = {
      type: ActionType.ADD_THREAD,
      payload: {
        thread: newThread,
      },
    };

    const actualState = threadsReducer(initialState, action);
    const expectedState = [
      ...initialState,
      action.payload.thread,
    ];

    expect(actualState).toEqual(expectedState);
  });

  it('should return threads which contains userId in exact thread\'s upVotesBy property when given by UP_VOTE_THREAD action', () => {
    const initialState = threads;
    const action = {
      type: ActionType.UP_VOTE_THREAD,
      payload: {
        threadId,
        userId,
      },
    };

    const actualState = threadsReducer(initialState, action);
    const expectedState = [
      initialState[0],
      {
        ...initialState[1],
        upVotesBy: [...initialState[1].upVotesBy, action.payload.userId],
      },
    ];

    expect(actualState).toEqual(expectedState);
  });

  it('should return threads with removed userId in exact thread\'s upVotesBy property when given by NEUTRALIZE_UP_VOTE_THREAD action', () => {
    const initialState = [
      threads[0],
      {
        ...threads[1],
        upVotesBy: [...threads[1].upVotesBy, userId],
      },
    ];
    const action = {
      type: ActionType.NEUTRALIZE_UP_VOTE_THREAD,
      payload: {
        threadId,
        userId,
      },
    };

    const actualState = threadsReducer(initialState, action);

    expect(actualState).toEqual(threads);
  });

  it('should return threads which contains userId in exact thread\'s downVotesBy property when given by DOWN_VOTE_THREAD action', () => {
    const initialState = threads;
    const action = {
      type: ActionType.DOWN_VOTE_THREAD,
      payload: {
        threadId,
        userId,
      },
    };

    const actualState = threadsReducer(initialState, action);
    const expectedState = [
      initialState[0],
      {
        ...initialState[1],
        downVotesBy: [...initialState[1].downVotesBy, action.payload.userId],
      },
    ];

    expect(actualState).toEqual(expectedState);
  });

  it('should return threads with removed userId in exact thread\'s downVotesBy property when given by NEUTRALIZE_DOWN_VOTE_THREAD action', () => {
    const initialState = [
      threads[0],
      {
        ...threads[1],
        downVotesBy: [...threads[1].downVotesBy, userId],
      },
    ];
    const action = {
      type: ActionType.NEUTRALIZE_DOWN_VOTE_THREAD,
      payload: {
        threadId,
        userId,
      },
    };

    const actualState = threadsReducer(initialState, action);

    expect(actualState).toEqual(threads);
  });
});
