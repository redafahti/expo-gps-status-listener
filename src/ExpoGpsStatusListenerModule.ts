import { requireNativeModule } from "expo";

import { GPSStatusEvent } from "./ExpoGpsStatusListener.types";

const emitter = requireNativeModule("ExpoGpsStatusListener");

export default {
	async isGPSEnabled(): Promise<boolean> {
		return await emitter.isGPSEnabled();
	},

	addGPSStatusListener(listener: (event: GPSStatusEvent) => void): any {
		return emitter.addListener("onGPSStatusChange", listener);
	},
};
