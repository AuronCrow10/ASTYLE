import { TraderMonthlyHistory } from "../Trader/Trader";

export type TraderContextType = {
	getMQL4Token: (traderUid: string) => Promise<string>;
	getMonthlyHistory: (traderUid: string) => Promise<void>;
	monthlyHistory: TraderMonthlyHistory | null;
	creditToBePaid: number;
	tokenMQL4: string;
};
