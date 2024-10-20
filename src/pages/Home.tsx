import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ROUTES } from "../routes";

const PageHome = () => {
	const navigate = useNavigate();

	React.useEffect(() => {
		navigate(ROUTES["first-page"]);
	}, []);

	return (
		<PageHomeStyle id="Home">
			Home
		</PageHomeStyle>
	);
};

export { PageHome };

const PageHomeStyle = styled.div`
	flex-shrink: 0;
	flex-grow: 1;
`;
