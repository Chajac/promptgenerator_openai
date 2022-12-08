import { useEffect, useState } from "react";
import { DragMultiSelect } from "./MultiSelect";

interface artistlistInterface {
	[key: string]: any;
	comics: string[];
	manga: string[];
	illustrators: string[];
	conceptartist: string[];
	draftsman: string[];
	scifivintage: string[];
	painting: string[];
	abstract: string[];
	renaissance: string[];
	pencil: string[];
	medical: string[];
	sculpture: string[];
	surrealist: string[];
}
export const artists: artistlistInterface = {
	comics: [
		"Bernie Wrightson",
		"Moebius",
		"Phillipe Druillet",
		"Jean Claude Mézières",
		"Enki Bilal",
		"Jim Lee",
		"Dave Gibbons",
		"Darwyn Cooke",
		"M.W Kaluta",
		"Mike Mignola",
		"Alan Moore",
		"Asaf Hanuka",
		"Joe Jusko",
		"Jim Steranko",
		"Charles Vess",
		"Mark W. Richards",
		"Mike Deodato",
		"Kyle Hotz",
		"Gabriel Hardman",
		"Greg Capullo",
	],
	manga: [
		"Hiromasa Ogura",
		"Toshiharu Mizutani",
		"Hiroshi Ono",
		"Shinkiro",
		"Bengus",
		"Otomo Katsuhiro",
		"Eisuke Ogura",
		"Kentaru Miura",
		"Takato Yamamoto",
		"Junji Ito",
		"Satoshi Kon",
		"Yusuke Murata",
		"Makoto Shinkai",
		"Yoji Shinkawa",
		"Shotaro Ishinomori",
	],
	illustrators: [
		"Noriyoshi Ohrai",
		"Renato Casaro",
		"Aaron Horkey",
		"Eyvind Earle",
		"Dan Mumford",
		"Apollonia Saintclair",
		"Giovanni Batista Piranesi",
		"Ed Mell",
		"Eugène Grasset",
		"Aubrey Beardsley",
		"Abigail Larson",
		"Winsor McCay",
		"Peter Lloyd",
		"Kilian Eng",
		"Manabu Ikeda",
		"Laurie Greasley",
		"GuangYuan Yu",
		"Peter Polach",
		"Ken Taylor",
		"Hydro74",
		"Sachin Teng",
	],
	conceptartist: [
		"Anato Finnstark",
		"Anton Fadeev",
		"Fenghua Zhong",
		"sparth",
		"Christopher Balaskas",
		"Ayami Kojima",
		"Joe Alves",
		"Chris Bonura",
		"Hyung Tae Kim",
		"Heng Z",
		"Ismail Inceoglu",
	],
	draftsman: [
		"Heinrich Kley",
		"F. L. Griggs",
		"Herbert Railton",
		"Franklin Booth",
		"Käthe Kollwitz",
		"Gustave Dore",
		"Nico Delort",
	],
	scifivintage: [
		"Syd Mead",
		"Ian McQue",
		"Dean Ellis",
		"Angus McKie",
		"Earle Bergey",
		"Tim Hildebrandt",
		"Greg Hildebrandt",
		"Barclay Shaw",
	],
	painting: [
		"Gustave Moreau",
		"John Martin",
		"Erin Hanson",
		"Rob Gonsalves",
		"Edward Hopper",
		"Larry Elmore",
		"Alexander Nasmyth",
	],
	medical: ["Robert Hooke"],
	sculpture: ["Daniel Arsham"],
	surrealist: ["Karol Bak", "Zdzislaw Beksinski", "Remedios Varo"],
	abstract: ["Atelier Olschinsky", "Affandi", "Damon Soule"],
	renaissance: ["Albrecht Durer"],
	pencil: ["Adonna Khare"],
};

export const selectOptions: any[] = [];

(function () {
	for (const categories in artists) {
		for (let names in artists[categories]) {
			selectOptions.push({
				value: artists[categories][names].toLowerCase(),
				label: artists[categories][names],
			});
		}
	}
	return;
})();

function stringData(data: any) {
	//multiple artist concat.
	let artistsString: string[] = [
		// Additional "By" per artist
		data.map((i: any) => i.label),
		// "By " + data.map((i: any) => i.label).join(",By "),

		// Concat that adds "and" before the final artist -- Disco Diffusion preferred
		// " By " +
		//   data
		//     .map((i: any) => i.label)
		//     .splice(0, data.length - 1)
		//     .join(", ") +
		//   " and " +
		//   data.slice(-1).map((i: any) => i.label),
	];
	//set if no artists
	if (data.length === 0) {
		return (artistsString = []);
		//If only one artist
	} else if (data.length === 1) {
		return [" By " + data.map((i: any) => i.label)];
	}
	return artistsString;
}

function ArtistData({ getArtists }: any) {
	const [selectData, setSelectData] = useState<Array<string>>([]);
	useEffect(() => {
		getArtists(stringData(selectData));
	}, [selectData, setSelectData, getArtists]);
	//console.log("select data " + selectData);

	return (
		<div>
			<p>{stringData(selectData)}</p>
			<DragMultiSelect options={selectOptions} getList={setSelectData} />
		</div>
	);
}

export default ArtistData;
