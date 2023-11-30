/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.{html,js,php}",
    "!./node_modules/*/**",
    "./node_modules/flowbite/**/*.js"
  ],
  darkMode: 'class',
  theme: {
        screens: {
      'xs': '375px',
      'sm'  : '640px',
      'md'  : '768px',
      'lg'  : '1024px',
      'xl'  : '1280px',
      '2xl' : '1536px',
      '3xl' : '1920px',
      '4xl' : '2560px',
    },
    colors :{
      'white': '#fff',
      'gray' : {
        100 : '#e1e1e1',
        200 : '#d6d6d6',
        300 : '#c4c4c4',
        400 : '#bfbfbf',
        500 : '#a3a3a3',
        600 : '#61677A',
      },
      'dark' :{
        100 : '#222744',
        200 : '#12121c',
        300 : '#0d0d14',
        400 : '#06060a',
        500 : '#030305'
      },
      'green' : {
        100 :  '#03c988',
        200 : '#004b00',
        300 : '#009625'
      },
      'star' : '#F2BE22',
      'apblue' : {
        100 : '#026fc9',
        200 : '#035ea8',
        300 : '#2563eb'
      },
      'gmirai' : {
        100 : '#643DDB',
        200 :'#D915EF'
      },
      'pred' : '#D83F31',
      'porange': '#EE9322',
      'pyellow' : '#E9B824',
      'pgreen' : '#219C90'
    },
    fontFamily:{
      sans: ['Roboto', 'sans-serif']
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('flowbite/plugin'),
],
}
