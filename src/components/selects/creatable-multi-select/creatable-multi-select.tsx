import styled, { StyledComponentPropsWithRef } from "styled-components";
import React, { ComponentProps } from "react";
import Creatable from "react-select/creatable";
import { classes } from "../../../utils/classes";
import { GroupBase } from "react-select";

const CreatableMultiSelect = <Option = unknown, >(props: NCreatableMultiSelect.IProps<Option>) => {
	const { containerProps, creatableProps, className } = props;

	return (
		<SelectContainerStyle {...containerProps} className={classes(className, containerProps?.className)}>
			<Creatable<Option, true, GroupBase<Option>>
				{...creatableProps}
				isMulti
				classNamePrefix="react-select"
			/>
		</SelectContainerStyle>
	);
};

export { CreatableMultiSelect };

export namespace NCreatableMultiSelect {
	export interface IProps<Option> {
		containerProps?: StyledComponentPropsWithRef<"div">;
		creatableProps?: ComponentProps<typeof Creatable<Option, true, GroupBase<Option>>>;
		className?: string;
	}
}

const SelectContainerStyle = styled.div`
	.react-select {
		border: 1px solid transparent;
		border-radius: 5px;
		background-color: #efefef;
	}
	.react-select__control {
		border: 1px solid transparent;
		padding: 5px;
		background-color: #efefef;
		&:hover {
				border: 1px solid black;
		}
	}
`;