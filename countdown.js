function createCountdown(targetDate, targetTime, elementId, eventDurationMinutes) {
    // Kombiniere Datum und Uhrzeit in ein ISO-konformes Format
    const [day, month, year] = targetDate.split("/");
    const [hour, minute] = targetTime.split("/");
    
    // Erstelle das Datum im Format 'YYYY-MM-DDTHH:MM:SS'
    const isoDateString = `${year}-${month}-${day}T${hour}:${minute}:00`;
    const countdownDate = new Date(isoDateString).getTime();
    const outputElement = document.getElementById(elementId);
    
    // Dauer des Events in Millisekunden
    const eventDurationMs = eventDurationMinutes * 60 * 1000;
    let eventStarted = false;
    
    // Update-Funktion für den Countdown
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance > 0) {
            // Berechnung von Tagen, Stunden, Minuten und Sekunden
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Countdown anzeigen
            outputElement.innerText = `Startet in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else if (distance <= 0 && distance > -eventDurationMs) {
            // Countdown erreicht 0, Event läuft
            if (!eventStarted) {
                outputElement.classList.add('now');
                outputElement.classList.remove('countdown');
                outputElement.classList.add('countdown');
                eventStarted = true;
            }
            outputElement.innerText = 'Startet in: JETZT!';

        } else {
            // Event ist vorbei
            clearInterval(interval);
            outputElement.classList.remove('now');
            outputElement.classList.add('past');
            outputElement.innerText = "Event vorbei.";
            outputElement.classList.add('countdown');
        }
    }

    // Aktualisiere den Countdown jede Sekunde
    const interval = setInterval(updateCountdown, 1000);
}

// Starte einen Countdown, der am 29.09.2024 um 09:24 beginnt und 1 Minute dauert
//createCountdown('29/09/2024', '09/43', 'output-text-1', 1);
createCountdown('29/10/2024', '20/10', 'countdown-premium-test', 90);
createCountdown('24/12/2024', '12/00', 'countdown-weih24', 90);
createCountdown('24/12/2025', '12/00', 'countdown-weih25', 90);
