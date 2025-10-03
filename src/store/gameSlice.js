import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
const suits = ['1', '2', '3', '4'];
const ranks = ['6', '7', '8', '9', '10', '11', '12', '13', '14'];

export const createDeck = () => {
    const deck = [];
    for (let suit of suits) {
        for (let rank of ranks) {
            deck.push({
                id: `${rank}_${suit}_`, // Уникальный ID, например "ace_of_spades"
                rank,
                suit,
                // Путь к изображению основан на ID
                imageUrl: `/card/${rank}_${suit}_.png`
            });
        }
    }
    return deck;
};


const initialState = {
    deck: [], // Массив карт в колоде
    players: [], // Массив игроков
    table: [], // Карты на столе в формате { attackCard, defendCard } или просто карты для подкидного
    currentPlayer: null, // ID текущего игрока
    attackPlayer: null, // ID атакующего игрока
    status: 'idle', // 'idle', 'attacking', 'defending', 'gameOver'
    trumpSuit: null, // Козырная масть
    gameModes: { // Выбранные режимы игры
        mainMode: 'throw-in', // 'throw-in', 'neighbors', 'cheaters', 'classic'
        secondaryMode: 'transfer', // 'transfer', 'all', 'fair', 'draw'
    }
};

const determineFirstPlayer = (players, trumpSuit) => {
    let lowestTrumpPlayer = null;
    let lowestTrumpCard = null;

    // Проходим по всем игрокам и их картам
    players.forEach(player => {
        player.cards.forEach(card => {
            // Ищем козырные карты
            if (card.suit === trumpSuit) {
                // Если это первая найденная козырная карта или карта младше текущей найденной
                if (!lowestTrumpCard || isCardLower(card, lowestTrumpCard, trumpSuit)) {
                    lowestTrumpCard = card;
                    lowestTrumpPlayer = player.id;
                }
            }
        });
    });

    // Если нашли игрока с козырем - он ходит первым
    if (lowestTrumpPlayer) {
        return lowestTrumpPlayer;
    }

    // Если козырей ни у кого нет - ищем самую младшую карту среди всех игроков
    return findPlayerWithLowestCard(players);
}

function isCardLower(card1, card2, trumpSuit) {

    // Если обе карты козырные - сравниваем по достоинству
    if (card1.suit === trumpSuit && card2.suit === trumpSuit) {
        return ranks.indexOf(card1.rank) < ranks.indexOf(card2.rank);
    }

    // Если card1 козырь, а card2 - нет, то card1 не может быть младше
    if (card1.suit === trumpSuit && card2.suit !== trumpSuit) {
        return false;
    }

    // Если card2 козырь, а card1 - нет, то card1 младше
    if (card1.suit !== trumpSuit && card2.suit === trumpSuit) {
        return true;
    }

    // Если обе не козырные - сравниваем по достоинству
    return RANKS.indexOf(card1.rank) < RANKS.indexOf(card2.rank);
}

function findPlayerWithLowestCard(players) {
    let lowestPlayer = players[0].id;
    let lowestCard = players[0].cards[0];

    players.forEach(player => {
        player.cards.forEach(card => {
            if (ranks.indexOf(card.rank) < ranks.indexOf(lowestCard.rank)) {
                lowestCard = card;
                lowestPlayer = player.id;
            }
            // Если достоинства равны, сравниваем по масти (опционально)
            else if (card.rank === lowestCard.rank) {
                if (suits.indexOf(card.suit) < suits.indexOf(lowestCard.suit)) {
                    lowestCard = card;
                    lowestPlayer = player.id;
                }
            }
        });
    });

    return lowestPlayer;
}


function getNextPlayerId(players, currentPlayerId) {
    const currentIndex = players.findIndex(p => p.id === currentPlayerId);
    const nextIndex = (currentIndex + 1) % players.length;
    return players[nextIndex].id;
}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        startGame: (state, action) => {
            // action.payload - массив игроков, например [{id: 'player1', name: 'Bot 1', isAI: true, cards: []}, ...]
            let deck = createDeck();
            // 1. Перемешать колоду
            deck = [...deck].sort(() => Math.random() - 0.5);
            // 2. Определить козырь (последняя карта в колоде)
            state.trumpSuit = deck[deck.length - 1].suit;
            // 3. Раздать карты (по 6 каждому, если карт хватает)
            state.players = action.payload.map(player => ({
                ...player,
                cards: deck.splice(0, 6)
            }));
            // 4. Определить, кто ходит первый (у кого младший козырь)
            const firstPlayerId = determineFirstPlayer(state.players, state.trumpSuit);

            // Обновляем состояние
            state.deck = deck;
            state.currentPlayer = firstPlayerId;
            state.attackPlayer = firstPlayerId;
            state.status = 'attacking';
            // ... логика для определения первого ходящего
        },

        endRound: (state) => {
            // Определяем очередь добора: атакующий первый, затем защищающийся
            state.drawingQueue = [state.attackPlayer];

            // В подкидном дураке могут добивать и другие игроки, которые участвовали в подкидывании
            if (state.gameModes.mainMode === 'throw-in') {
                // Здесь можно добавить логику для определения подкидывающих игроков
                // Пока добавим защищающегося в очередь
                const defendingPlayerId = getNextPlayerId(state.players, state.attackPlayer);
                if (!state.drawingQueue.includes(defendingPlayerId)) {
                    state.drawingQueue.push(defendingPlayerId);
                }
            } else {
                // В других режимах - только атакующий и защищающийся
                const defendingPlayerId = getNextPlayerId(state.players, state.attackPlayer);
                state.drawingQueue.push(defendingPlayerId);
            }

            state.status = 'drawingCards';
            startCardDrawing(state);
        },

        takeCards: (state, action) => {
            const { playerId } = action.payload; // ID защищающегося игрока
            const player = state.players.find(p => p.id === playerId);

            if (!player) return;

            // Собираем ВСЕ карты со стола
            const allCardsOnTable = [];
            state.table.forEach(pair => {
                allCardsOnTable.push(pair.attackCard);
                if (pair.defendCard) {
                    allCardsOnTable.push(pair.defendCard);
                }
            });

            // Добавляем карты в руку игрока
            player.cards.push(...allCardsOnTable);

            console.log(`Игрок ${player.name} забирает ${allCardsOnTable.length} карт со стола`);

            // Очищаем стол
            state.table = [];

            // Начинаем процесс добора карт
            state.dispatch(gameSlice.actions.prepareCardDrawingAfterTake(playerId));
        },
        prepareCardDrawingAfterTake: (state, defendingPlayerId) => {
            // Очередь добора: начинаем с атакующего, затем защищавшийся
            state.drawingQueue = [state.attackPlayer, defendingPlayerId];

            // Также добавляем других игроков, которые подкидывали карты
            if (state.gameModes.mainMode === 'throw-in') {
                addThrowingPlayersToQueue(state, defendingPlayerId);
            }

            state.status = 'drawingCards';
            state.dispatch(gameSlice.actions.startCardDrawing());
        },
        playCard: (state, action) => {
            const { playerId, cardId, target } = action.payload
            // Это общий экшен для атаки и защиты. Логика зависит от state.status.
            console.log(playerId, cardId, target);
            const player = state.players.find(p => p.id === playerId);
            const cardIndex = player.cards.findIndex(c => c.id === cardId);
            if (cardIndex === -1) return; // Карта не найдена

            const playedCard = player.cards.splice(cardIndex, 1)[0]; // Удаляем карту из руки игрока

            if (state.status === 'attacking') {
                // Атака: кладем карту на стол
                state.table.push({ attackCard: playedCard, defendCard: null });
                console.log('Кладем карту на стол');
                console.log(state.table);
                console.log({ attackCard: playedCard, defendCard: null });

                state.status = 'defending';
                state.attackPlayer = playerId;
            } else if (state.status === 'defending') {
                // Защита: пытаемся побить последнюю карту на столе
                const lastAttack = state.table[state.table.length - 1];
                console.log(state.table);

                if (canDefend(lastAttack.attackCard, playedCard, state.trumpSuit)) {
                    lastAttack.defendCard = playedCard;
                    // Проверить, может ли атакующий подкинуть еще?
                    // Если нет, ход переходит следующему игроку.
                    state.status = 'attacking'; // Упрощенно
                } else {
                    // Нельзя побить, карта возвращается в руку
                    player.cards.push(playedCard);
                }
            }
            state.table = [];
            gameSlice.actions.endRound();
        },
        // Другие экшены: takeCards (игрок забирает карты со стола), skipTurn, etc.
    },
})

// Вспомогательная функция для проверки возможности отбиться
function canDefend(attackCard, defendCard, trumpSuit) {
    // Карта бьется, если масть совпадает, а достоинство выше, ИЛИ если защищающаяся карта - козырь, а атакующая - нет.
    if (defendCard.suit === attackCard.suit) {
        return ranks.indexOf(defendCard.rank) > ranks.indexOf(attackCard.rank);
    } else if (defendCard.suit === trumpSuit && attackCard.suit !== trumpSuit) {
        return true;
    }
    return false;
}


export const { startGame, playCard } = gameSlice.actions;
export default gameSlice.reducer;