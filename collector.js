// Page load end
let timerEnd = Date.now();

// Static Vars
let agentString = navigator.userAgent;
let userLang = navigator.language;
let acceptCookie = navigator.cookieEnabled;
let acceptJS = true; // of course!
let acceptCSS = true; // TODO :: CODE THIS
let acceptImg = true; // TODO :: CODE THIS
let screenHeight = screen.height;
let screenWidth = screen.width;
let windowHeight = window.innerHeight;
let windowWidth = window.innerWidth;
let connectType = navigator.connection.effectiveType;

// Perfomance Vars
let pageLoadStart = timerStart;
let pageLoadEnd = timerEnd;
let pageLoadms =  timerEnd-timerStart;

// package static vars into JSON
staticJson = {
    agentString : agentString,
    userLang : userLang,
    acceptCookie : acceptCookie,
    acceptJS : acceptJS,
    acceptCSS : acceptCSS,
    acceptImg : acceptImg,
    screenHeight : screenHeight,
    screenWidth : screenWidth,
    windowHeight : windowHeight,
    windowWidth : windowWidth,
    connectType : connectType
}

// package performance vars
// TODO (whole timing object?)
perfJSON = {
    pageLoadStart : pageLoadStart,
    pageLoadEnd : pageLoadEnd,
    pageLoadms : pageLoadms
}

// chain first two POST requests

// POST static vars to DB
fetch("https://noeldev.site/api/static", {
    method : 'POST',
    headers : {
        'Content-Type' : 'application/json'
    },
    body : JSON.stringify(staticJson)
}).then(res => {
    // POST performance vars to DB
    fetch("https://noeldev.site/api/performance", {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(perfJSON)
    })
});


/* Activity Vars */

/*
// left click
window.addEventListener("click", e => {
    let actJson = {
        type : 'Mouse Click',
        data1 : 'left',
        time : Date.now()
    }

    // POST activity to DB
    fetch("https://noeldev.site/api/activity", {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(actJson)
    });
});

// right click
window.addEventListener("contextmenu", e => {
    let actJson = {
        type : 'Mouse Click',
        data1 : 'right',
        time : Date.now()
    }

    // POST activity to DB
    fetch("https://noeldev.site/api/activity", {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(actJson)
    });
});

// cursor pos
window.addEventListener("mousemove", e => {
    let actJson = {
        type : 'Mouse Move',
        data1 : e.x,
        data2 : e.y,
        time : Date.now()
    }

    // POST activity to DB
    fetch("https://noeldev.site/api/activity", {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(actJson)
    });
});

// scrolling
window.addEventListener("scroll", e => {
    let scrollY = window.scrollY;

    let actJson = {
        type : 'Scroll',
        data1 : scrollY,
        time : Date.now()
    }

    // POST activity to DB
    fetch("https://noeldev.site/api/activity", {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(actJson)
    });
});

// keydown
window.addEventListener("keydown", e =>{
    let actJson = {
        type : 'Key Down',
        data1 : e.key,
        time : Date.now()
    }

    // POST activity to DB
    fetch("https://noeldev.site/api/activity", {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(actJson)
    });
});

//key up
window.addEventListener("keyup", e =>{
    let actJson = {
        type : 'Key Up',
        data1 : e.key,
        time : Date.now()
    }

    // POST activity to DB
    fetch("https://noeldev.site/api/activity", {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(actJson)
    });
});

// idle time : TODO

// user enter
window.addEventListener("focus", e =>{
    let actJson = {
        type : 'User Enter',
        time : Date.now()
    }

    // POST activity to DB
    fetch("https://noeldev.site/api/activity", {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(actJson)
    });
});

// user left
window.addEventListener("blur", e =>{
    let actJson = {
        type : 'User Leave',
        time : Date.now()
    }

    // POST activity to DB
    fetch("https://noeldev.site/api/activity", {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(actJson)
    });
});

// user page? : TODO

*/