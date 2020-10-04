const puppeteer = require("puppeteer");

const ourElement = "#main";
const ourHeader = "#header";
const ourPlayground = "#playground";
const url = `file://${__dirname}/../index.html`;
const minimumWidth = 150;
const minimumHeight = 150;

beforeAll(async () => {
    browser = await puppeteer.launch({
        // headless: false,
        // slowMo: 250,
    });
    page = await browser.newPage();

    await page.setViewport({ width: 1366, height: 768 });
    await page.goto(url);
});
beforeEach(async () => {
    page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });
    await page.goto(url);
});

describe("resize by sides", () => {
    let element;
    test("Can be increased horizontally - right side", async () => {
        element = await page.$(ourElement);
        const { right, verticalCenter, widthBefor } = await page.evaluate(
            (element) => {
                const rect = element.getBoundingClientRect();
                return {
                    right: rect.right,
                    verticalCenter: rect.bottom - element.offsetHeight / 2,
                    widthBefor: element.offsetWidth,
                };
            },
            element
        );
        await page.mouse.move(right - 1, verticalCenter);
        await page.mouse.down();
        await page.mouse.move(right + 19, verticalCenter);
        await page.mouse.up();
        const widthAfter = await page.evaluate((element) => {
            return element.offsetWidth;
        }, element);
        expect(widthAfter).toBe(widthBefor + 20);
    }, 9000000);
    test("Can be increased horizontally - left side", async () => {
        element = await page.$(ourElement);
        const { left, verticalCenter, widthBefor } = await page.evaluate(
            (element) => {
                const rect = element.getBoundingClientRect();
                return {
                    left: rect.left,
                    verticalCenter: rect.bottom - element.offsetHeight / 2,
                    widthBefor: element.offsetWidth,
                };
            },
            element
        );
        await page.mouse.move(left + 1, verticalCenter);
        await page.mouse.down();
        await page.mouse.move(left - 19, verticalCenter);
        await page.mouse.up();
        const widthAfter = await page.evaluate((element) => {
            return element.offsetWidth;
        }, element);
        expect(widthAfter).toBe(widthBefor + 20);
    }, 9000000);

    test("Can be increased vertically - bottom", async () => {
        element = await page.$(ourElement);
        const { bottom, horizontalCenter, heightBefor } = await page.evaluate(
            (element) => {
                const rect = element.getBoundingClientRect();
                return {
                    bottom: rect.bottom,
                    horizontalCenter: rect.right - element.offsetWidth / 2,
                    heightBefor: element.offsetHeight,
                };
            },
            element
        );
        await page.mouse.move(horizontalCenter, bottom - 1);
        await page.mouse.down();
        await page.mouse.move(horizontalCenter, bottom + 19);
        await page.mouse.up();
        const heightAfter = await page.evaluate((element) => {
            return element.offsetHeight;
        }, element);
        expect(heightAfter).toBe(heightBefor + 20);
    }, 9000000);

    test("Can be increased vertically - top", async () => {
        element = await page.$(ourElement);
        const { top, horizontalCenter, heightBefor } = await page.evaluate(
            (element) => {
                const rect = element.getBoundingClientRect();
                return {
                    top: rect.top,
                    horizontalCenter: rect.right - element.offsetWidth / 2,
                    heightBefor: element.offsetHeight,
                };
            },
            element
        );
        await page.mouse.move(horizontalCenter, top + 1);
        await page.mouse.down();
        await page.mouse.move(horizontalCenter, top - 19);
        await page.mouse.up();
        const heightAfter = await page.evaluate((element) => {
            return element.offsetHeight;
        }, element);
        expect(heightAfter).toBe(heightBefor + 20);
    }, 9000000);

    test("Can be reduced horizontal - right side", async () => {
        element = await page.$(ourElement);
        const { right, verticalCenter, widthBefor } = await page.evaluate(
            (element) => {
                const rect = element.getBoundingClientRect();
                return {
                    right: rect.right,
                    verticalCenter: rect.bottom - element.offsetHeight / 2,
                    widthBefor: element.offsetWidth,
                };
            },
            element
        );
        await page.mouse.move(right - 1, verticalCenter);
        await page.mouse.down();
        await page.mouse.move(right - 21, verticalCenter);
        await page.mouse.up();
        const widthAfter = await page.evaluate((element) => {
            return element.offsetWidth;
        }, element);
        expect(widthAfter).toBeGreaterThanOrEqual(widthBefor - 20);
    }, 9000000);
    test("Can be reduced horizontal - left side", async () => {
        element = await page.$(ourElement);
        const { left, verticalCenter, widthBefor } = await page.evaluate(
            (element) => {
                const rect = element.getBoundingClientRect();
                return {
                    left: rect.left,
                    verticalCenter: rect.bottom - element.offsetHeight / 2,
                    widthBefor: element.offsetWidth,
                };
            },
            element
        );
        await page.mouse.move(left + 1, verticalCenter);
        await page.mouse.down();
        await page.mouse.move(left + 21, verticalCenter);
        await page.mouse.up();
        const widthAfter = await page.evaluate((element) => {
            return element.offsetWidth;
        }, element);
        expect(widthAfter).toBeGreaterThanOrEqual(widthBefor - 20);
    }, 9000000);

    test("Can be reduced vertically - bottom", async () => {
        element = await page.$(ourElement);
        const { bottom, horizontalCenter, heightBefor } = await page.evaluate(
            (element) => {
                const rect = element.getBoundingClientRect();
                return {
                    bottom: rect.bottom,
                    horizontalCenter: rect.right - element.offsetWidth / 2,
                    heightBefor: element.offsetHeight,
                };
            },
            element
        );
        await page.mouse.move(horizontalCenter, bottom - 1);
        await page.mouse.down();
        await page.mouse.move(horizontalCenter, bottom - 21);
        await page.mouse.up();
        const heightAfter = await page.evaluate((element) => {
            return element.offsetHeight;
        }, element);
        expect(heightAfter).toBeGreaterThanOrEqual(heightBefor - 20);
    }, 9000000);
    test("Can be reduced vertically - top", async () => {
        element = await page.$(ourElement);
        const { top, horizontalCenter, heightBefor } = await page.evaluate(
            (element) => {
                const rect = element.getBoundingClientRect();
                return {
                    top: rect.top,
                    horizontalCenter: rect.right - element.offsetWidth / 2,
                    heightBefor: element.offsetHeight,
                };
            },
            element
        );
        await page.mouse.move(horizontalCenter, top + 1);
        await page.mouse.down();
        await page.mouse.move(horizontalCenter, top + 21);
        await page.mouse.up();
        const heightAfter = await page.evaluate((element) => {
            return element.offsetHeight;
        }, element);
        expect(heightAfter).toBeGreaterThanOrEqual(heightBefor - 20);
    }, 9000000);
}, 9000000);

describe("Tests for minimum size", () => {
    test("Can be reduced to a minimum horizontal size - right side", async () => {
        element = await page.$(ourElement);
        const { right, verticalCenter, widthBefor } = await page.evaluate(
            (element) => {
                const rect = element.getBoundingClientRect();
                return {
                    right: rect.right,
                    verticalCenter: rect.bottom - element.offsetHeight / 2,
                    widthBefor: element.offsetWidth,
                };
            },
            element
        );
        await page.mouse.move(right - 1, verticalCenter);
        await page.mouse.down();
        await page.mouse.move(right - widthBefor, verticalCenter);
        await page.mouse.up();
        const widthAfter = await page.evaluate((element) => {
            return element.offsetWidth;
        }, element);
        expect(widthAfter).toBeGreaterThanOrEqual(minimumWidth);
    }, 9000000);
    test("Can be reduced to a minimum horizontal size - left side", async () => {
        element = await page.$(ourElement);
        const { left, verticalCenter, widthBefor } = await page.evaluate(
            (element) => {
                const rect = element.getBoundingClientRect();
                return {
                    left: rect.left,
                    verticalCenter: rect.bottom - element.offsetHeight / 2,
                    widthBefor: element.offsetWidth,
                };
            },
            element
        );
        await page.mouse.move(left + 1, verticalCenter);
        await page.mouse.down();
        await page.mouse.move(left + widthBefor, verticalCenter);
        await page.mouse.up();
        const widthAfter = await page.evaluate((element) => {
            return element.offsetWidth;
        }, element);
        expect(widthAfter).toBeGreaterThanOrEqual(minimumWidth);
    }, 9000000);

    test("Can be reduced to a minimum size vertically - bottom", async () => {
        element = await page.$(ourElement);
        const { bottom, horizontalCenter, heightBefor } = await page.evaluate(
            (element) => {
                const rect = element.getBoundingClientRect();
                return {
                    bottom: rect.bottom,
                    horizontalCenter: rect.right - element.offsetWidth / 2,
                    heightBefor: element.offsetHeight,
                };
            },
            element
        );
        await page.mouse.move(horizontalCenter, bottom - 1);
        await page.mouse.down();
        await page.mouse.move(horizontalCenter, bottom - heightBefor);
        await page.mouse.up();
        const heightAfter = await page.evaluate((element) => {
            return element.offsetHeight;
        }, element);
        expect(heightAfter).toBeGreaterThanOrEqual(minimumHeight);
    }, 9000000);
    test("Can be reduced to a minimum size vertically - top", async () => {
        element = await page.$(ourElement);
        const { top, horizontalCenter, heightBefor } = await page.evaluate(
            (element) => {
                const rect = element.getBoundingClientRect();
                return {
                    top: rect.top,
                    horizontalCenter: rect.right - element.offsetWidth / 2,
                    heightBefor: element.offsetHeight,
                };
            },
            element
        );
        await page.mouse.move(horizontalCenter, top + 1);
        await page.mouse.down();
        await page.mouse.move(horizontalCenter, top + heightBefor);
        await page.mouse.up();
        const heightAfter = await page.evaluate((element) => {
            return element.offsetHeight;
        }, element);
        expect(heightAfter).toBeGreaterThanOrEqual(minimumHeight);
    }, 9000000);
}, 9000000);

describe("Tests for right resizing", () => {
    test("If you click on header - does not expand", async () => {
        element = await page.$(ourElement);
        const header = await page.$(ourHeader);
        const { widthBefor, heightBefor } = await page.evaluate((element) => {
            return {
                widthBefor: element.offsetWidth,
                heightBefor: element.offsetHeight,
            };
        }, element);

        const { horizontalCenter, verticalCenter } = await page.evaluate(
            (header) => {
                const rect = header.getBoundingClientRect();
                return {
                    horizontalCenter: rect.right - header.offsetWidth / 2,
                    verticalCenter: rect.bottom - header.offsetHeight / 2,
                };
            },
            header
        );

        await page.mouse.move(horizontalCenter, verticalCenter);
        await page.mouse.down();
        await page.mouse.move(horizontalCenter + 20, verticalCenter + 20);
        await page.mouse.up();
        const { widthAfter, heightAfter } = await page.evaluate((element) => {
            return {
                widthAfter: element.offsetWidth,
                heightAfter: element.offsetHeight,
            };
        }, element);
        expect(widthAfter).toBe(widthBefor);
        expect(heightAfter).toBe(heightBefor);
    }, 9000000);
    test("If caught on the right side and moving the mouse up there will be no resizing", async () => {
        element = await page.$(ourElement);
        const { right, verticalCenter, widthBefor } = await page.evaluate(
            (element) => {
                const rect = element.getBoundingClientRect();
                return {
                    right: rect.right,
                    verticalCenter: rect.bottom - element.offsetHeight / 2,
                    widthBefor: element.offsetWidth,
                };
            },
            element
        );
        await page.mouse.move(right - 1, verticalCenter);
        await page.mouse.down();
        await page.mouse.move(right - 1, verticalCenter - 20);
        await page.mouse.up();
        const widthAfter = await page.evaluate((element) => {
            return element.offsetWidth;
        }, element);
        expect(widthAfter).toBe(widthBefor);
    }, 9000000);
    test("If caught on the left side and moving the mouse up there will be no resizing", async () => {
        element = await page.$(ourElement);
        const { left, verticalCenter, widthBefor } = await page.evaluate(
            (element) => {
                const rect = element.getBoundingClientRect();
                return {
                    left: rect.left,
                    verticalCenter: rect.bottom - element.offsetHeight / 2,
                    widthBefor: element.offsetWidth,
                };
            },
            element
        );
        await page.mouse.move(left + 1, verticalCenter);
        await page.mouse.down();
        await page.mouse.move(left + 1, verticalCenter - 20);
        await page.mouse.up();
        const widthAfter = await page.evaluate((element) => {
            return element.offsetWidth;
        }, element);
        expect(widthAfter).toBe(widthBefor);
    }, 9000000);
    test("If caught on the bottom and moving the mouse right there will be no resizing", async () => {
        element = await page.$(ourElement);
        const { bottom, horizontalCenter, heightBefor } = await page.evaluate(
            (element) => {
                const rect = element.getBoundingClientRect();
                return {
                    bottom: rect.bottom,
                    horizontalCenter: rect.right - element.offsetWidth / 2,
                    heightBefor: element.offsetHeight,
                };
            },
            element
        );
        await page.mouse.move(horizontalCenter, bottom - 1);
        await page.mouse.down();
        await page.mouse.move(horizontalCenter + 20, bottom - 1);
        await page.mouse.up();
        const heightAfter = await page.evaluate((element) => {
            return element.offsetHeight;
        }, element);
        expect(heightAfter).toBe(heightBefor);
    }, 9000000);
    test("If caught on the top and moving the mouse right there will be no resizing", async () => {
        element = await page.$(ourElement);
        const { top, horizontalCenter, heightBefor } = await page.evaluate(
            (element) => {
                const rect = element.getBoundingClientRect();
                return {
                    top: rect.top,
                    horizontalCenter: rect.right - element.offsetWidth / 2,
                    heightBefor: element.offsetHeight,
                };
            },
            element
        );
        await page.mouse.move(horizontalCenter, top + 1);
        await page.mouse.down();
        await page.mouse.move(horizontalCenter + 20, top + 1);
        await page.mouse.up();
        const heightAfter = await page.evaluate((element) => {
            return element.offsetHeight;
        }, element);
        expect(heightAfter).toBe(heightBefor);
    }, 9000000);
}, 9000000);

describe("The box's cannot surpass the playground border ", () => {
    test("Increases until the limit and does not pass - right side", async () => {
        let playground = await page.$(ourPlayground);
        const rightPlayground = await page.evaluate((playground) => {
            const rect = playground.getBoundingClientRect();
            return rect.right;
        }, playground);
        element = await page.$(ourElement);
        const { right, verticalCenter } = await page.evaluate((element) => {
            const rect = element.getBoundingClientRect();
            return {
                right: rect.right,
                verticalCenter: rect.bottom - element.offsetHeight / 2,
            };
        }, element);

        await page.mouse.move(right - 1, verticalCenter);
        await page.mouse.down();
        await page.mouse.move(rightPlayground - 1, verticalCenter);
        await page.mouse.up();
        await page.mouse.move(rightPlayground - 1, verticalCenter);
        await page.mouse.down();
        await page.mouse.move(rightPlayground + 5, verticalCenter);
        await page.mouse.up();
        const rightAfter = await page.evaluate((element) => {
            const rect = element.getBoundingClientRect();
            return rect.right;
        }, element);
        expect(rightAfter).toBe(Math.floor(rightPlayground));
    }, 9000000);

    test("Increases until the limit and does not pass - left side", async () => {
        let playground = await page.$(ourPlayground);
        const leftPlayground = await page.evaluate((playground) => {
            const rect = playground.getBoundingClientRect();
            return rect.left;
        }, playground);
        element = await page.$(ourElement);
        const { left, verticalCenter } = await page.evaluate((element) => {
            const rect = element.getBoundingClientRect();
            return {
                left: rect.left,
                verticalCenter: rect.bottom - element.offsetHeight / 2,
            };
        }, element);
        await page.mouse.move(left + 1, verticalCenter);
        await page.mouse.down();
        await page.mouse.move(Math.ceil(leftPlayground) + 1, verticalCenter);
        await page.mouse.up();
        await page.mouse.move(leftPlayground + 1, verticalCenter);
        await page.mouse.down();
        await page.mouse.move(leftPlayground - 5, verticalCenter);
        await page.mouse.up();
        const leftAfter = await page.evaluate((element) => {
            const rect = element.getBoundingClientRect();
            return rect.left;
        }, element);
        expect(leftAfter).toBe(Math.ceil(leftPlayground));
    }, 9000000);

    test("Increases until the limit and does not pass - bottom", async () => {
        let playground = await page.$(ourPlayground);
        const bottomPlayground = await page.evaluate((playground) => {
            const rect = playground.getBoundingClientRect();
            return rect.bottom;
        }, playground);
        element = await page.$(ourElement);
        const { bottom, horizontalCenter } = await page.evaluate((element) => {
            const rect = element.getBoundingClientRect();
            return {
                bottom: rect.bottom,
                horizontalCenter: rect.right - element.offsetWidth / 2,
            };
        }, element);
        await page.mouse.move(horizontalCenter, bottom - 1);
        await page.mouse.down();
        await page.mouse.move(horizontalCenter, bottomPlayground - 1);
        await page.mouse.up();
        await page.mouse.move(horizontalCenter, bottomPlayground - 1);
        await page.mouse.down();
        await page.mouse.move(horizontalCenter, bottomPlayground + 5);
        await page.mouse.up();
        const bottomAfter = await page.evaluate((element) => {
            const rect = element.getBoundingClientRect();
            return rect.bottom;
        }, element);
        expect(bottomAfter).toBe(Math.floor(bottomPlayground));
    }, 9000000);

    test("Increases until the limit and does not pass - top", async () => {
        let playground = await page.$(ourPlayground);
        const topPlayground = await page.evaluate((playground) => {
            const rect = playground.getBoundingClientRect();
            return rect.top;
        }, playground);
        element = await page.$(ourElement);
        const { top, horizontalCenter } = await page.evaluate((element) => {
            const rect = element.getBoundingClientRect();
            return {
                top: rect.top,
                horizontalCenter: rect.right - element.offsetWidth / 2,
            };
        }, element);
        await page.mouse.move(horizontalCenter, top + 1);
        await page.mouse.down();
        await page.mouse.move(horizontalCenter, Math.ceil(topPlayground) + 1);
        await page.mouse.up();
        await page.mouse.move(horizontalCenter, topPlayground + 1);
        await page.mouse.down();
        await page.mouse.move(horizontalCenter, topPlayground - 5);
        await page.mouse.up();
        const topAfter = await page.evaluate((element) => {
            const rect = element.getBoundingClientRect();
            return rect.top;
        }, element);
        expect(topAfter).toBe(Math.ceil(topPlayground));
    }, 9000000);
}, 9000000);

afterAll(() => {
    browser.close();
});
