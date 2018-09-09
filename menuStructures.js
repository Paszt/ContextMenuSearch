/* exported defaultMenuStructure, presets */

const defaultMenuStructure = [{
        id: '00',
        type: 'item',
        name: 'IMDb',
        urls: ['https://www.imdb.com/find?q=%s'],
        tabtype: '(Standard)',
        enabled: true
    }, {
        id: '01',
        type: 'item',
        name: 'TMDb',
        urls: ['https://www.themoviedb.org/search?query=%s'],
        tabtype: '(Standard)',
        enabled: true
    },
    {
        id: '02',
        type: 'item',
        name: 'Wikipedia',
        urls: ['https://en.wikipedia.org/w/index.php?search=%s'],
        tabtype: '(Standard)',
        enabled: true
    }
];

// const exampleGroupStructure = [
//     [{
//         id: 12,
//         type: 'group',
//         name: 'IMDb',
//         children: [{
//             tabtype: '(Same Tab)',
//             name: 'Test 1',
//             url: 'http://test1.com/%s',
//             type: 'item'
//         }],
//         enabled: true
//     }]
// ];

// const testArray = [{
//         id: '00',
//         type: 'item',
//         enabled: true
//     },
//     {
//         id: '01',
//         type: 'group',
//         enabled: true,
//         children: [{
//                 id: 'G10',
//                 type: 'item',
//                 enabled: false
//             },
//             {
//                 id: 'G11',
//                 type: 'item',
//                 enabled: false
//             }
//         ]
//     }, {
//         id: '03',
//         type: 'item',
//         enabled: true
//     }
// ];

const presets = [{
        id: 'ws1',
        category: 'Web Search',
        name: 'Ask.com',
        url: 'http://www.ask.com/web?q=%s'
    },
    {
        id: 'ws2',
        category: 'Web Search',
        name: 'Bing',
        url: 'http://www.bing.com/search?q=%s'
    },
    {
        id: 'ws3',
        category: 'Web Search',
        name: 'Baidu',
        url: 'http://www.baidu.com/s?wd=%s'
    },
    {
        id: 'ws4',
        category: 'Web Search',
        name: 'Dogpile',
        url: 'http://www.dogpile.com/search/web?q=%s'
    },
    {
        id: 'ws5',
        category: 'Web Search',
        name: 'Google Definition',
        url: 'https://www.google.com/search?q=define:%s'
    },
    {
        id: 'ws6',
        category: 'Web Search',
        name: 'Metacrawler',
        url: 'http://www.metacrawler.com/serp?q=%s'
    },
    {
        id: 'ws7',
        category: 'Web Search',
        name: 'Yahoo! Search',
        url: 'http://search.yahoo.com/search?p=%s'
    },
    {
        id: 'ws8',
        category: 'Web Search',
        name: 'Wikipedia EN',
        url: 'https://en.wikipedia.org/w/index.php?search=%s'
    },
    {
        id: 'ws9',
        category: 'Web Search',
        name: 'Wolfram Alpha',
        url: 'http://www.wolframalpha.com/input/?i=%s'
    },
    {
        id: 'is1',
        category: 'Image Search',
        name: '',
        url: '%s'
    },
    {
        id: 'tm1',
        category: 'TV / Movie',
        name: 'IMDb',
        url: 'https://www.imdb.com/find?q=%s'
    },
    {
        id: 'tm2',
        category: 'TV / Movie',
        name: 'TMDb',
        url: 'https://www.themoviedb.org/search?query=%s'
    },
    {
        id: 'tm3',
        category: 'TV / Movie',
        name: '',
        url: ''
    },
    {
        id: 'm1',
        category: 'Music',
        name: '',
        url: ''
    },
    {
        id: 's1',
        category: 'Social',
        name: '',
        url: ''
    },
    {
        id: 'sh1',
        category: 'Shopping',
        name: '',
        url: ''
    },
    {
        id: 'n1',
        category: 'News',
        name: '',
        url: ''
    }
];
