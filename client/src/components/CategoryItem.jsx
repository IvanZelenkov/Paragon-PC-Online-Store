import styled, { keyframes } from "styled-components";
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
    flex: 1;
    align-items: center;
    justify-content: center;
    // text-align: center;
    // position: relative;
    // width: 40vh;
    margin: 0px 20px 20px 20px;

    display: -webkit-flex;
     -webkit-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
`;

/* Category image styling */
const Image = styled.img`
    width: 100%;
    height: 40vh;
    object-fit: cover;
    object-position: 50% 50%;
    border-radius: 10px;
`;

/* Info contains image and button */
const Info = styled.div`
    width: 100%;
    transition: all 1.5s ease;
`;

/* Name of category */
const Title = styled.h1`
    font-size: 35px;
    letter-spacing: 0.7rem;
    margin-bottom: 20px;
    background: linear-gradient(90deg, #E50914, gold, #E50914, gold) fixed;
	animation: ${NavBarKeyFrame} 5s ease infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
	background-size: 400% 400%;
`;

/* Button "SHOP NOW" to open the products page which contains products of a specific category */
const Button = styled.button`
    width: 100%;
    padding: 10px;
    font-size: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
    color: white;
    border-radius: 99px;
    border: 2px solid #E50914;
    transition: 1.2s ease;
    &:hover {
        background-color : #E50914;
    }
`;

const CategoryItem = ({ item }) => {
    return (
        <Container>
            <Title>{item.title}</Title>
            <Info>
                <Image src={item.img}/>
                <Link to={`/products/${item.category}`}>
                    <Button>SHOP NOW</Button>
                </Link>
            </Info>
        </Container>
    );
};

export default CategoryItem;