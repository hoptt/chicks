/*
public domain
*/

import { useSphere } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";
import { motion } from "framer-motion-3d";

export function RubberDuck() {
  const { nodes, materials }: { nodes: any; materials: any } = useGLTF(
    "/models/RubberDuck.glb"
  );
  const [ref, _] = useSphere(() => ({
    type: "Dynamic",
    mass: 1,
    position: [-4, 0.5, -16],
    args: [0.25],
  }));

  // useFrame(() => {
  //   if (!ref.current) return;
  //   api.position.set(ref.current.position.x, 0.5, ref.current.position.z);
  // });

  // useFrame(() => {
  //   if (!ref.current) return;
  //   if (ref.current.position.y < ) {
  //     ref.current.position.y += 0.05;
  //   }
  //   //   api.applyImpulse([0, 0.08, 0], [0, 0, 0]);
  //   // } else {
  //   //   api.applyImpulse([0, -0.002, 0], [0, 0, 0]);
  //   // }
  // });
  // const isCheck = useRef(false);
  // useEffect(() => {
  //   const unSubscribe = api.position.subscribe((a) => {
  //     if (!ref.current) return;
  //     if (a[1] < 0.5) {
  //       // if (!isCheck.current) {
  //       // isCheck.current = true;
  //       // api.applyImpulse([0, 0.2, 0], [0, 0, 0]);
  //       // }
  //     } else {
  //       // isCheck.current = false;
  //       // api.applyImpulse([0, 0.05, 0], [0, 0, 0]);
  //       // if (a[1] > 0.9) {
  //       //   api.applyForce([0, 9.3, 0], [0, 0, 0]);
  //       // }
  //     }
  //     // if (a[1] < 0.5) {
  //     //   // api.position.set(a[0], a[1] + 0.2, a[2]);
  //     //   // ref.current.position.y += 0.05;
  //     // } else {
  //     //   api.position.set(a[0], -0.5, a[2]);
  //     // }
  //   });

  //   return unSubscribe;
  // }, []);

  return (
    <group ref={ref as any}>
      <motion.mesh
        geometry={nodes.Rubber_duck.geometry}
        material={materials.Material}
        scale={500}
        // animate={{
        //   y: [0, 0.1, 0],
        //   transition: {
        //     duration: 2,
        //     repeat: Infinity,
        //     ease: "easeInOut",
        //   },
        // }}
        // position={[0, -0.1, 0]}
      />
    </group>
  );
}

useGLTF.preload("/models/RubberDuck.glb");
