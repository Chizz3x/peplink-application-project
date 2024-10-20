import styled, { StyledComponentPropsWithRef } from "styled-components";
import React from "react";
import { classes } from "../../utils/classes";

const Button = (props: NButton.IProps) => {
	const {
		containerProps, buttonProps, children, className 
	} = props;

	return <ButtonContainerStyle {...containerProps} className={classes(props.disabled ? "disabled" : "", className, containerProps?.className)}>
		<ButtonStyle {...buttonProps} disabled={props.disabled || buttonProps?.disabled}>
			{buttonProps?.children || containerProps?.children || children}
		</ButtonStyle>
	</ButtonContainerStyle>;
};

export { Button };

export namespace NButton {
	export interface IProps {
		containerProps?: StyledComponentPropsWithRef<"div">;
		buttonProps?: StyledComponentPropsWithRef<"button">;
		children?: React.ReactNode;
		className?: string;
		disabled?: boolean;
	}
}

const ButtonContainerStyle = styled.div`
	min-height: 32px;
	min-width: 86px;
`;

const ButtonStyle = styled.button`
	border: 0;
	margin: 0;
	display: block;
	height: 100%;
	width: 100%;
	border-radius: 5px;
	font-size: 0.875rem;
	:not(:disabled) {
		cursor: pointer;
		:hover {
			filter: brightness(0.9);
		}
	}
`;