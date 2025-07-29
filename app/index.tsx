import Mapbox from "@rnmapbox/maps";
import { StyleSheet, View } from "react-native";
import { MAP_BOX_TOKEN } from "@env";

Mapbox.setAccessToken(`${MAP_BOX_TOKEN}`);
export default function index() {
	return (
		<View style={styles.page}>
			<View style={styles.container}>
				<Mapbox.MapView
					style={styles.map}
					styleURL="mapbox://styles/mapbox/dark-v11"
				>
					<Mapbox.UserLocation />
					<Mapbox.Camera
						zoomLevel={15}
						centerCoordinate={[24.7097, 48.9226]}
						followUserLocation={true}
					/>
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
