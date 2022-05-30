/* eslint-disable react/prop-types */
import React, { Suspense, useEffect, useRef } from 'react';
import { Text } from '@react-three/drei';
import Aj from '../models/aj/Aj';
import { useSelector } from 'react-redux';
import { useFrame } from '@react-three/fiber';

export const OtherPlayerComponent = (props) => {
    const player = useSelector((state) => state.players[props.playerId]);

    const boxRef = useRef();
    const textRef = useRef();

    useEffect(() => {
        if (!player.position) return;
        boxRef.current.position.x = player.position.x;
        boxRef.current.position.z = player.position.z;
        boxRef.current.position.y = player.position.y - 0.5;
    }, [player.position]);
    useEffect(() => {
        if (!player.rotation) return;
        boxRef.current.rotation.order = 'ZYX';
        boxRef.current.rotation.y = player.rotation.y - Math.PI;
    }, [player.rotation]);

    useFrame(({ camera }) => {
        if (Math.abs(boxRef.current.position.distanceTo(camera.position) > 10)) textRef.current.visible = false;
        else textRef.current.visible = true;
        textRef.current.lookAt(camera.position);
    });

    return (
        <mesh ref={boxRef}>
            <Suspense fallback={null}>
                <Aj position={[0, 0, 0]} playerId={props.playerId} />
            </Suspense>
            <Text ref={textRef} color="black" anchorX="center" anchorY="middle" position={[0, 2, 0]}>
                {player.username}
            </Text>
        </mesh>
    );
};
