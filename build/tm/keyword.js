"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var submitBtn = document.getElementById('submitBtn');
var femaleURL = "/tm/female/";
var maleURL = "/tm/male/";
var tmUrl;
var model, maxPredictions;
var predictions = {};
var gender = undefined;

function submit() {
  if (gender == undefined) {
    document.getElementById("alertGender").innerHTML = "성별을 선택해주세요";
    return;
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
  document.getElementById("Female").disabled = false;
  document.getElementById("Male").disabled = false;
  document.getElementById('submitResume').submit();
}

function readURL(input) {
  id = input.id;
  document.getElementById("Female").disabled = true;
  document.getElementById("Male").disabled = true;

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('.file-upload-image').attr('src', e.target.result);
    };

    reader.readAsDataURL(input.files[0]);
    init().then( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              predict(id);

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
  } else {
    console.log('no input error');
  }
}

function init() {
  return _init.apply(this, arguments);
}

function _init() {
  _init = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var modelURL, metadataURL;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            document.getElementById("jsOverlay").style.display = "block";
            document.getElementById("jsLoading").style.display = "block";
            document.getElementById("jsLoadingText").style.display = "block";
            modelURL = tmUrl + "model.json";
            metadataURL = tmUrl + "metadata.json";
            _context2.next = 7;
            return tmImage.load(modelURL, metadataURL);

          case 7:
            model = _context2.sent;
            maxPredictions = model.getTotalClasses();

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _init.apply(this, arguments);
}

function predict(_x) {
  return _predict.apply(this, arguments);
}

function _predict() {
  _predict = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
    var image, prediction, i;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            image = document.getElementById("face-image");
            _context3.next = 3;
            return model.predict(image, false);

          case 3:
            prediction = _context3.sent;
            p = [];

            for (i = 0; i < prediction.length; i++) {
              console.log(prediction[i].className + ": " + parseFloat(prediction[i].probability).toFixed(2));
              p.push(parseFloat(parseFloat(prediction[i].probability).toFixed(2)));
            }

            if (id == 'profileImg1') {
              predictions.image1 = p;
            } else if (id == 'profileImg2') {
              predictions.image2 = p;
            } else if (id == 'profileImg3') {
              predictions.image3 = p;
            }

            console.log(predictions);
            document.getElementById("jsOverlay").style.display = "none";
            document.getElementById("jsLoading").style.display = "none";
            document.getElementById("jsLoadingText").style.display = "none";

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _predict.apply(this, arguments);
}

function enableFiles(e) {
  if (e.target.id == 'Female') {
    gender = true;
    tmUrl = femaleURL;
  }

  if (e.target.id == 'Male') {
    gender = false;
    tmUrl = maleURL;
  }

  document.getElementById("profileImg1").disabled = false;
  document.getElementById("profileImg2").disabled = false;
  document.getElementById("profileImg3").disabled = false;
}

if (submitBtn) {
  submitBtn.addEventListener('click', submit);
  document.getElementById("Male").addEventListener('click', enableFiles);
  document.getElementById("Female").addEventListener('click', enableFiles);
}