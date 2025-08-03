import { getAllPlaces } from "@/server/directions";
import React, { createContext, useContext, useEffect, useState } from "react";

const CategoriesContext = createContext({});

export default function CategoriesProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [categories, setCategories] = useState<any>([]);

	useEffect(() => {
		const fetchCategories = async () => {
			const data = await getAllPlaces();
			setCategories(data);
		};
		fetchCategories();
	}, []);

	console.log("response", JSON.stringify(categories, null, 2));
	return (
		<CategoriesContext.Provider
			value={{
				categories,
				setCategories,
			}}
		>
			{children}
		</CategoriesContext.Provider>
	);
}

export const useCategories = () => {
	const context = useContext(CategoriesContext);
	if (!context) {
		throw new Error("useCategories must be used within a CategoriesProvider");
	}
	return context;
};
