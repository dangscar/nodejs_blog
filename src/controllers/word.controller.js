// src/controllers/word.controller.js

const fs = require("fs");
const path = require("path");

const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

class WordController {

    index(req, res) {
        res.render("form");
    }

    async generate(req, res, next) {
        try {

            //Tham số cần truyền
            // const {
            //     tenSv,
            //     mssv,
            //     khoa,
            //     nganh,
            //     donVi,
            //     tuNgay,
            //     denNgay,
            //     nam,
            //     hetHan
            // } = req.body;

            const {
                hoTen,
                mssv,
                ngaySinh,
                noiSinh,
                hoKhauThuongTru,
                lop,
                khoa,
                ngayNhapHoc,
                thoiGianRaTruong,
                nganh,
                heDaoTao,
                email,
                soDienThoai,
                lyDo,
                ngayLamDon,
                thangLamDon,
                namLamDon,
                sdtPhuHuynh
            } = req.body;

            //Đường dẫn file path
            const templatePath = path.join(
                __dirname,
                "../templates/don-xin-thoi-hoc.docx"
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

            // doc.render({
            //     TEN_SV: tenSv,
            //     MSSV: mssv,
            //     KHOA: khoa,
            //     NGANH: nganh,
            //     DON_VI: donVi,
            //     TU_NGAY: tuNgay,
            //     DEN_NGAY: denNgay,
            //     NAM: nam,
            //     HET_HAN: hetHan
            // });

            doc.render({
                HO_TEN: hoTen,
                MSSV: mssv,
                NGAY_SINH: ngaySinh,
                NOI_SINH: noiSinh,
                HO_KHAU_THUONG_TRU: hoKhauThuongTru,
                LOP: lop,
                KHOA: khoa,
                NGAY_NHAP_HOC: ngayNhapHoc,
                THOI_GIAN_RA_TRUONG: thoiGianRaTruong,
                NGANH: nganh,
                HE_DAO_TAO: heDaoTao,
                EMAIL: email,
                SO_DIEN_THOAI: soDienThoai,
                LY_DO: lyDo,
                NGAY_LAM_DON: ngayLamDon,
                THANG_LAM_DON: thangLamDon,
                NAM_LAM_DON: namLamDon,
                SDT_PHU_HUYNH: sdtPhuHuynh
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
                "attachment; filename=file_export.docx"
            );

            return res.send(buffer);

        } catch (error) {
            next(error);
        }
    }
}

module.exports = new WordController();