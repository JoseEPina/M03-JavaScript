var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// You can also log multiple values at once like this:
console.log(playerName, playerHealth, playerAttack);

var enemyNames = ['Roborto', 'Android Amy', 'Robo Trumble'];
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

// function to start a new game
var startGame = function () {
    debugger;

    //reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    // fight each enemy robot by looping over them and fighting them one at a time
    for (var i = 0; i < enemyNames.length; i++) {
        // Alert the players that they are starting a round.
        // IF player is still alive, keep fighting
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

            // if player is still alive and we're not at the last enemy in the array
            if (playerHealth > 0 && i < enemyNames.length - 1) {
                // ask if player wants to use the store before the next round
                var storeConfirm = window.confirm(
                    'The fight is over. Would you like to visit the store before the next round?'
                );

                // if yes, take the player to the store() function
                if (storeConfirm) {
                    shop();
                }
            }
        } else {
            window.alert('You have lost your robot in battle! Game Over!');
            break;
        }
    }

    // after the loop ends, player is either out of health or enemies to fight, so run the endGame function.
    endGame();
};
// fight();

// function to end the entire game
var endGame = function () {
    // if the player is still alive, player wins!
    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + '.');
    } else {
        window.alert("You've lost your robot in battle.");
    }
    // ask player if they'd like to play again
    var playAgainConfirm = window.confirm('Would you like to play again?');

    if (playAgainConfirm) {
        // restart the game
        startGame();
    } else {
        window.alert('Thank you for playing Robot Gladiators! Come back soon!');
    }
};

var shop = function () {
    // ask the player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE' or 'LEAVE' to make a choice."
    );

    // use switch to carry out the action
    switch (shopOptionPrompt) {
        case 'REFILL': // new case for UPPERcase
        case 'refill':
            if (playerMoney >= 7) {
                window.alert("Refilling player's health by 20 for 7 dollars.");

                // increase health and decrease money
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
            } else {
                window.alert("You don't have enough money!");
            }
            break;
        case 'UPGRADE': // new case for UPPERcase
        case 'upgrade':
            if (playerMoney >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars.");

                // increase attack and decrease money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            } else {
                window.alert("You don't have enough money!");
            }
            break;
        case 'LEAVE': // new case for UPPERcase
        case 'leave':
            window.alert('Leaving the store.');

            // do nothing, so the function will end
            break;
        default:
            window.alert('You did not pick a valid option. Try again.');

            // call shop() again to force player to pick a valid option
            shop();
            break;
    }
};

// start the game when the page loads
startGame();
