export default function Input({ placeholder, val, func, style, type="text", disabled}) {
    return <input type={type} className={`w-full outline-0 py-3 pl-[46px] pr-2 border-2 border-[#3C4350] rounded-2xl ${style}`} value={val} onChange={(e) => func(e)} placeholder={placeholder} disabled={disabled}/>
}