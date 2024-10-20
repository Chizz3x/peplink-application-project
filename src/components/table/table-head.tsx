import styled, { StyledComponentPropsWithRef } from "styled-components";
import React from "react";

const TableHead = (props: NTableHead.IProps) => {
	const { tableHeadProps, children } = props;

	return <TableHeadStyle {...tableHeadProps}>
		{children}
	</TableHeadStyle>;
};

export default TableHead;

export namespace NTableHead {
	export interface IProps {
		tableHeadProps?: StyledComponentPropsWithRef<"thead">;
		children?: React.ReactNode;
	}
}

const TableHeadStyle = styled.thead`
	font-weight: 600;

	> tr:last-child {
		> td {
			border-bottom: 1px solid #c6c6c6;
		}
	}
`;