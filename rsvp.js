console.log('script activated!');


// get referenec to the basic html document!
var main_body = document.getElementById("main-body");
var textbox = document.getElementById("textbox");
var submit_button = document.getElementById("submit-button");
var reader_body = document.getElementById('reader-body');
var word_div = document.getElementById("word");

var reader_active = false;
var baseWaitTime = 400;
var lengthWaitTimeIncrement = 0.2

submit_button.onclick = onSubmitButtonClick;


function onSubmitButtonClick(){
	console.log("On submit button click!")
	reader_active = !reader_active;
	update_state();
}

function getWaitTime(word){
	// simple incrememnt based on length of the word
	var waitTime =  baseWaitTime * (word.length * lengthWaitTimeIncrement);
	console.log(waitTime.toString() + "   " + word.length.toString());
	return waitTime;
}


function word_loop(words, i){
	var word = words[i];
	setTimeout(function() {
		word_div.innerHTML = word;
		i ++;
		if (i < words.length){
			word_loop(words, i)
		}
		if (i === words.length) {
			setTimeout(function() {
				reader_active = false;
				update_state()
				return;
			},1000);

			return;
		}
		
		return;
	}, getWaitTime(word))
}


function update_state(){
	if (reader_active === true) {

		main_body.style.visibility = "hidden";
		reader_body.style.visibility="visible";
		var text_string = textbox.value.toString();
		var words = text_string.split(" ");
		
		word_loop(words, 0);


	}
	if (reader_active === false){
		// resume the main div thing!
		reader_body.style.visibility = "hidden";
		main_body.style.visibility = "visible";

	}
}
