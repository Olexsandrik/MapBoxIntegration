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
					<Mapbox.Camera
						zoomLevel={10}
						centerCoordinate={[24.7097, 48.9226]}
						followUserLocation={true}
					/>
					<Mapbox.LocationPuck
						visible={true}
						puckBearingEnabled={true}
						puckBearing="heading"
					/>
					<Mapbox.Images images={{ pin }} />
					<Mapbox.ShapeSource
						id="scooters"
						shape={featureCollection(scootersFeatures)}
					>
						<Mapbox.SymbolLayer
							id="scooters-label"
							style={{
								iconImage: "pin",
								iconSize: 0.5,
								iconAllowOverlap: true,
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
