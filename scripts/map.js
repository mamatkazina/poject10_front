// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com

mapboxgl.accessToken = 'pk.eyJ1IjoibW9zZ2F6IiwiYSI6ImNrZTlsbWdsZjI2dTgycW1zano0dGM2anMifQ.V6Q1uaV_K8FM5XH7YXdicA'; // BIM
export let mapLoaded = false;
export const map = new mapboxgl.Map( {

    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [ 37.60162, 55.72459], // { lng: 37.60162, lat: 55.72459 }
    zoom: 16,
    minZoom: 10,
    antialias: true,
    attributionControl: false,

} );

map.on( 'load', () => {
    mapLoaded = true;

    const marker1 = new mapboxgl.Marker()
        .setLngLat([37.60385696231654, 55.724668548185605])
        .addTo(map);

    if ( !map.getSource( 'point' ) ) {
        map.addSource( 'point', {

            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'type': 'Point',
                    'coordinates': [ 37.60385696231654, 55.724668548185605 ]

                }

            }

        } );
    }

    if ( !map.getSource( 'route' ) ) {

        map.addSource( 'route', {

            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'type': 'LineString',
                    'coordinates': [

                        [ 37.60065440475623,55.72162620107741 ],
                        [ 37.599871199724106,55.722067310781256 ],
                        [ 37.59901289283874,55.72265343514488 ],
                        [ 37.59834770500325,55.72301598189401 ],
                        [ 37.597693246002734,55.723275804993705 ],
                        [ 37.59751085579026,55.72345707589983 ],
                        [ 37.598090209705845,55.72378336314472 ],
                        [ 37.59873173943012,55.72356995992311 ],
                        [ 37.59959004631429,55.72315907918187 ],
                        [ 37.60064147224833,55.723733102547726 ],
                        [ 37.60040543785496,55.72392041360939 ],
                        [ 37.60110281219889,55.72429503303738 ],
                        [ 37.601950390248106,55.723793525568965 ],
                        [ 37.601692898182364,55.72374518715924 ],
                        [ 37.601027710346955,55.72371497562287 ],
                        [ 37.601016981510725,55.72335243536318 ],
                        [ 37.601553423313334,55.723080527959894 ],
                        [ 37.60081313362463,55.72268172700984 ],

                    ],

                }

            }

        } );

    }

    // const coordinates = [];

    map.on('click', ( e ) => {

        console.log( 'click', e.lngLat );
        // coordinates.push( [ e.lngLat.lng, e.lngLat.lat ] );
        // console.log( 'click', coordinates );
        // console.log( 'click', JSON.stringify( coordinates ) );

        

    } );

    if ( !map.getLayer( 'route' ) ) {

        map.addLayer( {

            'id': 'route',
            'type': 'line',
            'source': 'route',

            'layout': {
                'line-join': 'round',
                'line-cap': 'round',
            },

            'paint': {
                'line-color': '#888',
                'line-width': 8,
            }

        } );

    }    
});
