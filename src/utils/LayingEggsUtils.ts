class LayingEggsUtils {
  private x = 0;
  private y = 0;
  private z = 0;

  /* 
          왼쪽:  [0, -1.5707963267948966, 0, 'XYZ'] = x: +1 z: -1
          위쪽 : [-3.141592653589793, 1.2246467991473532e-16, -3.141592653589793, 'XYZ'] = x: +1 z: +1
          아래쪽: [-0, 0, -0, 'XYZ'] = x: -1 z: -1
          오른쪽: [0, 1.5707963267948966, 0, 'XYZ'] = x: -1 z: +1

          왼쪽 위 : [-3.141592653589793, -0.7853981633974482, -3.141592653589793, 'XYZ']
          오른쪽 위 : [-3.141592653589793, 0.7853981633974482, -3.141592653589793, 'XYZ']
          왼쪽 아래 : [0, -0.7853981633974484, 0, 'XYZ']
          오른쪽 아래 : [-0, 0.7853981633974484, -0, 'XYZ']
          */

  public LayingPosition(rotation: [number, number, number]) {
    const floatTolerance = (y1: number, y2: number) => {
      const epsilon = 1e-10;

      return Math.abs(y1 - y2) < epsilon;
    };

    if (
      rotation[0] === 0 &&
      rotation[1] === -Math.PI / 2 &&
      rotation[2] === 0
    ) {
      /* 왼 */
      this.x += 1;
      this.z -= 1;
    }
    if (
      rotation[0] === -Math.PI &&
      rotation[1] < 0.1 &&
      rotation[1] >= 0 &&
      rotation[2] === -Math.PI
    ) {
      /* 위 */
      this.x += 1;
      this.z += 1;
    }
    if (rotation[0] === 0 && rotation[1] === 0 && rotation[2] === 0) {
      /* 아래 */
      this.x -= 1;
      this.z -= 1;
    }
    if (rotation[0] === 0 && rotation[1] === Math.PI / 2 && rotation[2] === 0) {
      /* 오른 */
      this.x -= 1;
      this.z += 1;
    }

    if (
      rotation[0] === -Math.PI &&
      floatTolerance(rotation[1], -Math.PI / 4) &&
      rotation[2] === -Math.PI
    ) {
      /* 왼쪽 위 */
      this.x += 1;
    }

    if (
      rotation[0] === -Math.PI &&
      floatTolerance(rotation[1], Math.PI / 4) &&
      rotation[2] === -Math.PI
    ) {
      /* 오른쪽 위 */
      this.z += 1;
    }
    if (
      rotation[0] === 0 &&
      floatTolerance(rotation[1], -Math.PI / 4) &&
      rotation[2] === 0
    ) {
      /* 왼쪽 아래 */
      this.z -= 1;
    }
    if (
      rotation[0] === 0 &&
      floatTolerance(rotation[1], Math.PI / 4) &&
      rotation[2] === 0
    ) {
      /* 오른쪽 아래 */
      this.x -= 1;
    }

    return { x: this.x, y: this.y, z: this.z };
  }
}

export default LayingEggsUtils;
