"""Build the fillable patient-referral form at public/precision-vision-referral-form.pdf.

Referring offices can type into the form on screen or print it, then fax it
with records. Regenerate after changing contact details or wording:

    python3 -m venv .venv-pdf && .venv-pdf/bin/pip install reportlab
    .venv-pdf/bin/python scripts/build-referral-pdf.py
"""

from pathlib import Path

from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import letter
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "precision-vision-referral-form.pdf"
LOGO = ROOT / "public" / "precision-vision-wordmark.png"

PHONE = "(470) 440-4099"
FAX = "(470) 588-8894"
ADDRESS = "3940 Buford Hwy, Suite A104, Duluth, GA 30096"

NAVY = HexColor("#0d3f62")
INK = HexColor("#163a54")
MUTED = HexColor("#4d6070")
AQUA = HexColor("#76cbd5")
PAPER = HexColor("#f3f8fb")
LINE = HexColor("#c9d6df")

W, H = letter
M = 40  # page margin
CONTENT = W - 2 * M


class Form:
    def __init__(self, path: Path):
        self.c = canvas.Canvas(str(path), pagesize=letter)
        self.c.setTitle("Patient Referral Form | Precision Vision Institute")
        self.c.setAuthor("Precision Vision Institute")
        self.c.setSubject(f"Fax completed referrals to {FAX}")
        self.y = H

    # --- drawing helpers -------------------------------------------------
    def header(self):
        c = self.c
        c.setFillColor(NAVY)
        c.rect(0, H - 88, W, 88, stroke=0, fill=1)
        c.setFillColor(white)
        c.roundRect(M, H - 72, 176, 56, 10, stroke=0, fill=1)
        c.drawImage(ImageReader(str(LOGO)), M + 12, H - 65, width=152, height=152 * 212 / 1028, mask="auto")
        c.setFillColor(white)
        c.setFont("Helvetica-Bold", 20)
        c.drawRightString(W - M, H - 40, "Patient Referral Form")
        c.setFont("Helvetica", 10)
        c.drawRightString(W - M, H - 57, f"Fax {FAX}   ·   Phone {PHONE}")
        c.setFillColor(AQUA)
        c.drawRightString(W - M, H - 71, ADDRESS)
        self.y = H - 100

    def section(self, title: str):
        c = self.c
        self.y -= 4
        c.setFillColor(PAPER)
        c.rect(M, self.y - 20, CONTENT, 20, stroke=0, fill=1)
        c.setFillColor(AQUA)
        c.rect(M, self.y - 20, 4, 20, stroke=0, fill=1)
        c.setFillColor(NAVY)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(M + 12, self.y - 14, title.upper())
        self.y -= 28

    def label(self, text: str, x: float = M):
        self.c.setFillColor(MUTED)
        self.c.setFont("Helvetica", 7.5)
        self.c.drawString(x, self.y - 8, text)

    def field(self, name: str, label: str, x: float, width: float, height: float = 18, multiline: bool = False):
        """Label on top, box below it; occupies self.y down to self.y - 12 - height."""
        c = self.c
        self.label(label, x)
        c.acroForm.textfield(
            name=name,
            tooltip=label,
            x=x,
            y=self.y - 12 - height,
            width=width,
            height=height,
            fontName="Helvetica",
            fontSize=9 if multiline else 10,
            borderColor=LINE,
            fillColor=white,
            textColor=INK,
            borderWidth=1,
            borderStyle="solid",
            forceBorder=True,
            fieldFlags="multiline" if multiline else "",
        )

    def row(self, fields: list[tuple[str, str, float]], height: float = 18, multiline: bool = False):
        """fields: (name, label, fraction of the content width)."""
        gap = 10
        x = M
        usable = CONTENT - gap * (len(fields) - 1)
        for name, label, fraction in fields:
            width = usable * fraction
            self.field(name, label, x, width, height, multiline)
            x += width + gap
        self.y -= 12 + height + 9

    def checkboxes(self, items: list[tuple[str, str]], columns: int = 2, other: str | None = None):
        c = self.c
        col_width = CONTENT / columns
        self.y -= 12  # first row baseline
        for index, (name, label) in enumerate(items):
            col = index % columns
            if index and col == 0:
                self.y -= 17
            x = M + col * col_width
            c.acroForm.checkbox(
                name=name,
                tooltip=label,
                x=x,
                y=self.y - 2,
                size=11,
                buttonStyle="check",
                borderColor=NAVY,
                fillColor=white,
                textColor=NAVY,
                borderWidth=1,
                forceBorder=True,
            )
            c.setFillColor(INK)
            c.setFont("Helvetica", 9.5)
            c.drawString(x + 17, self.y, label)
        self.y -= 14
        if other:
            self.row([(other, "Other (please specify)", 1.0)])

    def footer(self):
        c = self.c
        c.setStrokeColor(LINE)
        c.line(M, 58, W - M, 58)
        c.setFillColor(NAVY)
        c.setFont("Helvetica-Bold", 9)
        c.drawString(M, 44, f"Fax the completed form and records to {FAX}.")
        c.setFont("Helvetica", 8)
        c.setFillColor(MUTED)
        c.drawString(M, 32, "Confidential: contains protected health information. Please do not send by email.")
        c.drawString(M, 21, f"We contact the patient to schedule and can update your office after the visit. Questions: {PHONE}.")

    # --- the form ---------------------------------------------------------
    def build(self):
        self.header()

        self.section("Patient")
        self.row([("patient_name", "Patient name", 0.5), ("patient_dob", "Date of birth", 0.2), ("patient_phone", "Best phone number", 0.3)])
        self.row([("patient_email", "Email (optional)", 0.5), ("patient_insurance", "Medical / vision insurance", 0.5)])

        self.section("Referring provider")
        self.row([("provider_name", "Referring doctor", 0.5), ("provider_practice", "Practice name", 0.5)])
        self.row([("provider_phone", "Phone", 0.3), ("provider_fax", "Fax", 0.3), ("provider_email", "Email", 0.4)])

        self.section("Reason for referral")
        self.checkboxes(
            [
                ("reason_keratoconus", "Keratoconus / corneal ectasia"),
                ("reason_post_surgical", "Post-surgical cornea (LASIK, PRK, RK, PK)"),
                ("reason_scleral", "Scleral / specialty lens evaluation"),
                ("reason_dry_eye", "Severe dry eye / ocular surface disease"),
                ("reason_envision", "Envision dry eye treatment"),
                ("reason_orthok", "Ortho-K / myopia management"),
            ],
            other="reason_other",
        )

        self.section("Clinical information (optional)")
        self.row([("va_od", "Best corrected VA  OD", 0.25), ("va_os", "Best corrected VA  OS", 0.25), ("diagnosis", "Working diagnosis / ICD-10", 0.5)])
        self.label("Records attached")
        self.y -= 10
        self.checkboxes(
            [
                ("records_topography", "Corneal topography / tomography"),
                ("records_exam", "Recent exam notes"),
                ("records_surgical", "Surgical records"),
                ("records_lenses", "Current contact lens parameters"),
            ],
        )
        self.row([("notes", "Notes, visual goals, or questions for Dr. Nim", 1.0)], height=96, multiline=True)
        assert self.y > 66, f"content overflows the footer (y={self.y:.0f})"

        self.footer()
        self.c.showPage()
        self.c.save()


if __name__ == "__main__":
    Form(OUT).build()
    print(f"wrote {OUT.relative_to(ROOT)}")
