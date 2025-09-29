import { Button } from "@telegram-apps/telegram-ui"
import './Button.css'
import clsx from "clsx"
import { useState } from "react"

export default function ButtonComponent({ children, clickHandle, clicked, style, val, type }) {
    const btnStyle = clsx('button', {
        'bg-custom!': clicked
    })
    return (
        <Button type={type ? type : "button"} value={val} className={`py-2 w-full rounded-xl button ${btnStyle} ${style}`} onClick={clickHandle}>{children}</Button>
    )
}