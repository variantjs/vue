module.exports = {
  content: [
    './src/development/**/*.{html,js,vue,ts}',
    './node_modules/@variantjs/core/src/config/**/*.ts'
  ],
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
