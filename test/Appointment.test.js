import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";
import { Appointment } from "../src/Appointment";

//core principle of TDD is always do the simplest thing to pass the test
//We could rephrase this as always do the simplest thing to fix the error you’re working on


//The describe function defines a test suite
//which is simply a set of tests with a given name

//The first argument is the name of the unit you are testing. It could be a React component, a function, or a module. 
//The second argument is a function inside of which you define your tests

/*
  A great test is not just good but is also the following:

 Short
 Descriptive
 Independent of other tests
 Has no side effects



 A good test has the following three distinct sections:

Arrange: Sets up test dependencies
Act: Executes production code under test
Assert: Checks that expectations are met

*/

describe("Appointment",()=>{
    let container;
    beforeEach(() => {
    container = document.createElement("div");
    document.body.replaceChildren(container);
    });

    const render = component =>
      act(() =>
      ReactDOM.createRoot(container).render(component)

  );

    it("renders the customer first name",()=>{
        const customer = { firstName: "Ashley" };

        const component = (
            <Appointment customer={customer} />
        );

        render(component);
        expect(document.body.textContent).toContain(
        "Ashley"
      );
    })


    it("renders another customer first name", () => {

        const customer = { firstName: "Jordan" };
        const component = (
          <Appointment customer={customer} />
        );
    
        render(component);
        expect(document.body.textContent).toContain(
          "Jordan"
        );
      });
})


//Building matchers that are specific to your own project 
//is an essential part of writing clear, concise tests.