import { addExtra } from 'playwright-extra';
//import stealth from 'puppeteer-extra-plugin-stealth';
import playwright, { Page } from 'playwright';
import { Cluster } from 'playwright-cluster';
import { scrapeGoogle } from './functions/scrapeGoogle';
import { init, addHeadlines, getAllHeadlines } from './persistence/mysql';

const chromium = addExtra(playwright.chromium);
//chromium.use(stealth());

const {
    MYSQL_TABLE: table = 'debate_2024',
    MYSQL_TABLE_2: table_2 = 'debate_2024',
    MYSQL_TABLE_3: table_3 = 'debate_2024',
    SEARCH_TERM: searchTerm = 'Another Debate 2024',
    SEARCH_TERM_2: searchTerm2 = 'Another Debate 2024',
    SEARCH_TERM_3: searchTerm3 = 'Another Debate 2024',
} = process.env;

(async () => {
    console.log('Initializing connection to database...');
    await init()
    console.log('Connection to database initialized!');

    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_BROWSER,
        maxConcurrency: 2,
        playwright: chromium,
        timeout: 100000,
        playwrightOptions: {
            headless: true,
            args: ['--no-sandbox', '--disable-gpu']
        }
    });
    await cluster.queue(async ({ page }: { page: Page }) => {
        try {
            console.log('Beginning scrape...');
            console.log('All headlines', await getAllHeadlines());
            const headlines = await scrapeGoogle(page, searchTerm);
            console.log('Scrape successful!');
            console.log('Headlines:', headlines);
            console.log('Adding headlines to table...');
            await addHeadlines(headlines, table)
            console.log('Headlines added to table!');
            console.log('Done!')
        } catch (error) {
            console.log('Error during scrape:');
            console.error(error);
        }
    });
    setInterval(async () => {
        await cluster.queue(async ({ page }: { page: Page }) => {
            try {
                console.log('Beginning scrape...');
                const headlines = await scrapeGoogle(page, searchTerm);
                console.log('Scrape successful!');
                console.log('Headlines:', headlines);
                console.log('Adding headlines to table...');
                await addHeadlines(headlines, table)
                console.log('Headlines added to table!');
                console.log('Done!')
            } catch (error) {
                console.log('Error during scrape:');
                console.error(error);
            }
        });
    }, 30000)
    await cluster.queue(async ({ page }: { page: Page }) => {
        try {
            console.log('Beginning scrape...');
            console.log('All headlines', await getAllHeadlines());
            const headlines = await scrapeGoogle(page, searchTerm2);
            console.log('Scrape successful!');
            console.log('Headlines 2:', headlines);
            console.log('Adding headlines to table_2...');
            await addHeadlines(headlines, table_2)
            console.log('Headlines added to table_2!');
            console.log('Done!')
        } catch (error) {
            console.log('Error during scrape:');
            console.error(error);
        }
    });
    setInterval(async () => {
        await cluster.queue(async ({ page }: { page: Page }) => {
            try {
                console.log('Beginning scrape...');
                const headlines = await scrapeGoogle(page, searchTerm2);
                console.log('Scrape successful!');
                console.log('Headlines 2:', headlines);
                console.log('Adding headlines to table_2...');
                await addHeadlines(headlines, table_2)
                console.log('Headlines added to table_2!');
                console.log('Done!')
            } catch (error) {
                console.log('Error during scrape:');
                console.error(error);
            }
        });
    }, 30000)
    await cluster.queue(async ({ page }: { page: Page }) => {
        try {
            console.log('Beginning scrape...');
            console.log('All headlines', await getAllHeadlines());
            const headlines = await scrapeGoogle(page, searchTerm3);
            console.log('Scrape successful!');
            console.log('Headlines 3:', headlines);
            console.log('Adding headlines to table_3...');
            await addHeadlines(headlines, table_3)
            console.log('Headlines added to table_3!');
            console.log('Done!')
        } catch (error) {
            console.log('Error during scrape:');
            console.error(error);
        }
    });
    setInterval(async () => {
        await cluster.queue(async ({ page }: { page: Page }) => {
            try {
                console.log('Beginning scrape...');
                const headlines = await scrapeGoogle(page, searchTerm3);
                console.log('Scrape successful!');
                console.log('Headlines 3:', headlines);
                console.log('Adding headlines to table_3...');
                await addHeadlines(headlines, table_3)
                console.log('Headlines added to table_3!');
                console.log('Done!')
            } catch (error) {
                console.log('Error during scrape:');
                console.error(error);
            }
        });
    }, 30000)
})();