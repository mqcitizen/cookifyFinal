import React, {createContext, useReducer} from 'react';
import authInitialState from './initialStates/authInitialState';
import recipeInitialState from './initialStates/recipeInitialState';
import auth from './reducers/auth';
import recipe from './reducers/recipe';

export const GlobalContext = createContext({});

const GlobalProvider = ({children}) => {
  const [authState, authDispatch] = useReducer(auth, authInitialState);
  const [recipeState, recipeDispatch] = useReducer(recipe, recipeInitialState);

  return (
    <GlobalContext.Provider
      value={{authState, recipeState, authDispatch, recipeDispatch}}>
      {/* value={{authState, authDispatch}}> */}
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
