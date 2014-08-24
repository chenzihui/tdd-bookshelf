test:
	NODE_ENV=test ./node_modules/.bin/mocha --reporter spec test/**/*_spec.js

.PHONY: test
