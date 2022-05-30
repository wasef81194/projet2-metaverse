import React from 'react';
import { usePlane } from '@react-three/cannon';

const PlaneComponent = ({ ...props }) => {
    /** Plane collider */
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, -0.25, 0],
        material: {
            friction: 0.1,
        },
    }));

    return (
        <mesh ref={ref} receiveShadow={true} {...props}>
            <planeBufferGeometry />
            <meshPhongMaterial color={'skyblue'} receiveShadow />
        </mesh>
    );
};

export default PlaneComponent;
