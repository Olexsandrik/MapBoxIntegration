import { MAP_BOX_TOKEN } from "@env";
const BASE_URL = "https://api.mapbox.com/directions/v5/mapbox";

export async function getDirections(from: any, to: any) {
	const response = await fetch(
		`${BASE_URL}/driving/${from[0]},${from[1]};${to[0]},${to[1]}?alternatives=true&annotations=distance%2Cduration&geometries=geojson&language=en&overview=full&steps=true&access_token=${MAP_BOX_TOKEN}`
	);
	const data = await response.json();
	// console.log(JSON.stringify(data, null, 2));
	return data;
}
