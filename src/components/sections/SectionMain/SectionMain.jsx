import Block from "../../ui/Block/Block"
import { Section } from "@telegram-apps/telegram-ui"

export default function SectionMain() {
    return (
        <section className="w-full py-5 px-4">
            <div className="text-center text-sm font-semibold pb-4">
                <p>Список открытых комнат</p>
            </div>
            <div className="flex flex-col gap-2">
                <Block />
                <Block />
                <Block />
                <Block />
                <Block />
                <Block />
                <Block />
            </div>
        </section>

    )
}