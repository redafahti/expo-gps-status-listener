import ExpoGpsStatusListener from "expo-gps-status-listener";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function App() {
	const [isGPSEnabled, setIsGPSEnabled] = useState(false);

	useEffect(() => {
		const subscription = ExpoGpsStatusListener.addGPSStatusListener((event) => {
			console.log("GPS status changed:", event.isEnabled);
			setIsGPSEnabled(event.isEnabled);
		});

		return () => {
			subscription.remove();
		};
	}, []);

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignContent: "center",
				alignItems: "center",
			}}
		>
			<Text
				style={{
					fontWeight: 400,
					color: "gray",
					fontSize: 18,
				}}
			>
				GPS status
			</Text>
			<Text
				style={{
					fontWeight: 500,
					color: isGPSEnabled ? "green" : "red",
					fontSize: 16,
				}}
			>
				{isGPSEnabled ? "Enabled" : "Disabled"}
			</Text>

			<StatusBar style="dark" />
		</View>
	);
}
