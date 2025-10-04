// SocketContext.js
import { createContext, useContext } from 'react';
import { io } from 'socket.io-client';

// 1. Создаем объект контекста
const SocketContext = createContext(null);

// 2. Устанавливаем соединение с сокетом
const socket = io('wss://10.2.2.2:4850/room/9f16c6b3-3a07-4589-b81c-58dcf152ab37'); // ВАШ АДРЕС СЕРВЕРА

// 3. Создаем провайдер
export const SocketProvider = ({ children }) => {
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

// 4. Создаем удобный хук для использования сокета
export const useSocket = () => {
    return useContext(SocketContext);
};