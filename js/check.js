//random speed setting function
function setSpeed() {
    return Math.random * (300 - 150) + 150;
}

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = setSpeed();
    this.boxY = this.y + 77;
    this.bWidth = 100;
    this.bHeight = 70;
    this.hitbox = {
        x : this.x,
        y : this.y,
        width : this.bWidth,
        height : this.bHeight
    };
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 500) {
        this.x = 0;
        this.speed = setSpeed();
    }
    this.x += dt*this.speed;
    this.makeHitbox();
    return this.x;
};

//updates the box around the enemy
Enemy.prototype.makeHitbox = function(){
    this.hitbox.x = this.x;
    this.hitbox.y = this.y + 77;
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    var rX = this.hitbox.x;
    var rY = this.y + 77;
    var rWidth = this.bWidth;
    var rHeight = this.bHeight;
};



// Now write your own player class

var Player = function() {
    this.sprite = 'images/char-cat-girl.png';
    this.x = 200;
    this.y = 400;
    this.bWidth = 65;
    this.bHeight = 80;
    this.boxX = this.x + 18;
    this.boxY = this.y + 60;
};
// This class requires an update(), render() and

Player.prototype.render  = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//function that resets player to original spot
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
}

Player.prototype.update = function(dt) {

    if (this.y < -50) {
        
        this.reset();

        //make a function to display success
    }
    if (this.x < 0)
        this.x = 0;

    else if (this.x > 400)
        this.x = 400;

    this.checkcollision();
};

//function to check collisions between the enemy and player
Player.prototype.checkcollision = function() {
    var player = {
        x : this.boxX,
        y : this.boxY,
        width : this.bWidth,
        height : this.bHeight
    };
    for(var i = 0; i < allEnemies.length; i++){
        var rect1 = player;
        var rect2 = allEnemies[i].hitbox;
        //to check for collisions
        if (rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.height + rect1.y > rect2.y) {
            // collision detected!
            //rest and remove a life
            //lives--;
            //$('#lifeOutput').html("<h1>"+lives+"<h1>");
            this.render();
            this.reset();
            //if the player has no lives, end game:
            //if(lives === 0){
            //    $('#canvasContainer').empty();
            //    $('#canvasContainer').append('<img src="put pic">');
            //}
        }
    }
}

// a handleInput() method.

Player.prototype.handleInput = function(keys) {
    switch (keys) {
        case 'right' : 
            this.x += 100;
            break;
        case 'left' :
            this.x -= 100;
            break;
        case 'up' :
            this.y -= 90;
            break;
        case 'down' :
            this.y += 90;
            break;
    }

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy(0, 225);
var enemy2 = new Enemy(150, 150);
var enemy3 = new Enemy(10, 60);
var allEnemies = [enemy1, enemy2, enemy3];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});