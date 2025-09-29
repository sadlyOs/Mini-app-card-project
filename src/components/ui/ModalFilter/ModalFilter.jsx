import './ModalFilter.css'

import ButtonComponent from "@/components/ui/Button/ButtonComponent"
import Icon1 from '@/assets/icons/DurakBv5/icon1.svg?react'
import Icon2 from '@/assets/icons/DurakBv5/icon2.svg?react'
import Icon3 from '@/assets/icons/DurakBv5/icon3.svg?react'
import Icon4 from '@/assets/icons/DurakBv5/icon4.svg?react'
import Icon5 from '@/assets/icons/DurakBv5/icon5.svg?react'
import Icon6 from '@/assets/icons/DurakBv5/icon6.svg?react'
import Icon7 from '@/assets/icons/DurakBv5/icon7.svg?react'
import Icon8 from '@/assets/icons/DurakBv5/icon8.svg?react'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addItem } from '@/store/filtredSlice'
import { swipeBehavior } from '@telegram-apps/sdk';

export default function ModalFilter({ setIsVisibleModal }) {
    const [gameClicked, setGameClicked] = useState(new Set())
    const [gamerClicked, setGamerClicked] = useState(new Set());
    const [cardClicked, setCardClicked] = useState(new Set())
    const [gameMode, setGameMode] = useState([]);
    const [gamers, setGamers] = useState([]);
    const [cardData, setCardData] = useState([])
    const [data, setData] = useState([])
    const dispatch = useDispatch()

    function remove(setFunction, array, value) {
        const filtred = array.filter(item => item.toLowerCase() !== value.toLowerCase())
        setFunction(filtred)
    }

    function add(setFunction, array, value) {
        array.push(value);
        setFunction(array)
    }

    function game(e, item) {
        console.log(item);

        states(gameClicked, setGameClicked, item)
        const value = e.currentTarget.value;
        if (gameClicked.has(item)) {
            remove(setGameMode, gameMode, value)
        }
        else {
            add(setGameMode, gameMode, value)
        }
    }

    function gamer(e, item) {
        console.log(item);

        states(gamerClicked, setGamerClicked, item)
        const value = e.currentTarget.value;
        if (gamerClicked.has(item)) {
            remove(setGamers, gamers, value + " игроков")
        }
        else {
            add(setGamers, gamers, value + " игроков")
        }
    }

    function card(e, item) {
        const value = e.currentTarget.value;
        states(cardClicked, setCardClicked, item)
        if (cardClicked.has(item)) {
            remove(setCardData, cardData, value + " карт")
        }
        else {
            add(setCardData, cardData, value + " карт")
        }
    }

    function states(state, setState, item) {
        const newClicked = new Set(state);

        if (newClicked.has(item)) {
            newClicked.delete(item)
        } else {
            newClicked.add(item);
        }

        setState(newClicked)
    }

    function handleSubmit(e) {
        e.preventDefault();
        cardData.length == 0 && setCardData(['24 карт', '36 карт', '52 карт'])
        gamers.length == 0 && setGamers(['2 игроков', '3 игроков', '4 игроков', '5 игроков', '6 игроков'])
        gameMode.length == 0 && setGameMode(['Подкидной', 'Соседи', 'С шулерами', 'Классика', 'Переводной', 'Все', 'Честная игра', 'Ничья'])

        setData([...gameMode, ...gamers, ...cardData])
    }

    function addStore() {
        const sendData = [...data]
        dispatch(addItem(sendData))
    }

    function clear() {
        setCardClicked(new Set())
        setGamerClicked(new Set())
        setGameClicked(new Set())
        setData([])
    }

    useEffect(() => {
        if (data.length > 0) {
            addStore()
            swipeBehavior.enableVertical();
            setIsVisibleModal(false)
            document.body.style.overflow = "";
        }
    }, [data])

    return (
        <form onSubmit={(e) => handleSubmit(e)} className='px-5'>
            <div className="pb-3">
                <div className="text-center mb-5 text-sm">
                    <p>Колода</p>
                </div>
                <div className="flex justify-between gap-2.5">
                    {['24', '36', '52'].map((item, index) => (
                        <ButtonComponent style={cardClicked.has(item) && "modal-game__white"} val={Number(item)} clickHandle={(e) => { card(e, item) }} key={index}>{item} карт</ButtonComponent>
                    ))}
                    {/* <ButtonComponent style={cardClicked == '24' && "modal-game__white"} val={"24"} clickHandle={(e) => { setCardClicked('24'); card(e) }}>24 карт</ButtonComponent>
                    <ButtonComponent style={cardClicked == '36' && "modal-game__white"} val={"36"} clickHandle={(e) => { setCardClicked('36'); card(e) }}>36 карт</ButtonComponent>
                    <ButtonComponent style={cardClicked == '52' && "modal-game__white"} val={"52"} clickHandle={(e) => { setCardClicked('52'); card(e) }}>52 карт</ButtonComponent> */}
                </div>
            </div>
            <div className="pb-3">
                <div className="text-center mb-2 text-sm">
                    <p>Игроки</p>
                </div>
                <div className="flex justify-between gap-2.5">
                    {['2', '3', '4', '5', '6'].map((item, index) => (
                        <ButtonComponent val={Number(item)} clickHandle={(e) => gamer(e, item)} style={gamerClicked.has(item) && "modal-game__white"} key={index}>{item}</ButtonComponent>
                    ))}
                </div>
            </div>

            <div className="pb-3">
                <div className="text-center mb-2 text-sm">
                    <p>Режим игры</p>
                </div>
                <div className="grid grid-cols-4 gap-2.5">
                    {[{ 'Подкидной': <Icon1 /> }, { 'Соседи': <Icon2 /> }, { 'С шулерами': <Icon3 /> }, { 'Классика': <Icon4 /> }, { 'Переводной': <Icon5 /> }, { 'Все': <Icon6 /> }, { 'Честная игра': <Icon7 /> }, { 'Ничья': <Icon8 /> }].map((item, index) => (
                        <ButtonComponent val={Object.keys(item)[0]} key={index} style={`flex-col py-8! px-2! modal-filter__block hover:bg-custom! ${gameClicked.has(Object.keys(item)[0]) && "modal-game__white"}`} clickHandle={(e) => game(e, Object.keys(item)[0])}>
                            <div>
                                {item[Object.keys(item)[0]]}
                            </div>
                            <div className="text-[0.7rem] font-semibold">
                                <p>{Object.keys(item)[0]}</p>
                            </div>
                        </ButtonComponent>
                    ))}
                </div>
            </div>

            <div className="pb-3">
                <div className="flex flex-col gap-2">
                    <ButtonComponent type="submit" style='bg-customBtn1! text-black!'>Применить</ButtonComponent>
                    <ButtonComponent clickHandle={clear}>Очистить</ButtonComponent>
                </div>
            </div>
        </form>
    )
}