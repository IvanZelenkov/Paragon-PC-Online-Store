import styled from "styled-components";
import { Add, Remove, DeleteOutline } from "@material-ui/icons";
import Announcement from "../components/Announcement.jsx";
import NavigationBar from "../components/NavigationBar.jsx";
import Footer from "../components/Footer.jsx";
import StripeCheckout from "react-stripe-checkout";
import { useDispatch, useSelector }  from "react-redux";
import { useCallback, useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { publicRequest } from '../requestMethods';
import { deleteProduct, emptyCart } from '../redux/cartSlice';
import { Link } from "react-router-dom";

const KEY = process.env.REACT_APP_STRIPE;

/* Main DOM element */
const Container = styled.div``;

/* The wrapper of cart to create padding */
const Wrapper = styled.div`
	padding: 20px;
`;

/* Title of page */
const Title = styled.h1`
	text-align: center;
	font-weight: 600;
`;

/* Sections contains 2 buttons and 2 info texts about user's cart */
const Top = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20px;
`;

/* CHECK OUT and CONTINUE SHOPPING buttons */
const TopButton = styled.button`
	width: 12vw;
	word-wrap: break-word;
	padding: 10px;
    font-size: 20px;
    background-color: black;
    cursor: pointer;
    color: white;
    border-radius: 99px;
    border: 2px solid #E50914;
    transition: 1.2s ease;
    &:hover {
        background-color: #E50914;
    } 
`;

/* Shopping Bag and Your Wishlist texts */
const TopText = styled.span`
	font-size: 20px;
	margin: 0px 10px;
`;

/* The bottom part of the page contains data about products and their prices*/
const Bottom = styled.div`
	display: flex;
	justify-content: space-between;
`;

/* Info contains data about items in a cart */
const Info = styled.div`
	flex: 3;
`;

/* Product part contains data about product (description + cost) */
const Product = styled.div`
	display: flex;
	justify-content: space-between;
`;

/* Product details contain description and image of the product not including price details */
const ProductDetail = styled.div`
	display: flex;
	flex: 2;
`;

/* Image of the product */
const Image = styled.img`
	width: 200px;
	border-radius: 10px;
`;

/* Details includes description and cost */
const Details = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	padding: 20px;
`;

/* Product name field */
const ProductName = styled.span``;

/* Product id field */
const ProductId = styled.span``;

/* Product color field */
const ProductColor = styled.div`
	border-radius: 50%;
	background-color: ${(props) => props.color};
	width: 20px;
	height: 20px;
`;

/* Product price field */
const PriceDetail = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	flex: 1;
`;

/* The number of items the user decided to buy and '+', '-' to subtract or to add more */
const ProductAmountContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 20px;
`;

/* The number of items the user decided to buy */
const ProductAmount = styled.div`
	font-size: 30px;
	margin: 5px;
`;

/* Product price */
const ProductPrice = styled.div`
	font-size: 30px;
	font-weight: 600;
`;

/* Defines a thematic break on a page */
const Delimiter = styled.hr`
	height: 1px;
	background-color: #eee;
	border: none;
`;

/* Container style on the right side that contains all the calculations to get the total purchase amount */
const Summary = styled.div`
	flex: 1;
	border: 0.5px solid lightgray;
	border-radius: 10px;
	padding: 20px;
	height: 50vh;
`;

/* ORDER SUMMARY title */
const SummaryTitle = styled.h1`
	font-weight: 600;
`;

/* Summary for each calculation like subtotal, tax, shipping, and total */
const SummaryItem = styled.div`
	margin: 30px 0px;
	display: flex;
	justify-content: space-between;
	font-weight: ${(props) => props.type === "total" && "500"};
	font-size: ${(props) => props.type === "total" && "24px"};
`;

/* Text of some calculation definition */
const SummaryItemText = styled.span``;

/* Price of calculation for some item */
const SummaryItemPrice = styled.span``;

/* CHECKOUT NOW button */
const Button = styled.button`
	width: 100%;
	word-wrap: break-word;
	padding: 10px;
    font-size: 20px;
    background-color: black;
    cursor: pointer;
    color: white;
    border-radius: 99px;
    border: 2px solid #E50914;
    transition: 1.2s ease;
    &:hover {
        background-color: #E50914;
    } 
`;

const ShoppingCart = () => {
	const cart = useSelector((state) => state.cart);
	const router = useRouter();
	const dispatch = useDispatch();

	const [stripeToken, setStripeToken] = useState(null);

	const onToken = (token) => {
		setStripeToken(token);
	};

	const handleDelete = useCallback((product) => {
		dispatch(deleteProduct({
			id: product._id,
			total: product.price * product.quantity
		}));
		console.log(product);
	}, []);

	useEffect(() => {
		const makeRequest = async () => {
			try {
				dispatch(emptyCart());
			} catch (error) {
				console.log(error);
			}		
		};
    	stripeToken && cart.total >= 1 && makeRequest();
  	}, [stripeToken, cart, router]);

	let shippingCost = 9.90;
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
				<Title>YOUR BAG</Title>
				<Top>
					<Link to="/">
						<TopButton>CONTINUE SHOPPING</TopButton>
					</Link>
					<TopText>Shopping Bag({cart.products.length})</TopText>
					<TopButton onClick={() => dispatch(emptyCart())} type="filled">EMPTY CART</TopButton>
				</Top>
				<Bottom>
					<Info>
						{cart.products.map((product) => (
							<Product>
								<ProductDetail>
									<Image src={product.img}/>
									<Details>
										<ProductName>
											<b>Product:</b> {product.title}
										</ProductName>
										<ProductId>
											<b>ID:</b> {product._id}
										</ProductId>
										<ProductColor color={product.color}/>
									</Details>
								</ProductDetail>
								<PriceDetail>
									<ProductAmountContainer>
									<Add/>
									<ProductAmount>{product.quantity}</ProductAmount>
									<Remove/>
									</ProductAmountContainer>
									<ProductPrice>$ {product.price * product.quantity}</ProductPrice>
									<DeleteOutline onClick={() => handleDelete(product)} style={{fontSize: '30px', color: 'red', marginTop: '1.5rem', cursor: 'pointer'}}/>
								</PriceDetail>
							</Product>
						))}
						<Delimiter/>
					</Info>
					<Summary>
						<SummaryTitle>ORDER SUMMARY</SummaryTitle>
						<SummaryItem>
							<SummaryItemText>Subtotal</SummaryItemText>
							<SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
						</SummaryItem>
						{!user && (
							<>
								<SummaryItem>
									<SummaryItemText>Estimated Shipping</SummaryItemText>
									<SummaryItemPrice>$ {shippingCost}</SummaryItemPrice>
								</SummaryItem>
								<SummaryItem>
									<SummaryItemText>Shipping Discount</SummaryItemText>
									<SummaryItemPrice>$ 0</SummaryItemPrice>
								</SummaryItem>
								<SummaryItem type="total">
									<SummaryItemText>Total</SummaryItemText>
									<SummaryItemPrice>$ {cart.total === 0 ? 0 : cart.total + shippingCost}</SummaryItemPrice>
								</SummaryItem>
								<StripeCheckout name="Paragon PC"
									image="https://s5o.ru/storage/simple/cyber/edt/41/39/8b/c0/cyberee6e91e0c8d.jpg"
									billingAddress shippingAddress
									description={`Your total is $${cart.total + shippingCost}`}
									amount={(cart.total + shippingCost) * 100} token={onToken} stripeKey={KEY}>
									<Button>CHECKOUT NOW</Button>
								</StripeCheckout>
							</>
						)}
						{user && (
							<>
								<SummaryItem>
									<SummaryItemText>Shipping Discount</SummaryItemText>
									<SummaryItemPrice>$ -9.90</SummaryItemPrice>
								</SummaryItem>
								<SummaryItem type="total">
									<SummaryItemText>Total</SummaryItemText>
									<SummaryItemPrice>$ {cart.total === 0 ? 0 : cart.total}</SummaryItemPrice>
								</SummaryItem>
								<StripeCheckout name="Paragon PC"
									image="https://s5o.ru/storage/simple/cyber/edt/41/39/8b/c0/cyberee6e91e0c8d.jpg"
									billingAddress shippingAddress
									description={`Your total is $${cart.total}`}
									amount={cart.total * 100} token={onToken} stripeKey={KEY}>
									<Button>CHECKOUT NOW</Button>
								</StripeCheckout>
							</>
						)}
					</Summary>
				</Bottom>
			</Wrapper>
			<Footer/>
		</Container>
	);
};

export default ShoppingCart;