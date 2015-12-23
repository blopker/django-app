MAKEFLAGS=-j4

all:
ifndef VIRTUAL_ENV
	@echo "You need make and activate a virtualenv first:"
	@echo "make venv"
	@echo "source venv/bin/activate"
	@exit
else
	@$(MAKE) build
endif

build: pip npm
	./scripts/install_selenium.sh

pip:
	@pip install -r requirements/local.txt

npm:
	@npm install
	@npm run build

start:
	@PYTHONUNBUFFERED=1 honcho start

venv:
	@virtualenv --python=python3.5 venv

selenium:
	@java -jar tmp/selenium-server-standalone.jar

test:
	@py.test
	@npm test

clean:
	@rm -rf venv
	@rm -rf node_modules
	@rm -rf tmp

.PHONY: all start venv selenium test clean
