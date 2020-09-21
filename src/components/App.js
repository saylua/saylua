import React, { useState } from 'react';
import PropTypes from 'prop-types';

import StyleContext from 'isomorphic-style-loader/StyleContext';
import ApplicationContext from './ApplicationContext';

/**
 * The top-level React component setting context (global) variables
 * that can be accessed from all the child components.
 *
 * https://facebook.github.io/react/docs/context.html
 *
 * Usage example:
 *
 *   const context = {
 *     history: createBrowserHistory(),
 *     store: createStore(),
 *   };
 *
 *   ReactDOM.render(
 *     <App context={context} insertCss={() => {}}>
 *       <Layout>
 *         <LandingPage />
 *       </Layout>
 *     </App>,
 *     container,
 *   );
 */

export default function App({ defaultContext, insertCss, children }) {
  // NOTE: If you need to add or modify header, footer etc. of the app,
  // please do that inside the Layout component.

  const [me, setMe] = useState(undefined);
  const context = { ...defaultContext, me, setMe };

  return (
    <StyleContext.Provider value={{ insertCss }}>
      <ApplicationContext.Provider value={{ context }}>
        {React.Children.only(children)}
      </ApplicationContext.Provider>
    </StyleContext.Provider>
  );
}

App.propTypes = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: PropTypes.func.isRequired,
  defaultContext: PropTypes.shape({
    // Universal HTTP client
    fetch: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
    query: PropTypes.object,
  }).isRequired,
  children: PropTypes.element.isRequired,
};
