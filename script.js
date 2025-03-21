let healthBarValue = 5;
let maxHealthBarValue = 5;

const animalHealthConfig = {
    Chevre: 1,
    Cochon: 2,
    Chat: 3,
    Poule: 4,
    Chien: 5,
    Loup: 6,
    Vache: 7,
    Singe: 8
};

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const animalNameElement = document.getElementById('animal-name');
    const scoreElement = document.getElementById('score');
    const healthBarElement = document.getElementById('health-bar');

    // Initial update
    updateAnimalName();
    healthBarElement.style.width = '100%'; // Set initial width to 100%

    // Example of changing the active slide (you need to implement the logic for changing slides)
    slides.forEach(slide => {
        slide.addEventListener('click', function() {
            slides.forEach(s => s.classList.remove('active'));
            this.classList.add('active');
            updateAnimalName();
            updateHealthBarValues();
        });
    });
});

function updateAnimalName() {
    const activeSlide = document.querySelector('.slide.active');
    if (activeSlide) {
        const animalName = activeSlide.getAttribute('data-name');
        const animalNameElement = document.getElementById('animal-name');
        animalNameElement.textContent = animalName;
    }
}

function getActiveAnimalName() {
    const activeSlide = document.querySelector('.slide.active');
    return activeSlide ? activeSlide.getAttribute('data-name') : '';
}

function updateHealthBar(value) {
    healthBarValue = Math.max(0, healthBarValue - value);
    const healthBarElement = document.getElementById('health-bar');
    const healthBarPercentage = (healthBarValue / maxHealthBarValue) * 100;
    healthBarElement.style.width = healthBarPercentage + '%';
    if (healthBarValue === 0) {
        changeAnimal();
    }
}

function updateHealthBarValues() {
    const activeAnimalName = getActiveAnimalName();
    if (animalHealthConfig[activeAnimalName]) {
        maxHealthBarValue = animalHealthConfig[activeAnimalName];
        healthBarValue = maxHealthBarValue;
        const healthBarElement = document.getElementById('health-bar');
        healthBarElement.style.width = '100%';
    }
}

function changeAnimal() {
    const slides = document.querySelectorAll('.slide');
    const activeSlide = document.querySelector('.slide.active');
    let nextSlide = activeSlide.nextElementSibling;
    if (!nextSlide || !nextSlide.classList.contains('slide')) {
        nextSlide = slides[0];
    }
    activeSlide.classList.remove('active');
    nextSlide.classList.add('active');
    updateAnimalName();
    updateHealthBarValues();
}

// more documentation available at
// https://github.com/tensorflow/tfjs-models/tree/master/speech-commands

// the link to your model provided by Teachable Machine export panel
const URL = "http://127.0.0.1:5501/my_model/";

async function createModel() {
    const checkpointURL = URL + "model.json"; // model topology
    const metadataURL = URL + "metadata.json"; // model metadata

    const recognizer = speechCommands.create(
        "BROWSER_FFT", // fourier transform type, not useful to change
        undefined, // speech commands vocabulary feature, not useful for your models
        checkpointURL,
        metadataURL);

    // check that model and metadata are loaded via HTTPS requests.
    await recognizer.ensureModelLoaded();

    return recognizer;
}

async function init() {
    const recognizer = await createModel();
    const classLabels = recognizer.wordLabels(); // get class labels
    const labelContainer = document.getElementById("label-container");
    const scoreElement = document.getElementById('score');

    for (let i = 0; i < classLabels.length; i++) {
        labelContainer.appendChild(document.createElement("div"));
    }

    recognizer.listen(result => {
        const scores = result.scores; // probability of prediction for each class
        const activeAnimalName = getActiveAnimalName();
        let activeAnimalScore = 0;

        console.log('Scores:', scores);
        console.log('Active Animal Name:', activeAnimalName);

        // render the probability scores per class
        for (let i = 0; i < classLabels.length; i++) {
            const classPrediction = classLabels[i] + ": " + result.scores[i].toFixed(2);
            labelContainer.childNodes[i].innerHTML = classPrediction;

            if (classLabels[i] === activeAnimalName) {
                activeAnimalScore = result.scores[i];
            }
        }

        // Update the score element with the percentage of the active animal
        const scorePercentage = (activeAnimalScore * 2).toFixed(2); // Multiplied by 2 instead of 10
        scoreElement.textContent = scorePercentage + '%';
        console.log('Active Animal Score:', activeAnimalScore);

        // Update the health bar
        updateHealthBar(parseFloat(scorePercentage));
    }, {
        includeSpectrogram: true, // in case listen should return result.spectrogram
        probabilityThreshold: 0.5, // Increased threshold for better accuracy
        invokeCallbackOnNoiseAndUnknown: true,
        overlapFactor: 0.75 // Increased overlap factor for more frequent updates
    });

    // Stop the recognition in 5 seconds.
    // setTimeout(() => recognizer.stopListening(), 5000);
}