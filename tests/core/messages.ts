import * as Messages from "../../src/core/messages";
import { expect } from "chai";
import 'mocha';

describe("Message", () => {
         it ("Converts to json correctly",
             () => {
               let ok = new Messages.Ok(2);
               expect(ok.toJSON()).to.equal('{"Ok":{"Id":2}}');
             });
         it ("Converts from json correctly",
             () => {
               let json_str = '{"Ok":{"Id":2}}';
               expect(Messages.FromJSON(json_str)).to.deep.equal(new Messages.Ok(2));
             });
});

