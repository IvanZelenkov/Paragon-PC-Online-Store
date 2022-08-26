import styled from "styled-components";
/* Destructure categories from data.js */
import { categories } from "../data.js";
import CategoryItem from "./CategoryItem.jsx";
import background from "../images/dragon.jpeg";

/* Main DOM element */
const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
	background: url(${background}) no-repeat center center fixed;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	-o-background-size: cover;
	background-size: cover;
`;

const Categories = () => {
	return (
		/* Map each category, which contains id, image and title.
		There are 3 categories: Desktops, Laptops, Accessories. */
		<Container>
			{categories.map((item) => (
				<CategoryItem key={item.id} item={item}/>
			))}
		</Container>
	);
};

export default Categories;