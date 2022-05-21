import styled from "styled-components";

/* Main DOM element */
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    font-size: 16px;
    font-weight: 600;
    color: black;
    background-color: white;
`;

const Announcement = () => {
	return (
		<Container>
			FREE STANDARD SHIPPING & RETURNS | JOIN NOW
		</Container>
	);
};

export default Announcement;