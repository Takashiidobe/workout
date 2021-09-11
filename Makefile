all:
	which server && serve site/
deploy:
	ntl deploy --prod
