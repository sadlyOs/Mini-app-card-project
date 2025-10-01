import { useState, useRef, useCallback } from 'react';
import './SimpleDragDrop.css';

const CardGame = () => {
  const [playerHand, setPlayerHand] = useState([
    { id: 1, suit: 'hearts', rank: '6', x: 0, y: 0 },
    { id: 2, suit: 'diamonds', rank: '7', x: 0, y: 0 },
    { id: 3, suit: 'clubs', rank: '8', x: 0, y: 0 },
    { id: 4, suit: 'spades', rank: '9', x: 0, y: 0 },
    { id: 5, suit: 'hearts', rank: '10', x: 0, y: 0 },
  ]);

  const [tableCards, setTableCards] = useState([]);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [draggedCard, setDraggedCard] = useState(null);
  const gameAreaRef = useRef();

  // Функция для получения символа масти
  const getSuitSymbol = (suit) => {
    const symbols = {
      hearts: '♥',
      diamonds: '♦',
      clubs: '♣',
      spades: '♠'
    };
    return symbols[suit];
  };

  // Функция для получения цвета масти
  const getSuitColor = (suit) => {
    return suit === 'hearts' || suit === 'diamonds' ? 'red' : 'black';
  };

  const handleMouseDown = useCallback((e, card) => {
    e.preventDefault();

    const rect = e.currentTarget.getBoundingClientRect();
    const gameAreaRect = gameAreaRef.current.getBoundingClientRect();

    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    setDragOffset({ x: offsetX, y: offsetY });
    setDraggedCard({
      ...card,
      x: rect.left - gameAreaRect.left,
      y: rect.top - gameAreaRect.top
    });

    // Убираем карту из руки при начале перетаскивания
    setPlayerHand(prev => prev.filter(c => c.id !== card.id));
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!draggedCard) return;

    const gameAreaRect = gameAreaRef.current.getBoundingClientRect();

    const newX = e.clientX - gameAreaRect.left - dragOffset.x;
    const newY = e.clientY - gameAreaRect.top - dragOffset.y;

    setDraggedCard(prev => ({
      ...prev,
      x: newX,
      y: newY
    }));
  }, [draggedCard, dragOffset]);

  const handleMouseUp = useCallback((e) => {
    if (!draggedCard) return;

    const gameAreaRect = gameAreaRef.current.getBoundingClientRect();
    const dropX = e.clientX - gameAreaRect.left;
    const dropY = e.clientY - gameAreaRect.top;

    // Проверяем, находится ли карта над игровым столом (верхняя часть)
    const tableArea = {
      x: 50,
      y: 100,
      width: gameAreaRect.width - 100,
      height: 200
    };

    if (
      dropX >= tableArea.x &&
      dropX <= tableArea.x + tableArea.width &&
      dropY >= tableArea.y &&
      dropY <= tableArea.y + tableArea.height
    ) {
      // Карта брошена на стол
      setTableCards(prev => [...prev, {
        ...draggedCard,
        x: dropX - 40, // Центрируем карту
        y: dropY - 60
      }]);
    } else {
      // Возвращаем карту в руку
      setPlayerHand(prev => [...prev, {
        ...draggedCard,
        x: 0,
        y: 0
      }]);
    }

    setDraggedCard(null);
  }, [draggedCard]);

  // Рассчитываем позиции карт в руке
  const getCardPosition = (index, total) => {
    const handWidth = Math.min(total * 30, 300); // Максимальная ширина руки
    const startX = (400 - handWidth) / 2; // Центрируем руку
    const x = startX + index * 30;
    const y = 350; // Фиксированная позиция по Y для руки

    return { x, y };
  };

  return (
    <div
      className="card-game"
      ref={gameAreaRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <h1>Карточная игра "Дурак"</h1>

      {/* Игровой стол */}
      <div className="game-table">
        <div className="table-area">
          {tableCards.map((card, index) => (
            <div
              key={`table-${card.id}`}
              className="card table-card"
              style={{
                left: `${card.x + index * 20}px`,
                top: `${card.y}px`,
                zIndex: index
              }}
            >
              <div className={`card-content ${getSuitColor(card.suit)}`}>
                <div className="card-top">
                  <span className="card-rank">{card.rank}</span>
                  <span className="card-suit">{getSuitSymbol(card.suit)}</span>
                </div>
                <div className="card-center">
                  <span className="card-suit-large">{getSuitSymbol(card.suit)}</span>
                </div>
                <div className="card-bottom">
                  <span className="card-rank">{card.rank}</span>
                  <span className="card-suit">{getSuitSymbol(card.suit)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Рука игрока */}
      <div className="player-hand">
        {playerHand.map((card, index) => {
          const position = getCardPosition(index, playerHand.length);
          return (
            <div
              key={card.id}
              className="card hand-card"
              style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                zIndex: index
              }}
              onMouseDown={(e) => handleMouseDown(e, card)}
            >
              <div className={`card-content ${getSuitColor(card.suit)}`}>
                <div className="card-top">
                  <span className="card-rank">{card.rank}</span>
                  <span className="card-suit">{getSuitSymbol(card.suit)}</span>
                </div>
                <div className="card-center">
                  <span className="card-suit-large">{getSuitSymbol(card.suit)}</span>
                </div>
                <div className="card-bottom">
                  <span className="card-rank">{card.rank}</span>
                  <span className="card-suit">{getSuitSymbol(card.suit)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Перетаскиваемая карта */}
      {draggedCard && (
        <div
          className="card dragged-card"
          style={{
            left: `${draggedCard.x}px`,
            top: `${draggedCard.y}px`,
            transform: 'rotate(5deg)'
          }}
        >
          <div className={`card-content ${getSuitColor(draggedCard.suit)}`}>
            <div className="card-top">
              <span className="card-rank">{draggedCard.rank}</span>
              <span className="card-suit">{getSuitSymbol(draggedCard.suit)}</span>
            </div>
            <div className="card-center">
              <span className="card-suit-large">{getSuitSymbol(draggedCard.suit)}</span>
            </div>
            <div className="card-bottom">
              <span className="card-rank">{draggedCard.rank}</span>
              <span className="card-suit">{getSuitSymbol(draggedCard.suit)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Колода */}
      <div className="deck">
        <div className="card deck-card">
          <div className="card-back"></div>
        </div>
        <span className="deck-count">36</span>
      </div>
    </div>
  );
};

export default CardGame;