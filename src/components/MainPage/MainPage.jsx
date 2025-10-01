import Wrapper from "../ui/Wrapper/Wrapper";
import Header from "../Header/Header";
import Main from "../Main/Main";
import { useState, useEffect } from "react";
import { swipeBehavior } from '@telegram-apps/sdk'
import { useLaunchParams } from '@telegram-apps/sdk-react';
import { SectionTop, SectionMain, SectionBtn } from "@/components/sections"

export default function MainPage({ setNavigate }) {
  const user = useLaunchParams();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (swipeBehavior.mount.isAvailable()) {
      swipeBehavior.mount();
      swipeBehavior.isMounted(); // true
    }

    if (swipeBehavior.enableVertical.isAvailable()) {
      swipeBehavior.enableVertical();
      swipeBehavior.isVerticalEnabled(); // true
    }
  }, []);

  return (
    <Wrapper>
      <Header
        photoUrl={user.tgWebAppData.user.photo_url}
        username={user.tgWebAppData.user.first_name}
        setNavigate={setNavigate}
      />
      <Main>
        <SectionTop />
        <SectionMain />
      </Main>
      <SectionBtn />
      {/* <Modal isVisible={false} setIsVisible={setIsVisible}>
            <ModalStatistic photoUrl={user.tgWebAppData.user.photo_url} username={user.tgWebAppData.user.first_name}/>
            </Modal> */}
    </Wrapper>
  );
}
