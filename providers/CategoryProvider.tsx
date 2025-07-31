import { createContext, useContext, useEffect, useState } from "react";
import * as Location from "expo-location";
import { getDirections } from "@/server/directions";

const CategoryContext = createContext({});

export default function CategoryProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [selectedCategory, setSelectedCategory] = useState<any>(null);
	const [direction, setDirection] = useState<any>();
	useEffect(() => {
		const fetchDirections = async () => {
			const userLocation = await Location.getCurrentPositionAsync();

			const newDirectionCoordinates = await getDirections(
				[userLocation.coords.longitude, userLocation.coords.latitude],
				[selectedCategory[0], selectedCategory[1]]
			);

			setDirection(newDirectionCoordinates);
		};
		if (selectedCategory) {
			fetchDirections();
		}
	}, [selectedCategory, direction]);

	return (
		<CategoryContext.Provider
			value={{
				selectedCategory,
				setSelectedCategory,
				direction,
				directionCoordinates: direction?.routes[0].geometry.coordinates,
				routeTime: direction?.routes[0].duration,
				routeDistance: direction?.routes[0].distance,
			}}
		>
			{children}
		</CategoryContext.Provider>
	);
}

export const useCategory = () => {
	const context = useContext(CategoryContext);
	if (!context) {
		throw new Error("useScooter must be used within a CategoryProvider");
	}
	return context;
};
