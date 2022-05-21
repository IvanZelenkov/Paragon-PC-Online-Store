import styled from "styled-components";
import background from "../images/bg-login-register.jpg";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";
import { useState, useCallback } from "react";
import { useRouter } from 'next/router';

/* Main DOM element */
const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100vw;
	height: 100vh;
	background: url(${background}); center;
	background-size: cover;
`;

/* Login window styling */
const Wrapper = styled.div`
	background-color: white;
	border: 2px solid black;
	width: 25%;
	padding: 30px;
	border-radius: 10px;
`;

/* Title of Login window */
const Title = styled.h1`
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: 30px;
	font-weight: 600;
`;

/* Form area */
const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

/* Styling input fields */
const Input = styled.input`
	flex: 1;
	min-width: 40%;
	margin: 10px 0;
	padding: 20px;
	font-size: 20px;
	border: 2px solid black;
	border-radius: 10px;
`;

/* Button to create an account */
const Button = styled.button`
	width: 10vw;
	padding: 8px 8px;
	margin-bottom: 10px;
	border-radius: 10px;
	border: 2px solid black;
	font-size: 20px;
	color: black;
	background-color: #EC2D2D;
	cursor: pointer;
`;

/* Password recovery links or if the account does not exist, the user can create a new one */
const Link = styled.a`
	font-size: 20px;
	margin: 5px 0px;
	text-decoration: underline;
	cursor: pointer;
`;

const Error = styled.span`
	color: red;
`;

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
	const { isFetching, error, currentUser } = useSelector((state) => state.user);
	const router = useRouter();

	const handleLogin = useCallback((e) => {
		e.preventDefault();
		login(dispatch, { username, password });
	}, [username, password]);
	
	if (currentUser) {
		router.replace('/');
		return null;
	}

	return (
		<Container>
			<Wrapper>
				<Title>SIGN IN</Title>
				<Form>
					<Input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
					<Input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
					<Button onClick={handleLogin} disabled={isFetching}>LOGIN</Button>
					{error && <Error>Something went wrong...</Error>}
					<Link>Forgot your password?</Link>
					<Link>Not a member? Join us</Link>
				</Form>
			</Wrapper>
		</Container>
	);
};

export default Login;