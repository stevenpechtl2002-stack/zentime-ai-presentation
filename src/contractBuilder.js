export const PLAN_DATA = {
  STARTER:  { monthly: '500,00', calls: '200' },
  BUSINESS: { monthly: '600,00', calls: '500' },
  PRO:      { monthly: '650,00', calls: '700' },
}

const d = (v) => (v && v.trim()) ? v.trim() : '___________________________'

export function buildPart1(form, plan, pd, today) {
  return `============================================================================
  ZENTIME – GESAMTVERTRAG TARIF: ${plan}
  (Hauptvertrag + AVV in einem Dokument)
============================================================================

================================================================================
  TEIL 1 – SOFTWARE-NUTZUNGS- UND LIZENZVERTRAG
  TARIF: ${plan}
================================================================================

ANBIETER:
  Firma:       Zentime
  Inhaber:     Steven Pechtl
  Adresse:     Drosselweg 11, 75175 Pforzheim
  E-Mail:      steven.pechtl@zentime.io
  Telefon:     +49 152 04540077
  USt-IdNr.:   DE364872078-00001
  (nachfolgend "Anbieter")

KUNDE:
  Firma/Name:  ${d(form.company)}
  Adresse:     ${d(form.address)}
  E-Mail:      ${d(form.email)}
  Telefon:     ${d(form.phone)}
  USt-IdNr.:   ${d(form.vatId)}
  (nachfolgend "Kunde")

-- gemeinsam "Parteien" --

--------------------------------------------------------------------------------
Präambel
--------------------------------------------------------------------------------
Der Anbieter betreibt die Buchungsplattform "Zentime", die Unternehmen
ermöglicht, Termine und Buchungen digital zu verwalten. Ergänzend bietet
der Anbieter einen KI-gestützten Telefonassistenten an, der eingehende
Anrufe automatisch entgegennimmt, Buchungen erfasst, Terminanfragen
bearbeitet und Anrufer weiterleitet.

--------------------------------------------------------------------------------
§ 1  Vertragsgegenstand und Leistungsumfang
--------------------------------------------------------------------------------
(1) Der Anbieter stellt dem Kunden folgende Produkte bereit:

  A) ZENTIME BUCHUNGSPLATTFORM
     - Online-Buchungssystem für Termine und Reservierungen
     - Kundenverwaltung (CRM-Basisfunktionen)
     - Automatische Bestätigungs- und Erinnerungs-E-Mails/-SMS
     - Kalenderintegration (Google, Outlook)
     - Dashboard und Buchungsübersicht

  B) ZENTIME KI-TELEFONASSISTENT
     - KI-gestützte Entgegennahme eingehender Anrufe (TTS-System)
     - Automatische Buchungsannahme und -bestätigung per Telefon
     - Weiterleitung von Anrufen nach konfigurierten Regeln (n8n-Workflow)
     - Gesprächsprotokoll und Transkription
     - Echtzeit-Synchronisation mit der Buchungsplattform (Supabase via Lovable)
     - Anpassbare Begrüßungstexte und Gesprächsführung

(2) Der Leistungsumfang richtet sich nach Tarif ${plan} (§ 3).

(3) Der Anbieter ist berechtigt, den Dienst weiterzuentwickeln, solange die
    Kernfunktionalität erhalten bleibt. Wesentliche Einschränkungen werden
    dem Kunden 30 Tage im Voraus mitgeteilt.

--------------------------------------------------------------------------------
§ 2  Lizenzgewährung
--------------------------------------------------------------------------------
(1) Der Anbieter gewährt dem Kunden für die Vertragslaufzeit ein einfaches,
    nicht übertragbares, nicht unterlizenzierbares Nutzungsrecht für eigene
    betriebliche Zwecke.

(2) Dem Kunden ist ausdrücklich untersagt:
    - Zugangsdaten an Dritte weiterzugeben oder die Lizenz zu veräußern
    - Den Dienst zu reverse engineeren, zu kopieren oder nachzubauen
    - Den KI-Assistenten für irreführende, betrügerische oder illegale
      Kommunikation zu nutzen
    - Automatisierte Anfragen jenseits der API-Nutzung zu stellen
    - Die Infrastruktur des Anbieters mutwillig zu überlasten (DoS-Verbot)

--------------------------------------------------------------------------------
§ 3  Vergütung – Tarif ${plan}
--------------------------------------------------------------------------------
  +----------------------------------+----------------------------------+
  | Leistung                         | Betrag                           |
  +----------------------------------+----------------------------------+
  | Setup-Gebühr (einmalig)          | 3.000,00 EUR zzgl. MwSt.         |
  | Monatliche Gebühr                | ${pd.monthly} EUR/Monat zzgl. MwSt.     |
  | Inkl. Anrufe/Monat               | ${pd.calls} Anrufe inklusive             |
  | Mehrverbrauch                    | 0,80 EUR pro Anruf               |
  +----------------------------------+----------------------------------+

(2) Im Tarif ${plan} sind ${pd.calls} Anrufe pro Monat inklusive. Jeder weitere Anruf
    wird mit 0,80 EUR netto abgerechnet.

(3) Im Tarif ${plan} enthaltene Leistungen:
    - Komplett eingerichtet & konfiguriert
    - Hosting & Wartung inklusive
    - Alle Updates automatisch
    - Persönlicher Support
    - Danach monatlich kündbar

(4) Rechnungen innerhalb von 14 Tagen fällig. Bei Zahlungsverzug:
    Mahnung nach 7 Tagen -> Zugangssperrung nach weiteren 14 Tagen ->
    Verzugszinsen 9 Prozentpunkte über Basiszinssatz -> Mahngebühr 5,00 EUR.

(5) Preisanpassungen einmal jährlich mit 60 Tagen Ankündigungsfrist.
    Sonderkündigungsrecht des Kunden innerhalb von 30 Tagen.

--------------------------------------------------------------------------------
§ 4  Laufzeit und Kündigung
--------------------------------------------------------------------------------
(1) Vertragsbeginn: Datum der Unterzeichnung. Mindestlaufzeit: 1 Monat.

(2) Automatische Verlängerung um jeweils 1 Monat, sofern nicht mit 30 Tagen
    Frist zum Laufzeitende per E-Mail an steven.pechtl@zentime.io gekündigt.

(3) Außerordentliche Kündigung durch den Anbieter bei:
    - Zahlungsverzug von mehr als 30 Tagen
    - Schwerem Missbrauch oder Verstoß gegen § 2
    - Insolvenz des Kunden

--------------------------------------------------------------------------------
§ 5  Verfügbarkeit und Support
--------------------------------------------------------------------------------
(1) Der Anbieter bemüht sich um eine durchschnittliche monatliche System-
    verfügbarkeit von 99,0 % im Jahresmittel.

(2) Nicht als Ausfallzeit gelten:
    - Angekündigte Wartungsfenster (mind. 24 Stunden Vorankündigung per E-Mail,
      vorzugsweise zwischen 02:00 und 05:00 Uhr)
    - Ereignisse höherer Gewalt (Naturkatastrophen, Krieg, Pandemie,
      staatliche Eingriffe)
    - Ausfälle von Drittanbietern außerhalb des Einflussbereichs des Anbieters
      (insbesondere TTS-System, Lovable, n8n, Vercel)
    - Technische Störungen der allgemeinen Internetinfrastruktur

(3) Kritische Störungen werden innerhalb von 2 Werktagen bearbeitet.
    Support: steven.pechtl@zentime.io

--------------------------------------------------------------------------------
§ 6  KI-spezifische Hinweise und Haftung
--------------------------------------------------------------------------------
(1) Der Kunde nimmt zur Kenntnis, dass KI-basierte Systeme trotz kontinuier-
    licher Optimierung nicht in allen Fällen fehlerfrei arbeiten und insbe-
    sondere Transkriptions-, Verständnis- oder Zuordnungsfehler auftreten
    können.

(2) Der Anbieter schuldet keine vollständige Fehlerfreiheit der KI-generierten
    Inhalte oder Prozesse.

(3) Der Anbieter haftet nicht für Schäden, die ausschließlich auf fehlerhaften
    KI-generierten Inhalten beruhen, sofern kein vorsätzliches oder grob
    fahrlässiges Verhalten des Anbieters vorliegt.

(4) Die Haftung für die Verletzung wesentlicher Vertragspflichten bleibt
    unberührt. In diesen Fällen ist die Haftung auf den vertragstypischen,
    vorhersehbaren Schaden begrenzt.

(5) Der Kunde verpflichtet sich sicherzustellen, dass Anrufer entsprechend
    den gesetzlichen Vorgaben (insbesondere DSGVO, TDDDG, EU AI Act) über
    die Nutzung KI-gestützter Verarbeitung informiert werden. Empfohlener
    Hinweis: „Ihr Anruf wird von unserem KI-Assistenten entgegengenommen
    und für die Buchungsbearbeitung verarbeitet."

(6) Verstößt der Kunde gegen die Informationspflicht gemäß Abs. 5, stellt
    er den Anbieter von sämtlichen daraus resultierenden Ansprüchen,
    Bußgeldern, Behördensanktionen und Kosten Dritter vollständig frei.

--------------------------------------------------------------------------------
§ 7  Datenschutz
--------------------------------------------------------------------------------
(1) Zentime verarbeitet personenbezogene Daten als Auftragsverarbeiter
    gemäß Art. 28 DSGVO. Details sind in Teil 2 (AVV) geregelt.
(2) Der Kunde ist Verantwortlicher im Sinne der DSGVO.
(3) Gesprächsdaten: Weder Rohaufnahmen noch Transkriptionen werden dauerhaft
    gespeichert. Das TTS-System verarbeitet Sprache ausschließlich in Echtzeit.
    Serverstandort: EU (Lovable/Supabase Frankfurt).
    Datenexport bei Vertragsende auf Anfrage innerhalb von 30 Tagen.

--------------------------------------------------------------------------------
§ 8  Geheimhaltung
--------------------------------------------------------------------------------
Beide Parteien behandeln alle vertraulichen Informationen streng vertraulich.
Geltungsdauer: Vertragslaufzeit + 3 Jahre danach.

--------------------------------------------------------------------------------
§ 9  Haftungsbegrenzung
--------------------------------------------------------------------------------
(1) Unbegrenzte Haftung nur bei Vorsatz, grober Fahrlässigkeit sowie
    Verletzung von Leben, Körper oder Gesundheit.
(2) Bei leichter Fahrlässigkeit: Haftung begrenzt auf vertragstypischen
    Schaden bei Verletzung wesentlicher Vertragspflichten.
(3) Gesamthaftung begrenzt auf die letzten 12 Monate Nettovergütung.
(4) Keine Haftung für mittelbare Schäden, Folgeschäden, entgangenen Gewinn.

--------------------------------------------------------------------------------
§ 10  Referenznennung
--------------------------------------------------------------------------------
Der Anbieter darf den Kunden (Firmenname, Branche) nur dann als Referenz
auf der Zentime-Website, in Marketingmaterialien oder gegenüber Dritten
nennen, wenn der Kunde hierzu ausdrücklich schriftlich zugestimmt hat
(Opt-in). Die Zustimmung kann jederzeit ohne Angabe von Gründen schriftlich
widerrufen werden (E-Mail genügt). Ohne diese Zustimmung ist jede
Referenznennung untersagt.

--------------------------------------------------------------------------------
§ 11  Schlussbestimmungen
--------------------------------------------------------------------------------
(1) Gerichtsstand: Pforzheim, Baden-Württemberg. Deutsches Recht.
    Ausschluss UN-Kaufrecht (CISG).
(2) Salvatorische Klausel gilt.
(3) Schriftformklausel gilt (E-Mail ausreichend).
(4) Ersetzt alle vorherigen Vereinbarungen.

Anlage 1: Auftragsverarbeitungsvertrag (AVV) gemäß Art. 28 DSGVO (Teil 2)

Pforzheim, den ${today}

____________________________    ____________________________
Anbieter: Zentime               Kunde
Steven Pechtl                   ${d(form.company)}`
}

export function buildPart2(form, plan, today) {
  const dsbLine = (form.dsb && form.dsb.trim())
    ? form.dsb.trim()
    : '___________________________ (falls vorhanden)'

  return `
================================================================================
  TEIL 2 – AUFTRAGSVERARBEITUNGSVERTRAG (AVV)
  gemäß Art. 28 DSGVO
  Ergänzung zum Software-Nutzungsvertrag Tarif: ${plan}
================================================================================

AUFTRAGSVERARBEITER:
  Firma:       Zentime
  Inhaber:     Steven Pechtl
  Adresse:     Drosselweg 11, 75175 Pforzheim
  E-Mail:      steven.pechtl@zentime.io
  USt-IdNr.:   DE364872078-00001
  Tech-Stack:  TTS-System · n8n · Lovable (inkl. Supabase) · Vercel

VERANTWORTLICHER (KUNDE):
  Firma/Name:  ${d(form.company)}
  Adresse:     ${d(form.address)}
  E-Mail:      ${d(form.email)}
  DSB:         ${dsbLine}

--------------------------------------------------------------------------------
Präambel AVV
--------------------------------------------------------------------------------
Dieser AVV ergänzt den Zentime Software-Nutzungsvertrag (Teil 1) und regelt
die Verarbeitung personenbezogener Daten durch Zentime als Auftragsverarbeiter
gemäß Art. 28 DSGVO.

Zentime betreibt seinen Dienst auf Basis von:
  - TTS-System (Sprachverarbeitung)
  - n8n GmbH (Workflow-Automatisierung, Deutschland)
  - Lovable Technologies (Frontend + Supabase-Datenbankinfrastruktur, EU)
  - Vercel Inc. (Landing Page Hosting, USA)

Supabase läuft vollständig über die Lovable-Infrastruktur — Lovable ist der
direkte Vertragspartner. Bei Widersprüchen hat der AVV Vorrang vor dem
Hauptvertrag in datenschutzrechtlichen Belangen.

--------------------------------------------------------------------------------
Art. 1  Gegenstand, Art und Zweck der Verarbeitung
--------------------------------------------------------------------------------
(1) Technischer Ablauf:
    Anrufe -> TTS-System (Sprachverarbeitung) -> n8n (Workflow-Routing)
    -> Supabase via Lovable (Datenspeicherung) -> Lovable (Web-App)

(2) Verarbeitete Datenkategorien:
    - Anrufer-Daten: Telefonnummern, Echtzeit-Sprachverarbeitung
      (TTS-System), Gesprächstranskriptionen
    - Buchungsdaten: Namen, Termine, Kontaktdaten (Supabase via Lovable)
    - Workflow-Daten: Prozessdaten für Routing (n8n), nicht dauerhaft gespeichert
    - Account-Daten: Login-Daten, Konfigurationen (Supabase Auth via Lovable)

(3) Zweck: Automatisierte Anrufannahme, Buchungserfassung, Workflow-
    Steuerung, Bereitstellung Buchungsplattform.

(4) Betroffene Personen: Endkunden und Anrufer des Verantwortlichen.

--------------------------------------------------------------------------------
Art. 2  Pflichten des Auftragsverarbeiters
--------------------------------------------------------------------------------
Zentime verpflichtet sich:
    - Daten nur auf dokumentierte Weisung verarbeiten (Art. 29 DSGVO)
    - Alle befugten Personen zur Vertraulichkeit verpflichten
    - TOM gemäß Art. 7 umsetzen und regelmäßig überprüfen
    - Unterauftragsverarbeiter zu denselben Datenschutzpflichten verpflichten
    - Bei Betroffenenrechten (Art. 5) und Datenpannen (Art. 6) unterstützen
    - Daten nach Vertragsende löschen oder zurückgeben (Art. 8)
    - Alle notwendigen Nachweise bereitstellen und Audits ermöglichen

--------------------------------------------------------------------------------
Art. 3  Weisungsrecht des Verantwortlichen
--------------------------------------------------------------------------------
Verarbeitung nur auf Weisung. Hauptvertrag + AVV = initiale Weisung.
Weitere Weisungen schriftlich (E-Mail genügt). Bei rechtswidrigen Weisungen:
sofortige Meldung und Aussetzung bis zur Klärung.

--------------------------------------------------------------------------------
Art. 4  Unterauftragsverarbeiter – Zentime Tech-Stack
--------------------------------------------------------------------------------
(1) Genehmigte Unterauftragsverarbeiter:

  TTS-System | KI-Sprachsynthese & Erkennung – Echtzeit,
    keine dauerhafte Speicherung | USA / SCCs gem. Art. 46 DSGVO
  n8n GmbH | Workflow-Automatisierung, Anruf-Routing | Deutschland / EU
  Lovable Technologies | Frontend + gesamte Supabase-Infrastruktur | EU
  Vercel Inc. | Hosting Landing Page – nur anonyme Analytics | USA / SCCs

(2) Der Anbieter hat mit sämtlichen eingesetzten Unterauftragsverarbeitern
    die erforderlichen Auftragsverarbeitungsverträge gemäß Art. 28 DSGVO
    sowie – sofern Drittlandübertragungen vorliegen – Standardvertragsklauseln
    gemäß Art. 46 Abs. 2 lit. c DSGVO abgeschlossen. Dies gilt insbesondere
    für TTS-System-Anbieter (USA) und Vercel Inc. (USA).
    Audiodaten werden nicht dauerhaft gespeichert.

(3) Lovable (EU): Hauptvertragspartner für Backend inkl. Supabase. EU-Verarbeitung.

(4) n8n (Deutschland): Zugriff nur auf Workflow-Daten, ausschließlich EU.

(5) Vercel (USA): Nur statische Landing Page, keine Kundendaten, anonyme Analytics.

(6) Änderungen: 30 Tage Ankündigungsfrist, 14 Tage Einspruchsrecht.

--------------------------------------------------------------------------------
Art. 5  Unterstützung bei Betroffenenrechten
--------------------------------------------------------------------------------
Unterstützung bei: Auskunft (Art. 15), Berichtigung (Art. 16), Löschung
(Art. 17 – via Supabase/Lovable), Einschränkung (Art. 18), Datenübertragbarkeit
(Art. 20 – Export CSV/JSON aus Supabase).
Anfragen werden unverzüglich weitergeleitet, nicht eigenständig beantwortet.
Unterstützung auch bei DSFA (Art. 35) und Meldungen nach Art. 33/34 DSGVO.

--------------------------------------------------------------------------------
Art. 6  Datenpannen und Meldepflichten
--------------------------------------------------------------------------------
(1) Meldung unverzüglich, spätestens innerhalb von 24 Stunden nach
    Bekanntwerden per E-Mail. Gilt auch bei Vorfällen bei Sub-Processoren.

(2) Meldung enthält: Art der Verletzung, betroffene Datenkategorien und
    Personenzahl, Kontaktdaten, wahrscheinliche Folgen, ergriffene Maßnahmen.

--------------------------------------------------------------------------------
Art. 7  Technische und organisatorische Maßnahmen (TOM) – Art. 32 DSGVO
--------------------------------------------------------------------------------
  Zugangskontrolle: Supabase Auth via Lovable: 2FA, RBAC
  Verschlüsselung: TLS 1.2+ alle Übertragungen; Supabase at-rest AES-256
  Datentrennung (RLS): Supabase Row Level Security via Lovable
  Eingabekontrolle: Supabase Audit Logs via Lovable
  Verfügbarkeit: Lovable automatische Backups; n8n Fehler-Alerting; Vercel CDN
  Serverstandort: Primär EU (Frankfurt); TTS-System + Vercel USA mit SCCs

--------------------------------------------------------------------------------
Art. 8  Datenlösch- und Rückgabepflichten
--------------------------------------------------------------------------------
(1) Nach Vertragsende: Export oder Löschung der gespeicherten Daten innerhalb
    von 30 Tagen auf Anfrage.
(2) Gesprächsdaten: Weder Rohaufnahmen noch Transkriptionen werden dauerhaft
    gespeichert. Das TTS-System verarbeitet Sprache ausschließlich in Echtzeit,
    keine persistente Datenspeicherung.
(3) n8n-Workflow-Logs: Löschung nach 30 Tagen.
(4) Löschbestätigung schriftlich auf Anfrage.

--------------------------------------------------------------------------------
Art. 9  Kontrollrechte des Verantwortlichen
--------------------------------------------------------------------------------
Kontrolle durch Nachweise, Selbstauskünfte, Audits (4 Wochen Ankündigung,
max. 1x jährlich). Kosten trägt Verantwortlicher, außer bei wesentlichen Verstößen.

--------------------------------------------------------------------------------
Art. 10  Laufzeit
--------------------------------------------------------------------------------
Dieser AVV ist an die Laufzeit des Hauptvertrags (Teil 1) gekoppelt und
endet automatisch mit diesem, vorbehaltlich der Pflichten aus Art. 8.

--------------------------------------------------------------------------------
Art. 11  Schlussbestimmungen AVV
--------------------------------------------------------------------------------
Gerichtsstand: Pforzheim. Deutsches Recht. Salvatorische Klausel.
Schriftformklausel (E-Mail genügt). Im Übrigen gelten Regelungen aus Teil 1.

--------------------------------------------------------------------------------
UNTERSCHRIFTEN – GESAMTVERTRAG
(Hauptvertrag Teil 1 + AVV Teil 2 werden gemeinsam unterzeichnet)
--------------------------------------------------------------------------------

Ort / Datum: Pforzheim, den ${today}

____________________________    ____________________________
Anbieter: Zentime               Kunde
Steven Pechtl                   ${d(form.company)}


--------------------------------------------------------------------------
Zentime · Drosselweg 11 · 75175 Pforzheim · DE364872078-00001
steven.pechtl@zentime.io · +49 152 04540077 · Tarif: ${plan}
--------------------------------------------------------------------------`
}

export function buildFullContract(form) {
  const plan = form.plan || 'STARTER'
  const pd = PLAN_DATA[plan] || PLAN_DATA.STARTER
  const today = new Date().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
  return buildPart1(form, plan, pd, today) + '\n\n' + buildPart2(form, plan, today)
}
