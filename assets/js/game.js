// Alert the players that they are starting a round.
window.alert('Welcome to Robot Gladiators!');

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// You can also log multiple values at once like this:
console.log(playerName, playerHealth, playerAttack);

var enemyNames = ['Roborto', 'Amy Android', 'Robo Trumble'];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function (enemyName) {
    // Repeat this code and execute as long as the enemy-robot is alive
    while (playerHealth > 0 && enemyHealth > 0) {
        // Ask the player if they would like to fight or skip the fight.
        var promptFight = window.prompt(
            "Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose."
        );
        console.log(promptFight);

        // If player chooses to skip, confirm and then stop the loop.
        if (promptFight === 'skip' || promptFight === 'SKIP') {
            // Confirm player wants to skip
            var confirmSkip = window.confirm('Are you sure you want to quit?');

            // if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerName + ' has chosen to skip this fight! Goodbye!');
                // Subtract money from playerMoney for skipping
                playerMoney = playerMoney - 10;
                console.log('playerMoney', playerMoney);
                break;
            }
        }

        // if player choses to fight, then fight
        if (promptFight === 'fight' || promptFight === 'FIGHT') {
            // Remove enemy's health by subtracting the amount set in the playerAttack variable.
            enemyHealth = enemyHealth - playerAttack;
            // Log a resulting message to the console so we know that it worked.
            console.log(
                playerName +
                    ' attacked ' +
                    enemyName +
                    '. ' +
                    enemyName +
                    ' now has ' +
                    enemyHealth +
                    ' heath remaining.'
            );

            // check enemy's health
            if (enemyHealth <= 0) {
                window.alert(enemyName + ' has died!');

                // Award player money for winning!
                playerMoney = playerMoney + 20;
                console.log(playerMoney);

                // Leave while() loop since enemy is dead
                break;
            } else {
                window.alert(enemyName + ' still has ' + enemyHealth + ' health remaining.');
            }

            // Remove player's health by subtracting the amount set in the enemyAttack variable.
            playerHealth = playerHealth - enemyAttack;
            // Log a resulting message to the console so we know that it worked.
            console.log(
                enemyName +
                    ' attacked ' +
                    playerName +
                    '. ' +
                    playerName +
                    ' now has ' +
                    playerHealth +
                    ' heath remaining.'
            );
            // check player's health
            if (playerHealth <= 0) {
                window.alert(playerName + ' has died!');
                // Leave while() loop is player is dead
                break;
            } else {
                window.alert(playerName + ' still has ' + playerHealth + ' health remaining.');
            }
        } else {
            window.alert('You need to choose a valid option. Try again!');
        }
    }
};

for (var i = 0; i < enemyNames.length; i++) {
    // call fight function with enemy-robot
    var pickedEnemyName = enemyNames[i];
    enemyHealth = 50;
    fight(pickedEnemyName);
}

// fight();
