module.exports = {
  reactStrictMode: false, // Setting to true with React 18 causes API to be called twice in development mode, if this was a production app, wouldn't change and would deal with issue locally (https://stackoverflow.com/questions/71847778/why-my-nextjs-component-is-rendering-twice)
  images: {
    domains: ['images2.imgbox.com'],
  },
};
