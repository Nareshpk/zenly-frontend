import React, { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import { ErrorBoundary } from 'react-error-boundary';
import { BrowserHistory } from 'history';
import store from '../redux/store';

import routes from '../routes';
import DataProvider from '../shared/DataProvider';
import ErrorPage from '../pages/errors/ErrorPage';

interface AppProps {
  history: History | BrowserHistory
}

function App({ history }: AppProps) {

  return (
    <Provider store={store}>
      <DataProvider>
        <ErrorBoundary FallbackComponent={ErrorPage}>

          <Suspense fallback={<div className='loader'></div>}>
            <RouterProvider router={routes} />
          </Suspense>
        </ErrorBoundary>
      </DataProvider>
    </Provider>
  )
}

export default App
