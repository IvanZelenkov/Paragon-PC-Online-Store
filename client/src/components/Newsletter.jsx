import styled, { keyframes } from "styled-components";
import { Send } from '@material-ui/icons';
import background from "../images/dragon.jpeg";

const NavBarKeyFrame = keyframes`
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`;

/* Main DOM element */
const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	height: 35vh;
	color: white;
	background: url(${background}) no-repeat center center fixed;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	-o-background-size: cover;
	background-size: cover;
`;

/* Title "Newsletter" styling */
const Title = styled.h1`
	font-size: 65px;
	margin-bottom: 20px;
	background: linear-gradient(90deg, #E50914, gold, #E50914, gold) fixed;
	animation: ${NavBarKeyFrame} 5s ease infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
	background-size: 400% 400%;
`;

/* Description of the newsletter */
const Description = styled.div`
	font-size: 24px;
	font-weight: 500;
	margin-bottom: 20px;
	background: linear-gradient(90deg, #E50914, gold, #E50914, gold) fixed;
	animation: ${NavBarKeyFrame} 5s ease infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
	background-size: 400% 400%;
`;

/* Input form area */
const Form = styled.form`
	width: 25%;
	height: 40px;
	background-color: white;
	display: flex;
	justify-content: space-between;
	border: 5px solid rgba(255, 0, 0, 0);
	background-color: #E50914;
	border-radius: 10px;
`;

/* Input area field inside input container */
const Input = styled.input`
	border: none;
	flex: 8;
	padding-left: 20px;
	font-size: 20px;
	border-radius: 10px;
	margin-right: 10px;
`;

/* Button to send user email to receive timely updates */
const Button = styled.button`
	flex: 1;
	border: none;
	background-color: black;
	color: white;
	cursor: pointer;
	transition: 1.2s ease;
	border-radius: 10px;

	&:hover {
		background: linear-gradient(90deg, black, black, #E50914, #E50914) fixed;
		animation: ${NavBarKeyFrame} 1s ease infinite;
		background-size: 400% 400%;
		color: white;
	}
`;

/* TBA */
const Newsletter = () => {
	return (
		<Container>
			<Title>SUBSCRIBE</Title>
			<Description>GET TIMELY UPDATES FROM YOUR FAVORITE PRODUCTS.</Description>
			<Form>
				<Input type="email" placeholder="Your email"/>
				<Button>
					<Send/>
				</Button>
			</Form>
		</Container>
	);
};

export default Newsletter;