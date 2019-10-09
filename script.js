class Player 
{
    constructor()
    {
        this.element = document.querySelector('#player');
        this.element.style.bottom = '0px';
        this.element.style.left = '500px';
    }

    set bottom(value)
    {
        this.element.style.bottom = value + 'px'; 
    }

    get bottom()
    {
        return parseFloat(this.element.style.bottom);
    }

    set right(value)
    {
        this.element.style.right = value + 'px';
    }

    get right()
    {
        return parseFloat(this.element.style.right);
    }

    set left(value)
    {
        this.element.style.left = value + 'px';
    }

    get left()
    {
        return parseFloat(this.element.style.left);
    }

    jump(force)
    {
        return new Promise((resolve, reject) =>
        {
            let speed = force / 10;
            let interval = setInterval(() =>
            {
                if (player.bottom >= force)
                {
                    player.bottom = force;
                    clearInterval(interval);
                    resolve();
                }

                player.bottom += speed;
            }, 10);
        });
    }

    fall(gravitation)
    {
        return new Promise((resolve, reject) =>
        {
            let interval = setInterval(() =>
            {
                if (this.bottom <= 0)
                {
                    clearInterval(interval);
                    resolve();
                }
        
                gravitation += 1.8;
        
                this.bottom = (this.bottom - gravitation).toFixed(2);
            }, 10);
        });
    }

    moveRight(speed)
    {
        let path = this.left + speed * 10;
        let i = speed;
        let interval = setInterval(() =>
        {
            if (this.left >= path)
            {
                clearInterval(interval);
            }
            this.left += i;
        }, 10);
    }

    moveLeft(speed)
    {
        let path = this.left - speed * 10;
        let i = speed;
        let interval = setInterval(() =>
        {
            if (this.left <= path)
            {
                clearInterval(interval);
            }
            this.left -= i;
        }, 10);
    }
}

let gravitation = 1.8;
let force = 200;
let speed = 5;

let player = new Player();

document.addEventListener('keydown', (event) =>
{
    switch (event.keyCode)
    {
        case 38: // Top
            player.jump(force)
            .then(
                () => 
                {
                    player.fall(gravitation).then(() => { player.bottom = 0; });
                }
            );
            break;

        case 37: // Left
            player.moveLeft(speed);
            break;
        
        case 39: // Right
            player.moveRight(speed);
            break;
    }
});