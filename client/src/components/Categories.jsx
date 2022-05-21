import styled from "styled-components";
/* Destructure categories from data.js */
import { categories } from "../data.js";
import CategoryItem from "./CategoryItem.jsx";

/* Main DOM element */
const Container = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: black;
    padding: 15px;
`;

const Categories = () => {
	return (
		/* Map each category, which contains id, image and title.
		There are 3 categories: Desktops, Laptops, Accessories. */
		<Container>
			{categories.map(item => (
				<CategoryItem key={item.id} item={item}/>
			))}
		</Container>
	);
};

export default Categories;