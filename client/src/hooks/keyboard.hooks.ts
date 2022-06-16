import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IStoreStates } from '../interfaces/store.interface';
import { jumpIfPossible } from '../services/player.service';
import { InterfaceSliceActions } from '../store/slices/interface.slice';
import { PlayerSliceActions } from '../store/slices/player.slice';

declare global {
    interface Navigator {
        keyboard?: {
            lock: (keys: string[]) => unknown;
        };
    }
}

export const useKeyboardControls = () => {
    const dispatch = useDispatch();
    const interfaceStore = useSelector((state: IStoreStates) => state.interface);
    const [keyDown, setKeyDown] = useState('');
    const [keyUp, setKeyUp] = useState('');

    const lockKeys = async () => {
        if (navigator.keyboard) {
            await document.documentElement.requestFullscreen();
            if (window.location.pathname !== '/universe') document.exitFullscreen();
            const keys = ['Escape'];
            await navigator['keyboard'].lock(keys);
        }
    };

    useEffect(() => {
        lockKeys();
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Tab' || e.code === 'Escape' || e.ctrlKey) {
                e.preventDefault();
            }
            setKeyUp('');
            setKeyDown(e.code);
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.code === 'Tab' || e.code === 'Escape' || e.ctrlKey) {
                e.preventDefault();
            }
            setKeyDown('');
            setKeyUp(e.code);
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    useEffect(() => {
        switch (keyDown) {
            case 'Tab':
                if (!interfaceStore.showSettings && !interfaceStore.isChatting) {
                    dispatch(InterfaceSliceActions.setShowPlayerlist(true));
                }
                break;
            case 'KeyW':
                if (interfaceStore.isChatting) break;
                dispatch(PlayerSliceActions.setIsMoveForward(true));
                break;
            case 'KeyA':
                if (interfaceStore.isChatting) break;
                dispatch(PlayerSliceActions.setIsMoveLeft(true));
                break;
            case 'KeyD':
                if (interfaceStore.isChatting) break;
                dispatch(PlayerSliceActions.setIsMoveRight(true));
                break;
            case 'KeyS':
                if (interfaceStore.isChatting) break;
                dispatch(PlayerSliceActions.setIsMoveBackward(true));
                break;
            case 'ShiftLeft':
                if (interfaceStore.isChatting) break;
                dispatch(PlayerSliceActions.setSprinting(true));
                break;
            case 'Space':
                if (interfaceStore.isChatting) break;
                jumpIfPossible();
                break;
            default:
                break;
        }
    }, [keyDown]);

    useEffect(() => {
        switch (keyUp) {
            case 'Tab':
                dispatch(InterfaceSliceActions.setShowPlayerlist(false));
                break;
            case 'KeyT':
                if (!interfaceStore.showSettings && !interfaceStore.isChatting) {
                    dispatch(InterfaceSliceActions.setIsChatting(true));
                }
                break;
            case 'Escape':
                if (!interfaceStore.showSettings) {
                    dispatch(InterfaceSliceActions.setIsChatting(false));
                    dispatch(InterfaceSliceActions.setShowSettings(true));
                } else {
                    dispatch(InterfaceSliceActions.setShowSettings(false));
                }
                break;
            case 'KeyW':
                dispatch(PlayerSliceActions.setIsMoveForward(false));
                break;
            case 'KeyA':
                dispatch(PlayerSliceActions.setIsMoveLeft(false));
                break;
            case 'KeyD':
                dispatch(PlayerSliceActions.setIsMoveRight(false));
                break;
            case 'KeyS':
                dispatch(PlayerSliceActions.setIsMoveBackward(false));
                break;
            case 'ShiftLeft':
                dispatch(PlayerSliceActions.setSprinting(false));
                break;
            default:
                break;
        }
    }, [keyUp]);
};