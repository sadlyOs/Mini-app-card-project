import ton from "../../assets/ton_symbol.svg"
import union from "../../assets/Union.svg"
import setting from "../../assets/icons/headerIcon/Icon1.svg"
import notif from "../../assets/icons/headerIcon/Icon.svg"
import { Link } from "react-router-dom"

export default function Header({ photoUrl, username, setNavigate }) {
    return (
        <header className="relative py-4 px-4">
            <p className="cursor-pointer" onClick={() => setNavigate('card')}>Карты</p>
            <div className="flex justify-between items-center relative z-20">
                <div className="flex gap-1">
                    <div className="w-[50px] h-[50px] relative rounded-4xl">
                        <img src={photoUrl} alt="profile" className="absolute top-0 left-0 w-full h-full object-cover rounded-4xl" />
                    </div>
                    <div>
                        <div className="text-gray-500 font-bold mb-[4px]">
                            <p>{username}</p>
                        </div>
                        <div className="flex gap-2">
                            <div className="flex">
                                <img src={ton} alt="ton" />
                                <p className="ml-[5px]">3620,26</p>
                            </div>
                            <div className="flex">
                                <img src={union} alt="union" />
                                <p className="ml-[5px]">5</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-5">
                    <div>
                        <img src={notif} alt="notif" />
                    </div>
                    <div>
                        <img src={setting} alt="setting" />
                    </div>
                </div>
            </div>
            {/* <div className="absolute w-full h-full blur-3xl left-0 top-0 z-10 bg-[#17212BCC]"></div> */}
        </header>
    )
}