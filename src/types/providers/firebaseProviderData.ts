import { FirebaseApp } from "firebase/app";
import { Auth } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import { Functions } from "firebase/functions";

export type FirebaseProviderData = {
	usingEmulators: boolean;
	emulatorsConfig: MapEmulators;
	myApp: FirebaseApp;
	myAuth: Auth;
	myFS: Firestore;
	myFunctions: Functions;
};
export type MapEmulators = {
	FS_HOST: string;
	FS_PORT: number;
	AUTH_HOST: string;
	AUTH_PORT: number;
	AUTH_URL: string;
};
