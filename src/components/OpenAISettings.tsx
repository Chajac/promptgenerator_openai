import { OpenAIApi } from "openai";
import React, { useState } from "react";
import { DragSingleSelect } from "./MultiSelect";
import oaiConfig from "./OpenAIConfig";

interface Models {
	label: string;
	id: string;
}

function OpenAISettings(apiKey: any) {
	const [models, setModels] = useState<Models>({
		label: "",
		id: "",
	});

	const modelList: { label?: string; value?: string }[] = [];

	async function getModels() {
		const openai = new OpenAIApi(oaiConfig(apiKey));
		const response = await openai.listModels();
		response.data?.data?.forEach((i) => {
			if (i.owned_by === "openai") {
				modelList.push({ value: i.id, label: i.id });
			}
		});
		return;
	}
	getModels();

	return <DragSingleSelect options={modelList} getList={setModels} />;
}

export default OpenAISettings;
