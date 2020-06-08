import React, { useState } from "react";
import { SelectionContainer, SelectionIcon } from "./styles/selectionStyles";

export default function Selection(props) {
	const {
		actionInactive,
		actionHover,
		actionActive,
		onClickFunc,
		iconInactive,
		iconHover,
		iconActive,
		title,
		subtitle,
		subscript,
		innerIconActive,
		innerIconHover,
		innerIconInactive,
		innerTitle,
		openIconInactive,
		openIconActive,
		openIconHover,
		state,
		setState,
		topFolder,
		actionDownInactive,
		actionDownActive,
		actionDownHover,
	} = props;
	const [isOpen, setIsOpen] = useState(true);
	return (
		<SelectionContainer
			isOpen={isOpen}
			actionHover={actionHover}
			actionActive={actionActive}
			actionOpenActive={actionDownActive}
			actionOpenHover={actionDownHover}
			innerActive={innerIconActive}
			innerHover={innerIconHover}
			iconOpenActive={openIconActive}
			iconOpenHover={openIconHover}
			iconHover={iconHover}
			iconActive={iconActive}
			>
			<button
				className='FolderButton'
				onClick={
					topFolder
						? () => {
								setState(!state);
								setIsOpen(!isOpen);
						  }
						: () => {
								setIsOpen(!isOpen);
						  }
				}>
				{actionInactive && (
					<SelectionIcon
						className='folder'
						isOpen={isOpen}
						inactive={actionInactive}
						openInactive={actionDownInactive}
					/>
				)}
				<SelectionIcon
					className='folder'
					isOpen={isOpen}
					openInactive={openIconInactive}
					inactive={iconInactive}

				/>
				<p>{title}</p>
				{subtitle}
				{subscript}
			</button>
			{innerTitle && (
				<button
					className='FileButton'
					onClick={(e) => {
						onClickFunc();
					}}>
					<SelectionIcon
						className='file'
						inactive={innerIconInactive}
					/>
					<p>{innerTitle}</p>
				</button>
			)}
		</SelectionContainer>
	);
}
