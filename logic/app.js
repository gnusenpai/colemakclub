/*_____________dom elements_________*/

// the string of text that shows the words for the user to type
var prompt 		= document.querySelector('.prompt'),
//
wordChain 		= document.querySelector('#wordChain'),
//
answer 			= document.querySelector('#answer'),
//
scoreText 		= document.querySelector('#scoreText'),
//
timeText 		= document.querySelector('#timeText'),
//
resetButton 	= document.querySelector('#resetButton'),
//
accuracyText 	= document.querySelector('#accuracyText'),
//
wpmText 		= document.querySelector('#wpmText'),
//
testResults 	= document.querySelector('#testResults'),
//
input 			= document.querySelector('#userInput'), 
// the main typing area
inputKeyboard 	= document.querySelector('#inputKeyboard'), 
// keyboard layout customization ui
inputShiftKeyboard = document.querySelector('#inputShiftKeyboard'), 
// the dom element representing the shift keys in customization ui
customInput 	= document.querySelector('.customInput'),
//
buttons 		= document.querySelector('nav').children,
//
currentWord 	= document.querySelector('#currentWord'),
// layout select menu
select 			= document.querySelector('select'),
//
mappingStatusButton = document.querySelector('#mappingToggle label input'),
//
mappingStatusText = document.querySelector('#mappingToggle h6 span'),
// save button on the custom layout ui
saveButton 		 = document.querySelector('.saveButton'),
// discard button on the custom layout ui
discardButton 		 = document.querySelector('.discardButton'),
// open button for the custom layout ui
openUIButton 		 = document.querySelector('.openUIButton'),
// custom ui input field for custom keys
customUIKeyInput = document.querySelector('#customUIKeyInput');

var promptOffset 	= 0;  // is this needed? May delete
var score;				  // tracks the current number of correct words the user has typed
var scoreMax 		= localStorage.getItem('scoreMax') || 50; // total number of words the user must type
var seconds 		= 0;  // tracks the number of seconds%minutes*60 the current test has been running for 
var minutes 		= 0;  // tracks the number of minutes the current test has been running for
var gameOn 			= false; // set to true when user starts typing in input field
var correct 		= 0;  // number of correct keystrokes during a game
var errors 			= 0;  // number of typing errors during a game
var currentLevel 	= localStorage.getItem('currentLevel') || 1; // int representation of the current level, which determines which letter set to test
var correctAnswer;        // string representation of the current correct word
var letterIndex 	= 0;  // Keeps track of where in a word the user is
					      // Increment with every keystroke except ' ', return, and backspace
					      // Decrement for backspace, and reset for the other 2
var onlyLower		= !localStorage.getItem('onlyLower') || localStorage.getItem('onlyLower') === 'true'; // If only lower is true, include only words
					      // without capital letters
var answerString = "";		  // A string representation of the words for the current test. After a correct word is typed,
						  // it is removed from the beginning of answerString. By the end of the test, there should be 
						  // no words in answerString
var keyboardMap = layoutMaps['colemak'];
var letterDictionary = levelDictionaries['colemak'];
var currentLayout = localStorage.getItem('currentLayout') || 'colemak';
var currentKeyboard = localStorage.getItem('currentKeyboard') || 'ansi';
var shiftDown 			= false; // tracks whether the shift key is currently being pushed
var fullSentenceMode 	= false; // if true, all prompts will be replace with sentences
var fullSentenceModeEnabled = localStorage.getItem('fullSentenceModeEnabled') === 'true';
var requireBackspaceCorrection = !localStorage.getItem('requireBackspaceCorrection') || localStorage.getItem('requireBackspaceCorrection') === 'true';
var timeLimitMode 		= localStorage.getItem('timeLimitMode') === 'true';
var wordScrollingMode 	= !localStorage.getItem('wordScrollingMode') || localStorage.getItem('wordScrollingMode') === 'true';  // true by default.
var showCheatsheet		= !localStorage.getItem('showCheatsheet') || localStorage.getItem('showCheatsheet') === 'true';  // true by default.
var playSoundOnClick    = localStorage.getItem('playSoundOnClick') === 'true';
var playSoundOnError    = localStorage.getItem('playSoundOnError') === 'true';
var deleteFirstLine		= false; // make this true every time we finish typing a line
var deleteLatestWord    = false; // if true, delete last word typed. Set to true whenever a word is finished
var sentenceStartIndex = -1; // keeps track of where we are in full sentence mode
var sentenceEndIndex;
var lineLength = 23;
var lineIndex = 0;  // tracks which line of the prompt we are currently on
var wordIndex = 0;  // tracks which word you are on (ONLY IN PARAGRAPH MODE)
var idCount = 0;
var answerWordArray = [];
var specialKeyCodes = [27, 9, 20, 17, 18, 93, 36, 37, 38, 39, 40, 144, 36, 8, 16, 30, 32, 13, 91, 92, 224, 225]; // list of all keycodes for keys we typically want to ignore
var punctuation = localStorage.getItem('punctuation') || ''; // this contains punctuation to include in our test sets. Set to empty at first
var requiredLetters = "";//levelDictionaries[currentLayout]['lvl'+currentLevel]+punctuation;; // keeps track of letters that still need to be used in the current level
var initialCustomKeyboardState = ''; // saves a temporary copy of a keyboard layout that a user can return to by discarding changes
var initialCustomLevelsState = ''; // saves a temporary copy of custom levels that a user can return to by discarding changes

// preference menu dom elements
var preferenceButton 		= document.querySelector('.preferenceButton'),
preferenceMenu 				= document.querySelector('.preferenceMenu'),
closePreferenceButton 		= document.querySelector('.closePreferenceButton'),
capitalLettersAllowed 		= document.querySelector('.capitalLettersAllowed'),
fullSentenceModeToggle		= document.querySelector('.fullSentenceMode'),
fullSentenceModeLevelButton	= document.querySelector('.lvl8'),
requireBackspaceCorrectionToggle = document.querySelector('.requireBackspaceCorrectionToggle'),
wordLimitModeButton			= document.querySelector('.wordLimitModeButton'),
wordLimitModeInput			= document.querySelector('.wordLimitModeInput'),
timeLimitModeButton			= document.querySelector('.timeLimitModeButton'),
timeLimitModeInput			= document.querySelector('.timeLimitModeInput')
wordScrollingModeButton		= document.querySelector('.wordScrollingModeButton'),
punctuationModeButton       = document.querySelector('.punctuationModeButton'),
showCheatsheetButton		= document.querySelector('.showCheatsheetButton');
playSoundOnClickButton      = document.querySelector('.playSoundOnClick');
playSoundOnErrorButton      = document.querySelector('.playSoundOnError');

start();
init();

// this is the true init, which is only called once. Init will have to be renamed
// Call to initialize
function start() {
	//document.querySelector('.cheatsheet').innerHTML = keyboardDivs;
	inputKeyboard.innerHTML = customLayout;
	// scoreMax = wordLimitModeInput.value;
	customInput.style.display = 'flex';

	if (!wordScrollingMode) {
		toggleWordScrollingModeUI();
	}

	if (fullSentenceModeEnabled) {
		toggleFullSentenceModeUI();
	}

	if (timeLimitMode) {
		toggleTimeLimitModeUI();
	}

	// if true, user keyboard input will be mapped to the chosen layout. No mapping otherwise
	if (localStorage.getItem('keyRemapping') === 'true') {
		mappingStatusButton.checked = 'checked';
		mappingStatusText.innerText = 'on';
	}

	layout.value = currentLayout;
	keyboard.value = currentKeyboard;
	capitalLettersAllowed.checked = !onlyLower;
	punctuationModeButton.checked = punctuation;
	requireBackspaceCorrectionToggle.checked = requireBackspaceCorrection;	
	fullSentenceModeToggle.checked = fullSentenceModeEnabled;
	wordScrollingModeButton.checked = wordScrollingMode;
	timeLimitModeButton.checked = timeLimitMode;
	wordLimitModeButton.checked = !timeLimitMode;
	wordLimitModeInput.value = scoreMax;
	showCheatsheetButton.checked = showCheatsheet;
	playSoundOnClickButton.checked = playSoundOnClick;
	playSoundOnErrorButton.checked = playSoundOnError;

	if (localStorage.getItem('preferenceMenu')) {
		openMenu();
	}

	if (!showCheatsheet) {
		document.querySelector('.cheatsheet').classList.add('noDisplay');
	}

	switchLevel(currentLevel);

	updateLayoutUI();
}


// some of the stuff in this function should probably be put into reset and we should examine when reset is called
// the rest should be in start(), which works like an actual init function should
// RENAME AND REFACTOR THIS PLEASE
function init() {
	createTestSets();
	reset();
	updateCheatsheetStyling(currentLevel);
}


/*________________Timers and Listeners___________________*/

// makes the clock tic
setInterval(()=> {
	if(gameOn) {
		if(!timeLimitMode){
			seconds++;
			if(seconds >= 60) {
				seconds = 0;
				minutes++;
			}
		} else {
			// clock counting down
			seconds--;
			if(seconds <= 0 && minutes <=0){
				endGame();
			}
			if(seconds < 0) {
				seconds = 59;
				minutes--;
			}
		}
		resetTimeText();
	}
}, 1000);

// starts the timer when there is any change to the input field
input.addEventListener('keydown', (e)=> {
	gameOn = true;
});


/*___________________________________________________________*/
/*____________________preference menu________________________*/

function openMenu() {
	preferenceMenu.style.right = 0;
	localStorage.setItem('preferenceMenu', 'open');
}

function closeMenu() {
	preferenceMenu.style.right = '-37vh';
	localStorage.removeItem('preferenceMenu');
}

// close preference menu on escape key. While we're at it, also close custom
// ui menu
document.addEventListener('keydown', (e)=> {
	if(e.keyCode == 27) {
		closeMenu();

		// close custom ui menu
		if(customInput.style.transform != 'scaleX(0)'){
			customInput.style.transform = 'scaleX(0)';
			// remove active class from current key
			clearSelectedInput();
			init();
		}
	}
});

// listener for preference menu button
preferenceButton.addEventListener('click', ()=> {
	openMenu();
});

// listener for preference menu close button
closePreferenceButton.addEventListener('click', ()=> {
	closeMenu();
});

// capital letters allowed
capitalLettersAllowed.addEventListener('click', ()=> {
	onlyLower = !onlyLower;
	localStorage.setItem("onlyLower", onlyLower);
	reset();
});

requireBackspaceCorrectionToggle.addEventListener('click', ()=> {
	requireBackspaceCorrection = !requireBackspaceCorrection;
	localStorage.setItem("requireBackspaceCorrection", requireBackspaceCorrection);
	reset();
});

// full sentence mode
function toggleFullSentenceModeUI() {
	fullSentenceModeLevelButton.classList.toggle('visible');
}

fullSentenceModeToggle.addEventListener('click', ()=> {
	fullSentenceModeEnabled = !fullSentenceModeEnabled;
	localStorage.setItem('fullSentenceModeEnabled', fullSentenceModeEnabled);
	toggleFullSentenceModeUI();
	if (fullSentenceModeEnabled) {
		switchLevel(8);
	} else {
		switchLevel(1);
	}
	reset();
});

// Toggle display of time limit mode input field
function toggleTimeLimitModeUI() {
	seconds = timeLimitModeInput.value%60;
	minutes = Math.floor(timeLimitModeInput.value/60);
	scoreText.style.display = 'none';

	// make the word list long enough so that no human typer can reach the end
	scoreMax = timeLimitModeInput.value*4;

	// toggle value of word limit mode button
	wordLimitModeButton.checked = !wordLimitModeButton.checked;

	// toggle display of input fields
	timeLimitModeInput.classList.toggle('noDisplay');
	wordLimitModeInput.classList.toggle('noDisplay');
}

// time limit mode button; if this is checked, uncheck button for word limit and vice versa
timeLimitModeButton.addEventListener('click', ()=> {
	if(timeLimitMode == true) {
		timeLimitModeButton.checked = true;
	} else {
		// change mode logic here
		timeLimitMode = true;
		toggleTimeLimitModeUI();
		localStorage.setItem('timeLimitMode', timeLimitMode);
		reset();
	}
});

// time limit mode field
timeLimitModeInput.addEventListener('change', ()=> {
	let wholeSecond = Math.floor(timeLimitModeInput.value);

	scoreMax = wholeSecond*10;
	
	if(wholeSecond < 1  || wholeSecond > 10000) {
		wholeSecond = 60
	}

	// set the dom element to a whole number (in case the user puts in a decimal)
	timeLimitModeInput.value = wholeSecond;

	seconds = wholeSecond%60;
	minutes = Math.floor(wholeSecond/60);


	gameOn = false;
	resetTimeText();
});

// word Limit mode butto; if this is checked, uncheck button for time limit and vice versa
// Toggle display of word limit mode input field
wordLimitModeButton.addEventListener('click', ()=> {
	if(timeLimitMode == false) {
		wordLimitModeButton.checked = true;
	} else {
		// change mode logic here
		timeLimitMode = false;
		seconds = 0;
		minutes = 0;
		scoreText.style.display = 'flex';

		// set score max back to the chosen value
		scoreMax = wordLimitModeInput.value;

		// toggle value of time limit mode button
		timeLimitModeButton.checked = !timeLimitModeButton.checked;

		// toggle display of input fields
		timeLimitModeInput.classList.toggle('noDisplay');
		wordLimitModeInput.classList.toggle('noDisplay');

		localStorage.setItem('timeLimitMode', timeLimitMode);

		reset();
	}
});

// word Limit input field
wordLimitModeInput.addEventListener('change', ()=> {
	if(wordLimitModeInput.value > 10 && wordLimitModeInput.value <= 500){
		wordLimitModeInput.value = Math.ceil(wordLimitModeInput.value / 10) * 10;
		scoreMax = wordLimitModeInput.value;
	}else if (wordLimitModeInput.value > 500){
		scoreMax = 500;
		wordLimitModeInput.value = 500;
	}else {
		scoreMax = 10;
		wordLimitModeInput.value = 10;
	}

	localStorage.setItem('scoreMax', scoreMax);

	reset();
});

// word scrolling mode 
function toggleWordScrollingModeUI() {
	prompt.classList.toggle('paragraph');
	// remove fade from parent
	document.querySelector('#fadeElement').classList.toggle('fade');
}

wordScrollingModeButton.addEventListener('click', ()=> {
	wordScrollingMode = !wordScrollingMode;
	localStorage.setItem('wordScrollingMode', wordScrollingMode);
	toggleWordScrollingModeUI();
	reset();
});

// punctuation mode 
punctuationModeButton.addEventListener('click', ()=> {
	console.log('punctuation mode toggled');
	// if turning punctuation mode on
	if(punctuation == "") {
		punctuation = "'.-";
	}else { // if turning punctuation mode off
		punctuation = "";
	}

	localStorage.setItem('punctuation', punctuation);

	createTestSets();
	updateCheatsheetStyling(currentLevel);
	reset();
	

});

// show cheatsheet toggle
showCheatsheetButton.addEventListener('click', ()=> {
	if(showCheatsheet){
		// hide display for cheatsheet
		document.querySelector('.cheatsheet').classList.add('noDisplay');
	}else{
		// show display for cheatsheet
		document.querySelector('.cheatsheet').classList.remove('noDisplay');
	}

	showCheatsheet = !showCheatsheet
	localStorage.setItem('showCheatsheet', showCheatsheet);
});

// play sound on click toggle
playSoundOnClickButton.addEventListener('click', ()=> {
	playSoundOnClick = !playSoundOnClick;
	localStorage.setItem('playSoundOnClick', playSoundOnClick);
});

// play sound on error toggle
playSoundOnErrorButton.addEventListener('click', ()=> {
	playSoundOnError = !playSoundOnError;
	localStorage.setItem('playSoundOnError', playSoundOnError);
});

/*______________________preference menu______________________*/
/*___________________________________________________________*/

/*___________________________________________________________*/
/*___________________________sound___________________________*/

const errorSound = new Audio("sound/error.wav");

const clickSounds = [
    {
      sounds: [
        new Audio("sound/click1.wav"),
        new Audio("sound/click1.wav"),
      ],
      counter: 0,
    },
    {
      sounds: [
        new Audio("sound/click2.wav"),
		new Audio("sound/click2.wav"),
      ],
      counter: 0,
    },
    {
      sounds: [
        new Audio("sound/click3.wav"),
        new Audio("sound/click3.wav"),
      ],
      counter: 0,
    },
    {
      sounds: [
        new Audio("sound/click4.wav"),
		new Audio("sound/click4.wav"),
      ],
      counter: 0,
    },
    {
      sounds: [
        new Audio("sound/click5.wav"),
        new Audio("sound/click5.wav"),
      ],
      counter: 0,
    },
    {
      sounds: [
        new Audio("sound/click6.wav"),
		new Audio("sound/click6.wav"),
      ],
      counter: 0,
    },
];

function playClickSound() {
  if (!playSoundOnClick) return;

  const rand = Math.floor(Math.random() * 6);
  const randomSound = clickSounds[rand];

  // the duplicated sounds are used to prevent the sound from cutting off
  randomSound.counter++;
  if (randomSound.counter === 2) randomSound.counter = 0;

  randomSound.sounds[randomSound.counter].currentTime = 0;
  randomSound.sounds[randomSound.counter].play();
}

function playErrorSound() {
  if (!playSoundOnError) return;
  errorSound.currentTime = 0;
  errorSound.play();
}

/*___________________________sound___________________________*/
/*___________________________________________________________*/

/*___________________________________________________________*/
/*______________listeners for custom ui input________________*/

function updateLayoutUI() {
	switch (currentKeyboard) {
		case 'ansi':
			document.querySelector('.cheatsheet').innerHTML = ansiDivs;
			layoutMaps.colemakdh.KeyZ = 'x';
			layoutMaps.colemakdh.KeyX = 'c';
			layoutMaps.colemakdh.KeyC = 'd';
			layoutMaps.colemakdh.KeyV = 'v';
			layoutMaps.colemakdh.KeyB = 'z';

			layoutMaps.tarmakdh.KeyZ = 'x';
			layoutMaps.tarmakdh.KeyX = 'c';
			layoutMaps.tarmakdh.KeyC = 'd';
			layoutMaps.tarmakdh.KeyV = 'v';
			layoutMaps.tarmakdh.KeyB = 'z';
			levelDictionaries.tarmakdh.lvl1 = 'qwagv';
			levelDictionaries.tarmakdh.lvl3 = 'ftbzxc';

			layoutMaps.canary.KeyZ = 'j';
			layoutMaps.canary.KeyX = 'v';
			layoutMaps.canary.KeyC = 'd';
			layoutMaps.canary.KeyV = 'g';
			layoutMaps.canary.KeyB = 'q';
			layoutMaps.canary.KeyN = 'm';
			layoutMaps.canary.KeyG = 'b';
			layoutMaps.canary.KeyH = 'f';
			layoutMaps.canary.KeyT = 'k';
			layoutMaps.canary.KeyU = 'x';
			break;
		case 'iso':
			document.querySelector('.cheatsheet').innerHTML = isoDivs;
			layoutMaps.colemakdh.IntlBackslash = 'z';
			layoutMaps.colemakdh.KeyZ = 'x';
			layoutMaps.colemakdh.KeyX = 'c';
			layoutMaps.colemakdh.KeyC = 'd';
			layoutMaps.colemakdh.KeyV = 'v';
			delete layoutMaps.colemakdh.KeyB;

			layoutMaps.tarmakdh.IntlBackslash = 'z';
			layoutMaps.tarmakdh.KeyZ = 'x';
			layoutMaps.tarmakdh.KeyX = 'c';
			layoutMaps.tarmakdh.KeyC = 'd';
			layoutMaps.tarmakdh.KeyV = 'v';
			delete layoutMaps.tarmakdh.KeyB;
			levelDictionaries.tarmakdh.lvl1 = 'qwagv';
			levelDictionaries.tarmakdh.lvl3 = 'ftbzxc';

			layoutMaps.canary.IntlBackslash = 'q';
			layoutMaps.canary.KeyZ = 'j';
			layoutMaps.canary.KeyX = 'v';
			layoutMaps.canary.KeyC = 'd';
			layoutMaps.canary.KeyV = 'g';
			delete layoutMaps.canary.KeyB;
			layoutMaps.canary.KeyN = 'm';
			layoutMaps.canary.KeyG = 'b';
			layoutMaps.canary.KeyH = 'f';
			layoutMaps.canary.KeyT = 'k';
			layoutMaps.canary.KeyU = 'x';
			break;
		case 'ortho':
			document.querySelector('.cheatsheet').innerHTML = orthoDivs;
			layoutMaps.colemakdh.KeyZ = 'z';
			layoutMaps.colemakdh.KeyX = 'x';
			layoutMaps.colemakdh.KeyC = 'c';
			layoutMaps.colemakdh.KeyV = 'd';
			layoutMaps.colemakdh.KeyB = 'v';

			layoutMaps.tarmakdh.KeyZ = 'z';
			layoutMaps.tarmakdh.KeyX = 'x';
			layoutMaps.tarmakdh.KeyC = 'c';
			layoutMaps.tarmakdh.KeyV = 'd';
			layoutMaps.tarmakdh.KeyB = 'v';
			levelDictionaries.tarmakdh.lvl1 = 'qwagzxc';
			levelDictionaries.tarmakdh.lvl3 = 'ftbv';

			layoutMaps.canary.KeyZ = 'q';
			layoutMaps.canary.KeyX = 'j';
			layoutMaps.canary.KeyC = 'v';
			layoutMaps.canary.KeyV = 'd';
			layoutMaps.canary.KeyB = 'k';
			layoutMaps.canary.KeyN = 'x';
			layoutMaps.canary.KeyG = 'g';
			layoutMaps.canary.KeyH = 'm';
			layoutMaps.canary.KeyT = 'b';
			layoutMaps.canary.KeyU = 'f';
			break;
	}

	// if custom input is selected, show the ui for custom keyboards
	if(currentLayout == 'custom') {
		openUIButton.style.display = 'block';
		startCustomKeyboardEditing();
	}else {
		customInput.style.transform = 'scaleX(0)';
		openUIButton.style.display = 'none';
	}

	// level labels
	for (let i = 1; i <= 6; i++) {
		if(currentLayout == 'tarmak' || currentLayout == 'tarmakdh') {
			document.querySelector('.lvl'+i).innerHTML = 'Step '+(i-1);
		} else {
			document.querySelector('.lvl'+i).innerHTML = 'Level '+i;
		}
	}

	// change keyboard map and key dictionary
	keyboardMap = layoutMaps[currentLayout];
	console.log(currentLayout);
	console.log(currentKeyboard);
	letterDictionary = levelDictionaries[currentLayout];

	if(currentLayout == 'custom'){
		customUIKeyInput.focus();
	}

}

// listens for layout change
layout.addEventListener('change', (e)=> {
	currentLayout = layout.value;
	localStorage.setItem('currentLayout', currentLayout);
	updateLayoutUI();
	// reset everything
	init();
});

// listens for keyboard change
keyboard.addEventListener('change', (e)=> {
	currentKeyboard = keyboard.value;
	localStorage.setItem('currentKeyboard', currentKeyboard);
	updateLayoutUI();
	// reset everything
	init();
});

// listener for custom layout ui open button
openUIButton.addEventListener('click', ()=> {
	startCustomKeyboardEditing();
});

// called whenever a user opens the custom editor. Sets correct displays and saves an initial state
// of the keyboard to refer back to if the user wants to discard changes
function startCustomKeyboardEditing() {
	initialCustomKeyboardState = Object.assign({}, layoutMaps['custom']);
	initialCustomLevelsState = Object.assign({}, levelDictionaries['custom']);
	// customInput.style.display = 'flex';
	customInput.style.transform = 'scaleX(1)';
	let k = document.querySelector('.defaultSelectedKey');
	selectInputKey(k);
}

// selects an input key on the custom keyboard and applies the correct styling
function selectInputKey(k){
	// clear previous styling
	clearSelectedInput();

	k.classList.add('selectedInputKey');
	if(k.children[0].innerHTML == '') {
		k.children[0].innerHTML = '_';
	}
	k.children[0].classList.add('pulse');
	customUIKeyInput.focus();
}

// listener for the custom layout ui 'done' button
saveButton.addEventListener('click', ()=> {
	customInput.style.transform = 'scaleX(0)';
	// remove active class from current key
	clearSelectedInput();
	init();
});

// listener for the custom layout ui 'done' button
discardButton.addEventListener('click', ()=> {
	customInput.style.transform = 'scaleX(0)';
	// remove active class from current key
	clearSelectedInput();


	// load the old layout to revert changes, aka discard changes
	loadCustomLayout(initialCustomKeyboardState);
	loadCustomLevels(initialCustomLevelsState);

	console.log(levelDictionaries.custom);

	init();
});

// general click listener
document.addEventListener('click', function (e) {

	// close preference menu if click is anywhere other than the preference menu
	let k = e.target.closest('.preferenceMenu');
	if(!k){
		k = e.target.closest('.preferenceButton');
	}
	if(!k) {
		closeMenu();
	}


	// add key listeners for each of the keys the custom input ui
	// When clicked, a key becomes 'selectedInputKey' and all others lose
	// this class. 
	k = e.target.closest('.cKey');
	if (k) {
		// change focus to the customUIKeyInput field
		customUIKeyInput.focus();

		// remove 'selectedInputKey' from any keys previously clicked
		clearSelectedInput();

		k.classList.add('selectedInputKey');
		if(k.children[0].innerHTML == '') {
			k.children[0].innerHTML = '_';
		}
		k.children[0].classList.add('pulse');
	}

	k = e.target.closest('.customUILevelButton');
	


	// listener for customUILevelButtons
	if (k) {
		// remove styling from other buttons
		let currentSelectedLevel = document.querySelector('.currentCustomUILevel');
		if(currentSelectedLevel){
			currentSelectedLevel.classList.remove('currentCustomUILevel');;
		}
		
		// add styling to selected button
		customUIKeyInput.focus();
		k.classList.add('currentCustomUILevel');
		// set new dom element
		currentSelectedLevel = document.querySelector('.currentCustomUILevel');

		// remove styling from all keys that don't correspond with selected level button
		// add styling to keys that correspond with selected level button
		let allCKeys = document.querySelectorAll('.cKey');
		for(n of allCKeys) {
			if(n.children[0].innerHTML != 0 &&
				levelDictionaries['custom'][currentSelectedLevel.innerHTML].includes(n.children[0].innerHTML)) {
					n.classList.add('active');
			} else {
				n.classList.remove('active');
			}
		}

	}

}, false);


// listener for custom input field. Updates on any input, clearing the current selected
// input key, and setting the new value
customUIKeyInput.addEventListener('keydown', (e)=> {
	let k = document.querySelector('.selectedInputKey');

	// if there was already a value for this key, remove it from all levels
	if(k.children[0].innerHTML != '_') {
		removeKeyFromLevels(k);
	}


	// if key entered is not shift, control, space, caps, enter, backspace, escape, 
	// or delete, left or right arrows, update dom element and key mapping value
	if(e.keyCode != 16 && e.keyCode != 17 && e.keyCode != 27 && e.keyCode != 46 && e.keyCode 
		!= 32 && e.keyCode != 8 && e.keyCode != 20 && e.keyCode != 13 && e.keyCode != 37 
		&& e.keyCode != 39 && e.keyCode != 38 && e.keyCode != 40) {
		let currentUILev = document.querySelector('.currentCustomUILevel').innerHTML; 
		k.children[0].innerHTML = e.key;
	
		// // if we are not already on shift layer, add to dom element shift layer
		// if(!shiftDown) {
		// 	// document.querySelector('#shift' + k.id).children[0].innerHTML = e.key.toUpperCase();
		// }
		k.classList.add('active');


		// new keyMapping Data
		if(k.id){
			let keyCode = k.id.toString().replace('custom','');
			keyCode = keyCode.toString().replace('shift','');
			if(!shiftDown) {
				layoutMaps.custom[keyCode] = e.key;
			}

			layoutMaps.custom.shiftLayer[keyCode] = e.key.toUpperCase();
		}

		//new levels data
		levelDictionaries['custom'][currentUILev]+= e.key;
		levelDictionaries['custom']['lvl7']+= e.key;
		//console.log('new key ' + currentUILev + e.key);

		// associate the key element with the current selected level

		// this updates the main keyboard in real time. Could be ommited if performance needs a boost
		updateCheatsheetStyling(currentLevel);
		
		// switch to next input key
		switchSelectedInputKey('right');
	}else if(e.keyCode == 8 || e.keyCode == 46 ) {
		// switchSelectedInputKey('left');
		// if backspace, remove letter from the ui element and the keyboard map
		k.children[0].innerHTML = '_';
		k.classList.remove('active');
		layoutMaps.custom.shiftLayer[k.id] = " ";

		// remove deleted letter from keymapping and levels
		if(k.id){
			//console.log('key added to mapping ' + e.key);
			layoutMaps.custom[k.id] = ' ';
			removeKeyFromLevels(k);
		}
	}else if(e.keyCode == 37) {
		switchSelectedInputKey('left');
	}else if(e.keyCode == 39) {
		console.log('right');
		switchSelectedInputKey('right');
	}else if(e.keyCode == 38) {
		console.log('up');
		switchSelectedInputKey('up');
	}else if(e.keyCode == 40) {
		console.log('down');
		switchSelectedInputKey('down');
	}

	// clear input field
	customUIKeyInput.value = '';
});

// given a key object, k, remove a value of the letter on k from all levels
function removeKeyFromLevels(k) {
	let lvls = Object.keys(levelDictionaries['custom']);
	for(lvl of lvls) {
		let keyCode = k.id.toString().replace('custom','');
		//console.log(levelDictionaries.custom.lvl[keyCode]);
		// replace any instances of letter previously found on key
		levelDictionaries['custom'][lvl] = levelDictionaries['custom'][lvl].replace(k.children[0].innerHTML, '');
		// replace mapping for letter previously found on key
		layoutMaps['custom'][keyCode] = " ";
	}
}

// sets the custom keyboard layout to be equal to the json parameter passed in
function loadCustomLayout(newCustomLayout) {
	console.log('new layout');
	layoutMaps.custom = Object.assign({},newCustomLayout);
	keyboardMap = layoutMaps.custom;

	let customKeys = document.querySelectorAll('.cKey');
	// load letters onto the custom ui input keyboard
	customKeys.forEach((cKey)=> {
		let currentKeyName = cKey.id.substring(6);
		// console.log(currentKeyName);
		
		// if the value of the new layout key is not undefined, set it to the corresponding dom element
		if(keyboardMap[currentKeyName]){
			// if key is blank, remove active styling
			if(keyboardMap[currentKeyName] == " "){
				cKey.classList.remove('active');
			}
			cKey.innerHTML = `
				<span class='letter'>` + keyboardMap[currentKeyName] + `</span>
			`;
		}	
	});
}

// sets the custom levels to be equal to the json parameter passed in
function loadCustomLevels(newCustomLevels) {
	levelDictionaries.custom = Object.assign({},newCustomLevels);
	letterDictionary = levelDictionaries['custom'];
}

// switches the focus to the next input key, determined by the direction parameter
// Parameter is either left, right, up, or down
function switchSelectedInputKey(direction) {
	let k; // the key to jump to
	if(direction == 'right'){
		k = document.querySelector('.selectedInputKey').nextElementSibling;
	}else if(direction == 'left'){
		k = document.querySelector('.selectedInputKey').previousElementSibling;
	}else if(direction == 'up'){
		let keyPosition;
		let currentKey = document.querySelector('.selectedInputKey');
		for(let i = 0; i < currentKey.parentElement.children.length; i++) {
  			if (currentKey.parentElement.children[i] == currentKey) {
  				console.log('found! ' + i);
  				keyPosition = i;
  				break;
  			}
  		}
		k = document.querySelector('.selectedInputKey').parentElement.previousElementSibling.children[keyPosition];
	}else if(direction == 'down'){
		let keyPosition;
		let currentKey = document.querySelector('.selectedInputKey');
		for(let i = 0; i < currentKey.parentElement.children.length; i++) {
  			if (currentKey.parentElement.children[i] == currentKey) {
  				console.log('found! ' + i);
  				keyPosition = i;
  				break;
  			}
  		}
		k = document.querySelector('.selectedInputKey').parentElement.nextElementSibling.children[keyPosition];
	}

	if (k.classList.contains('finalKey')){
		//if last valid key on keyboard, don't change keysz
		k = document.querySelector('.selectedInputKey');
	}else if(k.classList.contains('rowEnd')) {
		// if last valid key on row, move down a row
		k = document.querySelector('.selectedInputKey').parentElement.nextElementSibling.children[1];
	}else if(k.classList.contains('rowStart')) {
		// if first valid key on row, move up a row
		k = document.querySelector('.selectedInputKey').parentElement.previousElementSibling.children[11];
	}

		clearSelectedInput();
		k.classList.add('selectedInputKey');
		if(k.children[0].innerHTML == "") {
			k.children[0].innerHTML = "_";
		}
		k.children[0].classList.add('pulse');
}

// remove 'selectedInputKey' from any keys previously clicked
function clearSelectedInput() {
	let k = document.querySelector('.selectedInputKey');
	if(k){
		k.classList.remove('selectedInputKey');
		k.children[0].classList.remove('pulse');
		console.log(k.children[0].innerHTML);
		if(k.children[0].innerHTML == "_"){
			k.children[0].innerHTML = "";
		}
	}
}

/*______________listeners for custom ui input________________*/
/*___________________________________________________________*/





// input key listener
input.addEventListener('keydown', (e)=> {

	// removes first line on the first letter of the first word of a new line
	if(deleteLatestWord) {
		prompt.classList.remove('smoothScroll');
		// delete last line fromt prompt and set the offset back to 0
		prompt.firstChild.removeChild(prompt.firstChild.firstChild);
		if(prompt.firstChild.children.length == 0){
			prompt.removeChild(prompt.firstChild);
		}
		promptOffset = 0;
		prompt.style.left = '-' + promptOffset+ 'px';
		deleteLatestWord = false;
	}


	/*___________________________________________________*/
	/*____________________key mapping____________________*/

	// get rid of default key press. We'll handle it ourselves
	e.preventDefault();


	// this is the actual character typed by the user
	let char = e.code;

	// prevent default char from being typed and replace new char from keyboard map
	if (localStorage.getItem('keyRemapping') === 'true') {
		if(char in keyboardMap && gameOn) {
			if(!e.shiftKey) {
				input.value += keyboardMap[char];
			}else {
			// if shift key is pressed, get final input from
			// keymap shift layer. If shiftlayer doesn't exist
			// use a simple toUpperCase
				if(keyboardMap.shiftLayer == 'default'){
					input.value += keyboardMap[char].toUpperCase();
				}else {
					// get char from shiftLayer
					input.value += keyboardMap.shiftLayer[char];
				}
			}
		}
	}else {
		//console.log(e.keyCode);
		//console.log(specialKeyCodes.includes(e.keyCode));
		// there is a bug on firefox that occassionally reads e.key as process, hence the boolean expression below
		if(!specialKeyCodes.includes(e.keyCode) && e.key != "Process") {
			//console.log('Key: ' +e.key);
			//console.log('Code: ' +e.code);
			if(e.key != "Process"){
				input.value += e.key;
			}else {
				letterIndex--;
			}
		}else {
			//console.log('special Key');
		}
		if(e.keyCode == 32){
			//console.log('space bar');
			//input.value += " ";
		}
	}

	/*____________________key mapping____________________*/
	/*___________________________________________________*/


	/*________________________________________________________________________________________*/
	/*____________________listener for space and enter keys and reset keys____________________*/
	// listens for the enter  and space key. Checks to see if input contains the
	// correct word. If yes, generate new word. If no, give user
	// negative feedback

	if(e.keyCode === 13 || e.keyCode === 32) {
		if(checkAnswer() && gameOn) {

			// stops a ' ' character from being put in the input bar
			// it wouldn't appear until after this function, and would
			// still be there when the user goes to type the next word
			e.preventDefault();

			handleCorrectWord();

			// update scoreText
			updateScoreText();

			// end game if score == scoreMax
			if(score >= scoreMax){
				endGame();
			}

			// clear input field
			document.querySelector('#userInput').value = '';

			// set letter index (where in the word the user currently is)
			// to the beginning of the word
			letterIndex = 0;
		
		}else {
			console.log('error space');
			input.value += " ";
			letterIndex++;
		}
	}// end keyEvent if statement

	if(e.keyCode === 9 || e.keyCode === 27) {
		// 9 = Tab, 27 = Esc
		reset();
	} else if (e.keyCode === 116) {
		// F5 does not reload page because of the input area without this if-else
		window.location.reload();
	}// end of reset key check

	/*____________________listener for space and enter keys and reset keys____________________*/
	/*________________________________________________________________________________________*/



	/*_________________________________________________________*/
	/*____________________accuracy checking____________________*/

	// if we have a backspace, decrement letter index and role back the input value
	if(e.keyCode == 8) {
		//console.log('backspace');
		if(!e.ctrlKey) {
			input.value = input.value.substr(0,input.value.length-1);
			letterIndex--;
		}
		// letter index cannot be < 0
		if(letterIndex < 0) {
			letterIndex = 0;
		}
	}

	// if key produces a character, (ie not shift, backspace, or another 
	// utility key) increment letter index
	if(!specialKeyCodes.includes(e.keyCode)) {
		letterIndex++;
	}

	// check if answer is correct and apply the correct styling. 
	// Also increment 'errors' or 'correct'
	if(checkAnswerToIndex()) {
		input.style.color = 'black';
		// no points awarded for backspace
		if(e.keyCode == 8) {
			playClickSound();
			// if backspace, color it grey again
			if(e.ctrlKey) {
				for (let i = 0; i < letterIndex; i++) {
					if(prompt.children[0].children[wordIndex].children[i]) {
						prompt.children[0].children[wordIndex].children[i].style.color = 'gray';
					}
				}
				input.value = "";
				letterIndex = 0;
			} else {
				if(prompt.children[0].children[wordIndex].children[letterIndex]) {
					prompt.children[0].children[wordIndex].children[letterIndex].style.color = 'gray';
				}
			}
		} else if(!specialKeyCodes.includes(e.keyCode) || e.keyCode == 32) {
			playClickSound();
			correct++;
			// if letter (in the promp) exists, color it green
			if(prompt.children[0].children[wordIndex].children[letterIndex-1]) {
				prompt.children[0].children[wordIndex].children[letterIndex-1].style.color = 'green';
			}
		}
	}else {
		console.log('error');
		input.style.color = 'red';
		// no points awarded for backspace
		if(e.keyCode == 8) {
			playClickSound();
			// if backspace, color it grey again
			if(e.ctrlKey) {
				for (let i = 0; i < letterIndex; i++) {
					if(prompt.children[0].children[wordIndex].children[i]) {
						prompt.children[0].children[wordIndex].children[i].style.color = 'gray';
					}
				}
				input.value = "";
				letterIndex = 0;
			} else {
				if(prompt.children[0].children[wordIndex].children[letterIndex]) {
					prompt.children[0].children[wordIndex].children[letterIndex].style.color = 'gray';
				}
			}
		} else if(!specialKeyCodes.includes(e.keyCode) || e.keyCode == 32) {
			playErrorSound();
			errors++;
			if(prompt.children[0].children[wordIndex].children[letterIndex-1]) {
				prompt.children[0].children[wordIndex].children[letterIndex-1].style.color = 'red';
			}
		}

		if(!requireBackspaceCorrection && !checkAnswerToIndex()){
			//ignore input if the wrong char was typed (negate need to backspace errors - akin to KeyBr.com's behaviour)
			letterIndex--;
			input.value = input.value.substr(0,input.value.length-1);

			// letter index cannot be < 0
			if(letterIndex < 0) {
				letterIndex = 0;
			}
		}	
	}

	// if on the last word, check every letter so we don't need a space to end the game
	if(!timeLimitMode && score == scoreMax-1 && checkAnswer() && gameOn) {
		console.log('game over');
		endGame();
	}

	//console.log('errors: ' + errors + ' \n correct: ' + correct);
	//console.log("accuracy: " + correct/(errors+correct));

	/*____________________accuracy checking____________________*/
	/*_________________________________________________________*/



}); // end input key listner


// returns true if the letters typed SO FAR are correct
function checkAnswerToIndex() {
	// user input
	let inputVal = input.value;

	// console.log('checking input ' +inputVal.slice(0,letterIndex) + "!");
	// console.log(correctAnswer.slice(0,letterIndex)+ "!");
	return inputVal.slice(0,letterIndex) == correctAnswer.slice(0,letterIndex);
}


// add event listeners to level buttons
for(button of buttons) {
	let b = button;
	b.addEventListener('click', ()=> {
		let lev = b.innerHTML.replace(/ /,'').toLowerCase();
		// int representation of level we are choosing
		lev = (lev[lev.length-1]);
		if(currentLayout == 'tarmak' || currentLayout == 'tarmakdh') {
			lev++;
		}
		if(b.innerHTML == 'All Words') {
			lev = 7;
		}else if(b.innerHTML == 'Full Sentences'){
			lev = 8;
		}
		switchLevel(lev);
	});
}

// switches to level 
function switchLevel(lev) {
	localStorage.setItem('currentLevel', lev);
	console.log(lev);
		// stop timer
		gameOn = false;

		// clear input field
		document.querySelector('#userInput').value = '';

		// clear highlighted buttons
		clearCurrentLevelStyle();
		// console.log('.lvl'+lev);
		document.querySelector('.lvl'+lev).classList.add('currentLevel');
		
		// set full sentence mode to true
		if(lev == 8) {
			fullSentenceMode = true;
		} else {
			fullSentenceMode = false;
		}

		if(lev == 8) {
			lev = 7;
		}

		// window[] here allows us to select the variable levelN, instead of
		// setting currentLevelList to a string
		currentLevel = lev;
		
		// reset everything
		reset();

		// take care of styling for the cheatsheet
		updateCheatsheetStyling(lev);
}

// updates all styling for the cheatsheet by first resetting all keys,
// then styling those in active levels. takes the current level (int) as a parameter
function updateCheatsheetStyling(level) {

	// loop through all buttons
	let allKeys = document.querySelectorAll('.key');
	for(n of allKeys) {
		//reset all keys to default
		n.classList.add('inactive');
		n.classList.remove('active');
		n.classList.remove('homeRow');
		n.classList.remove('currentLevelKeys');
		n.classList.remove('punctuation');
		n.innerHTML=`
			<span class='letter'></span>
		`
		
		// set of keys to loop through the letter dictionary, which
		// contains info about which levels each key appears at
		let objKeys = Object.keys(letterDictionary);

		// check active levels and apply styling
		for(let i = 0; i < level; i++) {

			// the letter that will appear on the key
			let letter = keyboardMap[n.id];

			let lettersToCheck = letterDictionary[objKeys[i]]+punctuation;

			if(lettersToCheck.includes(letter)){
				n.innerHTML=`
					<span class='letter'>`+ letter + `</span>
				`	
				n.classList.remove('inactive');
				if(punctuation.includes(letter)){
					n.classList.remove('active');
					n.classList.add('punctuation');
				}else if(i==0){
					n.classList.add('homeRow');
				}else if(i==6){
					// all words selected
				}else if(i == level-1){
					n.classList.remove('active');
					n.classList.add('currentLevelKeys');
				}else {
					n.classList.add('active');
				}
			}
		}

	}
}

// listener for keyboard mapping toggle switch
mappingStatusButton.addEventListener('click', ()=> {
	if (localStorage.getItem('keyRemapping') === 'true') {
		// change the status text
		mappingStatusText.innerText = 'off';
		localStorage.setItem('keyRemapping', false);

	} else {
		// change the status text
		mappingStatusText.innerText = 'on';
		localStorage.setItem('keyRemapping', true);
	}

	// change focus back to input
	input.focus();
});

// resetButton listener
resetButton.addEventListener('click', ()=> {
	console.log('reset button called');
	reset();
});


/*________________OTHER FUNCTIONS___________________*/

// resets everything to the beginning of game state. Run when the reset
// button is called or when a level is changed
// Set a new prompt word and change variable text
function reset(){

	deleteFirstLine		= false; // make this true every time we finish typing a line
	deleteLatestWord    = false;

 	prompt.innerHTML = '';
 	answerString = '';
 	input.value = '';
 	answerWordArray = [];


	idCount = 0; 

	sentenceStartIndex = -1;


	// stop the timer
	gameOn = false;


	console.log('reset called');
	// set current letter index back to 0
	letterIndex = 0;
	wordIndex = 0;
	lineIndex = 0;

	// prompt offset back to 0
	promptOffset = 0;
	prompt.style.left = 0;

	// set correct and errors counts to 0
	correct = 0;
	errors = 0;

	// set to -1 before each game because score is incremented every time we call
	// updateScoreText(), including on first load
	score = -1;

	requiredLetters = (levelDictionaries[currentLayout]['lvl'+currentLevel]+punctuation).split("");

	// reset clock
	if(!timeLimitMode) {
		minutes = 0;
		seconds = 0;
	} else {
		seconds = timeLimitModeInput.value%60;
		minutes = Math.floor(timeLimitModeInput.value/60);
	}

	// reset timeText
	resetTimeText();

	// set mapping to off

	// set accuracyText to be transparent
	testResults.classList.add('transparent');

	// no display for reset button during game
	resetButton.classList.add('noDisplay');

	//set prompt to visible
	prompt.classList.remove('noDisplay');


	for(let i = 1; i <=3 ; i++){
		addLineToPrompt();
		if(i == 1) {
			correctAnswer = answerWordArray[0];
		}
	}

	answerLetterArray = answerString.split('');
	//reset prompt

	// change the 0/50 text
	updateScoreText();

	// change focus to the input field
	input.focus();
}

// generates a new line, adds it to prompt, and to answerWordArray
function addLineToPrompt(){
	let lineToAdd = generateLine(scoreMax-score-answerWordArray.length-1);
	answerString += lineToAdd;
	prompt.innerHTML += convertLineToHTML(lineToAdd);
	answerWordArray = answerWordArray.concat(lineToAdd.split(' '));
}

// takes an array of letter and turns them into html elements representing lines
// and words. These will be used as the prompt, which can then be styled accordingly
function convertLineToHTML(letters) {
	let promptString = "";

	promptString = "<span class='line'><span class='word' id='id"+idCount+"'>";
	// loop through all letters in prompt
	for(i = 0; i <= letters.length; i++) {
		//console.log(letters[i]);

		 // if last word in the list, close out the final word span tag
		if(i == letters.length){
			promptString += "</span> </span>";
			idCount++;
		}else if(letters[i] == " "){
		// if letter is a space, that means we have a new word
			//console.log('new word');
			idCount++;
			promptString += " </span>"
			promptString += "<span class='word' id='id"+idCount+"'>";
		}else {
			promptString += `<span>`+letters[i]+`</span>`;
		}

	}
	return promptString;
}

function checkAnswer() {
	// console.log('correct answer: ' + correctAnswer);
	// user input
	let inputVal = input.value;

	return inputVal == correctAnswer;
}



function endGame() {
	// erase prompt
	prompt.classList.toggle('noDisplay');

	// make resetButton visible
	resetButton.classList.remove('noDisplay');

	// pause timer
	gameOn = false;

	// calculate wpm
	let wpm;
	if(!timeLimitMode) {
		wpm = (((correct+errors)/5)/(minutes+(seconds/60))).toFixed(2);
	} else {
		wpm = (((correct+errors)/5)/(timeLimitModeInput.value/60)).toFixed(2);
	}
	// set accuracyText
	accuracyText.innerHTML="Accuracy: " + ((100*correct)/(correct+errors)).toFixed(2) + '%';
	wpmText.innerHTML = 'WPM: ' + wpm;
	// make accuracy visible
	testResults.classList.toggle('transparent');

	// set correct and errors counts to 0
	correct = 0;
	errors = 0;

	// change focus to resetButton
	resetButton.focus();


	// update scoreText
	updateScoreText();
	// clear input field
	document.querySelector('#userInput').value = '';
	// set letter index (where in the word the user currently is)
	// to the beginning of the word
	letterIndex = 0;
}

// generates a single line to be appended to the answer array
// if a line with a maximum number of words is desired, pass it in as a parameter
function generateLine(maxWords) {
	let str = '';

	if(fullSentenceMode) {
		// let rand = Math.floor(Math.random()*35);
		let rand = 0;
		if(sentenceStartIndex == -1) {
			sentenceStartIndex = getPosition(sentence, '.', rand)+1;
			sentenceEndIndex = sentence.substring(sentenceStartIndex + lineLength+2).indexOf(" ") + 
								sentenceStartIndex +lineLength+1;
			str = sentence.substring(sentenceStartIndex, sentenceEndIndex+1);
		}else{

			sentenceStartIndex = sentenceEndIndex+1;
			sentenceEndIndex = sentence.substring(sentenceStartIndex + lineLength+2).indexOf(" ") + 
								sentenceStartIndex +lineLength+1;
			str = sentence.substring(sentenceStartIndex, sentenceEndIndex+1);
			console.log(sentenceStartIndex);
			console.log(sentenceEndIndex);
		}
		str = str.substring(1);
		return str;
	}


	if(wordLists['lvl'+currentLevel].length > 0){
		let startingLetters = levelDictionaries[currentLayout]['lvl'+currentLevel]+punctuation;

		//requiredLetters = startingLetters.split(''); 
	
		// if this counter hits a high enough number, there are likely no words matching the search
		// criteria. If that happens, reset required letters
		let circuitBreaker = 0;

		let wordsCreated = 0;

		for(let i = 0; i < lineLength; i = i) {
			if(wordsCreated >= maxWords){
				break;
			}

			let rand = Math.floor(Math.random()*wordLists['lvl'+currentLevel].length);
			let wordToAdd = wordLists['lvl'+currentLevel][rand];


			//console.log('in circuit ' + circuitBreaker);
			if(circuitBreaker > 12000) {
				if(circuitBreaker > 30000){
					str+= levelDictionaries[currentLayout]['lvl'+currentLevel] + ' ';
					i+= wordToAdd.length;
					wordsCreated++;	
					circuitBreaker = 0;
					requiredLetters = startingLetters.split(''); 
					console.log('taking too long to find proper word');
				}else {
					requiredLetters = startingLetters.split(''); 
				}
			}

			// if the word does not contain any required letters, throw it out and choose again
			if(!contains(wordToAdd, requiredLetters)) {

				// console.log(wordToAdd + ' doesnt have any required letters from ' + requiredLetters);
			}else if(onlyLower && containsUpperCase(wordToAdd)) {
				// if only lower case is allowed and the word to add contains an uppercase,
				// throw out the word and try again
				
			}else {
				// if last word of the line, don't add a space
				str += wordToAdd + ' ';
				i+= wordToAdd.length;
				wordsCreated++;
			

				// remove any new key letters from our required list
				removeIncludedLetters(requiredLetters, wordToAdd);
								// if we have used all required letters, reset it
				if(requiredLetters.length == 0 ) {
					requiredLetters = startingLetters.split(''); 
				}
			}

			circuitBreaker++;
			// if we're having trouble finding a word with a require letter, reset 'required letters'
			if(circuitBreaker > 7000) {
				// console.log('couldnt find word with ' + requiredLetters);
				wordToAdd = randomLetterJumble();
				str += wordToAdd + ' ';
				i+= wordToAdd.length;
				wordsCreated++;
				requiredLetters = startingLetters.split('');
			}
		}
	}else {
		let startingLetters = levelDictionaries[currentLayout]['lvl'+currentLevel]+punctuation;
		// if there are no words with the required letters, all words should be set to the
		// current list of required letters
		let wordsCreated = 0;
		if(levelDictionaries[currentLayout]['lvl'+currentLevel].length == 0){
			str = "";
		}else {
			for(let i = 0; i < lineLength; i = i) {
				wordToAdd = randomLetterJumble();
				str+= wordToAdd+ ' ';
				i+= wordToAdd.length;
				console.log("i: " + i);
				wordsCreated++;
				if(wordsCreated >= maxWords){
					break;
				}
			}
		}
	}

	// line should not end in a space. Remove the final space char
	str = str.substring(0, str.length - 1);
	return str;
}

// creates a random jumble of letters to be used when no words are found for a target letter
function randomLetterJumble(){
	let randWordLength = Math.floor(Math.random()*5)+1;
	let jumble = "";
	for(let i = 0; i < randWordLength; i++){
		let rand = Math.floor(Math.random()*levelDictionaries[currentLayout]['lvl'+currentLevel].length);
		jumble+= levelDictionaries[currentLayout]['lvl'+currentLevel][rand];
	}

	return jumble;
}


// takes an array and removes any required letters that are found in 'word'
// for example, if required letters == ['a', 'b', 'c', 'd'] and word=='cat', this
// function will turn requiredLetters into ['b', 'd'] 
function removeIncludedLetters(requiredLetters, word) {
	word.split('').forEach((l)=> {
		if(requiredLetters.includes(l)){
			requiredLetters.splice(requiredLetters.indexOf(l),1);
			// console.log('removal: '+ word+ ' ' + l + ' '+ requiredLetters);
		}
	});
}

// if 'word' contains an uppercase letter, return true. Else return false
function containsUpperCase(word) {
	let upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let result = false;
	word.split('').forEach((letter)=> {
		if(upperCase.includes(letter)) {
			// console.log('upperCase ' + letter);
			result = true;
		}
	});
	return result;
}

// updates the correct answer and manipulates the dom
// called every time a correct word is typed
function handleCorrectWord() {
	// make sure no 'incorrect' styling still exists
	input.style.color = 'black';

	//remove the first word from the answer string
	answerWordArray.shift();

	if(prompt.children[0].children.length-1 == 0 || wordIndex >= prompt.children[0].children.length-1){
		console.log('new line ' + prompt);
		lineIndex++;
		
		// when we reach the end of a line, generate a new one IF 
		// we are more than  2 lines from from the end. This ensures that
		// no extra words are generated when we near the end of the test

		addLineToPrompt();

		//make the first line of the prompt transparent
		if(!wordScrollingMode){
			prompt.removeChild(prompt.children[0]);
			wordIndex = -1;
		}
	}

	let cur = document.querySelector('#id' + (score+1));

	if(wordScrollingMode) {
		deleteLatestWord = true;
		// update display
		prompt.classList.add('smoothScroll');
		// set the offset value of the next word
		promptOffset += prompt.children[0].children[0].offsetWidth;
		// move prompt left
		prompt.style.left = '-' + promptOffset+ 'px';		
		// make already typed words transparent
		prompt.children[0].firstChild.style.opacity = 0;
	}else {
		// if in paragraph mode, increase word index
		wordIndex++;
	}


	// save the correct answer to a variable before removing it 
	// from the answer string
	correctAnswer = answerWordArray[0];

}

// updates the numerator and denominator of the scoretext on 
// the document
function updateScoreText() {
	scoreText.innerHTML = ++score + "/" + scoreMax;
}

function resetTimeText() {
	timeText.innerHTML = minutes + 'm :' + seconds + ' s';
}

// removes currentLevel styles from all buttons. Use every time the 
// level is changed
function clearCurrentLevelStyle() {
	for(button of buttons) {
		button.classList.remove('currentLevel');
	}
}

// set the word list for each level
function createTestSets(){
	let objKeys = Object.keys(wordLists); // the level keys of each of the wordLists
	let includedLetters = punctuation; // the list of letters to be included in each level

	// for each level, add new letters to the test set and create a new list
	for(let i = 0; i < objKeys.length; i++) {
		let requiredLetters;
		
		
		// if 'all words' on a custom layout, don't add letters from the dictionary, because 
		// level 7 contains the whole alphabet, and the user might not have asigned every letter to
		// a key. Instead, this level should be the same as the previous, just with every letter required
		if(currentLayout != "custom" || i != 6){
			requiredLetters = levelDictionaries[currentLayout]['lvl'+(i+1)]+punctuation;
			includedLetters += letterDictionary[objKeys[i]];
		}else {
			requiredLetters = includedLetters;
		}

		wordLists[objKeys[i]] = [];
		//console.log('level ' +(i+1) + ": " + wordLists[objKeys[i]]);
		wordLists[objKeys[i]] = generateList(includedLetters, requiredLetters);
		// if(i == 6) console.log('level ' +(i+1) + ": " + wordLists[objKeys[i]]);
	}
}

// fixes a small bug in mozilla
document.addEventListener('keyup', (e)=> {
	e.preventDefault();
	//console.log('prevented');
});




