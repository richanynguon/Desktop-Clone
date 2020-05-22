import React, { useEffect, useRef, useState } from "react";
import { DragContainer } from "./styles/draggableStyles";

export default function Draggable(props) {
	const childRef = useRef(null);
	const parentRef = useRef(null);

	const [dimensions, setDemensions] = useState({ height: null, width: null });
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [mousePos, setMousePos] = useState({ x: null, y: null });

	const { z, state, setState, type } = props;
	const { maximized, minimized, closed } = state[type];
	const { height, width } = dimensions;
	const { x, y } = position;

	const cursorX = document.documentElement.scrollLeft
		? document.documentElement.scrollLeft
		: document.body.scrollLeft;
	const cursorY = document.documentElement.scrollTop
		? document.documentElement.scrollTop
		: document.body.scrollTop;
	const atBreakpoint = window.innerWidth < 767;

	const makeActive = () => {
		const newCounter = state.zCounter + 1;
		setState({
			...state,
			zCounter: newCounter,
			[type]: { ...state[type], z: newCounter },
		});
	};

	useEffect(() => {
		const height = childRef.current.offsetHeight;
		const width = childRef.current.offsetWidth;
		const halfVW = window.innerWidth / 2;
		const halfVH = window.innerHeight / 2;
		setDemensions({ height, width });
		if (childRef.current && !atBreakpoint) {
			const midPosX = halfVW - width / 2;
			const midPosY = halfVH - height / 2;
			setPosition({ x: midPosX, y: midPosY });
		}
		if (atBreakpoint && !maximized) {
			const midPosX = halfVW - width / 1.5;
			const midPosY = halfVH - height / 1.5;
			setPosition({ x: midPosX, y: midPosY });
		}
		if (maximized) {
			setPosition({ x: 0, y: 0 });
		}
	}, [childRef, maximized, minimized, atBreakpoint, closed]);

	return (
		<DragContainer
			ref={parentRef}
			hidden={state[type].closed || state[type].minimized}
			maximized={maximized}
			draggable
			height={height}
			width={width}
			x={x}
			y={y}
			z={z}
			onClick={() => {
				makeActive();
			}}
			onDragStart={(e) => {
				const crt = e.target.cloneNode(true);
				crt.style.opacity = 1;
				e.dataTransfer.setDragImage(crt, 0, 0);
				setMousePos({
					x: e.clientX + cursorX,
					y: e.clientY + cursorY,
				});
				makeActive();
			}}
			onDragEnd={(e) => {
				const deltaX = e.clientX + cursorX - mousePos.x;
				const deltaY = e.clientY + cursorY - mousePos.y;
				setPosition({
					x: position.x + deltaX,
					y: position.y + deltaY,
				});
			}}>
			<props.component reference={childRef} />
		</DragContainer>
	);
}