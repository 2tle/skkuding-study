export default function (cb) {
    return async (req, res, next) => {
        try {
            await cb(req,res)
        }
        catch(e) {
            next(e);
        }
    }
}