import {useEffect} from "react";
import { SearchAndCopy } from "../components/landing/SearchAndCopy";
import { CertifiedHistory } from "../components/landing/CertifiedHistory";

import "../styles/scss/general.scss";
import VideoPlayer from "../components/landing/VideoPlayer";
import Roadmap from "../components/Roadmap";
import Step from "../components/Step";
import { TheBrand } from "../components/landing/theBrand";
import { Footer } from "../components/landing/Footer";
import { Box } from "../components/MUI/MuiBox";
import HeroAnimationContainer from "../components/animation/HeroAnimationContainer";
import NavebarGlass from "../components/NavebarGlass";
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import { Element, scroller } from 'react-scroll';

export const Landing = () => {
	const location = useLocation();

	useEffect(() => {
	  if (location.hash) {
		const targetId = location.hash.replace('#', '');
		scroller.scrollTo(targetId, {
		  duration: 500,
		  delay: 0,
		  smooth: true,
		  offset: 50,
		});
	  }
	}, [location]);
	return (

		
		<>
			<div style={{ position: "relative" }}>
				<NavebarGlass />
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
					}}
				>
					<HeroAnimationContainer />
					<div style={{ zIndex: 1002 }}>
						<SearchAndCopy />
						<CertifiedHistory />
						<VideoPlayer />
						<Roadmap />
						<Step />
						<TheBrand />
						<Footer />
					</div>
				</Box>
			</div>
		</>
	);
};
