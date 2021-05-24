module.exports.v2 = {
    config: () => {},
    uploader: {
        upload:(path, options, cb) => {
            cd(null, {public_id: 123456,
            secure_url: 'secure_url_cloudinary'})
        }       
}
}
