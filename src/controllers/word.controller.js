// src/controllers/word.controller.js

const fs = require("fs");
const path = require("path");
const libre = require("libreoffice-convert");

const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

async function convertDocxToPdf(buffer) {
    return new Promise((resolve, reject) => {
        libre.convert(buffer, ".pdf", undefined, (err, done) => {
            if (err) return reject(err);
            resolve(done);
        });
    });
}

class WordController {

    index(req, res) {
        res.render("form");
    }

    async generate(req, res, next) {
        try {

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

            const format = req.query.format || "docx";
            return this.generateDoc(
                res,
                "don-xin-thoi-hoc.docx",
                "don_xin_thoi_hoc.docx",
                {
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
                },
                format
            );

        } catch (error) {
            next(error);
        }
    }

    async generateBaoLuu(req, res, next) {
        try {

            const {
                hoTen,
                mssv,
                ngaySinh,
                noiSinh,
                hoKhauThuongTru,
                lop,
                khoa,
                heDaoTao,
                email,
                soDienThoai,
                soHocKyBaoLuu,
                thangBatDau,
                namBatDau,
                thangKetThuc,
                namKetThuc,
                lyDo,
                sdtPhuHuynh,
                ngayLamDon,
                thangLamDon,
                namLamDon
            } = req.body;

            const format = req.query.format || "docx";

            return this.generateDoc(
                res,
                "don-bao-luu.docx",
                "don_bao_luu.docx",
                {
                    HO_TEN: hoTen,
                    MSSV: mssv,
                    NGAY_SINH: ngaySinh,
                    NOI_SINH: noiSinh,
                    HO_KHAU_THUONG_TRU: hoKhauThuongTru,
                    LOP: lop,
                    KHOA: khoa,
                    HE_DAO_TAO: heDaoTao,
                    EMAIL: email,
                    SO_DIEN_THOAI: soDienThoai,
                    SO_HOC_KY_BAO_LUU: soHocKyBaoLuu,
                    THANG_BAT_DAU: thangBatDau,
                    NAM_BAT_DAU: namBatDau,
                    THANG_KET_THUC: thangKetThuc,
                    NAM_KET_THUC: namKetThuc,
                    LY_DO: lyDo,
                    SDT_PHU_HUYNH: sdtPhuHuynh,
                    NGAY_LAM_DON: ngayLamDon,
                    THANG_LAM_DON: thangLamDon,
                    NAM_LAM_DON: namLamDon
                },
                format
            );

        } catch (error) {
            next(error);
        }
    }

    async generateHocLai(req, res, next) {
        try {

            const {
                hoTen,
                mssv,
                ngaySinh,
                noiSinh,
                hoKhauThuongTru,
                lop,
                khoa,
                nganh,
                heDaoTao,
                email,
                soDienThoai,
                namHoc,
                soHocKyTamNghi,
                lyDo,
                soQuyetDinh,
                ngayQuyetDinh,
                thangQuyetDinh,
                namQuyetDinh,
                sdtPhuHuynh,
                ngayLamDon,
                thangLamDon,
                namLamDon
            } = req.body;

            const format = req.query.format || "docx";

            return this.generateDoc(
                res,
                "don-hoc-lai.docx",
                "don_hoc_lai.docx",
                {
                    HO_TEN: hoTen,
                    MSSV: mssv,
                    NGAY_SINH: ngaySinh,
                    NOI_SINH: noiSinh,
                    HO_KHAU_THUONG_TRU: hoKhauThuongTru,
                    LOP: lop,
                    KHOA: khoa,
                    NGANH: nganh,
                    HE_DAO_TAO: heDaoTao,
                    EMAIL: email,
                    SO_DIEN_THOAI: soDienThoai,
                    NAM_HOC: namHoc,
                    SO_HOC_KY_TAM_NGHI: soHocKyTamNghi,
                    LY_DO: lyDo,
                    SO_QUYET_DINH: soQuyetDinh,
                    NGAY_QUYET_DINH: ngayQuyetDinh,
                    THANG_QUYET_DINH: thangQuyetDinh,
                    NAM_QUYET_DINH: namQuyetDinh,
                    SDT_PHU_HUYNH: sdtPhuHuynh,
                    NGAY_LAM_DON: ngayLamDon,
                    THANG_LAM_DON: thangLamDon,
                    NAM_LAM_DON: namLamDon
                },
                format
            );

        } catch (error) {
            next(error);
        }
    }

    async generateTheSinhVien(req, res, next) {
        try {

            const {
                hoTen,
                mssv,
                ngaySinh,
                noiSinh,

                lop,
                khoa,
                khoaHoc,
                nganh,
                heDaoTao,

                soTaiKhoan,
                soDienThoai,

                lyDo,

                ngayLamDon,
                thangLamDon,
                namLamDon
            } = req.body;

            const format = req.query.format || "docx";

            return this.generateDoc(
                res,
                "don-cap-lai-the-sinh-vien.docx",
                "don_cap_lai_the_sinh_vien.docx",
                {
                    HO_TEN: hoTen,
                    MSSV: mssv,

                    NGAY_SINH: ngaySinh,
                    NOI_SINH: noiSinh,

                    LOP: lop,
                    KHOA: khoa,
                    KHOA_HOC: khoaHoc,

                    NGANH: nganh,
                    HE_DAO_TAO: heDaoTao,

                    SO_TAI_KHOAN: soTaiKhoan,
                    SO_DIEN_THOAI: soDienThoai,

                    LY_DO: lyDo,

                    NGAY_LAM_DON: ngayLamDon,
                    THANG_LAM_DON: thangLamDon,
                    NAM_LAM_DON: namLamDon
                },
                format
            );

        } catch (error) {
            next(error);
        }
    }

    async generateGiayGioiThieuThucTap(req, res, next) {
        try {

            const {
                hoTen,
                mssv,
                khoa,
                nganh,

                donViThucTap,

                ngayBatDau,
                ngayKetThuc,

                ngayCap,
                thangCap,
                namCap,

                ngayHetHan
            } = req.body;

            const format = req.query.format || "docx";

            return this.generateDoc(
                res,
                "giay-gioi-thieu-thuc-tap.docx",
                "giay_gioi_thieu_thuc_tap.docx",
                {
                    HO_TEN: hoTen,
                    MSSV: mssv,

                    KHOA: khoa,
                    NGANH: nganh,

                    DON_VI_THUC_TAP: donViThucTap,

                    NGAY_BD: ngayBatDau,
                    NGAY_KT: ngayKetThuc,

                    NGAY_CAP: ngayCap,
                    THANG_CAP: thangCap,
                    NAM_CAP: namCap,

                    NGAY_HET_HAN: ngayHetHan
                },
                format
            );

        } catch (error) {
            next(error);
        }
    }

    async generateGiayXacNhanHCKK(req, res, next) {
        try {

            const {
                hoTen,
                gioiTinh,
                mssv,
                khoaHoc,

                lop,
                nganh,

                ngaySinh,
                noiSinh,

                soDienThoai,

                xaPhuongThuongTru,
                tinhThanhThuongTru,

                hoanCanhGiaDinh,

                ngayLamDon,
                thangLamDon,
                namLamDon
            } = req.body;

            const format = req.query.format || "docx";

            return this.generateDoc(
                res,
                "giay-xac-nhan-hckk.docx",
                "giay_xac_nhan_hoan_canh_kho_khan.docx",
                {
                    HO_TEN: hoTen,
                    GIOI_TINH: gioiTinh,

                    MSSV: mssv,
                    KHOA: khoaHoc,

                    LOP: lop,
                    NGANH: nganh,

                    NGAY_SINH: ngaySinh,
                    NOI_SINH: noiSinh,

                    SO_DIEN_THOAI: soDienThoai,

                    XA_PHUONG_THUONG_TRU: xaPhuongThuongTru,
                    TINH_THANH_THUONG_TRU: tinhThanhThuongTru,

                    HOAN_CANH_GIA_DINH: hoanCanhGiaDinh,

                    NGAY_LAM_DON: ngayLamDon,
                    THANG_LAM_DON: thangLamDon,
                    NAM_LAM_DON: namLamDon
                },
                format
            );

        } catch (error) {
            next(error);
        }
    }

    async generateDoc(res, templateName, outputFileName, data, format = "docx") {
        const templatePath = path.join(
            __dirname,
            `../templates/${templateName}`
        );

        const content = fs.readFileSync(
            templatePath,
            "binary"
        );

        const zip = new PizZip(content);

        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        doc.render(data);

        const buffer = doc.getZip().generate({
            type: "nodebuffer",
            compression: "DEFLATE",
        });

        if (format === "pdf") {

            const pdfBuffer = await convertDocxToPdf(buffer);

            res.setHeader(
                "Content-Type",
                "application/pdf"
            );

            res.setHeader(
                "Content-Disposition",
                `attachment; filename=${outputFileName.replace(
                ".docx",
                ".pdf"
                )}`
            );

            return res.send(pdfBuffer);
        }

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        );

        res.setHeader(
            "Content-Disposition",
            `attachment; filename=${outputFileName}`
        );

        return res.send(buffer);
    }

}

module.exports = new WordController();