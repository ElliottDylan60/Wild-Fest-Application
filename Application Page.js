import wixData from 'wix-data';
import wixWindow from 'wix-window';
/*
	Contact Information
*/
var Name;
var Email;
var Phone;
var BandName;
var Genere;
var MembersPhoto;
var BandBio;
var HomeTown;
var isVaccinated;

/*
	Social Media
*/
var snapchat;
var facebook;
var soundcloud;
var twitter;
var instagram;
var tiktok;
var youtube;
var website;
var SocialItems = [];

/*
	Track Information
*/
var TrackName;
var TrackArtist;
var SongFile;
var TrackImage;

/*
	Second Track
*/
var SecondTrackName;
var SecondTrackArtist;
var SecondSongFile;
var SecondTrackImage;


/*
	Third Track
*/
var ThirdTrackName;
var ThirdTrackArtist;
var ThirdSongFile;
var ThirdTrackImage;


/*
	Official Vidoes
*/
var OfficalVideoLink;
var SecondOfficalVideoLink;
var ThirdOfficalVideoLink;

/*
	Questions
*/
var Questions;
/*
	Agreement
*/
var agreed;

$w.onReady(function () {

});

/*
	Make sure all pages have required fields filled
*/
export function firstPageDone(){
	if($w('#txtName').valid && $w('#txtEmail').valid && $w('#txtBand').valid && $w('#txtGenere').valid && $w("#upldMembers").valid && $w('#txtBio').valid && $w('#txtHome').valid && $w('#checkVaccinated').valid){
		$w("#txtMissing1").hide();
		return true;
	}else{
		$w("#txtMissing1").show();
		return false;
		
	}
}
export function thirdPageDone(){
	if($w("#txtTrackName").valid && $w("#txtTrackArtist").valid && $w("#upldSong").valid && $w("#upldTrackImage").valid && $w("#checkTerms").checked){
		$w("#txtMissing2").hide();
		return true;
	}else{
		$w("#txtMissing2").show();
		return false;
	}
	
}
/*
	Button Pressed
	Save all data and change pages
*/
export function btnContactToSocial_click(event) {
	if(firstPageDone()){
		$w("#statebox8").changeState("SocialMedia")	
	}
	
}

export function btnSocialToContact_click(event) {
	$w("#statebox8").changeState("ContactInfo")	
}

export function btnSocialToTrack_click(event) {
	$w("#statebox8").changeState("TrackInfo")	
}

export function btnTrackToSocial_click(event) {
	$w("#statebox8").changeState("SocialMedia")
}

export function btnTrackToPreview_click(event) {
	if(thirdPageDone()){
		preview();
		$w("#statebox8").changeState("Preview");
		
	}
}

export function btnPreviewtoTrack_click(event) {
	 $w("#statebox8").changeState("TrackInfo");
}
/*
	Upload Content
*/
export function upldMembers_change(event) {
	$w('#upldMembers').startUpload()
	.then((uploadedFile) => {
		MembersPhoto = uploadedFile.url
	})
	.catch((uploadError)=>{
		console.log(uploadError.errorDescription);
	})
}

/*
	Load Preview Page
*/
export function preview(){
	$w("#repeater10").forEachItem(($item, itemData, index)=>{
		/*
			All Information
		*/
		$item("#Logo").src = MembersPhoto;
		$item("#text196").text = BandName;
		$item("#text195").text = BandBio;
		$item("#audioPlayer9").trackName = TrackName;
		$item("#audioPlayer9").artistName = TrackArtist;
		$item("#audioPlayer9").coverImage = TrackImage;
		$item("#audioPlayer9").src = SongFile;
		$item("#videoPlayer1").src = OfficalVideoLink;
		/*
			Listen Section
		*/
		if(TrackName == null || TrackArtist == null || TrackImage == null){
			$item("#audioPlayer9").collapse();
		}
		if(OfficalVideoLink == null || OfficalVideoLink == ""){
			$item("#videoPlayer1").collapse();
		}
		if($item("#videoPlayer1").collapsed && $item("#audioPlayer9").collapsed){
			$item("#text194").collapse();
			$item("#line1").collapse();
		}
		/*
			Social Media Section
		*/
		SocialItems = [];
		if(soundcloud != null && soundcloud != "" && soundcloud != " "){
			SocialItems.push({
				"type" : "image",
				"title" : "soundcloud",
				"src" : "https://static.wixstatic.com/media/d672b9_206961a0e53a4e558602bcd753ff5095~mv2.png",
				"link" : soundcloud
			});
		}
		if(youtube != null && youtube != "" && youtube != " "){
			SocialItems.push({
				"type" : "image",
				"title" : "youtube",
				"src" : "https://static.wixstatic.com/media/d672b9_56da2bf0504f48b8bd3a575c8e76553b~mv2.png",
				"link" : youtube
			});
		}
		if(tiktok != null && tiktok != "" && tiktok != " "){
			SocialItems.push({
				"type" : "image",
				"title" : "tiktok",
				"src" : "{ICON LOCATION}",
				"link" : tiktok
			});
		}
		if(twitter != null && twitter != "" && twitter != " "){
			SocialItems.push({
				"type" : "image",
				"title" : "twitter",
				"src" : "{ICON LOCATION}",
				"link" : twitter
			});
		}
		if(instagram != null && instagram != "" && instagram != " "){
			SocialItems.push({
				"type" : "image",
				"title" : "instagram",
				"src" : "{ICON LOCATION}",
				"link" : instagram
			});
		}
		if(snapchat != null && snapchat != "" && snapchat != " "){
			SocialItems.push({
				"type" : "image",
				"title" : "snapchat",
				"src" : "{ICON LOCATION}",
				"link" : snapchat
			});
		}
		if(facebook != null && facebook != "" && facebook != " "){
			SocialItems.push({
				"type" : "image",
				"title" : "Facebobok",
				"src" : "{ICON LOCATION}",
				"link" : facebook
			});
		}
		if(website != null && website != "" && website != " "){
			SocialItems.push({
				"type" : "image",
				"title" : "Website",
				"src" : "{ICON LOCATION}",
				"link" : website
			});
		}
		//console.log(item);
		$item("#gallery1").items = SocialItems;
	})	
}


/*
	Upload Content to Database
*/
export async function btnSubmit_click(event) {
	let count = await wixData.query("{wildfestBandInfo}").find().then((result)=>{
		return result.totalCount;
	})
	let id = String(count);
	/*
		Contact
	*/
	let contactItems = {
		"formid":	id,
		"name":		Name,
		"email":	Email,
		"phone":	Phone

	};
	/*
		Band Info
	*/
	let bandItems = {
		"formid"	:	id,
		"name"		:	BandName,
		"genre"		:	Genere,
		"bio"		:	BandBio,
		"photo"		:	MembersPhoto,
		"town"		:	HomeTown,
		"vaccinated": 	isVaccinated,
		"questions"	: 	Questions
	};
	let voteItems = {
		"formid":	id,
		"votes":	0,
		"name":		BandName
	};
	/*
		Social
	*/
	for(let i=0;i<SocialItems.length;i++){
		let socialItem = {
			"formid":		id,
			"socialimg":	SocialItems[i].src,
			"sociallink":	SocialItems[i].link
		};
		wixData.insert("{wildfestSocial}",socialItem)
		.then((results)=>{
			let item = results;
		})
		.catch((err)=>{
			console.log(err);
		})
	}
	/*
		Track
	*/
	if(TrackName != "" && TrackName != undefined){
		let TrackItem = {
			"formid":	id,
			"title":	TrackName,
			"artist":	TrackArtist,
			"img":		TrackImage,
			"mp3":		SongFile
		}
		wixData.insert("{wildfestTrack}",TrackItem)
		.then((results)=>{
			let item = results;
		})
		.catch((err)=>{
			console.log(err);
		})
	}
	if(SecondTrackName != "" && SecondTrackName != undefined){
		let TrackItem = {
			"formid":	id,
			"title":	SecondTrackName,
			"artist":	SecondTrackArtist,
			"img":		SecondTrackImage,
			"mp3":		SecondSongFile
		}
		wixData.insert("wildfestTrack",TrackItem)
		.then((results)=>{
			let item = results;
		})
		.catch((err)=>{
			console.log(err);
		})
	}
	if(ThirdTrackName != "" && ThirdTrackName != undefined){
		let TrackItem = {
			"formid":	id,
			"title":	ThirdTrackName,
			"artist":	ThirdTrackArtist,
			"img":		ThirdTrackImage,
			"mp3":		ThirdSongFile
		}
		wixData.insert("{wildfestTrack}",TrackItem)
		.then((results)=>{
			let item = results;
		})
		.catch((err)=>{
			console.log(err);
		})
	}
	/*
		Official Videos
	*/
	if(OfficalVideoLink != "" && OfficalVideoLink != undefined && OfficalVideoLink != " "){
		let VideoItem={
			"formid":	id,
			"video":	OfficalVideoLink
		};
		wixData.insert("{wildfestOfficialVideo}",VideoItem)
		.then((results)=>{
			let item = results;
		})
		.catch((err)=>{
			console.log(err);
		})
	}
	if(SecondOfficalVideoLink != "" && SecondOfficalVideoLink != undefined && SecondOfficalVideoLink != " "){
		let VideoItem={
			"formid":	id,
			"video":	SecondOfficalVideoLink
		};
		wixData.insert("{wildfestOfficialVideo}",VideoItem)
		.then((results)=>{
			let item = results;
		})
		.catch((err)=>{
			console.log(err);
		})
	}
	if(ThirdOfficalVideoLink != "" && ThirdOfficalVideoLink != undefined && ThirdOfficalVideoLink != " "){
		let VideoItem={
			"formid":	id,
			"video":	ThirdOfficalVideoLink
		};
		wixData.insert("{wildfestOfficialVideo}",VideoItem)
		.then((results)=>{
			let item = results;
		})
		.catch((err)=>{
			console.log(err);
		})
	}
	/*
		Insert
	*/
	wixData.insert("{WildfestContact}",contactItems)
	.then((results)=>{
		let item = results;
	})
	.catch((err)=>{
		console.log(err);
	})
	wixData.insert("{wildfestBandInfo}",bandItems)
	.then((results)=>{
		let item = results;
	})
	.catch((err)=>{
		console.log(err);
	})
	wixData.insert("{wildfestVotes}", voteItems)
	.then((results)=>{
		let item = results;
	})
	.catch((err)=>{
		console.log(err);
	})
	wixWindow.openLightbox("Thanks For Your Application");
	/*
		Send Email Verification
	*/
	// Email parameters
    let params = {
        user_id: '{USER_UD}', // Specified User ID from emailJS
        service_id: '{SERVICE_ID}', // from email
        template_id: '{TEMPLATE_ID}', // Specified Template from emailJS
        template_params: { // parameters for template
            'from_email': 	'{EMAIL}',
            'to_email':		Email,
            'name': 		Name,
			'phone':		Phone,
			'bandName':		BandName,
			'genre':		Genere,
			'bio':			BandBio,
			'homeTown':		HomeTown,
			'trackName':	TrackName,
			'trackArtist':	TrackArtist
        }
    };
    // Email header
    let headers = {
        'Content-type': 'application/json'
    };
    // Email Options
    let options = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(params)
    };
    // get emailJS api and use to send email using emailJS
    fetch('https://api.emailjs.com/api/v1.0/email/send', options)
    .then((httpResponse) => {
        if (httpResponse.ok) {
            console.log('Your mail is sent!');
        } else {
            return httpResponse.text()
            .then(text => Promise.reject(text));
        }
    })
    .catch((error) => {
        console.log('Someting went wrong: \n ' + error);
    });
}

/*
	Contact Info On Change
*/
export function txtName_change(event) {
	Name = $w("#txtName").value;
}

export function txtEmail_change(event) {
	Email = $w("#txtEmail").value;
}

export function txtPhone_change(event) {
	Phone = $w("#txtPhone").value;
}

export function txtBand_change(event) {
	BandName = $w("#txtBand").value;
}

export function txtGenere_change(event) {
	Genere = $w("#txtGenere").value;
}

export function txtBio_change(event) {
	BandBio = $w("#txtBio").value;
	
}

export function txtHome_change(event) {
	 HomeTown = $w("#txtHome").value;
}

export function checkVaccinated_change(event) {
	if($w("#checkVaccinated").value[0] == "Yes"){
		isVaccinated = true;
	}else{
		isVaccinated = false;
	}
}

export function txtBio_input(event) {
	const total = $w("#txtBio").value.length;
	$w("#lbLimit").text = total+"/800"; 
}

/*
	Social Media On Change
*/
export function txtSnapchat_change(event) {
	snapchat = $w("#txtSnapchat").value;
}


export function txtFacebook_change(event) {
	facebook = $w("#txtFacebook").value;

}


export function txtSoundcloud_change(event) {
	soundcloud = $w("#txtSoundcloud").value;

}


export function txtTwitter_change(event) {
	twitter = $w("#txtTwitter").value;

}


export function txtInstagram_change(event) {
	instagram = $w("#txtInstagram").value;

}


export function txtTiktok_change(event) {
	tiktok = $w("#txtTiktok").value;

}


export function txtYoutube_change(event) {
	youtube = $w("#txtYoutube").value;

}

export function txtWebsite_change(event) {
	website = $w("#txtWebsite").value;

}
/*
	First Track On Change
*/
export function txtTrackName_change(event) {
	TrackName = $w("#txtTrackName").value
	$w("#exampleTrack").trackName = TrackName;
}
export function txtTrackArtist_change(event) {
	TrackArtist = $w("#txtTrackArtist").value;
	$w("#exampleTrack").artistName = TrackArtist;
}
export function upldSong_change(event) {

	$w('#upldSong').uploadFiles()
	.then((uploadedFile) => {
		SongFile = uploadedFile[0].fileUrl;
		$w("#exampleTrack").src = uploadedFile[0].fileUrl;
	})
	.catch((uploadError)=>{
		console.log(uploadError.errorDescription);
	})
}
export function upldTrackImage_change(event) {

	$w('#upldTrackImage').uploadFiles()
	.then((uploadedFile) => {
		TrackImage = uploadedFile[0].fileUrl;
		$w("#exampleTrack").coverImage = uploadedFile[0].fileUrl;
		
	})
	.catch((uploadError)=>{
		console.log(uploadError.errorDescription);
	})
}

/*
	Second Track On Change
*/
export function input1_change(event) {
	SecondTrackName = $w("#input1").value;
	$w("#exampleTrack2").trackName = SecondTrackName;
}


export function input2_change(event) {
	SecondTrackArtist = $w("#input2").value;
	$w("#exampleTrack2").artistName = SecondTrackArtist;
}


export function uploadButton2_change(event) {
	 $w('#uploadButton2').uploadFiles()
	.then((uploadedFile) => {
		SecondSongFile = uploadedFile[0].fileUrl;
		$w("#exampleTrack2").src = uploadedFile[0].fileUrl;
	})
	.catch((uploadError)=>{
		console.log(uploadError.errorDescription);
	})
}


export function uploadButton1_change(event) {
	 $w('#uploadButton1').uploadFiles()
	.then((uploadedFile) => {
		SecondTrackImage = uploadedFile[0].fileUrl;
		$w("#exampleTrack2").coverImage = uploadedFile[0].fileUrl;
		
	})
	.catch((uploadError)=>{
		console.log(uploadError.errorDescription);
	})
}
/*
	Third Track On Change
*/

export function input4_change(event) {
	ThirdTrackName = $w("#input4").value;
	$w("#exampleTrack3").trackName = ThirdTrackName;
}

export function input5_change(event) {
	ThirdTrackArtist = $w("#input5").value;
	$w("#exampleTrack3").artistName = ThirdTrackArtist;
}


export function uploadButton4_change(event) {
	 $w('#uploadButton4').uploadFiles()
	.then((uploadedFile) => {
		ThirdSongFile = uploadedFile[0].fileUrl;
		$w("#exampleTrack3").src = uploadedFile[0].fileUrl;
		
	})
	.catch((uploadError)=>{
		console.log(uploadError.errorDescription);
	})
}


export function uploadButton3_change(event) {
	 $w('#uploadButton3').uploadFiles()
	.then((uploadedFile) => {
		ThirdTrackImage = uploadedFile[0].fileUrl;
		$w("#exampleTrack3").coverImage = uploadedFile[0].fileUrl;
		
	})
	.catch((uploadError)=>{
		console.log(uploadError.errorDescription);
	})
}
/*
	Official videos On Change
*/
export function txtOfficialVideo_change(event) {
	OfficalVideoLink = $w("#txtOfficialVideo").value 
}

export function input3_change(event) {
	SecondOfficalVideoLink = $w("#input3").value 
}


export function input6_change(event) {
	ThirdOfficalVideoLink = $w("#input6").value 
}

/*
	Comments or  Questsions On Change
*/

export function textBox1_change(event) {
	 Questions = $w("#textBox1").value;
}