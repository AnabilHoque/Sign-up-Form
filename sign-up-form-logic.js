function changeSunColour(colourString) {
    const sunSVG = document.querySelector("label svg.sun");
    for (let child of sunSVG.children) {
        if (child.getAttribute("stroke") !== null) {
            child.setAttribute("stroke", colourString);
        }
        if (child.getAttribute("fill") !== null) {
            child.setAttribute("fill", colourString);
        }
    }
}

function changeMoonColour(colourString) {
    const moonSVG = document.querySelector("label svg.moon");
    for (let child of moonSVG.children) {
        if (child.getAttribute("stroke") !== null) {
            child.setAttribute("stroke", colourString);
        }
        if (child.getAttribute("fill") !== null) {
            child.setAttribute("fill", colourString);
        }
    }
}

function setTheme() {
    const root = document.documentElement;
    const newTheme = root.className === "light" ? "dark" : "light";
    root.className = newTheme;
}

function run() {
    changeSunColour("white");
    changeMoonColour("black");
    const toggle = document.querySelector("#theme-toggle");
    toggle.addEventListener("change", setTheme);
}

run();