import styled from "styled-components";
import React from "react";
import { Button } from "../../../components/button";

const TableButtons = (props: NTableButtons.IProps) => {
	const { onEdit, onDelete, index } = props;

	return <TableButtonsStyle>
		<Button className="btn delete" buttonProps={{ onClick: () => onDelete?.(index) }}>X</Button>
		<Button className="btn edit" buttonProps={{ onClick: () => onEdit?.(index) }}>E</Button>
	</TableButtonsStyle>;
};

export { TableButtons };

export namespace NTableButtons {
	export interface IProps {
		onDelete?: (index: number) => void;
		onEdit?: (index: number) => void;
		index: number;
	}
}

const TableButtonsStyle = styled.div`
	display: flex;

	.btn {
		min-width: 50px;
		:not(:last-child) {
			margin-right: 6px;
		}
	}
	.delete {
		> button {
			background-color: #ffb1b1;
		}
	}
`;