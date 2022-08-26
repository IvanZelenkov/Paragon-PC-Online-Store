import styled from "styled-components";
import { Add, Remove } from "@material-ui/icons";
import Announcement from "../components/Announcement.jsx";
import NavigationBar from "../components/NavigationBar.jsx";
import Newsletter from "../components/Newsletter.jsx";
import Footer from "../components/Footer.jsx";
import { addProduct } from "../redux/cartSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { publicRequest } from "../requestMethods.js";
import { useCallback, useEffect, useState, useMemo } from 'react';
import queryString from "query-string";
import { useParams, useLocation, useHistory, useRouteMatch } from "react-router-dom";

/* Main DOM element */
const Container = styled.div``;

/* The wrapper contains all data on-page about the product */
const Wrapper = styled.div`
	display: flex;
	padding: 50px;
`;

/* Image container which will take space flex 1 */
const ImgContainer = styled.div`
	flex: 1;
`;

/* Product image */
const Image = styled.img`
	height: 60vh; 
	width: 34vw;
	margin-left: 100px; 
	// object-fit: cover;
	border-radius: 10px;
`;

/* The information container contains all the necessary data about the product */
const InfoContainer = styled.div`
	flex: 1;
	padding: 0px 50px;
`;

/* Product name */
const Title = styled.h1`
	font-weight: 600;
	letter-spacing: 3px;
`;

/* Product description */
const Description = styled.p`
	font-size: 20px;
	line-height: 30px;
	margin: 20px 0px;
`;

/* Product price */
const Price = styled.span`
	font-size: 40px;
	font-weight: 600;
`;

/* Filter the product by color or by GPU */
const FilterContainer = styled.div`
	display: flex;
	justify-content: space-between;
	width: 50%;
	margin: 60px 0px;
`;

/* Filter area of a specific type */
const Filter = styled.div`
	display: flex;
	align-items: center;
`;

/* Filter name, such as Color */
const FilterTitle = styled.span`
	font-size: 20px;
	font-weight: 600;
`;

/* Filter GPU styling */
const FilterGPU = styled.select`
	margin-left: 10px;
	padding: 5px;
`;

/* GPU options styling */
const FilterGPUoption = styled.option``;

/* The container consists of a quantity field and an ADD TO CART button */
const AddContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 50%;
`;

/* The number of items the user decided to buy and '+', '-' to subtract or to add more */
const AmountContainer = styled.div`
	display: flex;
	align-items: center;
	font-weight: 700;
`;

/* The number of products the user wants to buy */
const Amount = styled.span`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0px 5px;
	width: 30px;
	height: 30px;
	border-radius: 10px;
	border: 1px solid #E50914;
`;

/* ADD TO CART button */
const Button = styled.button`
	margin-top: 60px;
	padding: 10px;
	font-size: 20px;
	background-color: black;
	cursor: pointer;
	color: white;
	border-radius: 99px;
	border: 2px solid #E50914;
	transition: 1.2s ease;
	&:hover {
		background-color : #E50914;
	} 
`;

const Product = () => {
	const router = useRouter();
	const { id } = router.query;
	const dispatch = useDispatch();

	const [product, setProduct] = useState({});
	const [quantity, setQuantity] = useState(1);
	const [options, setOptions] = useState('');
	const [showMsg, setShowMsg] = useState(false);

	useEffect(() => {
		const getProduct = async () => {
			try {
				const response = await publicRequest.get(`/products/find/${id}`);
				setProduct(response.data);
			} catch (error) {}
		};

		getProduct();
	}, [id]);

	const handleQuantity = useCallback((type) => {
		if (type === 'dec') {
			setQuantity((prev) => {
				return prev > 1 ? prev - 1 : 1;
			});
		} else {
			setQuantity((prev) => prev + 1);
		}
	}, []);
	
	const handleSubmit = useCallback(() => {
		dispatch(addProduct({ ...product, quantity, options, showMsg: setShowMsg }));
	}, [product, quantity, options]);

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
			<Wrapper>
				<ImgContainer>
					<Image src={product.img}/>
				</ImgContainer>
				<InfoContainer>
					<Title>{product.title}</Title>
					<Description>{product.desc}</Description>
					<br/><br/><br/>
					<Price>$ {product.price}</Price>
					<FilterContainer>
						<Filter>
							<FilterTitle>{product.optionName}</FilterTitle>
							<FilterGPU onChange={(e) => setOptions(e.target.value)}> 
								{product.options?.map((s) => (
									<FilterGPUoption key={s}>{s}</FilterGPUoption>
								))}
							</FilterGPU>
						</Filter>
					</FilterContainer>
					<AddContainer>
						<AmountContainer>
							<Remove onClick={() => handleQuantity("dec")}/>
							<Amount>{quantity}</Amount>
							<Add onClick={() => handleQuantity("inc")}/>
						</AmountContainer>
					</AddContainer>
					<Button onClick={handleSubmit}>ADD TO CART</Button>
				</InfoContainer>
			</Wrapper>
			<Newsletter/>
			<Footer/>
		</Container>
	);
};

export default Product;