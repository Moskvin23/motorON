/**
 * MotorON — booking requests → Google Sheet.
 * Paste into Extensions → Apps Script of the sheet, then Deploy → New deployment → Web app
 * (Execute as: Me, Who has access: Anyone). Put the /exec URL into NEXT_PUBLIC_SHEET_URL.
 */
const HEADERS = ['Отримано', 'Авто', 'Рік', 'Послуга', 'Проблема', 'Бажаний день', 'Час доби', 'Ім’я', 'Телефон', 'Мова'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents || '{}');
    if (d.website) return out({ ok: true }); // honeypot: bots fill hidden fields
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }
    const cut = (v, n) => String(v || '').slice(0, n);
    // Leading apostrophe keeps "+38..." as text instead of a formula/number.
    sheet.appendRow([new Date(), cut(d.car, 80), cut(d.year, 4), cut(d.service, 60), cut(d.problem, 1000),
      cut(d.date, 20), cut(d.part, 20), cut(d.name, 60), "'" + cut(d.phone, 20), cut(d.lang, 2)]);
    return out({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

function out(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
