import { StatusBar, Text, View } from "react-native";
import Map from "@/components/Map";
import ScooterProvider from "@/providers/ScooterProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useEffect, useRef } from "react";
import { getInfoCategories } from "@/server/directions";

export default function Index() {
	useEffect(() => {
		getInfoCategories("food_and_drink").then((data) => {
			console.log("data", JSON.stringify(data, null, 2));
		});
	}, []);
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<ScooterProvider>
				<Map />
			</ScooterProvider>
		</GestureHandlerRootView>
	);
}
