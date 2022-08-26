import styled from "styled-components";
import Announcement from "../components/Announcement.jsx";
import NavigationBar from "../components/NavigationBar.jsx";
import Products from "../components/Products.jsx";
import Newsletter from "../components/Newsletter.jsx";
import Footer from "../components/Footer.jsx";
import { useCallback, useState, useMemo } from 'react';
import queryString from "query-string";
import { useParams, useLocation, useHistory, useRouteMatch } from "react-router-dom";
import { useSelector }  from "react-redux";

/* Main DOM element */
const Container = styled.div``;

/* Category name */
const CategoryName = styled.h1`
	display: flex;
	align-items: center;
	justify-content: center;
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
	const router = useRouter();
	const { category } = router.query;

	const [filters, setFilters] = useState({});
	const [sort, setSort] = useState("newest");

	const handleFilter = useCallback((e) => {
    	const value = e.target.value;
    	setFilters((prev) => ({
      		...prev,
      		[e.target.name]: value,
    	}));
  	}, []);

	// Hook
	function useRouter() {
		const params = useParams();
		const location = useLocation();
		const history = useHistory();
		const match = useRouteMatch();
	
		// Return our custom router object
		// Memoize so that a new object is only returned if something changes
		return useMemo(() => {
			return {
				// For convenience add push(), replace(), pathname at top level
				push: history.push,
				replace: history.replace,
				pathname: location.pathname,
				// Merge params and parsed query string into single "query" object
				// so that they can be used interchangeably.
				// Example: /:topic?sort=popular -> { topic: "react", sort: "popular" }
				query: {
					...queryString.parse(location.search), // Convert string to object
					...params
				},
				// Include match, location, history objects so we have
				// access to extra React Router functionality if needed.
				match,
				location,
				history
			};
		}, [params, match, location, history]);
  	}

	const user = useSelector((state) => state.user.currentUser);
	
    return (
		<Container>
			{!user && (
				<>
					<Announcement/>
				</>
			)}
			<NavigationBar/>
			<CategoryName>{category}</CategoryName>
			<FilterContainer>
				<Filter>
					<FilterText>Filter Products:</FilterText>
					<Select name="company" onChange={handleFilter}>
						<Option label="All"></Option>
						<Option>Asus</Option>
						<Option>Razer</Option>
						<Option>MSI</Option>
						<Option>Skytech</Option>
						<Option>SteelSeries</Option>
						<Option>AOC</Option>
						<Option>CLX</Option>
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
			<Products category={category} filters={filters} sort={sort}/>
			<Newsletter/>
			<Footer/>
		</Container>
	);
};

export default ProductList;