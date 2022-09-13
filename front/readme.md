# MathBattle Client

Here we have a source frontend files. 
This client will compile to **dist** folder in root. 
The **dist** folder is only thing that client can download. Make sure that **dist** folder **will never commit to git**.

#### To compile use:
```
mathBattle\src> npm run build:prod
```
or to build in develop mode:
```
mathBattle\src> npm run build
```

#### To run dev server use:
```
mathBattle\src> npm run serve
```
or to serve in prod mode (slower):
```
mathBattle\src> npm run serve:prod
```

#### You can run config test using:
```
mathBattle\src> npm run test
```
