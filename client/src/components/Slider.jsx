import styled from "styled-components";
import { ArrowBackIosRounded, ArrowForwardIosRounded } from '@material-ui/icons';
import { useState } from 'react';
import { sliderItems } from "../data.js";

/* Main DOM element */
const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    background-color: black;
    position: relative;
    overflow: hidden;
`;

/* Arrows to navigate left or right in the slider */
const Arrow = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 50px;
    height: 50px;
    top: 0;
    bottom: 0;
    margin: auto;
    left: ${properties => properties.direction === "left" && "10px"};
    right: ${properties => properties.direction === "right" && "10px"};
    cursor: pointer;
    z-index: 2;
    transition: all 0.5s ease;
    &:hover {
        transform: scale(2);   
    }
`;

/* The one key thing to remember when trying to position a child div relative to
it’s parent is that the child should be given the CSS property position:absolute;
and the parent set to either position:absolute; or position:relative;. */

/* Slider wrapper styling */
const Wrapper = styled.div`
    display: flex;
    height: 100%;
    color: #EC2D2D;
    transition: all 1.5s ease;
    transform: translateX(${(properties) => properties.slideIndex * -100}vw);
`;

/* Styling each slide with a different background and default dimensions */
const Slide = styled.div`
    display: flex;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: #${(properties) => properties.bg};
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
`;

/* Image styling */
const Image = styled.img`
    height: 100%;
    width: 100%;
`;

/* InfoContainer contains title and description of slide */
const InfoContainer = styled.div`
    position: absolute;
    padding-left: 200px;
`;

/* Title of the slide */
const Title = styled.h1`
    font-size: 70px;
    width: 30vw;
`;

/* Description of the slide */
const Description = styled.p`
    font-size: 30px;
    font-weight: 500;
    margin: 50px 0px;
    letter-spacing: 3px;
    width: 30vw;
`;

/* Button of the slide */
const Button = styled.button`
    padding: 10px;
    font-size: 20px;
    background-color: #EC2D2D;
    cursor: pointer;
    color: black;
    border-radius: 10px;
    border: 2px solid black;
`;

const Slider = () => {
    /* useState allows to track state in a function component */
    const [slideIndex, setSlideIndex] = useState(0);

    /* If the left arrow was pressed, then move slide - 1 (to the left), 
    and if it was the leftmost slide, then redirect the user to the rightmost slide. 
    If the right arrow was pressed, then move slide + 1 (to the right), 
    and if it was the rightmost slide, then redirect the user to the leftmost slide. */
    const handleClick = (direction) => {
        if (direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
        } else {
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
        }
    };

    return (
        <Container>
            <Arrow direction="left" style={{color: "#EC2D2D"}} onClick={() => handleClick("left")}>
                <ArrowBackIosRounded/>
            </Arrow>
            <Wrapper slideIndex={slideIndex}>
                {sliderItems.map(item => (
                    <Slide key={item.id}>
                        <ImgContainer>
                            <Image src={item.img}/>
                        </ImgContainer>
                        <InfoContainer>
                            <Title>{item.title}</Title>
                            <Description>{item.description}</Description>
                            <Button>Learn more</Button>
                        </InfoContainer>
                    </Slide>
                ))}
            </Wrapper>
            <Arrow direction="right" style={{color: "#EC2D2D"}} onClick={() => handleClick("right")}>
                <ArrowForwardIosRounded/>
            </Arrow>
        </Container>
    );
};

export default Slider;