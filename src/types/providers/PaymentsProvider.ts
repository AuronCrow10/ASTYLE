export type PaymentsProviderType = {
	plans: PlansSettings[];
	getPlans: () => Promise<void>;
};
export type PlansSettings = {
	yearly: PlanSetting;
	monthly: PlanSetting;
	title: string;
	orderInList: number;
};

export type PlanSetting = {
	advantages: string[];
	description: string;
	descriptionTrad: Record<string, string>;
	advantagesTrad: Record<string, string>[];
	isBest: boolean;
	price_id: string;
	stripePriceId: string;
};
