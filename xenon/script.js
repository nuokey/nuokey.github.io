input = document.getElementById("file-open");

textField = document.getElementById("text-field");

let cursorCoord = 0;

let lastText = "";


function openFile(input) {
  let file = input.files[0];

  let htmlText = "";

  let reader = new FileReader();

  reader.readAsText(file);

  reader.onload = function() {
    let text = reader.result;
    let text2 = "";

    
    // text = text.replace("Hello", "dfsdfsdf");
    // text = text.replace(" ", "&nbsp");
    // text = text.replace("    ", "&nbsp&nbsp&nbsp&nbsp");

    for (let i = 0; i < text.length; i++) {
      if (text[i] == " ") {
        text2 += "&nbsp";
      }
      else {
        text2 += text[i];
      }
    }

    text2 = text2.split("\r\n");

    console.log(text2);
    
    text2.forEach(element => {
        htmlText += `<div>${element}</div>`;
    });

    // htmlText.replace(" ", "&nbsp");

    textField.innerHTML = htmlText;
  };
}

function saveFile() {
    var data = textField.innerHTML;

  data = htmlToText(data);

    var a = document.getElementById("linkForSavingFiles");
    var file = new Blob([data], {
      type: 'plain/text'
    });
    a.href = URL.createObjectURL(file);
    a.download = 'file.txt';
    a.click();
}

function htmlToText(data) {
  while (data.replace("<div>", "") != data) {
    data = data.replace("<div>", "");
  }
  while (data.replace("</div>", "\n") != data) {
      data = data.replace("</div>", "\n");
  }
  while (data.replace("&nbsp;", " ") != data) {
      data = data.replace("&nbsp;", " ");
  }
  data = data.replace("<br>", "");
  // console.log(data);
  return data
}

document.addEventListener("keyup", function() {
  let text = htmlToText(textField.innerHTML);

  
});