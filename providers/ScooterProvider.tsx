import { getDirections } from "@/server/directions";
import * as Location from "expo-location";
import { createContext, useContext, useEffect, useState } from "react";

const ScooterContext = createContext({});

export default function ScooterProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [selectedScooter, setSelectedScooter] = useState<any>(null);
	const [direction, setDirection] = useState<any>();
	const [isRouteVisible, setIsRouteVisible] = useState(false);
	useEffect(() => {
		const fetchDirections = async () => {
			const userLocation = await Location.getCurrentPositionAsync();

			const newDirectionCoordinates = await getDirections(
				[userLocation.coords.longitude, userLocation.coords.latitude],
				[selectedScooter.long, selectedScooter.lat]
			);

			setDirection(newDirectionCoordinates);
		};
		if (selectedScooter) {
			fetchDirections();
		}
	}, [selectedScooter]);

	console.log("selectedScooter", selectedScooter);
	return (
		<ScooterContext.Provider
			value={{
				selectedScooter,
				setSelectedScooter,
				direction,
				directionCoordinates: direction?.routes[0].geometry.coordinates,
				routeTime: direction?.routes[0].duration,
				routeDistance: direction?.routes[0].distance,
				isRouteVisible,
				setIsRouteVisible,
			}}
		>
			{children}
		</ScooterContext.Provider>
	);
}

export const useScooter = () => {
	const context = useContext(ScooterContext);
	if (!context) {
		throw new Error("useScooter must be used within a ScooterProvider");
	}
	return context;
};
