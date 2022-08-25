const puppeteer = require("puppeteer");

let scrollToBottom = require("scroll-to-bottomjs");

const propertyImages = require("./propertyImages");


const cheerio = require("cheerio");

async function scrapeZameenData(url, propertyType , city) {

  console.log("url", url)
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // await page.setDefaultNavigationTimeout(90000); 
  await page.goto(url);

  await page.evaluate(scrollToBottom);

  var title = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".style_property_grid_item__9YgFr")).map(
      (child) => child.innerHTML
    );
  });

  console.log("length", title.length)

  const zameenData = await Promise.all(
    title.slice(0,10).map(async (el) => {
    const $ = cheerio.load(el);

    var retObj = {};


    $(".style_product_image__UOxoC").filter(function () {
      retObj.link = $(this).attr("href");
    });

    retObj = await propertyImages.scrapePropetyImages(retObj.link, browser)


    $(".style_date__EdYQK").filter(function () {
      retObj.datePosted = $(this).text();
    });

    $(".style_product_image__UOxoC").filter(function () {

      var partOfLink = $(this).attr("href");
      retObj.link = `https://www.graana.com${partOfLink}`
    });

  



    return retObj;
  }))


  const zameenData2 = await Promise.all(
    title.slice(10,20).map(async (el) => {
    const $ = cheerio.load(el);

    var retObj = {};


    $(".style_product_image__UOxoC").filter(function () {
      retObj.link = $(this).attr("href");
    });

    retObj = await propertyImages.scrapePropetyImages(retObj.link, browser)


    $(".style_date__EdYQK").filter(function () {
      retObj.datePosted = $(this).text();
    });

    $(".style_product_image__UOxoC").filter(function () {

      var partOfLink = $(this).attr("href");
      retObj.link = `https://www.graana.com${partOfLink}`
    });

  



    return retObj;
  }))


  const zameenData3 = await Promise.all(
    title.slice(20,30).map(async (el) => {
    const $ = cheerio.load(el);

    var retObj = {};


    $(".style_product_image__UOxoC").filter(function () {
      retObj.link = $(this).attr("href");
    });

    retObj = await propertyImages.scrapePropetyImages(retObj.link, browser)


    $(".style_date__EdYQK").filter(function () {
      retObj.datePosted = $(this).text();
    });

    $(".style_product_image__UOxoC").filter(function () {

      var partOfLink = $(this).attr("href");
      retObj.link = `https://www.graana.com${partOfLink}`
    });

  



    return retObj;
  }))




  


  const c1 = zameenData.concat(zameenData2)
  const finalZameenData = c1.concat(zameenData3)



  browser.close();

  return  {finalZameenData};
}

module.exports = {
  scrapeZameenData,
};
