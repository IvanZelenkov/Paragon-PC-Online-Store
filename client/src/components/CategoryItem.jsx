import styled from "styled-components";
import { Link } from "react-router-dom";

/* Main DOM element */
const Container = styled.div`
    flex: 1;
    position: relative;
    margin: 3px;
    height: 40vh;
`;

/* Category image styling */
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
`;

/* Info contains name and button which relate to category */
const Info = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    flex-direction: column;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
`;

/* Name of category */
const Title = styled.h1`
    color: #EC2D2D;
    margin-bottom: 20px;
`;

/* Button "SHOP NOW" to open the products page which contains products of a specific category */
const Button = styled.button`
    font-weight: 600;
    border: none;
    padding: 10px;
    background-color: #EC2D2D;
    cursor: pointer;
    color: black;
    border-radius: 10px;
    border: 2px solid black;
`;

const CategoryItem = ({ item }) => {
    return (
        <Container>
            <Link to={`/products/${item.category}`}>
                <Image src={item.img}/>
                <Info>
                    <Title>{item.title}</Title>
                    <Button>SHOP NOW</Button>
                </Info>
            </Link>
        </Container>
    );
};

export default CategoryItem;