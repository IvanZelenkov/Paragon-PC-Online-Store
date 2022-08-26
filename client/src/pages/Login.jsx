import styled from "styled-components";
import background from "../images/bg-login-register.jpg";
import { useCallback, useState, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls.js";
import queryString from "query-string";
import { useParams, useLocation, useHistory, useRouteMatch } from "react-router-dom";

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
	background-color: #E50914;
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

	return (
		<Container>
			<Wrapper>
				<Title>SIGN IN</Title>
				<Form>
					<Input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
					<Input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
					<Button onClick={handleLogin} disabled={isFetching}>LOGIN</Button>
					{error && <Error>Something went wrong...</Error>}
					<Link href="">Forgot your password?</Link>
					<Link href="/register">Not a member? Join us</Link>
				</Form>
			</Wrapper>
		</Container>
	);
};

export default Login;