import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  userEmail: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user, userEmail } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
      userEmail,
    };
  },
  LOGIN: (state, action) => {
    const { user, userEmail } = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      user,
      userEmail,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    userEmail: null,
  }),
  REGISTER: (state, action) => {
    const { user, userEmail } = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      user,
      userEmail,
    };
  },
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
});

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
const initialize = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken'); // Use 'accessToken' key
    const Email = localStorage.getItem('email');

    if (accessToken && isValidToken(accessToken)) {
     
      setSession(accessToken);
  
      const response = await axios.post('/fund/user.php',{
        email:Email,
      });
      const { user } = response.data;

      dispatch({
        type: 'INITIALIZE',
        payload: {
          isAuthenticated: true,
          isInitialized: true,
          user,
          userEmail: Email,
        },
      });

    } else {
    
      dispatch({
        type: 'INITIALIZE',
        payload: {
          isAuthenticated: false,
          user: null,
          userEmail: null,
        },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({
      type: 'INITIALIZE',
      payload: {
        isAuthenticated: false,
        user: null,
        userEmail: null,
      },
    });
  }
};

    initialize();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/fund/fund_login.php', {
        email,
        password,
      });
      
    
      if(response.data.login=== 'success'){
      
      localStorage.setItem('email', email);
      
  
 const {user} = response.data;
      setSession(response.data.accessToken);

      dispatch({
        type: 'LOGIN',
        payload: {
          user,
          userEmail: user.email,
        },
      });
            window.location.href="/dashboard/app";
    }
    } catch (error) {
      console.error(error);
      // Handle login error if needed
    }
  };

  const register = async (email, password, firstName, lastName) => {
    try {
      const response = await axios.post('/fund/fund_signup.php', {
        email,
        password,
        firstName,
        lastName,
      });
      const { accessToken, user } = response.data;

      window.localStorage.setItem('accessToken', accessToken);
      dispatch({
        type: 'REGISTER',
        payload: {
          user,
          userEmail: user.email,
        },
      });
    } catch (error) {
      console.error(error);
      // Handle registration error if needed
    }
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };