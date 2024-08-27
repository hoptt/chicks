class FootPrintUtils {
  private z = 0;
  private type = 0;
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

  public FootPrintDirection(rotation: [number, number, number]) {
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
      this.z = Math.PI / 4;
      this.type = 1;
    }
    if (
      rotation[0] === -Math.PI &&
      rotation[1] < 0.1 &&
      rotation[1] >= 0 &&
      rotation[2] === -Math.PI
    ) {
      /* 위 */
      this.z = -Math.PI / 4;
      this.type = 2;
    }
    if (rotation[0] === 0 && rotation[1] === 0 && rotation[2] === 0) {
      /* 아래 */
      this.z = -Math.PI / 4;
      this.type = 3;
    }
    if (rotation[0] === 0 && rotation[1] === Math.PI / 2 && rotation[2] === 0) {
      /* 오른 */
      this.z = Math.PI / 4;
      this.type = 4;
    }

    if (
      rotation[0] === -Math.PI &&
      floatTolerance(rotation[1], -Math.PI / 4) &&
      rotation[2] === -Math.PI
    ) {
      /* 왼쪽 위 */
      this.z = 0;
      this.type = 5;
    }

    if (
      rotation[0] === -Math.PI &&
      floatTolerance(rotation[1], Math.PI / 4) &&
      rotation[2] === -Math.PI
    ) {
      /* 오른쪽 위 */
      this.z = Math.PI / 2;
      this.type = 6;
    }
    if (
      rotation[0] === 0 &&
      floatTolerance(rotation[1], -Math.PI / 4) &&
      rotation[2] === 0
    ) {
      /* 왼쪽 아래 */
      this.z = Math.PI / 2;
      this.type = 7;
    }
    if (
      rotation[0] === 0 &&
      floatTolerance(rotation[1], Math.PI / 4) &&
      rotation[2] === 0
    ) {
      /* 오른쪽 아래 */
      this.z = 0;
      this.type = 8;
    }

    return { z: this.z, type: this.type };
  }
}

export default FootPrintUtils;
