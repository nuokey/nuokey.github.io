// Данный скрипт представляет собой недоделанную версию редактора кода, а не текстового редактора



input = document.querySelector("input");

textField = document.getElementById("text-field");

let cursorCoord = 0;

let lastText = "";
let text;

function importFile(input) {
  let file = input.files[0];

  let reader = new FileReader();

  reader.readAsText(file);

  reader.onload = function() {
    text = reader.result;
    

    textField.innerHTML = textToHTML(text);
  };
}

// document.addEventListener("keyup", function() {
//   // console.log("file changed");
//   lastText = text;
//   text = textField.textContent;
//   // console.log(text);

//   var range = document.createRange()
//   var sel = window.getSelection()
  
//   console.log(sel);
//   range.setStart(textField.childNodes[0], 1)
//   range.collapse(true)
  
//   sel.removeAllRanges()
//   sel.addRange(range)
  
// })

function colorCheck(word) {
  let color = "white";
  if (word == "word") {
    color = "red";
  }

  return color
}

function textToHTML(text) {
  let htmlText = "";

  let word = "";

  for (let i = 0; i < text.length; i++) {
    if (text[i] == " ") {
      htmlText += htmlWord(word);
      word = "";
    }
    else if (text[i] == ".") {
      htmlText += htmlWord(word) + htmlWord(".");
      word = "";
    }
    else if (text[i] == "\n") {
      htmlText += htmlWord(word) + "<br>";
      word = "";
    }
    else {
      word += text[i];
    }
  }
  htmlText += htmlWord(word);

  console.log(htmlText);

  return htmlText
}


function htmlWord(word) {
  return `<input class="word" onchange="console.log('???');" style="color: ${colorCheck(word)}" onkeydown="size=value.length" onkeyup="onkeydown()" onload="onkeydown()" onkeypress="onkeydown()" onchange="onkeydown()" value="${word}&nbsp">`;
}