import React, { createContext, useReducer } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { RouteComponent } from "./components";
import routeConfigration from "./routeConfiguration";
import createReducer from "./reducers";

/**
 * Main context
 *
 * We currently only create and use one context as we merge
 * all page reducers in src/reducers.js
 */
export const AppContext = createContext();

const App = () => {
  const appReducer = createReducer();
  const { reducer, initialState } = appReducer;

  /**
   * Pass combined page reducers that will return the state
   * for each page that is defined in routeConfiguration and
   * that has reducer file
   */
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <HelmetProvider>
      <AppContext.Provider value={{ state, dispatch }}>
        <Router>
          <Routes>
            {routeConfigration().map((route) => {
              return (
                <Route
                  key={route.name}
                  path={route.path}
                  element={<RouteComponent route={route} dispatch={dispatch} />}
                />
              );
            })}
          </Routes>
        </Router>
      </AppContext.Provider>
    </HelmetProvider>
  );
};

export default App;
