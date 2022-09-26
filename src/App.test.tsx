import React, { useState } from "react";
/** Testing */
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
/** Screen */
import App from "./App";
/** Components */
import { Card, Input, Button } from "./components";

let container: any = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("Render app.tsx", () => {
  describe("Import all of the components inside component folder and render it on App.tsx", () => {
    it("renders a card with input, switch, button with operator, text result and clear button", () => {
      render(<App />, container);
    });
  });
});

describe("Render Card Component", () => {
  it("Render a card component inside of App.tsx with props bgColor, shadowColor and children", () => {
    render(
      <Card bgColor="bg-cyan-600/[0.35]" shadowColor="shadow-cyan-700/[0.5]">
        <div></div>
      </Card>,
      container
    );
  });
});
