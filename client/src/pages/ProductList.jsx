import styled from "styled-components";
import Announcement from "../components/Announcement.jsx";
import NavigationBar from "../components/NavigationBar.jsx";
import PopularProducts from "../components/PopularProducts.jsx";
import Newsletter from "../components/Newsletter.jsx";
import Footer from "../components/Footer.jsx";
import { useLocation } from "react-router";
import { useState } from "react"

/* Main DOM element */
const Container = styled.div``;

/* Category name */
const CategoryName = styled.h1`
    margin: 20px;
`;

/* Filter that contains 2 block to filter or 1 block to sort */
const Filter = styled.div`
    margin: 20px;
`;

/* Inner text of filter */
const FilterText = styled.span`
  margin-right: 20px;
  font-size: 20px;
  font-weight: 600;
`;

/* Select gives the user options to select a filtering option */
const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;

/* Filter that contains 2 block to filter and 1 block to sort together */
const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

/* Option to filter or sort */
const Option = styled.option``;

const ProductList = () => {
	const location = useLocation();
	const category = location.pathname.split("/")[2];
	const [filters, setFilters] = useState({});
	const [sort, setSort] = useState("newest");

	const handleFilters = (e) => {
		const value = e.target.value;
		setFilters({...filters, [e.target.name]: value});
	};
	
    return (
		<Container>
			<Announcement/>
			<NavigationBar/>
			<CategoryName>{category}</CategoryName>
			<FilterContainer>
				<Filter>
					<FilterText>Filter Products:</FilterText>
					<Select name="color" onChange={handleFilters}>
						<Option disabled>Color</Option>
						<Option>White</Option>
						<Option>Black</Option>
						<Option>Red</Option>
						<Option>Blue</Option>
						<Option>Yellow</Option>
						<Option>Green</Option>
					</Select>
					<Select name="company" onChange={handleFilters}>
						<Option disabled>Company</Option>
						<Option>Asus</Option>
						<Option>Razer</Option>
						<Option>Paragon PC</Option>
						<Option>Steelseries</Option>
						<Option>AOC</Option>
					</Select>
				</Filter>
				<Filter>
					<FilterText>Sort Products:</FilterText>
					<Select onChange={(e) => setSort(e.target.value)}>
						<Option value="newest">Newest</Option>
						<Option value="asc">Price Low to High</Option>
						<Option value="desc">Price High to Low</Option>
					</Select>
				</Filter>
			</FilterContainer>
			<PopularProducts category={category} filters={filters} sort={sort}/>
			<Newsletter/>
			<Footer/>
		</Container>
	);
};

export default ProductList;