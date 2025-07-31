import { useCategory } from "@/providers/CategoryProvider";
import Mapbox from "@rnmapbox/maps";
import { OnPressEvent } from "@rnmapbox/maps/lib/typescript/src/types/OnPressEvent";
import { featureCollection, point } from "@turf/helpers";
import { useCallback } from "react";

interface CategoryMarkersProps {
	places: any[];
	onPlacePress: (place: any) => void;
	selectedCategory: any;
	setSelectedCategory: (category: any) => void;
}

export default function CategoryMarkers({
	places,
	onPlacePress,
	selectedCategory,
	setSelectedCategory,
}: CategoryMarkersProps) {
	const handlePress = useCallback(
		(event: OnPressEvent) => {
			if (event.features[0]?.properties?.place) {
				const newCoordinates = event.features[0].properties.place.coordinates;

				if (JSON.stringify(selectedCategory) !== newCoordinates) {
					onPlacePress(newCoordinates);
					setSelectedCategory(newCoordinates);
				}
			}
		},
		[onPlacePress, setSelectedCategory, selectedCategory]
	);

	if (!places || places.length === 0) return null;

	const points = places.map((place: any) =>
		point([place.coordinates[0], place.coordinates[1]], {
			place,
			category: place.category, // Додаємо категорію для фільтрації іконок
		})
	);

	return (
		<Mapbox.ShapeSource
			onPress={handlePress}
			id="category-markers"
			shape={featureCollection(points)}
			cluster={true}
		>
			<Mapbox.SymbolLayer
				id="category-markers-symbol"
				style={{
					iconSize: [
						"case",
						["==", ["get", "category"], "restaurant"],
						1.2, // Більший для ресторанів
						["==", ["get", "category"], "hotel"],
						1.0, // Звичайний для готелів
						["==", ["get", "category"], "hospital"],
						1.1, // Трохи більший для лікарень
						["==", ["get", "category"], "shop"],
						0.9, // Менший для магазинів
						["==", ["get", "category"], "entertainment"],
						1.3, // Найбільший для розваг
						0.8, // За замовчуванням
					],
					iconAllowOverlap: true,
					iconAnchor: "bottom",
				}}
			/>

			<Mapbox.CircleLayer
				id="category-markers-circles"
				style={{
					circleColor: [
						"case",
						["==", ["get", "category"], "restaurant"],
						"#FF6B6B", // Червоний для ресторанів
						["==", ["get", "category"], "hotel"],
						"#4ECDC4", // Блакитний для готелів
						["==", ["get", "category"], "hospital"],
						"#45B7D1", // Синій для лікарень
						["==", ["get", "category"], "shop"],
						"#96CEB4", // Зелений для магазинів
						["==", ["get", "category"], "entertainment"],
						"#FFEAA7", // Жовтий для розваг
						"#95A5A6", // Сірий за замовчуванням
					],
					circleRadius: [
						"case",
						["==", ["get", "category"], "restaurant"],
						6, // Більший радіус для ресторанів
						["==", ["get", "category"], "hotel"],
						5, // Звичайний радіус для готелів
						["==", ["get", "category"], "hospital"],
						7, // Більший радіус для лікарень
						["==", ["get", "category"], "shop"],
						4, // Менший радіус для магазинів
						["==", ["get", "category"], "entertainment"],
						8, // Найбільший радіус для розваг
						4, // За замовчуванням
					],
					circleStrokeWidth: 2,
					circleStrokeColor: "white",
				}}
			/>
		</Mapbox.ShapeSource>
	);
}
