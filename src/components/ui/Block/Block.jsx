import logo1 from "../../../assets/icons/DurakBv1/logo1.svg"
import logo2 from "../../../assets/icons/DurakBv1/logo2.svg"
import logo3 from "../../../assets/icons/DurakBv1/logo3.svg"
import logo4 from "../../../assets/icons/DurakBv1/logo4.svg"
import logo5 from "../../../assets/icons/DurakBv1/logo5.svg"
import ton from "../../../assets/ton_symbol.svg"
import profile from "../../../assets/icons/DurakBv2/Icon.svg"
import card from "../../../assets/icons/DurakBv2/Group.svg"

export default function Block() {
    return (
        <div className="bg-[#FFFFFF0D] px-3 py-5 rounded-2xl">
            <div className="flex justify-between">
                <div className="text-sm font-semibold">
                    <p>Калыван</p>
                </div>
                <div className="flex gap-1">
                    <div>
                        <img src={logo1} alt="logo1" />
                    </div>
                    <div>
                        <img src={logo2} alt="logo2" />
                    </div>
                    <div>
                        <img src={logo3} alt="logo3" />
                    </div>
                    <div>
                        <img src={logo4} alt="logo4" />
                    </div>
                    <div>
                        <img src={logo5} alt="logo5" />
                    </div>
                </div>
            </div>
            <div className="py-3">
                <div className="h-[2px] w-full bg-[#FFFFFF1A]"></div>
            </div>
            <div className="flex justify-between">
                <div className="flex gap-2">
                    <img src={ton} alt="ton" />
                    <p>5</p>
                </div>

                <div className="flex gap-2">
                    <p>1/2</p>
                    <img src={profile} alt="profile" />
                </div>

                <div className="flex gap-2">
                    <img src={card} alt="card" />
                    <p>52</p>
                </div>
            </div>
        </div>
    )
}