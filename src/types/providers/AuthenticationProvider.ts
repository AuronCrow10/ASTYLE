import { User } from "firebase/auth";
import { TraderType } from "../Trader/Trader";
import { UserType } from "../user";

export type AuthProviderData = {
	authInitialized: boolean;
	profileInitialized: boolean;
	loginWithEmailAndPassword: (
		email: string,
		password: string
	) => Promise<void>;
	signWithEmailAndPassword: (
		email: string,
		password: string,
		navigateToDashboard?: boolean
	) => Promise<string>;
	logout: () => Promise<void>;
	recoverPassword: (email?: string) => Promise<void>;
	user: User | null;
	traderProfile: TraderType | null;
	profile: UserType | null;
	setTemporaryPassword: React.Dispatch<React.SetStateAction<string | null>>;
	temporaryPassword: string | null;
};
