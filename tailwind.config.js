const colors = require('tailwindcss/colors')

module.exports =
{
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true
    },
    theme: {
        fontFamily: {
            // serif: ['vollkorn', 'sans-serif'],
            sans: ['mostra-nuova', 'sans-serif'],
            serif: ['Cormorant Garamond', 'sans-serif']
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
            }
        }
    }
}
