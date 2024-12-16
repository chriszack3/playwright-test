// import { addExtra } from 'playwright-extra';
// import stealth from 'puppeteer-extra-plugin-stealth';
// import playwright, { Page } from 'playwright';
// import { Cluster } from 'playwright-cluster';
// import { scrapeGoogle } from './functions/scrapeGoogle';
//import { init, addHeadlines, getAllHeadlines } from './persistence/mysql';

// const chromium = addExtra(playwright.chromium);
// chromium.use(stealth());

// const {
//     SEARCH_TERM: searchTerm = 'Another Debate 2024',
// } = process.env;

// (async () => {
//     console.log('Initializing connection to database...');
//     //await init()
//     console.log('Connection to database initialized!');

//     const cluster = await Cluster.launch({
//         concurrency: Cluster.CONCURRENCY_BROWSER,
//         maxConcurrency: 2,
//         playwright: chromium,
//         timeout: 10000,
//         playwrightOptions: {
//             headless: true,
//         }
//     });
//     await cluster.queue(async ({ page }: { page: Page }) => {
//         try {
//             console.log('Beginning scrape...');
//             const headlines = await scrapeGoogle(page, searchTerm);
//             console.log('Scrape successful!');
//             console.log('Headlines:', headlines);
//             console.log('Adding headlines to database...');
//             //await addHeadlines(headlines)
//             console.log('Headlines added to database!');
//             console.log('Done!')
//         } catch (error) {
//             console.log('Error during scrape:');
//             console.error(error);
//         }
//     });
//     setInterval(async () => { 
//         await cluster.queue(async ({ page }: { page: Page }) => {
//             try {
//                 console.log('Beginning scrape...');
//                 const headlines = await scrapeGoogle(page, searchTerm);
//                 console.log('Scrape successful!');
//                 console.log('Headlines:', headlines);
//                 console.log('Adding headlines to database...');
//                 //await addHeadlines(headlines)
//                 console.log('Headlines added to database!');
//                 console.log('Done!')
//             } catch (error) {
//                 console.log('Error during scrape:');
//                 console.error(error);
//             }
//         });
//     }, 30000)
// })();

console.log('Show this running in AWS');