const should = require('should');

const zapier = require('zapier-platform-core');

// Use this to make test calls into your app:
const App = require('../index');
const appTester = zapier.createAppTester(App);

describe('Mappify', () => {

    describe('basic functionality', () => {

        it('should load addresses', (done) => {

            const bundle = { inputData: { streetAddress: '252 botany road' } };

            appTester(App.searches.address.operation.perform, bundle)
            .then((results) => {

                should(Array.isArray(results)).eql(true);
                done();
            })
            .catch(done);
        });

        it('should format addresses correctly', (done) => {

            const bundle = { inputData: { streetAddress: '252 botany road' } };

            appTester(App.searches.address.operation.perform, bundle)
            .then((results) => {

                const firstResult = results[0];

                should(firstResult.hasOwnProperty('buildingName')).eql(true);
                should(firstResult.hasOwnProperty('flatNumberPrefix')).eql(true);
                should(firstResult.hasOwnProperty('flatNumber')).eql(true);
                should(firstResult.hasOwnProperty('flatNumberSuffix')).eql(true);
                should(firstResult.hasOwnProperty('levelNumber')).eql(true);
                should(firstResult.hasOwnProperty('numberFirst')).eql(true);
                should(firstResult.hasOwnProperty('numberFirstPrefix')).eql(true);
                should(firstResult.hasOwnProperty('numberFirstSuffix')).eql(true);
                should(firstResult.hasOwnProperty('numberLast')).eql(true);
                should(firstResult.hasOwnProperty('numberLastPrefix')).eql(true);
                should(firstResult.hasOwnProperty('numberLastSuffix')).eql(true);
                should(firstResult.hasOwnProperty('streetName')).eql(true);
                should(firstResult.hasOwnProperty('streetType')).eql(true);
                should(firstResult.hasOwnProperty('streetSuffixCode')).eql(true);
                should(firstResult.hasOwnProperty('suburb')).eql(true);
                should(firstResult.hasOwnProperty('state')).eql(true);
                should(firstResult.hasOwnProperty('postCode')).eql(true);
                should(firstResult.hasOwnProperty('streetAddress')).eql(true);
                should(firstResult.hasOwnProperty('lat')).eql(true);
                should(firstResult.hasOwnProperty('lon')).eql(true);

                done();
            })
            .catch(done);
        });
    });
});
