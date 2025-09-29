import { useEffect, useState } from 'react';
import Wrapper from './components/ui/Wrapper/Wrapper';
import { closeMiniApp, closeQrScanner, closingBehavior, useLaunchParams } from '@telegram-apps/sdk-react';
import { Header, Main } from './components';
import { SectionTop, SectionMain, SectionBtn } from './components/sections';
import { miniApp } from '@telegram-apps/sdk';
import { swipeBehavior } from '@telegram-apps/sdk';
function App() {
  const user = useLaunchParams()


  useEffect(() => {

    if (swipeBehavior.mount.isAvailable()) {
      swipeBehavior.mount();
      swipeBehavior.isMounted(); // true
    }

    if (swipeBehavior.enableVertical.isAvailable()) {
      swipeBehavior.enableVertical();
      swipeBehavior.isVerticalEnabled(); // true
    }
  }, [])
  return (
    <>
      <Wrapper>
        <Header photoUrl={user.tgWebAppData.user.photo_url} username={user.tgWebAppData.user.first_name} />
        <Main>
          <SectionTop />
          <SectionMain />
        </Main>
        <SectionBtn />
      </Wrapper>
    </>
  )
}

export default App
