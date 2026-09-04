
let levelUp = document.getElementById("levelValue");
let xpP = document.getElementById("xpValue");

// Saved level
let currentLevel = Number(localStorage.getItem("developerLevel")) || 20;

// Saved XP
let currentXP = Number(localStorage.getItem("developerXP"));

if (isNaN(currentXP)) {
    currentXP = 950;
}

// Saved maximum XP
let maxXP = Number(localStorage.getItem("developerMaxXP")) || 1000;

levelUp.textContent = currentLevel;

xpP.textContent = currentXP + "/" + maxXP;

let missionBTN = document.querySelectorAll(".mission-btn");


missionBTN.forEach(function (button) {

    // Mission ka unique number
    let missionId = button.dataset.mission;

    // Agar missionId nahi hai to button ko identify karne ke liye
    // uska index use hoga
    if (!missionId) {
        missionId = Array.from(missionBTN).indexOf(button) + 1;
    }

    let missionCompleted = localStorage.getItem(
        "mission-" + missionId
    );

    if (missionCompleted === "true") {
        button.disabled = true;
    }

    button.addEventListener("click", function () {

        console.log("Mission complete");

        let rewardXP = Number(button.dataset.xp);

        currentXP += rewardXP;

        if (currentXP >= maxXP) {

            // Extra XP calculate
            let sub = currentXP - maxXP;

            // Extra XP save
            currentXP = sub;


            // Next level XP requirement
            maxXP += 500;


            // Level increase
            currentLevel += 1;

            levelUp.textContent = currentLevel;
        }

        xpP.textContent = currentXP + "/" + maxXP;

        localStorage.setItem(
            "developerLevel",
            currentLevel
        );

        localStorage.setItem(
            "developerXP",
            currentXP
        );

        localStorage.setItem(
            "developerMaxXP",
            maxXP
        );


        localStorage.setItem(
            "mission-" + missionId,
            "true"
        );
        button.disabled = true;

    });

});