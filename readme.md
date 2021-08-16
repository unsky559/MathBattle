# MathBattle
A multiplayer math game. Main goal is to get a more points than your opponent. An example randomly generate and show to all players at the same time. If somebody solve current example will get a point and server generate a new example. 

I started this project at october 2018 for train math skills with my friends before exams. So, now I go back to this and I want to refactor it and add some new cool features.

If you find a bug, has a question or has an enhancement idea, feel free to open a new issue.

## Usage
**For now this project does not has a web host.** But, you can always run it localy. 

``` 
git clone https://github.com/unsky559/MathBattle
```

After cloning go to project folder and run a [node.js](https://nodejs.org/) server

``` 
node app.js 
```

This will run a local server on *2000* port. If you want to change it go to *app.js* file and change ```var port = 2000``` to any unused value.

## How to play
Connect to the server (you can connect via localhost or util like [ngrok](https://ngrok.com/) for temporary host it online)

Wait while all players connect to and choose a nickname.

Start solve examples. You can input answers using your keyboard and submit it with *Enter*

The first who get a **100** score points is winning a game


