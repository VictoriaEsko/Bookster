import { describe, expect, test } from "vitest"
// import userEvent from "@testing-library/user-event";

describe('handleRegister', () => {
    test('handleRegister is a function', () => {
        const handleRegister = async (e) => {
            e.preventDefault();
            const res = await axios.post("http://localhost:3005/auth/register", {
              username,
              password,
            });
          };
       expect(handleRegister).toBeTypeOf('function')
    })
})

test('Input is a string', () => {
    const input = 'username'
    expect(input).toBeTypeOf('string')
})