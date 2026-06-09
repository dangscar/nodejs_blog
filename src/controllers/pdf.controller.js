const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

class PdfController {
    async generate(req, res, next) {
        try {
            const {
                hoTen,
                mssv,
                ngaySinh,
                noiSinh,
                lyDo
            } = req.body;

            let html = fs.readFileSync(
                path.join(__dirname, "../templates/don-xin.html"),
                "utf8"
            );

            html = html
                .replace(/{{hoTen}}/g, hoTen || "")
                .replace(/{{mssv}}/g, mssv || "")
                .replace(/{{ngaySinh}}/g, ngaySinh || "")
                .replace(/{{noiSinh}}/g, noiSinh || "")
                .replace(/{{lyDo}}/g, lyDo || "");

            const browser = await puppeteer.launch({
                headless: true,
                args: [
                    "--no-sandbox",
                    "--disable-setuid-sandbox"
                ]
            });

            const page = await browser.newPage();

            await page.setContent(html, {
                waitUntil: "networkidle0"
            });

            const pdfBuffer = await page.pdf({
                format: "A4",
                printBackground: true,
                margin: {
                    top: "20mm",
                    right: "20mm",
                    bottom: "20mm",
                    left: "20mm"
                }
            });

            await browser.close();

            res.set({
                "Content-Type": "application/pdf",
                "Content-Disposition":
                    'attachment; filename="don-xin.pdf"'
            });

            return res.send(pdfBuffer);

        } catch (error) {
            next(error);
        }
    }
}

module.exports = new PdfController();