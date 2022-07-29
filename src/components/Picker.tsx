import { Input, useClickAway, useInput } from '@geist-ui/core';
import { BindingsChangeTarget } from '@geist-ui/core/esm/use-input';
import { Pipette } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { usePopper } from 'react-popper';

type ColorPickerProps = {
	value: string;
	onChange: (value: string) => void;
	bindings: {
		value: string;
		onChange: (event: BindingsChangeTarget) => void;
	};
};

const ColorPicker = (props: ColorPickerProps) => {
	const [showColorPopover, setShowColorPopover] = useState(false);
	const popperElement = useRef<HTMLDivElement>(null);
	const referenceElement = useRef<SVGSVGElement>(null);

	const { styles, attributes, forceUpdate, update } = usePopper(
		referenceElement.current,
		popperElement.current
	);

	useClickAway(popperElement, () => {
		if (showColorPopover) setShowColorPopover(false);
	});
	useEffect(() => {
		if (forceUpdate) forceUpdate();
		if (update) update();
	}, [showColorPopover, update, forceUpdate]);

	return (
		<Input
			icon={
				<div>
					<Pipette
						style={{
							zIndex: 1111,
							pointerEvents: 'all',
							cursor: 'pointer',
						}}
						onClick={() => setShowColorPopover(true)}
						ref={referenceElement}
					/>
					<div
						ref={popperElement}
						style={styles.popper}
						hidden={!showColorPopover}
						{...attributes.popper}
					>
						<HexColorPicker
							style={{
								pointerEvents: 'all',
							}}
							color={props.value}
							onChange={props.onChange}
						/>
					</div>
				</div>
			}
			style={{
				fontFamily: 'monospace',
			}}
			w='100%'
			{...props.bindings}
		/>
	);
};

export default ColorPicker;
