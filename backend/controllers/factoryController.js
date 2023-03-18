exports.deleteOne = (Model) => async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) return next("No Document found with the provided ID.");

    res.status(204).json({
        status: true,
        data: null,
    });
};

exports.updateOne = (Model) => async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true, //this means return new updated document
        runValidators: true, // validate data everytime it change
    });
    if (!doc) return next("No Document found with the provided ID.");

    res.status(200).json({
        status: true,
        data: {
            doc,
        },
    });
};

exports.createOne = (Model) => async (req, res, next) => {
    let userData = {
        ...req.body,
        image: `http://localhost:${process.env.port || 8000}/img/users/${req.file.filename}`,
        username: `@${req.body.firstName}_${req.body.lastName}`,
    };
    const doc = await Model.create(userData);

    res.status(201).json({
        status: true,
        data: {
            doc,
        },
    });
};

exports.getOne = (Model) => async (req, res, next) => {
    const doc = await Model.findById(req.params.id);

    if (!doc) return next("No Document found with the provided ID.");

    res.status(200).json({
        status: true,
        data: {
            doc,
        },
    });
};

exports.getAll = (Model) => async (req, res, next) => {
    const docs = await Model.find({});

    res.status(200).json({
        status: true,
        results: docs.length,
        data: docs.length ? { docs } : "No Documents Available.",
    });
};
