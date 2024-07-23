export default function Light() {
  // const directionalLightRef = useRef<any>(null);

  // Use the helper with the ref
  // useHelper(directionalLightRef, DirectionalLightHelper, 2);
  return (
    <>
      <ambientLight name="ambientLight" intensity={0.5} />
      <directionalLight
        // ref={directionalLightRef}
        castShadow
        intensity={0.5}
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        position={[-50, 20, 0]}
        // position={[-7.5, 5, 0]}
        shadow-normalBias={0.1}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        shadow-camera-near={0.1}
        shadow-camera-far={200}
      />
      {/* <directionalLight
        ref={directionalLightRef}
        castShadow
        intensity={1}
        position={[0, 10, -10]}
        shadow-normalBias={0.1}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        shadow-camera-near={0.1}
        shadow-camera-far={200}
      /> */}
    </>
  );
}
