import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Suspense } from "react";

import { Html } from "@react-three/drei";
import { Scene } from "./Scene/Scene";
import TextHero from "./Scene/text";
import GradientPlane2 from "./Scene/GradentPlane2";
import Loading from "../Loading";

function InsideCanvas() {
	return (
		<>
			<Scene />
			<TextHero />
			<GradientPlane2 />
			<ambientLight intensity={1} />
			<directionalLight
				position={[0.0, -5.0, 0]}
				intensity={14}
				shadow-radius={5}
				castShadow
				shadow-mapSize-width={2048}
				shadow-mapSize-height={2048}
			/>
		</>
	);
}

function HeroAnimationContainer() {
	return (
		<div
			style={{
				height: "100vh",
				width: "100vw",
				background: "black",
				zIndex: 1001,
			}}
		>
			<Suspense fallback={<Loading />}>
				<Canvas
					linear
					shadows
					camera={{ position: [0, 0, 20] }}
					onCreated={({ gl }) => {
						gl.shadowMap.enabled = true;
						gl.shadowMap.type = THREE.PCFSoftShadowMap;
					}}
					gl={{
						powerPreference: "high-performance",
						alpha: false,
						antialias: false,
						stencil: false,
					}}
				>
					<InsideCanvas />
				</Canvas>
			</Suspense>
		</div>
	);
}

export default HeroAnimationContainer;
