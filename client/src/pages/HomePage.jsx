import React from 'react';
import Announcement from '../components/Announcement.jsx';
import NavigationBar from '../components/NavigationBar.jsx';
import Slider from '../components/Slider.jsx';
import Categories from '../components/Categories.jsx';
import PopularProducts from '../components/PopularProducts.jsx';
import Newsletter from '../components/Newsletter.jsx';
import Footer from '../components/Footer.jsx';

/* The entire structure of the home page, consisting of 7 levels */
const HomePage = () => {
	return (
		<div>
			<Announcement/>
			<NavigationBar/>
			<Slider/>
			<Categories/>
			<PopularProducts/>
			<Newsletter/>
			<Footer/>
		</div>
	);
};

export default HomePage;