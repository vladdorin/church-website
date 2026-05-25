export const runtime = 'edge'

export async function GET() {
  try {
    const sheetId = process.env.GOOGLE_SHEET_DONATIONS_ID!

    // Citește coloana F (Amount_USD) începând de la rândul 2
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&range=F2:F`

    const res = await fetch(url, {
      next: { revalidate: 60 },
    })
    const text = await res.text()

    // Google returnează JSONP — extragem JSON-ul din el
    const json = JSON.parse(text.replace(/^[^(]+\(/, '').replace(/\);?\s*$/, ''))
    const rows: { c: { v: number | null }[] }[] = json.table.rows

    const raised = rows.reduce((sum, row) => {
      const val = row.c?.[0]?.v
      return sum + (typeof val === 'number' ? val : 0)
    }, 0)

    const donors = rows.filter(row => row.c?.[0]?.v != null).length

    return Response.json({ raised: Math.round(raised * 100) / 100, donors })
  } catch (err) {
    console.error('[fundraiser]', err)
    return Response.json({ raised: 0, donors: 0 })
  }
}