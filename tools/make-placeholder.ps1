Add-Type -AssemblyName System.Drawing

$size = 800
$bmp = New-Object System.Drawing.Bitmap($size, $size)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = "AntiAlias"
$rect = New-Object System.Drawing.Rectangle(0, 0, $size, $size)
$brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect,
  [System.Drawing.Color]::FromArgb(79, 70, 229),
  [System.Drawing.Color]::FromArgb(236, 72, 153), 45)
$g.FillRectangle($brush, $rect)

$font = New-Object System.Drawing.Font("Segoe UI", 220, [System.Drawing.FontStyle]::Bold)
$fmt = New-Object System.Drawing.StringFormat
$fmt.Alignment = "Center"
$fmt.LineAlignment = "Center"
$white = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$g.DrawString("IO", $font, $white, (New-Object System.Drawing.RectangleF(0, 0, $size, $size)), $fmt)

$root = Split-Path -Parent $PSScriptRoot
$bmp.Save((Join-Path $root "assets\img\foto.jpg"), [System.Drawing.Imaging.ImageFormat]::Jpeg)
$g.Dispose()
$bmp.Dispose()

# --- og-image 1200x630 ---
$w = 1200
$h = 630
$bmp2 = New-Object System.Drawing.Bitmap($w, $h)
$g2 = [System.Drawing.Graphics]::FromImage($bmp2)
$g2.SmoothingMode = "AntiAlias"
$rect2 = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
$brush2 = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect2,
  [System.Drawing.Color]::FromArgb(79, 70, 229),
  [System.Drawing.Color]::FromArgb(236, 72, 153), 35)
$g2.FillRectangle($brush2, $rect2)

$fmt2 = New-Object System.Drawing.StringFormat
$fmt2.Alignment = "Center"
$fmt2.LineAlignment = "Center"
$white2 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$f1 = New-Object System.Drawing.Font("Segoe UI", 56, [System.Drawing.FontStyle]::Bold)
$f2 = New-Object System.Drawing.Font("Segoe UI", 26, [System.Drawing.FontStyle]::Regular)
$g2.DrawString("Inacio Wellington Oliveira", $f1, $white2, (New-Object System.Drawing.RectangleF(0, 240, $w, 90)), $fmt2)
$g2.DrawString("Em transicao para desenvolvimento de software", $f2, $white2, (New-Object System.Drawing.RectangleF(0, 340, $w, 60)), $fmt2)

$bmp2.Save((Join-Path $root "assets\img\og-image.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$g2.Dispose()
$bmp2.Dispose()

Write-Output "ok"
