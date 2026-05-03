import React, { createContext, useReducer, useCallback } from "react";

const initialState = {
  user: null,
  users: [],
  conversations: [],
  currentConversation: null,
  messages: [],
  loading: false,
  error: null,
  typingUsers: {},
};

const ActionTypes = {
  SET_USER: "SET_USER",
  LOGOUT: "LOGOUT",
  SET_USERS: "SET_USERS",
  SET_CONVERSATIONS: "SET_CONVERSATIONS",
  SET_CURRENT_CONVERSATION: "SET_CURRENT_CONVERSATION",
  SET_MESSAGES: "SET_MESSAGES",
  ADD_MESSAGE: "ADD_MESSAGE",
  DELETE_MESSAGE: "DELETE_MESSAGE",
  SET_TYPING_USERS: "SET_TYPING_USERS",
  REMOVE_TYPING_USER: "REMOVE_TYPING_USER",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  UPDATE_USER_STATUS: "UPDATE_USER_STATUS",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return { ...state, user: action.payload };
    case ActionTypes.LOGOUT:
      return { ...initialState };
    case ActionTypes.SET_USERS:
      return { ...state, users: action.payload };
    case ActionTypes.SET_CONVERSATIONS:
      return { ...state, conversations: action.payload };
    case ActionTypes.SET_CURRENT_CONVERSATION:
      return { ...state, currentConversation: action.payload };
    case ActionTypes.SET_MESSAGES:
      return { ...state, messages: action.payload };
    case ActionTypes.ADD_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] };
    case ActionTypes.DELETE_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter((msg) => msg._id !== action.payload),
      };
    case ActionTypes.SET_TYPING_USERS:
      return {
        ...state,
        typingUsers: {
          ...state.typingUsers,
          [action.payload]: true,
        },
      };
    case ActionTypes.REMOVE_TYPING_USER:
      const { [action.payload]: _, ...rest } = state.typingUsers;
      return { ...state, typingUsers: rest };
    case ActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    case ActionTypes.UPDATE_USER_STATUS:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload.userId
            ? { ...user, status: action.payload.status }
            : user,
        ),
      };
    default:
      return state;
  }
};

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setUser = useCallback((user) => {
    dispatch({ type: ActionTypes.SET_USER, payload: user });
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: ActionTypes.LOGOUT });
  }, []);

  const setUsers = useCallback((users) => {
    dispatch({ type: ActionTypes.SET_USERS, payload: users });
  }, []);

  const setConversations = useCallback((conversations) => {
    dispatch({ type: ActionTypes.SET_CONVERSATIONS, payload: conversations });
  }, []);

  const setCurrentConversation = useCallback((conversation) => {
    dispatch({
      type: ActionTypes.SET_CURRENT_CONVERSATION,
      payload: conversation,
    });
  }, []);

  const setMessages = useCallback((messages) => {
    dispatch({ type: ActionTypes.SET_MESSAGES, payload: messages });
  }, []);

  const addMessage = useCallback((message) => {
    dispatch({ type: ActionTypes.ADD_MESSAGE, payload: message });
  }, []);

  const deleteMessage = useCallback((messageId) => {
    dispatch({ type: ActionTypes.DELETE_MESSAGE, payload: messageId });
  }, []);

  const setTypingUser = useCallback((userId) => {
    dispatch({ type: ActionTypes.SET_TYPING_USERS, payload: userId });
  }, []);

  const removeTypingUser = useCallback((userId) => {
    dispatch({ type: ActionTypes.REMOVE_TYPING_USER, payload: userId });
  }, []);

  const setLoading = useCallback((loading) => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: loading });
  }, []);

  const setError = useCallback((error) => {
    dispatch({ type: ActionTypes.SET_ERROR, payload: error });
  }, []);

  const updateUserStatus = useCallback((userId, status) => {
    dispatch({
      type: ActionTypes.UPDATE_USER_STATUS,
      payload: { userId, status },
    });
  }, []);

  return (
    <ChatContext.Provider
      value={{
        state,
        setUser,
        logout,
        setUsers,
        setConversations,
        setCurrentConversation,
        setMessages,
        addMessage,
        deleteMessage,
        setTypingUser,
        removeTypingUser,
        setLoading,
        setError,
        updateUserStatus,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
