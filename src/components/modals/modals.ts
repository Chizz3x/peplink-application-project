import { ComponentProps } from "react";
import * as ModalExample from "./example";
import * as ModalAddEditItem from "./add-edit-item";

export const modals = [ ModalExample, ModalAddEditItem ];

export const changeModals = <
  D extends NModals.TModals
>(
		eventDetail: D
	): CustomEvent<D> =>
		new CustomEvent("changeModals", { detail: eventDetail });

export namespace NModals {
	export interface IDefaultProps {
		open?: string | boolean | null;
	}
	export type TModals = Partial<Record<typeof modals[number]["name"], ComponentProps<typeof modals[number]["Modal"]>>>;
}