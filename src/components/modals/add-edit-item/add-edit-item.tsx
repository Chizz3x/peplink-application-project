import React from "react";
import styled from "styled-components";
import { changeModals, NModals } from "../modals";
import { ModalLayout } from "../layout";
import { Button } from "../../button";
import { Input } from "../../input";
import { CreatableMultiSelect } from "../../selects/creatable-multi-select";
import { Storage } from "../../../utils/storage";
import { NFirstPage } from "../../../pages/first-page";
import { Textarea } from "../../textarea";
import {
	ActionMeta, MultiValue, MultiValueGenericProps, components 
} from "react-select";
import { Switch } from "../../switch";
import _ from "lodash";

const name = "ModalAddEditItem";
const Modal = (props: NModalAddEditItem.IProps) => {
	const { index, onAdd, onCancel } = props;

	const storage = Storage();

	const isEdit = typeof index === "number";

	const [ defaultData, setDefaultData ] = React.useState<Partial<NModalAddEditItem.TForm>>({});
	const [ urlOptions, setUrlOptions ] = React.useState<NModalAddEditItem.ISelectOption[]>([]);
	const [ inputValue, setInputValue ] = React.useState("");
	const [ placeLocation, setPlaceLocation ] = React.useState(false);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const target = e.target;
		if(target) {
			const formData = new FormData(target as HTMLFormElement);
			const dataArr = Array.from(formData.entries());
			const data = Object.fromEntries(dataArr) as unknown as NModalAddEditItem.TForm;
			data.url = urlOptions.map(m => m.value);

			try {
				let list = JSON.parse(storage?.getItem("my-list") || "[]") || [];

				if(isEdit) {
					list.splice(index, 1, data);
				} else {
					if(placeLocation)
						list = [ data, ...list ];
					else list.push(data);
				}

				storage?.setItem("my-list", JSON.stringify(list));
			} catch(err) {
				console.error(err);
			}

			onAdd?.();
			window.dispatchEvent(changeModals({ ModalAddEditItem: undefined }));
		}
	};

	const handleClose = () => {
		onCancel?.();
		window.dispatchEvent(changeModals({ ModalAddEditItem: undefined }));
	};

	const handleUrlChange = (newValue: MultiValue<NModalAddEditItem.ISelectOption>, actionMeta?: ActionMeta<NModalAddEditItem.ISelectOption>) => {
		setUrlOptions([...newValue]);
	};

	const handleKeyDownForm = (event: React.KeyboardEvent<HTMLFormElement>) => {
		if (event.key === "Enter") {
			event.preventDefault();
		}
	};

	const handleKeyDownSelect = (event: React.KeyboardEvent) => {
		const inputValue = (event.target as HTMLInputElement).value;

		if (event.key === "Enter" && inputValue) {
			event.preventDefault();
			const newOption = {
				label: inputValue,
				value: inputValue,
			};
			handleUrlChange([ ...urlOptions, newOption ]);
			setInputValue("");
		}
	};

	React.useEffect(() => {
		if(isEdit) {
			const list: NFirstPage.ITableRow[] = JSON.parse(storage?.getItem("my-list") || "[]") || [];
			const item = list?.find((_, i) => i === index);
			if(item) {
				setDefaultData({ 
					name: item.name,
					description: item.description
				});
				setUrlOptions((item.url || [])?.map?.(m => ({
					label: m,
					value: m
				})));
			}
		}
	}, [isEdit]);

	return <ModalLayout {...props} name={name}>
		<ModalAddEditItemStyle>
			<div className='title'><h2>{isEdit ? "Edit" : "Add"} item</h2></div>
			<div className='form-box'>
				<form onSubmit={handleSubmit} onKeyDown={handleKeyDownForm}>
					<Input inputProps={{
						name: "name",
						required: true,
						type: "text",
						placeholder: "Item name",
						defaultValue: defaultData?.name || ""
					}} />
					<CreatableMultiSelect<NModalAddEditItem.ISelectOption> creatableProps={{
						name: "url",
						placeholder: "Item links",
						options: urlOptions,
						value: urlOptions,
						onChange: handleUrlChange,
						menuIsOpen: false,
						inputValue: inputValue,
						onInputChange: (value) => setInputValue(value),
						components: { MultiValueLabel: (props: MultiValueGenericProps<NModalAddEditItem.ISelectOption>) => <components.MultiValueLabel {...props}><a target="_blank" href={props.data.label} rel="noreferrer">{props.data.label}</a></components.MultiValueLabel> },
						onKeyDown: handleKeyDownSelect
					}} />
					<Textarea textareaProps={{
						name: "description",
						placeholder: "Description",
						defaultValue: defaultData?.description || ""
					}} />
					{!isEdit ? <div className='switch-box'>
						<Switch switchProps={{
							checked: placeLocation,
							onChange: (checked) => setPlaceLocation(checked)
						}} />
						<span>{placeLocation ? "Placing at top" : "Placing at bottom"}</span>
					</div> : null}
					<div className='button-box'>
						<Button className="cancel-btn" buttonProps={{
							type: "button",
							onClick: handleClose 
						}}>Cancel</Button>
						<Button className="add-btn" buttonProps={{ type: "submit" }}>{isEdit ? "Save" : "Add"}</Button>
					</div>
				</form>
			</div>
		</ModalAddEditItemStyle>
	</ModalLayout>;
};

export { name, Modal };

export namespace NModalAddEditItem {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface IProps extends NModals.IDefaultProps {
		index?: number;
		onAdd?: () => void;
		onCancel?: () => void;
	}
	export type TForm = NFirstPage.ITableRow;
	export interface ISelectOption {
		label: string;
		value: string;
	}
}

const ModalAddEditItemStyle = styled.div`
	min-width: 500px;
	background-color: white;
	border-radius: 10px;
	box-shadow: 0 0 10px #eeeeee;
	padding: 10px 20px;
	.title {
		margin-bottom: 20px;
	}
	.form-box {
		> form {
			> * {
				:not(:last-child) {
					margin-bottom: 10px;
				}
			}
		}
		.switch-box {
			display: flex;
			align-items: center;
			> span {
				margin-left: 12px;
			}
		}
		.button-box {
			display: flex;
			justify-content: flex-end;
			margin-top: 20px;
			> * {
				:not(:last-child) {
					margin-right: 8px;
				}
			}
		}
	}

	@media (max-width: 600px) {
		min-width: 0;
		.form-box {
			.button-box {
				flex-direction: column;
				> * {
					margin-right: 0 !important;
				}
			}
		}
	}
`;