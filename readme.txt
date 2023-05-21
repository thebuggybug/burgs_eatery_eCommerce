					Pre-Requisite



>> node version above 16 should be installed in system
>> python version above 3.1 should be installed in system




Steps to run :

1) Open terminal (cmd) change directory to "venv" and execute following:
			cd Scripts
				activate

2) Go to backend folder, open terminal and execute following:
			python manage.py migrate
				python manage.py create superuser
					(fill all details and create superuser)
						python manage.py runserver
	
	Go to browser and run: http://localhost:800
		login with the superuser credentials
			add some products

3) Go to frontend folder, open terminal and execute :
		npm install
			npm start



	NOTE: If somehow, server fails to open, terminate session and re-run these process:
	
			python manage.py runserver
				npm start