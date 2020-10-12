module.exports =
{
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true
    },
    theme: {
        fontFamily: {
            serif: ['vollkorn', 'sans-serif'],
            sans: ['mostra-nuova', 'sans-serif'],
        },
        plugins: [require('@tailwindcss/typography')],
        container: {
            center: true
            // maxWidth: '1024px'
        },
        extend: {
            colors: {
                'red-highlight': '#B73225',
                'blue-minded': '#004E7C',
                'maroon-six': '#591COB',
                'grey-water': '#5C5F58',
                'lighter-gray': '#DCE1E3'
            },
            lineHeight: {
                'extra-tight': '.75'
            }
        }
    }
}
