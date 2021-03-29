const submitBtn = document.getElementById('submitBtn')
const femaleURL = "/tm/female/";
const maleURL = "/tm/male/";

var tmUrl;

let model, maxPredictions;
let predictions = {};
let gender = undefined;

function submit(){
    if (gender == undefined) {
        document.getElementById("alertGender").innerHTML = "성별을 선택해주세요";
        return
    } 

    document.getElementById("jsOverlay").style.display = "block";
    document.getElementById("jsLoading").style.display = "block";
    document.getElementById("jsLoadingText").style.display = "block";

    console.log(predictions);

    document.getElementById('keywordA').value = parseInt((predictions.image1[0] + predictions.image2[0] + predictions.image3[0]) / 3 * 100);
    document.getElementById('keywordB').value = parseInt((predictions.image1[1] + predictions.image2[1] + predictions.image3[1]) / 3 * 100);
    document.getElementById('keywordC').value = parseInt((predictions.image1[2] + predictions.image2[2] + predictions.image3[2]) / 3 * 100);
    document.getElementById('keywordD').value = parseInt((predictions.image1[3] + predictions.image2[3] + predictions.image3[3]) / 3 * 100);
    document.getElementById('keywordE').value = parseInt((predictions.image1[4] + predictions.image2[4] + predictions.image3[4]) / 3 * 100);

    document.getElementById('submitResume').submit();

}

function readURL(input) {
    id = input.id
    document.getElementById("Female").disabled = true;
    document.getElementById("Male").disabled = true;
    
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('.file-upload-image').attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
        init().then(async ()=>{
            predict(id);
        });
    } else {
        console.log('no input error')
    }
}

async function init() {

    document.getElementById("jsOverlay").style.display = "block";
    document.getElementById("jsLoading").style.display = "block";
    document.getElementById("jsLoadingText").style.display = "block";

    const modelURL = tmUrl + "model.json";
    const metadataURL = tmUrl + "metadata.json";
    
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
}

async function predict(id) {
    var image = document.getElementById("face-image");
    const prediction = await model.predict(image, false);

    p = []
    for (let i = 0; i < prediction.length; i++) {
        console.log(prediction[i].className + ": " + parseFloat(prediction[i].probability).toFixed(2));
        p.push(parseFloat(parseFloat(prediction[i].probability).toFixed(2)));
    }

    if (id == 'profileImg1'){
        predictions.image1 = p;
    } else if(id == 'profileImg2') {
        predictions.image2 = p;
    } else if (id == 'profileImg3'){
        predictions.image3 = p;
    }
    console.log(predictions)
    document.getElementById("jsOverlay").style.display = "none";
    document.getElementById("jsLoading").style.display = "none";
    document.getElementById("jsLoadingText").style.display = "none";
}

function enableFiles(e) {
    if (e.target.id == 'Female'){
        gender = true;
        tmUrl = femaleURL;
    }
    if (e.target.id == 'Male'){
        gender = false;
        tmUrl = maleURL;
    }

    document.getElementById("profileImg1").disabled = false;
    document.getElementById("profileImg2").disabled = false;
    document.getElementById("profileImg3").disabled = false;
}

if (submitBtn){
    submitBtn.addEventListener('click', submit);
    document.getElementById("Male").addEventListener('click', enableFiles);
    document.getElementById("Female").addEventListener('click', enableFiles);

}