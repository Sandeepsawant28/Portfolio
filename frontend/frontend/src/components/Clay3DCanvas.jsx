import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Clay3DCanvas = ({ progress = 0.5, isCinematic = false, interactive = true }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 18);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    // Daylight lighting
    const ambientLight = new THREE.AmbientLight(0xfff6f0, 1.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffefe0, 2.2);
    sunLight.position.set(8, 12, 10);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 30;
    sunLight.shadow.bias = -0.001;
    scene.add(sunLight);

    const softFillLight = new THREE.DirectionalLight(0xd9ebff, 0.8);
    softFillLight.position.set(-8, -4, 6);
    scene.add(softFillLight);

    // Clay Material generators
    const createClayMaterial = (colorHex, roughness = 0.55, metalness = 0.04) => {
      return new THREE.MeshStandardMaterial({
        color: colorHex,
        roughness: roughness,
        metalness: metalness,
        flatShading: false,
      });
    };

    const peachMat = createClayMaterial(0xee9068, 0.5);
    const softPeachMat = createClayMaterial(0xf6b89d, 0.52);
    const warmGreyMat = createClayMaterial(0xd8d2c7, 0.58);
    const deepGreyMat = createClayMaterial(0x8a8479, 0.5);
    const electricBlueMat = new THREE.MeshStandardMaterial({
      color: 0x0047ff,
      roughness: 0.2,
      metalness: 0.1,
    });

    const items = [];

    // Helper: Add shape
    const addShape = (mesh, config) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      scene.add(mesh);
      items.push({
        mesh,
        baseX: config.x,
        baseY: config.y,
        baseZ: config.z,
        speed: config.speed || 1,
        rotSpeedX: config.rx || 0.005,
        rotSpeedY: config.ry || 0.008,
        rotSpeedZ: config.rz || 0.004,
        scale: config.scale || 1,
      });
    };

    // 1. Large Peach Clay Sphere
    const sphereGeo1 = new THREE.SphereGeometry(2.4, 48, 48);
    const sphere1 = new THREE.Mesh(sphereGeo1, peachMat);
    addShape(sphere1, { x: -4.5, y: -14, z: 0, speed: 1.15, rx: 0.004, ry: 0.006 });

    // 2. Soft Peach Clay Pill (Capsule)
    const capsuleGeo = new THREE.CapsuleGeometry(1.2, 2.6, 24, 32);
    const capsule = new THREE.Mesh(capsuleGeo, softPeachMat);
    capsule.rotation.z = Math.PI / 4;
    addShape(capsule, { x: 4.8, y: -18, z: 1.2, speed: 0.95, rx: 0.008, ry: 0.005 });

    // 3. Rounded Pentagon
    const pentagonShape = new THREE.Shape();
    const sides = 5;
    const radius = 1.8;
    for (let i = 0; i < sides; i++) {
      const angle = (i / sides) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) pentagonShape.moveTo(x, y);
      else pentagonShape.lineTo(x, y);
    }
    pentagonShape.closePath();
    const extrudeSettings = { depth: 0.9, bevelEnabled: true, bevelSegments: 6, steps: 1, bevelSize: 0.3, bevelThickness: 0.3 };
    const pentagonGeo = new THREE.ExtrudeGeometry(pentagonShape, extrudeSettings);
    pentagonGeo.center();
    const pentagon = new THREE.Mesh(pentagonGeo, warmGreyMat);
    addShape(pentagon, { x: -2.2, y: -22, z: -1, speed: 1.3, rx: 0.006, ry: 0.01 });

    // 4. Rounded Square with Arrow
    const squareShape = new THREE.Shape();
    const s = 1.5;
    const r = 0.4;
    squareShape.moveTo(-s + r, -s);
    squareShape.lineTo(s - r, -s);
    squareShape.quadraticCurveTo(s, -s, s, -s + r);
    squareShape.lineTo(s, s - r);
    squareShape.quadraticCurveTo(s, s, s - r, s);
    squareShape.lineTo(-s + r, s);
    squareShape.quadraticCurveTo(-s, s, -s, s - r);
    squareShape.lineTo(-s, -s + r);
    squareShape.quadraticCurveTo(-s, -s, -s + r, -s);
    const squareGeo = new THREE.ExtrudeGeometry(squareShape, { depth: 0.8, bevelEnabled: true, bevelSegments: 4, bevelSize: 0.2, bevelThickness: 0.2 });
    squareGeo.center();
    const squareGroup = new THREE.Group();
    const squareMesh = new THREE.Mesh(squareGeo, peachMat);
    squareMesh.castShadow = true;
    squareGroup.add(squareMesh);

    // Arrow embossed on square
    const arrowConeGeo = new THREE.ConeGeometry(0.5, 0.9, 16);
    const arrowCone = new THREE.Mesh(arrowConeGeo, deepGreyMat);
    arrowCone.position.set(0, 0.4, 0.6);
    arrowCone.castShadow = true;
    const arrowShaftGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.8, 16);
    const arrowShaft = new THREE.Mesh(arrowShaftGeo, deepGreyMat);
    arrowShaft.position.set(0, -0.3, 0.6);
    arrowShaft.castShadow = true;
    squareGroup.add(arrowCone);
    squareGroup.add(arrowShaft);
    addShape(squareGroup, { x: 3.2, y: -26, z: -0.5, speed: 1.05, rx: 0.005, ry: 0.007 });

    // 5. Sphere with plus sign
    const spherePlusGroup = new THREE.Group();
    const spherePlusMesh = new THREE.Mesh(new THREE.SphereGeometry(1.6, 36, 36), deepGreyMat);
    spherePlusMesh.castShadow = true;
    spherePlusGroup.add(spherePlusMesh);

    const plusBarGeo = new THREE.BoxGeometry(1.3, 0.35, 0.35);
    const plusBar1 = new THREE.Mesh(plusBarGeo, softPeachMat);
    plusBar1.position.z = 1.45;
    const plusBar2 = new THREE.Mesh(plusBarGeo, softPeachMat);
    plusBar2.rotation.z = Math.PI / 2;
    plusBar2.position.z = 1.45;
    spherePlusGroup.add(plusBar1);
    spherePlusGroup.add(plusBar2);
    addShape(spherePlusGroup, { x: 0.5, y: -16, z: 2.5, speed: 1.2, rx: 0.007, ry: 0.009 });

    // 6. Electric Blue Accents (small glossy spheres)
    const blueGeo = new THREE.SphereGeometry(0.55, 24, 24);
    const blue1 = new THREE.Mesh(blueGeo, electricBlueMat);
    addShape(blue1, { x: -6.2, y: -20, z: 2, speed: 1.4, rx: 0.01, ry: 0.015 });

    const blue2 = new THREE.Mesh(blueGeo, electricBlueMat);
    addShape(blue2, { x: 5.8, y: -14, z: -2, speed: 0.85, rx: 0.01, ry: 0.012 });

    const blue3 = new THREE.Mesh(new THREE.TorusGeometry(0.65, 0.22, 16, 32), electricBlueMat);
    addShape(blue3, { x: -1.5, y: -24, z: 1, speed: 1.25, rx: 0.015, ry: 0.01 });

    // Mouse tilt tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Animation loop
    let reqId;
    let clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      camera.position.x = mouseX * 0.8;
      camera.position.y = -mouseY * 0.8;
      camera.lookAt(0, 0, 0);

      // Animate shapes rising based on progress or continuous loop
      items.forEach((item, index) => {
        // Continuous rotation
        item.mesh.rotation.x += item.rotSpeedX;
        item.mesh.rotation.y += item.rotSpeedY;
        item.mesh.rotation.z += item.rotSpeedZ;

        // Position based on progress / animation time
        let normalizedProgress = progress;
        if (!isCinematic) {
          // Subtle organic floating when in normal interactive mode
          item.mesh.position.x = item.baseX + Math.sin(time * 0.8 + index) * 0.3;
          item.mesh.position.y = (item.baseY + 16) + Math.cos(time * 0.7 + index) * 0.4;
          item.mesh.position.z = item.baseZ;
        } else {
          // During Cinematic Shot 2: Shapes rise from bottom (-20 to +20)
          const travel = 42;
          const yPos = item.baseY + normalizedProgress * travel * item.speed;
          item.mesh.position.y = yPos;
          item.mesh.position.x = item.baseX + Math.sin(time + index) * 0.4;
          item.mesh.position.z = item.baseZ;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [progress, isCinematic, interactive]);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5,
      }}
    />
  );
};

export default Clay3DCanvas;
