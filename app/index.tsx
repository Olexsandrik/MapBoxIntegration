import { StatusBar, View } from "react-native";
import Map from "@/components/Map";
import ScooterProvider from "@/providers/ScooterProvider";

export default function Index() {
	return (
		<ScooterProvider>
			<Map />
			<StatusBar style="light" />
		</ScooterProvider>
	);
}
