import styled, { StyledComponentPropsWithRef } from "styled-components";
import React from "react";
import { classes } from "../../utils/classes";

const Input = (props: NInput.IProps) => {
	const { containerProps, inputProps, className } = props;

	return <InputContainerStyle {...containerProps} className={classes(className, containerProps?.className)}>
		<input {...inputProps} />
	</InputContainerStyle>;
};

export { Input };

export namespace NInput {
	export interface IProps {
		containerProps?: StyledComponentPropsWithRef<"div">;
		inputProps?: StyledComponentPropsWithRef<"input">;
		className?: string;
	}
}

const InputContainerStyle = styled.div`
	display: flex;
	> input {
		border: 0;
		padding: 0;
		outline: 0;
		background-color: #efefef;
		padding: 11px 13px;
		border-radius: 5px;
		border: 1px solid transparent;
		height: 24px;
		flex-grow: 1;
		font-size: 16px;
		width: 100%;
		::placeholder {
			color: rgb(128, 128, 128);
		}
		:focus {
			border: 1px solid black;
		}
	}
`;