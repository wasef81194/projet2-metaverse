import { createSlice } from '@reduxjs/toolkit';
import { MessageTypes } from '../../common/constant';

export const ChatSlice = createSlice({
    name: 'chat',
    initialState: {
        chatList: [],
    },
    reducers: {
        addMessage: (state, action) => {
            if (action.payload.type === MessageTypes.Help) {
                action.payload.content = `
                    Command List :
                    - /mp [pseudo] [message]
                    - /tp [pseudo]
                    - /help
                `;
                state.chatList.push(action.payload);
            } else {
                state.chatList.push(action.payload);
            }
        },
        addLog: (state, action) => {
            switch (action.payload.type) {
                case 'Connection':
                    state.chatList.push({ type: MessageTypes.Logs, content: `connection`, options: { pseudo: action.payload.pseudo } });
                    break;
                case 'Disconnection':
                    state.chatList.push({ type: MessageTypes.Logs, content: `disconnection`, options: { pseudo: action.payload.pseudo } });
                    break;
            }
        },
    },
});

export const { addMessage, addLog } = ChatSlice.actions;

export default ChatSlice.reducer;
