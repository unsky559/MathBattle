# MathBattle
![repository-open-graph-template](https://user-images.githubusercontent.com/33353900/147120951-d595beaa-661f-4a13-b1a7-e9d129373b73.jpg)
A multiplayer math game. Main goal is to get a more points than your opponent. An example randomly generate and show to all players at the same time. If somebody solve current example will get a point and server generate a new example. 

I started this project at october 2018 for train math skills with my friends before exams. So, now I go back to this and I want to refactor it and add some new cool features.

If you find a bug, has a question or has an enhancement idea, feel free to open a new issue.

Thanks for collaboration to @IamBogdan

## Usage
**For now this project does not have a web host.** But, you can always run it locally. 

```shell
git clone https://github.com/unsky559/MathBattle
```
Go to project root folder and install required packages
```shell
npm i
```
### Dependencies

Also make sure you have installed next applications on your machine:

- [nodejs](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [mongodb server](https://www.mongodb.com/)

To build project and run a node server use

```shell
npm run start
```

That will build frontend part to ```back/dist``` folder and run a local node.js server on *3000* port.

*note: the first run may take more time because of installing dependencies*

## How to play
Connect to the server (you can connect via localhost or util like [ngrok](https://ngrok.com/) for temporary host it online)

## Develop *with comfort*

Consider two cases:

### 1. Just back-end develop

In this case you don't need to constantly watch for frontend files update. So it will be enough to build the front files once and watch only the backend updates.

```shell
npm run build -w client && npm run watch -w back
```
> **note:** in some OS you may need put ```&&``` in double quotes: ```"&&"```

### 2. Both front-end and back-end develop

To run both webpack watcher and node js server you need to run two different npm commands in separate terminals.

To run webpack watch server:
```shell
npm run watch -w client 
```
To run node watch server:
```shell
npm run watch -w back
```

### 3. Just front-end develop

The second case is actually covers this one, but if you still don't want to track changes to the server files, replace the second command with
```shell
npm run watch -w back
```
*And run webpack watch server:*
```shell
npm run watch -w client 
```
