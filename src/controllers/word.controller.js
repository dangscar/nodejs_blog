// src/controllers/word.controller.js

const fs = require("fs");
const path = require("path");

const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

class WordController {

    async generate(req, res, next) {
        try {

            //Tham số cần truyền
            const {
                tenSv,
                mssv,
                khoa,
                nganh,
                donVi,
                tuNgay,
                denNgay,
                nam,
                hetHan
            } = req.body;
        
            //Đường dẫn file path
            const templatePath = path.join(
                __dirname,
                "../templates/gioi-thieu.docx"
            );

            //Đọc toàn bộ file word vào RAM
            const content = fs.readFileSync(
                templatePath,
                "binary"
            );


            const zip = new PizZip(content);

            //Cho phép tạo xử lý file word
            const doc = new Docxtemplater(zip, {
                paragraphLoop: true,
                linebreaks: true,
            });

            doc.render({
                TEN_SV: tenSv,
                MSSV: mssv,
                KHOA: khoa,
                NGANH: nganh,
                DON_VI: donVi,
                TU_NGAY: tuNgay,
                DEN_NGAY: denNgay,
                NAM: nam,
                HET_HAN: hetHan
            });

            const buffer = doc
                .getZip()
                .generate({
                    type: "nodebuffer",
                    compression: "DEFLATE",
                });

            //Báo cho trình duyệt đây là file word
            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            );

            //Thay đổi tên file
            res.setHeader(
                "Content-Disposition",
                "attachment; filename=giay-gioi-thieu3.docx"
            );

            return res.send(buffer);

        } catch (error) {
            next(error);
        }
    }
}

module.exports = new WordController();