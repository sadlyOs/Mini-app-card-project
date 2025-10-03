import { Card } from '../Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import { playCard } from '../../../store/gameSlice';
import { DndContext } from '@dnd-kit/core';


export const PlayerArea = ({ player, isCurrentPlayer, myName }) => {
    const dispatch = useDispatch();
    const gameStatus = useSelector(state => state.game.status);
    console.log(gameStatus);

    const handleCardClick = (card) => {
        // Можно ли играть этой картой? (Ход игрока и карта подходит)
        if (isCurrentPlayer && gameStatus === 'attacking') {
            dispatch(playCard({ playerId: player.id, cardId: card.id }));
        }
    };

    return (
        <>
            {myName == player.name &&
                <div className={`player-area ${isCurrentPlayer ? 'current-player' : ''} `}>
                    {/* <h3>Вы {isCurrentPlayer ? '(Your Turn)' : ''}</h3> */}
                    <div className="hand w-full h-[150px] flex justify-center">
                        <div className='w-[250px] h-[150px] relative'>
                            {player.cards.map((card, index) => (
                                <Card
                                    key={card.id}
                                    card={card}
                                    isFaceUp={!player.isAI || isCurrentPlayer} // Карты AI скрыты
                                    onCardClick={handleCardClick}
                                    isPlayable={isCurrentPlayer} // Карты можно играть только во время своего хода
                                    style={{ position: "absolute", bottom: `20px`, left: `${index * 30 + 10}px`, transform: `rotate(${-10 + index * 5}deg` }}
                                />
                            ))}
                        </div>
                    </div>
                    <div>
                        <div>
                            <p>Вы {isCurrentPlayer ? 'Ваш ход' : 'Мут'}</p>
                        </div>
                        <div>
                            
                        </div>
                        <div>
                            
                        </div>
                    </div>
                </div>
            }
        </>
    );
};