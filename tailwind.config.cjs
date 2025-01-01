/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx}'],
    mode: 'jit',
    theme: {
        extend: {
            colors: {
                primary: '#363944',
                secondary: '#aaa6c3',
                tertiary: '#151030',
                'black-100': '#100d25',
                'black-200': '#090325',
                'white-100': '#f3f3f3',
                customTeal: '#88DBDB',
                richBlack: '#111827',
                SnazyPop: '#4B1D3F',
            },
            boxShadow: {
                card: '0px 35px 120px -15px #211e35',
            },
            screens: {
                xs: '450px',
                mdo: '932px',
                mdo2: '800px',
                smo: '800px',
            },
            backgroundImage: {
                'main-bgx': "url('/src/assets/backgrounds/white_layers.jpg')",
            },
            height: {
                taskbar: '60px', // Adjust 40px to your taskbar height
            },
        },
    },
    plugins: [],
};
