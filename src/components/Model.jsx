import {
  Center,
  Clone,
  Html,
  MeshTransmissionMaterial,
  PresentationControls,
  Text,
  useGLTF,
} from "@react-three/drei";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const HINT_VISIBLE_MS = 1500;

export default function Model() {
  const { scene } = useGLTF("/AW-glass.glb");
  const [showHint, setShowHint] = useState(true);
  const materialProps = {
    thickness: 1,
    roughness: 0.1,
    transmission: 1,
    ior: 1.14,
    chromaticAberration: 0.04,
    backside: true,
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setShowHint(false);
    }, HINT_VISIBLE_MS);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <group>
      <Text
        font="/AkiraExpanded.otf"
        position={[0, 0, -0.42]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Amol Walia
      </Text>
      <Html
        position={[0, 0.1, 0.2]}
        center
        transform={false}
        sprite
        style={{ pointerEvents: "none" }}
      >
        <AnimatePresence>
          {showHint ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{
                width: "min(240px, 42vw)",
                filter:
                  "drop-shadow(0 12px 18px rgba(0, 0, 0, 5)) drop-shadow(0 24px 40px rgba(0, 0, 0, 5))",
              }}
            >
              <img
                src="/3dhint.png"
                alt="Drag to interact with the 3D model"
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  userSelect: "none",
                  WebkitUserDrag: "none",
                }}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Html>
      <PresentationControls global={false} cursor speed={1}>
        <group rotation={[1.5, 0.07, 0.1]} position={[0, 0, 0]} scale={0.15}>
          <Center>
            <Clone
              object={scene}
              inject={<MeshTransmissionMaterial {...materialProps} />}
            />
          </Center>
        </group>
      </PresentationControls>
    </group>
  );
}

useGLTF.preload("/AW-glass.glb");
