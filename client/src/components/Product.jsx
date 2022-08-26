import styled from "styled-components";
import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";

/* This part will be displayed when the user hovers over the product. 
It should be hoisted higher than Container element because it is used there. */
const Info = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: all 0.5s ease;
    cursor: pointer;
`;

/* Main DOM element */
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    max-height: 23vh;
    flex: 1;
    margin: 10px;
    max-width: 13vw;
    transition: all 1s ease;
    &:hover ${Info} {
        opacity: 1;
    }
    &:hover {
        transform: scale(1.1);
    }
`;

/* Styling of product image */
const Image = styled.img`
    width: 100%;
    height: 100%;
    // object-fit: cover;
    border-radius: 10px;
`;

/* Icon styling when hovering over a product */
const Icon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    background-color: white;
    margin: 10px;
    transition: all 0.5s ease;
    &:hover {
        background-color: #E50914;
        transform: scale(1.3);
    }
`;

const Product = ({ item }) => {
    return (
        <Container>
            <Image src={item.img}/>
            <Info>
                <Icon>
                    <ShoppingCartOutlined/>
                </Icon>
                <Icon>
                    <Link to={`/product/${item._id}`} style={{ color: 'black'}}>
                        <SearchOutlined/>
                    </Link>
                </Icon>
                <Icon>
                    <FavoriteBorderOutlined/>
                </Icon>
            </Info>  
        </Container>
    );
};

export default Product;