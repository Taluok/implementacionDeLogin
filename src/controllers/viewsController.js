const showLogin = (req, res) => {
    // Tu lógica para mostrar la vista de login
    res.render('login');
};

const showRegister = (req, res) => {
    // Tu lógica para mostrar la vista de registro
    res.render('register');
};

const showProfile = (req, res) => {
    // Tu lógica para mostrar la vista de perfil
    res.render('profile', { user: req.session.user });
};

const showProducts = (req, res) => {
    // Tu lógica para mostrar la vista de productos
    res.render('products', { user: req.session.user });
};

export {
    showLogin,
    showRegister,
    showProfile,
    showProducts
};

