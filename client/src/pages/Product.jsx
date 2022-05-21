import styled from "styled-components";
import { Add, Remove } from "@material-ui/icons";
import Announcement from "../components/Announcement.jsx";
import NavigationBar from "../components/NavigationBar.jsx";
import Newsletter from "../components/Newsletter.jsx";
import Footer from "../components/Footer.jsx";
import { useLocation } from "react-router-dom";
import { addProduct } from "../redux/cartSlice.js";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods.js";

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
	width: 30vw;
	margin-left: 100px; 
	// object-fit: cover;
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
	margin: 30px 0px;
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

/* Filter color styling */
const FilterColor = styled.div`
	width: 20px;
	height: 20px;
	margin: 0px 5px;
	border-radius: 50%;
	background-color: ${(properties) => properties.color};
	cursor: pointer;
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
	border: 1px solid #EC2D2D;
`;

/* ADD TO CART button */
const Button = styled.button`
	padding: 15px;
	font-size: 20px;
	border-radius: 10px;
	border: 2px solid black;
	background-color: #EC2D2D;
	color: black;
	&:hover{
		color: white;
		background-color: black;
	}
	cursor: pointer;
`;

const Product = () => {
	const location = useLocation();
	const id = location.pathname.split("/")[2];
	const [product, setProduct] = useState({});
	const [quantity, setQuantity] = useState(1);
	const [color, setColor] = useState("");
	const [size, setSize] = useState("");
	const dispatch = useDispatch();

	useEffect(() => {
		const getProduct = async () => {
			try {
				const res = await publicRequest.get("/products/find/" + id);
				setProduct(res.data);
			} catch {}
		};
		getProduct();
	}, [id]);

	const handleQuantity = (type) => {
		if (type === "dec") {
			quantity > 1 && setQuantity(quantity - 1);
		} else {
			setQuantity(quantity + 1);
		}
	};

	const handleClick = () => {
		dispatch(addProduct({ ...product, quantity, color, size }))
	};

	return (
		<Container>
			<Announcement/>
			<NavigationBar/>
			<Wrapper>
				<ImgContainer>
					<Image src={product.img}/>
				</ImgContainer>
				<InfoContainer>
					<Title>{product.title}</Title>
					<Description>{product.desc}</Description>
					<br/>
					<Description>
						Play at maximum settings up to 2K resolution.
					</Description>
					<Price>${product.price}</Price>
					<FilterContainer>
						<Filter>
							<FilterTitle>Color</FilterTitle>
							{product.color?.map((c) => (
								<FilterColor color={c} key={c} onClick={() => setColor(c)}/>
							))}
						</Filter>
						<Filter>
							<FilterTitle>GPU</FilterTitle>
							<FilterGPU onChange={(e) => setSize(e.target.value)}> 
							{product.size?.map((s) => (
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
						<Button onClick={handleClick}>ADD TO CART</Button>
					</AddContainer>
				</InfoContainer>
			</Wrapper>
			<Newsletter/>
			<Footer/>
		</Container>
	);
};

export default Product;