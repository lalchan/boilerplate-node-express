import config from "./env.js";

const corsOptions = {
    origin: config.getInstance().allowedDomains,
    methods: ['GET', 'POST', 'PUT', 'PATCH', "DELETE"],
    credentials: true,
    maxAge: 60
}
export default corsOptions
