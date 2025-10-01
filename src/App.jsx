import MainPage from './components/MainPage/MainPage';
import CardPage from './components/CardPage/CardPage';
import { useMemo, useEffect, useState } from 'react'


function App() {
  const [navigate, setNavigate] = useState('main')

  const views = {
    main: <MainPage setNavigate={setNavigate}/>,
    card: <CardPage />
  }

  return (
    <>
      {views[navigate]}
    </>
  )
}

export default App
