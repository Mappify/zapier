module.exports = {
    key: 'address',

    // You'll want to provide some helpful display labels and descriptions
    // for users. Zapier will put them into the UX.
    noun: 'Address',
    display: {
        label: 'Find an Address',
        description: 'Search for a valid Australian address'
    },

    // `operation` is where we make the call to your API to do the search
    operation: {
        // This search only has one search field. Your searches might have just one, or many
        // search fields.
        inputFields: [
            {
                key: 'streetAddress',
                type: 'string',
                label: 'Street Address',
                helpText: 'Enter an address (e.g. A39, 252 botany road).'
            }
        ],

        perform: (z, bundle) => {
            const url = 'https://mappify.io/api/rest/address/autocomplete';

            // Put the search value in a query param. The details of how to build
            // a search URL will depend on how your API works.
            const options = {
                params: {
                    streetAddress: bundle.inputData.streetAddress
                }
            };

            return z.request(url, options)
            .then(response => {
                return JSON.parse(response.content)
                .result
                .map((addressRecord) => {

                    addressRecord.lat = addressRecord.location.lat;
                    addressRecord.lon = addressRecord.location.lon;
                    delete addressRecord.location;
                    return addressRecord;
                });
            });
        },

        // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
        // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
        // returned records, and have obviously dummy values that we can show to any user.
        sample:  {
            buildingName: null,
            flatNumberPrefix: 'A',
            flatNumber: 37,
            flatNumberSuffix: null,
            levelNumber: null,
            numberFirst: 252,
            numberFirstPrefix: null,
            numberFirstSuffix: null,
            numberLast: null,
            numberLastPrefix: null,
            numberLastSuffix: null,
            streetName: 'BOTANY',
            streetType: 'ROAD',
            streetSuffixCode: null,
            suburb: 'ALEXANDRIA',
            state: 'NSW',
            postCode: '2015',
            lat: -33.90295095,
            lon: 151.20153109,
            streetAddress: 'UNIT A37, 252 BOTANY ROAD, ALEXANDRIA NSW 2015'
        },

        // If the resource can have fields that are custom on a per-user basis, define a function to fetch the custom
        // field definitions. The result will be used to augment the sample.
        //   outputFields: () => [{ key: 'abc' }]
        // Alternatively, a static field definition should be provided, to specify labels for the fields
        outputFields: [
            { key: 'buildingName', label: 'Building Name' },
            { key: 'flatNumberPrefix', label: 'Flat Number Prefix' },
            { key: 'flatNumber', label: 'Flat Number' },
            { key: 'flatNumberSuffix', label: 'Flat Number Suffix' },
            { key: 'levelNumber', label: 'Level Number' },
            { key: 'numberFirst', label: 'Number First' },
            { key: 'numberFirstPrefix', label: 'Number First Prefix' },
            { key: 'numberFirstSuffix', label: 'Number First Suffix' },
            { key: 'numberLast', label: 'Number Last' },
            { key: 'numberLastPrefix', label: 'Number Last Prefix' },
            { key: 'numberLastSuffix', label: 'Number Last Suffix' },
            { key: 'streetName', label: 'Street Name' },
            { key: 'streetType', label: 'Street Type' },
            { key: 'streetSuffixCode', label: 'Street Suffix Code' },
            { key: 'suburb', label: 'Suburb' },
            { key: 'state', label: 'State' },
            { key: 'postCode', label: 'PostCode' },
            { key: 'location', label: 'Location' },
            { key: 'streetAddress', label: 'StreetAddress' },
        ]
    }
};