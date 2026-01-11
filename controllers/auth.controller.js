async function userRegister(req, res) {
    const { email, password } = req.body;
    const role = "user";
}
async function userLogin(req, res) {
    res.send("Login user");
}
export { userRegister, userLogin };
