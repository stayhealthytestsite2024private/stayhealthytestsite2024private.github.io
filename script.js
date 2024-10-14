// Set the date for Christmas (25th December of the current year)
const christmasDate = new Date(new Date().getFullYear(), 11, 25, 0, 0, 0).getTime();
const countdownElement = document.getElementById("countdown");
const messageElement = document.getElementById("message");
const bgMusic = document.getElementById("bg-music");
const audioSource = document.getElementById("audio-source");

// Update the countdown every second
const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = christmasDate - now;

    // Time calculations for days, hours, minutes, and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the countdown
    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;

    // When the countdown reaches Christmas day
    if (distance < 0) {
        clearInterval(countdownInterval);
        countdownElement.classList.add("finished");
        
        // Change the design for Christmas day
        document.body.classList.add("christmas");

        // Show Christmas message
        messageElement.innerText = "Merry Christmas! 🎄🎅🎁";
        
        // Change background music to the Christmas song
        audioSource.src = "christ.mp3";
        bgMusic.load(); // Reload the audio element with the new source
        bgMusic.play();
    }
}, 1000);
