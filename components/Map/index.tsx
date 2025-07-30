import Mapbox from "@rnmapbox/maps";
import { StyleSheet, View } from "react-native";
import { MAP_BOX_TOKEN } from "@env";
import pin from "../../assets/pin.png";
import { useScooter } from "@/providers/ScooterProvider";
import LineRoute from "../LineRoute";
import ScooterMarkers from "../ScooterMarkers";

Mapbox.setAccessToken(`${MAP_BOX_TOKEN}`);
export default function Map() {
	const {
		selectedScooter,
		setSelectedScooter,
		direction,
		directionCoordinates,
		routeTime,
		routeDistance,
	} = useScooter();

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
					<ScooterMarkers setSelectedScooter={setSelectedScooter} />

					{directionCoordinates && (
						<LineRoute coordinates={directionCoordinates} />
					)}
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
