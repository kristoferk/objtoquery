describe("objtoquery", function () {
    beforeEach(function() {
        this.input = {
            Id: 1,
            ListProperty: ['Name1', 'Name2'],
            NullTest: '',
            IntTest: 0,
            BlnTest: true,
            SubObject: {
                Client: 'Sub'
            },
            Encoded: 'å'
        };
    });

    it("default", function() {
        var value = objToQuery(this.input);
        chai.expect(value).to.equal("Id=1&ListProperty=Name1&ListProperty=Name2&NullTest=&IntTest=0&BlnTest=true&SubObject.Client=Sub&Encoded=%C3%A5");
    });

    it("tolower", function () {
        var value = objToQuery(this.input, { toLower: true });
        chai.expect(value).to.equal("id=1&listproperty=Name1&listproperty=Name2&nulltest=&inttest=0&blntest=true&subobject.client=Sub&encoded=%C3%A5");
    });

    it("removeEmptyValues", function () {
        var value = objToQuery(this.input, { removeEmptyValues: true });
        chai.expect(value).to.equal("Id=1&ListProperty=Name1&ListProperty=Name2&IntTest=0&BlnTest=true&SubObject.Client=Sub&Encoded=%C3%A5");
    });

    it("skipEncoding", function () {
        var value = objToQuery(this.input, { skipEncoding: true });
        chai.expect(value).to.equal("Id=1&ListProperty=Name1&ListProperty=Name2&NullTest=&IntTest=0&BlnTest=true&SubObject.Client=Sub&Encoded=å");
    });
});