var testContext = require.context('../tests', true, /^-spec$/);
testContext.keys().forEach(testContext);