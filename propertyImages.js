const puppeteer = require("puppeteer");

let scrollToBottom = require("scroll-to-bottomjs");

const cheerio = require("cheerio");

async function scrapePropetyImages(url, browser) {

    // const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`https://www.graana.com${url}`, {
        waitUntil: 'networkidle0',
    });

    // await page.goto(`https://www.zameen.com/new-projects/j_heights-2098.html`);


    // await page.evaluate(scrollToBottom);
    var objectToReturn = {}

    try {


        objectToReturn.purpose = "For Rent"


        

        // Property price, location ....................

        var propertyTitle = await page.evaluate(() => {

            return document.querySelector(".style_property_title_wrapper__IIuF4").innerHTML

        });


        var $ = cheerio.load(propertyTitle)

        objectToReturn.Price = $(".style_price__Wd9v5").text()



        objectToReturn.Address = $(".style_property_area__gorWh").text()






        // Property Title , Detail ....................




        var propertyDetails = await page.evaluate(() => {

            return document.querySelector("#aboutProperty").innerHTML

        });

        var $ = cheerio.load(propertyDetails)



        $(".style_property_about_desc__G3hZ5").filter(function () {

            objectToReturn.Title = $(this).children().first().text();

        });




        $("div").filter(function () {

            objectToReturn.Details = $(this).text().replace(/[\t\n\r]/gm, '');

        });







        // Property features ..........



        var propertyFeatures = await page.evaluate(() => {

            return document.querySelector("#propertyFeatures").innerHTML

        });


        var $ = cheerio.load(propertyFeatures)

        var features = []

        $("li").each((i, el) => {

            features.push($(el).text());

        })

        objectToReturn.Features = features






        // Property Neighbourhood ....................

        var propertyNeighbourhood = await page.evaluate(() => {

            return document.querySelector("#propertyNeighbourhood").innerHTML

        });

        var $ = cheerio.load(propertyNeighbourhood)

        objectToReturn.propertyNeighbourhood = $(".style_inner_section_content_wrapper__LOkYG").text()




        // Property bedrooms, washrooms,  ..............

        var propertyAmenities = await page.evaluate(() => {

            return document.querySelector(".style_featured_amenities_list__fp3Vc").innerHTML
        });


        var $ = cheerio.load(propertyAmenities)

        $("li").each((i, el) => {
            const fieldName = $(el).find(".style_item_content__tfZXY").children().last().text();
            const value = $(el).find(".style_item_content__tfZXY").children().first().text();
            objectToReturn[`${fieldName}`] = value
        })




        
        // Property Posted By ....................

        var propertyPostedBy = await page.evaluate(() => {

            return document.querySelector(".style_property_agent_inner_wrapper__84fh4").innerHTML

        });

        var $ = cheerio.load(propertyPostedBy)

        objectToReturn.postedBy = $(".style_agent_details__SXop5 .style_title__WD3vv").text()







    }
    catch (error) {

        console.log("error", error)

    }


    await page.close();


    return objectToReturn;

}

module.exports = {
    scrapePropetyImages,
};
