import styled from "styled-components";
import background from "../images/bg-login-register.jpg";
import { useCallback, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/apiCalls';
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

/* Registration window styling */
const Wrapper = styled.div`
	background-color: white;
	border: 2px solid black;
	width: 40%;
	padding: 30px;
	border-radius: 10px;
	`;

/* Title of Register window */
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
	flex-wrap: wrap;
`;

/* Styling input fields */
const Input = styled.input`
	flex: 1;
	min-width: 40%;
	margin: 20px 10px 0px 0px;
	padding: 20px;
	font-size: 20px;
	border: 2px solid black;
	border-radius: 10px;
`;

/* Text of agreement under input registration fields */
const Agreement = styled.span`
	font-size: 20px;
	margin: 20px 0px;
`;

/* Button to create an account */
const Button = styled.button`
	font-size: 20px;
	width: 10vw;
	padding: 8px 8px;
	color: black;
	cursor: pointer;
	margin-bottom: 10px;
	border-radius: 10px;
	border: 2px solid black;
	background-color: #E50914;
	margin: 0 auto;
`;

/* Password recovery links or if the account does not exist, the user can create a new one */
const Link = styled.a`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 20px;
	margin: 20px 0px 0px 0px;
	text-decoration: underline;
	cursor: pointer;
`;

const Error = styled.span`
	display: flex;
	align-items: center;
	justify-content: center;
	color: red;
`;

const Register = () => {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	
	const dispatch = useDispatch();
	const { isFetching, error } = useSelector((state) => state.user);
	const router = useRouter();

	const handleRegister = useCallback((e) => {
		e.preventDefault();
		register(dispatch, { username, email, password });
		router.push('/login');
	}, [username, email, password]);

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
				history,
			};
		}, [params, match, location, history]);
  	}

	return (
		<Container>
			<Wrapper>
				<Title>CREATE AN ACCOUNT</Title>
				<Form>
					<Input type="text" placeholder="first name"/>
					<Input type="text" placeholder="last name"/>
					<Input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
					<Input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
					<Input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
					<Input type="password" placeholder="confirm password"/>
					<Agreement>
						By creating an account, I consent to the processing of my personal
						data in accordance with the <b>PRIVACY POLICY</b>
					</Agreement>
					<Button onClick={handleRegister} disabled={isFetching}>CREATE</Button>
				</Form>
				<Link href="/login">
						ALREADY HAVE AN ACCOUNT? SIGN IN
				</Link>
				{error && <Error>Something went wrong...</Error>}
			</Wrapper>
		</Container>
	);
};

export default Register;