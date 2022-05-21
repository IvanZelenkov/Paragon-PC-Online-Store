import styled from "styled-components";
import { Send } from '@material-ui/icons';
import emailjs from 'emailjs-com';
import { useCallback, useRef, useState } from 'react';

/* Main DOM element */
const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	height: 35vh;
	color: white;
	background-color: black;
`;

/* Title "Newsletter" styling */
const Title = styled.h1`
	font-size: 65px;
	margin-bottom: 20px;
`;

/* Description of the newsletter */
const Description = styled.div`
	font-size: 24px;
	font-weight: 500;
	margin-bottom: 20px;
`;

/* Input form area */
const Form = styled.form`
	width: 45%;
	height: 40px;
	background-color: white;
	display: flex;
	justify-content: space-between;
	border: 1px solid lightgray;
`;

/* Input area field inside input container */
const Input = styled.input`
	border: none;
	flex: 8;
	padding-left: 20px;
`;

/* Button to send user email to receive timely updates */
const Button = styled.button`
	flex: 1;
	border: none;
	background-color: #EC2D2D;
	color: white;
	cursor: pointer;
`;

const Newsletter = () => {
	const formRef = useRef();
	const [done, setDone] = useState(false);

	const handleSubmit = useCallback((e) => {
		e.preventDefault();

		emailjs
			.sendForm(
				'service_h8iyemw',
				'template_qecmi8m',
				formRef.current,
				'user_aB5o9bPNynUR53tsgyAoO'
			).then((result) => {
				console.log(result.text);
				setDone(true);
			},
			(error) => {
				console.log(error.text);
			});
		},
		[formRef]
	);

	return (
		<Container>
			<Title>Newsletter</Title>
			<Description>Get timely updates from your favorite products.</Description>
			<Form>
				<Input placeholder="Your email"/>
				<Button>
					<Send/>
				</Button>
			</Form>
		</Container>
	);
};

export default Newsletter;