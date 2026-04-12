Event snapshot PDFs for past events on /events.

For each event in data/news.json, set "snapshotPdf" to the exact file name in this folder (spaces and mixed case are fine). Example: "mcr emotional health webinar 30-10-2025.pdf".

If "snapshotPdf" is omitted, the app looks for a file named {slug}.pdf (same slug as in news.json).

The public error page never mentions this folder; it only shows a short generic message if a file is missing.
