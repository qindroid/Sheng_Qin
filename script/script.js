var ip = "";

/* get users browser ver.*/
var nVer = navigator.appVersion;
var nAgt = navigator.userAgent;
var browserName = navigator.appName;
var fullVersion = "" + parseFloat(navigator.appVersion);
var majorVersion = parseInt(navigator.appVersion, 10);
var nameOffset, verOffset, ix;
var OSName = "Unknown OS";
var count = 0;
function readCount(ip, json) {
  db.collection("IP")
  .doc(ip.toString())
  .get().then((doc) => {
    if (doc.exists) {
        count = doc.data().loginCount;
        console.log("document found! " + count);
        // sign in Anonymously
        // firebase
        // .auth()
        // .signInAnonymously()
        // .then(() => {
        //   console.log("Sign in...");
        //   db.collection("IP")
        //     .doc(ip)
        //     .set({
        //       ip: ip,
        //       city: json.city,
        //       region: json.region,
        //       country: json.country,
        //       countryCode: json.country_code,
        //       ISP: json.isp,
        //       lastLogin: new Date().toString("M/d/yyyy HH:mm"),
        //       browserVer: browserName + ` ` + majorVersion,
        //       OS: OSName,
        //       loginCount: count + 1
        //     });
        // });
        db.collection("IP")
        .doc(ip)
        .set({
          ip: ip,
          city: json.city,
          region: json.region,
          country: json.country,
          countryCode: json.country_code,
          ISP: json.isp,
          lastLogin: new Date().toString("M/d/yyyy HH:mm"),
          browserVer: browserName + ` ` + majorVersion,
          OS: OSName,
          loginCount: count + 1,
          lastVisitPage: window.location.pathname
        });
    } else {
        console.log("No such document! " + ip);
        db.collection("IP")
        .doc(ip)
        .set({
          ip: ip,
          city: json.city,
          region: json.region,
          country: json.country,
          countryCode: json.country_code,
          ISP: json.isp,
          lastLogin: new Date().toString("M/d/yyyy HH:mm"),
          browserVer: browserName + ` ` + majorVersion,
          OS: OSName,
          loginCount: 0,
          lastVisitPage: window.location.pathname
        });
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});
  
}


function readUserBrowser() {
  // In Opera, the true version is after "Opera" or after "Version"
  if ((verOffset = nAgt.indexOf("Opera")) != -1) {
    browserName = "Opera";
    fullVersion = nAgt.substring(verOffset + 6);
    if ((verOffset = nAgt.indexOf("Version")) != -1)
      fullVersion = nAgt.substring(verOffset + 8);
  }
  // In MSIE, the true version is after "MSIE" in userAgent
  else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
    browserName = "Microsoft Internet Explorer";
    fullVersion = nAgt.substring(verOffset + 5);
  }
  // In Chrome, the true version is after "Chrome"
  else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
    browserName = "Chrome";
    fullVersion = nAgt.substring(verOffset + 7);
  }
  // In Safari, the true version is after "Safari" or after "Version"
  else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
    browserName = "Safari";
    fullVersion = nAgt.substring(verOffset + 7);
    if ((verOffset = nAgt.indexOf("Version")) != -1)
      fullVersion = nAgt.substring(verOffset + 8);
  }
  // In Firefox, the true version is after "Firefox"
  else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
    browserName = "Firefox";
    fullVersion = nAgt.substring(verOffset + 8);
  }
  // In most other browsers, "name/version" is at the end of userAgent
  else if (
    (nameOffset = nAgt.lastIndexOf(" ") + 1) <
    (verOffset = nAgt.lastIndexOf("/"))
  ) {
    browserName = nAgt.substring(nameOffset, verOffset);
    fullVersion = nAgt.substring(verOffset + 1);
    if (browserName.toLowerCase() == browserName.toUpperCase()) {
      browserName = navigator.appName;
    }
  }
  // trim the fullVersion string at semicolon/space if present
  if ((ix = fullVersion.indexOf(";")) != -1)
    fullVersion = fullVersion.substring(0, ix);
  if ((ix = fullVersion.indexOf(" ")) != -1)
    fullVersion = fullVersion.substring(0, ix);

  majorVersion = parseInt("" + fullVersion, 10);
  if (isNaN(majorVersion)) {
    fullVersion = "" + parseFloat(navigator.appVersion);
    majorVersion = parseInt(navigator.appVersion, 10);
  }

  if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
  if (navigator.appVersion.indexOf("Mac") != -1) OSName = "MacOS";
  if (navigator.appVersion.indexOf("X11") != -1) OSName = "UNIX";
  if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";
}

$(document).ready(function () {
  $(".block").hover(
    function () {
      setTimeout(function () {
        $(".block").after(`<div class="job job1">Click to contact</div>`);
      }, 50);
    },

    function () {
      setTimeout(function () {
        $(".job1").remove();
      }, 200);
    }
  );

  $.get('https://www.cloudflare.com/cdn-cgi/trace', function(data) {
    data = data.trim().split('\n').reduce(function(obj, pair) {
      pair = pair.split('=');
      return obj[pair[0]] = pair[1], obj;
    }, {});
    ip = data.ip;
    if(ip != '') {
        getIPJson(ip);
    } else {
        console.log("GET DATA ERROR")
    }
  });


// Sending an API request using jQuery.ajax
function getIPJson(ip) {
    $.ajax({
        method: 'GET',
        contentType: 'text/plain',
        url: 'http://ipwhois.app/json/' + ip,
        dataType: 'json',
        success: function(json) {
            readUserBrowser();
            readCount(ip.toString(), json);
        }
    });
}

  $("#footerContent").append(
    `&emsp;&emsp;&emsp;&emsp;(≥o≤) ` +
      Date.today().toString("MMM yyyy") +
      ` Sheng. 🤖💻⌨️🖥📱🖱`
  );
});

var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};

function setupTypewriter(t) {
  var HTML = t.innerHTML;

  t.innerHTML = "";

  var cursorPosition = 0,
    tag = "",
    writingTag = false,
    tagOpen = false,
    typeSpeed = 10,
    tempTypeSpeed = 0;

  var type = function () {
    if (writingTag === true) {
      tag += HTML[cursorPosition];
    }

    if (HTML[cursorPosition] === "<") {
      tempTypeSpeed = 0;
      if (tagOpen) {
        tagOpen = false;
        writingTag = true;
      } else {
        tag = "";
        tagOpen = true;
        writingTag = true;
        tag += HTML[cursorPosition];
      }
    }
    if (!writingTag && tagOpen) {
      tag.innerHTML += HTML[cursorPosition];
    }
    if (!writingTag && !tagOpen) {
      if (HTML[cursorPosition] === " ") {
        tempTypeSpeed = 0;
      } else {
        tempTypeSpeed = Math.random() * typeSpeed + 50;
      }
      t.innerHTML += HTML[cursorPosition];
    }
    if (writingTag === true && HTML[cursorPosition] === ">") {
      tempTypeSpeed = Math.random() * typeSpeed + 50;
      writingTag = false;
      if (tagOpen) {
        var newSpan = document.createElement("span");
        t.appendChild(newSpan);
        newSpan.innerHTML = tag;
        tag = newSpan.firstChild;
      }
    }

    cursorPosition += 1;
    if (cursorPosition < HTML.length - 1) {
      setTimeout(type, tempTypeSpeed);
    }
  };

  return {
    type: type,
  };
}

var typer = document.getElementById("typewriter");

typewriter = setupTypewriter(typewriter);

typewriter.type();

// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("myImg");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
if (img != null) {
  img.onclick = function () {
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
  };
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};
