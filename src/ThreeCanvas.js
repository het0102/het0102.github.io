import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeCanvas = ({ theme }) => {
  const canvasRef = useRef(null);
  const themeGroupRef = useRef(null);
  const themeRef = useRef(theme);

  // Sync theme prop to ref so the animation loop is not stale
  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  // Main Scene construction helper
  const buildThemeScene = (currentTheme, group) => {
    const cyan = new THREE.Color(0x00f2fe);
    const purple = new THREE.Color(0x8a2be2);
    const gold = new THREE.Color(0xffd700);

    if (currentTheme === "developer") {
      // 1. Stars Particle Field
      const starsCount = 1500;
      const starsGeometry = new THREE.BufferGeometry();
      const starPositions = new Float32Array(starsCount * 3);
      const starColors = new Float32Array(starsCount * 3);

      for (let i = 0; i < starsCount * 3; i += 3) {
        starPositions[i] = (Math.random() - 0.5) * 120;
        starPositions[i + 1] = (Math.random() - 0.5) * 120;
        starPositions[i + 2] = (Math.random() - 0.5) * 120;

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
      starField.name = "starField";
      group.add(starField);

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
      cyberSphere.name = "cyberSphere";
      cyberSphere.userData = { spherePositions: spherePositions };
      group.add(cyberSphere);

      // 3. Cyber Wireframe Sphere
      const wireframeGeometry = new THREE.SphereGeometry(7.9, 16, 16);
      const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0x8a2be2,
        wireframe: true,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
      });
      const wireframeMesh = new THREE.Mesh(
        wireframeGeometry,
        wireframeMaterial,
      );
      wireframeMesh.name = "wireframe";
      group.add(wireframeMesh);

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
      ringMesh1.name = "ring1";
      group.add(ringMesh1);

      const ringMesh2 = new THREE.Mesh(ringGeometry, ringMaterial.clone());
      ringMesh2.rotation.x = -Math.PI / 4;
      ringMesh2.rotation.y = Math.PI / 4;
      ringMesh2.material.color.setHex(0x8a2be2);
      ringMesh2.name = "ring2";
      group.add(ringMesh2);
    } else if (currentTheme === "oil") {
      // 1. Golden Waves
      const waveGeom = new THREE.PlaneGeometry(60, 60, 24, 24);
      const waveMat = new THREE.MeshBasicMaterial({
        color: 0xffd700,
        wireframe: true,
        transparent: true,
        opacity: 0.25,
        blending: THREE.AdditiveBlending,
      });
      const oilWaves = new THREE.Mesh(waveGeom, waveMat);
      oilWaves.name = "oilWaves";
      oilWaves.rotation.x = -Math.PI / 2.3;
      oilWaves.position.y = -8;
      group.add(oilWaves);

      // 2. Golden Rising Bubbles
      const bubbleCount = 200;
      const bubbleGeom = new THREE.BufferGeometry();
      const bubblePos = new Float32Array(bubbleCount * 3);
      const bubbleColors = new Float32Array(bubbleCount * 3);

      for (let i = 0; i < bubbleCount * 3; i += 3) {
        bubblePos[i] = (Math.random() - 0.5) * 60;
        bubblePos[i + 1] = (Math.random() - 0.5) * 50;
        bubblePos[i + 2] = (Math.random() - 0.5) * 30 - 10;

        const mixed = new THREE.Color().lerpColors(
          new THREE.Color(0xff8c00),
          gold,
          Math.random(),
        );
        bubbleColors[i] = mixed.r;
        bubbleColors[i + 1] = mixed.g;
        bubbleColors[i + 2] = mixed.b;
      }
      bubbleGeom.setAttribute(
        "position",
        new THREE.BufferAttribute(bubblePos, 3),
      );
      bubbleGeom.setAttribute(
        "color",
        new THREE.BufferAttribute(bubbleColors, 3),
      );

      const bubbleMat = new THREE.PointsMaterial({
        size: 0.45,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      });
      const bubbles = new THREE.Points(bubbleGeom, bubbleMat);
      bubbles.name = "bubbles";
      group.add(bubbles);

      // 3. Oil Droplet Mesh
      const dropGeom = new THREE.SphereGeometry(5.5, 16, 16);
      const posAttr = dropGeom.attributes.position;
      for (let i = 0; i < posAttr.count; i++) {
        const y = posAttr.getY(i);
        if (y > 0) {
          const factor = 1 - (y / 5.5) * 0.75;
          posAttr.setX(i, posAttr.getX(i) * factor);
          posAttr.setZ(i, posAttr.getZ(i) * factor);
        }
      }
      posAttr.needsUpdate = true;

      const dropMat = new THREE.MeshBasicMaterial({
        color: 0xffa500,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending,
      });
      const oilDrop = new THREE.Mesh(dropGeom, dropMat);
      oilDrop.name = "oilDrop";
      group.add(oilDrop);
    } else if (currentTheme === "fashion") {
      // 1. Mannequin / Hanger outline
      const fashionGroup = new THREE.Group();
      fashionGroup.name = "hanger";

      const fMat = new THREE.MeshBasicMaterial({
        color: 0xff007f,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending,
      });

      const torsoGeom = new THREE.CylinderGeometry(1.8, 3.8, 7, 8, 3, true);
      const neckGeom = new THREE.CylinderGeometry(0.7, 0.7, 1.8, 8, 1, false);
      const headGeom = new THREE.SphereGeometry(1.3, 8, 8);
      const shoulderGeom = new THREE.TorusGeometry(3.2, 0.18, 8, 24);

      const torso = new THREE.Mesh(torsoGeom, fMat);
      torso.position.y = -1.5;
      fashionGroup.add(torso);

      const neck = new THREE.Mesh(neckGeom, fMat);
      neck.position.y = 2.4;
      fashionGroup.add(neck);

      const head = new THREE.Mesh(headGeom, fMat);
      head.position.y = 3.9;
      fashionGroup.add(head);

      const shoulder = new THREE.Mesh(shoulderGeom, fMat);
      shoulder.rotation.x = Math.PI / 2;
      shoulder.position.y = 1.5;
      fashionGroup.add(shoulder);

      group.add(fashionGroup);

      // 2. Pulse Rings
      const ringGeom = new THREE.TorusGeometry(12.5, 0.06, 8, 64);
      const ringMat1 = new THREE.MeshBasicMaterial({
        color: 0x00f2fe,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending,
      });
      const fashionRing1 = new THREE.Mesh(ringGeom, ringMat1);
      fashionRing1.name = "fashionRing1";
      fashionRing1.rotation.x = Math.PI / 2.4;
      group.add(fashionRing1);

      const ringMat2 = new THREE.MeshBasicMaterial({
        color: 0xff007f,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending,
      });
      const fashionRing2 = new THREE.Mesh(ringGeom, ringMat2);
      fashionRing2.name = "fashionRing2";
      fashionRing2.rotation.x = -Math.PI / 2.8;
      fashionRing2.rotation.y = Math.PI / 5;
      group.add(fashionRing2);

      // 3. Floating Threads / Particles
      const threadCount = 100;
      const threadGeom = new THREE.BufferGeometry();
      const threadPos = new Float32Array(threadCount * 3);
      const threadColors = new Float32Array(threadCount * 3);
      const pink = new THREE.Color(0xff007f);

      for (let i = 0; i < threadCount * 3; i += 3) {
        threadPos[i] = (Math.random() - 0.5) * 50;
        threadPos[i + 1] = (Math.random() - 0.5) * 50;
        threadPos[i + 2] = (Math.random() - 0.5) * 30;

        const mixed = new THREE.Color().lerpColors(cyan, pink, Math.random());
        threadColors[i] = mixed.r;
        threadColors[i + 1] = mixed.g;
        threadColors[i + 2] = mixed.b;
      }
      threadGeom.setAttribute(
        "position",
        new THREE.BufferAttribute(threadPos, 3),
      );
      threadGeom.setAttribute(
        "color",
        new THREE.BufferAttribute(threadColors, 3),
      );

      const threadMat = new THREE.PointsMaterial({
        size: 0.25,
        vertexColors: true,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
      });
      const threadParticles = new THREE.Points(threadGeom, threadMat);
      threadParticles.name = "threadParticles";
      group.add(threadParticles);
    } else if (currentTheme === "interior") {
      // 1. Isometric Floorplan Group
      const blueprintGroup = new THREE.Group();
      blueprintGroup.name = "roomBlueprint";

      const lineMat = new THREE.LineBasicMaterial({
        color: 0x00e5ff,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending,
      });

      const addRoomOutline = (w, h, d, x, y, z) => {
        const geom = new THREE.BoxGeometry(w, h, d);
        const edges = new THREE.EdgesGeometry(geom);
        const line = new THREE.LineSegments(edges, lineMat);
        line.position.set(x, y, z);
        blueprintGroup.add(line);
      };

      const furnitureMat = new THREE.LineBasicMaterial({
        color: 0xffa07a,
        transparent: true,
        opacity: 0.25,
      });

      const addFurniture = (w, h, d, x, y, z) => {
        const geom = new THREE.BoxGeometry(w, h, d);
        const edges = new THREE.EdgesGeometry(geom);
        const line = new THREE.LineSegments(edges, furnitureMat);
        line.position.set(x, y, z);
        blueprintGroup.add(line);
      };

      // Layout
      addRoomOutline(11, 4.5, 11, -5.5, -1, 0); // Living room
      addRoomOutline(8, 4.5, 8, 3.5, -1, -2); // Bedroom
      addRoomOutline(6, 4, 6, 4.5, -1.25, 4.5); // Kitchen

      // Furniture Accents
      addFurniture(4.5, 1.3, 2.5, -6.5, -2.5, -2); // Couch
      addFurniture(2.5, 0.8, 2.5, -5.5, -2.75, 2.5); // Table
      addFurniture(3.8, 1.8, 3.8, 3.5, -2.3, -2); // Bed outline
      addFurniture(1.8, 2.5, 1.8, 5.2, -2, 4.5); // Cabinet

      group.add(blueprintGroup);

      // 2. Blueprint Floor Grid
      const grid = new THREE.GridHelper(52, 26, 0x00e5ff, 0x00e5ff);
      grid.name = "floorGrid";
      grid.position.y = -8;
      grid.material.transparent = true;
      grid.material.opacity = 0.18;
      group.add(grid);

      // 3. Conical spotlights
      const spotlightGeom = new THREE.ConeGeometry(4.5, 18, 16, 1, true);
      const spotlightMat = new THREE.MeshBasicMaterial({
        color: 0x00e5ff,
        transparent: true,
        opacity: 0.06,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      });

      const light1 = new THREE.Mesh(spotlightGeom, spotlightMat);
      light1.name = "spotlight1";
      light1.position.set(-14, 10, -5);
      light1.rotation.z = -0.5;
      group.add(light1);

      const light2 = new THREE.Mesh(spotlightGeom, spotlightMat.clone());
      light2.name = "spotlight2";
      light2.material.color.setHex(0xffa07a);
      light2.position.set(14, 10, 5);
      light2.rotation.z = 0.5;
      group.add(light2);
    } else if (currentTheme === "builder") {
      // 1. Skyscraper scaffolding matrices
      const matrixGroup = new THREE.Group();
      matrixGroup.name = "buildingMatrix";

      const steelMat = new THREE.LineBasicMaterial({
        color: 0x4682b4,
        transparent: true,
        opacity: 0.28,
      });

      const orangeMat = new THREE.LineBasicMaterial({
        color: 0xff4500,
        transparent: true,
        opacity: 0.38,
        blending: THREE.AdditiveBlending,
      });

      const addTowerScaffold = (width, height, depth, x, z) => {
        const geom = new THREE.BoxGeometry(width, height, depth);
        const edges = new THREE.EdgesGeometry(geom);
        const line = new THREE.LineSegments(edges, steelMat);
        line.position.set(x, height / 2 - 12, z);
        matrixGroup.add(line);

        // Internal cross braces
        const crossGeom = new THREE.BufferGeometry();
        const vertices = [];
        const levels = Math.floor(height / 3.5);
        for (let i = 0; i < levels; i++) {
          const yB = i * 3.5 - 12;
          const yT = (i + 1) * 3.5 - 12;
          vertices.push(
            x - width / 2,
            yB,
            z + depth / 2,
            x + width / 2,
            yT,
            z + depth / 2,
            x + width / 2,
            yB,
            z + depth / 2,
            x - width / 2,
            yT,
            z + depth / 2,
            x - width / 2,
            yB,
            z - depth / 2,
            x + width / 2,
            yT,
            z - depth / 2,
            x + width / 2,
            yB,
            z - depth / 2,
            x - width / 2,
            yT,
            z - depth / 2,
          );
        }
        crossGeom.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(vertices, 3),
        );
        const crosses = new THREE.LineSegments(crossGeom, orangeMat);
        matrixGroup.add(crosses);
      };

      // Add skyscrapers
      addTowerScaffold(5.5, 23, 5.5, -9, -4);
      addTowerScaffold(7.5, 15, 7.5, 3.5, -7);
      addTowerScaffold(5, 19, 5, 8, 3.5);
      addTowerScaffold(3.8, 11, 3.8, -4.5, 5);

      // Floor grid
      const grid = new THREE.GridHelper(56, 18, 0x4682b4, 0xff4500);
      grid.position.y = -12.05;
      grid.material.transparent = true;
      grid.material.opacity = 0.22;
      matrixGroup.add(grid);

      group.add(matrixGroup);

      // 2. Ascending Blueprint/Construction data particles
      const particleCount = 130;
      const partGeom = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 50;
        positions[i + 1] = (Math.random() - 0.5) * 30;
        positions[i + 2] = (Math.random() - 0.5) * 20;

        const mixed = new THREE.Color().lerpColors(
          new THREE.Color(0xff4500),
          steelMat.color,
          Math.random(),
        );
        colors[i] = mixed.r;
        colors[i + 1] = mixed.g;
        colors[i + 2] = mixed.b;
      }
      partGeom.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );
      partGeom.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const partMat = new THREE.PointsMaterial({
        size: 0.38,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      });

      const constructionParticles = new THREE.Points(partGeom, partMat);
      constructionParticles.name = "constructionParticles";
      group.add(constructionParticles);
    }
  };

  // Setup ThreeJS Canvas
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

    // --- Interactive Theme Mesh Group ---
    const themeGroup = new THREE.Group();
    scene.add(themeGroup);
    themeGroupRef.current = themeGroup;

    // Build the initial scene meshes
    buildThemeScene(themeRef.current, themeGroup);

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
      const currentTheme = themeRef.current;

      // Animate active meshes based on selected theme
      if (currentTheme === "developer") {
        const starField = themeGroup.getObjectByName("starField");
        const cyberSphere = themeGroup.getObjectByName("cyberSphere");
        const wireframe = themeGroup.getObjectByName("wireframe");
        const ring1 = themeGroup.getObjectByName("ring1");
        const ring2 = themeGroup.getObjectByName("ring2");

        if (starField) {
          starField.rotation.y = elapsedTime * 0.015;
          starField.rotation.x = elapsedTime * 0.005;
        }
        if (cyberSphere) {
          cyberSphere.rotation.y = elapsedTime * 0.1;
          const positions = cyberSphere.geometry.attributes.position.array;
          const initialPositions = cyberSphere.userData.spherePositions;
          if (initialPositions) {
            for (let i = 0; i < positions.length; i += 3) {
              const x = initialPositions[i];
              const y = initialPositions[i + 1];
              const z = initialPositions[i + 2];
              const wave = Math.sin(elapsedTime * 2 + (x + y + z) * 0.2) * 0.15;
              positions[i] = x * (1 + wave);
              positions[i + 1] = y * (1 + wave);
              positions[i + 2] = z * (1 + wave);
            }
            cyberSphere.geometry.attributes.position.needsUpdate = true;
          }
        }
        if (wireframe) wireframe.rotation.y = -elapsedTime * 0.08;
        if (ring1) ring1.rotation.z = elapsedTime * 0.2;
        if (ring2) ring2.rotation.z = -elapsedTime * 0.15;
      } else if (currentTheme === "oil") {
        const oilWaves = themeGroup.getObjectByName("oilWaves");
        const bubbles = themeGroup.getObjectByName("bubbles");
        const oilDrop = themeGroup.getObjectByName("oilDrop");

        if (oilWaves) {
          const positions = oilWaves.geometry.attributes.position.array;
          const count = positions.length / 3;
          for (let i = 0; i < count; i++) {
            const x = positions[i * 3];
            const z = positions[i * 3 + 2];
            positions[i * 3 + 1] =
              Math.sin(elapsedTime * 1.5 + x * 0.15) * 1.2 +
              Math.cos(elapsedTime * 1.2 + z * 0.15) * 0.8;
          }
          oilWaves.geometry.attributes.position.needsUpdate = true;
          oilWaves.rotation.y = elapsedTime * 0.02;
        }
        if (bubbles) {
          const positions = bubbles.geometry.attributes.position.array;
          for (let i = 1; i < positions.length; i += 3) {
            positions[i] += 0.07;
            if (positions[i] > 30) positions[i] = -20;
          }
          bubbles.geometry.attributes.position.needsUpdate = true;
          bubbles.rotation.y = elapsedTime * 0.01;
        }
        if (oilDrop) {
          oilDrop.rotation.y = elapsedTime * 0.4;
          const pulse = 1 + Math.sin(elapsedTime * 2.5) * 0.08;
          oilDrop.scale.set(pulse, pulse * 1.2, pulse);
        }
      } else if (currentTheme === "fashion") {
        const hanger = themeGroup.getObjectByName("hanger");
        const ring1 = themeGroup.getObjectByName("fashionRing1");
        const ring2 = themeGroup.getObjectByName("fashionRing2");
        const threads = themeGroup.getObjectByName("threadParticles");

        if (hanger) {
          hanger.rotation.y = elapsedTime * 0.35;
          hanger.rotation.x = Math.sin(elapsedTime * 0.6) * 0.1;
        }
        if (ring1) {
          ring1.rotation.y = elapsedTime * 0.12;
          const scale = 1 + Math.sin(elapsedTime * 1.8) * 0.04;
          ring1.scale.set(scale, scale, scale);
        }
        if (ring2) {
          ring2.rotation.y = -elapsedTime * 0.18;
          const scale = 1 + Math.cos(elapsedTime * 1.8) * 0.04;
          ring2.scale.set(scale, scale, scale);
        }
        if (threads) {
          threads.rotation.y = elapsedTime * 0.04;
          const positions = threads.geometry.attributes.position.array;
          for (let i = 0; i < positions.length; i += 3) {
            positions[i + 1] +=
              Math.sin(elapsedTime * 0.8 + positions[i]) * 0.004;
          }
          threads.geometry.attributes.position.needsUpdate = true;
        }
      } else if (currentTheme === "interior") {
        const room = themeGroup.getObjectByName("roomBlueprint");
        const light1 = themeGroup.getObjectByName("spotlight1");
        const light2 = themeGroup.getObjectByName("spotlight2");

        if (room) {
          room.rotation.y = elapsedTime * 0.05;
        }
        if (light1) {
          light1.rotation.z = Math.sin(elapsedTime * 0.7) * 0.25;
          light1.rotation.x = Math.cos(elapsedTime * 0.5) * 0.18;
        }
        if (light2) {
          light2.rotation.z = -Math.sin(elapsedTime * 0.6) * 0.25;
          light2.rotation.x = -Math.cos(elapsedTime * 0.7) * 0.18;
        }
      } else if (currentTheme === "builder") {
        const matrix = themeGroup.getObjectByName("buildingMatrix");
        const particles = themeGroup.getObjectByName("constructionParticles");

        if (matrix) {
          matrix.rotation.y = elapsedTime * 0.035;
          const pulse = 1 + Math.sin(elapsedTime * 1.8) * 0.015;
          matrix.scale.set(pulse, 1, pulse);
        }
        if (particles) {
          const positions = particles.geometry.attributes.position.array;
          for (let i = 1; i < positions.length; i += 3) {
            positions[i] += 0.055;
            if (positions[i] > 20) positions[i] = -20;
          }
          particles.geometry.attributes.position.needsUpdate = true;
          particles.rotation.y = elapsedTime * 0.01;
        }
      }

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

      camera.position.z = 30 + scrollRatio * 20;

      // Look at the rotating center with slight parallax offset
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

      // Clear the current group children
      const group = themeGroupRef.current;
      if (group) {
        while (group.children.length > 0) {
          const child = group.children[0];
          group.remove(child);
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((m) => m.dispose());
            } else {
              child.material.dispose();
            }
          }
        }
      }

      ambientLight.dispose();
      pointLight1.dispose();
      pointLight2.dispose();
      renderer.dispose();
    };
  }, []);

  // Effect to rebuild theme-specific elements on active theme state change
  useEffect(() => {
    const group = themeGroupRef.current;
    if (!group) return;

    // Clear existing meshes, geometries, and materials to prevent memory leaks
    while (group.children.length > 0) {
      const child = group.children[0];
      group.remove(child);
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => m.dispose());
        } else {
          child.material.dispose();
        }
      }
    }

    // Rebuild meshes for the new theme
    buildThemeScene(theme, group);
  }, [theme]);

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
