import { useSelector } from 'react-redux';
import { Card } from '../Card/Card';
import { useDroppable } from '@dnd-kit/core';
import { useEffect } from 'react';

export const Table = () => {
    const { table, currentPlayer, players } = useSelector(state => state.game);

    const { isOver, setNodeRef, over } = useDroppable({
        id: 'table-drop-zone',
        data: {
            dropZone: 'table',
        },
    });


    // const currentPlayerName = players.find(p => p.id === currentPlayer)?.name;

    return (
        <div className="table h-full w-full px-4" ref={setNodeRef} id='table-drop-zone' style={{
            backgroundColor: isOver ? 'rgba(144, 238, 144, 0.3)' : 'transparent',
            transition: 'background-color 0.2s ease',
        }}>
            {/* Колода и козырь */}
            {/* <div className="deck-area">
                {deck.length > 0 && (
                    <Card isFaceUp={false} card={{}} /> // Рубашка колоды
                )}
                {trumpSuit && (
                    <div className="trump-card">
                        <small>Козырь:</small>
                        <img src={`/public/card/6_of_${trumpSuit}.png`} className='w-[50px]' alt={trumpSuit} />
                    </div>
                )}
            </div> */}

            {/* Карты на столе */}
            <div className="battlefield relative">
                {table.length === 0 && (
                    <div className="empty-table-message">
                        {isOver ? 'Бросьте карту сюда...' : 'Перетащите карту на стол'}
                    </div>
                )}
                {/* {table.map((pair, index) => (
                    <div key={index} className="attack-defend-pair">
                        <Card card={pair.attackCard} isFaceUp={true} isPlayable={false} />
                        {pair.defendCard ? (
                            <Card card={pair.defendCard} isFaceUp={true} isPlayable={false} />
                        ) : (
                            <div className="empty-slot">?</div> // Место для отбива
                        )}
                    </div>
                ))} */}
            </div>
        </div>
    );
};