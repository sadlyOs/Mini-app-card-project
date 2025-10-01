import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CardPage from './components/CardPage/CardPage.jsx'
import { backButton, init } from '@telegram-apps/sdk-react'
import { AppRoot } from '@telegram-apps/telegram-ui'
import '@telegram-apps/telegram-ui/dist/styles.css';
import { Provider } from 'react-redux'
import store from './store/store.js'
import { StrictMode } from 'react'


console.log(store);

init()
backButton.mount()

createRoot(document.getElementById('root')).render(
    <AppRoot>
      <Provider store={store}>
        <App />
      </Provider>
    </AppRoot>
)
