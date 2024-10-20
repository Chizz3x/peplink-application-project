import styled, { StyledComponentPropsWithRef } from "styled-components";
import React from "react";

const TableFoot = (props: NTableFoot.IProps) => {
	const { tableFootProps, children } = props;

	return <TableFootStyle {...tableFootProps}>
		{children}
	</TableFootStyle>;
};

export default TableFoot;

export namespace NTableFoot {
	export interface IProps {
		tableFootProps?: StyledComponentPropsWithRef<"tfoot">;
		children?: React.ReactNode;
	}
}

const TableFootStyle = styled.tfoot`
	//
`;