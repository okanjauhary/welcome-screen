export function isEmpty(data) {
	if (typeof data === 'undefined' || data === null) {
		return true;
	} else if (typeof data === 'object' && Object.keys(data).length <= 0) {
		return true;
	} else if (Array.isArray(data) && data.length <= 0) {
		return true;
	} else {
		return false;
	}
}
