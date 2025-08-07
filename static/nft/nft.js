document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('back-button').addEventListener('click', () => {
    window.location.href = '/ComicsAR';
  });
  const sceneEl = document.querySelector("a-scene");

    sceneEl.addEventListener("arReady", (event) => {
      console.log("MindAR is ready");
      document.getElementById("loader").style.display = "none";
    });

    sceneEl.addEventListener("arError", (event) => {
      console.error("MindAR failed to start");
      document.getElementById("loader").innerText = "An error occurred";
    });
});



AFRAME.registerComponent('log-marker-events', {
  init: function () {
    this.el.addEventListener('targetFound', () => {
      console.log('Marker found!');
      const dot = document.getElementById('status-dot');
      dot.style.display = 'block';
      dot.style.backgroundColor = 'green';
      posDisplay = document.getElementById('pos-display');
      posDisplay.style.display = 'block';
    });
    this.el.addEventListener('targetLost', () => {
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

    this.el.addEventListener('targetFound', () => {
      this.markerVisible = true;
    });

    this.el.addEventListener('targetLost', () => {
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

    this.el.object3D.getWorldPosition(markerWorldPos);
    this.cameraEl.object3D.getWorldPosition(cameraWorldPos);
    this.objectEl.object3D.getWorldPosition(objectWorldPos);

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

    this.el.addEventListener('targetFound', () => {
      this.markerVisible = true;
    });

    this.el.addEventListener('targetLost', () => {
      this.markerVisible = false;
    });
  },

  tick: function () {
    if (!this.cameraEl || !this.objectEl) return;
    if (!this.markerVisible) return;

    this.frameCount++;
    if (this.frameCount % this.updateEvery !== 0) return;

    const SCALE = 0.19*(1/1000);

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

    this.el.addEventListener('targetFound', () => {
      this.markerVisible = true;
    });

    this.el.addEventListener('targetLost', () => {
      this.markerVisible = false;
    });
  },

  tick: function () {
    if (!this.cameraEl || !this.objectEl || !this.markerVisible) return;

    this.frameCount++;
    if (this.frameCount % this.updateEvery !== 0) return;

    const SCALE_XZ = 0.19;
    const SCALE_Y = 0.29;

    const scaleVec = (vec) => new THREE.Vector3(
      vec.x * SCALE_XZ,
      vec.y * SCALE_Y,
      vec.z * SCALE_XZ
    );

    const markerWorldPos = new THREE.Vector3();
    const cameraWorldPos = new THREE.Vector3();
    const objectWorldPos = new THREE.Vector3();
    const cameraRelative = new THREE.Vector3();
    const objectRelative = new THREE.Vector3();

    this.el.object3D.getWorldPosition(markerWorldPos);
    this.cameraEl.object3D.getWorldPosition(cameraWorldPos);
    this.objectEl.object3D.getWorldPosition(objectWorldPos);

    cameraRelative.subVectors(cameraWorldPos, markerWorldPos);
    objectRelative.subVectors(objectWorldPos, markerWorldPos);

    const markerWorldPosM = scaleVec(markerWorldPos);
    const cameraWorldPosM = scaleVec(cameraWorldPos);
    const objectWorldPosM = scaleVec(objectWorldPos);
    const cameraRelativeM = scaleVec(cameraRelative);
    const objectRelativeM = scaleVec(objectRelative);

    const cameraDistance = cameraRelativeM.length();
    const objectDistance = objectRelativeM.length();

    const displayText =
      `Marker: ${markerWorldPosM.x.toFixed(3)} m, ${markerWorldPosM.y.toFixed(3)} m, ${markerWorldPosM.z.toFixed(3)} m\n` +
      `Object: ${objectWorldPosM.x.toFixed(3)} m, ${objectWorldPosM.y.toFixed(3)} m, ${objectWorldPosM.z.toFixed(3)} m\n` +
      `Camera: ${cameraWorldPosM.x.toFixed(3)} m, ${cameraWorldPosM.y.toFixed(3)} m, ${cameraWorldPosM.z.toFixed(3)} m\n` +
      `Object relative to marker: ${objectRelativeM.x.toFixed(3)} m, ${objectRelativeM.y.toFixed(3)} m, ${objectRelativeM.z.toFixed(3)} m\n` +
      `Camera relative to marker: ${cameraRelativeM.x.toFixed(3)} m, ${cameraRelativeM.y.toFixed(3)} m, ${cameraRelativeM.z.toFixed(3)} m\n` +
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

    this.el.sceneEl.addEventListener("targetFound", (e) => {
      this.isVisible = true;
    });

    this.el.sceneEl.addEventListener("targetLost", (e) => {
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

/*window.addEventListener('load', () => {
  const sceneEl = document.querySelector('a-scene');
  const target = document.querySelector('[mindar-image-target]');
  let intervalId;

  sceneEl.addEventListener('loaded', () => {
    const camera = sceneEl.camera.el; // ora la camera è disponibile

    target.addEventListener('targetFound', () => {
      console.log('Target found');

      intervalId = setInterval(() => {
        const cameraPosition = new THREE.Vector3();
        const targetPosition = new THREE.Vector3();

        camera.object3D.getWorldPosition(cameraPosition);
        target.object3D.getWorldPosition(targetPosition);

        const distance = cameraPosition.distanceTo(targetPosition);

        console.log("***** Total Distance (camera-target):", distance.toFixed(3), "meters");
      }, 100);
    });

    target.addEventListener('targetLost', () => {
      console.log('Target lost');
      clearInterval(intervalId);
    });
  });
});*/

