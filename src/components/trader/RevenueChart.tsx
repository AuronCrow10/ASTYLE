import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ChartData,
} from "chart.js";
import { MonthData, TraderMonthlyHistory } from "../../types/Trader/Trader";
import Select, { ActionMeta, SingleValue } from "react-select";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);
interface OptionType {
	value: string;
	label: string;
}
const RevenueChart = ({
	monthlyHistory,
}: {
	monthlyHistory: TraderMonthlyHistory;
}) => {
	const labels = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const encounteredValues = new Set(); // Using a Set for efficient lookup

	const years = monthlyHistory.monthlyHistory
		.map((data: MonthData) => {
			const yearValue = data.monthId.split("_")[0];
			if (encounteredValues.has(yearValue)) {
				return undefined;
			} else {
				encounteredValues.add(yearValue);
				return {
					value: yearValue,
					label: yearValue,
				};
			}
		})
		.filter((year) => year !== undefined); // Filter out undefined values, if any

	console.log(years);

	years.push({ label: "2023", value: "2023" });

	const [selectedYear, setSelectedYear] = useState<OptionType | null>(null);

	const filteredData = monthlyHistory.monthlyHistory.filter(
		(data: MonthData) =>
			selectedYear != null
				? data.monthId.startsWith(selectedYear.value)
				: ""
	);
	console.log(years);
	const monthLabels: string[] = labels.map(
		(month, index) => `${month} ${selectedYear?.label}`
	);

	const data: ChartData<"bar"> = {
		labels: monthLabels,
		datasets: [
			{
				label: "Revenue",
				data: Array(12)
					.fill(0)
					.map((_, index) => {
						const monthData = filteredData.find(
							(data) =>
								Number(data.monthId.split("_")[1]) === index + 1
						);
						return monthData
							? Math.floor(
									(monthData.elapsedTime / 1000 / 60 / 60) *
										monthData.hourlyRate *
										100000
							  ) / 100000
							: 0;
					}),
				backgroundColor: "#ffcd00",
			},
			{
				label: "Followers",
				data: Array(12)
					.fill(0)
					.map((_, index) => {
						const monthData = filteredData.find(
							(data) =>
								Number(data.monthId.split("_")[1]) === index + 1
						);
						return monthData ? monthData.followers : 0;
					}),
				backgroundColor: "red",
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: { position: "top" as const },
			title: { display: true, text: "Revenue" },
		},
	};

	return (
		<div>
			<Select
				value={selectedYear}
				onChange={setSelectedYear}
				options={years as OptionType[]}
				defaultValue={years[0]}
				styles={{
					control: (baseStyles, state) => ({
						...baseStyles,
						borderColor: state.isFocused ? "#ffcd00" : "gray",
					}),
				}}
				className="years-select"
				classNamePrefix="years-select-prefix"
			/>
			<Bar options={options} data={data} />
		</div>
	);
};

export default RevenueChart;
