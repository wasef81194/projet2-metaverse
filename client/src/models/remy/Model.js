/* eslint-disable react/prop-types */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useEffect, useMemo } from 'react';
import { useGraph } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils';
import { useSelector } from 'react-redux';

export default function Model({ ...props }) {
    const player = useSelector((state) => state.players[props.playerId]);
    const group = useRef();
    const { scene, materials, animations } = useGLTF('/models/playerModels/remy.glb');
    const clones = useMemo(() => clone(scene), [scene]);
    const { nodes } = useGraph(clones);
    const { actions } = useAnimations(animations, group);
    useEffect(() => {
        if (!player.animation) return;
        switch (player.animation) {
            case 'Jumping':
                actions.Idle.stop();
                actions.Walking.stop();
                actions.Running.stop();
                actions.Jumping.play();
                break;
            case 'Running':
                actions.Running.play();
                actions.Idle.stop();
                actions.Walking.stop();
                break;
            case 'Walking':
                actions.Walking.play();
                actions.Idle.stop();
                actions.Running.stop();
                break;
            case 'Idle':
                actions.Idle.play();
                actions.Walking.stop();
                actions.Jumping.stop();
                actions.Running.stop();
                break;
            default:
                break;
        }
    }, [player.animation]);
    return (
        <group ref={group} {...props} dispose={null}>
            <group name="Scene">
                <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
                    <primitive object={nodes.mixamorigHips} />
                    <skinnedMesh name="Body" geometry={nodes.Body.geometry} material={materials['Bodymat.001']} skeleton={nodes.Body.skeleton} />
                    <skinnedMesh
                        name="Bottoms"
                        geometry={nodes.Bottoms.geometry}
                        material={materials['Bottommat.001']}
                        skeleton={nodes.Bottoms.skeleton}
                    />
                    <skinnedMesh
                        name="Eyelashes"
                        geometry={nodes.Eyelashes.geometry}
                        material={materials['Eyelashmat.001']}
                        skeleton={nodes.Eyelashes.skeleton}
                    />
                    <skinnedMesh name="Eyes" geometry={nodes.Eyes.geometry} material={materials['Bodymat.001']} skeleton={nodes.Eyes.skeleton} />
                    <skinnedMesh name="Hair" geometry={nodes.Hair.geometry} material={materials['Hairmat.001']} skeleton={nodes.Hair.skeleton} />
                    <skinnedMesh name="Shoes" geometry={nodes.Shoes.geometry} material={materials['Shoesmat.001']} skeleton={nodes.Shoes.skeleton} />
                    <skinnedMesh name="Tops" geometry={nodes.Tops.geometry} material={materials['Topmat.001']} skeleton={nodes.Tops.skeleton} />
                </group>
            </group>
        </group>
    );
}

useGLTF.preload('/models/playerModels/remy.glb');
