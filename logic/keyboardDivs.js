var ansiDivs = `
	<div class=row>
		<div class="key" id='Backquote'><span class="letter"></span></div>
		<div class="key" id='Digit1'><span class="letter"></span></div>
		<div class="key" id='Digit2'><span class="letter"></span></div>
		<div class="key" id='Digit3'><span class="letter"></span></div>
		<div class="key" id='Digit4'><span class="letter"></span></div>
		<div class="key" id='Digit5'><span class="letter"></span></div>
		<div class="key" id='Digit6'><span class="letter"></span></div>
		<div class="key" id='Digit7'><span class="letter"></span></div>
		<div class="key" id='Digit8'><span class="letter"></span></div>
		<div class="key" id='Digit9'><span class="letter"></span></div>
		<div class="key" id='Digit0'><span class="letter"></span></div>
		<div class="key" id='Minus'><span class="letter"></span></div>
		<div class="key" id='Equal'><span class="letter"></span></div>
		<div class="key twou" id='BackSpace'><span class="letter"></span></div>
	</div>
	<div class=row>
		<div class="key onepointfiveu"><span class="letter"></span></div>
		<div class="key" id='KeyQ'><span class="letter"></span></div>
		<div class="key" id='KeyW'><span class="letter"></span></div>
		<div class="key" id='KeyE'><span class="letter"></span></div>
		<div class="key" id='KeyR'><span class="letter"></span></div>
		<div class="key" id='KeyT'><span class="letter"></span></div>
		<div class="key" id='KeyY'><span class="letter"></span></div>
		<div class="key" id='KeyU'><span class="letter"></span></div>
		<div class="key" id='KeyI'><span class="letter"></span></div>
		<div class="key" id='KeyO'><span class="letter"></span></div>
		<div class="key" id='KeyP'><span class="letter"></span></div>
		<div class="key" id='BracketLeft'><span class="letter"></span></div>
		<div class="key" id='BracketRight'><span class="letter"></span></div>
		<div class="key onepointfiveu" id='Backslash'><span class="letter"></span></div>
	</div>
	<div class=row>
		<div class="key onepointsevenfiveu"><span class="letter"></span></div>
		<div class="key" id='KeyA'><span class="letter"></span></div>
		<div class="key" id='KeyS'><span class="letter"></span></div>
		<div class="key" id='KeyD'><span class="letter"></span></div>
		<div class="key restingPosition" id='KeyF'><span class="letter"></span></div>
		<div class="key" id='KeyG'><span class="letter"></span></div>
		<div class="key" id='KeyH'><span class="letter"></span></div>
		<div class="key restingPosition" id='KeyJ'><span class="letter"></span></div>
		<div class="key" id='KeyK'><span class="letter"></span></div>
		<div class="key" id='KeyL'><span class="letter"></span></div>
		<div class="key" id='Semicolon'><span class="letter"></span></div>
		<div class="key" id='Quote'><span class="letter"></span></div>
		<div class="key twopointtwofiveu"><span class="letter"></span></div>
	</div>
	<div class=row>
		<div class="key twopointtwofiveu"><span class="letter"></span></div>
		<div class="key" id='KeyZ'><span class="letter"></span></div>
		<div class="key" id='KeyX'><span class="letter"></span></div>
		<div class="key" id='KeyC'><span class="letter"></span></div>
		<div class="key" id='KeyV'><span class="letter"></span></div>
		<div class="key" id='KeyB'><span class="letter"></span></div>
		<div class="key" id='KeyN'><span class="letter"></span></div>
		<div class="key" id='KeyM'><span class="letter"></span></div>
		<div class="key" id='Comma'><span class="letter"></span></div>
		<div class="key" id='Period'><span class="letter"></span></div>
		<div class="key" id='Slash'><span class="letter"></span></div>
		<div class="key twopointsevenfiveu"><span class="letter"></span></div>
	</div>
	<div class=row>
		<div class="key onepointtwofiveu"><span class="letter"></span></div>
		<div class="key onepointtwofiveu"><span class="letter"></span></div>
		<div class="key onepointtwofiveu"><span class="letter"></span></div>
		<div class="key sixpointtwofiveu"><span class="letter"></span></div>
		<div class="key onepointtwofiveu"><span class="letter"></span></div>
		<div class="key onepointtwofiveu"><span class="letter"></span></div>
		<div class="key onepointtwofiveu"><span class="letter"></span></div>
		<div class="key onepointtwofiveu"><span class="letter"></span></div>
	</div>
`;

var isoDivs = `
	<div class=row>
		<div class="key" id='Backquote'><span class="letter"></span></div>
		<div class="key" id='Digit1'><span class="letter"></span></div>
		<div class="key" id='Digit2'><span class="letter"></span></div>
		<div class="key" id='Digit3'><span class="letter"></span></div>
		<div class="key" id='Digit4'><span class="letter"></span></div>
		<div class="key" id='Digit5'><span class="letter"></span></div>
		<div class="key" id='Digit6'><span class="letter"></span></div>
		<div class="key" id='Digit7'><span class="letter"></span></div>
		<div class="key" id='Digit8'><span class="letter"></span></div>
		<div class="key" id='Digit9'><span class="letter"></span></div>
		<div class="key" id='Digit0'><span class="letter"></span></div>
		<div class="key" id='Minus'><span class="letter"></span></div>
		<div class="key" id='Equal'><span class="letter"></span></div>
		<div class="key twou" id='BackSpace'><span class="letter"></span></div>
	</div>
	<div class=row>
		<div class="key onepointfiveu"><span class="letter"></span></div>
		<div class="key" id='KeyQ'><span class="letter"></span></div>
		<div class="key" id='KeyW'><span class="letter"></span></div>
		<div class="key" id='KeyE'><span class="letter"></span></div>
		<div class="key" id='KeyR'><span class="letter"></span></div>
		<div class="key" id='KeyT'><span class="letter"></span></div>
		<div class="key" id='KeyY'><span class="letter"></span></div>
		<div class="key" id='KeyU'><span class="letter"></span></div>
		<div class="key" id='KeyI'><span class="letter"></span></div>
		<div class="key" id='KeyO'><span class="letter"></span></div>
		<div class="key" id='KeyP'><span class="letter"></span></div>
		<div class="key" id='BracketLeft'><span class="letter"></span></div>
		<div class="key" id='BracketRight'><span class="letter"></span></div>
		<div class="onepointfiveu">
			<div class="key" id='ISOEnterTop'></div>
			<div class="key" id='ISOEnterBot'></div>
		</div>
	</div>
	<div class=row>
		<div class="key onepointsevenfiveu"><span class="letter"></span></div>
		<div class="key" id='KeyA'><span class="letter"></span></div>
		<div class="key" id='KeyS'><span class="letter"></span></div>
		<div class="key" id='KeyD'><span class="letter"></span></div>
		<div class="key restingPosition" id='KeyF'><span class="letter"></span></div>
		<div class="key" id='KeyG'><span class="letter"></span></div>
		<div class="key" id='KeyH'><span class="letter"></span></div>
		<div class="key restingPosition" id='KeyJ'><span class="letter"></span></div>
		<div class="key" id='KeyK'><span class="letter"></span></div>
		<div class="key" id='KeyL'><span class="letter"></span></div>
		<div class="key" id='Semicolon'><span class="letter"></span></div>
		<div class="key" id='Quote'><span class="letter"></span></div>
		<div class="key"><span class="letter"></span></div>
		<div class="onepointtwofiveu"><span class="letter"></span></div>
	</div>
	<div class=row>
		<div class="key onepointtwofiveu"><span class="letter"></span></div>
		<div class="key" id='IntlBackslash'><span class="letter"></span></div>
		<div class="key" id='KeyZ'><span class="letter"></span></div>
		<div class="key" id='KeyX'><span class="letter"></span></div>
		<div class="key" id='KeyC'><span class="letter"></span></div>
		<div class="key" id='KeyV'><span class="letter"></span></div>
		<div class="key" id='KeyB'><span class="letter"></span></div>
		<div class="key" id='KeyN'><span class="letter"></span></div>
		<div class="key" id='KeyM'><span class="letter"></span></div>
		<div class="key" id='Comma'><span class="letter"></span></div>
		<div class="key" id='Period'><span class="letter"></span></div>
		<div class="key" id='Slash'><span class="letter"></span></div>
		<div class="key twopointsevenfiveu"><span class="letter"></span></div>
	</div>
	<div class=row>
		<div class="key onepointtwofiveu"><span class="letter"></span></div>
		<div class="key onepointtwofiveu"><span class="letter"></span></div>
		<div class="key onepointtwofiveu"><span class="letter"></span></div>
		<div class="key sixpointtwofiveu"><span class="letter"></span></div>
		<div class="key onepointtwofiveu"><span class="letter"></span></div>
		<div class="key onepointtwofiveu"><span class="letter"></span></div>
		<div class="key onepointtwofiveu"><span class="letter"></span></div>
		<div class="key onepointtwofiveu"><span class="letter"></span></div>
	</div>
`;

var orthoDivs = `
	<div class=row>
		<div class="twou"><span class="letter"></span></div>
		<div class="key" id='KeyQ'><span class="letter"></span></div>
		<div class="key" id='KeyW'><span class="letter"></span></div>
		<div class="key" id='KeyE'><span class="letter"></span></div>
		<div class="key" id='KeyR'><span class="letter"></span></div>
		<div class="key" id='KeyT'><span class="letter"></span></div>
		<div class="oneu"><span class="letter"></span></div>
		<div class="key" id='KeyY'><span class="letter"></span></div>
		<div class="key" id='KeyU'><span class="letter"></span></div>
		<div class="key" id='KeyI'><span class="letter"></span></div>
		<div class="key" id='KeyO'><span class="letter"></span></div>
		<div class="key" id='KeyP'><span class="letter"></span></div>
		<div class="twou"><span class="letter"></span></div>
	</div>
	<div class=row>
		<div class="twou"><span class="letter"></span></div>
		<div class="key" id='KeyA'><span class="letter"></span></div>
		<div class="key" id='KeyS'><span class="letter"></span></div>
		<div class="key" id='KeyD'><span class="letter"></span></div>
		<div class="key restingPosition" id='KeyF'><span class="letter"></span></div>
		<div class="key" id='KeyG'><span class="letter"></span></div>
		<div class="oneu"><span class="letter"></span></div>
		<div class="key" id='KeyH'><span class="letter"></span></div>
		<div class="key restingPosition" id='KeyJ'><span class="letter"></span></div>
		<div class="key" id='KeyK'><span class="letter"></span></div>
		<div class="key" id='KeyL'><span class="letter"></span></div>
		<div class="key" id='Semicolon'><span class="letter"></span></div>
		<div class="twou"><span class="letter"></span></div>
	</div>
	<div class=row>
		<div class="twou"><span class="letter"></span></div>
		<div class="key" id='KeyZ'><span class="letter"></span></div>
		<div class="key" id='KeyX'><span class="letter"></span></div>
		<div class="key" id='KeyC'><span class="letter"></span></div>
		<div class="key" id='KeyV'><span class="letter"></span></div>
		<div class="key" id='KeyB'><span class="letter"></span></div>
		<div class="oneu"><span class="letter"></span></div>
		<div class="key" id='KeyN'><span class="letter"></span></div>
		<div class="key" id='KeyM'><span class="letter"></span></div>
		<div class="key" id='Comma'><span class="letter"></span></div>
		<div class="key" id='Period'><span class="letter"></span></div>
		<div class="key" id='Slash'><span class="letter"></span></div>
		<div class="twou"><span class="letter"></span></div>
	</div>
	<div class=row>
		<div class="twou"><span class="letter"></span></div>
		<div class="oneu"><span class="letter"></span></div>
		<div class="oneu"><span class="letter"></span></div>
		<div class="key"><span class="letter"></span></div>
		<div class="key"><span class="letter"></span></div>
		<div class="key"><span class="letter"></span></div>
		<div class="oneu"><span class="letter"></span></div>
		<div class="key"><span class="letter"></span></div>
		<div class="key"><span class="letter"></span></div>
		<div class="key"><span class="letter"></span></div>
		<div class="oneu"><span class="letter"></span></div>
		<div class="oneu"><span class="letter"></span></div>
		<div class="twou"><span class="letter"></span></div>
	</div>
`;

var customLayout = `
	<div class=row>
		<div class="cKey rowStart" id='customBackquote'><span class="letter"></span></div>
		<div class="cKey" id='customDigit1'><span class="letter"></span></div>
		<div class="cKey" id='customDigit2'><span class="letter"></span></div>
		<div class="cKey" id='customDigit3'><span class="letter"></span></div>
		<div class="cKey" id='customDigit4'><span class="letter"></span></div>
		<div class="cKey" id='customDigit5'><span class="letter"></span></div>
		<div class="cKey" id='customDigit6'><span class="letter"></span></div>
		<div class="cKey" id='customDigit7'><span class="letter"></span></div>
		<div class="cKey" id='customDigit8'><span class="letter"></span></div>
		<div class="cKey" id='customDigit9'><span class="letter"></span></div>
		<div class="cKey" id='customDigit0'><span class="letter"></span></div>
		<div class="cKey" id='customMinus'><span class="letter"></span></div>
		<div class="cKey" id='customEqual'><span class="letter"></span></div>
		<div class="cKey twou rowEnd" id='customBackSpace'><span class="letter"></span></div>
	</div>
	<div class=row>
		<div class="cKey onepointfiveu rowStart" id='customTab' ><span class="letter"></span></div>
		<div class="cKey normalCKey selectedInputKey defaultSelectedKey" id='customKeyQ'><span  class="letter pulse">_</span></div>
		<div class="cKey normalCKey" id='customKeyW'><span  class="letter"></span></div>
		<div class="cKey normalCKey" id='customKeyE'><span  class="letter"></span></div>
		<div class="cKey normalCKey" id='customKeyR'><span  class="letter"></span></div>
		<div class="cKey normalCKey" id='customKeyT'><span  class="letter"></span></div>
		<div class="cKey normalCKey" id='customKeyY'><span  class="letter"></span></div>
		<div class="cKey normalCKey" id='customKeyU'><span  class="letter"></span></div>
		<div class="cKey normalCKey" id='customKeyI'><span  class="letter"></span></div>
		<div class="cKey normalCKey" id='customKeyO'><span  class="letter"></span></div>
		<div class="cKey normalCKey" id='customKeyP'><span  class="letter"></span></div>
		<div class="cKey normalCKey" id='customBracketLeft'><span  class="letter"></span></div>
		<div class="cKey normalCKey" id='customBracketRight'><span  class="letter"></span></div>
		<div class="cKey onepointfiveu rowEnd" id='customBackslash'><span class="letter"></span></div>
	</div>
	<div class=row>
		<div class="cKey onepointsevenfiveu rowStart" id='customCapsLock'><span class="letter"></span></div>
		<div class="cKey normalCKey" id='customKeyA'>
			<span class="letter"></span>
		</div>
		<div class="cKey normalCKey" id='customKeyS'><span class="letter"></span></div>
		<div class="cKey normalCKey" id='customKeyD'><span class="letter"></span></div>
		<div class="cKey normalCKey restingPosition" id='customKeyF'><span class="letter"></span></div>
		<div class="cKey normalCKey" id='customKeyG'><span class="letter"></span></div>
		<div class="cKey normalCKey" id='customKeyH'><span class="letter"></span></div>
		<div class="cKey normalCKey restingPosition" id='customKeyJ'><span class="letter"></span></div>
		<div class="cKey normalCKey" id='customKeyK'><span class="letter"></span></div>
		<div class="cKey normalCKey" id='customKeyL'><span class="letter"></span></div>
		<div class="cKey normalCKey" id='customSemicolon'><span class="letter"></span></div>
		<div class="cKey normalCKey" id='customQuote'><span class="letter"></span></div>
		<div class="cKey twopointtwofiveu rowEnd" id='customEnter'><span class="letter"></span></div>
	</div>
	<div class=row>
		<div class="cKey twopointtwofiveu rowStart"><span class="letter"></span></div>
		<div class="cKey normalCKey" id='customKeyZ'><span class="letter"></span></div>
		<div class="cKey normalCKey" id='customKeyX'><span class="letter"></span></div>
		<div class="cKey normalCKey" id='customKeyC'><span class="letter"></span></div>
		<div class="cKey normalCKey" id='customKeyV'><span class="letter"></span></div>
		<div class="cKey normalCKey" id='customKeyB'><span class="letter"></span></div>
		<div class="cKey normalCKey" id='customKeyN'><span class="letter"></span></div>
		<div class="cKey normalCKey" id='customKeyM'><span class="letter"></span></div>
		<div class="cKey normalCKey" id='customComma'><span class="letter"></span></div>
		<div class="cKey normalCKey" id='customPeriod'><span class="letter"></span></div>
		<div class="cKey normalCKey" id='customSlash'><span class="letter"></span></div>
		<div class="cKey twopointsevenfiveu rowEnd finalKey"><span class="letter"></span></div>
	</div>
	<div class='row'>
		<div class="cKey onepointtwofiveu rowStart"><span class="letter"></span></div>
		<div class="cKey onepointtwofiveu"><span class="letter"></span></div>
		<div class="cKey onepointtwofiveu"><span class="letter"></span></div>
		<div class="cKey onepointtwofiveu"><span class="letter"></span></div>
		<div class="cKey sixpointtwofiveu"><span class="letter"></span></div>
		<div class="cKey onepointtwofiveu"><span class="letter"></span></div>
		<div class="cKey onepointtwofiveu"><span class="letter"></span></div>
		<div class="cKey onepointtwofiveu"><span class="letter"></span></div>
		<div class="cKey onepointtwofiveu rowEnd"><span class="letter"></span></div>
	</div>
`;
