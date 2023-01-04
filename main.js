previsao1 = "";
previsao2 = "";

Webcam.set({
width:350,
heigth:300,
imageFormat:'png',
pngQuality:90
})
camera = document.getElementById("camera");
Webcam.attach('#camera')
function tirarFoto(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="imagem-capturada" src="' +data_uri+ '"/>';
    })
}
console.log('ml5 version: ', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/xo_nvluJm/model.json', modeloCarregado);

function modeloCarregado(){
    console.log("modeloCarregado")
}
function check(){
    img = document.getElementById("imagem-capturada");
    classifier.classify(img,obterResultado)
}
function speak(){
    var synth = window.speechSynthesis;
    speakData1 ="a previsão é: " + previsao1
    speakData = "a outra previsão e: " +previsao2

    var utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2);
    synth.speak(utterThis);
}
function obterResultado(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("resultEmotionName").innerHTML = results[0].label;
        document.getElementById("resultEmotionName2").innerHTML = results[1].label;
        previsao1 = results[0].label
        previsao2 = results[1].label
        speak()
        if(previsao1 == "feliz"){
            document.getElementById("updateEmoji").innerHTML ="&#128512;";
        }

        if(previsao1 == "triste"){
            document.getElementById("updateEmoji").innerHTML ="&#128532;";
        }

        if(previsao2 == "feliz"){
            document.getElementById("updateEmoji2").innerHTML ="&#128512;";
        }

        if(previsao2 == "triste"){
            document.getElementById("updateEmoji2").innerHTML ="&#128532;";
        }

    }
}