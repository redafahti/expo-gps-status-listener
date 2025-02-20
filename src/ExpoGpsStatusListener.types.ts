export type GPSStatusEvent = {
	isEnabled: boolean;
};

export type ExpoGpsStatusListenerModuleEvents = {
	onGPSStatusChange: () => void;
};
