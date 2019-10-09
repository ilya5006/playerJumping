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
}

let jump = (player, force) =>
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

            player.bottom = player.bottom + speed;
        }, 10);
    });
}

let fall = (player, gravitation) =>
{
    let interval = setInterval(() =>
    {
        if (player.bottom <= 0)
        {
            player.bottom = 0;
            console.log(player.bottom);
            clearInterval(interval);
        }

        gravitation += 1.8;

        player.bottom = player.bottom - gravitation;

    }, 10);
}

let gravitation = 1.8;
let force = 150;

let player = new Player();

document.addEventListener('keydown', (event) =>
{
    if (event.keyCode == '38')
    {
        jump(player, force)
        .then(
            (result) => 
            {
                fall(player, gravitation);
            },
            (error) =>
            {
                console.log(error);
            }
        );
    }
});