import { jsx } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  DirectionalLight,
  PointLight,
  TorusKnotGeometry,
  IcosahedronGeometry,
  BoxGeometry,
  TorusGeometry,
  MeshStandardMaterial,
  MeshPhysicalMaterial,
  Mesh,
  BufferGeometry,
  BufferAttribute,
  PointsMaterial,
  Points,
  AdditiveBlending,
  Clock
} from "three";
function Scene3D() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationRef = useRef();
  useEffect(() => {
    if (!containerRef.current) return;
    const scene = new Scene();
    sceneRef.current = scene;
    const camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1e3
    );
    camera.position.z = 8;
    const renderer = new WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    const ambientLight = new AmbientLight(16777215, 0.5);
    scene.add(ambientLight);
    const directionalLight1 = new DirectionalLight(65535, 1);
    directionalLight1.position.set(5, 5, 5);
    scene.add(directionalLight1);
    const directionalLight2 = new DirectionalLight(16711935, 0.8);
    directionalLight2.position.set(-5, -5, -5);
    scene.add(directionalLight2);
    const pointLight = new PointLight(16777215, 1, 100);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);
    const mainGeometry = new TorusKnotGeometry(2, 0.5, 128, 32);
    const sphereGeometry = new IcosahedronGeometry(1.5, 1);
    const cubeGeometry = new BoxGeometry(2, 2, 2);
    const torusGeometry = new TorusGeometry(2, 0.6, 32, 100);
    const mainMaterial = new MeshStandardMaterial({
      color: 16777215,
      wireframe: true,
      emissive: 65535,
      emissiveIntensity: 0.2
    });
    const glassMaterial = new MeshPhysicalMaterial({
      color: 16777215,
      metalness: 0.2,
      roughness: 0.1,
      transmission: 0.9,
      thickness: 0.5
    });
    const metallicMaterial = new MeshStandardMaterial({
      color: 16777215,
      metalness: 0.9,
      roughness: 0.1,
      wireframe: false
    });
    const mainShape = new Mesh(mainGeometry, mainMaterial);
    mainShape.position.set(0, 0, 0);
    scene.add(mainShape);
    const sphere = new Mesh(sphereGeometry, glassMaterial);
    sphere.position.set(4, 2, -2);
    scene.add(sphere);
    const cube = new Mesh(cubeGeometry, metallicMaterial);
    cube.position.set(-4, -2, -2);
    scene.add(cube);
    const torus = new Mesh(torusGeometry, mainMaterial);
    torus.position.set(0, 0, -4);
    scene.add(torus);
    const particlesGeometry = new BufferGeometry();
    const particleCount = 2e3;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 30;
    }
    particlesGeometry.setAttribute("position", new BufferAttribute(positions, 3));
    const particlesMaterial = new PointsMaterial({
      color: 16777215,
      size: 0.02,
      transparent: true,
      opacity: 0.6,
      blending: AdditiveBlending
    });
    const particles = new Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const handleMouseMove = (event) => {
      mouseX = event.clientX / window.innerWidth * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    const clock = new Clock();
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      mainShape.rotation.x = elapsedTime * 0.2;
      mainShape.rotation.y = elapsedTime * 0.3;
      mainShape.rotation.z = elapsedTime * 0.1;
      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.015;
      sphere.position.y = 2 + Math.sin(elapsedTime) * 0.5;
      cube.rotation.x += 0.015;
      cube.rotation.y += 0.01;
      cube.rotation.z += 5e-3;
      cube.position.y = -2 + Math.cos(elapsedTime * 1.2) * 0.5;
      torus.rotation.x += 3e-3;
      torus.rotation.y += 5e-3;
      particles.rotation.y = elapsedTime * 0.05;
      particles.rotation.x = elapsedTime * 0.02;
      targetX = mouseX * 2;
      targetY = mouseY * 2;
      mainShape.rotation.y += (targetX - mainShape.rotation.y) * 0.05;
      mainShape.rotation.x += (targetY - mainShape.rotation.x) * 0.05;
      sphere.position.x = 4 + targetX * 0.3;
      cube.position.x = -4 - targetX * 0.3;
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
      camera.position.y = -(scrollY * 2e-3);
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };
    animate();
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      renderer.dispose();
      mainGeometry.dispose();
      sphereGeometry.dispose();
      cubeGeometry.dispose();
      torusGeometry.dispose();
      particlesGeometry.dispose();
      mainMaterial.dispose();
      glassMaterial.dispose();
      metallicMaterial.dispose();
      particlesMaterial.dispose();
    };
  }, []);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: containerRef,
      className: "fixed inset-0 z-0 pointer-events-none",
      style: { opacity: 0.85 }
    }
  );
}
export {
  Scene3D
};
