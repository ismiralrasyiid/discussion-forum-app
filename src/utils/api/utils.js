const BASE_URL = 'https://forum-api.dicoding.dev/v1';
const ENDPOINTS = {
  REGISTER: '/register',
  LOGIN: '/login',
  USERS: '/users',
  USERS_ME: '/users/me',
  THREADS: '/threads',
  THREAD_ID: (threadId) => `/${threadId}`,
  COMMENTS: '/comments',
  COMMENT_ID: (commentId) => `/${commentId}`,
  UP_VOTE: '/up-vote',
  DOWN_VOTE: '/down-vote',
  NEUTRAL_VOTE: '/neutral-vote',
  LEADERBOARDS: '/leaderboards',
};
const METHODS = {
  POST: 'POST',
};
const CONTENT_TYPE = 'application/json';
const ACCESS_TOKEN_KEY = 'accessToken';
const AUTHENTICATION_TYPE = 'Bearer';
const SUCCESS_STATUS_RESPONSE = 'success';

const createOptionsWithPostMethod = (body = {}) => ({
  method: METHODS.POST,
  headers: {
    'Content-Type': CONTENT_TYPE,
  },
  body: JSON.stringify(body),
});

const putAccessToken = (token) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);

const fetchWithAuth = async (url, options = {}) => {
  const newOptions = {
    ...options,
    headers: {
      ...options.headers,
      authorization: `${AUTHENTICATION_TYPE} ${getAccessToken()}`,
    },
  };

  return fetch(url, newOptions);
};

const errorThrower = ({ status, message }) => {
  if (status !== SUCCESS_STATUS_RESPONSE) {
    throw new Error(message);
  }
};

export {
  BASE_URL,
  ENDPOINTS,
  createOptionsWithPostMethod,
  putAccessToken,
  fetchWithAuth,
  errorThrower,
};
