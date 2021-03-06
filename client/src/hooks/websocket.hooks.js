import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { addLog, addMessage, addVerbose } from '../store/slices/chat.slice';
import { setWebsocketConnected, setWebsocketError } from '../store/slices/websocket.slice';
import { setPlayerPosition } from '../store/slices/player.slice';
import { addPlayer, animPlayer, choiceModelPlayer, initPlayers, movePlayer, removePlayer, rotatePlayer } from '../store/slices/players.slice';

export let server = null;

export const useWebsocketServer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const players = useSelector((state) => state.players);
    const user = useSelector((state) => state.user);
    useEffect(() => {
        if (!user.updated || !user.accessToken) return navigate('/authenticate');

        server = io(process.env.REACT_APP_BASE_WEBSOCKET_SERVER_URI, {
            auth: { token: user.accessToken },
            extraHeaders: { Authorization: 'Bearer ' + user.accessToken },
        });

        server.on('disconnect', () => {
            dispatch(setWebsocketConnected(false));
        });
        server.on('connect', () => {
            dispatch(setWebsocketConnected(true));
        });
        server.on('Error', (data) => {
            dispatch(setWebsocketError(data));
        });
        server.on('Players', (data) => {
            switch (data.type) {
                case 'RemovePlayer':
                    dispatch(removePlayer(data.id));
                    break;
                case 'AddPlayer':
                    dispatch(addPlayer(data.player));
                    break;
                case 'InitPlayers':
                    dispatch(initPlayers(data.players));
                    break;
                default:
                    break;
            }
        });
        server.on('PlayerAction', (data) => {
            switch (data.type) {
                case 'Move':
                    dispatch(movePlayer(data));
                    break;
                case 'Rotate':
                    dispatch(rotatePlayer(data));
                    break;
                case 'Anim':
                    dispatch(animPlayer(data));
                    break;
                case 'Model':
                    dispatch(choiceModelPlayer(data));
                    break;
                case 'Tp':
                    dispatch(setPlayerPosition({ position: data.position }));
                default:
                    break;
            }
        });
        server.on('Chat', (data) => {
            dispatch(
                addMessage({
                    type: data.type,
                    content: data.message,
                    sender: data.id,
                    color: data.color,
                    date: data.date,
                    role: data.role,
                }),
            );
        });
        server.on('Logs', (data) => {
            dispatch(addLog(data));
        });
        server.on('Verbose', (data) => {
            dispatch(addVerbose(data));
        });
        server.on('Warning', (data) => {
            console.log(data);
        });

        return () => {
            server.disconnect();
        };
    }, []);
    useEffect(() => {
        // console.log(players);
    }, [players]);
};
