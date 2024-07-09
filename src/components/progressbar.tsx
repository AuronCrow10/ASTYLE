import React, { useState, useEffect } from "react";

interface ProgressBarProps {
	percentage: number;
	barColor?: string;
	backgroundColor?: string;
	animationDuration?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
	percentage,
	barColor = "#ffae0d",
	backgroundColor = "#ddd",
	animationDuration = 500,
}) => {
	const [width, setWidth] = useState(10);

	useEffect(() => {
		setWidth(percentage);
	}, [percentage]);

	const containerStyles: React.CSSProperties = {
		width: "100%",
		backgroundColor,
		borderRadius: "15px",
	};

	const fillerStyles: React.CSSProperties = {
		height: "100%",
		width: `${width}%`,
		backgroundColor: barColor,
		borderRadius: "inherit",
		textAlign: "right",
		transition: `width ${animationDuration}ms ease-in-out`,
	};

	return (
		<div style={containerStyles}>
			<div style={fillerStyles}>
				<span style={{ paddingRight: 5, color: "transparent" }}></span>
			</div>
		</div>
	);
};

export default ProgressBar;
