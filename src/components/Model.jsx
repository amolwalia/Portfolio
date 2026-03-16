import {
  Center,
  Clone,
  MeshTransmissionMaterial,
  PresentationControls,
  Text,
  useGLTF,
} from "@react-three/drei";
import { useTheme } from "next-themes@0.4.6";

export default function Model() {
  const { scene } = useGLTF("/AW-glass.glb");
  const { resolvedTheme } = useTheme();
  const materialProps = {
    thickness: 0.2,
    roughness: 0,
    transmission: 1,
    ior: 1.2,
    chromaticAberration: 0.02,
    backside: true,
  };

  return (
    <group>
      <Text
        font="/AkiraExpanded.otf"
        position={[0, 0, -0.42]}
        fontSize={0.3}
        color={resolvedTheme === "light" ? "black" : "white"}
        anchorX="center"
        anchorY="middle"
      >
        Amol Walia
      </Text>
      <PresentationControls
        global={false}
        cursor
        speed={1}
      >
        <group
          rotation={[1.5, 0.07, 0.1]}
          position={[0, 0, 0]}
          scale={0.15}
        >
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
