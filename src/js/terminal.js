
const lines = [
    { text: "Cascadian Military Terminal V.2.0_35-M | Build 05192026-02a stable", pause_speed: 10 },
    { text: "Property of the Federal Government of Cascadia", pause_speed: 10 },
    { text: "" },
    { text: "[INFO|sys]: Initializing system", pause_speed: 950 },
    { text: "[INFO|sys]: Loading drivers", pause_speed: 550 },
    { text: "[INFO|sys]: Loading non-essential modules", pause_speed: 1750 },
    { text: "[INFO|sys]: OK (System passed basic integrity checks)" },

    { text: "" },
    { text: "USERNAME: ", pause_speed: 500, newline: false },
    { text: "menkent", typing_speed: 150, pause_speed: 150, cpt: 1 },
    { text: "PASSWORD: ", pause_speed: 400, newline: false },
    { text: "██████████████", typing_speed: 150, pause_speed: 145, cpt: 1 },
    { text: "" },

    { text: "[INFO|authnet]: Connecting", newline: false },
    { text: "....", typing_speed: 600, cpt: 1 },
    { text: "[INFO|authnet]: Verifying", newline: false },
    { text: ".....", typing_speed: 600, cpt: 1 },
    { text: "[INFO|authnet]: Authenticating", newline: false },
    { text: "........", typing_speed: 600, cpt: 1 },
    { text: "[INFO|authnet]: Authenticated (found a match). Welcome Menkent." },
    { text: "" },
    { text: "menkent$ A:/ ", pause_speed: 1000, newline: false },
    { text: "intro.html", typing_speed: 150, pause_speed: 750, cpt: 1 }
];
const output = document.getElementById("console");

let skipRequested = false;

function skipTerminal() {
    skipRequested = true;
    document.getElementById("skip-btn").style.display = "none";
}

function runTerminal(onDone) {
    let lineIndex = 0;
    let charIndex = 0;
    function type() {
        if (skipRequested) {
            // Dump all remaining text instantly
            for (let i = lineIndex; i < lines.length; i++) {
                const { text, newline } = lines[i];
                output.textContent += (i === lineIndex ? text.slice(charIndex) : text);
                if (newline !== false) output.textContent += "\n";
            }
            output.scrollTop = output.scrollHeight;
            onDone?.();
            return;
        }

        if (lineIndex >= lines.length) {
            document.getElementById("skip-btn").style.display = "none";
            onDone?.();
            return;
        }
        const { text, newline, typing_speed = 1, pause_speed = 1, cpt = 999 } = lines[lineIndex];
        if (charIndex < text.length) {
            output.textContent += text.slice(charIndex, charIndex + cpt);
            charIndex += cpt;
            setTimeout(type, typing_speed);
        } else {
            if (newline !== false) {
                output.textContent += "\n";
            }
            lineIndex++;
            charIndex = 0;
            setTimeout(type, pause_speed);
        }
        output.scrollTop = output.scrollHeight;
    }
    type();
}

runTerminal(() => {
    setTimeout(() => {
        document.getElementById("console").style.display = "none";
        document.getElementById("post-console").style.display = "block";
        document.getElementById("content").style.display = "block";
    }, 10);
});