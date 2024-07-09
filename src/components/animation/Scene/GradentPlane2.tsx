import React, { useEffect, useRef } from "react";
import { extend, useFrame, useThree } from "@react-three/fiber";
import {
	BufferGeometry,
	Material,
	Mesh,
	NormalBufferAttributes,
	Object3DEventMap,
	ShaderMaterial,
	ShaderMaterialParameters,
	Vector2,
} from "three";
import { shaderMaterial } from "@react-three/drei";

const vertexShaderBottom = `
  varying vec2 vUv; 
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShaderBottom = `
varying vec2 vUv;
uniform float uTime;

void main() {
    float gradientPos = vUv.y; 
    vec3 centerColor = vec3(0.878, 0.41, 0.0);  
    vec3 midColor = vec3(1.0, 0.71, 0.0);      
    vec3 edgeColor = vec3(1.0, 0.71, 0.0);     

    float circleDist = distance(vUv, vec2(-0.42, 0.42));
    float circleRadius = 12.0 * 0.1;
    float circleStrength = smoothstep(circleRadius, circleRadius * 0.3, circleDist);
    float circleDist2 = distance(vUv, vec2(1.42, 0.42));
    float circleRadius2 = 12.0 * 0.1;
    float circleStrength2 = smoothstep(circleRadius2, circleRadius2 * 0.3, circleDist2);

    vec3 topColor = vec3(0.8, 0.647, 0.353); 
    vec3 bottomColor = vec3(0.878, 0.71, 0.373); 
    vec3 color = mix(bottomColor, topColor, gradientPos);
    
    float dist = distance(vUv, vec2(0.5, 0.8));
    float brightness = smoothstep(1.0, 0.1, dist); 
    color += brightness * 0.8; 

    float distCenter = distance(vUv, vec2(0.5, 0.5));
    float brightness2 = smoothstep(0.25, 0.7, distCenter); 
    color = mix(centerColor, color, brightness2);

    color = mix(color, vec3(0.0), circleStrength * 1.8); 
    color = mix(color, vec3(0.0), circleStrength2 * 1.8); 

    float xDistance = abs(vUv.x - 0.5); 
    float lightIntensity = smoothstep(0.15, 0.0, xDistance); 
    vec3 lightColor = vec3(1.0);
    color = mix(color, lightColor, lightIntensity * 0.6); 
    float dampening = smoothstep(1.2, 0.0, 1.1 - vUv.y); 
    color = mix(vec3(0.0), color, dampening);

    gl_FragColor = vec4(color, 1.0);
}
`;
const vertexShaderTop = `
  varying vec2 vUv; 
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShaderTop = `
varying vec2 vUv;
uniform float uTime;

void main() {
    float gradientPos = vUv.y; 

    vec3 centerColor = vec3(0.878, 0.41, 0.0); 
    vec3 midColor = vec3(1.0, 0.71, 0.0);      
    vec3 edgeColor = vec3(1.0, 0.71, 0.0);     

    float circleDist = distance(vUv, vec2(-0.47, 0.4));
    float circleRadius = 12.0 * 0.1;
    float circleStrength = smoothstep(circleRadius, circleRadius * 0.3, circleDist);
    float circleDist2 = distance(vUv, vec2(1.47, 0.4));
    float circleRadius2 = 12.0 * 0.1;
    float circleStrength2 = smoothstep(circleRadius2, circleRadius2 * 0.3, circleDist2);

    vec3 topColor = vec3(0.8, 0.647, 0.353); 
    vec3 bottomColor = vec3(0.878, 0.71, 0.373); 
    vec3 color = mix(bottomColor, topColor, gradientPos);
    
    float dist = distance(vUv, vec2(0.5, 0.8));
    float brightness = smoothstep(1.0, 0.1, dist); 
    color += brightness * 0.8; 

    float distCenter = distance(vUv, vec2(0.5, 0.5));
    float brightness2 = smoothstep(0.25, 0.7, distCenter); 
    color = mix(centerColor, color, brightness2);

    color = mix(color, vec3(0.0), circleStrength * 1.8); 
    color = mix(color, vec3(0.0), circleStrength2 * 1.8); 

    float xDistance = abs(vUv.x - 0.5); 
    float lightIntensity = smoothstep(0.15, 0.0, xDistance); 
    vec3 lightColor = vec3(1.0);
    color = mix(color, lightColor, lightIntensity * 0.6); 
    

    gl_FragColor = vec4(color, 1.0);
}
`;
const GradientPlaneComponentTop = ({
	planeRef,
	materialRef,
}: {
	planeRef: React.MutableRefObject<
		Mesh<
			BufferGeometry<NormalBufferAttributes>,
			Material | Material[],
			Object3DEventMap
		>
	>;
	materialRef: React.MutableRefObject<ShaderMaterial>;
}) => {
	const { camera } = useThree();
	const { getCurrentViewport } = useThree((state) => state.viewport);
	const { width, height } = getCurrentViewport(camera, [0, 0, 15]);

	return (
		<>
			<mesh
				ref={planeRef}
				position={[0, -height / 2 + 0.5, 15]}
				castShadow
				receiveShadow
			>
				<planeGeometry args={[width, 0.5]} />
				<shaderMaterial
					ref={materialRef}
					attach="material"
					vertexShader={vertexShaderTop}
					fragmentShader={fragmentShaderTop}
					uniforms={{ uTime: { value: 0 } }}
				/>
			</mesh>
		</>
	);
};
const GradientPlaneComponentBottom = ({
	planeRef,
	materialRef,
}: {
	planeRef: React.MutableRefObject<
		Mesh<
			BufferGeometry<NormalBufferAttributes>,
			Material | Material[],
			Object3DEventMap
		>
	>;
	materialRef: React.MutableRefObject<ShaderMaterial>;
}) => {
	const { camera } = useThree();
	const { getCurrentViewport } = useThree((state) => state.viewport);
	const { width, height } = getCurrentViewport(camera, [0, 0, 15]);

	return (
		<>
			<mesh
				ref={planeRef}
				position={[0, -height / 2, 15]}
				castShadow
				receiveShadow
			>
				<planeGeometry args={[width, 0.5]} />
				<shaderMaterial
					ref={materialRef}
					attach="material"
					vertexShader={vertexShaderBottom}
					fragmentShader={fragmentShaderBottom}
					uniforms={{ uTime: { value: 0 } }}
				/>
			</mesh>
		</>
	);
};

const waveVertexShader = `
  varying vec2 vUv; 
  uniform float uTime;

  void main() {
    vUv = uv;
    vec3 pos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const waveFragmentShader = `
varying vec2 vUv;
uniform float uTime;
uniform vec2 uResolution;

void main() {
    float waveFrequency = 6.5; 
    float waveAmplitude = 0.025;
    float waveOffset = 0.4; 

    float wave = waveAmplitude * cos(vUv.x * waveFrequency) + waveOffset; 

    vec3 topColor = vec3(0.878, 0.41, 0.0);
    vec3 bottomColor = vec3(0.0);

    vec3 color;

    if (vUv.y > wave) {
        float gradientPos = (vUv.y - wave) / (1.0 - wave);
        vec3 gradientTopColor = vec3(0.878, 0.41, 0.0);
        vec3 gradientBottomColor = vec3(0.878, 0.71, 0.373);
        color = mix(gradientBottomColor, gradientTopColor, gradientPos);

        float dist = distance(vUv, vec2(0.5, 0.35));
        float brightness = smoothstep(0.3, 0.0, dist);
        color += brightness * 0.7 * (sin(uTime * 0.5) + 1.0);

        float circleDist = distance(vUv, vec2(0.2, 0.8)); 
        float circleRadius = 2.5 * 0.1;
        float circleStrength = smoothstep(circleRadius, circleRadius * 0.2, circleDist); 
        float circleDist2 = distance(vUv, vec2(0.35, 0.7)); 
        float circleRadius2 = 2.5 * 0.1;
        float circleStrength2 = smoothstep(circleRadius2, circleRadius2 * 0.2, circleDist2); 
    
        color = mix(color, vec3(0.0), circleStrength * 0.8); 
        color = mix(color, vec3(0.0), circleStrength2 * 0.8);

    } 
    else {
        float gradientPos = (wave - 0.5) / (1.0 - wave);
        vec3 waveTopColor = mix(vec3(0.878, 0.71, 0.373), vec3(0.878, 0.41, 0.0), gradientPos);

        float distFromWave = abs(vUv.y - wave);
        float waveThickness = 0.01;
        float shadowStrength = smoothstep(waveThickness, 0.0, distFromWave);

        color = mix(bottomColor, waveTopColor, shadowStrength);

        float xDistance = abs(vUv.y - 0.5);
        float lightIntensity = 1.0 - smoothstep(0.0, 0.8, xDistance);
        vec3 lightColor = vec3(1.0); 
        color = mix(color, lightColor, xDistance);

        float dist = distance(vUv, vec2(0.5, 0.35));
        float brightness = smoothstep(0.3, 0.0, dist);
        color += brightness * 0.7 * (sin(uTime * 0.5) + 1.0);
    }

    gl_FragColor = vec4(color, 1.0);
}
`;
const waveFragmentShaderMobile = `
varying vec2 vUv;
uniform float uTime;
uniform vec2 uResolution;

void main() {
    float waveFrequency = 6.5; 
    float waveAmplitude = 0.025; 
    float waveOffset = 0.4; 

    vec2 correctedUv = vUv;
    correctedUv.x *= uResolution.x / uResolution.y;

    float wave = waveAmplitude * cos(correctedUv.x * waveFrequency ) + waveOffset; 

    vec3 topColor = vec3(0.878, 0.41, 0.0);
    vec3 bottomColor = vec3(0.0);

    vec3 color;

    if (vUv.y > wave) {
        float gradientPos = (vUv.y - wave) / (1.0 - wave);
        vec3 gradientTopColor = vec3(0.878, 0.41, 0.0);
        vec3 gradientBottomColor = vec3(0.878, 0.71, 0.373);
        color = mix(gradientBottomColor, gradientTopColor, gradientPos);

        float dist = distance(correctedUv, vec2(0.5 * uResolution.x / uResolution.y, 0.35));
        float brightness = smoothstep(0.3, 0.0, dist);
        color += brightness * 0.7 * (sin(uTime * 0.5) + 1.0);

        float circleDist = distance(correctedUv, vec2(0.2 * uResolution.x / uResolution.y, 0.85)); 
        float circleRadius = 3.0 * 0.1;
        float circleStrength = smoothstep(circleRadius, circleRadius * 0.2, circleDist); 
        float circleDist2 = distance(correctedUv, vec2(0.35 * uResolution.x / uResolution.y, 0.75)); 
        float circleRadius2 = 3.0 * 0.1;
        float circleStrength2 = smoothstep(circleRadius2, circleRadius2 * 0.2, circleDist2); 
    
        color = mix(color, vec3(0.0), circleStrength * 0.5); 
        color = mix(color, vec3(0.0), circleStrength2 * 0.5);

    } 
    else {
        float gradientPos = (wave - 0.5) / (1.0 - wave);
        vec3 waveTopColor = mix(vec3(0.878, 0.71, 0.373), vec3(0.878, 0.41, 0.0), gradientPos);

        float distFromWave = abs(vUv.y - wave);
        float waveThickness = 0.01; 
        float shadowStrength = smoothstep(waveThickness, 0.0, distFromWave);

        color = mix(bottomColor, waveTopColor, shadowStrength);

        float xDistance = abs(vUv.y - 0.5);
        float lightIntensity = 1.0 - smoothstep(0.0, 0.8, xDistance);
        vec3 lightColor = vec3(1.0); 
        color = mix(color, lightColor, xDistance);

        float dist = distance(correctedUv, vec2(0.5 * uResolution.x / uResolution.y, 0.35));
        float brightness = smoothstep(0.3, 0.0, dist);
        color += brightness * 0.7 * (sin(uTime * 0.5) + 1.0);
    }

    gl_FragColor = vec4(color, 1.0);
}
`;
const waveSingleFragmentShader = `
varying vec2 vUv;
uniform float uTime;

void main() {
    float waveFrequency = 6.50 ; 
    float waveAmplitude = 0.27; 
    float waveOffset = 0.5; 

    float wave = waveAmplitude * cos(vUv.x * waveFrequency -0.1) + waveOffset; 

    vec3 topColor = vec3(0.878, 0.41, 0.0);
    vec3 bottomColor = vec3(0.0);

    vec3 color;
	if(vUv.y >wave +0.02){
		discard;

	}
    else if (vUv.y > wave) {
		float gradientPos = (vUv.y - wave) / (1.0 - wave);
        vec3 gradientTopColor = vec3(0.878, 0.41, 0.0);
        vec3 gradientBottomColor = vec3(0.878, 0.71, 0.373);
        color = mix(gradientBottomColor, gradientTopColor, gradientPos);

        float dist = distance(vUv, vec2(0.5, 0.35));
        float brightness = smoothstep(0.3, 0.0, dist);
        color += brightness * 0.7 * (sin(uTime * 0.5) + 1.0);

        
    } 
    else {
        float gradientPos = (wave - 0.5) / (1.0 - wave);
        vec3 waveTopColor = mix(vec3(0.878, 0.71, 0.373), vec3(0.878, 0.41, 0.0), gradientPos);

        float distFromWave = abs(vUv.y - wave);
        float waveThickness = 0.01; 
        float shadowStrength = smoothstep(waveThickness, 0.0, distFromWave);

        color = mix(bottomColor, waveTopColor, shadowStrength);

        
        float dist = distance(vUv, vec2(0.5, 0.35));
        float brightness = smoothstep(0.3, 0.0, dist);
        color += brightness * 0.7 * (sin(uTime * 0.5) + 1.0);
    }

    gl_FragColor = vec4(color, 1.0);
}
`;
const SphereMaterial = shaderMaterial(
	{
		uTime: 0,
		uShadowMap: null,
		uResolution: new Vector2(window.innerWidth, window.innerHeight),
	},
	waveVertexShader,
	waveFragmentShaderMobile
);
const SingleWaveSphereMaterial = shaderMaterial(
	{
		uTime: 0,
		uShadowMap: null,
	},
	waveVertexShader,
	waveSingleFragmentShader
);
extend({ SphereMaterial, SingleWaveSphereMaterial });
declare global {
	namespace JSX {
		interface IntrinsicElements {
			sphereMaterial: ShaderMaterialParameters;
			singleWaveSphereMaterial: ShaderMaterialParameters;
		}
	}
}

const WavePlaneComponent = ({
	planeRef,
	materialRef,
}: {
	planeRef: React.MutableRefObject<
		Mesh<
			BufferGeometry<NormalBufferAttributes>,
			Material | Material[],
			Object3DEventMap
		>
	>;
	materialRef: React.MutableRefObject<ShaderMaterial>;
}) => {
	const { camera } = useThree();
	const { getCurrentViewport } = useThree((state) => state.viewport);
	const { width, height } = getCurrentViewport(camera, [0, 0, 0.5]);
	const isMobile = () => {
		return window.innerWidth <= 768;
	};
	return (
		<mesh
			ref={planeRef}
			position={[0, -height / 2 + 7, 0.5]}
			castShadow
			receiveShadow
		>
			<planeGeometry args={[width, height * 2]} />
			<sphereMaterial
				// @ts-ignore
				ref={materialRef}
				attach="material"
				vertexShader={waveVertexShader}
				fragmentShader={
					isMobile() ? waveFragmentShaderMobile : waveFragmentShader
				}
			/>
		</mesh>
	);
};

const SingleWavePlaneComponent = ({
	planeRef,
	materialRef,
}: {
	planeRef: React.MutableRefObject<
		Mesh<
			BufferGeometry<NormalBufferAttributes>,
			Material | Material[],
			Object3DEventMap
		>
	>;
	materialRef: React.MutableRefObject<ShaderMaterial>;
}) => {
	const { camera } = useThree();
	const { getCurrentViewport } = useThree((state) => state.viewport);
	const { width, height } = getCurrentViewport(camera, [0, 0, 15]);

	const isMobile = () => {
		return window.innerWidth <= 768;
	};

	return (
		<mesh
			ref={planeRef}
			position={[
				0,
				isMobile() ? -height / 2 + 1.25 : -height / 2 + 1.75,
				15,
			]}
			castShadow
			receiveShadow
		>
			<planeGeometry args={[width, isMobile() ? 1 : 2]} />

			<singleWaveSphereMaterial
				// @ts-ignore
				ref={materialRef}
				attach="material"
				vertexShader={waveVertexShader}
				fragmentShader={waveSingleFragmentShader}
			/>
		</mesh>
	);
};
const SimplePlane = ({
	planeRef,
}: {
	planeRef: React.MutableRefObject<
		Mesh<
			BufferGeometry<NormalBufferAttributes>,
			Material | Material[],
			Object3DEventMap
		>
	>;
}) => {
	const { camera } = useThree();
	const { getCurrentViewport } = useThree((state) => state.viewport);
	const { width, height } = getCurrentViewport(camera, [0, 0, 15]);
	return (
		<mesh
			ref={planeRef}
			receiveShadow
			rotation={[0, 0, 0]}
			position={[0, (-height * 3) / 2, 15]}
		>
			<planeGeometry args={[width, height * 2]} />
			<meshStandardMaterial color="black" />
		</mesh>
	);
};

const GradientPlane2: React.FC = () => {
	const { camera } = useThree();
	const { getCurrentViewport } = useThree((state) => state.viewport);
	const { height } = getCurrentViewport(camera, [0, 0, 0]);
	const planeRefTop = useRef<Mesh>(null!);
	const planeRefBottom = useRef<Mesh>(null!);
	const planeRefSimple = useRef<Mesh>(null!);

	const planeRefWaveSingle = useRef<Mesh>(null!);
	const planeRefWave = useRef<Mesh>(null!);

	const materialRefTop = useRef<ShaderMaterial>(null!);
	const materialRefBottom = useRef<ShaderMaterial>(null!);
	const materialRefWave = useRef<ShaderMaterial>(null!);
	const materialRefWaveSingle = useRef<ShaderMaterial>(null!);
	useFrame(({ clock }) => {
		const elapsedTime = clock.getElapsedTime();
		if (materialRefTop.current) {
			materialRefTop.current.uniforms.uTime.value = elapsedTime;
		}
		if (materialRefBottom.current) {
			materialRefBottom.current.uniforms.uTime.value = elapsedTime;
		}
		if (materialRefWave.current) {
			materialRefWave.current.uniforms.uTime.value = elapsedTime;
		}
		if (materialRefWaveSingle.current) {
			materialRefWaveSingle.current.uniforms.uTime.value = elapsedTime;
		}
	});

	useEffect(() => {
		planeRefTopPos.current = planeRefTop.current.position.y;
		planeRefBottomPos.current = planeRefBottom.current.position.y;
		planeRefWavePos.current = planeRefWave.current.position.y;
		planeRefWaveSinglePos.current = planeRefWaveSingle.current.position.y;
		planeRefSimplePos.current = planeRefSimple.current.position.y;
		const handleScroll = () => {
			const scrollY = window.scrollY;
			const maxScroll = document.body.scrollHeight - window.innerHeight;

			const scrollProgress = scrollY / maxScroll;
			const speed = 40;
			const yPosT = planeRefTopPos.current + scrollProgress * speed;
			const yPosB = planeRefBottomPos.current + scrollProgress * speed;
			const yPosW = planeRefWavePos.current + scrollProgress * 150;
			const yPosS = planeRefSimplePos.current + scrollProgress * speed;
			const yPosWS =
				planeRefWaveSinglePos.current + scrollProgress * speed;

			planeRefTop.current.position.y = yPosT;
			planeRefBottom.current.position.y = yPosB;
			planeRefWave.current.position.y = yPosW;
			planeRefSimple.current.position.y = yPosS;
			planeRefWaveSingle.current.position.y = yPosWS;
		};

		window.addEventListener("scroll", handleScroll);
		window.addEventListener("resize", () => {
			materialRefWave.current.uniforms.uResolution.value.set(
				window.innerWidth,
				window.innerHeight
			);
		});
		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleScroll);
		};
	}, [height]);

	const planeRefTopPos = useRef<number>(0);
	const planeRefBottomPos = useRef<number>(0);
	const planeRefWavePos = useRef<number>(0);
	const planeRefWaveSinglePos = useRef<number>(0);
	const planeRefSimplePos = useRef<number>(0);

	return (
		<>
			<GradientPlaneComponentTop
				planeRef={planeRefTop}
				materialRef={materialRefTop}
			/>
			<GradientPlaneComponentBottom
				planeRef={planeRefBottom}
				materialRef={materialRefBottom}
			/>
			<SimplePlane planeRef={planeRefSimple} />
			<WavePlaneComponent
				planeRef={planeRefWave}
				materialRef={materialRefWave}
			/>
			<SingleWavePlaneComponent
				planeRef={planeRefWaveSingle}
				materialRef={materialRefWaveSingle}
			/>
		</>
	);
};

export default GradientPlane2;
