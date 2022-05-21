import styled from "styled-components";
import { YouTube, 
         Facebook, 
         Instagram,  
         Telegram, 
         MailOutline, 
         Phone, 
         Room } from "@material-ui/icons";
import paymentMethods from "../images/payment-methods.png";

/* Main DOM element */
const Container = styled.div`
    display: flex;
    background-color: #EC2D2D;
    color: black;
`;

/* Left side which contains description and social media */
const Left = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 20px;
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
const SocialMediaIcon = styled.div`
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
const ListItem = styled.li`
    width: 50%;
    margin-bottom: 15px;
`;

/* Right part contains address, phone number, email of the company */
const Right = styled.div`
    flex: 1;
    padding: 25px;
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
                    <SocialMediaIcon color="E60023"><YouTube/></SocialMediaIcon>
                    <SocialMediaIcon color="3B5999"><Facebook/></SocialMediaIcon>
                    <SocialMediaIcon color="E4405F"><Instagram/></SocialMediaIcon>
                    <SocialMediaIcon color="55ACEE"><Telegram/></SocialMediaIcon>
                </SocialMediaContainer>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>Desktops</ListItem>
                    <ListItem>Laptops</ListItem>
                    <ListItem>Accessories</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Order Tracking</ListItem>
                    <ListItem>Wishlist</ListItem>
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