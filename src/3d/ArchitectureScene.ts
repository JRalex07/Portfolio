import * as THREE from 'three';

export interface ArchitectureSceneOptions {
  container: HTMLElement;
  isMobile: boolean;
  reducedMotion: boolean;
}

export class ArchitectureScene {
  private container: HTMLElement;
  private isMobile: boolean;
  private reducedMotion: boolean;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private animFrameId: number | null = null;
  private isRunning: boolean = false;

  private nodesGroup!: THREE.Group;
  private conduitsGroup!: THREE.Group;
  private gimbalRingsGroup!: THREE.Group;
  private dataShardsGroup!: THREE.Group;
  private signalParticles!: THREE.Points;
  private signalPositions!: Float32Array;
  private signalVelocities!: Float32Array;
  private particleCount: number = 50;

  // Floating nodes storage
  private nodeMeshes: { mesh: THREE.Mesh; basePos: THREE.Vector3; speed: number; phase: number }[] = [];

  // Interaction targets
  private targetMouseX: number = 0;
  private targetMouseY: number = 0;
  private currentMouseX: number = 0;
  private currentMouseY: number = 0;

  // Scroll targets for camera choreography
  private scrollProgress: number = 0;
  private currentScrollProgress: number = 0;

  // Bound event handlers
  private onMouseMoveBound: (e: MouseEvent) => void;
  private onScrollBound: () => void;
  private onResizeBound: () => void;

  constructor(options: ArchitectureSceneOptions) {
    this.container = options.container;
    this.isMobile = options.isMobile;
    this.reducedMotion = options.reducedMotion;

    this.onMouseMoveBound = this.onMouseMove.bind(this);
    this.onScrollBound = this.onScroll.bind(this);
    this.onResizeBound = this.onResize.bind(this);

    this.init();
  }

  private init(): void {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    // 1. Scene with Light Theme Fog
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0xF7F5F0, 0.02);

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(52, width / height, 0.1, 120);
    this.camera.position.set(0, 5, 20);
    this.camera.lookAt(0, 0, 0);

    // 3. Renderer with high performance & smooth alpha
    this.renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: !this.isMobile,
      alpha: true
    });

    const dpr = this.isMobile ? 1.0 : Math.min(window.devicePixelRatio || 1, 1.75);
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x000000, 0);
    this.container.appendChild(this.renderer.domElement);

    // 4. Build Layers for Neobrutalist Light Theme
    this.buildTopology();
    this.buildGimbalRings();
    this.buildFloatingDataShards();
    this.buildSignalPulses();

    // 5. Event Listeners
    if (!this.reducedMotion) {
      window.addEventListener('mousemove', this.onMouseMoveBound, { passive: true });
      window.addEventListener('scroll', this.onScrollBound, { passive: true });
    }
    window.addEventListener('resize', this.onResizeBound, { passive: true });

    // Initial render
    this.renderer.render(this.scene, this.camera);
  }

  private buildTopology(): void {
    this.nodesGroup = new THREE.Group();
    this.conduitsGroup = new THREE.Group();

    // Node coordinates representing Gateway, Event Broker, Services, and Storage
    const nodeConfigs = [
      { pos: new THREE.Vector3(0, 1.8, 0), isCore: true, color: 0x000000 },     // Central Event Broker Core (Bold Black Wireframe)
      { pos: new THREE.Vector3(-6, 3.2, -2), isCore: false, color: 0x008765 },  // Consumer Gateway (Himamrit Teal)
      { pos: new THREE.Vector3(6, 3.2, -2), isCore: false, color: 0x0284C7 },   // Info Portal Gateway (Blue)
      { pos: new THREE.Vector3(-4.5, -1.8, 2.5), isCore: false, color: 0xD97706 }, // Merchant Service (Amber)
      { pos: new THREE.Vector3(0, -3.2, 3.5), isCore: false, color: 0x000000 },    // Admin Governance (Black)
      { pos: new THREE.Vector3(4.5, -1.8, 2.5), isCore: false, color: 0xE11D48 },  // Logistics Dispatch (Coral/Rose)
      { pos: new THREE.Vector3(-8, -0.5, -4), isCore: false, color: 0x7C3AED },   // MCP Agent Sandbox (Purple)
      { pos: new THREE.Vector3(8, -0.5, -4), isCore: false, color: 0x2563EB },    // Telemetry Pipeline (Blue)
    ];

    nodeConfigs.forEach((cfg, idx) => {
      const radius = cfg.isCore ? 1.1 : 0.65;
      const geom = cfg.isCore
        ? new THREE.OctahedronGeometry(radius, 1)
        : new THREE.IcosahedronGeometry(radius, 0);

      const mat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        wireframe: true,
        transparent: true,
        opacity: cfg.isCore ? 0.95 : 0.8
      });

      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.copy(cfg.pos);
      this.nodesGroup.add(mesh);

      this.nodeMeshes.push({
        mesh,
        basePos: cfg.pos.clone(),
        speed: 1.2 + idx * 0.25,
        phase: idx * 0.8
      });
    });

    // Create High-Contrast Data Conduits
    const conduitGeometry = new THREE.BufferGeometry();
    const linePoints: THREE.Vector3[] = [];

    // Connect core to peripherals
    for (let i = 1; i < nodeConfigs.length; i++) {
      linePoints.push(nodeConfigs[0].pos, nodeConfigs[i].pos);
    }

    // Connect operational cycles
    linePoints.push(nodeConfigs[1].pos, nodeConfigs[6].pos);
    linePoints.push(nodeConfigs[2].pos, nodeConfigs[7].pos);
    linePoints.push(nodeConfigs[3].pos, nodeConfigs[4].pos);
    linePoints.push(nodeConfigs[4].pos, nodeConfigs[5].pos);
    linePoints.push(nodeConfigs[5].pos, nodeConfigs[0].pos);

    // Ground Plane Architecture Grid for Light Theme
    const gridSize = 24;
    const gridStep = 3;
    const gridY = -4.5;

    for (let x = -gridSize; x <= gridSize; x += gridStep) {
      linePoints.push(new THREE.Vector3(x, gridY, -gridSize), new THREE.Vector3(x, gridY, gridSize));
    }
    for (let z = -gridSize; z <= gridSize; z += gridStep) {
      linePoints.push(new THREE.Vector3(-gridSize, gridY, z), new THREE.Vector3(gridSize, gridY, z));
    }

    conduitGeometry.setFromPoints(linePoints);
    const conduitMaterial = new THREE.LineBasicMaterial({
      color: 0x94A3B8,
      transparent: true,
      opacity: 0.4
    });

    const conduits = new THREE.LineSegments(conduitGeometry, conduitMaterial);
    this.conduitsGroup.add(conduits);

    this.scene.add(this.nodesGroup);
    this.scene.add(this.conduitsGroup);
  }

  private buildGimbalRings(): void {
    this.gimbalRingsGroup = new THREE.Group();

    // 3 concentric neobrutalist rings
    const ringRadii = [1.8, 2.4, 3.0];
    const ringColors = [0x000000, 0x008765, 0xD97706];

    ringRadii.forEach((radius, i) => {
      const ringGeom = new THREE.BufferGeometry();
      const segments = 64;
      const points: THREE.Vector3[] = [];

      for (let s = 0; s <= segments; s++) {
        const theta = (s / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
      }

      ringGeom.setFromPoints(points);
      const ringMat = new THREE.LineBasicMaterial({
        color: ringColors[i],
        transparent: true,
        opacity: 0.45 - i * 0.08
      });

      const ringMesh = new THREE.Line(ringGeom, ringMat);
      ringMesh.rotation.x = Math.PI / (3 + i);
      ringMesh.rotation.z = Math.PI / (4 + i);
      this.gimbalRingsGroup.add(ringMesh);
    });

    this.gimbalRingsGroup.position.set(0, 1.8, 0);
    this.scene.add(this.gimbalRingsGroup);
  }

  private buildFloatingDataShards(): void {
    this.dataShardsGroup = new THREE.Group();
    const shardCount = this.isMobile ? 8 : 16;

    const shardGeom = new THREE.TetrahedronGeometry(0.3, 0);
    const shardMat = new THREE.MeshBasicMaterial({
      color: 0x64748B,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });

    for (let i = 0; i < shardCount; i++) {
      const mesh = new THREE.Mesh(shardGeom, shardMat);
      mesh.position.set(
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 12
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      this.dataShardsGroup.add(mesh);
    }

    this.scene.add(this.dataShardsGroup);
  }

  private buildSignalPulses(): void {
    if (this.isMobile) {
      this.particleCount = 20;
    }

    this.signalPositions = new Float32Array(this.particleCount * 3);
    this.signalVelocities = new Float32Array(this.particleCount * 3);

    for (let i = 0; i < this.particleCount; i++) {
      const idx = i * 3;
      this.signalPositions[idx] = (Math.random() - 0.5) * 14;
      this.signalPositions[idx + 1] = (Math.random() - 0.5) * 8;
      this.signalPositions[idx + 2] = (Math.random() - 0.5) * 10;

      this.signalVelocities[idx] = (Math.random() - 0.5) * 0.02;
      this.signalVelocities[idx + 1] = (Math.random() - 0.5) * 0.015;
      this.signalVelocities[idx + 2] = (Math.random() - 0.5) * 0.02;
    }

    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute('position', new THREE.BufferAttribute(this.signalPositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x008765,
      size: this.isMobile ? 0.16 : 0.22,
      transparent: true,
      opacity: 0.85
    });

    this.signalParticles = new THREE.Points(particleGeom, particleMaterial);
    this.scene.add(this.signalParticles);
  }

  private onMouseMove(e: MouseEvent): void {
    const halfWidth = window.innerWidth / 2;
    const halfHeight = window.innerHeight / 2;
    this.targetMouseX = (e.clientX - halfWidth) / halfWidth;
    this.targetMouseY = (e.clientY - halfHeight) / halfHeight;
  }

  private onScroll(): void {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      this.scrollProgress = window.scrollY / docHeight;
    }
  }

  public onResize(): void {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  public start(): void {
    if (this.isRunning) return;
    this.isRunning = true;

    if (this.reducedMotion) {
      this.renderer.render(this.scene, this.camera);
      return;
    }

    let clock = new THREE.Clock();

    const tick = () => {
      if (!this.isRunning) return;
      const elapsedTime = clock.getElapsedTime();

      // 1. Mouse Parallax Lerp
      this.currentMouseX += (this.targetMouseX - this.currentMouseX) * 0.04;
      this.currentMouseY += (this.targetMouseY - this.currentMouseY) * 0.04;

      // 2. Scroll Progress Lerp
      this.currentScrollProgress += (this.scrollProgress - this.currentScrollProgress) * 0.05;

      // 3. Camera Position Smooth Glide
      const scrollAngle = this.currentScrollProgress * Math.PI * 0.75;
      const camRadius = 20 - this.currentScrollProgress * 3;

      this.camera.position.x = Math.sin(scrollAngle) * 5 + this.currentMouseX * 1.8;
      this.camera.position.y = 5 - this.currentScrollProgress * 4 + -this.currentMouseY * 1.4;
      this.camera.position.z = Math.cos(scrollAngle) * camRadius + 4;
      this.camera.lookAt(0, 0.5 - this.currentScrollProgress * 1.5, 0);

      // 4. Subtle sinusoidal node float
      this.nodeMeshes.forEach((item) => {
        const floatOffset = Math.sin(elapsedTime * item.speed + item.phase) * 0.12;
        item.mesh.position.y = item.basePos.y + floatOffset;
        item.mesh.rotation.y += 0.003;
        item.mesh.rotation.x += 0.0015;
      });

      // 5. Gimbal rings counter-rotation
      if (this.gimbalRingsGroup) {
        this.gimbalRingsGroup.children.forEach((child, i) => {
          child.rotation.y += (i % 2 === 0 ? 1 : -1) * 0.003 * (i + 1);
          child.rotation.z += 0.0015;
        });
      }

      // 6. Slowly rotate floating data shards
      if (this.dataShardsGroup) {
        this.dataShardsGroup.rotation.y -= 0.0008;
      }

      // 7. Update signal pulses
      if (this.signalPositions) {
        for (let i = 0; i < this.particleCount; i++) {
          const idx = i * 3;
          this.signalPositions[idx] += this.signalVelocities[idx];
          this.signalPositions[idx + 1] += this.signalVelocities[idx + 1];
          this.signalPositions[idx + 2] += this.signalVelocities[idx + 2];

          // Boundary bounce
          if (Math.abs(this.signalPositions[idx]) > 8) this.signalVelocities[idx] *= -1;
          if (Math.abs(this.signalPositions[idx + 1]) > 5) this.signalVelocities[idx + 1] *= -1;
          if (Math.abs(this.signalPositions[idx + 2]) > 6) this.signalVelocities[idx + 2] *= -1;
        }
        this.signalParticles.geometry.attributes.position.needsUpdate = true;
      }

      this.renderer.render(this.scene, this.camera);
      this.animFrameId = requestAnimationFrame(tick);
    };

    this.animFrameId = requestAnimationFrame(tick);
  }

  public pause(): void {
    this.isRunning = false;
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  public dispose(): void {
    this.pause();

    window.removeEventListener('mousemove', this.onMouseMoveBound);
    window.removeEventListener('scroll', this.onScrollBound);
    window.removeEventListener('resize', this.onResizeBound);

    this.scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh || obj instanceof THREE.LineSegments || obj instanceof THREE.Points || obj instanceof THREE.Line) {
        if (obj.geometry) {
          obj.geometry.dispose();
        }
        if (Array.isArray(obj.material)) {
          obj.material.forEach((mat) => mat.dispose());
        } else if (obj.material) {
          obj.material.dispose();
        }
      }
    });

    if (this.renderer) {
      this.renderer.dispose();
      if (this.renderer.domElement && this.renderer.domElement.parentElement) {
        this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
      }
    }
  }
}
