/* 
 * This program should find all words from a dictionary in a grid of letters. Words
 * can be matched in any direction (horizontally, vertically, and diagonally).
 * For example, if passed the dictionary {"cat", "dog", "bird", "plane"}, the program
 * should return the set {"cat", "dog"}. 
 * 
 * 	    |  C  |  C  |  C  |
 *      |  C  |  A  |  C  |
 *      |  C  |  C  |  T  |
 * 		|  D  |  O  |  G  |
 * 
 * Your task is to implement the main function and any other functions you may need to
 * complete the task. In addition to functionality, you'll be assessed on code efficiency,
 * overall structure/code decomposition, and error handling.
 */

/**
 * Finds all words from the dictionary that are present in the grid of letters
 * @param {Array} wordGrid Letter grid represented as an array of char arrays. 
 * The first array from the above example would be passed in
 * as ["C", "C", "C"] and the second would be ["C", "A", "C"], etc...)
 * @param {Set} dictionary Contains all words to look for in the letter grid
 * @returns {Set} All words from the dictionary that were found
 */


function findWords(wordGrid, dictionary) {
	let found_words = new Set()
	for (let i = 0; i < wordGrid.length; i++) {
		for (let j = 0; j < wordGrid[i].length; j++) {

			//checks the horizontal forward direction for matches 
			let foundHF = checkDirection(i, j, wordGrid, dictionary, [0, 1])
			if (foundHF !== undefined) foundHF.map(word => found_words.add(word))

			//checks the horizontal backward direction for matches 
			let foundHB = checkDirection(i, j, wordGrid, dictionary, [0, -1])
			if (foundHB !== undefined) foundHB.map(word => found_words.add(word))

			//checks the vertical forward direction for matches 
			let foundVF = checkDirection(i, j, wordGrid, dictionary, [1, 0])
			if (foundVF !== undefined) foundVF.map(word => found_words.add(word))

			//checks the vertical backward direction for matches 
			let foundVB = checkDirection(i, j, wordGrid, dictionary, [-1, 0])
			if (foundVB !== undefined) foundVB.map(word => found_words.add(word))

			//checks the diagonol NE direction for matches 
			let foundDNE = checkDirection(i, j, wordGrid, dictionary, [-1, 1])
			if (foundDNE !== undefined) foundDNE.map(word => found_words.add(word))

			//checks the diagonol NW direction for matches 
			let foundDNW = checkDirection(i, j, wordGrid, dictionary, [-1, -1])
			if (foundDNW !== undefined) foundDNW.map(word => found_words.add(word))

			//checks the diagonol SE direction for matches 
			let foundDSE = checkDirection(i, j, wordGrid, dictionary, [1, 1])
			if (foundDSE !== undefined) foundDSE.map(word => found_words.add(word))

			//checks the diagonol SW direction for matches 
			let foundDSW = checkDirection(i, j, wordGrid, dictionary, [1, -1])
			if (foundDSW !== undefined) foundDSW.map(word => found_words.add(word))

		}
	}
	return found_words
}


function onBoard(grid, row, column) {

	const res = row >= 0 && column >= 0 && row < grid.length && column < grid[0].length;
	return res
}

function checkDirection(row, column, grid, dictionary, offset_array) {
	let found_words = []
	let stringtoCheck = ""
	let curr_row = row
	let curr_col = column
	let offset = offset_array

	while (onBoard(grid, curr_row, curr_col)) {
		stringtoCheck = stringtoCheck + grid[curr_row][curr_col]
		if (dictionary.has(stringtoCheck.toLowerCase())) {
			found_words.push(stringtoCheck.toLowerCase())
		}
		curr_row += offset[0]
		curr_col += offset[1]
	}

	if (found_words.length !== 0) return found_words
}

//assert equal and test cases 
//* note: Wasn't sure best practice for comparing tests (JSON.stringify didn't work) so opted to convert retrun set to array  

function assertArrayEqual(actual, expected, testName) {
	if (JSON.stringify(actual.sort()) === JSON.stringify(expected.sort())) {
		console.log(`${testName} passed!`);
	} else {
		console.log(`Failed ${testName}. Expected ${expected} but got ${actual}`);
	}
}


const TESTCASES = [
	{
		id: 1,
		dictionary: new Set(["cat", "dog", "owl", "plane"]),
		testcase: [["x", "x", "x"], ["G", "O", "D"], ["o", "w", "l"], ["C", "A", "T"]],
		expected: ["dog", "cat", "owl"],
		description:
			"finds correct words horizontally, forwards and backwards.",
	},
	{
		id: 2,
		dictionary: new Set(["cat", "dog", "owl", "cats"]),
		testcase: [["c", "x", "x"], ["a", "x", "g"], ["t", "x", "o"], ["s", "x", "d"]],
		expected: ["cat", "cats", "dog"],
		description:
			"finds correct words vertically, forwards and backs. Also finds words with same prefix (cat and cats)",
	},
	{
		id: 3,
		dictionary: new Set(["cat", "dog", "age", "ax"]),
		testcase: [["d", "x", "x", "c"], ["x", "o", "a", "e"], ["x", "t", "g", "x"], ["s", "a", "x", "x"]],
		expected: ["dog", "age", "cat", "ax"],
		description:
			"finds corrects words diagonolly, in SE, SW, NE, and NW directions.",
	},
];

TESTCASES.forEach((item) => {
	assertArrayEqual(
		Array.from(findWords(item.testcase, item.dictionary)),
		item.expected,
		"Crossword Search"
	);
	console.log(item.description);
});
