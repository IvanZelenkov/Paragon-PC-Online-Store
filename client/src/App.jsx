import HomePage 		from "./pages/HomePage.jsx";
import ProductList 		from "./pages/ProductList.jsx";
import Login 			from "./pages/Login.jsx";
import Register 		from "./pages/Register.jsx";
import Product 			from "./pages/Product.jsx";
import ShoppingCart 	from "./pages/ShoppingCart.jsx";
import { useSelector }  from "react-redux";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

/* START */
const App = () => {
	const user = useSelector((state) => state.user.currentUser);
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<HomePage/>
				</Route>
				<Route path="/products/:category">
					<ProductList/>
				</Route>
				<Route path="/product/:id">
					<Product/>
				</Route>
				<Route path="/cart">
					<ShoppingCart/>
				</Route>
				<Route path="/login">{user ? <Redirect to="/"/> : <Login/>}</Route>
				<Route path="/register">{user ? <Redirect to="/"/> : <Register/>}</Route>
			</Switch>
		</Router>
	);
};

export default App;