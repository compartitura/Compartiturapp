# Archivo: deploy-incremental.ps1 (guárdalo en la raíz)

param(
  [int]$Total = 115465,
  [int]$Chunk = 100,
  [int]$Start = 300,
  [string]$ScriptPath = 'scripts/enrich-chunk.cjs'
)

while ($Start -lt $Total) {
    Write-Host "→ Procesando productos del $Start al $($Start + $Chunk - 1)..."
    node $ScriptPath $Start $Chunk

    Write-Host "→ Desplegando en Vercel..."
    vercel --prod --yes

    $Start += $Chunk
    Write-Host ""
}

Write-Host "✅ ¡Hecho! Procesados $Total productos."
