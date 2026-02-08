const logger=require("../config/logger")

async function requireRole() {
    try {
        
    } catch (error) {
        logger.error(error)
        throw new Error("Some problem , Please try after sometimes")
    }
}

module.exports=requireRole