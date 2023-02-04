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
    // Alert the players that they are starting a round.
    if (playerHealth > 0) {
        // Let player know what round they are in, remember that array start at 0 so it needs to have 1 added to it.
        window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));
        // Pick new enemy to fight based on the index of the enemyNames array
        var pickedEnemyName = enemyNames[i];
        // Reset enemyHealth before starting new fight
        enemyHealth = 50;

        // Use Debugger to pause scrip from running and check what's happening at that moment in the code
        // debugger;

        // Pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter.
        fight(pickedEnemyName);
    } else {
        window.alert('You have lost your robot in battle! Game Over!');
        break;
    }
}
// fight();
