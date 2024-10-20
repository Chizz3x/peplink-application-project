import React, { ComponentProps } from "react";
import { default as ReactSwitch } from "react-switch";
import styled, { StyledComponentPropsWithRef } from "styled-components";

const Switch = (props: NSwitch.IProps) => {
	const { containerProps, switchProps } = props;

	return (
		<SwitchContainerStyle {...containerProps}>
			<ReactSwitch
				onColor="#ccc"
				offColor="#ccc"
				handleDiameter={24}
				uncheckedIcon={false}
				checkedIcon={false}
				height={34}
				width={60}
				checked={false}
				onChange={() => null}
				{...switchProps}
			/>
		</SwitchContainerStyle>
	);
};

export { Switch };

export namespace NSwitch {
	export interface IProps {
		containerProps?: StyledComponentPropsWithRef<"div">;
		switchProps?: ComponentProps<typeof ReactSwitch>;
	}
}

const SwitchContainerStyle = styled.div`
	//
`;