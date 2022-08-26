import styled, { keyframes } from 'styled-components';
import React, { useCallback } from 'react';
import { ShoppingCartOutlined } from '@material-ui/icons';
import { Badge } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../redux/userSlice';
import { UserIcon } from '@heroicons/react/solid';
import { LogoutIcon } from '@heroicons/react/outline';
import { Link } from "react-router-dom";

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
	height: 80px;
	background: linear-gradient(-90deg, #E50914, gold, #E50914, gold) fixed;
	animation: ${NavBarKeyFrame} 5s ease infinite;
	background-size: 400% 400%;
	color: white;
`;

/* Wrapper contains 3 flex rows (left, center, right) */
const Wrapper = styled.div`
	display: flex;
	padding: 15px 20px;
	align-items: center;
	justify-content: space-between;
`;

/* Left part contains search bar */
const Left = styled.div`
	display: flex;
	align-items: center;
	flex: 1;
`;

/* Center part contains name of the company */
const Center = styled.div`
	flex: 1;
	text-align: center;
`;

/* Name of the company */
const Name = styled.a` 
	font-size: 38px;
	font-weight: bold;
	letter-spacing: 3px;
	color: black;
	text-decoration: none;
`

/* Right part contains 3 menu items (register, sign in and shopping cart elements) */
const Right = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	flex: 1;
	color: black;
`;

/* Menu item styling s*/
const MenuItem = styled.div`
	margin-left: 30px;
	cursor: pointer;
	outline: none;
	color: black;
`;

const NavigationBar = () => {
	const quantity = useSelector(state=>state.cart.quantity);
	const user = useSelector((state) => state.user.currentUser);
	const dispatch = useDispatch();

	const handleLogout = useCallback(() => dispatch(logout()), [dispatch]);

	return (
		<Container>
			<Wrapper>
				<Left>
				</Left>
				<Center>
					<Name href="/">
						PARAGON PC
					</Name>
				</Center>
				<Right>
					{!user && (
						<>
							<Link to="/register" style={{ textDecoration: 'none' }}>
								<MenuItem>REGISTER</MenuItem>
							</Link>
							<Link to="/login" style={{ textDecoration: 'none' }}>
								<MenuItem>SIGN IN</MenuItem>
							</Link>
						</>
					)}
					{user && (
						<>
							<div style={{ display: 'flex'}}>
								<UserIcon style={{ width: '2rem', height: '2rem' }}/>
								<div style={{ fontSize: '14px', letterSpacing: '0.025em', cursor: 'default'}}>
									{user?.username.toUpperCase()}
								</div>
								<div onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', borderRadius: '0.375rem', cursor: 'pointer'}}>
									<LogoutIcon style={{width: '2rem', height: '2rem', marginLeft: '2rem', marginRight: '0.5rem'}}/>
								</div>
							</div>
						</>
					)}
					<Link to="/cart" style={{ marginRight: '0.5rem' }}>
						<MenuItem>
							<Badge badgeContent={quantity} color="red">
								<ShoppingCartOutlined style={{ width: '2rem', height: '2rem' }}/>
							</Badge>
						</MenuItem>
					</Link>
				</Right>
			</Wrapper>
		</Container>
	);
};

export default NavigationBar;