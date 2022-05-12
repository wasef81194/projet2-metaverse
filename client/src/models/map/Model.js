/* eslint-disable react/prop-types */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useMemo } from 'react';
import { useGraph } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils';

export default function Model({ ...props }) {
    const group = useRef();
    const { scene, materials, animations } = useGLTF('/models/collision-world.glb');
    const clones = useMemo(() => clone(scene), [scene]);
    const { nodes } = useGraph(clones);
    const { actions } = useAnimations(animations, group);

    return (
        <group ref={group} {...props} dispose={null}>
            <mesh geometry={nodes.Cube004.geometry} material={materials['Material.001']} position={[7.68, -5.59, 26.38]} scale={0.5} />
        </group>
    );
}

useGLTF.preload('/models/collision-world.glb');
