import { Suspense, useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, Center } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
} from "@react-three/postprocessing";
import {
  ACESFilmicToneMapping,
  AdditiveBlending,
  Box3,
  EquirectangularReflectionMapping,
  MathUtils,
  Mesh,
  MeshPhysicalMaterial,
  PMREMGenerator,
  SRGBColorSpace,
  Vector3,
} from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader.js";

const SHOW_HELPERS = false;
const ENV_ROTATION_Y = 30;

function EnvironmentMap() {
  const texture = useLoader(EXRLoader, "/studio_small_09_4k.exr");
  const { gl, scene } = useThree();

  useLayoutEffect(() => {
    texture.mapping = EquirectangularReflectionMapping;
    texture.center.set(0.5, 0.5);
    texture.rotation = MathUtils.degToRad(ENV_ROTATION_Y);

    const pmrem = new PMREMGenerator(gl);
    const envMap = pmrem.fromEquirectangular(texture).texture;
    scene.environment = envMap;

    return () => {
      scene.environment = null;
      envMap.dispose();
      pmrem.dispose();
    };
  }, [gl, scene, texture]);

  return null;
}

function GlassModel() {
  const model = useLoader(FBXLoader, "/AW-glass.fbx");
  const groupRef = useRef(null);
  const { camera } = useThree();
  const materials = useMemo(() => {
    const base = new MeshPhysicalMaterial({
      color: 16777215,
      metalness: 0,
      roughness: 0.02,
      transmission: 1,
      transparent: true,
      opacity: 0.001,
      thickness: 2,
      ior: 1.6,
      clearcoat: 0.2,
      clearcoatRoughness: 0.2,
      specularIntensity: 0.9,
      envMapIntensity: 2.6,
      attenuationColor: 0xffffff,
      attenuationDistance: 4,
    });
    base.dispersion = 1;
    base.reflectivity = 0.85;
    base.depthWrite = false;

    const makeColorLayer = (color, ior) => {
      const layer = new MeshPhysicalMaterial({
        color,
        metalness: 0,
        roughness: 0.02,
        transmission: 1,
        transparent: true,
        opacity: 0.03,
        thickness: 1.6,
        ior,
        clearcoat: 0.15,
        clearcoatRoughness: 0.25,
        specularIntensity: 0.8,
        envMapIntensity: 3,
        attenuationColor: color,
        attenuationDistance: 5,
      });
      layer.dispersion = 1.2;
      layer.depthWrite = false;
      layer.blending = AdditiveBlending;
      return layer;
    };

    return {
      base,
      red: makeColorLayer(0xff3a3a, 1.42),
      green: makeColorLayer(0x39ff85, 1.46),
      blue: makeColorLayer(0x3a6bff, 1.5),
    };
  }, []);

  useLayoutEffect(() => {
    const bounds = new Box3().setFromObject(model);
    const size = new Vector3();
    const center = new Vector3();
    bounds.getSize(size);
    bounds.getCenter(center);

    if (groupRef.current) {
      groupRef.current.position.set(-center.x, -center.y, -center.z);
      groupRef.current.rotation.set(1.17, 0.02, -0.125);
    }

    const maxDim = Math.max(size.x, size.y, size.z);
    const normalizedScale =
      Number.isFinite(maxDim) && maxDim > 0 ? 1 / maxDim : 1;
    const clampedScale = Math.min(Math.max(normalizedScale, 0.01), 100);
    const finalScale = clampedScale * 0.6;
    if (groupRef.current) {
      groupRef.current.scale.setScalar(finalScale);
    }
  }, [model]);

  const baseModel = useMemo(() => model.clone(true), [model]);
  const redModel = useMemo(() => model.clone(true), [model]);
  const greenModel = useMemo(() => model.clone(true), [model]);
  const blueModel = useMemo(() => model.clone(true), [model]);

  useLayoutEffect(() => {
    const applyMaterial = (target, material, castShadow) => {
      target.traverse((child) => {
        if (child instanceof Mesh) {
          child.material = material;
          child.castShadow = castShadow;
          child.receiveShadow = false;
        }
      });
    };

    applyMaterial(baseModel, materials.base, true);
    applyMaterial(redModel, materials.red, false);
    applyMaterial(greenModel, materials.green, false);
    applyMaterial(blueModel, materials.blue, false);
  }, [baseModel, redModel, greenModel, blueModel, materials]);

  useLayoutEffect(() => {
    const target = groupRef.current;
    if (!target) return;
    const bounds = new Box3().setFromObject(target);
    const size = new Vector3();
    bounds.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const distance = Number.isFinite(maxDim) && maxDim > 0 ? maxDim * 3.6 : 3.6;
    camera.position.set(0, maxDim * 0.25, distance);
    camera.near = Math.max(distance / 100, 0.01);
    camera.far = Math.max(distance * 100, 1000);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [camera, model]);

  return (
    <group ref={groupRef}>
      <primitive object={baseModel} />
      <group scale={1.006}>
        <primitive object={redModel} />
      </group>
      <group scale={1.008}>
        <primitive object={greenModel} />
      </group>
      <group scale={1.01}>
        <primitive object={blueModel} />
      </group>
    </group>
  );
}

function CanModel() {
  const gltf = useLoader(GLTFLoader, "/SMH-can.glb");
  const model = useMemo(() => gltf.scene, [gltf]);
  const groupRef = useRef(null);
  const { camera } = useThree();

  useLayoutEffect(() => {
    const bounds = new Box3().setFromObject(model);
    const size = new Vector3();
    const center = new Vector3();
    bounds.getSize(size);
    bounds.getCenter(center);

    if (groupRef.current) {
      groupRef.current.position.set(-center.x, -center.y, -center.z);
      groupRef.current.rotation.set(0.15, -0.5, 0.05);
    }

    const maxDim = Math.max(size.x, size.y, size.z);
    const normalizedScale =
      Number.isFinite(maxDim) && maxDim > 0 ? 1 / maxDim : 1;
    const clampedScale = Math.min(Math.max(normalizedScale, 0.01), 100);
    const finalScale = clampedScale * 0.9;
    if (groupRef.current) {
      groupRef.current.scale.setScalar(finalScale);
    }
  }, [model]);

  useLayoutEffect(() => {
    model.traverse((child) => {
      if (child instanceof Mesh) {
        child.castShadow = true;
        child.receiveShadow = false;
        if (child.material) {
          child.material.needsUpdate = true;
        }
      }
    });
  }, [model]);

  useLayoutEffect(() => {
    const target = groupRef.current;
    if (!target) return;
    const bounds = new Box3().setFromObject(target);
    const size = new Vector3();
    bounds.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const distance = Number.isFinite(maxDim) && maxDim > 0 ? maxDim * 3.1 : 3;
    camera.position.set(0, maxDim * 0.15, distance);
    camera.near = Math.max(distance / 100, 0.01);
    camera.far = Math.max(distance * 100, 1000);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [camera, model]);

  return (
    <group ref={groupRef}>
      <primitive object={model} />
    </group>
  );
}

function ThreeDPage() {
  return (
    <section className="min-h-screen py-32 px-8 relative">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1
            className="text-5xl md:text-7xl mb-4 uppercase tracking-wider"
            style={{
              fontFamily: "Akira Expanded, sans-serif",
              fontWeight: 800,
            }}
          >
            3D Exploration
          </h1>
          <p
            className="text-xl text-neutral-400 max-w-2xl"
            style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 300 }}
          >
            Click and drag to rotate the glass form in full 360 degrees. Scroll
            to zoom.
          </p>
        </div>
        <div
          className="w-full"
          style={{ position: "relative", height: "90vh", minHeight: "720px" }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(120% 120% at 30% 10%, rgba(120, 200, 255, 0.18) 0%, rgba(10, 20, 30, 0.35) 45%, rgba(0, 0, 0, 0.9) 100%)",
              borderRadius: "24px",
              zIndex: 0,
            }}
          />
          <Canvas
            dpr={[1, 2]}
            camera={{ fov: 45, position: [0, 0.35, 2.6], near: 0.1, far: 1000 }}
            gl={{ antialias: true, alpha: true }}
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              height: "100%",
            }}
            onCreated={({ gl }) => {
              gl.setClearColor(0, 0);
              gl.outputColorSpace = SRGBColorSpace;
              gl.toneMapping = ACESFilmicToneMapping;
              gl.toneMappingExposure = 1.15;
              gl.physicallyCorrectLights = true;
            }}
          >
            <ambientLight intensity={0.7} />
            <directionalLight intensity={0.9} position={[4, 6, 8]} />
            <directionalLight
              intensity={0.6}
              position={[-6, 3, -4]}
              color={0x99b9ff}
            />
            <Suspense fallback={null}>
              <Center>
                <GlassModel />
              </Center>
            </Suspense>
            <EnvironmentMap />
            {SHOW_HELPERS && (
              <gridHelper args={[5, 10, "#3f3f46", "#27272a"]} />
            )}
            {SHOW_HELPERS && <axesHelper args={[1.5]} />}
            <EffectComposer multisampling={4}>
              <ChromaticAberration offset={[0.002, 0.0085]} radialModulation />
              <Bloom
                luminanceThreshold={0.12}
                luminanceSmoothing={0.2}
                intensity={0.45}
              />
            </EffectComposer>
            <OrbitControls
              enableDamping
              enablePan={false}
              enableZoom
              minDistance={1.5}
              maxDistance={12}
              rotateSpeed={0.85}
            />
          </Canvas>
        </div>
        <div className="mt-20 mb-10">
          <h2
            className="text-3xl md:text-5xl mb-3 uppercase tracking-wider"
            style={{
              fontFamily: "Akira Expanded, sans-serif",
              fontWeight: 800,
            }}
          >
            Smash Cocktail Can
          </h2>
          <p
            className="text-lg text-neutral-400 max-w-2xl"
            style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 300 }}
          >
            A metallic cocktail can modelled in Blender. Drag to spin it and use
            the scroll wheel to zoom.
          </p>
        </div>
        <div
          className="w-full"
          style={{ position: "relative", height: "85vh", minHeight: "680px" }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(120% 120% at 70% 5%, rgba(255, 216, 160, 0.2) 0%, rgba(28, 20, 12, 0.5) 40%, rgba(0, 0, 0, 0.92) 100%)",
              borderRadius: "24px",
              zIndex: 0,
            }}
          />
          <Canvas
            dpr={[1, 2]}
            camera={{ fov: 40, position: [0, 0.2, 2.4], near: 0.1, far: 1000 }}
            gl={{ antialias: true, alpha: true }}
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              height: "100%",
            }}
            onCreated={({ gl }) => {
              gl.setClearColor(0, 0);
              gl.outputColorSpace = SRGBColorSpace;
              gl.toneMapping = ACESFilmicToneMapping;
              gl.toneMappingExposure = 1.05;
              gl.physicallyCorrectLights = true;
            }}
          >
            <ambientLight intensity={0.6} />
            <directionalLight intensity={1} position={[4, 5, 6]} />
            <directionalLight
              intensity={0.5}
              position={[-5, 2, -3]}
              color={0xffd8a0}
            />
            <Suspense fallback={null}>
              <Center>
                <CanModel />
              </Center>
            </Suspense>
            <EnvironmentMap />
            {SHOW_HELPERS && (
              <gridHelper args={[5, 10, "#3f3f46", "#27272a"]} />
            )}
            {SHOW_HELPERS && <axesHelper args={[1.5]} />}
            <EffectComposer multisampling={4}>
              <ChromaticAberration offset={[0.0015, 0.006]} radialModulation />
              <Bloom
                luminanceThreshold={0.1}
                luminanceSmoothing={0.22}
                intensity={0.4}
              />
            </EffectComposer>
            <OrbitControls
              enableDamping
              enablePan={false}
              enableZoom
              minDistance={1.2}
              maxDistance={10}
              rotateSpeed={0.85}
            />
          </Canvas>
        </div>
      </div>
    </section>
  );
}

export { ThreeDPage };
