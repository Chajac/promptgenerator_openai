import React from "react";
import { ModalOverlay, ListDiv } from "./styled/ModalStyle";
import { copyToClipboard } from "./CopyToClipboardFunc";

interface Props {
	content: Array<Object>;
	closeModal: () => void;
}

function ModalWindow({ content, closeModal }: Props) {
	return (
		<ModalOverlay>
			<div className="m-content">
				<ol>
					{content.map((i: any, key: number) => (
						<li>
							<ListDiv
								onClick={() => copyToClipboard(i.positive)}
							>
								<p>{i.positive}</p>
							</ListDiv>
						</li>
					))}
				</ol>
				<button onClick={closeModal}>Close</button>
			</div>
		</ModalOverlay>
	);
}

export default ModalWindow;
