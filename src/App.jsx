import MainPage from './components/MainPage/MainPage';
import CardPage from './components/CardPage/CardPage';
import { useMemo, useEffect, useState } from 'react'
import { disableVerticalSwipes } from '@telegram-apps/sdk';

function App() {
  const [navigate, setNavigate] = useState('main')

  const views = {
    main: <MainPage setNavigate={setNavigate} />,
    card: <CardPage />
  }

  useEffect(() => {
    disableVerticalSwipes();
  }, [])

  return (
    <>
      {views[navigate]}
    </>
  )
}

export default App
