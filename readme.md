# MathBattle
A multiplayer math game. Main goal is to get a more points than your opponent. An example randomly generate and show to all players at the same time. If somebody solve current example will get a point and server generate a new example. 

I started this project at october 2018 for train math skills with my friends before exams. So, now I go back to this and I want to refactor it and add some new cool features.

If you find a bug, has a question or has an enhancement idea, feel free to open a new issue.

## Usage
**For now this project does not have a web host.** But, you can always run it locally. 

```shell
git clone https://github.com/unsky559/MathBattle
```

### Dependencies

- nodejs
- mongodb server

After cloning go to project folder and run a [node.js](https://nodejs.org/) server

```shell
npm run start
```

That will build frontend part to ```dist``` folder and run a local node.js server on *3000* port.

*note: the first run may take more time because of installing dependencies*

## How to play
Connect to the server (you can connect via localhost or util like [ngrok](https://ngrok.com/) for temporary host it online)

Wait while all players connect to and choose a username.

Start solve examples. You can input answers using your keyboard and submit it with *Enter*

The first who get a **100** score points is winning a game

## Develop *with comfort*

To run both webpack and node js server you need to run two different npm commands in separate terminals.

1. Run webpack watch server:
```shell
npm run front-watch
```
2. In separate terminal run node.js watch server:
```shell
npm run back-watch
```
3. Develop. Your back and front-end will build automatically after you make any changes.
