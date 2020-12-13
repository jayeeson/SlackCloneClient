// import customizeCra from 'customize-cra';

// const { override, useBabelRc: BabelRc } = customizeCra;

// export default override(BabelRc());

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { useBabelRc: BabelRc, override } = require('customize-cra');

module.exports = override(BabelRc());
