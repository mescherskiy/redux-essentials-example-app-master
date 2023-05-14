import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './app/store'
import { Provider } from 'react-redux'

import { worker } from './api/server'
import { extendedApiSlice } from './features/users/usersSlice'
// import { fetchUsers } from './features/users/usersSlice'
//import { apiSlice } from './features/api/apiSlice'


// Wrap app rendering so we can wait for the mock API to initialize
async function main() {
  // Start our mock API server
  await worker.start({ onUnhandledRequest: 'bypass' })

  // store.dispatch(fetchUsers())
  //store.dispatch(apiSlice.endpoints.getUsers.initiate())
  store.dispatch(extendedApiSlice.endpoints.getUsers.initiate())

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  )
}

main()
