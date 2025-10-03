// hooks/useTelegramDrag.js
import { useState, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';

export const useTelegramDrag = () => {
    const dispatch = useDispatch();
    const [draggedCard, setDraggedCard] = useState(null);
    const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragStartPos = useRef({ x: 0, y: 0 });
    const cardElementRef = useRef(null);

    const handleTouchStart = useCallback((card, event) => {
        event.preventDefault();
        event.stopPropagation();

        const touch = event.touches[0];
        const rect = event.currentTarget.getBoundingClientRect();

        setDraggedCard(card);
        setIsDragging(true);

        // Начальная позиция касания
        dragStartPos.current = {
            x: touch.clientX,
            y: touch.clientY,
            startX: rect.left,
            startY: rect.top
        };

        // Начальная позиция карты
        setDragPosition({
            x: 0,
            y: 0
        });

        // Виброотклик
        if (window.navigator.vibrate) {
            window.navigator.vibrate(30);
        }

        // Добавляем обработчики для всего документа
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd, { passive: false });

    }, []);

    const handleTouchMove = useCallback((event) => {
        if (!isDragging) return;

        event.preventDefault();
        event.stopPropagation();

        const touch = event.touches[0];
        const deltaX = touch.clientX - dragStartPos.current.x;
        const deltaY = touch.clientY - dragStartPos.current.y;

        // Обновляем позицию карты
        setDragPosition({
            x: deltaX,
            y: deltaY
        });

    }, [isDragging]);

    const handleTouchEnd = useCallback((event) => {
        if (!isDragging) return;

        event.preventDefault();
        event.stopPropagation();

        const touch = event.changedTouches[0];
        const deltaX = touch.clientX - dragStartPos.current.x;
        const deltaY = touch.clientY - dragStartPos.current.y;

        // Проверяем, было ли это перетаскивание или просто тап
        const isDrag = Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10;

        if (isDrag && draggedCard) {
            // Проверяем, попало ли перетаскивание на стол
            const tableElement = document.querySelector('.game-table');
            if (tableElement) {
                const tableRect = tableElement.getBoundingClientRect();
                const isOverTable = (
                    touch.clientX >= tableRect.left &&
                    touch.clientX <= tableRect.right &&
                    touch.clientY >= tableRect.top &&
                    touch.clientY <= tableRect.bottom
                );

                if (isOverTable) {
                    // Карта брошена на стол - выполняем ход
                    dispatch(playCard({
                        playerId: draggedCard.playerId,
                        cardId: draggedCard.id
                    }));
                }
            }
        } else if (!isDrag && draggedCard) {
            // Это был тап - обрабатываем как клик
            dispatch(playCard({
                playerId: draggedCard.playerId,
                cardId: draggedCard.id
            }));
        }

        // Сбрасываем состояние
        setDraggedCard(null);
        setIsDragging(false);
        setDragPosition({ x: 0, y: 0 });

        // Убираем обработчики
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);

    }, [isDragging, draggedCard, dispatch, handleTouchMove]);

    return {
        draggedCard,
        dragPosition,
        isDragging,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd
    };
};