let homeScore = 0
let guestScore = 0
let quarter = 1

function home_add1point(){
    homeScore += 1
    document.getElementById("home-el").textContent = homeScore
}

function home_add2point(){
    homeScore += 2
    document.getElementById("home-el").textContent = homeScore
}

function home_add3point(){
    homeScore += 3
    document.getElementById("home-el").textContent = homeScore
}


function guest_add1point(){
    guestScore += 1
    document.getElementById("guest-el").textContent = guestScore
}

function guest_add2point(){
    guestScore += 2
    document.getElementById("guest-el").textContent = guestScore
}

function guest_add3point(){
    guestScore += 3
    document.getElementById("guest-el").textContent = guestScore
}

function firstQuarter(){
    quarter = 1
    document.getElementById("qtr-el").textContent = quarter
}

function secondQuarter(){
    quarter = 2
    document.getElementById("qtr-el").textContent = quarter
}

function thirdQuarter(){
    quarter = 3
    document.getElementById("qtr-el").textContent = quarter
}

function fourthQuarter(){
    quarter = 4
    document.getElementById("qtr-el").textContent = quarter
}

function reset(){
    homeScore = 0
    guestScore = 0
    quarter = 1
    document.getElementById("home-el").textContent = homeScore
    document.getElementById("guest-el").textContent = guestScore
    document.getElementById("qtr-el").textContent = quarter
}