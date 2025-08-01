import { useScooter } from "@/providers/ScooterProvider";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useEffect, useRef } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";

export default function SelectedScooterSheet() {
	const buttonSheftRef = useRef<BottomSheet>(null);

	const { selectedScooter, routeTime, routeDistance } = useScooter();

	useEffect(() => {
		if (selectedScooter) {
			buttonSheftRef.current?.expand();
			console.log(selectedScooter);
		}
	}, [selectedScooter]);

	return (
		<BottomSheet
			ref={buttonSheftRef}
			index={-1}
			snapPoints={["20%"]}
			enableDynamicSizing
			enablePanDownToClose
			backgroundStyle={{ backgroundColor: "#414442" }}
		>
			<BottomSheetView
				style={{
					flex: 1,
					flexDirection: "row",
					padding: 10,
					gap: 10,
				}}
			>
				<View style={{ flex: 1, flexDirection: "row", gap: 10 }}>
					<Text style={{ color: "white" }}>Scooter info</Text>
					<Image
						source={require("../../assets/scooter.png")}
						style={{ width: 50, height: 50 }}
					/>
					<View style={{ flex: 1 }}>
						<Text style={{ color: "white" }}>Lime -S</Text>
						<Text style={{ color: "white" }}>
							id-{selectedScooter?.id} Madison Avenue
						</Text>{" "}
					</View>
					<View>
						<FontAwesome6 name="bolt-lightning" size={24} color="green" />
						<Text style={{ color: "green" }}>
							{(routeDistance / 1000).toFixed(1)} km
						</Text>
					</View>
					<View>
						<FontAwesome6 name="bolt-lightning" size={24} color="green" />
						<Text style={{ color: "green" }}>
							{(routeTime / 60).toFixed(0)} min
						</Text>
					</View>
				</View>
			</BottomSheetView>
		</BottomSheet>
	);
}
