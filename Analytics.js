import wixData from 'wix-data';

let htmlDone = false;


$w.onReady(async function () {
    // query Wildfest Application for name and total Votes
    const chartItems = await wixData
		.query("{wildfestVotes}")
		.find()
		.then(res => res.items);
        const artists = chartItems.map(item => item.name);
        const totalVotes = chartItems.map(item => item.votes);
    $w("#html1").onMessage(event => {


    // When all the data is gatherd, start uploading to embedded HTML object
    if (event.data === "READY" && htmlDone === false) {
        
        console.log(event.data);
        var index = 0;
        let chartData = [];
        // For each element in the database (ie. for each band that signed up) add to chart with Random Color
        for(const element of chartItems){
            chartData.push({label: artists[index], value: totalVotes[index], color: getRandomColor()});
            index += 1;
        }
        // Upload data to embedded HTML object
        $w("#html1").postMessage(chartData);

    htmlDone = true;

    }

});

});



// Generate Random Color
function getRandomColor() {
 var letters = '0123456789ABCDEF'; // all values for color (base 16 / HEX values)
 var color = '#'; // color start
 for (var i = 0; i < 6; i++) { // add 6 random letters/numbers from above object
     color += letters[Math.floor(Math.random() * 16)]; // add random character from letters object
  }
 return color; // return color
}