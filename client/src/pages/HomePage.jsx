import React from 'react';
import Announcement from '../components/Announcement.jsx';
import NavigationBar from '../components/NavigationBar.jsx';
import Slider from '../components/Slider.jsx';
import Categories from '../components/Categories.jsx';
import Newsletter from '../components/Newsletter.jsx';
import Footer from '../components/Footer.jsx';
import { useSelector }  from "react-redux";

/* The entire structure of the home page, consisting of 7 levels */
const HomePage = () => {
	const user = useSelector((state) => state.user.currentUser);

	return (
		<div>
			{!user && (
				<>
					<Announcement/>
					<NavigationBar/>
					<Slider/>
					<Categories/>
					<Newsletter/>
					<Footer/>
				</>
			)}
			{user && (
				<>
					<NavigationBar/>
					<Slider/>
					<Categories/>
					<Newsletter/>
					<Footer/>
				</>
			)}
		</div>
	);
};

export default HomePage;