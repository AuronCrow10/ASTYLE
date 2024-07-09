import * as THREE from "three";
import { useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import {
	Icosahedron,
	useTexture,
	useCubeTexture,
	MeshDistortMaterial,
} from "@react-three/drei";

function MainSphere({ material }) {
	const main = useRef();
	const { camera } = useThree();
	const { getCurrentViewport } = useThree((state) => state.viewport);
	const { width } = getCurrentViewport(camera, [0, 0, -0.5]);

	return (
		<Icosahedron
			args={[1, 30]}
			ref={main}
			material={material}
			position={[0, width > 50 ? +width / 4 + 2 : 50 / 4 + 2, -3.5]}
			castShadow
			receiveShadow
		/>
	);
}

export function Scene() {
	const bumpMap = useTexture("/bump.jpg");
	const envMap = useCubeTexture(
		["n.png", "n.png", "n.png", "n.png", "n.png", "n.png"],
		{ path: "/cube/" }
	);
	const [material, set] = useState();
	const { camera } = useThree();
	const { getCurrentViewport } = useThree((state) => state.viewport);
	const { width } = getCurrentViewport(camera, [0, 0, -1.5]);

	const isMobile = () => {
		return window.innerWidth <= 768;
	};
	const radius = isMobile() ? width / 1.3 : width / 2;
	const maxRadius = 23;
	const finalRadius = radius > maxRadius ? maxRadius : radius;
	return (
		<>
			<MeshDistortMaterial
				ref={set}
				envMap={envMap}
				bumpMap={bumpMap}
				color={"#000000"}
				roughness={1}
				metalness={2}
				bumpScale={0.005}
				clearcoat={1}
				clearcoatRoughness={1}
				radius={finalRadius}
				distort={0.2}
			/>
			{material && <MainSphere material={material} />}
		</>
	);
}
