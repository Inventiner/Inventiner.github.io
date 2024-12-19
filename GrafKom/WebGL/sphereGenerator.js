export function generateSphereVertices(radius, segmentsX, segmentsY) {
    let vertices = [];
    let normals = [];
  
    for (let y = 0; y <= segmentsY; y++) {
      const v = y / segmentsY;
      const polarAngle = v * Math.PI;
  
      for (let x = 0; x <= segmentsX; x++) {
        const u = x / segmentsX;
        const azimuthAngle = u * 2 * Math.PI;
  
        const sinPolar = Math.sin(polarAngle);
        const cosPolar = Math.cos(polarAngle);
        const sinAzimuth = Math.sin(azimuthAngle);
        const cosAzimuth = Math.cos(azimuthAngle);
  
        const vertX = radius * sinPolar * cosAzimuth;
        const vertY = radius * cosPolar;
        const vertZ = radius * sinPolar * sinAzimuth;
  
        vertices.push(vertX, vertY, vertZ);
          const normal = [
              vertX/radius,
              vertY/radius,
              vertZ/radius,
          ]
        normals.push(normal[0], normal[1], normal[2]);
      }
    }
  
    return { vertices, normals };
  }