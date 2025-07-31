import { useScooter } from "@/providers/ScooterProvider";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useEffect, useRef } from "react";
import { Text } from "react-native";

export default function SelectedScooterSheet() {
	const buttonSheftRef = useRef<BottomSheet>(null);

	const { selectedScooter } = useScooter();

	useEffect(() => {
		if (selectedScooter) {
			buttonSheftRef.current?.expand();
		}
	}, [selectedScooter]);

	return (
		<BottomSheet
			ref={buttonSheftRef}
			index={-1}
			snapPoints={["50%"]}
			enablePanDownToClose
		>
			<BottomSheetView>
				<Text>coolest</Text>
			</BottomSheetView>
		</BottomSheet>
	);
}
