import Mapbox from "@rnmapbox/maps";
import { StyleSheet, View } from "react-native";
import { MAP_BOX_TOKEN } from "@env";
import { featureCollection, point } from "@turf/helpers";
import pin from "../assets/pin.png";
import routeResponse from "../data/route.json";
import scooters from "../data/scooters.json";
import { getDirections } from "@/server/directions";
import { OnPressEvent } from "@rnmapbox/maps/lib/typescript/src/types/OnPressEvent";
import { useEffect, useState } from "react";
import * as Location from "expo-location";

// Replace with your actual Mapbox access token
Mapbox.setAccessToken(`${MAP_BOX_TOKEN}`);
export default function Index() {
	const [location, setLocation] = useState<any | null>(null);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	const [direction, setDirection] = useState<any>();

	useEffect(() => {
		async function getCurrentLocation() {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);
		}

		getCurrentLocation();
	}, []);

	const scootersFeatures = scooters.map((scooter) =>
		point([scooter.long, scooter.lat])
	);

	const directionCoordinates = direction?.routes[0].geometry.coordinates;

	const onPintPress = async (event: OnPressEvent) => {
		const newDirectionCoordinates = await getDirections(
			[location.coords.longitude, location.coords.latitude],
			[event.coordinates.longitude, event.coordinates.latitude]
		);
		setDirection(newDirectionCoordinates);
	};

	console.log("location", location);
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
						onPress={onPintPress}
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

					{directionCoordinates && (
						<Mapbox.ShapeSource
							id="routerSource"
							shape={{
								properties: {},
								type: "Feature",
								geometry: {
									type: "LineString",
									coordinates: directionCoordinates,
								},
							}}
						>
							<Mapbox.LineLayer
								id="routerLine"
								style={{
									lineColor: "#42A2D9",
									lineWidth: 7,
									lineCap: "round",
									lineJoin: "round",
									lineDasharray: [0, 4, 3],
								}}
							/>
						</Mapbox.ShapeSource>
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
