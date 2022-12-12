import wixData from "wix-data";
import wixWindow from "wix-window";
import {local} from "wix-storage";

/*
	Variables
*/
var votesLeft = 5;

$w.onReady(function () {
	// Display popup window
	
    if(local.getItem("{ItemName}")){
		DisableButtons();
		wixWindow.openLightbox("You Already Voted"); // If user has already voted
		$w("#txtVotesLeft").text = "Votes Left: 0";
    }else{
		wixWindow.openLightbox("Vote For The Next"); // if user has not voted yet
		$w("#txtVotesLeft").text = "Votes Left: " + votesLeft;
	}
	
});
export function DisableButtons(){
	$w("#btnVote").disable();
}


export function btnVote_click(event) {
	local.setItem("{ItemName}", "{ItemValue}") // Store in Cookies that user voted
	// If user ran out of votes, disable button and open Thanks lighbox
	if(votesLeft <= 0){
		DisableButtons(); // Disable vote button
		wixWindow.openLightbox("Thanks");
	}

}



/*
	Add Band Information to Repeater
*/
export function bandInfoDataset_ready() {
	$w("#repeater10").forEachItem(($item, itemData, index)=>{
		if(index != 6 && index != 2 && index < 13){
		
		$item("#btnVote").onClick((event)=>{
			if(votesLeft > 0){
				$item("#btnVote").disable();
				wixData.query("{wildfestVotes}").eq("formid", index.toString()).find().then((result)=>{
					if(result.items.length > 0){
						let items = result.items;
						let totalVotes = items[0].votes;
						totalVotes+=1;
						let voteItems = {
							"_id":		items[0]._id,
							"formid":	index.toString(),
							"votes":	totalVotes,
							"name":		items[0].name
						}
						wixData.update("wildfestVotes",voteItems)
						.then((results)=>{
							let item = results;
						})
					}
				
				});
				votesLeft -= 1;
				$w("#txtVotesLeft").text = "Votes Left: " + votesLeft;
			}
		})
		/*
			Band Information
		*/
		wixData.query("{wildfestBandInfo}").eq("formid", index.toString()).find().then((result)=>{
			if(result.items.length > 0){
				let items = result.items;
				$item("#txtName").text = items[0].name;
				$item("#txtLogo").src = items[0].photo;
				$item("#txtBio").text = items[0].bio;
			}
			
			
		})
		/*
			Social Media
		*/
		wixData.query("{wildfestSocial}").eq("formid", index.toString()).find().then((result)=>{
			let items = result.items;
			
			if(items.length > 0){
				
				let SocialItems = [];
				for(let i=0;i<items.length;i++){
					SocialItems.push({
						"type" : "image",
						"title" : "SocialMedia",
						"src" : items[i].socialimg,
						"link" : items[i].sociallink
					})
					
				}
				
				$item("#gallery1").items = SocialItems;
			}else{
				$item("#gallery1").collapse();
				$item("#text182").collapse();
				$item("#line2").collapse();
			}

		})
		/*
			Video Information
		*/
		wixData.query("{wildfestOfficialVideo}").eq("formid", index.toString()).find().then((result)=>{
			switch(result.items.length){
				case 0:
					$item("#videoPlayer1").collapse();
					$item("#videoPlayer2").collapse();
					$item("#videoPlayer3").collapse();
					break;
				case 1:
					$item("#videoPlayer1").src = result.items[0].video;

					$item("#videoPlayer2").collapse();
					$item("#videoPlayer3").collapse();
					break;
				case 2:
					$item("#videoPlayer1").src = result.items[0].video;
					$item("#videoPlayer2").src = result.items[1].video;

					$item("#videoPlayer3").collapse();
					break;
				case 3:
					$item("#videoPlayer1").src = result.items[0].video;
					$item("#videoPlayer2").src = result.items[1].video;
					$item("#videoPlayer3").src = result.items[2].video;
					break;
			}
		})
		/*
			Track Information
		*/
		wixData.query("{wildfestTrack}").eq("formid", index.toString()).find().then((result)=>{
			let items = result.items;
			switch(result.items.length){
				case 0:
					$item("#audioPlayer9").collapse();
					$item("#audioPlayer10").collapse();
					$item("#audioPlayer11").collapse();
					break;
				case 1:
				$item("#audioPlayer9").trackName = items[0].title;
					$item("#audioPlayer9").artistName = items[0].artist;
					$item("#audioPlayer9").src = items[0].mp3;
					$item("#audioPlayer9").coverImage = items[0].img;

					$item("#audioPlayer10").collapse();
					$item("#audioPlayer11").collapse();
					break;
				case 2:
					$item("#audioPlayer9").trackName = items[0].title;
					$item("#audioPlayer9").artistName = items[0].artist;
					$item("#audioPlayer9").src = items[0].mp3;
					$item("#audioPlayer9").coverImage = items[0].img;

					$item("#audioPlayer10").trackName = items[1].title;
					$item("#audioPlayer10").artistName = items[1].artist;
					$item("#audioPlayer10").src = items[1].mp3;
					$item("#audioPlayer10").coverImage = items[1].img;

					$item("#audioPlayer11").collapse();
					break;
				case 3:
					$item("#audioPlayer9").trackName = items[0].title;
					$item("#audioPlayer9").artistName = items[0].artist;
					$item("#audioPlayer9").src = items[0].mp3;
					$item("#audioPlayer9").coverImage = items[0].img;

					$item("#audioPlayer10").trackName = items[1].title;
					$item("#audioPlayer10").artistName = items[1].artist;
					$item("#audioPlayer10").src = items[1].mp3;
					$item("#audioPlayer10").coverImage = items[1].img;

					$item("#audioPlayer11").trackName = items[2].title;
					$item("#audioPlayer11").artistName = items[2].artist;
					$item("#audioPlayer11").src = items[2].mp3;
					$item("#audioPlayer11").coverImage = items[2].img;
					break;
			}
			
			
		})
		}else{
			$item("#container10").collapse();
		}
	})
}
