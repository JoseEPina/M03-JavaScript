// function to generate a random numeric value
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    return value;
};

// New function to set up a name
var getPlayerName = function () {
    var name = '';
    // **ADD while LOOP HERE WITH PROMPT AND CONDITION**
    while (name === '' || name === null) {
        name = prompt("What is your robot's name?");
    }

    console.log("Your robot's name is " + name);
    return name;
};

/* Player object declaration */
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function () {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
        // console.log(this);
    },
    refillHealth: function () {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function () {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    },
};
// You can also log multiple values at once like this:
console.log(playerInfo.name, playerInfo.health, playerInfo.attack);

// array of enemy objects
var enemyInfo = [
    { name: 'Roborto', attack: randomNumber(10, 14) },
    { name: 'Android Amy', attack: randomNumber(10, 14) },
    { name: 'Robo Trumble', attack: randomNumber(10, 14) },
];

var fightOrSkip = function () {
    // Ask the player if they would like to fight or skip the fight.
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    // user this built-in method to force a lowercase response from the user ALWAYS
    promptFight = promptFight.toLowerCase();
    console.log(promptFight);
    // *Conditional Recursive Function Call here!* /
    // if the `promptFight` is NOT a valid value OR the correct word is not entered, THEN execute the following statements:
    if (!promptFight || (promptFight != 'fight' && promptFight != 'skip')) {
        window.alert('You need to provide a valid answer! Please try again.');
        return fightOrSkip();
    }
    // * */

    // If player chooses to skip, confirm and then stop the loop.
    if (promptFight === 'skip') {
        // Confirm player wants to skip
        var confirmSkip = window.confirm('Are you sure you want to quit?');

        // if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + ' has chosen to skip this fight! Goodbye!');
            // Subtract money from playerMoney for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            console.log('playerInfo.money is now $' + playerInfo.money + ' after choosing to skip.');

            // return true if player want to leave
            return true;
        }
    }
    return false;
};

var fight = function (enemy) {
    //console.log(enemy);
    // Repeat and execute as long as the enemy-robot is alive
    while (playerInfo.health > 0 && enemy.health > 0) {
        // ask the player if they'd like to fight or skin using the fightOrSkip function
        if (fightOrSkip()) {
            // if True, leave fight by breaking loop
            break;
        }
        // generate random damage value based on the player's attack power
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
        // Remove enemy's health by subtracting the amount set in the damage variable.
        enemy.health = Math.max(0, enemy.health - damage);
        // Log a resulting message to the console so we know that it worked.
        console.log(
            playerInfo.name +
                ' attacked ' +
                enemy.name +
                '. ' +
                enemy.name +
                ' now has ' +
                enemy.health +
                ' heath remaining.'
        );

        // check enemy's health
        if (enemy.health <= 0) {
            window.alert(enemy.name + ' has died!');

            // Award player money for winning!
            playerInfo.money = playerInfo.money + 20;
            console.log('playerInfo.money is now $' + playerInfo.money);

            // Leave while() loop since enemy is dead
            break;
        } else {
            window.alert(enemy.name + ' still has ' + enemy.health + ' health remaining.');
        }

        var damage = randomNumber(enemy.attack - 3, enemy.attack);

        // Remove player's health by subtracting the amount set in the enemy.attack variable.
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        // Log a resulting message to the console so we know that it worked.
        console.log(
            enemy.name +
                ' attacked ' +
                playerInfo.name +
                '. ' +
                playerInfo.name +
                ' now has ' +
                playerInfo.health +
                ' heath remaining.'
        );
        // check player's health
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + ' has died!');
            // Leave while() loop is player is dead
            break;
        } else {
            window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health remaining.');
        }
    }
};

// function to start a new game
var startGame = function () {
    //reset player stats
    playerInfo.reset();

    // fight each enemy robot by looping over them and fighting them one at a time
    for (var i = 0; i < enemyInfo.length; i++) {
        // Alert the players that they are starting a round.
        // IF player is still alive, keep fighting
        if (playerInfo.health > 0) {
            // Let player know what round they are in, remember that array start at 0 so it needs to have 1 added to it.
            window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));
            // Use Debugger to pause scrip from running and check what's happening at that moment in the code
            //debugger;
            // Pick new enemy to fight based on the index of the enemyInfo object array
            var pickedEnemyObj = enemyInfo[i];
            // Reset enemy.health before starting new fight
            pickedEnemyObj.health = randomNumber(40, 60);

            // Pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemy.name parameter.
            fight(pickedEnemyObj);

            // if player is still alive and we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
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
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + '.');
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
        'Would you like to REFILL your health, UPGRADE your attack or LEAVE the store? Please enter 1 for REFILL, 2 for UPGRADE or 3 to LEAVE.'
    );

    // built-in function to convert string number into a integer number      
    shopOptionPrompt = parseInt(shopOptionPrompt);

    // use switch to carry out the action
    debugger;
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
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
