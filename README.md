1. Lekéred a Visual Stúdió Code ban a ,, clone repository " gombra kattintva ! 
2. CMD megnyitása a "public-recept" mappában.
3. Virtuális környezet létrehozása : 
``` batch
 Py -m venv my-venv
 my-venv\Scripts\activate
```
4.  requirements.txt - ben felsorolt fájlok telepítése (pl:django) : 
``` batch
pip install -r requirements.txt
```
5. React telepítése : 
``` batch
cd frontend
npm install
npm run build
```
6. Visszalépés és a szerver indítása : 
``` batch
py manage.py runserver
```