import styled from "styled-components";
import React from "react";
import { Button } from "../button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";

const Navbar = () => {
	const navigate = useNavigate();

	return <NavbarStyle>
		<div className="segment left">
			<h2>Test</h2>
		</div>
		<div className='segment middle'>
			<Button buttonProps={{ onClick: () => navigate(ROUTES["first-page"]) }}>Page 1</Button>
			<Button buttonProps={{ onClick: () => navigate(ROUTES["second-page"]) }}>Page 2</Button>
		</div>
		<div className="segment right">
			{/*  */}
		</div>
	</NavbarStyle>;
};

export { Navbar };

const NavbarStyle = styled.div`
	flex-shrink: 0;
	flex-grow: 0;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	min-height: 48px;
	padding: 6px 12px;
	overflow-x: auto;
	.segment {
		flex-grow: 1;
	}
	.left {
		padding-right: 10px;
	}
	.middle {
		display: flex;
		justify-content: center;

		> * {
			:not(:last-child) {
				margin-right: 12px;
			}
		}
	}
	.right {
		padding-left: 10px;
	}
`;