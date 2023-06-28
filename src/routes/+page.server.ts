// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
function getRooms(): { rooms: any[] } {
    return {
        rooms: [
            {
                id: 1,
                name: 'Suite med havudsigt og stort badeværelse med bruser og badekar',
                price: 5200,
                image: 'https://stammershalle-badehotel.dk/wp-content/uploads/2023/04/Vaerelse-18.jpg',
                description: 'Dejlig Junior Suite på 1. sal med flot havudsigt. Suiten har tv samt nyt stort badeværelse med bruser og badekar, og så er den røgfri. Der er mulighed for at bo op til 3 eller 4 personer i suiten. Kontakt venligst receptionen herom.',
                meta: {
                    size: 22,
                    people: 4
                },
                availableRooms: 2
            },
            {
                id: 2,
                name: 'Dobbeltværelse på 1. sal med fransk altan',
                price: 3700,
                image: 'https://stammershalle-badehotel.dk/wp-content/uploads/2023/04/Vaerelse-10.jpeg',
                description: 'Hyggeligt, nyrenoveret dobbeltværelse på 1. sal med lille altan og udsigt til gårdterrasse og skov. Værelset har tv, badeværelse og er røgfrit.',
                meta: {
                    size: 18,
                    people: 2
                },
                availableRooms: 1
            }
        ]
    };
}

export async function load() {
    const rooms = getRooms();

    if (rooms) return rooms;
}