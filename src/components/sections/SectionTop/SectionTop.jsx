import './SectionTop.css'
import ButtonComponent from "@/components/ui/Button/ButtonComponent"
import icon from "@/assets/icons/Icon.svg"
import ton from "@/assets/ton_symbol.svg"
import coin from "@/assets/icons/objects.svg"
import cancel from '@/assets/icons/cancel.svg'
import trash from '@/assets/icons/trash.svg'
import { Section } from "@telegram-apps/telegram-ui"
import { useState } from "react"
import Modal from "@/components/ui/Modal/Modal"
import ModalFilter from "@/components/ui/ModalFilter/ModalFilter"
import { useDispatch, useSelector } from "react-redux"
import { removeItem, removeAll } from '@/store/filtredSlice'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import { editCurrency } from '../../../store/filtredSlice'
export default function SectionTop() {
    const [isVisibleModal, setIsVisibleModal] = useState(false)
    const [left, setLeft] = useState(false)
    const [right, setRight] = useState(false)
    const data = useSelector(state => state.filter.items)
    const dispatch = useDispatch()
    console.log(data);
    const params = {
        slidesPerView: 3,
        spaceBetween: 10,
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        className: 'block-scroll'
    }


    function clickLeft() {
        setLeft(true)
        setRight(false)
        editCurrency('ton')
    }

    function clickRight() {
        setRight(true)
        setLeft(false)
        editCurrency('coin')
    }
    return (
        <section>
            <div className="flex flex-col gap-2">
                <div className='flex gap-1 px-4'>
                    <ButtonComponent clickHandle={() => setIsVisibleModal(!isVisibleModal)}>
                        <img src={icon} alt="icon" />
                        <p>Фильтр</p>
                    </ButtonComponent>
                    {data.length > 0 &&
                        <ButtonComponent style="flex-1 trash" clickHandle={() => dispatch(removeAll())}>
                            <img src={trash} alt="icon" />
                        </ButtonComponent>
                    }
                </div>
                {data.length > 0 &&
                    <div className="" style={{
                        WebkitOverflowScrolling: 'auto',
                        touchAction: 'pan-x',
                        overscrollBehaviorX: 'contain'
                    }}>
                        <Swiper
                                {...params}>
                            {data.map((item, index) => (
                                <SwiperSlide>
                                    <ButtonComponent style={'button-expand'} key={index} clickHandle={() => dispatch(removeItem(item))}>
                                        <p>{item}</p>
                                        <img src={cancel} alt="cancel" />
                                    </ButtonComponent>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                }
                <div className="flex w-full gap-2 px-4">
                    <div className="flex-1">
                        <ButtonComponent clickHandle={clickLeft} clicked={left}>
                            <img src={ton} alt="ton" />
                            <p>За TON</p>
                        </ButtonComponent>
                    </div>
                    <div className="flex-1">
                        <ButtonComponent clickHandle={clickRight} clicked={right}>
                            <img src={coin} alt="coin" />
                            <p>За Coin</p>
                        </ButtonComponent>
                    </div>
                </div>
            </div>
            {isVisibleModal &&
                <Modal label={'Фильтр'} isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
                    <ModalFilter setIsVisibleModal={setIsVisibleModal} />
                </Modal>
            }
        </section>
    )
}