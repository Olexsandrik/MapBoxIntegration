import React from "react";
import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Place {
	id: string;
	name: string;
	address: string;
	distance?: number;
	rating?: number;
	category: string;
}

interface PlacesListProps {
	places: Place[];
	visible: boolean;
	onPlacePress: (place: Place) => void;
	onClose: () => void;
}

export default function PlacesList({
	places,
	visible,
	onPlacePress,
	onClose,
}: PlacesListProps) {
	if (!visible || places.length === 0) return null;

	const getCategoryIcon = (category: string) => {
		switch (category) {
			case "restaurant":
				return "restaurant";
			case "hotel":
				return "bed";
			case "hospital":
				return "medical";
			case "shop":
				return "bag";
			case "entertainment":
				return "game-controller";
			default:
				return "location";
		}
	};

	const renderPlace = ({ item }: { item: Place }) => (
		<TouchableOpacity style={styles.placeItem} onPress={() => item}>
			<View style={styles.placeIcon}>
				<Ionicons
					name={getCategoryIcon(item.category) as any}
					size={20}
					color="#007AFF"
				/>
			</View>
			<View style={styles.placeInfo}>
				<Text style={styles.placeName}>{item.name}</Text>
				<Text style={styles.placeAddress}>{item.address}</Text>
				{item.distance && (
					<Text style={styles.placeDistance}>
						{item.distance.toFixed(1)} км
					</Text>
				)}
			</View>
			{item.rating && (
				<View style={styles.ratingContainer}>
					<Ionicons name="star" size={16} color="#FFD700" />
					<Text style={styles.ratingText}>{item.rating}</Text>
				</View>
			)}
		</TouchableOpacity>
	);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Заклади поблизу</Text>
				<TouchableOpacity onPress={onClose} style={styles.closeButton}>
					<Ionicons name="close" size={24} color="#333" />
				</TouchableOpacity>
			</View>
			<FlatList
				data={places}
				renderItem={renderPlace}
				keyExtractor={(item) => item.id}
				style={styles.list}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: "rgba(255, 255, 255, 0.95)",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		maxHeight: "50%",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: -2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		zIndex: 1000,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 20,
		borderBottomWidth: 1,
		borderBottomColor: "#E5E5E5",
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#333",
	},
	closeButton: {
		padding: 5,
	},
	list: {
		paddingHorizontal: 20,
	},
	placeItem: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 15,
		borderBottomWidth: 1,
		borderBottomColor: "#F0F0F0",
	},
	placeIcon: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: "#F0F8FF",
		alignItems: "center",
		justifyContent: "center",
		marginRight: 15,
	},
	placeInfo: {
		flex: 1,
	},
	placeName: {
		fontSize: 16,
		fontWeight: "600",
		color: "#333",
		marginBottom: 2,
	},
	placeAddress: {
		fontSize: 14,
		color: "#666",
		marginBottom: 2,
	},
	placeDistance: {
		fontSize: 12,
		color: "#007AFF",
		fontWeight: "500",
	},
	ratingContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	ratingText: {
		fontSize: 14,
		fontWeight: "600",
		color: "#333",
		marginLeft: 4,
	},
});
