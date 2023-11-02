//The describe function defines a test suite
//which is simply a set of tests with a given name

//The first argument is the name of the unit you are testing. It could be a React component, a function, or a module. 
//The second argument is a function inside of which you define your tests


describe("Appointment",()=>{
    it("renders the customer first name",()=>{
        expect(document.body.textContent).toContain("Ashley");
    })
})


//Building matchers that are specific to your own project 
//is an essential part of writing clear, concise tests.