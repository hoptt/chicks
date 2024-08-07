/*
https://poly.pizza/m/10nw136Xjl
Bridge by Pixel [CC-BY] via Poly Pizza
*/

import { useGLTF, useAnimations } from "@react-three/drei";

export function Model(props) {
  const group = React.useRef();
  const { nodes, materials, animations } = useGLTF("/Bridge.glb");
  const { actions } = useAnimations(animations, group);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Root_Scene">
        <group name="RootNode">
          <mesh
            name="Bridge-wooden-lighter"
            geometry={nodes["Bridge-wooden-lighter"].geometry}
            material={materials["Texture-base.014"]}
            position={[-0.008, 0.8, 0.847]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/Bridge.glb");
