const puppeteer = require("puppeteer");
const url = `file://${__dirname}/../index.html`;
//'file://' + __dirname + '/../_cloned-app/index.html'
let id = "#main";

describe("The object should be scalable by dragging the corners", () => {
  const cornersLitterals = ["topRight", "topLeft", "bottomLeft", "bottomRight"];
  let browser, page, getMesures;
  beforeAll(async (done) => {
    browser = await puppeteer.launch({
      // headless: false,
      // slowMo: 100,
      defaultViewport: { width: 1000, height: 1000 },
    });
    page = await browser.newPage();
    await page.goto(url);
    getMesures = async () => {
      let div = await page.$(id);
      return await page.evaluate((div) => {
        const {
          top,
          left,
          bottom,
          right,
          width,
          height,
        } = div.getBoundingClientRect();
        return {
          topLeft: { x: left, y: top },
          topRight: { x: right, y: top },
          bottomLeft: { x: left, y: bottom },
          bottomRight: { x: right, y: bottom },
          width: width,
          height: height,
        };
      }, div);
    };

    done();
  });
  afterAll(async (done) => {
    await browser.close();
    done();
  });
  describe("Resize the object", () => {
    cornersLitterals.forEach((cor) => {
      test("Enlarge the object using the " + cor + " corner", async (done) => {
        let Top = cor.slice(0, 3) === "top";
        let Left = cor.slice(cor.length - 4) === "Left";
        let {
          topLeft,
          topRight,
          bottomLeft,
          bottomRight,
          width,
          height,
        } = await getMesures();
        let initialWidth = width;
        let initialHeight = height;
        let corner = eval(cor);
        let startingX = Left ? corner.x + 2 : corner.x - 2;
        let startingY = Top ? corner.y + 2 : corner.y - 2;
        let targetX = Left ? corner.x - 75 : corner.x + 75;
        let targetY = Top ? corner.y - 75 : corner.y + 75;
        await page.mouse.move(startingX, startingY);
        await page.mouse.down();
        await page.mouse.move(targetX, targetY);
        await page.mouse.up();
        let newMesures = await getMesures();
        let largerWidth = newMesures.width;
        let largerHeight = newMesures.height;
        expect(largerWidth - initialWidth).toBeLessThanOrEqual(95);
        expect(largerWidth - initialWidth).toBeGreaterThanOrEqual(55);
        expect(largerHeight - initialHeight).toBeLessThanOrEqual(95);
        expect(largerHeight - initialHeight).toBeGreaterThanOrEqual(55);
        done();
      });
      test("Shrink the object using the " + cor + " corner", async (done) => {
        let Top = cor.slice(0, 3) === "top";
        let Left = cor.slice(cor.length - 4) === "Left";
        let {
          topLeft,
          topRight,
          bottomLeft,
          bottomRight,
          width,
          height,
        } = await getMesures();
        let initialWidth = width;
        let initialHeight = height;
        let corner = eval(cor);
        let startingX = Left ? corner.x + 2 : corner.x - 2;
        let startingY = Top ? corner.y + 2 : corner.y - 2;
        let targetX = Left ? corner.x + 75 : corner.x - 75;
        let targetY = Top ? corner.y + 75 : corner.y - 75;
        await page.mouse.move(startingX, startingY);
        await page.mouse.down();
        await page.mouse.move(targetX, targetY);
        await page.mouse.up();
        let newMesures = await getMesures();
        let smallerHeight = newMesures.height;
        let smallerWidth = newMesures.width;
        expect(initialWidth - smallerWidth).toBeGreaterThanOrEqual(55);
        expect(initialWidth - smallerWidth).toBeLessThanOrEqual(95);
        expect(initialHeight - smallerHeight).toBeGreaterThanOrEqual(55);
        expect(initialHeight - smallerHeight).toBeLessThanOrEqual(95);
        done();
      });
    });
  });
  describe("Resize on a single axis without changing the size on the other axis", () => {
    [
      "Enlarge Horizantly",
      "Shrink Horizantly",
      "Enlarge Vertically",
      "Shrink Vertically",
    ].forEach((axis) => {
      test(axis + " whithou resize the other axis", async (done) => {
        let { bottomRight, width, height } = await getMesures();
        let initialWidth = width;
        let initialHeight = height;
        let [action, direction] = axis.split(" ");
        await page.mouse.move(bottomRight.x - 2, bottomRight.y - 2);
        await page.mouse.down();
        let targetX =
          direction === "Vertically"
            ? bottomRight.x - 2
            : action === "Enlarge"
              ? bottomRight.x + 75
              : bottomRight.x - 75;
        let targetY =
          direction === "Horizantly"
            ? bottomRight.y - 2
            : action === "Enlarge"
              ? bottomRight.y + 75
              : bottomRight.y - 75;
        await page.mouse.move(targetX, targetY);
        await page.mouse.up();
        let newMesures = await getMesures();
        let newHeight = newMesures.height;
        let newWidth = newMesures.width;
        if (direction === "Vertically") {
          expect(initialWidth - newWidth).toBeGreaterThanOrEqual(-20);
          expect(initialWidth - newWidth).toBeLessThanOrEqual(20);
          expect(initialHeight - newHeight).toBeGreaterThanOrEqual(
            action === "Enlarge" ? -95 : 55
          );
          expect(initialHeight - newHeight).toBeLessThanOrEqual(
            action === "Enlarge" ? -55 : 95
          );
        } else {
          expect(initialHeight - newHeight).toBeGreaterThanOrEqual(-15);
          expect(initialHeight - newHeight).toBeLessThanOrEqual(15);
          expect(initialWidth - newWidth).toBeGreaterThanOrEqual(
            action === "Enlarge" ? -95 : 55
          );
          expect(initialWidth - newWidth).toBeLessThanOrEqual(
            action === "Enlarge" ? -55 : 95
          );
        }
        done();
      });
    });
  });
  describe("Cant be minimized to less then is allowed", () => {
    let min = 15;
    test("Can't shrink to much horizantly", async (done) => {
      let { bottomRight, bottomLeft } = await getMesures();
      await page.mouse.move(bottomRight.x - 2, bottomRight.y - 2);
      await page.mouse.down();
      await page.mouse.move(bottomLeft.x, bottomLeft.y);
      await page.mouse.up();
      let newMesures = await getMesures();
      expect(newMesures.width).toBeGreaterThanOrEqual(min);
      await page.mouse.move(
        newMesures.bottomRight.x - 2,
        newMesures.bottomRight.y - 2
      );
      await page.mouse.down();
      await page.mouse.move(bottomRight.x, bottomRight.y);
      await page.mouse.up();
      done();
    });
    test("Can't shrink to much vertically", async (done) => {
      let { bottomRight, topRight } = await getMesures();
      await page.mouse.move(bottomRight.x - 2, bottomRight.y - 2);
      await page.mouse.down();
      await page.mouse.move(topRight.x, topRight.y);
      await page.mouse.up();
      let newMesures = await getMesures();
      expect(newMesures.height).toBeGreaterThanOrEqual(min);
      await page.mouse.move(
        newMesures.bottomRight.x - 2,
        newMesures.bottomRight.y - 2
      );
      await page.mouse.down();
      await page.mouse.move(bottomRight.x, bottomRight.y);
      await page.mouse.up();
      done();
    });
  });
  describe("Resizing the box doesn't move it", () => {
    const opposites = {
      topRight: "bottomLeft",
      topLeft: "bottomRight",
      bottomLeft: "topRight",
      bottomRight: "topLeft",
    };
    cornersLitterals.forEach((cor) => {
      test(
        "Shrink the object using the " + cor + " corner doesn't move it",
        async (done) => {
          let Top = cor.slice(0, 3) === "top";
          let Left = cor.slice(cor.length - 4) === "Left";
          let {
            topLeft,
            topRight,
            bottomLeft,
            bottomRight,
            width,
            height,
          } = await getMesures();
          let initialWidth = width;
          let initialHeight = height;
          let corner = eval(cor);
          let opCorner = eval(opposites[cor]);
          let startingX = Left ? corner.x + 2 : corner.x - 2;
          let startingY = Top ? corner.y + 2 : corner.y - 2;
          let targetX = Left ? corner.x + 75 : corner.x - 75;
          let targetY = Top ? corner.y + 75 : corner.y - 75;
          await page.mouse.move(startingX, startingY);
          await page.mouse.down();
          await page.mouse.move(targetX, targetY);
          await page.mouse.up();
          let newMesures = await getMesures();
          let smallerHeight = newMesures.height;
          let smallerWidth = newMesures.width;
          let newOpCorner = newMesures[opposites[cor]];
          expect(initialWidth - smallerWidth).toBeGreaterThanOrEqual(55);
          expect(initialWidth - smallerWidth).toBeLessThanOrEqual(95);
          expect(initialHeight - smallerHeight).toBeGreaterThanOrEqual(55);
          expect(initialHeight - smallerHeight).toBeLessThanOrEqual(95);
          expect(opCorner.x - newOpCorner.x).toBeGreaterThanOrEqual(-20);
          expect(opCorner.x - newOpCorner.x).toBeLessThanOrEqual(20);
          expect(opCorner.y - newOpCorner.y).toBeGreaterThanOrEqual(-20);
          expect(opCorner.y - newOpCorner.y).toBeLessThanOrEqual(20);
          done();
        }
      );
      test(
        "Enlarge the object using the " + cor + " corner doesn't move it",
        async (done) => {
          let Top = cor.slice(0, 3) === "top";
          let Left = cor.slice(cor.length - 4) === "Left";
          let {
            topLeft,
            topRight,
            bottomLeft,
            bottomRight,
            width,
            height,
          } = await getMesures();
          let initialWidth = width;
          let initialHeight = height;
          let corner = eval(cor);
          let opCorner = eval(opposites[cor]);
          let startingX = Left ? corner.x + 2 : corner.x - 2;
          let startingY = Top ? corner.y + 2 : corner.y - 2;
          let targetX = Left ? corner.x - 75 : corner.x + 75;
          let targetY = Top ? corner.y - 75 : corner.y + 75;
          await page.mouse.move(startingX, startingY);
          await page.mouse.down();
          await page.mouse.move(targetX, targetY);
          await page.mouse.up();
          let newMesures = await getMesures();
          let largerHeight = newMesures.height;
          let largerWidth = newMesures.width;
          let newOpCorner = newMesures[opposites[cor]];
          expect(largerWidth - initialWidth).toBeLessThanOrEqual(95);
          expect(largerWidth - initialWidth).toBeGreaterThanOrEqual(55);
          expect(largerHeight - initialHeight).toBeLessThanOrEqual(95);
          expect(largerHeight - initialHeight).toBeGreaterThanOrEqual(55);
          expect(opCorner.x - newOpCorner.x).toBeGreaterThanOrEqual(-20);
          expect(opCorner.x - newOpCorner.x).toBeLessThanOrEqual(20);
          expect(opCorner.y - newOpCorner.y).toBeGreaterThanOrEqual(-20);
          expect(opCorner.y - newOpCorner.y).toBeLessThanOrEqual(20);
          done();
        }
      );
    });
  });
  describe("The box's borders cannot surpass the playground borders", () => {
    let playgroundRects;
    beforeAll(async () => {
      let playground = await page.$("#playground");
      playgroundRects = await page.evaluate((playground) => {
        const { top, left, bottom, right } = playground.getBoundingClientRect();
        return { top, left, bottom, right };
      }, playground);
    });
    ["bottomRight", "topLeft"].forEach((cor) => {
      let Top = cor.slice(0, 3) === "top";
      let Left = cor.slice(cor.length - 4) === "Left";
      let topObj = { Top };
      let leftObj = { Left };
      [topObj, leftObj].forEach((D) => {
        let dir =
          Object.keys(D)[0] === "Top"
            ? Top
              ? "top"
              : "bottom"
            : Left
              ? "left"
              : "right";
        test(`The box's borders cannot surpass the ${dir} playground borders`, async (done) => {
          let {
            topLeft,
            topRight,
            bottomLeft,
            bottomRight,
          } = await getMesures();
          let corner = eval(cor);
          let startingX = Left ? corner.x + 2 : corner.x - 2;
          let startingY = Top ? corner.y + 2 : corner.y - 2;
          let targetX =
            dir === "left"
              ? playgroundRects.left - 10
              : dir === "right"
                ? playgroundRects.right + 10
                : startingX;
          let targetY =
            dir === "top"
              ? playgroundRects.top - 10
              : dir === "bottom"
                ? playgroundRects.bottom + 10
                : startingY;
          await page.mouse.move(startingX, startingY);
          await page.mouse.down();
          await page.mouse.move(targetX, targetY);
          await page.mouse.up();
          if (dir === "right") {
            expect(corner.x).toBeLessThanOrEqual(playgroundRects.right);
          } else if (dir === "left") {
            expect(corner.x).toBeGreaterThanOrEqual(playgroundRects.left);
          }
          if (dir === "top") {
            expect(corner.y).toBeGreaterThanOrEqual(playgroundRects.top);
          } else if (dir === "bottom") {
            expect(corner.y).toBeLessThanOrEqual(playgroundRects.bottom);
          }
          done();
        });
      });
    });
  });
});
