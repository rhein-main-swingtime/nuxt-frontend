const colors = require('tailwindcss/colors')

module.exports =
{
    darkMode: 'media',
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true
    },
    theme: {
        fontFamily: {
            // serif: ['vollkorn', 'sans-serif'],
            sans: ['mostra-nuova', 'sans-serif'],
            // serif: ['Cormorant Garamond', 'sans-serif']
            serif: ['futura-pt', 'sans-serif']
            // sans: ['Poiret One', 'sans-serif']
        },
        plugins: [require('@tailwindcss/typography')],
        container: {
            center: true
            // maxWidth: '1024px'
        },
        // colors,
        extend: {
            colors: {
                // 'red-highlight': '#B73225',
                // 'blue-minded': '#004E7C',
                // 'maroon-six': '#591COB',
                // 'grey-water': '#5C5F58',
                // 'lighter-gray': '#DCE1E3',
                teal: {
                    100: '#e6fffa',
                    200: '#b2f5ea',
                    300: '#81e6d9',
                    400: '#4fd1c5',
                    500: '#38b2ac',
                    600: '#319795',
                    700: '#2c7a7b',
                    800: '#285e61',
                    900: '#234e52'
                }
            },
            lineHeight: {
                'extra-tight': '.75'
            },
            zIndex: {
                100: 100,
                110: 110,
                120: 120,
                130: 130,
                140: 140,
                150: 150,
                160: 160,
                170: 170,
                180: 180,
                190: 190,
                1000: 1000,
                1100: 1100,
                1200: 1200,
                1300: 1300,
                1400: 1400,
                1500: 1500,
                1600: 1600,
                1700: 1700,
                1800: 1800,
                1900: 1900

            }
        }
    }
}
