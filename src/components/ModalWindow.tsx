import React from "react";
import { ModalOverlay, ListDiv, ModalP, ModalList } from "./styled/ModalStyle";
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
						<ModalList>
							<ListDiv
								onClick={() => copyToClipboard(i.positive)}
							>
								<ModalP>{i.positive}</ModalP>
							</ListDiv>
						</ModalList>
					))}
				</ol>
				<button onClick={closeModal}>Close</button>
			</div>
		</ModalOverlay>
	);
}

export default ModalWindow;
