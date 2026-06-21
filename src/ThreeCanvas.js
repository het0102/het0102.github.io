import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06060c, 0.015);

    // --- Camera Setup ---
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 30;

    // --- Renderer Setup ---
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00f2fe, 2, 100);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x8a2be2, 2, 100);
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);

    // --- Objects ---
    // 1. Stars Particle Field
    const starsCount = 1500;
    const starsGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starsCount * 3);
    const starColors = new Float32Array(starsCount * 3);

    const cyan = new THREE.Color(0x00f2fe);
    const purple = new THREE.Color(0x8a2be2);

    for (let i = 0; i < starsCount * 3; i += 3) {
      // Position
      starPositions[i] = (Math.random() - 0.5) * 120;
      starPositions[i + 1] = (Math.random() - 0.5) * 120;
      starPositions[i + 2] = (Math.random() - 0.5) * 120;

      // Color (mix of cyan and purple)
      const mixedColor = new THREE.Color().lerpColors(
        cyan,
        purple,
        Math.random(),
      );
      starColors[i] = mixedColor.r;
      starColors[i + 1] = mixedColor.g;
      starColors[i + 2] = mixedColor.b;
    }

    starsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starPositions, 3),
    );
    starsGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(starColors, 3),
    );

    const starMaterial = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const starField = new THREE.Points(starsGeometry, starMaterial);
    scene.add(starField);

    // 2. Central Cyber Sphere (rotating particle grid)
    const sphereGeometry = new THREE.SphereGeometry(8, 32, 32);
    const spherePositions = sphereGeometry.attributes.position.array;
    const sphereCount = spherePositions.length / 3;

    const cyberGeometry = new THREE.BufferGeometry();
    const cyberPositions = new Float32Array(spherePositions);
    const cyberColors = new Float32Array(sphereCount * 3);

    for (let i = 0; i < sphereCount * 3; i += 3) {
      const mixedColor = new THREE.Color().lerpColors(
        cyan,
        purple,
        Math.random(),
      );
      cyberColors[i] = mixedColor.r;
      cyberColors[i + 1] = mixedColor.g;
      cyberColors[i + 2] = mixedColor.b;
    }

    cyberGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(cyberPositions, 3),
    );
    cyberGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(cyberColors, 3),
    );

    const cyberMaterial = new THREE.PointsMaterial({
      size: 0.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });

    const cyberSphere = new THREE.Points(cyberGeometry, cyberMaterial);
    scene.add(cyberSphere);

    // 3. Cyber Wireframe Sphere
    const wireframeGeometry = new THREE.SphereGeometry(7.9, 16, 16);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x8a2be2,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    scene.add(wireframeMesh);

    // 4. Orbit Rings
    const ringGeometry = new THREE.TorusGeometry(12, 0.05, 8, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
    });
    const ringMesh1 = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh1.rotation.x = Math.PI / 3;
    scene.add(ringMesh1);

    const ringMesh2 = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh2.rotation.x = -Math.PI / 4;
    ringMesh2.rotation.y = Math.PI / 4;
    ringMesh2.material.color.setHex(0x8a2be2);
    scene.add(ringMesh2);

    // --- Interactive Inputs ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      targetX = (event.clientX - window.innerWidth / 2) * 0.03;
      targetY = (event.clientY - window.innerHeight / 2) * 0.03;
    };

    let scrollY = 0;
    let targetScrollY = 0;

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    // --- Window Resize ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // --- Animation Loop ---
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Slow rotation for star field
      starField.rotation.y = elapsedTime * 0.015;
      starField.rotation.x = elapsedTime * 0.005;

      // Spin cyber sphere and wireframe sphere
      cyberSphere.rotation.y = elapsedTime * 0.1;
      wireframeMesh.rotation.y = -elapsedTime * 0.08;

      // Orbit rings spin
      ringMesh1.rotation.z = elapsedTime * 0.2;
      ringMesh2.rotation.z = -elapsedTime * 0.15;

      // Dynamic vertex wave effect on cyber sphere
      const positions = cyberGeometry.attributes.position.array;
      const initialPositions = spherePositions;
      for (let i = 0; i < positions.length; i += 3) {
        const x = initialPositions[i];
        const y = initialPositions[i + 1];
        const z = initialPositions[i + 2];

        // Apply a wave animation based on time and position
        const wave = Math.sin(elapsedTime * 2 + (x + y + z) * 0.2) * 0.15;
        positions[i] = x * (1 + wave);
        positions[i + 1] = y * (1 + wave);
        positions[i + 2] = z * (1 + wave);
      }
      cyberGeometry.attributes.position.needsUpdate = true;

      // Mouse Parallax (interpolate for smooth transition)
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;

      // Scroll bound movement (adjust zoom/depth based on scroll)
      scrollY += (targetScrollY - scrollY) * 0.05;
      const scrollRatio =
        scrollY /
        (document.documentElement.scrollHeight - window.innerHeight || 1);

      // Let camera sink deeper in space or translate as you scroll down
      camera.position.z = 30 + scrollRatio * 20;

      // Look at the rotating sphere center with slight parallax offset
      camera.lookAt(new THREE.Vector3(mouseX * 0.2, -mouseY * 0.2, 0));

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);

      starsGeometry.dispose();
      starMaterial.dispose();
      sphereGeometry.dispose();
      cyberGeometry.dispose();
      cyberMaterial.dispose();
      wireframeGeometry.dispose();
      wireframeMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();

      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
        background: "#06060c",
      }}
    />
  );
};

export default ThreeCanvas;
