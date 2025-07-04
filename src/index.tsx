import { createRoot } from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import React from 'react'
import { Provider } from 'react-redux'
import App from './App'
import { store } from './store'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

reportWebVitals()
