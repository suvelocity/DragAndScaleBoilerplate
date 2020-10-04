const puppeteer = require("puppeteer");
describe("dragging box", () => {
  test("dragging", async () => {
    const browser = await puppeteer.launch(
      // {
      //   headless: false,
      //   slowMo: 100,
      // }
    );
    const url = `file://${__dirname}/../index.html`

    const page = await browser.newPage();
    await page.goto(url);

    const header = await page.$('#header');

    const { top, left } = await page.evaluate((header) => {
      let { top, left } = header.getBoundingClientRect();
      top += header.clientHeight / 2;
      left += header.clientWidth / 2;
      return { top, left };
    }, header);

    await page.mouse.move(left, top);
    await page.mouse.down();
    await page.mouse.move(2 * left, 2 * top);
    await page.mouse.up();

    const { newTop, newLeft } = await page.evaluate((header) => {
      const { top, left } = header.getBoundingClientRect();
      return { newTop: top + header.clientHeight / 2, newLeft: left + header.clientWidth / 2 };
    }, header);

    expect(newLeft).toBe(2 * left)
    expect(newTop).toBe(2 * top)

    await browser.close();
  });
  test("can't go past the borders", async () => {
    const browser = await puppeteer.launch(
      // {
      //   headless: false,
      //   slowMo: 100,
      // }
    );
    const url = `file://${__dirname}/../index.html`
    const page = await browser.newPage();
    await page.goto(url);

    const playground = await page.$('#playground');
    const { playTop, playLeft, playBottom, playRight } = await page.evaluate((playground) => {
      let { top, left, right, bottom } = box.getBoundingClientRect();
      return { playTop: top, playLeft: left, playtBottom: bottom, playRight: right };
    }, playground);

    const box = await page.$('#main');
    const { boxWidth, boxHeight } = await page.evaluate((box) => {
      let { width, height } = box.getBoundingClientRect();
      return { boxWidth: width, boxHeight: height };
    }, box);

    const header = await page.$('#header');

    const { y, x } = await page.evaluate((header) => {
      let { top, left, width, height } = header.getBoundingClientRect();
      return { y: top + height / 2, x: left + width / 2, headerWidth: width, headerHeight: height };
    }, header);

    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(playBottom, playRight);
    await page.mouse.up();

    const { newTop, newLeft } = await page.evaluate((box) => {
      const { top, left } = box.getBoundingClientRect();
      return { newTop: top, newLeft: left };
    }, box);

    expect(newLeft).toBe(playRight - boxWidth);
    expect(newTop).toBe(playBottom - boxHeight);

    await browser.close();
  })

})
