1. Szükséges programok a Receptkönyv projekt futtatásához :
``` batch
- Node.js  Letöltés : https://nodejs.org/en/download/
- VS Code  Letöltés : https://code.visualstudio.com/download
- Python   Letöltés : https://www.python.org/downloads/
- Git      Letöltés : https://git-scm.com/downloads/win
```
2. Lekéred a Visual Stúdió Code ban a ,, clone repository " gombra kattintva ! 
3. CMD megnyitása a "public-recept" mappában.
4. Virtuális környezet létrehozása : 
``` batch
 Py -m venv my-venv
 my-venv\Scripts\activate
```
5.  requirements.txt - ben felsorolt fájlok telepítése (pl:django) : 
``` batch
pip install -r requirements.txt
```
6. React telepítése : 
``` batch
cd frontend
npm install
npm run build
```
7. Visszalépés és a szerver indítása : 
``` batch
cd..
```
``` batch
py manage.py runserver
```