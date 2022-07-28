import stringHash from 'string-hash';

export default function hash(strA, strB){
	const firstStr = strA > strB ? strA : strB
	const secondStr = firstStr === strA ? strB : strA
	return stringHash(firstStr + secondStr).toString()
}