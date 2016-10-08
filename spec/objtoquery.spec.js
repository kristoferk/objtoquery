describe("objtoquery", function () {
    beforeEach(function() {
        this.input = {
            Id: 1,
            ListProperty: ['Name1', 'Name2'],
            NullTest: '',
            IntTest: 0,
            Encoded: '�'
        };
    });

    it("default", function() {
        var value = ObjToQueryFunctions.ToQuery(this.input);
        chai.expect(value).to.equal("Id=1&ListProperty=Name1&ListProperty=Name2&NullTest=&IntTest=0&Encoded=" + encodeURIComponent('�'));
    });

    it("tolower", function () {
        var value = ObjToQueryFunctions.ToQuery(this.input, { toLower: true });
        chai.expect(value).to.equal("id=1&listproperty=Name1&listproperty=Name2&nulltest=&inttest=0&encoded=" + encodeURIComponent('�'));
    });

    it("removeEmptyValues", function () {
        var value = ObjToQueryFunctions.ToQuery(this.input, { removeEmptyValues: true });
        chai.expect(value).to.equal("Id=1&ListProperty=Name1&ListProperty=Name2&IntTest=0&Encoded=" + encodeURIComponent('�'));
    });

    it("skipEncoding", function () {
        var value = ObjToQueryFunctions.ToQuery(this.input, { skipEncoding: true });
        chai.expect(value).to.equal("Id=1&ListProperty=Name1&ListProperty=Name2&NullTest=&IntTest=0&Encoded=" + "�");
    });
});