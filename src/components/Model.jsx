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
const MODEL_PATH = "/AW-glass.glb";
const HINT_IMAGE_PATH = "/3dhint.png";

const GLASS_MATERIAL_PROPS = {
  thickness: 1,
  roughness: 0.1,
  transmission: 1,
  ior: 1.14,
  chromaticAberration: 0.04,
  backside: true,
};

const MODEL_TRANSFORM = {
  rotation: [1.5, 0.07, 0.1],
  position: [0, 0, 0],
  scale: 0.15,
};

const HTML_OVERLAY_STYLE = {
  pointerEvents: "none",
};

const HINT_WRAPPER_STYLE = {
  width: "min(240px, 42vw)",
  filter:
    "drop-shadow(0 12px 18px rgba(0, 0, 0, 5)) drop-shadow(0 24px 40px rgba(0, 0, 0, 5))",
};

const HINT_IMAGE_STYLE = {
  display: "block",
  width: "100%",
  height: "auto",
  userSelect: "none",
  WebkitUserDrag: "none",
};

export default function Model() {
  const { scene } = useGLTF(MODEL_PATH);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    // Show the drag hint briefly on first render, then fade it out.
    const timeoutId = window.setTimeout(() => {
      setShowHint(false);
    }, HINT_VISIBLE_MS);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <group>
      {/* Place the title behind the model so the glass object remains the focal point. */}
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

      {/* Use an HTML overlay so the interaction hint stays crisp and easy to read. */}
      <Html
        position={[0, 0.1, 0.2]}
        center
        transform={false}
        sprite
        style={HTML_OVERLAY_STYLE}
      >
        <AnimatePresence>
          {showHint ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={HINT_WRAPPER_STYLE}
            >
              <img
                src={HINT_IMAGE_PATH}
                alt="Drag to interact with the 3D model"
                style={HINT_IMAGE_STYLE}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Html>

      {/* PresentationControls provides the drag-to-rotate interaction. */}
      <PresentationControls global={false} cursor speed={1}>
        <group {...MODEL_TRANSFORM}>
          <Center>
            <Clone
              object={scene}
              inject={<MeshTransmissionMaterial {...GLASS_MATERIAL_PROPS} />}
            />
          </Center>
        </group>
      </PresentationControls>
    </group>
  );
}

useGLTF.preload(MODEL_PATH);
