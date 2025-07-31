import Mapbox from "@rnmapbox/maps";
import { StyleSheet, View } from "react-native";
import { useState, useRef } from "react";
import { MAP_BOX_TOKEN } from "@env";
import pin from "../../assets/pin.png";
import { useCategory } from "@/providers/CategoryProvider";
import LineRoute from "../LineRoute";
import CategoryMarkers from "../CategoryMarkers";
import CategoryButtons from "../CategoryButtons";
import LocationButton from "../LocationButton";
import PlacesList from "../PlacesList";
import * as Location from "expo-location";
import { getInfoCategories } from "../../server/directions";

Mapbox.setAccessToken(`${MAP_BOX_TOKEN}`);
export default function Map() {
	const { directionCoordinates } = useCategory();

	const [places, setPlaces] = useState<any[]>([]);
	const [showPlacesList, setShowPlacesList] = useState(false);
	const [category, setCategory] = useState<string | null>(null);
	const cameraRef = useRef<Mapbox.Camera>(null);

	const handleCategoryPress = async (category: string) => {
		try {
			setCategory(category);
			const userLocation = await Location.getCurrentPositionAsync();

			const placesData = await getInfoCategories(
				category,
				userLocation.coords.latitude,
				userLocation.coords.longitude
			);

			const formattedPlaces =
				placesData.features?.map((place: any, index: number) => ({
					id: place.id || index.toString(),
					name: place.properties?.name || "Невідомий заклад",
					address: place.properties?.address || "Адреса не вказана",
					category: category,
					rating: place.properties?.rating,
					distance: place.properties?.distance,
					coordinates: place.geometry?.coordinates,
				})) || [];

			setPlaces(formattedPlaces);
			setShowPlacesList(true);
		} catch (error) {
			console.error("Помилка пошуку закладів:", error);
		}
	};

	const handleLocationPress = async () => {
		try {
			const userLocation = await Location.getCurrentPositionAsync();
			cameraRef.current?.setCamera({
				centerCoordinate: [
					userLocation.coords.longitude,
					userLocation.coords.latitude,
				],
				zoomLevel: 15,
				animationDuration: 1000,
			});
		} catch (error) {
			console.error("Помилка отримання локації:", error);
		}
	};

	const handlePlacePress = (coordinates: any) => {
		if (coordinates) {
			cameraRef.current?.setCamera({
				centerCoordinate: coordinates,
				zoomLevel: 16,
				animationDuration: 1000,
			});
		}
		setShowPlacesList(false);
	};

	return (
		<View style={styles.page}>
			<View style={styles.container}>
				<Mapbox.MapView
					style={styles.map}
					styleURL="mapbox://styles/mapbox/dark-v11"
				>
					<Mapbox.UserLocation />
					<Mapbox.Camera
						ref={cameraRef}
						zoomLevel={15}
						centerCoordinate={[2.1589, 41.3907]}
					/>
					<Mapbox.LocationPuck
						visible={true}
						puckBearingEnabled={true}
						puckBearing="heading"
					/>
					<Mapbox.Images images={{ pin }} />
					{/* <ScooterMarkers
						setSelectedScooter={setSelectedScooter}
						places={places}
					/> */}

					<CategoryMarkers places={places} onPlacePress={handlePlacePress} />

					{directionCoordinates && (
						<LineRoute coordinates={directionCoordinates} />
					)}
				</Mapbox.MapView>
			</View>

			<CategoryButtons
				onCategoryPress={handleCategoryPress}
				selectedCategory={category}
			/>

			<LocationButton onPress={handleLocationPress} />

			<PlacesList
				places={places}
				visible={showPlacesList}
				onPlacePress={handlePlacePress}
				onClose={() => setShowPlacesList(false)}
			/>
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
