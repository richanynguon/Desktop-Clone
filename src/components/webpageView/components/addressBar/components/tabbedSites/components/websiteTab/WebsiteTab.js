// Libraries
import React, {useContext} from "react";

// Stlyes
import {
	SiteTabContainer,
	TopBorder,
	Border,
	LowerContent,
	RemoveTab,
	TitleContainer,
	TitleText
} from "./styles/websiteTabStyles";


// Assets
import ActiveX from "../../../../../../../../assets/webpage/activeX.png";
import DarkX from "../../../../../../../../assets/webpage/darkX.png";
import HoverX from "../../../../../../../../assets/webpage/hoverX.png";
import Soot from "../../../../../../../../assets/webpage/soot.gif";


//Context
import WindowsContext from "../../../../../../../../modules/windowContext";

export default function WebsiteTab(props) {
	const { statefulWindows, setWindowState } = useContext(WindowsContext);
	const { state, setCounter, item, setActive, isActive } = props;
	return (
		<SiteTabContainer
			img={DarkX}
			hoverImage={HoverX}
			lastChild={item === state[state.length - 1]}
			isActive={isActive}
			activeImage={ActiveX}
			onClick={(e) => {
				e.stopPropagation();
				setActive(item);
			}}>
			<TopBorder isActive={isActive} />
			<LowerContent>
				<Border
					firstChild={item === state[0]}
					className={`${item}1`}
					isActive={isActive}
				/>
				<TitleContainer isActive={isActive}>
					<TitleText >
						<img src={Soot} alt="soot spirit from spirited away"/>
						Richany Nguon
					</TitleText>
					<RemoveTab
						className='removeTab'
						onClick={(e) => {
							e.stopPropagation();
							const removeLast = state.slice(1, state.length);
							setCounter(removeLast);
							console.log(state)
							if (state.length === 1){
								setWindowState({
									...statefulWindows,
									homepage: {
										...statefulWindows.hompage,
										minimized: false,
										maximized: false,
										closed: true,
									},
								});
							}
						}}
						img={DarkX}
					/>
				</TitleContainer>

				<Border
					className={`${item}1`}
					isActive={isActive}
					secLastChild={item === state[state.length - 2]}
				/>
			</LowerContent>
		</SiteTabContainer>
	);
}
