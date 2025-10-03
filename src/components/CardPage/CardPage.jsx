import { useSelector, useDispatch } from 'react-redux';
import { PlayerArea } from '../ui/PlayerArea/PlayerArea';
import { Table } from '../ui/Table/Table';
import { startGame } from '../../store/gameSlice';
import cancel from '@/assets/icons/cancel2.svg'
import back from '@/assets/icons/back2.svg'
import { useLaunchParams } from '@telegram-apps/sdk-react';
import { useState } from 'react';
import { Card } from '../ui/Card/Card';
import { playCard } from '../../store/gameSlice';
import {
    DndContext,
    useSensor,
    useSensors,
    PointerSensor,
    TouchSensor,
    MouseSensor,
    KeyboardSensor,
    DragOverlay,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

function CardPage() {
    const dispatch = useDispatch();
    const { players, currentPlayer, table } = useSelector(state => state.game);
    const user = useLaunchParams();
    const testPlayers = [
        { id: 'player1', name: user.tgWebAppData.user.first_name, isAI: false, cards: [] },
        { id: 'player2', name: 'Bot 1', isAI: true, cards: [] },
        { id: 'player3', name: 'Bot 2', isAI: true, cards: [] },
    ];

    const [activeCard, setActiveCard] = useState(null);
    const handleStartGame = () => {
        dispatch(startGame(testPlayers));
        // Создаем игроков для теста
    };

    const sensors = useSensors(
        useSensor(PointerSensor, {
            // Критически важные настройки для мобильных устройств
            activationConstraint: {
                distance: 8, // Минимальное расстояние для начала перетаскивания
                delay: 10,  // Задержка перед началом перетаскивания
                tolerance: 5, // Допуск для touch событий
            },
        }),
        useSensor(TouchSensor, {
            // Специфичные настройки для touch устройств
            activationConstraint: {
                distance: 8,
                delay: 10,
                tolerance: 5,
            },
        }),
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );
    const handleDragStart = (event) => {
        const { active } = event;
        setActiveCard(active.data.current.card);
    }

    const handleDragEnd = (event) => {
        const { active, over } = event;
        setActiveCard(null);

        if (!over) return

        const draggedCard = active.data.current.card;
        const dropZone = over.data.current.dropZone;

        if (draggedCard && dropZone === 'table') {
            // Карту бросили на стол - обрабатываем ход
            dispatch(playCard({
                playerId: currentPlayer,
                cardId: draggedCard.id
            }));
        }
    }

    // function handleDragEnd({ over }) {
    //     setParent(over ? over.id : null);
    // }

    return (
        <div className='min-h-[100vh] w-full bg-[#274948]'>
            <div className='flex flex-col h-[100vh]'>
                <p onClick={handleStartGame}>играть</p>
                <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                    <div className='flex justify-between px-4 py-3'>
                        <div className='cursor-pointer'>
                            <img src={back} alt="back" />
                        </div>
                        <div>
                            <div className='w-full flex justify-center'>
                                <div className="w-[40px] h-[40px] relative rounded-4xl">
                                    <img src={user.tgWebAppData.user.photo_url} alt="profile" className="absolute top-0 left-0 w-full h-full object-cover rounded-4xl" />
                                </div>
                            </div>
                            <p className='text-[0.7rem]'>Artur | Design | Motion</p>
                        </div>
                        <div>
                            <img src={cancel} alt="cancel" className='cursor-pointer' />
                        </div>
                    </div>
                    <div className='flex-1'>
                        <Table />
                    </div>
                    <div>
                        <div className="players-container">
                            {players.map(player => (
                                <PlayerArea
                                    myName={user.tgWebAppData.user.first_name}
                                    key={player.id}
                                    player={player}
                                    isCurrentPlayer={player.id === currentPlayer}
                                />
                            ))}
                        </div>
                    </div>
                    <DragOverlay>
                        {activeCard ? (
                            <Card
                                card={activeCard}
                                isFaceUp={true}
                                style={{
                                    transform: 'rotate(5deg) scale(1.1)',
                                    cursor: 'grabbing',
                                }}
                            />

                        ) : null}
                    </DragOverlay>
                </DndContext>
            </div>
        </div>
    );
}

export default CardPage;