import { StatusBar, Text, View } from "react-native";
import Map from "@/components/Map";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import CategoryProvider from "@/providers/CategoryProvider";

export default function Index() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<CategoryProvider>
				<Map />
			</CategoryProvider>
		</GestureHandlerRootView>
	);
}
