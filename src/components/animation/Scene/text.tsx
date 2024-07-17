import { useEffect, useRef } from "react";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { Box } from "../../MUI/MuiBox";
import { Button, Typography } from "@mui/material";
import { useThree } from "@react-three/fiber";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function SphereWithHtml() {
	const meshRef = useRef<THREE.Mesh>(null!);
	const { camera } = useThree();
	const { getCurrentViewport } = useThree((state) => state.viewport);
	const { height } = getCurrentViewport(camera, [0, 0, -4]);
	const navigate = useNavigate();
	useEffect(() => {
		planeRefTopPos.current = meshRef.current.position.y;

		const handleScroll = () => {
			const scrollY = window.scrollY;
			const maxScroll = document.body.scrollHeight - window.innerHeight;

			const scrollProgress = scrollY / maxScroll;
			const speed = 30;
			const yPosT = planeRefTopPos.current + scrollProgress * speed;

			meshRef.current.position.y = yPosT;
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [height]);

	const planeRefTopPos = useRef<number>(0);
	const { t } = useTranslation();
	return (
		<mesh ref={meshRef} position={[0, 1.5, 12]}>
			<Html
				center
				position={[0, 0, 0]}
				style={{
					width: "600px",
					height: "600px",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
				distanceFactor={4}
				transform
				zIndexRange={[0, 0]}
			>
				<Box
					sx={{
						textAlign: "center",
						borderRadius: "50%",
						padding: "30px",
						width: "400px",
						height: "400px",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<img alt="logo" src="/AlogoComplete.png" width="240px" />

					<Typography
						variant="h6"
						sx={{
							color: "white",
							fontSize: "40px",
							marginBottom: "10px",
							marginTop: "40px !important",
							fontWeight: "bold",
						}}
					>
						A Free Spirit
					</Typography>
					<Typography
						variant="body1"
						sx={{
							color: "white",
							fontSize: "20px",
							marginBottom: "20px",
						}}
					>
						{t("landing.3D.text")}
					</Typography>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							gap: "10px",
						}}
					>
						<Button
							variant="contained"
							sx={{
								textTransform: "none",
								margin: "14px auto",
								fontWeight: "900",
								padding: "10px 60px",
								borderRadius: "100px",
								fontSize: "20px",
								display: "block",
								backgroundColor: "#FFCD00",
								"&:hover": {
									backgroundColor: "rgb(218, 174, 0)",
								},
								color: "black",
							}}
							onClick={() => {
								navigate("/presale");
							}}
						>
							{t("landing.gotoPresale")}
						</Button>
					</Box>
				</Box>
			</Html>
		</mesh>
	);
}

export default function TextHero() {
	return <SphereWithHtml />;
}
