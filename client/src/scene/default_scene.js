import React, { Suspense, useEffect, useRef } from 'react';

// Physics
import { Debug, Physics } from '@react-three/cannon';

// Three
import { useThree } from '@react-three/fiber';
import { PointerLockControls, Stats, OrbitControls } from '@react-three/drei';

// Components
import { PlayerComponent } from '../components/player.component';
import SkyboxComponent from '../components/skybox.component';
import PlaneComponent from '../components/plane.component';
import { useSelector } from 'react-redux';
import { OtherPlayerComponent } from '../components/other-player.component';

// Models
import WorldMap from '../models/map/Map';
import { Stool } from '../prefabs/stool.prefab';
import SkyComponent from '../components/sky.component';

const DefaultScene = () => {
    const { camera, gl } = useThree();
    const controls = useRef();
    const players = useSelector((state) => state.players.playerList);
    useEffect(() => {
        camera.layers.enable(0);
        camera.layers.enable(1);
    }, [camera]);

    useEffect(() => {
        const handleFocus = () => {
            controls.current.lock();
        };
        document.addEventListener('click', handleFocus);

        return () => {
            document.removeEventListener('click', handleFocus);
        };
    }, [gl]);

    return (
        <>
            {/* Sky */}
            <SkyComponent />
            {/* Pointer lock */}
            <PointerLockControls ref={controls} args={[camera, gl.domElement]} />
            {/** Physic objects */}
            <Physics isPaused={false} gravity={[0, -9.81, 0]} tolerance={0} iterations={50} broadphase={'Naive'}>
                <PlaneComponent scale={[50, 50, 50]} />
                <Debug color="black">
                    <Stool position={[0, -0.25, 5]} rotation={[0, Math.PI / 8, 0]} />
                    <PlayerComponent position={[0, 1, 0]} key="player" />
                </Debug>
                <Suspense fallback={null}></Suspense>
                {/* <WorldMap position={[0, 2.35, 0]} /> */}
            </Physics>
            {players.map((player) => {
                return <OtherPlayerComponent playerId={player.id} key={player.id} />;
            })}
            {/* Stats */}
            <Stats />
        </>
    );
};

export default DefaultScene;
