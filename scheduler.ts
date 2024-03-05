import * as fs from 'fs'

//@ts-ignore
const languages = process?.argv?.find(arg => arg.startsWith('--langs=')).split('=')[1].split(',');
let relativity: boolean;

try {
    //@ts-ignore
    relativity = process?.argv?.find(arg => arg.startsWith('--relativity=')).split('=')[1] ? true : false
}catch(err){
    console.log('no relativity')
}

if (languages.length === 0) {
    console.error('Usage: pnpm run sched --langs=<comma_separated_languages>');
    process.exit(1);
}

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

function timeForSunToTraverse(long1: any, lat1: any, long2: any, lat2: any) {
    // Calculate the difference in longitude
    let longDiff = Math.abs(long1 - long2);

    // Earth rotates 360 degrees in 24 hours
    // Convert 24 hours to milliseconds: 24 * 60 * 60 * 1000 = 86400000 milliseconds
    const earthRotationTimeMs = 86400000;

    // Calculate the time it takes for the sun to traverse the earth for the given longitude difference
    let timeMs = (longDiff / 360) * earthRotationTimeMs;

    return timeMs;
}
      // Async function to compute wait times and simulate waits
async function computeWaitTimes(cities: any[], runner: any, delta: any) {
    const waitTimes: number[] = [];
  
    for (let i = 0; i < cities.length - 1; i++) {
      const city1 = cities[i];
      const city2 = cities[i + 1];
      const waitTime = timeForSunToTraverse(city1.lng, city1.lat, city2.lng, city2.lat);
      waitTimes.push(relativity ? delta(waitTime / (60*1000)) : delta(waitTime));
    }
  
    for (let i = 0; i < waitTimes.length; i++) {
      await wait(waitTimes[i]);
      runner(waitTimes[i])
    }
}
  
const data = fs.readFileSync('./bias_align.json', 'utf8');
const cities = JSON.parse(data);
const filteredList = cities.filter((item: any) => languages.includes(item.lan));
  
(async () => {

    const runner = (waitTime: any) => {
      console.log('Compute with ' + waitTime.toFixed(2) + 'ms');
    }

    const delta = (waitTime: any) => {
        let delta = 0;
        /*
            delta update
        */
        return waitTime - delta
    }

    await computeWaitTimes(filteredList, runner, delta);

})();