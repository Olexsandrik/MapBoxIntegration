import Mapbox from "@rnmapbox/maps";
import { Position } from "@rnmapbox/maps/lib/typescript/src/types/Position";

export default function LineRoute({
	coordinates,
}: {
	coordinates: Position[];
}) {
	return (
		<Mapbox.ShapeSource
			id="routerSource"
			shape={{
				properties: {},
				type: "Feature",
				geometry: {
					type: "LineString",
					coordinates: coordinates,
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
	);
}
