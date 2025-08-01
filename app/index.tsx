import { StatusBar, Text, View } from "react-native";
import Map from "@/components/Map";
import ScooterProvider from "@/providers/ScooterProvider";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import SelectedScooterSheet from "@/components/SelectedScooterSheet";

export default function Index() {
	return (
		<ScooterProvider>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<Map />
				<SelectedScooterSheet />

				<StatusBar barStyle="light-content" />
			</GestureHandlerRootView>
		</ScooterProvider>
	);
}
