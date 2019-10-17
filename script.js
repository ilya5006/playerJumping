class Player 
{
    /**
     * RU
     * Конструктор, который создаёт персонажа
     * @constructor
     */
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

    /**
     * RU
     * Метод перемещает персонажа вверх в соответствии с силой, которую прилагает
     * @param {number} force - Сила, которую прилагает персонаж для прыжка 
     * 
     */
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

    /**
     * RU
     * Метод перемещает персонажа вниз после прыжка в соответствии с гравитацией, которая действует на неё
     * @param {number} gravitation - Гравитация, которая действует на персонажа. В зависимости от неё, персонаж будет падать либо сильнее, либо медленнее
     * 
     */
    fall(gravitation)
    {
        let defaultGravitation = gravitation;
        document.removeEventListener('keydown', buttonClickTopTracking);
        return new Promise((resolve, reject) =>
        {
            let interval = setInterval(() =>
            {
                if (this.bottom <= 0)
                {
                    document.addEventListener('keydown', buttonClickTopTracking);
                    clearInterval(interval);
                    resolve();
                }
        
                gravitation += defaultGravitation;
        
                this.bottom = (this.bottom - gravitation).toFixed(2);
            }, 10);
        });
    }

    /**
     * RU
     * Метод перемещает персонажа вправо в соответствии со скоростью
     * @param {number} speed - Скорость, с которй персонаж двигается
     * 
     */
    moveRight(speed)
    {
        document.removeEventListener('keydown', buttonClickLeftAndRightTracking);
        let path = this.left + speed * 10;
        let i = speed;
        let interval = setInterval(() =>
        {
            if (this.left >= path)
            {
                document.addEventListener('keydown', buttonClickLeftAndRightTracking);
                clearInterval(interval);
            }
            this.left += i;
        }, 10);
    }

    /**
     * RU
     * Метод перемещает персонажа влево в соответствии со скоростью
     * @param {number} speed - Скорость, с которй персонаж двигается
     * 
     */
    moveLeft(speed)
    {
        document.removeEventListener('keydown', buttonClickLeftAndRightTracking);
        let path = this.left - speed * 10;
        let i = speed;
        let interval = setInterval(() =>
        {
            if (this.left <= path)
            {
                document.addEventListener('keydown', buttonClickLeftAndRightTracking);
                clearInterval(interval);
            }
            this.left -= i;
        }, 10);
    }
}

class Platform
{
    /**
     * RU
     * Конструктор, который создаёт платформу
     * @constructor
     * 
     */
    constructor(height, width, bottom, left, color)
    {
        this.element = document.createElement('div');

        this.element.style.border = `2px solid ${color}`;
        this.bottom = bottom;
        this.left = left;
        this.width = width;
        this.height = height;
        this.element.style.position = 'absolute';

        document.querySelector('body').insertAdjacentElement('afterBegin', this.element);
    }

    set width(value)
    {
        this.element.style.width = value + 'px'; 
    }

    get width()
    {
        return parseFloat(this.element.style.width);
    }

    set height(value)
    {
        this.element.style.height = value + 'px'; 
    }

    get height()
    {
        return parseFloat(this.element.style.height);
    }

    set bottom(value)
    {
        this.element.style.bottom = value + 'px'; 
    }

    get bottom()
    {
        return parseFloat(this.element.style.bottom);
    }

    set left(value)
    {
        this.element.style.left = value + 'px';
    }

    get left()
    {
        return parseFloat(this.element.style.left);
    }
}

// let gravitation = 1.8;
// let force = 200;
// let speed = 10;

let gravitation = 1.8;
let force = 350;
let speed = 45;
let overclock = 0;

let player = new Player();
let platformGreen = new Platform(50, 200, 60, 80, 'green');
let platformYelllow = new Platform();

let buttonClickLeftAndRightTracking = (event) =>
{
    switch (event.keyCode)
    {
        case 37: // Left
            overclock++;
            player.moveLeft(speed);
            break;
        
        case 39: // Right
            overclock++;
            player.moveRight(speed);
            break;
    }
}

let buttonClickTopTracking = (event) =>
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
    }
}

document.addEventListener('keydown', buttonClickLeftAndRightTracking);
document.addEventListener('keydown', buttonClickTopTracking);