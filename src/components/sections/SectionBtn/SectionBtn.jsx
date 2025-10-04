import ButtonComponent from "../../ui/Button/ButtonComponent"
import btnIcon from '../../../assets/icons/btnIcon.svg'
import { useState } from "react"
import Modal from "../../ui/Modal/Modal"
import ModalGame from "../../ui/ModalGame/ModalGame"
import { useSocket } from "../../../SocketContext"

export default function SectionBtn() {
    const [isVisibleModal, setIsVisibleModal] = useState(false)
    const socket = useSocket()

    function clickHandle() {
    }

    return (
        <section className="sectioBtn w-full fixed bottom-2 left-0 z-100 px-4">
            <div className="flex gap-3">
                <ButtonComponent style={'bg-customBtn1! text-black!'} clickHandle={() => setIsVisibleModal(true)}>
                    <img src={btnIcon} alt="btnIcon" className="h-[2vh]" />
                    <p>Создать игру</p>
                </ButtonComponent>
                <ButtonComponent clickHandle={clickHandle} style={'bg-linear-to-r! from-[#FAE298] to-[#B676FE] text-black!'}>
                    <p>Быстрая игра</p>
                </ButtonComponent>
            </div>

            {isVisibleModal &&
                <Modal label={'Создание игры'} isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
                    <ModalGame setIsVisibleModal={setIsVisibleModal} />
                </Modal>
            }
        </section>
    )
}