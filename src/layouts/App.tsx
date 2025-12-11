import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { BrowserHistory } from 'history';
import { ErrorBoundary } from 'react-error-boundary';
import store from '../redux/store';

import { Toaster } from "react-hot-toast";
import ErrorPage from '../pages/errors/ErrorPage';
import routes from '../routes';
import DataProvider from '../shared/DataProvider';
interface AppProps {
  history: History | BrowserHistory
}

function App({ history }: AppProps) {
 
  return (
    <Provider store={store}>
      <Toaster />
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
