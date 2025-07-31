import { useCategory } from "@/providers/CategoryProvider";
import Mapbox from "@rnmapbox/maps";
import { OnPressEvent } from "@rnmapbox/maps/lib/typescript/src/types/OnPressEvent";
import { featureCollection, point } from "@turf/helpers";

interface CategoryMarkersProps {
	places: any[];
	onPlacePress: (place: any) => void;
}

export default function CategoryMarkers({
	places,
	onPlacePress,
}: CategoryMarkersProps) {
	const { selectedCategory, setSelectedCategory } = useCategory();

	if (!places || places.length === 0) return null;

	console.log("selectedCategory", selectedCategory);

	const points = places.map((place: any) =>
		point([place.coordinates[0], place.coordinates[1]], { place })
	);

	const handlePress = (event: OnPressEvent) => {
		if (event.features[0]?.properties?.place) {
			onPlacePress(event.features[0].properties.place.coordinates);
			// console.log(
			// 	"event.features[0].properties.place.coordinates",
			// 	event.features[0].properties.place.coordinates
			// );
			setSelectedCategory(event.features[0].properties.place.coordinates);
		}
	};

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
					iconImage: "pin",
					iconSize: 0.8,
					iconAllowOverlap: true,
					iconAnchor: "bottom",
				}}
			/>
		</Mapbox.ShapeSource>
	);
}
