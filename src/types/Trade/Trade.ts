export type TradeType = {
	tradeId: string;
	entryPrice: number;
	side: string;
	isOpen: boolean;
	symbols: string[];
	profileUid: string;
	username: string;
	takeProfits: number[];
	stopLoss: number;
	accuracy: number;
	message: string;
	timestamp: number;
	status: string;
	pips?: number;
};

export type CreateTradeType = {
	entryPrice: number;
	side: string;
	symbols: string[];
	takeProfits: number[];
	stopLoss: number;
	accuracy: number;
	message: string;
};
export type HistoryTrade = {
	timestamp: number;
	pips: number;
	type: string;
};

export type TradeHistory = {
	pips: number;
	symbol: string;
	openTimestamp: number;
	closeTimestamp: number;
};

export type TradeHistoryDoc = {
	totalTrade: number;
	nGains: number;
	nLoss: number;
	trades: TradeHistory[];
};
