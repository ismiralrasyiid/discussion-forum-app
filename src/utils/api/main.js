import {
  BASE_URL,
  ENDPOINTS,
  createOptionsWithPostMethod,
  putAccessToken,
  fetchWithAuth,
  errorThrower,
} from './utils';

const api = (() => {
  const register = async ({ username, email, password }) => {
    const response = await fetch(`${BASE_URL + ENDPOINTS.REGISTER}`, createOptionsWithPostMethod({ name: username, email, password }));
    const responseJson = await response.json();
    const { status, message } = responseJson;

    errorThrower({ status, message });

    const { data: { user: { name, avatar } } } = responseJson;

    return { name, avatar };
  };

  const login = async ({ email, password }) => {
    const response = await fetch(`${BASE_URL + ENDPOINTS.LOGIN}`, createOptionsWithPostMethod({ email, password }));
    const responseJson = await response.json();
    const { status, message } = responseJson;

    errorThrower({ status, message });

    const { data: { token } } = responseJson;

    putAccessToken(token);
  };

  const getAllUsers = async () => {
    const response = await fetch(`${BASE_URL + ENDPOINTS.USERS}`);
    const responseJson = await response.json();
    const { status, message } = responseJson;

    errorThrower({ status, message });

    const { data: { users } } = responseJson;

    return users;
  };

  const getOwnProfile = async () => {
    const response = await fetchWithAuth(`${BASE_URL + ENDPOINTS.USERS_ME}`);
    const responseJson = await response.json();
    const { status, message } = responseJson;

    errorThrower({ status, message });

    const { data: { user } } = responseJson;

    return user;
  };

  const createThread = async ({ title, body, category = '' }) => {
    const response = await fetchWithAuth(`${BASE_URL + ENDPOINTS.THREADS}`, createOptionsWithPostMethod({ title, body, category }));
    const responseJson = await response.json();
    const { status, message } = responseJson;

    errorThrower({ status, message });

    const { data: { thread } } = responseJson;

    return thread;
  };

  const getAllThreads = async () => {
    const response = await fetch(`${BASE_URL + ENDPOINTS.THREADS}`);
    const responseJson = await response.json();
    const { status, message } = responseJson;

    errorThrower({ status, message });

    const { data: { threads } } = responseJson;

    return threads;
  };

  const getdetailThread = async (threadId) => {
    const response = await fetch(`${BASE_URL + ENDPOINTS.THREADS + ENDPOINTS.THREAD_ID(threadId)}`);
    const responseJson = await response.json();
    const { status, message } = responseJson;

    errorThrower({ status, message });

    const { data: { detailThread } } = responseJson;

    return detailThread;
  };

  const createComment = async (threadId, content) => {
    const endpoint = `${BASE_URL + ENDPOINTS.THREADS + ENDPOINTS.THREAD_ID(threadId) + ENDPOINTS.COMMENTS}`;
    const response = await fetchWithAuth(endpoint, createOptionsWithPostMethod({ content }));
    const responseJson = await response.json();
    const { status, message } = responseJson;

    errorThrower({ status, message });

    const { data: { comment } } = responseJson;

    return comment;
  };

  const voteThread = (voteTypeEndpoint) => async (threadId) => {
    const endpoint = `${BASE_URL + ENDPOINTS.THREADS + ENDPOINTS.THREAD_ID(threadId) + voteTypeEndpoint}`;
    const response = await fetchWithAuth(endpoint, createOptionsWithPostMethod());
    const responseJson = await response.json();
    const { status, message } = responseJson;

    errorThrower({ status, message });

    const { data: { vote } } = responseJson;

    return vote;
  };

  const upVoteThread = voteThread(ENDPOINTS.UP_VOTE);
  const downVoteThread = voteThread(ENDPOINTS.DOWN_VOTE);
  const neutralVoteThread = voteThread(ENDPOINTS.NEUTRAL_VOTE);

  const voteComment = (voteTypeEndpoint) => async (threadId, commentId) => {
    const endpoint = `${BASE_URL + ENDPOINTS.THREADS + ENDPOINTS.THREAD_ID(threadId) + ENDPOINTS.COMMENTS + ENDPOINTS.COMMENT_ID(commentId) + voteTypeEndpoint}`;
    const response = await fetchWithAuth(endpoint, createOptionsWithPostMethod());
    const responseJson = await response.json();
    const { status, message } = responseJson;

    errorThrower({ status, message });

    const { data: { vote } } = responseJson;

    return vote;
  };

  const upVoteComment = voteComment(ENDPOINTS.UP_VOTE);
  const downVoteComment = voteComment(ENDPOINTS.DOWN_VOTE);
  const neutralVoteComment = voteComment(ENDPOINTS.NEUTRAL_VOTE);

  const getLeaderBoard = async () => {
    const response = await fetch(`${BASE_URL + ENDPOINTS.LEADERBOARDS}`);
    const responseJson = await response.json();
    const { status, message } = responseJson;

    errorThrower({ status, message });

    const { data: { leaderboards } } = responseJson;

    return leaderboards;
  };

  return {
    login,
    register,
    getAllUsers,
    getOwnProfile,
    createThread,
    getAllThreads,
    getdetailThread,
    createComment,
    upVoteThread,
    downVoteThread,
    neutralVoteThread,
    upVoteComment,
    downVoteComment,
    neutralVoteComment,
    getLeaderBoard,
  };
})();

export default api;
