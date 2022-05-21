import styled from "styled-components";
import { useEffect, useState } from "react";
import PopularProduct from "./PopularProduct.jsx";
import axios from "axios";

/* Main DOM element */
const Container = styled.div`
    display: flex; 
    flex-wrap: wrap;
    justify-content: space-between;   
    padding: 20px;
    background-color: black;
`;

const PopularProducts = ({ category, filters, sort }) => {
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);

	useEffect(() => {
		const getProducts = async () => {
			try {
				const response = await axios.get(category ? `http://localhost:3000/api/products?category=${category}` : "http://localhost:3000/api/products");
				setProducts(response.data);
			} catch (error) {}
		};
		getProducts();
	}, [category]);

	useEffect(() => {
		category && setFilteredProducts(
			products.filter((item) => 
				Object.entries(filters).every(([key, value]) => 
					item[key].includes(value)
				)
			)
		);
	}, [products, category, filters]);

	useEffect(() => {
		if (sort === "newest") {
			setFilteredProducts((previous) => [...previous].sort((a, b) => a.createdAt - b.createdAt));
		} else if (sort === "asc") {
			setFilteredProducts((previous) => [...previous].sort((a, b) => a.price - b.price));
		} else {
			setFilteredProducts((previous) => [...previous].sort((a, b) => b.price - a.price));
		}
	}, [sort]);

	return (
		<Container>
			{category ? 
				filteredProducts.map((item) => <PopularProduct item={item} key={item.id}/>) : 
				products.slice(0, 8).map((item) => <PopularProduct item={item} key={item.id}/>)}
		</Container>
	);
};

export default PopularProducts;