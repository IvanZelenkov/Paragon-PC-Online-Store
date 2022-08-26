import styled from "styled-components";
import { useEffect, useState } from "react";
import Product from "./Product.jsx";
import axios from "axios";
import background from "../images/dragon.jpeg";

/* Main DOM element */
const Container = styled.div`
    display: flex; 
    flex-wrap: wrap; 
    padding: 40px;
	background: url(${background}) no-repeat center center fixed;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	-o-background-size: cover;
	background-size: cover;
`;

const Products = ({ category, filters, sort }) => {
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);

	useEffect(() => {
		const getProducts = async () => {
			try {
				const response = await axios.get(category ? `http://localhost:3001/api/products?category=${category}` : "http://localhost:3001/api/products");
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
			setFilteredProducts((previous) => [...previous].sort((a, b) => a.createdAt.localeCompare(b.createdAt)));
		} else if (sort === "asc") {
			setFilteredProducts((previous) => [...previous].sort((a, b) => a.price - b.price));
		} else if (sort === "desc") {
			setFilteredProducts((previous) => [...previous].sort((a, b) => b.price - a.price));
		}
	}, [sort]);

	return (
		<Container>
			{category ? 
				filteredProducts.map((item) => <Product item={item} key={item.id}/>) : 
				products.slice(0, 8).map((item) => <Product item={item} key={item.id}/>)}
		</Container>
	);
};

export default Products;