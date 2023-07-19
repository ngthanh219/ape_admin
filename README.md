### APE ADMIN
## Build server
# Install nodejs
	+ sudo apt install nodejs
	+ sudo apt install npm

# Config env
	+ cp .env.example .env
	+ Change keys:
		- APP_URL
		- ENVIRONMENT
		- DEV_APE_URL
		- APE_URL

# Config bower
	+ npm install
	+ npm install -g bower
	+ bower init
	+ cd public
    + bower install https://github.com/ngthanh219/AdminLTE.git

# Config webpack (unnecessary)
	+ npm install laravel-mix@latest --save-dev
	+ npm run dev (npm run watch) for build js from resourses folder to public folder

# Install and deploy docker
	+ sudo apt install docker
	+ sudo apt install docker-compose
	+ docker-compose up -d --build

# Config file in docker
	+ docker exec -it ape_app bash
	+ composer install
	+ sudo chmod -R 777 storage
	+ php artisan optimize