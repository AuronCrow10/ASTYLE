import { Affiliate, AffiliateMonthlyHistory } from "../affiliate/affiliate";

export type AffiliateProviderType = {
	affiliate: Affiliate | null;
	getAffiliateData: (uid: string) => Promise<Affiliate | null>;
	getMonthlyHistory: (affiliateUid: string) => Promise<void>;
	monthlyHistory: AffiliateMonthlyHistory | null;
	creditToBePaid: number;
};
