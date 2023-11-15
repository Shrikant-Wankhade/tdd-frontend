import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";
import { Appointment, AppointmentsDayView } from "../src/Appointment";
import {
  initializeReactContainer,
  render,
  click,
  element,
  elements,
  textOf,
  typesOf,
} from "./reactTestExtensions";

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

describe("Appointment", () => {
  beforeEach(() => {
    initializeReactContainer();
  });

  const render = (component) =>
    act(() => ReactDOM.createRoot(container).render(component));

  it("renders the customer first name", () => {
    const customer = { firstName: "Ashley" };

    const component = <Appointment customer={customer} />;

    render(component);
    expect(document.body.textContent).toContain("Ashley");
  });

  it("renders another customer first name", () => {
    const customer = { firstName: "Jordan" };
    const component = <Appointment customer={customer} />;

    render(component);
    expect(document.body.textContent).toContain("Jordan");
  });
});

//Building matchers that are specific to your own project
//is an essential part of writing clear, concise tests.

describe("AppointmentsDayView", () => {
  const today = new Date();

  const twoAppointments = [
    {
      startsAt: today.setHours(12, 0),
      customer: { firstName: "Ashley" },
    },
    {
      startsAt: today.setHours(13, 0),
      customer: { firstName: "Jordan" },
    },
  ];

  beforeEach(() => {
    initializeReactContainer();
  });

  const secondButton = () => elements("button")[1];

  const render = (component) =>
    act(() => ReactDOM.createRoot(container).render(component));

  it("renders an ol element to display appointments", () => {
    render(<AppointmentsDayView appointments={[]} />);
    const listElement = document.querySelector("ol");
    expect(listElement).not.toBeNull();
  });

  it("renders an li for each appointment", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    const listChildren = document.querySelectorAll("ol > li");
    expect(listChildren).toHaveLength(2);
  });

  it("renders the time of each appointment", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    expect(textOf(elements("li"))).toEqual(["12:00", "13:00"]);
  });

  it("initially shows a message saying there are no appointments today", () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(document.body.textContent).toContain(
      "There are no appointments scheduled for today.",
    );
  });

  it("has a button element in each li", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    expect(typesOf(elements("li > *"))).toEqual(["button", "button"]);
  });

  it("renders another appointment when selected", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    const buttons = document.querySelectorAll("li > button");
    expect(buttons).toHaveLength(2);
    expect(buttons[0].type).toEqual("button");
  });

  it("renders another appointment when selected", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);
    const button = document.querySelectorAll("button")[1];
    click(button);
    expect(document.body.textContent).toContain("Jordan");
  });
});
