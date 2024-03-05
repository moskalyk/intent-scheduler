const fs = require('fs');

const capitalCities = {
    af: "Pretoria", // Afrikaans in South Africa
    sq: "Tirana", // Albanian in Albania
    am: "Addis Ababa", // Amharic in Ethiopia
    ar: "Riyadh", // Arabic in Saudi Arabia (Arabic is widely spoken in many countries)
    hy: "Yerevan", // Armenian in Armenia
    az: "Baku", // Azerbaijani in Azerbaijan
    eu: "Vitoria-Gasteiz", // Basque in Basque Country (Spain, not a sovereign nation)
    be: "Minsk", // Belarusian in Belarus
    bn: "Dhaka", // Bengali in Bangladesh
    bs: "Sarajevo", // Bosnian in Bosnia and Herzegovina
    bg: "Sofia", // Bulgarian in Bulgaria
    ca: "Barcelona", // Catalan in Catalonia (Spain, not a sovereign nation)
    ceb: "Cebu City", // Cebuano in the Philippines (not a capital, but significant)
    ny: "Lilongwe", // Chichewa in Malawi
    zh: "Beijing", // Chinese Simplified in China
    "zh-cn": "Beijing", // Chinese Simplified in China
    "zh-tw": "Taipei", // Chinese Traditional in Taiwan
    co: "Ajaccio", // Corsican in Corsica (France, not a sovereign nation)
    hr: "Zagreb", // Croatian in Croatia
    cs: "Prague", // Czech in Czech Republic
    da: "Copenhagen", // Danish in Denmark
    nl: "Amsterdam", // Dutch in Netherlands
    en: "London", // English in United Kingdom
    eo: "N/A", // Esperanto; no capital city applicable
    et: "Tallinn", // Estonian in Estonia
    tl: "Manila", // Filipino in the Philippines
    fi: "Helsinki", // Finnish in Finland
    fr: "Paris", // French in France
    fy: "Leeuwarden", // Frisian in Friesland (Netherlands, not a sovereign nation)
    gl: "Santiago de Compostela", // Galician in Galicia (Spain, not a sovereign nation)
    ka: "Tbilisi", // Georgian in Georgia
    de: "Berlin", // German in Germany
    el: "Athens", // Greek in Greece
    gu: "Gandhinagar", // Gujarati in India (Gujarat state)
    ht: "Port-au-Prince", // Haitian Creole in Haiti
    ha: "Abuja", // Hausa in Nigeria
    haw: "Honolulu", // Hawaiian in Hawaii (USA, not a sovereign nation)
    he: "Jerusalem", // Hebrew in Israel
    hi: "New Delhi", // Hindi in India
    hmn: "N/A", // Hmong; no specific capital city
    hu: "Budapest", // Hungarian in Hungary
    is: "Reykjavik", // Icelandic in Iceland
    ig: "Abuja", // Igbo in Nigeria
    id: "Jakarta", // Indonesian in Indonesia
    ga: "Dublin", // Irish in Ireland
    it: "Rome", // Italian in Italy
    ja: "Tokyo", // Japanese in Japan
    jw: "Yogyakarta", // Javanese in Indonesia (Yogyakarta special region)
    kn: "Bengaluru", // Kannada in India (Karnataka state)
    kk: "Nur-Sultan", // Kazakh in Kazakhstan
    km: "Phnom Penh", // Khmer in Cambodia
    rw: "Kigali", // Kinyarwanda in Rwanda
    ko: "Seoul", // Korean in South Korea
    ku: "Erbil", // Kurdish (Kurmanji) in Iraqi Kurdistan (Iraq, not a sovereign nation)
    ky: "Bishkek", // Kyrgyz in Kyrgyzstan
    lo: "Vientiane", // Lao in Laos
    la: "Vatican City", // Latin in Vatican City (though not spoken as a native language)
    lv: "Riga", // Latvian in Latvia
    lt: "Vilnius", // Lithuanian in Lithuania
    lb: "Luxembourg", // Luxembourgish in Luxembourg
    mk: "Skopje", // Macedonian in North Macedonia
    mg: "Antananarivo", // Malagasy in Madagascar
    ms: "Kuala Lumpur", // Malay in Malaysia
    ml: "Thiruvananthapuram", // Malayalam in India (Kerala state)
    mt: "Valletta", // Maltese in Malta
    mi: "Wellington", // Maori in New Zealand
    mr: "Mumbai", // Marathi in India (Maharashtra state)
    mn: "Ulaanbaatar", // Mongolian in Mongolia
    my: "Naypyidaw", // Myanmar (Burmese) in Myanmar
    ne: "Kathmandu", // Nepali in Nepal
    no: "Oslo", // Norwegian in Norway
    or: "Bhubaneswar", // Odia (Oriya) in India (Odisha state)
    ps: "Kabul", // Pashto in Afghanistan
    fa: "Tehran", // Persian in Iran
    pl: "Warsaw", // Polish in Poland
    pt: "Lisbon", // Portuguese in Portugal
    pa: "Chandigarh", // Punjabi in India (Punjab state)
    ro: "Bucharest", // Romanian in Romania
    ru: "Moscow", // Russian in Russia
    sm: "Apia", // Samoan in Samoa
    gd: "Edinburgh", // Scots Gaelic in Scotland (UK, not a sovereign nation)
    sr: "Belgrade", // Serbian in Serbia
    st: "Maseru", // Sesotho in Lesotho
    sn: "Harare", // Shona in Zimbabwe
    sd: "Karachi", // Sindhi in Pakistan (Sindh province)
    si: "Colombo", // Sinhala in Sri Lanka
    sk: "Bratislava", // Slovak in Slovakia
    sl: "Ljubljana", // Slovenian in Slovenia
    so: "Mogadishu", // Somali in Somalia
    es: "Madrid", // Spanish in Spain
    su: "Bandung", // Sundanese in Indonesia (not a capital, but significant)
    sw: "Dodoma", // Swahili in Tanzania
    sv: "Stockholm", // Swedish in Sweden
    tg: "Dushanbe", // Tajik in Tajikistan
    ta: "Chennai", // Tamil in India (Tamil Nadu state)
    tt: "Kazan", // Tatar in Russia (Tatarstan republic)
    te: "Hyderabad", // Telugu in India (Telangana state)
    th: "Bangkok", // Thai in Thailand
    tr: "Ankara", // Turkish in Turkey
    tk: "Ashgabat", // Turkmen in Turkmenistan
    uk: "Kyiv", // Ukrainian in Ukraine
    ur: "Islamabad", // Urdu in Pakistan
    ug: "Ürümqi", // Uyghur in China (Xinjiang region)
    uz: "Tashkent", // Uzbek in Uzbekistan
    vi: "Hanoi", // Vietnamese in Vietnam
    cy: "Cardiff", // Welsh in Wales (UK, not a sovereign nation)
    xh: "Mthatha", // Xhosa in South Africa (Eastern Cape province)
    yi: "Jerusalem", // Yiddish (historically Eastern Europe, placed Jerusalem considering significant speakers)
    yo: "Ibadan", // Yoruba in Nigeria (not a capital, but significant)
    zu: "Pietermaritzburg", // Zulu in South Africa (KwaZulu-Natal province)
};

console.log(capitalCities);

const request = require('request');

const cityValues = Object.values(capitalCities)
const cityKeys = Object.keys(capitalCities)

const points: any = [];

// cityValues.slice(0,1).map((city) => {

async function fetchGeocoding(city: any) {
    const url = `https://api.api-ninjas.com/v1/geocoding?city=${city}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-Api-Key': ''
        }
      });
  
      if (!response.ok) throw new Error(`Error: ${response.status} ${await response.text()}`);
  
      const body = await response.json();
      console.log(body);
      return body; // Returning the body in case you need the response outside
    } catch (error) {
      console.error('Request failed:', error);
      return null; // Indicate failure
    }
  }

(async () => {
    // // for(let i = 0; i < 1; i++){
    // for(let i = 0; i < cityValues.length; i++){

    //     const res = await fetchGeocoding(cityValues[i])
    //     console.log(res)

    //     // const json = await res.json()
    //     // console.log(json)
    //     points.push({
    //         lat: res[0]['latitude'],
    //         lng: res[0]['longitude'],
    //         cap: cityValues[i],
    //         lan: cityKeys[i]
    //     })

    // }

    async function readAndSortCitiesByLongitude(fileName: any) {
        try {
          // Read file asynchronously
          const data = fs.readFileSync(fileName, 'utf8');

          // Parse the JSON data
          const cities = JSON.parse(data);
            
          console.log(cities)

          // Find Toronto's index and longitude for reference
          const torontoIndex = cities.findIndex((city: any) => city.cap === 'Toronto');
          const torontoLongitude = cities[torontoIndex].lng;
      
          // Sort cities based on longitude, from west to east starting from Toronto
          const sortedCities = cities.sort((a: any, b: any) => {
            // Adjust longitudes relative to Toronto's longitude
            let adjustedLngA = a.lng - torontoLongitude;
            let adjustedLngB = b.lng - torontoLongitude;
      
            // Normalize longitudes to handle global wrap-around
            adjustedLngA = adjustedLngA < 0 ? adjustedLngA + 360 : adjustedLngA;
            adjustedLngB = adjustedLngB < 0 ? adjustedLngB + 360 : adjustedLngB;
      
            return adjustedLngA - adjustedLngB;
          });
      
          console.log(sortedCities);
          return sortedCities; // In case you need to use the sorted list outside
        } catch (error) {
          console.error('Error reading or processing the file:', error);
        }
      }
      
      // Example usage
    //   const fileName = './output.json';
    //   const cities = await readAndSortCitiesByLongitude(fileName);

    // // // Convert the array to a JSON string
    // const jsonString = JSON.stringify(cities, null, 2); // The second and third arguments beautify the output

    // // // Write the JSON string to a file
    // fs.writeFile('bias_align.json', jsonString, (err: any) => {
    //     if (err) {
    //         console.error('An error occurred:', err);
    //         return;
    //     }
        
    //     console.log('JSON data has been written to output.json successfully.');
    // });

    
      // get cities, filter by cli prompt
      // create for loop
      // wait on time / 100*1000
      // get humidity
      // X - Math.min(60*1000*60 * humidity / 100, X - Y)
})();