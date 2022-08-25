const puppeteer = require("puppeteer");

let scrollToBottom = require("scroll-to-bottomjs");

const cheerio = require("cheerio");

async function scrapePropetyImages(url, browser) {
    // const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // await page.goto(`https://www.zameen.com${url}`);

    await page.goto(`https://www.zameen.com/new-projects/j_heights-2098.html`);


    // await page.evaluate(scrollToBottom);
    var objectToReturn = {}
    // try {



        // Property Details ....................

        var propertyDetails = await page.evaluate(() => {

            return document.querySelector(".detail").innerHTML
        });


        var $ = cheerio.load(propertyDetails)

        $("li").each((i, el) => {
            const fieldName = $(el).find(".category").text().replace(/[\t\n\r]/gm,'');
            const value = $(el).find(".value").text().replace(/[\t\n\r]/gm,'');
            objectToReturn[`${fieldName}`] = value
        })



        // Property Description ..............



        
        var propertyDescription = await page.evaluate(() => {

            return document.querySelector(".description").innerHTML

        });


         $ = cheerio.load(propertyDescription)

       
        objectToReturn.Description = $(".desc-text").text().replace(/[\t\n\r]/gm,'');





        // Property Images ..................


        // var propertyImages = await page.evaluate(() => {
        //     return document.querySelector(".fotorama__nav__shaft").innerHTML
        // });

        // $ = cheerio.load(propertyImages)

        // const imgArray = [];
        // $(".fotorama__nav__frame img").each((i, el) => {
        //     const val = $(el).attr("src");
        //     // const index = val.indexOf("-")
        //     // const retStr = val.slice(0, index + 1) + "800x600" + val.slice(index + 7)

        //     imgArray.push(val)
        // })

        // objectToReturn.propertyImages = imgArray





        // objectToReturn.link = `https://www.zameen.com/${url}`





        // Property Title ...............


        var propertyTitle = await page.evaluate(() => {
            return document.querySelector(".page-detail").innerHTML
        });

        $ = cheerio.load(propertyTitle)

        objectToReturn.Title = $(".title").text().replace(/[\t\n\r]/gm,'');
        objectToReturn.DetailLocation = $(".location").text().replace(/[\t\n\r]/gm,'');





        // Property Features


        var propertyFeatures = await page.evaluate(() => {

            return document.querySelector(".project-features").innerHTML
        });



        var $ = cheerio.load(propertyFeatures)

   
        $("li").each((i, el) => {
            // const fieldName = $(el).find("._3af7fa95").text()
            // const value = $(el).find("._812aa185").text()
            // objectToReturn[`${fieldName}`] = value

            const fieldName2 = $(el).find(".category").text()
            const arr = []
            const value2 = $(el).find(".left").each((i, d) => {
                var data = $(d).text()
                data = data.replace(/[\t\n\r]/gm,'');

                arr.push(data)
            })
            const str = arr

            objectToReturn[`${fieldName2}`] = str

        })



        console.log("data", objectToReturn)


    // }
    // catch {

        // objectToReturn.link = `https://www.zameen.com/${url}`
    
    // }


    await page.close();


    return objectToReturn;

}

module.exports = {
    scrapePropetyImages,
};
