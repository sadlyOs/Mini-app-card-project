import './Card.css'
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export const Card = ({ card, isFaceUp = true, onCardClick, isPlayable = false, style }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: card.id,
        data: {
            card,
            type: 'card',
        },
        disabled: !isPlayable
    });
    const dragStyle = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : {};

    const handleClick = () => {
        if (isPlayable && onCardClick && !isDragging) {
            onCardClick(card);
        }
    };

    return (
        <div ref={setNodeRef} className={`${isPlayable ? 'card-playable' : ''}  ${isPlayable ? 'cursor-pointer' : 'cursor-default'} card shadow-3xl`}
            onClick={handleClick}
            style={{
                ...style,
                ...dragStyle,
                opacity: isDragging ? 1 : 1,
                transition: isDragging ? 'none' : 'transform 0.2s ease',
            }}
            {...listeners}
            {...attributes}
        >
            {isFaceUp &&
                <img
                    src={card.imageUrl}
                    alt={`${card.rank}_ ${card.suit}_`}
                    className='w-[80px] pointer-events-none'
                />
            }
        </div>
    );
};