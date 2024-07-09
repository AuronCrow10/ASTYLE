export type UserType = {
	uid: string;
	email: string | null;
	customerId: string;
	role?: string;
	subscriptions: string[] | undefined;
	activeTopics?: string[];
	FMCtoken?: string;
	subscriptionDetails?: { traderUid: string; date: number }[];

	purchaseTokens?: string[];
};

export type SubscritpionDetail = {
	expirationTime: number | string;
	planId: string;
	tier: number;
	isMonthly: boolean;
	maxSubscription: number;
};
