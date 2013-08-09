var retrospectiveGraphs = function() {
	var graphData = [],
    	processedGraphData = [],
    	wideMetrics = [],
    	dontKnowMetrics = [],
		data = {
	    	"Jeff": [0,0,2,3,4,0,1,2,3,4,1],
	    	"Ciaran": [2,1,2,3,4,0,1,2,3,4,2,],
	    	"Christophe": [3,2,2,3,4,0,1,2,3,4,2],
	    	"Jonic": [0,3,4,3,4,0,1,2,3,4,4],
	    	"Anita": [0,4,2,3,4,0,1,2,3,4,4],
	    	"Gary": [2,0,2,3,4,0,1,2,3,4,4],
	    	"Marlon": [3,1,2,3,4,0,1,2,3,4,4],
	    	"Gav": [0,2,4,3,4,0,1,2,3,4,4]
    	},
		numParticipants = Object.keys(data).length;

    function init () {
    	Array.max = function( array ){
		    return Math.max.apply( Math, array );
		};

    	createGraphData();
    	processGraphData();
    	calculateWide();
    	calculateDontKnow();

    	filterWide();
    	filterDontKnow();
    	displayGraphData();

    };

    function createGraphData () {
    	var length = 0;

    	for (var person in data) {
		   var obj = data[person];
		   for (var prop in obj) {
		      if(obj.hasOwnProperty(prop)){
		        length++;
		      };
		   };
		   break;
		};

		for (var i = 0; i<length; i++) {
			var graph = [];

			for (var person in data) {
			    if(obj.hasOwnProperty(prop)){
					graph.push(data[person][i]);
				}
			};

			graphData.push(graph);

		}
    };

    function processGraphData () {
    	for(var i = 0; i<graphData.length; i++) {
    		var graph = [];
    		graph[0] = 0;
    		graph[1] = 0;
    		graph[2] = 0;
    		graph[3] = 0;
    		graph[4] = 0;

    		for (var j = 0; j<graphData[i].length; j++) {
    			graph[graphData[i][j]]++
    		}

    		processedGraphData.push(graph);
    	}

    	console.log(processedGraphData);
    };

    function displayGraphData () {
    	for(var i = 0; i<processedGraphData.length; i++) {
    		var max = Math.max.apply(Math, processedGraphData[i]);

    		var $targetGraph = $('#question_' + (i+1));
    		$targetGraph.find('.progress .progress-bar').each(function(j){
    			var percent = processedGraphData[i][j] / max * 100;
    			$(this).css('width', percent + '%');
    		});

    		$targetGraph.find('.badge').each(function(j){
    			$(this).html(processedGraphData[i][j]);
    		});
    	}
    };

	function calculateWide () {
		var limit = 2/5;
		var fraction;

		for(var i = 0; i<processedGraphData.length; i++) {

			for(var j = 0; j<processedGraphData[i].length; j++) {
				fraction = processedGraphData[i][j]/numParticipants;

				if(fraction > limit) { //If one answer has more than 40% of the answer
					break;
				}
				else if(j === processedGraphData[i].length-1) {
					wideMetrics.push(i);
				}
			}
		}
	};

	function filterWide() {
		var container = $('.wide-metric');
		
		for(var i=0; i<wideMetrics.length; i++) {
			container.find('.list-group-item').each(function(){
				if($(this).attr('href') === '#question_' + (wideMetrics[i] + 1)) {
					$(this).addClass('show');
				}
			});
		}
	}

	function calculateDontKnow () {
		var limit = 2/5;
		var fraction;

		for(var i = 0; i<processedGraphData.length; i++) {
			if(processedGraphData[i][0]>limit) {
				dontKnowMetrics.push(i);
			}
		}
	};

	function filterDontKnow() {
		var container = $('.dont-know-metric');
		
		for(var i=0; i<dontKnowMetrics.length; i++) {
			container.find('.list-group-item').each(function(){
				if($(this).attr('href') === '#question_' + (dontKnowMetrics[i] + 1)) {
					$(this).addClass('show');
				}
			});
		}
	}

    return {
        init: init
    };
}();