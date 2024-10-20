import styled, { StyledComponentPropsWithRef } from "styled-components";
import React from "react";
import { classes } from "../../utils/classes";

const Textarea = (props: NTextarea.IProps) => {
	const { containerProps, textareaProps, className } = props;

	return <TextareaContainerStyle {...containerProps} className={classes(className, containerProps?.className)}>
		<textarea {...textareaProps} />
	</TextareaContainerStyle>;
};

export { Textarea };

export namespace NTextarea {
	export interface IProps {
		containerProps?: StyledComponentPropsWithRef<"div">
		textareaProps?: StyledComponentPropsWithRef<"textarea">
		className?: string
	}
}

const TextareaContainerStyle = styled.div`
	width: 100%;
	display: flex;
	> textarea {
		border: none;
		outline: none;
		resize: none;
		display: block;
		flex-grow: 1;
		background-color: #efefef;
		border-radius: 5px;
		padding: 11px 13px;
		font-size: 16px;
		min-height: 100px;
		max-height: 200px;
	}
`;