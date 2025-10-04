import "./ModalGame.css?q=3523452345324";

import ButtonComponent from "@/components/ui/Button/ButtonComponent";
import Icon1 from "@/assets/icons/DurakBv5/icon1.svg?react";
import Icon2 from "@/assets/icons/DurakBv5/icon2.svg?react";
import Icon3 from "@/assets/icons/DurakBv5/icon3.svg?react";
import Icon4 from "@/assets/icons/DurakBv5/icon4.svg?react";
import Icon5 from "@/assets/icons/DurakBv5/icon5.svg?react";
import Icon6 from "@/assets/icons/DurakBv5/icon6.svg?react";
import Icon7 from "@/assets/icons/DurakBv5/icon7.svg?react";
import Icon8 from "@/assets/icons/DurakBv5/icon8.svg?react";
import galka from "@/assets/icons/galka.svg";
import ton from "@/assets/ton_symbol.svg";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import Input from "@/components/ui/Input/Input";
import { swipeBehavior } from '@telegram-apps/sdk';
import "swiper/css";
import { createRoom } from "../../../requests/request";

export default function ModalGame({ setIsVisibleModal }) {
  const [input, setInput] = useState('');
  const [row1, setRow1] = useState('');
  const [row2, setRow2] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false)
  const modes = [
    [
      { Подкидной: <Icon1 /> },
      { Соседи: <Icon2 /> },
      { "С шулерами": <Icon3 /> },
      { Классика: <Icon4 /> },
    ],
    [
      { Переводной: <Icon5 /> },
      { Все: <Icon6 /> },
      { "Честная игра": <Icon7 /> },
      { Ничья: <Icon8 /> },
    ],
  ];
  const dispatch = useDispatch();
  const params = {
    slidesPerView: 3,
    spaceBetween: 10,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    className: "block-scroll",
  };
  const [card, setCard] = useState("");
  const [gamer, setGamer] = useState(0);
  const [countTon, setCountTon] = useState(0);

  const data = useSelector(state => state)
  console.log(data);


  const clickCard = (e, item) => {
    console.log(e);

    setCountTon(item);
    setInput("");
  };

  const cancel = () => {
    setIsVisibleModal(false);
    swipeBehavior.enableVertical();
    document.body.style.overflow = ''
  }

  function handleSubmit(e) {
    e.preventDefault();
    const ton = input.length > 0 ? Number(input) : countTon

    const sendData = {
      CountCards: Number(card),
      Horseshoe: row1.toLowerCase() === 'подкидной' ? true : false,
      Shoolers: row1.toLowerCase() === 'c шулерами' ? true : false,
      Threowers: row2.toLowerCase() === 'все' ? true : false,
      GameType: row1.toLowerCase() == 'классика' ? true : false,
      Coin: data.filter.currency,
      Price: ton,
      MaxUsers: gamer,
      Private: checked
    }
    console.log(sendData);
    console.log(data.init.user);

    createRoom(sendData, data.init.user)
    // cancel()
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="pb-3">
        <div className="px-5 pb-2">
          <div className="relative">
            <label className="text-gray-400 font-semibold">Ваша вставка</label>
            {/* <input
              type="text"
              placeholder="Введите сумму"
              className="w-full outline-0 py-3 pl-[46px] pr-2 border-2 border-[#3C4350] rounded-2xl"
              onChange={(e) => {
                setInput(e.target.value);
                setCountTon(null);
              }}
              value={input}
            /> */}
            <Input placeholder="Введите сумму" val={input} func={(e) => {setInput(e.target.value); setCountTon(null);}} />
            <img
              src={ton}
              alt="ton"
              className="absolute top-[70%] left-3.5 translate-y-[-70%]"
            />
          </div>
        </div>
        <div className="flex gap-2 overflow-x-scroll before:pl-5 block-scroll">
          <Swiper {...params}>
            {[10, 20, 50, 100, 2000].map((item) => (
              <SwiperSlide>
                <ButtonComponent
                  clickHandle={(e) => clickCard(e, item)}
                  style={`button-expend rounded-3xl! border-2! border-[#384048]! ${
                    item == countTon && "modal-game__white"
                  }`}
                >
                  <img src={ton} alt="ton" />
                  <p>{item}</p>
                </ButtonComponent>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="pb-3 px-5">
        <div className="text-center mb-5 text-sm">
          <p>Колода</p>
        </div>
        <div className="flex justify-between gap-2.5">
          {["24", "36", "52"].map((item, index) => (
            <ButtonComponent
              style={item == card && "modal-game__white"}
              val={Number(item)}
              clickHandle={() => setCard(item)}
              key={index}
            >
              {item} карт
            </ButtonComponent>
          ))}
        </div>
      </div>

      <div className="pb-3 px-5">
        <div className="text-center mb-2 text-sm">
          <p>Игроки</p>
        </div>
        <div className="flex justify-between gap-2.5">
          {[2, 3, 4, 5, 6].map((item, index) => (
            <ButtonComponent
              clickHandle={() => setGamer(item)}
              style={gamer == item && "modal-game__white"}
              key={index}
            >
              {item}
            </ButtonComponent>
          ))}
        </div>
      </div>

      <div className="pb-3 px-5">
        <div className="text-center mb-2 text-sm">
          <p>Режим игры</p>
        </div>
        <div className="grid grid-cols-4 gap-2.5">
          {modes[0].map((item, index) => (
            <ButtonComponent key={index} style={`flex-col py-8! px-2! modal-filter__block hover:bg-custom! ${row1 == Object.keys(item)[0] ? "modal-game__white": ''}`} clickHandle={() => setRow1(Object.keys(item)[0])}>
              <div>{item[Object.keys(item)[0]]}</div>
              <div className="text-[0.7rem] font-semibold">
                <p>{Object.keys(item)[0]}</p>
              </div>
            </ButtonComponent>
          ))}

          {modes[1].map((item, index) => (
            <ButtonComponent key={index} style={`flex-col py-8! px-2! modal-filter__block hover:bg-custom! ${row2 == Object.keys(item)[0] && "modal-game__white"}`} clickHandle={() => setRow2(Object.keys(item)[0])}>
              <div>{item[Object.keys(item)[0]]}</div>
              <div className="text-[0.7rem] font-semibold">
                <p>{Object.keys(item)[0]}</p>
              </div>
            </ButtonComponent>
          ))}
        </div>
      </div>

      <div className="pb-3 px-5">
        <div className="relative">
          <input onChange={() => setChecked(!checked)} type="checkbox" className="checkbox appearance-none w-4 h-4 border-2 cursor-pointer checked:bg-custom default:outline-2 default:outline-custom optional:border-custom rounded-sm"/>
          <img src={galka} alt="icon" className="hidden absolute top-1.5 left-0.5 pointer-events-none" />
          <label className="pl-2">Приватная игра</label>
        </div>
        <div>
          <Input placeholder="Введите пароль" val={password} func={(e) => setPassword(e.target.value)} style="pl-3!" disabled={!checked} />
        </div>
      </div>

      <div className="pb-3 px-5">
        <div className="flex flex-col gap-2 text-sm">
          <ButtonComponent type="submit" style="bg-customBtn1! text-black!">
            Применить
          </ButtonComponent>
          <ButtonComponent clickHandle={cancel}>Отмена</ButtonComponent>
        </div>
      </div>
    </form>
  );
}
