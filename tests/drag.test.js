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
    await page.mouse.move(left + 20, top + 20);
    await page.mouse.up();

    const { newTop, newLeft } = await page.evaluate((header) => {
      const { top, left } = header.getBoundingClientRect();
      return { newTop: top + header.clientHeight / 2, newLeft: left + header.clientWidth / 2 };
    }, header);

    expect(newLeft).toBe(left + 20)
    expect(newTop).toBe(top + 20)

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
      let { top, left, right, bottom } = playground.getBoundingClientRect();
      return { playTop: top, playLeft: left, playBottom: bottom, playRight: right };
    }, playground);

    const box = await page.$('#main');
    const { boxWidth, boxHeight } = await page.evaluate((box) => {
      let { width, height } = box.getBoundingClientRect();
      return { boxWidth: width, boxHeight: height };
    }, box);

    const header = await page.$('#header');

    const { y, x, headerWidth, headerHeight } = await page.evaluate((header) => {
      let { top, left, width, height } = header.getBoundingClientRect();
      return { y: top + height / 2, x: left + width / 2, headerWidth: width, headerHeight: height };
    }, header);

    const boxOnBorderRight = playRight - boxWidth + headerWidth / 2;
    const boxOnBorderBottom = playBottom - boxHeight + headerHeight / 2;
    const boxOnBorderLeft = playLeft + headerWidth / 2;
    const boxOnBorderTop = playTop + headerHeight / 2;

    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(boxOnBorderRight, boxOnBorderBottom);
    await page.mouse.move(boxOnBorderRight + 10, boxOnBorderBottom + 10);
    await page.mouse.up();

    const { onBottomRightCornerTop, onBottomRightCornerLeft } = await page.evaluate((box) => {
      const { top, left } = box.getBoundingClientRect();
      return { onBottomRightCornerTop: top, onBottomRightCornerLeft: left };
    }, box);

    expect(onBottomRightCornerLeft).toBe(playRight - boxWidth);
    expect(onBottomRightCornerTop).toBe(playBottom - boxHeight);

    await page.mouse.move(onBottomRightCornerLeft + headerWidth / 2, onBottomRightCornerTop + headerHeight / 2);
    await page.mouse.down();
    await page.mouse.move(boxOnBorderLeft, boxOnBorderTop);
    await page.mouse.move(boxOnBorderLeft - 10, boxOnBorderTop - 10);
    await page.mouse.up();

    const { onTopLeftCornerTop, onTopLeftCornerLeft } = await page.evaluate((box) => {
      const { top, left } = box.getBoundingClientRect();
      return { onTopLeftCornerTop: top, onTopLeftCornerLeft: left };
    }, box);

    expect(onTopLeftCornerLeft).toBe(playLeft);
    expect(onTopLeftCornerTop).toBe(playTop);

    await browser.close();
  })
})
