import styled from 'styled-components';
import React, { useCallback, useState } from 'react';
import { ShoppingCartOutlined } from '@material-ui/icons';
import { Badge } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from '../redux/userSlice';
import { UserGroupIcon } from '@heroicons/react/solid';
import { LogoutIcon } from '@heroicons/react/outline';

/* Main DOM element */
const Container = styled.div`
	height: 60px;
	background-color: #EC2D2D;
	color: black;
`;

/* Wrapper contains 3 flex rows (left, center, right) */
const Wrapper = styled.div`
	display: flex;
	padding: 10px 20px;
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
const Name = styled.h1`
	font-weight: bold;
	letter-spacing: 3px;
`;

/* Right part contains 3 menu items (register, sign in and shopping cart elements) */
const Right = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	flex: 1;
`;

/* Menu item styling s*/
const MenuItem = styled.div`
	font-size: 20px;
	margin-left: 30px;
	cursor: pointer;
	outline: none;
	color: black;
	
`;

const NavigationBar = () => {
	const quantity = useSelector(state=>state.cart.quantity);
	const user = useSelector((state) => state.user.currentUser);
	const dispatch = useDispatch();
	const [showPopup, setShowPopup] = useState(false);

	const handleLogout = useCallback(() => dispatch(logout()), [dispatch]);

	return (
		<Container>
			<Wrapper>
				<Left>
				</Left>
				<Center>
					<Name>PARAGON PC</Name>
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
							<div onClick={() => setShowPopup((prev) => !prev)}
								className="relative cursor-pointer ml-[10px] border  space-x-3 rounded p-2 flex justify-between items-center">
								<UserGroupIcon className="w-6 h-6 "/>
								<div className="text-[12px] sm:text-[14px] tracking-wide">
									{user?.username.toUpperCase()}
								</div>
								<div onClick={handleLogout} className={`bg-white shadow-lg absolute bottom-[-70px] ${
										!showPopup && 'opacity-0'
									} z-[3] p-4 rounded-md flex items-center transition duration-300 ease-in-out `}>
									<LogoutIcon className="h-6 w-6 text-gray-600 mr-2 " />
									<button className="text-[12px] sm:text-[14px]">
										LOGOUT
									</button>
								</div>
							</div>
						</>
					)}
					<Link to="/cart">
						<MenuItem>
							<Badge badgeContent={quantity} color="red">
								<ShoppingCartOutlined/>
							</Badge>
						</MenuItem>
					</Link>
				</Right>
			</Wrapper>
		</Container>
	);
};

export default NavigationBar;