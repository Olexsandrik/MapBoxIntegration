import Mapbox from "@rnmapbox/maps";
import { OnPressEvent } from "@rnmapbox/maps/lib/typescript/src/types/OnPressEvent";
import { featureCollection, point } from "@turf/helpers";
import scooters from "../../data/scooters.json";

export default function ScooterMarkers({
	setSelectedScooter,
}: {
	setSelectedScooter: (event: any) => void;
}) {
	const points = scooters.map((scooter) =>
		point([scooter.long, scooter.lat], { scooter })
	);
	const onPintPress = async (event: OnPressEvent) => {
		if (event.features[0]?.properties?.scooter) {
			setSelectedScooter(event.features[0].properties.scooter);
		}
		setSelectedScooter(event);
	};

	console.log(
		"featureCollection(points)",
		JSON.stringify(featureCollection(points), null, 2)
	);
	return (
		<Mapbox.ShapeSource
			onPress={(event) => onPintPress(event)}
			id="scooters"
			cluster={true}
			shape={featureCollection(points)}
		>
			<Mapbox.SymbolLayer
				id="scooters-label"
				style={{
					textField: ["get", "point_count"],
					textSize: 18,
					textColor: "white",
					textPitchAlignment: "map",
				}}
			/>

			<Mapbox.CircleLayer
				id="scooters-count"
				belowLayerID="cluster-count"
				filter={["has", "point_count"]}
				style={{
					circleColor: "red",

					circleRadius: 10,
					circleStrokeWidth: 2,
					circleStrokeColor: "white",
				}}
			/>
			<Mapbox.SymbolLayer
				id="scooters-label"
				filter={["has", "point_count"]}
				style={{
					iconImage: "pin",
					iconSize: 0.5,
					iconAllowOverlap: true,
					iconAnchor: "bottom",
				}}
			/>
		</Mapbox.ShapeSource>
	);
}
