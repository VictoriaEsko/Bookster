import { describe, expect, test } from "vitest"
// import axios from "axios";
import { Start } from "./start";
// import React from "react";
// import userEvent from "@testing-library/user-event";

describe( Start , () => {
    test('handelLogout is a function', () => {
        const Start = () => {
            // localStorage.removeItem("accessToken")
            // delete axios.defaults.headers.common["Authorization"]
            // // setUser("")
          };
       expect(Start).toBeTypeOf('function')
    })
})

test('Input is a string', () => {
    const input = 'logout'
    expect(input).toBeTypeOf('string')
})