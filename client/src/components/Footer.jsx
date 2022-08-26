import styled, { keyframes } from "styled-components";
import { YouTube, 
         Facebook, 
         Instagram,  
         Telegram, 
         MailOutline, 
         Phone, 
         Room } from "@material-ui/icons";
import paymentMethods from "../images/payment-methods.png";
import background from "../images/dragon.jpeg";

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
    display: flex;
    color: white;
    background: url(${background}) no-repeat center center fixed;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	-o-background-size: cover;
	background-size: cover;
    heigth: 100%;
`;

/* Left side which contains description and social media */
const Left = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 20px;
    background: linear-gradient(90deg, #E50914, gold, #E50914, gold) fixed;
	animation: ${NavBarKeyFrame} 5s ease infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
	background-size: 400% 400%;
`;

/* Name of the company */
const Name = styled.h1``;

/* About company */
const Description = styled.p`
    margin: 25px 0px;
`;

/* Social media container which contains icons */
const SocialMediaContainer = styled.div`
    display: flex;
`;

/* Social media icons */
const SocialMediaIcon = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin-right: 25px;
    border-radius: 50%;
    color: white;
    background-color: #${(properties) => properties.color};
`;

/* Center part contains links if the user wishes to redirect to another page */
const Center = styled.div`
    flex: 1;
    padding: 25px;
    background: linear-gradient(90deg, #E50914, gold, #E50914, gold) fixed;
	animation: ${NavBarKeyFrame} 5s ease infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
	background-size: 400% 400%;
`;

/* Useful Links title */
const Title = styled.h3`
    margin-bottom: 35px;
`;

/* List of links */
const List = styled.ul`
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    margin: 0;
    padding: 0;
`;

/* List item styling */
const ListItem = styled.a`
    width: 50%;
    margin-bottom: 15px;
    color: white;
    text-decoration: none;
`;

/* Right part contains address, phone number, email of the company */
const Right = styled.div`
    flex: 1;
    padding: 25px;
    background: linear-gradient(90deg, #E50914, gold, #E50914, gold) fixed;
	animation: ${NavBarKeyFrame} 5s ease infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
	background-size: 400% 400%;
`;

/* Contact item styling */
const ContactItem = styled.div`
    display: flex;
    align-items: center;    
    margin-bottom: 15px;
`;

/* Payment methods image */
const PaymentMethods = styled.img`
    width: 50%;
`;

const Footer = () => {
    return (
        <Container>
            <Left>
                <Name>PARAGON PC</Name>
                <Description>
                    Paragon PC company assembles premium computers and sells quality components. 
                    It is an official partner of such well-known technological giants as NVIDIA, Intel, Microsoft. 
                    The company has managed to implement several successful joint projects with such well-known campaigns
                    as Adobe Systems, Wargaming, Oracle Corporation, UbiSoft, Electronic Arts, and Bethesda.
                </Description>
                <SocialMediaContainer>
                    <SocialMediaIcon href="https://www.youtube.com/c/hyperpc" color="E60023"><YouTube/></SocialMediaIcon>
                    <SocialMediaIcon href="https://www.facebook.com/hyperpc/" color="3B5999"><Facebook/></SocialMediaIcon>
                    <SocialMediaIcon href="https://www.instagram.com/hyperpc/" color="E4405F"><Instagram/></SocialMediaIcon>
                    <SocialMediaIcon href="https://t.me/HYPERPC" color="55ACEE"><Telegram/></SocialMediaIcon>
                </SocialMediaContainer>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem href="/">Home</ListItem>
                    <ListItem href="/cart">Cart</ListItem>
                    <ListItem href="/products/PCs">PCs and Monitors</ListItem>
                    <ListItem href="/products/Laptops">Laptops</ListItem>
                    <ListItem href="/products/Accessories">Accessories</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Order Tracking</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>Terms</ListItem>
                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem>
                    <Room style={{marginRight:"15px"}}/>2000 Lakeshore Dr, New Orleans, LA 70148
                </ContactItem>
                <ContactItem>
                    <Phone style={{marginRight:"15px"}}/>+1 504 413 8933
                </ContactItem>
                <ContactItem>
                    <MailOutline style={{marginRight:"15px"}}/>idzelenk@uno.edu
                </ContactItem>
                <PaymentMethods src={paymentMethods}/>
            </Right>
        </Container>
    );
};

export default Footer;