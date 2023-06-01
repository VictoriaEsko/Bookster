import { expect, test } from "vitest"

test("delete a user", () => {
    const users = ["Berit", "Bengan", "Kalle", "Olle"];

    const testing = users.splice(1, 1);
    expect(users).not.toHaveLength(4);
})