const bcrypt=require("bcrypt")


async function hashPassword(password) {
    return bcrypt.hash(password,Number(process.env.SALT_ROUNDS))
}

async function verifyPassword(password,hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}

module.exports={
    hashPassword,
    verifyPassword
}