const puppeteer = require("puppeteer");

const ourElement = "#main";
const ourHeader = "#header";
const url = `file://${__dirname}/../index.html`;
const minimumWidth = 100;
const minimumHeight = 100;

beforeAll(async () => {
    browser = await puppeteer.launch({
        // headless: false,
        // slowMo: 250,
        // args: ['--start-fullscreen']
    });
    page = await browser.newPage();
    // page.emulate({
    //     viewport: {
    //         width: 2000,
    //         height: 1000,
    //     },
    //     userAgent: "",
    // });
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
        await page.mouse.move(right, verticalCenter);
        await page.mouse.down();
        await page.mouse.move(right + 20, verticalCenter);
        await page.mouse.up();
        // const widthAfter = await page.$eval(ourElement, (element) => {
        //     return element.offsetWidth;
        // });
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
        await page.mouse.move(left, verticalCenter);
        await page.mouse.down();
        await page.mouse.move(left - 20, verticalCenter);
        await page.mouse.up();
        // const widthAfter = await page.$eval(ourElement, (element) => {
        //     return element.offsetWidth;
        // });
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
        await page.mouse.move(horizontalCenter, bottom);
        await page.mouse.down();
        await page.mouse.move(horizontalCenter, bottom + 20);
        await page.mouse.up();
        // const heightAfter = await page.$eval(ourElement, (element) => {
        //     return element.offsetHeight;
        // });
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
        await page.mouse.move(horizontalCenter, top);
        await page.mouse.down();
        await page.mouse.move(horizontalCenter, top - 20);
        await page.mouse.up();
        // const heightAfter = await page.$eval(ourElement, (element) => {
        //     return element.offsetHeight;
        // });
        const heightAfter = await page.evaluate((element) => {
            return element.offsetHeight;
        }, element);
        expect(heightAfter).toBe(heightBefor + 20);
    }, 9000000);

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
        await page.mouse.move(right, verticalCenter);
        await page.mouse.down();
        await page.mouse.move(right - widthBefor, verticalCenter);
        await page.mouse.up();
        // const widthAfter = await page.$eval(ourElement, (element) => {
        //     return element.offsetWidth;
        // });
        const widthAfter = await page.evaluate((element) => {
            return element.offsetWidth;
        }, element);
        expect(widthAfter).toBe(minimumWidth);
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
        await page.mouse.move(left, verticalCenter);
        await page.mouse.down();
        await page.mouse.move(left - widthBefor, verticalCenter);
        await page.mouse.up();
        // const widthAfter = await page.$eval(ourElement, (element) => {
        //     return element.offsetWidth;
        // });
        const widthAfter = await page.evaluate((element) => {
            return element.offsetWidth;
        }, element);
        expect(widthAfter).toBe(minimumWidth);
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
        await page.mouse.move(horizontalCenter, bottom);
        await page.mouse.down();
        await page.mouse.move(horizontalCenter, bottom - heightBefor);
        await page.mouse.up();
        // const heightAfter = await page.$eval(ourElement, (element) => {
        //     return element.offsetHeight;
        // });
        const heightAfter = await page.evaluate((element) => {
            return element.offsetHeight;
        }, element);
        expect(heightAfter).toBe(minimumHeight);
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
        await page.mouse.move(horizontalCenter, top);
        await page.mouse.down();
        await page.mouse.move(horizontalCenter, top + heightBefor);
        await page.mouse.up();
        // const heightAfter = await page.$eval(ourElement, (element) => {
        //     return element.offsetHeight;
        // });
        const heightAfter = await page.evaluate((element) => {
            return element.offsetHeight;
        }, element);
        expect(heightAfter).toBe(minimumHeight);
    }, 9000000);

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
}, 9000000);

describe("Tests for right resizing", () => {
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
        await page.mouse.move(right, verticalCenter);
        await page.mouse.down();
        await page.mouse.move(right, verticalCenter - 20);
        await page.mouse.up();
        // const widthAfter = await page.$eval(ourElement, (element) => {
        //     return element.offsetWidth;
        // });
        const widthAfter = await page.evaluate((element) => {
            return element.offsetWidth;
        }, element);
        expect(widthAfter).toBe(widthBefor);
    }, 9000000);
    test("If caught on the bottom side and moving the mouse right there will be no resizing", async () => {
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
        await page.mouse.move(horizontalCenter, bottom);
        await page.mouse.down();
        await page.mouse.move(horizontalCenter + 20, bottom);
        await page.mouse.up();
        // const heightAfter = await page.$eval(ourElement, (element) => {
        //     return element.offsetHeight;
        // });
        const heightAfter = await page.evaluate((element) => {
            return element.offsetHeight;
        }, element);
        expect(heightAfter).toBe(heightBefor);
    }, 9000000);
}, 9000000);

// describe("The box's cannot surpass the playground border ", () => {
//     test("", async () => {});
// }, 9000000);

afterAll(() => {
    browser.close();
});
