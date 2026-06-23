import React from "react";
import * as THREE from "three";

// Helper for cleaning up meshes, geometries, and materials recursively
const disposeObject = (obj) => {
  if (obj.children) {
    while (obj.children.length > 0) {
      const child = obj.children[0];
      disposeObject(child);
      obj.remove(child);
    }
  }
  if (obj.geometry) obj.geometry.dispose();
  if (obj.material) {
    if (Array.isArray(obj.material)) {
      obj.material.forEach((m) => m.dispose());
    } else {
      obj.material.dispose();
    }
  }
};

const ThreeCanvas = ({ theme }) => {
  const canvasRef = React.useRef(null);
  const themeGroupRef = React.useRef(null);
  const themeRef = React.useRef(theme);

  // Sync theme prop to ref so the animation loop is not stale
  React.useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  // Main Scene construction helper
  const buildThemeScene = (currentTheme, group) => {
    const cyan = new THREE.Color(0x00f2fe);
    const purple = new THREE.Color(0x8a2be2);

    if (currentTheme === "developer") {
      // 1. Stars Particle Field
      const starsCount = 1000;
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
        size: 0.15,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
      });
      const starField = new THREE.Points(starsGeometry, starMaterial);
      starField.name = "starField";
      group.add(starField);

      // 2. Central Shaded Core
      const coreGeom = new THREE.SphereGeometry(4.5, 32, 32);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x050c1e,
        metalness: 0.9,
        roughness: 0.1,
        emissive: 0x0c102b,
      });
      const cyberCore = new THREE.Mesh(coreGeom, coreMat);
      cyberCore.name = "cyberCore";
      group.add(cyberCore);

      // 3. Cyber Wireframe Sphere overlay
      const wireGeom = new THREE.SphereGeometry(4.6, 24, 24);
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0x00f2fe,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
      });
      const circuitWire = new THREE.Mesh(wireGeom, wireMat);
      circuitWire.name = "circuitWire";
      group.add(circuitWire);

      // 4. Orbit Rings
      const ringGeom = new THREE.TorusGeometry(8.5, 0.2, 16, 100);
      const ringMat1 = new THREE.MeshStandardMaterial({
        color: 0x00f2fe,
        emissive: 0x005080,
        metalness: 0.8,
        roughness: 0.2,
      });
      const ring1 = new THREE.Mesh(ringGeom, ringMat1);
      ring1.rotation.x = Math.PI / 3;
      ring1.name = "ring1";
      group.add(ring1);

      const ringMat2 = new THREE.MeshStandardMaterial({
        color: 0x8a2be2,
        emissive: 0x400080,
        metalness: 0.8,
        roughness: 0.2,
      });
      const ring2 = new THREE.Mesh(ringGeom, ringMat2);
      ring2.rotation.x = -Math.PI / 4;
      ring2.rotation.y = Math.PI / 4;
      ring2.name = "ring2";
      group.add(ring2);

      // 5. Orbiting circuit nodes
      const nodeGroup = new THREE.Group();
      nodeGroup.name = "nodeGroup";
      const nodeGeom = new THREE.BoxGeometry(0.5, 0.5, 0.5);
      const nodeMat = new THREE.MeshBasicMaterial({
        color: 0x00f2fe,
      });
      for (let i = 0; i < 6; i++) {
        const node = new THREE.Mesh(nodeGeom, nodeMat);
        const angle = (i / 6) * Math.PI * 2;
        node.position.set(Math.cos(angle) * 8.5, 0, Math.sin(angle) * 8.5);
        nodeGroup.add(node);
      }
      nodeGroup.rotation.x = Math.PI / 3; // Align with ring1
      group.add(nodeGroup);
    } else if (currentTheme === "oil") {
      // 1. Transparent Glass Jar
      const jarGroup = new THREE.Group();
      jarGroup.name = "jarGroup";

      const glassMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.18,
        roughness: 0.05,
        metalness: 0.9,
      });
      const metalMat = new THREE.MeshStandardMaterial({
        color: 0xdddddd,
        metalness: 0.9,
        roughness: 0.15,
      });

      // Jar Cylinder
      const jarCyl = new THREE.Mesh(
        new THREE.CylinderGeometry(5.0, 5.0, 11, 32, 1, true),
        glassMat,
      );
      jarGroup.add(jarCyl);

      // Jar Base
      const jarBase = new THREE.Mesh(
        new THREE.CylinderGeometry(5.0, 5.0, 0.4, 32),
        glassMat,
      );
      jarBase.position.y = -5.7;
      jarGroup.add(jarBase);

      // Metal Lid/Rim
      const jarRim = new THREE.Mesh(
        new THREE.CylinderGeometry(4.2, 4.2, 0.6, 32),
        metalMat,
      );
      jarRim.position.y = 5.6;
      jarGroup.add(jarRim);

      group.add(jarGroup);

      // 2. Swirling Honey/Oil Liquid Inside (Cylinder)
      const waveGeom = new THREE.CylinderGeometry(4.9, 4.9, 8, 32, 8);
      const waveMat = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        emissive: 0x3a2300,
        metalness: 0.9,
        roughness: 0.1,
        flatShading: true,
      });
      const oilWaves = new THREE.Mesh(waveGeom, waveMat);
      oilWaves.name = "oilWaves";
      const wavePositions = waveGeom.attributes.position.array;
      oilWaves.userData = { initialPositions: new Float32Array(wavePositions) };
      oilWaves.position.y = -1.5;
      group.add(oilWaves);

      // 3. Overhead Nozzle/Faucet Pipe
      const faucetGroup = new THREE.Group();
      faucetGroup.name = "faucetGroup";

      const verticalPipe = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.2, 4.5, 12),
        metalMat,
      );
      verticalPipe.position.set(4.0, 8.25, -2);
      faucetGroup.add(verticalPipe);

      const horizontalPipe = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.2, 4.5, 12),
        metalMat,
      );
      horizontalPipe.rotation.z = Math.PI / 2;
      horizontalPipe.position.set(1.75, 10.3, -2);
      faucetGroup.add(horizontalPipe);

      group.add(faucetGroup);

      // 4. Dripping Golden Droplet
      const dropGeom = new THREE.SphereGeometry(0.4, 16, 16);
      const dropPos = dropGeom.attributes.position;
      for (let i = 0; i < dropPos.count; i++) {
        const y = dropPos.getY(i);
        if (y > 0) {
          dropPos.setX(i, dropPos.getX(i) * 0.5);
          dropPos.setZ(i, dropPos.getZ(i) * 0.5);
        }
      }
      dropPos.needsUpdate = true;

      const dropMat = new THREE.MeshStandardMaterial({
        color: 0xffa500,
        emissive: 0x221100,
        metalness: 0.95,
        roughness: 0.05,
      });
      const oilDrop = new THREE.Mesh(dropGeom, dropMat);
      oilDrop.name = "oilDrop";
      oilDrop.position.set(-0.5, 10.0, -2);
      oilDrop.scale.set(1, 1.4, 1);
      oilDrop.userData = {
        yStart: 10.0,
        yFloor: 2.3,
        velocity: 0,
        gravity: 0.007,
        cooldown: 0,
      };
      group.add(oilDrop);

      // 5. Dripping Splash Particles
      const splashGroup = new THREE.Group();
      splashGroup.name = "splashGroup";
      const splashCount = 10;
      const splashGeom = new THREE.SphereGeometry(0.12, 8, 8);
      const splashMat = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        metalness: 0.9,
        roughness: 0.05,
      });
      for (let i = 0; i < splashCount; i++) {
        const p = new THREE.Mesh(splashGeom, splashMat);
        p.position.set(-0.5, 2.3, -2);
        p.visible = false;
        p.userData = {
          vx: 0,
          vy: 0,
          vz: 0,
          active: false,
          life: 0,
        };
        splashGroup.add(p);
      }
      group.add(splashGroup);

      // 6. Realistic Rising Bubbles Inside the Jar
      const bubblesGroup = new THREE.Group();
      bubblesGroup.name = "bubblesGroup";
      const bubbleCount = 25;
      const bubbleGeom = new THREE.SphereGeometry(0.3, 12, 12);
      const bubbleMat = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        metalness: 0.95,
        roughness: 0.02,
        transparent: true,
        opacity: 0.65,
      });

      for (let i = 0; i < bubbleCount; i++) {
        const bMesh = new THREE.Mesh(bubbleGeom, bubbleMat);
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 4.2;
        bMesh.position.set(
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 7.5 - 1.5,
          Math.sin(angle) * radius,
        );
        bMesh.userData = {
          speedY: 0.04 + Math.random() * 0.05,
          oscSpeed: 1 + Math.random() * 2,
          oscScale: 0.1 + Math.random() * 0.3,
          startX: bMesh.position.x,
          startZ: bMesh.position.z,
          radius: radius,
          angle: angle,
        };
        bubblesGroup.add(bMesh);
      }
      group.add(bubblesGroup);
    } else if (currentTheme === "fashion") {
      // 1. Metal Clothing Stand/Rack
      const rackGroup = new THREE.Group();
      rackGroup.name = "rackGroup";

      const standMat = new THREE.MeshStandardMaterial({
        color: 0xcccccc,
        metalness: 0.95,
        roughness: 0.05,
      });
      const woodMat = new THREE.MeshStandardMaterial({
        color: 0x8b5a2b,
        roughness: 0.7,
        metalness: 0.1,
      });

      // Rack Vertical Left Post
      const leftPost = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.12, 13.5, 12),
        standMat,
      );
      leftPost.position.set(-4.5, -1.25, 0);
      rackGroup.add(leftPost);

      // Rack Vertical Right Post
      const rightPost = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.12, 13.5, 12),
        standMat,
      );
      rightPost.position.set(4.5, -1.25, 0);
      rackGroup.add(rightPost);

      // Horizontal Bar
      const crossBar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.1, 9.2, 16),
        standMat,
      );
      crossBar.rotation.z = Math.PI / 2;
      crossBar.position.set(0, 5.4, 0);
      rackGroup.add(crossBar);

      // Feet Base Left
      const leftFoot = new THREE.Mesh(
        new THREE.BoxGeometry(2.5, 0.3, 0.6),
        standMat,
      );
      leftFoot.position.set(-4.5, -8.0, 0);
      rackGroup.add(leftFoot);

      // Feet Base Right
      const rightFoot = new THREE.Mesh(
        new THREE.BoxGeometry(2.5, 0.3, 0.6),
        standMat,
      );
      rightFoot.position.set(4.5, -8.0, 0);
      rackGroup.add(rightFoot);

      group.add(rackGroup);

      // 2. Wooden Hanger
      const hangerGroup = new THREE.Group();
      hangerGroup.name = "hangerGroup";
      hangerGroup.position.set(0, 5.3, 0);

      // Hanger Frame
      const hangerFrame = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.06, 3.2, 8),
        woodMat,
      );
      hangerFrame.rotation.z = Math.PI / 2;
      hangerFrame.position.y = -0.5;
      hangerGroup.add(hangerFrame);

      // Hanger shoulders
      const leftShoulder = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.06, 1.2, 8),
        woodMat,
      );
      leftShoulder.rotation.z = -Math.PI / 4;
      leftShoulder.position.set(-1.1, -0.9, 0);
      hangerGroup.add(leftShoulder);

      const rightShoulder = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.06, 1.2, 8),
        woodMat,
      );
      rightShoulder.rotation.z = Math.PI / 4;
      rightShoulder.position.set(1.1, -0.9, 0);
      hangerGroup.add(rightShoulder);

      // Hook
      const hookGeom = new THREE.TorusGeometry(
        0.25,
        0.05,
        8,
        16,
        Math.PI * 1.3,
      );
      const hook = new THREE.Mesh(hookGeom, standMat);
      hook.position.set(0, -0.15, 0);
      hangerGroup.add(hook);

      group.add(hangerGroup);

      // 3. Procedurally Modeled 3D Fabric T-Shirt (Hanging)
      const tShirtGroup = new THREE.Group();
      tShirtGroup.name = "tShirtGroup";
      tShirtGroup.position.set(0, 4.4, 0);

      const fabricMat = new THREE.MeshStandardMaterial({
        color: 0x6366f1,
        roughness: 0.85,
        metalness: 0.05,
        side: THREE.DoubleSide,
      });
      const collarMat = new THREE.MeshStandardMaterial({
        color: 0x1e1b4b,
        roughness: 0.8,
      });

      // Torso fabric box
      const shirtTorso = new THREE.Mesh(
        new THREE.BoxGeometry(3.2, 4.5, 0.5),
        fabricMat,
      );
      shirtTorso.position.y = -2.25;
      tShirtGroup.add(shirtTorso);

      // Left Sleeve (Angled)
      const leftSleeve = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 1.5, 0.5),
        fabricMat,
      );
      leftSleeve.position.set(-2.0, -1.0, 0);
      leftSleeve.rotation.z = -Math.PI / 5;
      tShirtGroup.add(leftSleeve);

      // Right Sleeve (Angled)
      const rightSleeve = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 1.5, 0.5),
        fabricMat,
      );
      rightSleeve.position.set(2.0, -1.0, 0);
      rightSleeve.rotation.z = Math.PI / 5;
      tShirtGroup.add(rightSleeve);

      // Collar trim
      const collar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.7, 0.7, 0.25, 16, 1, true),
        collarMat,
      );
      collar.position.set(0, 0, 0);
      tShirtGroup.add(collar);

      group.add(tShirtGroup);

      // 4. Retail Glass Accessory Pedestal
      const pedestal = new THREE.Mesh(
        new THREE.BoxGeometry(2.5, 3.5, 2.5),
        new THREE.MeshStandardMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.25,
          roughness: 0.1,
          metalness: 0.9,
        }),
      );
      pedestal.position.set(3.5, -6.25, 1.5);
      group.add(pedestal);

      // 5. Fashion Cap (Hat) displayed on pedestal
      const capGroup = new THREE.Group();
      capGroup.name = "capGroup";
      capGroup.position.set(3.5, -4.2, 1.5);

      const capMat = new THREE.MeshStandardMaterial({
        color: 0xef4444,
        roughness: 0.75,
        metalness: 0.1,
      });

      // Cap Dome
      const capDome = new THREE.Mesh(
        new THREE.SphereGeometry(0.65, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2),
        capMat,
      );
      capDome.rotation.x = -Math.PI / 10;
      capGroup.add(capDome);

      // Cap Brim / Visor
      const capBrim = new THREE.Mesh(
        new THREE.BoxGeometry(0.9, 0.05, 0.65),
        capMat,
      );
      capBrim.position.set(0, -0.15, 0.5);
      capBrim.rotation.x = Math.PI / 16;
      capGroup.add(capBrim);

      group.add(capGroup);

      // 6. Volumetric Showroom spotlights
      const ringGeom = new THREE.TorusGeometry(12.5, 0.08, 8, 64);
      const fRingMat1 = new THREE.MeshStandardMaterial({
        color: 0x00f2fe,
        metalness: 0.8,
        roughness: 0.2,
        emissive: 0x003366,
      });
      const fashionRing1 = new THREE.Mesh(ringGeom, fRingMat1);
      fashionRing1.name = "fashionRing1";
      fashionRing1.rotation.x = Math.PI / 2.4;
      group.add(fashionRing1);

      const fRingMat2 = new THREE.MeshStandardMaterial({
        color: 0xff007f,
        metalness: 0.8,
        roughness: 0.2,
        emissive: 0x660033,
      });
      const fashionRing2 = new THREE.Mesh(ringGeom, fRingMat2);
      fashionRing2.name = "fashionRing2";
      fashionRing2.rotation.x = -Math.PI / 2.8;
      fashionRing2.rotation.y = Math.PI / 5;
      group.add(fashionRing2);

      // 7. Swirling Threads
      const threadsCount = 80;
      const threadGeom = new THREE.BufferGeometry();
      const threadPos = new Float32Array(threadsCount * 3);
      const threadColors = new Float32Array(threadsCount * 3);

      for (let i = 0; i < threadsCount * 3; i += 3) {
        const radius = 5.5 + Math.random() * 5;
        const angle = Math.random() * Math.PI * 2;
        threadPos[i] = Math.cos(angle) * radius;
        threadPos[i + 1] = (Math.random() - 0.5) * 20;
        threadPos[i + 2] = Math.sin(angle) * radius;

        const mixed = new THREE.Color().lerpColors(
          cyan,
          new THREE.Color(0xff007f),
          Math.random(),
        );
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
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      });
      const threadParticles = new THREE.Points(threadGeom, threadMat);
      threadParticles.name = "threadParticles";
      group.add(threadParticles);
    } else if (currentTheme === "interior") {
      // 1. Shaded mini-room group
      const roomGroup = new THREE.Group();
      roomGroup.name = "roomGroup";

      const woodMat = new THREE.MeshStandardMaterial({
        color: 0x4a2f1b,
        roughness: 0.7,
        metalness: 0.1,
      });
      const sofaFabricMat = new THREE.MeshStandardMaterial({
        color: 0xdfdfdb,
        roughness: 0.85,
        metalness: 0.1,
      });
      const sofaBaseMat = new THREE.MeshStandardMaterial({
        color: 0x222225,
        roughness: 0.5,
        metalness: 0.8,
      });
      const glassMat = new THREE.MeshStandardMaterial({
        color: 0x00e5ff,
        transparent: true,
        opacity: 0.4,
        roughness: 0.1,
        metalness: 0.9,
      });

      // Floor Platform
      const floor = new THREE.Mesh(new THREE.BoxGeometry(20, 0.4, 20), woodMat);
      floor.position.y = -6.5;
      roomGroup.add(floor);

      // Sofa Base
      const sBase = new THREE.Mesh(
        new THREE.BoxGeometry(8, 0.6, 3),
        sofaBaseMat,
      );
      sBase.position.set(-2, -6.0, 0);
      roomGroup.add(sBase);

      // Sofa Cushions
      const cushion1 = new THREE.Mesh(
        new THREE.BoxGeometry(3.6, 0.8, 2.6),
        sofaFabricMat,
      );
      cushion1.position.set(-3.7, -5.3, 0);
      roomGroup.add(cushion1);

      const cushion2 = new THREE.Mesh(
        new THREE.BoxGeometry(3.6, 0.8, 2.6),
        sofaFabricMat,
      );
      cushion2.position.set(-0.1, -5.3, 0);
      roomGroup.add(cushion2);

      // Sofa Backrest
      const backrest = new THREE.Mesh(
        new THREE.BoxGeometry(7.6, 2.0, 0.6),
        sofaFabricMat,
      );
      backrest.position.set(-1.9, -4.2, -1.2);
      roomGroup.add(backrest);

      // Sofa Arms
      const leftArm = new THREE.Mesh(
        new THREE.BoxGeometry(0.6, 1.6, 3.2),
        sofaFabricMat,
      );
      leftArm.position.set(-5.9, -4.9, 0.1);
      roomGroup.add(leftArm);

      const rightArm = new THREE.Mesh(
        new THREE.BoxGeometry(0.6, 1.6, 3.2),
        sofaFabricMat,
      );
      rightArm.position.set(2.1, -4.9, 0.1);
      roomGroup.add(rightArm);

      // Coffee Table
      const tableLegMat = new THREE.MeshStandardMaterial({
        color: 0x111111,
        metalness: 0.9,
        roughness: 0.1,
      });
      const tableTop = new THREE.Mesh(
        new THREE.BoxGeometry(4.5, 0.15, 2.5),
        glassMat,
      );
      tableTop.position.set(-1.9, -5.2, 3.0);
      roomGroup.add(tableTop);

      for (let x of [-3.9, 0.1]) {
        for (let z of [2.0, 4.0]) {
          const leg = new THREE.Mesh(
            new THREE.CylinderGeometry(0.08, 0.08, 1.0),
            tableLegMat,
          );
          leg.position.set(x, -5.7, z);
          roomGroup.add(leg);
        }
      }

      // Small Desk Lamp on Table
      const lampBase = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.2, 0.05),
        tableLegMat,
      );
      lampBase.position.set(-1.9, -5.1, 3.0);
      roomGroup.add(lampBase);

      const lampStem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.8),
        tableLegMat,
      );
      lampStem.position.set(-1.9, -4.7, 3.0);
      roomGroup.add(lampStem);

      const lampShade = new THREE.Mesh(
        new THREE.ConeGeometry(0.4, 0.4, 16),
        tableLegMat,
      );
      lampShade.position.set(-1.9, -4.3, 3.0);
      lampShade.rotation.x = Math.PI;
      roomGroup.add(lampShade);

      group.add(roomGroup);

      // 2. Blueprint floor grid
      const grid = new THREE.GridHelper(40, 20, 0x00e5ff, 0x00e5ff);
      grid.name = "floorGrid";
      grid.position.y = -6.6;
      grid.material.transparent = true;
      grid.material.opacity = 0.15;
      group.add(grid);

      // 3. Volumetric Lamp Light Cone
      const spotlightGeom = new THREE.ConeGeometry(2.5, 6, 16, 1, true);
      const spotlightMat = new THREE.MeshBasicMaterial({
        color: 0xffcc88,
        transparent: true,
        opacity: 0.25,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      });
      const light1 = new THREE.Mesh(spotlightGeom, spotlightMat);
      light1.name = "lightCone";
      light1.position.set(-1.9, -7.3, 3.0); // projects down from shade to floor
      light1.rotation.x = Math.PI; // point down
      group.add(light1);
    } else if (currentTheme === "builder") {
      // 1. Skyscrapers and Construction Scene
      const buildingGroup = new THREE.Group();
      buildingGroup.name = "buildingGroup";

      const steelMat = new THREE.MeshStandardMaterial({
        color: 0x1b233a,
        metalness: 0.85,
        roughness: 0.15,
      });
      const glassMat = new THREE.MeshStandardMaterial({
        color: 0x00f2fe,
        transparent: true,
        opacity: 0.22,
        roughness: 0.05,
        metalness: 0.9,
      });
      const windowMat = new THREE.MeshBasicMaterial({
        color: 0xffd700,
      });

      const addSkyscraper = (w, h, d, x, z) => {
        const tower = new THREE.Group();

        // Steel Core
        const core = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), steelMat);
        core.position.y = h / 2 - 10;
        tower.add(core);

        // Glass cladding
        const glass = new THREE.Mesh(
          new THREE.BoxGeometry(w + 0.15, h + 0.1, d + 0.15),
          glassMat,
        );
        glass.position.y = h / 2 - 10;
        tower.add(glass);

        // Windows (Procedural strips)
        const winRows = Math.floor(h / 2.0);
        const winCols = Math.floor(w / 1.0);
        const wGeom = new THREE.BoxGeometry(0.12, 0.4, 0.02);

        for (let r = 0; r < winRows; r++) {
          const y = r * 2.0 - 9.0 + 1.0;
          if (y > h - 10) continue;

          for (let c = 0; c < winCols; c++) {
            if (Math.random() > 0.3) {
              const xOffset = c * 1.0 - w / 2 + 0.5;

              // Front facade windows
              const wFront = new THREE.Mesh(wGeom, windowMat);
              wFront.position.set(xOffset, y, d / 2 + 0.09);
              tower.add(wFront);

              // Back facade windows
              const wBack = new THREE.Mesh(wGeom, windowMat);
              wBack.position.set(xOffset, y, -d / 2 - 0.09);
              tower.add(wBack);
            }
          }
        }

        tower.position.set(x, 0, z);
        buildingGroup.add(tower);
      };

      // Add Skyscrapers
      addSkyscraper(5, 22, 5, -8, -4);
      addSkyscraper(7, 16, 7, 3, -6);
      addSkyscraper(4, 18, 4, 8, 3);
      addSkyscraper(3.5, 11, 3.5, -4, 5);

      // Floor Grid
      const grid = new THREE.GridHelper(50, 20, 0x4682b4, 0xff4500);
      grid.position.y = -10.05;
      grid.material.transparent = true;
      grid.material.opacity = 0.2;
      buildingGroup.add(grid);

      group.add(buildingGroup);

      // 2. Construction Crane
      const craneGroup = new THREE.Group();
      craneGroup.name = "craneGroup";
      craneGroup.position.set(8, -1, 3);

      const craneMat = new THREE.MeshStandardMaterial({
        color: 0xffcc00,
        metalness: 0.6,
        roughness: 0.3,
      });

      // Mast (height 16)
      const mast = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.2, 16),
        craneMat,
      );
      mast.position.y = -1;
      craneGroup.add(mast);

      // Jib/Boom
      const boom = new THREE.Mesh(new THREE.BoxGeometry(8, 0.3, 0.3), craneMat);
      boom.position.set(2.5, 7.0, 0);
      craneGroup.add(boom);

      // Cable and Girder/Load
      const cable = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 5),
        new THREE.MeshBasicMaterial({ color: 0x555555 }),
      );
      cable.position.set(5.5, 4.5, 0);
      craneGroup.add(cable);

      const girder = new THREE.Mesh(
        new THREE.BoxGeometry(2, 0.3, 0.3),
        new THREE.MeshBasicMaterial({ color: 0xff4500 }),
      );
      girder.position.set(5.5, 2.0, 0);
      craneGroup.add(girder);

      group.add(craneGroup);

      // 3. Searchlight cones
      const spotlightGeom = new THREE.ConeGeometry(3, 20, 16, 1, true);
      const spotlightMat = new THREE.MeshBasicMaterial({
        color: 0xffccaa,
        transparent: true,
        opacity: 0.12,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      });

      const sLight1 = new THREE.Mesh(spotlightGeom, spotlightMat);
      sLight1.name = "searchlight1";
      sLight1.position.set(-8, 12 - 10, -4);
      group.add(sLight1);

      const sLight2 = new THREE.Mesh(spotlightGeom, spotlightMat.clone());
      sLight2.material.color.setHex(0x00f2fe);
      sLight2.name = "searchlight2";
      sLight2.position.set(3, 6 - 10, -6);
      group.add(sLight2);

      // 4. Moving traffic particles at base
      const trafficCount = 40;
      const trafficGeom = new THREE.BufferGeometry();
      const trafficPos = new Float32Array(trafficCount * 3);
      const trafficColors = new Float32Array(trafficCount * 3);

      for (let i = 0; i < trafficCount * 3; i += 3) {
        trafficPos[i] = (Math.random() - 0.5) * 40;
        trafficPos[i + 1] = -9.9;
        trafficPos[i + 2] = (Math.random() - 0.5) * 40;

        const isYellow = Math.random() > 0.5;
        trafficColors[i] = 1.0;
        trafficColors[i + 1] = isYellow ? 0.7 : 0.2;
        trafficColors[i + 2] = 0.2;
      }
      trafficGeom.setAttribute(
        "position",
        new THREE.BufferAttribute(trafficPos, 3),
      );
      trafficGeom.setAttribute(
        "color",
        new THREE.BufferAttribute(trafficColors, 3),
      );

      const trafficMat = new THREE.PointsMaterial({
        size: 0.35,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      });
      const trafficParticles = new THREE.Points(trafficGeom, trafficMat);
      trafficParticles.name = "trafficParticles";
      group.add(trafficParticles);
    } else if (currentTheme === "cosmos") {
      // 1. Central Black Hole
      const blackHoleGroup = new THREE.Group();
      blackHoleGroup.name = "blackHoleGroup";

      // Dark Core Sphere
      const bhCore = new THREE.Mesh(
        new THREE.SphereGeometry(2.2, 32, 32),
        new THREE.MeshBasicMaterial({
          color: 0x000000,
        }),
      );
      blackHoleGroup.add(bhCore);

      // Glowing Swirling Accretion Disk
      const diskGeom = new THREE.TorusGeometry(3.5, 1.2, 2, 64);
      const diskMat = new THREE.MeshStandardMaterial({
        color: 0xffaa00,
        emissive: 0xff4500,
        emissiveIntensity: 2.5,
        metalness: 0.9,
        roughness: 0.1,
      });
      const bhDisk = new THREE.Mesh(diskGeom, diskMat);
      bhDisk.rotation.x = Math.PI / 2.1; // slight tilt
      bhDisk.scale.z = 0.05; // flatten
      bhDisk.name = "bhDisk";
      blackHoleGroup.add(bhDisk);

      // Volumetric secondary gravitational disk ring
      const innerDisk = new THREE.Mesh(
        new THREE.TorusGeometry(2.7, 0.4, 2, 64),
        new THREE.MeshStandardMaterial({
          color: 0xff5500,
          emissive: 0xff2200,
          emissiveIntensity: 1.5,
        }),
      );
      innerDisk.rotation.x = -Math.PI / 2.3;
      innerDisk.scale.z = 0.05;
      innerDisk.name = "innerDisk";
      blackHoleGroup.add(innerDisk);

      group.add(blackHoleGroup);

      // 2. Solar Family Orbit Trails
      const orbitGroup = new THREE.Group();
      orbitGroup.name = "orbitGroup";
      const orbitMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.12,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      });

      // Inner orbit ring
      const innerOrbit = new THREE.Mesh(
        new THREE.TorusGeometry(6.2, 0.03, 8, 128),
        orbitMat,
      );
      innerOrbit.rotation.x = Math.PI / 2.1;
      orbitGroup.add(innerOrbit);

      // Middle orbit ring
      const middleOrbit = new THREE.Mesh(
        new THREE.TorusGeometry(9.5, 0.03, 8, 128),
        orbitMat,
      );
      middleOrbit.rotation.x = -Math.PI / 2.3;
      orbitGroup.add(middleOrbit);

      // Outer orbit ring
      const outerOrbit = new THREE.Mesh(
        new THREE.TorusGeometry(13.2, 0.03, 8, 128),
        orbitMat,
      );
      outerOrbit.rotation.x = Math.PI / 2.0;
      orbitGroup.add(outerOrbit);

      group.add(orbitGroup);

      // 3. Orbiting Planets (Solar Family)
      const planetsGroup = new THREE.Group();
      planetsGroup.name = "planetsGroup";

      // Planet A (Inner Red Planet)
      const planetAGeom = new THREE.SphereGeometry(0.42, 16, 16);
      const planetAMat = new THREE.MeshStandardMaterial({
        color: 0xef4444,
        emissive: 0x551100,
        roughness: 0.7,
      });
      const planetA = new THREE.Mesh(planetAGeom, planetAMat);
      planetA.name = "planetA";
      planetsGroup.add(planetA);

      // Planet B (Middle Blue Planet with Saturn-like Rings)
      const planetBGroup = new THREE.Group();
      planetBGroup.name = "planetBGroup";

      const planetBGeom = new THREE.SphereGeometry(0.72, 24, 24);
      const planetBMat = new THREE.MeshStandardMaterial({
        color: 0x0ea5e9,
        roughness: 0.35,
        metalness: 0.15,
      });
      const planetB = new THREE.Mesh(planetBGeom, planetBMat);
      planetBGroup.add(planetB);

      const pRingGeom = new THREE.TorusGeometry(1.2, 0.18, 2, 32);
      const pRingMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.65,
        roughness: 0.1,
      });
      const planetBRing = new THREE.Mesh(pRingGeom, pRingMat);
      planetBRing.rotation.x = Math.PI / 2.3;
      planetBRing.scale.z = 0.06;
      planetBGroup.add(planetBRing);
      planetsGroup.add(planetBGroup);

      // Planet C (Outer Purple Giant)
      const planetCGeom = new THREE.SphereGeometry(1.0, 24, 24);
      const planetCMat = new THREE.MeshStandardMaterial({
        color: 0xa855f7,
        roughness: 0.55,
        metalness: 0.3,
      });
      const planetC = new THREE.Mesh(planetCGeom, planetCMat);
      planetC.name = "planetC";
      planetsGroup.add(planetC);

      group.add(planetsGroup);

      // 4. Stellar Nebula particles
      const nebCount = 600;
      const nebGeom = new THREE.BufferGeometry();
      const nebPos = new Float32Array(nebCount * 3);
      const nebColors = new Float32Array(nebCount * 3);

      for (let i = 0; i < nebCount * 3; i += 3) {
        nebPos[i] = (Math.random() - 0.5) * 120;
        nebPos[i + 1] = (Math.random() - 0.5) * 120;
        nebPos[i + 2] = (Math.random() - 0.5) * 120;

        const mixed = new THREE.Color().lerpColors(
          new THREE.Color(0x312e81),
          new THREE.Color(0xd946ef),
          Math.random(),
        );
        nebColors[i] = mixed.r;
        nebColors[i + 1] = mixed.g;
        nebColors[i + 2] = mixed.b;
      }
      nebGeom.setAttribute("position", new THREE.BufferAttribute(nebPos, 3));
      nebGeom.setAttribute("color", new THREE.BufferAttribute(nebColors, 3));

      const nebMat = new THREE.PointsMaterial({
        size: 0.25,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
      });
      const cosmosNebula = new THREE.Points(nebGeom, nebMat);
      cosmosNebula.name = "cosmosNebula";
      group.add(cosmosNebula);

      // 5. Twinkling Stars Background (Multi-layered points)
      const starsCount = 400;
      const starsGeom = new THREE.BufferGeometry();
      const starPos = new Float32Array(starsCount * 3);
      const starColors = new Float32Array(starsCount * 3);
      for (let i = 0; i < starsCount * 3; i += 3) {
        starPos[i] = (Math.random() - 0.5) * 150;
        starPos[i + 1] = (Math.random() - 0.5) * 150;
        starPos[i + 2] = (Math.random() - 0.5) * 150;

        const val = 0.8 + Math.random() * 0.2;
        starColors[i] = val;
        starColors[i + 1] = val;
        starColors[i + 2] = val;
      }
      starsGeom.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
      starsGeom.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

      const starsMat = new THREE.PointsMaterial({
        size: 0.15,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      });
      const cosmosStars = new THREE.Points(starsGeom, starsMat);
      cosmosStars.name = "cosmosStars";
      group.add(cosmosStars);
    }
  };

  // Setup ThreeJS Canvas
  React.useEffect(() => {
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00f2fe, 2.5, 100);
    pointLight1.position.set(15, 15, 15);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x8a2be2, 2.5, 100);
    pointLight2.position.set(-15, -15, 15);
    scene.add(pointLight2);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(15, 25, 20);
    scene.add(dirLight);

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
        const cyberCore = themeGroup.getObjectByName("cyberCore");
        const circuitWire = themeGroup.getObjectByName("circuitWire");
        const ring1 = themeGroup.getObjectByName("ring1");
        const ring2 = themeGroup.getObjectByName("ring2");
        const nodeGroup = themeGroup.getObjectByName("nodeGroup");

        if (starField) {
          starField.rotation.y = elapsedTime * 0.01;
        }
        if (cyberCore) {
          cyberCore.rotation.y = elapsedTime * 0.15;
          cyberCore.rotation.x = Math.sin(elapsedTime * 0.5) * 0.05;
        }
        if (circuitWire) {
          circuitWire.rotation.y = -elapsedTime * 0.08;
          circuitWire.rotation.z = elapsedTime * 0.04;
        }
        if (ring1) ring1.rotation.z = elapsedTime * 0.2;
        if (ring2) ring2.rotation.z = -elapsedTime * 0.15;
        if (nodeGroup) nodeGroup.rotation.y = elapsedTime * 0.35;
      } else if (currentTheme === "oil") {
        const oilWaves = themeGroup.getObjectByName("oilWaves");
        const oilDrop = themeGroup.getObjectByName("oilDrop");
        const splashGroup = themeGroup.getObjectByName("splashGroup");
        const bubblesGroup = themeGroup.getObjectByName("bubblesGroup");

        if (oilWaves) {
          const positions = oilWaves.geometry.attributes.position.array;
          const initialPos = oilWaves.userData.initialPositions;
          if (initialPos) {
            for (let i = 0; i < positions.length; i += 3) {
              const x = initialPos[i];
              const z = initialPos[i + 2];
              positions[i + 1] =
                initialPos[i + 1] +
                Math.sin(elapsedTime * 1.6 + x * 0.3 + z * 0.2) * 0.4 +
                Math.cos(elapsedTime * 1.1 + x * 0.2 - z * 0.3) * 0.2;
            }
            oilWaves.geometry.attributes.position.needsUpdate = true;
            oilWaves.geometry.computeVertexNormals();
          }
          oilWaves.rotation.y = elapsedTime * 0.05;
        }

        if (oilDrop) {
          const ud = oilDrop.userData;
          if (ud.cooldown > 0) {
            ud.cooldown -= 0.016;
            oilDrop.position.y = ud.yStart;
            oilDrop.scale.set(
              0.1 + (1.0 - ud.cooldown) * 0.9,
              (0.1 + (1.0 - ud.cooldown) * 0.9) * 1.4,
              0.1 + (1.0 - ud.cooldown) * 0.9,
            );
            oilDrop.visible = true;
          } else {
            ud.velocity += ud.gravity;
            oilDrop.position.y -= ud.velocity;

            const stretch = 1.0 + ud.velocity * 1.5;
            oilDrop.scale.set(
              1.0 / Math.sqrt(stretch),
              stretch * 1.4,
              1.0 / Math.sqrt(stretch),
            );

            if (oilDrop.position.y <= ud.yFloor) {
              oilDrop.visible = false;
              ud.cooldown = 1.2;
              ud.velocity = 0;

              if (splashGroup) {
                splashGroup.children.forEach((p, idx) => {
                  p.position.set(-0.5, ud.yFloor, -2);
                  p.visible = true;
                  const angle =
                    (idx / splashGroup.children.length) * Math.PI * 2;
                  const speed = 0.08 + Math.random() * 0.1;
                  p.userData.vx = Math.cos(angle) * speed;
                  p.userData.vy = 0.08 + Math.random() * 0.12;
                  p.userData.vz = Math.sin(angle) * speed;
                  p.userData.active = true;
                  p.userData.life = 1.0;
                });
              }
            }
          }
        }

        if (splashGroup) {
          splashGroup.children.forEach((p) => {
            if (p.userData.active) {
              p.position.x += p.userData.vx;
              p.position.y += p.userData.vy;
              p.position.z += p.userData.vz;
              p.userData.vy -= 0.007;
              p.userData.life -= 0.035;

              p.scale.set(p.userData.life, p.userData.life, p.userData.life);

              if (p.userData.life <= 0) {
                p.userData.active = false;
                p.visible = false;
              }
            }
          });
        }

        if (bubblesGroup) {
          bubblesGroup.children.forEach((bMesh) => {
            const ud = bMesh.userData;
            bMesh.position.y += ud.speedY;
            bMesh.position.x =
              ud.startX + Math.sin(elapsedTime * ud.oscSpeed) * ud.oscScale;
            bMesh.position.z =
              ud.startZ + Math.cos(elapsedTime * ud.oscSpeed) * ud.oscScale;

            if (bMesh.position.y > 2.2) {
              bMesh.position.y = -5.3;
              bMesh.position.x = ud.startX;
              bMesh.position.z = ud.startZ;
            }
          });
          bubblesGroup.rotation.y = elapsedTime * 0.02;
        }
      } else if (currentTheme === "fashion") {
        const rackGroup = themeGroup.getObjectByName("rackGroup");
        const hangerGroup = themeGroup.getObjectByName("hangerGroup");
        const tShirtGroup = themeGroup.getObjectByName("tShirtGroup");
        const capGroup = themeGroup.getObjectByName("capGroup");
        const ring1 = themeGroup.getObjectByName("fashionRing1");
        const ring2 = themeGroup.getObjectByName("fashionRing2");
        const threads = themeGroup.getObjectByName("threadParticles");

        if (rackGroup) {
          rackGroup.rotation.y = elapsedTime * 0.15;
        }
        if (hangerGroup) {
          hangerGroup.rotation.y = elapsedTime * 0.15;
          hangerGroup.rotation.z = Math.sin(elapsedTime * 1.5) * 0.04;
        }
        if (tShirtGroup) {
          tShirtGroup.rotation.y = elapsedTime * 0.15;
          tShirtGroup.rotation.z = Math.sin(elapsedTime * 1.5) * 0.04;
        }
        if (capGroup) {
          capGroup.rotation.y = elapsedTime * 0.4;
          capGroup.position.y = -4.2 + Math.sin(elapsedTime * 1.8) * 0.15;
        }
        if (ring1) {
          ring1.rotation.y = elapsedTime * 0.1;
          const scale = 1.0 + Math.sin(elapsedTime * 1.5) * 0.03;
          ring1.scale.set(scale, scale, scale);
        }
        if (ring2) {
          ring2.rotation.y = -elapsedTime * 0.15;
          const scale = 1.0 + Math.cos(elapsedTime * 1.5) * 0.03;
          ring2.scale.set(scale, scale, scale);
        }
        if (threads) {
          threads.rotation.y = elapsedTime * 0.05;
          const positions = threads.geometry.attributes.position.array;
          for (let i = 0; i < positions.length; i += 3) {
            positions[i + 1] +=
              Math.sin(elapsedTime * 0.8 + positions[i]) * 0.005;
            if (positions[i + 1] > 10) positions[i + 1] = -10;
          }
          threads.geometry.attributes.position.needsUpdate = true;
        }
      } else if (currentTheme === "interior") {
        const roomGroup = themeGroup.getObjectByName("roomGroup");
        const lightCone = themeGroup.getObjectByName("lightCone");

        if (roomGroup) {
          roomGroup.rotation.y = elapsedTime * 0.08;
        }
        if (lightCone) {
          const pulse = 1.0 + Math.sin(elapsedTime * 2) * 0.05;
          lightCone.scale.set(pulse, 1.0, pulse);
          lightCone.rotation.y = elapsedTime * 0.08;
        }
      } else if (currentTheme === "builder") {
        const buildingGroup = themeGroup.getObjectByName("buildingGroup");
        const craneGroup = themeGroup.getObjectByName("craneGroup");
        const searchlight1 = themeGroup.getObjectByName("searchlight1");
        const searchlight2 = themeGroup.getObjectByName("searchlight2");
        const trafficParticles = themeGroup.getObjectByName("trafficParticles");

        if (buildingGroup) {
          buildingGroup.rotation.y = elapsedTime * 0.03;
        }
        if (craneGroup) {
          const angle = Math.sin(elapsedTime * 0.3) * 0.6;
          craneGroup.rotation.y = angle;

          craneGroup.position.x = Math.cos(elapsedTime * 0.03 + 0.3) * 8.5;
          craneGroup.position.z = Math.sin(elapsedTime * 0.03 + 0.3) * 8.5;
        }
        if (searchlight1) {
          searchlight1.rotation.z = Math.sin(elapsedTime * 0.8) * 0.35;
          searchlight1.rotation.x = Math.cos(elapsedTime * 0.6) * 0.25;
        }
        if (searchlight2) {
          searchlight2.rotation.z = -Math.sin(elapsedTime * 0.7) * 0.35;
          searchlight2.rotation.x = -Math.cos(elapsedTime * 0.8) * 0.25;
        }
        if (trafficParticles) {
          const positions = trafficParticles.geometry.attributes.position.array;
          for (let i = 0; i < positions.length; i += 3) {
            positions[i] += 0.08;
            if (positions[i] > 20) positions[i] = -20;
          }
          trafficParticles.geometry.attributes.position.needsUpdate = true;
          trafficParticles.rotation.y = elapsedTime * 0.03;
        }
      } else if (currentTheme === "cosmos") {
        const blackHoleGroup = themeGroup.getObjectByName("blackHoleGroup");
        const bhDisk = themeGroup.getObjectByName("bhDisk");
        const innerDisk = themeGroup.getObjectByName("innerDisk");
        const planetsGroup = themeGroup.getObjectByName("planetsGroup");
        const cosmosNebula = themeGroup.getObjectByName("cosmosNebula");
        const cosmosStars = themeGroup.getObjectByName("cosmosStars");

        if (blackHoleGroup) {
          blackHoleGroup.rotation.y = elapsedTime * 0.1;
        }
        if (bhDisk) {
          bhDisk.rotation.z = -elapsedTime * 0.4;
        }
        if (innerDisk) {
          innerDisk.rotation.z = elapsedTime * 0.7;
        }

        if (planetsGroup) {
          const planetA = planetsGroup.getObjectByName("planetA");
          const planetBGroup = planetsGroup.getObjectByName("planetBGroup");
          const planetC = planetsGroup.getObjectByName("planetC");

          if (planetA) {
            const angleA = elapsedTime * 0.6;
            const rA = 6.2;
            planetA.position.set(
              Math.cos(angleA) * rA,
              Math.sin(angleA) * rA * 0.15,
              Math.sin(angleA) * rA * 0.98,
            );
            planetA.rotation.y = elapsedTime * 2.0;
          }

          if (planetBGroup) {
            const angleB = elapsedTime * 0.35;
            const rB = 9.5;
            planetBGroup.position.set(
              Math.cos(angleB) * rB,
              -Math.sin(angleB) * rB * 0.25,
              Math.sin(angleB) * rB * 0.96,
            );
            planetBGroup.rotation.y = elapsedTime * 1.0;
          }

          if (planetC) {
            const angleC = elapsedTime * 0.2;
            const rC = 13.2;
            planetC.position.set(
              Math.cos(angleC) * rC,
              0,
              Math.sin(angleC) * rC,
            );
            planetC.rotation.y = elapsedTime * 0.5;
          }
        }

        if (cosmosNebula) {
          cosmosNebula.rotation.y = elapsedTime * 0.008;
          cosmosNebula.rotation.x = elapsedTime * 0.003;
        }

        if (cosmosStars) {
          cosmosStars.rotation.y = -elapsedTime * 0.005;
          cosmosStars.material.opacity =
            0.5 + Math.sin(elapsedTime * 2.0) * 0.3;
        }
      }

      // Mouse Parallax
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;

      // Scroll bound movement
      scrollY += (targetScrollY - scrollY) * 0.05;
      const scrollRatio =
        scrollY /
        (document.documentElement.scrollHeight - window.innerHeight || 1);

      camera.position.z = 30 + scrollRatio * 20;

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

      const group = themeGroupRef.current;
      if (group) {
        while (group.children.length > 0) {
          const child = group.children[0];
          disposeObject(child);
          group.remove(child);
        }
      }

      ambientLight.dispose();
      pointLight1.dispose();
      pointLight2.dispose();
      dirLight.dispose();
      renderer.dispose();
    };
  }, []);

  // Effect to rebuild theme-specific elements on active theme state change
  React.useEffect(() => {
    const group = themeGroupRef.current;
    if (!group) return;

    while (group.children.length > 0) {
      const child = group.children[0];
      disposeObject(child);
      group.remove(child);
    }

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
