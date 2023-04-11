import React from "react";
import { ModalOverlay, ListDiv, ModalP, ModalList } from "./styled/ModalStyle";
import { copyToClipboard } from "./CopyToClipboardFunc";
import { Button } from "./styled/ButtonStyle";

interface Props {
	content: Array<Object>;
	closeModal: () => void;
}

function ModalWindow({ content, closeModal }: Props) {
	return (
		<ModalOverlay>
			<div>
				<h3>Prompt History</h3>
			</div>
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
				<Button
					background={"#272727"}
					color={"white"}
					padding={"5px 10px 5px 10px"}
					onClick={closeModal}
				>
					Close
				</Button>
			</div>
		</ModalOverlay>
	);
}

export default ModalWindow;
