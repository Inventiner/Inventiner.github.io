console.log("objLoader.js is loaded");

async function parseOBJ(objText) {
    const vertices = [];
    const normals = [];
    const textureCoords = [];
    const faces = [];
    let currentObject = null;  // Store the current object name

    console.log("Parsing OBJ data...")

    const lines = objText.split('\n');
    for (const line of lines) {
        const parts = line.trim().split(/\s+/);
        const type = parts[0];

        switch (type) {
            case 'o':
                // Get the name of the object
                currentObject = parts.slice(1).join(' ')
                console.log(`Found Object: ${currentObject}`)
                break;
            case 'g':
               // Get the name of the group
               currentObject = parts.slice(1).join(' ')
               console.log(`Found Group: ${currentObject}`);
               break;
            case 'v':
                const x = parseFloat(parts[1]);
                const y = -parseFloat(parts[3]);
                const z = parseFloat(parts[2]);
                vertices.push(x, y, z);
                break;
            case 'vn':
                const nx = parseFloat(parts[1]);
                const ny = parseFloat(parts[2]);
                const nz = parseFloat(parts[3]);
                normals.push(nx, ny, nz);
                break;
            case 'vt':
                const u = parseFloat(parts[1]);
                const v = parseFloat(parts[2]);
                textureCoords.push(u, v);
                break;
            case 'f':
                const faceVertices = parts.slice(1);
                const faceIndices = [];
                for (const faceVertex of faceVertices) {
                    const [vIndex, vtIndex, vnIndex] = faceVertex.split('/').map(index => parseInt(index, 10) - 1);
                    faceIndices.push({
                        v:vIndex,
                        vt: vtIndex,
                        vn: vnIndex,
                        object: currentObject
                    });
                }

                if (faceIndices.length === 4) {
                    faces.push(
                        faceIndices[0],
                        faceIndices[1],
                        faceIndices[2],
                    );
                    faces.push(
                        faceIndices[2],
                        faceIndices[3],
                        faceIndices[0],
                    );
                } else if (faceIndices.length === 3) {
                    faces.push(
                        faceIndices[0],
                        faceIndices[1],
                        faceIndices[2],
                    )
                }
                break;
            default:
                console.log(`Ignored line: ${line}`);
                break;

        }
    }
    console.log("Parsing Complete!")
    return {
        vertices,
        normals,
        textureCoords,
        faces,
    };
}

async function loadAndProcessOBJ(objFileUrl, onComplete) {
    try {
        console.log(`Loading OBJ file from: ${objFileUrl}`);
        const response = await fetch(objFileUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("Successfully loaded OBJ file!");
        const objText = await response.text();
        console.log(`OBJ content: ${objText}`);

        const parsedData = await parseOBJ(objText);
        onComplete(
            parsedData.vertices,
            parsedData.normals,
            parsedData.textureCoords,
            parsedData.faces
        );
    } catch (e) {
        console.error("Failed to load or parse OBJ file:", e);
    }
}

export { loadAndProcessOBJ };