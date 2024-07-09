import { HistoryTrade } from "../Trade/Trade";

export type TraderType = {
	uid: string;
	followers: number;
	username: string;
	gains: number;
	losses: number;
	profile_img: string;
	priceId: string;
	price: number;
	createdAt: number;
	tradesMade: number;
	lastOperationTimestamp: number;
};

export type TradesHistoryFirestore = { trades: Record<string, number> };

export type TradesHistoryType = { trades: HistoryTrade[][]; totalTP: number };

export type TraderMonthlyHistory = {
	monthlyHistory: MonthData[];
};

export type MonthData = {
	monthId: string;
	paid: boolean;
	elapsedTime: number;
	level: number;
	bonus: number;
	hourlyRate: number;
	followers: number;
};
