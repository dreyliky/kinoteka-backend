// ./input/video_cdn.json file must be present from [https://videocdn.tv/base-files] before start!

// This script converts videocdn's json database from [https://videocdn.tv/base-files] to dictionary, where
// key is `kinopoiskId` and value is film object.
// Stores result at src/db/films-dictionary.json

const fs = require('fs');

const rawData = fs.readFileSync('./input/video_api.json');
const { data } = JSON.parse(rawData);
const films = Object.values(data.movies);
const dictionary = {};

films.forEach((film) => {
    dictionary[film.kp_id] = film;
});

const output = JSON.stringify(dictionary);

fs.writeFileSync('../src/db/films-dictionary.json', output);
