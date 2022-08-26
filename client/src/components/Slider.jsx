import styled, { keyframes } from "styled-components";
import { ArrowBackIosRounded, ArrowForwardIosRounded } from '@material-ui/icons';
import { useState } from 'react';
import { sliderItems } from "../data.js";

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
    top: 0;
    bottom: 0;
    left: ${properties => properties.direction === "left" && "50px"};
    right: ${properties => properties.direction === "right" && "50px"};
    cursor: pointer;
    z-index: 2;
    transition: all 0.5s ease;
    transform: scale(1.5);
    &:hover {
        transform: scale(3);   
    }
`;

/* The one key thing to remember when trying to position a child div relative to
it’s parent is that the child should be given the CSS property position:absolute;
and the parent set to either position:absolute; or position:relative;. */

/* Slider wrapper styling */
const Wrapper = styled.div`
    display: flex;
    height: 100%;
    color: #E50914;
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
    background: linear-gradient(90deg, #E50914, gold, #E50914, gold) fixed;
	animation: ${NavBarKeyFrame} 5s ease infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
	background-size: 400% 400%;
    letter-spacing: 3px;
`;

/* Description of the slide */
const Description = styled.p`
    font-size: 30px;
    font-weight: 500;
    margin: 50px 0px;
    letter-spacing: 3px;
    width: 30vw;
    background: linear-gradient(90deg, #E50914, gold, #E50914, gold) fixed;
	animation: ${NavBarKeyFrame} 5s ease infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
	background-size: 400% 400%;
    letter-spacing: 3px;
`;

/* Button of the slide */
const Button = styled.button`
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
            <Arrow direction="left" style={{color: "#E50914"}} onClick={() => handleClick("left")}>
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
                            <Button>LEARN MORE</Button>
                        </InfoContainer>
                    </Slide>
                ))}
            </Wrapper>
            <Arrow direction="right" style={{color: "#E50914"}} onClick={() => handleClick("right")}>
                <ArrowForwardIosRounded/>
            </Arrow>
        </Container>
    );
};

export default Slider;