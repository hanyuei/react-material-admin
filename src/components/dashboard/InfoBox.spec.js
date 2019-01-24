import React from "react";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import { shallow } from "enzyme";
import { expect } from "chai";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import InfoBox from "../dashboard/InfoBox";
configure({ adapter: new Adapter() });

describe("<InfoBox />", () => {
  it("should have a span with the title and value", () => {
    const wrapper = shallow(
      <InfoBox title="Title" value="1500" color="red" Icon={ShoppingCart} />
    );
    const content = wrapper.find("div > span");

    expect(content).to.have.length(2);
    expect("Title").to.equal(content.at(0).text());
    expect("1500").to.equal(content.at(1).text());
  });
});
