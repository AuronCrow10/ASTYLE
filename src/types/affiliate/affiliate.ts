export type Affiliate = {
	affiliatedTraders: string[];
	uid: string;
};
export type AffiliateMonthlyHistory = {
	monthlyHistory: AffiliateMonthData[];
};

export type AffiliateMonthData = {
	monthId: string;
	paid: boolean;
	amount: number;
};
