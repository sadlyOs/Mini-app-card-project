import back from '@/assets/icons/back.svg'
import cancel from '@/assets/icons/cancel.svg'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { swipeBehavior } from '@telegram-apps/sdk';
import './Modal.css'
export default function Modal({ children, label, isVisible, setIsVisible }) {
    const ref = useRef(null);
    const [position, setPosition] = useState({ y: 0 })
    const [isDragging, setIsDragging] = useState(false)
    const modalRef = useRef(null);
    const startYRef = useRef(0);
    const startPositionRef = useRef(0);
    const [visible, setVisible] = useState(false)
    // useLayoutEffect(() => {
    //     const element = ref.current
    //     console.log(isVisible);

    //     document.body.style.overflow = isVisible ? "hidden" : "visible"

    //     if (isVisible) {
    //         element.style.opacity = '0';
    //         element.style.transform = 'scale(0.8)';
    //     }

    //     requestAnimationFrame(() => {
    //         element.style.transition = 'opacity 0.3s, transform 0.3s';
    //         element.style.opacity = '1';
    //         element.style.transform = 'scale(1)';
    //     })

    // }, [isVisible]);

    document.body.style.overflow = isVisible ? "hidden" : "visible"

    const handleTouchStart = useCallback((e) => {
        e.preventDefault();
        console.log('start');

        setIsDragging(true);
        startYRef.current = e.touches[0].clientY
        startPositionRef.current = position.y
    }, [position.y])

    const handleTouchMove = useCallback((e) => {
        if (!isDragging) return;
        console.log('move');
        const currentY = e.touches[0].clientY;
        const deltaY = currentY - startYRef.current;

        const newY = Math.max(-100, startPositionRef.current + deltaY);
        setPosition({ y: newY })

    }, [isDragging])

    const handleTouchEnd = useCallback((e) => {
        if (!isDragging) return;
        setIsDragging(false);

        const modalHeight = modalRef.current?.offsetHeight || 0;
        const threshold = modalHeight * 0.3;

        if (position.y > threshold) {
             if (swipeBehavior.enableVertical.isAvailable()) {
                swipeBehavior.enableVertical();
                swipeBehavior.isVerticalEnabled(); // true
             }
            setIsVisible(false)
            document.body.style.overflow = ""
        } else {
            setPosition({ y: 0 });
        }
    }, [isDragging, position.y])

    useEffect(() => {
        if (swipeBehavior.disableVertical.isAvailable()) {
            swipeBehavior.disableVertical();
            swipeBehavior.isVerticalEnabled(); // false
        }
    }, [])

    return (
        <div className='modal-overlay fixed z-350 bg-[#000000d5] inset-0 flex items-end touch-none'>
            <div className={`modal-content ${isDragging && 'dragging'} w-full relative bottom-0 left-0 bg-[#17212bbd] backdrop-blur-[16px] rounded-t-2xl max-h-[100vh]`} ref={modalRef} style={{
                transform: `translateY(${position.y}px)`,
                transition: isDragging ? 'none' : 'transform 0.3 ease'
            }}>
                <div className='py-6' onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
                    <div className='flex justify-between mb-[30px] px-5'>
                        <div className='cursor-pointer' onClick={() => { setIsVisible(false);  if (swipeBehavior.enableVertical.isAvailable()) {
            swipeBehavior.enableVertical();
            swipeBehavior.isVerticalEnabled(); // true
        }; document.body.style.overflow = "" }}>
                            <img src={back} alt="back" />
                        </div>
                        <div>
                            <p>{label}</p>
                        </div>
                        <div className='cursor-pointer' onClick={() => { setIsVisible(false);  if (swipeBehavior.enableVertical.isAvailable()) {
            swipeBehavior.enableVertical();
            swipeBehavior.isVerticalEnabled(); // true
        }; document.body.style.overflow = "" }}>
                            <img src={cancel} alt="cancel" />
                        </div>
                    </div>
                    <div className='children touch-none overflow-y-scroll'>{children}</div>
                </div>
            </div>
        </div>
    )
}