1. Lekéred a Visual Stúdió Code ban a ,, clone repository " gombra kattintva ! 
2. CMD megnyitása a "public-recept" mappában.
3. Py -m venv my-venv
4. my-venv\Scripts\activate
5. Vissza lépsz a cmd ben és be írod ezt a parancsot
6. 

``` batch
pip install -r requirements.txt
pip install pillow
cd frontend
npm install
npm run build

```
7. Vissza a "public-recept" mappába
```
py manage.py runserver

```