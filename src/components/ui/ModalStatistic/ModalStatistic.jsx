import Header from "@/components/Header/Header";
import ButtonComponent from "@/components/ui/Button/ButtonComponent";
import server from "@/assets/icons/server.svg";
import arrow from "@/assets/icons/arrow.svg";
import { useState } from "react";
import ton from "@/assets/ton_symbol.svg";
import coin from "@/assets/icons/objects.svg"


export default function ModalStatistic({ photoUrl, username }) {
  const [select, setSelect] = useState(false);
  const [country, setCountry] = useState("Asia");
  function handleSubmit(e) {}
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Header photoUrl={photoUrl} username={username} />
      <div className="pb-3 px-5 pt-7">
        <div>
          <label>Сервер</label>
        </div>
        <div className="pb-7 border-b-2 border-[#FFFFFF1A] rounded-sm relative">
          <div
            onClick={() => setSelect(!select)}
            className="w-full px-10 py-3 bg-[#FFFFFF1A] rounded-2xl border-2 border-[#394049] relative flex cursor-pointer"
          >
            <img
              src={server}
              alt="server"
              className="absolute left-2 top-[50%] translate-y-[-50%]"
            />
            <p>{country}</p>
            <img
              src={arrow}
              alt="arrow"
              className="absolute right-2 top-[50%] translate-y-[-50%]"
            />
          </div>
          {select && (
            <div className="w-full bg-[#FFFFFF1A] rounded-2xl mt-3">
              <div onClick={() => {setCountry('Europe'); setSelect(false)}} className="w-full border-b-1 border-[#716f6f1a] px-2 py-4 cursor-pointer">
                <p>Europe</p>
              </div>
              <div onClick={() => {setCountry('Australia'); setSelect(false)}} className="w-full border-b-1 border-[#716f6f1a] px-2 py-4 cursor-pointer">
                <p>Australia</p>
              </div>
              <div onClick={() => {setCountry('America'); setSelect(false)}} className="w-full border-b-1 border-[#716f6f1a] px-2 py-4 cursor-pointer">
                <p>America</p>
              </div>
            </div>
          )}
        </div>
        <div>
            <div className="py-6 text-xl text-center">
                <p>Статистика игр</p>
            </div>
            <div>
                <div className="text-center text-[1.2rem]">
                    <p>За сезон</p>
                </div>
                <div className="flex justify-between">
                    <div className="flex flex-col justify-end gap-2">
                        <p>Побед</p>
                        <p>Поражений</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-gray-600">Кол-во</p>
                        <p>12</p>
                        <p>5</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-gray-600">Выиграно TON</p>
                        <div className="flex gap-2">
                            <img src={ton} alt="ton" />
                            <p>532</p>
                        </div>
                        <div className="flex gap-2">
                            <img src={ton} alt="ton" />
                            <p>-23</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-gray-600">Выиграно FUN</p>
                        <div className="flex gap-2">
                            <img src={coin} alt="coin" />
                            <p>532</p>
                        </div>
                        <div className="flex gap-2">
                            <img src={coin} alt="coin" />
                            <p>-9</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-1 my-4 bg-[#FFFFFF1A]"></div>
            <div>
                <div className="text-center text-[1.2rem]">
                    <p>За все время</p>
                </div>
                <div className="flex justify-between">
                    <div className="flex flex-col justify-end gap-2">
                        <p>Побед</p>
                        <p>Поражений</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-gray-600">Кол-во</p>
                        <p>12</p>
                        <p>5</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-gray-600">Выиграно TON</p>
                        <div className="flex gap-2">
                            <img src={ton} alt="ton" />
                            <p>532</p>
                        </div>
                        <div className="flex gap-2">
                            <img src={ton} alt="ton" />
                            <p>-23</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-gray-600">Выиграно FUN</p>
                        <div className="flex gap-2">
                            <img src={coin} alt="coin" />
                            <p>532</p>
                        </div>
                        <div className="flex gap-2">
                            <img src={coin} alt="coin" />
                            <p>-9</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-1 my-4 bg-[#FFFFFF1A]"></div>
            <div className="flex flex-col gap-2 mt-10">
                <ButtonComponent style={'bg-red-700!'}>
                    <p>Очистить статистику</p>
                </ButtonComponent>

                <ButtonComponent>
                    <p>Назад</p>
                </ButtonComponent>
            </div>

        </div>
      </div>
    </form>
  );
}
