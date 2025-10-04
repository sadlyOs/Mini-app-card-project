import { Card } from '../Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import { playCard } from '../../../store/gameSlice';
import { DndContext } from '@dnd-kit/core';
import ButtonComponent from "@/components/ui/Button/ButtonComponent"

export const PlayerArea = ({ player, isCurrentPlayer, myName, photo }) => {
    const dispatch = useDispatch();
    const gameStatus = useSelector(state => state.game.status);
    console.log(gameStatus);

    const handleCardClick = (card) => {
        // Можно ли играть этой картой? (Ход игрока и карта подходит)
        if (isCurrentPlayer && gameStatus === 'attacking') {
            // dispatch(playCard({ playerId: player.id, cardId: card.id }));
        }
    };

    return (
        <>
            {myName == player.name &&
                <div className={`player-area ${isCurrentPlayer ? 'current-player' : ''} relative`}>
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
                    <div className='w-full flex justify-center pt-2.5 pb-7.5 px-6 gap-7 items-center bg-[#17212b90] backdrop-blur-2xl rounded-2xl'>
                        <div>
                            {isCurrentPlayer && <p>Ваш ход</p>}
                        </div>
                        <div className='w-[50px] h-[50px] relative rounded-4xl'>
                            <img src={photo} alt="avatar" className="absolute top-0 left-0 w-full h-full object-cover rounded-4xl"/>
                        </div>
                        <div>
                            {isCurrentPlayer && <ButtonComponent style={'py-[11px]! px-[50px]!'}>Бито</ButtonComponent>}
                        </div>
                    </div>
                </div>
            }
        </>
    );
};