import styled, { StyledComponentPropsWithRef } from "styled-components";
import React from "react";

const TableCell = (props: NTableCell.IProps) => {
	const { tableCellProps, children } = props;

	return <TableCellStyle {...tableCellProps}>
		{children}
	</TableCellStyle>;
};

export default TableCell;

export namespace NTableCell {
	export interface IProps {
		tableCellProps?: StyledComponentPropsWithRef<"td">
		children?: React.ReactNode
	}
}

const TableCellStyle = styled.td`
	padding: 2px 6px;
`;