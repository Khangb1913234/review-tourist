const mongoose = require('mongoose');
const { BadRequestError } = require('../error');
const handlePromise = require('../helpers/promise.helper');
const Destination = require('../models/destination.model');
exports.create = async function(req, res, next){
    if(!req.body.name)
        return next(new BadRequestError(400, "Tên không thể để trống"));
    const destination = new Destination(
        {
            name: req.body.name,
            location: req.body.location,
            description: req.body.description,
            image: req.body.image,
            collaborator_tour: req.body.collaborator_tour,
            trend: req.body.trend === true
        }
    );
    const [error, document] = await handlePromise(destination.save());
    if(error)
        return next(new BadRequestError(500, "Có lỗi trong quá trình tạo"));
    return res.send(document);
};
exports.findAll = async function(req, res, next){
    const condition = {  };
    const {name} = req.query;
    if (name) 
        condition.name = { $regex: new RegExp(name), $options: "i" };
    
    const [error, documents] = await handlePromise(Destination.find(condition));
    if (error) 
        return next(new BadRequestError (500, "Có lỗi trong quá trình tìm kiếm"));
    return res.send(documents) ;
};
exports.findOne = async function(req, res, next){
    const {id} = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null
    }
    const [error, document] = await handlePromise(Destination.findOne(condition));
    if (error)
        return next(new BadRequestError(500, `Lỗi trong quá trình tìm kiếm địa điểm với id=${req.params.id}` )) ;
    
    if (!document) 
        return next(new BadRequestError(404, "Không tìm thấy địa điểm này" )) ;
    return res.send(document);
};
exports.update = async function(req, res, next){
    if (Object.keys(req.body).length === 0)
        return next(new BadRequestError(400, "Dữ liệu cần cập nhật không thể trống" ));
	const {id} = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null
    };
    
    const [error, document] = await handlePromise(
        Destination.findOneAndUpdate(condition, req.body, { new: true} )
    );
    
    if (error) 
        return next(new BadRequestError(500, `Lỗi trong quá trình cập nhật địa điểm với id=${req.params.id}` )) ;
    
    if (!document) 
        return next(new BadRequestError(404, "Không tìm thấy địa điểm này”))"));
    
    return res.send({ message: "Địa điểm đã cập nhật thành công", });
};
exports.delete = async function(req, res, next){
    const {id} = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null
    };
    const [error, document] = await handlePromise(
        Destination.findOneAndDelete(condition)
    );
    if (error)
        return next(new BadRequestError(500, `Không thể xóa địa điểm với id=${req.params.iđ}` )) ;
    
    if (!document)
        return next(new BadRequestError(404, "Không tìm thấy địa điểm này"));
    return res.send({ message: "Đã xóa địa điểm thành công", });
};
exports.deleteAll = async function(req, res, next){
    const [error, data] = await handlePromise(
        Destination.deleteMany({ })
    );
    
    if (error)
        return next(new BadRequestError(500, "Có lỗi xảy ra trong quá trình xóa tất cả địa điểm"));
    return res.send({ message: `${data.deletedCount} địa điểm đã được xóa thành công`});
};
exports.findAllTrend = async function(req, res, next){
    const [error, documents] = await handlePromise(
        Destination.find({ favorite: true })
    );
    if (error)
        return next(new BadRequestError (500, "Có lỗi xảy ra trong quá trình tìm kiếm các địa điểm nổi tiếng"));
    return res.send(documents);
};