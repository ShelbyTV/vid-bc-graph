Array.prototype.swap=function(a, b) {
	var tmp=this[a];
	this[a]=this[b];
	this[b]=tmp;
}


var partition = function(array, begin, end, pivot, graph) {
	var piv=array[pivot];
	array.swap(pivot, end-1);
	var store=begin;
	var ix;
	for(ix=begin; ix<end-1; ++ix) {
		if(graph[array[ix]].length<=graph[piv].length) {
			array.swap(store, ix);
			++store;
		}
	}
	array.swap(end-1, store);

	return store;
}

var qsort = function(array, begin, end, graph) {
	if(end-1>begin) {
		var pivot=begin+Math.floor(Math.random()*(end-begin));

		pivot=partition(array, begin, end, pivot, graph);

		qsort(array, begin, pivot, graph);
		qsort(array, pivot+1, end, graph);
	}
}


module.exports = function(array, graph) {
	qsort(array, 0, array.length, graph);
}
