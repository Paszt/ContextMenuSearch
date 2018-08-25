/* exported defaultMenuStructure */

const defaultMenuStructure = [{
        id: '00',
        type: 'item',
        name: 'IMDb',
        url: 'https://www.imdb.com/find?q=%s',
        tabtype: '(Standard)',
        enabled: true
    }, {
        id: '01',
        type: 'item',
        name: 'TMDb',
        url: 'https://www.themoviedb.org/search?query=%s',
        tabtype: '(Standard)',
        enabled: true
    },
    {
        id: '02',
        type: 'item',
        name: 'Wikipedia',
        url: 'https://en.wikipedia.org/w/index.php?search=%s',
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
//     id: '00',
//     type: 'item',
// }, {
//     id: '01',
//     type: 'group',
//     children: [{
//         id: 'G10',
//         type: 'item'
//     }]
// }, {
//     id: '03',
//     type: 'item',
// }];
