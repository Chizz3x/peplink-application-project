import styled, { StyledComponentPropsWithRef } from "styled-components";
import React from "react";

const TableRow = (props: NTableRow.IProps) => {
	const { tableRowProps, children } = props;

	return <TableRowStyle {...tableRowProps}>
		{children}
	</TableRowStyle>;
};

export default TableRow;

export namespace NTableRow {
	export interface IProps {
		tableRowProps?: StyledComponentPropsWithRef<"tr">;
		children?: React.ReactNode;
	}
}

const TableRowStyle = styled.tr`
	//
`;