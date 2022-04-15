const mongoose = require('mongoose');
const { BadRequestError } = require('../error');
const handlePromise = require('../helpers/promise.helper');
const Collaborator = require('../models/collaborator.model');
exports.create = async function(req, res, next){
    if(!req.body.name)
        return next(new BadRequestError(400, "Tên không thể để trống"));
    const collaborator = new Collaborator(
        {
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone,
            website: req.body.website,
        }
    );
    const [error, document] = await handlePromise(collaborator.save());
    if(error)
        return next(new BadRequestError(500, "Có lỗi trong quá trình tạo"));
    return res.send(document);
};
exports.findAll = async function(req, res, next){
    const condition = {  };
    const {name} = req.query;
    if (name) 
        condition.name = { $regex: new RegExp(name), $options: "i" };
    
    const [error, documents] = await handlePromise(Collaborator.find(condition));
    if (error) 
        return next(new BadRequestError (500, "Có lỗi trong quá trình tìm kiếm"));
    return res.send(documents) ;
};
exports.findOne = async function(req, res, next){
    const {id} = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null
    }
    const [error, document] = await handlePromise(Collaborator.findOne(condition));
    if (error)
        return next(new BadRequestError(500, `Lỗi trong quá trình tìm kiếm cộng tác viên với id=${req.params.id}` )) ;
    
    if (!document) 
        return next(new BadRequestError(404, "Không tìm thấy cộng tác viên này" )) ;
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
        Collaborator.findOneAndUpdate(condition, req.body, { new: true} )
    );
    
    if (error) 
        return next(new BadRequestError(500, `Lỗi trong quá trình cập nhật cộng tác viên với id=${req.params.id}` )) ;
    
    if (!document) 
        return next(new BadRequestError(404, "Không tìm thấy cộng tác viên này”))"));
    
    return res.send({ message: "Cộng tác viên đã cập nhật thành công", });
};
exports.delete = async function(req, res, next){
    const {id} = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null
    };
    const [error, document] = await handlePromise(
        Collaborator.findOneAndDelete(condition)
    );
    if (error)
        return next(new BadRequestError(500, `Không thể xóa cộng tác viên với id=${req.params.iđ}` )) ;
    
    if (!document)
        return next(new BadRequestError(404, "Không tìm thấy cộng tác viên này"));
    return res.send({ message: "Đã xóa cộng tác viên thành công", });
};
exports.deleteAll = async function(req, res, next){
    const [error, data] = await handlePromise(
        Collaborator.deleteMany({ })
    );
    
    if (error)
        return next(new BadRequestError(500, "Có lỗi xảy ra trong quá trình xóa tất cả cộng tác viên"));
    return res.send({ message: `${data.deletedCount} cộng tác viên đã được xóa thành công`});
};