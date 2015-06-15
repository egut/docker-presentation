node_modules:
	npm install

app/components:
	bower install

.PHONY: install
install: node_modules app/components

.PHONY: start
start:
	npm start

.PHONY: test
test:
	npm test

.PHONY: start-production
start-production:
	grunt release
	NODE_ENV=production npm start

.PHONY: release
release: install
	grunt release

.PHONY: build
build: release
	(cd dist && rm -rf node_modules && npm install --production)

package.tgz: build
	(cd dist && tar czf ../package.tgz *)

.PHONY: package
package: package.tgz

.PHONY: clean
clean:
	rm -rf dist
	rm -f *.tgz
	rm -rf node_modules app/assets/components/*
