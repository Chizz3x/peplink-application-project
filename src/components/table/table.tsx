import styled, { StyledComponentPropsWithRef } from "styled-components";
import React from "react";

const Table = (props: NTable.IProps) => {
	const { tableProps, children } = props;

	return <TableStyle cellSpacing={0} {...tableProps}>
		{children}
	</TableStyle>;
};

export default Table;

export namespace NTable {
	export interface IProps {
		tableProps?: StyledComponentPropsWithRef<"table">;
		children?: React.ReactNode;
	}
}

const TableStyle = styled.table`
	flex-shrink: 0;
	flex-grow: 1;
	background-color: #dbf4ff;
	table-layout: auto;
`;