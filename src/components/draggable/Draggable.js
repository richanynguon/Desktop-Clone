import React, { useEffect, useRef, useState } from "react";
import { DragContainer } from "./styles/draggableStyles";

export default function Draggable(props) {
	const { z, state, setState, type } = props;
	const childRef = useRef(null);
	const parentRef = useRef(null);
	const [dimensions, setDemensions] = useState({ height: null, width: null });
	const [mousePos, setMousePos] = useState({ x: null, y: null });
	const { height, width } = dimensions;
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const { x, y } = position;
	const cursorX = document.documentElement.scrollLeft
		? document.documentElement.scrollLeft
		: document.body.scrollLeft;
	const cursorY = document.documentElement.scrollTop
		? document.documentElement.scrollTop
		: document.body.scrollTop;
	const { maximized } = state[type];

	useEffect(() => {
		if (childRef.current) {
			const height = childRef.current.offsetHeight;
			const width = childRef.current.offsetWidth;
			setDemensions({ height, width });
			const midPosX = window.innerWidth / 2 - width / 2;
			const midPosY = window.innerHeight / 2 - height / 2;
			setPosition({ x: midPosX, y: midPosY });
		}
	}, [childRef, maximized]);

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
			onDragStart={(e) => {
				const crt = e.target.cloneNode(true);
				crt.style.opacity = 1;
				e.dataTransfer.setDragImage(crt, 0, 0);
				setMousePos({
					x: e.clientX + cursorX,
					y: e.clientY + cursorY,
				});
				setState({ ...state, zCounter: state.zCounter + 1 });
				setState({ ...state, [type]: { ...state[type], z: state.zCounter } });
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
