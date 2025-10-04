import MainPage from './components/MainPage/MainPage';
import CardPage from './components/CardPage/CardPage';
import { useMemo, useEffect, useState } from 'react'
import { disableVerticalSwipes } from '@telegram-apps/sdk';
import { init } from './store/initSlice';
import { useDispatch } from 'react-redux';
import { SocketProvider } from './SocketContext';
function App() {
  const [navigate, setNavigate] = useState('main')
  const dispatch = useDispatch()

  const views = {
    main: <MainPage setNavigate={setNavigate} />,
    card: <CardPage />
  }

  useEffect(() => {
    disableVerticalSwipes();
    const rowInit = window.Telegram.WebApp.initData;
    dispatch(init(rowInit));
  }, [])

  return (
    <SocketProvider>
      <>
        {views[navigate]}
      </>
    </SocketProvider>
  )
}

export default App
