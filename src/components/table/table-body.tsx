import styled, { StyledComponentPropsWithRef } from "styled-components";
import React from "react";

const TableBody = (props: NTableBody.IProps) => {
	const { tableBodyProps, children } = props;

	return <TableBodyStyle {...tableBodyProps}>
		{children}
	</TableBodyStyle>;
};

export default TableBody;

export namespace NTableBody {
	export interface IProps {
		tableBodyProps?: StyledComponentPropsWithRef<"tbody">;
		children?: React.ReactNode;
	}
}

const TableBodyStyle = styled.tbody`
	flex-shrink: 0;
	flex-grow: 1;
	> tr:nth-child(2n + 1) {
		background-color: #f1fbff;
	}
`;