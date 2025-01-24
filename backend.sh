cd backend
echo "Starting Django backend server..."
python.exe -m pip install --upgrade pip
git lfs install
git lfs pull
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
