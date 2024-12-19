let cameraPosition = glMatrix.vec3.fromValues(10, 0, 0);
let cameraTarget = glMatrix.vec3.fromValues(0, 0, 0);
let cameraUp = glMatrix.vec3.fromValues(0, 0, 1);
let viewMatrix = glMatrix.mat4.create();
let rollOffset = 0;

const moveSpeed = 0.15;
const rotateSpeed = 0.025;
const mouseSensitivity = 0.0018;
const pitchLimit = glMatrix.glMatrix.toRadian(89);

let isDragging = false;
let previousMouseX = 0;
let previousMouseY = 0;

function updateViewMatrix() {
  const forward = glMatrix.vec3.create();
  glMatrix.vec3.subtract(forward, cameraTarget, cameraPosition);
  glMatrix.vec3.normalize(forward, forward);

  const rollMatrix = glMatrix.mat4.create();
  glMatrix.mat4.rotate(rollMatrix, rollMatrix, rollOffset, forward);

  const rotatedUp = glMatrix.vec3.create();
  glMatrix.vec3.transformMat4(rotatedUp, cameraUp, rollMatrix);

  glMatrix.mat4.lookAt(viewMatrix, cameraPosition, cameraTarget, rotatedUp);
  glMatrix.mat4.invert(viewMatrix, viewMatrix);
}

function resetCamera() {
  cameraPosition = glMatrix.vec3.fromValues(10, 0, 0);
  cameraTarget = glMatrix.vec3.fromValues(0, 0, 0);
  cameraUp = glMatrix.vec3.fromValues(0, 0, 1);
  rollOffset = 0;
  updateViewMatrix();
}

function getRotation() {
  return glMatrix.mat4.clone(viewMatrix);
}

const keyState = {
  w: false,
  a: false,
  s: false,
  d: false,
  space: false,
  shift: false,
  q: false,
  e: false,
};

const keyMap = {
  w: "w",
  a: "a",
  s: "s",
  d: "d",
  " ": "space",
  Shift: "shift",
  q: "q",
  e: "e",
};

const resetButton = document.getElementById('resetCameraButton');

resetButton.addEventListener('click', () => {
    resetCamera();
    console.log("camera reset")
});

const canvas = document.querySelector("myCanvas");

document.addEventListener("keydown", (event) => {
  if (document.activeElement === canvas) {
    event.preventDefault();
  }
  const key = keyMap[event.key];
  if (keyState.hasOwnProperty(key)) {
    keyState[key] = true;
  }
});

document.addEventListener("keyup", (event) => {
  if (document.activeElement === canvas) {
    event.preventDefault();
  }
  const key = keyMap[event.key];
  if (keyState.hasOwnProperty(key)) {
    keyState[key] = false;
  }
});

function onMouseDown(event) {
  isDragging = true;
  previousMouseX = event.clientX;
  previousMouseY = event.clientY;
  if (canvas) {
    canvas.focus();
  }
}

function onMouseUp(event) {
  isDragging = false;
}

function onMouseMove(event) {
  if (isDragging) {
    const x = event.clientX;
    const y = event.clientY;

    let deltaX = (x - previousMouseX) * mouseSensitivity;
    let deltaY = (y - previousMouseY) * mouseSensitivity;

    const forward = glMatrix.vec3.create();
    glMatrix.vec3.subtract(forward, cameraTarget, cameraPosition);
    glMatrix.vec3.normalize(forward, forward);
    const right = glMatrix.vec3.create();
    glMatrix.vec3.cross(right, cameraUp, forward);
    glMatrix.vec3.normalize(right, right);

    const yawMatrix = glMatrix.mat4.create();
    glMatrix.mat4.rotateZ(yawMatrix, yawMatrix, -deltaX);
    glMatrix.vec3.transformMat4(forward, forward, yawMatrix);

    let pitchAngle = Math.asin(forward[1]);
    let newPitch = pitchAngle + deltaY;

    if (newPitch > pitchLimit) {
      deltaY = pitchAngle - pitchLimit;
      newPitch = pitchLimit;
    } else if (newPitch < -pitchLimit) {
      deltaY = pitchAngle + pitchLimit;
      newPitch = -pitchLimit;
    }

    const pitchMatrix = glMatrix.mat4.create();
    glMatrix.mat4.rotate(pitchMatrix, pitchMatrix, deltaY, right);
    glMatrix.vec3.transformMat4(forward, forward, pitchMatrix);
    glMatrix.vec3.add(cameraTarget, cameraPosition, forward);

    previousMouseX = x;
    previousMouseY = y;
  }
}

function updateCamera() {
  const forward = glMatrix.vec3.create();
  glMatrix.vec3.subtract(forward, cameraTarget, cameraPosition);
  glMatrix.vec3.normalize(forward, forward);
  const right = glMatrix.vec3.create();
  glMatrix.vec3.cross(right, cameraUp, forward);
  glMatrix.vec3.normalize(right, right);

  const vertical = glMatrix.vec3.fromValues(0, 0, 1);

  if (keyState.w) {
    glMatrix.vec3.add(
      cameraPosition,
      cameraPosition,
      glMatrix.vec3.scale(glMatrix.vec3.create(), forward, moveSpeed)
    );
    glMatrix.vec3.add(
      cameraTarget,
      cameraTarget,
      glMatrix.vec3.scale(glMatrix.vec3.create(), forward, moveSpeed)
    );
  }
  if (keyState.s) {
    glMatrix.vec3.subtract(
      cameraPosition,
      cameraPosition,
      glMatrix.vec3.scale(glMatrix.vec3.create(), forward, moveSpeed)
    );
    glMatrix.vec3.subtract(
      cameraTarget,
      cameraTarget,
      glMatrix.vec3.scale(glMatrix.vec3.create(), forward, moveSpeed)
    );
  }
  if (keyState.a) {
    glMatrix.vec3.add(
      cameraPosition,
      cameraPosition,
      glMatrix.vec3.scale(glMatrix.vec3.create(), right, moveSpeed)
    );
    glMatrix.vec3.add(
      cameraTarget,
      cameraTarget,
      glMatrix.vec3.scale(glMatrix.vec3.create(), right, moveSpeed)
    );
  }
  if (keyState.d) {
    glMatrix.vec3.subtract(
      cameraPosition,
      cameraPosition,
      glMatrix.vec3.scale(glMatrix.vec3.create(), right, moveSpeed)
    );
    glMatrix.vec3.subtract(
      cameraTarget,
      cameraTarget,
      glMatrix.vec3.scale(glMatrix.vec3.create(), right, moveSpeed)
    );
  }

  if (keyState.space) {
    glMatrix.vec3.add(
      cameraPosition,
      cameraPosition,
      glMatrix.vec3.scale(glMatrix.vec3.create(), vertical, moveSpeed)
    );
    glMatrix.vec3.add(
      cameraTarget,
      cameraTarget,
      glMatrix.vec3.scale(glMatrix.vec3.create(), vertical, moveSpeed)
    );
  }
  if (keyState.shift) {
    glMatrix.vec3.subtract(
      cameraPosition,
      cameraPosition,
      glMatrix.vec3.scale(glMatrix.vec3.create(), vertical, moveSpeed)
    );
    glMatrix.vec3.subtract(
      cameraTarget,
      cameraTarget,
      glMatrix.vec3.scale(glMatrix.vec3.create(), vertical, moveSpeed)
    );
  }

  if (keyState.q) {
    rollOffset += rotateSpeed;
  }
  if (keyState.e) {
    rollOffset -= rotateSpeed;
  }
  updateViewMatrix();
}
updateViewMatrix();

document.addEventListener("mousedown", onMouseDown);
document.addEventListener("mouseup", onMouseUp);
document.addEventListener("mousemove", onMouseMove);

export { getRotation, updateCamera };
