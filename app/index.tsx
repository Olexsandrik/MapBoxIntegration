import Mapbox from "@rnmapbox/maps";
import { StyleSheet, View } from "react-native";
import { MAP_BOX_TOKEN } from "@env";

Mapbox.setAccessToken(`${MAP_BOX_TOKEN}`);
export default function index() {
	return (
		<View style={styles.page}>
			<View style={styles.container}>
				<Mapbox.MapView style={styles.map} />
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
	},
	container: {
		height: "64%",
		width: "64%",
	},
	map: {
		flex: 1,
	},
});
