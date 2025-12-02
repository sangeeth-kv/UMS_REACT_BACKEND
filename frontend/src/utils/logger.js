import log from "loglevel";

log.setLevel(import.meta.env.VITE_ENV ==="development"?"debug":"warn")


export default log

