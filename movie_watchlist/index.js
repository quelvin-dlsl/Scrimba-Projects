// My API key:  8fbb449d
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

let count = 0
let aboutMovie = []

fetch('http://www.omdbapi.com/?t=Movie&apikey=8fbb449d')
    .then(res => res.json())
    .then(data => {

        for(const [key, value] of Object.entries(data)){
            console.log(`${key}: ${value}`)
        }
    })