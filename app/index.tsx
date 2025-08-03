import Map from "@/components/Map";
import ScooterProvider from "@/providers/ScooterProvider";
import { StatusBar } from "react-native";

import SelectedScooterSheet from "@/components/SelectedScooterSheet";
import CategoriesProvider from "@/providers/CategoriesProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Index() {
	return (
		<CategoriesProvider>
			<ScooterProvider>
				<GestureHandlerRootView style={{ flex: 1 }}>
					<Map />
					<SelectedScooterSheet />

					<StatusBar barStyle="light-content" />
				</GestureHandlerRootView>
			</ScooterProvider>
		</CategoriesProvider>
	);
}
