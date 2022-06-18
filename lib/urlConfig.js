// Constants.js
const prod = {
    url: {
        API_URL: 'https://your-store.vercel.app',
    }
};
const dev = {
    url: {
        API_URL: 'http://localhost:3000'
    }
};
export const config = process.env.NODE_ENV === 'development' ? dev : prod;