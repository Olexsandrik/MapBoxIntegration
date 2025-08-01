import { useScooter } from "@/providers/ScooterProvider";
import React from "react";

import { Button } from "react-native";

export default function ButtonShowRoute() {
	const { isRouteVisible, setIsRouteVisible } = useScooter();
	return (
		<Button
			title={isRouteVisible ? "Hide Route" : "Show Route"}
			onPress={() => setIsRouteVisible(!isRouteVisible)}
		/>
	);
}
