(function ( $ ){

	/*
	EXAMPLE CONFIGURATION
		var defaultKey	= 'fje329iun52ngtuijo2f4jeun432A', // Unique master Xively API key to be used as a default
		defaultFeeds	= [61916,12425,94322], // Comma separated array of Xively Feed ID numbers
		applicationName	= 'My Company\'s Application', // Replaces Xively logo in the header
		dataDuration	= '90days', // Default duration of data to be displayed // ref: https://xively.com/dev/docs/api/data/read/historical_data/
		dataInterval	= 10800, // Default interval for data to be displayed (in seconds)
		dataColor		= '0A1922', // CSS HEX value of color to represent data (omit leading #)
		hideForm		= 0;
	*/

	var defaultKey		= 'FKKyqnvMWmo3gurC9HRw2MEHyVq4YTHIpa1EXWpxLvwboTsp', // Unique master Xively API key to be used as a default
		feedid	= [841838561], // Comma separated array of Xively Feed ID numbers
		datastreamid1 = 'TeplotaKosice0'
		datastreamid2 = 'TeplotaKosice1'
		applicationName	= '', // Replaces Xively logo in the header
		duration	= '1day', // Default duration of data to be displayed // ref: https://xively.com/dev/docs/api/data/read/historical_data/
		interval	= 60, // Default interval for data to be displayed (in seconds)
		dataColor		= '0A1922', // CSS HEX value of color to represent data (omit leading #)
		hideForm		= 1; // To hide input form use value of 1, otherwise set to 0
xively.setKey( defaultKey );
// Function Declarations

	 data1 = [];
	 data2 = [];
	 var series = [];
	var palette = new Rickshaw.Color.Palette( { scheme: 'classic9' } );
xively.datastream.history(feedid, datastreamid1, {duration: duration, interval: interval, limit: 1000}, function(datastreamData) {
  	//var series = [];
	var points = [];
	// Add Each Datapoint to Array
	datastreamData.datapoints.forEach(function(datapoint) {
	points.push({x: new Date(datapoint.at).getTime()/1000.0, y: parseFloat(datapoint.value)});
	
	});
	data1 = points;

	// Add Datapoints Array to Graph Series Array
	series.push({
	name: datastreamid1,
	data: points,
	color: palette.color()
	});
		xively.datastream.history(feedid, datastreamid2, {duration: duration, interval: interval, limit: 1000}, function(datastreamData) {
		  	//var series = [];
			var points = [];
			
			// Add Each Datapoint to Array
			datastreamData.datapoints.forEach(function(datapoint) {
			points.push({x: new Date(datapoint.at).getTime()/1000.0, y: parseFloat(datapoint.value)});
			
				
			});
		data2 = points;
		console.log(datastreamData.current_value);
			// Add Datapoints Array to Graph Series Array
			series.push({
			name: datastreamid2,
			data: points,
			color: palette.color()
			});
			
			//console.log(series[1].name);
			
									 			// Build Graph
									var graph = new Rickshaw.Graph( {
										element: document.querySelector('#graph'),
										width: 900,
										height: 300,
										renderer: 'line',
										//min: parseFloat(datastreamData.min_value) - .25*(parseFloat(datastreamData.max_value) - parseFloat(datastreamData.min_value)),
										//max: parseFloat(datastreamData.max_value) + .25*(parseFloat(datastreamData.max_value) - parseFloat(datastreamData.min_value)),
										padding: {
											top: 0.02,
											right: 0.02,
											bottom: 0.02,
											left: 0.02
										},
										series: series
										/*	{
											name: datastreamid1,
											data: data1,
											color: palette.color()
											},{
											name: datastreamid1,
											data: data2,
											color: palette.color()
											}
											] 
										*/
									});

									graph.render();

									var ticksTreatment = 'glow';

									// Define and Render X Axis (Time Values)
									var xAxis = new Rickshaw.Graph.Axis.Time( {
										graph: graph,
										ticksTreatment: ticksTreatment
									});
									xAxis.render();

									// Define and Render Y Axis (Datastream Values)
									var yAxis = new Rickshaw.Graph.Axis.Y( {
										graph: graph,
										tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
										ticksTreatment: ticksTreatment
									});
									yAxis.render();

									// Enable Datapoint Hover Values
									var hoverDetail = new Rickshaw.Graph.HoverDetail({
										graph: graph,
										formatter: function(series, x, y) {
											var swatch = '<span class="detail_swatch" style="background-color: ' + series.color + ' padding: 4px;"></span>';
											var content = swatch + "&nbsp;&nbsp;" + parseFloat(y) + '&nbsp;&nbsp;<br>';
											return content;
										}
									});

										var slider = new Rickshaw.Graph.RangeSlider({
	            	   							graph: graph,
								                    element: $('#slider')
									               		});

			
			
			
		});
	
});


console.log(data1);
console.log(data2);



})( jQuery );
