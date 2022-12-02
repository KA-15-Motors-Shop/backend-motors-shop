import multer from "multer";
import path from "path";
import crypto from "crypto";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import { Request } from "express";

const storageTypes = {
    local: multer.diskStorage({
        destination: (req: Request, file: any, cb: any) => {
            cb(null, path.resolve('https://s3.console.aws.amazon.com/s3/buckets/upload-capstone-m4-grupo-14?region=sa-east-1&tab=objects'));
        } ,
        filename: (req: Request, file: any, cb: any) => {
            crypto.randomBytes(16, (err: any, hash: any) => {
                if (err) {
                    cb (err);
                };
                
                (file as any).key= `${hash.toString('hex')}-${file.originalname}`;

                cb(null, (file as any).key);
            })
        }
    }),
    s3: multerS3({
            s3: new aws.S3(),
            bucket: 'upload-capstone-m6',
            contentType: multerS3.AUTO_CONTENT_TYPE,
            acl: 'public-read',
            key: (req: Request, file: any, cb: any) => {
                crypto.randomBytes(16, (err: any, hash: any) => {
                    if (err) {
                        cb (err);
                    };
                
                    const fileName = `${hash.toString('hex')}-${file.originalname}`;

                    cb(null, fileName);
                })
        }
    })
};


module.exports = {
    dest: path.resolve('https://s3.console.aws.amazon.com/s3/buckets/upload-capstone-m4-grupo-14?region=sa-east-1&tab=objects'),
    storage: storageTypes['s3'],
    limits: {
        fileSize: 25 * 1024 * 1024
    },
    fileFilter: (req: Request, file: any, cb: any) => {
        const allowedMimes = [
            'image/jpeg'
        ];

        if (allowedMimes.includes((file as any).mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error('Invalid file type.'));
        };
    }
};