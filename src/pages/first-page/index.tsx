import styled from "styled-components";
import React from "react";
import {
	Table, TableBody, TableCell, TableHead, TableRow 
} from "../../components/table";
import { Storage } from "../../utils/storage";
import { TableButtons } from "./components/table-buttons";
import { changeModals } from "../../components/modals/modals";
import { Button } from "../../components/button";
import {
	DndProvider, useDrag, useDrop, DropTargetMonitor
} from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const initialList: NFirstPage.ITableRow[] = [
	{
		name: "What's this?",
		url: ["https://www.youtube.com/watch?v=dQw4w9WgXcQ"],
		description: "???"
	},
	{
		name: "Free Bird",
		url: ["https://youtu.be/CqnU_sJ8V-E?si=VkPnLQOPRc3PA00o&t=276"],
		description: "That one part"
	},
	{
		name: "Baby Come Back",
		url: ["https://youtu.be/vLtmmFjxSoc?si=-26gajDmfYgP0OK-&t=57"],
		description: "Vibe"
	},
	{
		name: "Supersonic",
		url: ["https://youtu.be/qMb9hQ_9QKY?si=gWnAQC_I5hN5L1Ao&t=76"],
		description: "Dope drop"
	},
	{
		name: "SUNSHINE",
		url: ["https://youtu.be/bWx1t7BRed8?si=_VOJ0cCoZVL8m85Y&t=11"],
		description: "Dope drop"
	},
	{
		name: "Bad Habits",
		url: ["https://youtu.be/sFUI_Wmstnw?si=ZQt2INNe3tBqdjkq&t=36"],
		description: "Goosebumps"
	}
];

const FirstPage = () => {
	const storage = Storage();

	const [ list, setList ] = React.useState<NFirstPage.ITableRow[]>([]);

	const fetchList = () => {
		if(storage) {
			try {
				const newList = JSON.parse(storage.getItem("my-list") || "[]") || [];
				setList(newList);
			} catch(err) {
				console.error(err);
			}
		}
	};

	const handleDelete = (index: number) => {
		if(storage) {
			const newList = [ ...list.slice(0, index), ...list.slice(index + 1) ];
			storage.setItem("my-list", JSON.stringify(newList));
			fetchList();
		}
	};

	const handleEdit = (index: number) => {
		window.dispatchEvent(changeModals({
			ModalAddEditItem: {
				open: true,
				index,
				onAdd: fetchList
			},
		}));
	};

	const handleAdd = () => {
		window.dispatchEvent(changeModals({
			ModalAddEditItem: {
				open: true,
				onAdd: fetchList
			}
		}));
	};

	const moveRow = (dragIndex: number, hoverIndex: number) => {
		const newList = [...list];
		const [movedItem] = newList.splice(dragIndex, 1);
		newList.splice(hoverIndex, 0, movedItem);
		setList(newList);
	};

	const dropRow = () => {
		storage?.setItem("my-list", JSON.stringify(list));
	};

	React.useEffect(() => {
		if(storage) {
			if(!storage.getItem("my-list")) {
				storage.setItem("my-list", JSON.stringify(initialList));
			}
		}

		fetchList();
	}, []);

	return <FirstPageStyle>
		<div className='table-header'>
			<div className='table-header-row'>
				<h2>My List</h2>
			</div>
			<div className='table-header-row'>
				<Button buttonProps={{ onClick: handleAdd }}>Add</Button>
			</div>
		</div>
		<div className='table-box'>
			<DndProvider backend={HTML5Backend}>
				<Table tableProps={{ className: "table" }}>
					<TableHead>
						<TableRow>
							<TableCell />
							<TableCell>Name</TableCell>
							<TableCell>Url</TableCell>
							<TableCell>Description</TableCell>
							<TableCell />
						</TableRow>
					</TableHead>
					<TableBody>
						{list.map((m, i) => {
							return <Row key={i} index={i} moveRow={moveRow} dropRow={dropRow}>
								<TableCell>{m.name}</TableCell>
								<TableCell>{m.url.map((m, i) => <div key={i}><a target="_blank" href={m} rel="noreferrer">{m}</a></div>)}</TableCell>
								<TableCell>{m.description}</TableCell>
								<TableCell><TableButtons index={i} onDelete={handleDelete} onEdit={handleEdit} /></TableCell>
							</Row>;
						})}
					</TableBody>
				</Table>
			</DndProvider>
		</div>
	</FirstPageStyle>;
};

const Row = ({
	index, moveRow, dropRow, children 
}: NFirstPage.ITableRowComponentProps) => {
	const dropRef = React.useRef<HTMLTableRowElement>(null);
	const dragRef = React.useRef<HTMLTableCellElement>(null);

	const [ _, drop ] = useDrop<NFirstPage.IDragItem, NFirstPage.IDragItem, DropTargetMonitor<NFirstPage.IDragItem, NFirstPage.IDragItem>>({
		accept: "row",
		hover(item, monitor) {
			if (!dropRef.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;
			if (dragIndex === hoverIndex) {
				return;
			}
			const hoverBoundingRect = dropRef.current?.getBoundingClientRect();
			const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			const hoverClientY = (clientOffset?.y || 0) - hoverBoundingRect.top;
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}
			moveRow(dragIndex, hoverIndex);
			item.index = hoverIndex;
		},
		drop(item, monitor) {
			dropRow();
			return item;
		}
	});

	const [ __, drag, preview ] = useDrag({
		type: "row",
		item: {
			type: "row",
			index 
		},
		collect: monitor => ({ isDragging: monitor.isDragging(), }),
	});

	preview(drop(dropRef));
	drag(dragRef);

	return <TableRow tableRowProps={{ ref: dropRef }}>
		<TableCell tableCellProps={{ ref: dragRef }} >
			<div className='drag-item' />
		</TableCell>
		{children}
	</TableRow>;
};

export default FirstPage;

export namespace NFirstPage {
	export interface ITableRow {
		name: string;
		url: string[];
		description: string;
	}
	export interface ITableRowComponentProps {
		index: number;
		moveRow: (dragIndex: number, hoverIndex: number) => void;
		dropRow: () => void;
		children?: JSX.Element | JSX.Element[];
	}
	export interface IDragItem {
		type: string;
		index: number;
	}
}

const FirstPageStyle = styled.div`
	flex-shrink: 0;
	flex-grow: 1;

	.table-header {
		display: flex;
		flex-direction: column;
		.table-header-row {
			display: flex;
			:not(:last-child) {
				margin-bottom: 8px;
			}
		}
	}

	.table-box {
		overflow-x: auto;
	}

	.table {
		margin-top: 12px;
		width: 100%;
		td:last-child,
		td:first-child {
			width: 0;
		}
		.drag-item {
			width: 3px;
			height: 20px;
			margin: 0 10px 0 5px;
			border-left: 2px solid #bebebe;
			border-right: 2px solid #bebebe;
		}
	}
`;