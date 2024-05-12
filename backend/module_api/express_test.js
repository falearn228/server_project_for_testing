let PA1_val;
let PA2_val;
let Splitter_st_val
let Splitter_m3m_val;
let Cable1_val;
let Cable2_val;
let Cable3_val;
let m3mPow;

let mainAtt;
let m3mAttCom;
let baseAtt;

const testResult = [];

const mainMods = new Int8Array(7);

const modName = [
	'BPSK 1/2',
	'QPSK 1/2',
	'QPSK 3/4',
	'QAM16 1/2',
	'QAM16 3/4',
	'QAM64 2/3',
	'QAM64 3/4'
];

const sens = [
  88.5, 
  85.5,
  83,
  80,
  76.5,
  72.5,
  70.5
];

const speed = [
  1600,
  3500,
  5250,
  7000,
  10500,
  14500,
  16500
];

function setValues(pa1, pa2, sp_st, sp_m, cab1, cab2, cab3){
	PA1_val = parseFloat(pa1);
	PA2_val = parseFloat(pa2);
	Splitter_st_val = parseFloat(sp_st);
	Splitter_m3m_val = parseFloat(sp_m);
	Cable1_val = parseFloat(cab1);
	Cable2_val = parseFloat(cab2);
	Cable3_val = parseFloat(cab3);
};

function setM3M(m3m){
	return new Promise((resolve, reject) => {
		m3mPow = parseFloat(m3m);
		resolve(1)
	})
}

function calcMainAtt(modulation){
	return new Promise((resolve, reject) => {
		mainAtt = sens[modulation] + m3mPow - calcBaseAtt();
		resolve(Math.ceil(mainAtt))
	})
}

function calcM3M(){
	m3mAttCom = Math.round(PA1_val + Cable1_val + Splitter_m3m_val) + 2;
	return m3mAttCom;

}

function calcBaseAtt(){
	baseAtt = (PA1_val + PA2_val + Cable1_val + Cable2_val + Cable3_val + Splitter_st_val);
	return baseAtt;
}

function parseBits(inputString){
	const regex = /bits\s(\d+)\sebits\s(\d+)/;

	const matches = regex.exec(inputString);

	let bits;
	let ebits;
	return new Promise((resolve, reject) => {
		if (matches) {
		    bits = parseInt(matches[1], 10);
		    ebits = parseInt(matches[2], 10);
		}
		resolve({bits, ebits})
	})
}
function getSpeed(id) {
	return new Promise((resolve, reject) => {
		resolve(mainMods[id])
	})
}

function getMainModulations(id) {
	return new Promise((resolve, reject) => {
		resolve(mainMods[id])
	})
}

function setResults(id, testRes){
	testResult[id] = testResult;
}

// async function mainModsCalc(){
// 	for(let i=0; i < 7; i++){
// 		mainMods[i] = await calcMainAtt(i);
// 	}
// 	// for(let i=0; i < 7; i++){
// 	// 	console.log(mainMods[i]);
// 	// }
// }

module.exports = {
	setM3M,
	setValues,
	calcMainAtt,
	calcBaseAtt,
	calcM3M,
	parseBits,
	getSpeed,
	setResults,
	//mainModsCalc,
	getMainModulations,
}