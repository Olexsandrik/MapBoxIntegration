import Mapbox from "@rnmapbox/maps";
import { StyleSheet, View } from "react-native";
import { MAP_BOX_TOKEN } from "@env";
import { featureCollection, point } from "@turf/helpers";
import pin from "../assets/pin.png";

import scooters from "../data/scooters.json";

// Replace with your actual Mapbox access token
Mapbox.setAccessToken(`${MAP_BOX_TOKEN}`);
export default function index() {
	const scootersFeatures = scooters.map((scooter) =>
		point([scooter.long, scooter.lat])
	);

	return (
		<View style={styles.page}>
			<View style={styles.container}>
				<Mapbox.MapView
					style={styles.map}
					styleURL="mapbox://styles/mapbox/dark-v11"
				>
					<Mapbox.UserLocation />
					<Mapbox.Camera zoomLevel={15} centerCoordinate={[2.1589, 41.3907]} />
					<Mapbox.LocationPuck
						visible={true}
						puckBearingEnabled={true}
						puckBearing="heading"
					/>
					<Mapbox.Images images={{ pin }} />
					<Mapbox.ShapeSource
						onPress={(event) => {
							console.log(JSON.stringify(event, null, 2));
						}}
						id="scooters"
						cluster={true}
						shape={featureCollection(scootersFeatures)}
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
				</Mapbox.MapView>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		position: "relative",
	},
	container: {
		flex: 1,
		height: "100%",
		width: "100%",
	},
	map: {
		flex: 1,
		height: "100%",
		width: "100%",
		position: "absolute",
	},
});
