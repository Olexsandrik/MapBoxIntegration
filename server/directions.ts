import { MAP_BOX_TOKEN } from "@env";
const BASE_URL = "https://api.mapbox.com/directions/v5/mapbox";

const BASE_URL_CATEGORIES = "https://api.mapbox.com";

export async function getDirections(from: any, to: any) {
	const response = await fetch(
		`${BASE_URL}/driving/${from[0]},${from[1]};${to[0]},${to[1]}?alternatives=true&annotations=distance%2Cduration&geometries=geojson&language=en&overview=full&steps=true&access_token=${MAP_BOX_TOKEN}`
	);
	const data = await response.json();

	return data;
}

export async function getInfoCategories(
	category: string,
	lat: number,
	lon: number
) {
	const response = await fetch(
		`${BASE_URL_CATEGORIES}/search/searchbox/v1/category/${category}?proximity=${lon},${lat}&limit=25&access_token=${MAP_BOX_TOKEN}`
	);
	const data = await response.json();

	return data;
}
