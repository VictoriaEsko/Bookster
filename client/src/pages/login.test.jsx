
import { describe, expect, test } from "vitest"

const user = {
    username: "Bob",
    password: "123"
}

test("The user is bob", () => {
    expect(user.username).toBe('Bob')
    expect(user.password).toBe('123')
})
