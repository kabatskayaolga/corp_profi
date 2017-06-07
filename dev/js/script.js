// tabs

var allLinks = document.getElementsByTagName('a')

function removeActive(activeTab){
	var tabChilden = activeTab.children;

	for(var i = 0; i < tabChilden.length; i++){
		var tabChildenChild = tabChilden[i].children;
		for(var j = 0; j < tabChildenChild.length; j++){
			tabChildenChild[j].removeAttribute('class');
		}
	};
};
function findParentTabs(activeLink, pElem){
	var parentTabs = activeLink.parentElement;
	if (parentTabs.getAttribute('class') === pElem) {
		return parentTabs;
	} else if(parentTabs.tagName === 'BODY'){
		return false;
	} else{
		return findParentTabs(parentTabs, pElem);
	}

};

function findContentId(contentId){
	var content = document.getElementById(contentId)
	content.setAttribute('class', 'active');
};


// show text more

var readMore = document.getElementsByClassName('read-more');
for (var i = 0; i < readMore.length; i++){
	readMore[i].onclick = function(){
		this.style.display = 'none';
		var hiddenEl = this.nextElementSibling;
		if (hiddenEl.style.maxHeight){
	      hiddenEl.style.maxHeight = null;
	    } else {
	      hiddenEl.style.maxHeight = hiddenEl.scrollHeight + "px";
	    } 
		
	}
}

// form button close
var modal = document.getElementById('modal');
modal.onclick = function(e) {
	this.style.display = 'none';
	document.body.removeAttribute('class', 'modal-open');
}
var modalContent = document.querySelector('.modal-content');
modalContent.onclick = function(e) {
	e.stopPropagation();
}

var close = document.getElementsByClassName('close');
for (var i = 0; i < close.length; i++){
	close[i].onclick = function(e) {
		// e.preventDefault();
		var closeModal = findParentTabs(this, 'modal-wrapper');
		closeModal.style.display = 'none';
		document.body.removeAttribute('class', 'modal-open');
	}
};
for(var i = 0; i < allLinks.length; i++){
	allLinks[i].onclick = function(e) {

		if (this.parentElement.getAttribute('class') === 'links') {
			e.preventDefault();
			
			removeActive(findParentTabs(this, 'tabs'));
			var href = this.getAttribute('href');
			this.setAttribute('class', 'active');
			href= href.substr(1);
			findContentId(href);
		}
		else if (this.hasAttribute('open-modal')){
			e.preventDefault();
			var attrModal = this.getAttribute('open-modal');
			document.getElementById('modal')
				.style.display = 'block'
			for(var i = 0; i < allLinks.length; i++){
				if(allLinks[i].getAttribute('href') === '#' + attrModal){
					removeActive(findParentTabs(allLinks[i], 'tabs'));
					allLinks[i].setAttribute('class', 'active');
				}
				document.getElementById(attrModal).setAttribute('class', 'active');
				document.getElementById(attrModal).style.display = 'block';
				document.getElementsByClassName('message')[0].style.display = 'none';
				document.body.setAttribute('class', 'modal-open');
			}
		}
	}
};

// Validation
var text;
var newText = document.createElement('span');
var defaultValue = '+38 (___) ___-__-__';
var result;
var stateVal;

for(var i=0; i<document.forms.length; i++ ){
	document.forms[i].onsubmit = function() {

		if(allValidate(this) === true){
			sendform(this);
			removeValue(this); // сработает после onclick

		} else{
			newText.innerHTML = text || 'Заполните пожалуйста все подчеркнутые поля';
			var errorText = this.insertBefore(newText, this.children[0]);
			errorText.setAttribute('id', 'error');
			return false;
		}
	}
};
function sendform(form){
	submitted=0;

	ga('send', 'event', 'Заявка', 'Астрология', 'Заявка');
	try{
		yaCounter44696518.reachGoal('ORDER');
	}catch(e) {
		
	}
	
	var modalTabs = document.getElementsByClassName('modal-content')[0].children;
	var modal = document.getElementById('modal');
	modal.style.display = 'block';
	
	document.body.setAttribute('class', 'modal-open');
	for (var i = 0; i < modalTabs.length; i++){
		if(modalTabs[i].getAttribute('id') === 'getinvoice'){
			modalTabs[i].style.display = 'none';
		} else if(modalTabs[i].getAttribute('class') === 'message'){
			modalTabs[i].style.display = 'block';
		}
	}
};

function removeValue(form){
	var inputEl = form.elements;
	setTimeout(function() {	
		for (var i = 0; i < inputEl.length; i++){
			if(inputEl[i].hasAttribute('remove-value')){
				inputEl[i].value =  '';
			} 
		}	 	
	}, 1);
	
};

function allValidate(validateForm){
	var resaltVal = 0;
	var counter = 0;
	for(var i=0; i<validateForm.elements.length; i++){
		if(validateForm.elements[i].hasAttribute('data-validate')){
			var validateElement = validateForm.elements[i];
			var resalt = validateElementValue(validateForm, validateElement);
			resaltVal += resalt;
			counter++;
		}
	}
	
	if(resaltVal === counter){
		return true;
	} else{
		return false;
	}
};



function nameElementValidate(elem){
	if(elem.value.length < 3){
			elem.setAttribute('class', 'novalidate');
			text = "Заполните пожалуйста все подчеркнутые поля";
			result = false;
		} else{
			elem.setAttribute('class', '');
			text = '';
			result = true;
		}
	return result;
};
function mailElementValidate(elem){

	if (elem.value.indexOf("@") < 1 || 
		elem.value.lastIndexOf(".") < elem.value.indexOf("@")+2 || 
		elem.value.lastIndexOf(".")+2 >= elem.value) {	
			elem.setAttribute('class', 'novalidate');
			text = "Введите корректный e-mail";
			result = false;
		} else if(elem.value.length === 0){
			elem.setAttribute('class', 'novalidate');
			text = "Заполните пожалуйста все подчеркнутые поля";
			result = false;
		} else{
			elem.setAttribute('class', '')
			text = "";
			result = true;
		}
		return result;

};
function telElementValidate(elem){
	
	// если значение равно дефолту

	if(elem.value < defaultValue.value){
		elem.setAttribute('class', 'novalidate');
		text = "Заполните пожалуйста все подчеркнутые поля";
		result = false;
	}
	// } else if(elem.value.length < defaultValue.length-1){
	// 	elem.value = stateVal || defaultValue;
	// 	if(stateVal[defaultValue.length-1] === defaultValue[defaultValue.length-1]){
	// 		elem.setAttribute('class', 'novalidate');
	// 		text = "Заполните пожалуйста все подчеркнутые поля";
	// 		result = false;	
	// 	} 
		// else{
		// 	elem.setAttribute('class', '');
		// 	text = "";
		// 	result = true;
		// }
	// } else{
	// 	console.log('1g');
	// 	var counterValue;
	// 	var arrdefaultValue = defaultValue.split('');
	// 	var newValue = elem.value;
	// 	var it="";
	// 	var itReverce ="";
	// 	var newCharadter = newValue[newValue.length-1];
		
		// Ввод
		
		// if (newValue.length-1 === defaultValue.length) {
		// 	// Ввод букв = ошибка

		// 	if (isNaN(newCharadter)) {
		// 		elem.value = newValue.substring(0,newValue.length-1);
		// 		result = result;
		// 		elem.setAttribute('class', 'novalidate');
		// 		text = "Вводите только цифры";
		// 	} else{
		// 		counterValue = 0;

		// 		// перебор символов

		// 		for(var i = 0; i<newValue.length; i++){
		// 			if (elem.value[i] != '_' && counterValue < defaultValue.length-1) {
		// 				counterValue++;
		// 				it += newValue[i];
		// 			} else {
		// 				break
		// 			}
		// 		}
		// 		// если все символы заменены ошибки нет
		// 		if (counterValue === defaultValue.length-1){
		// 			elem.value = it + newValue[newValue.length-1] + newValue.substring(counterValue+1,newValue.length-1);
		// 			elem.setAttribute('class', '');
		// 			text = "";
		// 			result = true;
		// 			console.log('1')
		// 		// если нет = ошибка

		// 		} else{
		// 			elem.value = it + newValue[newValue.length-1] + newValue.substring(counterValue+1,newValue.length-1);
		// 			elem.setAttribute('class', 'novalidate');
		// 			text = "Заполните пожалуйста все подчеркнутые поля";
		// 			result = false;
		// 			console.log('2')
		// 		}
		// 	}


		// if (newValue.length-1 < defaultValue.length) {
		// 	// Ввод букв = ошибка

		// 	if (isNaN(newCharadter)) {
		// 		elem.value = newValue.substring(0,newValue.length-1);
		// 		result = result;
		// 		elem.setAttribute('class', 'novalidate');
		// 		text = "Вводите только цифры";
		// 	} else{
		// 		counterValue = 0;

		// 		// перебор символов

		// 		for(var i = 0; i<newValue.length; i++){
		// 				counterValue++;
		// 				it += newValue[i];
		// 		}
		// 		// если все символы заменены ошибки нет
		// 		if (counterValue === defaultValue.length-1){
		// 			elem.value = it + newValue[newValue.length-1]
		// 			elem.setAttribute('class', '');
		// 			text = "";
		// 			result = true;
		// 		// если нет = ошибка

		// 		} else if(newValue.length===1){
		// 			elem.value = defaultValue.substring(0,5)+ it
		// 			elem.setAttribute('class', 'novalidate');
		// 			text = "Заполните пожалуйста все подчеркнутые поля";
		// 			result = false;
		// 		} else{
		// 			if(defaultValue[counterValue] === '_'){
		// 				elem.value = it
		// 				console.log('bom', it, defaultValue[counterValue],  newValue, counterValue)
		// 			} else{
		// 				elem.value = newValue.substring(0,counterValue) + defaultValue[counterValue];
		// 				console.log('bom2', it, defaultValue[counterValue-1],  newValue, counterValue)
		// 			}
					
		// 			elem.setAttribute('class', 'novalidate');
		// 			text = "Заполните пожалуйста все подчеркнутые поля";
		// 			result = false;
		// 		}
		// 	}


		// // Удаление
		// } else if (newValue.length < defaultValue.length) {
			
		// 	var newValueAfterDel = newValue + defaultValue.substring(newValue.length, defaultValue.length);
		// 	counterValue=newValue.length;
		// 	// перебор символов
		// 	for (var i = newValue.length; i > 0; i--) {
		// 		if ( newValueAfterDel[i] === defaultValue[i] ) {
		// 				counterValue--;
		// 				itReverce += defaultValue[i];
		// 		} else {
		// 			break
		// 		}
		// 	};
			
		// 	var itReverceArr = itReverce.split("");
		// 	var itReverceArrReverce = itReverceArr.reverse();
		// 	var itReverceArrReverceJoin = itReverceArrReverce.join("");

		// 	// удаление последненго символа

		// 	if (stateVal[defaultValue.length-1] === defaultValue[defaultValue.length-1]){
		// 		elem.value = newValue.substring(0, counterValue) + defaultValue[counterValue] + itReverceArrReverceJoin;
		// 	} else{
		// 		elem.value = newValue.substring(0, counterValue+1) + defaultValue[counterValue];				
		// 	}
		// 	elem.setAttribute('class', 'novalidate');
		// 	result = false;
		// 	text = "Заполните пожалуйста все подчеркнутые поля";
		 else {
			// if (stateVal[defaultValue.length-1] != defaultValue[defaultValue.length-1]){
				elem.setAttribute('class', '');
				text = "";
				result = true;
			// } else{
			// 	elem.setAttribute('class', 'novalidate');
			// 	text = "Заполните пожалуйста все подчеркнутые поля";
			// 	result = false;
			// }
		// }

		stateVal = elem.value;
		
	}
	
	return result;
};
function validateElementValue(validateForm, validateElement){
	
	var nameInput = validateForm.elements['entry.841263509'];
	var telInput = validateForm.elements['entry.1345420925'];
	var mailInput = validateForm.elements['entry.747019135'];

	if(nameInput === validateElement){
		result = nameElementValidate(validateElement);
		
	} else if(validateElement === mailInput){
		result = mailElementValidate(validateElement);
		
		
	} else if(validateElement === telInput){
		result = telElementValidate(validateElement);
	}  
	 else{
		validateElement.setAttribute('class', '');
		result = true;
		text = '';
	}
	newText.innerHTML = text;
	var errorText = validateForm.insertBefore(newText, validateForm.children[0]);
	errorText.setAttribute('id', 'error');
	if (result) {
		try{
			validateForm.children[0].remove();
		} catch (e) {
			console.log('error remove')
		}
		
	}
	return result;
};
// function clickElementValue(validateForm, validateElement){
// 	var telInput = validateForm.elements['entry.1345420925'];
// 	if(validateElement === telInput){

// 		telInput.value = stateVal || defaultValue;
// 	}  
// }
// function keyUpElementValue(validateForm, validateElement){
// 	var telInput = validateForm.elements['entry.1345420925'];
// 	if(validateElement === telInput === stateVal || defaultValue ){
// 		telInput.value = stateVal || defaultValue;
// 	} 
// }

var elementsValidate = document.getElementsByTagName('input');
for(var i=0; i<elementsValidate.length; i++ ){
	var findElement = elementsValidate[i];
	if (findElement.hasAttribute('data-validate')) {
		findElement.oninput = function(){
			validateElementValue(this.form, this);
		};
		// findElement.onclick = function(){
		// 	clickElementValue(this.form, this);
		// };
		// findElement.onkeyup  = function(){
		// 	keyUpElementValue(this.form, this);
		// };
	}	
}

// slider

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("slide");
  if (n > slides.length) {slideIndex = 1} 
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; 
  }

  slides[slideIndex-1].style.display = "flex"; 
}