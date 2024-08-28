import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { PerspectiveCamera } from "three";

export default function ResizeHandler() {
  const { gl, camera, size } = useThree();

  useEffect(() => {
    const handleResize = () => {
      gl.setSize(size.width, size.height);
      if (camera instanceof PerspectiveCamera) {
        camera.aspect = size.width / size.height;
        camera.updateProjectionMatrix();
      }
    };
    handleResize(); // 초기 설정
  }, [gl, camera, size]);

  return null;
}
