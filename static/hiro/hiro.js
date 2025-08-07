function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('back-button').addEventListener('click', () => {
    window.location.href = '/ComicsAR';
  });
  window.addEventListener('arjs-video-loaded', async function () {
    await wait(500);
    const vrButton = document.querySelector('button.a-enter-vr-button');
    if (vrButton) {
      vrButton.remove();
    }
    document.getElementById('loader').style.display = 'none';
  });
});



AFRAME.registerComponent('log-marker-events', {
  init: function () {
    this.el.addEventListener('markerFound', () => {
      console.log('Marker found!');
      const dot = document.getElementById('status-dot');
      dot.style.display = 'block';
      dot.style.backgroundColor = 'green';
      posDisplay = document.getElementById('pos-display');
      posDisplay.style.display = 'block';
    });
    this.el.addEventListener('markerLost', () => {
      console.log('Marker lost!');
      const dot = document.getElementById('status-dot');
      dot.style.backgroundColor = 'red';
      posDisplay = document.getElementById('pos-display');
      posDisplay.style.display = 'none';
    });
  }
});


AFRAME.registerComponent('add-axes-helper', {
  init: function () {
    const axesHelper = new THREE.AxesHelper(500);
    this.el.object3D.add(axesHelper);
  }
});

/*AFRAME.registerComponent('log-positions', {
  init: function () {
    this.cameraEl = null;
    this.objectEl = null;
    this.posDisplay = document.getElementById('pos-display');
    this.frameCount = 0;
    this.updateEvery = 15;
    this.markerVisible = false;

    this.el.sceneEl.addEventListener('loaded', () => {
      this.cameraEl = this.el.sceneEl.camera.el;

      const children = this.el.children;
      for (let i = 0; i < children.length; i++) {
        if (children[i].tagName.startsWith('A-')) {
          this.objectEl = children[i];
          break;
        }
      }

      if (!this.objectEl) {
        console.warn('[log-positions] No virtual objects found in the marker');
      }
    });

    
    this.el.addEventListener('markerFound', () => {
      this.markerVisible = true;
    });

    this.el.addEventListener('markerLost', () => {
      this.markerVisible = false;
    });
  },

  tick: function () {
    if (!this.cameraEl || !this.objectEl) return;
    if (!this.markerVisible) return;

    this.frameCount++;
    if (this.frameCount % this.updateEvery !== 0) return;

    const markerWorldPos = new THREE.Vector3();
    const cameraWorldPos = new THREE.Vector3();
    const objectWorldPos = new THREE.Vector3();
    const cameraRelative = new THREE.Vector3();
    const objectRelative = new THREE.Vector3();
    const markerWorldScale = new THREE.Vector3();

    this.el.object3D.getWorldPosition(markerWorldPos);
    this.cameraEl.object3D.getWorldPosition(cameraWorldPos);
    this.objectEl.object3D.getWorldPosition(objectWorldPos);
    this.el.object3D.getWorldScale(markerWorldScale);

    cameraRelative.subVectors(cameraWorldPos, markerWorldPos);
    objectRelative.subVectors(objectWorldPos, markerWorldPos);

    const cameraDistance = cameraWorldPos.distanceTo(markerWorldPos);
    const objectDistance = objectWorldPos.distanceTo(markerWorldPos);

    const displayText =
      `Marker world scale: ${markerWorldScale.x.toFixed(3)} m, ${markerWorldScale.y.toFixed(3)} m, ${markerWorldScale.z.toFixed(3)} m\n` +
      `Marker: ${markerWorldPos.x.toFixed(3)} m, ${markerWorldPos.y.toFixed(3)} m, ${markerWorldPos.z.toFixed(3)} m\n` +
      `Object: ${objectWorldPos.x.toFixed(3)} m, ${objectWorldPos.y.toFixed(3)} m, ${objectWorldPos.z.toFixed(3)} m\n` +
      `Camera: ${cameraWorldPos.x.toFixed(3)} m, ${cameraWorldPos.y.toFixed(3)} m, ${cameraWorldPos.z.toFixed(3)} m\n` +
      `Object relative to marker: ${objectRelative.x.toFixed(3)} m, ${objectRelative.y.toFixed(3)} m, ${objectRelative.z.toFixed(3)} m\n` +
      `Camera relative to marker: ${cameraRelative.x.toFixed(3)} m, ${cameraRelative.y.toFixed(3)} m, ${cameraRelative.z.toFixed(3)} m\n` +
      `Total Distance (camera-marker): ${cameraDistance.toFixed(3)} m\n` +
      `Total Distance (object-marker): ${objectDistance.toFixed(3)} m`;

    this.posDisplay.textContent = displayText;

    console.log('--- Positions ---');
    console.log(displayText);
    console.log('-----------------');
  }
});*/


/*AFRAME.registerComponent('log-positions', {
  init: function () {
    this.cameraEl = null;
    this.objectEl = null;
    this.posDisplay = document.getElementById('pos-display');
    this.frameCount = 0;
    this.updateEvery = 15;
    this.markerVisible = false;

    this.el.sceneEl.addEventListener('loaded', () => {
      this.cameraEl = this.el.sceneEl.camera.el;

      const children = this.el.children;
      for (let i = 0; i < children.length; i++) {
        if (children[i].tagName.startsWith('A-')) {
          this.objectEl = children[i];
          break;
        }
      }

      if (!this.objectEl) {
        console.warn('[log-positions] No virtual objects found in the marker');
      }
    });

    
    this.el.addEventListener('markerFound', () => {
      this.markerVisible = true;
    });

    this.el.addEventListener('markerLost', () => {
      this.markerVisible = false;
    });
  },

  tick: function () {
    if (!this.cameraEl || !this.objectEl) return;
    if (!this.markerVisible) return;

    this.frameCount++;
    if (this.frameCount % this.updateEvery !== 0) return;

    const markerWorldPos = new THREE.Vector3();
    const cameraWorldPos = new THREE.Vector3();
    const objectWorldPos = new THREE.Vector3();
    const cameraRelative = new THREE.Vector3();
    const objectRelative = new THREE.Vector3();
    const markerWorldScale = new THREE.Vector3();

    this.el.object3D.getWorldPosition(markerWorldPos);
    this.cameraEl.object3D.getWorldPosition(cameraWorldPos);
    this.objectEl.object3D.getWorldPosition(objectWorldPos);
    this.el.object3D.getWorldScale(markerWorldScale);

    cameraRelative.subVectors(cameraWorldPos, markerWorldPos);
    objectRelative.subVectors(objectWorldPos, markerWorldPos);

    const cameraDistance = cameraWorldPos.distanceTo(markerWorldPos);
    const objectDistance = objectWorldPos.distanceTo(markerWorldPos);

    const marker = document.querySelector('a-marker');
    const box = new THREE.Box3().setFromObject(marker.object3D);
    console.log('Bounding box size:', box.getSize(new THREE.Vector3()));

const scale = 0.127;
const displayText =
  `Marker: ${(markerWorldPos.x * scale).toFixed(3)} m, ${(markerWorldPos.y * scale).toFixed(3)} m, ${(markerWorldPos.z * scale).toFixed(3)} m\n` +
  `Object: ${(objectWorldPos.x * scale).toFixed(3)} m, ${(objectWorldPos.y * scale).toFixed(3)} m, ${(objectWorldPos.z * scale).toFixed(3)} m\n` +
  `Camera: ${(cameraWorldPos.x * scale).toFixed(3)} m, ${(cameraWorldPos.y * scale).toFixed(3)} m, ${(cameraWorldPos.z * scale).toFixed(3)} m\n` +
  `Object relative to marker: ${(objectRelative.x * scale).toFixed(3)} m, ${(objectRelative.y * scale).toFixed(3)} m, ${(objectRelative.z * scale).toFixed(3)} m\n` +
  `Camera relative to marker: ${(cameraRelative.x * scale).toFixed(3)} m, ${(cameraRelative.y * scale).toFixed(3)} m, ${(cameraRelative.z * scale).toFixed(3)} m\n` +
  `Total Distance (camera-marker): ${(cameraDistance * scale).toFixed(3)} m\n` +
  `Total Distance (object-marker): ${(objectDistance * scale).toFixed(3)} m`;


    this.posDisplay.textContent = displayText;

    console.log('--- Positions ---');
    console.log(displayText);
    console.log('-----------------');
  }
});*/

AFRAME.registerComponent('log-positions', {
  init: function () {
    this.cameraEl = null;
    this.objectEl = null;
    this.posDisplay = document.getElementById('pos-display');
    this.frameCount = 0;
    this.updateEvery = 15;
    this.markerVisible = false;

    this.el.sceneEl.addEventListener('loaded', () => {
      this.cameraEl = this.el.sceneEl.camera.el;

      const children = this.el.children;
      for (let i = 0; i < children.length; i++) {
        if (children[i].tagName.startsWith('A-')) {
          this.objectEl = children[i];
          break;
        }
      }

      if (!this.objectEl) {
        console.warn('[log-positions] No virtual objects found in the marker');
      }
    });

    this.el.addEventListener('markerFound', () => {
      this.markerVisible = true;
    });

    this.el.addEventListener('markerLost', () => {
      this.markerVisible = false;
    });
  },

  tick: function () {
    if (!this.cameraEl || !this.objectEl) return;
    if (!this.markerVisible) return;

    this.frameCount++;
    if (this.frameCount % this.updateEvery !== 0) return;

    const SCALE = 0.19;

    const markerWorldPos = new THREE.Vector3();
    const cameraWorldPos = new THREE.Vector3();
    const objectWorldPos = new THREE.Vector3();
    const cameraRelative = new THREE.Vector3();
    const objectRelative = new THREE.Vector3();
    const markerWorldScale = new THREE.Vector3();

    this.el.object3D.getWorldPosition(markerWorldPos);
    this.cameraEl.object3D.getWorldPosition(cameraWorldPos);
    this.objectEl.object3D.getWorldPosition(objectWorldPos);
    this.el.object3D.getWorldScale(markerWorldScale);

    markerWorldPos.multiplyScalar(SCALE);
    cameraWorldPos.multiplyScalar(SCALE);
    objectWorldPos.multiplyScalar(SCALE);

    cameraRelative.subVectors(cameraWorldPos, markerWorldPos);
    objectRelative.subVectors(objectWorldPos, markerWorldPos);

    const cameraDistance = cameraWorldPos.distanceTo(markerWorldPos);
    const objectDistance = objectWorldPos.distanceTo(markerWorldPos);

    const displayText =
      `Marker: ${markerWorldPos.x.toFixed(3)} m, ${markerWorldPos.y.toFixed(3)} m, ${markerWorldPos.z.toFixed(3)} m\n` +
      `Object: ${objectWorldPos.x.toFixed(3)} m, ${objectWorldPos.y.toFixed(3)} m, ${objectWorldPos.z.toFixed(3)} m\n` +
      `Camera: ${cameraWorldPos.x.toFixed(3)} m, ${cameraWorldPos.y.toFixed(3)} m, ${cameraWorldPos.z.toFixed(3)} m\n` +
      `Object relative to marker: ${objectRelative.x.toFixed(3)} m, ${objectRelative.y.toFixed(3)} m, ${objectRelative.z.toFixed(3)} m\n` +
      `Camera relative to marker: ${cameraRelative.x.toFixed(3)} m, ${cameraRelative.y.toFixed(3)} m, ${cameraRelative.z.toFixed(3)} m\n` +
      `Total Distance (camera-marker): ${cameraDistance.toFixed(3)} m\n` +
      `Total Distance (object-marker): ${objectDistance.toFixed(3)} m`;

    this.posDisplay.textContent = displayText;

    console.log('--- Positions ---');
    console.log(displayText);
    console.log('-----------------');
  }
});




/*navigator.mediaDevices.enumerateDevices()
  .then(devices => {
    devices.forEach(device => {
      if (device.kind === 'videoinput') {
        console.log('Label: '+device.label, 'Id: '+device.deviceId);
      }
    });
  });*/


/*AFRAME.registerComponent('log-positions', {
  init: function () {
    this.cameraEl = null;
    this.objectEl = null;
    this.posDisplay = document.getElementById('pos-display');
    this.frameCount = 0;
    this.updateEvery = 15;

    const preset = this.el.getAttribute('preset');
    const type = this.el.getAttribute('type');
    this.markerType = preset || type || 'unknown';

    this.el.sceneEl.addEventListener('loaded', () => {
      this.cameraEl = this.el.sceneEl.camera.el;

      const children = this.el.children;
      for (let i = 0; i < children.length; i++) {
        if (children[i].tagName.startsWith('A-')) {
          this.objectEl = children[i];
          break;
        }
      }

      if (!this.objectEl) {
        console.warn('[log-positions] No virtual objects found in the marker.');
      }
    });
  },

  tick: function () {
    if (!this.cameraEl || !this.objectEl) return;

    const markerPos = this.el.object3D.position;
    const cameraPos = this.cameraEl.object3D.position;
    const objectPos = this.objectEl.object3D.position;

    const cameraDelta = {
      x: cameraPos.x - markerPos.x,
      y: cameraPos.y - markerPos.y,
      z: cameraPos.z - markerPos.z
    };

    const objectDelta = {
      x: objectPos.x - markerPos.x,
      y: objectPos.y - markerPos.y,
      z: objectPos.z - markerPos.z
    };

    const cameraDistance = cameraPos.distanceTo(markerPos);
    const objectDistance = objectPos.distanceTo(markerPos);

    this.frameCount++;
    if (this.frameCount % this.updateEvery !== 0) return;

    const displayText =
      `Marker type: ${this.markerType}\n` +
      `Marker position: ${markerPos.x.toFixed(3)} m, ${markerPos.y.toFixed(3)} m, ${markerPos.z.toFixed(3)} m\n` +
      `Object position: ${objectPos.x.toFixed(3)} m, ${objectPos.y.toFixed(3)} m, ${objectPos.z.toFixed(3)} m\n` +
      `Camera position: ${cameraPos.x.toFixed(3)} m, ${cameraPos.y.toFixed(3)} m, ${cameraPos.z.toFixed(3)} m\n` +
      `Object distance to marker (along three axis): ${objectDelta.x.toFixed(3)} m, ${objectDelta.y.toFixed(3)} m, ${objectDelta.z.toFixed(3)} m\n` +
      `Camera distance to marker (along three axis): ${cameraDelta.x.toFixed(3)} m, ${cameraDelta.y.toFixed(3)} m, ${cameraDelta.z.toFixed(3)} m\n` +
      `Camera distance to marker: ${cameraDistance.toFixed(3)} m\n` +
      `Object distance to marker: ${objectDistance.toFixed(3)} m`;

    this.posDisplay.textContent = displayText;

    console.log('--- Positions ---');
    console.log(displayText);
    console.log('-----------------');
  }
});*/

// Component that detects and emits events for touch gestures

AFRAME.registerComponent("gesture-detector", {
  schema: {
    element: { default: "" }
  },

  init: function() {
    this.targetElement =
      this.data.element && document.querySelector(this.data.element);

    if (!this.targetElement) {
      this.targetElement = this.el;
    }

    this.internalState = {
      previousState: null
    };

    this.emitGestureEvent = this.emitGestureEvent.bind(this);

    this.targetElement.addEventListener("touchstart", this.emitGestureEvent);

    this.targetElement.addEventListener("touchend", this.emitGestureEvent);

    this.targetElement.addEventListener("touchmove", this.emitGestureEvent);
  },

  remove: function() {
    this.targetElement.removeEventListener("touchstart", this.emitGestureEvent);

    this.targetElement.removeEventListener("touchend", this.emitGestureEvent);

    this.targetElement.removeEventListener("touchmove", this.emitGestureEvent);
  },

  emitGestureEvent(event) {
    const currentState = this.getTouchState(event);

    const previousState = this.internalState.previousState;

    const gestureContinues =
      previousState &&
      currentState &&
      currentState.touchCount == previousState.touchCount;

    const gestureEnded = previousState && !gestureContinues;

    const gestureStarted = currentState && !gestureContinues;

    if (gestureEnded) {
      const eventName =
        this.getEventPrefix(previousState.touchCount) + "fingerend";

      this.el.emit(eventName, previousState);

      this.internalState.previousState = null;
    }

    if (gestureStarted) {
      currentState.startTime = performance.now();

      currentState.startPosition = currentState.position;

      currentState.startSpread = currentState.spread;

      const eventName =
        this.getEventPrefix(currentState.touchCount) + "fingerstart";

      this.el.emit(eventName, currentState);

      this.internalState.previousState = currentState;
    }

    if (gestureContinues) {
      const eventDetail = {
        positionChange: {
          x: currentState.position.x - previousState.position.x,

          y: currentState.position.y - previousState.position.y
        }
      };

      if (currentState.spread) {
        eventDetail.spreadChange = currentState.spread - previousState.spread;
      }

      // Update state with new data

      Object.assign(previousState, currentState);

      // Add state data to event detail

      Object.assign(eventDetail, previousState);

      const eventName =
        this.getEventPrefix(currentState.touchCount) + "fingermove";

      this.el.emit(eventName, eventDetail);
    }
  },

  getTouchState: function(event) {
    if (event.touches.length === 0) {
      return null;
    }

    // Convert event.touches to an array so we can use reduce

    const touchList = [];

    for (let i = 0; i < event.touches.length; i++) {
      touchList.push(event.touches[i]);
    }

    const touchState = {
      touchCount: touchList.length
    };

    // Calculate center of all current touches

    const centerPositionRawX =
      touchList.reduce((sum, touch) => sum + touch.clientX, 0) /
      touchList.length;

    const centerPositionRawY =
      touchList.reduce((sum, touch) => sum + touch.clientY, 0) /
      touchList.length;

    touchState.positionRaw = { x: centerPositionRawX, y: centerPositionRawY };

    // Scale touch position and spread by average of window dimensions

    const screenScale = 2 / (window.innerWidth + window.innerHeight);

    touchState.position = {
      x: centerPositionRawX * screenScale,
      y: centerPositionRawY * screenScale
    };

    // Calculate average spread of touches from the center point

    if (touchList.length >= 2) {
      const spread =
        touchList.reduce((sum, touch) => {
          return (
            sum +
            Math.sqrt(
              Math.pow(centerPositionRawX - touch.clientX, 2) +
                Math.pow(centerPositionRawY - touch.clientY, 2)
            )
          );
        }, 0) / touchList.length;

      touchState.spread = spread * screenScale;
    }

    return touchState;
  },

  getEventPrefix(touchCount) {
    const numberNames = ["one", "two", "three", "many"];

    return numberNames[Math.min(touchCount, 4) - 1];
  }
});


AFRAME.registerComponent("gesture-handler", {
  schema: {
    enabled: { default: true },
    rotationFactor: { default: 5 },
    minScale: { default: 0.3 },
    maxScale: { default: 8 },
  },

  init: function () {
    this.handleScale = this.handleScale.bind(this);
    this.handleRotation = this.handleRotation.bind(this);

    this.isVisible = false;
    this.initialScale = this.el.object3D.scale.clone();
    this.scaleFactor = 1;

    this.el.sceneEl.addEventListener("markerFound", (e) => {
      this.isVisible = true;
    });

    this.el.sceneEl.addEventListener("markerLost", (e) => {
      this.isVisible = false;
    });
  },

  update: function () {
    if (this.data.enabled) {
      this.el.sceneEl.addEventListener("onefingermove", this.handleRotation);
      this.el.sceneEl.addEventListener("twofingermove", this.handleScale);
    } else {
      this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
      this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
    }
  },

  remove: function () {
    this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
    this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
  },

  handleRotation: function (event) {
    if (this.isVisible) {
      this.el.object3D.rotation.y +=
        event.detail.positionChange.x * this.data.rotationFactor;
      this.el.object3D.rotation.x +=
        event.detail.positionChange.y * this.data.rotationFactor;
    }
  },

  handleScale: function (event) {
    if (this.isVisible) {
      this.scaleFactor *=
        1 + event.detail.spreadChange / event.detail.startSpread;

      this.scaleFactor = Math.min(
        Math.max(this.scaleFactor, this.data.minScale),
        this.data.maxScale
      );

      this.el.object3D.scale.x = this.scaleFactor * this.initialScale.x;
      this.el.object3D.scale.y = this.scaleFactor * this.initialScale.y;
      this.el.object3D.scale.z = this.scaleFactor * this.initialScale.z;
    }
  },
});

/*
window.addEventListener('load', () => {
    const camera = document.querySelector('[camera]');
    const marker = document.querySelector('a-marker');
    let check;

    marker.addEventListener('markerFound', () => {
        let cameraPosition = camera.object3D.position;
        let markerPosition = marker.object3D.position;
        let distance = cameraPosition.distanceTo(markerPosition)

        check = setInterval(() => {
            cameraPosition = camera.object3D.position;
            markerPosition = marker.object3D.position;
            distance = cameraPosition.distanceTo(markerPosition)

            // do what you want with the distance:
            console.log("*****Total Distance (camera-marker): ",distance);
        }, 100);
    });

    marker.addEventListener('markerLost', () => {
      clearInterval(check);
    })
})*/